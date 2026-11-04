import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Static Archivo instances (OFL) for generated images: the variable web font can't be used there.
export async function liveryFonts() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [black, bold] = await Promise.all([
    readFile(join(dir, "Archivo-CondensedBlackItalic.ttf")),
    readFile(join(dir, "Archivo-SemiCondensedBold.ttf")),
  ]);
  return [
    { name: "ArchivoBlack", data: black, weight: 900 as const, style: "italic" as const },
    { name: "ArchivoBold", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

export const LIVERY = {
  shell: "#f5f5f2",
  shellHi: "#ffffff",
  ink: "#111111",
  inkSoft: "#2b2b2b",
  garnet: "#8f001a",
};

/** The RS roundel, sized to the box it is drawn in. */
export function Roundel({ size, ring }: { size: number; ring: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: `${ring}px solid ${LIVERY.ink}`,
        background: LIVERY.shellHi,
        color: LIVERY.ink,
        fontFamily: "ArchivoBlack",
        fontStyle: "italic",
        fontWeight: 900,
        fontSize: size * 0.46,
        lineHeight: 1,
        paddingRight: size * 0.03,
      }}
    >
      RS
    </div>
  );
}
