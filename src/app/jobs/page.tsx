import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Annonces pour les postes de moniteurs, aide-moniteurs et engagements bénévoles de la Gym de Gimel.",
};

const jobs = [
  {
    title: "Aide-moniteur/trice ou moniteur/trice agrès",
    group: "Groupe agrès",
    status: "Recherche active",
    description:
      "Le groupe agrès recherche une personne motivée pour accompagner les entraînements, soutenir les gymnastes et participer à la vie du groupe.",
    details: [
      "Encadrement des gymnastes pendant les entraînements.",
      "Soutien technique selon l'expérience et le niveau de formation.",
      "Collaboration avec les monitrices et moniteurs du groupe.",
      "Engagement régulier pendant la saison sportive.",
    ],
  },
] as const;

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Jobs" title="Rejoindre l'équipe">
        La Gym de Gimel recherche ponctuellement des personnes motivées pour
        soutenir ses groupes, encadrer les entraînements et faire vivre la
        société.
      </SectionHeading>

      <section className="mt-10 grid gap-5">
        {jobs.map((job) => (
          <article
            key={job.title}
            className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-brand">
                  {job.group}
                </p>
                <h2 className="mt-2 text-2xl font-black text-ink">
                  {job.title}
                </h2>
              </div>
              <span className="rounded bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                {job.status}
              </span>
            </div>

            <p className="mt-4 max-w-3xl leading-7 text-stone-600">
              {job.description}
            </p>

            <ul className="mt-5 grid gap-2 leading-7 text-stone-600">
              {job.details.map((detail) => (
                <li key={detail}>- {detail}</li>
              ))}
            </ul>

            <Link
              href={`mailto:${SITE.email}?subject=Annonce%20agr%C3%A8s%20-%20Gym%20de%20Gimel`}
              className="mt-6 inline-flex rounded bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark"
            >
              Contacter la société
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-6">
        <h2 className="text-xl font-black text-ink">Autres engagements</h2>
        <p className="mt-3 leading-7 text-stone-600">
          D'autres annonces pourront être publiées ici selon les besoins de la
          société et des différents groupes.
        </p>
      </section>
    </div>
  );
}
