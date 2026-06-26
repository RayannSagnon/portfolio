"use client";

import { useContent } from "@/lib/i18n/LocaleProvider";
import { ProjectBackButton } from "@/components/projects/ProjectBackButton";
import { ProjectDocs } from "@/components/projects/ProjectDocs";
import { ProjectHeroBanner } from "@/components/projects/ProjectHeroBanner";
import { ProjectRepoLink } from "@/components/projects/ProjectRepoLink";
import { ProjectVisualStory } from "@/components/projects/ProjectVisualStory";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import type { ProjectStoryData } from "@/content/projectStories";
import type { ProjectShowcaseData } from "@/content/projectShowcases";
import type { Project } from "@/content/projects";

const metaStyle = {
  fontFamily: "var(--font-jetbrains), monospace",
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

type Props = {
  slug: string;
};

export function ProjectPageClient({ slug }: Props) {
  const { projects, projectShowcases, projectStories } = useContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  const showcase = projectShowcases[slug];
  const showHeroBanner = showcase?.showHeroBanner === true;
  const visualStory = projectStories[slug];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: showHeroBanner ? 0 : "16vh 8vw",
        display: "flex",
        flexDirection: "column",
        gap: showHeroBanner ? 0 : "8vh",
      }}
    >
      {showHeroBanner && showcase ? (
        <ProjectHeroBanner hero={showcase.hero} projectName={project.name} />
      ) : (
        <div>
          <ProjectBackButton />
        </div>
      )}

      <div
        style={{
          padding: showHeroBanner ? "clamp(2.5rem, 6vh, 4.5rem) 8vw 16vh" : 0,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.75rem, 3.5vh, 2.75rem)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ ...metaStyle, color: "var(--accent)" }}>
            {project.code}  /  {project.type}
          </span>

          {showHeroBanner ? (
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

        {visualStory ? (
          <ProjectVisualStory
            story={visualStory as ProjectStoryData}
            hue={project.hue}
            projectName={project.name}
          />
        ) : null}

        {showcase ? (
          <ProjectShowcase
            showcase={showcase as ProjectShowcaseData}
            hue={project.hue}
            projectName={project.name}
            hideHero
          />
        ) : null}

        <ProjectDocs project={project as Project} />
      </div>
    </main>
  );
}
