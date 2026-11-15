"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ModelViewer = dynamic(() => import("../bits/ModelViewer"), { ssr: false });

const BOARDS = {
  dashboard: { model: "/models/dashboard-pcb.glb", still: "/images/site/tachometer-board-3d.jpg", tilt: 28, fit: [0.9, 1.25] },
  // A square board with everything on top: seen from higher and closer.
  telemetry: { model: "/models/telemetry-pcb.glb", still: "/images/telemetry/board-3d-top.jpg", tilt: 50, fit: [1.2, 0.95] },
} as const;

/**
 * Rayann's board, exported from Altium, that the visitor can turn. The Altium render stands in until the model is
 * close to the screen and loaded, and stays for anyone without WebGL.
 */
export function BoardViewer({ alt, className, board = "dashboard" }: { alt: string; className?: string; board?: keyof typeof BOARDS }) {
  const { model, still, tilt, fit: fits } = BOARDS[board];
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  // three.js is the heaviest script on the site: computers fetch it once the page is idle, touch screens on first touch.
  const [want, setWant] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // A phone's frame is small, so the board fills more of it.
  const fit = size.w > 0 && size.w < 600 ? fits[1] : fits[0];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNear(true), { rootMargin: "60% 0px" });
    io.observe(el);
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    let idle = 0;
    let timer = 0;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const later = () => {
      timer = window.setTimeout(() => {
        idle = typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(() => setWant(true), { timeout: 3000 }) : (setWant(true), 0);
      }, 1200);
    };
    if (desktop) {
      if (document.readyState === "complete") later();
      else window.addEventListener("load", later, { once: true });
    }
    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("load", later);
      window.clearTimeout(timer);
      if (idle && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
    };
  }, []);

  const wake = () => setWant(true);

  return (
    <div ref={box} className={className} style={{ position: "relative" }} onPointerDown={wake} onPointerEnter={wake} onFocus={wake}>
      <Image
        src={still}
        alt={alt}
        fill
        priority
        sizes="(max-width: 820px) 100vw, 62vw"
        quality={90}
        style={{ objectFit: "contain", opacity: loaded ? 0 : 1, transition: "opacity 600ms ease" }}
      />
      {near && want && size.w > 0 && (
        <ModelViewer
          url={model}
          width={size.w}
          height={size.h}
          environment="none"
          exposure={1.05}
          autoRotate
          autoRotateSpeed={0.25}
          autoRotateDelay={3}
          zoom={false}
          hoverTilt={0.08}
          float={0.1}
          shadow
          shadowOpacity={0.35}
          intro="fade"
          startAngle={-25}
          tilt={tilt}
          fit={fit}
          style={{ position: "absolute", inset: 0 }}
          onModelLoaded={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
