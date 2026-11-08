import type { Metadata } from "next";
import { Kits } from "@/components/site/Projects";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Built from kits",
  description: "Two kits built by Rayann Sagnon: an Elegoo car with phone control added and an Adeept robotic arm with computer vision added.",
  alternates: { canonical: absoluteUrl("/projects/kits") },
};

export default function Page() {
  return <Kits />;
}
