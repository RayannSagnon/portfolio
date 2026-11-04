"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion/gsap";
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
  return (
    <>
      <PageWipe />
    </>
  );
}
