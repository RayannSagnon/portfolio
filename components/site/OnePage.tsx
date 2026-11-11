"use client";

import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { ContactBackground } from "./ContactBackground";
import { HomeBackground } from "./HomeBackground";
import { SiteShell, TopNav, type NavFrame, type NavKey, type Navigate } from "./Shell";
import { DECK_BOOT, sceneOf, useDeck, type Stop } from "./useDeck";
import s from "./site.module.css";

const CV_FILE = {
  en: { href: "/documents/rayann-sagnon-cv-en.pdf", name: "Rayann_Sagnon_Resume.pdf" },
  fr: { href: "/documents/rayann-sagnon-cv-fr.pdf", name: "Rayann_Sagnon_CV.pdf" },
} as const;
const PORTRAIT = "/images/site/portrait.jpg";
const STANDOUT_POSTER = "/images/site/standout-poster.jpg";
const BOARD = "/images/site/tachometer-board-3d.jpg";
const CARD_IMAGE: Record<string, string> = { standout: "/images/site/standout-mobile.jpg", tachometer: BOARD, goforit: "/images/site/goforit-training.webp" };

// Projects that are screens of this page; the others have their own page.
const DECK_STOP: Record<string, Stop> = { tachometer: "tachometer", standout: "standout", goforit: "goforit" };

const navOf = (stop: Stop): NavKey => {
  if (stop === "home") return null;
  if (stop === "contact") return "contact";
  return "work";
};

/** Which column the navigation sits in, as drawn in Figma. */
const frameOf = (stop: Stop): NavFrame => (stop === "standout" || stop === "goforit" ? "left" : "full");

