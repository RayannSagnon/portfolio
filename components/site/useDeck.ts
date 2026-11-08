"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";

export const STOPS = ["home", "tachometer", "bench", "standout", "kits", "route", "route1", "route2", "work", "contact"] as const;
export type Stop = (typeof STOPS)[number];

export const sceneOf = (stop: Stop) => (stop === "route1" || stop === "route2" ? "route" : stop);

/** The full theatre needs a mouse and room; everything else reads as one normal page. */
export const DECK_QUERY =
  "(min-width: 821px) and (min-height: 560px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
export const DECK_BOOT = `try{if(matchMedia(${JSON.stringify(DECK_QUERY)}).matches)document.documentElement.dataset.deck="1"}catch(e){}`;

// Scroll distance, in window heights: how long each scene holds, and how long each passage lasts.
const HOLD = 0.25;
const PASSAGE_LENGTH = 0.6;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * One paused master timeline holds every passage, with a label at each stop. Scrolling moves the
 * playhead directly, so stopping halfway holds the passage and going back plays it in reverse.
 */
function buildTimeline(root: HTMLElement) {
  const q = (sel: string, from: ParentNode = root) => from.querySelector<HTMLElement>(sel)!;
  const scene = (id: string) => q(`[data-scene="${id}"]`);
  const risers = (el: Element) => el.querySelectorAll("[data-rise]");

  const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
  gsap.set(scenes, { opacity: 0 });
  gsap.set(scene("home"), { opacity: 1 });

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 1, immediateRender: false } });
  STOPS.forEach((s, i) => tl.addLabel(s, i));

  const show = (el: Element, at: number) => tl.set(el, { opacity: 1 }, at + 0.001);
  const hide = (el: Element, at: number) => tl.set(el, { opacity: 0 }, at + 0.999);
  const textIn = (el: Element, at: number, y = 28) =>
    tl.fromTo(risers(el), { y, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.45, stagger: { amount: 0.12 } }, at + 0.42);

  const home = scene("home");
  const tach = scene("tachometer");
  const bench = scene("bench");
  const standout = scene("standout");
  const kits = scene("kits");
  const route = scene("route");
  const work = scene("work");
  const contact = scene("contact");
  const tachWrap = q("[data-wrap]", tach);
  const tachInner = q("[data-wrap-inner]", tach);
  const soWrap = q("[data-wrap]", standout);
  const soInner = q("[data-wrap-inner]", standout);

  // Home to tachometer: the left image grows until it fills the screen.
  show(tach, 0);
  tl.fromTo(tachWrap, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "none" }, 0);
  tl.fromTo(tachWrap, { xPercent: -41.667 }, { xPercent: 0 }, 0);
  tl.fromTo(tachInner, { xPercent: 41.667 }, { xPercent: 0 }, 0);
  tl.to(q("[data-home-stage]", home), { xPercent: -6 }, 0);
  textIn(tach, 0);
  hide(home, 0);

  // Tachometer to bench: the photo closes upward, then the LEDs come on in turn.
  show(bench, 1);
  tl.fromTo(tachWrap, { yPercent: 0 }, { yPercent: -100 }, 1);
  tl.fromTo(tachInner, { yPercent: 0 }, { yPercent: 100 }, 1);
  tl.fromTo(bench.querySelectorAll("[data-led]"), { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, ease: "power3.out", duration: 0.4, stagger: 0.04 }, 1.42);
  textIn(bench, 1);
  hide(tach, 1);

  // Bench to Standout: white paper rises from the bottom.
  show(standout, 2);
  tl.fromTo(soWrap, { yPercent: 100 }, { yPercent: 0 }, 2);
  tl.fromTo(soInner, { yPercent: -100 }, { yPercent: 0 }, 2);
  tl.fromTo(q("[data-video-frame]", standout), { scale: 1.06 }, { scale: 1 }, 2);
  textIn(standout, 2);
  hide(bench, 2);

  // Standout to kits: the two columns arrive from opposite directions.
  show(kits, 3);
  const [left, right] = Array.from(kits.querySelectorAll<HTMLElement>("[data-kit]"));
  tl.fromTo(left, { yPercent: -100 }, { yPercent: 0 }, 3);
  tl.fromTo(right, { yPercent: 100 }, { yPercent: 0 }, 3);
  textIn(kits, 3);
  hide(standout, 3);

  // Kits to the route: the only move that travels sideways.
  show(route, 4);
  tl.fromTo(route, { xPercent: 100 }, { xPercent: 0 }, 4);
  tl.fromTo(kits, { xPercent: 0 }, { xPercent: -18 }, 4);
  const slides = Array.from(route.querySelectorAll<HTMLElement>("[data-slide]"));
  textIn(slides[0], 4);
  hide(kits, 4);

  // Along the route: photos slide across, names arrive a beat behind them.
  const track = q("[data-track]", route);
  [1, 2].forEach((n) => {
    const at = 4 + n;
    tl.fromTo(track, { xPercent: -33.3333 * (n - 1) }, { xPercent: -33.3333 * n }, at);
    tl.fromTo(q("[data-place]", slides[n]), { x: 180 }, { x: 0 }, at);
    textIn(slides[n], at);
  });

  // Route to work: only type, arriving in a cascade.
  show(work, 7);
  tl.fromTo(work, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "none" }, 7.2);
  tl.to(route, { scale: 0.96, opacity: 0, duration: 0.6 }, 7);
  tl.fromTo(risers(work), { y: 44, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.45, stagger: { amount: 0.2 } }, 7.32);

  // Work to contact: the portrait comes back on the other side.
  show(contact, 8);
  tl.fromTo(contact, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 8);
  tl.fromTo(q("[data-contact-photo]", contact), { xPercent: -71.43 }, { xPercent: 0 }, 8);
  textIn(contact, 8);
  hide(work, 8);

  return tl;
}

