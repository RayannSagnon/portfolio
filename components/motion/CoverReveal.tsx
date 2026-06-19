"use client";

import type { ReactNode } from "react";

type CoverRevealProps = {
  cover: ReactNode;
  under: ReactNode;
  coverZ: number;
  underZ: number;
  coverBg?: string;
};

export function CoverReveal({
  cover,
  under,
  coverZ,
  underZ,
  coverBg = "var(--bg)",
}: CoverRevealProps) {
  return (
    <div className="cover-reveal">
      <style>{`
        .cover-reveal__cover {
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .cover-reveal__shell {
          position: relative;
          filter: drop-shadow(0 34px 64px rgba(0, 0, 0, 0.58));
        }

        .cover-reveal__panel {
          margin-top: -24px;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          position: relative;
          z-index: 1;
          box-shadow: 0 -20px 56px rgba(0, 0, 0, 0.3);
        }

        .cover-reveal__lip {
          position: relative;
          z-index: 1;
          height: clamp(32px, 5.2vw, 56px);
          margin-top: -1px;
          border-radius: 0 0 50% 50% / 0 0 clamp(32px, 5.2vw, 56px) clamp(32px, 5.2vw, 56px);
        }

        .cover-reveal__under {
          position: relative;
          margin-top: calc(-1 * clamp(32px, 5.2vw, 56px));
          z-index: 1;
        }
      `}</style>

      <div className="cover-reveal__cover" style={{ zIndex: coverZ }}>
        <div className="cover-reveal__shell">
          <div className="cover-reveal__panel" style={{ backgroundColor: coverBg }}>
            {cover}
          </div>
          <div
            className="cover-reveal__lip"
            style={{ backgroundColor: coverBg }}
            aria-hidden
          />
        </div>
      </div>

      <div className="cover-reveal__under" style={{ zIndex: underZ }}>
        {under}
      </div>
    </div>
  );
}
