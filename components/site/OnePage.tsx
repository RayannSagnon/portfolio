"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { HomeBackground } from "./HomeBackground";
import { InterludeBackground } from "./InterludeBackground";
import { RouteCarousel } from "./RouteCarousel";
import { SkillsBento } from "./SkillsBento";
import { LinkedInButton, SiteShell, Slot, TopNav, type NavFrame, type NavKey, type Navigate } from "./Shell";
import { DECK_BOOT, sceneOf, useDeck, type Stop } from "./useDeck";
import s from "./site.module.css";

const CV_FILE = {
  en: { href: "/documents/rayann-sagnon-cv-en.pdf", name: "Rayann_Sagnon_Resume.pdf" },
  fr: { href: "/documents/rayann-sagnon-cv-fr.pdf", name: "Rayann_Sagnon_CV.pdf" },
} as const;
const PORTRAIT = "/images/site/portrait.jpg";
const STANDOUT_POSTER = "/images/site/standout-poster.jpg";

const CARD_STOP: Record<string, Stop> = { tachometer: "tachometer", standout: "standout", rcx: "kits", arm: "kits" };

const NAV_TARGET = { work: "tachometer", about: "route", contact: "contact" } as const;

const navOf = (stop: Stop): NavKey => {
  if (stop === "home") return null;
  if (stop === "contact") return "contact";
  if (stop === "interlude" || sceneOf(stop) === "route") return "about";
  return "work";
};

/** Which column the navigation sits in, as drawn in Figma. */
const frameOf = (stop: Stop): NavFrame => {
  if (stop === "home" || stop === "tachometer" || stop === "interlude" || stop === "route") return "full";
  return sceneOf(stop) === "route" ? "about" : "left";
};

/** Design B frames the standing portrait on a computer; a phone gets the closer crop from design C. */
function HomePortrait({ alt }: { alt: string }) {
  const common = { alt, fill: true, quality: 92, priority: true } as const;
  const {
    props: { srcSet: desktop, sizes: desktopSizes },
  } = getImageProps({ ...common, src: "/images/about/rayann-portrait-standing.jpg", sizes: "min(38vw, 60vh)" });
  const {
    props: { srcSet: phone, sizes: phoneSizes, ...rest },
  } = getImageProps({ ...common, src: PORTRAIT, sizes: "100vw" });
  return (
    <picture>
      <source media="(min-width: 821px)" srcSet={desktop} sizes={desktopSizes} />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...rest} srcSet={phone} sizes={phoneSizes} />
    </picture>
  );
}

