"use client";
import { useEffect, useRef } from "react";

export function useScrollProgress(cb: (progress: number) => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    const handler = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;
      cbRef.current(p);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
}
