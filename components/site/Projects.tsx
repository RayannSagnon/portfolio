"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LinkedInButton, SiteShell, Slot, TopNav } from "./Shell";
import s from "./site.module.css";

export function Tachometer() {
  const t = useLocale().ui.siteCopy.tachometer;
  return (
    <SiteShell active="work" bar={false}>
      <main className={s.tach}>
        <TopNav active="work" brand="full" mobile="back" />
        <div className={`${s.tachHead} ${s.handle}`}>
          <div>
            <h1 className={s.title}>{t.title}</h1>
            <p className={s.statusLine}>{t.status}</p>
          </div>
          <p className={s.tachText}>{t.description}</p>
        </div>

        <div className={s.tachGrid}>
          <div className={s.rail}>
            <div className={s.photo}>
              <Image src="/images/about-teaser/makerspace-lab.jpeg" alt={t.photoAlt} fill priority sizes="(max-width: 820px) 100vw, 33vw" />
            </div>
            <Slot label={t.schematicSlot} className={s.big} />
          </div>

          <div className={s.story}>
            <h2>{t.storyTitle}</h2>
            <p>{t.story}</p>
          </div>

          <div className={`${s.panel} ${s.expected}`}>
            <h2>{t.expectedTitle}</h2>
            <dl>
              {t.expected.map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`${s.panel} ${s.where}`}>
            <h2>{t.whereTitle}</h2>
            <p>{t.where}</p>
          </div>
        </div>

        <div className={s.tachFoot}>
          <LinkedInButton className={s.onlyPhone} />
          <Link href="/projects/standout" className={s.nextLink}>
            {t.next}
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}

export function Standout() {
  const t = useLocale().ui.siteCopy.standout;
  return (
    <SiteShell active="work" bar={false}>
      <main className={s.split}>
        <div className={`${s.col} ${s.sheetCol} ${s.handle}`}>
          <TopNav active="work" mobile="back" />
          <div className={s.colBody}>
            <h1 className={s.display}>{t.title}</h1>
            <p className={s.role}>{t.description}</p>
            <ul className={s.plainIndex}>
              {t.steps.map(([a, b]) => (
                <li key={a}>
                  <b>{a}</b>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className={s.colLinks}>
              <a href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer">
                {t.visit}
              </a>
              <Link href="/projects/kits">{t.next}</Link>
            </div>
          </div>
        </div>
        <div className={s.media}>
          <div className={`${s.mediaItem} ${s.onlyDesktop}`}>
            <Image src="/images/site/standout-desktop.jpg" alt={t.imageAlt} fill priority sizes="58vw" />
          </div>
          <div className={`${s.mediaItem} ${s.onlyPhone}`}>
            <Image src="/images/site/standout-mobile.jpg" alt={t.imageAlt} fill sizes="100vw" />
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

export function Kits() {
  const t = useLocale().ui.siteCopy.kits;
  return (
    <SiteShell active="work" bar={false}>
      <main className={s.split}>
        <div className={`${s.col} ${s.sheetCol} ${s.handle}`}>
          <TopNav active="work" mobile="back" />
          <div className={s.colBody}>
            <h1 className={s.display}>{t.title}</h1>
            <p className={s.role}>{t.intro}</p>
            <ul className={s.plainIndex} data-large>
              {t.items.map((i) => (
                <li key={i.name}>
                  <b>{i.name}</b>
                  <span>{i.detail}</span>
                </li>
              ))}
            </ul>
            <div className={s.colLinks}>
              <Link href="/about">{t.next}</Link>
            </div>
          </div>
        </div>
        <div className={`${s.media} ${s.mediaStack}`}>
          {t.items.map((i) => (
            <Slot key={i.name} label={i.slot} className={s.mediaItem} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
