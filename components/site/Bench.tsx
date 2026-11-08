"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Slot } from "./Shell";
import s from "./site.module.css";

const THRESHOLDS = [1, 2, 3, 4];
const MAX = 5;

/** The tachometer's logic, live: the slider stands in for the potentiometer. */
export function Bench({ active }: { active: boolean }) {
  const t = useLocale().ui.siteCopy.tachometer;
  const [volts, setVolts] = useState(2.6);
  const touched = useRef(false);
  const swept = useRef(false);

  const lit = THRESHOLDS.filter((v) => volts >= v).length;

  // One sweep up the range the first time the bench is reached, until the visitor takes over.
  useEffect(() => {
    if (!active || swept.current || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    swept.current = true;
    let frame = 0;
    let begin = 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (touched.current) return;
        begin ||= now;
        const p = Math.min((now - begin) / 1700, 1);
        const v = p < 0.65 ? (p / 0.65) * MAX : MAX - ((p - 0.65) / 0.35) * (MAX - 2.6);
        setVolts(Math.round(v * 10) / 10);
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, 650);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [active]);

  return (
    <div className={s.bench} data-scroller>
      <div className={s.benchTop}>
        <h2 className={s.benchTitle} data-rise>
          {t.benchTitle}
        </h2>
        <p className={s.readout} data-rise aria-hidden="true">
          <b>{volts.toFixed(1)}</b> V
          <span>{t.ledCount(lit)}</span>
        </p>
      </div>

      <div className={s.instrument}>
        <div className={s.ledRow} aria-hidden="true">
          {THRESHOLDS.map((v, i) => (
            <div key={v} className={s.ledSlot} style={{ left: `${(v / MAX) * 100}%` }}>
              <span data-led className={s.led} data-on={i < lit ? "" : undefined} />
              <small>{v} V</small>
            </div>
          ))}
        </div>
        <input
          data-rise
          className={s.slider}
          type="range"
          min={0}
          max={MAX}
          step={0.1}
          value={volts}
          aria-label={t.sliderLabel}
          aria-valuetext={`${volts.toFixed(1)} V, ${t.ledCount(lit)}`}
          style={{ "--v": `${(volts / MAX) * 100}%` } as React.CSSProperties}
          onChange={(e) => {
            touched.current = true;
            setVolts(Number(e.target.value));
          }}
        />
        <p className={s.simNote} data-rise>
          {t.simulation}
        </p>
      </div>

      <div className={s.benchFoot}>
        <div data-rise className={s.benchSlot}>
          <Slot label={t.schematicSlot} className={s.fill} />
        </div>
        <div data-rise className={s.panel}>
          <h3>{t.whereTitle}</h3>
          <p>{t.where}</p>
        </div>
      </div>
    </div>
  );
}
