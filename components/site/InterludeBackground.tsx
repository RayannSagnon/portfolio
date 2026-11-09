"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DECK_QUERY } from "./useDeck";

const SoftAurora = dynamic(() => import("./backgrounds/SoftAurora"), { ssr: false });

/** Loaded with the page so the passage never waits for it; it only animates while the band is on screen. */
export function InterludeBackground({ live }: { live: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia(DECK_QUERY).matches);
  }, []);

  if (!show) return null;
  return (
    <SoftAurora
      speed={live ? 0.6 : 0}
      color1="#d9d9d6"
      color2="#77776f"
      spectrum={0}
      brightness={0.75}
      enableMouseInteraction={false}
      clickPulse={false}
      intro={false}
    />
  );
}
