import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDateRange } from "@/lib/formatting/date";
import type { CalendarItem } from "@/types/data";

export function EventCard({ item }: { item: CalendarItem }) {
  const date =
    item.type === "competition" || item.type === "event"
      ? formatDateRange(item.date, item.endDate)
      : `${formatDateRange(item.date)} · ${item.time}`;

  return (
    <article className="flex h-full flex-col rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={item.status} />

          <span className="text-sm font-bold text-brand">{item.category}</span>
        </div>

        <div>
          <p className="text-sm font-bold text-stone-500">{date}</p>

          <h3 className="mt-1 text-xl font-black text-ink">{item.title}</h3>

          <p className="mt-2 text-sm leading-6 text-stone-600">
            {item.location}
          </p>

          {"description" in item && item.description ? (
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {item.description}
            </p>
          ) : null}

          {"score" in item && item.score ? (
            <p className="mt-3 font-black text-ink">Résultat : {item.score}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-start gap-2 pt-5">
        {item.href ? (
          <Link
            href={item.href}
            className="inline-flex w-fit items-center justify-center rounded bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark"
          >
            Détails
          </Link>
        ) : null}

        {"programUrl" in item && item.programUrl ? (
          <Link
            href={item.programUrl}
            className="inline-flex w-fit items-center justify-center rounded border border-stone-300 px-4 py-2 text-sm font-bold"
          >
            Programme
          </Link>
        ) : null}

        {"resultsUrl" in item && item.resultsUrl ? (
          <Link
            href={item.resultsUrl}
            className="inline-flex w-fit items-center justify-center rounded border border-stone-300 px-4 py-2 text-sm font-bold"
          >
            Résultats
          </Link>
        ) : null}
      </div>
    </article>
  );
}
