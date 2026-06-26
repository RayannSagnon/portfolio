"use client";

import { useUI } from "@/lib/i18n/LocaleProvider";

type Props = {
  href: string;
  label?: string;
};

export function ProjectRepoLink({ href, label }: Props) {
  const ui = useUI();
  const linkLabel = label ?? ui.viewOnGitHub;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        alignSelf: "flex-start",
        padding: "0.62rem 0.95rem",
        borderRadius: 999,
        border: "1px solid var(--line-strong)",
        background: "rgba(255,255,255,0.02)",
        color: "var(--fg)",
        textDecoration: "none",
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 9,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        transition: "border-color 0.28s var(--ease), color 0.28s var(--ease), background 0.28s var(--ease)",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = "rgba(232,228,220,0.28)";
        event.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = "var(--line-strong)";
        event.currentTarget.style.background = "rgba(255,255,255,0.02)";
      }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
      {linkLabel}
    </a>
  );
}
