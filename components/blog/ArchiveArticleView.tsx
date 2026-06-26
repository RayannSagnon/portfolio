"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, Folder } from "lucide-react";
import { ArticleVisual } from "@/components/blog/ArticleVisual";
import type { BlogVisual } from "@/content/site";
import { ArchiveMarkdown } from "@/components/blog/archiveMdxComponents";
import { useContent, useLocale, useUI } from "@/lib/i18n/LocaleProvider";
import { getArchivePostForLocale } from "@/lib/archive/posts";
import { archiveCaramelTheme } from "@/lib/archiveTheme";
import { getArchiveHeadings } from "@/lib/archive/mdxUtils";

type Props = {
  slug: string;
};

export function ArchiveArticleView({ slug }: Props) {
  const { locale } = useLocale();
  const ui = useUI();
  const { archive, projects } = useContent();
  const post = getArchivePostForLocale(slug, locale);
  const entry = archive.archiveEntries.find((item) => item.slug === slug);
  const relatedProject = entry?.relatedProject
    ? projects.find((project) => project.slug === entry.relatedProject)
    : null;

  if (!post) return null;

  const headings = getArchiveHeadings(post.content).filter((heading) => heading.level === 2);
  const hue = entry?.accent ?? 160;

  return (
    <main
      style={{
        ...archiveCaramelTheme,
        minHeight: "100vh",
        padding: "12vh 8vw 14vh",
        ["--accent" as string]: `hsl(${hue}, 62%, 52%)`,
        ["--accent-soft" as string]: `hsla(${hue}, 52%, 42%, 0.16)`,
        ["--accent-glow" as string]: `hsla(${hue}, 60%, 45%, 0.22)`,
      }}
    >
      <style>{`
        .article-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.56fr);
          gap: 6vw;
          align-items: end;
        }
        .article-reading-grid {
          display: grid;
          grid-template-columns: 240px minmax(0, 760px);
          gap: 6vw;
          align-items: start;
          margin-top: 9vh;
        }
        .article-aside {
          position: sticky;
          top: 120px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        @media (max-width: 1040px) {
          .article-hero-grid,
          .article-reading-grid {
            grid-template-columns: 1fr;
          }
          .article-aside {
            position: relative;
            top: auto;
          }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "8vh" }}>
        <Link
          href="/archive"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--fg-faint)",
            textDecoration: "none",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <ArrowLeft size={13} strokeWidth={1.6} />
          {ui.archive.archiveLabel}
        </Link>
        <span style={{ width: 28, height: 1, background: "var(--accent)", display: "inline-block" }} aria-hidden />
        <span
          style={{
            color: "var(--fg-faint)",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {entry?.code ?? "A / 000"}
        </span>
      </div>

      <header className="article-hero-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { icon: CalendarDays, value: entry?.date ?? post.frontmatter.date },
              { icon: Clock3, value: post.readingTime.toUpperCase() },
              { icon: Folder, value: entry?.categoryLabel ?? post.frontmatter.category },
            ].map(({ icon: Icon, value }) => (
              <span
                key={value}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  border: "1px solid var(--line-strong)",
                  borderRadius: 999,
                  padding: "8px 11px",
                  color: "var(--fg-faint)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 8,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                <Icon size={12} strokeWidth={1.6} />
                {value}
              </span>
            ))}
          </div>

          <h1
            style={{
              color: "var(--fg)",
              fontWeight: 900,
              fontSize: "clamp(42px, 6vw, 92px)",
              lineHeight: 0.88,
              letterSpacing: "-0.055em",
              maxWidth: 920,
            }}
          >
            {entry?.title ?? post.frontmatter.title}
          </h1>

          <p
            style={{
              color: "var(--fg-dim)",
              fontSize: "clamp(16px, 1.45vw, 21px)",
              lineHeight: 1.65,
              fontWeight: 300,
              maxWidth: 720,
            }}
          >
            {entry?.preview}
          </p>

          {entry ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 8,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg-faint)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {entry ? (
          <div
            style={{
              border: "1px solid var(--line-strong)",
              borderRadius: 8,
              overflow: "hidden",
              minHeight: 360,
              boxShadow: "0 26px 70px rgba(42,34,26,0.16)",
            }}
          >
            <ArticleVisual visual={entry.visual as BlogVisual} hue={hue} featured />
          </div>
        ) : null}
      </header>

      <div className="article-reading-grid">
        <aside className="article-aside">
          {headings.length > 0 ? (
            <nav
              aria-label="Article table of contents"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                paddingTop: 18,
                borderTop: "1px solid var(--line)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--fg-faint)",
                }}
              >
                {ui.archive.inThisArticle}
              </span>
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  style={{
                    color: "var(--fg-faint)",
                    textDecoration: "none",
                    fontSize: 13,
                    lineHeight: 1.45,
                    transition: "color 0.25s var(--ease)",
                  }}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          ) : null}

          {relatedProject ? (
            <Link
              href={`/projects/${relatedProject.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                border: "1px solid var(--line-strong)",
                borderRadius: 8,
                padding: 18,
                background: "rgba(255,248,236,0.58)",
                color: "var(--fg)",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {ui.archive.relatedProject}
              </span>
              <strong style={{ fontSize: 18, lineHeight: 1.15, letterSpacing: "-0.03em" }}>
                {relatedProject.name}
              </strong>
              <span style={{ color: "var(--fg-faint)", fontSize: 12, lineHeight: 1.5 }}>
                {relatedProject.tag}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--fg-dim)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 8,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {ui.archive.openProject}
                <ArrowUpRight size={12} strokeWidth={1.6} />
              </span>
            </Link>
          ) : null}
        </aside>

        <article>
          <ArchiveMarkdown content={post.content} />
        </article>
      </div>
    </main>
  );
}
