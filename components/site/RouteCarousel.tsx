"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const FlexCarousel = dynamic(() => import("./FlexCarousel"), { ssr: false });

/** Mood images, one per chapter, shown after that chapter's real photo. They carry no alt text on purpose. */
const AMBIENT = ["/images/site/route-bike.jpg", "/images/site/route-night.jpg", "/images/site/route-signal.jpg"];

type Chapter = { image: string; alt: string };

export function RouteCarousel({ chapters, live, onChapter }: { chapters: Chapter[]; live: boolean; onChapter: (chapter: number) => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia("(min-width: 821px)").matches);
  }, []);

  const items = useMemo(() => chapters.flatMap((c, i) => [{ src: c.image, alt: c.alt }, { src: AMBIENT[i], alt: "" }]), [chapters]);

  if (!show) return null;
  return (
    <FlexCarousel
      items={items}
      preset="liquid"
      intro="none"
      cardHeight={0.88}
      gap={14}
      radius={0}
      fit="natural"
      focusOnClick={false}
      autoplay={live}
      interval={3.6}
      captions={false}
      captureWheel={false}
      onChange={(index) => onChapter(Math.floor(index / 2))}
    />
  );
}
