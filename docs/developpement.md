# Guide développeur

## Démarrer

Utiliser Node.js 20 ou plus récent et npm. Depuis la racine du dépôt :

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Le site est accessible sur `http://localhost:3000`. Les CSV locaux suffisent pour démarrer ; les variables des services externes ne sont nécessaires que pour tester ces services. Ne pas ajouter `.env.local` ni les secrets au dépôt. Le site WordPress actuel est indépendant de ce projet.

## Repères dans le code

| Emplacement | Rôle |
| --- | --- |
| `src/app` | Pages App Router, routes API, métadonnées, sitemap et robots |
| `src/components` | Interface réutilisable ; composants client pour les interactions nécessaires |
| `src/lib/data/files.ts` | Choix entre CSV local et distant, avec repli local en cas d'échec réseau |
| `src/lib/data/loaders.ts` | Lecture, validation et conversion en données pour les pages |
| `src/lib/validation/schemas.ts` | Schémas Zod et valeurs autorisées |
| `src/lib/csv/parse.ts` | Analyse CSV, erreurs et unicité des identifiants |
| `src/lib/courses/grouping.ts` | Regroupement des créneaux sur les fiches de cours |
| `src/lib/photos/albums.ts` | Déclaration des albums photos |
| `data/` | Copies locales de secours et modèles CSV ; les mises à jour sont dans `Gym-Gimel/data` |
| `public/` | Documents et images publiés |

Les pages sont des Server Components par défaut. Les champs CSV sont rendus comme du texte ; ne pas introduire de rendu HTML arbitraire venant de ces fichiers. Pour l'architecture détaillée et les routes, voir [Architecture](architecture.md).

## Trajet des données CSV

1. `src/lib/config.ts` lit `CSV_SOURCE`, les URL et `CSV_REVALIDATE_SECONDS`. Les URL publiées viennent du dépôt séparé [Gym-Gimel/data](https://github.com/Gym-Gimel/data). Une URL de secours est définie pour les événements si `EVENTS_CSV_URL` est vide.
2. `readCsvWithFallback` dans `src/lib/data/files.ts` prend la copie locale par défaut. En mode `remote`, il récupère l'URL du type de contenu ; si l'URL manque ou échoue, il lit le fichier local correspondant.
3. `parseCsvRows` et le schéma Zod valident les lignes. Les doublons de `id` et `slug` sont contrôlés dans chaque fichier d'événements ou de cours ; l'unicité entre fichiers n'est pas contrôlée.
4. Les loaders de `src/lib/data/loaders.ts` journalisent les erreurs côté serveur et conservent les lignes valides. Les pages lisent ces résultats.

`npm run validate:data` valide uniquement les cinq copies locales, indépendamment de `CSV_SOURCE`. Une erreur de récupération distante provoque un repli local ; une réponse distante reçue mais contenant des lignes invalides est analysée telle quelle, sans repli automatique. Vérifier la source active lors d'un diagnostic. Pour contrôler une mise à jour éditoriale, inspecter le CSV publié par le dépôt séparé et l'affichage du site.

## Ajouter ou modifier un type de contenu

Pour une nouvelle manifestation ou un concours, commencer par le [tutoriel éditorial](ajouter-un-evenement.md). Les deux fichiers utilisent `competitionSchema`. Leur emplacement, plutôt que `category`, détermine la page publique. Le statut `draft` ne masque pas une ligne ; `finished` la place dans les archives de `/evenements`. Le code ne transforme pas automatiquement le statut selon la date.

Si la structure CSV change, mettre à jour ensemble : le schéma Zod, le type TypeScript, les loaders et les composants consommateurs, les deux modèles dans `data/templates/`, les CSV du dépôt séparé, les copies locales de secours, la validation et la documentation. Pour un nouveau créneau de cours regroupé, mettre aussi à jour `src/lib/courses/grouping.ts`. Pour un album, déclarer le dossier et ses métadonnées dans `src/lib/photos/albums.ts`.

## Contrôles avant livraison

```bash
npm run validate:data
npm run lint
npm run typecheck
npm run test
npm run build
```

Ces commandes sont aussi exécutées par `.github/workflows/ci.yml` sur les demandes de fusion et les poussées vers `main`. Vérifier manuellement les pages concernées et les liens vers les documents. Le build permet notamment de repérer les erreurs de génération des routes.

La configuration de publication et des services externes est décrite dans [Déploiement](deployment.md). Noter les contenus officiels manquants avant livraison ; ne pas publier de document officiel sans validation humaine.
