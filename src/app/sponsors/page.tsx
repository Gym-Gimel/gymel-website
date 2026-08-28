import type { Metadata } from "next";
import { SponsorCard } from "@/components/sponsors/sponsor-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { generalSponsors } from "@/lib/constants/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Sponsors et partenaires de la Gym de Gimel.",
};

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Partenaires" title="Sponsors et partenaires">
        La Gym de Gimel remercie chaleureusement les sponsors qui soutiennent la
        vie de la société.
      </SectionHeading>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-ink">Sponsors de la Gym</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generalSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      </section>

    </div>
  );
}
