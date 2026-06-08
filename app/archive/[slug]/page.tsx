import { notFound } from "next/navigation";
import { getArchivePost, getAllArchiveSlugs } from "@/lib/mdx";
import { BackButton } from "@/components/ui/BackButton";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArchiveSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getArchivePost(slug);
  if (!post) return {};
  return { title: `${post.frontmatter.title} — Rayann Sagnon` };
}

export default async function ArchivePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getArchivePost(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;

  return (
    <main style={{ minHeight: "100vh", padding: "16vh 8vw" }}>
      <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: "6vh" }}>
        {/* Nav */}
        <BackButton label="← Back" />

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            display: "flex", gap: 20, alignItems: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, color: "var(--fg-faint)", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            <span>{frontmatter.date}</span>
            <span>·</span>
            <span>{readingTime}</span>
            <span>·</span>
            <span>{frontmatter.category}</span>
          </div>
          <h1 style={{
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 56px)",
            lineHeight: 1.0, letterSpacing: "-0.04em",
            color: "var(--fg)",
          }}>
            {frontmatter.title}
          </h1>
        </div>

        {/* Content */}
        <div style={{
          fontSize: "clamp(15px, 1.4vw, 18px)",
          lineHeight: 1.75,
          color: "var(--fg-dim)",
          fontWeight: 300,
          whiteSpace: "pre-wrap",
        }}>
          {content}
        </div>
      </div>
    </main>
  );
}
