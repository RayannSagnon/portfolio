"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { useLabCylinder } from "@/hooks/useLabCylinder";
import { applyLabMode } from "@/lib/labModes";
import { PINGS } from "@/lib/sound";
import { Cylinder } from "./Cylinder";
import { SignalTopology } from "./SignalTopology";
import { ProjectDetails } from "./ProjectDetails";

export function LabEnvironment() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const { angle, activeIdx, lightX, rotate, snapTo, onPointerDown, onPointerMove, onPointerUp } = useLabCylinder();
  const [immersive, setImmersive] = useState(false);

  const activeProject = projects[activeIdx];

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.setProperty("--mode-light-x", `${lightX}%`);
    }
  }, [lightX]);

  useEffect(() => {
    if (wrapRef.current) {
      applyLabMode(wrapRef.current, activeProject);
    }
    /* Propagate accent to root so RS logo, nav underline, and dot also change */
    const h = activeProject.hue;
    const accent     = `hsl(${h}, 62%, 44%)`;
    const accentSoft = `hsl(${h}, 45%, 16%)`;
    const accentGlow = `hsla(${h}, 62%, 44%, 0.22)`;
    document.documentElement.style.setProperty("--accent",      accent);
    document.documentElement.style.setProperty("--accent-soft", accentSoft);
    document.documentElement.style.setProperty("--accent-glow", accentGlow);
  }, [activeProject]);

  /* Restore default accent when the lab leaves the viewport */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          document.documentElement.style.setProperty("--accent",      "#6b1d28");
          document.documentElement.style.setProperty("--accent-soft", "#3a121a");
          document.documentElement.style.setProperty("--accent-glow", "rgba(138,42,58,0.25)");
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="lab-stage"
      role="region"
      aria-label="Interactive project showcase"
      style={{ display: "flex", alignItems: "stretch" }}
    >
      {/* Full-bleed atmospheric layers */}
      <div className="lab-mode-scan" aria-hidden />
      <div className="lab-grid-floor" aria-hidden />

      {/* ── LEFT COLUMN: project details ── */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "min(360px, 30vw)", flexShrink: 0,
        display: "flex", alignItems: "center",
        padding: "0 2vw 0 8vw",
      }}>
        <ProjectDetails
          project={activeProject}
          onEnter={() => { setImmersive(true); PINGS.enter(); }}
        />
      </div>

      {/* ── RIGHT COLUMN: 3D cylinder zone ── */}
      <div
        style={{
          flex: 1, minWidth: 0,
          position: "relative",
          perspective: "2400px",
          perspectiveOrigin: "50% 50%",
          overflow: "hidden",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Cylinder
          angle={angle}
          activeIdx={activeIdx}
          snapTo={snapTo}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />

        {/* Nav arrows — outside the card, stop propagation so drag handler doesn't intercept */}
        {([-1, 1] as const).map(dir => (
          <button
            key={dir}
            onClick={() => rotate(dir)}
            onPointerDown={e => e.stopPropagation()}
            aria-label={dir === -1 ? "Previous project" : "Next project"}
            style={{
              position: "absolute", top: "50%",
              /* 10% from each column edge — outside the adjacent cards (~380px from centre) */
              ...(dir === -1 ? { left: "9%" } : { right: "9%" }),
              transform: "translateY(-50%)",
              background: "rgba(7,7,7,0.65)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid var(--line-strong)",
              borderRadius: "50%",
              color: "var(--fg-dim)", fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15, width: 36, height: 36, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 10,
              transition: "border-color 0.3s, color 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.boxShadow = "0 0 12px var(--accent-glow)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--line-strong)";
              e.currentTarget.style.color = "var(--fg-dim)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {dir === -1 ? "←" : "→"}
          </button>
        ))}

        {/* Dot indicators */}
        <div aria-hidden style={{
          position: "absolute", bottom: 20, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: 6, zIndex: 10,
        }}>
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => { snapTo(i); PINGS.click(); }}
              style={{
                width: i === activeIdx ? 24 : 6, height: 1,
                background: i === activeIdx ? "var(--accent)" : "var(--line-strong)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.4s var(--ease), background 0.4s var(--ease)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Immersive overlay — spans full stage */}
      {immersive && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 20,
          background: "rgba(7,7,7,0.96)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "8vw", gap: 32,
        }}>
          <button
            onClick={() => { setImmersive(false); PINGS.exit(); }}
            style={{
              position: "absolute", top: 24, right: 24,
              background: "none", border: "1px solid var(--line-strong)",
              color: "var(--fg-dim)", fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "8px 16px", cursor: "pointer",
              transition: "color 0.3s, border-color 0.3s",
            }}
          >
            ← Exit
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 720, width: "100%" }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {activeProject.code} · {activeProject.type}
              </span>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 56px)", color: "var(--fg)", letterSpacing: "-0.04em", lineHeight: 0.9, marginTop: 8 }}>
                {activeProject.name}
              </h2>
            </div>
            <p style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "var(--fg-dim)", lineHeight: 1.65, fontWeight: 300 }}>
              {activeProject.blurb}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {[["Architecture", activeProject.architecture], ["Trade-offs", activeProject.tradeoffs]].map(([title, rows]) => (
                <div key={String(title)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {String(title)}
                  </span>
                  {(rows as [string, string][]).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.1em" }}>{k}</span>
                      <span style={{ fontSize: 13, color: "var(--fg-dim)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {activeProject.notes.length > 0 && (
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Engineering notes</span>
                {activeProject.notes.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 12, fontSize: 13, color: "var(--fg-dim)" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
