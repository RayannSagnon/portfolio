"use client";

import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { ArrowIcon, LiveryClose, LiveryShell, Stripe } from "./LiveryShell";
import s from "./LiveryHome.module.css";
import p from "./LiveryPages.module.css";

export function LiveryStandout() {
  const { ui } = useLocale();
  const { projectStories } = useContent();
  const t = ui.livery;
  const story = projectStories.standout;
  if (!story) return null;

  return (
    <LiveryShell current="work">
      <section className={p.pageHero} aria-labelledby="standout-name">
        <div className={p.caseHead}>
          <h1 id="standout-name" className={p.caseName}>
            <span>Standout</span>
            <span>Studio</span>
          </h1>
          <p className={p.leadText}>{t.standoutPage.roleLine}</p>
          <a className={s.textLink} href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer">
            {t.standoutPage.visit}
            <ArrowIcon />
          </a>
        </div>

        <div className={`${s.sticker} ${s.decal} ${p.caseDecal}`} data-status="delivered">
          <span className={s.stickerName}>{t.standoutPage.decalTitle}</span>
          <dl className={s.decalFacts}>
            <div>
              <dt className="sr-only">{t.standout.kind}</dt>
              <dd>{t.standout.kind}</dd>
            </div>
            <div>
              <dt className="sr-only">{t.standout.role}</dt>
              <dd>{t.standout.role}</dd>
            </div>
            <div>
              <dt className="sr-only">{t.standout.revenue}</dt>
              <dd>{t.standout.revenue}</dd>
            </div>
          </dl>
          <span className={s.stamp}>{t.stamps.delivered}</span>
        </div>
      </section>

      <Stripe />

      <section className={`${p.section} ${p.twoCol}`} aria-labelledby="why-heading">
        <div>
          <h2 id="why-heading" className={s.heading}>
            {story.why.title}
          </h2>
          <p className={s.body}>{story.why.subtitle}</p>
        </div>
        <div className={p.plate}>
          <p className={p.plateLabel}>{story.why.beforeLabel}</p>
          <ul className={p.tags}>
            {story.why.chaosTabs.map((tab) => (
              <li key={tab}>{tab}</li>
            ))}
          </ul>
        </div>
      </section>

      <Stripe />

      <section className={p.section} aria-labelledby="process-heading">
        <h2 id="process-heading" className={s.heading}>
          {t.standoutPage.processHeading}
        </h2>
        <p className={s.body}>{story.how.subtitle}</p>
        <ol className={p.phases}>
          {story.how.phases.map((phase) => (
            <li key={phase.title} className={p.phase}>
              <span className={p.phaseStep}>{phase.step}</span>
              <h3 className={p.phaseTitle}>{phase.title}</h3>
              <p className={p.phaseBody}>{phase.body}</p>
            </li>
          ))}
        </ol>

        <h3 className={p.subHeading}>{t.standoutPage.roleHeading}</h3>
        <dl className={s.spec}>
          {story.how.layers.map((layer) => (
            <div key={layer.label} className={s.specRow}>
              <dt>{layer.label}</dt>
              <dd>{layer.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Stripe />

      <section className={p.section} aria-labelledby="decisions-heading">
        <h2 id="decisions-heading" className={s.heading}>
          {t.standoutPage.decisionsHeading}
        </h2>
        <dl className={p.decisions}>
          {(story.why.decisions ?? []).map((decision) => (
            <div key={decision.label} className={p.decision}>
              <dt>{decision.label}</dt>
              <dd>{decision.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Stripe />

      <section className={p.section} aria-labelledby="clients-heading">
        <h2 id="clients-heading" className={s.heading}>
          {t.standoutPage.clientsHeading}
        </h2>
        <p className={s.body}>{t.standoutPage.clientsSlot}</p>
        <div className={p.slots}>
          {[1, 2].map((n) => (
            <figure key={n} className={s.slot}>
              <figcaption>{t.standoutPage.clientSlotLabel(n)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Stripe />

      <LiveryClose quiet heading={t.standoutPage.closeHeading} body={t.standoutPage.closeBody}>
        <a className={s.textLink} href="/#work">
          <ArrowIcon back />
          {t.standoutPage.backToWork}
        </a>
      </LiveryClose>
    </LiveryShell>
  );
}
