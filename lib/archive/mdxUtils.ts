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

export type ArchiveHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getArchiveHeadings(content: string): ArchiveHeading[] {
  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) return null;
      const text = match[2].replace(/\*\*/g, "").trim();
      return {
        id: slugifyHeading(text),
        text,
        level: match[1].length as 2 | 3,
      };
    })
    .filter((heading): heading is ArchiveHeading => Boolean(heading));
}
