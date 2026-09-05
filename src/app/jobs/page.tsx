import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Annonces pour les postes de moniteurs, aide-moniteurs et engagements bénévoles de la Gym de Gimel.",
};

type Job = {
  title: string;
  group: string;
  status: string;
  description: string;
  details: readonly string[];
  contactEmail: string;
  subject: string;
  documentHref?: string;
  documentLabel?: string;
  imageAlt?: string;
};

const jobs: readonly Job[] = [
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
      "Petite rémunération prévue.",
      "Réduction sur l'inscription pour la personne engagée et les membres de sa famille.",
    ],
    contactEmail: SITE.email,
    subject: "Annonce agrès - Gym de Gimel",
  },
  {
    title: "Responsable de la gestion des membres",
    group: "Comité",
    status: "Entrée en fonction janvier 2027",
    description:
      "La Gym de Gimel recherche une personne bénévole pour reprendre la gestion des membres au sein du comité, avec formation et accompagnement dès cet automne.",
    details: [
      "Gérer et actualiser la base de données des membres.",
      "Enregistrer les nouveaux membres et les changements.",
      "Créer les numéros de membres FSG.",
      "Actualiser les données auprès de la FSG.",
      "Profil organisé, rigoureux et à l'aise avec les outils informatiques de base.",
      "Rabais sur les cours de gymnastique pour les membres du comité.",
    ],
    contactEmail: SITE.email,
    subject: "Annonce responsable de la gestion des membres - Gym de Gimel",
    documentHref: "/documents/Annonce-responsable-gestion-membres.jpeg",
    documentLabel: "Voir l'annonce originale",
    imageAlt:
      "Annonce pour le poste bénévole de responsable de la gestion des membres à la Gym de Gimel.",
  },
  {
    title: "Un·e secrétaire",
    group: "Comité",
    status: "Entrée en fonction janvier 2027",
    description:
      "La Gym de Gimel recherche un·e secrétaire bénévole pour rejoindre son comité et participer au suivi administratif de la société.",
    details: [
      "Rédiger les procès-verbaux.",
      "Assurer le suivi administratif.",
      "Participer aux projets et événements.",
      "Connaissances informatiques, sens de la rédaction de PV et bonne maîtrise du français souhaités.",
      "Formation et accompagnement dès cet automne.",
      "Rabais sur les cours de gymnastique pour les membres du comité.",
    ],
    contactEmail: "secretaire@gymel.ch",
    subject: "Annonce secrétaire - Gym de Gimel",
    documentHref: "/documents/Annonce-secretaire.jpeg",
    documentLabel: "Voir l'annonce originale",
    imageAlt:
      "Annonce pour le poste bénévole de secrétaire au comité de la Gym de Gimel.",
  },
];

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
            className="grid gap-6 rounded-lg border border-stone-200 bg-white p-6 shadow-soft lg:grid-cols-[minmax(0,1fr)_280px]"
          >
            <div>
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

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${job.contactEmail}?subject=${encodeURIComponent(job.subject)}`}
                  className="inline-flex rounded bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark"
                >
                  Contacter la société
                </a>

                {job.documentHref ? (
                  <Link
                    href={job.documentHref}
                    className="inline-flex rounded border border-stone-300 px-4 py-2 text-sm font-bold text-ink hover:border-brand hover:text-brand"
                  >
                    {job.documentLabel}
                  </Link>
                ) : null}
              </div>
            </div>

            {job.documentHref && job.imageAlt ? (
              <Link
                href={job.documentHref}
                className="block overflow-hidden rounded-lg border border-stone-200 bg-stone-50"
              >
                <Image
                  src={job.documentHref}
                  alt={job.imageAlt}
                  width={560}
                  height={560}
                  className="h-full w-full object-cover"
                />
              </Link>
            ) : null}
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
