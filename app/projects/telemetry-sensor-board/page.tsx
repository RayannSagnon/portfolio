import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/structuredData";
import { ProjectStory } from "@/components/site/pages/ProjectStory";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Telemetry V2 Sensor Board",
  description:
    "A USB sensor board for uOttawa Supermileage's car: Hall wheel speed and I2C acceleration through an MCP2221A. Designed in Altium on two layers, 0 DRC violations.",
  path: "/projects/telemetry-sensor-board",
  image: { url: "/projects/telemetry-sensor-board/opengraph-image", width: 1200, height: 630, alt: "Telemetry V2 Sensor Board, layout complete with 0 DRC violations" },
  type: "article",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/#work" }, { name: "Telemetry V2 Sensor Board", path: "/projects/telemetry-sensor-board" }])} />
      <JsonLd data={projectJsonLd({ name: "Telemetry V2 Sensor Board", path: "/projects/telemetry-sensor-board", description: metadata.description as string, image: "/images/telemetry/board-3d-top.jpg", keywords: ["PCB design", "Altium Designer", "telemetry", "Hall effect sensor", "I2C accelerometer", "MCP2221A", "USB", "uOttawa Supermileage"], status: "Layout complete, 0 DRC violations, not fabricated yet" })} />
      <ProjectStory slug="telemetry" />
    </>
  );
}
