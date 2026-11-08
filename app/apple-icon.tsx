import { ImageResponse } from "next/og";
import { cardFonts, Monogram } from "@/lib/og/card";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<Monogram size={92} />, { ...size, fonts: await cardFonts() });
}
