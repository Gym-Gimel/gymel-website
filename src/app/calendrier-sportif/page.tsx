import type { Metadata } from "next";
import { CalendarList } from "@/components/sports/calendar-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCalendarItems } from "@/lib/data/loaders";
import { compareIsoDatesDesc } from "@/lib/formatting/date";
import type { CalendarItem } from "@/types/data";

export const metadata: Metadata = {
  title: "Calendrier sportif",
  description: "Concours de gymnastique, matchs de volley, résultats et événements sportifs de la Gym de Gimel."
};

const filters = [
  { label: "Tous", value: "" },
  { label: "Concours de gymnastique", value: "competition" },
  { label: "Volley féminin", value: "volley-women" },
  { label: "Volley masculin", value: "volley-men" }
] as const;

export default async function SportsCalendarPage({ searchParams }: { searchParams: Promise<{ type?: CalendarItem["type"] }> }) {
  const params = await searchParams;
  const items = await getCalendarItems();
  const filtered = (params.type ? items.filter((item) => item.type === params.type) : items).sort((a, b) =>
    compareIsoDatesDesc(a.date, b.date)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Calendrier" title="Calendrier sportif">
        Les concours et matchs sont récupérés côté serveur, validés, puis regroupés automatiquement par mois.
      </SectionHeading>
      <form className="mt-8 flex flex-wrap gap-2" action="/calendrier-sportif">
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="submit"
            name="type"
            value={filter.value}
            aria-pressed={(params.type ?? "") === filter.value}
            className="rounded border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-700 hover:border-brand hover:text-brand aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-white"
          >
            {filter.label}
          </button>
        ))}
      </form>
      <div className="mt-8">
        <CalendarList items={filtered} />
      </div>
    </div>
  );
}
