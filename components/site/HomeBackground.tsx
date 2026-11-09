"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DECK_QUERY } from "./useDeck";

const FloatingLines = dynamic(() => import("./backgrounds/FloatingLines"), { ssr: false });
const GhostFibers = dynamic(() => import("./backgrounds/GhostFibers"), { ssr: false });

type Kind = "lines" | "fibers";

/**
 * React Bits backgrounds, kept to the site's ink and paper. Computers only: on a phone the portrait fills the screen.
 * Two candidates while Rayann compares them: the page shows the lines, and ?bg=fibers shows the fibers.
 */
export function HomeBackground() {
  const [kind, setKind] = useState<Kind | null>(null);

  useEffect(() => {
    if (!window.matchMedia(DECK_QUERY).matches) return;
    setKind(new URLSearchParams(window.location.search).get("bg") === "fibers" ? "fibers" : "lines");
  }, []);

  if (kind === "lines") {
    return (
      <FloatingLines
        linesGradient={["#f5f5f2", "#9e9e99"]}
        animationSpeed={0.6}
        lineCount={14}
        lineWidth={2.2}
        brightness={1.3}
        clickSwirl={false}
        backgroundColor="#0a0a0b"
      />
    );
  }
  if (kind === "fibers") {
    return (
      <GhostFibers
        glowColor="#d9d9d6"
        lineColor="#f5f5f2"
        secondaryColor="#8a8a86"
        speed={0.35}
        particles={0.3}
        glow={0.6}
        brightness={0.7}
        grain={0}
        pulseOnClick={false}
      />
    );
  }
  return null;
}
