import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCourseBySlug, getCourses } from "@/lib/data/loaders";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.name,
    description: course.shortDescription
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
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
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_280px] lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={course.status} />
              <span className="rounded bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">{course.category}</span>
            </div>
            <h1 className="mt-4 text-4xl font-black text-ink">{course.name}</h1>
            <p className="mt-4 text-lg leading-8 text-stone-600">{course.fullDescription}</p>
            {course.note ? <p className="mt-5 rounded bg-gold/10 p-4 text-sm font-semibold text-stone-800">{course.note}</p> : null}
          </div>
          <aside className="rounded-lg bg-stone-50 p-5">
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="font-black text-ink">Age</dt>
                <dd className="mt-1 text-stone-600">{course.ageRange}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">Horaire</dt>
                <dd className="mt-1 text-stone-600">
                  {course.days.join(", ")} · {course.startTime}-{course.endTime}
                </dd>
              </div>
              <div>
                <dt className="font-black text-ink">Lieu</dt>
                <dd className="mt-1 text-stone-600">{course.location}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">Cotisation</dt>
                <dd className="mt-1 text-stone-600">{course.price}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">Contact</dt>
                <dd className="mt-1 grid gap-1 text-stone-600">
                  {course.monitors.map((monitor) => (
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
