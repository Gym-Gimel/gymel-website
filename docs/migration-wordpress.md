# Migration WordPress

Le site WordPress actuel reste en ligne pendant le développement. Ne pas modifier le domaine, les DNS, l'hébergement ou les comptes.

## Pages existantes identifiées

- Accueil
- Inscriptions
- Nos cours
- Adultes
- Enfants
- Calendrier loisir
- Photos
- Sponsors
- Le comité

## Contenus repris

- Coordonnées FSG Gimel, case postale 118, 1188 Gimel, `info@gymel.ch`.
- Cours principaux et horaires hebdomadaires.
- 125 ans de la Gym de Gimel les 22 et 23 août 2026.
- Soirée de Gym, Loto et Assemblée Générale.
- Comité et e-mails publics.
- Liens sociaux Instagram et Facebook.

## Contenus à vérifier

- Textes officiels de présentation.
- Documents PDF: statuts, protection des données, bon de commande équipement.
- Images officielles des groupes.
- Formulaires d'inscription.
- Liste complète et actualisée des sponsors.
- Anciennes URL exactes et redirections finales.

## Redirections prévues

- `/planning-semaine/` vers `/nos-cours`
- `/adulte/` vers `/nos-cours?category=Adultes`
- `/enfants/` vers `/nos-cours?category=Enfants`
- `/calendrier/` vers `/calendrier-sportif`
- `/le-comite/` vers `/la-societe`

## Mise en ligne

1. Valider contenus, images et documents.
2. Vérifier lint, typecheck, tests, validation CSV et build.
3. Préparer redirections.
4. Déployer sur Vercel.
5. Basculer DNS uniquement après validation humaine.
6. Garder une procédure de retour arrière vers WordPress.
