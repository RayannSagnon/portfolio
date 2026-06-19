"use client";

import type { ReactNode } from "react";

export const SECTION_LIP_HEIGHT = "clamp(32px, 5.2vw, 56px)";

type SectionCurveEndProps = {
  children: ReactNode;
  bg?: string;
};

/** Rounded bottom edge + shadow on a section that scrolls away normally. */
export function SectionCurveEnd({ children, bg = "var(--bg)" }: SectionCurveEndProps) {
  return (
    <div className="section-curve-end">
      <style>{`
        .section-curve-end__shell {
          position: relative;
          filter: drop-shadow(0 34px 64px rgba(0, 0, 0, 0.58));
        }

        .section-curve-end__body {
          position: relative;
          z-index: 1;
        }

        .section-curve-end__lip {
          position: relative;
          z-index: 1;
          height: ${SECTION_LIP_HEIGHT};
          margin-top: -1px;
          border-radius: 0 0 50% 50% / 0 0 ${SECTION_LIP_HEIGHT} ${SECTION_LIP_HEIGHT};
        }
      `}</style>

      <div className="section-curve-end__shell">
        <div className="section-curve-end__body" style={{ backgroundColor: bg }}>
          {children}
        </div>
        <div className="section-curve-end__lip" style={{ backgroundColor: bg }} aria-hidden />
      </div>
    </div>
  );
}
