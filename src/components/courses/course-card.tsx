import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Course } from "@/types/data";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
      <div className="relative aspect-[16/9] bg-stone-100">
        {course.image ? (
          <Image src={course.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
        ) : null}
      </div>
      <div className="grid gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={course.status} />
          <span className="rounded bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">{course.category}</span>
        </div>
        <div>
          <h3 className="text-xl font-black text-ink">{course.name}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">{course.shortDescription}</p>
        </div>
        <dl className="grid gap-2 text-sm text-stone-700">
          <div>
            <dt className="font-bold">Horaire</dt>
            <dd>
              {course.days.join(", ")} · {course.startTime}-{course.endTime}
            </dd>
          </div>
          <div>
            <dt className="font-bold">Age</dt>
            <dd>{course.ageRange}</dd>
          </div>
        </dl>
        <Link
          href={`/nos-cours/${course.slug}`}
          className="mt-auto rounded border border-brand px-4 py-2 text-center text-sm font-bold text-brand hover:bg-brand hover:text-white"
        >
          Voir le cours
        </Link>
      </div>
    </article>
  );
}
