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

const requiredText = (min: number, max: number) =>
  z
    .string({ required_error: "Ce champ est obligatoire." })
    .trim()
    .min(min, "Ce champ est trop court.")
    .max(max, "Ce champ est trop long.");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, "Ce champ est trop long.")
    .transform((value) => (value.length > 0 ? value : undefined))
    .optional();

const avsNumber = z
  .string({ required_error: "Indiquez le numéro AVS." })
  .trim()
  .refine((value) => /^756(?:[.\s-]?\d){10}$/.test(value), {
    message: "Le numéro AVS doit contenir 13 chiffres et commencer par 756.",
  });

export const registrationSchema = z
  .object({
    gender: z.enum(["Masculin", "Féminin", "Autre"], {
      errorMap: () => ({ message: "Sélectionnez une option." }),
    }),
    lastName: requiredText(2, 120),
    firstName: requiredText(2, 120),
    birthDate: z
      .string({ required_error: "Indiquez la date de naissance." })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Indiquez une date valide.")
      .refine(
        (value) =>
          value >= "1900-01-01" &&
          value <= new Date().toISOString().slice(0, 10),
        "Indiquez une date de naissance valide.",
      ),
    avsNumber,
    parentName: optionalText(160),
    existingMember: z.enum(["Oui", "Non"], {
      errorMap: () => ({ message: "Sélectionnez oui ou non." }),
    }),
    acvgNumber: optionalText(80),
    siblingNames: optionalText(500),
    address: requiredText(5, 240),
    postalCode: z
      .string({ required_error: "Indiquez le code postal." })
      .trim()
      .regex(/^\d{4}$/, "Le code postal doit contenir 4 chiffres."),
    city: requiredText(2, 120),
    phone: requiredText(7, 40),
    email: z
      .string({ required_error: "Indiquez l'adresse e-mail." })
      .trim()
      .email("Indiquez une adresse e-mail valide.")
      .max(254, "L'adresse e-mail est trop longue."),
    courses: z
      .array(z.enum(courseIds), {
        required_error: "Sélectionnez au moins un cours.",
      })
      .min(1, "Sélectionnez au moins un cours.")
      .max(REGISTRATION_COURSES.length),
    signerName: requiredText(2, 160),
    statutesAccepted: z.literal("on", {
      errorMap: () => ({ message: "Vous devez accepter les statuts." }),
    }),
    privacyAccepted: z.literal("on", {
      errorMap: () => ({
        message: "Vous devez confirmer avoir pris connaissance de la déclaration.",
      }),
    }),
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
