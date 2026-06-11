import type { BlogVisual } from "@/content/site";

type Props = {
  visual: BlogVisual;
  hue: number;
  featured?: boolean;
};

const visualCopy: Record<BlogVisual, { label: string; trace: string; markers: string[] }> = {
  "embedded-intelligence": {
    label: "quiet intelligence",
    trace: "sense -> decide -> disappear",
    markers: ["MCU", "SENSE", "LOG", "DIAG"],
  },
  "curiosity-map": {
    label: "curiosity map",
    trace: "breadth -> taste -> depth",
    markers: ["QUESTIONS", "CV", "HMI", "AI"],
  },
  "invisible-interface": {
    label: "quiet interface",
    trace: "execute -> anticipate -> recover",
    markers: ["TASK", "STATE", "FAIL", "REPAIR"],
  },
  "rcx-control": {
    label: "rc-x control",
    trace: "command -> loop -> motion",
    markers: ["RF", "IMU", "ESC", "CTRL"],
  },
  "whiteboard-sensor": {
    label: "physical ai",
    trace: "marks -> context -> response",
    markers: ["OCR", "DEPTH", "ROOM", "AI"],
  },
  "craft-manifesto": {
    label: "focused craft",
    trace: "less noise -> more clarity",
    markers: ["BUILD", "FOCUS", "LINK", "KEEP"],
  },
};

function MiniMarker({ label, hue, idx }: { label: string; hue: number; idx: number }) {
  const positions = [
    { left: "14%", top: "24%" },
    { left: "66%", top: "18%" },
    { left: "22%", top: "68%" },
    { left: "72%", top: "62%" },
  ];

  return (
    <span
      style={{
        position: "absolute",
        ...positions[idx % positions.length],
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 8,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: `hsl(${hue}, 70%, 72%)`,
        border: `1px solid hsla(${hue}, 65%, 62%, 0.34)`,
        background: "rgba(0,0,0,0.28)",
        padding: "6px 8px",
        borderRadius: 4,
        boxShadow: `0 0 18px hsla(${hue}, 65%, 46%, 0.12)`,
      }}
    >
      {label}
    </span>
  );
}

export function ArticleVisual({ visual, hue, featured = false }: Props) {
  const copy = visualCopy[visual];
  const lines = visual === "rcx-control" ? 7 : visual === "whiteboard-sensor" ? 5 : 6;

  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        minHeight: featured ? 260 : 190,
        height: "100%",
        overflow: "hidden",
        background:
          `radial-gradient(circle at 72% 22%, hsla(${hue}, 72%, 48%, 0.26), transparent 34%), ` +
          `radial-gradient(circle at 18% 78%, hsla(${hue + 42}, 62%, 48%, 0.16), transparent 36%), ` +
          `linear-gradient(145deg, hsl(${hue}, 36%, 10%) 0%, hsl(${hue}, 28%, 6%) 58%, #050505 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: featured ? "54px 54px" : "44px 44px",
          maskImage: "radial-gradient(ellipse 75% 72% at 50% 48%, black 18%, transparent 82%)",
          opacity: 0.7,
        }}
      />

      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${8 + i * 13}%`,
            top: `${18 + (i % 3) * 19}%`,
            width: `${featured ? 160 : 118}px`,
            height: 1,
            transform: `rotate(${i % 2 === 0 ? -18 : 21}deg)`,
            transformOrigin: "0 50%",
            background: `linear-gradient(90deg, transparent, hsla(${hue}, 72%, 68%, ${0.15 + i * 0.02}), transparent)`,
          }}
        />
      ))}

      {copy.markers.map((marker, i) => (
        <MiniMarker key={marker} label={marker} hue={hue} idx={i} />
      ))}

      <div
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 16,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
          fontFamily: "var(--font-jetbrains), monospace",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 8, letterSpacing: "0.24em", color: "rgba(255,255,255,0.32)" }}>
            Article visual
          </span>
          <span style={{ fontSize: featured ? 12 : 10, letterSpacing: "0.18em", color: `hsl(${hue}, 72%, 68%)` }}>
            {copy.label}
          </span>
        </div>
        <span
          style={{
            maxWidth: featured ? 220 : 150,
            textAlign: "right",
            fontSize: 8,
            lineHeight: 1.6,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          {copy.trace}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.58), transparent 52%)",
        }}
      />
    </div>
  );
}

