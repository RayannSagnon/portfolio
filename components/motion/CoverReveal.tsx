"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CoverRevealProps = {
  cover: ReactNode;
  under: ReactNode;
  coverZ: number;
  underZ: number;
  /** How far to scroll while the cover stays pinned (revealing the layer below) */
  revealVh?: number;
  coverBg?: string;
};

export function CoverReveal({
  cover,
  under,
  coverZ,
  underZ,
  revealVh = 0.75,
  coverBg = "var(--bg)",
}: CoverRevealProps) {
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const coverEl = coverRef.current;
    if (!coverEl) return;

    const trigger = ScrollTrigger.create({
      trigger: coverEl,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * revealVh)}`,
      pin: coverEl,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);

    return () => {
      window.removeEventListener("resize", onRefresh);
      trigger.kill();
      ScrollTrigger.refresh();
    };
  }, [revealVh]);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="cover-reveal">
      <style>{`
        .cover-reveal__cover {
          position: relative;
          will-change: transform;
          isolation: isolate;
        }

        .cover-reveal__panel {
          margin-top: -24px;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          min-height: 100svh;
          box-shadow: 0 -20px 56px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 2;
        }

        .cover-reveal__under {
          position: relative;
          margin-top: -24px;
          z-index: 1;
        }
      `}</style>

      <div ref={coverRef} className="cover-reveal__cover" style={{ zIndex: coverZ }}>
        <div className="cover-reveal__panel" style={{ backgroundColor: coverBg }}>
          {cover}
        </div>
      </div>

      <div className="cover-reveal__under" style={{ zIndex: underZ }}>
        {under}
      </div>
    </div>
  );
}
