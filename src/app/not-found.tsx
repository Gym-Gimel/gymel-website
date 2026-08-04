import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-brand">404</p>
      <h1 className="mt-3 text-4xl font-black text-ink">Page introuvable</h1>
      <p className="mt-4 text-stone-600">Cette page n'existe pas encore ou sera redirigée lors de la migration depuis WordPress.</p>
      <Link href="/" className="mt-8 inline-block rounded bg-brand px-5 py-3 font-bold text-white hover:bg-brand-dark">
        Retour à l'accueil
      </Link>
    </div>
  );
}
