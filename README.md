# Refonte Next.js de la Gym de Gimel

Nouvelle base fonctionnelle du site de la Gym de Gimel, développée avec Next.js App Router, TypeScript, Tailwind CSS, Zod et CSV côté serveur.

## Prérequis

- Node.js 20 ou plus récent
- npm

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d'environnement

Les CSV peuvent venir de GitHub:

```env
COMPETITIONS_CSV_URL=
VOLLEYBALL_MEN_CSV_URL=
VOLLEYBALL_WOMEN_CSV_URL=
COURSES_CSV_URL=
CSV_REVALIDATE_SECONDS=300
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Sans URL distante, les fichiers locaux dans `data/` servent de secours.

## Commandes

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run validate:data
npm run build
```

## Données CSV

- `data/courses.csv`: cours, horaires, contacts et cotisations.
- `data/competitions.csv`: concours, événements et manifestations.
- `data/volleyball-men.csv`: matchs volley hommes.
- `data/volleyball-women.csv`: matchs volley femmes.
- `data/templates`: modèles vierges.

Les lignes invalides sont ignorées quand possible et journalisées côté serveur. Une erreur de récupération distante déclenche le fallback local.

## Déploiement Vercel

Configurer les variables d'environnement dans Vercel, puis lancer un déploiement standard Next.js. La mise en production sur le domaine final doit attendre la validation humaine et les redirections WordPress.

## Sources migrées

Les contenus initiaux reprennent les rubriques du site actuel `gymel.ch`: accueil, inscriptions, cours adultes/enfants, calendrier loisir, comité, coordonnées, sponsors et documents utiles. Les images officielles et documents PDF restent à récupérer manuellement.
