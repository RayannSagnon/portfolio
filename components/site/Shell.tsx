"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";
import s from "./site.module.css";

export type NavKey = "work" | "experience" | "about" | "contact" | null;
/** Returns true when it handled the move itself, so the link does not navigate. */
export type Navigate = (key: Exclude<NavKey, null>) => boolean;
export type NavFrame = "full" | "left" | "about";

function useLinks() {
  const nav = useLocale().ui.pages.nav;
  return [
    { key: "work" as const, href: "/#work", label: nav.work },
    { key: "experience" as const, href: "/experience", label: nav.experience },
    { key: "about" as const, href: "/about", label: nav.about },
    { key: "contact" as const, href: "/#contact", label: nav.contact },
  ];
}

const intercept = (key: Exclude<NavKey, null>, onNavigate?: Navigate) => (e: MouseEvent) => {
  if (onNavigate?.(key)) e.preventDefault();
};

type TopNavProps = { active: NavKey; frame?: NavFrame; light?: boolean; onNavigate?: Navigate; onHome?: () => void };

export function TopNav({ active, frame = "full", light, onNavigate, onHome }: TopNavProps) {
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
    <header className={s.nav} data-frame={frame} data-light={light ? "" : undefined}>
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
        <span className={s.leds} aria-hidden="true">
          <span data-nav-led />
          <span data-nav-led />
          <span data-nav-led />
          <span data-nav-led />
        </span>
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

export function SiteShell({ children, active, onNavigate }: { children: ReactNode; active: NavKey; onNavigate?: Navigate }) {
  return (
    <div className={s.root}>
      {children}
      <BottomBar active={active} onNavigate={onNavigate} />
    </div>
  );
}

export function Slot({ label, className }: { label: string; className?: string }) {
  return (
    <div className={className ? `${s.slot} ${className}` : s.slot}>
      <span>{label}</span>
    </div>
  );
}
