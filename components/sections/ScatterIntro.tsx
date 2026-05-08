"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = "RAYANN";
const LINE2 = "SAGNON";

const EXTRAS = [
  { l: "m", vx:  2, vy: 10, dx: -3, dy: -35, rot: -18 },
  { l: "c", vx: 40, vy:  4, dx:  5, dy: -42, rot:  25 },
  { l: "r", vx: 70, vy:  6, dx: -4, dy: -38, rot: -35 },
  { l: "v", vx: 82, vy: 16, dx:  4, dy: -30, rot:  20 },
  { l: "s", vx:  6, vy: 36, dx: -5, dy: -22, rot: -12 },
  { l: "g", vx: 50, vy: 28, dx:  3, dy: -34, rot:  40 },
  { l: "a", vx: 20, vy: 55, dx: -4, dy: -28, rot: -28 },
  { l: "y", vx: 74, vy: 50, dx:  6, dy: -44, rot:  15 },
  { l: "t", vx: 12, vy: 66, dx: -5, dy: -24, rot: -45 },
  { l: "h", vx: 44, vy: 70, dx:  4, dy: -36, rot:  32 },
  { l: "n", vx: 64, vy: 76, dx: -5, dy: -26, rot: -20 },
  { l: "f", vx: 26, vy: 80, dx:  4, dy: -40, rot:  50 },
  { l: "p", vx: 86, vy: 42, dx: -3, dy: -32, rot: -38 },
  { l: "b", vx: 56, vy: 86, dx:  5, dy: -48, rot:  22 },
  { l: "i", vx:  3, vy: 80, dx: -4, dy: -38, rot: -55 },
  { l: "e", vx: 33, vy: 40, dx:  3, dy: -24, rot:  18 },
  { l: "o", vx: 88, vy: 60, dx:  4, dy: -40, rot: -30 },
  { l: "u", vx: 16, vy: 90, dx: -6, dy: -44, rot:  42 },
];

const LETTER_COLORS = [
  "#4682f0",
  "#e85d4a",
  "#f0a030",
  "#38b28a",
  "#c75fc7",
  "#e8c53a",
];

