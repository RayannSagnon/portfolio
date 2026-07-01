import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 10,
          border: "2px solid rgba(232,228,220,0.16)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: -2,
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
