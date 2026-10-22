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

export const DEFAULT_TITLE = "Rayann Sagnon · Electrical Engineering · Hardware";

export const DEFAULT_DESCRIPTION =
  "Electrical Engineering student at uOttawa looking for a hardware internship. Tachometer PCB in design with uOSupermileage, Standout Studio client work delivered.";

export const SEO_KEYWORDS = [
  "Rayann Sagnon",
  "Rayann Sagnon portfolio",
  "Rayann Sagnon uOttawa",
  "electrical engineering student",
  "hardware internship",
  "PCB design",
  "Altium",
  "uOSupermileage",
  "Standout Studio",
  "University of Ottawa",
  "Ottawa",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
