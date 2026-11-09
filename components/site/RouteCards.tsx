"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const BounceCards = dynamic(() => import("./BounceCards"), { ssr: false });

const unit = () => Math.min(window.innerWidth / 1440, window.innerHeight / 900);

/** The cards pop in as the screen arrives, so they only mount once it is close and visible. */
export function RouteCards({
  images,
  near,
}: {
  images: { src: string; alt: string; focus?: string }[];
  near: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [u, setU] = useState(1);

  useEffect(() => {
    if (near && box.current?.getClientRects().length) setStarted(true);
  }, [near]);

  useEffect(() => {
    const measure = () => setU(unit());
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={box}>
      {started && (
        <BounceCards
          images={images}
          containerWidth={1360 * u}
          containerHeight={440 * u}
          cardSize={280 * u}
          spread={150 * u}
          rotation={8}
          arc={18 * u}
          animationDelay={0.15}
          animationStagger={0.05}
          bounciness={0.6}
          pushDistance={110 * u}
          hoverScale={1.1}
          borderWidth={Math.max(3, 6 * u)}
          borderColor="#f5f5f2"
          radius={0}
        />
      )}
    </div>
  );
}
