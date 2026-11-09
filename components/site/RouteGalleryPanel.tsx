"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import s from "./site.module.css";

const AccordionGallery = dynamic(() => import("./AccordionGallery"), { ssr: false });

/** Mood images, one per chapter, shown after that chapter's real photo. */
const AMBIENT = ["/images/site/route-bike.jpg", "/images/site/route-night.jpg", "/images/site/route-signal.jpg"];

type Chapter = { place: string; title: string; body: string; image: string; alt: string };

/** The gallery and the three chapters are one control: opening either opens the other. */
export function RouteGalleryPanel({ chapters, heading, siri, live }: { chapters: Chapter[]; heading: ReactNode; siri: string; live: boolean }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const hovering = useRef(false);

  useEffect(() => {
    setShow(window.matchMedia("(min-width: 821px)").matches);
  }, []);

  const items = useMemo(
    () => chapters.flatMap((c, i) => [{ image: c.image, alt: c.alt, label: c.place }, { image: AMBIENT[i], alt: "", label: c.place }]),
    [chapters],
  );

  // While nobody is pointing at it, the gallery walks through the story on its own.
  useEffect(() => {
    if (!live || !show || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!hovering.current) setIndex((i) => (i + 1) % (chapters.length * 2));
    }, 3600);
    return () => window.clearInterval(timer);
  }, [live, show, chapters.length]);

  // It waits only while the pointer is on the gallery or a chapter, not anywhere on the screen.
  const pause = { onMouseEnter: () => void (hovering.current = true), onMouseLeave: () => void (hovering.current = false) };
  const chapter = Math.floor(index / 2);
  const open = (i: number) => setIndex((current) => (Math.floor(current / 2) === i ? current : i * 2));

  return (
    <div
      className={`${s.aboutPanel} ${s.routePanel} ${s.routeGallery}`}
      data-panel="route"
    >
      <div className={s.galleryMedia} data-rise {...pause}>
        {show && (
          <AccordionGallery
            items={items}
            activeIndex={index}
            onActiveChange={setIndex}
            defaultIndex={0}
            height="100%"
            gap={2}
            radius={0}
            expandRatio={0.58}
            tilt={3}
            accentColor="#f5f5f2"
            overlayColor="#0a0a0b"
            textColor="#f5f5f2"
          />
        )}
      </div>
      <div className={s.galleryText}>
        {heading}
        <div className={s.chapters} {...pause}>
          {chapters.map((c, i) => (
            <article key={c.title} data-rise data-open={i === chapter ? "" : undefined}>
              <button type="button" aria-expanded={i === chapter} onMouseEnter={() => open(i)} onFocus={() => open(i)} onClick={() => open(i)}>
                <span>{c.place}</span>
                <b>{c.title}</b>
              </button>
              <div className={s.chapterBody}>
                <div>
                  <p>{c.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className={s.siri} data-rise>
          {siri}
        </p>
      </div>
    </div>
  );
}
