import type { Metadata } from "next";
import { ProjectStory } from "@/components/site/pages/ProjectStory";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Telemetry V2 Sensor Board",
  description:
    "The sensor board Rayann Sagnon designed for uOttawa Supermileage's Telemetry V2: a Hall wheel speed sensor and an I2C accelerometer read over USB through an MCP2221A, laid out on two layers with 0 DRC violations.",
  alternates: { canonical: absoluteUrl("/projects/telemetry-sensor-board") },
};

export default function Page() {
  return <ProjectStory slug="telemetry" />;
}
