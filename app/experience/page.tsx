import type { Metadata } from "next";
import { ExperiencePage } from "@/components/site/pages/ExperiencePage";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Experience",
  description: "Rayann Sagnon's jobs, hands-on skills and school: uOttawa Supermileage, Standout Studio, the University of Ottawa and Groupe scolaire les Lauréats.",
  alternates: { canonical: absoluteUrl("/experience") },
};

export default function Page() {
  return <ExperiencePage />;
}
