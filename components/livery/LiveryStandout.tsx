"use client";

import { useContent, useLocale } from "@/lib/i18n/LocaleProvider";
import { useRef } from "react";
import { ArrowIcon, LiveryClose, LiveryShell } from "./LiveryShell";
import { PitLane } from "./PitLane";
import { useScenes } from "./scenes";
import s from "./LiveryHome.module.css";
import p from "./LiveryPages.module.css";

export function LiveryStandout() {
  const { ui } = useLocale();
  const { projectStories } = useContent();
  const t = ui.livery;
  const story = projectStories.standout;
  const scenesRef = useRef<HTMLDivElement>(null);
  useScenes(scenesRef);
  if (!story) return null;

  return (
    <LiveryShell current="work">
      <div ref={scenesRef}>
      <section className={p.pageHero} aria-labelledby="standout-name" data-pit>
        <div className={p.caseHead}>
          <h1 id="standout-name" className={p.caseName} data-depth="0.18">
            <span>Standout</span>
            <span>Studio</span>
          </h1>
          <p className={p.leadText}>{t.standoutPage.roleLine}</p>
          <a className={s.textLink} href="https://standoutstudio.ca" target="_blank" rel="noopener noreferrer">
            {t.standoutPage.visit}
            <ArrowIcon />
          </a>
        </div>

        <div className={`${s.sticker} ${s.decal} ${p.caseDecal}`} data-status="delivered" data-depth="0.55">
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

      <div className={s.panel} data-panel data-pit>
      <section className={`${p.section} ${p.twoCol} ${s.panelInner}`} aria-labelledby="why-heading" data-panel-inner>
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
      <div className={s.panelShade} data-panel-shade aria-hidden="true" />
      </div>

      {/* The process is a lap: held in place while each phase lights up in turn. */}
      <div className={s.panel} data-panel data-lap data-pit>
      <section className={`${p.section} ${s.panelInner}`} aria-labelledby="process-heading" data-panel-inner>
        <h2 id="process-heading" className={s.heading}>
          {t.standoutPage.processHeading}
        </h2>
        <p className={s.body}>{story.how.subtitle}</p>
        <div className={p.lapBar} aria-hidden="true">
          <span data-lap-bar />
        </div>
        <ol className={p.phases}>
          {story.how.phases.map((phase) => (
            <li key={phase.title} className={p.phase} data-lap-item>
              <span className={p.phaseStep}>{phase.step}</span>
              <h3 className={p.phaseTitle}>{phase.title}</h3>
              <p className={p.phaseBody}>{phase.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <div className={s.panelShade} data-panel-shade aria-hidden="true" />
      </div>

      <div className={s.panel} data-panel data-pit>
      <section className={`${p.section} ${s.panelInner}`} aria-labelledby="role-heading" data-panel-inner>
        <h2 id="role-heading" className={s.heading}>
          {t.standoutPage.roleHeading}
        </h2>
        <dl className={s.spec}>
          {story.how.layers.map((layer) => (
            <div key={layer.label} className={s.specRow}>
              <dt>{layer.label}</dt>
              <dd>{layer.detail}</dd>
            </div>
          ))}
        </dl>
        <h3 id="decisions-heading" className={p.subHeading}>
          {t.standoutPage.decisionsHeading}
        </h3>
        <dl className={p.decisions}>
          {(story.why.decisions ?? []).map((decision) => (
            <div key={decision.label} className={p.decision}>
              <dt>{decision.label}</dt>
              <dd>{decision.body}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className={s.panelShade} data-panel-shade aria-hidden="true" />
      </div>

      <div className={s.panel} data-panel data-pit>
      <section className={`${p.section} ${s.panelInner}`} aria-labelledby="clients-heading" data-panel-inner>
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
      <div className={s.panelShade} data-panel-shade aria-hidden="true" />
      </div>

      <div className={`${s.panel} ${s.panelLast}`} data-panel data-pit>
      <LiveryClose quiet heading={t.standoutPage.closeHeading} body={t.standoutPage.closeBody}>
        <a className={s.textLink} href="/#work">
          <ArrowIcon back />
          {t.standoutPage.backToWork}
        </a>
      </LiveryClose>
      </div>
      </div>
      <PitLane marks={t.standoutPage.pitMarks} />
    </LiveryShell>
  );
}
