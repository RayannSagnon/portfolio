"use client";
import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  {
    code: "V·01",
    label: "Build to understand.",
    body: "Every project starts as a question. The schematic, the firmware, the model — they're instruments of comprehension, not outputs.",
  },
  {
    code: "V·02",
    label: "Hardware is the constraint.",
    body: "Software can be patched. Physics cannot. Designing at the boundary of real-time and physical law is where the most interesting engineering lives.",
  },
  {
    code: "V·03",
    label: "Interaction is the interface.",
    body: "A system is only as intelligent as its legibility to the humans inside it. Embedded decisions must be surfaced, not hidden.",
  },
  {
    code: "V·04",
    label: "Depth compounds.",
    body: "Breadth is the map. Depth is the territory. I choose one area at a time — long enough to find the non-obvious problems.",
  },
] as const;

export function Vision() {
  return (
    <section
      id="vision"
      data-section="VISION"
      data-num="03"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "8vh", borderTop: "none" }}
    >
      <Reveal delay={100}>
        <h2 style={{
          fontWeight: 800,
          fontSize: "clamp(28px, 3.6vw, 58px)",
          lineHeight: 1.0, letterSpacing: "-0.035em",
          color: "var(--fg)",
          maxWidth: 760,
        }}>
          Engineering where{" "}
          <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>humans</em>{" "}
          and{" "}
          <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>machines</em>{" "}
          think together.
        </h2>
      </Reveal>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 2,
        marginTop: "2vh",
      }}>
        {pillars.map(({ code, label, body }, i) => (
          <Reveal key={code} delay={i * 80}>
            <div style={{
              padding: "36px 32px",
              borderTop: "1px solid var(--line)",
              borderRight: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, color: "var(--fg-faint)",
                letterSpacing: "0.2em", textTransform: "uppercase",
              }}>
                {code}
              </span>
              <p style={{
                fontWeight: 700,
                fontSize: "clamp(16px, 1.4vw, 20px)",
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}>
                {label}
              </p>
              <p style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "var(--fg-dim)",
                lineHeight: 1.65,
                fontWeight: 300,
              }}>
                {body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
