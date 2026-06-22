"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { ProjectShowcaseData } from "@/content/projectShowcases";

type Props = {
  showcase: ProjectShowcaseData;
  hue: number;
  projectName: string;
};

export function ProjectShowcase({ showcase, hue, projectName }: Props) {
  const accent = `hsl(${hue}, 62%, 58%)`;
  const accentSoft = `hsla(${hue}, 55%, 52%, 0.14)`;
  const accentGlow = `hsla(${hue}, 70%, 55%, 0.22)`;

  return (
    <section
      className="project-showcase"
      aria-label={`${projectName} product showcase`}
      style={{
        ["--showcase-accent" as string]: accent,
        ["--showcase-accent-soft" as string]: accentSoft,
        ["--showcase-accent-glow" as string]: accentGlow,
      }}
    >
      <style>{`
        .project-showcase {
          display: flex;
          flex-direction: column;
          gap: clamp(2.5rem, 5vw, 4rem);
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
          border: 1px solid var(--showcase-accent-soft);
          background:
            radial-gradient(circle at 0% 50%, var(--showcase-accent-soft), transparent 68%),
            rgba(255,255,255,0.02);
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
          box-shadow: 0 0 10px var(--showcase-accent-glow);
        }

        .project-showcase-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: clamp(12px, 1.4vw, 18px);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0a0f18;
          box-shadow:
            0 28px 80px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 0 48px var(--showcase-accent-glow);
        }

        .project-showcase-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0) 62%,
            rgba(0,0,0,0.28) 100%
          );
          pointer-events: none;
        }

        .project-showcase-hero img {
          object-fit: cover;
          object-position: center;
        }

        .project-showcase-screens {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1.25rem, 2.4vw, 2rem);
        }

        .project-showcase-screen {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin: 0;
        }

        .project-showcase-screen-frame {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          min-height: clamp(18rem, 34vw, 28rem);
          padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.75rem) 0;
          border-radius: clamp(14px, 1.6vw, 20px);
          border: 1px solid rgba(255,255,255,0.07);
          background:
            radial-gradient(circle at 50% 0%, var(--showcase-accent-soft), transparent 58%),
            linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          box-shadow:
            0 18px 50px rgba(0,0,0,0.34),
            0 0 32px var(--showcase-accent-glow);
          overflow: hidden;
        }

        .project-showcase-screen-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.04) 0%,
            transparent 28%
          );
          pointer-events: none;
        }

        .project-showcase-screen--profile .project-showcase-screen-frame {
          align-items: center;
          padding-top: clamp(1.25rem, 2.4vw, 2rem);
        }

        .project-showcase-screen-image {
          position: relative;
          width: min(72%, 17rem);
          aspect-ratio: 519 / 1024;
          filter: drop-shadow(0 24px 40px rgba(0,0,0,0.42));
        }

        .project-showcase-screen--profile .project-showcase-screen-image {
          width: min(78%, 18rem);
          aspect-ratio: 614 / 1024;
        }

        .project-showcase-screen-image img {
          object-fit: contain;
          object-position: bottom center;
        }

        .project-showcase-screen-copy {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0 0.15rem;
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

        @media (max-width: 820px) {
          .project-showcase-screens {
            grid-template-columns: 1fr;
          }

          .project-showcase-screen-frame {
            min-height: clamp(16rem, 52vw, 22rem);
          }
        }
      `}</style>

      <div className="project-showcase-header">
        <span className="project-showcase-label">Product · Interface</span>
        <span className="project-showcase-status">{showcase.status}</span>
      </div>

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

      <div className="project-showcase-screens">
        {showcase.screens.map((screen, index) => (
          <Reveal key={screen.label} delay={120 + index * 120}>
            <figure
              className={`project-showcase-screen${
                index === 1 ? " project-showcase-screen--profile" : ""
              }`}
            >
              <div className="project-showcase-screen-frame">
                <div className="project-showcase-screen-image">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    sizes="(max-width: 820px) 72vw, 18rem"
                  />
                </div>
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
