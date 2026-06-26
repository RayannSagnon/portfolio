"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, Briefcase, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fieldExperienceIntro,
  fieldExperienceStats,
  fieldExperiences,
  type FieldExperienceDocument,
  type FieldExperienceEntry,
  type FieldExperienceMedia,
  type FieldExperienceType,
} from "@/content/fieldExperience";

const DocumentFlipbook = dynamic(
  () => import("@/components/about/DocumentFlipbook").then((mod) => mod.DocumentFlipbook),
  {
    ssr: false,
    loading: () => (
      <div style={{ marginTop: "1.1rem", color: "var(--story-muted)", fontFamily: "var(--font-jetbrains), monospace", fontSize: "0.62rem", textTransform: "uppercase" }}>
        Loading preview
      </div>
    ),
  },
);

const TYPE_ACCENT: Record<FieldExperienceType, string> = {
  professional: "#a33f4d",
  volunteer: "#e8e4dc",
  leadership: "#8a8580",
  student: "#d6ad72",
};

type TimelineEntry = FieldExperienceEntry & {
  isFirstOfYear: boolean;
};

function buildTimelineEntries(entries: FieldExperienceEntry[]): TimelineEntry[] {
  return entries.map((entry, index) => ({
    ...entry,
    isFirstOfYear:
      index === 0 || entry.timelineYear !== entries[index - 1].timelineYear,
  }));
}

function mediaNarrative(media: FieldExperienceMedia) {
  const { context, problem, approach, outcome } = media.detail;
  return [context, problem, approach, outcome].join(" ");
}

function entryHasPreview(entry: FieldExperienceEntry): boolean {
  if (entry.documents?.length) return true;
  return Boolean(entry.media?.[0]?.src);
}

