import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCourseGroupBySlug, getCourseGroups } from "@/lib/data/loaders";

export async function generateStaticParams() {
  const courses = await getCourseGroups();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseGroupBySlug(slug);
  if (!course) return {};
  return {
    title: course.name,
    description: course.shortDescription
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseGroupBySlug(slug);
  if (!course) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/nos-cours" className="text-sm font-bold text-brand hover:text-brand-dark">
        Retour aux cours
      </Link>
      <div className="mt-6 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
        <div className="relative aspect-[16/7] min-h-[260px] bg-stone-100">
          {course.image ? <Image src={course.image} alt="" fill className="object-cover" priority /> : null}
        </div>
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_320px] lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={course.status} />
              <span className="rounded bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">{course.category}</span>
            </div>
            <h1 className="mt-4 text-4xl font-black text-ink">{course.name}</h1>
            <p className="mt-4 text-lg leading-8 text-stone-600">{course.fullDescription}</p>
            <section className="mt-8">
              <h2 className="text-2xl font-black text-ink">
                {course.sessions.length > 1 ? "Formats du cours" : "Horaire du cours"}
              </h2>
              <div className="mt-4 grid gap-4">
                {course.sessions.map((session) => (
                  <article key={session.id} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={session.status} />
                      {session.note ? (
                        <span className="rounded bg-gold/10 px-2.5 py-1 text-xs font-bold text-stone-800">{session.note}</span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-xl font-black text-ink">{session.name}</h3>
                    <dl className="mt-4 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
                      <div>
                        <dt className="font-black text-ink">Jour</dt>
                        <dd className="mt-1">{session.days.join(", ")}</dd>
                      </div>
                      <div>
                        <dt className="font-black text-ink">Horaire</dt>
                        <dd className="mt-1">
                          {session.startTime}-{session.endTime}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-black text-ink">Lieu</dt>
                        <dd className="mt-1">{session.location}</dd>
                      </div>
                      <div>
                        <dt className="font-black text-ink">Cotisation</dt>
                        <dd className="mt-1">{session.price}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <aside className="rounded-lg bg-stone-50 p-5">
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="font-black text-ink">Age</dt>
                <dd className="mt-1 text-stone-600">{course.ageRange}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">Jours</dt>
                <dd className="mt-1 text-stone-600">{course.days.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">Formats</dt>
                <dd className="mt-1 text-stone-600">{course.sessions.length}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">Contact</dt>
                <dd className="mt-1 grid gap-1 text-stone-600">
                  {[...new Set(course.sessions.flatMap((session) => session.monitors))].map((monitor) => (
                    <span key={monitor}>{monitor}</span>
                  ))}
                </dd>
              </div>
            </dl>
            {course.registrationUrl ? (
              <Link href={course.registrationUrl} className="mt-6 block rounded bg-brand px-4 py-3 text-center font-bold text-white hover:bg-brand-dark">
                S'inscrire
              </Link>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}
