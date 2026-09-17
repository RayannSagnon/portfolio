"use client";

import Link from "next/link";
import { useContent, useUI } from "@/lib/i18n/LocaleProvider";

export function VentureSpotlight() {
  const { projects } = useContent();
  const ui = useUI();
  const venture = projects.find((p) => p.slug === "standout");
  if (!venture) return null;

  return (
    <section
      id="venture"
      data-section="VENTURE"
      className="venture-spotlight"
      aria-label={ui.venture.sectionLabel}
    >
      <style>{`
        .venture-spotlight {
          min-height: auto;
          padding: clamp(4.5rem, 10vh, 7rem) clamp(1.25rem, 6vw, 4.5rem) clamp(3.5rem, 8vh, 5.5rem);
          box-sizing: border-box;
        }

        .venture-spotlight-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: end;
        }

        .venture-eyebrow {
          font-family: var(--font-jetbrains), monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: hsl(172, 45%, 55%);
          margin-bottom: 0.85rem;
        }

        .venture-title {
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: var(--fg);
          margin: 0 0 0.65rem;
        }

        .venture-tag {
          font-family: var(--font-jetbrains), monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-faint);
          margin-bottom: 1rem;
        }

        .venture-blurb {
          max-width: 38ch;
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          line-height: 1.55;
          color: var(--fg-dim);
          font-weight: 300;
          margin: 0 0 1.35rem;
        }

        .venture-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 0.65rem;
          margin-bottom: 1.5rem;
        }

        .venture-chip {
          font-family: var(--font-jetbrains), monospace;
          font-size: 8px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-dim);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.45rem 0.7rem;
        }

        .venture-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .venture-btn {
          appearance: none;
          border: 1px solid rgba(255,255,255,0.18);
          background: transparent;
          color: var(--fg);
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 0.7rem 1.15rem;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .venture-btn--primary {
          background: hsl(172, 42%, 28%);
          border-color: hsl(172, 42%, 38%);
        }

        .venture-btn:hover {
          border-color: hsl(172, 45%, 55%);
        }

        .venture-aside {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1.25rem;
        }

        .venture-aside p {
          margin: 0 0 0.85rem;
          font-size: 0.92rem;
          line-height: 1.55;
          color: var(--fg-dim);
          font-weight: 300;
        }

        .venture-aside p:last-child {
          margin-bottom: 0;
          color: var(--fg-faint);
          font-family: var(--font-jetbrains), monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        @media (max-width: 860px) {
          .venture-spotlight-inner {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }
      `}</style>

      <div className="venture-spotlight-inner">
        <div>
          <p className="venture-eyebrow">{ui.venture.eyebrow}</p>
          <h2 className="venture-title">{venture.name}</h2>
          <p className="venture-tag">{venture.tag}</p>
          <p className="venture-blurb">{venture.blurb}</p>
          <div className="venture-meta">
            {ui.venture.chips.map((chip) => (
              <span key={chip} className="venture-chip">
                {chip}
              </span>
            ))}
          </div>
          <div className="venture-actions">
            <Link
              href={`/projects/${venture.slug}`}
              className="venture-btn venture-btn--primary"
            >
              {ui.venture.openCase}
            </Link>
            {venture.repoUrl ? (
              <a
                className="venture-btn"
                href="https://standoutstudio.ca"
                target="_blank"
                rel="noreferrer"
              >
                {ui.venture.visitSite}
              </a>
            ) : null}
          </div>
        </div>
        <aside className="venture-aside">
          <p>{ui.venture.aside}</p>
          <p>{ui.venture.asideMeta}</p>
        </aside>
      </div>
    </section>
  );
}
