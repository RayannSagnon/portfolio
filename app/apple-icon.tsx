import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0c0c",
          borderRadius: 36,
          border: "3px solid rgba(232,228,220,0.16)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -6,
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#e8e4dc" }}>R</span>
          <span style={{ color: "#8a2a3a" }}>S</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
