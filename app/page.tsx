import type { Viewport } from "next";
import { LiveryHome } from "@/components/livery/LiveryHome";

export const viewport: Viewport = {
  themeColor: "#f5f5f2",
};

export default function Home() {
  return <LiveryHome />;
}
