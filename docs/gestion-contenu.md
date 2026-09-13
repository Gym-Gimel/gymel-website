# Gestion des contenus

Cette documentation explique comment mettre à jour les cours, concours, événements, matchs, documents et albums photos.

## Où sont les fichiers CSV

Dans GitHub, ouvrir le dossier `data/`:

- `courses.csv`
- `competitions.csv`
- `events.csv`
- `volleyball-men.csv`
- `volleyball-women.csv`

Les modèles vierges sont dans `data/templates/`.

## Source utilisée par le site

Le site utilise par défaut les fichiers locaux du dossier `data/`. Les CSV distants configurés dans l'environnement ne sont utilisés que si `CSV_SOURCE=remote` est défini.

Si une ligne existe dans le CSV distant mais pas dans le CSV local, elle ne s'affiche donc pas sur le site en mode local.

## Modifier un fichier

1. Ouvrir le fichier dans GitHub.
2. Cliquer sur l'icône de modification.
3. Ajouter ou modifier une ligne.
4. Garder la première ligne d'en-têtes.
5. Enregistrer avec un message clair.

## Dates et heures

- Date: `YYYY-MM-DD`, exemple `2026-08-22`.
- Date de reprise d'un cours: `DD.MM`, exemple `24.08`.
- Heure: `HH:mm`, exemple `20:30`.
- Plusieurs jours ou moniteurs: séparer avec `;`.

## Cours et créneaux

Dans `courses.csv`, une ligne représente un créneau horaire précis, pas forcément un cours unique visible sur la page `Nos cours`.

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

1. ajouter une nouvelle ligne dans `courses.csv`;
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

Les concours sportifs et les manifestations sont séparés dans deux fichiers différents.

- `competitions.csv`: concours de gym et événements sportifs hors volley. Les entrées apparaissent dans `/calendrier-sportif`.
- `events.csv`: manifestations, assemblées générales, lotos, soirées et autres événements non sportifs. Les entrées apparaissent dans `/evenements`.

La colonne `category` reste affichée sur le site, mais elle ne décide plus de la page où l'entrée apparaît. C'est le fichier CSV qui décide.

### Exemple de manifestation

```csv
event-fete-2026,fete-2026,Fête de la gym,2026-06-14,2026-06-14,Gimel,Manifestation,Tous,upcoming,"Description courte",/inscriptions,/documents/programme.pdf,,true
```

### Exemple de concours sportif

```csv
competition-agres-2026,concours-agres-2026,Concours agrès,2026-05-17,2026-05-17,Aubonne,Concours de gymnastique,Agrès,upcoming,"Description courte",,/documents/programme.pdf,,false
```

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

Le slug doit correspondre à la colonne `slug` dans `data/events.csv`.

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

Le message indique le fichier, la ligne, la colonne et le format attendu. Corriger uniquement la ligne indiquée, puis relancer la validation.
