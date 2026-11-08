"use client";

import Link from "next/link";
import { useUI } from "@/lib/i18n/LocaleProvider";
import { SiteShell, TopNav } from "@/components/site/Shell";
import s from "@/components/site/site.module.css";

export function NotFoundClient() {
  const ui = useUI();
  return (
    <SiteShell active={null}>
      <TopNav active={null} brand="full" />
      <main className={s.notFound}>
        <h1 className={s.display}>{ui.notFound.title}</h1>
        <p className={s.role}>{ui.notFound.body}</p>
        <Link href="/" className={s.button}>
          {ui.notFound.backHome}
        </Link>
      </main>
    </SiteShell>
  );
}
