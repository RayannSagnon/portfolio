"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Computers and tablets. On a phone the portrait fills the screen, so there is nothing to see behind it.
const SHOWN = "(min-width: 821px) and (prefers-reduced-motion: no-preference)";

const loadFibers = () => import("./backgrounds/GhostFibers");
// Start downloading the shader as soon as the page's script runs, instead of after the first render.
if (typeof window !== "undefined" && window.matchMedia(SHOWN).matches) void loadFibers();

const GhostFibers = dynamic(loadFibers, { ssr: false });

/** React Bits background, kept to the site's ink and paper. It fades in once its first frame is drawn. */
export function HomeBackground({ paused }: { paused: boolean }) {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia(SHOWN).matches);
  }, []);

  if (!show) return null;
  return (
    <div style={{ width: "100%", height: "100%", opacity: ready ? 1 : 0, transition: "opacity 1100ms cubic-bezier(0.23, 1, 0.32, 1)" }}>
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
        onReady={() => setReady(true)}
      />
    </div>
  );
}
