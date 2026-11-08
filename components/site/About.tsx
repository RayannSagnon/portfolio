"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { SiteShell, TopNav } from "./Shell";
import s from "./site.module.css";

const CV_PATH = "/documents/rayann-sagnon-cv.pdf";
// On phones the role closest to hardware opens the list.
const PHONE_ORDER = ["support", "facilities", "training", "hackathon"];

export function About({ hasCv }: { hasCv: boolean }) {
  const t = useLocale().ui.siteCopy.about;
  const phone = PHONE_ORDER.map((id) => t.experience.find((e) => e.id === id)!);

  return (
    <SiteShell active="about">
      <main className={s.about}>
        <div className={s.aboutPortrait}>
          <Image src="/images/site/sofa.jpg" alt={t.portraitAlt} fill priority sizes="33vw" />
        </div>

        <div className={s.aboutCol}>
          <TopNav active="about" />

          <section className={s.moment}>
            <h1 className={s.sectionTitle}>{t.routeTitle}</h1>
            <ol className={s.route}>
              {t.route.map((step) => (
                <li key={step.title}>
                  <div className={s.routeImage}>
                    <Image src={step.image} alt={step.alt} fill sizes="(max-width: 820px) 82vw, 22vw" />
                  </div>
                  <span>{step.place}</span>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <p className={s.siri}>{t.siri}</p>
          </section>

          <section className={s.moment}>
            <h2 className={s.sectionTitle}>{t.experienceTitle}</h2>
            <ul className={`${s.experience} ${s.onlyDesktop}`}>
              {t.experience.map((e) => (
                <li key={e.id}>
                  <h3>{e.title}</h3>
                  <span>{e.meta}</span>
                  {e.body && <p>{e.body}</p>}
                </li>
              ))}
            </ul>
            <div className={`${s.accordion} ${s.onlyPhone}`}>
              {phone.map((e, i) => (
                <details key={e.id} name="experience" open={i === 0}>
                  <summary>
                    <b>{e.title}</b>
                    <span>{e.meta}</span>
                  </summary>
                  {e.body && <p>{e.body}</p>}
                </details>
              ))}
            </div>
          </section>

          <section className={s.moment}>
            <h2 className={s.sectionTitle}>{t.skillsTitle}</h2>
            <ul className={s.skills}>
              {t.skills.map(([a, b]) => (
                <li key={a}>
                  <b>{a}</b>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className={s.course}>
              <b>{t.course[0]}</b>
              <span>{t.course[1]}</span>
            </p>
            {hasCv && (
              <a className={s.cv} href={CV_PATH} download>
                {t.cv}
              </a>
            )}
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
