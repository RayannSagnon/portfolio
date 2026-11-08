import type { Metadata } from "next";
import { OnePageRoute } from "@/components/site/OnePageRoute";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rayann Sagnon about a 4-month hardware internship in summer 2027.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function Page() {
  return <OnePageRoute start="contact" />;
}
