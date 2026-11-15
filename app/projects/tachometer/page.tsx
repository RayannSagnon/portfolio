import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { ProjectStory } from "@/components/site/pages/ProjectStory";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Automotive Dashboard PCB",
  description:
    "Rayann Sagnon's first PCB, for uOttawa Supermileage: an LED tachometer, turn signals and automatic headlights on a two-layer board designed in Altium.",
  path: "/projects/tachometer",
  image: { url: "/images/site/tachometer-board-3d.jpg", width: 2002, height: 1210, alt: "3D view in Altium of Rayann Sagnon's automotive dashboard PCB" },
  type: "article",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/#work" }, { name: "Automotive Dashboard PCB", path: "/projects/tachometer" }])} />
      <ProjectStory slug="tachometer" />
    </>
  );
}
