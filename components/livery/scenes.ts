"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { KART_BOX, KART_WHEELS } from "./KartSvg";

/**
 * Scene vocabulary shared by every livery page. Pages mark their markup, this wires it:
 *
 *  data-panel        a full-height panel; it holds while the next panel slides over it
 *  data-pan          (on a panel) a horizontal drive: the inner [data-pan-track] slides across
 *                    while a [data-pan-kart] crosses the screen
 *  data-lap          (on a panel) held while its [data-lap-item]s light up one by one
 *  data-depth="n"    parallax inside the first screen: n > 0 rises faster than the page
 *  data-recede       eases the custom property --recede from 0 to 1 as its section leaves
 *  data-reveal-row   rows that slide in, staggered, as they come into view
 */

export type SceneContext = { root: HTMLElement; motion: boolean; roomy: boolean };
export type SceneSetup = (c: SceneContext) => void | (() => void);

const RAD = 180 / Math.PI;

/** Turns each kart wheel by the distance travelled (in screen px). */
export function wheelSpinner(kart: Element) {
  const spokes = KART_WHEELS.map((w) => ({ w, el: kart.querySelector<SVGGElement>(`[data-k='spokes-${w.id}']`), a: 0 }));
  return (dxPx: number, kartPx: number) => {
    const svgPerPx = KART_BOX.w / Math.max(kartPx, 1);
    for (const s of spokes) {
      s.a += ((Math.abs(dxPx) * svgPerPx) / s.w.r) * RAD;
      s.el?.setAttribute("transform", `rotate(${s.a.toFixed(1)} ${s.w.cx} ${s.w.cy})`);
    }
  };
}

function buildDepth({ root, motion }: SceneContext) {
  if (!motion) return;
  root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
    const depth = Number(el.dataset.depth) || 0;
    gsap.to(el, {
      y: () => -depth * window.innerHeight * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") ?? el,
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });
  });
  root.querySelectorAll<HTMLElement>("[data-recede]").forEach((el) => {
    gsap.fromTo(
      el,
      { "--recede": 0 },
      {
        "--recede": 1,
        ease: "none",
        scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: 0.3 },
      },
    );
  });
}

function buildPan(panel: HTMLElement, { roomy }: SceneContext) {
  const track = panel.querySelector<HTMLElement>("[data-pan-track]");
  if (!roomy || !track) return null;
  panel.dataset.panOn = "";
  const kart = panel.querySelector<HTMLElement>("[data-pan-kart]");
  const spin = kart ? wheelSpinner(kart) : null;
  const distance = () => Math.max(track.scrollWidth - (window.innerWidth - track.getBoundingClientRect().left) + 48, 0);
  let lastX = 0;
  gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: panel,
      start: "top top",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (!kart) return;
        const room = window.innerWidth - kart.offsetWidth;
        const x = self.progress * room;
        spin?.(x - lastX, kart.offsetWidth);
        kart.style.transform = `translate3d(${x.toFixed(1)}px,0,0) scaleX(${self.direction < 0 ? -1 : 1})`;
        lastX = x;
      },
    },
  });
  return () => delete panel.dataset.panOn;
}

function buildLap(panel: HTMLElement, { roomy }: SceneContext) {
  const items = Array.from(panel.querySelectorAll<HTMLElement>("[data-lap-item]"));
  if (!roomy || !items.length) return null;
  const bar = panel.querySelector<HTMLElement>("[data-lap-bar]");
  panel.dataset.lapArmed = "";
  const light = (p: number) => {
    const idx = Math.min(items.length - 1, Math.floor(p * items.length * 0.999));
    items.forEach((it, j) => {
      it.toggleAttribute("data-on", j <= idx);
      if (j === idx) it.setAttribute("aria-current", "step");
      else it.removeAttribute("aria-current");
    });
    if (bar) bar.style.transform = `scaleX(${Math.max(p, 0.02).toFixed(3)})`;
  };
  light(0);
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    end: `+=${items.length * 55}%`,
    pin: true,
    onUpdate: (self) => light(self.progress),
  });
  return () => {
    delete panel.dataset.lapArmed;
    items.forEach((it) => {
      it.removeAttribute("data-on");
      it.removeAttribute("aria-current");
    });
  };
}

function buildPanels(c: SceneContext) {
  const { root, motion, roomy } = c;
  const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
  panels.forEach((panel, i) => (panel.style.zIndex = String(i + 4)));
  if (!motion) return [];
  const cleanups: Array<() => void> = [];

  // Created in page order so every pin is measured after the ones above it.
  panels.forEach((panel, i) => {
    const own =
      (panel.hasAttribute("data-pan") ? buildPan(panel, c) : null) ??
      (panel.hasAttribute("data-lap") ? buildLap(panel, c) : null);
    if (own) cleanups.push(own);

    const next = panels[i + 1];
    if (!next) return;
    const holdsItself = roomy && (panel.hasAttribute("data-pan") || panel.hasAttribute("data-lap"));
    if (!holdsItself) {
      ScrollTrigger.create({
        trigger: panel,
        start: () => (panel.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
        endTrigger: next,
        end: "top top",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }
    const recede = { trigger: next, start: "top bottom", end: "top top", scrub: true };
    const inner = panel.querySelector("[data-panel-inner]");
    if (inner) gsap.to(inner, { scale: 0.93, yPercent: -3, ease: "none", scrollTrigger: recede });
    const shade = panel.querySelector("[data-panel-shade]");
    if (shade) gsap.to(shade, { opacity: 0.5, ease: "none", scrollTrigger: { ...recede } });
  });
  return cleanups;
}

function buildRows({ root, motion }: SceneContext) {
  const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-row]"));
  if (!motion || !rows.length) return;
  gsap.set(rows, { opacity: 0, x: -28 });
  ScrollTrigger.batch(rows, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", overwrite: true }),
  });
}

/**
 * Wires a page's scenes. `setup` runs first for anything page-specific that sits above the
 * panels (the homepage plunge and garage); it must be a stable, module-level function.
 */
export function useScenes(rootRef: RefObject<HTMLElement | null>, setup?: SceneSetup) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        roomy: "(min-width: 1000px) and (min-height: 700px)",
      },
      (context) => {
        const { motion, roomy } = context.conditions as { motion: boolean; roomy: boolean };
        const c: SceneContext = { root, motion, roomy };
        const cleanups: Array<() => void> = [];
        const own = setup?.(c);
        if (own) cleanups.push(own);
        buildDepth(c);
        cleanups.push(...buildPanels(c));
        buildRows(c);
        return () => cleanups.forEach((fn) => fn());
      },
    );
    // Images and fonts shift layout after first measure.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [rootRef, setup]);
}
