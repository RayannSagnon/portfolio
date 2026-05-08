"use client";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";

const typeLabel: Record<string, string> = {
  software:    "Software",
  embedded:    "Embedded",
  ai:          "AI / ML",
  hardware:    "Hardware",
  speculative: "Speculative",
};

export function EngineeringSystems() {
  return (
    <section
      id="lab"
      data-section="LAB"
      data-num="05"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "8vh" }}
    >
      <Reveal>
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.2em", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ width: 28, height: 1, background: "var(--accent)", display: "inline-block" }} aria-hidden />
              CH.05 · ENGINEERING SYSTEMS
            </div>
            <h2 style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 5.5vw, 80px)",
              lineHeight: 0.9, letterSpacing: "-0.04em",
              color: "var(--fg)", maxWidth: 700,
            }}>
              Systems built from<br />
              <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>
                the ground up.
              </em>
            </h2>
          </div>
        </div>
      </Reveal>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 2,
      }}>
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60}>
            <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div
                style={{
                  padding: "32px 28px",
                  border: "1px solid var(--line)",
                  display: "flex", flexDirection: "column", gap: 20,
                  cursor: "pointer",
                  transition: "border-color 0.3s var(--ease), background 0.3s var(--ease)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--line-strong)";
                  e.currentTarget.style.background = "rgba(232,228,220,0.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: "var(--fg-faint)",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                  }}>
                    {p.code}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: "var(--accent)",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    border: "1px solid var(--accent-soft)",
                    padding: "3px 8px",
                  }}>
                    {typeLabel[p.type] ?? p.type}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    color: "var(--fg)",
                    letterSpacing: "-0.03em",
                  }}>
                    {p.name}
                  </h3>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: "var(--fg-faint)",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>
                    {p.tag}
                  </span>
                </div>

                <p style={{
                  fontSize: "clamp(12px, 1vw, 14px)",
                  color: "var(--fg-dim)",
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}>
                  {p.blurb}
                </p>

                <div style={{
                  paddingTop: 16, borderTop: "1px solid var(--line)",
                  display: "flex", gap: 8, flexWrap: "wrap",
                }}>
                  {p.architecture.slice(0, 2).map(([label, val]) => (
                    <span key={label} style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9, color: "var(--fg-faint)",
                      letterSpacing: "0.1em",
                    }}>
                      {label}: <span style={{ color: "var(--fg-dim)" }}>{val}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
