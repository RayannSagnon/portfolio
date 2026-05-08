"use client";
import { useRef } from "react";
import { axioms } from "@/content/philosophy";
import { Reveal } from "@/components/motion/Reveal";

export function Philosophy() {
  const rowRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const glossRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const codeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleEnter = (i: number) => {
    const row   = rowRefs.current[i];
    const text  = textRefs.current[i];
    const gloss = glossRefs.current[i];
    const code  = codeRefs.current[i];
    if (row)   row.style.background   = "rgba(255,255,255,0.03)";
    if (text)  text.style.transform   = "translateX(10px)";
    if (gloss) gloss.style.opacity    = "1";
    if (code)  code.style.opacity     = "1";
  };

  const handleLeave = (i: number) => {
    const row   = rowRefs.current[i];
    const text  = textRefs.current[i];
    const gloss = glossRefs.current[i];
    const code  = codeRefs.current[i];
    if (row)   row.style.background   = "";
    if (text)  text.style.transform   = "";
    if (gloss) gloss.style.opacity    = "";
    if (code)  code.style.opacity     = "";
  };

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
            <div
              ref={(el) => { rowRefs.current[i] = el; }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: "0 40px",
                alignItems: "baseline",
                padding: "40px 0",
                borderBottom: "1px solid var(--line)",
                cursor: "default",
                transition: "background 0.35s ease",
                borderRadius: 4,
              }}
            >
              <span
                ref={(el) => { codeRefs.current[i] = el; }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, color: "var(--fg-faint)",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  paddingTop: 6,
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                }}
              >
                {code}
              </span>

              <p
                ref={(el) => { textRefs.current[i] = el; }}
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(28px, 5vw, 72px)",
                  lineHeight: 0.92, letterSpacing: "-0.04em",
                  color: "var(--fg)",
                  transition: "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                {text}{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--fg-dim)" }}>
                  {emphasis}
                </em>
              </p>

              <p
                ref={(el) => { glossRefs.current[i] = el; }}
                style={{
                  maxWidth: 300,
                  fontSize: "clamp(12px, 1vw, 14px)",
                  color: "var(--fg-faint)",
                  lineHeight: 1.6,
                  fontWeight: 300,
                  alignSelf: "center",
                  opacity: 0.4,
                  transition: "opacity 0.35s ease",
                }}
              >
                {gloss}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}