"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { LinkedInButton, SiteShell, Slot, TopNav, type NavKey, type Navigate } from "./Shell";
import { jumpTo, useScrollEngine } from "./useScroll";
import s from "./site.module.css";

const CV_PATH = "/documents/rayann-sagnon-cv.pdf";
const PHOTO = {
  portrait: "/images/site/portrait.jpg",
  sofa: "/images/site/sofa.jpg",
  lab: "/images/about-teaser/makerspace-lab.jpeg",
  child: "/images/about-teaser/childhood-origin.jpeg",
  hack: "/images/about/hackathon-winning-team.png",
};

type StageKey = "portrait" | "lab" | "schematic" | "standout" | "rcx" | "arm" | "child" | "hack" | "sofa";

// Which image the stage shows, and which nav tab is lit, for each section.
const SECTIONS: Record<string, { stage: StageKey; nav: NavKey }> = {
  home: { stage: "portrait", nav: null },
  tachometer: { stage: "lab", nav: "work" },
  "tachometer-status": { stage: "schematic", nav: "work" },
  standout: { stage: "standout", nav: "work" },
  kits: { stage: "rcx", nav: "work" },
  "kits-arm": { stage: "arm", nav: "work" },
  about: { stage: "child", nav: "about" },
  "about-hackathon": { stage: "hack", nav: "about" },
  "about-ottawa": { stage: "lab", nav: "about" },
  experience: { stage: "sofa", nav: "about" },
  skills: { stage: "sofa", nav: "about" },
  contact: { stage: "portrait", nav: "contact" },
};

const ROW_TARGET: Record<string, { section: string; stage: StageKey }> = {
  tachometer: { section: "tachometer", stage: "schematic" },
  standout: { section: "standout", stage: "standout" },
  rcx: { section: "kits", stage: "rcx" },
  arm: { section: "kits-arm", stage: "arm" },
};

const NAV_TARGET = { work: "tachometer", about: "about", contact: "contact" } as const;

type Media = { src?: string; phoneSrc?: string; alt: string; slot?: string };

function Picture({ media, sizes, priority }: { media: Media; sizes: string; priority?: boolean }) {
  if (media.slot) return <Slot label={media.slot} className={s.fill} />;
  return <Image src={media.src!} alt={media.alt} fill sizes={sizes} priority={priority} />;
}

function Section({ id, media, children, className }: { id: string; media?: Media; children: ReactNode; className?: string }) {
  return (
    <section id={id} data-sec className={className ? `${s.sec} ${className}` : s.sec}>
      {media && (
        <div className={s.secMedia}>
          <Picture media={media.phoneSrc ? { ...media, src: media.phoneSrc } : media} sizes="100vw" />
        </div>
      )}
      <div className={s.inner}>{children}</div>
    </section>
  );
}

