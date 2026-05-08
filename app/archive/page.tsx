"use client";
import Link from "next/link";
import { archiveEntries } from "@/content/site";


export default function ArchivePage() {
  return (
    <main style={{ minHeight: "100vh", padding: "16vh 8vw", display: "flex", flexDirection: "column", gap: "8vh" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.2em", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <Link href="/" style={{ color: "var(--fg-faint)", textDecoration: "none" }}>←</Link>
          <span style={{ width: 28, height: 1, background: "var(--accent)", display: "inline-block" }} aria-hidden />
          Archive
        </div>
        <h1 style={{
          fontWeight: 800,
          fontSize: "clamp(40px, 6vw, 90px)",
          lineHeight: 0.9, letterSpacing: "-0.04em",
          color: "var(--fg)",
        }}>
          Notes from<br />
          <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>
            the field.
          </em>
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {archiveEntries.map(({ slug, code, title, preview, readTime, date }) => (
          <Link key={slug} href={`/archive/${slug}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 120px",
                gap: "0 32px",
                alignItems: "center",
                padding: "32px 0",
                borderBottom: "1px solid var(--line)",
                transition: "background 0.3s var(--ease)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(232,228,220,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, color: "var(--fg-faint)",
                letterSpacing: "0.15em", textTransform: "uppercase",
              }}>
                {code}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{
                  fontWeight: 600,
                  fontSize: "clamp(15px, 1.6vw, 20px)",
                  color: "var(--fg)",
                  letterSpacing: "-0.02em", lineHeight: 1.2,
                }}>
                  {title}
                </p>
                <p style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "var(--fg-faint)", lineHeight: 1.5 }}>
                  {preview}
                </p>
              </div>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, color: "var(--fg-faint)",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                <span>{date}</span>
                <span>{readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
