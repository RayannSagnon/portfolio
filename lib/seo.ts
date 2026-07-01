const DEFAULT_SITE_URL = "https://www.rayannsagnon.com";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

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
