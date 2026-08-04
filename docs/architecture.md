# Architecture

Le site utilise Next.js App Router.

## Pages

- `/`: accueil.
- `/nos-cours`: liste filtrable des cours.
- `/nos-cours/[slug]`: détail de cours.
- `/calendrier-sportif`: calendrier regroupé par mois.
- `/calendrier-sportif/concours/[slug]`: détail de concours ou manifestation.
- `/evenements`, `/inscriptions`, `/la-societe`, `/contact`: pages secondaires structurées.

## Données

Les CSV sont lus côté serveur par `src/lib/data/loaders.ts`. Les fichiers distants sont centralisés dans `src/lib/config.ts`. Les fichiers locaux de `data/` servent de secours.

## Validation

Chaque type de CSV possède un schéma Zod dans `src/lib/validation/schemas.ts`. Le parseur signale le fichier, la ligne, la colonne et le format attendu.

## Design

La couleur primaire est `#b71313`. Les composants restent sobres, accessibles et adaptés au mobile.
