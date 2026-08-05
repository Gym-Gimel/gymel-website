import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-black">Gym de Gimel</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-300">
            Société sportive locale fondée sur le mouvement, la convivialité et
            l'engagement bénévole.
          </p>
          <p className="mt-4 text-sm text-stone-300">{SITE.address}</p>
          <p className="text-sm text-stone-300">{SITE.postalAddress}</p>
        </div>
        <div>
          <p className="font-bold">Navigation</p>
          <ul className="mt-3 grid gap-2 text-sm text-stone-300">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sponsors" className="hover:text-white">
                Sponsors
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold">Coordonnées</p>
          <ul className="mt-3 grid gap-2 text-sm text-stone-300">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.social.facebook} className="hover:text-white">
                Facebook
              </a>{" "}
              ·{" "}
              <a href={SITE.social.instagram} className="hover:text-white">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-stone-400">
        © 2026 Gym de Gimel. Tous droits réservés. Réalisé par{" "}
        <a
          href="https://www.daviddieperink.ch"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-white hover:underline"
        >
          David Dieperink
        </a>
        .
      </div>
    </footer>
  );
}
