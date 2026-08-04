import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { committeeMembers } from "@/lib/constants/content";

export const metadata: Metadata = {
  title: "La société",
  description: "Présentation, comité, valeurs et documents de la Gym de Gimel."
};

export default function SocietyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Société" title="La Gym de Gimel">
        Une société sportive locale qui encourage le mouvement, la santé, la vie associative et la convivialité à Gimel.
      </SectionHeading>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {["Mouvement pour tous", "Esprit d'équipe", "Engagement bénévole"].map((value) => (
          <article key={value} className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-black text-brand">{value}</h2>
            <p className="mt-3 leading-7 text-stone-600">
              Une valeur à préciser avec les textes officiels de la société avant la publication finale.
            </p>
          </article>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Comité</h2>
        <div className="relative mt-5 aspect-[2560/1493] overflow-hidden rounded-lg bg-stone-100 shadow-soft">
          <Image
            src="/images/comite.jpg"
            alt="Membres du comité de la Gym de Gimel"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 1152px, calc(100vw - 32px)"
            priority
          />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {committeeMembers.map((member) => (
            <article key={member.email} className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
              <p className="text-sm font-black uppercase tracking-wide text-brand">{member.role}</p>
              <h3 className="mt-2 text-xl font-black text-ink">{member.name}</h3>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-stone-600">
                {member.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <a className="mt-3 block text-sm font-semibold text-stone-600 hover:text-brand" href={`mailto:${member.email}`}>
                {member.email}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-black text-ink">Documents importants</h2>
        <p className="mt-3 leading-7 text-stone-600">
          Les statuts, la déclaration de protection des données et le bon de commande de l'équipement doivent être récupérés
          depuis WordPress et placés dans <code className="rounded bg-stone-100 px-1">public/documents</code>.
        </p>
      </section>
    </div>
  );
}
