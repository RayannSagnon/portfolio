"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cardFan } from "./cardFan";

const BounceCards = dynamic(() => import("./BounceCards"), { ssr: false });

const PHONE_MAX = 820;
const PHONE_ANGLES = [6, -4, 5, -6, -5, 4, -3, 6];

/** Two loose rows on a phone, where a single fan would leave only slivers of each photo. */
function phoneLayout(width: number) {
  const cardSize = width * 0.42;
  const stepX = (width - cardSize - 16) / 3;
  const stepY = cardSize * 0.92;
  return {
    containerWidth: width,
    containerHeight: cardSize + stepY + 24,
    cardSize,
    pushDistance: 0,
    hoverScale: 1.4,
    borderWidth: 3,
    transformStyles: PHONE_ANGLES.map((angle, i) => {
      const x = ((i % 4) - 1.5) * stepX;
      const y = (i < 4 ? -0.5 : 0.5) * stepY;
      return `rotate(${angle}deg) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    }),
  };
}

function desktopLayout(width: number, height: number) {
  const u = Math.min(width / 1440, height / 900);
  return {
    containerWidth: 1360 * u,
    containerHeight: 440 * u,
    cardSize: 280 * u,
    spread: 150 * u,
    arc: 18 * u,
    pushDistance: 110 * u,
    hoverScale: 1.1,
    borderWidth: Math.max(3, 6 * u),
  };
}

/** Mounted once the screen is close and visible, so the photos are ready before the pile arrives. */
export function RouteCards({
  images,
  near,
}: {
  images: { src: string; alt: string; focus?: string }[];
  near: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [size, setSize] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    if (near && box.current?.getClientRects().length) setStarted(true);
  }, [near]);

  useEffect(() => {
    const measure = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const layout = size.width <= PHONE_MAX ? phoneLayout(size.width) : desktopLayout(size.width, size.height);

  return (
    <div ref={box}>
      {started && (
        <BounceCards
          images={images}
          rotation={8}
          animationDelay={0.15}
          animationStagger={0.05}
          bounciness={0.6}
          borderColor="#f5f5f2"
          radius={0}
          fan={cardFan}
          {...layout}
        />
      )}
    </div>
  );
}
