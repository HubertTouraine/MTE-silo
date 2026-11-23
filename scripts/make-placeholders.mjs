// Génère des images provisoires (tôle galvanisée + mention « À REMPLACER »)
// pour que le site fonctionne avant l'import des vraies photos.
// Usage : npm run images:placeholders  (n'écrase pas les images existantes, sauf avec --force)
import fs from 'node:fs';
import sharp from 'sharp';

const force = process.argv.includes('--force');
const photos = [
  ['src/assets/images/silos-orage.jpg', 2400, 1032, 'Photo silos sous ciel d’orage'],
  ['src/assets/images/chantier-sechoir.jpg', 900, 1200, 'Photo séchoir'],
  ['src/assets/images/chantier-batiment-depoussierage.jpg', 1600, 1000, 'Photo bâtiment / dépoussiérage'],
  ['src/assets/images/chantier-tour-manutention.jpg', 900, 1200, 'Photo tour de manutention'],
  ['src/assets/images/chantier-silos-aerien.jpg', 1600, 900, 'Photo aérienne silos en construction'],
];

const stripes = (w, h) => {
  let s = '';
  for (let x = 0; x < w; x += 24) s += `<rect x="${x}" y="0" width="12" height="${h}" fill="#ffffff" opacity="0.06"/>`;
  return s;
};

for (const [out, w, h, label] of photos) {
  if (fs.existsSync(out) && !force) continue;
  const fs1 = Math.round(Math.min(w, h) / 14);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3a434b"/><stop offset="0.55" stop-color="#8b96a0"/><stop offset="1" stop-color="#c9d0d6"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>${stripes(w, h)}
  <text x="50%" y="47%" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="${fs1}" fill="#ffffff">${label}</text>
  <text x="50%" y="${47 + 9}%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(fs1 * 0.6)}" fill="#ffffff">À REMPLACER – déposer dans assets-source/</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 70 }).toFile(out);
  console.log('placeholder', out);
}

// Logo provisoire : simple texte, à remplacer impérativement par le fichier officiel.
const logo = 'src/assets/brand/logo-mte.png';
if (!fs.existsSync(logo) || force) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="300" y="150" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="160" fill="#ffffff" stroke="#D0141E" stroke-width="8" letter-spacing="10">MTE</text>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(logo);
  console.log('placeholder', logo);
}
