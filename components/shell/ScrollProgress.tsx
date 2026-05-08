"use client";
import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

type Props = { sectionNum: string; sectionName: string };

export function ScrollProgress({ sectionNum, sectionName }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useScrollProgress((p) => {
    const pct = Math.round(p * 100);
    if (barRef.current) barRef.current.style.setProperty("--p", pct.toFixed(1) + "%");
    if (pctRef.current) pctRef.current.textContent = String(pct).padStart(3, "0");
  });

  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        padding: "20px 32px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, color: "var(--fg-faint)",
        pointerEvents: "none",
      }}
    >
      <div style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}>
        <span>{sectionNum}</span> / <b style={{ color: "var(--fg)", fontWeight: 400, letterSpacing: "0.18em" }}>{sectionName}</b>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span>SCROLL</span>
        <div
          ref={barRef}
          style={{
            width: 120, height: 1, background: "var(--line)", position: "relative",
          }}
        >
          <span style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "var(--p, 0%)",
            background: "var(--accent)",
            boxShadow: "0 0 8px var(--accent-glow)",
            display: "block",
          }} />
        </div>
        <span ref={pctRef}>000</span>
      </div>
    </div>
  );
}
