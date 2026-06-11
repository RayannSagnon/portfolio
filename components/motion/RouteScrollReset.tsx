"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; force?: boolean }
  ) => void;
};

export function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    try {
      if (sessionStorage.getItem("rs_scroll_target")) return;
    } catch {}

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const jumpTop = () => {
      const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    jumpTop();
    const frame = requestAnimationFrame(jumpTop);

    return () => {
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  return null;
}
