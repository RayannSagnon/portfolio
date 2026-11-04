"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { gsap } from "@/lib/motion/gsap";
import k from "./KartIntro.module.css";

const SEEN_KEY = "rs_intro_seen";

/**
 * Runs before first paint: returning visitors and reduced-motion users never see the curtain,
 * so there is no flash of it either.
 */
export const KART_INTRO_BOOT = `try{if(sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){document.documentElement.dataset.intro="skip"}`;

/** The opening: a zipper across the screen, the kart is its pull, and it drives the curtain open. */
export function KartIntro() {
  const t = useLocale().ui.livery.intro;
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const kartRef = useRef<HTMLDivElement>(null);
  const teethRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    const kart = kartRef.current;
    const teeth = teethRef.current;
    if (!teeth || !root || !top || !bottom || !kart || html.dataset.intro === "skip") {
      setGone(true);
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    html.dataset.intro = "playing";
    window.__lenis?.stop();

    // p is where the zipper is open up to, from 0 (left edge) to 1 (right edge).
    const zip = { p: -0.16 };
    const draw = () => {
      const w = window.innerWidth;
      const at = Math.min(Math.max(zip.p, 0), 1) * 100;
      // The teeth part in a V behind the pull: widest at the left edge, closed at the kart.
      const gap = Math.max(zip.p, 0) * 46;
      top.style.clipPath = `polygon(0 0, 100% 0, 100% 50%, ${at}% 50%, 0 ${50 - gap}%)`;
      bottom.style.clipPath = `polygon(0 ${50 + gap}%, ${at}% 50%, 100% 50%, 100% 100%, 0 100%)`;
      // Open teeth run along both lips of the V, from the left edge into the pull.
      const h = window.innerHeight;
      const x = (at / 100) * w;
      const g = (gap / 100) * h;
      teeth.setAttribute("viewBox", `0 0 ${w} ${h}`);
      teeth.querySelector("[data-lip='top']")?.setAttribute("d", `M0 ${h / 2 - g - 4} L${x} ${h / 2 - 4}`);
      teeth.querySelector("[data-lip='bottom']")?.setAttribute("d", `M0 ${h / 2 + g + 4} L${x} ${h / 2 + 4}`);
      kart.style.transform = `translate3d(${zip.p * w - kart.offsetWidth * 0.14}px, -86%, 0)`;
    };
    draw();

    const finish = () => {
      html.dataset.intro = "done";
      window.__lenis?.start();
      setGone(true);
    };

    // The page waits behind the curtain slightly pushed in, and settles as the halves part.
    const stage = document.querySelector<HTMLElement>("[data-intro-stage]");
    if (stage) gsap.set(stage, { scale: 1.07, transformOrigin: "50% 40%" });
    const tl = gsap.timeline({ delay: 0.25, onComplete: finish });
    tl.to(zip, { p: 1.14, duration: 1.3, ease: "power2.inOut", onUpdate: draw })
      .set(teeth, { opacity: 0 })
      .to(top, { yPercent: -100, duration: 0.7, ease: "power3.out" }, "-=0.18")
      .to(bottom, { yPercent: 100, duration: 0.7, ease: "power3.out" }, "<")
      .to(stage, { scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform" }, "<");

    // Any input fast-forwards: a recruiter in a hurry is never held at the gate.
    const hurry = () => tl.timeScale(4);
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", hurry, opts);
    window.addEventListener("keydown", hurry, opts);
    window.addEventListener("wheel", hurry, opts);
    window.addEventListener("touchstart", hurry, opts);

    return () => {
      tl.kill();
      window.removeEventListener("pointerdown", hurry);
      window.removeEventListener("keydown", hurry);
      window.removeEventListener("wheel", hurry);
      window.removeEventListener("touchstart", hurry);
      if (html.dataset.intro === "playing") html.dataset.intro = "done";
      if (stage) gsap.set(stage, { clearProps: "transform" });
      window.__lenis?.start();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className={k.intro} aria-hidden="true">
      <div ref={topRef} className={`${k.half} ${k.top}`}>
        <span className={k.corner}>Rayann Sagnon</span>
      </div>
      <div ref={bottomRef} className={`${k.half} ${k.bottom}`}>
        <span className={k.hint}>{t.hint}</span>
      </div>
      <svg ref={teethRef} className={k.teeth} preserveAspectRatio="none">
        <path data-lip="top" />
        <path data-lip="bottom" />
      </svg>
      <div ref={kartRef} className={k.kart}>
        <Kart />
      </div>
    </div>
  );
}

function Kart() {
  return (
    <svg viewBox="0 0 150 72" className={k.kartSvg}>
      <g className={k.speed} stroke="#f5f5f2" strokeWidth="2.5" strokeLinecap="round">
        <path d="M2 30H20" />
        <path d="M8 40H24" />
        <path d="M0 50H14" />
      </g>
      {/* rear bumper and chassis tray */}
      <rect x="18" y="42" width="8" height="12" rx="2" fill="#55585a" />
      <path d="M24 54H128L134 49H24Z" fill="#f5f5f2" />
      {/* side pod in livery garnet, with the RS number roundel */}
      <path d="M42 38H92L101 49H36Z" fill="#8f001a" />
      <circle cx="64" cy="43.5" r="6.5" fill="#f5f5f2" />
      <text x="64" y="46" textAnchor="middle" fontSize="6.4" fontWeight="900" fontStyle="italic" fill="#111">
        RS
      </text>
      {/* nose cone */}
      <path d="M100 40H122Q132 40 135 49H104Z" fill="#f5f5f2" />
      {/* driver: suit, arms on the wheel */}
      <path d="M48 38Q49 24 60 24H68Q73 28 73 38Z" fill="#2b2b2b" stroke="#f5f5f2" strokeWidth="2" />
      <path d="M67 30L86 32" stroke="#f5f5f2" strokeWidth="3" strokeLinecap="round" />
      <path d="M88 25L84 39" stroke="#f5f5f2" strokeWidth="3" strokeLinecap="round" />
      {/* helmet with garnet stripe and ink visor */}
      <circle cx="61" cy="16" r="10.5" fill="#f5f5f2" />
      <path d="M51 13.5H70" stroke="#8f001a" strokeWidth="3.2" />
      <path d="M62 16.5H71.5V21H63Z" fill="#111" />
      {/* wheels */}
      <g className={k.wheel}>
        <circle cx="34" cy="56" r="13" fill="#2b2b2b" stroke="#f5f5f2" strokeWidth="2.5" />
        <circle cx="34" cy="56" r="7" fill="none" stroke="#55585a" strokeWidth="2" />
        <path d="M34 49V63M27 56H41" stroke="#f5f5f2" strokeWidth="1.6" />
        <circle cx="34" cy="56" r="2.6" fill="#8f001a" />
      </g>
      <g className={k.wheel}>
        <circle cx="118" cy="58" r="11" fill="#2b2b2b" stroke="#f5f5f2" strokeWidth="2.5" />
        <circle cx="118" cy="58" r="6" fill="none" stroke="#55585a" strokeWidth="2" />
        <path d="M118 52V64M112 58H124" stroke="#f5f5f2" strokeWidth="1.6" />
        <circle cx="118" cy="58" r="2.2" fill="#8f001a" />
      </g>
    </svg>
  );
}
