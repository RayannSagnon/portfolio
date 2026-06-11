"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  CircleDot,
  Gauge,
  MapPin,
  Play,
  Route,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  aboutHero,
  aboutHighlights,
  capabilityGauges,
  driveStatements,
  filmBeats,
  impactMetrics,
  leadershipMoments,
  lifeFrames,
  storyChapters,
  values,
} from "@/content/about";
import { site } from "@/content/site";

const gaugeColors = ["#a33f4d", "#d6ad72", "#7cae94", "#7e95d8", "#b9875f", "#c1707b"];
const leadershipScores = [86, 82, 76, 90, 80];

export function AboutExperience() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-about-reveal]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, filter: "blur(16px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            delay: Math.min(index * 0.035, 0.16),
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          }
        );
      });

      gsap.fromTo(
        "[data-about-timeline-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-about-timeline]",
            start: "top 72%",
            end: "bottom 48%",
            scrub: 1,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-about-bar]").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 88%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-about-float]").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -26 : 24,
          rotate: index % 2 === 0 ? -1.2 : 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: 1.2,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });

      gsap.to("[data-about-film]", {
        scale: 1.035,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-about-film]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} className="about-experience">
      <style>{`
        .about-experience {
          --about-bg: #050505;
          --about-panel: #0d0b0b;
          --about-panel-soft: rgba(255,255,255,0.028);
          --about-line: rgba(232,228,220,0.12);
          --about-muted: #8f887d;
          --about-faint: #5c554d;
          --about-red: #8a2a3a;
          --about-red-strong: #a33f4d;
          --about-red-soft: rgba(138,42,58,0.18);
          --about-gold: #d6ad72;
          --about-sage: #7cae94;
          --about-blue: #7e95d8;
          min-height: 100vh;
          color: var(--fg);
          background:
            radial-gradient(circle at 78% 12%, rgba(138,42,58,0.18), transparent 460px),
            radial-gradient(circle at 16% 44%, rgba(232,228,220,0.055), transparent 360px),
            linear-gradient(180deg, #050505 0%, #080606 48%, #050505 100%);
          overflow: hidden;
        }

        .about-experience * {
          box-sizing: border-box;
        }

        .about-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.22;
          background-image: var(--grain);
        }

        .about-back {
          position: fixed;
          top: 22px;
          right: 24px;
          z-index: 80;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: 1px solid rgba(232,228,220,0.14);
          border-radius: 999px;
          background: rgba(7,7,7,0.52);
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

        .about-back:hover,
        .about-back:focus-visible {
          color: var(--fg);
          border-color: rgba(232,228,220,0.34);
          background: rgba(20,18,17,0.78);
          transform: translateY(-2px);
          outline: none;
        }

        .about-section {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          padding: 8rem 8vw;
          border-top: 1px solid rgba(232,228,220,0.07);
        }

        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--about-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .about-hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(0, 0.76fr) minmax(320px, 0.46fr);
          gap: 5rem;
          align-items: center;
          padding-top: 6rem;
        }

        .about-hero-title {
          margin: 2rem 0 0;
          font-size: 8rem;
          line-height: 0.9;
          letter-spacing: 0;
          font-weight: 900;
        }

        .about-hero-title em {
          display: block;
          color: var(--fg-dim);
          font-style: normal;
          font-weight: 300;
        }

        .about-lead {
          max-width: 680px;
          color: var(--fg-dim);
          font-size: 1.55rem;
          line-height: 1.42;
          font-weight: 300;
        }

        .about-dashboard {
          border: 1px solid var(--about-line);
          background:
            linear-gradient(145deg, rgba(138,42,58,0.13), transparent 38%),
            rgba(255,255,255,0.025);
          padding: 1.35rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 1.05rem;
          box-shadow: 0 24px 70px rgba(0,0,0,0.32);
        }

        .about-dashboard-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .about-dashboard-title {
          margin: 0.55rem 0 0;
          font-size: 1.72rem;
          line-height: 1;
          letter-spacing: 0;
        }

        .about-dashboard-orbit {
          position: relative;
          width: 4.8rem;
          height: 4.8rem;
          border-radius: 50%;
          border: 1px solid rgba(232,228,220,0.14);
          display: grid;
          place-items: center;
          background: radial-gradient(circle, rgba(138,42,58,0.3), transparent 58%);
        }

        .about-dashboard-orbit::before,
        .about-dashboard-orbit::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(232,228,220,0.08);
        }

        .about-dashboard-orbit::before {
          inset: 0.65rem;
        }

        .about-dashboard-orbit::after {
          inset: -0.8rem;
        }

        .about-route-card {
          display: grid;
          gap: 0.9rem;
          padding: 1rem;
          border: 1px solid rgba(232,228,220,0.1);
          background: rgba(0,0,0,0.18);
        }

        .about-route-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0.8rem;
          align-items: center;
          color: var(--fg-dim);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.76rem;
          text-transform: uppercase;
        }

        .about-route-line {
          width: 4rem;
          height: 1px;
          background: linear-gradient(90deg, var(--about-red), var(--about-gold));
          position: relative;
        }

        .about-route-line::after {
          content: "";
          position: absolute;
          right: -3px;
          top: -3px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--about-gold);
          box-shadow: 0 0 18px rgba(214,173,114,0.55);
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .about-stat {
          min-height: 6.9rem;
          border: 1px solid rgba(232,228,220,0.09);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(255,255,255,0.018);
        }

        .about-stat strong {
          font-size: 2.35rem;
          line-height: 0.94;
          letter-spacing: 0;
        }

        .about-stat span {
          color: var(--about-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          line-height: 1.45;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .about-meter-list {
          display: grid;
          gap: 0.78rem;
        }

        .about-dashboard .about-copy {
          font-size: 1rem;
          line-height: 1.55;
        }

        .about-meter-row {
          display: grid;
          gap: 0.45rem;
        }

        .about-meter-label {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          color: var(--fg-dim);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
        }

        .about-meter-label strong {
          color: var(--fg);
          font-size: 0.78rem;
        }

        .about-meter {
          height: 0.42rem;
          overflow: hidden;
          background: rgba(232,228,220,0.08);
          border-radius: 999px;
        }

        .about-meter-fill {
          display: block;
          width: var(--bar-width);
          height: 100%;
          border-radius: inherit;
          transform-origin: left center;
          background: linear-gradient(90deg, var(--about-red-strong), var(--about-gold));
          box-shadow: 0 0 24px rgba(138,42,58,0.3);
        }

        .about-section-head {
          max-width: 880px;
          margin-bottom: 4rem;
        }

        .about-section-title {
          margin: 1.4rem 0 0;
          font-size: 6.8rem;
          line-height: 0.94;
          letter-spacing: 0;
          font-weight: 900;
        }

        .about-section-title em {
          color: var(--fg-dim);
          font-style: normal;
          font-weight: 300;
        }

        .about-copy {
          color: var(--fg-dim);
          font-size: 1.08rem;
          line-height: 1.75;
          font-weight: 300;
        }

        .about-timeline-section {
          padding-bottom: 10rem;
        }

        .about-timeline {
          position: relative;
          display: grid;
          gap: 2.4rem;
          max-width: 1180px;
          margin: 0 auto;
          padding: 1rem 0;
        }

        .about-timeline::before,
        .about-timeline-progress {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          transform: translateX(-50%);
        }

        .about-timeline::before {
          background: rgba(232,228,220,0.1);
        }

        .about-timeline-progress {
          z-index: 1;
          transform: translateX(-50%) scaleY(0);
          transform-origin: top center;
          background: linear-gradient(180deg, var(--about-red), var(--about-gold), var(--about-sage));
          box-shadow: 0 0 28px rgba(138,42,58,0.24);
        }

        .about-timeline-item {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 5rem minmax(0, 1fr);
          align-items: center;
          min-height: 17rem;
        }

        .about-timeline-item.is-left .about-timeline-card {
          grid-column: 1;
        }

        .about-timeline-item.is-right .about-timeline-card {
          grid-column: 3;
        }

        .about-timeline-dot {
          grid-column: 2;
          justify-self: center;
          width: 4.2rem;
          height: 4.2rem;
          border-radius: 50%;
          border: 1px solid rgba(232,228,220,0.22);
          display: grid;
          place-items: center;
          color: var(--fg);
          background: #090808;
          box-shadow: 0 0 0 0.85rem rgba(138,42,58,0.08), 0 18px 40px rgba(0,0,0,0.36);
        }

        .about-timeline-year {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          color: var(--about-gold);
        }

        .about-timeline-card {
          position: relative;
          padding: 1.65rem;
          border: 1px solid rgba(232,228,220,0.12);
          background:
            linear-gradient(145deg, rgba(138,42,58,0.12), transparent 42%),
            rgba(255,255,255,0.02);
          border-radius: 8px;
          box-shadow: 0 18px 55px rgba(0,0,0,0.28);
          transition: transform 0.28s var(--ease), border-color 0.28s var(--ease), background 0.28s var(--ease);
        }

        .about-timeline-card:hover {
          transform: translateY(-6px);
          border-color: rgba(214,173,114,0.35);
          background:
            linear-gradient(145deg, rgba(138,42,58,0.16), transparent 42%),
            rgba(255,255,255,0.03);
        }

        .about-timeline-card h3 {
          margin: 1rem 0 0.9rem;
          font-size: 2.25rem;
          line-height: 1.02;
          letter-spacing: 0;
        }

        .about-story-meta {
          color: var(--about-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .about-card-metric {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.2rem;
          color: var(--fg-dim);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .about-infographic-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.52fr);
          gap: 2rem;
          align-items: start;
        }

        .about-gauge-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .about-gauge-card {
          min-height: 18rem;
          border: 1px solid rgba(232,228,220,0.12);
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          padding: 1.3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.28s var(--ease), border-color 0.28s var(--ease), background 0.28s var(--ease);
        }

        .about-gauge-card:hover {
          transform: translateY(-6px);
          border-color: rgba(232,228,220,0.24);
          background: rgba(255,255,255,0.032);
        }

        .about-gauge-ring {
          width: 7.4rem;
          height: 7.4rem;
          border-radius: 50%;
          padding: 0.55rem;
          background: conic-gradient(var(--gauge-color) var(--gauge), rgba(232,228,220,0.08) 0);
          box-shadow: 0 20px 50px rgba(0,0,0,0.24);
        }

        .about-gauge-core {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #080707;
          display: grid;
          place-items: center;
          border: 1px solid rgba(232,228,220,0.08);
          font-size: 1.7rem;
          font-weight: 800;
        }

        .about-gauge-card h3 {
          margin: 1.1rem 0 0.65rem;
          font-size: 1.75rem;
          line-height: 1;
          letter-spacing: 0;
        }

        .about-impact-panel {
          position: sticky;
          top: 7rem;
          border: 1px solid rgba(232,228,220,0.12);
          background:
            radial-gradient(circle at 90% 0%, rgba(214,173,114,0.13), transparent 220px),
            rgba(255,255,255,0.022);
          border-radius: 8px;
          padding: 1.4rem;
        }

        .about-impact-chart {
          height: 14rem;
          margin: 1.2rem 0;
          border: 1px solid rgba(232,228,220,0.08);
          background:
            linear-gradient(rgba(232,228,220,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,228,220,0.045) 1px, transparent 1px);
          background-size: 100% 25%, 25% 100%;
          display: flex;
          align-items: end;
          gap: 0.65rem;
          padding: 1rem;
        }

        .about-impact-column {
          flex: 1;
          min-width: 0;
          height: 100%;
          display: flex;
          align-items: end;
          justify-content: center;
        }

        .about-impact-bar {
          display: block;
          width: 100%;
          max-width: 2.2rem;
          height: var(--impact-height);
          border-radius: 999px 999px 0 0;
          background: linear-gradient(180deg, var(--about-gold), var(--about-red-strong));
          transform-origin: bottom center;
          box-shadow: 0 0 24px rgba(138,42,58,0.28);
        }

        .about-values-grid {
          margin-top: 1.6rem;
          display: grid;
          gap: 0.85rem;
        }

        .about-value-strip {
          padding: 1rem;
          border: 1px solid rgba(232,228,220,0.1);
          background: rgba(0,0,0,0.16);
          display: grid;
          grid-template-columns: 8rem 1fr;
          gap: 1rem;
          align-items: baseline;
        }

        .about-value-strip h3 {
          margin: 0;
          font-size: 1.1rem;
          letter-spacing: 0;
        }

        .about-life-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          gap: 4rem;
          align-items: center;
        }

        .about-photo-rail {
          display: grid;
          grid-template-columns: repeat(6, minmax(250px, 1fr));
          gap: 1rem;
          overflow-x: auto;
          padding: 0.6rem 2px 1.5rem;
          scrollbar-width: thin;
        }

        .about-photo-frame {
          min-height: 27rem;
          border: 1px solid rgba(232,228,220,0.12);
          background:
            linear-gradient(145deg, rgba(138,42,58,0.16), transparent 42%),
            linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          position: relative;
          overflow: hidden;
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 8px;
        }

        .about-photo-frame::before {
          content: "";
          position: absolute;
          inset: 1rem;
          border: 1px solid rgba(232,228,220,0.08);
        }

        .about-photo-frame strong {
          position: relative;
          z-index: 1;
          font-size: 3rem;
          line-height: 0.95;
          letter-spacing: 0;
        }

        .about-photo-frame p {
          position: relative;
          z-index: 1;
          color: var(--fg-dim);
          line-height: 1.55;
          font-weight: 300;
        }

        .about-photo-mark {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          color: rgba(232,228,220,0.16);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .about-leadership-grid {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: repeat(5, minmax(230px, 1fr));
          gap: 0.9rem;
          overflow-x: auto;
          padding-bottom: 1rem;
        }

        .about-leadership-card {
          min-height: 23rem;
          padding: 1.5rem;
          border: 1px solid rgba(232,228,220,0.1);
          background: rgba(255,255,255,0.018);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.28s var(--ease), border-color 0.28s var(--ease), background 0.28s var(--ease);
        }

        .about-leadership-card:hover {
          transform: translateY(-6px);
          border-color: rgba(138,42,58,0.42);
          background: rgba(138,42,58,0.09);
        }

        .about-leadership-card h3 {
          font-size: 1.7rem;
          line-height: 1;
          letter-spacing: 0;
        }

        .about-leadership-score {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          color: var(--fg-dim);
          text-transform: uppercase;
        }

        .about-film {
          padding: 0;
          min-height: auto;
          border-top: none;
        }

        .about-film-frame {
          min-height: 86vh;
          margin: 0;
          border-top: 1px solid rgba(232,228,220,0.1);
          border-bottom: 1px solid rgba(232,228,220,0.1);
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 42%, rgba(138,42,58,0.26), transparent 380px),
            linear-gradient(120deg, rgba(255,255,255,0.04), transparent 42%),
            #060505;
        }

        .about-film-title {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.6rem;
          padding: 2rem;
        }

        .about-play {
          width: 5.4rem;
          height: 5.4rem;
          border-radius: 50%;
          border: 1px solid rgba(232,228,220,0.26);
          background: rgba(255,255,255,0.035);
          display: grid;
          place-items: center;
          color: var(--fg);
          box-shadow: 0 24px 80px rgba(138,42,58,0.24);
        }

        .about-film-beats {
          position: absolute;
          left: 8vw;
          right: 8vw;
          bottom: 7vh;
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .about-chip,
        .about-index {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.68rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .about-chip {
          border: 1px solid rgba(232,228,220,0.12);
          border-radius: 999px;
          padding: 0.55rem 0.75rem;
          color: var(--fg-faint);
          background: rgba(7,7,7,0.35);
        }

        .about-index {
          color: var(--about-faint);
        }

        .about-drive-grid {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .about-drive-card {
          min-height: 20rem;
          padding: 1.6rem;
          border: 1px solid rgba(232,228,220,0.11);
          background: rgba(255,255,255,0.018);
          border-radius: 8px;
        }

        .about-drive-card h3 {
          font-size: 2.2rem;
          line-height: 1;
          letter-spacing: 0;
          margin-bottom: 1.4rem;
        }

        .about-final-links {
          margin-top: 4rem;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .about-cta {
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

        .about-cta:hover,
        .about-cta:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(138,42,58,0.62);
          background: rgba(138,42,58,0.16);
          outline: none;
        }

        @media (max-width: 1180px) {
          .about-hero,
          .about-infographic-grid,
          .about-life-layout,
          .about-drive-grid {
            grid-template-columns: 1fr;
          }

          .about-impact-panel {
            position: relative;
            top: auto;
          }

          .about-hero-title {
            font-size: 6.2rem;
          }

          .about-section-title {
            font-size: 5.2rem;
          }
        }

        @media (max-width: 860px) {
          .about-section {
            padding: 6.5rem 6vw;
          }

          .about-hero {
            gap: 3rem;
            padding-top: 7rem;
          }

          .about-hero-title {
            font-size: 4.6rem;
          }

          .about-section-title {
            font-size: 3.8rem;
          }

          .about-lead {
            font-size: 1.25rem;
          }

          .about-gauge-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .about-timeline::before,
          .about-timeline-progress {
            left: 2.1rem;
          }

          .about-timeline-item {
            grid-template-columns: 4.2rem 1fr;
            min-height: auto;
          }

          .about-timeline-item.is-left .about-timeline-card,
          .about-timeline-item.is-right .about-timeline-card {
            grid-column: 2;
          }

          .about-timeline-dot {
            grid-column: 1;
            width: 3.2rem;
            height: 3.2rem;
          }

          .about-value-strip {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 620px) {
          .about-back {
            top: 14px;
            right: 14px;
          }

          .about-hero-title {
            font-size: 3.4rem;
          }

          .about-section-title {
            font-size: 3.1rem;
          }

          .about-stats,
          .about-gauge-grid {
            grid-template-columns: 1fr;
          }

          .about-route-row {
            grid-template-columns: 1fr;
          }

          .about-route-line {
            width: 100%;
          }

          .about-photo-frame {
            min-height: 23rem;
          }

          .about-photo-frame strong {
            font-size: 2.35rem;
          }

          .about-film-frame {
            min-height: 78vh;
          }
        }
      `}</style>

      <div className="about-noise" aria-hidden />

      <Link href="/#identity" className="about-back" aria-label="Back to portfolio identity section">
        <ArrowLeft size={13} strokeWidth={1.7} />
        Back
      </Link>

      <section className="about-section about-hero" data-section="ABOUT">
        <div data-about-reveal>
          <span className="about-eyebrow">
            <Sparkles size={13} strokeWidth={1.5} />
            {aboutHero.eyebrow}
          </span>
          <h1 className="about-hero-title">
            Beyond
            <em>the Resume</em>
          </h1>
        </div>

        <aside className="about-dashboard" data-about-reveal data-about-float aria-label="Personal dashboard">
          <div className="about-dashboard-top">
            <div>
              <span className="about-eyebrow">
                <Gauge size={13} strokeWidth={1.6} />
                Personal overview
              </span>
              <h2 className="about-dashboard-title">What shapes the work.</h2>
            </div>
            <div className="about-dashboard-orbit" aria-hidden>
              <Zap size={24} strokeWidth={1.45} />
            </div>
          </div>

          <p className="about-copy">{aboutHero.intro}</p>

          <div className="about-route-card">
            <span className="about-eyebrow">
              <MapPin size={13} strokeWidth={1.6} />
              Origin vector
            </span>
            <div className="about-route-row">
              <span>Burkina Faso</span>
              <span className="about-route-line" aria-hidden />
              <span>Ottawa, Canada</span>
            </div>
          </div>

          <div className="about-stats" aria-label="Personal highlights">
            {aboutHighlights.map((highlight) => (
              <div className="about-stat" key={highlight.label}>
                <strong>{highlight.value}</strong>
                <span>{highlight.label}</span>
              </div>
            ))}
          </div>

          <div className="about-meter-list" aria-label="Impact metrics">
            {impactMetrics.map((metric) => (
              <div className="about-meter-row" key={metric.label}>
                <div className="about-meter-label">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
                <div className="about-meter" aria-hidden>
                  <span
                    className="about-meter-fill"
                    data-about-bar
                    style={{ "--bar-width": `${metric.level}%` } as CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="about-section about-timeline-section">
        <div className="about-section-head" data-about-reveal>
          <span className="about-eyebrow">
            <Route size={13} strokeWidth={1.6} />
            01 / My story as a timeline
          </span>
          <h2 className="about-section-title">
            Origin,
            <br />
            <em>motion,</em>
            <br />
            direction.
          </h2>
          <p className="about-copy">{aboutHero.subtitle}</p>
        </div>

        <div className="about-timeline" data-about-timeline>
          <span className="about-timeline-progress" data-about-timeline-progress aria-hidden />
          {storyChapters.map((chapter, index) => (
            <article
              className={`about-timeline-item ${index % 2 === 0 ? "is-left" : "is-right"}`}
              key={chapter.title}
              data-about-reveal
            >
              <div className="about-timeline-dot">
                <span className="about-timeline-year">{chapter.year}</span>
              </div>
              <div className="about-timeline-card">
                <span className="about-story-meta">
                  {chapter.label} / {chapter.place}
                </span>
                <h3>{chapter.title}</h3>
                <p className="about-copy">{chapter.body}</p>
                <div className="about-card-metric">
                  <span>{chapter.metric}</span>
                  <span>{chapter.progress}%</span>
                </div>
                <div className="about-meter" aria-hidden>
                  <span
                    className="about-meter-fill"
                    data-about-bar
                    style={{ "--bar-width": `${chapter.progress}%` } as CSSProperties}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-head" data-about-reveal>
          <span className="about-eyebrow">
            <CircleDot size={13} strokeWidth={1.6} />
            02 / Values and principles
          </span>
          <h2 className="about-section-title">
            What stays
            <br />
            <em>constant.</em>
          </h2>
        </div>

        <div className="about-infographic-grid">
          <div className="about-gauge-grid" aria-label="Personal values as gauges">
            {capabilityGauges.map((gauge, index) => (
              <article className="about-gauge-card" key={gauge.name} data-about-reveal>
                <div
                  className="about-gauge-ring"
                  style={
                    {
                      "--gauge": `${gauge.score}%`,
                      "--gauge-color": gaugeColors[index % gaugeColors.length],
                    } as CSSProperties
                  }
                  aria-hidden
                >
                  <div className="about-gauge-core">{gauge.score}</div>
                </div>
                <div>
                  <h3>{gauge.name}</h3>
                  <p className="about-copy">{gauge.caption}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="about-impact-panel" data-about-reveal>
            <span className="about-eyebrow">
              <Gauge size={13} strokeWidth={1.6} />
              Principle matrix
            </span>
            <div className="about-impact-chart" aria-hidden>
              {impactMetrics.map((metric) => (
                <div className="about-impact-column" key={metric.label}>
                  <span
                    className="about-impact-bar"
                    style={{ "--impact-height": `${metric.level}%` } as CSSProperties}
                  />
                </div>
              ))}
            </div>
            <div className="about-values-grid">
              {values.slice(0, 4).map((value, index) => (
                <div className="about-value-strip" key={value.name}>
                  <span className="about-index">{String(index + 1).padStart(2, "0")} / {value.name}</span>
                  <div>
                    <h3>{value.principle}</h3>
                    <p className="about-copy">{value.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="about-section">
        <div data-about-reveal>
          <span className="about-eyebrow">
            <Users size={13} strokeWidth={1.6} />
            03 / Community and leadership
          </span>
          <h2 className="about-section-title">
            Leadership
            <br />
            <em>as service.</em>
          </h2>
        </div>

        <div className="about-leadership-grid">
          {leadershipMoments.map((moment, index) => (
            <article className="about-leadership-card" key={moment.title} data-about-reveal>
              <div className="about-leadership-score">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{leadershipScores[index] ?? 80}% impact</span>
              </div>
              <div>
                <h3>{moment.title}</h3>
                <p className="about-copy" style={{ marginTop: "1rem" }}>{moment.impact}</p>
              </div>
              <div>
                <p className="about-copy" style={{ color: "var(--fg)" }}>{moment.lesson}</p>
                <div className="about-meter" aria-hidden>
                  <span
                    className="about-meter-fill"
                    data-about-bar
                    style={{ "--bar-width": `${leadershipScores[index] ?? 80}%` } as CSSProperties}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-life-layout">
          <div data-about-reveal>
            <span className="about-eyebrow">04 / Life beyond engineering</span>
            <h2 className="about-section-title">
              The person
              <br />
              <em>around the work.</em>
            </h2>
            <p className="about-copy" style={{ marginTop: "1.7rem" }}>
              The portfolio shows projects. This part leaves room for the habits and scenes that make the work possible:
              movement, music, travel, service, friendship, and quiet repetition.
            </p>
          </div>

          <div className="about-photo-rail" aria-label="Photo journal placeholders">
            {lifeFrames.map((frame, index) => (
              <article className="about-photo-frame" key={frame.title} data-about-reveal data-about-float>
                <span className="about-index">Chapter {String(index + 1).padStart(2, "0")}</span>
                <span className="about-photo-mark">
                  <Camera size={18} strokeWidth={1.3} />
                  {frame.type}
                </span>
                <div>
                  <strong>{frame.title}</strong>
                  <p>{frame.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-film" aria-labelledby="personal-film-title">
        <div className="about-film-frame" data-about-film>
          <div className="about-film-title" data-about-reveal>
            <span className="about-eyebrow">05 / Personal brand film</span>
            <div className="about-play" aria-hidden>
              <Play size={30} strokeWidth={1.4} fill="currentColor" />
            </div>
            <h2 id="personal-film-title" className="about-section-title">
              A future film
              <br />
              <em>about the build.</em>
            </h2>
            <p className="about-copy" style={{ maxWidth: 620 }}>
              A cinematic placeholder for the story in motion: hands on hardware, late coding sessions,
              campus life, teamwork, public voice, and the ordinary moments that make ambition believable.
            </p>
          </div>

          <div className="about-film-beats" aria-label="Future film scenes">
            {filmBeats.map((beat) => (
              <span className="about-chip" key={beat}>{beat}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div data-about-reveal>
          <span className="about-eyebrow">06 / What drives me</span>
          <h2 className="about-section-title">
            The future
            <br />
            <em>I keep choosing.</em>
          </h2>
        </div>

        <div className="about-drive-grid">
          {driveStatements.map((statement) => (
            <article className="about-drive-card" key={statement.question} data-about-reveal>
              <h3>{statement.question}</h3>
              <p className="about-copy">{statement.answer}</p>
            </article>
          ))}
        </div>

        <div className="about-final-links" data-about-reveal>
          <a className="about-cta" href={`mailto:${site.email}`}>
            Start a conversation
            <ArrowUpRight size={13} strokeWidth={1.6} />
          </a>
          <Link className="about-cta" href="/#archive">
            Read the journal
            <ArrowUpRight size={13} strokeWidth={1.6} />
          </Link>
        </div>
      </section>
    </main>
  );
}
