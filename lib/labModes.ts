import type { Project } from "@/content/projects";

export function applyLabMode(stage: HTMLElement, project: Project) {
  const m = project.labMode;
  stage.style.setProperty("--mode-pulse",     m.pulse);
  stage.style.setProperty("--mode-scan-op",   String(m.scan));
  stage.style.setProperty("--mode-grid-op",   String(m.grid));
  stage.style.setProperty("--mode-blur",      m.blur + "px");
  stage.style.setProperty("--mode-sig-speed", m.sig);

  const h = project.hue;

  /* Per-project accent — changes card borders, button, labels, topology */
  stage.style.setProperty("--accent",      `hsl(${h}, 62%, 44%)`);
  stage.style.setProperty("--accent-soft", `hsl(${h}, 45%, 16%)`);
  stage.style.setProperty("--accent-glow", `hsla(${h}, 62%, 44%, 0.22)`);

  stage.style.background = "transparent";
}
