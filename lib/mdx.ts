import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ArchivePost } from "@/lib/archive/mdxUtils";

export type { ArchiveFrontmatter, ArchivePost, ArchiveHeading } from "@/lib/archive/mdxUtils";
export { slugifyHeading, getArchiveHeadings } from "@/lib/archive/mdxUtils";

const ARCHIVE_DIR = path.join(process.cwd(), "content", "archive");

export function getArchivePost(slug: string): ArchivePost | null {
  const filePath = path.join(ARCHIVE_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ArchivePost["frontmatter"],
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllArchiveSlugs(): string[] {
  if (!fs.existsSync(ARCHIVE_DIR)) return [];
  return fs
    .readdirSync(ARCHIVE_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
