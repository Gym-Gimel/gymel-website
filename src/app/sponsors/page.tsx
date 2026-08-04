import type { Metadata } from "next";
import { SponsorCard } from "@/components/sponsors/sponsor-card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
    anniversarySponsorNotes,
    generalSponsors,
} from "@/lib/constants/content";

export const metadata: Metadata = {
    title: "Sponsors",
    description: "Sponsors et partenaires de la Gym de Gimel.",
};

export default function SponsorsPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionHeading
                eyebrow="Partenaires"
                title="Sponsors et partenaires"
            >
                La Gym de Gimel remercie chaleureusement les sponsors qui
                soutiennent la vie de la société.
            </SectionHeading>

            <section className="mt-10">
                <h2 className="text-2xl font-black text-ink">
                    Sponsors de la Gym
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {generalSponsors.map((sponsor) => (
                        <SponsorCard key={sponsor.name} sponsor={sponsor} />
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-black text-ink">
                    Mentions liées aux 125 ans
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-stone-600">
                    Ces partenaires sont mentionnés dans les contenus actuels
                    liés aux 125 ans. Les logos officiels restent à confirmer
                    avant publication.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {anniversarySponsorNotes.map((sponsor) => (
                        <SponsorCard
                            key={sponsor.name}
                            sponsor={sponsor}
                            dashed
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
