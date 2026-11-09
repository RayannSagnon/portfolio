"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DECK_QUERY } from "./useDeck";

const FloatingLines = dynamic(() => import("./backgrounds/FloatingLines"), { ssr: false });

/** React Bits background for the last screen. Computers only, and it starts just before the screen arrives. */
export function ContactBackground({ live }: { live: boolean }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (live && window.matchMedia(DECK_QUERY).matches) setStarted(true);
  }, [live]);

  if (!started) return null;
  return (
    <div style={{ width: "100%", height: "100%", display: live ? undefined : "none" }}>
      <FloatingLines
        linesGradient={["#f5f5f2", "#9e9e99"]}
        animationSpeed={0.6}
        lineCount={14}
        lineWidth={3.4}
        brightness={0.85}
        clickSwirl={false}
        intro={false}
        dpr={2}
        backgroundColor="#0a0a0b"
      />
    </div>
  );
}
