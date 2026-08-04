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
- Heure: `HH:mm`, exemple `20:30`.
- Plusieurs jours ou moniteurs: séparer avec `;`.

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
