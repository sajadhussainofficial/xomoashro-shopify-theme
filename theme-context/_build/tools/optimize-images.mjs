// Converts the reusable images listed in ../image-manifest.csv to WebP in ../images-optimized/.
// Originals in ../../wordpress-site/ are only read, never changed.
// Usage: npm run optimize-images   (from theme-context/_build/tools)
import { readFile, writeFile, mkdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.resolve(here, '..');
const contextDir = path.resolve(buildDir, '..');
const outDir = path.join(buildDir, 'images-optimized');

const MAX_WIDTH_HERO = 2400;
const MAX_WIDTH_DEFAULT = 1600;
const WEBP_QUALITY = 82;

// Minimal CSV parser: handles quoted fields with commas and doubled quotes.
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

const manifest = parseCsv(await readFile(path.join(buildDir, 'image-manifest.csv'), 'utf8'));
const todo = manifest.filter((r) => r.reuse === 'yes' && r.new_filename);
await mkdir(outDir, { recursive: true });

const log = [['new_filename', 'original_path', 'original_kb', 'optimized_kb', 'original_size', 'optimized_size', 'note']];
for (const r of todo) {
  const src = path.join(contextDir, r.original_path);
  const dest = path.join(outDir, r.new_filename);
  const before = (await stat(src)).size;
  if (r.new_filename.endsWith('.svg')) {
    await copyFile(src, dest);
    log.push([r.new_filename, r.original_path, Math.round(before / 1024), Math.round(before / 1024), '', '', 'SVG copied unchanged']);
    continue;
  }
  const maxWidth = /hero/i.test(r.intended_use) ? MAX_WIDTH_HERO : MAX_WIDTH_DEFAULT;
  const image = sharp(src, { failOn: 'none' });
  const meta = await image.metadata();
  const info = await image
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(dest);
  log.push([
    r.new_filename, r.original_path, Math.round(before / 1024), Math.round(info.size / 1024),
    `${meta.width}x${meta.height}`, `${info.width}x${info.height}`,
    info.size > before ? 'larger than original (source already compressed)' : '',
  ]);
}

const csv = log.map((row) => row.map((v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v)).join(',')).join('\n') + '\n';
await writeFile(path.join(outDir, '_optimization-log.csv'), csv);
const totalBefore = log.slice(1).reduce((a, r) => a + r[2], 0);
const totalAfter = log.slice(1).reduce((a, r) => a + r[3], 0);
console.log(`${todo.length} files written to images-optimized/ | ${totalBefore} KB -> ${totalAfter} KB`);
console.log('larger than original:', log.slice(1).filter((r) => r[6].startsWith('larger')).map((r) => r[0]).join(', ') || 'none');
