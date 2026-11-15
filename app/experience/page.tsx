import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { ExperiencePage } from "@/components/site/pages/ExperiencePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Rayann Sagnon's experience: electrical team member at uOttawa Supermileage, co-founder of Standout Studio, roles at the University of Ottawa, hands-on skills and CV.",
  path: "/experience",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Experience", path: "/experience" }])} />
      <ExperiencePage />
    </>
  );
}
