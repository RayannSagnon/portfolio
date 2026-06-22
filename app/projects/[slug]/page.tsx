import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { projectShowcases } from "@/content/projectShowcases";
import { ProjectBackButton } from "@/components/projects/ProjectBackButton";
import { ProjectRepoLink } from "@/components/projects/ProjectRepoLink";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};
  const url = absoluteUrl(`/projects/${project.slug}`);
  const showcase = projectShowcases[project.slug];

  return {
    title: project.name,
    description: project.blurb,
    alternates: { canonical: url },
    openGraph: {
      title: project.name,
      description: project.blurb,
      url,
      type: "article",
      ...(showcase ? { images: [{ url: showcase.hero.src, alt: showcase.hero.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.blurb,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const showcase = projectShowcases[slug];

  return (
    <main style={{ minHeight: "100vh", padding: "16vh 8vw", display: "flex", flexDirection: "column", gap: "8vh" }}>
      <div>
        <ProjectBackButton />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 9, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          {project.code}  /  {project.type}
        </span>
        <h1 style={{
          fontWeight: 800,
          fontSize: "clamp(48px, 8vw, 120px)",
          lineHeight: 0.88, letterSpacing: "-0.045em",
          color: "var(--fg)",
        }}>
          {project.name}
        </h1>
        <p style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 9, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          {project.tag}
        </p>
      </div>

      <p style={{
        maxWidth: 720,
        fontSize: "clamp(16px, 1.6vw, 22px)",
        lineHeight: 1.6, color: "var(--fg-dim)", fontWeight: 300,
      }}>
        {project.blurb}
      </p>

      {project.repoUrl ? (
        <ProjectRepoLink href={project.repoUrl} />
      ) : null}

      {showcase ? (
        <ProjectShowcase
          showcase={showcase}
          hue={project.hue}
          projectName={project.name}
        />
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
        {[
          { title: "Architecture", rows: project.architecture },
          { title: "Trade-offs",   rows: project.tradeoffs },
          { title: "Highlights",   rows: project.highlights },
        ].map(({ title, rows }) => rows.length > 0 && (
          <div key={title} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9, color: "var(--fg-faint)", letterSpacing: "0.2em", textTransform: "uppercase",
              paddingBottom: 12, borderBottom: "1px solid var(--line)",
            }}>
              {title}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {rows.map(([k, v]) => (
                <div key={k} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 9, color: "var(--accent)", letterSpacing: "0.1em",
                  }}>
                    {k}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--fg-dim)", lineHeight: 1.5 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}


