"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, SITE } from "@/lib/constants/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-ink"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative block h-12 w-16 overflow-hidden rounded bg-white">
            <Image
              src="/images/logo.png"
              alt="Logo Gym de Gimel"
              fill
              className="object-contain"
              sizes="64px"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block text-base">Gym de Gimel</span>
            <span className="block text-xs font-semibold text-stone-500">
              Société sportive
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="rounded px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-brand-soft hover:text-brand aria-[current=page]:bg-brand aria-[current=page]:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm font-semibold text-stone-600 hover:text-brand"
          >
            {SITE.email}
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded border border-stone-300 text-ink lg:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">
            {isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          </span>
          <span className="grid w-5 gap-1.5" aria-hidden="true">
            <span
              className={`h-0.5 rounded-full bg-current transition ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-current transition ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-current transition ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          className="border-t border-stone-200 bg-white px-4 py-3 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={
                  isActive(pathname, item.href) ? "page" : undefined
                }
                className="rounded px-3 py-3 text-base font-semibold text-stone-700 hover:bg-brand-soft hover:text-brand aria-[current=page]:bg-brand aria-[current=page]:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
