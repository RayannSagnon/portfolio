"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DECK_QUERY } from "./useDeck";

const GhostFibers = dynamic(() => import("./backgrounds/GhostFibers"), { ssr: false });

/** React Bits background, kept to the site's ink and paper. Computers only: on a phone the portrait fills the screen. */
export function HomeBackground({ paused }: { paused: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia(DECK_QUERY).matches);
  }, []);

  if (!show) return null;
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
      paused={paused}
    />
  );
}
