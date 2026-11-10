import { ImageResponse } from "next/og";
import { InitialsMark, cardFonts } from "@/lib/og/card";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<InitialsMark size={size.width} />, { ...size, fonts: await cardFonts() });
}
