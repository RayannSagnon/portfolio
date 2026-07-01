"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { ProjectShowcaseData } from "@/content/projectShowcases";

type Props = {
  showcase: ProjectShowcaseData;
  hue: number;
  projectName: string;
  hideHero?: boolean;
};

export function ProjectShowcase({ showcase, hue, projectName, hideHero = false }: Props) {
  const accent = `hsl(${hue}, 62%, 58%)`;
  const accentSoft = `hsla(${hue}, 55%, 52%, 0.14)`;

  return (
    <section
      className="project-showcase"
      aria-label={`${projectName} product showcase`}
      style={{
        ["--showcase-accent" as string]: accent,
        ["--showcase-accent-soft" as string]: accentSoft,
      }}
    >
      <style>{`
        .project-showcase {
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vw, 2.25rem);
        }

        .project-showcase-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .project-showcase-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--fg-faint);
        }

        .project-showcase-status {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.38rem 0.72rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--showcase-accent);
        }

        .project-showcase-status::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--showcase-accent);
        }

        .project-showcase-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: clamp(12px, 1.4vw, 18px);
          overflow: hidden;
          background: #000;
        }

        .project-showcase-hero img {
          object-fit: cover;
          object-position: center;
        }

        .project-showcase-screens {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(1.25rem, 2.4vw, 2rem);
        }

        .project-showcase-screen {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin: 0;
          align-items: center;
        }

        .project-showcase-screen-media {
          width: 100%;
          max-width: min(100%, 22.5rem);
          background: transparent;
          line-height: 0;
          border-radius: 0;
          overflow: visible;
        }

        .project-showcase-screen-media img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 0;
        }

        .project-showcase-screen-copy {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0 0.15rem;
          width: 100%;
          max-width: min(100%, 22.5rem);
        }

        .project-showcase-screen-label {
          display: flex;
          align-items: baseline;
          gap: 0.65rem;
          font-family: var(--font-jetbrains), monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--showcase-accent);
        }

        .project-showcase-screen-label span {
          color: var(--fg-faint);
        }

        .project-showcase-screen-caption {
          max-width: 28ch;
          font-size: clamp(13px, 1.2vw, 15px);
          line-height: 1.55;
          color: var(--fg-dim);
          font-weight: 300;
        }

        @media (max-width: 1200px) {
          .project-showcase-screens {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .project-showcase {
            gap: 1.15rem;
          }

          .project-showcase-header {
            margin-bottom: 0.15rem;
          }

          .project-showcase-label {
            font-size: 0.58rem;
            letter-spacing: 0.2em;
          }

          .project-showcase-screens {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 0.85rem;
            margin: 0 calc(-1 * var(--section-pad-x));
            padding: 0 var(--section-pad-x) 0.35rem;
            scrollbar-width: none;
          }

          .project-showcase-screens::-webkit-scrollbar {
            display: none;
          }

          .project-showcase-screen {
            flex: 0 0 min(82vw, 20.5rem);
            scroll-snap-align: start;
            align-items: stretch;
            gap: 0.7rem;
            margin: 0;
          }

          .project-showcase-screen-media,
          .project-showcase-screen-copy {
            max-width: none;
            width: 100%;
          }

          .project-showcase-screen-copy {
            padding: 0 0.1rem;
            gap: 0.35rem;
          }

          .project-showcase-screen-label {
            font-size: 0.58rem;
            letter-spacing: 0.16em;
          }

          .project-showcase-screen-caption {
            max-width: none;
            font-size: 0.82rem;
            line-height: 1.52;
          }
        }
      `}</style>

      <div className="project-showcase-header">
        <span className="project-showcase-label">
          {hideHero ? "Screens · Product" : "Product · Interface"}
        </span>
        {!hideHero ? (
          <span className="project-showcase-status">{showcase.status}</span>
        ) : null}
      </div>

      {!hideHero ? (
        <Reveal>
          <div className="project-showcase-hero">
            <Image
              src={showcase.hero.src}
              alt={showcase.hero.alt}
              fill
              sizes="(max-width: 820px) 100vw, 84vw"
              priority
            />
          </div>
        </Reveal>
      ) : null}

      <div className="project-showcase-screens">
        {showcase.screens.map((screen, index) => (
          <Reveal key={screen.label} delay={120 + index * 120}>
            <figure className="project-showcase-screen">
              <div className="project-showcase-screen-media">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(max-width: 860px) 82vw, (max-width: 1100px) 50vw, 33vw"
                />
              </div>
              <figcaption className="project-showcase-screen-copy">
                <span className="project-showcase-screen-label">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {screen.label}
                </span>
                <p className="project-showcase-screen-caption">{screen.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
