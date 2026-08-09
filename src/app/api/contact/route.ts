import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
  website: z.string().trim().optional()
});

type ContactMessage = z.infer<typeof contactSchema>;

class ContactConfigurationError extends Error { }

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml(message: ContactMessage) {
  return `
    <h1>Nouveau message depuis gymel.ch</h1>
    <p><strong>Nom:</strong> ${escapeHtml(message.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(message.email)}</p>
    <p><strong>Sujet:</strong> ${escapeHtml(message.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message.message).replaceAll("\n", "<br />")}</p>
  `;
}

function buildEmailText(message: ContactMessage) {
  return [
    "Nouveau message depuis gymel.ch",
    "",
    `Nom: ${message.name}`,
    `E-mail: ${message.email}`,
    `Sujet: ${message.subject}`,
    "",
    message.message
  ].join("\n");
}

async function sendWithResend(message: ContactMessage) {
  const provider = process.env.CONTACT_FORM_PROVIDER;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FORM_FROM;
  const to = process.env.CONTACT_FORM_TO ?? "contact@daviddieperink.ch";

  if (provider !== "resend" || !apiKey || !from) {
    throw new ContactConfigurationError(
      "Le formulaire n'est pas encore configuré côté serveur."
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: message.email,
      subject: `[Gym de Gimel] ${message.subject}`,
      html: buildEmailHtml(message),
      text: buildEmailText(message)
    })
  });

  if (!response.ok) {
    throw new Error("Le fournisseur e-mail a refusé l'envoi du message.");
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { message: "Merci de compléter correctement tous les champs." },
      { status: 400 }
    );
  }

  if (result.data.website) {
    return NextResponse.json({
      message: "Votre message a bien été envoyé."
    });
  }

  try {
    await sendWithResend(result.data);
    return NextResponse.json({
      message: "Votre message a bien été envoyé."
    });
  } catch (error) {
    if (error instanceof ContactConfigurationError) {
      return NextResponse.json({ message: error.message }, { status: 503 });
    }

    console.error("[contact] Impossible d'envoyer le message", error);
    return NextResponse.json(
      { message: "L'envoi du message a échoué. Merci de réessayer plus tard." },
      { status: 502 }
    );
  }
}
