"use client";

import Link from "next/link";
import { useUI } from "@/lib/i18n/LocaleProvider";

export function NotFoundClient() {
  const ui = useUI();

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "18vh 8vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 9,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        {ui.notFound.code}
      </span>
      <h1
        style={{
          maxWidth: 820,
          fontWeight: 900,
          fontSize: "clamp(46px, 8vw, 112px)",
          lineHeight: 0.9,
          color: "var(--fg)",
        }}
      >
        {ui.notFound.title}
      </h1>
      <p style={{ maxWidth: 560, color: "var(--fg-dim)", fontSize: 18, lineHeight: 1.6 }}>
        {ui.notFound.body}
      </p>
      <Link
        href="/"
        style={{
          width: "fit-content",
          border: "1px solid var(--line-strong)",
          borderRadius: 999,
          padding: "12px 18px",
          color: "var(--fg)",
          textDecoration: "none",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {ui.notFound.backHome}
      </Link>
    </main>
  );
}
