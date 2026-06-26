"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BlogCategoryId, ArchiveEntry } from "@/content/site";
import { useContent, useUI } from "@/lib/i18n/LocaleProvider";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ArchiveBackButton } from "@/components/blog/ArchiveBackButton";
import { archiveCaramelTheme } from "@/lib/archiveTheme";

export default function ArchivePage() {
  const { archive } = useContent();
  const { archiveEntries, blogCategories, featuredArchiveEntry } = archive;
  const ui = useUI();
  const [activeCategory, setActiveCategory] = useState<BlogCategoryId>("all");
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return archiveEntries.filter((entry) => {
      const matchesCategory = activeCategory === "all" || entry.category === activeCategory;
      const haystack = [
        entry.title,
        entry.preview,
        entry.categoryLabel,
        ...entry.tags,
      ].join(" ").toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, archiveEntries]);

  const showEditorialFeature = activeCategory === "all" && query.trim().length === 0;
  const gridEntries = showEditorialFeature
    ? filteredEntries.filter((entry) => entry.slug !== featuredArchiveEntry.slug)
    : filteredEntries;

  return (
    <main
      style={{
        ...archiveCaramelTheme,
        minHeight: "100vh",
        padding: "13vh 8vw",
        display: "flex",
        flexDirection: "column",
        gap: "7vh",
      }}
    >
      <style>{`
        .blog-hub-hero {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.45fr);
          gap: 6vw;
          align-items: end;
        }
        .blog-filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          padding: 18px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .blog-category-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .blog-category-tab {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition:
            transform 0.34s var(--ease),
            border-color 0.34s var(--ease),
            color 0.34s var(--ease),
            box-shadow 0.34s var(--ease);
        }
        .blog-category-tab::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(90deg, var(--accent), #9a5c37);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.42s cubic-bezier(0.2, 0.8, 0.05, 1);
        }
        .blog-category-tab > span {
          position: relative;
          z-index: 1;
        }
        .blog-category-tab:hover,
        .blog-category-tab:focus-visible {
          color: #fff7ed !important;
          border-color: rgba(127,38,53,0.52) !important;
          box-shadow: 0 14px 28px rgba(84,53,25,0.14);
          transform: translateY(-2px);
        }
        .blog-category-tab:hover::before,
        .blog-category-tab:focus-visible::before,
        .blog-category-tab.is-active::before {
          transform: scaleX(1);
        }
        .blog-search {
          width: min(320px, 100%);
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 1080px) {
          .blog-hub-hero,
          .blog-grid {
            grid-template-columns: 1fr;
          }
          .blog-search {
            width: 100%;
          }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <ArchiveBackButton />
      </div>

      <section className="blog-hub-hero" style={{ padding: 0, minHeight: "auto", borderTop: "none" }}>
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
            {ui.archive.heroCount(archiveEntries.length)}
          </span>
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 118px)",
              lineHeight: 0.86,
              letterSpacing: "-0.055em",
              color: "#151311",
              maxWidth: 780,
            }}
          >
            {ui.archive.titleLine1}<br />
            <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>
              {ui.archive.titleLine2}
            </em>
          </h1>
        </div>

        <p
          style={{
            color: "var(--fg-dim)",
            fontSize: "clamp(14px, 1.25vw, 18px)",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          {ui.archive.body}
        </p>
      </section>

      <div className="blog-filter-row">
        <div className="blog-category-tabs" role="tablist" aria-label="Filter articles by category">
          {blogCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`blog-category-tab${isActive ? " is-active" : ""}`}
                onClick={() => setActiveCategory(category.id as BlogCategoryId)}
                style={{
                  border: isActive ? "1px solid var(--accent)" : "1px solid var(--line-strong)",
                  background: isActive ? "var(--accent)" : "rgba(255,248,236,0.52)",
                  color: isActive ? "#fff6e8" : "var(--fg-faint)",
                  borderRadius: 999,
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 8,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  transition:
                    "transform 0.34s var(--ease), border-color 0.34s var(--ease), color 0.34s var(--ease), background 0.34s var(--ease), box-shadow 0.34s var(--ease)",
                }}
              >
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        <label
          className="blog-search"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid var(--line-strong)",
            borderRadius: 999,
            padding: "0 14px",
            background: "rgba(255,248,236,0.56)",
            color: "var(--fg-faint)",
          }}
        >
          <Search size={14} strokeWidth={1.6} />
          <input
            aria-label={ui.archive.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.archive.searchPlaceholder}
            style={{
              width: "100%",
              height: 40,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--fg)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          />
        </label>
      </div>

      {showEditorialFeature && (
        <section style={{ padding: 0, minHeight: "auto", borderTop: "none", display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
            }}
          >
            {ui.archive.featuredArticle}
          </span>
          <ArticleCard entry={featuredArchiveEntry as ArchiveEntry} variant="featured" />
        </section>
      )}

      <section style={{ padding: 0, minHeight: "auto", borderTop: "none", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20 }}>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
            }}
          >
            {ui.archive.articlesVisible(filteredEntries.length)}
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--fg-faint)",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {ui.archive.clearSearch}
            </button>
          )}
        </div>

        {gridEntries.length > 0 ? (
          <div className="blog-grid">
            {gridEntries.map((entry) => (
              <ArticleCard key={entry.slug} entry={entry as ArchiveEntry} />
            ))}
          </div>
        ) : (
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "48px 32px",
              color: "var(--fg-faint)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {ui.archive.empty}
          </div>
        )}
      </section>
    </main>
  );
}

