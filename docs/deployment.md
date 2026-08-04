# Déploiement

## Vercel

1. Importer le dépôt.
2. Configurer les variables d'environnement.
3. Lancer le build avec `npm run build`.
4. Vérifier les pages principales.
5. Déployer en production uniquement après validation humaine.

## Cache CSV

Les CSV distants utilisent la revalidation Next.js. La durée est contrôlée par:

```env
CSV_REVALIDATE_SECONDS=300
```

## Secrets

Ne jamais stocker de secret dans le dépôt. La revalidation manuelle et le formulaire de contact devront utiliser des variables d'environnement.
