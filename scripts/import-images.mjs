// Importe et optimise les visuels déposés dans assets-source/.
// Usage : npm run images:import
// - redimensionne (largeur max), corrige l'orientation EXIF, supprime les métadonnées ;
// - découpe automatiquement les photos manquantes dans la bannière ;
// - régénère le favicon et l'image Open Graph.
// La conversion WebP + tailles responsives est ensuite faite au build par astro:assets.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGES, BANNER } from './images.config.mjs';

const SRC = 'assets-source';
const EXT = ['.png', '.jpg', '.jpeg', '.webp', '.tif', '.tiff', '.avif'];

const files = fs.existsSync(SRC) ? fs.readdirSync(SRC) : [];
const find = (names) => {
  for (const n of names) {
    const hit = files.find((f) => {
      const p = path.parse(f);
      return p.name.toLowerCase() === n.toLowerCase() && EXT.includes(p.ext.toLowerCase());
    });
    if (hit) return path.join(SRC, hit);
  }
  return null;
};

const bannerPath = find([BANNER, 'banniere', 'banner', 'bandeau']);
let bannerMeta = null;
if (bannerPath) bannerMeta = await sharp(bannerPath).rotate().metadata();

let done = 0;
for (const img of IMAGES) {
  const direct = find(img.sources);
  let pipeline;
  if (direct) {
    pipeline = sharp(direct).rotate();
    console.log(`✔ ${img.out}  ←  ${direct}`);
  } else if (img.bannerCrop && bannerPath) {
    const { width: W, height: H } = bannerMeta;
    const c = img.bannerCrop;
    pipeline = sharp(bannerPath).rotate().extract({
      left: Math.round(c.left * W),
      top: Math.round(c.top * H),
      width: Math.round(c.width * W),
      height: Math.round(c.height * H),
    });
    console.log(`✔ ${img.out}  ←  découpe de ${bannerPath}`);
  } else {
    console.log(`… ${img.out}  : aucune source trouvée, image actuelle conservée`);
    continue;
  }
  if (img.trim) pipeline = sharp(await pipeline.toBuffer()).trim({ threshold: 20 });
  pipeline = pipeline.resize({ width: img.maxWidth, withoutEnlargement: true });
  pipeline = img.format === 'png' ? pipeline.png({ compressionLevel: 9 }) : pipeline.jpeg({ quality: 85, mozjpeg: true });
  await pipeline.toFile(img.out);
  done++;
}

// Favicon + apple-touch-icon à partir du logo
const logo = 'src/assets/brand/logo-mte.png';
if (fs.existsSync(logo)) {
  const trimmed = await sharp(logo).trim().toBuffer();
  const square = (size) =>
    sharp(trimmed)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .flatten({ background: '#ffffff' })
      .png();
  await square(180).toFile('public/apple-touch-icon.png');
  await square(48).toFile('public/favicon.png');
}

// Image Open Graph 1200 × 630 (photo principale)
const hero = 'src/assets/images/silos-orage.jpg';
if (fs.existsSync(hero)) {
  await sharp(hero).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og-mte.jpg');
}

console.log(`\n${done} image(s) importée(s). Lancez « npm run dev » pour vérifier.`);
