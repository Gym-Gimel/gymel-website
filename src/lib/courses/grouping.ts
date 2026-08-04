import { WEEK_DAYS } from "@/lib/constants/site";
import type { Course, CourseStatus } from "@/types/data";

const courseGroupOverrides: Record<string, { slug: string; name: string }> = {
  "enfantines-lundi": { slug: "enfantines", name: "Enfantines" },
  "enfantines-mardi": { slug: "enfantines", name: "Enfantines" },
  "agres-essertines": { slug: "agres", name: "Agrès" },
  agres: { slug: "agres", name: "Agrès" },
  "volley-femmes": { slug: "volley", name: "Volley" },
  "volley-hommes": { slug: "volley", name: "Volley" }
};

export function getCourseGroupIdentity(course: Course) {
  return courseGroupOverrides[course.slug] ?? { slug: course.slug, name: course.name };
}

export function sortCourseSessions(courses: Course[]) {
  return [...courses].sort((a, b) => {
    const dayComparison = (WEEK_DAYS.indexOf(a.days[0] as (typeof WEEK_DAYS)[number]) ?? 99) -
      (WEEK_DAYS.indexOf(b.days[0] as (typeof WEEK_DAYS)[number]) ?? 99);
    if (dayComparison !== 0) return dayComparison;
    const timeComparison = a.startTime.localeCompare(b.startTime);
    if (timeComparison !== 0) return timeComparison;
    return a.name.localeCompare(b.name, "fr-CH");
  });
}

export function combineCourseStatus(sessions: Course[]): CourseStatus {
  if (sessions.some((session) => session.status === "open")) return "open";
  if (sessions.some((session) => session.status === "waitlist")) return "waitlist";
  return "closed";
}

export function uniqueValues(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}
