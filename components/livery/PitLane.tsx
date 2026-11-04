"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { KartSvg } from "./KartSvg";
import p from "./PitLane.module.css";

/**
 * The pit lane along the bottom: one mark per [data-pit] stop on the page, in order;
 * the kart shows where you are and the marks drive you there.
 */
export function PitLane({ marks }: { marks: readonly string[] }) {
  const label = useLocale().ui.livery.pitLane.label;
  return (
    <nav className={p.lane} data-pitlane aria-label={label}>
      <div className={p.track} aria-hidden="true" />
      <ol className={p.marks}>
        {marks.map((mark) => (
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
