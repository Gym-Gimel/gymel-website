import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { committeeMembers, registrationInfo } from "@/lib/constants/content";

export const metadata: Metadata = {
  title: "La société",
  description: "Présentation, comité, valeurs et documents de la Gym de Gimel.",
};

const importantDocuments = [
  {
    title: "Statuts de la société",
    description: "Version officielle des statuts de la Gym de Gimel.",
    href: "/documents/statuts-05-10-2018.pdf",
  },
  {
    title: "Protection des données",
    description: "Déclaration relative au traitement des données personnelles.",
    href: "/documents/declaration-protection-donnees.pdf",
  },
  {
    title: "Formulaire d'inscription 2026-2027",
    description: "Document officiel pour rejoindre la Gym de Gimel.",
    href: registrationInfo.documents.registrationForm,
  },
  {
    title: "Bon de commande d'équipement",
    description: "Formulaire pour commander les équipements de la société.",
    href: registrationInfo.documents.equipmentOrder,
  },
] as const;

export default function SocietyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Société" title="La Gym de Gimel">
        Une société sportive locale qui encourage le mouvement, la santé, la vie
        associative et la convivialité à Gimel.
      </SectionHeading>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-ink">Nos valeurs</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {[
            "Mouvement pour tous",
            "Esprit d'équipe",
            "Engagement bénévole",
            "Convivialité",
            "Transmission",
            "Plaisir de bouger",
          ].map((value) => (
            <span
              key={value}
              className="rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-sm font-bold text-brand"
            >
              {value}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Le Comité</h2>
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
            <article
              key={member.email}
              className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft"
            >
              <p className="text-sm font-black uppercase tracking-wide text-brand">
                {member.role}
              </p>
              <h3 className="mt-2 text-xl font-black text-ink">
                {member.name}
              </h3>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-stone-600">
                {member.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <a
                className="mt-3 block text-sm font-semibold text-stone-600 hover:text-brand"
                href={`mailto:${member.email}`}
              >
                {member.email}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-black uppercase tracking-wide text-brand">
          Spectacles
        </p>
        <h2 className="mt-2 text-2xl font-black text-ink">
          Costumes & accessoires
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-stone-600">
          La société dispose d'un stock de costumes et d'accessoires de scène
          constitué au fil des spectacles. Certaines pièces peuvent être
          proposées à la location ou à l'achat pour d'autres sociétés et
          associations.
        </p>
        <Link
          href="/costumes-accessoires"
          className="mt-5 inline-flex rounded bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark"
        >
          Voir les informations
        </Link>
      </section>

      <section className="mt-12 rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-black text-ink">Documents importants</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {importantDocuments.map((document) => (
            <a
              key={document.href}
              href={document.href}
              download
              className="block rounded-lg border border-stone-200 p-4 transition hover:border-brand hover:bg-brand-soft"
            >
              <p className="text-xs font-black uppercase tracking-wide text-brand">
                PDF
              </p>
              <h3 className="mt-2 text-lg font-black text-ink">
                {document.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {document.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
