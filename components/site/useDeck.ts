"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";

export const STOPS = ["home", "tachometer", "standout", "kits", "interlude", "route", "experience", "skills", "contact"] as const;
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
const clamp01 = (v: number) => Math.max(0, Math.min(v, 1));
const BAND_IN = STOPS.indexOf("interlude") - 1;
const BAND_OUT = STOPS.indexOf("interlude") + 1;
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
  // Everything leaves while the next screen is already arriving, so the page is never empty.
  const textOut = (el: Element, at: number) => {
    tl.fromTo(el.querySelectorAll("[data-title]"), { y: 0, opacity: 1 }, { y: -40, opacity: 0, duration: 0.3, ease: "power2.out" }, at);
    tl.fromTo(risers(el), { y: 0, opacity: 1 }, { y: -32, opacity: 0, duration: 0.3, ease: "power2.out", stagger: { amount: 0.05 } }, at);
  };

  const home = scene("home");
  const tach = scene("tachometer");
  const standout = scene("standout");
  const kits = scene("kits");
  const interlude = scene("interlude");
  const about = scene("route");
  const contact = scene("contact");

  // Home to tachometer: the name parts and the portrait lifts away over black, then the next page comes up.
  const away = { duration: 0.4, ease: "power2.inOut" };
  tl.fromTo(q("[data-name-a]", home), { xPercent: 0 }, { xPercent: -100, ...away }, 0);
  tl.fromTo(q("[data-name-b]", home), { xPercent: 0 }, { xPercent: 100, ...away }, 0);
  tl.fromTo(q("[data-home-stage]", home), { yPercent: 0 }, { yPercent: -140, duration: 0.42, ease: "power2.inOut" }, 0);
  tl.fromTo(home.querySelectorAll("[data-home-foot]"), { opacity: 1, y: 0 }, { opacity: 0, y: 20, duration: 0.25, ease: "power2.out" }, 0);
  tl.fromTo(q("[data-home-bg]", home), { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0);
  show(tach, 0.42);
  titleIn(tach, 0.1);
  tl.set(risers(tach), { opacity: 0 }, 0.001);
  tl.fromTo(risers(tach), { y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.4, stagger: { amount: 0.08 } }, 0.5);
  hide(home, 0);

  // Tachometer to Standout: a morph. The schematic frame opens into the video (see drawMorph) while the text changes over.
  show(standout, 1);
  textOut(tach, 1);
  tl.fromTo(q("[data-video-frame]", standout), { opacity: 0 }, { opacity: 1, duration: 0.16, ease: "none" }, 1);
  tl.fromTo(q("[data-video-frame] video", standout), { scale: 1.12 }, { scale: 1 }, 1);
  textIn(standout, 1);
  hide(tach, 1);

  // Standout to kits: the video closes into the first kit's frame, the second rises beneath it, the column changes in place.
  show(kits, 2);
  tl.fromTo(q("[data-so-col]", standout), { opacity: 1, y: 0 }, { opacity: 0, y: -24, duration: 0.35, ease: "power2.out" }, 2);
  const [first, second] = Array.from(kits.querySelectorAll<HTMLElement>("[data-kit]"));
  tl.fromTo(first, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 2.7);
  tl.fromTo(second, { yPercent: 100 }, { yPercent: 0 }, 2);
  textIn(kits, 2);
  hide(standout, 2);

  // Kits to the interlude: one word, too big for the screen, carried across by the scroll.
  show(interlude, 3);
  tl.fromTo(interlude, { xPercent: 100 }, { xPercent: 0 }, 3);
  tl.fromTo(kits, { xPercent: 0 }, { xPercent: -18 }, 3);
  tl.fromTo(q("[data-word]", interlude), { xPercent: 30 }, { xPercent: -60, ease: "none", duration: 2 }, 3);
  hide(kits, 3);

  // Interlude to the route: About slides over the word while it is still moving.
  show(about, 4);
  tl.fromTo(about, { xPercent: 100 }, { xPercent: 0 }, 4);
  tl.fromTo(q("[data-route-photo]", about), { scale: 1.08 }, { scale: 1 }, 4);
  textIn(panel("route"), 4);
  hide(interlude, 4);

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

  // Skills to contact: a morph. Inside the sofa photo's frame the first portrait wipes up, then that frame travels and widens.
  show(contact, 7);
  const contactPhoto = q("[data-contact-photo]", contact);
  const contactImage = q("[data-contact-image]", contact);
  tl.set(contact.querySelectorAll("[data-rise]:not([data-title]), [data-title] [data-l]"), { opacity: 0 }, 7.001);
  tl.set(contactPhoto, { xPercent: -71.43, clipPath: "inset(0% 42.857% 0% 0%)" }, 7.001);
  tl.set(contactImage, { xPercent: -21.43 }, 7.001);
  tl.fromTo(contactImage, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power2.out" }, 7);
  tl.fromTo(panel("skills"), { opacity: 1, y: 0 }, { opacity: 0, y: -36, duration: 0.3, ease: "power2.out" }, 7);
  tl.set(q("[data-route-photo]", about), { opacity: 0 }, 7.41);
  tl.fromTo(contactPhoto, { xPercent: -71.43, clipPath: "inset(0% 42.857% 0% 0%)" }, { xPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.68 }, 7.32);
  tl.fromTo(contactImage, { xPercent: -21.43 }, { xPercent: 0, duration: 0.68 }, 7.32);
  textIn(contact, 7.22);
  hide(about, 7);

  return tl;
}

export function useDeck(rootRef: RefObject<HTMLElement | null>, start: Stop, onStop: (s: Stop) => void, layoutKey: string, onBand: (live: boolean) => void) {
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
    const morphFrame = root.querySelector<HTMLElement>("[data-video-frame]");
    const morphSlot = root.querySelector<HTMLElement>("[data-morph-slot]");
    const morphKit = root.querySelector<HTMLElement>("[data-kit]");
    let rects: { frame: ReturnType<typeof box>; slot: ReturnType<typeof box>; kit: ReturnType<typeof box> } | null = null;
    let lastMorph = "";

    // The one frame shared by three screens: schematic, video, first kit. Measured, so it follows any window size.
    const drawMorph = (time: number) => {
      if (!morphFrame || !rects) return;
      const { frame, slot, kit } = rects;
      const open = 1 - easeInOut(clamp01(time - 1));
      const close = easeInOut(clamp01(time - 2));
      const top = (slot.y - frame.y) * open;
      const right = Math.max(0, frame.w - slot.w) * open;
      const bottom = (frame.h - (slot.y - frame.y) - slot.h) * open + (frame.h - kit.h) * close;
      const next = `inset(${top.toFixed(1)}px ${right.toFixed(1)}px ${bottom.toFixed(1)}px 0px)|${((slot.x - frame.x) * open).toFixed(1)}`;
      if (next === lastMorph) return;
      lastMorph = next;
      const [clip, shift] = next.split("|");
      morphFrame.style.clipPath = clip;
      morphFrame.style.transform = `translateX(${shift}px)`;
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

    let holdStart: number[] = [];
    let holdLength: number[] = [];
    let passage = 0;
    let index = STOPS.indexOf(start);
    let jumping = false;
    let bandLive = false;
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
        // The interlude never rests, so its word keeps moving with the scroll.
        const reading = i === experience ? EXPERIENCE_STEP * vh * Math.max(jobs.length - 1, 0) : 0;
        holdLength.push(STOPS[i] === "interlude" ? 0 : HOLD * vh + over + reading);
        y += holdLength[i] + passage;
      });
      maxY = Math.max(y - passage, 1);
      if (morphFrame && morphSlot && morphKit) rects = { frame: box(morphFrame), slot: box(morphSlot), kit: box(morphKit) };
      lastMorph = "";
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
      drawMorph(time);
      // Each job holds for a moment before the highlight moves on.
      const reading = clamp01((y - holdStart[experience]) / (EXPERIENCE_STEP * window.innerHeight * Math.max(jobs.length - 1, 1))) * Math.max(jobs.length - 1, 0);
      const job = Math.floor(reading);
      drawFocus(job + easeInOut(reading - job));
      scrollers.forEach((el, k) => {
        if (!el || el.scrollHeight <= el.clientHeight) return;
        const target = Math.max(0, Math.min(y - holdStart[k], el.scrollHeight - el.clientHeight));
        if (el.scrollTop !== target) el.scrollTop = target;
      });
      // The band is on screen from the moment it enters until About has covered it.
      const live = time > BAND_IN && time < BAND_OUT;
      if (live !== bandLive) {
        bandLive = live;
        onBand(live);
      }
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
      lenis = new Lenis({ lerp: 0.11, autoRaf: true });
      lenis.on("scroll", () => update(window.scrollY));
      window.__lenis = lenis;
    });

    const moveTo = (i: number) => {
      if (i < 0 || i >= STOPS.length || i === index || jumping) return;
      const gap = Math.abs(i - index);
      // The interlude is a passage, so going through it still counts as the next screen.
      const throughInterlude = gap === 2 && STOPS[Math.min(i, index) + 1] === "interlude";
      if ((gap === 1 || throughInterlude) && lenis) {
        lenis.scrollTo(holdStart[i], { duration: gap === 1 ? 1.1 : 1.7, easing: easeInOut });
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
