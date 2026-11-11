import type { Metadata } from "next";
import { ProjectStory } from "@/components/site/pages/ProjectStory";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GoForIt",
  description: "GoForIt, an all-in-one wellness app for iPhone with an AI guide called Malo, co-founded by Rayann Sagnon. In development, not released yet.",
  alternates: { canonical: absoluteUrl("/projects/goforit") },
};

export default function Page() {
  return <ProjectStory slug="goforit" />;
}
