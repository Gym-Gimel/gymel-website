"use client";

import { FormEvent, useState } from "react";

type SubmissionState =
  | { status: "idle"; message?: string }
  | { status: "sending"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmission({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(body.message ?? "L'envoi du message a échoué.");
      }

      form.reset();
      setSubmission({
        status: "success",
        message: body.message ?? "Votre message a bien été envoyé.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "L'envoi du message a échoué.",
      });
    }
  }

  const isSending = submission.status === "sending";

  return (
    <form
      className="grid gap-5 rounded-lg border border-stone-200 bg-white p-6 shadow-soft"
      onSubmit={handleSubmit}
    >
      <label className="grid gap-2 text-sm font-bold text-stone-700">
        Nom
        <input
          className="rounded border border-stone-300 px-3 py-2 font-normal"
          name="name"
          autoComplete="name"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-stone-700">
        E-mail
        <input
          className="rounded border border-stone-300 px-3 py-2 font-normal"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-stone-700">
        Sujet
        <input
          className="rounded border border-stone-300 px-3 py-2 font-normal"
          name="subject"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-stone-700">
        Message
        <textarea
          className="min-h-36 rounded border border-stone-300 px-3 py-2 font-normal"
          name="message"
          required
        />
      </label>
      <label className="hidden">
        Site web
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {submission.status === "success" || submission.status === "error" ? (
        <p
          className={`rounded p-3 text-sm ${
            submission.status === "success"
              ? "bg-meadow/10 text-meadow"
              : "bg-red-100 text-red-900"
          }`}
        >
          {submission.message}
        </p>
      ) : null}

      <button
        className="rounded bg-brand px-4 py-3 font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={isSending}
      >
        {isSending ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
