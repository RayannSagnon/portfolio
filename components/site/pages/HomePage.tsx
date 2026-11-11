"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavKey } from "../Shell";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { HomeBackground } from "../HomeBackground";
import FlowingMenu from "../bits/FlowingMenu";
import PixelTransition from "../bits/PixelTransition";
import { BoardViewer } from "./BoardViewer";
import { ContactSection, CV_FILE } from "./ContactSection";
import { PageFrame } from "./PageFrame";
import h from "./home.module.css";

const PROJECT_IMAGE: Record<string, string> = {
  tachometer: "/images/site/tachometer-board-3d.jpg",
  goforit: "/images/site/goforit-training.webp",
  standout: "/images/site/standout-poster.jpg",
  kits: "/images/kits/car-floor.jpg",
};

export function HomePage() {
  const { site } = useContent();
  const { locale, ui } = useLocale();
  const copy = ui.siteCopy;
  const p = ui.pages.home;
  const [schematic, setSchematic] = useState(false);
  // The navigation lights Work or Contact while that section fills the middle of the screen.
  const [section, setSection] = useState<NavKey>(null);
  useEffect(() => {
    const ids: [string, NavKey][] = [["work", "work"], ["contact", "contact"]];
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const hit = ids.find(([id]) => seen.get(id));
        setSection(hit ? hit[1] : null);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    ids.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const boardAlt = copy.tachometer.board.alt;
  const schematicAlt = copy.tachometer.schematics[0].alt;

  return (
    <PageFrame active={section} flush>
      {/* 1. Me */}
      <section className={h.hero} aria-label="Rayann Sagnon">
        <div className={h.heroBg} aria-hidden="true">
          <HomeBackground paused={false} />
        </div>
        <div className={h.heroPhoto}>
          <Image src="/images/about/rayann-portrait-standing.jpg" alt={copy.home.portraitAlt} fill priority quality={92} sizes="(max-width: 820px) 100vw, 52vw" />
        </div>
        <div className={h.heroText}>
          <h1 className={h.name}>
            <span>Rayann</span>
            <span>Sagnon</span>
          </h1>
          <p className={h.role}>
            {copy.home.role[0]}
            <br />
            {copy.home.role[1]}
          </p>
          <div className={h.actions}>
            <a className={h.primary} href={site.linkedin} target="_blank" rel="noopener noreferrer">
              {copy.linkedin}
              <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
            </a>
            <a className={h.secondary} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
              {p.cv}
            </a>
          </div>
        </div>
      </section>

      {/* 2. The first proof: the board itself */}
      <section className={h.proof} aria-labelledby="proof-title">
        <div className={h.proofHead}>
          <h2 id="proof-title" className={h.proofTitle}>
            {copy.tachometer.title}
          </h2>
          <p className={h.proofLine}>{p.proofLine}</p>
          <dl className={h.proofMeta}>
            {p.proofMeta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={h.proofStage}>
          <div className={h.modelBox} data-hidden={schematic || undefined}>
            <BoardViewer alt={boardAlt} className={h.model} />
            <span className={h.hint}>{p.drag}</span>
          </div>
          {/* On a phone the schematic takes the board's place; on a computer it sits beside it and turns into the board on hover. */}
          <div className={h.phoneSchematic} data-shown={schematic || undefined}>
            <Image src="/images/site/tachometer-schematic.png" alt={schematicAlt} fill sizes="100vw" quality={90} />
          </div>
          <div className={h.pixelBox}>
            <PixelTransition
              firstContent={
                <div className={h.pixelImage}>
                  <Image src="/images/site/tachometer-schematic.png" alt={schematicAlt} fill sizes="30vw" quality={90} />
                </div>
              }
              secondContent={
                <div className={h.pixelImage}>
                  <Image src="/images/site/tachometer-board-3d.jpg" alt={boardAlt} fill sizes="30vw" quality={90} />
                </div>
              }
              gridSize={14}
              pixelColor="#0a0a0b"
              pattern="random"
              animationStepDuration={0.45}
              aspectRatio="140%"
            />
            <span className={h.hint}>{p.hoverSchematic}</span>
          </div>
        </div>
        <div className={h.switch} role="group" aria-label={copy.tachometer.title}>
          <button type="button" aria-pressed={!schematic} onClick={() => setSchematic(false)}>
            {p.show3d}
          </button>
          <button type="button" aria-pressed={schematic} onClick={() => setSchematic(true)}>
            {p.showSchematic}
          </button>
        </div>
        <Link className={h.readStory} href="/projects/tachometer">
          {p.readStory}
          <ArrowRight aria-hidden="true" strokeWidth={1.5} />
        </Link>
      </section>

      {/* 3. Every project */}
      <section id="work" className={h.work} aria-labelledby="work-title">
        <div className={h.workHead}>
          <h2 id="work-title" className={h.workTitle}>
            {p.workTitle}
          </h2>
          <p>{p.workIntro}</p>
        </div>
        <div className={h.flowing}>
          <FlowingMenu
            items={copy.projectList.map((item) => ({
              text: item.name,
              link: item.href || undefined,
              image: PROJECT_IMAGE[item.id],
              meta: `${item.type}, ${item.status.toLowerCase()}`,
            }))}
            speed={50}
            align="left"
            showArrow
            intro={false}
            textColor="#f5f5f2"
            bgColor="#0a0a0b"
            marqueeBgColor="#f5f5f2"
            marqueeTextColor="#0a0a0b"
            borderColor="rgba(245, 245, 242, 0.14)"
            ariaLabel={p.workTitle}
          />
        </div>
        <div className={h.cards}>
          <p className={h.swipe} aria-hidden="true">
            {p.swipe}
            <ArrowRight strokeWidth={1.5} />
          </p>
          <ul>
            {copy.projectList.map((item) => {
              const inner = (
                <>
                  <div className={h.cardImage}>
                    {PROJECT_IMAGE[item.id] ? (
                      <Image src={PROJECT_IMAGE[item.id]} alt="" fill sizes="78vw" quality={85} />
                    ) : (
                      <span>{p.noPage}</span>
                    )}
                  </div>
                  <b>{item.name}</b>
                  <span>
                    {item.type}, {item.status.toLowerCase()}
                  </span>
                </>
              );
              return (
                <li key={item.id}>
                  {item.href ? (
                    <Link href={item.href} className={h.card}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={h.card}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={h.more}>
          <Link href="/experience">
            {p.toExperience}
            <ArrowRight aria-hidden="true" strokeWidth={1.5} />
          </Link>
          <Link href="/about">
            {p.toAbout}
            <ArrowRight aria-hidden="true" strokeWidth={1.5} />
          </Link>
          <a className={h.secondary} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
            {copy.about.cv}
            <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* 4. Contact */}
      <ContactSection />
    </PageFrame>
  );
}
