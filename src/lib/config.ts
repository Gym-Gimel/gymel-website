function readPositiveInteger(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const csvConfig = {
  useRemoteSources: process.env.CSV_SOURCE === "remote",
  revalidateSeconds: readPositiveInteger(process.env.CSV_REVALIDATE_SECONDS, 300),
  sources: {
    courses: process.env.COURSES_CSV_URL,
    competitions: process.env.COMPETITIONS_CSV_URL,
    events: process.env.EVENTS_CSV_URL,
    volleyballMen: process.env.VOLLEYBALL_MEN_CSV_URL,
    volleyballWomen: process.env.VOLLEYBALL_WOMEN_CSV_URL
  }
} as const;
