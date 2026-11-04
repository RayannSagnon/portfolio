"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion/gsap";
import d from "./TachometerDemo.module.css";

// 3 green, 1 amber, 1 red: the board's five LEDs, lit from left to right.
const LEDS = ["g", "g", "g", "a", "r"] as const;

export function TachometerDemo() {
  const t = useLocale().ui.livery.bench.demo;
  const [speed, setSpeed] = useState(35);
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  const lit = Math.round((speed / 100) * LEDS.length);

  // Scrolling is the throttle: the board revs to redline as it crosses the screen,
  // until the visitor grabs the slider.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        end: "center 38%",
        onUpdate: (self) => {
          if (!touched.current) setSpeed(Math.round(self.progress * 100));
        },
      });
    }, root);
    return () => ctx.revert();
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
