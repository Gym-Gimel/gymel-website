# Gestion des contenus

Cette documentation explique comment mettre à jour les cours, concours, événements, matchs, documents et albums photos.

Pour créer une manifestation ou un concours de A à Z, suivre le [tutoriel d'ajout d'un événement](ajouter-un-evenement.md). Il explique les colonnes, les liens, les statuts, les vérifications et la publication.

## Où modifier les fichiers CSV

Ouvrir le dépôt GitHub séparé [Gym-Gimel/data](https://github.com/Gym-Gimel/data). Les fichiers de contenu sont **à la racine de ce dépôt** :

- `courses.csv`
- `competitions.csv`
- `events.csv`
- `volleyball-men.csv`
- `volleyball-women.csv`

Le dossier `data/` du projet Next.js contient des copies locales de secours et les modèles vierges dans `data/templates/`. Il ne sert pas à saisir les mises à jour courantes.

Les PDF, images et albums photos se gèrent dans le dépôt **du site Next.js**, sous `public/` et `src/lib/photos/albums.ts`. Ils ne sont pas stockés dans le dépôt de données CSV.

## Source utilisée par le site

Pour afficher les mises à jour du dépôt séparé, le site doit utiliser `CSV_SOURCE=remote` et les URL CSV de `https://gym-gimel.github.io/data/`. En développement, le mode local lit les copies de secours du projet Next.js. La personne qui gère le déploiement vérifie cette configuration.

## Modifier un fichier

1. Ouvrir le fichier à la racine de [Gym-Gimel/data](https://github.com/Gym-Gimel/data).
2. Cliquer sur l'icône de modification.
3. Ajouter ou modifier une ligne.
4. Garder la première ligne d'en-têtes.
5. Enregistrer avec un message clair.

Après l'enregistrement, attendre la publication du CSV par le dépôt séparé, puis vérifier la page du site concernée. Le cache peut retarder l'affichage de quelques minutes. Si la mise à jour n'apparaît pas, demander une vérification de la source CSV configurée pour le site.

## Dates et heures

- Date: `YYYY-MM-DD`, exemple `2026-08-22`.
- Date de reprise d'un cours: `DD.MM`, exemple `24.08`.
- Heure: `HH:mm`, exemple `20:30`.
- Plusieurs jours ou moniteurs: séparer avec `;`.

## Cours et créneaux

Dans `courses.csv` du dépôt séparé, une ligne représente un créneau horaire précis, pas forcément un cours unique visible sur la page `Nos cours`.

Exemples:

- `Enfantines` existe deux fois dans le CSV, une fois le lundi et une fois le mardi.
- `Agrès` existe deux fois dans le CSV, une fois à Essertines le mardi et une fois à Gimel le jeudi.
- `Volley` existe deux fois dans le CSV, une fois pour les femmes et une fois pour les hommes.

Le site regroupe automatiquement certains créneaux sur la page `Nos cours`:

- `enfantines-lundi` + `enfantines-mardi` deviennent une seule fiche `Enfantines`.
- `agres-essertines` + `agres` deviennent une seule fiche `Agrès`.
- `volley-femmes` + `volley-hommes` deviennent une seule fiche `Volley`.

Sur la page d'accueil, le planning affiche toujours les créneaux séparés, car le visiteur doit voir le jour, l'heure et le lieu exacts.

Sur la page `Nos cours`, le visiteur voit un seul cours regroupé. En ouvrant la fiche, il voit ensuite tous les formats disponibles avec leurs horaires, dates de reprise, lieux, cotisations et remarques.

### Ajouter un nouveau créneau à un cours existant

Pour ajouter un nouveau créneau à un cours déjà regroupé:

1. ajouter une nouvelle ligne dans `courses.csv` de `Gym-Gimel/data`;
2. utiliser un `id` unique;
3. utiliser un `slug` clair;
4. renseigner le jour, l'heure, le lieu et la remarque;
5. demander à une personne technique d'ajouter ce slug dans `src/lib/courses/grouping.ts` si le créneau doit être regroupé avec un cours existant.

Exemple: si un nouveau créneau `volley-mixte` doit apparaître dans la fiche `Volley`, il faut ajouter la ligne dans le CSV puis ajouter `volley-mixte` au regroupement `volley` dans le code.

### Ajouter un nouveau cours indépendant

Si le cours ne doit pas être regroupé avec un autre, il suffit d'ajouter une ligne dans `courses.csv` avec un slug unique. Le cours apparaîtra automatiquement comme une carte séparée sur `Nos cours`.

## Statuts autorisés

Cours:

- `open`
- `waitlist`
- `closed`

Concours et événements:

- `draft`
- `upcoming`
- `registration-open`
- `registration-closed`
- `finished`
- `cancelled`

Volley:

- `scheduled`
- `postponed`
- `cancelled`
- `finished`

## Ajouter un événement ou un concours

Suivre le [tutoriel pas à pas](ajouter-un-evenement.md) pour préparer, saisir, valider et publier une nouvelle entrée.

Les concours sportifs et les manifestations sont séparés dans deux fichiers différents.

- `competitions.csv`: concours de gym et événements sportifs hors volley. Les entrées apparaissent dans `/calendrier-sportif`.
- `events.csv`: manifestations, assemblées générales, lotos, soirées et autres événements non sportifs. Les entrées apparaissent dans `/evenements`.

La colonne `category` reste affichée sur le site, mais elle ne décide plus de la page où l'entrée apparaît. C'est le fichier CSV qui décide.

Attention : `draft` est un statut visible sur le site et `finished` doit être choisi manuellement après l'événement. Les dates seules ne classent pas une manifestation dans les archives.

## Ajouter un résultat volley

Remplir `homeScore`, `awayScore` et passer le statut à `finished`.

```csv
vm-2026-03,2026,2026-03-20,20:30,Volley-Wellness,Gimel Hommes,Rolle,Salle omnisports du Marais,2,1,finished,
```

## Liens PDF

Placer le document dans `public/documents`, puis utiliser un chemin comme:

```text
/documents/programme.pdf
```

## Albums photos

Les photos optimisées sont placées dans:

```text
public/images/events/<dossier-album>/
```

Exemples actuels:

- `public/images/events/spectacle-2025/`
- `public/images/events/fete-125-ans/`

Les fichiers peuvent être nommés:

```text
001.webp
002.webp
003.webp
```

Le site lit automatiquement les fichiers présents dans le dossier. Il n'est pas nécessaire de déclarer chaque photo dans un tableau.

### Déclarer un album

Ajouter une entrée dans `src/lib/photos/albums.ts`:

```ts
{
  slug: "fete-annuelle-2027",
  title: "Fête annuelle 2027",
  date: "2027",
  cover: "/images/events/fete-annuelle-2027/001.webp",
  description: "Retour en images sur la fête annuelle de la Gym de Gimel.",
  imageDirectory: "fete-annuelle-2027",
}
```

- `slug`: URL publique de l'album, par exemple `/photos/fete-annuelle-2027`.
- `title`: titre affiché sur la carte et la page album.
- `date`: année ou date courte affichée.
- `cover`: image de couverture affichée sur `/photos`.
- `description`: texte court de présentation.
- `imageDirectory`: nom du dossier dans `public/images/events`.

### Lier un album à une page événement

Pour afficher automatiquement une section `Retour en images` sur une page événement, ajouter `eventSlugs`:

```ts
eventSlugs: ["soiree-de-gym-2025"]
```

Le slug doit correspondre à la colonne `slug` dans `events.csv` de `Gym-Gimel/data`.

### Choisir les photos de sélection

Par défaut, la page événement affiche les 10 premières photos de l'album. Pour choisir une sélection précise, ajouter `previewFileNames`:

```ts
previewFileNames: ["001.webp", "014.webp", "027.webp", "042.webp"]
```

Ces fichiers doivent exister dans le dossier de l'album.

### Ajouter un nouvel album

1. Optimiser les photos en WebP.
2. Créer un dossier dans `public/images/events`.
3. Nommer les fichiers avec un ordre clair, par exemple `001.webp`, `002.webp`.
4. Ajouter une entrée dans `src/lib/photos/albums.ts`.
5. Choisir `cover`.
6. Ajouter `eventSlugs` si l'album doit apparaître sur une page événement.
7. Lancer `npm run build` pour vérifier que l'album est généré.

## En cas d'erreur

Pour les copies locales du projet Next.js, lancer `npm run validate:data` : le message indique le fichier, la ligne, la colonne et le format attendu. Cette commande ne contrôle pas les fichiers du dépôt `Gym-Gimel/data`. Pour une mise à jour éditoriale, vérifier d'abord le CSV publié et l'affichage sur le site ; demander une vérification technique si une ligne manque.

## Contenus à confirmer avant publication

Constat au 10 octobre 2026 : les **copies locales** `data/events.csv` (soirée de gym 2025) et `data/competitions.csv` (concours agrès de démonstration) pointent vers `/documents/resultats-exemple.pdf`, absent de `public/documents/`. Faire valider les résultats officiels, puis ajouter le document et son lien ou retirer ces liens des copies locales. Vérifier également les liens dans le dépôt de données séparé. Le visuel d'accueil `public/images/home.webp` est encore décrit comme temporaire dans le site ; confirmer le visuel officiel avant mise en ligne.
