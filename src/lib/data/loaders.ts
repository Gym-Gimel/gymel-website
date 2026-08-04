import { parseCsvRows } from "@/lib/csv/parse";
import { readCsvWithFallback } from "@/lib/data/files";
import { compareIsoDates } from "@/lib/formatting/date";
import { competitionSchema, courseSchema, volleyballSchema } from "@/lib/validation/schemas";
import type { CalendarItem, Competition, Course, VolleyballMatch } from "@/types/data";

function logErrors(errors: { message: string }[]) {
  if (errors.length > 0) {
    console.warn(errors.map((error) => error.message).join("\n"));
  }
}

export async function getCourses(): Promise<Course[]> {
  const csv = await readCsvWithFallback("courses");
  const result = parseCsvRows<Course>(csv.source, csv.text, courseSchema, ["id", "slug"]);
  logErrors(result.errors);
  return result.data.sort((a, b) => a.name.localeCompare(b.name, "fr-CH"));
}

export async function getCourseBySlug(slug: string) {
  const courses = await getCourses();
  return courses.find((course) => course.slug === slug);
}

export async function getCompetitions(): Promise<Competition[]> {
  const csv = await readCsvWithFallback("competitions");
  const result = parseCsvRows<Competition>(csv.source, csv.text, competitionSchema, ["id", "slug"]);
  logErrors(result.errors);
  return result.data.sort((a, b) => compareIsoDates(a.startDate, b.startDate));
}

export async function getCompetitionBySlug(slug: string) {
  const competitions = await getCompetitions();
  return competitions.find((competition) => competition.slug === slug);
}

async function getVolleyball(key: "volleyballMen" | "volleyballWomen", league: VolleyballMatch["league"]) {
  const csv = await readCsvWithFallback(key);
  const result = parseCsvRows<Omit<VolleyballMatch, "league">>(csv.source, csv.text, volleyballSchema, ["id"]);
  logErrors(result.errors);
  return result.data.map((match) => ({ ...match, league })).sort((a, b) => compareIsoDates(a.date, b.date));
}

export async function getVolleyballMatches() {
  const [men, women] = await Promise.all([
    getVolleyball("volleyballMen", "volley-men"),
    getVolleyball("volleyballWomen", "volley-women")
  ]);
  return [...women, ...men].sort((a, b) => compareIsoDates(a.date, b.date));
}

export async function getCalendarItems(): Promise<CalendarItem[]> {
  const [competitions, volleyballMatches] = await Promise.all([getCompetitions(), getVolleyballMatches()]);

  const competitionItems: CalendarItem[] = competitions.map((competition) => ({
    id: competition.id,
    type: "competition",
    slug: competition.slug,
    title: competition.title,
    date: competition.startDate,
    endDate: competition.endDate,
    location: competition.location,
    category: competition.category,
    status: competition.status,
    description: competition.description,
    href: `/calendrier-sportif/concours/${competition.slug}`,
    featured: competition.featured,
    registrationUrl: competition.registrationUrl,
    programUrl: competition.programUrl,
    resultsUrl: competition.resultsUrl
  }));

  const volleyItems: CalendarItem[] = volleyballMatches.map((match) => ({
    id: match.id,
    type: match.league,
    title: `${match.homeTeam} - ${match.awayTeam}`,
    date: match.date,
    time: match.time,
    location: match.location,
    category: match.league === "volley-men" ? "Volley masculin" : "Volley féminin",
    status: match.status,
    href: match.externalUrl,
    score:
      match.homeScore !== undefined && match.awayScore !== undefined
        ? `${match.homeScore} - ${match.awayScore}`
        : undefined
  }));

  return [...competitionItems, ...volleyItems].sort((a, b) => compareIsoDates(a.date, b.date));
}

export async function getFeaturedCalendarItems(limit = 3) {
  const items = await getCalendarItems();
  return items.filter((item) => item.type === "competition" && item.featured).slice(0, limit);
}
