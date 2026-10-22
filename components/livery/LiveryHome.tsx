"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";
import s from "./LiveryHome.module.css";

// Closed stamp vocabulary: every status on the page is one of these, nothing improvised.
type Stamp = "design" | "fab" | "test" | "delivered" | "kit";
// The key lists only stamps something on the page carries today.
const STAMPS_IN_USE: Stamp[] = ["design", "delivered", "kit"];

function ArrowIcon() {
  return (
    <svg className={s.arrow} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  );
}

// Raked ink pinstripe between sections; garnet stays reserved for the hero stripe, the close and actions.
function Stripe() {
  return <div className={s.break} aria-hidden="true" />;
}

export function LiveryHome() {
  const { locale, setLocale, ui } = useLocale();
  const { site } = useContent();
  const t = ui.livery;
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Stamp | null>(null);
  const [pinned, setPinned] = useState<Stamp | null>(null);
  const highlight = hovered ?? pinned;

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

  const stampProps = (stamp: Stamp) => ({
    "data-status": stamp,
    "data-lit": highlight === stamp ? "" : undefined,
    "data-dim": highlight && highlight !== stamp ? "" : undefined,
  });

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
        <span className={s.teamLine}>{t.teamLine}</span>
        <nav className={s.nav} aria-label={t.navLabel}>
          <a href="#work">{t.nav.work}</a>
          <Link href="/about">{t.nav.about}</Link>
          <a href="#connect">{t.nav.connect}</a>
          <span className={s.langGroup} role="group" aria-label={t.language}>
            {langButton("en")}
            {langButton("fr")}
          </span>
        </nav>
      </header>

      <main>
        <section className={s.hero} aria-labelledby="livery-name">
          <h1 id="livery-name" className={s.name}>
            <span>Rayann</span>
            <span>Sagnon</span>
          </h1>

          <Link href="/" className={s.roundel} aria-label={ui.goHome}>
            RS
          </Link>

          <p className={s.role}>{t.roleLine}</p>

          <a className={`${s.pitBoard} ${s.heroPit}`} href={site.linkedin} target="_blank" rel="noopener noreferrer">
            <span>{t.connect}</span>
            <span className={s.pitArrow}>
              <ArrowIcon />
            </span>
          </a>

          <aside className={s.sheet} aria-label={t.legendLabel}>
            <ul className={s.stickers}>
              <li className={s.sticker} {...stampProps("design")}>
                <span className={s.stickerName}>{t.stickers.tachometer}</span>
                <span className={s.stamp}>{t.stamps.design}</span>
              </li>
              <li className={s.sticker} {...stampProps("delivered")}>
                <span className={s.stickerName}>{t.stickers.standout}</span>
                <span className={s.stamp}>{t.stamps.delivered}</span>
              </li>
              <li className={s.sticker} {...stampProps("kit")}>
                <span className={s.stickerName}>{t.stickers.rcx}</span>
                <span className={s.stamp}>{t.stamps.kit}</span>
              </li>
            </ul>
            <div className={s.key} role="group" aria-label={t.keyLabel}>
              {STAMPS_IN_USE.map((stamp) => (
                <button
                  key={stamp}
                  type="button"
                  className={`${s.stamp} ${s.keyStamp}`}
                  data-status={stamp}
                  aria-pressed={pinned === stamp}
                  onClick={() => setPinned((current) => (current === stamp ? null : stamp))}
                  onMouseEnter={() => setHovered(stamp)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(stamp)}
                  onBlur={() => setHovered(null)}
                >
                  {t.stamps[stamp]}
                </button>
              ))}
            </div>
          </aside>
        </section>

        <Stripe />

        <section id="work" className={s.bench} aria-labelledby="bench-heading">
          <div>
            <h2 id="bench-heading" className={s.heading}>
              {t.bench.heading}
            </h2>
            <p className={s.body}>{t.bench.body}</p>

            <dl className={s.spec} aria-label={t.bench.specLabel}>
              {t.bench.spec.map(([label, value]) => (
                <div key={label} className={s.specRow}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.benchSide}>
            <ol className={s.stations} aria-label={t.bench.stationsLabel}>
              {t.bench.stations.map((station, i) => (
                <li key={station} className={s.station} aria-current={i === 0 ? "step" : undefined}>
                  <span className={s.box} aria-hidden="true" />
                  <span className={s.stationName}>{station}</span>
                  {i === 0 && (
                    <span className={s.stamp} data-stamp-on {...stampProps("design")}>
                      <span className="sr-only">{t.bench.current}: </span>
                      {t.stamps.design}
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <figure className={s.slot}>
              <figcaption>{t.bench.slot}</figcaption>
            </figure>
          </div>
        </section>

        <Stripe />

        <section className={s.split} aria-labelledby="standout-heading">
          <div>
            <h2 id="standout-heading" className={s.heading}>
              {t.standout.heading}
            </h2>
            <p className={s.body}>{t.standout.body}</p>
            <div className={s.links}>
              <Link href="/projects/standout" className={s.textLink}>
                {t.standout.caseStudy}
                <ArrowIcon />
              </Link>
              <a href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer" className={s.textLink}>
                {t.standout.site}
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className={`${s.sticker} ${s.decal}`} {...stampProps("delivered")}>
            <span className={s.stickerName}>{t.standout.decalTitle}</span>
            <dl className={s.decalFacts}>
              <div>
                <dt className="sr-only">{t.standout.kind}</dt>
                <dd>{t.standout.kind}</dd>
              </div>
              <div>
                <dt className="sr-only">{t.standout.role}</dt>
                <dd>{t.standout.role}</dd>
              </div>
              <div>
                <dt className="sr-only">{t.standout.revenue}</dt>
                <dd>{t.standout.revenue}</dd>
              </div>
            </dl>
            <span className={s.stamp} data-stamp-on>
              {t.stamps.delivered}
            </span>
          </div>
        </section>

        <Stripe />

        <section className={s.kits} aria-labelledby="kits-heading">
          <h2 id="kits-heading" className={s.heading}>
            {t.kits.heading}
          </h2>
          <p className={s.body}>{t.kits.body}</p>
          <ul className={s.kitList}>
            {t.kits.items.map((item) => (
              <li key={item.name} className={s.sticker} {...stampProps("kit")}>
                <span className={s.stickerName}>{item.name}</span>
                <span className={s.kitDetail}>{item.detail}</span>
                <span className={s.kitAdded}>
                  <b>{t.kits.addedLabel}</b> {item.added}
                </span>
                <span className={s.stamp} data-stamp-on>
                  {t.stamps.kit}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <Stripe />

        <section className={s.split} aria-labelledby="origin-heading">
          <div>
            <h2 id="origin-heading" className={s.heading}>
              {t.origin.heading}
            </h2>
            <p className={s.body}>{t.origin.body}</p>
            <Link href="/about" className={`${s.textLink} ${s.spaced}`}>
              {t.origin.more}
              <ArrowIcon />
            </Link>
          </div>

          <div className={s.route} aria-hidden="true">
            <span className={s.city}>
              <b>{t.origin.from[0]}</b>
              {t.origin.from[1]}
            </span>
            <span className={s.routeLine} />
            <span className={s.city}>
              <b>{t.origin.to[0]}</b>
              {t.origin.to[1]}
            </span>
          </div>
        </section>

        <section id="connect" className={s.close} aria-labelledby="close-heading">
          <div className={s.closeStripe} aria-hidden="true" />
          <h2 id="close-heading" className={s.closeHeading}>
            {t.close.heading}
          </h2>
          <p className={s.closeBody}>{t.close.body}</p>
          <div className={s.closeActions}>
            <a className={s.pitBoard} href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <span>{t.connect}</span>
              <span className={s.pitArrow}>
                <ArrowIcon />
              </span>
            </a>
            <a className={s.textLink} href={`mailto:${site.email}`}>
              {t.close.email}
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

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
