// Imports the rewritten blog posts in ../blog-import/*.md into the store's blog.
// Each file has front matter (handle, title, dates, tags, image, Google fields)
// and an HTML body; {{file:<name>}} in the body is a picture from images-optimized/.
//
//   node import-blog.mjs plan              read only: what exists, what would change
//   node import-blog.mjs upload            upload the pictures that are not in Files yet
//   node import-blog.mjs create [--hidden] create the posts that do not exist yet
//
// Posts whose handle already exists are left alone, so every step is safe to run again.
// Results go to ../import/blog-import-log.json.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const STORE = 'https-xomoashro-com-fcrv98st.myshopify.com';
const BLOG_ID = 'gid://shopify/Blog/100614832300';
const build = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postDir = path.join(build, 'blog-import');
const imageDir = path.join(build, 'images-optimized');
const logFile = path.join(build, 'import/blog-import-log.json');
const queries = {
  files: path.join(build, 'store-setup/files-by-name.graphql'),
  fileById: path.join(build, 'store-setup/file-by-id.graphql'),
  staged: path.join(build, 'store-setup/staged-uploads-create.graphql'),
  fileCreate: path.join(build, 'store-setup/file-create.graphql'),
  articles: path.join(build, 'import/blog-articles.graphql'),
  articleCreate: path.join(build, 'store-setup/article-create.graphql'),
};

const mode = process.argv[2] ?? 'plan';
const hidden = process.argv.includes('--hidden');
const log = existsSync(logFile) ? JSON.parse(readFileSync(logFile, 'utf8')) : { files: {}, articles: {} };
const saveLog = () => writeFileSync(logFile, `${JSON.stringify(log, null, 2)}\n`);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function execute(queryFile, variables, mutation = false) {
  const args = ['store', 'execute', '--store', STORE, '--json', '--query-file', queryFile];
  if (variables) args.push('--variables', JSON.stringify(variables));
  if (mutation) args.push('--allow-mutations');
  const stdout = execFileSync('shopify', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, SHOPIFY_CLI_AGENT_INFO: 'n:claude-code|v:none|p:anthropic|m:claude-opus-5-5' },
  });
  const json = stdout.split('\n').filter((line) => line.trim() && !line.startsWith('{"type":"progress"') && !line.includes('claude-code-hint')).join('\n');
  const parsed = JSON.parse(json);
  return parsed.data ?? parsed;
}

/** Reads a post file: simple `key: value` front matter, `[a, b]` lists, then the HTML body. */
function readPost(file) {
  const text = readFileSync(path.join(postDir, file), 'utf8');
  const [, head, body] = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  for (const line of head.split('\n')) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (value.startsWith('[')) value = value.slice(1, -1).split(',').map((item) => item.trim()).filter(Boolean);
    else if (value.startsWith('"')) value = JSON.parse(value);
    meta[match[1]] = value;
  }
  const pictures = new Map([[meta.image, meta.image_alt]]);
  for (const [, name, alt] of body.matchAll(/<img src="\{\{file:([^}]+)\}\}" alt="([^"]*)"/g)) pictures.set(name, alt);
  return { meta, body: body.trim(), pictures };
}

const posts = readdirSync(postDir).filter((file) => file.endsWith('.md')).sort().map(readPost);

function existingArticles() {
  const nodes = execute(queries.articles, { id: BLOG_ID }).blog.articles.nodes;
  return new Map(nodes.map((node) => [node.handle, node]));
}

function fileInStore(name) {
  const nodes = execute(queries.files, { query: `filename:'${name}'` }).files.nodes;
  return nodes.find((node) => node.image?.url?.includes(`/${name}`)) ?? null;
}

