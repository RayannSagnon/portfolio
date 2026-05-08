"use client";

// Placeholder — will be replaced with React Three Fiber + Drei hardware model viewer
// when project detail pages require 3D annotated hardware visualization.
export function HardwareViewer({ modelPath }: { modelPath?: string }) {
  return (
    <div style={{
      width: "100%", height: 480,
      background: "var(--bg-raised)",
      border: "1px solid var(--line)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10, color: "var(--fg-faint)",
      letterSpacing: "0.2em", textTransform: "uppercase",
    }}>
      3D VIEWER · {modelPath ?? "PENDING"}
    </div>
  );
}
