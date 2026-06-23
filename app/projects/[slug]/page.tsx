import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { projectShowcases } from "@/content/projectShowcases";
import { ProjectBackButton } from "@/components/projects/ProjectBackButton";
import { ProjectDocs } from "@/components/projects/ProjectDocs";
import { ProjectHeroBanner } from "@/components/projects/ProjectHeroBanner";
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

const metaStyle = {
  fontFamily: "var(--font-jetbrains), monospace",
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const showcase = projectShowcases[slug];
  const hasBanner = Boolean(showcase);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: hasBanner ? 0 : "16vh 8vw",
        display: "flex",
        flexDirection: "column",
        gap: hasBanner ? 0 : "8vh",
      }}
    >
      {hasBanner ? (
        <ProjectHeroBanner hero={showcase.hero} projectName={project.name} />
      ) : (
        <div>
          <ProjectBackButton />
        </div>
      )}

      <div
        style={{
          padding: hasBanner ? "clamp(2.5rem, 6vh, 4.5rem) 8vw 16vh" : 0,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.75rem, 3.5vh, 2.75rem)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ ...metaStyle, color: "var(--accent)" }}>
            {project.code}  /  {project.type}
          </span>

          {hasBanner ? (
            <h1
              className="sr-only"
              style={{
                fontWeight: 800,
                fontSize: "clamp(48px, 8vw, 120px)",
                lineHeight: 0.88,
                letterSpacing: "-0.045em",
                color: "var(--fg)",
              }}
            >
              {project.name}
            </h1>
          ) : (
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(48px, 8vw, 120px)",
                lineHeight: 0.88,
                letterSpacing: "-0.045em",
                color: "var(--fg)",
              }}
            >
              {project.name}
            </h1>
          )}

          <p style={{ ...metaStyle, color: "var(--fg-faint)", letterSpacing: "0.1em" }}>
            {project.tag}
          </p>
        </div>

        <p
          style={{
            maxWidth: 720,
            fontSize: "clamp(16px, 1.6vw, 22px)",
            lineHeight: 1.6,
            color: "var(--fg-dim)",
            fontWeight: 300,
          }}
        >
          {project.blurb}
        </p>

        {project.repoUrl ? <ProjectRepoLink href={project.repoUrl} /> : null}

        {showcase ? (
          <ProjectShowcase
            showcase={showcase}
            hue={project.hue}
            projectName={project.name}
            hideHero
          />
        ) : null}

        <ProjectDocs project={project} />
      </div>
    </main>
  );
}
