import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { cardFonts, DIM, INK, PAPER } from "@/lib/og/card";

export const alt = "Rayann Sagnon, Electrical Engineering student at the University of Ottawa, looking for a hardware internship in summer 2027.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "images", "site", "portrait.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: INK, color: PAPER, fontFamily: "Instrument Sans" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={588} height={630} style={{ objectFit: "cover" }} alt="" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px 60px" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.94, letterSpacing: -4 }}>
            <span>Rayann</span>
            <span>Sagnon</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 30, lineHeight: 1.3 }}>
            <span style={{ color: DIM }}>Electrical Engineering, University of Ottawa</span>
            <span>Hardware internship, summer 2027</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await cardFonts() },
  );
}
