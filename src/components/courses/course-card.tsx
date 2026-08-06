import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import type { CourseGroup } from "@/types/data";

function formatSession(session: CourseGroup["sessions"][number]) {
  return `${session.days.join(", ")} · ${session.startTime}-${session.endTime}`;
}

export function CourseCard({ course }: { course: CourseGroup }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
      <div className="relative aspect-[16/9] shrink-0 bg-stone-100">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={course.status} />

            <span className="rounded bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">
              {course.category}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-ink">{course.name}</h3>

            <p className="mt-2 text-sm leading-6 text-stone-600">
              {course.shortDescription}
            </p>
          </div>

          <dl className="grid gap-2 text-sm text-stone-700">
            <div>
              <dt className="font-bold">
                {course.sessions.length > 1 ? "Horaires" : "Horaire"}
              </dt>

              <dd className="grid gap-1">
                {course.sessions.map((session) => (
                  <span key={session.id}>{formatSession(session)}</span>
                ))}
              </dd>
            </div>

            <div>
              <dt className="font-bold">Age</dt>
              <dd>{course.ageRange}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={`/nos-cours/${course.slug}`}
            className="block rounded border border-brand px-4 py-2 text-center text-sm font-bold text-brand hover:bg-brand hover:text-white"
          >
            Voir le cours
          </Link>
        </div>
      </div>
    </article>
  );
}
