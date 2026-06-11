import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, Folder } from "lucide-react";
import { ArticleVisual } from "@/components/blog/ArticleVisual";
import { archiveEntries, type ArchiveEntry } from "@/content/site";
import { projects } from "@/content/projects";
import { archiveCaramelTheme } from "@/lib/archiveTheme";
import { absoluteUrl } from "@/lib/seo";
import {
  getArchiveHeadings,
  getArchivePost,
  getAllArchiveSlugs,
  slugifyHeading,
} from "@/lib/mdx";

type Props = { params: Promise<{ slug: string }> };

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  return "";
}

const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      id={slugifyHeading(nodeText(children))}
      {...props}
      style={{
        scrollMarginTop: 110,
        marginTop: 52,
        marginBottom: 16,
        color: "var(--fg)",
        fontSize: "clamp(26px, 3vw, 42px)",
        lineHeight: 1.02,
        letterSpacing: "-0.04em",
        fontWeight: 850,
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      id={slugifyHeading(nodeText(children))}
      {...props}
      style={{
        scrollMarginTop: 110,
        marginTop: 34,
        marginBottom: 12,
        color: "var(--fg)",
        fontSize: "clamp(20px, 2vw, 28px)",
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
        fontWeight: 760,
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      style={{
        margin: "0 0 22px",
        color: "var(--fg-dim)",
        fontSize: "clamp(16px, 1.35vw, 19px)",
        lineHeight: 1.82,
        fontWeight: 300,
        letterSpacing: "-0.005em",
      }}
    >
      {children}
    </p>
  ),
  strong: ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} style={{ color: "var(--fg)", fontWeight: 700 }}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      style={{
        margin: "42px 0",
        padding: "8px 0 8px 24px",
        borderLeft: "1px solid var(--accent)",
        color: "var(--fg)",
      }}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      style={{
        margin: "0 0 28px",
        paddingLeft: 22,
        color: "var(--fg-dim)",
        lineHeight: 1.8,
      }}
    >
      {children}
    </ul>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li {...props} style={{ marginBottom: 8, fontSize: "clamp(15px, 1.25vw, 18px)" }}>
      {children}
    </li>
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} style={{ margin: "48px 0", border: 0, borderTop: "1px solid var(--line)" }} />
  ),
  a: ({ children, href, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
      style={{ color: "var(--fg)", textDecorationColor: "var(--accent)", textUnderlineOffset: 4 }}
    >
      {children}
    </a>
  ),
};

export function generateStaticParams() {
  return getAllArchiveSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getArchivePost(slug);
  if (!post) return {};
  const entry = archiveEntries.find((item) => item.slug === slug);
  const title = entry?.title ?? post.frontmatter.title;
  const description = entry?.preview ?? post.frontmatter.title;
  const url = absoluteUrl(`/archive/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArchivePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getArchivePost(slug);
  if (!post) notFound();

  const entry = archiveEntries.find((item) => item.slug === slug) as ArchiveEntry | undefined;
  const relatedProject = entry?.relatedProject
    ? projects.find((project) => project.slug === entry.relatedProject)
    : null;
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
          Archive
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

          {entry && (
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
          )}
        </div>

        {entry && (
          <div
            style={{
              border: "1px solid var(--line-strong)",
              borderRadius: 8,
              overflow: "hidden",
              minHeight: 360,
              boxShadow: "0 26px 70px rgba(42,34,26,0.16)",
            }}
          >
            <ArticleVisual visual={entry.visual} hue={hue} featured />
          </div>
        )}
      </header>

      <div className="article-reading-grid">
        <aside className="article-aside">
          {headings.length > 0 && (
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
                In this article
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
          )}

          {relatedProject && (
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
                Related project
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
                Open project
                <ArrowUpRight size={12} strokeWidth={1.6} />
              </span>
            </Link>
          )}
        </aside>

        <article>
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>
      </div>
    </main>
  );
}


