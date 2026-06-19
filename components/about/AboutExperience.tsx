"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Plane,
  Play,
  Sparkles,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";
import {
  aboutHero,
  driveStatements,
  filmBeats,
  formativeMoments,
  journeyChapters,
  photoJournal,
} from "@/content/about";
import { site } from "@/content/site";

const timelineIcons = [
  MapPin,
  Sparkles,
  Users,
  Wrench,
  Trophy,
  GraduationCap,
  Plane,
] as const;

type PhotoFrame = (typeof photoJournal)[number];

function PhotoCylinderScene({
  frames,
  rotation,
  onFocusFrame,
}: {
  frames: PhotoFrame[];
  rotation: number;
  onFocusFrame: (index: number) => void;
}) {
  const groupRef = useRef<Group | null>(null);
  const ringRef = useRef<Group | null>(null);
  const radius = 4.15;
  const step = (Math.PI * 2) / frames.length;

  useFrame((state, delta) => {
    if (groupRef.current) {
      const eased = Math.min(delta * 5.5, 1);
      groupRef.current.rotation.y += (rotation - groupRef.current.rotation.y) * eased;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.018;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.08;
      ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.32) * 0.03;
    }
  });

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[2.5, 3.5, 6]} intensity={2.2} />
      <group ref={ringRef} aria-hidden>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4.35, 0.01, 8, 120]} />
          <meshBasicMaterial color="#8a2a3a" transparent opacity={0.18} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.15, 0.008, 8, 120]} />
          <meshBasicMaterial color="#d6ad72" transparent opacity={0.11} />
        </mesh>
      </group>

      <group ref={groupRef}>
        {frames.map((frame, index) => {
          const angle = index * step;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const y = index % 2 === 0 ? 0.05 : -0.05;
          return (
            <group key={frame.title} position={[x, y, z]} rotation={[0, angle, 0]}>
              <mesh>
                <planeGeometry args={[2.28, 3.72]} />
                <meshBasicMaterial color="#1b1213" transparent opacity={0.54} />
              </mesh>
              <Html
                transform
                center
                distanceFactor={1.46}
                style={{ pointerEvents: "auto" }}
                zIndexRange={[20, 0]}
              >
                <article
                  className="story-cylinder-card"
                  onMouseEnter={() => onFocusFrame(index)}
                  onFocus={() => onFocusFrame(index)}
                >
                  <span className="story-cylinder-index">Chapter {String(index + 1).padStart(2, "0")}</span>
                  <span className="story-cylinder-placeholder">
                    <Camera size={18} strokeWidth={1.3} />
                    {frame.type}
                  </span>
                  <div>
                    <strong>{frame.title}</strong>
                    <p>{frame.caption}</p>
                  </div>
                </article>
              </Html>
            </group>
          );
        })}
      </group>
    </>
  );
}

