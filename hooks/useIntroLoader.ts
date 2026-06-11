"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_AUTO_SKIP_MS } from "@/lib/constants";

const STORAGE_KEY = "rs_intro_seen";

export function useIntroLoader() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setHidden(true);
    document.body.classList.add("intro-ready");
    hideTimerRef.current = setTimeout(() => setVisible(false), 1300);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
  }, []);

  useEffect(() => {
    let autoDismissTimer: ReturnType<typeof setTimeout> | null = null;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        document.body.classList.add("intro-ready");
        return;
      }
    } catch {}
    const showTimer = setTimeout(() => {
      setVisible(true);
      autoDismissTimer = setTimeout(dismiss, INTRO_AUTO_SKIP_MS);
    }, 0);
    return () => {
      clearTimeout(showTimer);
      if (autoDismissTimer) clearTimeout(autoDismissTimer);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [dismiss]);

  return { visible, hidden, dismiss };
}
