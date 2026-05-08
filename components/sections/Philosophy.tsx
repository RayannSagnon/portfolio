"use client";
import { useRef, useEffect } from "react";
import { axioms } from "@/content/philosophy";
import { Reveal } from "@/components/motion/Reveal";
import { GlassSurface } from "@/components/ui/GlassSurface";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs   = useRef<(HTMLParagraphElement | null)[]>([]);
  const glossRefs  = useRef<(HTMLParagraphElement | null)[]>([]);
  const codeRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const boldRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const pillRef    = useRef<HTMLDivElement>(null);

  const hasPositionedRef = useRef(false);
  const activeIdxRef     = useRef(-1);

  const handleEnter = (i: number) => {
    const row   = rowRefs.current[i];
    const text  = textRefs.current[i];
    const gloss = glossRefs.current[i];
    const code  = codeRefs.current[i];
    if (row)   row.style.background = "rgba(255,255,255,0.03)";
    if (text)  text.style.transform = "translateX(10px)";
    if (gloss) gloss.style.opacity  = "1";
    if (code)  code.style.opacity   = "1";
  };

  const handleLeave = (i: number) => {
    const row   = rowRefs.current[i];
    const text  = textRefs.current[i];
    const gloss = glossRefs.current[i];
    const code  = codeRefs.current[i];
    if (row)   row.style.background = "";
    if (text)  text.style.transform = "";
    if (gloss) gloss.style.opacity  = "";
    if (code)  code.style.opacity   = "";
  };

  // Scroll-driven pill: tracks bold word closest to viewport center
  useEffect(() => {
    const updatePill = (withTransition: boolean) => {
      const pill = pillRef.current;
      const idx  = activeIdxRef.current;
      if (!pill) return;

      if (idx < 0) {
        pill.style.opacity = "0";
        return;
      }

      const boldEl = boldRefs.current[idx];
      if (!boldEl) return;

      const rect = boldEl.getBoundingClientRect();

      if (withTransition && hasPositionedRef.current) {
        pill.style.transition = [
          "left 0.55s cubic-bezier(0.23,1,0.32,1)",
          "top 0.55s cubic-bezier(0.23,1,0.32,1)",
          "width 0.5s cubic-bezier(0.23,1,0.32,1)",
          "height 0.4s cubic-bezier(0.23,1,0.32,1)",
          "opacity 0.35s ease",
        ].join(", ");
      } else {
        pill.style.transition = hasPositionedRef.current
          ? "none"
          : "opacity 0.35s ease";
      }

      pill.style.left   = `${rect.left - 14}px`;
      pill.style.top    = `${rect.top  - 10}px`;
      pill.style.width  = `${rect.width + 28}px`;
      pill.style.height = `${rect.height + 20}px`;
      pill.style.opacity = "1";
      hasPositionedRef.current = true;
    };

    const findActive = () => {
      const section = sectionRef.current;
      const pill    = pillRef.current;
      if (!section || !pill) return;

      const sr = section.getBoundingClientRect();

      // Hide pill when section is out of view
      if (sr.bottom < 0 || sr.top > window.innerHeight) {
        if (activeIdxRef.current !== -1) {
          activeIdxRef.current = -1;
          hasPositionedRef.current = false;
          pill.style.transition = "opacity 0.35s ease";
          pill.style.opacity = "0";
        }
        return;
      }

      // Find row whose center is closest to 45% of viewport height
      const cy = window.innerHeight * 0.45;
      let best = -1;
      let dist = Infinity;

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        const d = Math.abs(rect.top + rect.height / 2 - cy);
        if (d < dist) { dist = d; best = i; }
      });

      const changed = best !== activeIdxRef.current;
      activeIdxRef.current = best;
      updatePill(changed);
    };

    window.addEventListener("scroll", findActive, { passive: true });
    window.addEventListener("resize", findActive);
    findActive();

    return () => {
      window.removeEventListener("scroll", findActive);
      window.removeEventListener("resize", findActive);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      data-section="PHILOSOPHY"
      data-num="07"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "8vh" }}
    >
      {/* Moving glass pill — positioned via JS, follows bold words */}
      <div
        ref={pillRef}
        aria-hidden
        style={{
          position: "fixed",
          zIndex: 50,
          pointerEvents: "none",
          opacity: 0,
          borderRadius: 60,
        }}
      >
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={60}
          brightness={50}
          opacity={0.93}
          blur={11}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          mixBlendMode="difference"
        />
      </div>

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
                  fontSize: 9,
                  color: "var(--fg-faint)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
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
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  color: "var(--fg)",
                  transition: "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <span ref={(el) => { boldRefs.current[i] = el; }}>
                  {text}
                </span>{" "}
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