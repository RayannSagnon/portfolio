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

/** The site's signature: the tachometer's four LEDs, climbing. Drawn on a 96 unit square. */
export function LedMark({ size }: { size: number }) {
  const u = size / 96;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: INK }}>
      {[
        [16, 80],
        [37, 62],
        [59, 44],
        [80, 26],
      ].map(([x, y]) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: (x - 11) * u,
            top: (y - 11) * u,
            width: 22 * u,
            height: 22 * u,
            borderRadius: "50%",
            background: PAPER,
          }}
        />
      ))}
    </div>
  );
}
