"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Code2,
  Compass,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Plane,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent, useUI } from "@/lib/i18n/LocaleProvider";
import { ShinyText } from "@/components/ui/ShinyText";
import { FieldExperience } from "@/components/about/FieldExperience";

const timelineIcons = [
  MapPin,
  Sparkles,
  HeartHandshake,
  Users,
  Trophy,
  GraduationCap,
  Plane,
] as const;

type TimelinePathPoint = {
  x: number;
  y: number;
  side: "left" | "right";
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedCopy(text: string, highlights?: readonly string[]) {
  if (!highlights?.length) return text;

  const terms = [...highlights].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isHighlight = terms.some((term) => part.toLowerCase() === term.toLowerCase());
    if (!isHighlight) return <Fragment key={index}>{part}</Fragment>;

    return (
      <mark key={index} className="story-highlight">
        {part}
      </mark>
    );
  });
}

function buildSnakingTimelinePath(timeline: HTMLElement, steps: HTMLElement[]) {
  if (steps.length === 0) return "";

  const timelineRect = timeline.getBoundingClientRect();
  const points: TimelinePathPoint[] = steps.map((step) => {
    const node = step.querySelector<HTMLElement>(".story-timeline-node");
    if (!node) return null;

    const rect = node.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - timelineRect.left,
      y: rect.top + rect.height / 2 - timelineRect.top,
      side: step.classList.contains("is-left") ? "left" : "right",
    };
  }).filter((point): point is TimelinePathPoint => point !== null);

  if (points.length === 0) return "";

  const spread = Math.min(190, Math.max(96, timeline.offsetWidth * 0.13));
  const sideOffset = (side: "left" | "right") => (side === "left" ? -spread : spread);
  const first = points[0];
  let path = `M ${first.x} ${first.y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const deltaY = next.y - current.y;
    const cp1x = current.x + sideOffset(current.side) * 0.82;
    const cp1y = current.y + deltaY * 0.34;
    const cp2x = next.x + sideOffset(next.side) * 0.82;
    const cp2y = next.y - deltaY * 0.34;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}

type AboutSectionId = "about-me" | "experience";

const ABOUT_PAGE_SECTIONS: { id: AboutSectionId; labelKey: "aboutMe" | "experience" }[] = [
  { id: "about-me", labelKey: "aboutMe" },
  { id: "experience", labelKey: "experience" },
];

function AboutPageNav() {
  const ui = useUI();
  const [active, setActive] = useState<AboutSectionId>("about-me");

  useEffect(() => {
    const experience = document.getElementById("experience");
    if (!experience) return;

    const update = () => {
      const trigger = window.innerHeight * 0.44;
      setActive(experience.getBoundingClientRect().top <= trigger ? "experience" : "about-me");
    };

    update();

    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", update);
      return () => lenis.off("scroll", update);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollTo = (id: AboutSectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = window.__lenis;
    const offset = window.matchMedia("(max-width: 860px)").matches ? -64 : -96;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.05, offset });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }

    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="story-about-nav" aria-label="About page sections">
      {ABOUT_PAGE_SECTIONS.map(({ id, labelKey }) => (
        <button
          key={id}
          type="button"
          className={active === id ? "is-active" : undefined}
          aria-current={active === id ? "true" : undefined}
          onClick={() => scrollTo(id)}
        >
          {ui.about[labelKey]}
        </button>
      ))}
    </nav>
  );
}

function ExperienceDriveTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const updateHover = (clientX: number, clientY: number) => {
    const title = titleRef.current;
    if (!title) return;
    const rect = title.getBoundingClientRect();
    title.style.setProperty("--title-hover-x", `${clientX - rect.left}px`);
    title.style.setProperty("--title-hover-y", `${clientY - rect.top}px`);
  };

  const clearHover = () => {
    const title = titleRef.current;
    if (!title) return;
    title.style.setProperty("--title-hover-x", "-20rem");
    title.style.setProperty("--title-hover-y", "-20rem");
  };

  return (
    <h2
      ref={titleRef}
      className="story-section-title story-drive-title"
      onMouseMove={(event) => updateHover(event.clientX, event.clientY)}
      onMouseLeave={clearHover}
    >
      <span className="story-drive-title-stack">
        <span className="story-drive-title-base">
          The future
          <br />
          <em>I keep choosing.</em>
        </span>
        <span className="story-drive-title-accent" aria-hidden>
          The future
          <br />
          <em>I keep choosing.</em>
        </span>
      </span>
    </h2>
  );
}

function AboutBackButton() {
  const router = useRouter();
  const ui = useUI();

  return (
    <button
      type="button"
      className="story-back"
      aria-label={ui.about.backLabel}
      onClick={() => {
        try {
          sessionStorage.setItem("rs_scroll_target", "about-teaser");
        } catch {}
        router.push("/", { scroll: false });
      }}
    >
      <ArrowLeft size={13} strokeWidth={1.7} aria-hidden />
      <span className="story-back-text">{ui.back}</span>
    </button>
  );
}

export function AboutExperience() {
  const { about, site } = useContent();
  const { aboutHero, journeyChapters, driveStatements } = about;
  const ui = useUI();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    let removeTimelineResizeListener: (() => void) | undefined;

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
      const pathTrack = timeline?.querySelector<SVGPathElement>("[data-timeline-path-track]");
      const pathProgress = timeline?.querySelector<SVGPathElement>("[data-timeline-progress]");
      let pathLength = 0;

      const rebuildTimelinePath = () => {
        if (!timeline || !pathTrack || !pathProgress) return 0;

        const steps = Array.from(timeline.querySelectorAll<HTMLElement>("[data-timeline-step]"));
        const pathData = buildSnakingTimelinePath(timeline, steps);
        const svg = timeline.querySelector<SVGSVGElement>(".story-timeline-path");

        pathTrack.setAttribute("d", pathData);
        pathProgress.setAttribute("d", pathData);

        if (svg) {
          svg.setAttribute("viewBox", `0 0 ${Math.max(timeline.offsetWidth, 1)} ${Math.max(timeline.offsetHeight, 1)}`);
        }

        pathLength = pathProgress.getTotalLength();
        pathProgress.style.strokeDasharray = `${pathLength}`;
        pathProgress.style.strokeDashoffset = `${pathLength}`;
        if (pathTrack) {
          pathTrack.style.strokeDasharray = `0 ${pathLength}`;
          pathTrack.style.strokeDashoffset = "0";
        }
        return pathLength;
      };

      const updateTimelineProgress = () => {
        if (!timeline || !pathProgress || pathLength <= 0) return;

        const steps = Array.from(timeline.querySelectorAll<HTMLElement>("[data-timeline-step]"));
        if (steps.length === 0) return;

        const firstNode = steps[0].querySelector<HTMLElement>(".story-timeline-node");
        const lastNode = steps[steps.length - 1].querySelector<HTMLElement>(".story-timeline-node");
        if (!firstNode || !lastNode) return;

        const activationY = window.innerHeight * 0.56;
        const firstTouch = firstNode.getBoundingClientRect().top + firstNode.getBoundingClientRect().height * 0.42;
        const lastTouch = lastNode.getBoundingClientRect().top + lastNode.getBoundingClientRect().height * 0.42;
        const span = firstTouch - lastTouch;
        const progress =
          Math.abs(span) < 1 ? 0 : gsap.utils.clamp(0, 1, (firstTouch - activationY) / span);

        gsap.set(pathProgress, { strokeDashoffset: pathLength * (1 - progress) });

        if (pathTrack) {
          const drawn = pathLength * progress;
          pathTrack.style.strokeDasharray = `${drawn} ${Math.max(pathLength - drawn, 0.01)}`;
          pathTrack.style.strokeDashoffset = "0";
        }

        syncTimelineSteps();
      };

      const syncTimelineSteps = () => {
        if (!timeline || !pathProgress || pathLength <= 0) return;

        const timelineTop = timeline.getBoundingClientRect().top;
        const dashoffset = Number(gsap.getProperty(pathProgress, "strokeDashoffset") ?? pathLength);
        const progressLength = Math.max(0, Math.min(pathLength, pathLength - dashoffset));
        const tip = pathProgress.getPointAtLength(progressLength);
        const barTip = timelineTop + tip.y;

        timeline.querySelectorAll<HTMLElement>("[data-timeline-step]").forEach((step) => {
          const node = step.querySelector<HTMLElement>(".story-timeline-node");
          if (!node) return;

          const nodeRect = node.getBoundingClientRect();
          const nodeTouch = nodeRect.top + nodeRect.height * 0.42;
          step.classList.toggle("is-active", barTip >= nodeTouch);
        });
      };

      if (timeline && pathTrack && pathProgress) {
        rebuildTimelinePath();

        ScrollTrigger.create({
          trigger: timeline,
          start: "top bottom",
          end: "bottom top",
          invalidateOnRefresh: true,
          onUpdate: updateTimelineProgress,
          onRefresh: () => {
            rebuildTimelinePath();
            updateTimelineProgress();
          },
        });

        const handleResize = () => {
          rebuildTimelinePath();
          ScrollTrigger.refresh();
          updateTimelineProgress();
        };

        window.addEventListener("resize", handleResize);
        timeline.querySelectorAll("img").forEach((image) => {
          if (image.complete) return;
          image.addEventListener("load", handleResize, { once: true });
        });

        updateTimelineProgress();

        removeTimelineResizeListener = () => {
          window.removeEventListener("resize", handleResize);
        };
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

    }, rootRef);

    return () => {
      removeTimelineResizeListener?.();
      context.revert();
    };
  }, []);

  return (
    <>
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
          overflow-x: clip;
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
          z-index: 90;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: 1px solid rgba(232,228,220,0.16);
          border-radius: 999px;
          background: rgba(7,7,7,0.58);
          color: var(--fg-dim);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          letter-spacing: 0;
          text-transform: uppercase;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          cursor: pointer;
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

        .story-about-nav {
          position: fixed;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 90;
          display: inline-flex;
          align-items: center;
          gap: 0.12rem;
          padding: 0.18rem;
          border: 1px solid rgba(232,228,220,0.1);
          border-radius: 999px;
          background: rgba(7,7,7,0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 6px 22px rgba(0,0,0,0.22);
        }

        .story-about-nav button {
          border: none;
          background: transparent;
          color: rgba(232,228,220,0.46);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.56rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.38rem 0.72rem;
          border-radius: 999px;
          cursor: pointer;
          line-height: 1;
          white-space: nowrap;
          transition: color 0.22s var(--ease), background 0.22s var(--ease), box-shadow 0.22s var(--ease);
        }

        .story-about-nav button:hover,
        .story-about-nav button:focus-visible {
          color: rgba(232,228,220,0.82);
          outline: none;
        }

        .story-about-nav button.is-active {
          color: var(--fg);
          background: rgba(138,42,58,0.14);
          box-shadow: inset 0 0 0 1px rgba(138,42,58,0.28);
        }

        html.field-modal-open .story-about-nav {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .story-back-text {
          display: inline;
        }

        #about-me,
        #experience {
          scroll-margin-top: 5.5rem;
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

        .story-copy .story-highlight {
          color: rgba(232, 228, 220, 0.92);
          background: rgba(138, 42, 58, 0.14);
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          padding: 0.02em 0.1em;
          border-radius: 0.12rem;
          font-weight: 400;
        }

        .story-section-title-light {
          display: block;
          margin-top: 0.08em;
          font-weight: 300;
        }

        .story-shiny-title-bold {
          display: block;
          font-weight: 900;
        }

        .story-shiny-title-light {
          display: block;
          font-weight: 300;
        }

        .story-timeline-section .story-section-head .story-section-title {
          margin-top: 0;
          max-width: 14ch;
          text-wrap: balance;
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

        .story-timeline-path {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
          z-index: 1;
        }

        .story-timeline-path-track,
        .story-timeline-path-progress {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .story-timeline-path-track {
          stroke: rgba(232,228,220,0.1);
          stroke-width: 2;
        }

        .story-timeline-path-progress {
          stroke: url(#story-timeline-gradient);
          stroke-width: 2.5;
          filter: drop-shadow(0 0 16px rgba(138,42,58,0.34));
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
          overflow: hidden;
          background:
            linear-gradient(145deg, rgba(138,42,58,0.12), transparent 44%),
            var(--story-panel);
          box-shadow: 0 20px 65px rgba(0,0,0,0.28);
          transition: transform 0.28s var(--ease), border-color 0.28s var(--ease), background 0.28s var(--ease);
        }

        .story-timeline-image {
          position: relative;
          min-height: 18.5rem;
          margin: -1.7rem -1.7rem 1.35rem;
          border: none;
          border-radius: 0;
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
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: rgba(232,228,220,0.1);
          pointer-events: none;
        }

        .story-timeline-image.has-photo {
          background: #050505;
        }

        .story-timeline-image.has-photo::before {
          display: none;
        }

        .story-timeline-image.has-photo img {
          display: block;
          width: 100%;
          min-height: 18.5rem;
          height: 18.5rem;
          object-fit: contain;
          object-position: center;
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

        .story-experience-section {
          position: relative;
        }

        .story-drive-title {
          --title-hover-x: -20rem;
          --title-hover-y: -20rem;
          --title-hover-radius: clamp(3.2rem, 5.5vw, 5.2rem);
        }

        .story-drive-title-stack {
          position: relative;
          display: inline-block;
        }

        .story-drive-title-base {
          display: block;
        }

        .story-drive-title-base em {
          color: var(--fg-dim);
        }

        .story-drive-title-accent {
          position: absolute;
          inset: 0;
          display: block;
          color: var(--story-red-strong);
          pointer-events: none;
          mask-image: radial-gradient(
            circle var(--title-hover-radius) at var(--title-hover-x) var(--title-hover-y),
            #000 0%,
            #000 42%,
            transparent 74%
          );
          -webkit-mask-image: radial-gradient(
            circle var(--title-hover-radius) at var(--title-hover-x) var(--title-hover-y),
            #000 0%,
            #000 42%,
            transparent 74%
          );
        }

        .story-drive-title-accent em {
          color: var(--story-red-strong);
          font-style: normal;
          font-weight: 300;
        }

        @media (pointer: coarse) {
          .story-drive-title-accent {
            display: none;
          }
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
          .story-drive-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 860px) {
          .story-section {
            padding: calc(var(--safe-top) + 4.75rem) var(--section-pad-x) var(--section-pad-bottom);
            border-top: none;
          }

          .story-hero {
            min-height: auto;
            justify-content: flex-start;
            padding-top: calc(var(--safe-top) + 4.75rem);
            padding-bottom: 2.25rem;
          }

          .story-hero-title {
            max-width: none;
            font-size: clamp(2rem, 9vw, 2.65rem);
            line-height: 1.02;
            text-wrap: balance;
          }

          .story-lead {
            margin-top: 1.15rem;
            font-size: clamp(0.9rem, 3.9vw, 1.02rem);
            line-height: 1.55;
          }

          .story-origin-line {
            margin-top: 1.25rem;
            gap: 0.45rem;
          }

          .story-origin-line span {
            min-height: 2rem;
            padding: 0 0.65rem;
            font-size: 0.56rem;
          }

          .story-about-nav {
            top: auto;
            bottom: calc(0.55rem + var(--safe-bottom));
            left: 50%;
            right: auto;
            transform: translate3d(-50%, 0, 0);
            width: auto;
            max-width: calc(100% - 2.5rem);
            display: inline-flex;
            gap: 0.1rem;
            padding: 0.14rem;
            border-radius: 999px;
            border-color: rgba(232,228,220,0.08);
            background: rgba(7,7,7,0.72);
            box-shadow:
              0 4px 18px rgba(0, 0, 0, 0.32),
              inset 0 1px 0 rgba(255,255,255,0.04);
          }

          .story-about-nav button {
            min-height: 1.75rem;
            padding: 0.34rem 0.62rem;
            font-size: 0.48rem;
            letter-spacing: 0.11em;
          }

          .story-about-nav button.is-active {
            background: rgba(138,42,58,0.12);
            box-shadow: inset 0 0 0 1px rgba(138,42,58,0.24);
          }

          .story-page {
            overflow: visible;
            padding-bottom: calc(3.35rem + var(--safe-bottom));
          }

          .story-back {
            top: calc(14px + var(--safe-top));
            right: calc(14px + var(--safe-right));
            gap: 0;
            width: 2.125rem;
            height: 2.125rem;
            padding: 0;
            justify-content: center;
            border-radius: 999px;
          }

          .story-back-text {
            display: none;
          }

          #about-me,
          #experience {
            scroll-margin-top: calc(3.25rem + var(--safe-top));
            scroll-margin-bottom: calc(3.25rem + var(--safe-bottom));
          }

          .story-timeline-section {
            padding-top: 1.75rem;
            padding-bottom: 3rem;
          }

          .story-section-head {
            margin-bottom: 1.35rem;
          }

          .story-timeline-section .story-section-head .story-section-title {
            max-width: none;
            font-size: clamp(1.7rem, 7.2vw, 2.1rem);
            line-height: 1.08;
            letter-spacing: -0.02em;
            text-wrap: balance;
          }

          .story-section-title-light {
            margin-top: 0.1em;
          }

          .story-shiny-title-light {
            color: rgba(232, 228, 220, 0.62) !important;
          }

          .story-copy {
            font-size: 0.88rem;
            line-height: 1.58;
          }

          .story-timeline-section .story-section-head .story-copy {
            margin-top: 0.85rem;
          }

          .story-timeline-path {
            display: none;
          }

          .story-timeline {
            gap: var(--mobile-card-gap);
          }

          .story-timeline-item {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 0;
          }

          .story-timeline-node {
            display: none;
          }

          .story-timeline-item.is-left .story-timeline-card,
          .story-timeline-item.is-right .story-timeline-card {
            grid-column: 1;
          }

          .story-timeline-card {
            padding: 0.9rem;
            border-radius: 12px;
          }

          .story-timeline-card h3 {
            margin: 0.7rem 0 0.45rem;
            font-size: clamp(1.08rem, 4.6vw, 1.28rem);
            line-height: 1.15;
          }

          .story-timeline-card .story-copy {
            font-size: 0.82rem;
            line-height: 1.52;
          }

          .story-timeline-image,
          .story-timeline-image.has-photo img {
            min-height: 0;
            height: auto;
            aspect-ratio: 16 / 10;
          }

          .story-moment {
            margin-top: 0.65rem;
            font-size: 0.58rem;
          }

          .story-experience-section {
            padding-top: 2rem;
          }

          .story-eyebrow {
            font-size: 0.58rem;
            margin-bottom: 0.35rem;
          }

          .story-drive-title {
            font-size: clamp(1.7rem, 7.2vw, 2.1rem) !important;
            line-height: 1.08 !important;
            max-width: none;
            text-wrap: balance;
          }

          .story-experience-section > [data-story-reveal] > .story-copy {
            margin-top: 1rem !important;
            font-size: 0.88rem;
          }

          .story-final-links {
            margin-top: 2.5rem;
          }

          .story-cta {
            min-height: var(--touch-min);
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 620px) {
          .story-drive-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--mobile-dense-gap);
            margin-top: 2.5rem;
          }

          .story-drive-card {
            min-height: auto;
            padding: 1rem 0.9rem 1.1rem;
          }

          .story-drive-card h3 {
            font-size: clamp(1.15rem, 5vw, 1.45rem);
            margin-bottom: 0.75rem;
          }

          .story-drive-card p {
            font-size: 0.82rem;
            line-height: 1.55;
          }
        }

        @media (max-width: 360px) {
          .story-drive-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .story-section {
            padding-top: calc(var(--safe-top) + 4.35rem);
          }

          .story-hero-title {
            font-size: clamp(1.85rem, 8.5vw, 2.35rem);
          }

          .story-timeline-section .story-section-head .story-section-title {
            font-size: clamp(1.55rem, 6.8vw, 1.9rem);
          }

          .story-origin-line span {
            flex: 1 1 calc(50% - 0.25rem);
            justify-content: center;
          }
        }
      `}</style>

      <div className="story-noise" aria-hidden />

      <AboutBackButton />

      <AboutPageNav />

      <main ref={rootRef} className="story-page">
        <section id="about-me" className="story-section story-hero" data-section="ABOUT">
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
          <h2 className="story-section-title">
            <ShinyText
              text="What shaped"
              className="story-shiny-title-bold"
              color="rgba(232, 228, 220, 0.88)"
              shineColor="#ffffff"
              speed={4.2}
              spread={120}
            />
            <span className="story-section-title-light">
              <ShinyText
                text="the way I see"
                className="story-shiny-title-light"
                color="#625b52"
                shineColor="rgba(232, 228, 220, 0.92)"
                speed={4.8}
                spread={120}
                delay={0.35}
              />
              <ShinyText
                text="the world."
                className="story-shiny-title-light"
                color="#625b52"
                shineColor="rgba(232, 228, 220, 0.92)"
                speed={4.8}
                spread={120}
                delay={0.7}
              />
            </span>
          </h2>
          <p className="story-copy">
            Not every memory matters equally. Some experiences quietly change the way you think, the way you learn,
            and the standards you set for yourself. These are the moments that continue to influence who I am today.
          </p>
        </div>

        <div className="story-timeline" data-story-timeline>
          <svg className="story-timeline-path" aria-hidden preserveAspectRatio="none">
            <defs>
              <linearGradient id="story-timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--story-red)" />
                <stop offset="58%" stopColor="var(--story-gold)" />
                <stop offset="100%" stopColor="rgba(232,228,220,0.42)" />
              </linearGradient>
            </defs>
            <path className="story-timeline-path-track" data-timeline-path-track />
            <path className="story-timeline-path-progress" data-timeline-progress />
          </svg>
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
                  <div
                    className={`story-timeline-image${chapter.imageSrc ? " has-photo" : ""}`}
                    aria-label={
                      chapter.imageSrc
                        ? chapter.imageAlt ?? chapter.title
                        : `Image placeholder for ${chapter.title}`
                    }
                  >
                    {chapter.imageSrc ? (
                      <img src={chapter.imageSrc} alt={chapter.imageAlt ?? chapter.title} draggable={false} />
                    ) : (
                      <span>
                        <Camera size={18} strokeWidth={1.4} />
                        {chapter.image}
                      </span>
                    )}
                  </div>
                  {chapter.place ? <span className="story-place">{chapter.place}</span> : null}
                  <h3>{chapter.title}</h3>
                  <p className="story-copy">{renderHighlightedCopy(chapter.body, chapter.highlights)}</p>
                  {chapter.moment ? <p className="story-moment">{chapter.moment}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="story-section story-experience-section">
        <div data-story-reveal>
          <span className="story-eyebrow">
            <Code2 size={13} strokeWidth={1.6} />
            What drives me
          </span>
          <ExperienceDriveTitle />
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

        <FieldExperience />

        <div className="story-final-links" data-story-reveal>
          <a className="story-cta" href={`mailto:${site.email}`}>
            Start a conversation
            <ArrowUpRight size={13} strokeWidth={1.6} />
          </a>
        </div>
      </section>
      </main>
    </>
  );
}
