import { ImageResponse } from "next/og";
import { liveryFonts, Roundel } from "@/lib/og/livery";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

// The RS race roundel, as on the site's top bar.
export default async function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Roundel size={92} ring={9} />
      </div>
    ),
    { ...size, fonts: await liveryFonts() },
  );
}
