import type { CSSProperties } from "react";

export const archiveBackground = "#ead8bf";

export type ArchiveThemeStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};

export const archiveCaramelTheme: ArchiveThemeStyle = {
  background: archiveBackground,
  color: "#17110c",
  ["--fg"]: "#17110c",
  ["--fg-dim"]: "#5d4935",
  ["--fg-faint"]: "#8b7057",
  ["--line"]: "rgba(70,45,24,0.12)",
  ["--line-strong"]: "rgba(70,45,24,0.24)",
  ["--accent"]: "#7f2635",
  ["--article-text"]: "#17110c",
  ["--article-muted"]: "#67513b",
  ["--article-faint"]: "#96795d",
  ["--article-line-strong"]: "rgba(92,58,25,0.16)",
  ["--article-pill-bg"]: "rgba(255,247,235,0.76)",
  ["--article-surface"]: "rgba(255,241,219,0.88)",
  ["--article-surface-soft"]: "rgba(248,223,190,0.46)",
  ["--article-surface-low"]: "rgba(132,78,30,0.045)",
  ["--article-shadow"]: "0 22px 56px rgba(84,53,25,0.12)",
  ["--article-shadow-hover"]:
    "0 30px 76px rgba(84,53,25,0.19), 0 0 30px hsla(var(--article-hue), 52%, 42%, 0.08)",
  ["--article-accent-lightness"]: "34%",
  ["--article-accent-hover-lightness"]: "29%",
};
