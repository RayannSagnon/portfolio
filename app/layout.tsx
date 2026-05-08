import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SystemShell } from "@/components/shell/SystemShell";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: site.ogTitle,
  description: site.ogDescription,
  authors: [{ name: "Rayann Sagnon" }],
  keywords: ["embedded systems", "AI", "electrical engineering", "portfolio", "uOttawa"],
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          <SystemShell />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
