import type { Metadata } from "next";
import { EventCard } from "@/components/events/event-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCalendarItems } from "@/lib/data/loaders";

export const metadata: Metadata = {
  title: "Evénements",
  description: "Manifestations, fêtes et archives de la Gym de Gimel."
};

export default async function EventsPage() {
  const items = (await getCalendarItems()).filter((item) => item.type === "competition" && item.category !== "Concours de gymnastique");
  const upcoming = items.filter((item) => item.status !== "finished");
  const archived = items.filter((item) => item.status === "finished");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Manifestations" title="Evénements">
        Les événements de société sont affichés depuis les mêmes données validées que le calendrier.
      </SectionHeading>
      <section className="mt-10">
        <h2 className="text-2xl font-black text-ink">A venir</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {upcoming.map((item) => (
            <EventCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Archives</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {archived.map((item) => (
            <EventCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
