# Architecture

Le site utilise Next.js App Router.

## Pages

- `/`: accueil.
- `/nos-cours`: liste filtrable des cours.
- `/nos-cours/[slug]`: détail de cours.
- `/calendrier-sportif`: calendrier regroupé par mois.
- `/calendrier-sportif/concours/[slug]`: détail de concours sportif.
- `/evenements`: liste des manifestations non sportives.
- `/evenements/[slug]`: détail de manifestation.
- `/inscriptions`, `/la-societe`, `/contact`: pages secondaires structurées.

## Données

Les CSV sont lus côté serveur par `src/lib/data/loaders.ts`. Par défaut, le site utilise les fichiers locaux de `data/`, même si des URLs distantes sont configurées dans l'environnement. Pour utiliser les CSV distants, il faut définir `CSV_SOURCE=remote`.

Conséquence pratique: si le CSV distant contient une ligne qui n'existe plus dans `data/competitions.csv`, elle ne s'affiche pas sur le site tant que `CSV_SOURCE` reste sur `local` ou n'est pas défini. C'est le cas, par exemple, d'une ancienne ligne comme `125-ans-gym-gimel` présente sur un CSV distant mais supprimée du CSV local.

Les URLs distantes sont centralisées dans `src/lib/config.ts`. Si `CSV_SOURCE=remote` est actif et qu'une récupération distante échoue, le site revient au fichier local correspondant.

## Séparation calendrier et événements

Le fichier `data/competitions.csv` contient à la fois des concours sportifs et des événements de société. La séparation se fait avec la colonne `category`.

- `category` égal à `Concours de gymnastique`: l'entrée apparaît dans `/calendrier-sportif` et son détail est publié sous `/calendrier-sportif/concours/[slug]`.
- Toute autre valeur de `category`, par exemple `Manifestation` ou `Assemblée`: l'entrée apparaît dans `/evenements` et son détail est publié sous `/evenements/[slug]`.

La route `/calendrier-sportif/concours/[slug]` ne liste donc pas les manifestations non sportives. Si une ancienne URL de concours pointe vers un slug devenu événement, elle redirige vers `/evenements/[slug]`.

## Regroupement des cours

Le fichier `data/courses.csv` décrit des créneaux horaires. Une ligne correspond à un créneau précis avec son jour, son heure, son lieu, son contact, sa date de reprise et sa remarque.

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
