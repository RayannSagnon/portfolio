type Props = { chapter: string };

export function SideRails({ chapter }: Props) {
  const base: React.CSSProperties = {
    position: "fixed", top: "50%",
    zIndex: 40,
    fontFamily: "var(--font-jetbrains), monospace",
    fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.15em",
    pointerEvents: "none",
    writingMode: "vertical-rl",
  };

  return (
    <>
      <div
        aria-hidden
        style={{ ...base, left: 18, transform: "translateY(-50%)", textOrientation: "mixed" }}
      >
        RAYANN&nbsp;SAGNON&nbsp;&nbsp;CHAPTER&nbsp;{chapter}
      </div>
      <div
        aria-hidden
        style={{ ...base, right: 18, transform: "translateY(-50%) rotate(180deg)" }}
      >
        RSAGN083@UOTTAWA&nbsp;&nbsp;OTT/CA
      </div>
    </>
  );
}


