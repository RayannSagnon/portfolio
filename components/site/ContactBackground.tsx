"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// Computers get the full version; phones and touch a lighter one.
const FULL = "(min-width: 821px) and (hover: hover) and (pointer: fine)";

const FloatingLines = dynamic(() => import("./backgrounds/FloatingLines"), { ssr: false });

/**
 * React Bits background for the last screen, loaded a little ahead so its shader never compiles
 * during the passage. Phones get a lighter version, and reduced motion gets none.
 */
export function ContactBackground({ near }: { near: boolean }) {
  const [phone, setPhone] = useState<boolean | null>(null);

  useEffect(() => {
    if (!near || phone !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhone(!window.matchMedia(FULL).matches);
  }, [near, phone]);

  if (phone === null) return null;
  return (
    <FloatingLines
      linesGradient={["#f5f5f2", "#9e9e99"]}
      animationSpeed={phone ? 0.4 : 0.6}
      lineCount={phone ? 8 : 12}
      lineWidth={3.4}
      brightness={phone ? 0.55 : 0.85}
      interactive={!phone}
      clickSwirl={false}
      intro={false}
      dpr={1.5}
      backgroundColor="#0a0a0b"
    />
  );
}
