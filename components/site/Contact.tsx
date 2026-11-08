"use client";

import Image from "next/image";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { LinkedInButton, SiteShell, TopNav } from "./Shell";
import s from "./site.module.css";

export function Contact() {
  const { site } = useContent();
  const copy = useLocale().ui.siteCopy;
  const t = copy.contact;
  return (
    <SiteShell active="contact">
      <main className={`${s.split} ${s.contact}`}>
        <div className={s.col}>
          <TopNav active="contact" />
          <div className={s.contactTitle}>
            <h1 className={s.sectionTitle}>{t.title}</h1>
          </div>
          <div className={s.contactActions}>
            <LinkedInButton />
            <a className={s.secondary} href={`mailto:${site.email}`}>
              {copy.email}
            </a>
            <p>{t.availability}</p>
          </div>
          <footer className={s.foot}>
            <span>Rayann Sagnon</span>
            <span>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          </footer>
        </div>
        <div className={s.media}>
          <div className={s.mediaItem}>
            <Image src="/images/site/portrait.jpg" alt={t.portraitAlt} fill priority sizes="(max-width: 820px) 100vw, 58vw" />
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