function eio(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function ScatterIntro() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const line1Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const line2Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const extraRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hintRef   = useRef<HTMLDivElement>(null);

  // Smooth cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let cx = -100, cy = -100, tx = -100, ty = -100;
    let raf: number;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const allSpans = [
      ...line1Refs.current,
      ...line2Refs.current,
    ].filter(Boolean) as HTMLSpanElement[];

    // Entrance — letters come up from below
    gsap.fromTo(
      allSpans,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: { each: 0.048 }, ease: "power4.out", duration: 0.82, delay: 0.15 }
    );

    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4,
      onUpdate(self) {
        const p = self.progress;

        // Scroll hint fades immediately
        if (hintRef.current) {
          hintRef.current.style.opacity = String(Math.max(0, 1 - p * 8));
        }

        // Extras — come from 100vh below, drift, then fade
        extraRefs.current.forEach((span, i) => {
          if (!span) return;
          const ex = EXTRAS[i];
          const fadeIn  = eio(Math.max(0, Math.min(1, p * 5 - i * 0.10)));
          const drift   = eio(Math.min(1, p));
          const fadeOut = Math.max(0, 1 - Math.max(0, (p - 0.72) / 0.28));
          const entryY  = (1 - fadeIn) * 100; // starts 100vh below final position
          span.style.transform = `translate(${ex.dx * drift}vw, ${ex.dy * drift + entryY}vh) rotate(${ex.rot * drift}deg)`;
          span.style.opacity   = String(Math.min(0.65, fadeIn * 0.65) * fadeOut);
        });
      },
    });

    return () => { trigger.kill(); gsap.killTweensOf(allSpans); };
  }, []);

  const applyGradient = (el: HTMLSpanElement, x: number, y: number, color: string) => {
    el.style.background = `radial-gradient(circle 50px at ${x}px ${y}px, ${color} 0%, ${color} 35%, #0a0a0a 70%)`;
    (el.style as any).webkitBackgroundClip = "text";
    el.style.backgroundClip = "text";
    (el.style as any).webkitTextFillColor = "transparent";
    el.style.color = "transparent";
  };

  const clearGradient = (el: HTMLSpanElement) => {
    el.style.background = "";
    (el.style as any).webkitBackgroundClip = "";
    el.style.backgroundClip = "";
    (el.style as any).webkitTextFillColor = "";
    el.style.color = "#0a0a0a";
  };

  const letterStyle: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "'Inter Tight', system-ui, sans-serif",
    fontWeight: 900,
    fontSize: "clamp(72px, 21vw, 380px)",
    lineHeight: 0.85,
    letterSpacing: "-0.04em",
    color: "#0a0a0a",
    willChange: "transform, opacity",
    transformOrigin: "50% 50%",
    userSelect: "none",
    opacity: 0,
    position: "relative",
    zIndex: 1,
  };

  return (
    <div ref={outerRef} style={{ height: "170vh", position: "relative" }}>
      <div
        style={{
          position: "sticky", top: 0, height: "100vh",
          background: "#f2ece3",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "center",
          padding: "0 5vw",
          overflow: "hidden",
          cursor: "none",
        }}
        onMouseEnter={() => { if (cursorRef.current) cursorRef.current.style.opacity = "1"; }}
        onMouseLeave={() => { if (cursorRef.current) cursorRef.current.style.opacity = "0"; }}
      >
        {/* Custom circle cursor */}
        <div ref={cursorRef} aria-hidden style={{
          position: "fixed", left: 0, top: 0,
          width: 30, height: 30,
          borderRadius: "50%",
          background: "#4682f0",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "opacity 0.25s ease, background 0.14s ease, width 0.18s ease, height 0.18s ease",
        }} />

        {/* Extras rendered first — behind main letters by DOM order */}
        {EXTRAS.map((ex, i) => (
          <span
            key={i}
            ref={(el) => { extraRefs.current[i] = el; }}
            aria-hidden
            style={{
              position: "absolute",
              left: `${ex.vx}%`,
              top: `${ex.vy}%`,
              fontFamily: "'Inter Tight', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(72px, 21vw, 380px)",
              color: "#0a0a0a",
              opacity: 0,
              userSelect: "none",
              pointerEvents: "none",
              willChange: "transform, opacity",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              zIndex: 0,
            }}
          >
            {ex.l}
          </span>
        ))}

        {/* RAYANN — above extras */}
        <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
          {LINE1.split("").map((c, i) => {
            const color = LETTER_COLORS[i % LETTER_COLORS.length];
            return (
              <span
                key={i}
                ref={(el) => { line1Refs.current[i] = el; }}
                style={letterStyle}
                onMouseEnter={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  applyGradient(e.currentTarget, e.clientX - r.left, e.clientY - r.top, color);
                  if (cursorRef.current) {
                    cursorRef.current.style.background = color;
                    cursorRef.current.style.width = "42px";
                    cursorRef.current.style.height = "42px";
                  }
                }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  applyGradient(e.currentTarget, e.clientX - r.left, e.clientY - r.top, color);
                }}
                onMouseLeave={(e) => {
                  clearGradient(e.currentTarget);
                  if (cursorRef.current) {
                    cursorRef.current.style.background = "#4682f0";
                    cursorRef.current.style.width = "30px";
                    cursorRef.current.style.height = "30px";
                  }
                }}
              >
                {c}
              </span>
            );
          })}
        </div>

        {/* SAGNON — above extras */}
        <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
          {LINE2.split("").map((c, i) => {
            const color = LETTER_COLORS[(i + LINE1.length) % LETTER_COLORS.length];
            return (
              <span
                key={i}
                ref={(el) => { line2Refs.current[i] = el; }}
                style={letterStyle}
                onMouseEnter={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  applyGradient(e.currentTarget, e.clientX - r.left, e.clientY - r.top, color);
                  if (cursorRef.current) {
                    cursorRef.current.style.background = color;
                    cursorRef.current.style.width = "42px";
                    cursorRef.current.style.height = "42px";
                  }
                }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  applyGradient(e.currentTarget, e.clientX - r.left, e.clientY - r.top, color);
                }}
                onMouseLeave={(e) => {
                  clearGradient(e.currentTarget);
                  if (cursorRef.current) {
                    cursorRef.current.style.background = "#4682f0";
                    cursorRef.current.style.width = "30px";
                    cursorRef.current.style.height = "30px";
                  }
                }}
              >
                {c}
              </span>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div ref={hintRef} style={{
          position: "absolute", bottom: 40, right: "5vw",
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 11, fontWeight: 500,
          color: "#0a0a0a", opacity: 0.45,
          letterSpacing: "0.15em", textTransform: "uppercase",
        }}>
          Scroll ↘
        </div>
      </div>
    </div>
  );
}