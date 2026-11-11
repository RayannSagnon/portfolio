"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cardFan } from "../cardFan";
import { RouteCards } from "../RouteCards";
import { PageFrame } from "./PageFrame";
import p from "./pages.module.css";

const clamp01 = (v: number) => Math.max(0, Math.min(v, 1));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function AboutPage() {
  const { ui } = useLocale();
  const copy = ui.siteCopy;
  const ab = copy.aboutPage;
  const a = copy.about;
  const bikes = a.route[0];
  const stageRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  // The pile of photos opens into the fan as it comes up the screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardFan.pileY = 0;
    const near = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setNear(true), { rootMargin: "50% 0px" });
    near.observe(stage);
    if (reduce) {
      cardFan.open = 1;
      return () => near.disconnect();
    }
    let ticking = false;
    const drive = () => {
      ticking = false;
      const vh = window.innerHeight;
      cardFan.open = easeInOut(clamp01((vh * 0.85 - stage.getBoundingClientRect().top) / (vh * 0.45)));
      cardFan.wake?.();
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(drive);
    };
    drive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      near.disconnect();
      window.removeEventListener("scroll", onScroll);
      cardFan.open = 1;
    };
  }, []);

  return (
    <PageFrame active="about">
      <header className={p.head}>
        <h1 className={p.aboutTitle}>{ab.title}</h1>
      </header>

      <div className={p.thenNow}>
        <figure data-show>
          <div className={p.photo} style={{ aspectRatio: "4 / 5" }}>
            <Image src={bikes.image} alt={ab.childhoodAlt} fill sizes="(max-width: 820px) 100vw, 40vw" quality={90} priority />
          </div>
          <figcaption>{ab.childhood}</figcaption>
        </figure>
        <figure data-show>
          <div className={p.photo} style={{ aspectRatio: "6 / 5" }}>
            <Image src="/images/site/sofa-wide.jpg" alt={a.portraitAlt} fill sizes="(max-width: 820px) 100vw, 55vw" quality={90} priority />
          </div>
          <figcaption>{ab.today}</figcaption>
        </figure>
      </div>

      <section className={p.prose} aria-label={ab.title.replace("\n", " ")}>
        {ab.intro.map((para) => (
          <p key={para.slice(0, 24)} data-show>
            {para}
          </p>
        ))}
      </section>

      <section className={p.block} aria-labelledby="why">
        <h2 id="why" className={p.sectionTitle} data-show>
          {ab.whyTitle}
        </h2>
        <div className={p.prose}>
          {ab.why.map((para) => (
            <p key={para.slice(0, 24)} data-show>
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className={p.block} aria-labelledby="bikes">
        <div className={p.chapter} data-show>
          <span className={p.place}>{bikes.place}</span>
          <h2 id="bikes" className={p.sectionTitle}>
            {bikes.title}
          </h2>
          <p>{bikes.body}</p>
        </div>
        <div className={p.pile} ref={stageRef}>
          <RouteCards images={[...a.album]} near={near} />
        </div>
      </section>

      <section className={`${p.block} ${p.end}`}>
        <p className={p.siri} data-show>
          {a.siri}
        </p>
        <Link className={p.bigLink} href="/work" data-show>
          {ab.seeWork}
          <ArrowRight aria-hidden="true" strokeWidth={1} />
        </Link>
      </section>
    </PageFrame>
  );
}
