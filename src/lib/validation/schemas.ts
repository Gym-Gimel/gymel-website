import { z } from "zod";

const requiredText = z.string().trim().min(1);
const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional();

const relativeOrAbsoluteUrl = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : undefined))
  .pipe(
    z
      .string()
      .refine((value) => value.startsWith("/") || /^https?:\/\//.test(value), "URL absolue ou chemin interne attendu")
      .optional()
  );

const isoDate = requiredText.regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu: YYYY-MM-DD");
const hour = requiredText.regex(/^\d{2}:\d{2}$/, "Format attendu: HH:mm");
const slug = requiredText.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug en minuscules, chiffres et tirets");

const listFromSemicolon = z
  .string()
  .trim()
  .transform((value) =>
    value
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
  )
  .refine((items) => items.length > 0, "Au moins une valeur est attendue");

export const courseSchema = z.object({
  id: requiredText,
  slug,
  name: requiredText,
  shortDescription: requiredText,
  fullDescription: requiredText,
  category: requiredText,
  ageRange: requiredText,
  days: listFromSemicolon,
  startTime: hour,
  endTime: hour,
  location: requiredText,
  monitors: listFromSemicolon,
  price: requiredText,
  status: z.enum(["open", "waitlist", "closed"]),
  image: relativeOrAbsoluteUrl,
  registrationUrl: relativeOrAbsoluteUrl,
  note: optionalText
});

export const competitionSchema = z
  .object({
    id: requiredText,
    slug,
    title: requiredText,
    startDate: isoDate,
    endDate: isoDate,
    location: requiredText,
    category: requiredText,
    group: requiredText,
    status: z.enum(["draft", "upcoming", "registration-open", "registration-closed", "finished", "cancelled"]),
    description: requiredText,
    registrationUrl: relativeOrAbsoluteUrl,
    programUrl: relativeOrAbsoluteUrl,
    resultsUrl: relativeOrAbsoluteUrl,
    featured: z
      .string()
      .trim()
      .transform((value) => value.toLowerCase())
      .pipe(z.enum(["true", "false"]))
      .transform((value) => value === "true")
  })
  .refine((value) => value.endDate >= value.startDate, {
    message: "La date de fin doit être égale ou postérieure à la date de début",
    path: ["endDate"]
  });

const optionalScore = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? Number.parseInt(value, 10) : undefined))
  .refine((value) => value === undefined || (Number.isInteger(value) && value >= 0), "Score positif attendu");

export const volleyballSchema = z.object({
  id: requiredText,
  season: requiredText,
  date: isoDate,
  time: hour,
  competition: requiredText,
  homeTeam: requiredText,
  awayTeam: requiredText,
  location: requiredText,
  homeScore: optionalScore,
  awayScore: optionalScore,
  status: z.enum(["scheduled", "postponed", "cancelled", "finished"]),
  externalUrl: relativeOrAbsoluteUrl
});
