"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { ContactBackground } from "../ContactBackground";
import h from "./home.module.css";

export const CV_FILE = {
  en: { href: "/documents/rayann-sagnon-cv-en.pdf", name: "Rayann_Sagnon_Resume.pdf" },
  fr: { href: "/documents/rayann-sagnon-cv-fr.pdf", name: "Rayann_Sagnon_CV.pdf" },
} as const;

/** The end of the site: the question first, then the three actions one by one, the portrait last, once it is on screen. */
export function ContactSection({ className }: { className?: string }) {
  const { site } = useContent();
  const { locale, ui } = useLocale();
  const copy = ui.siteCopy;
  const c = copy.contact;
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.setAttribute("data-in", "");
        show.disconnect();
      },
      { threshold: 0.25 },
    );
    const lines = new IntersectionObserver((entries) => setNear(entries.some((e) => e.isIntersecting)), { rootMargin: "20% 0px" });
    show.observe(el);
    lines.observe(el);
    return () => {
      show.disconnect();
      lines.disconnect();
    };
  }, []);

  return (
    <section ref={ref} id="contact" className={className ? `${h.contact} ${className}` : h.contact} aria-labelledby="contact-title">
      <div className={h.contactBg} aria-hidden="true">
        <ContactBackground near={near} />
      </div>
      <div className={h.contactHead}>
        <h2 id="contact-title" className={h.contactTitle}>
          {c.title}
        </h2>
        <div className={h.contactPortrait}>
          <Image src="/images/site/portrait.jpg" alt={c.portraitAlt} fill sizes="(max-width: 820px) 96px, 240px" quality={90} />
        </div>
      </div>
      <div className={h.contactRows}>
        <a className={h.contactRow} data-primary href={site.linkedin} target="_blank" rel="noopener noreferrer">
          <span>{copy.linkedin}</span>
          <ArrowUpRight aria-hidden="true" strokeWidth={1} />
        </a>
        <a className={h.contactRow} href={`mailto:${site.email}`}>
          <span>{copy.email}</span>
          <ArrowUpRight aria-hidden="true" strokeWidth={1} />
        </a>
        <a className={h.contactRow} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
          <span>{copy.about.cv}</span>
          <ArrowUpRight aria-hidden="true" strokeWidth={1} />
        </a>
      </div>
      <footer className={h.contactFoot}>
        <span>{c.availability}</span>
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </section>
  );
}
