# Éléments à compléter

Sur le site, chaque élément manquant s’affiche sous la forme d’un repère jaune `[À COMPLÉTER : …]`.
Pour les retrouver dans le code : `grep -rn "À COMPLÉTER\|<Todo" src`.

Aucun chiffre, nom de client, certification, date de création ou témoignage n’a été inventé.

## 1. Visuels (priorité haute)

Les fichiers source n’étaient pas présents dans le projet. **Toutes les images actuelles sont des images provisoires grises marquées « À REMPLACER ».**

| Élément | Où le déposer | Remarque |
|---|---|---|
| Logo officiel MTE (PNG haute définition, fond transparent si possible) | `assets-source/logo-mte.png` | Le logo actuel est un simple texte provisoire. Le vrai logo ne doit pas être redessiné. |
| Bannière (logo, photo des silos sous l’orage, 4 vignettes) | `assets-source/banniere-silos-orage.jpg` | La photo principale et les 4 photos de chantier sont découpées automatiquement dedans. |
| Photos de chantier en haute définition (facultatif mais recommandé) | `assets-source/chantier-sechoir.jpg`, `chantier-batiment-depoussierage.jpg`, `chantier-tour-manutention.jpg`, `chantier-silos-aerien.jpg` | Prioritaires sur la découpe de la bannière, qui donne une résolution limitée. |

Lancez ensuite `npm run images:import`.

- [ ] **Couleur rouge exacte** : actuellement `#d0141e` (`src/styles/global.css`, variable `--color-mte`). À vérifier avec la valeur du fichier du logo ou de la charte de l’imprimeur.
- [ ] Crédits photographiques (mentions légales).

## 2. Informations sur l’entreprise (`src/config.ts`)

- [ ] Adresse email de contact (`SITE.email`) : elle apparaît dans le pied de page, la page Contact, les mentions légales et la politique de confidentialité.
- [ ] Horaires d’ouverture du bureau et de l’atelier (`SITE.hours`)
- [ ] Coordonnées GPS exactes du site, 23 route de Briarres (`SITE.geo`), utilisées pour la carte et les données structurées. Valeur actuelle : centre de Puiseaux, approximatif.
- [ ] Jours, horaires et conditions d’intervention en urgence et d’astreinte (encart « Urgence »)
- [ ] Zone géographique d’intervention (page Clients)

## 3. Contenus commerciaux

- [ ] Année de création ou années d’expérience (Accueil)
- [ ] Nombre de réalisations ou de silos installés (Accueil)
- [ ] Noms ou logos de clients, **avec leur accord** (Accueil, page Clients)
- [ ] Témoignages clients réels, s’il y en a (page Clients)
- [ ] Marques distribuées et partenaires fabricants (Fournitures)
- [ ] Équipements de l’atelier : surface, machines, soudage, traitements (Atelier)
- [ ] Formules de contrat de maintenance : fréquence, conditions (Maintenance)
- [ ] Habilitations et formations des techniciens (Maintenance)
- [ ] Certifications et qualifications, si elles existent (aucune n’est mentionnée pour l’instant)

## 4. Réalisations (`src/content/realisations/*.md`)

Pour chacune des 4 réalisations d’exemple :

- [ ] Texte de présentation
- [ ] Commune / département (`lieu`)
- [ ] Année (`annee`)
- [ ] Type de client (`client`)
- [ ] Le besoin : capacité, débits, contraintes
- [ ] La solution : équipements précis, chiffres clés, durée du chantier
- [ ] Description courte (`description`) : retirer la mention « À COMPLÉTER. »

## 5. Mentions légales

- [ ] Dénomination sociale complète
- [ ] Forme juridique et capital social
- [ ] Numéro SIRET
- [ ] Ville et numéro RCS
- [ ] Numéro de TVA intracommunautaire
- [ ] Nom et fonction du directeur de la publication
- [ ] Hébergeur : nom, adresse, téléphone
- [ ] Date de mise à jour

## 6. Politique de confidentialité

- [ ] Nom du responsable du traitement / dirigeant
- [ ] Adresse email de contact RGPD
- [ ] Durée de conservation des données
- [ ] Transferts hors UE, selon le prestataire de formulaire et l’hébergeur
- [ ] Outil de mesure d’audience (aucun actuellement)
- [ ] Date de mise à jour

## 7. Technique

- [ ] Choisir le fournisseur du formulaire : Netlify Forms (par défaut) ou Formspree, en renseignant `PUBLIC_FORM_PROVIDER` et `PUBLIC_FORM_ENDPOINT`.
- [ ] Vérifier l’URL de production (`SITE_URL`, par défaut `https://www.mte-silo.com`).
- [ ] Après la mise en ligne : déclarer le sitemap dans Google Search Console et mettre à jour la fiche Google Business Profile.
