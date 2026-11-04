"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useScenes, type SceneContext } from "./scenes";

const throttle = (p: number, garage: HTMLElement) => {
  garage.style.setProperty("--throttle", p.toFixed(3));
  window.dispatchEvent(new CustomEvent("rs:throttle", { detail: p }));
};

/** Homepage-only scenes above the panels: the plunge into the roundel, then the night garage. */
function homeSetup({ root, motion, roomy }: SceneContext) {
  const q = (sel: string) => root.querySelector<HTMLElement>(sel);
  const hero = q("[data-scene='hero']");
  const garage = q("[data-scene='garage']");
  const demo = q("[data-scene-part='demo']");

  // Plunge: the camera pushes into the roundel until its ink fills the screen.
  if (motion && hero) {
    const roundel = q("[data-hero='roundel']");
    const cover = () => (2 * Math.hypot(window.innerWidth, window.innerHeight)) / ((roundel?.offsetWidth || 120) * 1.4) + 1;
    gsap
      .timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: "+=90%", pin: true, scrub: 0.5, invalidateOnRefresh: true },
      })
      .to(q("[data-hero='name']"), { scale: 1.2, yPercent: -10, opacity: 0, ease: "power1.in", duration: 0.6 }, 0)
      .to(q("[data-hero='sheet']"), { xPercent: 35, opacity: 0, ease: "power1.in", duration: 0.5 }, 0)
      .to(root.querySelectorAll("[data-hero='role'], [data-hero='pit'], [data-hero='photo']"), { y: 70, opacity: 0, ease: "power1.in", duration: 0.45 }, 0)
      .set(roundel, { zIndex: 30 }, 0)
      .to(roundel, { rotate: 140, scale: 1.4, ease: "power1.in", duration: 0.5 }, 0)
      .fromTo(q("[data-plunge]"), { scale: 0 }, { scale: cover, ease: "power2.in", duration: 0.55 }, 0.42);
  }

  // Night garage: held on roomy screens while the scroll is the throttle.
  if (!garage) return;
  if (motion && roomy) {
    ScrollTrigger.create({ trigger: garage, start: "top top", end: "+=110%", pin: true, onUpdate: (self) => throttle(self.progress, garage) });
  } else if (motion && demo) {
    ScrollTrigger.create({ trigger: demo, start: "top 85%", end: "center 38%", onUpdate: (self) => throttle(self.progress, garage) });
  } else {
    throttle(0.6, garage);
  }
}

/** The homepage as an onboard camera ride. */
export function useHomeScenes(rootRef: RefObject<HTMLElement | null>) {
  useScenes(rootRef, homeSetup);
}
