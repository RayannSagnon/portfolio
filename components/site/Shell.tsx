"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";
import s from "./site.module.css";

export type NavKey = "work" | "about" | "contact" | null;

function useLinks() {
  const copy = useLocale().ui.siteCopy;
  return [
    { key: "work" as const, href: "/#work", label: copy.nav.work },
    { key: "about" as const, href: "/about", label: copy.nav.about },
    { key: "contact" as const, href: "/contact", label: copy.nav.contact },
  ];
}

type TopNavProps = {
  active: NavKey;
  /** Project pages write the name in full and swap the phone logo for a back button. */
  brand?: "short" | "full";
  mobile?: "logo" | "back";
};

export function TopNav({ active, brand = "short", mobile = "logo" }: TopNavProps) {
  const { locale, setLocale, ui } = useLocale();
  const copy = ui.siteCopy;
  const links = useLinks();

  const lang = (code: Locale) => (
    <button type="button" className={s.lang} aria-pressed={locale === code} onClick={() => setLocale(code)}>
      {code.toUpperCase()}
    </button>
  );

  return (
    <header className={s.nav} data-mobile={mobile}>
      <Link href="/" className={s.brand} aria-label={copy.goHome}>
        {brand === "full" ? "Rayann Sagnon" : "RS"}
      </Link>
      {mobile === "back" && (
        <Link href="/#work" className={s.back} aria-label={copy.back}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </Link>
      )}
      <nav className={s.links} aria-label={copy.navLabel}>
        {links.map((l) => (
          <Link key={l.key} href={l.href} data-active={active === l.key ? "" : undefined} aria-current={active === l.key ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
        <span className={s.langGroup} role="group" aria-label={copy.languageLabel}>
          {lang("en")}
          <span aria-hidden="true">/</span>
          {lang("fr")}
        </span>
      </nav>
    </header>
  );
}

/** Phones get the navigation at the bottom, where the thumb already is. */
function BottomBar({ active }: { active: NavKey }) {
  const { locale, setLocale, ui } = useLocale();
  const links = useLinks();
  const other: Locale = locale === "en" ? "fr" : "en";
  return (
    <nav className={s.bar} aria-label={ui.siteCopy.navLabel}>
      {links.map((l) => (
        <Link key={l.key} href={l.href} data-active={active === l.key ? "" : undefined} aria-current={active === l.key ? "page" : undefined}>
          {l.label}
        </Link>
      ))}
      <button type="button" className={s.barLang} aria-label={ui.siteCopy.languageLabel} onClick={() => setLocale(other)}>
        {other.toUpperCase()}
      </button>
    </nav>
  );
}

export function SiteShell({ children, active, bar = true }: { children: ReactNode; active: NavKey; bar?: boolean }) {
  return (
    <div className={s.root} data-bar={bar ? "" : undefined}>
      {children}
      {bar && <BottomBar active={active} />}
    </div>
  );
}

export function LinkedInButton({ className }: { className?: string }) {
  const { site } = useContent();
  const { ui } = useLocale();
  return (
    <a className={className ? `${s.button} ${className}` : s.button} href={site.linkedin} target="_blank" rel="noopener noreferrer">
      {ui.siteCopy.linkedin}
    </a>
  );
}

export function Slot({ label, className }: { label: string; className?: string }) {
  return (
    <div className={className ? `${s.slot} ${className}` : s.slot}>
      <span>{label}</span>
    </div>
  );
}
