"use client";

import { useEffect } from "react";

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const topOf = (el: Element) => el.getBoundingClientRect().top + window.scrollY;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Travels to a section: eased with a mouse, native on touch, instant under reduced motion. */
export function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(topOf(el), { duration: 0.9, easing: easeInOut });
  else window.scrollTo({ top: topOf(el), behavior: reduced() ? "instant" : "smooth" });
}

/**
 * Two ways through the page, so they can be compared on the preview.
 * Default: free scrolling, slightly smoothed on a mouse wheel.
 * ?scroll=snap: one gesture travels one section. A section taller than the screen scrolls
 * normally until its edge, so no text can be skipped. Phones use native CSS snapping.
 */
export function useScrollEngine() {
  useEffect(() => {
    const html = document.documentElement;
    const snap = new URLSearchParams(window.location.search).get("scroll") === "snap";
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (snap) html.dataset.scroll = "snap";
    if (!fine || reduced()) return () => delete html.dataset.scroll;

    let cancelled = false;
    let lenis: import("lenis").default | null = null;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.14, smoothWheel: !snap, autoRaf: true });
      window.__lenis = lenis;
    });

    let busy = false;
    let settling = false;
    let lastWheel = 0;

    const step = (dir: 1 | -1) => {
      if (!lenis) return false;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-sec]"));
      const vh = window.innerHeight;
      let i = 0;
      sections.forEach((s, k) => {
        if (s.getBoundingClientRect().top <= vh / 2) i = k;
      });
      const r = sections[i].getBoundingClientRect();
      if (r.height > vh + 2) {
        if (dir > 0 && r.bottom > vh + 2) return false;
        if (dir < 0 && r.top < -2) return false;
      }
      const target = sections[i + dir];
      if (!target) return false;
      let top = topOf(target);
      if (dir < 0 && target.offsetHeight > vh + 2) top += target.offsetHeight - vh;
      busy = true;
      lenis.scrollTo(top, {
        duration: 0.8,
        easing: easeInOut,
        lock: true,
        force: true,
        onComplete: () => {
          busy = false;
          settling = true;
        },
      });
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      if (busy) return e.preventDefault();
      // A trackpad keeps firing after the finger lifts: wait for it to go quiet.
      if (settling && gap < 120) return e.preventDefault();
      settling = false;
      if (Math.abs(e.deltaY) < 2) return;
      if (step(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const onControl = (e.target as Element | null)?.closest("a, button, input, textarea, select");
      const down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey && !onControl);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey && !onControl);
      if (!down && !up) return;
      if (busy) return e.preventDefault();
      if (step(down ? 1 : -1)) e.preventDefault();
    };

    if (snap) {
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKey);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      lenis?.destroy();
      window.__lenis = undefined;
      delete html.dataset.scroll;
    };
  }, []);
}
