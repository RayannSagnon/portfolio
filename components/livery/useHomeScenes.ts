"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { KART_WHEELS } from "./KartSvg";

const RAD = 180 / Math.PI;
const smooth = (v: number) => {
  const x = Math.min(Math.max(v, 0), 1);
  return x * x * (3 - 2 * x);
};

/**
 * The homepage as an onboard camera: the RS roundel swallows the hero, the bench is a night
 * garage held in place while the scroll revs the board, the later sections stack like panels,
 * and a kart in the pit lane at the bottom follows along and parks at each stop.
 */
export function useHomeScenes(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    const throttle = (p: number, garage: HTMLElement) => {
      garage.style.setProperty("--throttle", p.toFixed(3));
      window.dispatchEvent(new CustomEvent("rs:throttle", { detail: p }));
    };

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        roomy: "(min-width: 1000px) and (min-height: 700px)",
      },
      (context) => {
        const { motion, roomy } = context.conditions as { motion: boolean; roomy: boolean };
        const q = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
        const hero = q("[data-scene='hero']");
        const garage = q("[data-scene='garage']");
        const demo = q("[data-scene-part='demo']");
        const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));

        // 1. Plunge: the camera pushes into the roundel until its ink fills the screen.
        if (motion && hero) {
          const roundel = q("[data-hero='roundel']");
          const plunge = q("[data-plunge]");
          const cover = () => {
            const size = roundel?.offsetWidth || 120;
            return (2 * Math.hypot(window.innerWidth, window.innerHeight)) / (size * 1.4) + 1;
          };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=90%",
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
          tl.to(q("[data-hero='name']"), { scale: 1.2, yPercent: -10, opacity: 0, ease: "power1.in", duration: 0.6 }, 0)
            .to(q("[data-hero='sheet']"), { xPercent: 35, opacity: 0, ease: "power1.in", duration: 0.5 }, 0)
            .to(root.querySelectorAll("[data-hero='role'], [data-hero='pit']"), { y: 70, opacity: 0, ease: "power1.in", duration: 0.45 }, 0)
            .set(roundel, { zIndex: 30 }, 0)
            .to(roundel, { rotate: 140, scale: 1.4, ease: "power1.in", duration: 0.5 }, 0)
            .fromTo(plunge, { scale: 0 }, { scale: cover, ease: "power2.in", duration: 0.55 }, 0.42);
        }

        // 2. Night garage: held in place on roomy screens while the scroll is the throttle.
        if (garage) {
          if (motion && roomy) {
            ScrollTrigger.create({
              trigger: garage,
              start: "top top",
              end: "+=110%",
              pin: true,
              onUpdate: (self) => throttle(self.progress, garage),
            });
          } else if (motion && demo) {
            ScrollTrigger.create({
              trigger: demo,
              start: "top 85%",
              end: "center 38%",
              onUpdate: (self) => throttle(self.progress, garage),
            });
          } else {
            throttle(0.6, garage);
          }
        }

        // 3. Stacked panels: each one holds while the next slides over it, and recedes.
        panels.forEach((panel, i) => (panel.style.zIndex = String(i + 4)));
        if (motion) {
          panels.forEach((panel, i) => {
            const next = panels[i + 1];
            if (!next) return;
            ScrollTrigger.create({
              trigger: panel,
              start: () => (panel.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
              endTrigger: next,
              end: "top top",
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
            const recede = {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            };
            gsap.to(panel.querySelector("[data-panel-inner]"), {
              scale: 0.92,
              yPercent: -4,
              ease: "none",
              scrollTrigger: recede,
            });
            gsap.to(panel.querySelector("[data-panel-shade]"), {
              opacity: 0.55,
              ease: "none",
              scrollTrigger: { ...recede },
            });
          });
        }

        // 4. Pit lane: the kart parks at each stop and drives to the next as you leave.
        const lane = document.querySelector<HTMLElement>("[data-pitlane]");
        const kart = lane?.querySelector<HTMLElement>("[data-pitlane-kart]");
        const marks = lane ? Array.from(lane.querySelectorAll<HTMLElement>("[data-pitlane-mark]")) : [];
        const stops = Array.from(root.querySelectorAll<HTMLElement>("[data-pit]"));
        if (lane && kart && marks.length === stops.length && stops.length > 1) {
          // Created after the pins, so their positions already account for pin spacing.
          const anchors = stops.map((el, i) =>
            i === 0 ? null : ScrollTrigger.create({ trigger: el, start: "top 55%" }),
          );
          const at = (i: number) => (i === 0 ? 0 : anchors[i]!.start);
          const spokes = KART_WHEELS.map((w) => ({
            w,
            el: kart.querySelector<SVGGElement>(`[data-k='spokes-${w.id}']`),
            a: 0,
          }));
          let lastX = -1;
          let facing = 1;
          let current = -1;
          let idle = 0;

          const markX = (i: number) => {
            const m = marks[i];
            return m.offsetLeft + m.offsetWidth / 2;
          };

          const update = () => {
            const y = window.scrollY;
            let i = 0;
            while (i < stops.length - 1 && y >= at(i + 1)) i++;
            let x = markX(i);
            if (i < stops.length - 1) {
              const span = at(i + 1) - at(i);
              const u = span > 0 ? (y - at(i)) / span : 0;
              x += (markX(i + 1) - markX(i)) * smooth((u - 0.5) / 0.5);
            }
            const dx = lastX < 0 ? 0 : x - lastX;
            lastX = x;
            if (Math.abs(dx) > 0.05) facing = dx > 0 ? 1 : -1;
            kart.style.transform = `translate3d(${x.toFixed(1)}px,0,0) scaleX(${facing})`;
            const svgPerPx = 240 / kart.offsetWidth;
            for (const s of spokes) {
              s.a += ((Math.abs(dx) * svgPerPx) / s.w.r) * RAD;
              s.el?.setAttribute("transform", `rotate(${s.a.toFixed(1)} ${s.w.cx} ${s.w.cy})`);
            }
            if (Math.abs(dx) > 0.3) {
              kart.dataset.moving = "";
              window.clearTimeout(idle);
              idle = window.setTimeout(() => delete kart.dataset.moving, 160);
            }
            const settled = Math.abs(x - markX(i)) < 2 ? i : -1;
            if (settled !== current) {
              current = settled;
              marks.forEach((m, j) => (j === current ? m.setAttribute("aria-current", "location") : m.removeAttribute("aria-current")));
            }
          };

          const go = (e: Event) => {
            const i = marks.indexOf(e.currentTarget as HTMLElement);
            if (i < 0) return;
            const target = i === 0 ? 0 : at(i) + window.innerHeight * 0.55;
            if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.4 });
            else window.scrollTo({ top: target, behavior: motion ? "smooth" : "auto" });
          };
          marks.forEach((m) => m.addEventListener("click", go));
          const tracker = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
          window.addEventListener("resize", update);
          update();

          return () => {
            marks.forEach((m) => m.removeEventListener("click", go));
            window.removeEventListener("resize", update);
            window.clearTimeout(idle);
            tracker.kill();
          };
        }
      },
    );

    return () => mm.revert();
  }, [rootRef]);
}