function PhotoJournalCylinder({ frames }: { frames: PhotoFrame[] }) {
  const [rotation, setRotation] = useState(0);
  const dragRef = useRef({ active: false, startX: 0, startRotation: 0 });
  const step = (Math.PI * 2) / frames.length;

  const focusFrame = (index: number) => {
    setRotation(-index * step);
  };

  const shift = (direction: 1 | -1) => {
    setRotation((current) => current + direction * step);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startRotation: rotation,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = event.clientX - dragRef.current.startX;
    setRotation(dragRef.current.startRotation + delta * 0.006);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className="story-cylinder"
      data-story-reveal
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={(event) => setRotation((current) => current - event.deltaY * 0.0018)}
    >
      <Canvas
        camera={{ position: [0, 0.25, 8.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.6]}
      >
        <PhotoCylinderScene frames={frames} rotation={rotation} onFocusFrame={focusFrame} />
      </Canvas>
      <div className="story-cylinder-controls" aria-label="Photo journal cylinder controls">
        <button type="button" onClick={() => shift(1)} aria-label="Previous photo chapter">
          <ChevronLeft size={17} strokeWidth={1.6} />
        </button>
        <span>Drag / scroll / hover to focus</span>
        <button type="button" onClick={() => shift(-1)} aria-label="Next photo chapter">
          <ChevronRight size={17} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}

export function AboutExperience() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-story-reveal]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            delay: Math.min(index * 0.035, 0.14),
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          }
        );
      });

      const timeline = rootRef.current?.querySelector<HTMLElement>("[data-story-timeline]");
      const progressEl = timeline?.querySelector<HTMLElement>("[data-timeline-progress]");

      const syncTimelineSteps = () => {
        if (!timeline || !progressEl) return;

        const timelineTop = timeline.getBoundingClientRect().top;
        const barTip = timelineTop + progressEl.offsetHeight;

        timeline.querySelectorAll<HTMLElement>("[data-timeline-step]").forEach((step) => {
          const node = step.querySelector<HTMLElement>(".story-timeline-node");
          if (!node) return;

          const nodeRect = node.getBoundingClientRect();
          const nodeTouch = nodeRect.top + nodeRect.height * 0.42;
          step.classList.toggle("is-active", barTip >= nodeTouch);
        });
      };

      if (timeline && progressEl) {
        gsap.fromTo(
          progressEl,
          { height: 0 },
          {
            height: () => timeline.offsetHeight,
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top 74%",
              end: "bottom 48%",
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: syncTimelineSteps,
              onRefresh: syncTimelineSteps,
            },
          }
        );

        syncTimelineSteps();
      }

      gsap.utils.toArray<HTMLElement>("[data-story-float]").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -22 : 18,
          rotate: index % 2 === 0 ? -0.8 : 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: 1.2,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });

      gsap.to("[data-story-film]", {
        scale: 1.035,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-story-film]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} className="story-page">
      <style>{`
        .story-page {
          --story-bg: #050505;
          --story-panel: rgba(255,255,255,0.025);
          --story-panel-strong: rgba(255,255,255,0.045);
          --story-line: rgba(232,228,220,0.12);
          --story-muted: #a39c91;
          --story-faint: #625b52;
          --story-red: #8a2a3a;
          --story-red-strong: #a33f4d;
          --story-gold: #d6ad72;
          --story-cream: #e8e4dc;
          min-height: 100vh;
          color: var(--fg);
          background:
            radial-gradient(circle at 82% 18%, rgba(138,42,58,0.2), transparent 520px),
            radial-gradient(circle at 16% 36%, rgba(214,173,114,0.08), transparent 360px),
            linear-gradient(180deg, #050505 0%, #080606 45%, #050505 100%);
          overflow: hidden;
        }

        .story-page * {
          box-sizing: border-box;
        }

        .story-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.2;
          background-image: var(--grain);
        }

        .story-back {
          position: fixed;
          top: 22px;
          right: 24px;
          z-index: 80;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: 1px solid rgba(232,228,220,0.16);
          border-radius: 999px;
          background: rgba(7,7,7,0.58);
          color: var(--fg-dim);
          text-decoration: none;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          letter-spacing: 0;
          text-transform: uppercase;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease), transform 0.25s var(--ease);
        }

        .story-back:hover,
        .story-back:focus-visible {
          color: var(--fg);
          border-color: rgba(232,228,220,0.34);
          background: rgba(20,18,17,0.78);
          transform: translateY(-2px);
          outline: none;
        }

        .story-section {
          position: relative;
          z-index: 1;
          padding: 8rem 8vw;
          border-top: 1px solid rgba(232,228,220,0.07);
        }

        .story-hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-top: none;
          padding-top: 7rem;
        }

        .story-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .story-hero-title {
          max-width: 12ch;
          margin: 0;
          font-size: clamp(3rem, 6.8vw, 7.4rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          font-weight: 900;
          text-wrap: balance;
        }

        .story-hero-title-light {
          display: block;
          margin-top: 0.08em;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .story-section-title em {
          color: var(--fg-dim);
          font-style: normal;
          font-weight: 300;
        }

        .story-lead {
          max-width: 760px;
          margin-top: 2rem;
          color: var(--fg-dim);
          font-size: clamp(1.08rem, 1.35vw, 1.55rem);
          line-height: 1.58;
          font-weight: 300;
        }

        .story-origin-line {
          margin-top: 3rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.74rem;
          text-transform: uppercase;
        }

        .story-origin-line span {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          min-height: 2.4rem;
          padding: 0 0.85rem;
          border: 1px solid rgba(232,228,220,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
        }

        .story-section-head {
          max-width: 930px;
          margin-bottom: 4.5rem;
        }

        .story-section-title {
          margin: 1.45rem 0 0;
          font-size: clamp(3.4rem, 6.8vw, 7.5rem);
          line-height: 0.94;
          letter-spacing: 0;
          font-weight: 900;
        }

        .story-copy {
          color: var(--fg-dim);
          font-size: 1.08rem;
          line-height: 1.76;
          font-weight: 300;
        }

        .story-timeline-section {
          padding-bottom: 10rem;
        }

        .story-timeline {
          position: relative;
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
        }

        .story-timeline::before,
        .story-timeline-progress {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          transform: translateX(-50%);
        }

        .story-timeline::before {
          background: rgba(232,228,220,0.1);
        }

        .story-timeline-progress {
          z-index: 1;
          top: 0;
          bottom: auto;
          height: 0;
          transform: translateX(-50%);
          transform-origin: top center;
          background: linear-gradient(180deg, var(--story-red), var(--story-gold), rgba(232,228,220,0.42));
          box-shadow: 0 0 28px rgba(138,42,58,0.28);
        }

        .story-timeline-item {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 5.4rem minmax(0, 1fr);
          align-items: center;
          min-height: 20rem;
        }

        .story-timeline-item.is-left .story-timeline-card {
          grid-column: 1;
        }

        .story-timeline-item.is-right .story-timeline-card {
          grid-column: 3;
        }

        .story-timeline-node {
          grid-column: 2;
          justify-self: center;
          position: relative;
          width: 4.2rem;
          height: 4.2rem;
          border-radius: 50%;
          border: 1px solid rgba(232,228,220,0.24);
          display: grid;
          place-items: center;
          color: var(--story-cream);
          background: #090808;
          box-shadow: 0 0 0 0.85rem rgba(138,42,58,0.08), 0 18px 40px rgba(0,0,0,0.36);
          transition: transform 0.35s var(--ease), border-color 0.35s var(--ease), color 0.35s var(--ease), box-shadow 0.35s var(--ease), background 0.35s var(--ease);
          isolation: isolate;
        }

        .story-timeline-node::before {
          content: "";
          position: absolute;
          inset: -0.85rem;
          border-radius: inherit;
          background: radial-gradient(circle, rgba(214,173,114,0.22), rgba(138,42,58,0.08) 52%, transparent 72%);
          opacity: 0;
          transform: scale(0.72);
          transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
          z-index: -1;
        }

        .story-timeline-node svg {
          transition: transform 0.35s var(--ease), filter 0.35s var(--ease);
        }

        .story-timeline-item.is-active .story-timeline-node {
          transform: scale(1.08);
          color: #fff;
          border-color: rgba(214,173,114,0.62);
          background:
            radial-gradient(circle at 50% 50%, rgba(214,173,114,0.12), transparent 58%),
            #090808;
          box-shadow:
            0 0 0 1rem rgba(138,42,58,0.16),
            0 0 38px rgba(214,173,114,0.24),
            0 22px 48px rgba(0,0,0,0.42);
          transition-duration: 0.08s;
        }

        .story-timeline-item.is-active .story-timeline-node::before {
          opacity: 1;
          transform: scale(1);
          animation: storyNodePulse 1.8s ease-in-out infinite;
          transition-duration: 0.08s;
        }

        .story-timeline-item.is-active .story-timeline-node svg {
          transform: scale(1.08);
          filter: drop-shadow(0 0 12px rgba(214,173,114,0.34));
        }

        .story-timeline-item.is-active .story-timeline-card {
          border-color: rgba(214,173,114,0.28);
          background:
            linear-gradient(145deg, rgba(138,42,58,0.17), transparent 44%),
            rgba(255,255,255,0.034);
          transition-duration: 0.12s;
        }

        @keyframes storyNodePulse {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.62;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        .story-timeline-card {
          position: relative;
          padding: 1.7rem;
          border: 1px solid rgba(232,228,220,0.12);
          border-radius: 8px;
          background:
            linear-gradient(145deg, rgba(138,42,58,0.12), transparent 44%),
            var(--story-panel);
          box-shadow: 0 20px 65px rgba(0,0,0,0.28);
          transition: transform 0.28s var(--ease), border-color 0.28s var(--ease), background 0.28s var(--ease);
        }

        .story-timeline-image {
          position: relative;
          min-height: 13rem;
          margin: -0.35rem -0.35rem 1.45rem;
          border: 1px solid rgba(232,228,220,0.1);
          border-radius: 6px;
          overflow: hidden;
          background:
            radial-gradient(circle at 72% 28%, rgba(214,173,114,0.16), transparent 180px),
            radial-gradient(circle at 22% 78%, rgba(138,42,58,0.2), transparent 170px),
            linear-gradient(145deg, rgba(232,228,220,0.06), rgba(232,228,220,0.012));
        }

        .story-timeline-image::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(232,228,220,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,228,220,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at 50% 50%, black 20%, transparent 78%);
        }

        .story-timeline-image::after {
          content: "";
          position: absolute;
          inset: 0.85rem;
          border: 1px solid rgba(232,228,220,0.075);
          pointer-events: none;
        }

        .story-timeline-image span {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          gap: 0.55rem;
          color: rgba(232,228,220,0.26);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          text-align: center;
        }

        .story-timeline-card:hover {
          transform: translateY(-6px);
          border-color: rgba(214,173,114,0.36);
          background:
            linear-gradient(145deg, rgba(138,42,58,0.16), transparent 44%),
            rgba(255,255,255,0.034);
        }

        .story-place {
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .story-timeline-card h3 {
          margin: 1rem 0 0.8rem;
          font-size: clamp(1.8rem, 2.4vw, 2.75rem);
          line-height: 1.02;
          letter-spacing: 0;
        }

        .story-moment {
          margin-top: 1.2rem;
          color: var(--story-gold);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .story-moments-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-top: 1px solid rgba(232,228,220,0.1);
          border-left: 1px solid rgba(232,228,220,0.1);
        }

        .story-moment-card {
          min-height: 24rem;
          padding: 1.7rem;
          border-right: 1px solid rgba(232,228,220,0.1);
          border-bottom: 1px solid rgba(232,228,220,0.1);
          background: rgba(255,255,255,0.016);
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          justify-content: space-between;
          transition: transform 0.28s var(--ease), background 0.28s var(--ease), border-color 0.28s var(--ease);
        }

        .story-moment-card:hover {
          transform: translateY(-6px);
          background: rgba(138,42,58,0.085);
          border-color: rgba(138,42,58,0.32);
        }

        .story-moment-card h3 {
          margin: 0.9rem 0 1rem;
          font-size: 2rem;
          line-height: 1;
          letter-spacing: 0;
        }

        .story-moment-image {
          position: relative;
          min-height: 10.5rem;
          border: 1px solid rgba(232,228,220,0.1);
          border-radius: 6px;
          overflow: hidden;
          background:
            radial-gradient(circle at 76% 24%, rgba(214,173,114,0.14), transparent 150px),
            radial-gradient(circle at 18% 76%, rgba(138,42,58,0.2), transparent 150px),
            linear-gradient(145deg, rgba(232,228,220,0.055), rgba(232,228,220,0.012));
        }

        .story-moment-image::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(232,228,220,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,228,220,0.04) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 50% 50%, black 18%, transparent 76%);
        }

        .story-moment-image::after {
          content: "";
          position: absolute;
          inset: 0.75rem;
          border: 1px solid rgba(232,228,220,0.075);
          pointer-events: none;
        }

        .story-moment-image span {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          gap: 0.5rem;
          color: rgba(232,228,220,0.24);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          text-align: center;
          text-transform: uppercase;
        }

        .story-kicker {
          color: var(--fg);
          font-size: 1.1rem;
          line-height: 1.45;
          font-weight: 500;
        }

        .story-photo-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          gap: 4rem;
          align-items: start;
        }

        .story-cylinder {
          position: relative;
          min-height: min(72vh, 46rem);
          cursor: grab;
          user-select: none;
          touch-action: pan-y;
          perspective: 1200px;
        }

        .story-cylinder:active {
          cursor: grabbing;
        }

        .story-cylinder canvas {
          position: absolute;
          inset: 0;
        }

        .story-cylinder::before {
          content: "";
          position: absolute;
          inset: 8% 0 2%;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 42%, rgba(138,42,58,0.16), transparent 420px),
            linear-gradient(90deg, transparent, rgba(232,228,220,0.035), transparent);
          filter: blur(18px);
        }

        .story-cylinder-card {
          position: relative;
          width: 17.5rem;
          height: 30rem;
          padding: 1.15rem;
          border: 1px solid rgba(232,228,220,0.14);
          border-radius: 8px;
          overflow: hidden;
          background:
            radial-gradient(circle at 68% 18%, rgba(138,42,58,0.18), transparent 180px),
            linear-gradient(180deg, rgba(255,255,255,0.052), rgba(255,255,255,0.012)),
            rgba(13,11,11,0.86);
          box-shadow: 0 28px 80px rgba(0,0,0,0.32);
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.28s var(--ease), box-shadow 0.28s var(--ease), background 0.28s var(--ease);
        }

        .story-cylinder-card:hover,
        .story-cylinder-card:focus-within {
          border-color: rgba(214,173,114,0.38);
          box-shadow: 0 32px 95px rgba(0,0,0,0.42), 0 0 34px rgba(138,42,58,0.14);
        }

        .story-cylinder-card::before {
          content: "";
          position: absolute;
          inset: 1rem;
          border: 1px solid rgba(232,228,220,0.08);
          pointer-events: none;
        }

        .story-cylinder-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(232,228,220,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,228,220,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.5;
          mask-image: linear-gradient(180deg, black, transparent 78%);
          pointer-events: none;
        }

        .story-cylinder-placeholder {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          color: rgba(232,228,220,0.16);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .story-cylinder-index {
          position: relative;
          z-index: 1;
          color: var(--story-faint);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
        }

        .story-cylinder-card strong {
          position: relative;
          z-index: 1;
          font-size: 2.7rem;
          line-height: 0.98;
          letter-spacing: 0;
        }

        .story-cylinder-card p {
          position: relative;
          z-index: 1;
          margin: 1rem 0 0;
          color: var(--fg-dim);
          line-height: 1.55;
          font-weight: 300;
        }

        .story-cylinder-controls {
          position: absolute;
          left: 50%;
          bottom: 0.2rem;
          z-index: 10;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.55rem 0.65rem;
          border: 1px solid rgba(232,228,220,0.12);
          border-radius: 999px;
          background: rgba(5,5,5,0.72);
          color: var(--story-faint);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.64rem;
          text-transform: uppercase;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          white-space: nowrap;
        }

        .story-cylinder-controls button {
          width: 2rem;
          height: 2rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.13);
          background: rgba(255,255,255,0.025);
          color: var(--fg-dim);
          display: grid;
          place-items: center;
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease), transform 0.25s var(--ease);
        }

        .story-cylinder-controls button:hover,
        .story-cylinder-controls button:focus-visible {
          color: var(--fg);
          border-color: rgba(214,173,114,0.38);
          background: rgba(138,42,58,0.15);
          transform: translateY(-1px);
          outline: none;
        }

        .story-film {
          padding: 0;
          border-top: none;
        }

        .story-film-frame {
          min-height: 88vh;
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 42%, rgba(138,42,58,0.28), transparent 390px),
            linear-gradient(120deg, rgba(255,255,255,0.04), transparent 42%),
            #060505;
          border-top: 1px solid rgba(232,228,220,0.1);
          border-bottom: 1px solid rgba(232,228,220,0.1);
        }

        .story-film-frame::before {
          content: "";
          position: absolute;
          inset: 8vw;
          border: 1px solid rgba(232,228,220,0.1);
        }

        .story-film-title {
          position: relative;
          z-index: 1;
          max-width: 920px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
        }

        .story-play {
          width: 5.4rem;
          height: 5.4rem;
          border-radius: 50%;
          border: 1px solid rgba(232,228,220,0.26);
          background: rgba(255,255,255,0.04);
          display: grid;
          place-items: center;
          color: var(--fg);
          box-shadow: 0 24px 80px rgba(138,42,58,0.24);
        }

        .story-film-beats {
          position: absolute;
          left: 8vw;
          right: 8vw;
          bottom: 7vh;
          display: flex;
          justify-content: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .story-chip,
        .story-index {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .story-chip {
          border: 1px solid rgba(232,228,220,0.12);
          border-radius: 999px;
          padding: 0.55rem 0.75rem;
          color: var(--fg-faint);
          background: rgba(7,7,7,0.35);
        }

        .story-index {
          color: var(--story-faint);
        }

        .story-drive-grid {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .story-drive-card {
          min-height: 20rem;
          padding: 1.7rem;
          border: 1px solid rgba(232,228,220,0.11);
          border-radius: 8px;
          background: rgba(255,255,255,0.018);
          transition: transform 0.28s var(--ease), border-color 0.28s var(--ease), background 0.28s var(--ease);
        }

        .story-drive-card:hover {
          transform: translateY(-6px);
          border-color: rgba(214,173,114,0.28);
          background: rgba(255,255,255,0.032);
        }

        .story-drive-card h3 {
          margin: 0 0 1.4rem;
          font-size: 2.25rem;
          line-height: 1;
          letter-spacing: 0;
        }

        .story-final-links {
          margin-top: 4rem;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .story-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          min-height: 3rem;
          padding: 0 1.2rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.16);
          color: var(--fg);
          text-decoration: none;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          letter-spacing: 0;
          text-transform: uppercase;
          background: rgba(255,255,255,0.025);
          transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease);
        }

        .story-cta:hover,
        .story-cta:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(138,42,58,0.62);
          background: rgba(138,42,58,0.16);
          outline: none;
        }

        @media (max-width: 1180px) {
          .story-photo-layout,
          .story-drive-grid {
            grid-template-columns: 1fr;
          }

          .story-moments-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .story-section {
            padding: 6.5rem 6vw;
          }

          .story-hero {
            padding-top: 7rem;
          }

          .story-timeline::before,
          .story-timeline-progress {
            left: 2.1rem;
          }

          .story-timeline-item {
            grid-template-columns: 4.2rem 1fr;
            min-height: auto;
            padding: 1.2rem 0;
          }

          .story-timeline-item.is-left .story-timeline-card,
          .story-timeline-item.is-right .story-timeline-card {
            grid-column: 2;
          }

          .story-timeline-node {
            grid-column: 1;
            width: 3.2rem;
            height: 3.2rem;
          }
        }

        @media (max-width: 620px) {
          .story-back {
            top: 14px;
            right: 14px;
          }

          .story-moments-grid,
          .story-drive-grid {
            grid-template-columns: 1fr;
          }

          .story-cylinder {
            min-height: 34rem;
          }

          .story-cylinder-card {
            width: 15.5rem;
            height: 27rem;
          }

          .story-cylinder-card strong {
            font-size: 2.15rem;
          }

          .story-cylinder-controls span {
            display: none;
          }

          .story-film-frame {
            min-height: 78vh;
          }
        }
      `}</style>

      <div className="story-noise" aria-hidden />

      <Link href="/#identity" className="story-back" aria-label="Back to portfolio identity section">
        <ArrowLeft size={13} strokeWidth={1.7} />
        Back
      </Link>

      <section className="story-section story-hero" data-section="ABOUT">
        <div data-story-reveal>
          <h1 className="story-hero-title">
            A Peek Into
            <span className="story-hero-title-light">My World.</span>
          </h1>
          <p className="story-lead">{aboutHero.intro}</p>
          <div className="story-origin-line" aria-label="Origin and current place">
            <span>
              <MapPin size={13} strokeWidth={1.6} />
              Ouagadougou
            </span>
            <span>
              <Plane size={13} strokeWidth={1.6} />
              Ottawa
            </span>
            <span>
              <Compass size={13} strokeWidth={1.6} />
              Engineering with purpose
            </span>
          </div>
        </div>
      </section>

      <section className="story-section story-timeline-section">
        <div className="story-section-head" data-story-reveal>
          <span className="story-eyebrow">
            <Compass size={13} strokeWidth={1.6} />
            My story
          </span>
          <h2 className="story-section-title">
            A timeline
            <br />
            <em>with a pulse.</em>
          </h2>
          <p className="story-copy">
            The goal is not to list everything. It is to show the moments that explain the direction:
            service, technical curiosity, responsibility, a move across continents, and the decision to keep building.
          </p>
        </div>

        <div className="story-timeline" data-story-timeline>
          <span className="story-timeline-progress" data-timeline-progress aria-hidden />
          {journeyChapters.map((chapter, index) => {
            const Icon = timelineIcons[index % timelineIcons.length];
            return (
              <article
                className={`story-timeline-item ${index % 2 === 0 ? "is-left" : "is-right"}`}
                key={chapter.title}
                data-timeline-step
              >
                <div className="story-timeline-node" aria-hidden>
                  <Icon size={21} strokeWidth={1.45} />
                </div>
                <div className="story-timeline-card" data-story-reveal>
                  <div className="story-timeline-image" aria-label={`Image placeholder for ${chapter.title}`}>
                    <span>
                      <Camera size={18} strokeWidth={1.4} />
                      {chapter.image}
                    </span>
                  </div>
                  <span className="story-place">{chapter.place}</span>
                  <h3>{chapter.title}</h3>
                  <p className="story-copy">{chapter.body}</p>
                  <p className="story-moment">{chapter.moment}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="story-section">
        <div className="story-section-head" data-story-reveal>
          <span className="story-eyebrow">
            <HeartHandshake size={13} strokeWidth={1.6} />
            Things that shaped me
          </span>
          <h2 className="story-section-title">
            Not skills.
            <br />
            <em>Moments.</em>
          </h2>
          <p className="story-copy">
            These are the places where the portfolio becomes personal. They explain how I learned to care
            about useful tools, reliable work, team energy, and impact beyond myself.
          </p>
        </div>

        <div className="story-moments-grid">
          {formativeMoments.map((moment, index) => (
            <article className="story-moment-card" key={moment.title} data-story-reveal>
              <span className="story-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="story-moment-image" aria-label={`Image placeholder for ${moment.title}`}>
                <span>
                  <Camera size={17} strokeWidth={1.35} />
                  {moment.image}
                </span>
              </div>
              <div>
                <h3>{moment.title}</h3>
                <p className="story-kicker">{moment.kicker}</p>
              </div>
              <p className="story-copy">{moment.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section">
        <div className="story-photo-layout">
          <div data-story-reveal>
            <span className="story-eyebrow">
              <Camera size={13} strokeWidth={1.6} />
              Photo journal
            </span>
            <h2 className="story-section-title">
              Life around
              <br />
              <em>the work.</em>
            </h2>
            <p className="story-copy" style={{ marginTop: "1.7rem" }}>
              This area is built for real photos later. Not a gallery for decoration, but visual chapters:
              code, electronics, events, community work, Ottawa, travel, training, and ordinary moments.
            </p>
          </div>

          <PhotoJournalCylinder frames={photoJournal} />
        </div>
      </section>

      <section className="story-section story-film" aria-labelledby="personal-film-title">
        <div className="story-film-frame" data-story-film>
          <div className="story-film-title" data-story-reveal>
            <span className="story-eyebrow">Personal brand film</span>
            <div className="story-play" aria-hidden>
              <Play size={30} strokeWidth={1.4} fill="currentColor" />
            </div>
            <h2 id="personal-film-title" className="story-section-title">
              A future film
              <br />
              <em>about the person.</em>
            </h2>
            <p className="story-copy" style={{ maxWidth: 650 }}>
              One day, this should become motion: streets in Ottawa, memories of Burkina Faso,
              electronics on a table, late code, team work, volunteering, university life, and the quiet scenes
              that make ambition believable.
            </p>
          </div>

          <div className="story-film-beats" aria-label="Future film scenes">
            {filmBeats.map((beat) => (
              <span className="story-chip" key={beat}>{beat}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div data-story-reveal>
          <span className="story-eyebrow">
            <Code2 size={13} strokeWidth={1.6} />
            What drives me
          </span>
          <h2 className="story-section-title">
            The future
            <br />
            <em>I keep choosing.</em>
          </h2>
          <p className="story-copy" style={{ maxWidth: 780, marginTop: "1.7rem" }}>
            {aboutHero.closing}
          </p>
        </div>

        <div className="story-drive-grid">
          {driveStatements.map((statement) => (
            <article className="story-drive-card" key={statement.question} data-story-reveal>
              <h3>{statement.question}</h3>
              <p className="story-copy">{statement.answer}</p>
            </article>
          ))}
        </div>

        <div className="story-final-links" data-story-reveal>
          <a className="story-cta" href={`mailto:${site.email}`}>
            Start a conversation
            <ArrowUpRight size={13} strokeWidth={1.6} />
          </a>
          <Link className="story-cta" href="/#archive">
            Read the journal
            <ArrowUpRight size={13} strokeWidth={1.6} />
          </Link>
        </div>
      </section>
    </main>
  );
}
