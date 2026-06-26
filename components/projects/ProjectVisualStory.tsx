"use client";

import {
  BookOpen,
  CheckSquare,
  Cloud,
  Database,
  Layers,
  LayoutDashboard,
  Smartphone,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { ProjectStoryData, StoryIcon } from "@/content/projectStories";

const iconMap: Record<StoryIcon, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "book-open": BookOpen,
  timer: Timer,
  "check-square": CheckSquare,
  layers: Layers,
  smartphone: Smartphone,
  database: Database,
  cloud: Cloud,
};

type Props = {
  story: ProjectStoryData;
  hue: number;
  projectName: string;
};

function StoryHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="project-story-heading">
      <h2 className="project-story-title">{title}</h2>
      <p className="project-story-subtitle">{subtitle}</p>
    </header>
  );
}

function HubDiagram({
  modules,
  accent,
}: {
  modules: ProjectStoryData["what"]["modules"];
  accent: string;
}) {
  const positions = [
    { x: 50, y: 14 },
    { x: 14, y: 50 },
    { x: 86, y: 50 },
    { x: 50, y: 86 },
  ];

  return (
    <div className="project-story-hub" aria-hidden>
      <svg className="project-story-hub-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {positions.map((pos, index) => (
          <line
            key={modules[index]?.label ?? index}
            x1="50"
            y1="50"
            x2={pos.x}
            y2={pos.y}
            stroke={accent}
            strokeOpacity="0.35"
            strokeWidth="0.35"
          />
        ))}
        <circle cx="50" cy="50" r="10" fill="rgba(255,255,255,0.04)" stroke={accent} strokeOpacity="0.55" strokeWidth="0.4" />
      </svg>

      <div className="project-story-hub-core">
        <Smartphone size={22} strokeWidth={1.5} />
        <span>StudentOS</span>
      </div>

      {modules.map((module, index) => {
        const Icon = iconMap[module.icon];
        const pos = positions[index];
        return (
          <div
            key={module.label}
            className="project-story-hub-node"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
          >
            <div className="project-story-hub-node-icon">
              <Icon size={16} strokeWidth={1.55} />
            </div>
            <span className="project-story-hub-node-label">{module.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function MetricBars({
  metrics,
  beforeLabel,
  afterLabel,
}: Pick<ProjectStoryData["why"], "metrics" | "beforeLabel" | "afterLabel">) {
  return (
    <div className="project-story-metrics">
      <div className="project-story-metrics-legend">
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>
      {metrics.map((metric) => (
        <div key={metric.label} className="project-story-metric">
          <div className="project-story-metric-head">
            <span>{metric.label}</span>
            <span>
              {metric.after}
              {metric.unit ?? ""}
            </span>
          </div>
          <div className="project-story-metric-track">
            <div
              className="project-story-metric-bar project-story-metric-bar--before"
              style={{ width: `${metric.before}%` }}
            />
            <div
              className="project-story-metric-bar project-story-metric-bar--after"
              style={{ width: `${metric.after}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectVisualStory({ story, hue, projectName }: Props) {
  const accent = `hsl(${hue}, 62%, 58%)`;
  const accentSoft = `hsla(${hue}, 55%, 52%, 0.16)`;
  const accentGlow = `hsla(${hue}, 62%, 58%, 0.28)`;

  return (
    <section
      className="project-story"
      aria-label={`${projectName} visual overview`}
      style={{
        ["--story-accent" as string]: accent,
        ["--story-accent-soft" as string]: accentSoft,
        ["--story-accent-glow" as string]: accentGlow,
      }}
    >
      <style>{`
        .project-story {
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 4vw, 3rem);
        }

        .project-story-block {
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 2.5vw, 1.75rem);
        }

        .project-story-heading {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          max-width: 42rem;
        }

        .project-story-title {
          margin: 0;
          font-size: clamp(1.75rem, 3.4vw, 2.65rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--fg);
        }

        .project-story-subtitle {
          margin: 0;
          font-size: clamp(15px, 1.45vw, 18px);
          line-height: 1.6;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .project-story-panel {
          border: 1px solid var(--line);
          border-radius: 14px;
          background:
            radial-gradient(circle at 82% 12%, var(--story-accent-soft), transparent 34%),
            rgba(255,255,255,0.018);
          padding: clamp(1.1rem, 2.2vw, 1.6rem);
        }

        .project-story-what-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(1rem, 2vw, 1.5rem);
          align-items: stretch;
        }

        .project-story-hub {
          position: relative;
          min-height: clamp(260px, 34vw, 360px);
          border-radius: 12px;
          background:
            radial-gradient(circle at 50% 50%, var(--story-accent-soft), transparent 62%),
            rgba(0,0,0,0.35);
          overflow: hidden;
        }

        .project-story-hub-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .project-story-hub-core {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 0.85rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(7,7,7,0.82);
          color: var(--fg);
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          box-shadow: 0 0 28px var(--story-accent-glow);
        }

        .project-story-hub-node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          width: 6.5rem;
          text-align: center;
        }

        .project-story-hub-node-icon {
          display: grid;
          place-items: center;
          width: 2.35rem;
          height: 2.35rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: var(--story-accent);
        }

        .project-story-hub-node-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-dim);
        }

        .project-story-module-list {
          display: grid;
          gap: 0.7rem;
        }

        .project-story-module {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.8rem;
          align-items: start;
          padding: 0.8rem 0.9rem;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .project-story-module-icon {
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          border-radius: 8px;
          background: var(--story-accent-soft);
          color: var(--story-accent);
        }

        .project-story-module h3 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--fg);
        }

        .project-story-module p {
          margin: 0.2rem 0 0;
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .project-story-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.65rem;
          margin-top: 0.85rem;
        }

        .project-story-stat {
          padding: 0.8rem 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          text-align: center;
        }

        .project-story-stat strong {
          display: block;
          font-size: clamp(1.35rem, 2.4vw, 1.85rem);
          font-weight: 800;
          color: var(--story-accent);
          line-height: 1;
        }

        .project-story-stat span {
          display: block;
          margin-top: 0.35rem;
          font-family: var(--font-jetbrains), monospace;
          font-size: 7px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-faint);
        }

        .project-story-why-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .project-story-chaos {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .project-story-chaos-label,
        .project-story-hub-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--fg-faint);
        }

        .project-story-tab-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .project-story-tab {
          padding: 0.38rem 0.55rem;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-faint);
        }

        .project-story-tab-cloud--after {
          min-height: 7.5rem;
          align-content: center;
          justify-content: center;
        }

        .project-story-tab--hero {
          padding: 0.7rem 1rem;
          border-color: rgba(255,255,255,0.16);
          background:
            radial-gradient(circle at 50% 50%, var(--story-accent-soft), rgba(255,255,255,0.03));
          color: var(--fg);
          font-size: 9px;
          box-shadow: 0 0 24px var(--story-accent-glow);
        }

        .project-story-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .project-story-metrics-legend {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-family: var(--font-jetbrains), monospace;
          font-size: 7px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-faint);
        }

        .project-story-metric-head {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.45rem;
          font-size: 0.84rem;
          color: var(--fg-dim);
        }

        .project-story-metric-head span:last-child {
          color: var(--story-accent);
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .project-story-metric-track {
          position: relative;
          height: 0.55rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          overflow: hidden;
        }

        .project-story-metric-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          border-radius: inherit;
        }

        .project-story-metric-bar--before {
          background: rgba(255,255,255,0.12);
          opacity: 0.55;
        }

        .project-story-metric-bar--after {
          background: var(--story-accent);
          box-shadow: 0 0 16px var(--story-accent-glow);
        }

        .project-story-how-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .project-story-stack {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .project-story-layer {
          position: relative;
          padding: 0.85rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
        }

        .project-story-layer::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65rem;
          bottom: 0.65rem;
          width: 3px;
          border-radius: 999px;
          background: var(--story-accent);
        }

        .project-story-layer-label {
          display: block;
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--fg);
        }

        .project-story-layer-detail {
          display: block;
          margin-top: 0.25rem;
          font-size: 0.84rem;
          line-height: 1.5;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .project-story-timeline {
          display: grid;
          gap: 0.7rem;
        }

        .project-story-phase {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.85rem;
          padding: 0.85rem 0.95rem;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }

        .project-story-phase-step {
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.14em;
          color: var(--story-accent);
          padding-top: 0.15rem;
        }

        .project-story-phase h3 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--fg);
        }

        .project-story-phase p {
          margin: 0.3rem 0 0;
          font-size: 0.86rem;
          line-height: 1.55;
          color: var(--fg-dim);
          font-weight: 300;
        }

        @media (max-width: 900px) {
          .project-story-what-grid,
          .project-story-why-grid,
          .project-story-how-grid {
            grid-template-columns: 1fr;
          }

          .project-story-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--mobile-dense-gap);
          }
        }

        @media (max-width: 360px) {
          .project-story-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Reveal>
        <article className="project-story-block">
          <StoryHeading title={story.what.title} subtitle={story.what.subtitle} />
          <div className="project-story-panel project-story-what-grid">
            <HubDiagram modules={story.what.modules} accent={accent} />
            <div>
              <div className="project-story-module-list">
                {story.what.modules.map((module) => {
                  const Icon = iconMap[module.icon];
                  return (
                    <div key={module.label} className="project-story-module">
                      <div className="project-story-module-icon">
                        <Icon size={15} strokeWidth={1.55} />
                      </div>
                      <div>
                        <h3>{module.label}</h3>
                        <p>{module.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="project-story-stats">
                {story.what.stats.map((stat) => (
                  <div key={stat.label} className="project-story-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      <Reveal delay={80}>
        <article className="project-story-block">
          <StoryHeading title={story.why.title} subtitle={story.why.subtitle} />
          <div className="project-story-panel project-story-why-grid">
            <div className="project-story-chaos">
              <span className="project-story-chaos-label">{story.why.beforeLabel}</span>
              <div className="project-story-tab-cloud">
                {story.why.chaosTabs.map((tab) => (
                  <span key={tab} className="project-story-tab">
                    {tab}
                  </span>
                ))}
              </div>
              <span className="project-story-hub-label">{story.why.afterLabel}</span>
              <div className="project-story-tab-cloud project-story-tab-cloud--after">
                <span className="project-story-tab project-story-tab--hero">StudentOS</span>
              </div>
            </div>
            <MetricBars
              metrics={story.why.metrics}
              beforeLabel={story.why.beforeLabel}
              afterLabel={story.why.afterLabel}
            />
          </div>
        </article>
      </Reveal>

      <Reveal delay={140}>
        <article className="project-story-block">
          <StoryHeading title={story.how.title} subtitle={story.how.subtitle} />
          <div className="project-story-panel project-story-how-grid">
            <div className="project-story-stack" aria-label="Architecture layers">
              {story.how.layers.map((layer) => (
                <div key={layer.label} className="project-story-layer">
                  <span className="project-story-layer-label">{layer.label}</span>
                  <span className="project-story-layer-detail">{layer.detail}</span>
                </div>
              ))}
            </div>
            <div className="project-story-timeline">
              {story.how.phases.map((phase) => (
                <div key={phase.step} className="project-story-phase">
                  <span className="project-story-phase-step">{phase.step}</span>
                  <div>
                    <h3>{phase.title}</h3>
                    <p>{phase.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
