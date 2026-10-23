"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import d from "./TachometerDemo.module.css";

// 3 green, 1 amber, 1 red: the board's five LEDs, lit from left to right.
const LEDS = ["g", "g", "g", "a", "r"] as const;

export function TachometerDemo() {
  const t = useLocale().ui.livery.bench.demo;
  const [speed, setSpeed] = useState(35);
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  const lit = Math.round((speed / 100) * LEDS.length);

  // One sweep to redline and back the first time the demo is seen, until the visitor takes over.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          if (touched.current) return;
          const p = Math.min((now - start) / 1800, 1);
          // Rise to 100 over the first 60%, settle back to 35.
          const v = p < 0.6 ? (p / 0.6) * 100 : 100 - ((p - 0.6) / 0.4) * 65;
          setSpeed(Math.round(v));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={d.demo}>
      <div className={d.head}>
        <span className={d.label}>{t.label}</span>
        <span className={d.readout} aria-hidden="true">
          {lit} / {LEDS.length}
        </span>
      </div>

      <div className={d.dash} aria-hidden="true">
        {LEDS.map((color, i) => (
          <span key={i} className={d.led} data-color={color} data-on={i < lit ? "" : undefined} />
        ))}
      </div>

      <label className={d.control}>
        <span className={d.controlLabel}>{t.speed}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={speed}
          aria-valuetext={t.lit(lit, LEDS.length)}
          onChange={(e) => {
            touched.current = true;
            setSpeed(Number(e.target.value));
          }}
          onPointerDown={() => {
            touched.current = true;
          }}
          className={d.range}
          style={{ "--fill": `${speed}%` } as React.CSSProperties}
        />
      </label>

      <p className={d.note}>{t.note}</p>
    </div>
  );
}
