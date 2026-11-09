"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GhostFibers = dynamic(() => import("./backgrounds/GhostFibers"), { ssr: false });

// Computers and tablets. On a phone the portrait fills the screen, so there is nothing to see behind it.
const SHOWN = "(min-width: 821px) and (prefers-reduced-motion: no-preference)";

/** React Bits background, kept to the site's ink and paper. */
export function HomeBackground({ paused }: { paused: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia(SHOWN).matches);
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
