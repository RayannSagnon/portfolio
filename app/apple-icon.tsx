import { ImageResponse } from "next/og";
import { LedMark } from "@/lib/og/card";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<LedMark size={size.width} />, size);
}