async function upload(name, alt) {
  const file = path.join(imageDir, name);
  const staged = execute(queries.staged, {
    input: [{ filename: name, mimeType: 'image/webp', resource: 'IMAGE', httpMethod: 'POST', fileSize: String(statSync(file).size) }],
  }, true).stagedUploadsCreate;
  if (staged.userErrors.length) throw new Error(`${name}: ${JSON.stringify(staged.userErrors)}`);
  const target = staged.stagedTargets[0];
  const form = new FormData();
  for (const parameter of target.parameters) form.append(parameter.name, parameter.value);
  form.append('file', new Blob([readFileSync(file)], { type: 'image/webp' }), name);
  const response = await fetch(target.url, { method: 'POST', body: form });
  if (!response.ok) throw new Error(`${name}: upload refused with HTTP ${response.status}`);

  const created = execute(queries.fileCreate, {
    files: [{ originalSource: target.resourceUrl, alt, contentType: 'IMAGE', filename: name, duplicateResolutionMode: 'REPLACE' }],
  }, true).fileCreate;
  if (created.userErrors.length) throw new Error(`${name}: ${JSON.stringify(created.userErrors)}`);
  let node;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await wait(2000);
    node = execute(queries.fileById, { id: created.files[0].id }).node;
    if (node.fileStatus === 'READY' || node.fileStatus === 'FAILED') break;
  }
  if (node.fileStatus !== 'READY') throw new Error(`${name}: ${node.fileStatus} ${JSON.stringify(node.fileErrors)}`);
  return node;
}

function articleInput({ meta, body, pictures }) {
  const url = (name) => {
    const entry = log.files[name];
    if (!entry) throw new Error(`${name} is not uploaded yet: run "upload" first`);
    return entry.url;
  };
  const input = {
    blogId: BLOG_ID,
    title: meta.title,
    handle: meta.handle,
    author: { name: meta.author },
    body: body.replace(/\{\{file:([^}]+)\}\}/g, (_, name) => url(name)),
    summary: `<p>${meta.summary}</p>`,
    tags: meta.tags,
    image: { url: url(meta.image), altText: pictures.get(meta.image) },
    isPublished: !hidden,
    publishDate: meta.published,
    metafields: [
      { namespace: 'global', key: 'title_tag', type: 'single_line_text_field', value: meta.seo_title },
      { namespace: 'global', key: 'description_tag', type: 'single_line_text_field', value: meta.seo_description },
    ],
  };
  if (meta.template_suffix) input.templateSuffix = meta.template_suffix;
  return input;
}

if (mode === 'plan') {
  const articles = existingArticles();
  const names = new Map();
  for (const post of posts) for (const [name, alt] of post.pictures) names.set(name, alt);
  console.log(`Posts: ${posts.length} (${posts.filter((post) => articles.has(post.meta.handle)).length} already in the store)`);
  for (const post of posts) {
    const state = articles.has(post.meta.handle) ? 'exists, skipped' : `create, ${hidden ? 'hidden' : 'published'}`;
    console.log(`  ${post.meta.handle}: ${state}; ${post.pictures.size} picture(s); tags ${post.meta.tags.join(', ')}${post.meta.template_suffix ? `; design ${post.meta.template_suffix}` : ''}`);
  }
  console.log(`Pictures: ${names.size}`);
  for (const [name] of names) {
    const inStore = log.files[name] ?? fileInStore(name);
    console.log(`  ${name}: ${inStore ? 'in Files' : 'to upload'} (${Math.round(statSync(path.join(imageDir, name)).size / 1024)} KB)`);
  }
} else if (mode === 'upload') {
  for (const post of posts) {
    for (const [name, alt] of post.pictures) {
      if (log.files[name]) continue;
      const found = fileInStore(name) ?? (await upload(name, alt));
      log.files[name] = { id: found.id, url: found.image.url, width: found.image.width, height: found.image.height };
      saveLog();
      console.log(`file ${name} ${found.image.width}x${found.image.height}`);
    }
  }
} else if (mode === 'create') {
  const articles = existingArticles();
  for (const post of posts) {
    if (articles.has(post.meta.handle)) {
      console.log(`skip ${post.meta.handle}: already in the store`);
      continue;
    }
    const result = execute(queries.articleCreate, { article: articleInput(post) }, true).articleCreate;
    if (result.userErrors.length) throw new Error(`${post.meta.handle}: ${JSON.stringify(result.userErrors)}`);
    log.articles[post.meta.handle] = { id: result.article.id, published: result.article.isPublished };
    saveLog();
    console.log(`created ${post.meta.handle} (${result.article.isPublished ? 'published' : 'hidden'})`);
  }
} else {
  console.error('Usage: node import-blog.mjs plan | upload | create [--hidden]');
  process.exit(1);
}
