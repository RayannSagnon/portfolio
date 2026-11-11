"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { BoardViewer } from "./BoardViewer";
import { CV_FILE } from "./ContactSection";
import { PageFrame } from "./PageFrame";
import s from "./story.module.css";

export type StorySlug = "tachometer" | "goforit" | "standout";

const NEXT: Record<StorySlug, { href: string; id: string }> = {
  tachometer: { href: "/projects/goforit", id: "goforit" },
  goforit: { href: "/projects/standout", id: "standout" },
  standout: { href: "/projects/kits", id: "kits" },
};

const TIMELINE_IMAGES = [
  "/images/site/tachometer-schematic.png",
  "",
  "/images/site/turn-signals-schematic.png",
  "/images/site/usb-c-schematic.png",
  "/images/site/dashboard-pcb-layout.png",
  "/images/site/tachometer-board-3d.jpg",
];

// Timeline steps whose picture is also one of the four sheets below; phones show it only once.
const SHEET_REPEATS = [0, 2, 3];

/** One template for every project: who, what, the story in chapters, then the next project and the contact. */
export function ProjectStory({ slug }: { slug: StorySlug }) {
  const { site } = useContent();
  const { locale, ui } = useLocale();
  const copy = ui.siteCopy;
  const pages = ui.pages;
  const st = pages.story;
  const title = copy[slug].title;
  const meta = pages.stories[slug].meta;
  const next = copy.projectList.find((p) => p.id === NEXT[slug].id)!;

  return (
    <PageFrame active="work">
      <article className={s.story}>
        <header className={s.head}>
          <p className={s.crumb}>
            <Link href="/#work">{pages.nav.work}</Link>
            <span aria-hidden="true">/</span>
            <span>{title}</span>
          </p>
          <h1 className={s.title}>{slug === "goforit" ? <GoForItMark alt={title} /> : title}</h1>
          <dl className={s.meta}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {slug === "tachometer" && <Tachometer />}
        {slug === "goforit" && <GoForIt />}
        {slug === "standout" && <Standout />}

        <nav className={s.next} aria-label={st.nextLabel}>
          <span>{st.nextLabel}</span>
          <Link href={NEXT[slug].href}>
            {next.name}
            <ArrowRight aria-hidden="true" strokeWidth={1} />
          </Link>
        </nav>
        <section className={s.hire} aria-label={st.hiring}>
          <h2>{st.hiring}</h2>
          <div>
            <a className={s.pill} data-primary href={site.linkedin} target="_blank" rel="noopener noreferrer">
              {copy.linkedin}
              <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
            </a>
            <a className={s.pill} href={`mailto:${site.email}`}>
              {copy.email}
            </a>
            <a className={s.pill} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
              {copy.about.cv}
            </a>
          </div>
        </section>
      </article>
    </PageFrame>
  );
}

