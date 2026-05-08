"use client";

export function SignalTopology() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left cluster */}
      <path className="signal-path" d="M -20 120 L 120 180 L 200 150 L 280 220" />
      <path className="signal-path" d="M 0 300 L 140 260 L 220 300 L 290 270" style={{ animationDelay: "-3s" }} />
      <path className="signal-path" d="M 60 450 L 180 400 L 240 420" style={{ animationDelay: "-7s" }} />

      {/* Right cluster */}
      <path className="signal-path" d="M 120% 100 L calc(100% - 120px) 180 L calc(100% - 240px) 150" />
      <path className="signal-path" d="M 120% 320 L calc(100% - 100px) 280 L calc(100% - 220px) 310" style={{ animationDelay: "-5s" }} />
      <path className="signal-path" d="M 120% 460 L calc(100% - 140px) 420 L calc(100% - 260px) 440" style={{ animationDelay: "-2s" }} />

      {/* Node dots */}
      {[
        [120, 180], [200, 150], [140, 260], [180, 400],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={2}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          opacity={0.4}
          style={{ animation: `pulse ${2 + i * 0.7}s var(--ease) infinite` }}
        />
      ))}
    </svg>
  );
}
