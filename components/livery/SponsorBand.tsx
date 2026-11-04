"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion/gsap";
import b from "./SponsorBand.module.css";

/**
 * A trackside banner of what Rayann works with. It idles on its own, speeds up with the
 * scroll and turns around when the visitor scrolls back up. Decorative: the same facts are
 * listed as text on the About page.
 */
export function SponsorBand() {
  const items = useLocale().ui.livery.marquee;
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const loop = gsap.to(track, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
      let direction = 1;
      ScrollTrigger.create({
        trigger: band,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          direction = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 220, 7);
          gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.25, overwrite: true });
          gsap.to(loop, { timeScale: direction, duration: 0.9, delay: 0.25, ease: "power2.out" });
        },
      });
    }, band);
    return () => ctx.revert();
  }, []);

  const run = (copy: number) => (
    <ul className={b.run} key={copy}>
      {items.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <i className={b.mark} />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={bandRef} className={b.band} aria-hidden="true">
      <div ref={trackRef} className={b.track}>
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}
