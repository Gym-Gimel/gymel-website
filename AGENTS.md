# Gym de Gimel

## Objectif

Créer une nouvelle version Next.js du site de la Gym de Gimel, en français, moderne, rapide, accessible et maintenable. Le site WordPress actuel ne doit pas être modifié pendant le développement.

## Architecture

- `src/app`: pages App Router, métadonnées, sitemap et robots.
- `src/components`: composants de layout, UI, cours, événements et calendrier sportif.
- `src/lib`: configuration, validation Zod, lecture CSV, formatage.
- `src/types`: types partagés.
- `data`: CSV locaux de secours et modèles vierges.
- `docs`: documentation technique, migration et gestion de contenu.
- `public`: images, documents et logos à publier.

## Conventions

- TypeScript strict.
- Server Components par défaut.
- Client Components uniquement pour l'interactivité nécessaire, par exemple le menu mobile.
- Données sportives et cours dans des CSV validés.
- Ne jamais afficher du HTML arbitraire provenant d'un CSV.
- Couleur principale: `#b71313`.

## Commandes

- `npm run dev`: serveur de développement.
- `npm run lint`: lint Next.js.
- `npm run typecheck`: vérification TypeScript.
- `npm run test`: tests unitaires.
- `npm run validate:data`: validation des CSV locaux.
- `npm run build`: build de production.

## CSV

Les URL distantes sont configurées dans `.env`:

- `COURSES_CSV_URL`
- `COMPETITIONS_CSV_URL`
- `VOLLEYBALL_MEN_CSV_URL`
- `VOLLEYBALL_WOMEN_CSV_URL`
- `CSV_REVALIDATE_SECONDS`

Si une URL est absente ou inaccessible, le site utilise le fichier local correspondant dans `data/`.

## Regroupement des cours

`data/courses.csv` contient des créneaux, pas uniquement des cours publics. Certains créneaux sont regroupés côté serveur dans `src/lib/courses/grouping.ts`:

- Enfantines lundi + mardi -> `enfantines`
- Agrès à Essertines + Agrès jeudi -> `agres`
- Volley Femmes + Volley Hommes -> `volley`

Le planning de l'accueil affiche les créneaux bruts. La page `Nos cours` affiche les groupes. Toute nouvelle variante d'un cours existant doit être ajoutée au CSV puis, si elle doit partager une fiche, au regroupement dans `src/lib/courses/grouping.ts`.

## Validation

Avant de considérer une tâche comme terminée:

1. lancer `npm run validate:data`;
2. lancer `npm run lint`;
3. lancer `npm run typecheck`;
4. lancer `npm run test`;
5. lancer `npm run build`;
6. noter les contenus officiels manquants.

## A ne pas modifier

- DNS, domaine et hébergement WordPress existants.
- Secrets, comptes externes et données de production.
- Documents officiels sans validation humaine.
