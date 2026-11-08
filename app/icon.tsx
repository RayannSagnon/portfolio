import { ImageResponse } from "next/og";
import { cardFonts, Monogram } from "@/lib/og/card";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Monogram size={50} />, { ...size, fonts: await cardFonts() });
}
