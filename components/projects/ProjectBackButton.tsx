"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUI } from "@/lib/i18n/LocaleProvider";

export function ProjectBackButton() {
  const router = useRouter();
  const ui = useUI();

  return (
    <>
      <style>{`
        .project-back-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.62rem 0.95rem 0.62rem 0.82rem;
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          background: rgba(255,255,255,0.02);
          color: var(--fg-dim);
          cursor: pointer;
          overflow: hidden;
          isolation: isolate;
          font-family: var(--font-jetbrains), monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition:
            transform 0.28s var(--ease),
            border-color 0.28s var(--ease),
            color 0.28s var(--ease),
            background 0.28s var(--ease),
            box-shadow 0.28s var(--ease);
        }

        .project-back-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
            circle at 0% 50%,
            rgba(138,42,58,0.22),
            transparent 62%
          );
          opacity: 0;
          transition: opacity 0.28s var(--ease);
          pointer-events: none;
        }

        .project-back-btn-icon,
        .project-back-btn-label {
          position: relative;
          z-index: 1;
          transition: transform 0.28s var(--ease), color 0.28s var(--ease);
        }

        .project-back-btn:hover,
        .project-back-btn:focus-visible {
          transform: translateX(-3px);
          border-color: rgba(138,42,58,0.45);
          background: rgba(138,42,58,0.1);
          color: var(--fg);
          box-shadow: 0 10px 28px rgba(0,0,0,0.22);
          outline: none;
        }

        .project-back-btn:hover::before,
        .project-back-btn:focus-visible::before {
          opacity: 1;
        }

        .project-back-btn:hover .project-back-btn-icon,
        .project-back-btn:focus-visible .project-back-btn-icon {
          transform: translateX(-3px);
          color: #d4a8b0;
        }

        .project-back-btn:active {
          transform: translateX(-1px) scale(0.98);
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }

        @media (prefers-reduced-motion: reduce) {
          .project-back-btn,
          .project-back-btn-icon,
          .project-back-btn::before {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <button
        type="button"
        className="project-back-btn"
        onClick={() => {
          try {
            sessionStorage.setItem("rs_scroll_target", "projects");
          } catch {}
          router.push("/", { scroll: false });
        }}
      >
        <ArrowLeft
          className="project-back-btn-icon"
          size={13}
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="project-back-btn-label">{ui.back}</span>
      </button>
    </>
  );
}
