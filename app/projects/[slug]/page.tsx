import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { projectShowcases } from "@/content/projectShowcases";
import { ProjectPageClient } from "@/components/projects/ProjectPageClient";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
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
      ...(showcase
        ? {
            images: [{
              url: showcase.showHeroBanner
                ? showcase.hero.src
                : (showcase.screens[0]?.src ?? showcase.hero.src),
              alt: showcase.showHeroBanner
                ? showcase.hero.alt
                : (showcase.screens[0]?.alt ?? showcase.hero.alt),
            }],
          }
        : {}),
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
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectPageClient slug={slug} />;
}
