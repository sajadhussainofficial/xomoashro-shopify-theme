// Generates or improves pictures with the OpenAI Images API and saves them as PNG
// masters plus WebP files ready for Shopify.
//
//   node generate-images.mjs <jobs.json> [job-id ...]
//
// jobs.json: { "model": "...", "quality": "...", "jobs": [ { id, size, prompt,
//   references: [paths relative to the repository root], outputs: [ { name, width,
//   height, position } ] } ] }
//
// Keys come from .env (see openai-keys.mjs). When a key is rejected, out of quota or
// rate limited, the next key is tried. Keys are never printed.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { loadKeys, repoRoot } from './openai-keys.mjs';

const [jobsFile, ...only] = process.argv.slice(2);
if (!jobsFile) {
  console.error('Usage: node generate-images.mjs <jobs.json> [job-id ...]');
  process.exit(1);
}

const config = JSON.parse(readFileSync(jobsFile, 'utf8'));
const outDir = path.join(repoRoot, 'theme-context/_build/images-generated');
const masterDir = path.join(outDir, 'masters');
mkdirSync(masterDir, { recursive: true });

const keys = loadKeys();
let keyIndex = 0;
const SWITCH_ON = new Set([401, 403, 429]);

async function callApi(job) {
  for (let attempt = 0; attempt < keys.length * 2; attempt += 1) {
    const key = keys[keyIndex];
    const hasRefs = job.references?.length > 0;
    let response;
    if (hasRefs) {
      const form = new FormData();
      form.append('model', job.model || config.model);
      form.append('prompt', job.prompt);
      form.append('size', job.size);
      form.append('quality', job.quality || config.quality);
      form.append('n', '1');
      for (const ref of job.references) {
        const file = path.join(repoRoot, ref);
        const png = await sharp(file).png().toBuffer();
        form.append('image[]', new Blob([png], { type: 'image/png' }), path.basename(ref).replace(/\.\w+$/, '.png'));
      }
      response = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key.value}` },
        body: form,
      });
    } else {
      response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key.value}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: job.model || config.model,
          prompt: job.prompt,
          size: job.size,
          quality: job.quality || config.quality,
          n: 1,
        }),
      });
    }
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      return { body, keyName: key.name };
    }
    const reason = body.error?.code || body.error?.type || '';
    console.log(`  ${key.name}: HTTP ${response.status} ${reason} ${String(body.error?.message || '').slice(0, 160)}`);
    if (SWITCH_ON.has(response.status) && keys.length > 1) {
      keyIndex = (keyIndex + 1) % keys.length;
      console.log(`  switching to ${keys[keyIndex].name}`);
      continue;
    }
    throw new Error(`Image request failed for ${job.id}`);
  }
  throw new Error(`Every key was refused for ${job.id}`);
}

const log = [];
for (const job of config.jobs) {
  if (only.length && !only.includes(job.id)) continue;
  console.log(`${job.id}: requesting ${job.size}`);
  const started = Date.now();
  const { body, keyName } = await callApi(job);
  const item = body.data[0];
  const png = item.b64_json ? Buffer.from(item.b64_json, 'base64') : Buffer.from(await (await fetch(item.url)).arrayBuffer());
  const version = job.version ? `-v${job.version}` : '';
  const masterPath = path.join(masterDir, `${job.id}${version}.png`);
  writeFileSync(masterPath, png);
  const meta = await sharp(png).metadata();
  console.log(`  saved master ${meta.width}x${meta.height} in ${Math.round((Date.now() - started) / 1000)}s with ${keyName}; tokens: ${JSON.stringify(body.usage || {})}`);
  for (const output of job.outputs) {
    const file = path.join(outDir, `${output.name}.webp`);
    await sharp(png)
      .resize(output.width, output.height, { fit: 'cover', position: output.position || 'centre' })
      .webp({ quality: output.quality || 80, effort: 6 })
      .toFile(file);
    const out = await sharp(file).metadata();
    console.log(`  ${output.name}.webp ${out.width}x${out.height} ${Math.round(out.size / 1024)} KB`);
    log.push({ job: job.id, file: `${output.name}.webp`, width: out.width, height: out.height, kb: Math.round(out.size / 1024) });
  }
}
const logFile = path.join(outDir, '_last-run.json');
writeFileSync(logFile, JSON.stringify(log, null, 2));
if (!existsSync(logFile)) process.exit(1);
