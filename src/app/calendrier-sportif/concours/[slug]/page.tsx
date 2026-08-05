import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDateRange } from "@/lib/formatting/date";
import {
  getCompetitionBySlug,
  getEventBySlug,
  getSportsCompetitions,
} from "@/lib/data/loaders";

export async function generateStaticParams() {
  const competitions = await getSportsCompetitions();
  return competitions.map((competition) => ({ slug: competition.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const competition = await getCompetitionBySlug(slug);
  if (!competition) return {};
  return {
    title: competition.title,
    description: competition.description
  };
}

export default async function CompetitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = await getCompetitionBySlug(slug);
  if (!competition && (await getEventBySlug(slug))) {
    redirect(`/evenements/${slug}`);
  }
  if (!competition) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/calendrier-sportif" className="text-sm font-bold text-brand hover:text-brand-dark">
        Retour au calendrier
      </Link>
      <div className="mt-6 rounded-lg border border-stone-200 bg-white p-6 shadow-soft lg:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={competition.status} />
          <span className="rounded bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">{competition.category}</span>
        </div>
        <h1 className="mt-4 text-4xl font-black text-ink">{competition.title}</h1>
        <dl className="mt-6 grid gap-4 text-sm text-stone-700 sm:grid-cols-3">
          <div>
            <dt className="font-black text-ink">Date</dt>
            <dd className="mt-1">{formatDateRange(competition.startDate, competition.endDate)}</dd>
          </div>
          <div>
            <dt className="font-black text-ink">Lieu</dt>
            <dd className="mt-1">{competition.location}</dd>
          </div>
          <div>
            <dt className="font-black text-ink">Groupe</dt>
            <dd className="mt-1">{competition.group}</dd>
          </div>
        </dl>
        <p className="mt-8 text-lg leading-8 text-stone-600">{competition.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {competition.registrationUrl ? (
            <Link href={competition.registrationUrl} className="rounded bg-brand px-4 py-2 font-bold text-white hover:bg-brand-dark">
              Inscription
            </Link>
          ) : null}
          {competition.programUrl ? (
            <Link href={competition.programUrl} className="rounded border border-stone-300 px-4 py-2 font-bold">
              Programme
            </Link>
          ) : null}
          {competition.resultsUrl ? (
            <Link href={competition.resultsUrl} className="rounded border border-stone-300 px-4 py-2 font-bold">
              Résultats
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
