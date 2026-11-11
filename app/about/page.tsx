import type { Metadata } from "next";
import { AboutPage as About } from "@/components/site/pages/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import { profilePageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Rayann Sagnon, from Ouagadougou to Ottawa: what drives him, and why he chose electrical engineering at the University of Ottawa.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: `About ${site.name}`,
    description:
      "The personal story behind Rayann Sagnon's engineering portfolio, from Burkina Faso to Ottawa.",
    url: absoluteUrl("/about"),
    type: "profile",
    images: [
      {
        url: absoluteUrl(site.profileImage),
        width: 1200,
        height: 1600,
        alt: site.profileImageAlt,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <About />
    </>
  );
}
