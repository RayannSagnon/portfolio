"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ModelViewer = dynamic(() => import("../bits/ModelViewer"), { ssr: false });

const MODEL = "/models/dashboard-pcb.glb";
const STILL = "/images/site/tachometer-board-3d.jpg";

/**
 * Rayann's board, exported from Altium, that the visitor can turn. The Altium render stands in until the model is
 * close to the screen and loaded, and stays for anyone without WebGL.
 */
export function BoardViewer({ alt, className }: { alt: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // A phone's frame is small, so the board fills more of it.
  const fit = size.w > 0 && size.w < 600 ? 1.25 : 0.9;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNear(true), { rootMargin: "60% 0px" });
    io.observe(el);
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={box} className={className} style={{ position: "relative" }}>
      <Image
        src={STILL}
        alt={alt}
        fill
        sizes="(max-width: 820px) 100vw, 62vw"
        quality={90}
        style={{ objectFit: "contain", opacity: loaded ? 0 : 1, transition: "opacity 600ms ease" }}
      />
      {near && size.w > 0 && (
        <ModelViewer
          url={MODEL}
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
          tilt={28}
          fit={fit}
          style={{ position: "absolute", inset: 0 }}
          onModelLoaded={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
