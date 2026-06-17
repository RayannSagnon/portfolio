"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { aboutTeaser, aboutTeaserTiles, type AboutTeaserTone } from "@/content/aboutTeaser";

const TILE_LAYOUT = [
  { column: "1 / span 3", row: "1 / span 2" },
  { column: "4 / span 2", row: "1 / span 3" },
  { column: "9 / span 4", row: "1 / span 2" },
  { column: "1 / span 2", row: "3 / span 3" },
  { column: "9 / span 4", row: "3 / span 3" },
  { column: "3 / span 3", row: "5 / span 2" },
  { column: "6 / span 3", row: "6 / span 2" },
  { column: "10 / span 3", row: "6 / span 2" },
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
          width: min(36rem, calc(100% - 3rem));
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .about-teaser-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows: repeat(7, minmax(84px, 1fr));
          gap: clamp(12px, 1vw, 18px);
          min-height: clamp(700px, 82vh, 920px);
        }

        .about-teaser-grid::before {
          content: "";
          position: absolute;
          inset: 7% 19% 12%;
          border: 1px solid rgba(232,228,220,0.06);
          pointer-events: none;
        }

        .about-teaser-grid::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 50%, rgba(8,8,8,0) 0%, rgba(8,8,8,0.12) 44%, rgba(8,8,8,0.62) 100%);
        }

        .about-teaser-tile {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid rgba(232,228,220,0.11);
          box-shadow: 0 28px 80px rgba(0,0,0,0.26);
          transition: transform 0.28s var(--ease), border-color 0.28s var(--ease), box-shadow 0.28s var(--ease);
          isolation: isolate;
        }

        .about-teaser-tile:hover {
          transform: translateY(-6px);
          border-color: rgba(214,173,114,0.24);
          box-shadow: 0 34px 92px rgba(0,0,0,0.34);
        }

        .about-teaser-tile::before {
          content: "";
          position: absolute;
          inset: 0.95rem;
          border: 1px solid rgba(232,228,220,0.08);
          pointer-events: none;
        }

        .about-teaser-tile::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(232,228,220,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,228,220,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.46;
          mask-image: linear-gradient(180deg, black, transparent 88%);
          pointer-events: none;
        }

        .about-teaser-photo {
          position: absolute;
          inset: 0;
        }

        .about-teaser-photo img {
          object-fit: cover;
          filter: saturate(0.88) contrast(1.02) brightness(0.84);
          opacity: 0.86;
        }

        .about-teaser-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(5,5,5,0.02) 0%, rgba(5,5,5,0.26) 48%, rgba(5,5,5,0.88) 100%);
          z-index: 1;
        }

        .about-teaser-copy {
          position: absolute;
          inset: auto 1.15rem 1.15rem 1.15rem;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .about-teaser-meta {
          color: rgba(232,228,220,0.54);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .about-teaser-title {
          color: var(--fg);
          font-size: clamp(1.3rem, 1.9vw, 2.2rem);
          line-height: 0.96;
          letter-spacing: 0;
          font-weight: 800;
        }

        .about-teaser-caption {
          color: var(--fg-dim);
          font-size: 0.98rem;
          line-height: 1.55;
          font-weight: 300;
          max-width: 26ch;
        }

        .about-teaser-card {
          position: relative;
          pointer-events: auto;
          padding: clamp(1.6rem, 2.5vw, 2.25rem);
          border-radius: 12px;
          border: 1px solid rgba(232,228,220,0.16);
          background:
            linear-gradient(145deg, rgba(138,42,58,0.12), transparent 42%),
            rgba(8,8,8,0.8);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 30px 100px rgba(0,0,0,0.42),
            0 0 40px rgba(138,42,58,0.12);
          text-align: center;
        }

        .about-teaser-card::before {
          content: "";
          position: absolute;
          inset: 1rem;
          border: 1px solid rgba(232,228,220,0.08);
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
          margin: 1.25rem 0 0;
          color: var(--fg);
          font-size: clamp(3.3rem, 5.7vw, 5.8rem);
          line-height: 0.9;
          letter-spacing: 0;
          font-weight: 900;
        }

        .about-teaser-card p {
          margin: 1.35rem auto 0;
          max-width: 34ch;
          color: var(--fg-dim);
          font-size: clamp(1rem, 1.15vw, 1.18rem);
          line-height: 1.65;
          font-weight: 300;
        }

        .about-teaser-kicker {
          color: var(--fg-faint);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        .about-teaser-cta {
          margin-top: 1.6rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          min-height: 3rem;
          padding: 0 1.2rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.16);
          background: rgba(255,255,255,0.025);
          color: var(--fg);
          text-decoration: none;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
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
            width: min(32rem, calc(100% - 2rem));
          }

          .about-teaser-grid {
            grid-template-columns: repeat(8, minmax(0, 1fr));
            grid-template-rows: repeat(10, minmax(74px, 1fr));
          }

          .about-teaser-grid::before {
            inset: 17% 12% 14%;
          }

          .about-teaser-tile {
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 15rem;
          }

          .about-teaser-tile:nth-child(1) { grid-column: 1 / span 4 !important; grid-row: 1 / span 2 !important; }
          .about-teaser-tile:nth-child(2) { grid-column: 5 / span 4 !important; grid-row: 1 / span 2 !important; }
          .about-teaser-tile:nth-child(3) { grid-column: 1 / span 3 !important; grid-row: 3 / span 2 !important; }
          .about-teaser-tile:nth-child(4) { grid-column: 6 / span 3 !important; grid-row: 3 / span 3 !important; }
          .about-teaser-tile:nth-child(5) { grid-column: 1 / span 3 !important; grid-row: 6 / span 2 !important; }
          .about-teaser-tile:nth-child(6) { grid-column: 6 / span 3 !important; grid-row: 6 / span 2 !important; }
          .about-teaser-tile:nth-child(7) { grid-column: 2 / span 3 !important; grid-row: 8 / span 2 !important; }
          .about-teaser-tile:nth-child(8) { grid-column: 5 / span 3 !important; grid-row: 8 / span 2 !important; }
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
                      <Image src={tile.src} alt={tile.alt ?? tile.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
                    </div>
                  ) : null}
                  <div className="about-teaser-overlay" />
                  <div className="about-teaser-copy">
                    <span className="about-teaser-meta">{tile.meta}</span>
                    <strong className="about-teaser-title">{tile.title}</strong>
                    <p className="about-teaser-caption">{tile.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
