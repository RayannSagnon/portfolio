"use client";
import { useEffect, useState } from "react";
import { BOOT_AUTO_SKIP_MS } from "@/lib/constants";

const STORAGE_KEY = "rs_boot_seen";

export function useBootSequence() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        document.body.classList.add("booted");
        return;
      }
    } catch {}
    setVisible(true);
    const t = setTimeout(dismiss, BOOT_AUTO_SKIP_MS);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setHidden(true);
    document.body.classList.add("booted");
    setTimeout(() => setVisible(false), 1300);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
  }

  return { visible, hidden, dismiss };
}
