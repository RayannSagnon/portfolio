"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";
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

// Resolves the pending view transition once the next livery page has mounted.
let finishPageTransition: (() => void) | null = null;

/**
 * Internal links between livery pages run inside a view transition: the new page
 * is wiped in along the livery's raked angle (see ::view-transition-new in globals.css).
 */
function usePageTransitions(rootRef: React.RefObject<HTMLDivElement | null>) {
  const router = useRouter();

  useEffect(() => {
    if (finishPageTransition) {
      const done = finishPageTransition;
      finishPageTransition = null;
      requestAnimationFrame(() => done());
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest("a");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (!("startViewTransition" in document) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            finishPageTransition = resolve;
            // Never hold the page hostage if the next shell is slow to mount.
            setTimeout(resolve, 1500);
            router.push(url.pathname + url.search + url.hash);
          }),
      );
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [rootRef, router]);
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
  usePageTransitions(rootRef);

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
      <header className={s.top}>
        {current === "home" ? (
          <span className={s.teamLine}>{t.teamLine}</span>
        ) : (
          <Link href="/" className={s.teamLine}>
            {t.teamLine}
          </Link>
        )}
        <nav className={s.nav} aria-label={t.navLabel}>
          <a href={current === "home" ? "#work" : "/#work"} aria-current={current === "work" ? "page" : undefined}>
            {t.nav.work}
          </a>
          <Link href="/about" aria-current={current === "about" ? "page" : undefined}>
            {t.nav.about}
          </Link>
          <a href="#connect">{t.nav.connect}</a>
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
    </div>
  );
}
