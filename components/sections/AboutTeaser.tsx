"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { aboutTeaser, aboutTeaserTiles, type AboutTeaserTone } from "@/content/aboutTeaser";

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

export function AboutTeaser() {
  return (
    <>
      <style>{`
        .about-teaser {
          min-height: clamp(860px, 112vh, 1160px);
          padding: 10vh 4vw;
          background:
            radial-gradient(circle at 82% 18%, rgba(138,42,58,0.18), transparent 28%),
            radial-gradient(circle at 14% 82%, rgba(214,173,114,0.06), transparent 24%);
        }

        .about-teaser-shell {
          position: relative;
          max-width: 1640px;
          min-height: clamp(700px, 82vh, 920px);
          margin: 0 auto;
        }

        .about-teaser-card-wrap {
          position: absolute;
          inset: 50% auto auto 50%;
          z-index: 3;
          width: min(28rem, calc(100% - 6rem));
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .about-teaser-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows: repeat(6, minmax(96px, 1fr));
          gap: clamp(3px, 0.35vw, 6px);
          min-height: clamp(700px, 82vh, 920px);
          border-radius: 14px;
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
          transition: transform 0.4s var(--ease), filter 0.4s var(--ease);
        }

        .about-teaser-tile:hover {
          transform: scale(1.015);
          z-index: 2;
        }

        .about-teaser-photo {
          position: absolute;
          inset: 0;
        }

        .about-teaser-photo img {
          object-fit: cover;
          filter: saturate(0.95) contrast(1.03) brightness(0.92);
        }

        .about-teaser-card {
          position: relative;
          pointer-events: auto;
          padding: clamp(1.2rem, 1.8vw, 1.5rem);
          border-radius: 16px;
          border: 1px solid rgba(232,228,220,0.12);
          background:
            radial-gradient(circle at 50% 0%, rgba(138,42,58,0.12), transparent 52%),
            linear-gradient(180deg, rgba(9,9,9,0.68), rgba(9,9,9,0.34));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            0 18px 54px rgba(0,0,0,0.28),
            0 0 24px rgba(138,42,58,0.08);
          text-align: center;
        }

        .about-teaser-card::before {
          content: "";
          position: absolute;
          inset: 0.8rem;
          border: 1px solid rgba(232,228,220,0.05);
          pointer-events: none;
        }

        .about-teaser-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .about-teaser-card h2 {
          margin: 0.8rem 0 0;
          color: var(--fg);
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          line-height: 0.92;
          letter-spacing: 0;
          font-weight: 900;
          text-wrap: balance;
        }

        .about-teaser-card p {
          margin: 0.95rem auto 0;
          max-width: 28ch;
          color: var(--fg-dim);
          font-size: clamp(0.96rem, 1vw, 1.04rem);
          line-height: 1.55;
          font-weight: 300;
          text-wrap: balance;
        }

        .about-teaser-kicker {
          color: var(--fg-faint);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.62rem;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .about-teaser-cta {
          margin-top: 1.15rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          min-height: 2.8rem;
          padding: 0 1rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.14);
          background: rgba(255,255,255,0.018);
          color: var(--fg);
          text-decoration: none;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.66rem;
          letter-spacing: 0;
          text-transform: uppercase;
          transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease), color 0.25s var(--ease);
        }

        .about-teaser-cta:hover,
        .about-teaser-cta:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(138,42,58,0.62);
          background: rgba(138,42,58,0.16);
          color: #fff;
          outline: none;
        }

        @media (max-width: 1100px) {
          .about-teaser {
            padding: 8rem 5vw;
          }

          .about-teaser-card-wrap {
            width: min(25rem, calc(100% - 3rem));
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
            padding: 6.5rem 6vw;
          }

          .about-teaser-shell {
            min-height: auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .about-teaser-card-wrap {
            position: relative;
            inset: auto;
            width: 100%;
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
            text-align: left;
          }

          .about-teaser-card h2,
          .about-teaser-card p {
            text-wrap: initial;
          }

          .about-teaser-card p {
            margin-left: 0;
            margin-right: 0;
            max-width: none;
          }
        }

        @media (max-width: 560px) {
          .about-teaser-grid {
            grid-template-columns: 1fr;
          }

          .about-teaser-card h2 {
            font-size: clamp(2.8rem, 13vw, 4rem);
          }
        }
      `}</style>

      <section id="about-teaser" data-section="PROFILE" data-num="02" className="about-teaser">
        <div className="about-teaser-shell">
          <div className="about-teaser-card-wrap">
            <Reveal delay={120}>
              <div className="about-teaser-card">
                <span className="about-teaser-eyebrow">{aboutTeaser.eyebrow}</span>
                <h2>{aboutTeaser.title}</h2>
                <p>{aboutTeaser.intro}</p>
                <Link href="/about" className="about-teaser-cta">
                  {aboutTeaser.ctaLabel}
                  <ArrowUpRight size={14} strokeWidth={1.6} />
                </Link>
                <p className="about-teaser-kicker">{aboutTeaser.kicker}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={40}>
            <div className="about-teaser-grid" aria-hidden="true">
              {aboutTeaserTiles.map((tile, index) => (
                <article
                  className="about-teaser-tile"
                  key={tile.title}
                  style={{
                    gridColumn: TILE_LAYOUT[index]?.column,
                    gridRow: TILE_LAYOUT[index]?.row,
                    background: toneBackground(tile.tone),
                  }}
                >
                  {tile.src ? (
                    <div className="about-teaser-photo">
                      <Image src={tile.src} alt={tile.alt ?? tile.title} fill sizes="(max-width: 760px) 50vw, 33vw" />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
