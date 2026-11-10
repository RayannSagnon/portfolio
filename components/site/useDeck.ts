"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";
import { cardFan } from "./cardFan";

export const STOPS = ["home", "tachometer", "standout", "goforit", "kits", "route", "experience", "skills", "contact"] as const;
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
// Extra scroll in window heights to move the highlight from one job to the next.
const EXPERIENCE_STEP = 0.22;
// How far down the portrait the small end-screen frame looks, from 0 (top) to 1 (bottom).
const CONTACT_FOCUS = 0.45;
const clamp01 = (v: number) => Math.max(0, Math.min(v, 1));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * One paused master timeline holds every passage, with a label at each stop. Scrolling moves the
 * playhead directly, so stopping halfway holds the passage and going back plays it in reverse.
 */
function buildTimeline(root: HTMLElement) {
  const q = (sel: string, from: ParentNode = root) => from.querySelector<HTMLElement>(sel)!;
  const scene = (id: string) => q(`[data-scene="${id}"]`);
  const panel = (id: string) => q(`[data-panel="${id}"]`);
  const risers = (el: Element) => el.querySelectorAll("[data-rise]:not([data-title]), .magic-bento__cell");

  const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
  gsap.set(scenes, { opacity: 0 });
  gsap.set(scene("home"), { opacity: 1 });
  gsap.set([panel("experience"), panel("skills")], { yPercent: 100 });

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 1, immediateRender: false } });
  STOPS.forEach((s, i) => tl.addLabel(s, i));

  const show = (el: Element, at: number) => tl.set(el, { opacity: 1 }, at + 0.001);
  const hide = (el: Element, at: number) => tl.set(el, { opacity: 0 }, at + 0.999);
  // Titles settle into place while their letters come on one after another.
  const titleIn = (el: Element, at: number) =>
    el.querySelectorAll("[data-title]").forEach((title) => {
      tl.set(title.querySelectorAll("[data-l]"), { opacity: 0 }, at + 0.001);
      tl.fromTo(title, { y: 36, scale: 0.96 }, { y: 0, scale: 1, ease: "power3.out", duration: 0.55, transformOrigin: "0% 100%" }, at + 0.34);
      tl.fromTo(title.querySelectorAll("[data-l]"), { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.12, stagger: { amount: 0.34 } }, at + 0.34);
    });
  const textIn = (el: Element, at: number, y = 28) => {
    titleIn(el, at);
    tl.set(risers(el), { opacity: 0 }, at + 0.001);
    tl.fromTo(risers(el), { y, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.45, stagger: { amount: 0.12 } }, at + 0.42);
  };
  const home = scene("home");
  const tach = scene("tachometer");
  const standout = scene("standout");
  const kits = scene("kits");
  const about = scene("route");
  const contact = scene("contact");

  // Home to the first project: a page turning. Home lifts away as one sheet, the portrait a little faster than the
  // name, and the project is already underneath.
  const name = q("[data-home-name]", home);
  const stage = q("[data-home-stage]", home);
  show(tach, 0.001);
  tl.set(home, { backgroundColor: "rgb(10, 10, 11)" }, 0.001);
  tl.fromTo(home, { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "power2.inOut" }, 0);
  tl.fromTo(stage, { yPercent: 0 }, { yPercent: -18, duration: 0.9, ease: "power2.inOut" }, 0);
  tl.fromTo(name, { yPercent: 0 }, { yPercent: 22, duration: 0.9, ease: "power2.inOut" }, 0);
  tl.fromTo(tach, { scale: 0.95, yPercent: 6 }, { scale: 1, yPercent: 0, duration: 0.9, ease: "power2.inOut" }, 0);
  titleIn(tach, 0.3);
  hide(home, 0);

  // Between the projects every page rises over the one before, which drifts up a little behind it.
  const rise = (from: HTMLElement, to: HTMLElement, at: number) => {
    show(to, at);
    // The dark screens are see-through on the stack, so each one brings its own ground while it rises.
    if (to.dataset.scene !== "goforit") tl.set(to, { backgroundColor: "rgb(10, 10, 11)" }, at + 0.001);
    tl.fromTo(to, { yPercent: 100 }, { yPercent: 0, ease: "power3.inOut" }, at);
    tl.fromTo(from, { yPercent: 0 }, { yPercent: -12, ease: "power3.inOut" }, at);
    textIn(to, at + 0.1);
    hide(from, at);
  };

  // Tachometer to Standout.
  rise(tach, standout, 1);
  tl.fromTo(q("[data-video-frame] video", standout), { scale: 1.12 }, { scale: 1 }, 1);

  // Standout to GoForIt.
  const gfi = scene("goforit");
  rise(standout, gfi, 2);

  // GoForIt to kits, back into the dark.
  rise(gfi, kits, 3);

  // Kits to About: the route slides in from the side and the pile of photos opens into the cards (see cardFan).
  const routePanel = panel("route");
  show(about, 4);
  tl.fromTo(about, { xPercent: 100 }, { xPercent: 0 }, 4);
  tl.fromTo(kits, { xPercent: 0 }, { xPercent: -18 }, 4);
  textIn(routePanel, 4);
  hide(kits, 4);
  tl.fromTo(q("[data-route-photo]", about), { scale: 1.08 }, { scale: 1 }, 5);

  // Inside About the portrait stays put: only the right column moves, each row rising in turn.
  ([["route", "experience", 5], ["experience", "skills", 6]] as const).forEach(([from, to, at]) => {
    // The route covers the whole screen, so it lifts away whole and uncovers the portrait.
    if (from === "route") tl.fromTo(panel(from), { yPercent: 0 }, { yPercent: -100 }, at);
    else tl.fromTo(panel(from), { yPercent: 0, opacity: 1 }, { yPercent: -100, opacity: 0 }, at);
    tl.fromTo(panel(to), { yPercent: 100 }, { yPercent: 0 }, at);
    titleIn(panel(to), at - 0.12);
    tl.set(risers(panel(to)), { opacity: 0 }, at + 0.001);
    tl.fromTo(risers(panel(to)), { y: 56, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.5, stagger: { amount: 0.3 } }, at + 0.22);
  });

  // Skills to contact: one continuous morph. The sofa photo's frame leaves at once, turning into the portrait as it
  // shrinks to its corner (see drawContact), while the last screen is already rising behind it.
  show(contact, 7);
  const contactImage = q("[data-contact-image]", contact);
  tl.set(q("[data-route-photo]", about), { opacity: 0 }, 7.001);
  tl.set(contactImage, { opacity: 0 }, 7.001);
  tl.fromTo(contactImage, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "none" }, 7.1);
  tl.fromTo(panel("skills"), { opacity: 1, y: 0 }, { opacity: 0, y: -60, duration: 0.35, ease: "power2.inOut" }, 7);
  tl.fromTo(q("[data-contact-bg]", contact), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 7.2);
  textIn(contact, 6.85, 56);
  hide(about, 7);

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
      // The photos open with the scroll here too, without pinning the page.
      const stage = root.querySelector<HTMLElement>("[data-cards-stage]");
      let ticking = false;
      const driveFan = () => {
        ticking = false;
        if (!stage) return;
        const vh = window.innerHeight;
        cardFan.open = easeInOut(clamp01((vh * 0.8 - stage.getBoundingClientRect().top) / (vh * 0.45)));
        cardFan.wake?.();
      };
      const onFlowScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(driveFan);
      };
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        driveFan();
        window.addEventListener("scroll", onFlowScroll, { passive: true });
      }
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
        window.removeEventListener("scroll", onFlowScroll);
      };
    }

    html.dataset.deck = "1";
    let tl!: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      tl = buildTimeline(root);
    }, root);

    const veil = root.querySelector<HTMLElement>("[data-veil]");
    const spacer = root.querySelector<HTMLElement>("[data-spacer]");
    const leds = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-led]"));
    let maxY = 1;
    const box = (el: HTMLElement) => {
      let x = 0;
      let y = 0;
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
        x += n.offsetLeft;
        y += n.offsetTop;
      }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight };
    };

    const stage = root.querySelector<HTMLElement>("[data-cards-stage]");
    const contactFrame = root.querySelector<HTMLElement>("[data-contact-photo]");
    const contactSlot = root.querySelector<HTMLElement>("[data-contact-slot]");
    const routePortrait = root.querySelector<HTMLElement>("[data-route-portrait]");
    let contactRects: { from: ReturnType<typeof box>; to: ReturnType<typeof box> } | null = null;
    let lastContact = "";
    // The lines only draw once their passage has begun: a full-screen shader would otherwise cost frames all through Skills.
    const linesLayer = root.querySelector<HTMLElement>("[data-contact-bg]");
    let linesOn: boolean | null = null;

    // The sofa photo's frame carries the portrait to its corner: one uniform scale, with a clip giving it the small frame's shape.
    const drawContact = (time: number) => {
      if (!contactFrame || !contactRects) return;
      const { from, to } = contactRects;
      const t = easeInOut(clamp01((time - STOPS.indexOf("skills")) / 0.85));
      const final = to.w / from.w;
      const shown = Math.min(from.h, to.h / final);
      const top = (from.h - shown) * CONTACT_FOCUS;
      const bottom = from.h - shown - top;
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - top * final - from.y) * t;
      const next = `${x.toFixed(1)}|${y.toFixed(1)}|${(1 + (final - 1) * t).toFixed(4)}|${(top * t).toFixed(1)}|${(bottom * t).toFixed(1)}`;
      if (next === lastContact) return;
      lastContact = next;
      const [px, py, scale, clipTop, clipBottom] = next.split("|");
      contactFrame.style.transform = `translate(${px}px, ${py}px) scale(${scale})`;
      contactFrame.style.clipPath = `inset(${clipTop}px 0px ${clipBottom}px 0px)`;
    };

    const experience = STOPS.indexOf("experience");
    const jobs = Array.from(root.querySelectorAll<HTMLElement>("[data-job]"));
    const jobBar = root.querySelector<HTMLElement>("[data-job-bar]");
    let jobBoxes: { y: number; h: number }[] = [];
    let lastFocus = -1;

    // Each job comes forward as it is reached, and the bar travels to it.
    const drawFocus = (focus: number) => {
      if (focus === lastFocus || !jobBoxes.length) return;
      lastFocus = focus;
      jobs.forEach((job, k) => {
        const near = 1 - clamp01(Math.abs(focus - k));
        job.style.opacity = String(0.42 + 0.58 * near);
        const title = job.firstElementChild as HTMLElement;
        title.style.transform = `scale(${1 + 0.2 * near})`;
      });
      if (jobBar) {
        const low = Math.floor(focus);
        const high = Math.min(low + 1, jobBoxes.length - 1);
        const part = focus - low;
        const y = jobBoxes[low].y + (jobBoxes[high].y - jobBoxes[low].y) * part;
        const h = jobBoxes[low].h + (jobBoxes[high].h - jobBoxes[low].h) * part;
        jobBar.style.transform = `translateY(${y.toFixed(1)}px) scaleY(${(h / 100).toFixed(4)})`;
      }
    };
    const scrollers = STOPS.map(
      (stop) => root.querySelector<HTMLElement>(`[data-panel="${stop}"]`) ?? root.querySelector<HTMLElement>(`[data-scene="${stop}"] [data-scroller]`),
    );

    // The page owns the scroll: a screen's own content moves only through update(), so the wheel never gets caught inside it.
    scrollers.forEach((el) => el && (el.style.overflowY = "hidden"));

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
        const reading = i === experience ? EXPERIENCE_STEP * vh * Math.max(jobs.length - 1, 0) : 0;
        holdLength.push(HOLD * vh + over + reading);
        y += holdLength[i] + passage;
      });
      maxY = Math.max(y - passage, 1);
      if (stage) {
        cardFan.pileY = vh / 2 - (box(stage).y + stage.offsetHeight / 2);
        cardFan.wake?.();
      }
      if (contactFrame && contactSlot && routePortrait) {
        contactRects = { from: box(routePortrait), to: box(contactSlot) };
        contactFrame.style.width = `${contactRects.from.w}px`;
        contactFrame.style.height = `${contactRects.from.h}px`;
      }
      lastContact = "";
      jobBoxes = jobs.map((job) => ({ y: job.offsetTop, h: job.offsetHeight }));
      lastFocus = -1;
      if (spacer) spacer.style.height = `${y - passage + vh}px`;
      lenis?.resize();
    };

    const update = (y: number) => {
      let i = 0;
      while (i < STOPS.length - 1 && y >= holdStart[i + 1]) i++;
      const intoPassage = y - holdStart[i] - holdLength[i];
      const time = i >= STOPS.length - 1 ? i : i + Math.max(0, Math.min(intoPassage / passage, 1));
      tl.time(time, true);
      drawContact(time);
      const wantLines = time >= STOPS.indexOf("skills") + 0.1;
      if (linesLayer && wantLines !== linesOn) {
        linesOn = wantLines;
        linesLayer.style.display = wantLines ? "" : "none";
      }
      const open = easeInOut(clamp01(time - STOPS.indexOf("kits")));
      if (open !== cardFan.open) {
        cardFan.open = open;
        cardFan.wake?.();
      }
      // Each job holds for a moment before the highlight moves on.
      const reading = clamp01((y - holdStart[experience]) / (EXPERIENCE_STEP * window.innerHeight * Math.max(jobs.length - 1, 1))) * Math.max(jobs.length - 1, 0);
      const job = Math.floor(reading);
      drawFocus(job + easeInOut(reading - job));
      scrollers.forEach((el, k) => {
        if (!el || el.scrollHeight <= el.clientHeight) return;
        const target = Math.max(0, Math.min(y - holdStart[k], el.scrollHeight - el.clientHeight));
        if (el.scrollTop !== target) el.scrollTop = target;
      });
      // The tachometer's own logic: 0 to 5 across the page, an LED at each of 1, 2, 3 and 4.
      const level = (y / maxY) * 5;
      leds.forEach((led, n) => led.toggleAttribute("data-on", level >= n + 1));
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
      // The wheel and trackpad scroll natively, so the page stops where the hand stops. Lenis only animates the navigation jumps.
      lenis = new Lenis({ smoothWheel: false, autoRaf: true });
      lenis.on("scroll", () => update(window.scrollY));
      window.__lenis = lenis;
    });

    const moveTo = (i: number) => {
      pinned = false;
      if (i < 0 || i >= STOPS.length || i === index || jumping) return;
      const gap = Math.abs(i - index);
      if (gap === 1 && lenis) {
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

    // Until the visitor scrolls, a page opened at a section stays on it, even when fonts or the language change the layout.
    let pinned = start !== "home";
    const release = () => {
      pinned = false;
    };
    window.addEventListener("wheel", release, { passive: true, once: true });
    window.addEventListener("touchstart", release, { passive: true, once: true });
    window.addEventListener("keydown", release, { once: true });
    window.addEventListener("pointerdown", release, { once: true });
    const relayout = () => {
      layout();
      if (pinned) {
        const top = holdStart[STOPS.indexOf(start)];
        if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
        else window.scrollTo({ top, behavior: "instant" });
        update(top);
        return;
      }
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
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
      window.removeEventListener("pointerdown", release);
      root.removeEventListener("focusin", onFocus);
      scrollers.forEach((el) => el && (el.style.overflowY = ""));
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
