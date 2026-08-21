import type { Metadata } from "next";
import { EventCard } from "@/components/events/event-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getEventItems } from "@/lib/data/loaders";
import { compareIsoDatesDesc } from "@/lib/formatting/date";

export const metadata: Metadata = {
  title: "Evénements",
  description: "Manifestations, fêtes et archives de la Gym de Gimel.",
};

export default async function EventsPage() {
  const items = await getEventItems();
  const upcoming = items
    .filter((item) => item.status !== "finished")
    .sort((a, b) => compareIsoDatesDesc(a.date, b.date));
  const archived = items
    .filter((item) => item.status === "finished")
    .sort((a, b) => compareIsoDatesDesc(a.date, b.date));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Manifestations" title="Evénements">
        Retrouvez ici les événements et les manifestations non sportives
        organisés par la Gym de Gimel. Les archives des événements passés sont
        également disponibles sur cette page.
      </SectionHeading>
      <section className="mt-10">
        <h2 className="text-2xl font-black text-ink">A venir</h2>
        {upcoming.length > 0 ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {upcoming.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
            Aucun prochain événement n'est annoncé pour le moment.
          </p>
        )}
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Archives</h2>
        {archived.length > 0 ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {archived.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
            Aucun événement archivé pour le moment.
          </p>
        )}
      </section>
    </div>
  );
}
