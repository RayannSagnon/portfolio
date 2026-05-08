"use client";
import { useRef, useEffect } from "react";
import { identityWords } from "@/content/identity";
import { Reveal } from "@/components/motion/Reveal";

const DEPTHS = [8, -6, 10, -8, 6, 12, -10, 7, -5, 9, -7, 11, -9, 6, -8, 10, -6];

const ROWS = [
  [0],
  [1, 2],
  [3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13],
  [14, 15],
  [16],
];

function WordChip({
  word,
  spanRef,
  onHoverStart,
  onHoverEnd,
}: {
  word: (typeof identityWords)[number];
  spanRef: (el: HTMLSpanElement | null) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const { text, variant } = word;
  const elRef = useRef<HTMLSpanElement | null>(null);

  const setRef = (el: HTMLSpanElement | null) => {
    elRef.current = el;
    spanRef(el);
  };

  const handleEnter = () => {
    const el = elRef.current;
    if (el) {
      if (variant === "glow") {
        el.style.borderColor = "rgba(232,228,220,0.55)";
        el.style.color = "#fff";
        el.style.background = "rgba(232,228,220,0.07)";
      } else if (variant === "accent") {
        el.style.color = "var(--fg)";
      } else {
        el.style.color = "var(--fg-dim)";
      }
      el.style.cursor = "default";
    }
    onHoverStart();
  };

  const handleLeave = () => {
    const el = elRef.current;
    if (el) {
      if (variant === "glow") {
        el.style.borderColor = "rgba(232,228,220,0.2)";
        el.style.color = "var(--fg)";
        el.style.background = "";
      } else if (variant === "accent") {
        el.style.color = "var(--fg-dim)";
      } else {
        el.style.color = "var(--fg-faint)";
      }
    }
    onHoverEnd();
  };

  const transition = "color 0.22s ease, border-color 0.22s ease, background 0.22s ease";

  if (variant === "glow") {
    return (
      <span
        ref={setRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          fontSize: "clamp(13px, 1.3vw, 17px)",
          fontWeight: 700,
          color: "var(--fg)",
          letterSpacing: "-0.02em",
          border: "1px solid rgba(232,228,220,0.2)",
          padding: "5px 14px",
          borderRadius: 2,
          lineHeight: 1.3,
          willChange: "transform",
          display: "inline-block",
          transition,
        }}
      >
        {text}
      </span>
    );
  }

  if (variant === "accent") {
    return (
      <span
        ref={setRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          fontSize: "clamp(13px, 1.3vw, 17px)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--fg-dim)",
          letterSpacing: "-0.01em",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          lineHeight: 1.3,
          willChange: "transform",
          transition,
        }}
      >
        <span style={{ color: "var(--accent)", fontStyle: "normal", fontSize: 9 }}>◆</span>
        {text}
      </span>
    );
  }

  return (
    <span
      ref={setRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        fontSize: "clamp(12px, 1.1vw, 15px)",
        fontWeight: 300,
        color: "var(--fg-faint)",
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
        willChange: "transform",
        display: "inline-block",
        transition,
      }}
    >
      {text}
    </span>
  );
}

export function IdentityLayer() {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const targetScales = useRef<number[]>(Array(17).fill(1));
  const currentScales = useRef<number[]>(Array(17).fill(1));

  useEffect(() => {
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };

    let raf: number;
    const tick = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = DEPTHS[i] ?? 6;
        currentScales.current[i] += (targetScales.current[i] - currentScales.current[i]) * 0.1;
        const sc = currentScales.current[i];
        el.style.transform = `translate(${mouse.x * d}px, ${mouse.y * d * 0.6}px) scale(${sc.toFixed(4)})`;
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="identity"
      data-section="IDENTITY"
      data-num="02"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "6vh" }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: "6vw",
        alignItems: "center",
      }}>
        {/* ── Word diamond ── */}
        <Reveal delay={80}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}>
            {ROWS.map((row, rowIdx) => (
              <div key={rowIdx} style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px 14px",
                justifyContent: "center",
              }}>
                {row.map((wordIdx) => (
                  <WordChip
                    key={wordIdx}
                    word={identityWords[wordIdx]}
                    spanRef={(el) => { wordRefs.current[wordIdx] = el; }}
                    onHoverStart={() => { targetScales.current[wordIdx] = 1.18; }}
                    onHoverEnd={() => { targetScales.current[wordIdx] = 1; }}
                  />
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Image frame ── */}
        <Reveal delay={160}>
          <div style={{
            position: "relative",
            aspectRatio: "3 / 4",
            border: "1px solid var(--line-strong)",
            background: "var(--bg-raised)",
            overflow: "hidden",
          }}>
            {/* Corner brackets */}
            {[
              { top: 8, left: 8, borderRight: "none", borderBottom: "none" },
              { top: 8, right: 8, borderLeft: "none", borderBottom: "none" },
              { bottom: 8, left: 8, borderRight: "none", borderTop: "none" },
              { bottom: 8, right: 8, borderLeft: "none", borderTop: "none" },
            ].map((s, i) => (
              <div key={i} aria-hidden style={{
                position: "absolute", width: 14, height: 14,
                border: "1px solid var(--accent)",
                ...s,
              }} />
            ))}

            {/* Atmospheric fill */}
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 60% at 50% 40%, var(--accent-soft) 0%, transparent 70%)",
              opacity: 0.5,
            }} />

            {/* Label */}
            <div style={{
              position: "absolute", bottom: 16, left: 0, right: 0,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span style={{
                fontSize: 8, color: "var(--fg-faint)",
                letterSpacing: "0.25em", textTransform: "uppercase",
              }}>
                RAYANN.SAGNON
              </span>
              <span style={{
                fontSize: 7, color: "var(--fg-faint)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                opacity: 0.6,
              }}>
                uOttawa · ELG · 2026
              </span>
            </div>

            {/* Center placeholder */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8, color: "var(--fg-faint)",
                letterSpacing: "0.3em", textTransform: "uppercase",
                opacity: 0.4,
              }}>
                PHOTO
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
