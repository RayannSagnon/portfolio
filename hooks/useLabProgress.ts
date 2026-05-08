"use client";
import { useEffect, useState, type RefObject } from "react";

export function useLabProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [ref]);

  return progress;
}
