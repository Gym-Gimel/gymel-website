# Tutoriel : ajouter un événement

Ce guide s'adresse aux personnes qui mettent à jour le contenu du site. Les CSV à modifier se trouvent à la racine du dépôt GitHub séparé [Gym-Gimel/data](https://github.com/Gym-Gimel/data). Le dossier `data/` de ce projet Next.js contient seulement des copies locales de secours et des modèles ; ce n'est pas l'endroit où saisir les mises à jour courantes. Il n'y a pas d'interface d'administration sur le site.

## 1. Choisir le bon fichier

| Contenu | Fichier dans `Gym-Gimel/data` | Page publique | Adresse du détail |
| --- | --- | --- | --- |
| Fête, loto, assemblée, soirée ou autre manifestation non sportive | [`events.csv`](https://github.com/Gym-Gimel/data/blob/main/events.csv) | `/evenements` | `/evenements/<slug>` |
| Concours de gymnastique ou autre événement sportif hors volley | [`competitions.csv`](https://github.com/Gym-Gimel/data/blob/main/competitions.csv) | `/calendrier-sportif` | `/calendrier-sportif/concours/<slug>` |

Les matchs de volley ont leurs propres fichiers (`volleyball-men.csv` et `volleyball-women.csv`) dans ce même dépôt. La colonne `category` donne un libellé visible ; elle ne change pas la page de destination. Les deux fichiers de ce tutoriel utilisent les mêmes colonnes. Leurs en-têtes vierges sont aussi disponibles dans le dossier local `data/templates/` du projet Next.js.

## 2. Préparer les informations

Réunir le titre officiel, la date de début et de fin, le lieu, le groupe concerné et une courte description validée. Préparer aussi, si nécessaire, les liens d'inscription, du programme et des résultats. Une heure peut être indiquée dans la description : les CSV d'événements n'ont pas de colonne d'heure.

Pour un document, faire ajouter le PDF validé dans `public/documents/` du dépôt **du site Next.js**, puis utiliser son adresse publique, par exemple `/documents/programme-fete-2027.pdf`. Vérifier que ce fichier est bien publié et que son nom correspond exactement à l'adresse. Un lien externe doit commencer par `https://` ou `http://`.

## 3. Ajouter une ligne dans GitHub

1. Ouvrir le fichier choisi dans [Gym-Gimel/data](https://github.com/Gym-Gimel/data), puis cliquer sur **Modifier** (icône crayon). Si les modifications passent par une revue, créer une branche et une demande de fusion dans ce dépôt.
2. Conserver la première ligne d'en-têtes et ajouter une ligne complète à la fin du fichier. Ne pas modifier l'ordre des colonnes.
3. Choisir un `id` et un `slug` uniques dans ce fichier. Le `slug` forme l'adresse publique : uniquement des minuscules, chiffres et tirets, sans espace ni accent. Éviter aussi de réutiliser le même slug dans l'autre fichier.
4. Enregistrer la modification avec un message précis, par exemple `Ajoute la fête annuelle 2027`.

Exemple **fictif** d'une manifestation à ajouter dans `events.csv` du dépôt séparé (une seule ligne, sans recopier l'en-tête) :

```csv
event-fete-annuelle-2027,fete-annuelle-2027,Fête annuelle 2027,2027-06-12,2027-06-12,Gimel,Manifestation,Tous,upcoming,"Fête annuelle de la Gym de Gimel. Début à 14h00.",,,,false
```

Cette ligne crée `/evenements/fete-annuelle-2027` une fois la donnée publiée et chargée par le site. Pour un concours, utiliser le même format dans `competitions.csv`, avec un `id` comme `competition-agres-2027` et un `slug` comme `concours-agres-2027`.

### Référence des colonnes

| Colonne | Valeur attendue | Exemple |
| --- | --- | --- |
| `id` | Identifiant interne unique dans le fichier ; ne pas le réutiliser | `event-fete-annuelle-2027` |
| `slug` | Partie finale de l'URL, unique dans le fichier | `fete-annuelle-2027` |
| `title` | Titre affiché | `Fête annuelle 2027` |
| `startDate` | Date de début au format `YYYY-MM-DD` | `2027-06-12` |
| `endDate` | Date de fin au même format, égale ou postérieure au début | `2027-06-12` |
| `location` | Lieu affiché | `Gimel` |
| `category` | Libellé affiché ; ne détermine pas la page | `Manifestation` |
| `group` | Groupe concerné | `Tous` |
| `status` | Un des statuts ci-dessous | `upcoming` |
| `description` | Texte court affiché sur la carte et la fiche | `Début à 14h00.` |
| `registrationUrl` | Facultatif : lien interne ou URL absolue | `/inscriptions` |
| `programUrl` | Facultatif : lien vers le programme | `/documents/programme-fete-2027.pdf` |
| `resultsUrl` | Facultatif : lien vers les résultats | `/documents/resultats-fete-2027.pdf` |
| `featured` | `true` ou `false` pour la sélection de l'accueil | `false` |

Toutes les colonnes doivent être présentes, même quand un lien facultatif est vide. Séparer les valeurs par des virgules. Si un texte contient une virgule, l'entourer de guillemets doubles ; dans un texte déjà entre guillemets, écrire `""` pour afficher un guillemet. Ne pas insérer de HTML dans le CSV.

### Choisir le statut

| Valeur CSV | Libellé affiché | Usage |
| --- | --- | --- |
| `upcoming` | À venir | Événement annoncé |
| `registration-open` | Inscriptions ouvertes | Inscription possible |
| `registration-closed` | Inscriptions fermées | Inscription terminée |
| `finished` | Terminé | Événement à classer dans les archives |
| `cancelled` | Annulé | Événement annulé |
| `draft` | Brouillon | Statut technique visible sur le site : ne pas l'utiliser pour préparer un contenu confidentiel |

Le statut ne change **pas automatiquement** lorsque la date passe. Sur `/evenements`, seul `finished` va dans « Archives » ; les autres statuts restent dans « À venir », y compris `draft` et `cancelled`. Mettre à jour le statut manuellement après l'événement. `featured=true` rend l'entrée candidate à la sélection des événements de l'accueil ; cette sélection est limitée à trois entrées et exclut ensuite celles marquées `finished`.

## 4. Vérifier avant publication

Relire la ligne dans le dépôt séparé : nombre de colonnes, dates, `slug`, statut et liens. Si une demande de fusion est utilisée, attendre les éventuels contrôles du dépôt avant de la fusionner. Vérifier ensuite que le CSV publié contient la ligne sur `https://gym-gimel.github.io/data/events.csv` ou `https://gym-gimel.github.io/data/competitions.csv`.

Ouvrir `/evenements` ou `/calendrier-sportif` sur le site, puis la fiche de l'entrée. Vérifier le titre, les dates, le statut, les liens et les documents. Une ligne invalide peut être ignorée avec un avertissement dans les journaux du serveur. Demander une vérification technique si l'entrée n'apparaît pas.

Dans le projet Next.js, `npm run validate:data` ne contrôle **que ses copies locales** dans `data/` ; cette commande ne valide pas directement le dépôt GitHub séparé.

## 5. Publier et entretenir l'entrée

Enregistrer la modification dans `Gym-Gimel/data` et attendre la publication de ses CSV. Le site doit être configuré avec `CSV_SOURCE=remote` pour lire ce dépôt ; les données publiées peuvent prendre quelques minutes à apparaître à cause du cache. Si un nouvel événement apparaît dans la liste mais que sa fiche ne s'ouvre pas, demander à la personne qui gère le site de vérifier le déploiement et les routes générées.

Après publication, ouvrir l'URL publique pour vérifier le résultat. Plus tard, modifier la même ligne pour fermer les inscriptions, ajouter les résultats ou passer à `finished`. Garder le même `id` et le même `slug` pour conserver l'adresse de la fiche. La procédure technique de publication est détaillée dans [Déploiement](deployment.md).
