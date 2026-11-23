// Correspondance entre les fichiers déposés dans assets-source/ et les images utilisées par le site.
// Si une photo de chantier dédiée est absente, elle est découpée dans la bannière
// (zones exprimées en fractions de la largeur / hauteur de la bannière d'origine 2000 × 1351).
export const BANNER = 'banniere-silos-orage';

export const IMAGES = [
  {
    out: 'src/assets/brand/logo-mte.png',
    sources: ['logo-mte', 'logo', 'logo_mte', 'MTE'],
    format: 'png',
    trim: true, // retire les marges blanches autour du logo
    maxWidth: 800,
  },
  {
    out: 'src/assets/images/silos-orage.jpg',
    sources: ['silos-orage', 'photo-silos-orage'],
    // Photo principale extraite de la bannière (sous le logo, au-dessus des vignettes)
    bannerCrop: { left: 0, top: 0.182, width: 1, height: 0.43 },
    maxWidth: 2400,
  },
  {
    out: 'src/assets/images/chantier-sechoir.jpg',
    sources: ['chantier-sechoir', 'sechoir'],
    bannerCrop: { left: 0.015, top: 0.616, width: 0.14, height: 0.274 },
    maxWidth: 1600,
  },
  {
    out: 'src/assets/images/chantier-batiment-depoussierage.jpg',
    sources: ['chantier-batiment', 'batiment', 'chantier-depoussierage'],
    bannerCrop: { left: 0.176, top: 0.616, width: 0.312, height: 0.274 },
    maxWidth: 1600,
  },
  {
    out: 'src/assets/images/chantier-tour-manutention.jpg',
    sources: ['chantier-tour-manutention', 'tour-manutention', 'manutention'],
    bannerCrop: { left: 0.51, top: 0.616, width: 0.12, height: 0.274 },
    maxWidth: 1600,
  },
  {
    out: 'src/assets/images/chantier-silos-aerien.jpg',
    sources: ['chantier-silos-aerien', 'vue-aerienne', 'aerien'],
    bannerCrop: { left: 0.65, top: 0.616, width: 0.335, height: 0.274 },
    maxWidth: 1600,
  },
];
