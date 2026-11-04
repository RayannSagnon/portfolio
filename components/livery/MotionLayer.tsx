"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion/gsap";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import m from "./MotionLayer.module.css";

/** Smooth scroll that stays quick: a short lerp, native anchors handled, off for reduced motion. */
function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let lenis: import("lenis").default | null = null;
    let cancelled = false;
    const raf = (time: number) => lenis?.raf(time * 1000);

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.14, anchors: { offset: -80 }, autoRaf: false });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      if (document.documentElement.dataset.intro === "playing") lenis.stop();
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(raf);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);
}

/** Buttons marked data-magnetic lean toward the pointer, then settle back. */
function useMagnetic() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const offs = els.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      };
      const leave = () => {
        el.style.translate = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        el.style.translate = "";
      };
    });
    return () => offs.forEach((off) => off());
  }, []);
}

const INTERACTIVE = "a, button, label, summary, input, [data-cursor]";

/** The pointer: an instant dot and a ring that trails it, opening up over anything actionable. */
function Cursor() {
  const view = useLocale().ui.livery.cursorView;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const html = document.documentElement;
    html.dataset.pointer = "custom";
    const lag = prefersReducedMotion() ? 0.01 : 0.38;
    const ringX = gsap.quickTo(ring, "x", { duration: lag, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: lag, ease: "power3" });
    const labelX = gsap.quickTo(label, "x", { duration: lag * 0.8, ease: "power3" });
    const labelY = gsap.quickTo(label, "y", { duration: lag * 0.8, ease: "power3" });

    let shown = false;
    const last = { x: 0, y: 0 };
    const setState = (el: Element | null) => {
      const target = el?.closest<HTMLElement>(INTERACTIVE);
      const state = target ? (target.dataset.cursor === "view" ? "view" : "link") : "idle";
      if (ring.dataset.state !== state) {
        ring.dataset.state = state;
        label.dataset.state = state;
      }
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      ringX(e.clientX);
      ringY(e.clientY);
      labelX(e.clientX);
      labelY(e.clientY);
      if (!shown) {
        shown = true;
        gsap.set([ring, label], { x: e.clientX, y: e.clientY });
        html.dataset.pointerShown = "";
      }
      last.x = e.clientX;
      last.y = e.clientY;
      setState(e.target as Element | null);
    };
    // Scrolling slides content under a still pointer, so the state is re-read on scroll too.
    const onScroll = () => {
      if (shown) setState(document.elementFromPoint(last.x, last.y));
    };
    const hide = () => {
      shown = false;
      delete html.dataset.pointerShown;
    };
    const down = () => (ring.dataset.down = "");
    const up = () => delete ring.dataset.down;

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      delete html.dataset.pointer;
      delete html.dataset.pointerShown;
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={m.ring} data-state="idle" aria-hidden="true">
        <span />
      </div>
      <div ref={dotRef} className={m.dot} aria-hidden="true" />
      <div ref={labelRef} className={m.label} data-state="idle" aria-hidden="true">
        <span>{view}</span>
      </div>
    </>
  );
}

export function MotionLayer() {
  useSmoothScroll();
  useMagnetic();
  return (
    <>
      <Cursor />
      <div className={m.grain} aria-hidden="true" />
    </>
  );
}
