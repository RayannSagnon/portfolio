import type { Locale } from "@/lib/i18n/types";
import type { ArchivePost } from "@/lib/archive/mdxUtils";
import { archiveManifest } from "@/content/archiveManifest";

export function getArchivePostForLocale(slug: string, locale: Locale): ArchivePost | null {
  const post = archiveManifest[locale][slug];
  if (!post) return null;
  return {
    slug,
    frontmatter: post.frontmatter,
    content: post.content,
    readingTime: post.readingTime,
  };
}

export function getAllArchiveSlugsFromManifest(): string[] {
  return Object.keys(archiveManifest.en);
}
