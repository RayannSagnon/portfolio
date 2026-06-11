"use client";
import { useRouter } from "next/navigation";

export function ProjectBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        try {
          sessionStorage.setItem("rs_scroll_target", "projects");
        } catch {}
        router.push("/", { scroll: false });
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 9,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--fg-faint)",
        transition: "color 0.3s",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.color = "var(--fg-dim)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.color = "var(--fg-faint)";
      }}
    >
      Back
    </button>
  );
}


