"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CoverRevealProps = {
  cover: ReactNode;
  under: ReactNode;
  coverZ: number;
  underZ: number;
  coverBg?: string;
};

export function CoverReveal({
  cover,
  under,
  coverZ,
  underZ,
  coverBg = "var(--bg)",
}: CoverRevealProps) {
  const coverRef = useRef<HTMLDivElement>(null);
  const underRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const coverEl = coverRef.current;
    const underEl = underRef.current;
    if (!coverEl || !underEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        coverEl,
        { y: 0 },
        {
          y: () => -Math.min(coverEl.offsetHeight, window.innerHeight * 0.96),
          ease: "none",
          scrollTrigger: {
            trigger: coverEl,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        underEl,
        { y: 56 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: coverEl,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="cover-reveal">
      <style>{`
        .cover-reveal__cover {
          position: relative;
          will-change: transform;
          z-index: 2;
        }

        .cover-reveal__panel {
          margin-top: -24px;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          box-shadow: 0 -20px 56px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .cover-reveal__panel::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 48px;
          pointer-events: none;
          background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.22));
        }

        .cover-reveal__under {
          position: relative;
          margin-top: -72px;
          will-change: transform;
          z-index: 1;
        }
      `}</style>

      <div ref={coverRef} className="cover-reveal__cover" style={{ zIndex: coverZ }}>
        <div className="cover-reveal__panel" style={{ backgroundColor: coverBg }}>
          {cover}
        </div>
      </div>

      <div ref={underRef} className="cover-reveal__under" style={{ zIndex: underZ }}>
        {under}
      </div>
    </div>
  );
}
