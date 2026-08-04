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

## Regroupement des cours

Le fichier `data/courses.csv` décrit des créneaux horaires. Une ligne correspond à un créneau précis avec son jour, son heure, son lieu, son contact et sa remarque.

L'interface publique distingue deux usages:

- le planning de la page d'accueil utilise les créneaux bruts pour afficher chaque horaire séparément;
- la page `/nos-cours` utilise des groupes de cours pour éviter les doublons.

Le regroupement est calculé côté serveur dans `src/lib/data/loaders.ts` avec l'aide de `src/lib/courses/grouping.ts`.

Exemples de regroupements:

- `enfantines-lundi` et `enfantines-mardi` vers `/nos-cours/enfantines`;
- `agres-essertines` et `agres` vers `/nos-cours/agres`;
- `volley-femmes` et `volley-hommes` vers `/nos-cours/volley`.

La fiche détail `/nos-cours/[slug]` reçoit un groupe et affiche ses différentes sessions dans la section `Formats du cours`.

## Validation

Chaque type de CSV possède un schéma Zod dans `src/lib/validation/schemas.ts`. Le parseur signale le fichier, la ligne, la colonne et le format attendu.

## Design

La couleur primaire est `#b71313`. Les composants restent sobres, accessibles et adaptés au mobile.
