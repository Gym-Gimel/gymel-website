import Link from "next/link";
import { WEEK_DAYS } from "@/lib/constants/site";
import type { Course } from "@/types/data";

function sortCoursesByStartTime(courses: Course[]) {
  return [...courses].sort((a, b) => {
    const timeComparison = a.startTime.localeCompare(b.startTime);
    if (timeComparison !== 0) return timeComparison;
    return a.name.localeCompare(b.name, "fr-CH");
  });
}

export function WeeklySchedule({ courses, compact = false }: { courses: Course[]; compact?: boolean }) {
  const days = compact ? WEEK_DAYS.slice(0, 4) : WEEK_DAYS;

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {days.map((day) => {
        const dayCourses = sortCoursesByStartTime(courses.filter((course) => course.days.includes(day)));

        return (
          <article key={day} className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
            <h3 className="text-lg font-black text-brand">{day}</h3>
            {dayCourses.length > 0 ? (
              <ul className="mt-4 grid gap-3 text-sm">
                {dayCourses.map((course) => (
                  <li key={course.id} className="border-t border-stone-100 pt-3 first:border-t-0 first:pt-0">
                    <Link href={`/nos-cours/${course.slug}`} className="font-bold text-ink hover:text-brand">
                      {course.name}
                    </Link>
                    <p className="text-stone-600">
                      {course.startTime}-{course.endTime}
                    </p>
                    {course.note ? <p className="mt-1 text-xs font-semibold text-stone-500">{course.note}</p> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-stone-500">Aucun cours planifié.</p>
            )}
          </article>
        );
      })}
    </div>
  );
}
