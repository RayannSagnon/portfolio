import { ImageResponse } from "next/og";
import { LIVERY, liveryFonts, Roundel } from "@/lib/og/livery";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS masks its own corners, so the roundel sits on a full shell tile.
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: LIVERY.shell,
        }}
      >
        <Roundel size={136} ring={12} />
      </div>
    ),
    { ...size, fonts: await liveryFonts() },
  );
}
