"use client";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";

type Props = { sectionNum: string; sectionName: string };

export function TopBar({ sectionNum, sectionName }: Props) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 48, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 28px",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11, color: "var(--fg-dim)",
      pointerEvents: "none",
    }}>
      {/* RS logo mark */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, pointerEvents: "auto" }}>
        <div style={{
          fontFamily: "'Inter Tight', system-ui, sans-serif",
          fontWeight: 900,
          fontSize: 16,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          display: "flex", alignItems: "center",
          border: "1px solid rgba(232,228,220,0.14)",
          borderRadius: 4,
          padding: "4px 8px",
          userSelect: "none",
        }}>
          <span style={{ color: "var(--fg)" }}>R</span>
          <span style={{ color: "var(--accent)" }}>S</span>
        </div>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 10px var(--accent)",
          animation: "pulse 2.6s cubic-bezier(.2,.7,.1,1) infinite",
          display: "inline-block",
          flexShrink: 0,
        }} />
      </div>

      {/* System status */}
      <div style={{ display: "flex", gap: 24, fontVariantNumeric: "tabular-nums" }}>
        <span style={{ color: "var(--fg-faint)" }}>v<b style={{ color: "var(--fg-dim)", fontWeight: 400 }}>1.0.04</b></span>
        <span style={{ color: "var(--fg-faint)" }}>NODE <b style={{ color: "var(--fg-dim)", fontWeight: 400 }}>{sectionNum}</b></span>
        <span style={{ color: "var(--fg-faint)" }}>UPLINK <b style={{ color: "var(--fg-dim)", fontWeight: 400 }}>STABLE</b></span>
        <span style={{ color: "var(--fg-faint)" }}>OTT/<b style={{ color: "var(--fg-dim)", fontWeight: 400 }}>{time}</b></span>
      </div>

      <span className="sr-only">Current section: {sectionName}</span>
    </div>
  );
}
