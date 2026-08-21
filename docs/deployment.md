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
COMPETITIONS_CSV_URL=https://...
EVENTS_CSV_URL=https://...
COURSES_CSV_URL=https://...
VOLLEYBALL_MEN_CSV_URL=https://...
VOLLEYBALL_WOMEN_CSV_URL=https://...
```

Sans `CSV_SOURCE=remote`, une ligne présente uniquement dans un CSV distant ne sera pas publiée. Il faut soit l'ajouter au CSV local correspondant, soit activer explicitement la source distante.

Les CSV distants utilisent alors la revalidation Next.js. La durée est contrôlée par:

```env
CSV_REVALIDATE_SECONDS=300
```

## Secrets

Ne jamais stocker de secret dans le dépôt. La revalidation manuelle et le formulaire de contact doivent utiliser des variables d'environnement.

## Formulaire de contact

Le formulaire POST sur `/api/contact` envoie les messages via Resend. Variables à configurer:

```env
CONTACT_FORM_PROVIDER=resend
CONTACT_FORM_TO=contact@daviddieperink.ch
CONTACT_FORM_FROM=Gym de Gimel <contact@gymel.ch>
RESEND_API_KEY=...
```

`CONTACT_FORM_FROM` doit correspondre à une adresse ou un domaine validé chez le fournisseur e-mail. Pour passer de la boîte de test à la boîte finale de la société, modifier `CONTACT_FORM_TO`.
