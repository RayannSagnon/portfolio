import type { Metadata } from "next";
import { AboutPage as About } from "@/components/site/pages/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { profilePageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Rayann Sagnon, from Ouagadougou to Ottawa: the family technician who moved from software to electrical engineering to build complete systems.",
  path: "/about",
  image: { url: site.profileImage, width: 1200, height: 1600, alt: site.profileImageAlt },
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <About />
    </>
  );
}
