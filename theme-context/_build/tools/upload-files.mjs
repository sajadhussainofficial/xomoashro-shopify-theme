// Uploads the pictures listed in ../images-generated/manifest.json to the store's
// Files (Content > Files in Shopify admin) with their alt text. A file whose name
// already exists is replaced, so the script is safe to run again.
//
//   node upload-files.mjs            upload everything in the manifest
//   node upload-files.mjs <file> ... upload only the named files
//
// Needs `shopify store auth` with the read_files and write_files scopes.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { repoRoot } from './openai-keys.mjs';

const STORE = 'https-xomoashro-com-fcrv98st.myshopify.com';
const queries = path.join(repoRoot, 'theme-context/_build/store-setup');
const imageDir = path.join(repoRoot, 'theme-context/_build/images-generated');
const only = process.argv.slice(2);

function execute(queryFile, variables, mutation = false) {
  const args = ['store', 'execute', '--store', STORE, '--json', '--query-file', path.join(queries, queryFile)];
  if (variables) args.push('--variables', JSON.stringify(variables));
  if (mutation) args.push('--allow-mutations');
  const stdout = execFileSync('shopify', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const parsed = JSON.parse(stdout);
  return parsed.data ?? parsed;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const manifest = JSON.parse(readFileSync(path.join(imageDir, 'manifest.json'), 'utf8'));
const resultFile = path.join(imageDir, 'uploaded.json');
let results = {};
try {
  results = JSON.parse(readFileSync(resultFile, 'utf8'));
} catch {
  results = {};
}

for (const entry of manifest) {
  if (only.length && !only.includes(entry.file)) continue;
  const file = path.join(imageDir, entry.file);
  const size = statSync(file).size;

  const staged = execute('staged-uploads-create.graphql', {
    input: [{ filename: entry.file, mimeType: 'image/webp', resource: 'IMAGE', httpMethod: 'POST', fileSize: String(size) }],
  }, true).stagedUploadsCreate;
  if (staged.userErrors.length) throw new Error(`${entry.file}: ${JSON.stringify(staged.userErrors)}`);
  const target = staged.stagedTargets[0];

  const form = new FormData();
  for (const parameter of target.parameters) form.append(parameter.name, parameter.value);
  form.append('file', new Blob([readFileSync(file)], { type: 'image/webp' }), entry.file);
  const upload = await fetch(target.url, { method: 'POST', body: form });
  if (!upload.ok) throw new Error(`${entry.file}: upload refused with HTTP ${upload.status}`);

  const created = execute('file-create.graphql', {
    files: [{ originalSource: target.resourceUrl, alt: entry.alt, contentType: 'IMAGE', filename: entry.file, duplicateResolutionMode: 'REPLACE' }],
  }, true).fileCreate;
  if (created.userErrors.length) throw new Error(`${entry.file}: ${JSON.stringify(created.userErrors)}`);
  const id = created.files[0].id;

  let node;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await wait(2000);
    node = execute('file-by-id.graphql', { id }).node;
    if (node.fileStatus === 'READY' || node.fileStatus === 'FAILED') break;
  }
  if (node.fileStatus !== 'READY') throw new Error(`${entry.file}: ${node.fileStatus} ${JSON.stringify(node.fileErrors)}`);

  results[entry.file] = { id, url: node.image.url, width: node.image.width, height: node.image.height, alt: node.alt, setting: `shopify://shop_images/${entry.file}` };
  writeFileSync(resultFile, `${JSON.stringify(results, null, 2)}\n`);
  console.log(`uploaded ${entry.file} ${node.image.width}x${node.image.height} ${Math.round(size / 1024)} KB`);
}
