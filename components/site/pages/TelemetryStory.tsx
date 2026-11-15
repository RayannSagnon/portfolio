"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { BoardViewer } from "./BoardViewer";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import s from "./story.module.css";
import t from "./telemetry.module.css";

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

/**
 * The whole system at a glance, drawn from the schematic's blocks: the sensors on the left, the board in the middle,
 * the car's computer on the right. Used on the project page and on the home page until a 3D export exists.
 */
export function SystemDiagram({ compact = false }: { compact?: boolean }) {
  const { ui } = useLocale();
  const d = ui.pages.stories.telemetry.diagram;
  return (
    <figure className={t.system} data-compact={compact || undefined} aria-label={`${d.board}: ${d.hall}, ${d.accel}, ${d.bridge}, ${d.computer}`}>
      <div className={t.inputs}>
        <Block title={d.car} part={d.carPart} tone="power" />
        <Block title={d.hall} part={d.hallPart} />
        <Block title={d.accel} part={d.accelPart} />
      </div>
      <div className={t.wires} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className={t.board}>
        <span className={t.boardLabel}>{d.board}</span>
        <Block title={d.power} part={d.powerPart} tone="power" />
        <Block title={d.hallIn} part={d.hallInPart} />
        <Block title={d.bridge} part={d.bridgePart} tone="bridge" />
        <span className={t.jumperNote}>{d.jumper}</span>
      </div>
      <div className={t.link} aria-hidden="true">
        <i />
        <span>{d.usb}</span>
      </div>
      <div className={t.computer}>
        <Block title={d.computer} part={d.computerPart} tone="computer" />
      </div>
    </figure>
  );
}

function Block({ title, part, tone }: { title: string; part: string; tone?: "power" | "bridge" | "computer" }) {
  return (
    <div className={t.block} data-tone={tone}>
      <b>{title}</b>
      <span>{part}</span>
    </div>
  );
}

/** The two 5 V supplies: shared before, kept apart by JP1 after. */
function Supplies({ after }: { after: boolean }) {
  const { ui } = useLocale();
  const tt = ui.pages.stories.telemetry;
  const red = "#ee5544";
  const green = "#73d97f";
  const ink = "#f5f5f2";
  const mono = "var(--font-geist), monospace";
  return (
    <svg viewBox="0 0 360 230" role="img" aria-label={after ? tt.afterLabel : tt.beforeLabel}>
      <rect x="16" y="30" width="96" height="40" rx="6" fill="none" stroke={ink} strokeOpacity="0.5" />
      <text x="64" y="55" fill={ink} fontSize="13" textAnchor="middle" fontFamily={mono}>CAR 5V</text>
      <rect x="16" y="160" width="96" height="40" rx="6" fill="none" stroke={ink} strokeOpacity="0.5" />
      <text x="64" y="185" fill={ink} fontSize="13" textAnchor="middle" fontFamily={mono}>USB 5V</text>
      <rect x="248" y="95" width="96" height="40" rx="6" fill="none" stroke={ink} strokeOpacity="0.5" />
      <text x="296" y="120" fill={ink} fontSize="12" textAnchor="middle" fontFamily={mono}>{tt.sensor.toUpperCase()}</text>
      {after ? (
        <>
          <path d="M112 50 H170 V100" fill="none" stroke={green} strokeWidth="2" />
          <path d="M112 180 H170 V130" fill="none" stroke={ink} strokeOpacity="0.45" strokeWidth="2" strokeDasharray="5 5" />
          <rect x="156" y="98" width="28" height="34" rx="4" fill="#111113" stroke={ink} strokeOpacity="0.6" />
          <circle cx="170" cy="105" r="3.5" fill={green} />
          <circle cx="170" cy="115" r="3.5" fill={ink} />
          <circle cx="170" cy="125" r="3.5" fill={ink} fillOpacity="0.5" />
          <path d="M184 115 H248" fill="none" stroke={green} strokeWidth="2" />
          <text x="170" y="150" fill={green} fontSize="12" textAnchor="middle" fontFamily={mono}>JP1</text>
        </>
      ) : (
        <>
          <path d="M112 50 H200 V180 H112 M200 115 H248" fill="none" stroke={red} strokeWidth="2" />
          <circle cx="200" cy="115" r="4" fill={red} />
          <text x="208" y="160" fill={red} fontSize="11" fontFamily={mono}>{tt.backfeed}</text>
        </>
      )}
    </svg>
  );
}

