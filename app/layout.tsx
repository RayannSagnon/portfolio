import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
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
  title: site.ogTitle,
  description: site.ogDescription,
  applicationName: site.tagline,
  authors: [{ name: "Rayann Sagnon" }],
  creator: site.name,
  publisher: site.name,
  keywords: ["embedded systems", "AI", "electrical engineering", "portfolio", "uOttawa"],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    url: absoluteUrl("/"),
    siteName: site.tagline,
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
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
      <body>
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
