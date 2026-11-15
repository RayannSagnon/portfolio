import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { projects } from "@/content/projects";
import { projectShowcases } from "@/content/projectShowcases";
import { ProjectPageClient } from "@/components/projects/ProjectPageClient";
import { ProjectStory } from "@/components/site/pages/ProjectStory";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug === "standout")
    return pageMetadata({
      title: "Standout Studio",
      description:
        "Standout Studio, the bilingual Ottawa web studio co-founded by Rayann Sagnon, who mainly designs and codes the sites for small businesses.",
      path: "/projects/standout",
      image: { url: "/images/site/standout-poster.jpg", width: 1680, height: 1800, alt: "The Standout Studio homepage, with the headline Stand out" },
      type: "article",
    });
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
  if (!project || project.comingSoon) notFound();

  if (slug === "standout")
    return (
      <>
        <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/#work" }, { name: "Standout Studio", path: "/projects/standout" }])} />
        <ProjectStory slug="standout" />
      </>
    );

  return <ProjectPageClient slug={slug} />;
}
