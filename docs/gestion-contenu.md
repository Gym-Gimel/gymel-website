# Gestion des contenus CSV

Cette documentation explique comment mettre à jour les cours, concours et matchs sans modifier le code.

## Où sont les fichiers

Dans GitHub, ouvrir le dossier `data/`:

- `courses.csv`
- `competitions.csv`
- `volleyball-men.csv`
- `volleyball-women.csv`

Les modèles vierges sont dans `data/templates/`.

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

Concours:

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

## Ajouter un concours

Exemple:

```csv
competition-fete-2026,fete-2026,Fête de la gym,2026-06-14,2026-06-14,Gimel,Manifestation,Tous,upcoming,"Description courte",/inscriptions,/documents/programme.pdf,,true
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

## En cas d'erreur

Le message indique le fichier, la ligne, la colonne et le format attendu. Corriger uniquement la ligne indiquée, puis relancer la validation.
