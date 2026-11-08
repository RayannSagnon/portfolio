import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const INK = "#0a0a0b";
export const PAPER = "#f5f5f2";
export const DIM = "#9e9e99";

// A static instance of the site typeface for generated images.
export async function cardFonts() {
  const data = await readFile(join(process.cwd(), "assets", "fonts", "InstrumentSans-Medium.ttf"));
  return [{ name: "Instrument Sans", data, weight: 500 as const, style: "normal" as const }];
}

export function Monogram({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: INK,
        color: PAPER,
        fontFamily: "Instrument Sans",
        fontSize: size,
        letterSpacing: -size * 0.05,
      }}
    >
      RS
    </div>
  );
}
