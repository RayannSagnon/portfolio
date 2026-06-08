"use client";
import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    const rafFn = (time: number) => { lenis?.raf(time * 1000); };

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      (window as any).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
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