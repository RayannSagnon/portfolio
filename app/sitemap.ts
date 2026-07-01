import type { MetadataRoute } from "next";
import { archiveEntries, site } from "@/content/site";
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
      url: absoluteUrl("/archive"),
      lastModified: now,
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      priority: 0.82,
      images: [profileImageUrl],
    },
    ...archiveEntries.map((entry) => ({
      url: absoluteUrl(`/archive/${entry.slug}`),
      lastModified: now,
      priority: entry.featured ? 0.75 : 0.65,
    })),
    ...projects.filter((project) => !project.comingSoon).map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
