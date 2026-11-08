"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { Bench } from "./Bench";
import { LinkedInButton, SiteShell, Slot, TopNav, type NavKey, type Navigate } from "./Shell";
import { DECK_BOOT, sceneOf, useDeck, type Stop } from "./useDeck";
import s from "./site.module.css";

const CV_PATH = "/documents/rayann-sagnon-cv.pdf";
const PORTRAIT = "/images/site/portrait.jpg";
const STANDOUT_POSTER = "/images/site/standout-poster.jpg";

type HoverKey = "schematic" | "standout" | "rcx" | "arm";

const ROW_TARGET: Record<string, { stop: Stop; stage: HoverKey }> = {
  tachometer: { stop: "tachometer", stage: "schematic" },
  standout: { stop: "standout", stage: "standout" },
  rcx: { stop: "kits", stage: "rcx" },
  arm: { stop: "kits", stage: "arm" },
};

const NAV_TARGET = { work: "tachometer", about: "route", contact: "contact" } as const;

const navOf = (stop: Stop): NavKey => {
  if (stop === "home") return null;
  if (stop === "contact") return "contact";
  if (stop === "route" || stop === "route1" || stop === "route2" || stop === "work") return "about";
  return "work";
};

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

const PHONE_ORDER = ["support", "facilities", "training", "hackathon"];

