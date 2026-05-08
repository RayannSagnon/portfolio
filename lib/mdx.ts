import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ARCHIVE_DIR = path.join(process.cwd(), "content", "archive");

export type ArchiveFrontmatter = {
  title: string;
  date: string;
  readTime: string;
  category: string;
};

export type ArchivePost = {
  slug: string;
  frontmatter: ArchiveFrontmatter;
  content: string;
  readingTime: string;
};

export function getArchivePost(slug: string): ArchivePost | null {
  const filePath = path.join(ARCHIVE_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ArchiveFrontmatter,
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
