"use client";
import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Always start at the top on (re)load so ScatterIntro is always visible
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    // Keep a stable reference so we can remove it on cleanup
    const rafFn = (time: number) => { lenis?.raf(time * 1000); };

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      // Expose globally so other components can stop/reset scroll
      (window as any).__lenis = lenis;
      // Bridge: every Lenis scroll tick updates GSAP ScrollTrigger positions
      lenis.on("scroll", ScrollTrigger.update);
      // Use GSAP's own ticker to drive Lenis (replaces the custom RAF loop)
      gsap.ticker.add(rafFn);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      lenis?.destroy();
      gsap.ticker.remove(rafFn);
    };
  }, []);

  return <>{children}</>;
}
