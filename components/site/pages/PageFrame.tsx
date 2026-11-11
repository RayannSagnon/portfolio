"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SiteShell, TopNav, type NavKey } from "../Shell";
import p from "./pages.module.css";

/**
 * A plain, scrolling page in the site's world (Work, About, project stories): the same navigation, no deck.
 * Blocks marked data-show rise in once as they reach the screen.
 */
export function PageFrame({ active, children }: { active: NavKey; children: ReactNode }) {
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

  return (
    <SiteShell active={active}>
      <TopNav active={active} />
      <main ref={mainRef} className={p.page}>
        {children}
      </main>
    </SiteShell>
  );
}
