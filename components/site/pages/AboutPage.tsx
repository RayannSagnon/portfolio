"use client";

import { ArrowRight, Cog, Cpu, Info, Radar, SquareCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cardFan } from "../cardFan";
import { RouteCards } from "../RouteCards";
import { PageFrame } from "./PageFrame";
import p from "./pages.module.css";

const clamp01 = (v: number) => Math.max(0, Math.min(v, 1));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// A robot as a block diagram: sense, power, decide, act.
const CHAIN_ICONS = [Radar, Cpu, SquareCode, Cog];

// The projects named in Rayann's own text open their pages.
const PROJECT_LINKS: [string, string][] = [
  ["GoForIt", "/projects/goforit"],
  ["Standout Studio", "/projects/standout"],
];
function linkProjects(text: string) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  for (;;) {
    const hits = PROJECT_LINKS.map(([name, href]) => ({ name, href, at: rest.indexOf(name) })).filter((h) => h.at >= 0);
    if (!hits.length) break;
    const hit = hits.sort((x, y) => x.at - y.at)[0];
    parts.push(rest.slice(0, hit.at));
    parts.push(
      <Link key={parts.length} href={hit.href}>
        {hit.name}
      </Link>,
    );
    rest = rest.slice(hit.at + hit.name.length);
  }
  parts.push(rest);
  return parts;
}

export function AboutPage() {
  const { ui } = useLocale();
  const copy = ui.siteCopy;
  const ab = copy.aboutPage;
  const a = copy.about;
  const bikes = a.route[0];
  const stageRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  // The pile of photos opens into the fan as it comes up the screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardFan.pileY = 0;
    const near = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setNear(true), { rootMargin: "50% 0px" });
    near.observe(stage);
    if (reduce) {
      cardFan.open = 1;
      return () => near.disconnect();
    }
    let ticking = false;
    const drive = () => {
      ticking = false;
      const vh = window.innerHeight;
      cardFan.open = easeInOut(clamp01((vh * 0.85 - stage.getBoundingClientRect().top) / (vh * 0.45)));
      cardFan.wake?.();
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(drive);
    };
    drive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      near.disconnect();
      window.removeEventListener("scroll", onScroll);
      cardFan.open = 1;
    };
  }, []);

  return (
    <PageFrame active="about">
      <header className={p.head}>
        <h1 className={p.aboutTitle}>{ab.title}</h1>
      </header>

      <section className={p.me} aria-label={ab.title.replace("\n", " ")}>
        <div className={p.mePhotos}>
          <figure className={p.meNow} data-show>
            <div className={p.photo}>
              <Image src="/images/site/sofa-wide.jpg" alt={a.portraitAlt} fill sizes="(max-width: 820px) 100vw, 44vw" quality={90} priority />
            </div>
            <figcaption>{ab.today}</figcaption>
          </figure>
          <figure className={p.meThen} data-show>
            <div className={p.photo}>
              <Image src={bikes.image} alt={ab.childhoodAlt} fill sizes="(max-width: 820px) 45vw, 18vw" quality={90} priority />
            </div>
            <figcaption>{ab.childhood}</figcaption>
          </figure>
        </div>
        <div className={p.meText}>
          {ab.intro.map((para, i) => (
            <p key={para.slice(0, 24)} className={i === 0 ? p.meLead : undefined} data-show>
              {linkProjects(para)}
            </p>
          ))}
          <blockquote className={p.meQuote} data-show>
            {ab.quote}
          </blockquote>
        </div>
      </section>

      <section className={p.block} aria-labelledby="why">
        <h2 id="why" className={p.sectionTitle} data-show>
          {ab.whyTitle}
        </h2>
        <p className={p.whyLead} data-show>
          {ab.whyLead}
        </p>
        <p className={p.chainIntro} data-show>
          {ab.whyChainIntro}
        </p>
        <ol className={p.chain} data-show>
          {ab.whyChain.map(([part, role], i) => {
            const Icon = CHAIN_ICONS[i];
            return (
              <li key={part}>
                <Icon aria-hidden="true" strokeWidth={1.25} />
                <b>{part}</b>
                <span>{role}</span>
              </li>
            );
          })}
        </ol>
        <p className={p.whyAfter} data-show>
          {ab.whyAfter}
        </p>
        <p className={p.whyClosing} data-show>
          {ab.whyClosing}
        </p>
      </section>

      <section className={p.block} aria-labelledby="bikes">
        <div className={p.chapter} data-show>
          <span className={p.place}>{bikes.place}</span>
          <h2 id="bikes" className={p.sectionTitle}>
            {bikes.title}
          </h2>
          <p>{bikes.body}</p>
        </div>
        <div className={p.pile} ref={stageRef}>
          <RouteCards images={[...a.album]} near={near} />
        </div>
      </section>

      <section className={`${p.block} ${p.end}`}>
        <div className={p.fact} data-show>
          <span className={p.factLabel}>
            <Info aria-hidden="true" strokeWidth={1.5} />
            {ui.pages.funFact}
          </span>
          <p className={p.siri}>{a.siri}</p>
        </div>
        <Link className={p.bigLink} href="/work" data-show>
          {ab.seeWork}
          <ArrowRight aria-hidden="true" strokeWidth={1} />
        </Link>
      </section>
    </PageFrame>
  );
}
