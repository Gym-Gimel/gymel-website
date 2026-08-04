import Image from "next/image";
import Link from "next/link";
import { CourseCard } from "@/components/courses/course-card";
import { WeeklySchedule } from "@/components/courses/weekly-schedule";
import { EventCard } from "@/components/events/event-card";
import { SponsorCard } from "@/components/sponsors/sponsor-card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
    anniversarySponsorNotes,
    generalSponsors,
} from "@/lib/constants/content";
import { SITE } from "@/lib/constants/site";
import {
    getCalendarItems,
    getCourseGroups,
    getCourses,
    getFeaturedCalendarItems,
} from "@/lib/data/loaders";

export default async function HomePage() {
    const [courses, courseGroups, featuredItems, calendarItems] = await Promise.all([
        getCourses(),
        getCourseGroups(),
        getFeaturedCalendarItems(3),
        getCalendarItems(),
    ]);
    const highlightedCourses = courseGroups
        .filter((course) =>
            ["Enfants", "Adultes", "Volley", "Compétition"].includes(
                course.category,
            ),
        )
        .slice(0, 4);

    return (
        <>
            <section className="bg-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-black uppercase tracking-wide text-brand">
                            Société sportive à Gimel
                        </p>
                        <h1 className="mt-3 text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">
                            Gym de Gimel
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
                            Des cours pour enfants, jeunes et adultes, du
                            volley, des agrès, de la danse, du yoga et des
                            événements qui rassemblent le village autour du
                            sport.
                        </p>
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/nos-cours"
                                className="rounded bg-brand px-5 py-3 text-center font-bold text-white hover:bg-brand-dark"
                            >
                                Découvrir les cours
                            </Link>
                            <Link
                                href="/inscriptions"
                                className="rounded border border-brand px-5 py-3 text-center font-bold text-brand hover:bg-brand-soft"
                            >
                                S'inscrire
                            </Link>
                        </div>
                    </div>
                    <div className="relative min-h-[360px] overflow-hidden rounded-xl bg-brand-soft shadow-soft">
                        <Image
                            src="/images/home.png"
                            alt="Visuel temporaire pour la Gym de Gimel"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-brand text-white">
                <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
                    <div>
                        <p className="text-xl font-black">
                            125 ans de la Gym de Gimel
                        </p>
                        <p className="mt-1 text-sm text-white/85">
                            Rendez-vous les 22 et 23 août 2026 pour un week-end
                            de fête, de sport et de convivialité.
                        </p>
                    </div>
                    <Link
                        href="/calendrier-sportif/concours/125-ans-gym-gimel"
                        className="rounded bg-white px-4 py-2 text-center font-bold text-brand"
                    >
                        Voir le détail
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <SectionHeading eyebrow="A venir" title="Prochains événements">
                    Concours, matchs et manifestations sont alimentés par les
                    fichiers CSV et triés automatiquement.
                </SectionHeading>
                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                    {(featuredItems.length > 0
                        ? featuredItems
                        : calendarItems.slice(0, 3)
                    ).map((item) => (
                        <EventCard
                            key={`${item.type}-${item.id}`}
                            item={item}
                        />
                    ))}
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="Cours"
                            title="Trouver un cours"
                        >
                            Un aperçu des groupes principaux. La liste complète
                            peut être filtrée par catégorie, âge et jour.
                        </SectionHeading>
                        <Link
                            href="/nos-cours"
                            className="rounded border border-brand px-4 py-2 text-center font-bold text-brand hover:bg-brand-soft"
                        >
                            Tous les cours
                        </Link>
                    </div>
                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {highlightedCourses.map((course) => (
                            <CourseCard key={course.slug} course={course} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <SectionHeading eyebrow="Semaine" title="Activités par jour">
                    Les horaires reprennent le planning actuel et peuvent être
                    mis à jour dans le CSV des cours.
                </SectionHeading>
                <WeeklySchedule courses={courses} compact />
            </section>

            <section className="bg-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <SectionHeading
                        eyebrow="La société"
                        title="Sport, bénévolat et convivialité"
                    >
                        La Gym de Gimel est une société locale portée par son
                        comité, ses moniteurs et ses membres. Elle propose une
                        pratique accessible à toutes les générations, avec une
                        attention particulière au plaisir de bouger ensemble.
                    </SectionHeading>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            "Enfants et jeunesse",
                            "Adultes",
                            "Volley",
                            "Manifestations",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-lg border border-stone-200 p-5"
                            >
                                <p className="text-lg font-black text-ink">
                                    {item}
                                </p>
                                <p className="mt-2 text-sm leading-6 text-stone-600">
                                    Une offre structurée et évolutive pour la
                                    vie sportive locale.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Partenaires"
                    title="Sponsors de la Gym"
                >
                    La Gym de Gimel remercie les sponsors qui soutiennent la vie
                    de la société. Contact:{" "}
                    <a
                        className="font-bold text-brand"
                        href={`mailto:${SITE.email}`}
                    >
                        {SITE.email}
                    </a>
                    .
                </SectionHeading>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {generalSponsors.map((sponsor) => (
                        <SponsorCard key={sponsor.name} sponsor={sponsor} />
                    ))}
                </div>
                <h3 className="mt-10 text-xl font-black text-ink">
                    Mentions liées aux 125 ans à confirmer
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {anniversarySponsorNotes.map((sponsor) => (
                        <SponsorCard key={sponsor.name} sponsor={sponsor} dashed />
                    ))}
                </div>
            </section>
        </>
    );
}