export function Telemetry() {
  const { ui } = useLocale();
  const tt = ui.pages.stories.telemetry;
  const st = ui.pages.story;
  const [after, setAfter] = useState(true);
  const [side, setSide] = useState<"top" | "bottom">("top");

  return (
    <>
      <div className={s.heroModel}>
        <BoardViewer board="telemetry" alt={tt.boardAlt} className={s.heroModelCanvas} />
        <span className={s.hint}>{st.drag}</span>
      </div>

      <Chapter title={tt.introTitle} id="start">
        <p className={s.lead} data-show>
          {tt.intro[0]}
        </p>
        <p className={s.body} data-show>
          {tt.intro[1]}
        </p>
      </Chapter>

      <Chapter title={tt.systemTitle} id="system">
        <div className={t.hero} data-show>
          <SystemDiagram />
        </div>
      </Chapter>

      <Chapter title={tt.timelineTitle} id="timeline">
        <ol className={`${s.timeline} ${t.timeline}`}>
          {tt.steps.map((step, i) => (
            <li key={step.title} data-show data-last={i === tt.steps.length - 1 || undefined}>
              <span className={s.stepNo}>{String(i + 1).padStart(2, "0")}</span>
              <div className={s.stepText}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter title={tt.doesTitle} id="does">
        <div className={t.does}>
          {tt.does.map((item) => (
            <article key={item.title} className={t.doesItem} data-show>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <code>{item.key}</code>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter title={tt.schematicTitle} id="schematic">
        <p className={s.body} data-show>
          {tt.schematic}
        </p>
        <figure className={t.sheet} data-show data-wide>
          <a className={t.sheetScroll} href="/documents/telemetry-v2-schematic.pdf" target="_blank" rel="noopener noreferrer">
            <Image src="/images/telemetry/schematic.png" alt={tt.schematicAlt} width={2130} height={1358} sizes="(max-width: 820px) 100vw, 1100px" />
          </a>
          <figcaption>
            <a href="/documents/telemetry-v2-schematic.pdf" target="_blank" rel="noopener noreferrer">
              {tt.schematicPdf}
            </a>
          </figcaption>
        </figure>
      </Chapter>

      <Chapter title={tt.jumperTitle} id="jumper">
        <div className={s.bug}>
          <div>
            {tt.jumper.map((para) => (
              <p key={para.slice(0, 20)} className={s.bugText} data-show>
                {para}
              </p>
            ))}
          </div>
          <div className={t.supplies}>
            <div className={t.toggle} role="group" aria-label={tt.jumperTitle}>
              <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>
                {st.before}
              </button>
              <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>
                {st.after}
              </button>
            </div>
            <figure className={t.supply} data-bad={!after || undefined}>
              <figcaption>{after ? tt.afterLabel : tt.beforeLabel}</figcaption>
              <Supplies after={after} />
            </figure>
          </div>
        </div>
        <figure className={t.sheet} data-show>
          <Image src="/images/telemetry/power-block.png" alt={tt.powerAlt} width={1550} height={806} sizes="(max-width: 820px) 100vw, 900px" />
          <figcaption>{tt.powerCaption}</figcaption>
        </figure>
      </Chapter>

      <Chapter title={tt.testTitle} id="test">
        <p className={s.body} data-show>
          {tt.test}
        </p>
        <ol className={t.header} data-show aria-label={tt.testTitle}>
          {tt.pins.map((pin, i) => (
            <li key={pin}>
              <span className={t.pinNo}>{i + 1}</span>
              <i aria-hidden="true" />
              <code>{pin}</code>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter title={tt.layersTitle} id="layers">
        <p className={s.body} data-show>
          {tt.layers}
        </p>
        <div className={t.layers} data-show>
          <div className={t.toggle} role="group" aria-label={tt.layersTitle}>
            <button type="button" aria-pressed={side === "top"} onClick={() => setSide("top")}>
              {tt.layerTop}
            </button>
            <button type="button" aria-pressed={side === "bottom"} onClick={() => setSide("bottom")}>
              {tt.layerBottom}
            </button>
          </div>
          <div className={t.layerFrame}>
            <Image src="/images/telemetry/layer-top.png" alt={tt.layerTopAlt} fill sizes="(max-width: 820px) 100vw, 640px" data-on={side === "top" || undefined} />
            <Image src="/images/telemetry/layer-bottom.png" alt={tt.layerBottomAlt} fill sizes="(max-width: 820px) 100vw, 640px" data-on={side === "bottom" || undefined} />
          </div>
        </div>
      </Chapter>

      <Chapter title={tt.numbersTitle} id="numbers">
        <dl className={t.numbers} data-show>
          {tt.numbers.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Chapter>

      <Chapter title={tt.expectedTitle} id="expected">
        <ul className={t.expected} data-show>
          {tt.expected.map(([test, result]) => (
            <li key={test}>
              <span>{test}</span>
              <b>{result}</b>
            </li>
          ))}
        </ul>
        <p className={s.note}>{tt.expectedNote}</p>
      </Chapter>

      <Chapter title={tt.whereTitle} id="where">
        <p className={s.body} data-show>
          {tt.where}
        </p>
      </Chapter>
    </>
  );
}
