// Informations de l'entreprise : modifier ici, elles sont reprises partout sur le site.
export const SITE = {
  name: 'MTE',
  tagline: 'Créateur de silos',
  activity: 'Conceptions et installations d’équipements agricoles et agro-industriels',
  url: 'https://www.mte-silo.com',
  phone: '02 38 33 51 13',
  phoneHref: 'tel:+33238335113',
  phoneIntl: '+33 2 38 33 51 13',
  email: '', // [À COMPLÉTER] adresse email de contact (laisser vide pour la masquer)
  address: {
    street: '23 route de Briarres',
    postalCode: '45390',
    city: 'Puiseaux',
    department: 'Loiret',
    region: 'Centre-Val de Loire',
    country: 'FR',
  },
  geo: { lat: 48.2054, lon: 2.4729 },
  employees: '11 à 50 salariés',
  // Horaires : à compléter (format libre affiché sur la page Contact et le pied de page)
  hours: [] as { days: string; time: string }[],
};

// Formulaire de contact : 'netlify' (Netlify Forms) ou 'formspree' (+ PUBLIC_FORM_ENDPOINT)
export const FORM = {
  provider: (import.meta.env.PUBLIC_FORM_PROVIDER || 'netlify') as 'netlify' | 'formspree',
  endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
};

export const NAV = [
  { href: '/ingenierie-projets/', label: 'Ingénierie & projets' },
  { href: '/fournitures/', label: 'Fournitures' },
  { href: '/atelier-metallerie-chaudronnerie/', label: 'Atelier' },
  { href: '/installation-maintenance-depannage/', label: 'Maintenance & dépannage' },
  { href: '/clients/', label: 'Nos clients' },
  { href: '/realisations/', label: 'Réalisations' },
];

export const CATEGORIES = {
  silos: 'Silos',
  sechoirs: 'Séchoirs',
  manutention: 'Manutention',
  metallerie: 'Métallerie',
} as const;
export type Category = keyof typeof CATEGORIES;
