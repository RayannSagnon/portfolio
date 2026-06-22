"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/content/projects";
import { projectReadmes } from "@/content/projectReadmes";

type Props = {
  project: Project;
};

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <section className="project-docs-section">
        <h2 className="project-docs-heading">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

export function ProjectDocs({ project }: Props) {
  const readme = projectReadmes[project.slug];
  const hue = project.hue;
  const accent = `hsl(${hue}, 62%, 58%)`;

  const tradeoffRows = project.tradeoffs;
  const architectureRows = project.architecture;
  const highlightRows = project.highlights;
  const hasLegacyDetails =
    architectureRows.length > 0 || highlightRows.length > 0;

  if (!readme && tradeoffRows.length === 0 && !hasLegacyDetails) return null;

  return (
    <div
      className="project-docs"
      style={{ ["--docs-accent" as string]: accent }}
      aria-label={`${project.name} documentation`}
    >
      <style>{`
        .project-docs {
          display: flex;
          flex-direction: column;
          gap: clamp(2.75rem, 5vw, 4rem);
          max-width: 52rem;
        }

        .project-docs-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-docs-heading {
          margin: 0;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid var(--line);
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--fg);
        }

        .project-docs-subheading {
          margin: 0.35rem 0 0;
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          font-weight: 600;
          color: var(--fg);
        }

        .project-docs-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .project-docs-badge {
          display: inline-flex;
          align-items: stretch;
          overflow: hidden;
          border-radius: 4px;
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-docs-badge-label {
          padding: 0.38rem 0.5rem;
          background: rgba(255,255,255,0.06);
          color: var(--fg-faint);
        }

        .project-docs-badge-value {
          padding: 0.38rem 0.55rem;
          background: rgba(255,255,255,0.03);
          color: var(--docs-accent);
        }

        .project-docs-body {
          margin: 0;
          font-size: clamp(15px, 1.35vw, 17px);
          line-height: 1.65;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .project-docs-list {
          margin: 0;
          padding-left: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.6;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .project-docs-list--ordered {
          list-style: decimal;
          padding-left: 1.35rem;
        }

        .project-docs-kv {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .project-docs-kv-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .project-docs-kv-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--docs-accent);
        }

        .project-docs-kv-value {
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.55;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .project-docs-code {
          margin: 0;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          font-family: var(--font-jetbrains), monospace;
          font-size: 12px;
          line-height: 1.5;
          color: var(--fg);
          overflow-x: auto;
          white-space: pre;
        }

        .project-docs-code-block {
          margin: 0;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          font-family: var(--font-jetbrains), monospace;
          font-size: 11px;
          line-height: 1.55;
          color: var(--fg-dim);
          overflow-x: auto;
          white-space: pre;
        }
      `}</style>

      {readme ? (
        <>
          <Reveal>
            <div className="project-docs-badges">
              {readme.badges.map((badge) => (
                <span key={badge.label} className="project-docs-badge">
                  <span className="project-docs-badge-label">{badge.label}</span>
                  <span className="project-docs-badge-value">{badge.value}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <Section title={readme.why.title} delay={60}>
            <p className="project-docs-body">{readme.why.body}</p>
          </Section>

          <Section title="Highlights" delay={120}>
            <ul className="project-docs-list">
              {readme.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Tech Stack" delay={180}>
            <ul className="project-docs-list">
              {readme.techStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Getting Started" delay={240}>
            <h3 className="project-docs-subheading">Prerequisites</h3>
            <ul className="project-docs-list">
              {readme.gettingStarted.prerequisites.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="project-docs-subheading">Run the app</h3>
            <ol className="project-docs-list project-docs-list--ordered">
              {readme.gettingStarted.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            {readme.gettingStarted.buildCommand ? (
              <>
                <h3 className="project-docs-subheading">Build</h3>
                <pre className="project-docs-code">
                  <code>{readme.gettingStarted.buildCommand}</code>
                </pre>
              </>
            ) : null}
          </Section>

          {readme.projectStructure ? (
            <Section title="Project Structure" delay={300}>
              <pre className="project-docs-code-block">
                <code>{readme.projectStructure}</code>
              </pre>
            </Section>
          ) : null}

          {readme.roadmap ? (
            <Section title="Roadmap" delay={360}>
              <ul className="project-docs-list">
                {readme.roadmap.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          ) : null}
        </>
      ) : null}

      {tradeoffRows.length > 0 ? (
        <Section title="Trade-offs" delay={readme ? 420 : 0}>
          <div className="project-docs-kv">
            {tradeoffRows.map(([label, value]) => (
              <div key={label} className="project-docs-kv-item">
                <span className="project-docs-kv-label">{label}</span>
                <span className="project-docs-kv-value">{value}</span>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {!readme && architectureRows.length > 0 ? (
        <Section title="Architecture" delay={60}>
          <div className="project-docs-kv">
            {architectureRows.map(([label, value]) => (
              <div key={label} className="project-docs-kv-item">
                <span className="project-docs-kv-label">{label}</span>
                <span className="project-docs-kv-value">{value}</span>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {!readme && highlightRows.length > 0 ? (
        <Section title="Highlights" delay={120}>
          <div className="project-docs-kv">
            {highlightRows.map(([label, value]) => (
              <div key={label} className="project-docs-kv-item">
                <span className="project-docs-kv-label">{label}</span>
                <span className="project-docs-kv-value">{value}</span>
              </div>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
