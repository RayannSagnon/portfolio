"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import { useRouter } from "next/navigation";

const N   = projects.length;
const W   = 285;
const H   = 385;
const SX  = 11.5;
const SY  = -7;
const SZ  = 88;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Placement = {
  x: string; y: string; z: number;
  opacity: number; scale: number;
  blur: number; grayscale: number;
  zIndex: number;
};

function getPlacement(offset: number): Placement {
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
    opacity: 1, scale: 1, blur: 0, grayscale: 0, zIndex: N,
  };
  const cap = Math.min(offset, 5);
  return {
    x: `${cap * SX}vw`,
    y: `${cap * SY}vh`,
    z: -(cap * SZ),
    opacity: Math.max(0, 1 - cap * 0.22),
    scale: Math.max(0.76, 1 - cap * 0.05),
    blur: cap * 1.8,
    grayscale: Math.min(55, cap * 11),
    zIndex: Math.max(0, N - cap),
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
  const sectionRef  = useRef<HTMLElement>(null);
  const sceneRef    = useRef<HTMLDivElement>(null);
  const bgA         = useRef<HTMLDivElement>(null);
  const bgB         = useRef<HTMLDivElement>(null);
  const bgToggle    = useRef(false);
  // Outer wrappers: GSAP controls x/y/z/rotateY/rotateZ/scale/opacity/filter
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  // Inner cards: CSS transition controls the hover lift
  const innerRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const goToRef = useRef<(idx: number, instant?: boolean) => void>(() => {});
  const isVisibleRef = useRef(false);

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
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const p = getPlacement(i - idx);
      gsap.to(el, {
        x: p.x, y: p.y, z: p.z,
        rotateY: -12, rotateZ: 2.5,
        scale: p.scale, opacity: p.opacity,
        filter: `blur(${p.blur}px) grayscale(${p.grayscale}%)`,
        zIndex: p.zIndex,
        duration: instant ? 0 : 0.85,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, []);

  //  Navigate 
  const goTo = useCallback((idx: number, instant = false) => {
    activeIdxRef.current = idx;
    setActiveIdx(idx);
    positionCards(idx, instant);
    crossFadeBg(idx, instant);
  }, [positionCards, crossFadeBg]);

  useEffect(() => { goToRef.current = goTo; }, [goTo]);

  //  Initial placement 
  // useGSAP fires via useLayoutEffect, before the useEffect that wires goToRef.
  // Call positionCards/crossFadeBg directly to guarantee cards appear on mount.
  useGSAP(() => {
    positionCards(0, true);
    crossFadeBg(0, true);
  }, { scope: sectionRef, dependencies: [] });


  //  Mouse parallax (fine 3D tilt) 
  useEffect(() => {
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
  }, []);

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

  //  Keyboard navigation 
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToRef.current((activeIdxRef.current + 1) % N);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
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
      style={{ height: "100vh", position: "relative", padding: 0 }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden",
      }}>

        {/* Solid base prevents bleed-through during gradient cross-fade */}
        <div style={{ position: "absolute", inset: 0, background: "#030303" }} />

        {/* Cross-fade background layers */}
        <div style={{ position: "absolute", inset: 0 }}>
          <div ref={bgA} style={{
            position: "absolute", inset: 0,
            background: getBg(projects[0].hue),
          }} />
          <div ref={bgB} style={{ position: "absolute", inset: 0, opacity: 0 }} />
        </div>

        {/* Ambient grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(ellipse 75% 65% at 62% 50%, black 10%, transparent 72%)",
        }} />

        {/*  3D perspective container  */}
        <div style={{
          position: "absolute", inset: 0,
          perspective: "1200px",
          perspectiveOrigin: "54% 50%",
          zIndex: 3,
        }}>
          <div ref={sceneRef} style={{
            position: "absolute", inset: 0,
            transformStyle: "preserve-3d",
          }}>
            {projects.map((project, i) => (
              //  Outer: GSAP positions this (x/y/z/rotate/scale/opacity/filter) 
              <div
                key={project.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  left: "56%", top: "50%",
                  marginLeft: -(W / 2), marginTop: -(H / 2),
                  width: W, height: H,
                  transformOrigin: "50% 50%",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/*  Inner: CSS lift on hover, all visual styles here  */}
                <div
                  ref={(el) => { innerRefs.current[i] = el; }}
                  onClick={() => { if (i !== activeIdxRef.current) goToRef.current(i); }}
                  onMouseEnter={() => {
                    if (i !== activeIdxRef.current) {
                      const p = getPlacement(i - activeIdxRef.current);
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
                      const p = getPlacement(i - activeIdxRef.current);
                      gsap.to(cardRefs.current[i], {
                        filter: `blur(${p.blur}px) grayscale(${p.grayscale}%)`,
                        opacity: p.opacity,
                        duration: 0.45,
                        overwrite: "auto",
                      });
                    }
                  }}
                  style={{
                    width: "100%", height: "100%",
                    position: "relative",
                    cursor: i === activeIdx ? "default" : "pointer",
                    borderRadius: 3,
                    border: `1px solid hsla(${project.hue}, 50%, 65%, 0.11)`,
                    boxShadow: `0 24px 80px hsla(${project.hue}, 45%, 15%, 0.55), inset 0 1px 0 hsla(${project.hue}, 70%, 70%, 0.07)`,
                    overflow: "hidden",
                    transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.05, 1)",
                  }}
                >
                  {/* Card gradient background */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(145deg, hsl(${project.hue}, 48%, 9%) 0%, hsl(${project.hue}, 38%, 15%) 45%, hsl(${project.hue}, 28%, 22%) 100%)`,
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
                    color: `hsla(${project.hue}, 35%, 45%, 0.15)`,
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
                          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 48%, transparent 100%)",
                          maskImage: "linear-gradient(to bottom, #000 0%, #000 48%, transparent 100%)",
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(to bottom, transparent 34%, hsla(${project.hue}, 42%, 11%, 0.62) 70%, hsl(${project.hue}, 38%, 14%) 100%)`,
                        }}
                      />
                    </div>
                  ) : (
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
                  )}
                  {/* Top edge shimmer */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg, transparent 0%, hsla(${project.hue}, 80%, 70%, 0.32) 50%, transparent 100%)`,
                  }} />
                  {/* Bottom content overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0) 52%)",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    padding: "20px 18px",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 7, color: `hsl(${project.hue}, 55%, 58%)`,
                      letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 5,
                    }}>
                      PROJECT {project.code}
                    </span>
                    <p style={{
                      fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                      fontWeight: 800, fontSize: 17, color: "#f0f0f0",
                      letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 5,
                    }}>
                      {project.name}
                    </p>
                    <span style={{ fontSize: 9, color: "rgba(240,240,240,0.42)", letterSpacing: "0.04em" }}>
                      {project.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  Left info panel  */}
        <div style={{
          position: "absolute", left: "8vw", top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10, maxWidth: "min(290px, 22vw)",
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

            <span style={{
              display: "block",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 8, letterSpacing: "0.26em", textTransform: "uppercase",
              color: `hsl(${active.hue}, 55%, 55%)`,
              marginBottom: 14,
            }}>
              {active.code}  /  {active.type}
            </span>

            <h2 style={{
              fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(26px, 3.2vw, 46px)",
              color: "#f0f0f0",
              letterSpacing: "-0.045em", lineHeight: 0.92, marginBottom: 16,
            }}>
              {active.name}
            </h2>

            <p style={{
              fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
              fontSize: "clamp(11px, 1.0vw, 13px)",
              color: "rgba(240,240,240,0.48)",
              lineHeight: 1.65, fontWeight: 300, marginBottom: 20,
            }}>
              {active.blurb}
            </p>

            {active.architecture.length > 0 && (
            <div style={{
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

            <button
              type="button"
              onClick={() => {
                rememberProjectReturnTarget();
                router.push(`/projects/${active.slug}`);
              }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "none",
                border: `1px solid hsl(${active.hue}, 50%, 42%)`,
                color: `hsl(${active.hue}, 62%, 62%)`,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "9px 20px", cursor: "pointer", borderRadius: 999,
                transition: "background 0.25s ease, color 0.25s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `hsl(${active.hue}, 50%, 42%)`;
                e.currentTarget.style.color = "#f0f0f0";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = `hsl(${active.hue}, 62%, 62%)`;
              }}
            >
              Open preview
            </button>
          </div>
        </div>

        {/*  Dot navigation + arrow buttons  */}
        <div style={{
          position: "absolute", bottom: 44, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
          zIndex: 10,
        }}>
          {/* Dots */}
          <div style={{ display: "flex", gap: 7 }}>
            {projects.map((p, i) => (
              <button
                type="button"
                key={p.slug}
                onClick={() => goToRef.current(i)}
                aria-label={`Project ${p.name}`}
                style={{
                  width: i === activeIdx ? 22 : 5, height: 2,
                  background: i === activeIdx ? `hsl(${p.hue}, 58%, 55%)` : "rgba(255,255,255,0.2)",
                  border: "none", cursor: "pointer", padding: 0, borderRadius: 1,
                  transition: "width 0.4s ease, background 0.4s ease",
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            {(["prev", "next"] as const).map((dir) => {
              const isPrev = dir === "prev";
              return (
                <button
                  type="button"
                  key={dir}
                  aria-label={isPrev ? "Previous project" : "Next project"}
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
        </div>

        {/*  Counter  */}
        <div style={{
          position: "absolute", bottom: 48, right: "8vw", zIndex: 10,
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em",
        }}>
          {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </div>

        {/*  Mouse hint  */}
        <div style={{
          position: "absolute", bottom: 48, left: "8vw", zIndex: 10,
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 7.5, color: "rgba(255,255,255,0.16)",
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          Click / arrow keys
        </div>

      </div>
    </section>
  );
}


