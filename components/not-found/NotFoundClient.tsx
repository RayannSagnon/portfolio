"use client";

import Link from "next/link";
import { useUI } from "@/lib/i18n/LocaleProvider";
import { KartSvg } from "@/components/livery/KartSvg";
import { ArrowIcon, LiveryShell } from "@/components/livery/LiveryShell";
import s from "@/components/livery/LiveryHome.module.css";
import n from "./NotFound.module.css";

// Off the racing line: the kart has stopped facing the wrong way, and the way back is one link.
export function NotFoundClient() {
  const ui = useUI();
  return (
    <LiveryShell current="none">
      <section className={n.wrap} aria-labelledby="nf-title">
        <div className={n.stripe} aria-hidden="true" />
        <p className={n.code} aria-hidden="true">
          404
        </p>
        <h1 id="nf-title" className={n.title}>
          {ui.notFound.title}
        </h1>
        <p className={n.body}>{ui.notFound.body}</p>
        <Link href="/" className={s.textLink}>
          <ArrowIcon back />
          {ui.notFound.backHome}
        </Link>
        <div className={n.track} aria-hidden="true">
          <div className={n.kart}>
            <KartSvg />
          </div>
        </div>
      </section>
    </LiveryShell>
  );
}
