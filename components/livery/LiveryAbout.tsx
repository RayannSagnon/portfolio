"use client";

import Image from "next/image";
import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { ArrowIcon, LiveryClose, LiveryShell, PitBoard, Stripe } from "./LiveryShell";
import s from "./LiveryHome.module.css";
import p from "./LiveryPages.module.css";

const CV_PATH = "/documents/rayann-sagnon-cv.pdf";

// The roles closest to hardware lead the logbook, most recent first; the rest fold into one line.
const LOG_LEAD = [
  "online-training-assistant",
  "it-support-assistant",
  "it-facilities-coordinator",
  "orange-hackathon",
];

export function LiveryAbout({ hasCv }: { hasCv: boolean }) {
  const { ui } = useLocale();
  const { fieldExperience } = useContent();
  const t = ui.livery.aboutPage;
  const entries = fieldExperience.fieldExperiences;
  const lead = LOG_LEAD.map((id) => entries.find((e) => e.id === id)).filter(
    (e): e is (typeof entries)[number] => Boolean(e),
  );
  const rest = entries.filter((e) => !LOG_LEAD.includes(e.id));

  const cvLink = hasCv ? (
    <a className={s.textLink} href={CV_PATH} download>
      {t.cv}
      <ArrowIcon />
    </a>
  ) : null;

  return (
    <LiveryShell current="about">
      <section className={p.pageHero} aria-labelledby="about-name">
        <div className={p.heroStripe} aria-hidden="true" />

        {/* The licence: one card, the facts a recruiter checks first. */}
        <article className={p.licence}>
          <header className={p.licenceHead}>
            <span>{t.licenceHeader}</span>
            <span>{t.licenceTeam}</span>
          </header>
          <div className={p.licenceBody}>
            <figure className={p.licencePhoto}>
              <Image
                src="/images/about-teaser/makerspace-lab.jpeg"
                alt={t.photoAlt}
                fill
                priority
                sizes="(max-width: 700px) 100vw, 320px"
              />
            </figure>
            <div className={p.licenceFacts}>
              <h1 id="about-name" className={p.licenceName}>
                <span>Rayann</span> <span>Sagnon</span>
              </h1>
              <dl className={p.fields}>
                {t.fields.map(([label, value]) => (
                  <div key={label} className={p.field}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <span className={p.seal} aria-hidden="true">
              RS
            </span>
          </div>
        </article>

        <div className={p.lead}>
          <p className={p.leadText}>{t.intro}</p>
          <div className={p.leadActions}>
            <PitBoard />
            {cvLink}
          </div>
        </div>
      </section>

      <Stripe />

      <section className={`${p.section} ${p.narrow}`} aria-labelledby="bench-heading">
        <div>
          <h2 id="bench-heading" className={s.heading}>
            {t.benchHeading}
          </h2>
          <dl className={p.skillPlate} aria-label={t.benchLabel}>
            {t.bench.map((row) => (
              <div key={row.skill} className={p.skillRow}>
                <dt>{row.skill}</dt>
                <dd className={p.skillLevel}>{row.level}</dd>
                {row.where && <dd className={p.skillWhere}>{row.where}</dd>}
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 id="course-heading" className={p.subHeading}>
            {t.courseHeading}
          </h3>
          <ul className={p.coursePlate} aria-labelledby="course-heading">
            {t.courses.map((course) => (
              <li key={course.name}>
                <h3 className={p.courseName}>{course.name}</h3>
                <p className={p.courseSchool}>
                  {course.school} · {course.status}
                </p>
                <p className={p.courseTopics}>{course.topics}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Stripe />

      <section className={p.section} aria-labelledby="route-heading">
        <h2 id="route-heading" className={s.heading}>
          {t.routeHeading}
        </h2>
        <ol className={p.routeSteps}>
          {t.route.map((step) => (
            <li key={step.title} className={p.routeStep}>
              <figure className={p.chapterFigure}>
                <div className={p.routePhoto}>
                  <Image src={step.image} alt={step.alt} fill sizes="(max-width: 860px) 100vw, 400px" />
                </div>
                <figcaption className={p.place}>{step.place}</figcaption>
              </figure>
              <h3 className={p.chapterTitle}>{step.title}</h3>
              <p className={s.body}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Stripe />

      <section className={p.section} aria-labelledby="log-heading">
        <h2 id="log-heading" className={s.heading}>
          {t.logHeading}
        </h2>
        <p className={s.body}>{t.logIntro}</p>
        <ol className={p.log}>
          {lead.map((entry) => (
            <li key={entry.id} className={p.logRow}>
              <div className={p.logWhen}>
                <span className={p.logDate}>{entry.dateLabel}</span>
                <span className={p.logType}>{t.types[entry.type as keyof typeof t.types]}</span>
              </div>
              <div className={p.logMain}>
                <h3 className={p.logTitle}>{entry.title}</h3>
                <p className={p.logOrg}>{entry.organization}</p>
                <p className={p.logSummary}>{entry.summary}</p>
                <p className={p.skills}>
                  <span className="sr-only">{t.skills}: </span>
                  {entry.skills.join(" · ")}
                </p>
                {entry.documents && entry.documents.length > 0 && (
                  <ul className={p.docs}>
                    {entry.documents.map((doc) => (
                      <li key={doc.id}>
                        <a className={s.textLink} href={doc.src} target="_blank" rel="noopener noreferrer">
                          {doc.title}
                          <span className={p.docKind}>{t.documentKinds[doc.kind as keyof typeof t.documentKinds]}</span>
                          <ArrowIcon />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
          <li className={`${p.logRow} ${p.logAlso}`}>
            <span className={p.logType}>{t.alsoLabel}</span>
            <ul className={p.alsoList}>
              {rest.map((entry) => (
                <li key={entry.id}>
                  <b>{entry.title}</b>, {entry.organization} <span className={p.logType}>{entry.dateLabel}</span>
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </section>

      <LiveryClose heading={t.closeHeading} body={t.closeBody}>
        {cvLink}
      </LiveryClose>
    </LiveryShell>
  );
}
