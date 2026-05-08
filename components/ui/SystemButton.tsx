"use client";
import { type ButtonHTMLAttributes } from "react";
import { PINGS } from "@/lib/sound";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

export function SystemButton({ label, onClick, ...rest }: Props) {
  return (
    <button
      {...rest}
      onMouseEnter={() => PINGS.hover()}
      onClick={(e) => { PINGS.click(); onClick?.(e); }}
      style={{
        background: "transparent",
        border: "1px solid var(--line-strong)",
        color: "var(--fg)",
        padding: "14px 22px",
        cursor: "pointer",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
        transition: "all 0.5s cubic-bezier(.2,.7,.1,1)",
        ...rest.style,
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLButtonElement).style.background  = "rgba(138,42,58,0.08)";
        (e.currentTarget as HTMLButtonElement).style.letterSpacing = "0.22em";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line-strong)";
        (e.currentTarget as HTMLButtonElement).style.background  = "transparent";
        (e.currentTarget as HTMLButtonElement).style.letterSpacing = "0.18em";
      }}
    >
      {label}
    </button>
  );
}
