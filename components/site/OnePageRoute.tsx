import { existsSync } from "node:fs";
import path from "node:path";
import { OnePage } from "./OnePage";
import type { Stop } from "./useDeck";

// The CV link only shows once the file is actually in public/documents.
const hasCv = existsSync(path.join(process.cwd(), "public", "documents", "rayann-sagnon-cv.pdf"));

/** Every public route is the same continuous page, opened at its own section. */
export function OnePageRoute({ start }: { start?: Stop }) {
  return <OnePage start={start} hasCv={hasCv} />;
}
