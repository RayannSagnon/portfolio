import type { Metadata } from "next";
import { Contact } from "@/components/site/Contact";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rayann Sagnon about a 4-month hardware internship in summer 2027.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function Page() {
  return <Contact />;
}
