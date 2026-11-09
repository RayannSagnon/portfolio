import { ImageResponse } from "next/og";
import { LedMark } from "@/lib/og/card";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<LedMark size={size.width} />, size);
}
