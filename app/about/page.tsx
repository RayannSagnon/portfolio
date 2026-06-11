import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/AboutExperience";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Beyond the Resume | Rayann Sagnon",
  description:
    "A personal introduction to Rayann Sagnon: origin, values, leadership, community, and the human story behind the engineering work.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "Beyond the Resume | Rayann Sagnon",
    description:
      "The personal story behind Rayann Sagnon's engineering portfolio, from Burkina Faso to Ottawa.",
    url: absoluteUrl("/about"),
    type: "profile",
  },
};

export default function AboutPage() {
  return <AboutExperience />;
}
