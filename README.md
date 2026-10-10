# Site de la Gym de Gimel

Site officiel de la Gym de Gimel, développé avec Next.js App Router, TypeScript, Tailwind CSS, Zod et des contenus structurés en CSV.

Le site présente les cours, le calendrier sportif, les événements, les inscriptions, les informations de la société, les sponsors, les documents utiles et les albums photos.

## Prérequis

- Node.js 20 ou plus récent
- npm

## Installation

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Le site local est ensuite disponible sur `http://localhost:3000`.

## Variables d'environnement

Les mises à jour des cours, concours, événements et matchs se font dans le dépôt GitHub séparé [Gym-Gimel/data](https://github.com/Gym-Gimel/data). Pour démarrer le site en local, aucune connexion au dépôt de données ni clé de service externe n'est nécessaire : `CSV_SOURCE=local` lit les copies de secours dans le dossier `data/` de ce projet.

```env
CSV_SOURCE=local
COMPETITIONS_CSV_URL=https://gym-gimel.github.io/data/competitions.csv
EVENTS_CSV_URL=https://gym-gimel.github.io/data/events.csv
VOLLEYBALL_MEN_CSV_URL=https://gym-gimel.github.io/data/volleyball-men.csv
VOLLEYBALL_WOMEN_CSV_URL=https://gym-gimel.github.io/data/volleyball-women.csv
COURSES_CSV_URL=https://gym-gimel.github.io/data/courses.csv
CSV_REVALIDATE_SECONDS=300
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_FORM_PROVIDER=resend
CONTACT_FORM_TO=
REGISTRATION_FORM_TO=
CONTACT_FORM_FROM=Gym de Gimel <mail@example.com>
RESEND_API_KEY=
```

Configurer `CSV_SOURCE=remote` sur le site déployé pour lire les CSV publiés par le dépôt séparé. Si une récupération échoue, le site lit la copie locale correspondante. `CSV_REVALIDATE_SECONDS` contrôle la durée de revalidation des requêtes distantes.

Les formulaires de contact et d'inscription utilisent Resend lorsque le fournisseur, l'expéditeur d'un domaine vérifié, le destinataire et la clé API sont configurés. `REGISTRATION_FORM_TO` permet de choisir une boîte distincte pour les inscriptions ; sinon, `CONTACT_FORM_TO` est utilisé. Voir [Déploiement](docs/deployment.md) pour la configuration.

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

## Mettre à jour le contenu

- [Tutoriel : ajouter un événement ou un concours](docs/ajouter-un-evenement.md) : choix du fichier, exemple de ligne, colonnes, statuts, validation et publication.
- [Gestion des contenus](docs/gestion-contenu.md) : cours, matchs, documents et albums photos.

Dans le dépôt `Gym-Gimel/data`, un événement non sportif se trouve dans `events.csv` et apparaît sur `/evenements`. Un concours sportif hors volley se trouve dans `competitions.csv` et apparaît sur `/calendrier-sportif`. Les deux fichiers ont le même format. La colonne `category` est un libellé ; elle ne choisit pas la page.

## Données CSV

- `data/courses.csv`: copie locale des cours, horaires, reprises, contacts et cotisations.
- `data/competitions.csv`: copie locale des concours de gym et événements sportifs hors volley.
- `data/events.csv`: copie locale des manifestations, assemblées et événements non sportifs.
- `data/volleyball-men.csv`: copie locale des matchs volley hommes.
- `data/volleyball-women.csv`: copie locale des matchs volley femmes.
- `data/templates`: modèles vierges pour les développeurs.

Les lignes invalides sont ignorées quand possible et journalisées côté serveur. `npm run validate:data` contrôle uniquement les copies locales de ce projet ; il ne valide pas le dépôt `Gym-Gimel/data`.

## Albums photos

Les photos WebP optimisées sont placées dans:

```text
public/images/events/<dossier-album>/
```

Les albums sont déclarés dans `src/lib/photos/albums.ts`. Le site lit ensuite automatiquement les fichiers présents dans le dossier, les trie par nom et calcule le nombre de photos.

La page `/photos` liste les albums. Une page comme `/photos/spectacle-2025` affiche les 24 premières photos, puis charge les suivantes via un bouton `Afficher plus de photos`.

## Déploiement Vercel

Configurer les variables d'environnement dans Vercel, notamment `CSV_SOURCE=remote` et les URL de `Gym-Gimel/data`, puis lancer un déploiement standard Next.js. Les changements de contenu se font ensuite dans ce dépôt séparé. Les détails sont dans [Déploiement](docs/deployment.md).

## Documentation

- [Fonctionnement](docs/fonctionnement.md) : objectif du site et fonctionnement général.
- [Architecture](docs/architecture.md) : structure technique et routes.
- [Guide développeur](docs/developpement.md) : installation, trajet des données et contrôles.
- [Gestion des contenus](docs/gestion-contenu.md) : mise à jour des CSV, documents et photos.
- [Tutoriel : ajouter un événement](docs/ajouter-un-evenement.md) : procédure éditoriale détaillée.
- [Déploiement](docs/deployment.md) : publication, variables d'environnement et services externes.
