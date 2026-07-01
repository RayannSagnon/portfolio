"use client";

import { useEffect, useRef } from "react";
import { useUI } from "@/lib/i18n/LocaleProvider";
import { useRouter } from "next/navigation";

function rememberProjectReturnTarget() {
  try {
    sessionStorage.setItem("rs_scroll_target", "projects");
  } catch {}
}

type FeaturedProjectData = {
  slug: string;
  code: string;
  name: string;
  tag: string;
  hue: number;
  blurb: string;
  cardImage?: string;
  repoUrl?: string;
  comingSoon?: boolean;
  tradeoffs: ReadonlyArray<readonly string[]>;
  highlights: ReadonlyArray<readonly string[]>;
};

type FeaturedProjectProps = {
  project: FeaturedProjectData;
};

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const ui = useUI();
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const hue = project.hue;

  const openProject = () => {
    if (project.comingSoon) return;
    rememberProjectReturnTarget();
    router.push(`/projects/${project.slug}`);
  };

  useEffect(() => {
    const dispatch = () => {
      window.dispatchEvent(
        new CustomEvent("carousel:active", {
          detail: {
            accent: `hsl(${hue}, 62%, 58%)`,
            accentSoft: `hsla(${hue}, 55%, 45%, 0.18)`,
          },
        })
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) dispatch();
        else window.dispatchEvent(new CustomEvent("carousel:leave"));
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [hue]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-section="PROJECTS"
      data-num="04"
      className="featured-project"
      style={{ ["--fp-hue" as string]: String(hue) }}
    >
      <style>{`
        .featured-project {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          /* Match iPhone mockup outer frame (519×1024 assets) */
          --mockup-radius-x: 17.25%;
          --mockup-radius-y: 8.75%;
        }

        .featured-project-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 70% at 72% 42%, hsla(var(--fp-hue), 42%, 15%, 0.9) 0%, transparent 58%),
            radial-gradient(ellipse 60% 50% at 18% 78%, hsla(var(--fp-hue), 30%, 8%, 0.55) 0%, transparent 62%),
            #030303;
        }

        .featured-project-grid {
          position: relative;
          z-index: 2;
          width: min(100%, calc(var(--content-max) + 4rem));
          margin: 0 auto;
          min-height: 100svh;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
          grid-template-areas:
            "eyebrow visual"
            "copy visual";
          gap: clamp(2rem, 5vw, 4.5rem) clamp(2rem, 4vw, 4rem);
          align-items: center;
          padding:
            calc(var(--safe-top) + 5.5rem)
            var(--section-pad-x)
            calc(var(--safe-bottom) + 3rem);
          box-sizing: border-box;
        }

        .featured-project-eyebrow {
          grid-area: eyebrow;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem 1rem;
          align-self: end;
          margin-bottom: -0.35rem;
        }

        .featured-project-eyebrow span {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .featured-project-eyebrow .is-accent {
          color: hsl(var(--fp-hue), 58%, 58%);
        }

        .featured-project-eyebrow .is-muted {
          color: rgba(255, 255, 255, 0.22);
        }

        .featured-project-copy {
          grid-area: copy;
          align-self: start;
        }

        .featured-project-code {
          display: block;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: hsl(var(--fp-hue), 55%, 55%);
          margin-bottom: 0.85rem;
        }

        .featured-project-title {
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-weight: 900;
          font-size: clamp(2.35rem, 4.8vw, 4.25rem);
          line-height: 0.92;
          letter-spacing: -0.045em;
          color: #f0f0f0;
          margin: 0 0 0.85rem;
          max-width: 11ch;
        }

        .featured-project-tag {
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-size: clamp(0.82rem, 1.1vw, 1rem);
          color: rgba(240, 240, 240, 0.44);
          letter-spacing: 0.03em;
          line-height: 1.45;
          margin: 0 0 1.25rem;
          max-width: 34ch;
        }

        .featured-project-blurb {
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-size: clamp(0.92rem, 1.05vw, 1.05rem);
          color: rgba(240, 240, 240, 0.5);
          line-height: 1.68;
          font-weight: 300;
          margin: 0 0 1.65rem;
          max-width: 42ch;
        }

        .featured-project-notes {
          display: grid;
          gap: 0.55rem;
          margin: 0 0 1.75rem;
          padding-top: 1.15rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .featured-project-note {
          display: grid;
          grid-template-columns: 5.5rem minmax(0, 1fr);
          gap: 0.85rem;
          align-items: start;
        }

        .featured-project-note-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.52rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
          padding-top: 0.15rem;
        }

        .featured-project-note-value {
          font-size: 0.82rem;
          line-height: 1.5;
          color: rgba(240, 240, 240, 0.58);
        }

        .featured-project-highlights {
          display: grid;
          gap: 0.65rem;
          margin: 0 0 1.85rem;
        }

        .featured-project-highlight {
          padding-left: 0.85rem;
          border-left: 1px solid hsla(var(--fp-hue), 50%, 52%, 0.35);
        }

        .featured-project-highlight strong {
          display: block;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.52rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(var(--fp-hue), 58%, 62%);
          margin-bottom: 0.25rem;
        }

        .featured-project-highlight span {
          font-size: 0.84rem;
          line-height: 1.5;
          color: rgba(240, 240, 240, 0.62);
        }

        .featured-project-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .featured-project-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: var(--touch-min);
          padding: 0 1.35rem;
          border-radius: 999px;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.16s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          touch-action: manipulation;
        }

        .featured-project-btn--primary {
          border: 1px solid hsl(var(--fp-hue), 50%, 42%);
          background: transparent;
          color: hsl(var(--fp-hue), 62%, 62%);
        }

        .featured-project-btn--ghost {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(240, 240, 240, 0.62);
        }

        @media (hover: hover) and (pointer: fine) {
          .featured-project-btn--primary:hover {
            background: hsl(var(--fp-hue), 50%, 42%);
            color: #f0f0f0;
          }

          .featured-project-btn--ghost:hover {
            border-color: rgba(255, 255, 255, 0.28);
            color: rgba(240, 240, 240, 0.9);
          }
        }

        .featured-project-btn:active {
          transform: scale(0.97);
        }

        .featured-project-visual-wrap {
          grid-area: visual;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          isolation: isolate;
        }

        .featured-project-visual-wrap::before {
          content: "";
          position: absolute;
          width: min(100%, 26rem);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, hsla(var(--fp-hue), 65%, 55%, 0.16) 0%, transparent 72%);
          pointer-events: none;
        }

        .featured-project-visual-hint {
          display: none;
        }

        .featured-project-visual.has-image {
          width: auto;
          height: auto;
          max-width: min(100%, 21rem);
          aspect-ratio: auto;
          border: none;
          border-radius: var(--mockup-radius-x) / var(--mockup-radius-y);
          background: transparent;
          box-shadow: none;
          overflow: hidden;
          line-height: 0;
        }

        .featured-project-visual.has-image:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: transparent;
        }

        .featured-project-visual img {
          display: block;
          width: auto;
          height: auto;
          max-width: min(100%, 21rem);
          max-height: min(72vh, 40rem);
          object-fit: contain;
          object-position: center;
        }

        .featured-project-visual.has-image img {
          border-radius: inherit;
        }

        .featured-project-visual:not(.has-image) {
          width: min(100%, 19.5rem);
          aspect-ratio: 519 / 1024;
          border: 1px solid hsla(var(--fp-hue), 50%, 65%, 0.16);
          border-radius: 1.35rem;
          background: hsl(var(--fp-hue), 48%, 9%);
          box-shadow:
            0 28px 90px hsla(var(--fp-hue), 45%, 15%, 0.55),
            inset 0 1px 0 hsla(var(--fp-hue), 70%, 70%, 0.08);
          overflow: hidden;
        }

        .featured-project-visual:not(.has-image) img {
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
          object-fit: cover;
          filter: none;
        }

        .featured-project-visual {
          position: relative;
          padding: 0;
          cursor: pointer;
          appearance: none;
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.05, 1), border-color 0.25s ease;
        }

        .featured-project-visual:not(.has-image):hover {
          transform: translateY(-6px) scale(1.01);
          border-color: hsla(var(--fp-hue), 50%, 65%, 0.32);
        }

        .featured-project-visual-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.35rem 1.1rem;
          background:
            radial-gradient(ellipse 120% 80% at 70% 20%, hsla(var(--fp-hue), 65%, 55%, 0.14) 0%, transparent 58%),
            hsl(var(--fp-hue), 48%, 9%);
        }

        .featured-project-visual-code {
          position: absolute;
          right: -0.15rem;
          bottom: -0.35rem;
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-size: clamp(5rem, 12vw, 7rem);
          font-weight: 900;
          line-height: 1;
          color: hsla(var(--fp-hue), 40%, 28%, 0.14);
          letter-spacing: -0.06em;
          pointer-events: none;
        }

        .featured-project-visual-name {
          position: relative;
          z-index: 1;
          font-family: var(--font-inter-tight), system-ui, sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          color: #f0f0f0;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        @media (max-width: 860px) {
          .featured-project {
            min-height: auto;
          }

          .featured-project-bg {
            background:
              radial-gradient(ellipse 130% 48% at 50% 0%, hsla(var(--fp-hue), 44%, 18%, 0.95) 0%, transparent 62%),
              radial-gradient(ellipse 90% 40% at 50% 100%, hsla(var(--fp-hue), 28%, 8%, 0.45) 0%, transparent 58%),
              #030303;
          }

          .featured-project-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "eyebrow"
              "visual"
              "copy";
            gap: 0;
            min-height: auto;
            align-items: stretch;
            padding:
              calc(var(--safe-top) + 4.75rem)
              var(--section-pad-x)
              calc(var(--safe-bottom) + 2.25rem);
          }

          .featured-project-eyebrow {
            align-self: auto;
            margin: 0 0 1.35rem;
            gap: 0.45rem 0.75rem;
          }

          .featured-project-eyebrow .is-muted {
            display: block;
            width: 100%;
            font-size: 0.52rem;
            letter-spacing: 0.18em;
            line-height: 1.35;
          }

          .featured-project-visual-wrap {
            margin: 0 0 1.5rem;
            padding: 0.5rem 0 0.25rem;
          }

          .featured-project-visual-wrap::before {
            width: min(92vw, 22rem);
            top: 8%;
            left: 50%;
            transform: translateX(-50%);
          }

          .featured-project-visual.has-image img {
            max-width: min(78vw, 17.5rem);
            max-height: none;
            margin: 0 auto;
          }

          .featured-project-visual:active {
            transform: scale(0.985);
          }

          .featured-project-visual-hint {
            display: block;
            margin: 0.85rem 0 0;
            font-family: var(--font-jetbrains), monospace;
            font-size: 0.52rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.28);
            text-align: center;
          }

          .featured-project-code {
            margin-bottom: 0.55rem;
            font-size: 0.54rem;
          }

          .featured-project-title {
            max-width: none;
            font-size: clamp(2.35rem, 10.8vw, 3rem);
            line-height: 0.94;
            margin-bottom: 0.55rem;
          }

          .featured-project-tag {
            max-width: none;
            font-size: 0.84rem;
            margin-bottom: 0.95rem;
          }

          .featured-project-blurb {
            max-width: none;
            font-size: 0.92rem;
            line-height: 1.62;
            margin-bottom: 1.35rem;
          }

          .featured-project-notes {
            gap: 0.6rem;
            margin-bottom: 1.15rem;
            padding-top: 0;
            border-top: none;
          }

          .featured-project-note {
            grid-template-columns: 1fr;
            gap: 0.3rem;
            padding: 0.85rem 0.95rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.07);
            background: rgba(255, 255, 255, 0.025);
          }

          .featured-project-note-label {
            padding-top: 0;
            font-size: 0.5rem;
            color: hsl(var(--fp-hue), 52%, 58%);
          }

          .featured-project-note-value {
            font-size: 0.84rem;
            line-height: 1.48;
          }

          .featured-project-highlights {
            grid-template-columns: 1fr 1fr;
            gap: 0.6rem;
            margin-bottom: 1.35rem;
          }

          .featured-project-highlight {
            padding: 0.8rem 0.85rem;
            border-left: none;
            border: 1px solid hsla(var(--fp-hue), 42%, 52%, 0.22);
            border-radius: 12px;
            background: hsla(var(--fp-hue), 38%, 12%, 0.22);
          }

          .featured-project-highlight strong {
            font-size: 0.48rem;
            margin-bottom: 0.35rem;
          }

          .featured-project-highlight span {
            font-size: 0.78rem;
            line-height: 1.45;
          }

          .featured-project-actions {
            flex-direction: column;
            gap: 0.55rem;
            width: 100%;
          }

          .featured-project-btn {
            width: 100%;
            font-size: 0.56rem;
          }

          .featured-project-visual:not(.has-image) {
            width: min(72vw, 16rem);
          }
        }

        @media (max-width: 860px) and (max-height: 700px) {
          .featured-project-visual.has-image img {
            max-width: min(68vw, 14.5rem);
          }

          .featured-project-grid {
            padding-top: calc(var(--safe-top) + 4.25rem);
          }
        }

        @media (max-width: 380px) {
          .featured-project-highlights {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="featured-project-bg" aria-hidden />

      <div className="featured-project-grid">
        <div className="featured-project-eyebrow">
          <span className="is-accent">{ui.featured}</span>
          <span className="is-muted">{ui.nav.projectsHint}</span>
        </div>

        <div className="featured-project-visual-wrap">
          <button
            type="button"
            className={`featured-project-visual${project.cardImage ? " has-image" : ""}`}
            onClick={openProject}
            aria-label={ui.openProject(project.name)}
            disabled={project.comingSoon}
          >
            {project.cardImage ? (
              <img src={project.cardImage} alt="" draggable={false} />
            ) : (
              <div className="featured-project-visual-fallback">
                <span className="featured-project-visual-name">{project.name}</span>
              </div>
            )}
            {!project.cardImage ? (
              <span className="featured-project-visual-code" aria-hidden>
                {project.code}
              </span>
            ) : null}
          </button>
          {!project.comingSoon ? (
            <p className="featured-project-visual-hint">{ui.openPreview}</p>
          ) : null}
        </div>

        <div className="featured-project-copy">
          <span className="featured-project-code">{ui.projectLabel(project.code)}</span>
          <h2 className="featured-project-title">{project.name}</h2>
          <p className="featured-project-tag">{project.tag}</p>
          <p className="featured-project-blurb">{project.blurb}</p>

          {project.tradeoffs.length > 0 ? (
            <div className="featured-project-notes">
              {project.tradeoffs.map((pair) => {
                const [label, value] = pair;
                return (
                  <div key={label} className="featured-project-note">
                    <span className="featured-project-note-label">{label}</span>
                    <span className="featured-project-note-value">{value}</span>
                  </div>
                );
              })}
            </div>
          ) : null}

          {project.highlights.length > 0 ? (
            <div className="featured-project-highlights">
              {project.highlights.map((pair) => {
                const [label, value] = pair;
                return (
                  <div key={label} className="featured-project-highlight">
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="featured-project-actions">
            {!project.comingSoon ? (
              <button type="button" className="featured-project-btn featured-project-btn--primary" onClick={openProject}>
                {ui.openPreview}
              </button>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                className="featured-project-btn featured-project-btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.viewOnGitHub}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
