import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { cardFonts, DIM, INK, PAPER } from "@/lib/og/card";

export const alt = "Telemetry V2 Sensor Board, designed by Rayann Sagnon for uOttawa Supermileage: layout complete, 0 DRC violations.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GREEN = "#73d97f";

/** Link preview for the telemetry board: Altium's top render beside the name and the status. */
export default async function OpenGraphImage() {
  const render = await readFile(join(process.cwd(), "public", "images", "telemetry", "board-3d-top.jpg"));
  const src = `data:image/jpeg;base64,${render.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: INK, color: PAPER, fontFamily: "Instrument Sans" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={630} height={630} style={{ objectFit: "cover" }} alt="" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 52px 60px" }}>
          <div style={{ display: "flex", fontSize: 24, color: DIM }}>Rayann Sagnon · uOttawa Supermileage</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.02, letterSpacing: -2 }}>
            <span>Telemetry V2</span>
            <span>Sensor Board</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 25, color: GREEN }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: GREEN }} />
              Layout complete, 0 DRC violations
            </div>
            <div style={{ display: "flex", fontSize: 22, color: DIM }}>Wheel speed + acceleration → USB → the car&apos;s computer</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await cardFonts() },
  );
}
