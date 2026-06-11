"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function HashAnchorJump() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const clearStoredTarget = () => {
      try {
        sessionStorage.removeItem("rs_scroll_target");
      } catch {}
    };

    const jump = () => {
      let storedTarget = "";
      try {
        storedTarget = sessionStorage.getItem("rs_scroll_target") ?? "";
      } catch {}

      const id = (storedTarget || window.location.hash.slice(1)).split("#")[0];
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) {
        if (storedTarget) clearStoredTarget();
        return;
      }

      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: "auto",
      });
      html.style.scrollBehavior = previousBehavior;

      if (storedTarget) {
        clearStoredTarget();
      }
    };

    jump();
    window.addEventListener("hashchange", jump);
    return () => window.removeEventListener("hashchange", jump);
  }, [pathname]);

  return null;
}
