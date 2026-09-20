import { NextResponse } from "next/server";
import {
  getRegistrationCourseLabels,
  REGISTRATION_SEASON,
  registrationSchema,
  type Registration,
} from "@/lib/registration";

class RegistrationConfigurationError extends Error { }

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayOptional(value: string | undefined) {
  return value || "Non renseigné";
}

function buildEmailHtml(registration: Registration) {
  const courses = getRegistrationCourseLabels(registration.courses);
  const rows = [
    ["Saison", REGISTRATION_SEASON],
    ["Sexe", registration.gender],
    ["Nom", registration.lastName],
    ["Prénom", registration.firstName],
    ["Date de naissance", registration.birthDate],
    ["Numéro AVS", registration.avsNumber],
    ["Parent", displayOptional(registration.parentName)],
    ["Déjà membre", registration.existingMember],
    ["Numéro ACVG", displayOptional(registration.acvgNumber)],
    ["Autres enfants membres", displayOptional(registration.siblingNames)],
    ["Adresse", registration.address],
    ["Code postal et ville", `${registration.postalCode} ${registration.city}`],
    ["Téléphone", registration.phone],
    ["E-mail", registration.email],
    ["Cours souhaités", courses.join("\n")],
    ["Personne signataire", registration.signerName],
  ];

  return `
    <h1>Nouvelle demande d'inscription</h1>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
      ${rows
      .map(
        ([label, value]) => `
            <tr>
              <th align="left" valign="top" style="border:1px solid #ddd;background:#f5f5f5">${escapeHtml(label)}</th>
              <td style="border:1px solid #ddd">${escapeHtml(value).replaceAll("\n", "<br />")}</td>
            </tr>`,
      )
      .join("")}
    </table>
    <p>La personne signataire a attesté l'exactitude des informations, accepté les statuts et confirmé avoir pris connaissance de la déclaration de protection des données.</p>
    <p>Formulaire transmis le ${escapeHtml(new Date().toLocaleString("fr-CH", { timeZone: "Europe/Zurich" }))}.</p>
  `;
}

function buildEmailText(registration: Registration) {
  const courses = getRegistrationCourseLabels(registration.courses);

  return [
    `Nouvelle demande d'inscription - saison ${REGISTRATION_SEASON}`,
    "",
    `Sexe: ${registration.gender}`,
    `Nom: ${registration.lastName}`,
    `Prénom: ${registration.firstName}`,
    `Date de naissance: ${registration.birthDate}`,
    `Numéro AVS: ${registration.avsNumber}`,
    `Parent: ${displayOptional(registration.parentName)}`,
    `Déjà membre: ${registration.existingMember}`,
    `Numéro ACVG: ${displayOptional(registration.acvgNumber)}`,
    `Autres enfants membres: ${displayOptional(registration.siblingNames)}`,
    `Adresse: ${registration.address}`,
    `Code postal et ville: ${registration.postalCode} ${registration.city}`,
    `Téléphone: ${registration.phone}`,
    `E-mail: ${registration.email}`,
    "",
    "Cours souhaités:",
    ...courses.map((course) => `- ${course}`),
    "",
    `Personne signataire: ${registration.signerName}`,
    "Exactitude des informations et statuts: accepté",
    "Déclaration de protection des données: prise de connaissance confirmée",
    `Formulaire transmis le ${new Date().toLocaleString("fr-CH", { timeZone: "Europe/Zurich" })}.`,
  ].join("\n");
}

async function sendWithResend(registration: Registration) {
  const provider = process.env.CONTACT_FORM_PROVIDER;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FORM_FROM;
  const to =
    process.env.REGISTRATION_FORM_TO ||
    process.env.CONTACT_FORM_TO;

  if (provider !== "resend" || !apiKey || !from || !to) {
    throw new RegistrationConfigurationError(
      "Le formulaire n'est pas encore configuré côté serveur.",
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: registration.email,
      subject: `[Gym de Gimel] Nouvelle inscription - ${registration.firstName} ${registration.lastName}`,
      html: buildEmailHtml(registration),
      text: buildEmailText(registration),
    }),
  });

  if (!response.ok) {
    throw new Error("Le fournisseur e-mail a refusé l'envoi de l'inscription.");
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const result = registrationSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { message: "Merci de compléter correctement tous les champs obligatoires." },
      { status: 400 },
    );
  }

  if (result.data.website) {
    return NextResponse.json({
      message: "Votre demande d'inscription a bien été transmise.",
    });
  }

  try {
    await sendWithResend(result.data);
    return NextResponse.json({
      message: "Votre demande d'inscription a bien été transmise à la Gym de Gimel.",
    });
  } catch (error) {
    if (error instanceof RegistrationConfigurationError) {
      return NextResponse.json({ message: error.message }, { status: 503 });
    }

    console.error("[registration] Impossible d'envoyer l'inscription", error);
    return NextResponse.json(
      {
        message:
          "L'envoi de l'inscription a échoué. Merci de réessayer plus tard ou d'utiliser le formulaire PDF.",
      },
      { status: 502 },
    );
  }
}