function ExperienceModal({
  media,
  onClose,
}: {
  media: FieldExperienceMedia;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="field-modal-root" role="presentation" onClick={onClose}>
      <div
        className="field-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="field-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="field-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={16} strokeWidth={1.6} />
        </button>

        <div className="field-modal-layout">
          <div className="field-modal-copy">
            <h3 id="field-modal-title">{media.title}</h3>
            <p className="field-modal-caption">{media.caption}</p>
            <p className="field-modal-story">{mediaNarrative(media)}</p>
          </div>

          <div className="field-modal-media">
            {media.src ? (
              <Image
                src={media.src}
                alt={media.title}
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                className="field-modal-image"
              />
            ) : (
              <div className="field-modal-placeholder">
                <span>{media.title}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsModal({
  documents,
  onClose,
}: {
  documents: FieldExperienceDocument[];
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="field-modal-root" role="presentation" onClick={onClose}>
      <div
        className="field-modal field-modal-documents"
        role="dialog"
        aria-modal="true"
        aria-label="Document preview"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="field-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={16} strokeWidth={1.6} />
        </button>
        <DocumentFlipbook documents={documents} embedded />
      </div>
    </div>
  );
}

export function FieldExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<Record<string, HTMLElement | null>>({});

  const [activeMedia, setActiveMedia] = useState<FieldExperienceMedia | null>(null);
  const [activeDocuments, setActiveDocuments] = useState<FieldExperienceDocument[] | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const timelineEntries = useMemo(() => buildTimelineEntries(fieldExperiences), []);

  useEffect(() => {
    const root = rootRef.current;
    const rail = railRef.current;
    const progress = progressRef.current;
    if (!root || !rail || !progress) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    const entryObserver = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const id = visible[0].target.getAttribute("data-entry-id");
          if (id) setActiveId(id);
        }
      },
      { rootMargin: "-32% 0px -48% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    fieldExperiences.forEach((entry) => {
      const node = entryRefs.current[entry.id];
      if (node) entryObserver.observe(node);
    });
    observers.push(entryObserver);

    let context: gsap.Context | undefined;

    if (!reducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      const lastEntry = root.querySelector<HTMLElement>("[data-field-entry]:last-child");

      context = gsap.context(() => {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rail,
              start: "top 70%",
              endTrigger: lastEntry ?? rail,
              end: "bottom bottom",
              scrub: 0.45,
            },
          },
        );

        root.querySelectorAll<HTMLElement>("[data-field-entry]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
              },
            },
          );
        });
      }, root);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      context?.revert();
    };
  }, []);

  const openEntryPreview = (entry: FieldExperienceEntry) => {
    if (entry.documents?.length) {
      setActiveDocuments(entry.documents);
      return;
    }

    const media = entry.media?.[0];
    if (media?.src) setActiveMedia(media);
  };

  return (
    <div className="field-experience" ref={rootRef}>
      <style>{`
        .field-experience {
          margin-top: clamp(4rem, 8vh, 6rem);
        }

        .field-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.25rem;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .field-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.75rem;
          margin-bottom: clamp(2.5rem, 5vh, 3.5rem);
        }

        .field-stat {
          padding: 1rem;
          border: 1px solid rgba(232,228,220,0.08);
          border-radius: 8px;
          background: rgba(255,255,255,0.015);
          transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
        }

        .field-stat:hover {
          border-color: rgba(138,42,58,0.28);
          background: rgba(138,42,58,0.06);
        }

        .field-stat strong {
          display: block;
          font-size: clamp(1.7rem, 3vw, 2.2rem);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .field-stat span {
          display: block;
          margin-top: 0.4rem;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.6rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .field-intro-divider {
          display: grid;
          gap: 0.35rem;
          margin-bottom: clamp(2.5rem, 5vh, 3.25rem);
          padding-bottom: 1.35rem;
          border-bottom: 1px solid rgba(232,228,220,0.08);
        }

        .field-intro-divider h3 {
          margin: 0;
          font-size: clamp(1.55rem, 2.6vw, 2.2rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          font-weight: 900;
        }

        .field-intro-divider p {
          margin: 0;
          color: var(--story-muted);
          font-size: 1rem;
          line-height: 1.6;
          font-weight: 300;
        }

        .field-rail {
          position: relative;
          display: grid;
          gap: 0.15rem;
          --field-date-col: 6.5rem;
        }

        .field-rail-track {
          position: absolute;
          left: var(--field-date-col);
          top: 0.35rem;
          bottom: 0;
          width: 1px;
          transform: translateX(-50%);
          background: rgba(232,228,220,0.1);
          pointer-events: none;
        }

        .field-rail-progress {
          position: absolute;
          inset: 0;
          transform-origin: top center;
          background: linear-gradient(180deg, #a33f4d 0%, rgba(163,63,77,0.35) 100%);
        }

        .field-row {
          position: relative;
          display: grid;
          grid-template-columns: var(--field-date-col) 1fr;
          gap: 0 1rem;
          align-items: start;
          padding: 0.55rem 0;
        }

        .field-row-date {
          padding-top: 0.45rem;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.45;
          transition: color 0.3s var(--ease);
        }

        .field-row-year {
          display: block;
          margin-bottom: 0.28rem;
          color: var(--story-red-strong);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          transition: color 0.3s var(--ease), text-shadow 0.3s var(--ease);
        }

        .field-row.is-active .field-row-year,
        .field-row.is-hovered .field-row-year {
          color: #d6ad72;
          text-shadow: 0 0 18px rgba(214,173,114,0.28);
        }

        .field-row-body {
          position: relative;
          padding: 0.85rem 1rem 1rem;
          border-radius: 10px;
          border: 1px solid transparent;
          transition:
            background 0.35s var(--ease),
            border-color 0.35s var(--ease),
            transform 0.35s var(--ease),
            opacity 0.35s var(--ease);
        }

        .field-row.is-hovered .field-row-body,
        .field-row.is-active .field-row-body {
          background: rgba(255,255,255,0.028);
          border-color: rgba(232,228,220,0.1);
        }

        .field-row.is-hovered .field-row-body {
          transform: translateX(4px);
        }

        .field-row.is-dimmed {
          opacity: 0.46;
        }

        .field-row.is-active .field-row-date,
        .field-row.is-hovered .field-row-date {
          color: rgba(232,228,220,0.82);
        }

        .field-row-title {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem;
          margin: 0;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: rgba(232,228,220,0.72);
          transition: color 0.3s var(--ease);
        }

        .field-row.is-hovered .field-row-title,
        .field-row.is-active .field-row-title {
          color: var(--row-accent, #e8e4dc);
        }

        .field-row-title button {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0;
          border: none;
          background: none;
          color: inherit;
          font: inherit;
          text-align: left;
          cursor: pointer;
        }

        .field-row-title button:focus-visible {
          outline: 1px solid rgba(214,173,114,0.5);
          outline-offset: 3px;
          border-radius: 2px;
        }

        .field-row-summary {
          margin: 0.7rem 0 0;
          max-width: 62ch;
          color: var(--fg-dim);
          font-size: 0.96rem;
          line-height: 1.72;
          font-weight: 300;
        }

        .field-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.95rem;
        }

        .field-chip {
          display: inline-flex;
          align-items: center;
          min-height: 1.65rem;
          padding: 0 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.12);
          background: rgba(255,255,255,0.02);
          color: rgba(232,228,220,0.68);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.56rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: color 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease);
        }

        .field-row.is-hovered .field-chip,
        .field-row.is-active .field-chip {
          color: rgba(232,228,220,0.88);
          border-color: color-mix(in srgb, var(--row-accent, #a33f4d) 34%, rgba(232,228,220,0.12));
          background: color-mix(in srgb, var(--row-accent, #a33f4d) 10%, rgba(255,255,255,0.02));
        }

        .field-row-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.75rem;
          padding: 0;
          border: none;
          background: none;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s var(--ease), transform 0.3s var(--ease), color 0.3s var(--ease);
        }

        .field-row.is-hovered .field-row-link,
        .field-row.is-active .field-row-link,
        .field-row-has-preview .field-row-link {
          opacity: 1;
          transform: translateY(0);
        }

        .field-row-link:hover,
        .field-row-link:focus-visible {
          color: #d6ad72;
          outline: none;
        }

        .field-modal-root {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: grid;
          place-items: center;
          padding: 1rem;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .field-modal {
          position: relative;
          width: min(760px, 100%);
          max-height: min(78vh, 680px);
          overflow: auto;
          border: 1px solid rgba(232,228,220,0.12);
          border-radius: 12px;
          background: #090808;
          box-shadow: 0 30px 90px rgba(0,0,0,0.55);
        }

        .field-modal-close {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          border: 1px solid rgba(232,228,220,0.14);
          border-radius: 999px;
          background: rgba(7,7,7,0.82);
          color: var(--fg-dim);
          cursor: pointer;
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease);
        }

        .field-modal-close:hover,
        .field-modal-close:focus-visible {
          color: var(--fg);
          border-color: rgba(232,228,220,0.3);
          background: rgba(20,18,17,0.92);
          outline: none;
        }

        .field-modal-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
        }

        .field-modal-media {
          position: relative;
          min-height: 14rem;
          background: rgba(255,255,255,0.02);
        }

        .field-modal-image {
          object-fit: contain;
        }

        .field-modal-placeholder {
          display: grid;
          place-items: center;
          min-height: inherit;
          padding: 2rem;
          color: var(--story-muted);
          text-align: center;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .field-modal-copy {
          padding: clamp(1rem, 2vw, 1.35rem);
          border-right: 1px solid rgba(232,228,220,0.08);
        }

        .field-modal-copy h3 {
          margin: 0;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          line-height: 1.15;
        }

        .field-modal-caption {
          margin: 0.7rem 0 0;
          color: var(--story-muted);
          line-height: 1.6;
          font-weight: 300;
        }

        .field-modal-story {
          margin: 1.1rem 0 0;
          color: var(--fg-dim);
          line-height: 1.75;
          font-weight: 300;
        }

        .field-modal-documents {
          width: min(640px, 100%);
          max-height: min(80vh, 700px);
          overflow: auto;
          padding: 0.85rem 3.4rem 1rem 1rem;
        }

        .field-modal-documents .doc-flipbook {
          margin-top: 0;
          border: none;
          background: transparent;
          padding: 0;
        }

        .field-modal-documents .field-modal-close {
          top: 0.7rem;
          right: 0.7rem;
        }

        @media (max-width: 980px) {
          .field-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .field-modal-layout {
            grid-template-columns: 1fr;
          }

          .field-modal-copy {
            border-right: none;
            border-bottom: 1px solid rgba(232,228,220,0.08);
          }

          .field-modal-media {
            border-top: 1px solid rgba(232,228,220,0.08);
          }
        }

        @media (max-width: 720px) {
          .field-rail {
            --field-date-col: 4.7rem;
          }

          .field-row-body {
            padding: 0.75rem 0.65rem 0.85rem;
          }

          .field-row-link {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="field-eyebrow" data-story-reveal>
        <Briefcase size={13} strokeWidth={1.6} />
        {fieldExperienceIntro.eyebrow}
      </div>

      <div className="field-stats" data-story-reveal>
        {fieldExperienceStats.map((stat) => (
          <div className="field-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="field-intro-divider" data-story-reveal>
        <h3>{fieldExperienceIntro.title}</h3>
        <p>{fieldExperienceIntro.subtitle}</p>
      </div>

      <div className="field-rail" ref={railRef}>
        <div className="field-rail-track" aria-hidden>
          <div className="field-rail-progress" ref={progressRef} />
        </div>

        {timelineEntries.map((entry) => {
          const hasPreview = entryHasPreview(entry);
          const accent = TYPE_ACCENT[entry.type];
          const isHovered = hoveredId === entry.id;
          const isActive = activeId === entry.id;
          const isDimmed = Boolean(hoveredId && hoveredId !== entry.id);

          return (
            <article
              key={entry.id}
              ref={(node) => {
                entryRefs.current[entry.id] = node;
              }}
              className={[
                "field-row",
                hasPreview ? "field-row-has-preview" : "",
                isHovered ? "is-hovered" : "",
                isActive ? "is-active" : "",
                isDimmed ? "is-dimmed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-field-entry
              data-entry-id={entry.id}
              style={{ "--row-accent": accent } as CSSProperties}
              onMouseEnter={() => setHoveredId(entry.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="field-row-date">
                {entry.isFirstOfYear ? (
                  <span className="field-row-year">{entry.timelineYear}</span>
                ) : null}
                <span>{entry.dateLabel}</span>
              </div>
              <div className="field-row-body">
                <h3 className="field-row-title">
                  <span>
                    {entry.title} · {entry.organization}
                  </span>
                </h3>
                <p className="field-row-summary">{entry.summary}</p>
                <div className="field-chip-row">
                  {entry.skills.map((skill) => (
                    <span className="field-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
                {hasPreview ? (
                  <button
                    type="button"
                    className="field-row-link"
                    onClick={() => openEntryPreview(entry)}
                  >
                    See more
                    <ArrowUpRight size={12} strokeWidth={1.6} />
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {activeDocuments ? (
        <DocumentsModal
          documents={activeDocuments}
          onClose={() => setActiveDocuments(null)}
        />
      ) : null}

      {activeMedia ? (
        <ExperienceModal media={activeMedia} onClose={() => setActiveMedia(null)} />
      ) : null}
    </div>
  );
}
