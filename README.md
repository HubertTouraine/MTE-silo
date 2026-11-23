# Site vitrine MTE – Créateur de silos

Site statique construit avec [Astro](https://astro.build) 5 et Tailwind CSS 4. Il n’a pas de backend et se déploie sur Netlify, Vercel ou OVH.

## Démarrage

Prérequis : Node.js 18.20 ou plus récent (22 recommandé).

```bash
npm install
npm run dev        # site de développement sur http://localhost:4321
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement avec rechargement automatique |
| `npm run build` | Génère le site final dans `dist/` |
| `npm run preview` | Sert localement le contenu de `dist/` pour vérification |
| `npm run check` | Vérifie les types et le contenu |
| `npm run images:import` | Importe et optimise les visuels de `assets-source/` |
| `npm run images:placeholders` | Recrée les images provisoires (ajouter `-- --force` pour écraser) |

## Arborescence

```
assets-source/            Fichiers source bruts (logo, bannière, photos) : non publiés tels quels
scripts/                  Import des images, plugin de surlignage « À COMPLÉTER »
public/                   Fichiers copiés tels quels (favicon, image Open Graph, .htaccess)
src/
  config.ts               Coordonnées, téléphone, horaires, menu, formulaire ← à modifier ici
  data/secteurs.ts        Textes des 6 secteurs clients
  assets/                 Images optimisées au build (WebP, tailles responsives)
  components/             Header, Footer, ServiceCard, CtaBanner, Gallery, Timeline, UrgenceBox…
  content/realisations/   Une réalisation = un fichier Markdown
  layouts/                Gabarit commun (SEO, Open Graph, JSON-LD LocalBusiness)
  pages/                  Une page = un fichier .astro (l’URL suit le nom du fichier)
  styles/global.css       Couleurs de la charte, typographies, boutons
```

## Modifier un texte

- **Téléphone, adresse, email, horaires** : `src/config.ts`. Les changements sont repris sur tout le site, données structurées comprises.
- **Texte d’une page** : ouvrir le fichier correspondant dans `src/pages/` (par exemple `fournitures.astro`) et modifier le texte entre les balises HTML. Ne pas toucher au code entre les `---` en haut du fichier, sauf les listes de textes qui y sont définies (familles d’équipements, étapes de la frise…).
- **Titre et description pour Google** : attributs `title` et `description` de `<BaseLayout>` en haut de chaque page.
- **Secteurs clients** : `src/data/secteurs.ts`.
- **Couleur rouge** : variable `--color-mte` dans `src/styles/global.css`.

Les éléments manquants s’affichent en jaune avec la mention `[À COMPLÉTER : …]`. La liste complète est dans [`A_COMPLETER.md`](./A_COMPLETER.md).

## Ajouter une réalisation

1. Copier la photo dans `src/assets/images/` (JPG ou PNG, 2000 px de large au maximum suffisent).
2. Créer un fichier `src/content/realisations/mon-chantier.md`. Le nom du fichier devient l’URL : `/realisations/mon-chantier/`.
3. Remplir l’en-tête, puis rédiger le texte en Markdown :

```markdown
---
title: "Silo de 2 000 t pour une coopérative"
description: "Phrase courte (170 caractères max), reprise dans la galerie et sur Google."
categories: ["silos", "manutention"]      # silos | sechoirs | manutention | metallerie
cover: "../../assets/images/ma-photo.jpg"
coverAlt: "Description de la photo pour les personnes malvoyantes"
lieu: "Commune (45)"
annee: "2025"
client: "Organisme stockeur"
order: 5                                  # ordre d'affichage (plus petit = en premier)
gallery:                                  # facultatif : photos supplémentaires
  - src: "../../assets/images/autre-photo.jpg"
    alt: "Description"
draft: false                              # true = masquée du site
---

Présentation du chantier…

## Le besoin
…
```

4. Lancer `npm run dev` pour vérifier. Le build refuse une réalisation à laquelle il manque un champ obligatoire, par exemple le texte alternatif de la photo.

## Remplacer les images provisoires

Déposer les fichiers dans `assets-source/` (noms attendus dans `assets-source/LISEZMOI.txt`), puis lancer :

```bash
npm run images:import
```

Le script redimensionne les images, retire les métadonnées, découpe la photo des silos et les vignettes dans la bannière si les photos séparées sont absentes, et régénère le favicon et l’image Open Graph. Les zones de découpe se règlent dans `scripts/images.config.mjs`. La conversion en WebP et les tailles responsives sont faites automatiquement au build.

## Formulaire de contact

Le fournisseur est choisi par variables d’environnement. Voir `.env.example` : copier ce fichier en `.env` en local, ou définir les variables dans l’interface de l’hébergeur.

- **Netlify Forms** (par défaut, `PUBLIC_FORM_PROVIDER=netlify`) : aucun réglage. Les messages apparaissent dans Netlify > Forms, où l’on peut activer les notifications par email. Ne fonctionne qu’une fois le site déployé sur Netlify.
- **Formspree** (`PUBLIC_FORM_PROVIDER=formspree`) : créer un formulaire sur formspree.io, puis renseigner `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx`. Ce mode fonctionne avec tous les hébergeurs (Vercel, OVH…).

Relancer le build après tout changement de ces variables.

## Déploiement

L’URL de production est définie par `SITE_URL` (par défaut `https://www.mte-silo.com`). Elle sert au sitemap, aux balises canonical et à Open Graph.

- **Netlify** : connecter le dépôt. `netlify.toml` contient déjà la configuration (build `npm run build`, dossier `dist`).
- **Vercel** : importer le dépôt. `vercel.json` est fourni. Utiliser Formspree pour le formulaire.
- **OVH (hébergement mutualisé)** : lancer `npm run build`, puis envoyer le **contenu** du dossier `dist/` dans le dossier `www/` par FTP (FileZilla). Le fichier `.htaccess` gère le cache et la page 404. Utiliser Formspree pour le formulaire.

## SEO et accessibilité

- Title, meta description, balise canonical et Open Graph propres à chaque page
- `sitemap-index.xml` (généré) et `robots.txt`
- Données structurées JSON-LD `LocalBusiness` (adresse, téléphone, zone) et `BreadcrumbList`
- HTML sémantique, lien d’évitement « Aller au contenu », navigation au clavier, focus visible, contrastes AA, textes alternatifs obligatoires sur les réalisations
- Polices auto-hébergées (Barlow, Barlow Condensed) : aucun appel à Google Fonts

Scores Lighthouse mesurés sur le build avec les images provisoires : 97 à 100 en performance, 100 en accessibilité, bonnes pratiques et SEO, sur mobile comme sur ordinateur.