function Scene({ id, z, current, className, children }: { id: string; z: number; current: Stop; className?: string; children: ReactNode }) {
  return (
    <section id={id} data-scene={id} data-active={sceneOf(current) === id ? "" : undefined} style={{ zIndex: z }} className={className ? `${s.scene} ${className}` : s.scene}>
      {children}
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

/** One span per letter. They stay inline, so the words wrap and kern exactly as plain text does. */
function letters(text: string, first = 0) {
  return Array.from(text).map((ch, i) =>
    ch === " " || ch.charCodeAt(0) === 10 ? (
      ch
    ) : (
      <span key={i} data-l style={{ "--n": first + i } as React.CSSProperties}>
        {ch}
      </span>
    ),
  );
}

const PHONE_ORDER = ["support", "facilities", "training", "hackathon"];

export function OnePage({ start = "home", hasCv }: { start?: Stop; hasCv: boolean }) {
  const { site } = useContent();
  const { locale, ui } = useLocale();
  const copy = ui.siteCopy;
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState<Stop>(start);
  const [bandLive, setBandLive] = useState(false);
  const [chapter, setChapter] = useState(0);

  const goRef = useDeck(rootRef, start, setCurrent, locale, setBandLive);
  const go = useCallback((stop: Stop) => goRef.current(stop), [goRef]);
  const onNavigate = useCallback<Navigate>((key) => go(NAV_TARGET[key]), [go]);
  const onHome = useCallback(() => go("home"), [go]);

  // The studio's site only plays while its scene is on screen.
  const showingStandout = current === "standout";
  useEffect(() => {
    const v = videoRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (showingStandout) v.play().catch(() => {});
    else v.pause();
  }, [showingStandout]);

  const h = copy.home;
  const t = copy.tachometer;
  const so = copy.standout;
  const k = copy.kits;
  const a = copy.about;
  const c = copy.contact;

  const phoneExperience = PHONE_ORDER.map((id) => a.experience.find((e) => e.id === id)!);
  // On a phone the page opens at the section this URL names.
  const startScript =
    start !== "home"
      ? `(function(){if(document.documentElement.dataset.deck)return;var e=document.getElementById(${JSON.stringify(sceneOf(start))});if(e)window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY,behavior:"instant"})})()`
      : null;

  const nextLink = (stop: Stop, href: string, label: string) => (
    <a
      className={s.textLink}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        go(stop);
      }}
    >
      {label}
    </a>
  );

  return (
    <SiteShell active={navOf(current)} onNavigate={onNavigate}>
      <script dangerouslySetInnerHTML={{ __html: DECK_BOOT }} />
      <TopNav active={navOf(current)} frame={frameOf(current)} onNavigate={onNavigate} onHome={onHome} />
      <main ref={rootRef} className={s.page}>
        <Scene id="home" z={2} current={current} className={s.home}>
          <div className={s.homeBg} data-home-bg aria-hidden="true">
            <HomeBackground paused={current !== "home"} />
          </div>
          <h1 className={s.homeName} aria-label="Rayann Sagnon">
            <span data-name-a>{letters("Rayann")}</span>
            <span data-name-b>{letters("Sagnon", 6)}</span>
          </h1>
          <div className={s.homePhoto} data-home-stage>
            <div className={s.homePhotoOpen}>
              <HomePortrait alt={h.portraitAlt} />
            </div>
          </div>
          <p className={`${s.homeRoleLong} ${s.onlyPhone}`}>{h.phoneRole}</p>
          <p className={`${s.homeRole} ${s.onlyDesktop}`} data-home-foot>
            <span>{h.role[0]}</span>
            <span>{h.role[1]}</span>
          </p>
          <a className={s.homeLink} data-home-foot href={site.linkedin} target="_blank" rel="noopener noreferrer">
            {copy.linkedin}
          </a>

          <div className={s.work} aria-label={h.workLabel}>
            <h2 className={s.workHeading}>{h.workHeading}</h2>
            <ul className={s.cards}>
              {h.projects.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href}
                    className={s.card}
                    onClick={(e) => {
                      e.preventDefault();
                      go(CARD_STOP[p.id]);
                    }}
                  >
                    {p.id === "standout" ? (
                      <Image quality={92} src="/images/site/standout-mobile.jpg" alt="" fill sizes="82vw" />
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
        </Scene>

        <Scene id="tachometer" z={1} current={current} className={s.tach}>
          <div className={s.tachGrid} data-scroller>
            <div className={s.tachHead}>
              <h2 className={s.giant} data-rise data-title aria-label={t.title}>
                {letters(t.title)}
              </h2>
              <p className={`${s.status} ${s.onlyPhone}`}>{t.status}</p>
              <p className={s.tachIntro} data-rise>
                {t.description}
              </p>
            </div>
            <div className={s.tachBody}>
              <div className={s.tachLeft}>
                <div className={s.tachPhoto} data-rise>
                  <Slot label={t.photoSlot} className={s.fill} />
                </div>
                <div className={s.tachStory} data-rise>
                  <h3>{t.storyTitle}</h3>
                  <p>{t.story}</p>
                </div>
                {nextLink("standout", "/projects/standout", t.next)}
              </div>
              <div className={s.tachRight}>
                <div className={s.tachSlot} data-rise data-morph-slot>
                  <Slot label={t.schematicSlot} className={s.fill} />
                </div>
                <div className={s.panels}>
                  <div className={s.panel} data-rise>
                    <h3>{t.expectedTitle}</h3>
                    <dl className={s.expected}>
                      {t.expected.map(([x, y]) => (
                        <div key={x}>
                          <dt>{x}</dt>
                          <dd>{y}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className={s.panel} data-rise>
                    <h3>{t.whereTitle}</h3>
                    <p>{t.where}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scene>

        <Scene id="standout" z={3} current={current} className={s.standout}>
          <div className={s.wrap} data-wrap>
            <div className={s.wrapInner} data-wrap-inner>
              <div className={s.col} data-so-col data-scroller>
                <h2 className={s.display} data-rise data-title aria-label={so.title}>
                  {letters(so.title)}
                </h2>
                <p className={s.role} data-rise>
                  {so.description}
                </p>
                <ul className={s.plainIndex} data-rise>
                  {so.steps.map(([x, y]) => (
                    <li key={x}>
                      <b>{x}</b>
                      <span>{y}</span>
                    </li>
                  ))}
                </ul>
                <div className={s.colFoot} data-rise>
                  <a className={s.textLink} href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer">
                    {so.visit}
                  </a>
                  {nextLink("kits", "/projects/kits", so.next)}
                </div>
              </div>
              <div className={s.soVideo} data-video-frame>
                <video ref={videoRef} muted loop playsInline preload="metadata" poster={STANDOUT_POSTER} aria-label={so.imageAlt}>
                  <source src="/video/standout.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </Scene>

        <Scene id="kits" z={4} current={current} className={s.kits}>
          <div className={s.col} data-scroller>
            <h2 className={s.display} data-rise data-title aria-label={k.title}>
              {letters(k.title)}
            </h2>
            <p className={s.role} data-rise>
              {k.intro}
            </p>
            <ul className={s.kitList}>
              {k.items.map((item) => (
                <li key={item.name} data-rise>
                  <b>{item.name}</b>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
            <div className={s.colFoot} data-rise>
              {nextLink("route", "/about", k.next)}
            </div>
          </div>
          <div className={s.kitRows}>
            {k.items.map((item) => (
              <div key={item.name} className={s.kitRow} data-kit>
                <Slot label={item.slot} className={s.fill} />
              </div>
            ))}
          </div>
        </Scene>

        <Scene id="interlude" z={5} current={current} className={s.interlude}>
          <div className={s.interBg} aria-hidden="true">
            <InterludeBackground live={bandLive} />
          </div>
          <p className={s.interWord} data-word aria-hidden="true">
            {copy.interlude}
          </p>
        </Scene>

        <Scene id="route" z={6} current={current} className={s.about}>
          <div className={`${s.aboutPanel} ${s.routePanel}`} data-panel="route">
            <h2 className={s.routeTitle} data-rise data-title aria-label={a.routeTitle}>
              {letters(a.routeTitle)}
            </h2>
            <div className={`${s.routeCarousel} ${s.onlyDesktop}`} data-rise>
              <RouteCarousel chapters={a.route} live={current === "route"} onChapter={setChapter} />
            </div>
            <div className={s.moments}>
              {a.route.map((r, i) => (
                <article key={r.title} className={s.moment} data-rise data-dim={i === chapter ? undefined : ""}>
                  <div className={s.momentPhoto}>
                    <Image quality={92} src={r.image} alt={r.alt} fill sizes="81vw" />
                  </div>
                  <p className={s.momentPlace}>{r.place}</p>
                  <h3>{r.title}</h3>
                  <p className={s.momentText}>{r.body}</p>
                </article>
              ))}
            </div>
            <p className={s.siri} data-rise>
              {a.siri}
            </p>
          </div>
          <div className={s.aboutPortrait}>
            <div className={s.aboutPhoto} data-route-photo>
              <Image quality={92} src="/images/site/sofa.jpg" alt={a.portraitAlt} fill sizes="max(34vw, 54vh)" />
            </div>
          </div>
          <div className={s.aboutCol}>
            <div className={s.aboutPanel} data-panel="experience">
              <h2 className={s.panelTitle} data-rise data-title aria-label={a.experienceTitle}>
                {letters(a.experienceTitle)}
              </h2>
              <div className={`${s.jobs} ${s.onlyDesktop}`}>
                <div className={s.jobRail} data-rise aria-hidden="true">
                  <div className={s.jobBar} data-job-bar />
                </div>
                <ul className={s.experience}>
                  {a.experience.map((e) => (
                    <li key={e.id} data-rise>
                      <div data-job>
                        <h3>{e.title}</h3>
                        <span>{e.meta}</span>
                        {e.body && <p>{e.body}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Accordion items={phoneExperience} />
            </div>

            <div className={`${s.aboutPanel} ${s.skillsPanel}`} data-panel="skills">
              <h2 className={s.panelTitle} data-rise data-title aria-label={a.skillsTitle}>
                {letters(a.skillsTitle)}
              </h2>
              <div className={`${s.bento} ${s.onlyDesktop}`}>
                <SkillsBento skills={a.skills as unknown as [string, string][]} course={a.course as unknown as [string, string]} />
              </div>
              <div className={s.onlyPhone}>
                <ul className={s.skills}>
                  {a.skills.map(([x, y]) => (
                    <li key={x} data-rise>
                      <b>{x}</b>
                      <span>{y}</span>
                    </li>
                  ))}
                  <li className={s.course} data-rise>
                    <b>{a.course[0]}</b>
                    <span>{a.course[1]}</span>
                  </li>
                </ul>
              </div>
              {hasCv && (
                <a data-rise className={`${s.textLink} ${s.cvLink}`} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
                  {a.cv}
                </a>
              )}
            </div>
          </div>
        </Scene>

        <Scene id="contact" z={7} current={current} className={s.contact}>
          <div className={s.contactText} data-scroller>
            <h2 className={s.contactTitle} data-rise data-title aria-label={c.title}>
              {letters(c.title)}
            </h2>
            <div className={`${s.contactPhone} ${s.onlyPhone}`}>
              <Image quality={92} src="/images/site/sofa-wide.jpg" alt={a.portraitAlt} fill sizes="100vw" />
            </div>
            <div className={s.contactCta} data-rise>
              <LinkedInButton className={s.contactButton} />
            </div>
            <p data-rise className={s.availability}>
              {c.availability}
            </p>
            <a data-rise className={s.secondary} href={`mailto:${site.email}`}>
              {copy.email}
            </a>
            <footer data-rise className={s.foot}>
              <span>Rayann Sagnon</span>
              <span>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </span>
            </footer>
          </div>
          <div className={s.contactPhoto} data-contact-photo>
            <div className={s.contactImage} data-contact-image>
              <Image quality={92} src={PORTRAIT} alt={c.portraitAlt} fill sizes="max(58vw, 94vh)" />
            </div>
          </div>
        </Scene>

        <div className={s.veil} data-veil aria-hidden="true" />
        <div className={s.spacer} data-spacer aria-hidden="true" />
      </main>
      {startScript && <script dangerouslySetInnerHTML={{ __html: startScript }} />}
    </SiteShell>
  );
}
