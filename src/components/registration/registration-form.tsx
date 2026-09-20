"use client";

import { FocusEvent, FormEvent, useState } from "react";
import {
  PARENT_REQUIRED_AFTER,
  REGISTRATION_COURSES,
  REGISTRATION_SEASON,
  registrationSchema,
  type Registration,
} from "@/lib/registration";

type SubmissionState =
  | { status: "idle"; message?: string }
  | { status: "sending"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const inputClassName =
  "min-h-11 rounded border border-stone-300 bg-white px-3 py-2 font-normal text-ink shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const registrationFieldNames = [
  "gender",
  "lastName",
  "firstName",
  "birthDate",
  "avsNumber",
  "parentName",
  "existingMember",
  "acvgNumber",
  "siblingNames",
  "address",
  "postalCode",
  "city",
  "phone",
  "email",
  "courses",
  "signerName",
  "statutesAccepted",
  "privacyAccepted",
] as const;

type RegistrationFieldName = (typeof registrationFieldNames)[number];
type ValidationErrors = Partial<Record<RegistrationFieldName, string>>;

function getRegistrationPayload(form: HTMLFormElement) {
  const formData = new FormData(form);
  return {
    ...Object.fromEntries(formData),
    courses: formData.getAll("courses"),
  };
}

function getValidationErrors(payload: unknown) {
  const result = registrationSchema.safeParse(payload);
  const errors: ValidationErrors = {};

  if (!result.success) {
    for (const issue of result.error.issues) {
      const fieldName = issue.path[0] as RegistrationFieldName | undefined;
      if (fieldName && !errors[fieldName]) {
        errors[fieldName] = issue.message;
      }
    }
  }

  return { result, errors };
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span
      id={id}
      className="mt-1 block font-normal text-red-700"
      aria-live="polite"
    >
      {message}
    </span>
  ) : null;
}

function validatedInputClassName(hasError: boolean) {
  return `${inputClassName} ${
    hasError
      ? "border-red-500 focus:border-red-600 focus:ring-red-200"
      : ""
  }`;
}

