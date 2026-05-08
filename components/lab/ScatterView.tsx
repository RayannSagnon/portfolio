"use client";
import { useMemo } from "react";
import { projects } from "@/content/projects";
import { CYLINDER_RADIUS } from "@/hooks/useLabCylinder";

const N = projects.length;
const FACE_W = 280;
const FACE_H = 400;

/* Scatter start positions — diagonal cascade, bottom-left → top-right */
const SCATTER: { x: number; y: number; z: number; rx: number; ry: number; rz: number }[] = [
  { x: -380, y:  260, z:  160, rx:  7, ry: -14, rz:  5 },
  { x: -210, y:  150, z:   20, rx:  5, ry:  -9, rz:  3 },
  { x:  -50, y:   50, z: -120, rx:  3, ry:  -4, rz:  1 },
  { x:  110, y:  -60, z: -270, rx:  1, ry:   1, rz:  0 },
  { x:  270, y: -150, z: -420, rx: -1, ry:   7, rz: -2 },
  { x:  420, y: -220, z: -570, rx: -3, ry:  12, rz: -3 },
  { x:  560, y: -280, z: -720, rx: -5, ry:  17, rz: -4 },
];

/* Per-panel stagger delay (0→1 range within progress) */
const DELAYS = [0, 0.04, 0.08, 0.12, 0.06, 0.10, 0.14];

/* Opacity and blur at scatter state, per panel (front=clear, back=foggy) */
const SCATTER_OPACITY = [0.92, 0.78, 0.65, 0.52, 0.60, 0.45, 0.36];
const SCATTER_BLUR    = [0,    0.8,  1.8,  3.2,  2.0,  4.0,  5.5 ];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function cylinderPos(i: number) {
  const angleDeg = (360 / N) * i;
  const rad = angleDeg * Math.PI / 180;
  return {
    x: Math.sin(rad) * CYLINDER_RADIUS,
    y: 0,
    z: Math.cos(rad) * CYLINDER_RADIUS,
    rx: 0,
    ry: angleDeg,
    rz: 0,
  };
}

type Props = {
  progress: number; /* 0 = fully scattered, 1 = cylinder formed */
  opacity: number;  /* overall fade (1 during scatter phase, 0 when cylinder takes over) */
};

export function ScatterView({ progress, opacity }: Props) {
  const panels = useMemo(() => projects.map((_, i) => {
    const delay = DELAYS[i] ?? 0;
    const raw = Math.max(0, (progress - delay) / (1 - delay));
    const t = easeInOut(Math.min(1, raw));

    const s = SCATTER[i];
    const c = cylinderPos(i);

    const scatterOpacity = SCATTER_OPACITY[i] ?? 0.6;
    const scatterBlur    = SCATTER_BLUR[i] ?? 2;
    const currentOpacity = lerp(scatterOpacity, 1, t);
    const currentBlur    = lerp(scatterBlur, 0, t);

    return {
      idx: i,
      project: projects[i],
      tx: lerp(s.x, c.x, t),
      ty: lerp(s.y, c.y, t),
      tz: lerp(s.z, c.z, t),
      rx: lerp(s.rx, c.rx, t),
      ry: lerp(s.ry, c.ry, t),
      rz: lerp(s.rz, c.rz, t),
      opacity: currentOpacity,
      blur:    currentBlur,
    };
  }), [progress]);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute", left: "50%", top: "50%",
        width: 0, height: 0,
        transformStyle: "preserve-3d",
        opacity,
        transition: "opacity 0.6s ease",
        pointerEvents: opacity < 0.05 ? "none" : undefined,
      }}
    >
      {panels.map(({ idx, project, tx, ty, tz, rx, ry, rz, opacity: pOpacity, blur }) => (
        <div
          key={project.slug}
          style={{
            position: "absolute",
            width: FACE_W, height: FACE_H,
            marginLeft: -FACE_W / 2, marginTop: -FACE_H / 2,
            transform: `translateX(${tx.toFixed(1)}px) translateY(${ty.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`,
            opacity: pOpacity,
            filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : undefined,
            willChange: "transform",
            backfaceVisibility: "hidden",
            /* Card styling */
            background: `linear-gradient(145deg, hsl(${project.hue} 28% 9%) 0%, hsl(${project.hue} 42% 18%) 100%)`,
            border: "1px solid rgba(232,228,220,0.14)",
            overflow: "hidden",
          }}
        >
          {/* Large background code number */}
          <div style={{
            position: "absolute", bottom: -16, right: 16,
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 120,
            lineHeight: 1,
            color: `hsla(${project.hue}, 40%, 30%, 0.3)`,
            letterSpacing: "-0.06em",
            userSelect: "none",
            pointerEvents: "none",
          }}>
            {project.code}
          </div>

          {/* Scanline texture */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,0.12) 3px 4px)",
            opacity: 0.5,
          }} />

          {/* Content */}
          <div style={{
            position: "relative", padding: 24, height: "100%",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase",
                color: `hsl(${project.hue} 60% 65%)`,
              }}>
                {project.type}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8, color: "rgba(232,228,220,0.3)", letterSpacing: "0.1em",
              }}>
                NODE {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            <div>
              <h3 style={{
                fontFamily: "'Inter Tight', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "rgba(232,228,220,0.92)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: 8,
              }}>
                {project.name}
              </h3>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.12em",
                color: "rgba(232,228,220,0.35)",
                textTransform: "uppercase",
              }}>
                {project.tag}
              </p>
            </div>
          </div>

          {/* Gloss overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(232,228,220,0.07) 0%, transparent 50%)",
          }} />
        </div>
      ))}
    </div>
  );
}
