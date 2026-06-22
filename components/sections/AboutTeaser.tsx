"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aboutTeaser, aboutTeaserTiles, type AboutTeaserTone } from "@/content/aboutTeaser";

const TILE_STAGGER_MS = 220;
const TILE_FADE_S = 1.15;
const CARD_FADE_S = 1.25;
const CARD_EXTRA_DELAY_MS = 200;

// Full tessellation of a 12-col x 6-row grid: 3 equal columns, no holes, no gaps.
const TILE_LAYOUT = [
  { column: "1 / span 4", row: "1 / span 3" },
  { column: "5 / span 4", row: "1 / span 2" },
  { column: "9 / span 4", row: "1 / span 2" },
  { column: "5 / span 4", row: "3 / span 2" },
  { column: "9 / span 4", row: "3 / span 2" },
  { column: "1 / span 4", row: "4 / span 3" },
  { column: "5 / span 4", row: "5 / span 2" },
  { column: "9 / span 4", row: "5 / span 2" },
] as const;

function toneBackground(tone: AboutTeaserTone) {
  switch (tone) {
    case "ember":
      return `
        radial-gradient(circle at 76% 22%, rgba(138,42,58,0.26), transparent 34%),
        radial-gradient(circle at 16% 80%, rgba(214,173,114,0.10), transparent 28%),
        linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.012)),
        #090807
      `;
    case "bronze":
      return `
        radial-gradient(circle at 22% 18%, rgba(214,173,114,0.16), transparent 30%),
        radial-gradient(circle at 82% 78%, rgba(138,42,58,0.14), transparent 26%),
        linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)),
        #0a0908
      `;
    default:
      return `
        radial-gradient(circle at 68% 24%, rgba(255,255,255,0.07), transparent 28%),
        radial-gradient(circle at 22% 74%, rgba(138,42,58,0.12), transparent 30%),
        linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.008)),
        #080808
      `;
  }
}

type CtaRipple = {
  id: number;
  x: number;
  y: number;
};

function AboutTeaserCta({ label }: { label: string }) {
  const [ripples, setRipples] = useState<CtaRipple[]>([]);
  const [pulse, setPulse] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((current) => [
      ...current,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    setPulse(true);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 620);
    window.setTimeout(() => setPulse(false), 420);
  };

  return (
    <Link
      href="/about"
      className={`about-teaser-cta${pulse ? " is-pulse" : ""}`}
      onClick={handleClick}
    >
      <span className="about-teaser-cta-fill" aria-hidden />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="about-teaser-cta-ripple"
          style={{ left: ripple.x, top: ripple.y }}
          aria-hidden
        />
      ))}
      <span className="about-teaser-cta-label">{label}</span>
      <ArrowUpRight className="about-teaser-cta-icon" size={12} strokeWidth={1.6} />
    </Link>
  );
}

