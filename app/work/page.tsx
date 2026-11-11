import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { WorkPage } from "@/components/site/pages/WorkPage";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work",
  description: "Rayann Sagnon's projects, jobs and hands-on skills: a two-layer PCB for uOttawa Supermileage, GoForIt, Standout Studio and the kits he started with.",
  alternates: { canonical: absoluteUrl("/work") },
};

// The CV link only shows once the file is actually in public/documents.
const hasCv = existsSync(path.join(process.cwd(), "public", "documents", "rayann-sagnon-cv-en.pdf"));

export default function Page() {
  return <WorkPage hasCv={hasCv} />;
}
