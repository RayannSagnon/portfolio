"use client";
import type { CSSProperties } from "react";

export function GlassSurface({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <>
      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id="gs-noise" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75 0.65"
              numOctaves="2"
              seed="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(14px) brightness(1.08) saturate(1.4)",
          WebkitBackdropFilter: "blur(14px) brightness(1.08) saturate(1.4)",
          ...style,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%)",
            border: "1px solid rgba(255,255,255,0.17)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.13)",
            filter: "url(#gs-noise)",
            borderRadius: "inherit",
          }}
        />
      </div>
    </>
  );
}