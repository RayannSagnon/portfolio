import type { Metadata } from "next";
import { Tachometer } from "@/components/site/Projects";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "LED Tachometer",
  description: "An LED tachometer schematic in Altium for uOSupermileage's electrical initiation project: a potentiometer, a TLV1704 quad comparator and four LEDs.",
  alternates: { canonical: absoluteUrl("/projects/tachometer") },
};

export default function Page() {
  return <Tachometer />;
}
