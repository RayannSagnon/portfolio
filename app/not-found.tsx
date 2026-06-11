import Link from "next/link";

export default function NotFound() {
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
        404 / Page not found
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
        This page is not available.
      </h1>
      <p style={{ maxWidth: 560, color: "var(--fg-dim)", fontSize: 18, lineHeight: 1.6 }}>
        The page may have moved, or the link may no longer be available. Return to the main portfolio.
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
        Back home
      </Link>
    </main>
  );
}