function Accordion({ items }: { items: { id: string; title: string; meta: string; body: string }[] }) {
  const [open, setOpen] = useState<string | undefined>(items[0]?.id);
  return (
    <div className={`${s.accordion} ${s.onlyPhone}`}>
      {items.map((e) =>
        e.body ? (
          <div key={e.id} className={s.accItem}>
            <button type="button" aria-expanded={open === e.id} onClick={() => setOpen(open === e.id ? undefined : e.id)}>
              <b>{e.title}</b>
              <span>{e.meta}</span>
            </button>
            <div className={s.accPanel} data-open={open === e.id ? "" : undefined}>
              <div>
                <p>{e.body}</p>
              </div>
            </div>
          </div>
        ) : (
          <div key={e.id} className={s.accItem}>
            <div className={s.accStatic}>
              <b>{e.title}</b>
              <span>{e.meta}</span>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

const PHONE_ORDER = ["support", "facilities", "training", "hackathon"];

export function OnePage({ start, hasCv }: { start?: string; hasCv: boolean }) {
  const { site } = useContent();
  const copy = useLocale().ui.siteCopy;
  const rootRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(start ?? "home");
  const [hover, setHover] = useState<StageKey | null>(null);

  useScrollEngine();

  // The section under the middle of the screen drives the image and the active tab.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-sec]"));
    const middle = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((el) => middle.observe(el));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => middle.disconnect();
    }
    // Text rises once, the first time its section is reached.
    root.setAttribute("data-motion", "");
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          seen.unobserve(e.target);
        }
      },
      { threshold: 0.12 },
    );
    sections.forEach((el) => seen.observe(el));
    return () => {
      middle.disconnect();
      seen.disconnect();
    };
  }, []);

  const onNavigate = useCallback<Navigate>((key) => jumpTo(NAV_TARGET[key]), []);
  const onHome = useCallback(() => jumpTo("home"), []);

  const h = copy.home;
  const t = copy.tachometer;
  const so = copy.standout;
  const k = copy.kits;
  const a = copy.about;
  const c = copy.contact;

  const media = useMemo<Record<StageKey, Media>>(
    () => ({
      portrait: { src: PHOTO.portrait, alt: h.portraitAlt },
      lab: { src: PHOTO.lab, alt: t.photoAlt },
      schematic: { alt: "", slot: t.schematicSlot },
      standout: { src: "/images/site/standout-desktop.jpg", phoneSrc: "/images/site/standout-mobile.jpg", alt: so.imageAlt },
      rcx: { alt: "", slot: k.items[0].slot },
      arm: { alt: "", slot: k.items[1].slot },
      child: { src: PHOTO.child, alt: a.route[0].alt },
      hack: { src: PHOTO.hack, alt: a.route[1].alt },
      sofa: { src: PHOTO.sofa, alt: a.portraitAlt },
    }),
    [h, t, so, k, a],
  );

  // Hovering only steers the image while the index is on screen.
  const stage = (current === "home" ? hover : null) ?? SECTIONS[current]?.stage ?? "portrait";
  const nav = SECTIONS[current]?.nav ?? null;
  const phoneExperience = PHONE_ORDER.map((id) => a.experience.find((e) => e.id === id)!);
  const startScript = start
    ? `(function(){var e=document.getElementById(${JSON.stringify(start)});if(e)window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY,behavior:"instant"})})()`
    : null;

  return (
    <SiteShell active={nav} onNavigate={onNavigate}>
      <main ref={rootRef} className={s.page}>
        <div className={s.stage}>
          {(Object.keys(media) as StageKey[]).map((key) => (
            <div key={key} className={s.layer} data-key={key} data-on={stage === key ? "" : undefined}>
              <Picture media={media[key]} sizes="(max-width: 820px) 100vw, 58vw" priority={key === "portrait"} />
            </div>
          ))}
        </div>

        <div className={s.column}>
          <TopNav active={nav} onNavigate={onNavigate} onHome={onHome} />

          <section id="home" data-sec data-in="" className={`${s.sec} ${s.hero}`}>
            <h1 className={s.display}>
              <span>Rayann</span>
              <span>Sagnon</span>
            </h1>
            <p className={s.role}>{h.role}</p>

            <div className={s.work} aria-label={h.workLabel}>
              <ul className={s.index} data-active={hover ?? undefined} onMouseLeave={() => setHover(null)}>
                {h.projects.map((p, i) => (
                  <li key={p.id} style={{ "--i": i } as React.CSSProperties}>
                    <a
                      href={p.href}
                      data-current={hover === ROW_TARGET[p.id].stage ? "" : undefined}
                      onMouseEnter={() => setHover(ROW_TARGET[p.id].stage)}
                      onFocus={() => setHover(ROW_TARGET[p.id].stage)}
                      onBlur={() => setHover(null)}
                      onClick={(e) => {
                        e.preventDefault();
                        setHover(null);
                        jumpTo(ROW_TARGET[p.id].section);
                      }}
                    >
                      <b>{p.name}</b>
                      <span>{p.status}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <h2 className={s.workHeading}>{h.workHeading}</h2>
              <ul className={s.cards}>
                {h.projects.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.href}
                      className={s.card}
                      onClick={(e) => {
                        e.preventDefault();
                        jumpTo(ROW_TARGET[p.id].section);
                      }}
                    >
                      {p.id === "standout" ? (
                        <Image src="/images/site/standout-mobile.jpg" alt="" fill sizes="82vw" />
                      ) : (
                        <span className={s.cardSlot}>{p.placeholder}</span>
                      )}
                      <span className={s.cardText}>
                        <b>{p.name}</b>
                        <span>{p.status}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <LinkedInButton className={s.homeCta} />
          </section>

          <Section id="tachometer" media={media.lab}>
            <h2 className={s.secTitle}>{t.title}</h2>
            <p className={s.status}>{t.status}</p>
            <p className={s.lead}>{t.description}</p>
            <div className={s.story}>
              <h3>{t.storyTitle}</h3>
              <p>{t.story}</p>
            </div>
          </Section>

          <Section id="tachometer-status" media={media.schematic}>
            <div className={s.panel}>
              <h3>{t.expectedTitle}</h3>
              <dl>
                {t.expected.map(([x, y]) => (
                  <div key={x}>
                    <dt>{x}</dt>
                    <dd>{y}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.panel}>
              <h3>{t.whereTitle}</h3>
              <p>{t.where}</p>
            </div>
          </Section>

          <Section id="standout" media={media.standout}>
            <h2 className={s.secTitle}>{so.title}</h2>
            <p className={s.lead}>{so.description}</p>
            <ul className={s.plainIndex}>
              {so.steps.map(([x, y]) => (
                <li key={x}>
                  <b>{x}</b>
                  <span>{y}</span>
                </li>
              ))}
            </ul>
            <a className={s.textLink} href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer">
              {so.visit}
            </a>
          </Section>

          <Section id="kits" media={media.rcx}>
            <h2 className={s.secTitle}>{k.title}</h2>
            <p className={s.lead}>{k.intro}</p>
            <div className={s.kit}>
              <b>{k.items[0].name}</b>
              <span>{k.items[0].detail}</span>
            </div>
          </Section>

          <Section id="kits-arm" media={media.arm}>
            <div className={s.kit}>
              <b>{k.items[1].name}</b>
              <span>{k.items[1].detail}</span>
            </div>
          </Section>

          <Section id="about" media={media.child}>
            <h2 className={s.secTitle}>{a.routeTitle}</h2>
            <div className={s.step}>
              <span>{a.route[0].place}</span>
              <h3>{a.route[0].title}</h3>
              <p>{a.route[0].body}</p>
            </div>
            <p className={s.siri}>{a.siri}</p>
          </Section>

          {a.route.slice(1).map((r, i) => (
            <Section key={r.title} id={i === 0 ? "about-hackathon" : "about-ottawa"} media={i === 0 ? media.hack : media.lab}>
              <div className={s.step}>
                <span>{r.place}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            </Section>
          ))}

          <Section id="experience" media={media.sofa}>
            <h2 className={s.secTitle}>{a.experienceTitle}</h2>
            <ul className={`${s.experience} ${s.onlyDesktop}`}>
              {a.experience.map((e) => (
                <li key={e.id}>
                  <h3>{e.title}</h3>
                  <span>{e.meta}</span>
                  {e.body && <p>{e.body}</p>}
                </li>
              ))}
            </ul>
            <Accordion items={phoneExperience} />
          </Section>

          <Section id="skills">
            <h2 className={s.secTitle}>{a.skillsTitle}</h2>
            <ul className={s.skills}>
              {a.skills.map(([x, y]) => (
                <li key={x}>
                  <b>{x}</b>
                  <span>{y}</span>
                </li>
              ))}
            </ul>
            <p className={s.course}>
              <b>{a.course[0]}</b>
              <span>{a.course[1]}</span>
            </p>
            {hasCv && (
              <a className={s.textLink} href={CV_PATH} download>
                {a.cv}
              </a>
            )}
          </Section>

          <Section id="contact" media={{ src: PHOTO.portrait, alt: c.portraitAlt }} className={s.contact}>
            <h2 className={s.secTitle}>{c.title}</h2>
            <LinkedInButton />
            <a className={s.secondary} href={`mailto:${site.email}`}>
              {copy.email}
            </a>
            <p className={s.status}>{c.availability}</p>
            <footer className={s.foot}>
              <span>Rayann Sagnon</span>
              <span>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </span>
            </footer>
          </Section>
        </div>
        {startScript && <script dangerouslySetInnerHTML={{ __html: startScript }} />}
      </main>
    </SiteShell>
  );
}
