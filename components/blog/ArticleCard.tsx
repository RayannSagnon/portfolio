import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Star } from "lucide-react";
import type { ReactNode } from "react";
import type { ArchiveEntry } from "@/content/site";
import { ArticleVisual } from "./ArticleVisual";

type Props = {
  entry: ArchiveEntry;
  variant?: "featured" | "grid" | "compact";
};

function MetaPill({
  children,
  hue,
}: {
  children: ReactNode;
  hue: number;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: "1px solid var(--article-line-strong, rgba(232,228,220,0.12))",
        background: "var(--article-pill-bg, rgba(232,228,220,0.045))",
        color: `hsl(${hue}, 62%, var(--article-accent-lightness, 68%))`,
        borderRadius: 999,
        padding: "6px 10px",
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 8,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

export function ArticleCard({ entry, variant = "grid" }: Props) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const floatDuration = `${6.8 + (entry.accent % 5) * 0.3}s`;
  const floatDelay = `-${(entry.accent % 9) * 0.28}s`;

  return (
    <Link
      href={`/archive/${entry.slug}`}
      className={`article-card article-card--${variant}`}
      style={{
        ["--article-hue" as string]: entry.accent,
        ["--article-float-duration" as string]: floatDuration,
        ["--article-float-delay" as string]: floatDelay,
        ["--article-float-up" as string]: isFeatured ? "-5px" : "-3.5px",
        ["--article-float-down" as string]: isFeatured ? "1.5px" : "1px",
        position: "relative",
        display: "grid",
        gridTemplateColumns: isFeatured ? "minmax(280px, 0.92fr) minmax(300px, 1fr)" : "1fr",
        minHeight: isFeatured ? 360 : undefined,
        overflow: "hidden",
        border: "1px solid var(--article-line-strong, rgba(232,228,220,0.12))",
        borderRadius: 8,
        background:
          "linear-gradient(145deg, var(--article-surface, rgba(232,228,220,0.05)), var(--article-surface-soft, rgba(232,228,220,0.02)) 42%, var(--article-surface-low, rgba(0,0,0,0.12)))",
        textDecoration: "none",
        boxShadow: "var(--article-shadow, 0 24px 70px rgba(0,0,0,0.34))",
        transition:
          "transform 0.45s cubic-bezier(0.2,0.8,0.05,1), border-color 0.45s cubic-bezier(0.2,0.8,0.05,1), box-shadow 0.45s cubic-bezier(0.2,0.8,0.05,1)",
      }}
    >
      <style>{`
        @keyframes article-float {
          0%, 100% {
            translate: 0 0;
          }
          48% {
            translate: 0 var(--article-float-up);
          }
          72% {
            translate: 0 var(--article-float-down);
          }
        }
        .article-card {
          animation: article-float var(--article-float-duration, 7s) ease-in-out infinite;
          animation-delay: var(--article-float-delay, 0s);
          will-change: translate, transform;
        }
        .article-card:hover {
          transform: translateY(-6px);
          border-color: hsla(var(--article-hue), 62%, 58%, 0.42);
          box-shadow: var(--article-shadow-hover, 0 34px 90px rgba(0,0,0,0.48), 0 0 38px hsla(var(--article-hue), 62%, 42%, 0.11));
        }
        .article-card:hover .article-arrow {
          transform: translate(2px, -2px);
          color: #fff7ed;
          border-color: hsla(var(--article-hue), 58%, 42%, 0.42) !important;
          box-shadow: 0 12px 24px rgba(84,53,25,0.16);
        }
        .article-card:hover .article-arrow::before,
        .article-card:focus-visible .article-arrow::before {
          transform: scale(1);
        }
        .article-card:focus-visible .article-arrow {
          color: #fff7ed;
          border-color: hsla(var(--article-hue), 58%, 42%, 0.42) !important;
          box-shadow: 0 12px 24px rgba(84,53,25,0.16);
        }
        .article-arrow {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .article-arrow::before {
          content: "";
          position: absolute;
          inset: -1px;
          z-index: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            hsl(var(--article-hue), 44%, 38%),
            hsl(var(--article-hue), 34%, 49%)
          );
          transform: scale(0);
          transform-origin: 35% 70%;
          transition: transform 0.36s cubic-bezier(0.2,0.8,0.05,1);
        }
        .article-arrow > svg {
          position: relative;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .article-card--featured {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .article-card {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>

      <div style={{ minHeight: isFeatured ? 360 : isCompact ? 150 : 210 }}>
        <ArticleVisual visual={entry.visual} hue={entry.accent} featured={isFeatured} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isFeatured ? 22 : 16,
          justifyContent: "space-between",
          padding: isFeatured ? "34px 34px 30px" : "22px 20px 20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: isFeatured ? 18 : 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            {entry.featured && (
              <MetaPill hue={entry.accent}>
                <Star size={11} strokeWidth={1.8} />
                Featured
              </MetaPill>
            )}
            <MetaPill hue={entry.accent}>
              <CalendarDays size={11} strokeWidth={1.8} />
              {entry.date}
            </MetaPill>
            <MetaPill hue={entry.accent}>
              <Clock3 size={11} strokeWidth={1.8} />
              {entry.readTime}
            </MetaPill>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 8,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: `hsl(${entry.accent}, 60%, var(--article-accent-lightness, 62%))`,
              }}
            >
              {entry.code} / {entry.categoryLabel}
            </span>
            <h3
              style={{
                color: "var(--article-text, var(--fg))",
                fontWeight: 800,
                fontSize: isFeatured ? "clamp(26px, 3.3vw, 48px)" : "clamp(18px, 1.8vw, 23px)",
                lineHeight: isFeatured ? 0.98 : 1.12,
                letterSpacing: "-0.035em",
              }}
            >
              {entry.title}
            </h3>
            <p
              style={{
                color: "var(--article-muted, var(--fg-faint))",
                fontSize: isFeatured ? "clamp(13px, 1.15vw, 16px)" : 13,
                lineHeight: 1.65,
                fontWeight: 300,
                maxWidth: isFeatured ? 560 : undefined,
              }}
            >
              {entry.preview}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {entry.tags.slice(0, isFeatured ? 3 : 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 8,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--article-faint, var(--fg-faint))",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
          <span
            aria-hidden
            className="article-arrow"
            style={{
              display: "inline-flex",
              width: 34,
              height: 34,
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--article-line-strong, rgba(232,228,220,0.12))",
              borderRadius: 999,
              color: "var(--article-faint, var(--fg-faint))",
              flexShrink: 0,
              transition:
                "transform 0.32s var(--ease), color 0.32s var(--ease), border-color 0.32s var(--ease), box-shadow 0.32s var(--ease)",
            }}
          >
            <ArrowUpRight size={15} strokeWidth={1.6} />
          </span>
        </div>
      </div>
    </Link>
  );
}

