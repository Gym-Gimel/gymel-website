# Fonctionnement du site

Ce site est la version Next.js du site de la Gym de Gimel. Il sert de vitrine publique pour les cours, les événements, le calendrier sportif, les inscriptions, les documents utiles, les sponsors et les archives photos de la société.

## Objectif

Le site doit rester:

- rapide, y compris sur mobile;
- accessible au clavier et aux lecteurs d'écran;
- facile à maintenir;
- simple à mettre à jour sans modifier le code pour les contenus courants;
- cohérent visuellement sur toutes les pages.

## Organisation générale

- `src/app`: routes, pages, métadonnées, sitemap et API internes.
- `src/components`: composants de mise en page, cartes, cours, événements, sports, contact et photos.
- `src/lib`: configuration, chargement des données, validation, formatage et logique serveur.
- `src/types`: types TypeScript partagés.
- `data`: CSV locaux utilisés comme source de contenu par défaut.
- `public`: images, documents PDF, logos et photos publiés.
- `docs`: documentation technique et éditoriale.

## Contenus

Les contenus réguliers sont majoritairement dans des CSV:

- cours et horaires;
- concours sportifs;
- événements non sportifs;
- matchs de volley.

Chaque fichier est validé avec Zod avant d'être utilisé. Les erreurs indiquent le fichier, la ligne, la colonne et le format attendu.

Les documents PDF sont placés dans `public/documents`. Les images publiques sont placées dans `public/images`.

## Albums photos

Les albums photos sont configurés dans `src/lib/photos/albums.ts`. Les images sont ensuite lues automatiquement depuis `public/images/events/<dossier>`.

Pour éviter de charger trop de photos d'un coup, les pages d'album affichent une première tranche de 24 photos, puis chargent les suivantes via `/api/photos/[slug]`.

## Design

Le design utilise Tailwind CSS avec une identité volontairement sobre:

- couleur principale: `#b71313`;
- conteneurs principaux en `max-w-7xl`;
- cartes blanches avec bordure `stone` et ombre douce;
- boutons rouges ou outline selon l'action;
- composants accessibles et responsives.

Les nouveaux composants doivent reprendre ces conventions avant d'introduire de nouveaux styles.

## Vérification

Commandes à lancer avant une mise en ligne ou une livraison:

```bash
npm run validate:data
npm run lint
npm run typecheck
npm run test
npm run build
```
