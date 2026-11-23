// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeTodo from './scripts/rehype-todo.mjs';

// URL de production : à adapter si le domaine change (utilisée pour le sitemap, les canonical et Open Graph).
const SITE_URL = process.env.SITE_URL || 'https://www.mte-silo.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/merci'),
      i18n: undefined,
    }),
  ],
  markdown: { rehypePlugins: [rehypeTodo] },
  image: {
    responsiveStyles: true,
  },
  vite: {
    // Cast : décalage de types entre la version de Vite de Tailwind et celle d’Astro (sans impact au runtime)
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
