"use client";

import { FormEvent, useState } from "react";
import {
  PARENT_REQUIRED_AFTER,
  REGISTRATION_COURSES,
  REGISTRATION_SEASON,
} from "@/lib/registration";

type SubmissionState =
  | { status: "idle"; message?: string }
  | { status: "sending"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const inputClassName =
  "min-h-11 rounded border border-stone-300 bg-white px-3 py-2 font-normal text-ink shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export function RegistrationForm() {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });
  const [birthDate, setBirthDate] = useState("");
  const needsParent = birthDate > PARENT_REQUIRED_AFTER;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const courses = formData.getAll("courses");

    if (courses.length === 0) {
      setSubmission({
        status: "error",
        message: "Merci de sélectionner au moins un cours.",
      });
      document.getElementById("registration-courses")?.focus();
      return;
    }

    setSubmission({ status: "sending" });

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(formData), courses }),
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(body.message ?? "L'envoi de l'inscription a échoué.");
      }

      form.reset();
      setBirthDate("");
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
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
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
          </div>

          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Nom *
            <input
              className={inputClassName}
              name="lastName"
              autoComplete="family-name"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Prénom *
            <input
              className={inputClassName}
              name="firstName"
              autoComplete="given-name"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Date de naissance *
            <input
              className={inputClassName}
              name="birthDate"
              type="date"
              autoComplete="bday"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Numéro AVS *
            <input
              className={inputClassName}
              name="avsNumber"
              inputMode="numeric"
              placeholder="756.XXXX.XXXX.XX"
              pattern="756[. 0-9-]{10,16}"
              aria-describedby="avs-help"
              required
            />
            <span id="avs-help" className="font-normal text-stone-500">
              13 chiffres, en commençant par 756.
            </span>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700 sm:col-span-2">
            Nom et prénom d'un parent {needsParent ? "*" : ""}
            <input
              className={inputClassName}
              name="parentName"
              autoComplete="name"
              required={needsParent}
            />
            <span className="font-normal text-stone-500">
              Obligatoire pour les enfants de moins de 15 ans révolus au 31
              juillet.
            </span>
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
            <div className="mt-2 flex gap-6">
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
          </div>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Numéro ACVG
            <input className={inputClassName} name="acvgNumber" />
            <span className="font-normal text-stone-500">
              Si déjà attribué.
            </span>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700 sm:col-span-2">
            Autres enfants membres de la FSG Gimel
            <textarea
              className={`${inputClassName} min-h-24 resize-y`}
              name="siblingNames"
              placeholder="Indiquez leurs noms et prénoms, une personne par ligne."
            />
          </label>
        </fieldset>
      </div>

      <div className="border-t border-stone-200 pt-5">
        <fieldset className="grid gap-5 sm:grid-cols-2 p-5 sm:p-7">
          <legend className="text-lg font-black text-ink">Coordonnées</legend>
          <label className="grid gap-2 text-sm font-bold text-stone-700 sm:col-span-2">
            Adresse postale *
            <input
              className={inputClassName}
              name="address"
              autoComplete="street-address"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Code postal *
            <input
              className={inputClassName}
              name="postalCode"
              autoComplete="postal-code"
              inputMode="numeric"
              pattern="[0-9]{4}"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Ville *
            <input
              className={inputClassName}
              name="city"
              autoComplete="address-level2"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Téléphone *
            <input
              className={inputClassName}
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Adresse e-mail *
            <input
              className={inputClassName}
              name="email"
              type="email"
              autoComplete="email"
              required
            />
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
        </fieldset>
      </div>

      <div className="border-t border-stone-200 pt-5">
        <fieldset className="grid gap-5 p-5 sm:p-7">
          <legend className="text-lg font-black text-ink">Engagement</legend>
          <label className="grid max-w-xl gap-2 text-sm font-bold text-stone-700">
            Nom et prénom de la personne signataire *
            <input
              className={inputClassName}
              name="signerName"
              autoComplete="name"
              required
            />
          </label>
          <label className="flex items-start gap-3 text-sm leading-6 text-stone-700">
            <input
              className="mt-1 size-4 shrink-0 accent-brand"
              type="checkbox"
              name="statutesAccepted"
              required
            />
            <span>
              J'atteste que les informations communiquées sont exactes et je
              m'engage à respecter les statuts de la Gym de Gimel. *
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm leading-6 text-stone-700">
            <input
              className="mt-1 size-4 shrink-0 accent-brand"
              type="checkbox"
              name="privacyAccepted"
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
