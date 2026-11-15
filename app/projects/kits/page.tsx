import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { KitsPage } from "@/components/site/pages/KitsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "RC car and robotic arm",
  description:
    "How Rayann Sagnon started with hardware: an Elegoo smart car with phone control and an Adeept robotic arm with computer vision, both built from kits.",
  path: "/projects/kits",
  image: { url: "/images/kits/car-floor.jpg", width: 1320, height: 1098, alt: "The Elegoo smart car Rayann Sagnon built, with its camera module and ultrasonic sensor" },
  type: "article",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/#work" }, { name: "RC car and robotic arm", path: "/projects/kits" }])} />
      <KitsPage />
    </>
  );
}
