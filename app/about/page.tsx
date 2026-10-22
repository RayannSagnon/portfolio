import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata, Viewport } from "next";
import { LiveryAbout } from "@/components/livery/LiveryAbout";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import { profilePageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Rayann Sagnon, from Ouagadougou to Ottawa. Electrical Engineering student at the University of Ottawa and uOSupermileage member: route, roles and documents.",
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
        height: 1200,
        alt: site.profileImageAlt,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f2",
};

// The CV button only shows once the file is actually in public/documents.
const hasCv = existsSync(path.join(process.cwd(), "public", "documents", "rayann-sagnon-cv.pdf"));

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <LiveryAbout hasCv={hasCv} />
    </>
  );
}
