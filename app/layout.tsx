import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SEO_KEYWORDS, SITE_URL } from "@/lib/seo";
import { siteGraphJsonLd } from "@/lib/structuredData";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { RouteScrollReset } from "@/components/motion/RouteScrollReset";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { AppProviders } from "@/components/providers/AppProviders";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.ogTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  keywords: [...SEO_KEYWORDS],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    url: absoluteUrl("/"),
    siteName: site.name,
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.ogDescription,
    creator: "@rayannsagnon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/icon", type: "image/png" }],
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070707",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="me" href={site.linkedin} />
        <link rel="me" href={site.github} />
        <link rel="me" href={site.instagram} />
      </head>
      <body>
        <JsonLd data={siteGraphJsonLd()} />
        <AppProviders>
          <SmoothScroll>
            <RouteScrollReset />
            <SiteChrome />
            {children}
          </SmoothScroll>
        </AppProviders>
      </body>
    </html>
  );
}
