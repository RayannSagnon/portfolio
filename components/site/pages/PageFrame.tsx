"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SiteShell, TopNav, type NavKey } from "../Shell";
import p from "./pages.module.css";

/**
 * A plain, scrolling page in the site's world (Work, About, project stories): the same navigation, no deck.
 * Blocks marked data-show rise in once as they reach the screen.
 */
export function PageFrame({ active, children, flush = false }: { active: NavKey; children: ReactNode; flush?: boolean }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    main.setAttribute("data-motion", "");
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          seen.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    main.querySelectorAll("[data-show]").forEach((el) => seen.observe(el));
    return () => seen.disconnect();
  }, []);

  // The four LEDs beside the initials come on as the page goes by, like the tachometer.
  useEffect(() => {
    const leds = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-led]"));
    let ticking = false;
    const draw = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const level = max > 0 ? (window.scrollY / max) * 5 : 0;
      leds.forEach((led, n) => led.toggleAttribute("data-on", level >= n + 1));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SiteShell active={active}>
      <TopNav active={active} />
      <main ref={mainRef} className={flush ? `${p.page} ${p.flush}` : p.page}>
        {children}
      </main>
    </SiteShell>
  );
}