export function RegistrationForm() {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });
  const [birthDate, setBirthDate] = useState("");
  const [touchedFields, setTouchedFields] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors>({});
  const needsParent = birthDate > PARENT_REQUIRED_AFTER;

  function errorFor(fieldName: RegistrationFieldName) {
    return touchedFields.has(fieldName)
      ? validationErrors[fieldName]
      : undefined;
  }

  function validateCurrentForm(form: HTMLFormElement) {
    const validation = getValidationErrors(getRegistrationPayload(form));
    setValidationErrors(validation.errors);
    return validation;
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    const fieldName = (
      event.target as unknown as HTMLInputElement | HTMLTextAreaElement
    ).name as RegistrationFieldName;

    if (!registrationFieldNames.includes(fieldName)) return;

    setTouchedFields((current) => new Set(current).add(fieldName));
    validateCurrentForm(event.currentTarget);
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target as unknown as
      | HTMLInputElement
      | HTMLTextAreaElement;
    const fieldName = target.name as RegistrationFieldName;

    if (touchedFields.has(fieldName)) {
      const validation = validateCurrentForm(event.currentTarget);
      if (validation.result.success && submission.status === "error") {
        setSubmission({ status: "idle" });
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const validation = validateCurrentForm(form);

    if (!validation.result.success) {
      setTouchedFields(new Set(registrationFieldNames));
      setSubmission({
        status: "error",
        message: "Merci de corriger les champs indiqués avant l'envoi.",
      });
      const firstInvalidField = validation.result.error.issues[0]?.path[0];
      const firstInvalidElement =
        firstInvalidField === "courses"
          ? document.getElementById("registration-courses")
          : form.querySelector<HTMLElement>(`[name="${String(firstInvalidField)}"]`);
      firstInvalidElement?.focus();
      return;
    }

    setSubmission({ status: "sending" });

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.result.data satisfies Registration),
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(body.message ?? "L'envoi de l'inscription a échoué.");
      }

      form.reset();
      setBirthDate("");
      setTouchedFields(new Set());
      setValidationErrors({});
      setSubmission({
        status: "success",
        message:
          body.message ??
          "Votre demande d'inscription a bien été transmise à la Gym de Gimel.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "L'envoi de l'inscription a échoué.",
      });
    }
  }

  const isSending = submission.status === "sending";

  return (
    <form
      id="formulaire-inscription"
      aria-labelledby="registration-form-title"
      className="mt-10 rounded-lg border border-stone-200 bg-white shadow-soft"
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onChange={handleChange}
      noValidate
    >
      <div className="p-5 sm:p-7">
        <p className="text-sm font-bold uppercase text-brand">
          Saison {REGISTRATION_SEASON}
        </p>
        <h2
          id="registration-form-title"
          className="mt-1 text-2xl font-black text-ink"
        >
          Formulaire d'inscription en ligne
        </h2>
        <p className="mt-2 max-w-3xl leading-7 text-stone-600">
          Les champs marqués d'un astérisque sont obligatoires. Une demande est
          transmise à la société après l'envoi du formulaire.
        </p>
      </div>

      <div className="border-t border-stone-200 pt-5">
        <fieldset className="grid gap-5 sm:grid-cols-2 p-5 sm:p-7">
          <legend className="text-lg font-black text-ink">
            Informations du membre
          </legend>

          <div className="sm:col-span-2">
            <span className="text-sm font-bold text-stone-700">Sexe *</span>
            <div
              className="mt-2 flex flex-wrap gap-x-6 gap-y-3"
              role="radiogroup"
              aria-invalid={Boolean(errorFor("gender"))}
              aria-describedby={errorFor("gender") ? "gender-error" : undefined}
            >
              {["Masculin", "Féminin", "Autre"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-2 text-sm text-stone-700"
                >
                  <input
                    className="size-4 accent-brand"
                    type="radio"
                    name="gender"
                    value={gender}
                    required
                  />
                  {gender}
                </label>
              ))}
            </div>
            <FieldError id="gender-error" message={errorFor("gender")} />
          </div>

          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Nom *
            <input
              className={validatedInputClassName(Boolean(errorFor("lastName")))}
              name="lastName"
              autoComplete="family-name"
              aria-invalid={Boolean(errorFor("lastName"))}
              aria-describedby={errorFor("lastName") ? "lastName-error" : undefined}
              required
            />
            <FieldError id="lastName-error" message={errorFor("lastName")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Prénom *
            <input
              className={validatedInputClassName(Boolean(errorFor("firstName")))}
              name="firstName"
              autoComplete="given-name"
              aria-invalid={Boolean(errorFor("firstName"))}
              aria-describedby={errorFor("firstName") ? "firstName-error" : undefined}
              required
            />
            <FieldError id="firstName-error" message={errorFor("firstName")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Date de naissance *
            <input
              className={validatedInputClassName(Boolean(errorFor("birthDate")))}
              name="birthDate"
              type="date"
              autoComplete="bday"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              aria-invalid={Boolean(errorFor("birthDate"))}
              aria-describedby={errorFor("birthDate") ? "birthDate-error" : undefined}
              required
            />
            <FieldError id="birthDate-error" message={errorFor("birthDate")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Numéro AVS *
            <input
              className={validatedInputClassName(Boolean(errorFor("avsNumber")))}
              name="avsNumber"
              inputMode="numeric"
              placeholder="756.XXXX.XXXX.XX"
              pattern="756[. 0-9-]{10,16}"
              aria-invalid={Boolean(errorFor("avsNumber"))}
              aria-describedby={
                errorFor("avsNumber") ? "avs-help avsNumber-error" : "avs-help"
              }
              required
            />
            <span id="avs-help" className="font-normal text-stone-500">
              13 chiffres, en commençant par 756.
            </span>
            <FieldError id="avsNumber-error" message={errorFor("avsNumber")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700 sm:col-span-2">
            Nom et prénom d'un parent {needsParent ? "*" : ""}
            <input
              className={validatedInputClassName(Boolean(errorFor("parentName")))}
              name="parentName"
              autoComplete="name"
              aria-invalid={Boolean(errorFor("parentName"))}
              aria-describedby={
                errorFor("parentName") ? "parent-help parentName-error" : "parent-help"
              }
              required={needsParent}
            />
            <span id="parent-help" className="font-normal text-stone-500">
              Obligatoire pour les enfants de moins de 15 ans révolus au 31
              juillet.
            </span>
            <FieldError id="parentName-error" message={errorFor("parentName")} />
          </label>
        </fieldset>
      </div>

      <div className="border-t border-stone-200 pt-5">
        <fieldset className="grid gap-5 sm:grid-cols-2 p-5 sm:p-7">
          <legend className="text-lg font-black text-ink">
            Société et famille
          </legend>
          <div>
            <span className="text-sm font-bold text-stone-700">
              Déjà membre de la société ? *
            </span>
            <div
              className="mt-2 flex gap-6"
              role="radiogroup"
              aria-invalid={Boolean(errorFor("existingMember"))}
              aria-describedby={
                errorFor("existingMember") ? "existingMember-error" : undefined
              }
            >
              {["Oui", "Non"].map((answer) => (
                <label
                  key={answer}
                  className="flex items-center gap-2 text-sm text-stone-700"
                >
                  <input
                    className="size-4 accent-brand"
                    type="radio"
                    name="existingMember"
                    value={answer}
                    required
                  />
                  {answer}
                </label>
              ))}
            </div>
            <FieldError
              id="existingMember-error"
              message={errorFor("existingMember")}
            />
          </div>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Numéro ACVG
            <input
              className={validatedInputClassName(Boolean(errorFor("acvgNumber")))}
              name="acvgNumber"
              aria-invalid={Boolean(errorFor("acvgNumber"))}
              aria-describedby={
                errorFor("acvgNumber") ? "acvg-help acvgNumber-error" : "acvg-help"
              }
            />
            <span id="acvg-help" className="font-normal text-stone-500">
              Si déjà attribué.
            </span>
            <FieldError id="acvgNumber-error" message={errorFor("acvgNumber")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700 sm:col-span-2">
            Autres enfants membres de la FSG Gimel
            <textarea
              className={`${validatedInputClassName(Boolean(errorFor("siblingNames")))} min-h-24 resize-y`}
              name="siblingNames"
              placeholder="Indiquez leurs noms et prénoms, une personne par ligne."
              aria-invalid={Boolean(errorFor("siblingNames"))}
              aria-describedby={
                errorFor("siblingNames") ? "siblingNames-error" : undefined
              }
            />
            <FieldError id="siblingNames-error" message={errorFor("siblingNames")} />
          </label>
        </fieldset>
      </div>

      <div className="border-t border-stone-200 pt-5">
        <fieldset className="grid gap-5 sm:grid-cols-2 p-5 sm:p-7">
          <legend className="text-lg font-black text-ink">Coordonnées</legend>
          <label className="grid gap-2 text-sm font-bold text-stone-700 sm:col-span-2">
            Adresse postale *
            <input
              className={validatedInputClassName(Boolean(errorFor("address")))}
              name="address"
              autoComplete="street-address"
              aria-invalid={Boolean(errorFor("address"))}
              aria-describedby={errorFor("address") ? "address-error" : undefined}
              required
            />
            <FieldError id="address-error" message={errorFor("address")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Code postal *
            <input
              className={validatedInputClassName(Boolean(errorFor("postalCode")))}
              name="postalCode"
              autoComplete="postal-code"
              inputMode="numeric"
              pattern="[0-9]{4}"
              aria-invalid={Boolean(errorFor("postalCode"))}
              aria-describedby={
                errorFor("postalCode") ? "postalCode-error" : undefined
              }
              required
            />
            <FieldError id="postalCode-error" message={errorFor("postalCode")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Ville *
            <input
              className={validatedInputClassName(Boolean(errorFor("city")))}
              name="city"
              autoComplete="address-level2"
              aria-invalid={Boolean(errorFor("city"))}
              aria-describedby={errorFor("city") ? "city-error" : undefined}
              required
            />
            <FieldError id="city-error" message={errorFor("city")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Téléphone *
            <input
              className={validatedInputClassName(Boolean(errorFor("phone")))}
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errorFor("phone"))}
              aria-describedby={errorFor("phone") ? "phone-error" : undefined}
              required
            />
            <FieldError id="phone-error" message={errorFor("phone")} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Adresse e-mail *
            <input
              className={validatedInputClassName(Boolean(errorFor("email")))}
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errorFor("email"))}
              aria-describedby={errorFor("email") ? "email-error" : undefined}
              required
            />
            <FieldError id="email-error" message={errorFor("email")} />
          </label>
        </fieldset>
      </div>

      <div className="border-t border-stone-200 pt-5">
        <fieldset className="p-5 sm:p-7">
          <legend className="text-lg font-black text-ink">
            Cours souhaités
          </legend>
          <p className="mt-1 text-sm text-stone-600">
            Plusieurs choix sont possibles. Les tarifs indiqués couvrent une
            année scolaire.
          </p>
          <div
            id="registration-courses"
            className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2"
            tabIndex={-1}
            aria-invalid={Boolean(errorFor("courses"))}
            aria-describedby={errorFor("courses") ? "courses-error" : undefined}
          >
            {REGISTRATION_COURSES.map((course) => (
              <label
                key={course.id}
                className="flex min-h-11 items-start gap-3 border-b border-stone-100 py-2 text-sm text-stone-700"
              >
                <input
                  className="mt-0.5 size-4 shrink-0 accent-brand"
                  type="checkbox"
                  name="courses"
                  value={course.id}
                />
                <span className="flex flex-1 justify-between gap-3">
                  <span>{course.label}</span>
                  <span className="whitespace-nowrap font-bold text-ink">
                    {course.price}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <FieldError id="courses-error" message={errorFor("courses")} />
        </fieldset>
      </div>

      <div className="border-t border-stone-200 pt-5">
        <fieldset className="grid gap-5 p-5 sm:p-7">
          <legend className="text-lg font-black text-ink">Engagement</legend>
          <label className="grid max-w-xl gap-2 text-sm font-bold text-stone-700">
            Nom et prénom de la personne signataire *
            <input
              className={validatedInputClassName(Boolean(errorFor("signerName")))}
              name="signerName"
              autoComplete="name"
              aria-invalid={Boolean(errorFor("signerName"))}
              aria-describedby={
                errorFor("signerName") ? "signerName-error" : undefined
              }
              required
            />
            <FieldError id="signerName-error" message={errorFor("signerName")} />
          </label>
          <label className="flex items-start gap-3 text-sm leading-6 text-stone-700">
            <input
              className="mt-1 size-4 shrink-0 accent-brand"
              type="checkbox"
              name="statutesAccepted"
              aria-invalid={Boolean(errorFor("statutesAccepted"))}
              aria-describedby={
                errorFor("statutesAccepted")
                  ? "statutesAccepted-error"
                  : undefined
              }
              required
            />
            <span>
              J'atteste que les informations communiquées sont exactes et je
              m'engage à respecter les statuts de la Gym de Gimel. *
            </span>
          </label>
          <FieldError
            id="statutesAccepted-error"
            message={errorFor("statutesAccepted")}
          />
          <label className="flex items-start gap-3 text-sm leading-6 text-stone-700">
            <input
              className="mt-1 size-4 shrink-0 accent-brand"
              type="checkbox"
              name="privacyAccepted"
              aria-invalid={Boolean(errorFor("privacyAccepted"))}
              aria-describedby={
                errorFor("privacyAccepted")
                  ? "privacyAccepted-error"
                  : undefined
              }
              required
            />
            <span>
              J'ai pris connaissance de la{" "}
              <a
                className="font-bold text-brand underline underline-offset-2"
                href="/documents/declaration-protection-donnees.pdf"
                target="_blank"
                rel="noreferrer"
              >
                déclaration de protection des données
              </a>
              . *
            </span>
          </label>
          <FieldError
            id="privacyAccepted-error"
            message={errorFor("privacyAccepted")}
          />
          <p className="text-sm leading-6 text-stone-600">
            Le droit à l'image est régi par les statuts. Toute opposition peut
            être communiquée par écrit à{" "}
            <a
              className="font-bold text-brand underline"
              href="mailto:info@gymel.ch"
            >
              info@gymel.ch
            </a>
            .
          </p>
        </fieldset>
      </div>

      <label className="hidden" aria-hidden="true">
        Site web
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="border-t border-stone-200 p-5 sm:p-7">
        {submission.status === "success" || submission.status === "error" ? (
          <p
            className={`mb-4 rounded p-3 text-sm ${
              submission.status === "success"
                ? "bg-meadow/10 text-meadow"
                : "bg-red-100 text-red-900"
            }`}
            role={submission.status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {submission.message}
          </p>
        ) : null}
        <button
          className="min-h-11 rounded bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSending}
        >
          {isSending ? "Envoi en cours..." : "Envoyer ma demande d'inscription"}
        </button>
        <p className="mt-3 text-xs leading-5 text-stone-500">
          L'envoi du formulaire ne garantit pas une place dans le cours. La
          société vous contactera pour confirmer l'inscription.
        </p>
      </div>
    </form>
  );
}
