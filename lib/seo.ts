export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rayannsagnon.com").replace(/\/$/, "");

export const SITE_NAME = "Rayann Sagnon";

export const DEFAULT_TITLE = "Rayann Sagnon · Electrical Engineering Portfolio";

export const DEFAULT_DESCRIPTION =
  "Official portfolio of Rayann Sagnon — Electrical Engineering & Computing Technology student at the University of Ottawa. Projects in embedded systems, AI, and human-machine interaction.";

export const SEO_KEYWORDS = [
  "Rayann Sagnon",
  "Rayann Sagnon portfolio",
  "Rayann Sagnon engineer",
  "Rayann Sagnon uOttawa",
  "electrical engineering portfolio",
  "embedded systems",
  "StudentOS",
  "University of Ottawa",
  "Ottawa engineer",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
