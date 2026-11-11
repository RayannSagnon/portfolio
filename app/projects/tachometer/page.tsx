import type { Metadata } from "next";
import { ProjectStory } from "@/components/site/pages/ProjectStory";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Automotive Dashboard PCB",
  description: "A custom two-layer automotive dashboard PCB designed in Altium for uOSupermileage's electrical initiation project: an LED tachometer, turn signals and automatic headlights.",
  alternates: { canonical: absoluteUrl("/projects/tachometer") },
};

export default function Page() {
  return <ProjectStory slug="tachometer" />;
}
