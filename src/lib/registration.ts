import { z } from "zod";

export const REGISTRATION_SEASON = "2026-2027";
export const PARENT_REQUIRED_AFTER = "2011-07-31";

export const REGISTRATION_COURSES = [
  { id: "parents-enfants", label: "Parents-enfants", price: "CHF 120.-" },
  { id: "enfantines-lundi", label: "Enfantines lundi (1P-3P)", price: "CHF 120.-" },
  { id: "enfantines-mardi", label: "Enfantines mardi (1P-3P)", price: "CHF 120.-" },
  { id: "jeunesse-mixte", label: "Jeunesse Mixte (4P-8P)", price: "CHF 120.-" },
  { id: "kids-dance", label: "Kids Dance (6P et +)", price: "CHF 250.-" },
  { id: "agres", label: "Agrès (3P et +)", price: "CHF 320.-" },
  { id: "athletisme-7-15", label: "Athlétisme (7-15 ans)", price: "CHF 250.-" },
  { id: "athletisme-16-plus", label: "Athlétisme (16 ans et +)", price: "CHF 250.-" },
  { id: "gym-moove2bfit", label: "Gym Moove2Bfit", price: "CHF 320.-" },
  { id: "yoga", label: "Yoga", price: "CHF 320.-" },
  { id: "pilates", label: "Pilates", price: "CHF 320.-" },
  { id: "gym-du-dos", label: "Gym du dos - Back to back", price: "CHF 320.-" },
  { id: "equilibre-renforcement", label: "Equilibre & renforcement", price: "CHF 320.-" },
  { id: "fascias", label: "Gym Fascias", price: "CHF 320.-" },
  { id: "volleyball-hommes", label: "Volleyball hommes", price: "CHF 150.-" },
  { id: "volleyball-femmes", label: "Volleyball femmes", price: "CHF 150.-" },
] as const;

const courseIds = REGISTRATION_COURSES.map((course) => course.id) as [
  (typeof REGISTRATION_COURSES)[number]["id"],
  ...(typeof REGISTRATION_COURSES)[number]["id"][],
];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value.length > 0 ? value : undefined))
    .optional();

const avsNumber = z
  .string()
  .trim()
  .refine((value) => /^756(?:[.\s-]?\d){10}$/.test(value), {
    message: "Le numéro AVS doit contenir 13 chiffres et commencer par 756.",
  });

export const registrationSchema = z
  .object({
    gender: z.enum(["Masculin", "Féminin", "Autre"]),
    lastName: z.string().trim().min(2).max(120),
    firstName: z.string().trim().min(2).max(120),
    birthDate: z
      .string()
      .date()
      .refine((value) => value >= "1900-01-01" && value <= new Date().toISOString().slice(0, 10)),
    avsNumber,
    parentName: optionalText(160),
    existingMember: z.enum(["Oui", "Non"]),
    acvgNumber: optionalText(80),
    siblingNames: optionalText(500),
    address: z.string().trim().min(5).max(240),
    postalCode: z.string().trim().regex(/^\d{4}$/),
    city: z.string().trim().min(2).max(120),
    phone: z.string().trim().min(7).max(40),
    email: z.string().trim().email().max(254),
    courses: z.array(z.enum(courseIds)).min(1).max(REGISTRATION_COURSES.length),
    signerName: z.string().trim().min(2).max(160),
    statutesAccepted: z.literal("on"),
    privacyAccepted: z.literal("on"),
    website: z.string().trim().max(200).optional(),
  })
  .superRefine((registration, context) => {
    if (registration.birthDate > PARENT_REQUIRED_AFTER && !registration.parentName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le nom d'un parent est obligatoire pour un membre de moins de 15 ans.",
        path: ["parentName"],
      });
    }
  });

export type Registration = z.infer<typeof registrationSchema>;

export function getRegistrationCourseLabels(courseIdsToResolve: Registration["courses"]) {
  const selectedIds = new Set(courseIdsToResolve);
  return REGISTRATION_COURSES.filter((course) => selectedIds.has(course.id)).map(
    (course) => `${course.label} (${course.price})`,
  );
}
