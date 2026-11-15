import { ImageResponse } from "next/og";
import { cardFonts, DIM, INK, PAPER } from "@/lib/og/card";

export const alt = "Telemetry V2 Sensor Board, designed by Rayann Sagnon for uOttawa Supermileage: layout complete, 0 DRC violations.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GREEN = "#73d97f";

/** Link preview for the telemetry board until a render of it exists: the name, the status and the system in one line. */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: INK, color: PAPER, fontFamily: "Instrument Sans" }}>
        <div style={{ display: "flex", fontSize: 28, color: DIM }}>Rayann Sagnon · uOttawa Supermileage</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1, letterSpacing: -3 }}>
          <span>Telemetry V2</span>
          <span>Sensor Board</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: GREEN }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: GREEN }} />
            Layout complete, 0 DRC violations
          </div>
          <div style={{ display: "flex", fontSize: 28, color: DIM }}>Hall wheel speed + I2C accelerometer → USB → the car&apos;s Linux computer</div>
        </div>
      </div>
    ),
    { ...size, fonts: await cardFonts() },
  );
}