export function OnePage({ start = "home", hasCv }: { start?: Stop; hasCv: boolean }) {
  const { site } = useContent();
  const copy = useLocale().ui.siteCopy;
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState<Stop>(start);
  const [hover, setHover] = useState<HoverKey | null>(null);

  const goRef = useDeck(rootRef, start, setCurrent);
  const go = useCallback((stop: Stop) => goRef.current(stop), [goRef]);
  const onNavigate = useCallback<Navigate>((key) => go(NAV_TARGET[key]), [go]);
  const onHome = useCallback(() => go("home"), [go]);

  // The studio's site only plays while its scene is on screen.
  const showingStandout = sceneOf(current) === "standout";
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

  const stage: HoverKey | "portrait" = (current === "home" ? hover : null) ?? "portrait";
  const phoneExperience = PHONE_ORDER.map((id) => a.experience.find((e) => e.id === id)!);
  // On a phone the page opens at the section this URL names.
  const startScript =
    start !== "home"
      ? `(function(){if(document.documentElement.dataset.deck)return;var e=document.getElementById(${JSON.stringify(sceneOf(start))});if(e)window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY,behavior:"instant"})})()`
      : null;

  const layer = (key: HoverKey | "portrait", content: ReactNode) => (
    <div className={s.layer} data-key={key} data-on={stage === key ? "" : undefined}>
      {content}
    </div>
  );

  return (
    <SiteShell active={navOf(current)} tone={sceneOf(current) === "standout" ? "light" : "dark"} onNavigate={onNavigate}>
      <script dangerouslySetInnerHTML={{ __html: DECK_BOOT }} />
      <TopNav active={navOf(current)} onNavigate={onNavigate} onHome={onHome} />
      <main ref={rootRef} className={s.page}>
        <Scene id="home" z={1} current={current} className={s.home}>
          <div className={s.stage} data-home-stage>
            {layer("portrait", <Image src={PORTRAIT} alt={h.portraitAlt} fill priority sizes="(max-width: 820px) 100vw, 58vw" />)}
            {layer("schematic", <Slot label={h.projects[0].placeholder} className={s.fill} />)}
            {layer("standout", <Image src={STANDOUT_POSTER} alt="" fill sizes="58vw" />)}
            {layer("rcx", <Slot label={h.projects[2].placeholder} className={s.fill} />)}
            {layer("arm", <Slot label={h.projects[3].placeholder} className={s.fill} />)}
          </div>

          <div className={s.homeCol} data-scroller>
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
                      onBlur={() => setHover(null)}
                      onClick={(e) => {
                        e.preventDefault();
                        setHover(null);
                        go(ROW_TARGET[p.id].stop);
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
                        go(ROW_TARGET[p.id].stop);
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
          </div>
        </Scene>

        <Scene id="tachometer" z={3} current={current} className={s.tach}>
          <div className={s.wrap} data-wrap>
            <div className={s.wrapInner} data-wrap-inner data-scroller>
              <div className={s.fullImage}>
                <Image src="/images/about-teaser/makerspace-lab.jpeg" alt={t.photoAlt} fill sizes="100vw" />
              </div>
              <div className={s.tachText}>
                <h2 className={s.giant} data-rise>
                  {t.title}
                </h2>
                <div className={s.tachCols}>
                  <div data-rise>
                    <p className={s.status}>{t.status}</p>
                    <p>{t.description}</p>
                  </div>
                  <div data-rise>
                    <h3>{t.storyTitle}</h3>
                    <p>{t.story}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scene>

        <Scene id="bench" z={2} current={current} className={s.benchScene}>
          <Bench active={sceneOf(current) === "bench"} />
        </Scene>

        <Scene id="standout" z={4} current={current} className={s.standout}>
          <div className={s.wrap} data-wrap>
            <div className={s.wrapInner} data-wrap-inner data-scroller>
              <h2 className={s.giant} data-rise>
                {so.title}
              </h2>
              <div className={s.soBody}>
                <div className={s.soText}>
                  <p data-rise className={s.lead}>
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
                  <a data-rise className={s.textLink} href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer">
                    {so.visit}
                  </a>
                </div>
                <div className={s.soVideo} data-video-frame>
                  <video ref={videoRef} muted loop playsInline preload="metadata" poster={STANDOUT_POSTER} aria-label={so.imageAlt}>
                    <source src="/video/standout.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </Scene>

        <Scene id="kits" z={5} current={current} className={s.kits}>
          <div className={s.kitHead}>
            <h2 className={s.secTitle} data-rise>
              {k.title}
            </h2>
            <p data-rise>{k.intro}</p>
          </div>
          <div className={s.kitCols}>
            {k.items.map((item) => (
              <div key={item.name} className={s.kitCol} data-kit>
                <Slot label={item.slot} className={s.fill} />
                <div className={s.kitCaption}>
                  <b>{item.name}</b>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </Scene>

        <Scene id="route" z={6} current={current} className={s.routeScene}>
          <div className={s.track} data-track>
            {a.route.map((r, i) => (
              <article key={r.title} className={s.slide} data-slide>
                <div className={s.slidePhoto}>
                  <Image src={r.image} alt={r.alt} fill sizes="(max-width: 820px) 86vw, 54vw" />
                </div>
                <div className={s.slideText}>
                  {i === 0 && (
                    <h2 className={s.routeTitle} data-rise>
                      {a.routeTitle}
                    </h2>
                  )}
                  <p className={s.place} data-place>
                    {r.place.split(",")[0]}
                  </p>
                  <h3 data-rise>{r.title}</h3>
                  <p data-rise>{r.body}</p>
                  {i === 0 && (
                    <p className={s.siri} data-rise>
                      {a.siri}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Scene>

        <Scene id="work" z={7} current={current} className={s.workScene}>
          <div className={s.workGrid} data-scroller>
            <div>
              <h2 className={s.workLabel} data-rise>
                {a.experienceTitle}
              </h2>
              <ul className={`${s.experience} ${s.onlyDesktop}`}>
                {a.experience.map((e) => (
                  <li key={e.id} data-rise>
                    <h3>{e.title}</h3>
                    <span>{e.meta}</span>
                    {e.body && <p>{e.body}</p>}
                  </li>
                ))}
              </ul>
              <Accordion items={phoneExperience} />
            </div>
            <div>
              <h2 className={s.workLabel} data-rise>
                {a.skillsTitle}
              </h2>
              <ul className={s.skills}>
                {a.skills.map(([x, y]) => (
                  <li key={x} data-rise>
                    <b>{x}</b>
                    <span>{y}</span>
                  </li>
                ))}
              </ul>
              <p className={s.course} data-rise>
                <b>{a.course[0]}</b>
                <span>{a.course[1]}</span>
              </p>
              {hasCv && (
                <a data-rise className={s.textLink} href={CV_PATH} download>
                  {a.cv}
                </a>
              )}
            </div>
          </div>
        </Scene>

        <Scene id="contact" z={8} current={current} className={s.contact}>
          <div className={s.contactText} data-scroller>
            <h2 className={s.secTitle} data-rise>
              {c.title}
            </h2>
            <div data-rise>
              <LinkedInButton />
            </div>
            <a data-rise className={s.secondary} href={`mailto:${site.email}`}>
              {copy.email}
            </a>
            <p data-rise className={s.status}>
              {c.availability}
            </p>
            <footer data-rise className={s.foot}>
              <span>Rayann Sagnon</span>
              <span>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </span>
            </footer>
          </div>
          <div className={s.contactPhoto} data-contact-photo>
            <Image src={PORTRAIT} alt={c.portraitAlt} fill sizes="(max-width: 820px) 100vw, 58vw" />
          </div>
        </Scene>

        <div className={s.veil} data-veil aria-hidden="true" />
      </main>
      {startScript && <script dangerouslySetInnerHTML={{ __html: startScript }} />}
    </SiteShell>
  );
}
