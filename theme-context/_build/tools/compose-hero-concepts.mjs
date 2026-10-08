// Stand-in pictures for the hero concepts, made from the real studio photograph
// of the bottle (no picture-generation service). The bottle is cut out with its
// own soft shadow and has no box behind it.
//
//   node compose-hero-concepts.mjs
//
// Output: ../previews/hero-concepts/img/
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { repoRoot } from './openai-keys.mjs';

const src = path.join(repoRoot, 'theme-context/wordpress-site/assets/images');
const out = path.join(repoRoot, 'theme-context/_build/previews/hero-concepts/img');
mkdirSync(out, { recursive: true });

const svg = (width, height, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`);

// Removes the white studio background and turns the photograph's own grey shadow into
// a see-through dark shadow, so the bottle sits naturally on any colour. Starting from
// the edges of the photograph it spreads through white and neutral grey only; it stops
// at the bottle, the resin and the leaves. The bottle itself is fenced off first, so
// the grey lid and the white lettering are never touched.
async function cutOut(file, { white = 250, darkest = 70, neutral = 26, floorGaps = [] } = {}) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const count = width * height;
  const min = new Uint8Array(count);
  const spread = new Uint8Array(count);
  for (let i = 0; i < count; i += 1) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    min[i] = Math.min(r, g, b);
    spread[i] = Math.max(r, g, b) - min[i];
  }

  // Fence: the bottle's outline, found by scanning the photograph.
  const midRow = Math.round(height * 0.42);
  let jarLeft = 0;
  let jarRight = width - 1;
  for (let x = Math.round(width / 2); x > 0; x -= 1) {
    if (min[midRow * width + x] > 200) { jarLeft = x + 1; break; }
  }
  for (let x = Math.round(width / 2); x < width; x += 1) {
    if (min[midRow * width + x] > 200) { jarRight = x - 1; break; }
  }
  let jarBottom = 0;
  for (let y = height - 1; y > 0; y -= 1) {
    if (min[y * width + Math.round((jarLeft + jarRight) / 2)] < 60) { jarBottom = y; break; }
  }
  const fenced = new Uint8Array(count);
  for (let x = jarLeft; x <= jarRight; x += 1) {
    let top = 0;
    for (let y = 0; y < height; y += 1) {
      if (min[y * width + x] < 225) { top = y; break; }
    }
    for (let y = top + 2; y <= jarBottom; y += 1) {
      const index = y * width + x;
      // Below the label the bottle's base curves upward at the sides; white seen there is floor.
      const floorBelowBase = y > jarBottom - 32 && min[index] >= 150 && spread[index] <= neutral;
      if (!floorBelowBase) fenced[index] = 1;
    }
  }

  // Everything the background could be: white or neutral grey, outside the fence.
  const passable = new Uint8Array(count);
  for (let i = 0; i < count; i += 1) {
    if (!fenced[i] && min[i] >= darkest && spread[i] <= neutral) passable[i] = 1;
  }
  // Glossy highlights on the resin are neutral too, and touch the outline in places.
  // Shrinking the area before spreading closes those narrow gaps; growing it again
  // afterwards restores the true edge.
  const morph = (source, radius, grow) => {
    const result = new Uint8Array(count);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        let hit = !grow;
        for (let dy = -radius; dy <= radius && hit !== grow; dy += 1) {
          const yy = Math.min(height - 1, Math.max(0, y + dy));
          for (let dx = -radius; dx <= radius; dx += 1) {
            const xx = Math.min(width - 1, Math.max(0, x + dx));
            if (Boolean(source[yy * width + xx]) === grow) { hit = grow; break; }
          }
        }
        result[y * width + x] = hit ? 1 : 0;
      }
    }
    return result;
  };
  const shrunk = morph(passable, 3, false);
  const core = new Uint8Array(count);
  const queue = [];
  const push = (index) => {
    if (!core[index] && shrunk[index]) {
      core[index] = 1;
      queue.push(index);
    }
  };
  for (let x = 0; x < width; x += 1) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    push(y * width);
    push(y * width + width - 1);
  }
  while (queue.length) {
    const index = queue.pop();
    const x = index % width;
    if (x > 0) push(index - 1);
    if (x < width - 1) push(index + 1);
    if (index >= width) push(index - width);
    if (index < width * (height - 1)) push(index + width);
  }
  const grown = morph(core, 4, true);
  const background = new Uint8Array(count);
  for (let i = 0; i < count; i += 1) background[i] = grown[i] && passable[i] ? 1 : 0;

  // Pockets of floor closed in between the leaves, the resin and the bottle: large and
  // nearly white, unlike the small highlights on the resin.
  const seen = new Uint8Array(count);
  for (let start = 0; start < count; start += 1) {
    if (seen[start] || background[start] || !passable[start]) continue;
    const members = [start];
    seen[start] = 1;
    let white = 0;
    for (let cursor = 0; cursor < members.length; cursor += 1) {
      const index = members[cursor];
      if (min[index] >= 185) white += 1;
      const x = index % width;
      const neighbours = [];
      if (x > 0) neighbours.push(index - 1);
      if (x < width - 1) neighbours.push(index + 1);
      if (index >= width) neighbours.push(index - width);
      if (index < width * (height - 1)) neighbours.push(index + width);
      for (const next of neighbours) {
        if (!seen[next] && !background[next] && passable[next]) {
          seen[next] = 1;
          members.push(next);
        }
      }
    }
    // Floor is light almost everywhere; a highlight on the resin is mostly mid-grey.
    if (white >= 60 && white / members.length >= 0.6) {
      for (const index of members) background[index] = 1;
    }
  }

  // Known gaps in this photograph that the rules above leave: floor showing between
  // the leaves and the bottle's base.
  for (const gap of floorGaps) {
    for (let y = gap.top; y <= gap.bottom; y += 1) {
      for (let x = gap.left; x <= gap.right; x += 1) {
        const index = y * width + x;
        if (passable[index] || (min[index] >= 150 && spread[index] <= neutral)) background[index] = 1;
      }
    }
  }

  const rgba = Buffer.alloc(count * 4);
  for (let i = 0; i < count; i += 1) {
    if (background[i]) {
      rgba[i * 4] = 20;
      rgba[i * 4 + 1] = 16;
      rgba[i * 4 + 2] = 13;
      rgba[i * 4 + 3] = Math.round(255 * Math.max(0, Math.min(1, (white - min[i]) / white)));
    } else {
      rgba[i * 4] = data[i * 3];
      rgba[i * 4 + 1] = data[i * 3 + 1];
      rgba[i * 4 + 2] = data[i * 3 + 2];
      rgba[i * 4 + 3] = 255;
    }
  }
  console.log(`cut out: bottle fenced at x ${jarLeft}-${jarRight}, bottom ${jarBottom}`);
  return sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

const cut = await cutOut(path.join(src, 'product_shot-1.png'), { floorGaps: [{ left: 366, top: 500, right: 512, bottom: 556 }] });
// The group (bottle, resin, leaves) with a little room for its shadow.
const group = await sharp(cut).extract({ left: 150, top: 200, width: 1000, height: 420 }).png().toBuffer();
const groupLarge = await sharp(group).resize({ width: 1500, kernel: 'lanczos3' }).sharpen({ sigma: 0.7 }).png().toBuffer();
const groupMeta = await sharp(groupLarge).metadata();

// 1. Light concepts: the bottle alone, see-through background.
await sharp(groupLarge).webp({ quality: 88, alphaQuality: 90, effort: 6 }).toFile(path.join(out, 'bottle-cutout.webp'));
console.log(`bottle-cutout.webp ${groupMeta.width}x${groupMeta.height}`);

// 2. Dark concept: the bottle on obsidian black with a soft light behind and a reflection.
{
  const W = 2000;
  const H = 1250;
  const bottleWidth = 1120;
  const bottle = await sharp(group).resize({ width: bottleWidth, kernel: 'lanczos3' }).sharpen({ sigma: 0.7 }).png().toBuffer();
  const meta = await sharp(bottle).metadata();
  const left = 800;
  const floor = 900;
  const top = floor - Math.round(meta.height * 0.86);
  const fade = svg(bottleWidth, meta.height, `
    <defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.34"/><stop offset="0.55" stop-color="#fff" stop-opacity="0"/>
    </linearGradient></defs>
    <rect width="${bottleWidth}" height="${meta.height}" fill="url(#f)"/>`);
  const reflection = await sharp(bottle)
    .flip()
    .composite([{ input: fade, blend: 'dest-in' }])
    .blur(2.2)
    .png()
    .toBuffer();
  const stage = svg(W, H, `
    <defs>
      <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#E9E2D6" stop-opacity="0.30"/><stop offset="0.55" stop-color="#C9B9A2" stop-opacity="0.10"/><stop offset="1" stop-color="#0B0B0D" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="warm" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#C77A45" stop-opacity="0.16"/><stop offset="1" stop-color="#0B0B0D" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1B1B1F"/><stop offset="1" stop-color="#0B0B0D"/>
      </linearGradient>
      <linearGradient id="left" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#0B0B0D"/><stop offset="0.34" stop-color="#0B0B0D"/><stop offset="0.62" stop-color="#0B0B0D" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#0B0B0D"/>
    <ellipse cx="${left + bottleWidth * 0.5}" cy="${floor - 300}" rx="760" ry="560" fill="url(#glow)"/>
    <ellipse cx="${left + bottleWidth * 0.78}" cy="${floor - 180}" rx="520" ry="380" fill="url(#warm)"/>
    <rect y="${floor - 40}" width="${W}" height="${H - floor + 40}" fill="url(#floor)"/>
    <rect width="${W}" height="${H}" fill="url(#left)"/>`);
  const horizon = await sharp(svg(W, H, `<rect x="${left - 200}" y="${floor - 42}" width="${W}" height="3" fill="#3A3A40"/>`)).blur(3).png().toBuffer();
  const composed = await sharp(stage)
    .composite([
      { input: horizon },
      { input: reflection, left, top: top + Math.round(meta.height * 0.8) },
      { input: bottle, left, top },
    ])
    .png()
    .toBuffer();
  await sharp(composed).webp({ quality: 84, effort: 6 }).toFile(path.join(out, 'bottle-obsidian.webp'));
  console.log(`bottle-obsidian.webp ${W}x${H}`);
}

// 3. Mountain band for the centred concept: the real photograph, unchanged.
await sharp(path.join(src, 'Rectangle-39358.jpg')).webp({ quality: 80, effort: 6 }).toFile(path.join(out, 'mountains-dark.webp'));
console.log('mountains-dark.webp 1512x464');
