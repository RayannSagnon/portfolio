"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { KartSvg } from "./KartSvg";
import p from "./PitLane.module.css";

/** The pit lane along the bottom: one mark per stop on the page, the kart shows where you are. */
export function PitLane() {
  const t = useLocale().ui.livery.pitLane;
  return (
    <nav className={p.lane} data-pitlane aria-label={t.label}>
      <div className={p.track} aria-hidden="true" />
      <ol className={p.marks}>
        {t.marks.map((mark) => (
          <li key={mark}>
            <button type="button" className={p.mark} data-pitlane-mark>
              <span className={p.flag} aria-hidden="true" />
              <span className={p.name}>{mark}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className={p.kart} data-pitlane-kart aria-hidden="true">
        <KartSvg className={p.kartSvg} />
      </div>
    </nav>
  );
}