export function useDeck(rootRef: RefObject<HTMLElement | null>, start: Stop, onStop: (s: Stop) => void, layoutKey: string) {
  const goRef = useRef<(s: Stop) => void>(() => {});
  const layoutRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const mq = window.matchMedia(DECK_QUERY);
    const reload = () => window.location.reload();
    mq.addEventListener("change", reload);

    // Phones, touch and reduced motion: one normal page.
    if (!mq.matches) {
      delete html.dataset.deck;
      const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
      const middle = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) onStop(e.target.id as Stop);
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );
      sections.forEach((el) => middle.observe(el));
      goRef.current = (s) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(sceneOf(s))?.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
      };
      let seen: IntersectionObserver | undefined;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.setAttribute("data-motion", "");
        seen = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              e.target.setAttribute("data-in", "");
              seen?.unobserve(e.target);
            }
          },
          { threshold: 0.12 },
        );
        sections.forEach((el) => seen?.observe(el));
      }
      return () => {
        mq.removeEventListener("change", reload);
        middle.disconnect();
        seen?.disconnect();
      };
    }

    html.dataset.deck = "1";
    let tl!: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      tl = buildTimeline(root);
    }, root);

    const veil = root.querySelector<HTMLElement>("[data-veil]");
    const spacer = root.querySelector<HTMLElement>("[data-spacer]");
    const scrollers = STOPS.map((stop) =>
      stop === "route1" || stop === "route2"
        ? null
        : root.querySelector<HTMLElement>(`[data-scene="${sceneOf(stop)}"] [data-scroller]`),
    );

    let holdStart: number[] = [];
    let holdLength: number[] = [];
    let passage = 0;
    let index = STOPS.indexOf(start);
    let jumping = false;
    let lenis: import("lenis").default | null = null;
    let cancelled = false;

    const layout = () => {
      const vh = window.innerHeight;
      passage = PASSAGE_LENGTH * vh;
      holdStart = [];
      holdLength = [];
      let y = 0;
      STOPS.forEach((_, i) => {
        const el = scrollers[i];
        // A scene taller than the window gets a longer hold, spent scrolling its own content.
        const over = el ? Math.max(el.scrollHeight - el.clientHeight, 0) : 0;
        holdStart.push(y);
        holdLength.push(HOLD * vh + over);
        y += holdLength[i] + passage;
      });
      if (spacer) spacer.style.height = `${y - passage + vh}px`;
      lenis?.resize();
    };

    const update = (y: number) => {
      let i = 0;
      while (i < STOPS.length - 1 && y >= holdStart[i + 1]) i++;
      const intoPassage = y - holdStart[i] - holdLength[i];
      const time = i >= STOPS.length - 1 ? i : i + Math.max(0, Math.min(intoPassage / passage, 1));
      tl.time(time, true);
      scrollers.forEach((el, k) => {
        if (!el || el.scrollHeight <= el.clientHeight) return;
        const target = Math.max(0, Math.min(y - holdStart[k], el.scrollHeight - el.clientHeight));
        if (el.scrollTop !== target) el.scrollTop = target;
      });
      const nearest = Math.round(time);
      if (nearest !== index) {
        index = nearest;
        onStop(STOPS[nearest]);
      }
    };

    layout();
    if (start !== "home") window.scrollTo({ top: holdStart[index], behavior: "instant" });
    update(window.scrollY);

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.11, autoRaf: true });
      lenis.on("scroll", () => update(window.scrollY));
      window.__lenis = lenis;
    });

    const moveTo = (i: number) => {
      if (i < 0 || i >= STOPS.length || i === index || jumping) return;
      if (Math.abs(i - index) === 1 && lenis) {
        lenis.scrollTo(holdStart[i], { duration: 1.1, easing: easeInOut });
        return;
      }
      // A jump across several stops cuts through a short veil instead of replaying them all.
      jumping = true;
      gsap.to(veil, {
        opacity: 1,
        duration: 0.16,
        ease: "power2.out",
        onComplete: () => {
          if (lenis) lenis.scrollTo(holdStart[i], { immediate: true, force: true });
          else window.scrollTo({ top: holdStart[i], behavior: "instant" });
          update(holdStart[i]);
          gsap.to(veil, { opacity: 0, duration: 0.3, ease: "power2.out", onComplete: () => void (jumping = false) });
        },
      });
    };

    goRef.current = (s) => moveTo(STOPS.indexOf(s));

    const relayout = () => {
      layout();
      update(window.scrollY);
    };
    layoutRef.current = relayout;
    window.addEventListener("resize", relayout);
    document.fonts?.ready.then(() => !cancelled && relayout());

    // Tabbing into a scene brings it on screen, so nothing is focused out of sight.
    const onFocus = (e: FocusEvent) => {
      const id = (e.target as Element | null)?.closest<HTMLElement>("[data-scene]")?.dataset.scene;
      if (!id || id === sceneOf(STOPS[index])) return;
      moveTo(STOPS.indexOf(id as Stop));
    };
    root.addEventListener("focusin", onFocus);

    return () => {
      cancelled = true;
      mq.removeEventListener("change", reload);
      window.removeEventListener("resize", relayout);
      root.removeEventListener("focusin", onFocus);
      lenis?.destroy();
      window.__lenis = undefined;
      layoutRef.current = () => {};
      ctx.revert();
      delete html.dataset.deck;
    };
    // The deck is built once; start and onStop are stable for the page's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switching language changes how much text each scene holds.
  useEffect(() => {
    layoutRef.current();
  }, [layoutKey]);

  return goRef;
}
