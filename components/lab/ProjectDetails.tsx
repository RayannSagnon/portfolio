"use client";
import Link from "next/link";
import type { Project } from "@/content/projects";

type Props = { project: Project; onEnter: () => void };

export function ProjectDetails({ project, onEnter }: Props) {
  return (
    <div style={{
      width: "100%",
      display: "flex", flexDirection: "column", gap: 24,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {/* Code + type */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 9, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {project.code} · {project.type}
        </span>
        <h3 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)",
          color: "var(--fg)", letterSpacing: "-0.03em", lineHeight: 1.05,
        }}>
          {project.name}
        </h3>
        <p style={{ fontSize: 9, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {project.tag}
        </p>
      </div>

      {/* Architecture table */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Architecture
        </span>
        {project.architecture.map(([label, val]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {label}
            </span>
            <span style={{ fontSize: 10, color: "var(--fg-dim)" }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Tradeoffs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Trade-offs
        </span>
        {project.tradeoffs.slice(0, 2).map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 8, fontSize: 10, color: "var(--fg-dim)" }}>
            <span style={{ color: "var(--fg-faint)", flexShrink: 0 }}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={onEnter}
          style={{
            background: "none", border: "1px solid var(--accent)",
            color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "10px 16px", cursor: "pointer",
            transition: "background 0.3s var(--ease), color 0.3s var(--ease)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--fg)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--accent)"; }}
        >
          Enter system →
        </button>
        <Link
          href={`/projects/${project.slug}`}
          style={{
            fontSize: 9, color: "var(--fg-faint)",
            letterSpacing: "0.15em", textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.3s var(--ease)",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--fg-dim)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-faint)")}
        >
          Full case study ↗
        </Link>
      </div>
    </div>
  );
}