function GoForItMark({ alt }: { alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={s.wordmark} src="/images/site/goforit-wordmark-on-dark.svg" alt={alt} width={562} height={165} />;
}

function Chapter({ title, children, id }: { title: string; children: ReactNode; id: string }) {
  return (
    <section className={s.chapter} aria-labelledby={id}>
      <h2 id={id} className={s.chapterTitle} data-show>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tachometer() {
  const { ui } = useLocale();
  const t = ui.siteCopy.tachometer;
  const story = ui.pages.stories.tachometer;
  const st = ui.pages.story;
  const [after, setAfter] = useState(false);

  return (
    <>
      <div className={s.heroModel}>
        <BoardViewer alt={t.board.alt} className={s.heroModelCanvas} />
        <span className={s.hint}>{st.drag}</span>
      </div>

      <Chapter title={story.introTitle} id="start">
        <p className={s.lead} data-show>
          {story.intro}
        </p>
      </Chapter>

      <Chapter title={story.timelineTitle} id="timeline">
        <ol className={s.timeline}>
          {story.steps.map((step, i) => (
            <li key={step.title} data-show data-last={i === story.steps.length - 1 || undefined}>
              <span className={s.stepNo}>{String(i + 1).padStart(2, "0")}</span>
              <div className={s.stepText}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              {TIMELINE_IMAGES[i] && (
                <a
                  className={s.stepImage}
                  data-repeat={SHEET_REPEATS.includes(i) || undefined}
                  href={TIMELINE_IMAGES[i]} target="_blank" rel="noopener noreferrer" aria-label={`${step.title}, ${st.openFull}`}>
                  <Image src={TIMELINE_IMAGES[i]} alt="" fill sizes="(max-width: 820px) 100vw, 30vw" quality={85} />
                </a>
              )}
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter title={story.sheetsTitle} id="sheets">
        <div className={s.sheets}>
          {t.schematics.map((sheet) => (
            <figure key={sheet.src} className={s.sheet} data-show>
              <a href={sheet.src} target="_blank" rel="noopener noreferrer" aria-label={sheet.open}>
                <Image src={sheet.src} alt={sheet.alt} fill sizes="(max-width: 820px) 100vw, 45vw" quality={90} />
              </a>
              <figcaption>
                <b>{sheet.caption}</b>
                <span>{sheet.body}</span>
                <code>{sheet.key}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </Chapter>

      <Chapter title={story.bugTitle} id="bug">
        <div className={s.bug}>
          <p className={s.bugText} data-show>
            {t.fix}
          </p>
          <div className={s.bugDiagrams} data-after={after || undefined}>
            <div className={s.toggle} role="group" aria-label={story.bugTitle}>
              <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>
                {st.before}
              </button>
              <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>
                {st.after}
              </button>
            </div>
            <Wiper bad label={st.before} note={st.tiedTo5v} />
            <Wiper label={st.after} note="RPM_SIGNAL" />
          </div>
        </div>
      </Chapter>

      <Chapter title={story.expectedTitle} id="expected">
        <ul className={s.leds} data-show>
          {t.expected.map(([range, result], i) => (
            <li key={range}>
              <span>{range}</span>
              <span className={s.ledRow} aria-label={result}>
                {[0, 1, 2, 3].map((n) => (
                  <i key={n} data-on={n < i || undefined} />
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className={s.note}>{story.expectedNote}</p>
      </Chapter>

      <Chapter title={t.whereTitle} id="where">
        <p className={s.body} data-show>
          {t.where}
        </p>
      </Chapter>
    </>
  );
}

/** The potentiometer and its wiper, before and after the fix. */
function Wiper({ bad = false, label, note }: { bad?: boolean; label: string; note: string }) {
  const tone = bad ? "#ee5544" : "#73d97f";
  return (
    <figure className={s.wiper} data-bad={bad || undefined}>
      <figcaption style={{ color: tone }}>{label}</figcaption>
      <svg viewBox="0 0 320 240" role="img" aria-label={`${label}: ${note}`}>
        <text x="16" y="44" fill="#9e9e99" fontSize="13" fontFamily="var(--font-geist), monospace">+5 V</text>
        <line x1="64" y1="40" x2="300" y2="40" stroke="#f5f5f2" strokeWidth="1.5" />
        <text x="16" y="214" fill="#9e9e99" fontSize="13" fontFamily="var(--font-geist), monospace">GND</text>
        <line x1="64" y1="210" x2="300" y2="210" stroke="#f5f5f2" strokeWidth="1.5" />
        <line x1="140" y1="40" x2="140" y2="85" stroke="#f5f5f2" strokeWidth="1.5" />
        <rect x="128" y="85" width="24" height="80" fill="none" stroke="#f5f5f2" strokeWidth="1.5" />
        <line x1="140" y1="165" x2="140" y2="210" stroke="#f5f5f2" strokeWidth="1.5" />
        <path d="M196 125 L156 125 M166 119 L156 125 L166 131" fill="none" stroke="#f5f5f2" strokeWidth="1.5" />
        {bad ? (
          <>
            <line x1="196" y1="125" x2="196" y2="40" stroke={tone} strokeWidth="2.5" />
            <text x="206" y="90" fill={tone} fontSize="12" fontFamily="var(--font-geist), monospace">{note}</text>
          </>
        ) : (
          <>
            <line x1="196" y1="125" x2="290" y2="125" stroke={tone} strokeWidth="2.5" />
            <text x="206" y="114" fill={tone} fontSize="12" fontFamily="var(--font-geist), monospace">{note}</text>
          </>
        )}
      </svg>
    </figure>
  );
}

function GoForIt() {
  const { ui } = useLocale();
  const g = ui.siteCopy.goforit;
  const story = ui.pages.stories.goforit;
  return (
    <>
      <div className={s.heroPhones}>
        {g.screens.map((shot) => (
          <div key={shot.src} className={s.phone}>
            <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 820px) 60vw, 22vw" quality={92} priority />
          </div>
        ))}
      </div>
      <p className={s.caption}>{g.caption}</p>

      <Chapter title={story.introTitle} id="what">
        <p className={s.lead} data-show>
          {g.description}
        </p>
        <p className={s.body} data-show>
          {g.own}
        </p>
      </Chapter>

      <Chapter title={story.pointsTitle} id="how">
        <ul className={s.points}>
          {g.points.map(([head, body]) => (
            <li key={head} data-show>
              <b>{head}</b>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </Chapter>

      <section className={s.chapter}>
        <p className={s.statusLine} data-show>
          <i aria-hidden="true" />
          {g.status.split(". ")[0]}.
        </p>
        <a className={s.waitlist} href="https://goforit.fit" target="_blank" rel="noopener noreferrer" data-show>
          {story.waitlist}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
        </a>
      </section>
    </>
  );
}

function Standout() {
  const { ui } = useLocale();
  const so = ui.siteCopy.standout;
  const story = ui.pages.stories.standout;
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = (on: boolean) => {
    const v = video.current;
    if (!v) return;
    if (on) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <div className={s.heroCapture}>
        <div className={s.browser} onMouseEnter={() => play(true)} onMouseLeave={() => play(false)}>
          <div className={s.chrome} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className={s.screen}>
            <video ref={video} muted loop playsInline preload="none" poster="/images/site/standout-poster.jpg" aria-label={so.imageAlt}>
              <source src="/video/standout.mp4" type="video/mp4" />
            </video>
            <button type="button" className={s.screenButton} aria-pressed={playing} aria-label={so.play} onClick={() => play(!playing)} />
          </div>
        </div>
        <p className={s.caption}>{so.captureNote}</p>
      </div>

      <Chapter title={story.introTitle} id="what">
        <p className={s.lead} data-show>
          {so.description}
        </p>
        <p className={s.body} data-show>
          {story.scope}
        </p>
      </Chapter>

      <Chapter title={story.stepsTitle} id="steps">
        <ol className={s.timeline}>
          {so.steps.map(([head, body], i) => (
            <li key={head} data-show data-last={i === so.steps.length - 1 || undefined}>
              <span className={s.stepNo}>{String(i + 1).padStart(2, "0")}</span>
              <div className={s.stepText}>
                <h3>{head}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <a className={s.visit} href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer">
          {so.visit}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
        </a>
      </Chapter>
    </>
  );
}
