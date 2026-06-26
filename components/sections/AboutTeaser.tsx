"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AboutTeaserTone } from "@/content/aboutTeaser";
import { useContent } from "@/lib/i18n/LocaleProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TILE_STAGGER_MS = 150;
const TILE_FADE_S = 0.82;
const CARD_FADE_S = 0.88;
const CARD_EXTRA_DELAY_MS = 120;
const MOBILE_AUTO_DWELL_MS = 2000;
const MOBILE_AUTO_SCROLL_MS = 520;
const MOBILE_AUTO_RESUME_MS = 4000;
const MOBILE_BREAKPOINT = "(max-width: 760px)";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Desktop tessellation is defined in CSS (12-col grid) so mobile layouts stay independent.

function toneBackground(tone: AboutTeaserTone) {
  switch (tone) {
    case "ember":
      return `
        radial-gradient(circle at 76% 22%, rgba(138,42,58,0.26), transparent 34%),
        radial-gradient(circle at 16% 80%, rgba(214,173,114,0.10), transparent 28%),
        linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.012)),
        #090807
      `;
    case "bronze":
      return `
        radial-gradient(circle at 22% 18%, rgba(214,173,114,0.16), transparent 30%),
        radial-gradient(circle at 82% 78%, rgba(138,42,58,0.14), transparent 26%),
        linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)),
        #0a0908
      `;
    default:
      return `
        radial-gradient(circle at 68% 24%, rgba(255,255,255,0.07), transparent 28%),
        radial-gradient(circle at 22% 74%, rgba(138,42,58,0.12), transparent 30%),
        linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.008)),
        #080808
      `;
  }
}

type CtaRipple = {
  id: number;
  x: number;
  y: number;
};

function AboutTeaserCta({ label }: { label: string }) {
  const [ripples, setRipples] = useState<CtaRipple[]>([]);
  const [pulse, setPulse] = useState(false);
  const [pressed, setPressed] = useState(false);
  const releaseTimer = useRef(0);
  const skipClickFeedback = useRef(false);

  const addRipple = (clientX: number, clientY: number, target: HTMLAnchorElement) => {
    const rect = target.getBoundingClientRect();
    const id = Date.now();
    setRipples((current) => [
      ...current,
      { id, x: clientX - rect.left, y: clientY - rect.top },
    ]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 620);
  };

  const releasePress = () => {
    window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => setPressed(false), 160);
  };

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    skipClickFeedback.current = event.pointerType !== "mouse";
    setPressed(true);
    addRipple(event.clientX, event.clientY, event.currentTarget);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 420);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (skipClickFeedback.current) {
      skipClickFeedback.current = false;
      return;
    }
    addRipple(event.clientX, event.clientY, event.currentTarget);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 420);
  };

  useEffect(() => () => window.clearTimeout(releaseTimer.current), []);

  return (
    <Link
      href="/about"
      className={[
        "about-teaser-cta",
        pulse ? "is-pulse" : "",
        pressed ? "is-pressed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onPointerDown={handlePointerDown}
      onPointerUp={releasePress}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={handleClick}
    >
      <span className="about-teaser-cta-fill" aria-hidden />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="about-teaser-cta-ripple"
          style={{ left: ripple.x, top: ripple.y }}
          aria-hidden
        />
      ))}
      <span className="about-teaser-cta-label">{label}</span>
      <ArrowUpRight className="about-teaser-cta-icon" size={12} strokeWidth={1.6} />
    </Link>
  );
}

