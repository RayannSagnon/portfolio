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
  "Electrical Engineering student at uOttawa who designs PCBs in Altium for uOSupermileage, including the car's telemetry sensor board. Hardware internship, summer 2027.";

export const SEO_KEYWORDS = [
  "Rayann Sagnon",
  "Rayann Sagnon portfolio",
  "Rayann Sagnon uOttawa",
  "electrical engineering student",
  "hardware internship",
  "summer 2027 internship",
  "PCB design",
  "Altium Designer",
  "telemetry sensor board",
  "uOSupermileage",
  "uOttawa Supermileage",
  "University of Ottawa",
  "Standout Studio",
  "GoForIt",
  "Ottawa",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

type PageMeta = {
  /** Short page title; the layout adds " · Rayann Sagnon". */
  title: string;
  description: string;
  path: string;
  /** A photo or render that represents the page, under /public. */
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article" | "profile";
};

/** One place to build a page's title, description, canonical URL and link previews, so they never drift apart. */
export function pageMetadata({ title, description, path, image, type = "website" }: PageMeta) {
  const url = absoluteUrl(path);
  const shareTitle = `${title} · ${SITE_NAME}`;
  // Without a page image, keep the site-wide card so every link preview has a picture.
  const img = image ?? { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME}, Electrical Engineering student at uOttawa` };
  const images = [{ url: absoluteUrl(img.url), width: img.width, height: img.height, alt: img.alt }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: shareTitle, description, url, siteName: SITE_NAME, locale: "en_CA", type, images },
    twitter: { card: "summary_large_image" as const, title: shareTitle, description, images: images.map((i) => i.url) },
  };
}
