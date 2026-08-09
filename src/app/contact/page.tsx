import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
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
        Une question sur les cours, les inscriptions ou la société ? Envoyez-nous
        un message via le formulaire ci-dessous.
      </SectionHeading>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ContactForm />

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
