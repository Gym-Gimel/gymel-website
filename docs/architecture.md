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
- `/photos`: archive des albums photos.
- `/photos/[slug]`: galerie complète d'un album.
- `/inscriptions`, `/la-societe`, `/contact`: pages secondaires structurées.
- `/jobs`, `/sponsors`, `/costumes-accessoires`: autres pages de contenu.
- `/api/contact`: réception du formulaire de contact.
- `/api/registration`: réception du formulaire d'inscription.
- `/api/photos/[slug]`: pagination des photos d'un album.

## Données

Les CSV sont lus côté serveur par `src/lib/data/loaders.ts`. La source des mises à jour éditoriales est le dépôt séparé [Gym-Gimel/data](https://github.com/Gym-Gimel/data), qui publie ses CSV sur `https://gym-gimel.github.io/data/`. Le site utilise ces URL lorsque `CSV_SOURCE=remote`. Le mode local lit les copies de secours de `data/` dans le projet Next.js.

Conséquence pratique : une ligne ajoutée au dépôt de données n'apparaît pas sur une installation restée en mode `local`.

Les URL distantes sont centralisées dans `src/lib/config.ts`. Si `CSV_SOURCE=remote` est actif et qu'une récupération distante échoue, le site revient au fichier local correspondant. Pour les événements, une URL du dépôt séparé est prévue dans la configuration même lorsque `EVENTS_CSV_URL` est vide.

Les lignes reçues sont analysées par `src/lib/csv/parse.ts` avec les schémas de `src/lib/validation/schemas.ts`. Une ligne invalide est ignorée et journalisée ; une réponse distante valide au niveau HTTP mais contenant des lignes invalides ne déclenche pas le repli local. La commande `npm run validate:data` contrôle uniquement les fichiers locaux.

## Séparation calendrier et événements

Les concours sportifs et les manifestations sont séparés par fichier source.

- `competitions.csv` dans `Gym-Gimel/data` : l'entrée apparaît dans `/calendrier-sportif` et son détail est publié sous `/calendrier-sportif/concours/[slug]`.
- `events.csv` dans `Gym-Gimel/data` : l'entrée apparaît dans `/evenements` et son détail est publié sous `/evenements/[slug]`.

La colonne `category` reste utile pour afficher un libellé comme `Concours de gymnastique`, `Manifestation` ou `Assemblée`, mais elle ne décide plus de la destination publique de l'entrée.

La route `/calendrier-sportif/concours/[slug]` ne liste donc pas les manifestations non sportives.

Les deux fichiers partagent `competitionSchema`. Dans chaque fichier, `id` et `slug` doivent être uniques. Le statut `draft` reste affiché publiquement et `finished` place une manifestation dans les archives de `/evenements` ; aucune transition de statut n'est automatique. Le [tutoriel d'ajout d'un événement](ajouter-un-evenement.md) décrit le format éditorial.

## Formulaire de contact

La page `/contact` utilise un composant client qui envoie les données à `/api/contact`. La route valide les champs côté serveur, ignore un champ honeypot anti-spam et transmet l'e-mail via Resend lorsque les variables `CONTACT_FORM_PROVIDER`, `CONTACT_FORM_TO`, `CONTACT_FORM_FROM` et `RESEND_API_KEY` sont configurées. L'expéditeur doit appartenir à un domaine vérifié chez le fournisseur e-mail. Le formulaire d'inscription utilise `/api/registration` et peut avoir un destinataire distinct avec `REGISTRATION_FORM_TO`.

## Galerie photos

Les albums sont déclarés dans `src/lib/photos/albums.ts`. Cette configuration contient le slug public, le titre, la date, la couverture, la description, le dossier d'images et, si nécessaire, les slugs d'événements associés.

La lecture des photos se fait côté serveur dans `src/lib/photos/files.ts`:

- lecture du dossier dans `public/images/events`;
- filtre des fichiers `.webp`;
- tri naturel par nom de fichier;
- lecture des dimensions WebP pour fournir `width` et `height`;
- génération des URLs publiques.

La page `/photos/[slug]` reçoit seulement les 24 premières photos. Les suivantes sont demandées par le composant client `PhotoGallery` à `/api/photos/[slug]`.

La lightbox est implémentée sans dépendance externe lourde. Elle gère Escape, les flèches du clavier, un piège de focus simple, le retour de focus à la fermeture et un geste tactile horizontal.

## Regroupement des cours

Le fichier `courses.csv` du dépôt de données décrit des créneaux horaires. Sa copie locale est `data/courses.csv` dans le projet Next.js. Une ligne correspond à un créneau précis avec son jour, son heure, son lieu, son contact, sa date de reprise et sa remarque.

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

Pour démarrer le projet et exécuter tous les contrôles, voir le [guide développeur](developpement.md).
