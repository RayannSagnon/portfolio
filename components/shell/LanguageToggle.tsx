"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

type LanguageToggleProps = {
  lightMode?: boolean;
  compactMenu?: boolean;
};

export function LanguageToggle({ lightMode = false, compactMenu = true }: LanguageToggleProps) {
  const { locale, toggleLocale, ui } = useLocale();

  const border = lightMode ? "rgba(92,58,25,0.32)" : "rgba(163,63,77,0.42)";
  const borderHover = lightMode ? "rgba(92,58,25,0.5)" : "rgba(214,173,114,0.55)";
  const bg = lightMode ? "rgba(242,219,187,0.94)" : "rgba(7,7,7,0.55)";
  const bgHover = lightMode ? "rgba(255,239,216,0.98)" : "rgba(20,18,17,0.82)";
  const text = lightMode ? "#7f2635" : "#d6ad72";
  const textHover = lightMode ? "#17110c" : "#f0ebe3";

  return (
    <>
      <style>{`
        .lang-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 61;
          display: grid;
          place-items: center;
          width: 2.35rem;
          height: 2.35rem;
          border-radius: 999px;
          border: 1px solid var(--lang-border);
          background: var(--lang-bg);
          color: var(--lang-text);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition:
            color 0.28s var(--ease),
            border-color 0.28s var(--ease),
            background 0.28s var(--ease),
            transform 0.28s var(--ease),
            box-shadow 0.28s var(--ease);
        }

        .lang-toggle:hover,
        .lang-toggle:focus-visible {
          color: var(--lang-text-hover);
          border-color: var(--lang-border-hover);
          background: var(--lang-bg-hover);
          transform: translateY(-1px);
          outline: none;
          box-shadow: 0 8px 24px rgba(0,0,0,0.22);
        }

        .lang-toggle:active {
          transform: translateY(0);
        }

        @media (max-width: 860px) {
          .lang-toggle.is-menu-offset {
            right: 88px;
          }
        }
      `}</style>

      <button
        type="button"
        className={`lang-toggle${compactMenu ? " is-menu-offset" : ""}`}
        aria-label={ui.languageToggle}
        onClick={toggleLocale}
        style={{
          ["--lang-border" as string]: border,
          ["--lang-border-hover" as string]: borderHover,
          ["--lang-bg" as string]: bg,
          ["--lang-bg-hover" as string]: bgHover,
          ["--lang-text" as string]: text,
          ["--lang-text-hover" as string]: textHover,
        }}
      >
        {locale === "en" ? "EN" : "FR"}
      </button>
    </>
  );
}
