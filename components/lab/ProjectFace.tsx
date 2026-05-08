"use client";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { CYLINDER_RADIUS } from "@/hooks/useLabCylinder";
import { PINGS } from "@/lib/sound";

type Props = {
  project: Project;
  idx: number;
  activeIdx: number;
  onClick: () => void;
};

export function ProjectFace({ project, idx, activeIdx, onClick }: Props) {
  const N = projects.length;
  const angle = (360 / N) * idx;
  const isActive = idx === activeIdx;
  const isAdjacent = Math.abs(((idx - activeIdx + N) % N + N) % N - N / 2) >= N / 2 - 1;

  const classes = [
    "face",
    isActive ? "active" : "",
    !isActive && isAdjacent ? "adjacent" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      role="button"
      aria-pressed={isActive}
      aria-label={project.name}
      tabIndex={isActive ? 0 : -1}
      className={classes}
      style={{
        transform: `rotateY(${angle}deg) translateZ(${CYLINDER_RADIUS}px)`,
      }}
      onClick={() => { onClick(); PINGS.click(); }}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { onClick(); PINGS.click(); } }}
    >
      {/* Corner brackets */}
      <div className="face-corner tl" aria-hidden />
      <div className="face-corner tr" aria-hidden />
      <div className="face-corner bl" aria-hidden />
      <div className="face-corner br" aria-hidden />

      <div className="face-inner">
      {/* Top row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: isActive ? "var(--accent)" : "var(--fg-faint)",
            transition: "color 0.6s var(--ease)",
          }}>
            NODE {String(idx + 1).padStart(2, "0")}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.15em",
          }}>
            {project.type.toUpperCase()}
          </span>
        </div>

        <div>
          <h3 style={{
            fontWeight: 700,
            fontSize: "clamp(18px, 2vw, 22px)",
            color: "var(--fg)",
            letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            {project.name}
          </h3>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, color: "var(--fg-faint)",
            letterSpacing: "0.1em", textTransform: "uppercase",
            marginTop: 6,
          }}>
            {project.tag}
          </p>
        </div>

        <div className="face-bar" />

        <p style={{
          fontSize: 12, color: "var(--fg-dim)",
          lineHeight: 1.65, fontWeight: 300,
        }}>
          {project.blurb}
        </p>
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {project.architecture.slice(0, 3).map(([label, val]) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
          }}>
            <span style={{ color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {label}
            </span>
            <span style={{ color: "var(--fg-dim)", maxWidth: "55%", textAlign: "right" }}>{val}</span>
          </div>
        ))}
      </div>
      </div>{/* .face-inner */}
    </div>
  );
}
