# Déploiement

## Vercel

1. Importer le dépôt du site Next.js.
2. Configurer les variables d'environnement, notamment les URL du dépôt de données séparé.
3. Lancer le build avec `npm run build`.
4. Vérifier les pages principales.
5. Déployer en production après validation du contenu et des formulaires.

Ne pas modifier le DNS, le domaine ou l'hébergement WordPress existants pendant le développement de cette version.

## Source CSV

Les mises à jour éditoriales se font dans le dépôt séparé [Gym-Gimel/data](https://github.com/Gym-Gimel/data). Ses CSV sont publiés sur `https://gym-gimel.github.io/data/`. Pour que le site déployé lise ces fichiers, définir :

```env
CSV_SOURCE=remote
COMPETITIONS_CSV_URL=https://gym-gimel.github.io/data/competitions.csv
EVENTS_CSV_URL=https://gym-gimel.github.io/data/events.csv
COURSES_CSV_URL=https://gym-gimel.github.io/data/courses.csv
VOLLEYBALL_MEN_CSV_URL=https://gym-gimel.github.io/data/volleyball-men.csv
VOLLEYBALL_WOMEN_CSV_URL=https://gym-gimel.github.io/data/volleyball-women.csv
```

Sans `CSV_SOURCE=remote`, le site lit les copies de secours dans le dossier `data/` **du dépôt Next.js**. Dans ce cas, les mises à jour du dépôt `Gym-Gimel/data` ne s'affichent pas. Si une récupération distante échoue, le site revient aussi à la copie locale correspondante.

`EVENTS_CSV_URL` possède également une valeur de secours dans `src/lib/config.ts` pour le CSV publié des événements lorsque la variable est vide. Il reste préférable de configurer explicitement les cinq URL au déploiement. `npm run validate:data` ne vérifie que les copies locales.

Les requêtes vers les CSV distants utilisent la revalidation de cache Next.js. La durée est contrôlée par :

```env
CSV_REVALIDATE_SECONDS=300
```

Après une modification dans `Gym-Gimel/data`, vérifier d'abord le CSV publié à l'URL ci-dessus, puis la page du site. L'affichage peut être retardé par les caches. Pour une nouvelle fiche qui ne s'ouvre pas après publication, vérifier les routes générées et redéployer le site si nécessaire.

## Secrets

Ne jamais stocker de secret dans le dépôt. Configurer les clés des formulaires dans les variables d'environnement du déploiement. Il n'existe actuellement pas de route de revalidation manuelle dans `src/app/api/`.

## Analytics

Le site intègre Vercel Web Analytics via `@vercel/analytics`. Pour recevoir les statistiques, activer Web Analytics dans le projet Vercel, puis redéployer le site.

## Formulaire de contact

Le formulaire POST sur `/api/contact` envoie les messages via Resend. Variables à configurer:

```env
CONTACT_FORM_PROVIDER=resend
CONTACT_FORM_TO=adresse-de-reception@example.com
REGISTRATION_FORM_TO=
CONTACT_FORM_FROM=Gym de Gimel <adresse@domaine-verifie.example>
RESEND_API_KEY=...
```

Le domaine de `CONTACT_FORM_FROM` doit être vérifié chez le fournisseur e-mail. `CONTACT_FORM_TO` définit la boîte générale. `REGISTRATION_FORM_TO` est facultatif : sans cette variable, les inscriptions vont à `CONTACT_FORM_TO`. Vérifier la réception réelle des deux formulaires dans l'environnement visé.

## Vérifications avant publication

```bash
npm run validate:data
npm run lint
npm run typecheck
npm run test
npm run build
```

Après le déploiement, vérifier au minimum:

- l'accueil;
- `/nos-cours`;
- `/calendrier-sportif`;
- `/evenements`;
- `/photos`;
- un album photo complet;
- `/contact`;
- `/inscriptions`;
- l'envoi réel ou simulé des deux formulaires selon l'environnement ;
- une fiche d'événement ou de concours ajoutée, avec ses liens et documents.

Le [tutoriel d'ajout d'un événement](ajouter-un-evenement.md) décrit le contrôle éditorial après publication.
