"use client";
import { LabEnvironment } from "@/components/lab/LabEnvironment";

export function TheLab() {
  return (
    <section
      id="the-lab"
      data-section="THE LAB"
      data-num="04"
      style={{ padding: 0, display: "flex", flexDirection: "column", gap: 0 }}
    >
      <LabEnvironment />
    </section>
  );
}
