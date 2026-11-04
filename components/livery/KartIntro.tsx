"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { gsap } from "@/lib/motion/gsap";
import { KART_BOX, KART_WHEELS, KartSvg } from "./KartSvg";
import k from "./KartIntro.module.css";

const SEEN_KEY = "rs_intro_seen";

/**
 * Runs before first paint: returning visitors and reduced-motion users never see the curtain,
 * so there is no flash of it either.
 */
export const KART_INTRO_BOOT = `try{if(sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){document.documentElement.dataset.intro="skip"}`;

const RAD = 180 / Math.PI;

/**
 * The opening: a zipper across the screen, the kart is its pull. Each half of the curtain is two
 * panels: the closed run to the right of the kart slides with it, the open lip to the left is the
 * same panel tilted about the kart. Everything moves by transform only, so it stays on the GPU.
 */
export function KartIntro() {
  const t = useLocale().ui.livery.intro;
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = ref.current;
    if (!root || html.dataset.intro === "skip") {
      setGone(true);
      return;
    }
    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
    const topGroup = q<HTMLElement>("[data-part='top']");
    const bottomGroup = q<HTMLElement>("[data-part='bottom']");
    const topClosed = q<HTMLElement>("[data-part='top-closed']");
    const topOpen = q<HTMLElement>("[data-part='top-open']");
    const bottomClosed = q<HTMLElement>("[data-part='bottom-closed']");
    const bottomOpen = q<HTMLElement>("[data-part='bottom-open']");
    const kart = q<HTMLElement>("[data-part='kart']");
    const body = q<SVGGElement>("[data-k='body']");
    const spokes = KART_WHEELS.map((w) => ({ w, el: q<SVGGElement>(`[data-k='spokes-${w.id}']`), a: 0 }));

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    html.dataset.intro = "playing";
    window.__lenis?.stop();

    const stage = document.querySelector<HTMLElement>("[data-intro-stage]");
    if (stage) gsap.set(stage, { scale: 1.06, transformOrigin: "50% 40%", willChange: "transform" });

    let W = window.innerWidth;
    let H = window.innerHeight;
    // The V opens at a fixed angle, like real teeth parting behind a pull.
    let theta = Math.min(Math.atan((0.46 * H) / W), 0.42) * RAD;
    const kartW = () => kart.offsetWidth;
    const svgPerPx = () => KART_BOX.w / kartW();

    // Kart enters already rolling, then accelerates away: x(t) = v0 t + a t^2.
    const startX = () => -kartW() * 0.95;
    const endX = () => W + kartW() * 0.3;
    const drive = { p: 0 };
    let lastX = startX();
    let lastT = performance.now();
    let clock = 0;

    const place = (x: number) => {
      // The pull point sits under the kart's rear wheel; the teeth meet there.
      const pivot = x + kartW() * 0.18;
      const shift = `translate3d(${pivot}px,0,0)`;
      topClosed.style.transform = shift;
      bottomClosed.style.transform = shift;
      topOpen.style.transform = `${shift} rotate(${theta}deg)`;
      bottomOpen.style.transform = `${shift} rotate(${-theta}deg)`;
    };

    const frame = () => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      lastT = now;
      clock += dt;
      const e = 0.42 * drive.p + 0.58 * drive.p * drive.p;
      const x = startX() + (endX() - startX()) * e;
      const dx = x - lastX;
      lastX = x;
      place(x);

      // Wheels turn by the distance covered, not by a fixed spin.
      const dSvg = dx * svgPerPx();
      for (const s of spokes) {
        s.a += (dSvg / s.w.r) * RAD;
        s.el.setAttribute("transform", `rotate(${s.a.toFixed(1)} ${s.w.cx} ${s.w.cy})`);
      }
      // Chassis buzz grows with speed; the nose lifts a touch under throttle.
      const speed = dx / dt;
      const buzz = Math.sin(clock / 22) * Math.min(speed * 0.35, 0.9);
      body.setAttribute("transform", `translate(0 ${buzz.toFixed(2)})`);
      const lift = Math.min(speed * 1.1, 2.2);
      kart.style.transform = `translate3d(${x}px, -${(KART_BOX.ground / KART_BOX.h) * 100}%, 0) rotate(${-lift}deg)`;
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      theta = Math.min(Math.atan((0.46 * H) / W), 0.42) * RAD;
    };
    window.addEventListener("resize", onResize);
    place(startX());
    frame();

    const finish = () => {
      html.dataset.intro = "done";
      window.__lenis?.start();
      setGone(true);
    };

    const tl = gsap.timeline({ paused: true, onComplete: finish });
    tl.to(drive, { p: 1, duration: 1.55, ease: "none", onUpdate: frame })
      .to(topGroup, { yPercent: -62, duration: 0.8, ease: "power3.out" }, "-=0.22")
      .to(bottomGroup, { yPercent: 62, duration: 0.8, ease: "power3.out" }, "<")
      .to(stage, { scale: 1, duration: 1, ease: "power3.out", clearProps: "transform,willChange" }, "<");

    // Start once fonts are in and two frames have painted, so the first frames are not dropped.
    let started = false;
    const go = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          lastT = performance.now();
          gsap.delayedCall(0.2, () => tl.play());
        }),
      );
    };
    const fontWait = document.fonts?.ready ?? Promise.resolve();
    fontWait.then(go);
    const fallback = window.setTimeout(go, 700);

    // Any input fast-forwards: a recruiter in a hurry is never held at the gate.
    const hurry = () => {
      go();
      tl.timeScale(3.5);
    };
    const opts = { once: true, passive: true } as const;
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((ev) => window.addEventListener(ev, hurry, opts));

    return () => {
      tl.kill();
      window.clearTimeout(fallback);
      window.removeEventListener("resize", onResize);
      events.forEach((ev) => window.removeEventListener(ev, hurry));
      if (html.dataset.intro === "playing") html.dataset.intro = "done";
      if (stage) gsap.set(stage, { clearProps: "transform,willChange" });
      window.__lenis?.start();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className={k.intro} aria-hidden="true">
      <div className={k.group} data-part="top">
        {/* Open lip first: its shadow tucks under the closed run instead of streaking over it. */}
        <div className={`${k.panel} ${k.topOpen}`} data-part="top-open" />
        <div className={`${k.panel} ${k.topClosed}`} data-part="top-closed" />
        <span className={k.corner}>Rayann Sagnon</span>
      </div>
      <div className={k.group} data-part="bottom">
        <div className={`${k.panel} ${k.bottomOpen}`} data-part="bottom-open" />
        <div className={`${k.panel} ${k.bottomClosed}`} data-part="bottom-closed" />
        <span className={k.hint}>{t.hint}</span>
      </div>
      <div className={k.kart} data-part="kart">
        <KartSvg className={k.kartSvg} />
      </div>
    </div>
  );
}
