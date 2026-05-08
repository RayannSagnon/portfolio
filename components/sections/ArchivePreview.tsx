"use client";
import Link from "next/link";
import { archiveEntries } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function ArchivePreview() {
  return (
    <section
      id="archive"
      data-section="ARCHIVE"
      data-num="06"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "8vh" }}
    >
      <Reveal>
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 5.5vw, 80px)",
              lineHeight: 0.9, letterSpacing: "-0.04em",
              color: "var(--fg)", maxWidth: 600,
            }}>
              Notes from<br />
              <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>
                the field.
              </em>
            </h2>
          </div>
          <Link
            href="/archive"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--fg-dim)",
              border: "1px solid var(--line-strong)",
              padding: "10px 22px",
              borderRadius: 999,
              textDecoration: "none",
              transition: "color 0.3s var(--ease), border-color 0.3s var(--ease)",
            }}
          >
            Full archive →
          </Link>
        </div>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {archiveEntries.slice(0, 4).map(({ slug, code, title, preview, readTime, date }, i) => (
          <Reveal key={slug} delay={i * 80}>
            <Link
              href={`/archive/${slug}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 120px",
                gap: "0 32px",
                alignItems: "center",
                padding: "28px 0",
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
                    fontSize: "clamp(14px, 1.4vw, 18px)",
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}>
                    {title}
                  </p>
                  <p style={{
                    fontSize: "clamp(12px, 1vw, 13px)",
                    color: "var(--fg-faint)",
                    lineHeight: 1.5,
                  }}>
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
