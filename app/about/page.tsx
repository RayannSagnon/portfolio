import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/AboutExperience";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import { profilePageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Rayann Sagnon — from Burkina Faso to Ottawa. The personal story behind the engineering portfolio of Rayann Sagnon, uOttawa electrical engineering student.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: `About ${site.name}`,
    description:
      "The personal story behind Rayann Sagnon's engineering portfolio, from Burkina Faso to Ottawa.",
    url: absoluteUrl("/about"),
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <AboutExperience />
    </>
  );
}
