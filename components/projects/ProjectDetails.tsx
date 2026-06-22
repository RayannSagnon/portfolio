"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/content/projects";

type SectionConfig = {
  title: string;
  subtitle: string;
  rows: [string, string][];
  layout: "triple" | "duo" | "auto";
};

const LABEL_MARKS: Record<string, string> = {
  Decision: "◈",
  Tradeoff: "⇄",
  Constraint: "◫",
  Why: "→",
  Next: "⊕",
  MCU: "◎",
  Link: "⌁",
  Sense: "◉",
  Frame: "▣",
  Focus: "◎",
  Sources: "⌁",
  Privacy: "◫",
  Interface: "▤",
};

type Props = {
  project: Project;
};

function getSections(project: Project): SectionConfig[] {
  const sections: SectionConfig[] = [
    {
      title: "Architecture",
      subtitle: "System map",
      rows: project.architecture,
      layout: "auto",
    },
    {
      title: "Trade-offs",
      subtitle: "Engineering choices",
      rows: project.tradeoffs,
      layout: "triple",
    },
    {
      title: "Highlights",
      subtitle: "Product lens",
      rows: project.highlights,
      layout: "duo",
    },
  ];

  return sections.filter((section) => section.rows.length > 0);
}

export function ProjectDetails({ project }: Props) {
  const sections = getSections(project);
  if (!sections.length) return null;

  const hue = project.hue;

  return (
    <section
      className="project-details"
      aria-label={`${project.name} project details`}
      style={{
        ["--detail-accent" as string]: `hsl(${hue}, 62%, 58%)`,
        ["--detail-accent-soft" as string]: `hsla(${hue}, 55%, 52%, 0.16)`,
        ["--detail-accent-glow" as string]: `hsla(${hue}, 70%, 55%, 0.2)`,
        ["--detail-accent-border" as string]: `hsla(${hue}, 55%, 58%, 0.28)`,
        ["--detail-accent-chip-border" as string]: `hsla(${hue}, 50%, 52%, 0.22)`,
        ["--detail-accent-chip-bg" as string]: `hsla(${hue}, 45%, 48%, 0.1)`,
        ["--detail-accent-fade" as string]: `hsla(${hue}, 62%, 58%, 0.15)`,
      }}
    >
      <style>{`
        .project-details {
          display: flex;
          flex-direction: column;
          gap: clamp(3rem, 6vw, 5rem);
        }

        .project-details-block {
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 2.4vw, 1.75rem);
        }

        .project-details-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--line);
        }

        .project-details-title {
          font-family: var(--font-jetbrains), monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--fg-faint);
        }

        .project-details-subtitle {
          font-size: clamp(13px, 1.2vw, 15px);
          color: var(--fg-dim);
          font-weight: 300;
        }

        .project-details-grid {
          display: grid;
          gap: clamp(0.85rem, 1.6vw, 1rem);
        }

        .project-details-grid--triple {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .project-details-grid--duo {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .project-details-grid--auto {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .project-detail-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 11.5rem;
          padding: clamp(1.15rem, 2vw, 1.45rem);
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(circle at 100% 0%, var(--detail-accent-soft), transparent 42%),
            linear-gradient(160deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012));
          box-shadow: 0 18px 48px rgba(0,0,0,0.22);
          transition:
            transform 0.32s var(--ease),
            border-color 0.32s var(--ease),
            box-shadow 0.32s var(--ease);
        }

        .project-details-grid--duo .project-detail-card {
          min-height: 13.5rem;
        }

        .project-detail-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            var(--detail-accent),
            var(--detail-accent-fade)
          );
          opacity: 0.85;
        }

        .project-detail-card::after {
          content: "";
          position: absolute;
          inset: auto -20% -35% auto;
          width: 9rem;
          height: 9rem;
          border-radius: 50%;
          background: var(--detail-accent-glow);
          filter: blur(28px);
          opacity: 0.45;
          pointer-events: none;
        }

        .project-detail-card:hover {
          transform: translateY(-4px);
          border-color: var(--detail-accent-border);
          box-shadow:
            0 24px 56px rgba(0,0,0,0.28),
            0 0 32px var(--detail-accent-glow);
        }

        .project-detail-card-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.15rem;
        }

        .project-detail-card-index {
          font-family: var(--font-jetbrains), monospace;
          font-size: clamp(1.35rem, 2vw, 1.75rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: rgba(232,228,220,0.14);
        }

        .project-detail-card-label {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.34rem 0.62rem;
          border-radius: 999px;
          border: 1px solid var(--detail-accent-chip-border);
          background: var(--detail-accent-chip-bg);
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--detail-accent);
        }

        .project-detail-card-mark {
          font-size: 10px;
          line-height: 1;
          opacity: 0.9;
        }

        .project-detail-card-body {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: clamp(15px, 1.45vw, 18px);
          line-height: 1.45;
          letter-spacing: -0.02em;
          font-weight: 500;
          color: var(--fg);
          text-wrap: balance;
        }

        @media (max-width: 960px) {
          .project-details-grid--triple {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .project-details-grid--duo,
          .project-details-grid--auto {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {sections.map((section, sectionIndex) => (
        <div key={section.title} className="project-details-block">
          <div className="project-details-head">
            <span className="project-details-title">{section.title}</span>
            <span className="project-details-subtitle">{section.subtitle}</span>
          </div>

          <div className={`project-details-grid project-details-grid--${section.layout}`}>
            {section.rows.map(([label, value], index) => (
              <Reveal
                key={`${section.title}-${label}`}
                delay={sectionIndex * 80 + index * 90}
              >
                <article className="project-detail-card">
                  <div className="project-detail-card-top">
                    <span className="project-detail-card-index" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="project-detail-card-label">
                      <span className="project-detail-card-mark" aria-hidden>
                        {LABEL_MARKS[label] ?? "·"}
                      </span>
                      {label}
                    </span>
                  </div>
                  <p className="project-detail-card-body">{value}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
