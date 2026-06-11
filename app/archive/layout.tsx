import type { Metadata } from "next";
import type { ReactNode } from "react";
import { archiveEntries, site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Engineering Journal | ${site.name}`,
  description:
    "Engineering articles, essays, and breakdowns on embedded systems, AI, robotics, interfaces, and technical craft.",
  alternates: {
    canonical: absoluteUrl("/archive"),
  },
  openGraph: {
    title: `Engineering Journal | ${site.name}`,
    description:
      "Engineering articles, essays, and breakdowns on embedded systems, AI, robotics, interfaces, and technical craft.",
    url: absoluteUrl("/archive"),
    type: "website",
  },
  other: {
    "archive:count": String(archiveEntries.length),
  },
};

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}
