"use client";

import { useMemo, type CSSProperties } from "react";
import MagicBento, { type MagicBentoItem } from "./MagicBento";
import s from "./site.module.css";

const BENTO_STYLE = {
  "--mb-surface": "#17171a",
  "--mb-shadow": "none",
  "--mb-pad": "calc(20 * var(--u))",
  gridTemplateRows: "calc(200 * var(--u)) calc(160 * var(--u)) calc(64 * var(--u))",
  gap: "calc(10 * var(--u))",
} as CSSProperties;

/** Lab skills lead at the largest size; what was used in projects and at work follows, then the course. */
export function SkillsBento({ skills, course }: { skills: readonly (readonly [string, string])[]; course: readonly [string, string] }) {
  const items = useMemo<MagicBentoItem[]>(
    () => [
      ...skills.map(([name, detail], i) => ({
        id: name,
        colSpan: i < 2 ? 3 : 2,
        content: (
          <div className={i < 2 ? `${s.tile} ${s.tileLead}` : s.tile}>
            <h3>{name}</h3>
            <p>{detail}</p>
          </div>
        ),
      })),
      {
        id: course[0],
        colSpan: 6,
        content: (
          <div className={`${s.tile} ${s.tileRow}`}>
            <h3>{course[0]}</h3>
            <p>{course[1]}</p>
          </div>
        ),
      },
    ],
    [skills, course],
  );

  return <MagicBento items={items} columns={6} gap={10} radius={0} glowColor="#f5f5f2" textAutoHide={false} intro={false} style={BENTO_STYLE} />;
}
