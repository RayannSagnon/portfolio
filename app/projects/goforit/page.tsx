import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { ProjectStory } from "@/components/site/pages/ProjectStory";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "GoForIt",
  description:
    "GoForIt, an all-in-one wellness app for iPhone with an AI guide called Malo, co-founded by Rayann Sagnon, who leads the technical side. In development.",
  path: "/projects/goforit",
  type: "article",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/#work" }, { name: "GoForIt", path: "/projects/goforit" }])} />
      <ProjectStory slug="goforit" />
    </>
  );
}
