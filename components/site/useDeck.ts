"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";

export const STOPS = ["home", "tachometer", "standout", "kits", "route", "experience", "skills", "contact"] as const;
export type Stop = (typeof STOPS)[number];

/** The three About stops share one scene: the portrait stays while the column changes. */
export const sceneOf = (stop: Stop) => (stop === "experience" || stop === "skills" ? "route" : stop);

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
  const panel = (id: string) => q(`[data-panel="${id}"]`);
  const risers = (el: Element) => el.querySelectorAll("[data-rise]");

  const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
  gsap.set(scenes, { opacity: 0 });
  gsap.set(scene("home"), { opacity: 1 });
  gsap.set([panel("experience"), panel("skills")], { yPercent: 100 });

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 1, immediateRender: false } });
  STOPS.forEach((s, i) => tl.addLabel(s, i));

  const show = (el: Element, at: number) => tl.set(el, { opacity: 1 }, at + 0.001);
  const hide = (el: Element, at: number) => tl.set(el, { opacity: 0 }, at + 0.999);
  const textIn = (el: Element, at: number, y = 28) =>
    tl.fromTo(risers(el), { y, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.45, stagger: { amount: 0.12 } }, at + 0.42);

  const home = scene("home");
  const tach = scene("tachometer");
  const standout = scene("standout");
  const kits = scene("kits");
  const about = scene("route");
  const contact = scene("contact");
  const soWrap = q("[data-wrap]", standout);
  const soInner = q("[data-wrap-inner]", standout);

  // Home to tachometer: the two halves of the page part like curtains.
  show(tach, 0);
  tl.fromTo(q("[data-home-stage]", home), { xPercent: 0 }, { xPercent: -100 }, 0);
  tl.fromTo(q("[data-home-col]", home), { xPercent: 0 }, { xPercent: 100 }, 0);
  textIn(tach, 0);
  hide(home, 0);

  // Tachometer to Standout: the next page rises from the bottom.
  show(standout, 1);
  tl.fromTo(soWrap, { yPercent: 100 }, { yPercent: 0 }, 1);
  tl.fromTo(soInner, { yPercent: -100 }, { yPercent: 0 }, 1);
  tl.fromTo(q("[data-video-frame]", standout), { scale: 1.06 }, { scale: 1 }, 1);
  textIn(standout, 1);
  hide(tach, 1);

  // Standout to kits: the text column changes in place, the two kits arrive from opposite sides.
  show(kits, 2);
  tl.to(q("[data-so-col]", standout), { opacity: 0, y: -24, duration: 0.35, ease: "power2.out" }, 2);
  const [first, second] = Array.from(kits.querySelectorAll<HTMLElement>("[data-kit]"));
  tl.fromTo(first, { xPercent: 100 }, { xPercent: 0 }, 2);
  tl.fromTo(second, { xPercent: -100 }, { xPercent: 0 }, 2);
  textIn(kits, 2);
  hide(standout, 2);

  // Kits to the route: the only move that travels sideways.
  show(about, 3);
  tl.fromTo(about, { xPercent: 100 }, { xPercent: 0 }, 3);
  tl.fromTo(kits, { xPercent: 0 }, { xPercent: -18 }, 3);
  tl.fromTo(q("[data-route-photo]", about), { scale: 1.08 }, { scale: 1 }, 3);
  textIn(panel("route"), 3);
  hide(kits, 3);

  // Inside About the portrait stays put: only the right column moves, each row rising in turn.
  ([["route", "experience", 4], ["experience", "skills", 5]] as const).forEach(([from, to, at]) => {
    tl.fromTo(panel(from), { yPercent: 0, opacity: 1 }, { yPercent: -100, opacity: 0 }, at);
    tl.fromTo(panel(to), { yPercent: 100 }, { yPercent: 0 }, at);
    tl.fromTo(risers(panel(to)), { y: 56, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.5, stagger: { amount: 0.3 } }, at + 0.22);
  });

  // Skills to contact: the first portrait crosses back, and the page ends where it began.
  show(contact, 6);
  tl.fromTo(contact, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 6);
  tl.fromTo(q("[data-contact-photo]", contact), { xPercent: -71.43 }, { xPercent: 0 }, 6);
  textIn(contact, 6);
  hide(about, 6);

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
    const scrollers = STOPS.map(
      (stop) => root.querySelector<HTMLElement>(`[data-panel="${stop}"]`) ?? root.querySelector<HTMLElement>(`[data-scene="${stop}"] [data-scroller]`),
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
      const target = e.target as Element | null;
      const id = target?.closest<HTMLElement>("[data-panel]")?.dataset.panel ?? target?.closest<HTMLElement>("[data-scene]")?.dataset.scene;
      if (!id || id === STOPS[index]) return;
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
