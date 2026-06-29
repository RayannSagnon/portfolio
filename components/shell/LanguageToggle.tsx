"use client";

import { usePathname } from "next/navigation";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";

type LanguageToggleProps = {
  lightMode?: boolean;
  compactMenu?: boolean;
};

export function LanguageToggle({ lightMode = false, compactMenu = true }: LanguageToggleProps) {
  const pathname = usePathname();
  const { locale, setLocale, ui } = useLocale();
  const offsetBack = pathname === "/about";

  const active = lightMode ? "#7f2635" : "#d6ad72";
  const muted = lightMode ? "rgba(92,58,25,0.34)" : "rgba(232,228,220,0.26)";
  const hoverInactive = lightMode ? "rgba(127,38,53,0.62)" : "rgba(214,173,114,0.68)";

  const setIfInactive = (next: Locale) => {
    if (locale !== next) setLocale(next);
  };

  return (
    <>
      <style>{`
        .lang-toggle {
          position: fixed;
          top: calc(22px + var(--safe-top));
          right: calc(22px + var(--safe-right));
          z-index: 61;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          user-select: none;
        }

        .lang-toggle button {
          background: none;
          border: none;
          padding: 0.5rem 0.2rem;
          margin: -0.5rem -0.2rem;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          transition: color 0.25s var(--ease);
          font: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
        }

        .lang-toggle button.is-active {
          cursor: default;
        }

        @media (hover: hover) and (pointer: fine) {
          .lang-toggle button:not(.is-active):hover,
          .lang-toggle button:not(.is-active):focus-visible {
            color: var(--lang-hover) !important;
            outline: none;
          }
        }

        .lang-toggle button:active:not(.is-active) {
          opacity: 0.75;
        }

        .lang-toggle .lang-sep {
          color: var(--lang-muted);
          pointer-events: none;
          font-weight: 400;
          letter-spacing: 0;
        }

        .lang-toggle.is-back-offset {
          right: 8.5rem;
        }

        @media (max-width: 860px) {
          .lang-toggle {
            top: calc(16px + var(--safe-top));
            right: calc(16px + var(--safe-right));
            font-size: 0.52rem;
            gap: 0.24rem;
          }

          .lang-toggle.is-menu-offset {
            right: 3.65rem;
          }

          .lang-toggle.is-back-offset {
            right: 3.65rem;
          }
        }
      `}</style>

      <div
        className={[
          "lang-toggle",
          compactMenu && "is-menu-offset",
          offsetBack && "is-back-offset",
        ]
          .filter(Boolean)
          .join(" ")}
        role="group"
        aria-label={ui.languageToggle}
        style={{
          ["--lang-muted" as string]: muted,
          ["--lang-hover" as string]: hoverInactive,
        }}
      >
        <button
          type="button"
          className={locale === "en" ? "is-active" : undefined}
          aria-current={locale === "en" ? "true" : undefined}
          aria-label="English"
          onClick={() => setIfInactive("en")}
          style={{ color: locale === "en" ? active : muted }}
        >
          EN
        </button>
        <span className="lang-sep" aria-hidden="true">
          /
        </span>
        <button
          type="button"
          className={locale === "fr" ? "is-active" : undefined}
          aria-current={locale === "fr" ? "true" : undefined}
          aria-label="Français"
          onClick={() => setIfInactive("fr")}
          style={{ color: locale === "fr" ? active : muted }}
        >
          FR
        </button>
      </div>
    </>
  );
}
