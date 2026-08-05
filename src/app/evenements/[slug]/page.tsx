import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDateRange } from "@/lib/formatting/date";
import { getEventBySlug, getEventCompetitions } from "@/lib/data/loaders";

export async function generateStaticParams() {
  const events = await getEventCompetitions();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/evenements"
        className="text-sm font-bold text-brand hover:text-brand-dark"
      >
        Retour aux événements
      </Link>
      <div className="mt-6 rounded-lg border border-stone-200 bg-white p-6 shadow-soft lg:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={event.status} />
          <span className="rounded bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">
            {event.category}
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-black text-ink">{event.title}</h1>
        <dl className="mt-6 grid gap-4 text-sm text-stone-700 sm:grid-cols-3">
          <div>
            <dt className="font-black text-ink">Date</dt>
            <dd className="mt-1">
              {formatDateRange(event.startDate, event.endDate)}
            </dd>
          </div>
          <div>
            <dt className="font-black text-ink">Lieu</dt>
            <dd className="mt-1">{event.location}</dd>
          </div>
          <div>
            <dt className="font-black text-ink">Groupe</dt>
            <dd className="mt-1">{event.group}</dd>
          </div>
        </dl>
        <p className="mt-8 text-lg leading-8 text-stone-600">
          {event.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {event.registrationUrl ? (
            <Link
              href={event.registrationUrl}
              className="rounded bg-brand px-4 py-2 font-bold text-white hover:bg-brand-dark"
            >
              Inscription
            </Link>
          ) : null}
          {event.programUrl ? (
            <Link
              href={event.programUrl}
              className="rounded border border-stone-300 px-4 py-2 font-bold"
            >
              Programme
            </Link>
          ) : null}
          {event.resultsUrl ? (
            <Link
              href={event.resultsUrl}
              className="rounded border border-stone-300 px-4 py-2 font-bold"
            >
              Résultats
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
