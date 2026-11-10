import { ImageResponse } from "next/og";
import { InitialsMark, cardFonts } from "@/lib/og/card";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<InitialsMark size={size.width} />, { ...size, fonts: await cardFonts() });
}
