"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { PageFrame } from "./PageFrame";
import p from "./pages.module.css";

/** The kits, told as a story: why I started there, then each build with its photos. */
export function KitsPage() {
  const { ui } = useLocale();
  const copy = ui.siteCopy;
  const k = copy.kitsPage;

  return (
    <PageFrame active="work">
      <article>
        <header className={p.storyHead}>
          <div className={p.storyIntro}>
            <p className={p.crumb}>
              <Link href="/work">{copy.nav.work}</Link>
              <span aria-hidden="true">/</span>
              <span>{k.crumb}</span>
            </p>
            <h1 className={p.storyTitle}>{k.title}</h1>
            <p className={p.lead}>{k.lead}</p>
            <dl className={p.meta}>
              {k.meta.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={`${p.photo} ${p.storyHero}`}>
            <Image src="/images/kits/car-floor.jpg" alt={k.heroAlt} fill sizes="(max-width: 820px) 100vw, 50vw" quality={90} priority />
          </div>
        </header>

        <section className={p.block} aria-labelledby="why-kits">
          <h2 id="why-kits" className={p.sectionTitle} data-show>
            {k.whyTitle}
          </h2>
          <div className={p.prose}>
            {k.why.map((para) => (
              <p key={para.slice(0, 24)} data-show>
                {para}
              </p>
            ))}
          </div>
          <h3 className={p.listTitle} data-show>
            {k.reasonsTitle}
          </h3>
          <ul className={p.reasons}>
            {k.reasons.map(([head, body]) => (
              <li key={head} data-show>
                <b>{head}</b>
                <p>{body}</p>
              </li>
            ))}
          </ul>
          <p className={p.closing} data-show>
            {k.closing}
          </p>
        </section>

        <section className={p.block} aria-labelledby="car">
          <div className={p.build}>
            <div className={p.buildText} data-show>
              <h2 id="car" className={p.sectionTitle}>
                {k.carTitle}
              </h2>
              <p>{k.car}</p>
            </div>
            <figure className={p.buildImage} data-show>
              <div className={p.photo} style={{ aspectRatio: "1320 / 1098" }}>
                <Image src="/images/kits/car-labelled.jpg" alt={k.carAlt} fill sizes="(max-width: 820px) 100vw, 62vw" quality={90} />
              </div>
            </figure>
          </div>
        </section>

        <section className={p.block} aria-labelledby="arm">
          <div className={p.build}>
            <div className={p.buildText} data-show>
              <h2 id="arm" className={p.sectionTitle}>
                {k.armTitle}
              </h2>
              <p>{k.arm}</p>
            </div>
            <div className={p.armGrid}>
              {["arm-labelled", "arm-above", "arm-side"].map((src, i) => (
                <figure key={src} className={i === 0 ? p.armMain : undefined} data-show>
                  <div className={p.photo} style={{ aspectRatio: "3 / 4" }}>
                    <Image src={`/images/kits/${src}.jpg`} alt={k.armAlt[i]} fill sizes={i === 0 ? "(max-width: 820px) 100vw, 40vw" : "(max-width: 820px) 50vw, 20vw"} quality={90} />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <nav className={`${p.block} ${p.end}`} aria-label={k.next}>
          <Link className={p.bigLink} href="/projects/tachometer">
            {k.next}
            <ArrowRight aria-hidden="true" strokeWidth={1} />
          </Link>
        </nav>
      </article>
    </PageFrame>
  );
}
