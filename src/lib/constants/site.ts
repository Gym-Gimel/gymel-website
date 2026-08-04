export const SITE = {
  name: "Gym de Gimel",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  primaryColor: "#b71313",
  email: "info@gymel.ch",
  address: "Salle omnisports du Marais, 1188 Gimel",
  postalAddress: "Case postale 118, 1188 Gimel",
  social: {
    facebook: "https://www.facebook.com/gymdegimel",
    instagram: "https://www.instagram.com/gymdegimel/"
  }
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/nos-cours", label: "Nos cours" },
  { href: "/calendrier-sportif", label: "Calendrier sportif" },
  { href: "/evenements", label: "Evénements" },
  { href: "/inscriptions", label: "Inscriptions" },
  { href: "/la-societe", label: "La société" },
  { href: "/contact", label: "Contact" }
] as const;

export const WEEK_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] as const;
