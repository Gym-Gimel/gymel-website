import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SITE } from "@/lib/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Gym de Gimel",
    template: "%s | Gym de Gimel",
  },
  description:
    "Cours, calendrier sportif, inscriptions et événements de la société Gym de Gimel.",
  icons: {
    icon: [
      {
        url: "/images/logo.png",
        type: "image/png",
      },
    ],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Gym de Gimel",
    description:
      "Une société sportive locale, dynamique et ouverte à toutes les générations.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "fr_CH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