export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  const cardDelayMs = aboutTeaserTiles.length * TILE_STAGGER_MS + CARD_EXTRA_DELAY_MS;

  return (
    <>
      <style>{`
        .about-teaser {
          min-height: clamp(700px, 82vh, 920px);
          padding: 0;
          border-top: none;
          background:
            radial-gradient(circle at 82% 18%, rgba(138,42,58,0.18), transparent 28%),
            radial-gradient(circle at 14% 82%, rgba(214,173,114,0.06), transparent 24%);
        }

        .about-teaser-shell {
          position: relative;
          width: 100%;
          min-height: inherit;
        }

        .about-teaser-card-wrap {
          position: absolute;
          inset: 50% auto auto 50%;
          z-index: 8;
          width: min(21rem, calc(100% - 6rem));
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity calc(${CARD_FADE_S}s * var(--motion)) var(--ease-long);
          transition-delay: var(--card-fade-delay, 0ms);
        }

        .about-teaser.is-visible .about-teaser-card-wrap {
          opacity: 1;
        }

        .about-teaser-grid-wrap {
          width: 100%;
          min-height: inherit;
        }

        .about-teaser-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows: repeat(6, minmax(96px, 1fr));
          gap: clamp(3px, 0.35vw, 6px);
          width: 100%;
          min-height: inherit;
          border-radius: 0;
          overflow: hidden;
        }

        .about-teaser-grid::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background:
            radial-gradient(ellipse 42% 40% at 50% 50%, rgba(6,6,6,0.78) 0%, rgba(6,6,6,0.34) 46%, rgba(6,6,6,0) 72%),
            radial-gradient(circle at 50% 50%, rgba(6,6,6,0) 58%, rgba(6,6,6,0.42) 100%);
        }

        .about-teaser-tile {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          opacity: 0;
          transition:
            opacity calc(${TILE_FADE_S}s * var(--motion)) var(--ease-long),
            box-shadow 0.4s var(--ease);
          transition-delay: var(--tile-fade-delay, 0ms);
        }

        .about-teaser.is-visible .about-teaser-tile {
          opacity: 1;
        }

        .about-teaser:not(.is-visible) .about-teaser-tile,
        .about-teaser:not(.is-visible) .about-teaser-card-wrap {
          transition-duration: calc(0.28s * var(--motion));
          transition-delay: 0ms !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-teaser-tile,
          .about-teaser-card-wrap {
            transition-delay: 0ms !important;
          }
        }

        .about-teaser-photo {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .about-teaser-photo-frame {
          position: absolute;
          inset: 0;
        }

        .about-teaser-photo-frame[data-zoom] {
          width: calc(100% / var(--tile-zoom));
          height: calc(100% / var(--tile-zoom));
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .about-teaser-photo img {
          object-fit: cover;
          object-position: var(--tile-focus, center);
          transform: scale(1.02);
          filter: saturate(0.95) contrast(1.03) brightness(0.9);
          transition: transform 0.55s var(--ease), filter 0.55s var(--ease);
        }

        /* ENDLESS-style focus reveal: the whole grid stays blurred and dim,
           and only the hovered tile sharpens and lifts above the scrim.
           Restricted to devices with a real hover pointer so touch screens
           still show crisp images. */
        @media (hover: hover) and (pointer: fine) {
          .about-teaser-photo img {
            transform: scale(1.04);
            filter: blur(7px) saturate(0.68) brightness(0.52);
          }

          .about-teaser-tile:hover {
            z-index: 5;
            box-shadow: 0 30px 84px rgba(0,0,0,0.52);
          }

          .about-teaser-tile:hover .about-teaser-photo img {
            transform: scale(1.02);
            filter: blur(0) saturate(1.06) contrast(1.05) brightness(1.05);
          }
        }

        .about-teaser-card {
          position: relative;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          padding: clamp(1rem, 1.4vw, 1.25rem) clamp(1rem, 1.6vw, 1.35rem);
          border-radius: 14px;
          border: 1px solid rgba(232,228,220,0.12);
          background:
            radial-gradient(circle at 50% 0%, rgba(138,42,58,0.12), transparent 52%),
            linear-gradient(180deg, rgba(9,9,9,0.68), rgba(9,9,9,0.34));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            0 14px 40px rgba(0,0,0,0.24),
            0 0 18px rgba(138,42,58,0.08);
          text-align: center;
        }

        .about-teaser-card::before {
          content: "";
          position: absolute;
          inset: 0.55rem;
          border: 1px solid rgba(232,228,220,0.05);
          pointer-events: none;
        }

        .about-teaser-card h2 {
          margin: 0;
          color: var(--fg);
          font-size: clamp(1.45rem, 2.4vw, 2rem);
          line-height: 1.08;
          letter-spacing: 0;
          font-weight: 900;
          text-wrap: balance;
          text-align: center;
        }

        .about-teaser-cta {
          position: relative;
          margin-top: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 2.35rem;
          padding: 0 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.14);
          background: rgba(255,255,255,0.018);
          color: var(--fg);
          text-decoration: none;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.6rem;
          letter-spacing: 0;
          text-transform: uppercase;
          overflow: hidden;
          isolation: isolate;
          transition:
            transform 0.28s var(--ease),
            border-color 0.28s var(--ease),
            color 0.28s var(--ease),
            box-shadow 0.28s var(--ease);
        }

        .about-teaser-cta-fill {
          position: absolute;
          inset: auto 0 0;
          z-index: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(180deg, #b54858 0%, #8a2a3a 58%, #6d2130 100%);
          transition: height 0.62s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .about-teaser-cta-fill::before {
          content: "";
          position: absolute;
          top: -11px;
          left: -24%;
          width: 148%;
          height: 24px;
          background: #b54858;
          border-radius: 46% 54% 42% 58% / 72% 58% 42% 28%;
          opacity: 0;
          transition: opacity 0.28s ease 0.12s;
          animation: about-teaser-liquid-wave 2.6s ease-in-out infinite;
        }

        .about-teaser-cta-label,
        .about-teaser-cta-icon {
          position: relative;
          z-index: 1;
          transition: color 0.28s var(--ease), transform 0.28s var(--ease);
        }

        .about-teaser-cta-ripple {
          position: absolute;
          z-index: 2;
          width: 0.65rem;
          height: 0.65rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.42);
          transform: translate(-50%, -50%) scale(0);
          animation: about-teaser-cta-ripple 0.58s ease-out forwards;
          pointer-events: none;
        }

        @keyframes about-teaser-liquid-wave {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
            border-radius: 46% 54% 42% 58% / 72% 58% 42% 28%;
          }
          50% {
            transform: translateX(-7%) rotate(-2deg);
            border-radius: 54% 46% 58% 42% / 38% 62% 48% 52%;
          }
        }

        @keyframes about-teaser-cta-ripple {
          to {
            transform: translate(-50%, -50%) scale(7);
            opacity: 0;
          }
        }

        @keyframes about-teaser-cta-ring {
          from {
            transform: scale(0.92);
            opacity: 0.85;
          }
          to {
            transform: scale(1.22);
            opacity: 0;
          }
        }

        .about-teaser-cta:hover,
        .about-teaser-cta:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(163,63,77,0.72);
          color: #fff;
          box-shadow: 0 10px 28px rgba(138,42,58,0.28);
          outline: none;
        }

        .about-teaser-cta:hover .about-teaser-cta-fill,
        .about-teaser-cta:focus-visible .about-teaser-cta-fill {
          height: 100%;
        }

        .about-teaser-cta:hover .about-teaser-cta-fill::before,
        .about-teaser-cta:focus-visible .about-teaser-cta-fill::before {
          opacity: 1;
        }

        .about-teaser-cta:hover .about-teaser-cta-icon,
        .about-teaser-cta:focus-visible .about-teaser-cta-icon {
          transform: translate(1px, -1px);
        }

        .about-teaser-cta:active {
          transform: translateY(0) scale(0.95);
          box-shadow: 0 4px 14px rgba(138,42,58,0.22);
        }

        .about-teaser-cta.is-pulse::after {
          content: "";
          position: absolute;
          inset: -3px;
          border: 1px solid rgba(214,173,114,0.72);
          border-radius: 999px;
          pointer-events: none;
          animation: about-teaser-cta-ring 0.42s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-teaser-cta-fill,
          .about-teaser-cta-fill::before,
          .about-teaser-cta-ripple,
          .about-teaser-cta.is-pulse::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }

          .about-teaser-cta:hover .about-teaser-cta-fill,
          .about-teaser-cta:focus-visible .about-teaser-cta-fill {
            height: 100%;
          }
        }

        @media (max-width: 1100px) {
          .about-teaser-card-wrap {
            width: min(19rem, calc(100% - 3rem));
          }

          .about-teaser-grid {
            grid-template-columns: repeat(8, minmax(0, 1fr));
            grid-template-rows: repeat(8, minmax(70px, 1fr));
          }

          .about-teaser-tile {
            grid-column: auto !important;
            grid-row: auto !important;
          }

          .about-teaser-tile:nth-child(1) { grid-column: 1 / span 4 !important; grid-row: 1 / span 2 !important; }
          .about-teaser-tile:nth-child(2) { grid-column: 5 / span 4 !important; grid-row: 1 / span 2 !important; }
          .about-teaser-tile:nth-child(3) { grid-column: 1 / span 4 !important; grid-row: 3 / span 2 !important; }
          .about-teaser-tile:nth-child(4) { grid-column: 5 / span 4 !important; grid-row: 3 / span 2 !important; }
          .about-teaser-tile:nth-child(5) { grid-column: 1 / span 4 !important; grid-row: 5 / span 2 !important; }
          .about-teaser-tile:nth-child(6) { grid-column: 5 / span 4 !important; grid-row: 5 / span 2 !important; }
          .about-teaser-tile:nth-child(7) { grid-column: 1 / span 4 !important; grid-row: 7 / span 2 !important; }
          .about-teaser-tile:nth-child(8) { grid-column: 5 / span 4 !important; grid-row: 7 / span 2 !important; }
        }

        @media (max-width: 760px) {
          .about-teaser {
            min-height: auto;
          }

          .about-teaser-shell {
            min-height: auto;
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          .about-teaser-card-wrap {
            position: relative;
            inset: auto;
            width: min(20rem, calc(100% - 2rem));
            margin: 0 auto;
            padding: 2.5rem 0 1.5rem;
            transform: none;
            order: 1;
          }

          .about-teaser-grid {
            order: 2;
            min-height: auto;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
            grid-auto-rows: minmax(14rem, auto);
          }

          .about-teaser-grid::before,
          .about-teaser-grid::after {
            display: none;
          }

          .about-teaser-tile {
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 16rem;
          }

          .about-teaser-card {
            text-align: center;
          }

          .about-teaser-card h2 {
            text-wrap: balance;
          }
        }

        @media (max-width: 560px) {
          .about-teaser-grid {
            grid-template-columns: 1fr;
          }

          .about-teaser-card h2 {
            font-size: clamp(1.55rem, 6.5vw, 1.95rem);
          }
        }
      `}</style>

      <section ref={sectionRef} id="about-teaser" data-section="PROFILE" data-num="02" className="about-teaser">
        <div className="about-teaser-shell">
          <div
            className="about-teaser-card-wrap"
            style={{ "--card-fade-delay": `${cardDelayMs}ms` } as CSSProperties}
          >
            <div className="about-teaser-card">
              <h2>{aboutTeaser.title}</h2>
              <AboutTeaserCta label={aboutTeaser.ctaLabel} />
            </div>
          </div>

          <div className="about-teaser-grid-wrap">
            <div className="about-teaser-grid" aria-hidden="true">
              {aboutTeaserTiles.map((tile, index) => (
                <article
                  className="about-teaser-tile"
                  key={tile.title}
                  style={{
                    gridColumn: TILE_LAYOUT[index]?.column,
                    gridRow: TILE_LAYOUT[index]?.row,
                    background: toneBackground(tile.tone),
                    "--tile-fade-delay": `${index * TILE_STAGGER_MS}ms`,
                    ...(tile.focus ? { "--tile-focus": tile.focus } : {}),
                  } as CSSProperties}
                >
                  {tile.src ? (
                    <div className="about-teaser-photo">
                      <div
                        className="about-teaser-photo-frame"
                        data-zoom={tile.zoom ? "" : undefined}
                        style={
                          tile.zoom
                            ? ({ "--tile-zoom": tile.zoom } as CSSProperties)
                            : undefined
                        }
                      >
                        <Image
                          src={tile.src}
                          alt={tile.alt ?? tile.title}
                          fill
                          sizes="(max-width: 760px) 50vw, 33vw"
                          style={
                            tile.focus
                              ? { objectFit: "cover", objectPosition: tile.focus }
                              : { objectFit: "cover" }
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
