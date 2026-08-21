import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { registrationInfo } from "@/lib/constants/content";
import { SITE } from "@/lib/constants/site";
import { getCalendarItems, getCourses, getEventItems } from "@/lib/data/loaders";
import { TextWithEmailLinks } from "@/components/ui/text-with-email-link";

export const metadata: Metadata = {
  title: "Inscriptions",
  description:
    "Fonctionnement des inscriptions, cotisations, équipement et documents utiles de la Gym de Gimel.",
};

export default async function RegistrationPage() {
  const [courses, events, sportsEvents] = await Promise.all([
    getCourses(),
    getEventItems(),
    getCalendarItems(),
  ]);
  const openCoursesCount = courses.filter(
    (course) => course.status === "open",
  ).length;
  const upcomingEventsCount = events.filter(
    (event) => event.status !== "finished",
  ).length;
  const upcomingSportsEventsCount = sportsEvents.filter(
    (event) => event.status !== "finished",
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Inscriptions"
        title="S'inscrire à la Gym de Gimel"
      >
        {registrationInfo.intro}
      </SectionHeading>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-5">
          <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-ink">Cotisations</h2>
            <ul className="mt-3 grid gap-2 leading-7 text-stone-600">
              {registrationInfo.fees.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-ink">Cours d'essai</h2>
            <p className="mt-2 leading-7 text-stone-600">
              {registrationInfo.trialCourses}
            </p>
          </article>
          <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-ink">
              Formulaire d'inscription
            </h2>
            <p className="mt-2 leading-7 text-stone-600">
              <TextWithEmailLinks>
                {registrationInfo.registrationForm}
              </TextWithEmailLinks>
            </p>
            <a
              href={registrationInfo.documents.registrationForm}
              className="mt-4 inline-flex rounded bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark"
            >
              Télécharger le formulaire d'inscription
            </a>
          </article>
          <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-ink">
              Commande d'équipements
            </h2>
            <p className="mt-2 leading-7 text-stone-600">
              <TextWithEmailLinks>
                {registrationInfo.equipment}
              </TextWithEmailLinks>
            </p>
            <a
              href={registrationInfo.documents.equipmentOrder}
              className="mt-4 inline-flex rounded border border-brand px-4 py-2 text-sm font-bold text-brand hover:bg-brand-soft"
            >
              Télécharger le bon de commande
            </a>
          </article>
          <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-ink">Démissions</h2>
            <p className="mt-2 leading-7 text-stone-600">
              <TextWithEmailLinks>
                {registrationInfo.resignation}
              </TextWithEmailLinks>
            </p>
          </article>
          <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-ink">
              Informations diverses
            </h2>
            <p className="mt-2 leading-7 text-stone-600">
              <TextWithEmailLinks>{registrationInfo.photos}</TextWithEmailLinks>
            </p>
          </article>
          <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-ink">
              Calendrier des fermetures
            </h2>
            <ul className="mt-3 grid gap-2 leading-7 text-stone-600">
              {registrationInfo.closures.map((closure) => (
                <li key={closure.name}>
                  <span className="font-bold text-ink">{closure.name}</span>
                  {" : "}
                  {closure.period}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <aside className="rounded-lg bg-brand p-6 text-white">
          <h2 className="text-2xl font-black">Infos utiles</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="font-black">Contact général</dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="underline">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-black">Cours ouverts</dt>
              <dd>
                {openCoursesCount} cours actuellement ouverts.
              </dd>
            </div>
            <div>
              <dt className="font-black">Evénements à venir</dt>
              <dd>
                {upcomingEventsCount}{" "}
                {upcomingEventsCount > 1
                  ? "événements à venir."
                  : "événement à venir."}
              </dd>
            </div>
            <div>
              <dt className="font-black">Evénements sportifs</dt>
              <dd>
                {upcomingSportsEventsCount}{" "}
                {upcomingSportsEventsCount > 1
                  ? "événements sportifs à venir."
                  : "événement sportif à venir."}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
