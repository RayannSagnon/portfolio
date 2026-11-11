import type { Metadata } from "next";
import { KitsPage } from "@/components/site/pages/KitsPage";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Built from kits",
  description: "How Rayann Sagnon started with hardware: an Elegoo smart car with phone control added and an Adeept robotic arm with computer vision added.",
  alternates: { canonical: absoluteUrl("/projects/kits") },
};

export default function Page() {
  return <KitsPage />;
}
