"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";

gsap.registerPlugin(ScrollTrigger);

const N = projects.length;
const CENTER = (N - 1) / 2;

export function LabBridge() {
  const sectionRef   = useRef<HTMLElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // Initial state: all stacked at center, invisible
    gsap.set(cards, {
      x: 0, y: 0, z: 0,
      rotateY: -12, rotateZ: 3,
      scale: 0.88,
      opacity: 0,
      transformOrigin: "50% 50%",
    });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(labelRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // ── Phase 1 (0→0.15): cards appear stacked ──
    tl.to(cards, {
      opacity: (i) => 1 - i * 0.1,
      scale: (i) => 1 - i * 0.02,
      duration: 0.15,
    }, 0);
    tl.to(labelRef.current, { opacity: 1, duration: 0.1 }, 0.02);

    // ── Phase 2 (0.12→0.55): fan out diagonally ──
    // i=0 → top-right / closest, i=N-1 → bottom-left / furthest
    cards.forEach((card, i) => {
      const xOff = (CENTER - i) * 11;   // vw
      const yOff = -(CENTER - i) * 7;   // vh  (front card goes up)
      const zOff = -i * 72;             // px
      tl.to(card, {
        x: `${xOff}vw`,
        y: `${yOff}vh`,
        z: zOff,
        duration: 0.38,
      }, 0.12 + i * 0.012);
    });

    // ── Phase 3 (0.65→0.85): collapse toward carousel layout ──
    cards.forEach((card, i) => {
      const off    = i - CENTER;
      const absOff = Math.abs(off);
      tl.to(card, {
        x: `${off * 29}vw`,
        y: 0,
        z: absOff * -100,
        rotateY: off * -10,
        rotateZ: 0,
        scale: Math.max(0.70, 1 - absOff * 0.11),
        opacity: absOff > 2 ? 0 : Math.max(0, 1 - absOff * 0.22),
        duration: 0.20,
      }, 0.65);
    });

    // Label fades out during fan hold
    tl.to(labelRef.current, { opacity: 0, duration: 0.12 }, 0.50);

    // ── Phase 4 (0.82→1.0): dark overlay sweeps in, cards fade ──
    tl.to(overlayRef.current, { opacity: 1, duration: 0.18 }, 0.82);
    tl.to(cards,              { opacity: 0, duration: 0.14 }, 0.87);
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="lab-bridge"
      style={{ height: "500vh", position: "relative" }}
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#f2ece3",
          borderRadius: "24px 24px 0 0",
        }}
      >
        {/* Section label */}
        <div
          ref={labelRef}
          style={{
            position: "absolute",
            top: 44,
            left: "8vw",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "rgba(10,10,10,0.35)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            zIndex: 10,
            userSelect: "none",
          }}
        >
          The Lab · Systems
        </div>

        {/* 3-D viewport */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            perspective: "1200px",
            perspectiveOrigin: "50% 46%",
          }}
        >
          {/* preserve-3d layer so cards share the same 3D space */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginLeft: -130,
                  marginTop: -175,
                  width: 260,
                  height: 350,
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 3,
                  padding: "26px 22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transformOrigin: "50% 50%",
                  willChange: "transform, opacity",
                  boxShadow:
                    "0 2px 24px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {/* Color accent bar */}
                <div
                  style={{
                    width: "100%",
                    height: 2,
                    background: `hsl(${project.hue}, 55%, 50%)`,
                    borderRadius: 1,
                    marginBottom: 6,
                    opacity: 0.7,
                  }}
                />

                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8,
                    color: "rgba(10,10,10,0.28)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  NODE {project.code}
                </span>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: 19,
                      color: "#0a0a0a",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.1,
                    }}
                  >
                    {project.name}
                  </p>
                  <p
                    style={{
                      fontSize: 10.5,
                      color: "rgba(10,10,10,0.45)",
                      lineHeight: 1.6,
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {project.tag}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    paddingTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 7.5,
                      color: "rgba(10,10,10,0.22)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.type}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: `hsl(${project.hue}, 55%, 55%)`,
                      opacity: 0.6,
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark overlay (fades in at end to bridge into TheLab) */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "#0a0a0a",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>
    </section>
  );
}
