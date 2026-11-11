"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { PageFrame } from "./PageFrame";
import p from "./pages.module.css";

const CV_FILE = {
  en: { href: "/documents/rayann-sagnon-cv-en.pdf", name: "Rayann_Sagnon_Resume.pdf" },
  fr: { href: "/documents/rayann-sagnon-cv-fr.pdf", name: "Rayann_Sagnon_CV.pdf" },
} as const;

// Where each hands-on skill was used, in the order of the skills list.
const SKILL_PROOF = ["", "", "/projects/kits", "/projects/tachometer", "#experience"];

export function WorkPage({ hasCv }: { hasCv: boolean }) {
  const { locale, ui } = useLocale();
  const copy = ui.siteCopy;
  const w = copy.workPage;
  const a = copy.about;
  const gfi = copy.goforit.screens;
  const [board, goforit, standout] = w.featured;

  return (
    <PageFrame active="work">
      <header className={p.head}>
        <h1 className={p.giant}>{w.title}</h1>
        <p className={p.headIntro}>{w.intro}</p>
      </header>

      <section className={p.block} aria-labelledby="projects">
        <h2 id="projects" className={p.sectionTitle} data-show>
          {w.projectsTitle}
        </h2>
        <div className={p.featured}>
          <Link href={board.href} className={`${p.feature} ${p.featureMain}`} data-show>
            <div className={p.featureImage}>
              <Image src="/images/site/tachometer-board-3d.jpg" alt="" fill sizes="(max-width: 820px) 100vw, 60vw" quality={90} />
            </div>
            <b>{board.name}</b>
            <span>{board.line}</span>
          </Link>
          <Link href={goforit.href} className={p.feature} data-show>
            <div className={`${p.featureImage} ${p.gfiTile}`}>
              {gfi.slice(1).map((shot) => (
                <div key={shot.src} className={p.gfiShot}>
                  <Image src={shot.src} alt="" fill sizes="12vw" quality={90} />
                </div>
              ))}
            </div>
            <b>{goforit.name}</b>
            <span>{goforit.line}</span>
          </Link>
          <Link href={standout.href} className={p.feature} data-show>
            <div className={p.featureImage}>
              <Image src="/images/site/standout-poster.jpg" alt="" fill sizes="(max-width: 820px) 100vw, 32vw" quality={90} style={{ objectPosition: "50% 20%" }} />
            </div>
            <b>{standout.name}</b>
            <span>{standout.line}</span>
          </Link>
        </div>

        <h3 className={p.listTitle} data-show>
          {w.allTitle}
        </h3>
        <ul className={p.rows}>
          {copy.projectList.map((item) => (
            <li key={item.id} data-show>
              {item.href ? (
                <Link href={item.href} className={p.row}>
                  <b>{item.name}</b>
                  <span>{item.type}</span>
                  <span>{item.status}</span>
                  <ArrowRight aria-hidden="true" strokeWidth={1.25} />
                </Link>
              ) : (
                <div className={p.row}>
                  <b>{item.name}</b>
                  <span>{item.type}</span>
                  <span>
                    {item.status}. {w.noPage}
                  </span>
                  <i aria-hidden="true" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={p.block} id="experience" aria-labelledby="experience-title">
        <h2 id="experience-title" className={p.sectionTitle} data-show>
          {w.experienceTitle}
        </h2>
        <ul className={p.rows}>
          {a.experience.map((job) => (
            <li key={job.id} className={p.job} data-show>
              <b>{job.title}</b>
              <span>{job.meta}</span>
              {job.body && <p>{job.body}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className={p.block} aria-labelledby="skills-title">
        <div className={p.sectionHead} data-show>
          <h2 id="skills-title" className={p.sectionTitle}>
            {w.skillsTitle}
          </h2>
          <p>{w.skillsIntro}</p>
        </div>
        <ul className={p.rows}>
          {a.skills.map(([skill, where], i) => (
            <li key={skill} data-show>
              {SKILL_PROOF[i] ? (
                <Link href={SKILL_PROOF[i]} className={`${p.row} ${p.skill}`}>
                  <b>{skill}</b>
                  <span>{where}</span>
                  <ArrowRight aria-hidden="true" strokeWidth={1.25} />
                </Link>
              ) : (
                <div className={`${p.row} ${p.skill}`}>
                  <b>{skill}</b>
                  <span>{where}</span>
                  <i aria-hidden="true" />
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className={p.course} data-show>
          <b>{a.course[0]}</b>
          <span>{a.course[1]}</span>
        </p>
      </section>

      <section className={`${p.block} ${p.end}`} aria-label={a.nextStep.title}>
        {hasCv && (
          <a className={p.bigLink} href={CV_FILE[locale].href} download={CV_FILE[locale].name} data-show>
            {a.cv}
            <ArrowUpRight aria-hidden="true" strokeWidth={1} />
          </a>
        )}
        <Link className={p.bigLink} href="/contact" data-show>
          <span>
            {a.nextStep.title}
            <small>{a.nextStep.meta}</small>
          </span>
          <ArrowRight aria-hidden="true" strokeWidth={1} />
        </Link>
      </section>
    </PageFrame>
  );
}
