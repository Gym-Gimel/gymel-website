import { EventCard } from "@/components/events/event-card";
import { formatMonth } from "@/lib/formatting/date";
import type { CalendarItem } from "@/types/data";

export function CalendarList({ items }: { items: CalendarItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
        Aucun événement ne correspond aux filtres sélectionnés.
      </div>
    );
  }

  const grouped = items.reduce<Record<string, CalendarItem[]>>((acc, item) => {
    const month = formatMonth(item.date);
    acc[month] = acc[month] ? [...acc[month], item] : [item];
    return acc;
  }, {});

  return (
    <div className="grid gap-8">
      {Object.entries(grouped).map(([month, monthItems]) => (
        <section key={month} aria-labelledby={`month-${month}`} className="grid gap-4">
          <h2 id={`month-${month}`} className="text-2xl font-black capitalize text-ink">
            {month}
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">{monthItems.map((item) => <EventCard key={`${item.type}-${item.id}`} item={item} />)}</div>
        </section>
      ))}
    </div>
  );
}
