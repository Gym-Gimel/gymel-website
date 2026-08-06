# Déploiement

## Vercel

1. Importer le dépôt.
2. Configurer les variables d'environnement.
3. Lancer le build avec `npm run build`.
4. Vérifier les pages principales.
5. Déployer en production uniquement après validation humaine.

## Source CSV

Par défaut, le site lit les fichiers locaux dans `data/` afin que le contenu versionné dans le dépôt soit la source publiée. Pour utiliser les CSV distants, définir:

```env
CSV_SOURCE=remote
```

Les CSV distants utilisent alors la revalidation Next.js. La durée est contrôlée par:

```env
CSV_REVALIDATE_SECONDS=300
```

## Secrets

Ne jamais stocker de secret dans le dépôt. La revalidation manuelle et le formulaire de contact devront utiliser des variables d'environnement.
