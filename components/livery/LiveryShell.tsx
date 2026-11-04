"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";
import { MotionLayer } from "./MotionLayer";
import s from "./LiveryHome.module.css";

export function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg className={s.arrow} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={back ? "M20 12H5M11 5l-7 7 7 7" : "M4 12h15M13 5l7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

// Raked ink pinstripe between sections; garnet stays reserved for the hero stripe, the close and actions.
export function Stripe() {
  return <div className={s.break} aria-hidden="true" />;
}

export function PitBoard({ className }: { className?: string }) {
  const { site } = useContent();
  const { ui } = useLocale();
  return (
    <a
      className={className ? `${s.pitBoard} ${className}` : s.pitBoard}
      href={site.linkedin}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{ui.livery.connect}</span>
      <span className={s.pitArrow}>
        <ArrowIcon />
      </span>
    </a>
  );
}

type CloseProps = {
  heading?: string;
  body?: string;
  /** Extra links shown after the pit-board, before email. */
  children?: ReactNode;
  /** Quiet closes drop the returning stripe and use the section headline size. */
  quiet?: boolean;
};

// The closing section every livery page ends on: the pit-board always waits there.
export function LiveryClose({ heading, body, children, quiet = false }: CloseProps) {
  const { site } = useContent();
  const t = useLocale().ui.livery;
  return (
    <section
      id="connect"
      className={quiet ? `${s.close} ${s.closeQuiet}` : s.close}
      aria-labelledby="close-heading"
    >
      {!quiet && <div className={s.closeStripe} aria-hidden="true" />}
      <h2 id="close-heading" className={quiet ? s.heading : s.closeHeading}>
        {heading ?? t.close.heading}
      </h2>
      <p className={s.closeBody}>{body ?? t.close.body}</p>
      <div className={s.closeActions}>
        <PitBoard />
        {children}
        <a className={s.textLink} href={`mailto:${site.email}`}>
          {t.close.email}
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

type BarState = "top" | "shown" | "hidden";

/**
 * The top bar stays reachable: transparent at the top of the page, hidden while
 * reading downward, back on a solid plate as soon as the visitor scrolls up.
 */
function useBarState(): BarState {
  const [state, setState] = useState<BarState>("top");

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) setState("top");
      else if (delta > 6 && y > 320) setState("hidden");
      else if (delta < -6) setState("shown");
      if (Math.abs(delta) > 6) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}

type NavItem = "work" | "about" | "connect" | null;

/** On the homepage the active tab follows the section under the bar. */
function useHomeSection(enabled: boolean): NavItem {
  const [section, setSection] = useState<NavItem>(null);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      const connect = document.getElementById("connect");
      const work = document.getElementById("work");
      if (connect && connect.getBoundingClientRect().top < line) setSection("connect");
      else if (work && work.getBoundingClientRect().top < line) setSection("work");
      else setSection(null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return section;
}

type ShellProps = {
  children: ReactNode;
  current?: "home" | "about" | "work";
};

export function LiveryShell({ children, current = "home" }: ShellProps) {
  const { locale, setLocale, ui } = useLocale();
  const { site } = useContent();
  const t = ui.livery;
  const rootRef = useRef<HTMLDivElement>(null);
  const bar = useBarState();
  const homeSection = useHomeSection(current === "home");
  const active: NavItem = current === "home" ? homeSection : current;

  // Elements marked data-reveal play their one-shot motion when they first come into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Stamps below the fold land as they enter; anything already in view stays put.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pending = Array.from(root.querySelectorAll<HTMLElement>("[data-stamp-on]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    pending.forEach((el) => el.setAttribute("data-pending", ""));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute("data-pending");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.4 },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const langButton = (code: Locale) => (
    <button
      type="button"
      className={s.lang}
      aria-pressed={locale === code}
      onClick={() => setLocale(code)}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <div ref={rootRef} className={s.root}>
      <header className={s.top} data-bar={bar}>
        <Link href="/" className={s.brand} aria-label={ui.goHome}>
          <span className={s.brandMark} aria-hidden="true">
            RS
          </span>
          <span className={s.brandName}>Rayann Sagnon</span>
        </Link>
        <nav className={s.nav} aria-label={t.navLabel}>
          <a
            href={current === "home" ? "#work" : "/#work"}
            data-active={active === "work" ? "" : undefined}
            aria-current={current === "work" ? "page" : active === "work" ? "location" : undefined}
          >
            {t.nav.work}
          </a>
          <Link
            href="/about"
            data-active={active === "about" ? "" : undefined}
            aria-current={current === "about" ? "page" : undefined}
          >
            {t.nav.about}
          </Link>
          <a
            href="#connect"
            data-active={active === "connect" ? "" : undefined}
            aria-current={active === "connect" ? "location" : undefined}
          >
            {t.nav.connect}
          </a>
          <span className={s.langGroup} role="group" aria-label={t.language}>
            {langButton("en")}
            {langButton("fr")}
          </span>
        </nav>
      </header>

      <main>{children}</main>

      <footer className={s.footer}>
        <span>{t.footer}</span>
        <span className={s.footerLinks}>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </span>
      </footer>
      <MotionLayer />
    </div>
  );
}
