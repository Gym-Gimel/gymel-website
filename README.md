# Site de la Gym de Gimel

Site officiel de la Gym de Gimel, développé avec Next.js App Router, TypeScript, Tailwind CSS, Zod et des contenus structurés en CSV.

Le site présente les cours, le calendrier sportif, les événements, les inscriptions, les informations de la société, les sponsors, les documents utiles et les albums photos.

## Prérequis

- Node.js 20 ou plus récent
- npm

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Le site local est ensuite disponible sur `http://localhost:3000`.

## Variables d'environnement

Le site utilise par défaut les fichiers CSV locaux du dossier `data/`. Des CSV distants peuvent être activés explicitement avec `CSV_SOURCE=remote`.

```env
CSV_SOURCE=local
COMPETITIONS_CSV_URL=
EVENTS_CSV_URL=
VOLLEYBALL_MEN_CSV_URL=
VOLLEYBALL_WOMEN_CSV_URL=
COURSES_CSV_URL=
CSV_REVALIDATE_SECONDS=300
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_FORM_PROVIDER=resend
CONTACT_FORM_TO=contact@daviddieperink.ch
CONTACT_FORM_FROM=
RESEND_API_KEY=
```

Si `CSV_SOURCE=remote` est actif et qu'un CSV distant est inaccessible, le site revient au fichier local correspondant.

Le formulaire de contact envoie les messages via Resend lorsque `CONTACT_FORM_PROVIDER=resend`, `CONTACT_FORM_FROM` et `RESEND_API_KEY` sont configurés. `CONTACT_FORM_TO` définit la boîte de réception.

## Commandes

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run validate:data
npm run build
```

Avant de considérer une modification comme prête:

```bash
npm run validate:data
npm run lint
npm run typecheck
npm run test
npm run build
```

## Fonctionnement

- Les pages sont dans `src/app`.
- Les composants réutilisables sont dans `src/components`.
- Les loaders serveur sont dans `src/lib`.
- Les types partagés sont dans `src/types`.
- Les contenus CSV versionnés sont dans `data`.
- Les images et documents publics sont dans `public`.

Les pages utilisent des Server Components par défaut. Les Client Components sont réservés aux interactions nécessaires, par exemple le menu mobile, le formulaire de contact et la galerie photo.

## Données CSV

- `data/courses.csv`: cours, horaires, reprises, contacts et cotisations.
- `data/competitions.csv`: concours de gym et événements sportifs hors volley.
- `data/events.csv`: manifestations, assemblées et événements non sportifs.
- `data/volleyball-men.csv`: matchs volley hommes.
- `data/volleyball-women.csv`: matchs volley femmes.
- `data/templates`: modèles vierges.

Les lignes invalides sont ignorées quand possible et journalisées côté serveur. Une erreur de récupération distante déclenche le fallback local.

## Albums photos

Les photos WebP optimisées sont placées dans:

```text
public/images/events/<dossier-album>/
```

Les albums sont déclarés dans `src/lib/photos/albums.ts`. Le site lit ensuite automatiquement les fichiers présents dans le dossier, les trie par nom et calcule le nombre de photos.

La page `/photos` liste les albums. Une page comme `/photos/spectacle-2025` affiche les 24 premières photos, puis charge les suivantes via un bouton `Afficher plus de photos`.

## Déploiement Vercel

Configurer les variables d'environnement dans Vercel, puis lancer un déploiement standard Next.js. Les détails sont dans `docs/deployment.md`.

## Documentation

- `docs/fonctionnement.md`: objectif du site et fonctionnement général.
- `docs/architecture.md`: structure technique et routes.
- `docs/gestion-contenu.md`: mise à jour des contenus CSV, documents et photos.
- `docs/deployment.md`: déploiement, variables d'environnement et services externes.
