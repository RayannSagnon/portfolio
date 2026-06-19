"use client";
import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  {
    label: "Build to understand.",
    body: "Every project starts as a question. The schematic, the firmware, the model: they're instruments of comprehension, not outputs.",
  },
  {
    label: "Hardware is the constraint.",
    body: "Software can be patched. Physics cannot. Designing at the boundary of real-time and physical law is where the most interesting engineering lives.",
  },
  {
    label: "Interaction is the interface.",
    body: "Technology only becomes useful when people can understand what it is doing. Embedded decisions should be surfaced, not hidden.",
  },
  {
    label: "Depth compounds.",
    body: "Breadth is the map. Depth is the territory. I choose one area at a time, long enough to find the non-obvious problems.",
  },
] as const;

export function Vision() {
  return (
    <section
      id="vision"
      data-section="VISION"
      data-num="03"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "8vh", borderTop: "none", minHeight: "100svh" }}
    >
      <style>{`
        .vision-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            border-color 0.35s var(--ease),
            background 0.35s var(--ease),
            box-shadow 0.35s var(--ease),
            transform 0.35s var(--ease);
        }
        .vision-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(232, 228, 220, 0.10), transparent 58%),
            linear-gradient(145deg, rgba(232, 228, 220, 0.035), transparent 56%);
          transition: opacity 0.35s var(--ease);
        }
        .vision-card:hover {
          transform: translateY(-6px);
          border-color: rgba(232, 228, 220, 0.18);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.26);
        }
        .vision-card:hover::before {
          opacity: 1;
        }
        .vision-card-title,
        .vision-card-body {
          transition: color 0.28s var(--ease), transform 0.28s var(--ease);
        }
        .vision-card:hover .vision-card-title {
          color: var(--fg);
          transform: translateY(-2px);
        }
        .vision-card:hover .vision-card-body {
          color: var(--fg-dim);
        }
      `}</style>

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
        {pillars.map(({ label, body }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div
              className="vision-card"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
              }}
              style={{
                padding: "36px 32px",
                borderTop: "1px solid var(--line)",
                borderRight: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <p className="vision-card-title" style={{
                fontWeight: 700,
                fontSize: "clamp(16px, 1.4vw, 20px)",
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}>
                {label}
              </p>
              <p className="vision-card-body" style={{
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