export function AboutTeaser() {
  const { aboutTeaser: aboutTeaserContent } = useContent();
  const { aboutTeaser, aboutTeaserTiles } = aboutTeaserContent;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const autoIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    const section = sectionRef.current;
    if (!grid || !section || reducedMotion) return;

    const mobileMq = window.matchMedia(MOBILE_BREAKPOINT);
    if (!mobileMq.matches) return;

    const getTiles = () =>
      Array.from(grid.querySelectorAll<HTMLElement>(".about-teaser-tile:not(.is-mobile-hidden)"));

    const tileScrollLeft = (tile: HTMLElement) => {
      const padLeft = Number.parseFloat(getComputedStyle(grid).paddingLeft) || 0;
      return Math.max(0, tile.offsetLeft - padLeft);
    };

    let isVisible = false;
    let dwellTimer = 0;
    let resumeTimer = 0;
    let scrollEndTimer = 0;
    let scrollAnimFrame = 0;

    const cancelScrollAnim = () => {
      if (scrollAnimFrame) {
        cancelAnimationFrame(scrollAnimFrame);
        scrollAnimFrame = 0;
      }
      isAutoScrollingRef.current = false;
      grid.classList.remove("is-auto-scrolling");
    };

    const animateScrollTo = (targetLeft: number) =>
      new Promise<void>((resolve) => {
        cancelScrollAnim();
        isAutoScrollingRef.current = true;
        grid.classList.add("is-auto-scrolling");

        const startLeft = grid.scrollLeft;
        const delta = targetLeft - startLeft;
        if (Math.abs(delta) < 0.5) {
          isAutoScrollingRef.current = false;
          grid.classList.remove("is-auto-scrolling");
          resolve();
          return;
        }

        const startTime = performance.now();

        const step = (now: number) => {
          const progress = Math.min(1, (now - startTime) / MOBILE_AUTO_SCROLL_MS);
          grid.scrollLeft = startLeft + delta * easeInOutCubic(progress);

          if (progress < 1) {
            scrollAnimFrame = requestAnimationFrame(step);
            return;
          }

          scrollAnimFrame = 0;
          isAutoScrollingRef.current = false;
          grid.classList.remove("is-auto-scrolling");
          resolve();
        };

        scrollAnimFrame = requestAnimationFrame(step);
      });

    const scrollToIndex = async (index: number) => {
      const tiles = getTiles();
      if (!tiles.length) return;

      const normalized = ((index % tiles.length) + tiles.length) % tiles.length;
      await animateScrollTo(tileScrollLeft(tiles[normalized]));
      autoIndexRef.current = normalized;
    };

    const scheduleNext = () => {
      window.clearTimeout(dwellTimer);
      if (!isVisible || pausedRef.current) return;

      dwellTimer = window.setTimeout(async () => {
        if (!isVisible || pausedRef.current) return;

        const tiles = getTiles();
        if (tiles.length < 2) return;

        const nextIndex = autoIndexRef.current + 1;
        if (nextIndex >= tiles.length) {
          await animateScrollTo(0);
          autoIndexRef.current = 0;
        } else {
          await scrollToIndex(nextIndex);
        }

        scheduleNext();
      }, MOBILE_AUTO_DWELL_MS);
    };

    const pause = () => {
      pausedRef.current = true;
      cancelScrollAnim();
      window.clearTimeout(dwellTimer);
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pausedRef.current = false;
        scheduleNext();
      }, MOBILE_AUTO_RESUME_MS);
    };

    const visibilityIo = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !pausedRef.current) {
          scheduleNext();
        } else {
          window.clearTimeout(dwellTimer);
          cancelScrollAnim();
        }
      },
      { threshold: 0.35 },
    );
    visibilityIo.observe(section);

    const onScroll = () => {
      if (isAutoScrollingRef.current) return;

      pause();
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        const tiles = getTiles();
        if (!tiles.length) return;

        const scrollLeft = grid.scrollLeft;
        let closest = 0;
        let minDist = Infinity;
        tiles.forEach((tile, index) => {
          const dist = Math.abs(tileScrollLeft(tile) - scrollLeft);
          if (dist < minDist) {
            minDist = dist;
            closest = index;
          }
        });
        autoIndexRef.current = closest;
      }, 120);
    };

    const stopIfDesktop = () => {
      if (!mobileMq.matches) {
        window.clearTimeout(dwellTimer);
        cancelScrollAnim();
      }
    };

    grid.addEventListener("touchstart", pause, { passive: true });
    grid.addEventListener("pointerdown", pause);
    grid.addEventListener("wheel", pause, { passive: true });
    grid.addEventListener("scroll", onScroll, { passive: true });
    mobileMq.addEventListener("change", stopIfDesktop);

    if (isVisible) scheduleNext();

    return () => {
      window.clearTimeout(dwellTimer);
      window.clearTimeout(resumeTimer);
      window.clearTimeout(scrollEndTimer);
      cancelScrollAnim();
      visibilityIo.disconnect();
      grid.removeEventListener("touchstart", pause);
      grid.removeEventListener("pointerdown", pause);
      grid.removeEventListener("wheel", pause);
      grid.removeEventListener("scroll", onScroll);
      mobileMq.removeEventListener("change", stopIfDesktop);
    };
  }, [reducedMotion]);

  const cardDelayMs = aboutTeaserTiles.length * TILE_STAGGER_MS + CARD_EXTRA_DELAY_MS;

  return (
    <>
      <style>{`
        .about-teaser {
          min-height: clamp(700px, 82vh, 920px);
          padding: 0;
          border-top: none;
          background:
            radial-gradient(circle at 82% 18%, rgba(138,42,58,0.18), transparent 28%),
            radial-gradient(circle at 14% 82%, rgba(214,173,114,0.06), transparent 24%);
        }

        .about-teaser-shell {
          position: relative;
          width: 100%;
          min-height: inherit;
        }

        .about-teaser-card-wrap {
          position: absolute;
          inset: 50% auto auto 50%;
          z-index: 8;
          width: min(21rem, calc(100% - 6rem));
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity calc(${CARD_FADE_S}s * var(--motion)) var(--ease-long);
          transition-delay: var(--card-fade-delay, 0ms);
        }

        .about-teaser.is-visible .about-teaser-card-wrap {
          opacity: 1;
        }

        .about-teaser-grid-wrap {
          width: 100%;
          min-height: inherit;
        }

        .about-teaser-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows: repeat(6, minmax(96px, 1fr));
          gap: clamp(3px, 0.35vw, 6px);
          width: 100%;
          min-height: inherit;
          border-radius: 0;
          overflow: hidden;
        }

        .about-teaser-grid::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background:
            radial-gradient(ellipse 42% 40% at 50% 50%, rgba(6,6,6,0.78) 0%, rgba(6,6,6,0.34) 46%, rgba(6,6,6,0) 72%),
            radial-gradient(circle at 50% 50%, rgba(6,6,6,0) 58%, rgba(6,6,6,0.42) 100%);
        }

        @media (min-width: 761px) {
          .about-teaser-tile:nth-child(1) { grid-column: 1 / span 4; grid-row: 1 / span 3; }
          .about-teaser-tile:nth-child(2) { grid-column: 5 / span 4; grid-row: 1 / span 2; }
          .about-teaser-tile:nth-child(3) { grid-column: 9 / span 4; grid-row: 1 / span 2; }
          .about-teaser-tile:nth-child(4) { grid-column: 5 / span 4; grid-row: 3 / span 2; }
          .about-teaser-tile:nth-child(5) { grid-column: 9 / span 4; grid-row: 3 / span 2; }
          .about-teaser-tile:nth-child(6) { grid-column: 1 / span 4; grid-row: 4 / span 3; }
          .about-teaser-tile:nth-child(7) { grid-column: 5 / span 4; grid-row: 5 / span 2; }
          .about-teaser-tile:nth-child(8) { grid-column: 9 / span 4; grid-row: 5 / span 2; }
        }

        .about-teaser-tile {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          opacity: 0;
          transition:
            opacity calc(${TILE_FADE_S}s * var(--motion)) var(--ease-long),
            box-shadow 0.4s var(--ease);
          transition-delay: var(--tile-fade-delay, 0ms);
        }

        .about-teaser.is-visible .about-teaser-tile {
          opacity: 1;
        }

        .about-teaser:not(.is-visible) .about-teaser-tile,
        .about-teaser:not(.is-visible) .about-teaser-card-wrap {
          transition-duration: calc(0.28s * var(--motion));
          transition-delay: 0ms !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-teaser-tile,
          .about-teaser-card-wrap {
            transition-delay: 0ms !important;
          }
        }

        .about-teaser-photo {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .about-teaser-photo-frame {
          position: absolute;
          inset: 0;
        }

        .about-teaser-photo-frame[data-zoom] {
          width: calc(100% / var(--tile-zoom));
          height: calc(100% / var(--tile-zoom));
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .about-teaser-photo img {
          object-fit: cover;
          object-position: var(--tile-focus, center);
          transform: scale(1.02);
          filter: saturate(0.95) contrast(1.03) brightness(0.9);
          transition: transform 0.55s var(--ease), filter 0.55s var(--ease);
        }

        /* ENDLESS-style focus reveal: the whole grid stays blurred and dim,
           and only the hovered tile sharpens and lifts above the scrim.
           Restricted to devices with a real hover pointer so touch screens
           still show crisp images. */
        @media (hover: hover) and (pointer: fine) {
          .about-teaser-photo img {
            transform: scale(1.04);
            filter: blur(7px) saturate(0.68) brightness(0.52);
          }

          .about-teaser-tile:hover {
            z-index: 5;
            box-shadow: 0 30px 84px rgba(0,0,0,0.52);
          }

          .about-teaser-tile:hover .about-teaser-photo img {
            transform: scale(1.02);
            filter: blur(0) saturate(1.06) contrast(1.05) brightness(1.05);
          }
        }

        @media (hover: none), (pointer: coarse) {
          .about-teaser-photo img {
            transform: scale(1.02);
            filter: saturate(0.98) contrast(1.03) brightness(0.94);
          }
        }

        .about-teaser-card {
          position: relative;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          padding: clamp(1rem, 1.4vw, 1.25rem) clamp(1rem, 1.6vw, 1.35rem);
          border-radius: 14px;
          border: 1px solid rgba(232,228,220,0.12);
          background:
            radial-gradient(circle at 50% 0%, rgba(138,42,58,0.12), transparent 52%),
            linear-gradient(180deg, rgba(9,9,9,0.68), rgba(9,9,9,0.34));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            0 14px 40px rgba(0,0,0,0.24),
            0 0 18px rgba(138,42,58,0.08);
          text-align: center;
        }

        .about-teaser-card::before {
          content: "";
          position: absolute;
          inset: 0.55rem;
          border: 1px solid rgba(232,228,220,0.05);
          pointer-events: none;
        }

        .about-teaser-card h2 {
          margin: 0;
          color: var(--fg);
          font-size: clamp(1.45rem, 2.4vw, 2rem);
          line-height: 1.08;
          letter-spacing: 0;
          font-weight: 900;
          text-wrap: balance;
          text-align: center;
        }

        .about-teaser-cta {
          position: relative;
          margin-top: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 2.35rem;
          padding: 0 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.14);
          background: rgba(255,255,255,0.018);
          color: var(--fg);
          text-decoration: none;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.6rem;
          letter-spacing: 0;
          text-transform: uppercase;
          overflow: hidden;
          isolation: isolate;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          transition:
            transform 0.22s var(--ease),
            border-color 0.28s var(--ease),
            color 0.28s var(--ease),
            box-shadow 0.28s var(--ease);
        }

        .about-teaser-cta-fill {
          position: absolute;
          inset: auto 0 0;
          z-index: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(180deg, #b54858 0%, #8a2a3a 58%, #6d2130 100%);
          transition: height 0.62s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .about-teaser-cta-fill::before {
          content: "";
          position: absolute;
          top: -11px;
          left: -24%;
          width: 148%;
          height: 24px;
          background: #b54858;
          border-radius: 46% 54% 42% 58% / 72% 58% 42% 28%;
          opacity: 0;
          transition: opacity 0.28s ease 0.12s;
          animation: about-teaser-liquid-wave 2.6s ease-in-out infinite;
        }

        .about-teaser-cta-label,
        .about-teaser-cta-icon {
          position: relative;
          z-index: 1;
          transition: color 0.28s var(--ease), transform 0.28s var(--ease);
        }

        .about-teaser-cta-ripple {
          position: absolute;
          z-index: 2;
          width: 0.65rem;
          height: 0.65rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.42);
          transform: translate(-50%, -50%) scale(0);
          animation: about-teaser-cta-ripple 0.58s ease-out forwards;
          pointer-events: none;
        }

        @keyframes about-teaser-liquid-wave {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
            border-radius: 46% 54% 42% 58% / 72% 58% 42% 28%;
          }
          50% {
            transform: translateX(-7%) rotate(-2deg);
            border-radius: 54% 46% 58% 42% / 38% 62% 48% 52%;
          }
        }

        @keyframes about-teaser-cta-ripple {
          to {
            transform: translate(-50%, -50%) scale(7);
            opacity: 0;
          }
        }

        @keyframes about-teaser-cta-ring {
          from {
            transform: scale(0.92);
            opacity: 0.85;
          }
          to {
            transform: scale(1.22);
            opacity: 0;
          }
        }

        .about-teaser-cta:hover,
        .about-teaser-cta:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(163,63,77,0.72);
          color: #fff;
          box-shadow: 0 10px 28px rgba(138,42,58,0.28);
          outline: none;
        }

        .about-teaser-cta:hover .about-teaser-cta-fill,
        .about-teaser-cta:focus-visible .about-teaser-cta-fill {
          height: 100%;
        }

        .about-teaser-cta:hover .about-teaser-cta-fill::before,
        .about-teaser-cta:focus-visible .about-teaser-cta-fill::before {
          opacity: 1;
        }

        .about-teaser-cta:hover .about-teaser-cta-icon,
        .about-teaser-cta:focus-visible .about-teaser-cta-icon {
          transform: translate(1px, -1px);
        }

        .about-teaser-cta:active {
          transform: translateY(0) scale(0.95);
          box-shadow: 0 4px 14px rgba(138,42,58,0.22);
        }

        @media (hover: none), (pointer: coarse) {
          .about-teaser-cta:hover {
            transform: none;
            border-color: rgba(232,228,220,0.14);
            color: var(--fg);
            box-shadow: none;
          }

          .about-teaser-cta:hover .about-teaser-cta-fill {
            height: 0;
          }

          .about-teaser-cta:hover .about-teaser-cta-fill::before {
            opacity: 0;
          }

          .about-teaser-cta:hover .about-teaser-cta-icon {
            transform: none;
          }

          .about-teaser-cta.is-pressed,
          .about-teaser-cta:active {
            transform: scale(0.97);
            border-color: rgba(163,63,77,0.72);
            color: #fff;
            box-shadow: 0 6px 20px rgba(138,42,58,0.24);
          }

          .about-teaser-cta.is-pressed .about-teaser-cta-fill,
          .about-teaser-cta:active .about-teaser-cta-fill {
            height: 100%;
            transition-duration: 0.26s;
          }

          .about-teaser-cta.is-pressed .about-teaser-cta-fill::before,
          .about-teaser-cta:active .about-teaser-cta-fill::before {
            opacity: 1;
          }

          .about-teaser-cta.is-pressed .about-teaser-cta-icon,
          .about-teaser-cta:active .about-teaser-cta-icon {
            transform: translate(1px, -1px);
          }
        }

        .about-teaser-cta.is-pulse::after {
          content: "";
          position: absolute;
          inset: -3px;
          border: 1px solid rgba(214,173,114,0.72);
          border-radius: 999px;
          pointer-events: none;
          animation: about-teaser-cta-ring 0.42s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-teaser-cta-fill,
          .about-teaser-cta-fill::before,
          .about-teaser-cta-ripple,
          .about-teaser-cta.is-pulse::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }

          .about-teaser-cta:hover .about-teaser-cta-fill,
          .about-teaser-cta:focus-visible .about-teaser-cta-fill {
            height: 100%;
          }
        }

        @media (max-width: 1100px) and (min-width: 761px) {
          .about-teaser-card-wrap {
            width: min(19rem, calc(100% - 3rem));
          }

          .about-teaser-grid {
            grid-template-columns: repeat(8, minmax(0, 1fr));
            grid-template-rows: repeat(8, minmax(70px, 1fr));
          }

          .about-teaser-tile:nth-child(1) { grid-column: 1 / span 4 !important; grid-row: 1 / span 2 !important; }
          .about-teaser-tile:nth-child(2) { grid-column: 5 / span 4 !important; grid-row: 1 / span 2 !important; }
          .about-teaser-tile:nth-child(3) { grid-column: 1 / span 4 !important; grid-row: 3 / span 2 !important; }
          .about-teaser-tile:nth-child(4) { grid-column: 5 / span 4 !important; grid-row: 3 / span 2 !important; }
          .about-teaser-tile:nth-child(5) { grid-column: 1 / span 4 !important; grid-row: 5 / span 2 !important; }
          .about-teaser-tile:nth-child(6) { grid-column: 5 / span 4 !important; grid-row: 5 / span 2 !important; }
          .about-teaser-tile:nth-child(7) { grid-column: 1 / span 4 !important; grid-row: 7 / span 2 !important; }
          .about-teaser-tile:nth-child(8) { grid-column: 5 / span 4 !important; grid-row: 7 / span 2 !important; }
        }

        @media (max-width: 760px) {
          .about-teaser {
            min-height: auto;
            background: var(--bg);
            isolation: isolate;
          }

          .about-teaser-shell {
            min-height: auto;
            display: flex;
            flex-direction: column;
            gap: var(--mobile-stack-gap);
          }

          .about-teaser-grid-wrap {
            min-height: auto;
            order: 1;
            padding-top: calc(var(--safe-top) + 3.25rem);
            position: relative;
          }

          .about-teaser-grid-wrap::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            background: linear-gradient(
              90deg,
              var(--bg) 0%,
              transparent 10%,
              transparent 90%,
              var(--bg) 100%
            );
          }

          .about-teaser-card-wrap {
            position: relative;
            inset: auto;
            z-index: 2;
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 0 var(--section-pad-x) calc(var(--safe-bottom) + 2.5rem);
            transform: none;
            order: 2;
          }

          .about-teaser-card {
            width: min(100%, 22rem);
            margin-inline: auto;
          }

          .about-teaser-grid {
            min-height: auto;
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x proximity;
            -webkit-overflow-scrolling: touch;
            gap: 10px;
            padding: 0 var(--section-pad-x) 0.35rem;
            margin: 0 calc(-1 * var(--section-pad-x));
            padding-left: var(--section-pad-x);
            padding-right: var(--section-pad-x);
            scrollbar-width: none;
          }

          .about-teaser-grid.is-auto-scrolling {
            scroll-snap-type: none;
            scroll-behavior: auto;
          }

          .about-teaser-grid::-webkit-scrollbar {
            display: none;
          }

          .about-teaser-tile {
            flex: 0 0 min(44vw, 172px);
            scroll-snap-align: start;
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 0;
            aspect-ratio: 3 / 4;
            border-radius: 8px;
          }

          .about-teaser-tile.is-mobile-hidden {
            display: none;
          }

          .about-teaser-grid::before,
          .about-teaser-grid::after {
            display: none;
          }

          .about-teaser-card h2 {
            font-size: clamp(1.45rem, 6.2vw, 1.9rem);
            text-wrap: balance;
          }

          .about-teaser-cta {
            min-height: var(--touch-min);
            width: 100%;
            padding: 0 1rem;
            font-size: 0.62rem;
          }
        }

        @media (max-width: 480px) {
          .about-teaser-grid-wrap {
            padding-top: calc(var(--safe-top) + 4.25rem);
          }

          .about-teaser-card-wrap {
            padding-bottom: 1.5rem;
          }

          .about-teaser-tile {
            flex-basis: min(46vw, 158px);
          }
        }
      `}</style>

      <section ref={sectionRef} id="about-teaser" data-section="PROFILE" data-num="02" className="about-teaser">
        <div className="about-teaser-shell">
          <div
            className="about-teaser-card-wrap"
            style={{ "--card-fade-delay": `${cardDelayMs}ms` } as CSSProperties}
          >
            <div className="about-teaser-card">
              <h2>{aboutTeaser.title}</h2>
              <AboutTeaserCta label={aboutTeaser.ctaLabel} />
            </div>
          </div>

          <div className="about-teaser-grid-wrap">
            <div ref={gridRef} className="about-teaser-grid" aria-hidden="true">
              {aboutTeaserTiles.map((tile, index) => (
                <article
                  className={[
                    "about-teaser-tile",
                    tile.hideOnMobile ? "is-mobile-hidden" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={tile.title}
                  style={{
                    background: toneBackground(tile.tone as AboutTeaserTone),
                    "--tile-fade-delay": `${index * TILE_STAGGER_MS}ms`,
                    ...(tile.focus ? { "--tile-focus": tile.focus } : {}),
                    ...(tile.zoom ? { "--tile-zoom": tile.zoom } : {}),
                  } as CSSProperties}
                >
                  {tile.src ? (
                    <div className="about-teaser-photo">
                      <div
                        className="about-teaser-photo-frame"
                        data-zoom={tile.zoom ? "" : undefined}
                        style={
                          tile.zoom
                            ? ({ "--tile-zoom": tile.zoom } as CSSProperties)
                            : undefined
                        }
                      >
                        <Image
                          src={tile.src}
                          alt={tile.alt ?? tile.title}
                          fill
                          sizes="(max-width: 480px) 50vw, (max-width: 760px) 50vw, 33vw"
                          style={
                            tile.focus
                              ? { objectFit: "cover", objectPosition: tile.focus }
                              : { objectFit: "cover" }
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
