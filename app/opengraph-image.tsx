import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LIVERY, liveryFonts } from "@/lib/og/livery";

export const alt = "Rayann Sagnon, Electrical Engineering student at the University of Ottawa, looking for a hardware internship in summer 2027.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card: the homepage livery in one frame, with Rayann's photo stuck on.
export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "images", "home", "rayann-sofa-sticker.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: LIVERY.shell,
          fontFamily: "ArchivoBold",
        }}
      >
        {/* raked garnet stripe with its ink pinstripe */}
        <div
          style={{
            position: "absolute",
            left: -120,
            top: 262,
            width: 1500,
            height: 150,
            background: LIVERY.garnet,
            transform: "rotate(-4deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -120,
            top: 420,
            width: 1500,
            height: 12,
            background: LIVERY.ink,
            transform: "rotate(-4deg)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 60,
            top: 70,
            display: "flex",
            flexDirection: "column",
            transform: "rotate(-4deg)",
            fontFamily: "ArchivoBlack",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: 172,
            lineHeight: 0.86,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: LIVERY.ink }}>Rayann</span>
          <span style={{ color: LIVERY.shellHi, marginTop: 14 }}>Sagnon</span>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 56,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            color: LIVERY.ink,
            fontSize: 32,
            lineHeight: 1.2,
          }}
        >
          <span>Electrical Engineering, University of Ottawa</span>
          <span style={{ color: LIVERY.garnet }}>Hardware internship, summer 2027</span>
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            top: 70,
            display: "flex",
            flexDirection: "column",
            padding: "10px 10px 30px",
            background: LIVERY.shellHi,
            border: `5px solid ${LIVERY.ink}`,
            borderRadius: 8,
            transform: "rotate(3deg)",
            boxShadow: "0 22px 40px rgba(40, 22, 24, 0.22)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={300} height={375} style={{ borderRadius: 3 }} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts: await liveryFonts() },
  );
}
