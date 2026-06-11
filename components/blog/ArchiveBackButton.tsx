"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ArchiveBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        try {
          sessionStorage.setItem("rs_scroll_target", "archive");
        } catch {}
        router.push("/", { scroll: false });
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        color: "#6f675f",
        textDecoration: "none",
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 9,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      <ArrowLeft size={13} strokeWidth={1.6} />
      Back
    </button>
  );
}

