"use client";
import { axioms } from "@/content/philosophy";
import { Reveal } from "@/components/motion/Reveal";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      data-section="PHILOSOPHY"
      data-num="07"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "8vh" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {axioms.map(({ code, text, emphasis, gloss }, i) => (
          <Reveal key={code} delay={i * 120}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr auto",
              gap: "0 40px",
              alignItems: "baseline",
              padding: "40px 0",
              borderBottom: "1px solid var(--line)",
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, color: "var(--fg-faint)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                paddingTop: 6,
              }}>
                {code}
              </span>

              <p style={{
                fontWeight: 800,
                fontSize: "clamp(28px, 5vw, 72px)",
                lineHeight: 0.92, letterSpacing: "-0.04em",
                color: "var(--fg)",
              }}>
                {text}{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--fg-dim)" }}>
                  {emphasis}
                </em>
              </p>

              <p style={{
                maxWidth: 300,
                fontSize: "clamp(12px, 1vw, 14px)",
                color: "var(--fg-faint)",
                lineHeight: 1.6,
                fontWeight: 300,
                alignSelf: "center",
              }}>
                {gloss}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
