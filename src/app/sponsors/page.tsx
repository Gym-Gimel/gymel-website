import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { anniversarySponsors, historicalSponsors } from "@/lib/constants/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Sponsors et partenaires de la Gym de Gimel et de la fête des 125 ans."
};

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Partenaires" title="Sponsors et partenaires">
        Cette page reprend les sponsors identifiés sur le site actuel. Les logos officiels doivent encore être récupérés
        avant la publication finale.
      </SectionHeading>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-ink">Fête des 125 ans</h2>
        <p className="mt-3 max-w-3xl leading-7 text-stone-600">
          La Gym de Gimel remercie chaleureusement les partenaires et sponsors qui contribuent à la réussite de la fête des
          125 ans. Un merci particulier est adressé à la Banque Raiffeisen pour son soutien particulièrement important.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {anniversarySponsors.map((sponsor) => (
            <article key={sponsor.name} className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
              <p className="text-xl font-black text-ink">{sponsor.name}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">{sponsor.note}</p>
              <p className="mt-3 rounded bg-brand-soft px-3 py-2 text-xs font-bold text-brand">{sponsor.status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Sponsors historiques</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {historicalSponsors.map((sponsor) => (
            <article key={sponsor.name} className="rounded-lg border border-dashed border-stone-300 bg-white p-5">
              <p className="text-xl font-black text-ink">{sponsor.name}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">{sponsor.note}</p>
              <p className="mt-3 text-xs font-bold text-stone-500">{sponsor.status}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
