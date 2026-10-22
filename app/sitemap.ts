import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

const profileImageUrl = absoluteUrl(site.profileImage);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      priority: 1,
      images: [profileImageUrl],
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      priority: 0.82,
      images: [profileImageUrl],
    },
    // Only published project pages; SIgns and StudentOS redirect home for now.
    ...projects.filter((project) => !project.comingSoon && project.slug === "standout").map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
