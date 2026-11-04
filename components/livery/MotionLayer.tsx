"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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

const WIPE_KEY = "rs_wipe";
const WIPE_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
const at = (x: string) => ({ transform: `translateX(${x}) skewX(-12deg)` });

/**
 * Page change: a raked garnet stripe sweeps across, the next page loads under it, and it
 * carries on off the other edge. Navigation is never held longer than the sweep in.
 */
function PageWipe() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Arriving under a wipe: finish the sweep before the first paint shows anything.
  useLayoutEffect(() => {
    const wipe = ref.current;
    let arriving = false;
    try {
      arriving = sessionStorage.getItem(WIPE_KEY) === "1";
      sessionStorage.removeItem(WIPE_KEY);
    } catch {}
    if (!wipe || !arriving || prefersReducedMotion()) return;
    wipe.animate([at("0%"), at("130%")], { duration: 460, delay: 80, easing: WIPE_EASE, fill: "forwards" });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let busy = false;
    const onClick = (e: MouseEvent) => {
      if (busy || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      // Stop here so the framework link does not navigate before the stripe has covered the page.
      e.preventDefault();
      e.stopPropagation();
      busy = true;
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      const sweep = ref.current?.animate([at("-130%"), at("0%")], { duration: 320, easing: WIPE_EASE, fill: "forwards" });
      const go = () => {
        try {
          sessionStorage.setItem(WIPE_KEY, "1");
        } catch {}
        router.push(href);
      };
      if (sweep) sweep.finished.then(go, go);
      else go();
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  return <div ref={ref} className={m.wipe} aria-hidden="true" />;
}

export function MotionLayer() {
  useSmoothScroll();
  useMagnetic();
  return (
    <>
      <PageWipe />
      <Cursor />
      <div className={m.grain} aria-hidden="true" />
    </>
  );
}
