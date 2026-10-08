// Restages the real product and mountain photographs from the old site for the new
// homepage, without any image-generation service: the bottle itself is not redrawn,
// only cut out, placed on a designed backdrop and given a shadow.
//
//   node compose-homepage-images.mjs
//
// Output: ../images-generated/*.webp (ready for Shopify Files).
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { repoRoot } from './openai-keys.mjs';

const src = path.join(repoRoot, 'theme-context/wordpress-site/assets/images');
const out = path.join(repoRoot, 'theme-context/_build/images-generated');
mkdirSync(out, { recursive: true });

const svg = (width, height, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`);

async function save(image, name, quality = 82) {
  const file = path.join(out, `${name}.webp`);
  await image.webp({ quality, effort: 6 }).toFile(file);
  const meta = await sharp(file).metadata();
  console.log(`${name}.webp ${meta.width}x${meta.height} ${Math.round(meta.size / 1024)} KB`);
}

// 1. Hero: the real bottle with raw resin and leaves on a warm studio stage.
async function hero() {
  const W = 1200;
  const H = 1500;
  const groupWidth = 1010;
  const cutout = await sharp(path.join(src, 'xomoashro_pure_Himaliyan_shilajit.png'))
    .extract({ left: 20, top: 70, width: 700, height: 306 })
    .resize({ width: groupWidth, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8 })
    .png()
    .toBuffer();
  const group = await sharp(cutout).metadata();
  const floorY = 1150;
  const left = Math.round((W - groupWidth) / 2);
  const top = floorY + 46 - group.height;
  const jarCentre = left + Math.round(groupWidth * 0.489);

  const backdrop = svg(W, H, `
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F3ECE0"/><stop offset="1" stop-color="#E9DDCA"/>
      </linearGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#DFD0B9"/><stop offset="1" stop-color="#D2BFA3"/>
      </linearGradient>
      <radialGradient id="sun" cx="0.38" cy="0.32" r="0.75">
        <stop offset="0" stop-color="#FF8A55"/><stop offset="1" stop-color="#F2551C"/>
      </radialGradient>
      <radialGradient id="glow" cx="0.5" cy="0.7" r="0.5">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.55"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#wall)"/>
    <circle cx="${jarCentre + 70}" cy="${top - 40}" r="345" fill="url(#sun)"/>
    <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#floor)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  `);
  const softEdge = await sharp(svg(W, H, `<rect y="${floorY - 3}" width="${W}" height="6" fill="#CDB999"/>`)).blur(5).png().toBuffer();
  const wideShadow = await sharp(svg(W, H, `<ellipse cx="${W / 2}" cy="${floorY + 44}" rx="455" ry="34" fill="#2A1C0E" fill-opacity="0.42"/>`)).blur(24).png().toBuffer();
  const contactShadow = await sharp(svg(W, H, `<ellipse cx="${jarCentre}" cy="${floorY + 40}" rx="238" ry="17" fill="#120B05" fill-opacity="0.62"/>`)).blur(9).png().toBuffer();

  const composed = await sharp(backdrop)
    .composite([
      { input: softEdge },
      { input: wideShadow },
      { input: contactShadow },
      { input: cutout, left, top },
    ])
    .png()
    .toBuffer();

  await save(sharp(composed), 'xomoashro-pure-himalayan-shilajit-resin-jar');
  await save(sharp(composed).extract({ left: 0, top: 260, width: W, height: W }), 'xomoashro-pure-himalayan-shilajit-resin-jar-square');
}

// 2. Benefits banner: the studio photograph, warmed to the page colour. Not enlarged.
async function benefits() {
  const band = await sharp(path.join(src, 'product_shot-1.png')).extract({ left: 0, top: 96, width: 1344, height: 576 }).png().toBuffer();
  const warmed = await sharp(band)
    .composite([{ input: svg(1344, 576, '<rect width="1344" height="576" fill="#F1E8DA"/>'), blend: 'multiply' }])
    .png()
    .toBuffer();
  await save(sharp(warmed), 'xomoashro-shilajit-jar-with-raw-resin', 84);
}

// 3. Statement background: the dark mountain photograph, as it is.
async function statement() {
  await save(sharp(path.join(src, 'Rectangle-39358.jpg')), 'xomoashro-himalayan-peaks-dark-sky', 78);
}

// 4. Source story: the mountain photograph made into a tall picture by continuing
//    its plain sky upward and its dark ridge downward.
async function source() {
  const W = 1200;
  const H = 1440;
  const bandHeight = 536;
  const skyHeight = 540;
  const groundHeight = H - skyHeight - bandHeight;
  const band = await sharp(path.join(src, 'Rectangle-145.jpg'))
    .resize({ height: bandHeight, kernel: 'lanczos3' })
    .extract({ left: 300, top: 0, width: W, height: bandHeight })
    .sharpen({ sigma: 0.6 })
    .png()
    .toBuffer();
  const sky = await sharp(band).extract({ left: 0, top: 0, width: W, height: 6 }).resize(W, skyHeight, { fit: 'fill' }).blur(14).png().toBuffer();
  const ground = await sharp(band).extract({ left: 0, top: bandHeight - 6, width: W, height: 6 }).resize(W, groundHeight, { fit: 'fill' }).blur(30).png().toBuffer();
  const shade = svg(W, H, `
    <defs>
      <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0B0F14" stop-opacity="0.5"/><stop offset="0.45" stop-color="#0B0F14" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.66" stop-color="#0A0908" stop-opacity="0"/><stop offset="0.8" stop-color="#0A0908" stop-opacity="0.72"/><stop offset="1" stop-color="#0A0908" stop-opacity="0.96"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#top)"/>
    <rect width="${W}" height="${H}" fill="url(#bottom)"/>
  `);
  // Fine grain hides the stripes that a smooth, compressed sky would otherwise show.
  const grain = await sharp({ create: { width: W, height: H, channels: 3, background: '#808080', noise: { type: 'gaussian', mean: 128, sigma: 9 } } })
    .greyscale()
    .png()
    .toBuffer();
  const composed = await sharp({ create: { width: W, height: H, channels: 3, background: '#20262c' } })
    .composite([
      { input: sky, left: 0, top: 0 },
      { input: band, left: 0, top: skyHeight },
      { input: ground, left: 0, top: skyHeight + bandHeight },
      { input: shade },
      { input: grain, blend: 'soft-light' },
    ])
    .png()
    .toBuffer();
  await save(sharp(composed), 'xomoashro-himalayan-mountain-range', 80);
}

// 5. Customer photographs, unchanged apart from the file format.
async function customers() {
  await save(sharp(path.join(src, 'Abdullah.png')), 'xomoashro-customer-abdullah', 86);
  await save(sharp(path.join(src, 'Taimoor.png')), 'xomoashro-customer-taimoor-khan', 86);
}

// 6. Hero (approved design, 2026-10-07): the owner's own picture of the bottle on a
//    rock in front of the mountains. Only resized and cropped; nothing is redrawn.
async function heroScene() {
  const file = path.join(repoRoot, 'theme-context/wordpress-site/assets/salajit.png');
  await save(sharp(file), 'xomoashro-shilajit-jar-on-mountain-rock', 84);
  await save(sharp(file).extract({ left: 486, top: 40, width: 1100, height: 900 }), 'xomoashro-shilajit-jar-on-mountain-rock-phone', 82);
}

await hero();
await heroScene();
await benefits();
await statement();
await source();
await customers();
