import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { archiveEntries, featuredArchiveEntry } from "@/content/site";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import { archiveCaramelTheme } from "@/lib/archiveTheme";

export function ArchivePreview() {
  const recentArticles = archiveEntries
    .filter((entry) => entry.slug !== featuredArchiveEntry.slug)
    .slice(0, 3);

  return (
    <section
      id="archive"
      data-section="ARCHIVE"
      data-num="06"
      style={{
        ...archiveCaramelTheme,
        padding: "14vh 8vw",
        display: "flex",
        flexDirection: "column",
        gap: "7vh",
      }}
    >
      <style>{`
        .archive-preview-head {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.46fr);
          align-items: end;
          gap: 6vw;
        }
        .archive-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .archive-preview-link {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition:
            transform 0.34s var(--ease),
            color 0.34s var(--ease),
            border-color 0.34s var(--ease),
            box-shadow 0.34s var(--ease);
        }
        .archive-preview-link::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(90deg, var(--accent), #9a5c37);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.42s cubic-bezier(0.2, 0.8, 0.05, 1);
        }
        .archive-preview-link > span,
        .archive-preview-link > svg {
          position: relative;
          z-index: 1;
        }
        .archive-preview-link:hover,
        .archive-preview-link:focus-visible {
          color: #fff7ed !important;
          border-color: rgba(127,38,53,0.52) !important;
          box-shadow: 0 16px 34px rgba(84,53,25,0.16);
          transform: translateY(-2px);
        }
        .archive-preview-link:hover::before,
        .archive-preview-link:focus-visible::before {
          transform: scaleX(1);
        }
        @media (max-width: 1040px) {
          .archive-preview-head,
          .archive-preview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Reveal>
        <div className="archive-preview-head">
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 9,
                color: "var(--accent)",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              Journal / essays and breakdowns
            </span>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(42px, 7vw, 104px)",
                lineHeight: 0.86,
                letterSpacing: "-0.052em",
                color: "#151311",
                maxWidth: 720,
              }}
            >
              Engineering<br />
              <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>
                journal.
              </em>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
            <p
              style={{
                color: "var(--fg-dim)",
                fontSize: "clamp(14px, 1.2vw, 17px)",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Essays, breakdowns, and engineering reflections from the projects I build,
              break, and study.
            </p>
            <Link
              href="/archive"
              className="archive-preview-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fg-dim)",
                border: "1px solid var(--line-strong)",
                padding: "11px 20px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              <span>All articles</span>
              <ArrowRight size={13} strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
            }}
          >
            Featured article
          </span>
          <ArticleCard entry={featuredArchiveEntry} variant="featured" />
        </div>
      </Reveal>

      <div className="archive-preview-grid">
        {recentArticles.map((entry, index) => (
          <Reveal key={entry.slug} delay={index * 80}>
            <ArticleCard entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

