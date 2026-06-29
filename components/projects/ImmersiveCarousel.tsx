"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useContent, useUI } from "@/lib/i18n/LocaleProvider";
import { useRouter } from "next/navigation";

const W   = 285;
const H   = 385;
const SX  = 11.5;
const SY  = -7;
const SZ  = 88;

type CarouselLayout = {
  cardW: number;
  cardH: number;
  sx: number;
  sy: number;
  cardLeft: string;
  cardTop: string;
  isMobile: boolean;
};

function readCarouselLayout(): CarouselLayout {
  if (typeof window === "undefined") {
    return { cardW: W, cardH: H, sx: SX, sy: SY, cardLeft: "56%", cardTop: "50%", isMobile: false };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width < 860) {
    const short = height < 640;
    const cardW = Math.min(short ? 200 : 228, Math.round(width * (short ? 0.54 : 0.58)));
    const maxCardH = Math.round(height * (short ? 0.28 : 0.36));
    const cardH = Math.min(Math.round(cardW * (short ? 1.12 : 1.22)), maxCardH);

    return {
      cardW,
      cardH,
      sx: 4,
      sy: 0,
      cardLeft: "50%",
      cardTop: "50%",
      isMobile: true,
    };
  }

  return { cardW: W, cardH: H, sx: SX, sy: SY, cardLeft: "56%", cardTop: "50%", isMobile: false };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Placement = {
  x: string; y: string; z: number;
  opacity: number; scale: number;
  blur: number; grayscale: number;
  zIndex: number;
};

function getPlacement(offset: number, n: number, sx: number, sy: number, isMobile = false): Placement {
  if (isMobile && offset !== 0) {
    return {
      x: offset < 0 ? "-14vw" : "14vw",
      y: "0vh",
      z: -80,
      opacity: 0,
      scale: 0.88,
      blur: 8,
      grayscale: 40,
      zIndex: 0,
    };
  }

  if (offset <= -2) return {
    x: "-18vw", y: "12vh", z: -220,
    opacity: 0, scale: 0.75, blur: 10, grayscale: 60, zIndex: 0,
  };
  if (offset === -1) return {
    x: "-9vw", y: "6vh", z: -140,
    opacity: 0.1, scale: 0.83, blur: 6, grayscale: 45, zIndex: 1,
  };
  if (offset === 0) return {
    x: "0vw", y: "0vh", z: 0,
    opacity: 1, scale: 1, blur: 0, grayscale: 0, zIndex: n,
  };
  const cap = Math.min(offset, 5);
  return {
    x: `${cap * sx}vw`,
    y: `${cap * sy}vh`,
    z: -(cap * SZ),
    opacity: Math.max(0, 1 - cap * 0.22),
    scale: Math.max(0.76, 1 - cap * 0.05),
    blur: cap * 1.8,
    grayscale: Math.min(55, cap * 11),
    zIndex: Math.max(0, n - cap),
  };
}

function getBg(hue: number) {
  return `radial-gradient(ellipse 200% 160% at 62% 48%, hsl(${hue}, 42%, 15%) 0%, hsl(${hue}, 26%, 8%) 50%, hsl(${hue}, 16%, 4%) 100%)`;
}

function rememberProjectReturnTarget() {
  try {
    sessionStorage.setItem("rs_scroll_target", "projects");
  } catch {}
}

export function ImmersiveCarousel() {
  const { projects } = useContent();
  const ui = useUI();
  const N = projects.length;
  const sectionRef  = useRef<HTMLElement>(null);
  const sceneRef    = useRef<HTMLDivElement>(null);
  const bgA         = useRef<HTMLDivElement>(null);
  const bgB         = useRef<HTMLDivElement>(null);
  const bgToggle    = useRef(false);
  // Outer wrappers: GSAP controls x/y/z/rotateY/rotateZ/scale/opacity/filter
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  // Inner cards: CSS transition controls the hover lift
  const innerRefs   = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [layout, setLayout] = useState<CarouselLayout>(() => readCarouselLayout());
  const activeIdxRef = useRef(0);
  const layoutRef = useRef(layout);
  const goToRef = useRef<(idx: number, instant?: boolean) => void>(() => {});
  const positionCardsRef = useRef<(idx: number, instant?: boolean) => void>(() => {});
  const isVisibleRef = useRef(false);

  useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  useEffect(() => {
    positionCardsRef.current?.(activeIdxRef.current, true);
  }, [layout.isMobile]);

  useEffect(() => {
    const sync = () => setLayout(readCarouselLayout());
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  const router = useRouter();

  //  Background cross-fade 
  const crossFadeBg = useCallback((idx: number, instant = false) => {
    bgToggle.current = !bgToggle.current;
    const next = bgToggle.current ? bgB.current : bgA.current;
    const prev = bgToggle.current ? bgA.current : bgB.current;
    if (!next || !prev) return;
    next.style.background = getBg(projects[idx].hue);
    if (instant) {
      gsap.set(next, { opacity: 1 });
      gsap.set(prev, { opacity: 0 });
    } else {
      gsap.to(next, { opacity: 1, duration: 0.9, ease: "power2.inOut" });
      gsap.to(prev, { opacity: 0, duration: 0.9, ease: "power2.inOut" });
    }
  }, []);

  //  Card positioning 
  const positionCards = useCallback((idx: number, instant = false) => {
    const { sx, sy, isMobile } = layoutRef.current;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const p = getPlacement(i - idx, N, sx, sy, isMobile);
      gsap.to(el, {
        x: p.x, y: p.y, z: p.z,
        rotateY: layoutRef.current.isMobile ? -6 : -12,
        rotateZ: layoutRef.current.isMobile ? 0 : 2.5,
        scale: p.scale, opacity: p.opacity,
        filter: `blur(${p.blur}px) grayscale(${p.grayscale}%)`,
        zIndex: p.zIndex,
        duration: instant ? 0 : 0.85,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, [N]);

  useEffect(() => {
    positionCardsRef.current = positionCards;
  }, [positionCards]);

  //  Navigate 
  const goTo = useCallback((idx: number, instant = false) => {
    activeIdxRef.current = idx;
    setActiveIdx(idx);
    positionCards(idx, instant);
    crossFadeBg(idx, instant);
  }, [positionCards, crossFadeBg]);

  const openActiveProject = useCallback(() => {
    const project = projects[activeIdxRef.current];
    if (project.comingSoon) return;
    rememberProjectReturnTarget();
    router.push(`/projects/${project.slug}`);
  }, [router, projects]);

  useEffect(() => { goToRef.current = goTo; }, [goTo]);

  //  Initial placement 
  // useGSAP fires via useLayoutEffect, before the useEffect that wires goToRef.
  // Call positionCards/crossFadeBg directly to guarantee cards appear on mount.
  useGSAP(() => {
    positionCards(0, true);
    crossFadeBg(0, true);
  }, { scope: sectionRef, dependencies: [] });


  //  Mouse parallax (fine 3D tilt) — desktop only
  useEffect(() => {
    if (layout.isMobile) return;

    const ml = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      ml.tx = ((e.clientX / window.innerWidth)  - 0.5) * 8;
      ml.ty = ((e.clientY / window.innerHeight) - 0.5) * -5;
    };
    let raf: number;
    const tick = () => {
      ml.x = lerp(ml.x, ml.tx, 0.05);
      ml.y = lerp(ml.y, ml.ty, 0.05);
      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(${ml.y}deg) rotateY(${ml.x}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [layout.isMobile]);

  // Carousel accent: sync shell accent color to active card hue
  useEffect(() => {
    const dispatch = (idx: number) => {
      const hue = projects[idx].hue;
      window.dispatchEvent(new CustomEvent("carousel:active", {
        detail: {
          accent: `hsl(${hue}, 62%, 58%)`,
          accentSoft: `hsla(${hue}, 55%, 45%, 0.18)`,
        },
      }));
    };
    if (isVisibleRef.current) dispatch(activeIdx);
  }, [activeIdx]);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          const hue = projects[activeIdxRef.current].hue;
          window.dispatchEvent(new CustomEvent("carousel:active", {
            detail: {
              accent: `hsl(${hue}, 62%, 58%)`,
              accentSoft: `hsla(${hue}, 55%, 45%, 0.18)`,
            },
          }));
        } else {
          window.dispatchEvent(new CustomEvent("carousel:leave"));
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  //  Keyboard navigation (only while carousel is visible)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isVisibleRef.current) return;
      if (document.body.style.overflow === "hidden") return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToRef.current((activeIdxRef.current + 1) % N);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToRef.current((activeIdxRef.current - 1 + N) % N);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = projects[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-section="PROJECTS"
      data-num="04"
      className={`immersive-carousel${layout.isMobile ? " is-mobile" : ""}`}
      style={{ position: "relative", padding: 0 }}
    >
      <style>{`
        .immersive-carousel {
          min-height: 100svh;
        }

        @media (max-width: 860px) {
          .immersive-carousel {
            height: auto !important;
            min-height: auto !important;
          }

          .immersive-carousel .carousel-sticky {
            display: grid;
            grid-template-rows: auto auto;
            grid-template-areas:
              "info"
              "nav";
            gap: 1rem;
            box-sizing: border-box;
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            padding:
              calc(var(--safe-top) + 4.75rem)
              var(--section-pad-x)
              calc(var(--safe-bottom) + 2rem);
          }

          .immersive-carousel .carousel-bg,
          .immersive-carousel .carousel-grid {
            position: absolute;
            inset: 0;
          }

          .immersive-carousel .carousel-info-panel {
            position: relative !important;
            grid-area: info;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            max-width: none !important;
            z-index: 12;
          }

          .immersive-carousel .carousel-info-panel h2 {
            font-size: clamp(1.65rem, 8vw, 2.15rem) !important;
            line-height: 0.95 !important;
            margin-bottom: 0.65rem !important;
          }

          .immersive-carousel .carousel-info-meta {
            margin-bottom: 0.55rem !important;
          }

          .immersive-carousel .carousel-info-tag {
            margin-bottom: 0.85rem !important;
            font-size: 0.78rem !important;
          }

          .immersive-carousel .carousel-info-blurb {
            display: block;
            overflow: visible;
            margin-bottom: 1rem !important;
            font-size: 0.88rem !important;
            line-height: 1.58 !important;
            -webkit-line-clamp: unset;
          }

          .immersive-carousel .carousel-open-btn {
            min-height: var(--touch-min);
            padding: 0 1.1rem !important;
            font-size: 0.58rem !important;
            touch-action: manipulation;
            transition: transform 0.16s var(--ease), background 0.2s ease, color 0.2s ease;
          }

          .immersive-carousel .carousel-open-btn:active {
            transform: scale(0.97);
          }

          .immersive-carousel .carousel-nav-arrow {
            touch-action: manipulation;
            transition: transform 0.16s var(--ease), opacity 0.2s ease;
          }

          .immersive-carousel .carousel-nav-arrow:active {
            transform: scale(0.92);
          }

          .immersive-carousel .carousel-nav-dot {
            touch-action: manipulation;
            transition: transform 0.16s var(--ease);
          }

          .immersive-carousel .carousel-nav-dot:active {
            transform: scale(0.9);
          }

          .immersive-carousel .carousel-stage {
            display: none !important;
          }

          .immersive-carousel .carousel-info-arch {
            display: none;
          }

          .immersive-carousel .carousel-nav-wrap {
            grid-area: nav;
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            width: 100%;
            gap: 0.9rem !important;
            z-index: 12;
            padding-top: 0.15rem;
          }

          .immersive-carousel .carousel-nav-row {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            gap: 0.75rem;
          }

          .immersive-carousel .carousel-nav-dots {
            grid-column: 1 / -1;
            justify-content: center;
            gap: 0.2rem !important;
            flex-wrap: nowrap;
            max-width: 100%;
          }

          .immersive-carousel .carousel-nav-arrows {
            grid-column: 2;
            justify-content: center;
          }

          .immersive-carousel .carousel-nav-counter {
            position: static !important;
            bottom: auto !important;
            right: auto !important;
            text-align: right;
            color: rgba(255,255,255,0.42);
            font-size: 0.58rem;
          }

          .immersive-carousel .carousel-nav-counter-desktop {
            display: none;
          }

          .immersive-carousel .carousel-nav-hint {
            display: none;
          }

          .immersive-carousel .carousel-nav-arrow {
            width: 2.75rem !important;
            height: 2.75rem !important;
          }

          .immersive-carousel .carousel-nav-dot {
            min-width: 0 !important;
            min-height: 0 !important;
            padding: 0.35rem 0.08rem !important;
            display: grid;
            place-items: center;
            width: auto !important;
            height: auto !important;
            background: transparent !important;
            border-radius: 0 !important;
          }

          .immersive-carousel .carousel-nav-dot-mark {
            width: 0.32rem !important;
            height: 0.32rem !important;
            border-radius: 50% !important;
          }

          .immersive-carousel .carousel-nav-dot.is-active .carousel-nav-dot-mark {
            width: 0.4rem !important;
            height: 0.4rem !important;
          }
        }

        .carousel-nav-dot-mark {
          border-radius: 50%;
        }

        @media (hover: hover) and (pointer: fine) {
          .immersive-carousel .carousel-open-btn:hover {
            background: hsl(var(--btn-hue, 0), 50%, 42%) !important;
            color: #f0f0f0 !important;
          }
        }

        @media (max-width: 480px) {
          .immersive-carousel .carousel-sticky {
            gap: 0.65rem;
            padding-top: calc(var(--safe-top) + 4.35rem);
          }

          .immersive-carousel .carousel-info-panel h2 {
            font-size: clamp(1.45rem, 7.4vw, 1.85rem) !important;
          }
        }

        @media (max-width: 860px) and (max-height: 640px) {
          .immersive-carousel .carousel-sticky {
            gap: 0.75rem;
            padding-top: calc(var(--safe-top) + 4.1rem);
          }

          .immersive-carousel .carousel-info-panel h2 {
            font-size: clamp(1.35rem, 6.8vw, 1.65rem) !important;
            margin-bottom: 0.45rem !important;
          }
        }

        .carousel-nav-row {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .carousel-card-content .carousel-card-tag {
          font-size: 11px;
          color: rgba(240, 240, 240, 0.46);
          letter-spacing: 0.04em;
          line-height: 1.4;
        }

        .carousel-card-blurb {
          margin-top: 12px;
          margin-bottom: 0;
          max-width: 100%;
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-size: 13px !important;
          font-weight: 300;
          line-height: 1.48;
          color: rgba(240, 240, 240, 0.52);
          letter-spacing: 0.01em;
        }
      `}</style>
      <div className="carousel-sticky" style={{
        position: "sticky", top: 0,
        height: layout.isMobile ? undefined : "100dvh",
        minHeight: "100svh",
        overflow: layout.isMobile ? "visible" : "hidden",
        boxSizing: "border-box",
      }}>

        {/* Solid base prevents bleed-through during gradient cross-fade */}
        <div className="carousel-bg" style={{ position: "absolute", inset: 0, background: "#030303" }} />

        {/* Cross-fade background layers */}
        <div className="carousel-bg" style={{ position: "absolute", inset: 0 }}>
          <div ref={bgA} style={{
            position: "absolute", inset: 0,
            background: getBg(projects[0].hue),
          }} />
          <div ref={bgB} style={{ position: "absolute", inset: 0, opacity: 0 }} />
        </div>

        {/* Ambient grid */}
        <div className="carousel-grid" aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(ellipse 75% 65% at 62% 50%, black 10%, transparent 72%)",
        }} />

        {/*  3D perspective container  */}
        <div className="carousel-stage" style={{
          position: layout.isMobile ? "relative" : "absolute",
          ...(layout.isMobile ? { width: "100%", height: "100%" } : { inset: 0 }),
          perspective: layout.isMobile ? "none" : "1200px",
          perspectiveOrigin: layout.isMobile ? "50% 50%" : "54% 50%",
          zIndex: 3,
        }}>
          <div ref={sceneRef} className="carousel-scene" style={{
            position: layout.isMobile ? "relative" : "absolute",
            ...(layout.isMobile ? { width: "100%", height: "100%" } : { inset: 0 }),
            transformStyle: "preserve-3d",
          }}>
            {projects.map((project, i) => (
              //  Outer: GSAP positions this (x/y/z/rotate/scale/opacity/filter) 
              <div
                key={project.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  left: layout.cardLeft,
                  top: layout.cardTop,
                  marginLeft: -(layout.cardW / 2),
                  marginTop: -(layout.cardH / 2),
                  width: layout.cardW,
                  height: layout.cardH,
                  transformOrigin: "50% 50%",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/*  Inner: CSS lift on hover, all visual styles here  */}
                <button
                  type="button"
                  ref={(el) => { innerRefs.current[i] = el; }}
                  aria-label={
                    i === activeIdx
                      ? ui.openProject(project.name)
                      : ui.showProject(project.name)
                  }
                  aria-current={i === activeIdx ? "true" : undefined}
                  onClick={() => {
                    if (i !== activeIdxRef.current) {
                      goToRef.current(i);
                      return;
                    }
                    if (!projects[i].comingSoon) openActiveProject();
                  }}
                  onMouseEnter={() => {
                    if (i !== activeIdxRef.current) {
                      const { sx, sy } = layoutRef.current;
                      const p = getPlacement(i - activeIdxRef.current, N, sx, sy, layoutRef.current.isMobile);
                      gsap.to(cardRefs.current[i], {
                        filter: "blur(0px) grayscale(0%) brightness(1.35)",
                        opacity: Math.min(0.9, p.opacity + 0.4),
                        duration: 0.32,
                        overwrite: "auto",
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    if (i !== activeIdxRef.current) {
                      const { sx, sy } = layoutRef.current;
                      const p = getPlacement(i - activeIdxRef.current, N, sx, sy, layoutRef.current.isMobile);
                      gsap.to(cardRefs.current[i], {
                        filter: `blur(${p.blur}px) grayscale(${p.grayscale}%)`,
                        opacity: p.opacity,
                        duration: 0.45,
                        overwrite: "auto",
                      });
                    }
                  }}
                  onFocus={() => {
                    if (i !== activeIdxRef.current) goToRef.current(i);
                  }}
                  style={{
                    width: "100%", height: "100%",
                    position: "relative",
                    display: "block",
                    padding: 0,
                    margin: 0,
                    appearance: "none",
                    background: "transparent",
                    cursor: "pointer",
                    borderRadius: 3,
                    border: `1px solid hsla(${project.hue}, 50%, 65%, 0.11)`,
                    boxShadow: `0 24px 80px hsla(${project.hue}, 45%, 15%, 0.55), inset 0 1px 0 hsla(${project.hue}, 70%, 70%, 0.07)`,
                    overflow: "hidden",
                    transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.05, 1)",
                    textAlign: "left",
                  }}
                >
                  {/* Card background */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `hsl(${project.hue}, 48%, 9%)`,
                  }} />
                  {/* Ambient radial glow */}
                  <div style={{
                    position: "absolute", top: "-20%", left: "15%",
                    width: "65%", height: "65%", borderRadius: "50%",
                    background: `radial-gradient(circle, hsla(${project.hue}, 65%, 55%, 0.12) 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }} />
                  {/* Large decorative code number */}
                  <div style={{
                    position: "absolute", bottom: -10, right: -4,
                    fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                    fontSize: 148, fontWeight: 900, lineHeight: 1,
                    color: `hsla(${project.hue}, 40%, 28%, 0.12)`,
                    userSelect: "none", letterSpacing: "-0.06em",
                  }}>
                    {project.code}
                  </div>
                  {/* Project visual: cover image or ASCII glyph */}
                  {project.cardImage ? (
                    <div
                      style={{
                        position: "absolute",
                        top: project.cardImageTop ?? "0",
                        left: 0,
                        right: 0,
                        maxHeight: "58%",
                        borderRadius: "3px 3px 10px 10px",
                        overflow: "hidden",
                        pointerEvents: "none",
                      }}
                    >
                      <img
                        src={project.cardImage}
                        alt=""
                        draggable={false}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "auto",
                          maxHeight: "58%",
                          objectFit: "cover",
                          objectPosition: "top center",
                          userSelect: "none",
                        }}
                      />
                    </div>
                  ) : project.glyph ? (
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -52%)",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 10,
                      color: `hsla(${project.hue}, 55%, 72%, 0.42)`,
                      whiteSpace: "pre", textAlign: "center",
                      letterSpacing: "0.18em", lineHeight: 2.2,
                      userSelect: "none",
                    }}>
                      {project.glyph}
                    </div>
                  ) : null}
                  {/* Top edge shimmer */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg, transparent 0%, hsla(${project.hue}, 80%, 70%, 0.32) 50%, transparent 100%)`,
                  }} />
                  {/* Centered content overlay */}
                  <div className="carousel-card-content" style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "22px 18px",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 7, color: `hsl(${project.hue}, 55%, 58%)`,
                      letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 5,
                    }}>
                      {ui.projectLabel(project.code)}
                    </span>
                    <p style={{
                      fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                      fontWeight: 800, fontSize: 17, color: "#f0f0f0",
                      letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 5,
                    }}>
                      {project.name}
                    </p>
                    <span className="carousel-card-tag">
                      {project.tag}
                    </span>
                    {i === activeIdx && !project.comingSoon && (
                      <p className="carousel-card-blurb">
                        {project.blurb}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/*  Left info panel  */}
        <div className="carousel-info-panel" style={{
          position: layout.isMobile ? "relative" : "absolute",
          left: layout.isMobile ? undefined : "8vw",
          top: layout.isMobile ? undefined : "50%",
          transform: layout.isMobile ? undefined : "translateY(-50%)",
          zIndex: 10,
          maxWidth: layout.isMobile ? "none" : "min(290px, 22vw)",
        }}>
          <div
            key={`panel-${activeIdx}`}
            style={{ animation: "carouselIn 0.55s cubic-bezier(0.2,0.8,0.05,1) both" }}
          >
            <style>{`
              @keyframes carouselIn {
                from { opacity: 0; transform: translateY(14px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <span className="carousel-info-meta" style={{
              display: "block",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 8, letterSpacing: "0.26em", textTransform: "uppercase",
              color: `hsl(${active.hue}, 55%, 55%)`,
              marginBottom: 12,
            }}>
              {ui.projectLabel(active.code)}
            </span>

            <h2 style={{
              fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(26px, 3.2vw, 46px)",
              color: "#f0f0f0",
              letterSpacing: "-0.045em", lineHeight: 0.92,
              marginBottom: layout.isMobile ? 10 : 22,
            }}>
              {active.name}
            </h2>

            {layout.isMobile && (
            <p className="carousel-info-tag" style={{
              fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
              fontSize: "clamp(10px, 0.95vw, 12px)",
              color: "rgba(240,240,240,0.44)",
              letterSpacing: "0.04em",
              lineHeight: 1.45,
              fontWeight: 400,
              marginBottom: 16,
            }}>
              {active.tag}
            </p>
            )}

            {layout.isMobile && !active.comingSoon && (
            <p className="carousel-info-blurb" style={{
              fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
              fontSize: "clamp(11px, 1.0vw, 13px)",
              color: "rgba(240,240,240,0.48)",
              lineHeight: 1.65, fontWeight: 300, marginBottom: 20,
            }}>
              {active.blurb}
            </p>
            )}

            {active.architecture.length > 0 && (
            <div className="carousel-info-arch" style={{
              paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex", flexDirection: "column", gap: 7, marginBottom: 22,
            }}>
              {active.architecture.slice(0, 3).map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 7, color: "rgba(255,255,255,0.28)",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    flexShrink: 0, width: 36, paddingTop: 1,
                  }}>
                    {k}
                  </span>
                  <span style={{ fontSize: 10, color: "rgba(240,240,240,0.52)", lineHeight: 1.45 }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
            )}

            {!active.comingSoon && (
            <button
              type="button"
              className="carousel-open-btn"
              onClick={openActiveProject}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "none",
                border: `1px solid hsl(${active.hue}, 50%, 42%)`,
                color: `hsl(${active.hue}, 62%, 62%)`,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "9px 20px", cursor: "pointer", borderRadius: 999,
                transition: "transform 0.16s ease, background 0.25s ease, color 0.25s ease",
                ["--btn-hue" as string]: String(active.hue),
              }}
            >
              {ui.openPreview}
            </button>
            )}
          </div>
        </div>

        {/*  Dot navigation + arrow buttons  */}
        <div className="carousel-nav-wrap" style={{
          position: layout.isMobile ? "relative" : "absolute",
          bottom: layout.isMobile ? undefined : 44,
          left: layout.isMobile ? undefined : "50%",
          transform: layout.isMobile ? undefined : "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
          zIndex: 10,
          width: layout.isMobile ? "100%" : undefined,
        }}>
          <div className="carousel-nav-row">
          {/* Dots */}
          <div className="carousel-nav-dots" style={{ display: "flex", gap: 5, justifyContent: "center" }}>
            {projects.map((p, i) => {
              const isActive = i === activeIdx;
              return (
              <button
                type="button"
                key={p.slug}
                className={`carousel-nav-dot${isActive ? " is-active" : ""}`}
                onClick={() => goToRef.current(i)}
                aria-label={`Project ${p.name}`}
                aria-current={isActive ? "true" : undefined}
                style={{
                  border: "none", cursor: "pointer", padding: 0,
                }}
              >
                <span
                  className="carousel-nav-dot-mark"
                  aria-hidden
                  style={{
                    display: "block",
                    width: isActive ? 7 : 5,
                    height: isActive ? 7 : 5,
                    borderRadius: "50%",
                    background: isActive
                      ? `hsl(${p.hue}, 58%, 55%)`
                      : `hsla(${p.hue}, 48%, 52%, 0.42)`,
                    transition: "width 0.4s ease, height 0.4s ease, background 0.4s ease, opacity 0.4s ease",
                  }}
                />
              </button>
            );})}
          </div>

          <div className="carousel-nav-arrows" style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {(["prev", "next"] as const).map((dir) => {
              const isPrev = dir === "prev";
              return (
                <button
                  type="button"
                  key={dir}
                  className="carousel-nav-arrow"
                  aria-label={isPrev ? ui.previousProject : ui.nextProject}
                  onClick={() => goToRef.current(isPrev ? (activeIdxRef.current - 1 + N) % N : (activeIdxRef.current + 1) % N)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 28, height: 28,
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.55)",
                    cursor: "pointer",
                    fontSize: 11,
                    lineHeight: 1,
                    transition: "border-color 0.2s ease, color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {isPrev ? "<" : ">"}
                </button>
              );
            })}
          </div>

          <div className="carousel-nav-counter" style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em",
          }}>
            {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </div>
          </div>
        </div>

        {/*  Counter (desktop)  */}
        <div className="carousel-nav-counter carousel-nav-counter-desktop" style={{
          position: "absolute", bottom: 48, right: "8vw", zIndex: 10,
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em",
        }}>
          {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </div>

        {/*  Mouse hint  */}
        <div className="carousel-nav-hint" style={{
          position: "absolute", bottom: 48, left: "8vw", zIndex: 10,
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 7.5, color: "rgba(255,255,255,0.16)",
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          {ui.carouselHint}
        </div>

      </div>
    </section>
  );
}


