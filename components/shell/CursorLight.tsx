"use client";
import { useEffect, useRef } from "react";

export function CursorLight() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  /* Two-layer cursor: slow blob + fast dot */
  const blob   = useRef({ x: -200, y: -200 });
  const dot    = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf: number;
    function loop() {
      /* Blob: slow, large lag */
      blob.current.x += (target.current.x - blob.current.x) * 0.07;
      blob.current.y += (target.current.y - blob.current.y) * 0.07;
      /* Dot: fast, tight follow */
      dot.current.x += (target.current.x - dot.current.x) * 0.22;
      dot.current.y += (target.current.y - dot.current.y) * 0.22;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${blob.current.x}px, ${blob.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.current.x}px, ${dot.current.y}px) translate(-50%, -50%)`;
      }

      /* Smooth normalised coords for CSS parallax */
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      document.documentElement.style.setProperty("--gx", (blob.current.x / w).toFixed(4));
      document.documentElement.style.setProperty("--gy", (blob.current.y / h).toFixed(4));

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Ambient glow blob */}
      <div
        ref={blobRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 320, height: 320,
          pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
          opacity: 0.38,
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      {/* Sharp follower dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 5, height: 5,
          pointerEvents: "none", zIndex: 2,
          background: "var(--accent)",
          borderRadius: "50%",
          opacity: 0.7,
          boxShadow: "0 0 8px var(--accent), 0 0 16px var(--accent-glow)",
          willChange: "transform",
        }}
      />
    </>
  );
}
