import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Coordonnées et formulaire de contact préparé pour la Gym de Gimel."
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Contact" title="Nous contacter">
        Le formulaire est prêt côté interface. L'envoi sera activé après choix d'un fournisseur e-mail et configuration des secrets.
      </SectionHeading>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form className="grid gap-5 rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Nom
            <input className="rounded border border-stone-300 px-3 py-2 font-normal" name="name" autoComplete="name" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            E-mail
            <input className="rounded border border-stone-300 px-3 py-2 font-normal" name="email" type="email" autoComplete="email" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Sujet
            <input className="rounded border border-stone-300 px-3 py-2 font-normal" name="subject" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Message
            <textarea className="min-h-36 rounded border border-stone-300 px-3 py-2 font-normal" name="message" required />
          </label>
          <p className="rounded bg-stone-50 p-3 text-sm text-stone-600">
            L'envoi n'est volontairement pas actif tant qu'aucune solution e-mail n'est configurée.
          </p>
          <button className="rounded bg-brand px-4 py-3 font-bold text-white opacity-70" type="button" aria-disabled="true">
            Envoi à configurer
          </button>
        </form>

        <aside className="rounded-lg bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-ink">Coordonnées</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="font-black text-ink">Adresse</dt>
              <dd className="mt-1 text-stone-600">{SITE.address}</dd>
              <dd className="text-stone-600">{SITE.postalAddress}</dd>
            </div>
            <div>
              <dt className="font-black text-ink">E-mail général</dt>
              <dd className="mt-1">
                <a className="font-semibold text-brand" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-black text-ink">Réseaux sociaux</dt>
              <dd className="mt-1">
                <a className="font-semibold text-brand" href={SITE.social.instagram}>
                  Instagram
                </a>{" "}
                ·{" "}
                <a className="font-semibold text-brand" href={SITE.social.facebook}>
                  Facebook
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
