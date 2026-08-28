import Image from "next/image";
import Link from "next/link";
import { CourseCard } from "@/components/courses/course-card";
import { WeeklySchedule } from "@/components/courses/weekly-schedule";
import { EventCard } from "@/components/events/event-card";
import { SponsorCard } from "@/components/sponsors/sponsor-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { generalSponsors } from "@/lib/constants/content";
import { SITE } from "@/lib/constants/site";
import {
  getCalendarItems,
  getCourseGroups,
  getCourses,
  getEventItems,
  getFeaturedCalendarItems,
} from "@/lib/data/loaders";
import { compareIsoDatesDesc } from "@/lib/formatting/date";

export default async function HomePage() {
  const [courses, courseGroups, featuredItems, calendarItems, eventItems] =
    await Promise.all([
      getCourses(),
      getCourseGroups(),
      getFeaturedCalendarItems(3),
      getCalendarItems(),
      getEventItems(),
    ]);
  const highlightedCourses = courseGroups
    .filter((course) =>
      ["Enfants", "Adultes", "Volley", "Compétition"].includes(course.category),
    )
    .slice(0, 4);
  const homeEventItems = (featuredItems.length > 0
    ? featuredItems
    : [...eventItems, ...calendarItems]
  )
    .filter((item) => item.status !== "finished")
    .sort((a, b) => compareIsoDatesDesc(a.date, b.date))
    .slice(0, 3);

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
              Des cours pour enfants, jeunes et adultes, du volley, des agrès,
              de la danse, du yoga et des événements qui rassemblent le village
              autour du sport.
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
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="A venir" title="Prochains événements">
          Retrouvez les prochains événements organisés par la Gym de Gimel,
          ainsi que les concours et manifestations auxquels la société
          participe.
        </SectionHeading>
        {homeEventItems.length > 0 ? (
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {homeEventItems.map((item) => (
              <EventCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
            Aucun prochain événement n'est annoncé pour le moment.
          </p>
        )}
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading eyebrow="Cours" title="Trouver un cours">
              Retrouvez ici la liste des cours proposés par la Gym de Gimel.
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
          Voici le planning hebdomadaire des cours et activités proposés par la
          Gym de Gimel.
        </SectionHeading>
        <WeeklySchedule courses={courses} compact />
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SectionHeading
            eyebrow="La société"
            title="Sport, bénévolat et convivialité"
          >
            La Gym de Gimel est une société locale portée par son comité, ses
            moniteurs et ses membres. Elle propose une pratique accessible à
            toutes les générations, avec une attention particulière au plaisir
            de bouger ensemble.
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Enfants et jeunesse", "Adultes", "Volley", "Manifestations"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 p-5"
                >
                  <p className="text-lg font-black text-ink">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Une offre structurée et évolutive pour la vie sportive
                    locale.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Partenaires" title="Sponsors de la Gym">
          La Gym de Gimel remercie les sponsors qui soutiennent la vie de la
          société. Contact:{" "}
          <a className="font-bold text-brand" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </SectionHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generalSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      </section>
    </>
  );
}
