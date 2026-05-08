import { type ReactNode } from "react";

type Props = { children: ReactNode; variant?: "default" | "accent" | "faint" };

export function SystemLabel({ children, variant = "default" }: Props) {
  const color = variant === "accent" ? "var(--accent)" : variant === "faint" ? "var(--fg-faint)" : "var(--fg-dim)";
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
      color,
    }}>
      {children}
    </span>
  );
}
