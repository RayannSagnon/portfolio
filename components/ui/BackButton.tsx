"use client";
import { useRouter } from "next/navigation";

export function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--fg-faint)",
        transition: "color 0.3s",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--fg-dim)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-faint)")}
    >
      {label}
    </button>
  );
}

