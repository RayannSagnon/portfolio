"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LinkedInButton, SiteShell, Slot, TopNav } from "./Shell";
import s from "./site.module.css";

const STANDOUT = "standout";

export function Home() {
  const copy = useLocale().ui.siteCopy;
  const t = copy.home;
  const [active, setActive] = useState<string | null>(null);

  return (
    <SiteShell active={null}>
      <main className={s.home}>
        <div className={s.stage}>
          <div className={s.layer} data-on={active === null ? "" : undefined}>
            <Image className={s.reveal} src="/images/site/portrait.jpg" alt={t.portraitAlt} fill priority sizes="(max-width: 820px) 100vw, 58vw" />
          </div>
          {t.projects.map((p) => (
            <div key={p.id} className={s.layer} data-on={active === p.id ? "" : undefined} aria-hidden="true">
              {p.id === STANDOUT ? (
                <Image src="/images/site/standout-desktop.jpg" alt="" fill sizes="58vw" />
              ) : (
                <Slot label={p.placeholder} className={s.fill} />
              )}
            </div>
          ))}
        </div>

        <div className={s.homeCol}>
          <TopNav active={null} />
          <h1 className={s.display}>
            <span>Rayann</span>
            <span>Sagnon</span>
          </h1>
          <p className={s.role}>{t.role}</p>

          <section id="work" className={s.work} aria-label={t.workLabel}>
            {/* Mouse: the stage follows the row under the pointer. */}
            <ul className={s.index} data-active={active ?? undefined} onMouseLeave={() => setActive(null)}>
              {t.projects.map((p, i) => (
                <li key={p.id} style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    href={p.href}
                    data-current={active === p.id ? "" : undefined}
                    onMouseEnter={() => setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                    onBlur={() => setActive(null)}
                  >
                    <b>{p.name}</b>
                    <span>{p.status}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Touch: there is no hover, so projects are cards you swipe through. */}
            <h2 className={s.workHeading}>{t.workHeading}</h2>
            <ul className={s.cards}>
              {t.projects.map((p) => (
                <li key={p.id}>
                  <Link href={p.href} className={s.card}>
                    {p.id === STANDOUT ? (
                      <Image src="/images/site/standout-mobile.jpg" alt="" fill sizes="82vw" />
                    ) : (
                      <span className={s.cardSlot}>{p.placeholder}</span>
                    )}
                    <span className={s.cardText}>
                      <b>{p.name}</b>
                      <span>{p.status}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <LinkedInButton className={s.homeCta} />
        </div>
      </main>
    </SiteShell>
  );
}
