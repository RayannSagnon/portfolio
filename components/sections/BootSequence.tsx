"use client";
import { useBootSequence } from "@/hooks/useBootSequence";
import { BOOT_LINES } from "@/lib/constants";

export function BootSequence() {
  const { visible, hidden, dismiss } = useBootSequence();

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System initializing"
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "var(--bg)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        opacity: hidden ? 0 : 1,
        transition: "opacity 1.2s cubic-bezier(0.2,0.8,0.05,1)",
        pointerEvents: hidden ? "none" : "all",
      }}
    >
      {/* Scan line */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,228,220,0.015) 2px, rgba(232,228,220,0.015) 4px)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "min(640px, 90vw)", display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Header */}
        <div style={{
          borderBottom: "1px solid var(--line)",
          paddingBottom: 16, marginBottom: 24,
          display: "flex", justifyContent: "space-between",
          fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--fg-faint)",
        }}>
          <span>RAYANN · SYSTEM INIT</span>
          <span style={{ color: "var(--accent)" }}>v1.0.04</span>
        </div>

        {/* Boot lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {BOOT_LINES.map(({ delay, time, msg, ok }, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 60px",
                gap: "0 16px",
                fontSize: 11,
                color: "var(--fg-dim)",
                opacity: 0,
                animation: `bootLine 0.4s ease ${delay}s forwards`,
              }}
            >
              <span style={{ color: "var(--fg-faint)" }}>{time}s</span>
              <span>{msg}</span>
              <span style={{ color: ok === "SIGNAL" ? "var(--accent)" : "#4ade80", textAlign: "right" }}>
                [{ok}]
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: 32,
          height: 1,
          background: "var(--line)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: "100%",
            background: "var(--accent)",
            width: "0%",
            animation: "bootProgress 1.8s cubic-bezier(0.2,0.8,0.05,1) 0.2s forwards",
          }} />
        </div>

        {/* Skip */}
        <div style={{
          marginTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--fg-faint)",
        }}>
          <span style={{
            opacity: 0,
            animation: "bootLine 0.4s ease 1.8s forwards",
          }}>
            Handshake established
          </span>
          <button
            onClick={dismiss}
            style={{
              background: "none", border: "1px solid var(--line-strong)",
              color: "var(--fg-dim)", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "8px 16px",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg-faint)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-dim)"; e.currentTarget.style.borderColor = "var(--line-strong)"; }}
          >
            Enter →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bootLine {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bootProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