/** On a computer the standing portrait fills the right of the screen; a phone gets the closer crop from design C. */
function HomePortrait({ alt }: { alt: string }) {
  const common = { alt, fill: true, quality: 92, priority: true } as const;
  const {
    props: { srcSet: desktop, sizes: desktopSizes },
  } = getImageProps({ ...common, src: "/images/about/rayann-portrait-standing.jpg", sizes: "max(52vw, 75vh)" });
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


export function OnePage({ start = "home", hasCv }: { start?: Stop; hasCv: boolean }) {
  const { site } = useContent();
  const { locale, ui } = useLocale();
  const copy = ui.siteCopy;
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState<Stop>(start);

  const goRef = useDeck(rootRef, start, setCurrent, locale);
  const go = useCallback((stop: Stop) => goRef.current(stop), [goRef]);
  // Contact is a screen of this page; Work and About are their own pages.
  const onNavigate = useCallback<Navigate>(
    (key) => {
      if (key !== "contact") return false;
      go("contact");
      return true;
    },
    [go],
  );
  const onHome = useCallback(() => go("home"), [go]);

  // The studio's site stays a still capture; its recording plays only while the pointer is on it, or after a click.
  const [soPlaying, setSoPlaying] = useState(false);
  const playSo = useCallback((on: boolean) => {
    const v = videoRef.current;
    if (!v) return;
    if (on) v.play().then(() => setSoPlaying(true)).catch(() => {});
    else {
      v.pause();
      setSoPlaying(false);
    }
  }, []);
  const showingStandout = current === "standout";
  useEffect(() => {
    if (!showingStandout) playSo(false);
  }, [showingStandout, playSo]);

  const h = copy.home;
  const t = copy.tachometer;
  const so = copy.standout;
  const m = copy.more;
  const g = copy.goforit;
  const a = copy.about;
  const c = copy.contact;

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
      <TopNav active={navOf(current)} frame={frameOf(current)} light={current === "goforit"} onNavigate={onNavigate} onHome={onHome} />
      <main ref={rootRef} className={s.page}>
        <Scene id="home" z={2} current={current} className={s.home}>
          <div className={s.homeBg} data-home-bg aria-hidden="true">
            <HomeBackground paused={current !== "home"} />
          </div>
          <h1 className={s.homeName} data-home-name aria-label="Rayann Sagnon">
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
                      if (!DECK_STOP[p.id]) return;
                      e.preventDefault();
                      go(DECK_STOP[p.id]);
                    }}
                  >
                    {CARD_IMAGE[p.id] ? (
                      <Image quality={92} src={CARD_IMAGE[p.id]} alt="" fill sizes="82vw" className={p.id === "tachometer" ? s.cardBoard : undefined} />
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
            <header className={s.caseHead}>
              <h2 className={s.giant} data-rise data-title aria-label={t.title}>
                {letters(t.title)}
              </h2>
              <dl className={s.specs} data-rise>
                {t.specs.map(([x, y]) => (
                  <div key={x}>
                    <dt>{x}</dt>
                    <dd>{y}</dd>
                  </div>
                ))}
              </dl>
            </header>

            <div className={s.caseHero}>
              <div className={s.caseIntro} data-rise>
                <h3>{t.overviewTitle}</h3>
                <p>{t.description}</p>
                <h3>{t.showsTitle}</h3>
                <ul>
                  {t.shows.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={s.tachPhoto} data-rise data-board-slot>
                <a className={s.schematic} href={t.board.src} target="_blank" rel="noopener noreferrer" aria-label={t.board.open}>
                  <Image quality={92} src={t.board.src} alt={t.board.alt} fill sizes="(max-width: 820px) 100vw, 60vw" />
                  <span>{t.board.caption}</span>
                </a>
              </div>
            </div>

            <section className={s.caseFunctions}>
              <h3 className={s.caseTitle} data-rise>
                {t.functionsTitle}
              </h3>
              <div className={s.featureGrid}>
                {t.schematics.map((sheet) => (
                  <article key={sheet.src} className={s.feature} data-rise>
                    <a className={s.schematic} href={sheet.src} target="_blank" rel="noopener noreferrer" aria-label={sheet.open}>
                      <Image quality={92} src={sheet.src} alt={sheet.alt} fill sizes="(max-width: 820px) 100vw, 30vw" />
                    </a>
                    <h4>{sheet.caption}</h4>
                    <p>{sheet.body}</p>
                    <p className={s.featureKey}>{sheet.key}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className={s.tachBody}>
              <div className={s.tachLeft}>
                <div className={s.tachStory} data-rise>
                  <h3>{t.processTitle}</h3>
                  <ol className={s.process}>
                    {t.process.map(([x, y]) => (
                      <li key={x}>
                        <b>{x}</b>
                        <span>{y}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className={s.tachStory} data-rise>
                  <h3>{t.storyTitle}</h3>
                  <p>{t.story}</p>
                </div>
                <div className={s.tachStory} data-rise>
                  <h3>{t.fixTitle}</h3>
                  <p>{t.fix}</p>
                </div>
                {nextLink("standout", "/projects/standout", t.next)}
              </div>
              <div className={s.tachRight}>
                <div className={s.tachSlot} data-rise data-morph-slot>
                  <a className={s.schematic} href={t.layout.src} target="_blank" rel="noopener noreferrer" aria-label={t.layout.open}>
                    <Image quality={92} src={t.layout.src} alt={t.layout.alt} fill sizes="(max-width: 820px) 100vw, 60vw" />
                    <span>{t.layout.caption}</span>
                  </a>
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
                  {nextLink("goforit", "/projects/goforit", so.next)}
                </div>
              </div>
              <div className={s.soStage} data-video-frame>
                <div className={s.soBrowser} data-rise onMouseEnter={() => playSo(true)} onMouseLeave={() => playSo(false)}>
                  <div className={s.soChrome} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className={s.soScreen}>
                    <video ref={videoRef} muted loop playsInline preload="none" poster={STANDOUT_POSTER} aria-label={so.imageAlt}>
                      <source src="/video/standout.mp4" type="video/mp4" />
                    </video>
                    <button
                      type="button"
                      className={s.soPlay}
                      data-playing={soPlaying || undefined}
                      aria-pressed={soPlaying}
                      aria-label={so.play}
                      onClick={() => playSo(!soPlaying)}
                    >
                      <span>
                        <Play aria-hidden="true" strokeWidth={1.5} />
                        {so.hoverHint}
                      </span>
                    </button>
                  </div>
                </div>
                <div className={s.soPhone} data-rise aria-hidden="true">
                  <Image quality={90} src="/images/site/standout-mobile.jpg" alt="" fill sizes="200px" loading="eager" />
                </div>
                <p className={s.soCaption} data-rise>
                  {so.captureNote}
                </p>
              </div>
            </div>
          </div>
        </Scene>

        <Scene id="goforit" z={4} current={current} className={s.gfi}>
          <div className={s.gfiText} data-scroller>
            <h2 className={s.gfiTitle} data-rise data-title>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/site/goforit-wordmark.svg" alt={g.title} width={562} height={165} />
            </h2>
            <p className={s.gfiRole} data-rise>
              {g.description}
            </p>
            <p className={s.gfiOwn} data-rise>
              {g.own}
            </p>
            <ul className={s.gfiPoints}>
              {g.points.map(([x, y]) => (
                <li key={x} data-rise>
                  <b>{x}</b>
                  <span>{y}</span>
                </li>
              ))}
            </ul>
            <p className={s.gfiStatus} data-rise>
              <i aria-hidden="true" />
              <span>
                {g.status}{" "}
                <a href="https://goforit.fit" target="_blank" rel="noopener noreferrer">
                  goforit.fit
                </a>
              </span>
            </p>
            <div className={s.gfiNext} data-rise>
              {nextLink("more", "/work", g.next)}
            </div>
          </div>
          <div className={s.gfiPhones}>
            {g.screens.map((shot) => (
              <figure key={shot.src} className={s.gfiPhone} data-rise>
                <div className={s.gfiScreen}>
                  <Image quality={92} src={shot.src} alt={shot.alt} fill sizes="(max-width: 820px) 70vw, 22vw" />
                </div>
              </figure>
            ))}
          </div>
          <p className={s.gfiCaption} data-rise>
            {g.caption}
          </p>
        </Scene>

        <Scene id="more" z={5} current={current} className={s.more}>
          <div className={s.moreInner} data-scroller>
            <h2 className={s.display} data-rise data-title aria-label={m.title}>
              {letters(m.title)}
            </h2>
            <p className={s.moreIntro} data-rise>
              {m.intro}
            </p>
            <ul className={s.moreList} aria-label={m.projectsLabel}>
              {copy.projectList.map((p) => (
                <li key={p.id} data-rise>
                  {p.href ? (
                    <a
                      href={p.href}
                      onClick={(e) => {
                        if (!DECK_STOP[p.id]) return;
                        e.preventDefault();
                        go(DECK_STOP[p.id]);
                      }}
                    >
                      <b>{p.name}</b>
                      <span>{p.type}</span>
                      <span>{p.status}</span>
                      <ArrowRight aria-hidden="true" strokeWidth={1.25} />
                    </a>
                  ) : (
                    <div>
                      <b>{p.name}</b>
                      <span>{p.type}</span>
                      <span>{p.status}</span>
                      <i aria-hidden="true" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <a className={s.moreOpen} href="/work" data-rise>
              {m.open}
              <ArrowRight aria-hidden="true" strokeWidth={1.25} />
            </a>
          </div>
        </Scene>

        <Scene id="contact" z={7} current={current} className={s.contact}>
          <div className={s.contactBg} data-contact-bg aria-hidden="true">
            <ContactBackground near={current === "more" || current === "contact"} />
          </div>
          <div className={s.contactText} data-scroller>
            <h2 className={s.contactTitle} data-rise data-title aria-label={c.title}>
              {letters(c.title)}
            </h2>
            <div className={`${s.contactPhone} ${s.onlyPhone}`}>
              <Image quality={92} src="/images/site/sofa-wide.jpg" alt={a.portraitAlt} fill sizes="100vw" />
            </div>
            <div className={s.contactRows}>
              <a data-rise data-primary className={s.contactRow} href={site.linkedin} target="_blank" rel="noopener noreferrer">
                <span>{copy.linkedin}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1} />
              </a>
              <a data-rise className={s.contactRow} href={`mailto:${site.email}`}>
                <span>{copy.email}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1} />
              </a>
              {hasCv && (
                <a data-rise className={s.contactRow} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
                  <span>{a.cv}</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1} />
                </a>
              )}
            </div>
            <footer data-rise className={s.foot}>
              <span>{c.availability}</span>
              <span>
                <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </span>
            </footer>
          </div>
          <div className={s.contactPhoto} data-contact-photo>
            <div className={s.contactImage}>
              <Image quality={92} src={PORTRAIT} alt={c.portraitAlt} fill sizes="max(34vw, 54vh)" />
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
