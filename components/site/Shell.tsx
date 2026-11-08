"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";
import s from "./site.module.css";

export type NavKey = "work" | "about" | "contact" | null;
export type Navigate = (key: Exclude<NavKey, null>) => void;

function useLinks() {
  const copy = useLocale().ui.siteCopy;
  return [
    { key: "work" as const, href: "/projects/tachometer", label: copy.nav.work },
    { key: "about" as const, href: "/about", label: copy.nav.about },
    { key: "contact" as const, href: "/contact", label: copy.nav.contact },
  ];
}

const intercept = (key: Exclude<NavKey, null>, onNavigate?: Navigate) => (e: MouseEvent) => {
  if (!onNavigate) return;
  e.preventDefault();
  onNavigate(key);
};

type TopNavProps = { active: NavKey; onNavigate?: Navigate; onHome?: () => void };

export function TopNav({ active, onNavigate, onHome }: TopNavProps) {
  const { locale, setLocale, ui } = useLocale();
  const copy = ui.siteCopy;
  const links = useLinks();
  const linksRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  // The active tab's bar slides between links; the first placement must not animate.
  useLayoutEffect(() => {
    const place = () => {
      const mark = markRef.current;
      const current = linksRef.current?.querySelector<HTMLElement>("a[data-active]");
      if (!mark) return;
      mark.style.opacity = current ? "1" : "0";
      if (!current) return;
      if (!placed.current) mark.style.transition = "none";
      mark.style.transform = `translateX(${current.offsetLeft}px) scaleX(${current.offsetWidth / 100})`;
      if (!placed.current) {
        void mark.offsetWidth;
        mark.style.transition = "";
        placed.current = true;
      }
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active, locale]);

  const lang = (code: Locale) => (
    <button type="button" className={s.lang} aria-pressed={locale === code} onClick={() => setLocale(code)}>
      {code.toUpperCase()}
    </button>
  );

  return (
    <header className={s.nav}>
      <Link
        href="/"
        className={s.brand}
        aria-label={copy.goHome}
        onClick={(e) => {
          if (!onHome) return;
          e.preventDefault();
          onHome();
        }}
      >
        RS
      </Link>
      <nav ref={linksRef} className={s.links} aria-label={copy.navLabel}>
        {links.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            onClick={intercept(l.key, onNavigate)}
            data-active={active === l.key ? "" : undefined}
            aria-current={active === l.key ? "location" : undefined}
          >
            {l.label}
          </Link>
        ))}
        <span ref={markRef} className={s.mark} aria-hidden="true" />
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
function BottomBar({ active, onNavigate }: { active: NavKey; onNavigate?: Navigate }) {
  const { locale, setLocale, ui } = useLocale();
  const links = useLinks();
  const other: Locale = locale === "en" ? "fr" : "en";
  return (
    <nav className={s.bar} aria-label={ui.siteCopy.navLabel}>
      {links.map((l) => (
        <Link
          key={l.key}
          href={l.href}
          onClick={intercept(l.key, onNavigate)}
          data-active={active === l.key ? "" : undefined}
          aria-current={active === l.key ? "location" : undefined}
        >
          {l.label}
        </Link>
      ))}
      <button type="button" className={s.barLang} aria-label={ui.siteCopy.languageLabel} onClick={() => setLocale(other)}>
        {other.toUpperCase()}
      </button>
    </nav>
  );
}

export function SiteShell({ children, active, onNavigate, tone = "dark" }: { children: ReactNode; active: NavKey; onNavigate?: Navigate; tone?: "dark" | "light" }) {
  return (
    <div className={s.root} data-tone={tone}>
      {children}
      <BottomBar active={active} onNavigate={onNavigate} />
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
