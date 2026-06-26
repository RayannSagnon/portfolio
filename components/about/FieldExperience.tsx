"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Briefcase,
  BookOpen,
  Code2,
  HeartHandshake,
  Leaf,
  Monitor,
  Palette,
  PenLine,
  Server,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  fieldExperienceIntro,
  fieldExperienceStats,
  fieldExperienceTypeLabels,
  fieldExperiences,
  type FieldExperienceEntry,
  type FieldExperienceMedia,
  type FieldExperienceType,
} from "@/content/fieldExperience";

const TYPE_ACCENT: Record<FieldExperienceType, string> = {
  professional: "var(--story-red)",
  volunteer: "var(--story-cream)",
  leadership: "var(--story-muted)",
  student: "rgba(232,228,220,0.42)",
};

const ENTRY_ICONS: Record<string, LucideIcon> = {
  "online-training-assistant": BookOpen,
  "it-support-assistant": Monitor,
  leagler: Users,
  "free-store-volunteer": Leaf,
  "it-facilities-coordinator": Server,
  "magazine-editor": PenLine,
  "web-development-intern": Code2,
  "charity-club-board": HeartHandshake,
};

type GroupedYear = {
  year: number;
  entries: FieldExperienceEntry[];
};

function groupByTimelineYear(entries: FieldExperienceEntry[]): GroupedYear[] {
  const groups: GroupedYear[] = [];

  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (!last || last.year !== entry.timelineYear) {
      groups.push({ year: entry.timelineYear, entries: [entry] });
    } else {
      last.entries.push(entry);
    }
  }

  return groups;
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
          <div className="field-modal-media">
            {media.src ? (
              <Image
                src={media.src}
                alt={media.title}
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
                className="field-modal-image"
              />
            ) : (
              <div className="field-modal-placeholder">
                <span>{media.title}</span>
              </div>
            )}
          </div>

          <div className="field-modal-copy">
            <h3 id="field-modal-title">{media.title}</h3>
            <p className="field-modal-caption">{media.caption}</p>

            <dl className="field-modal-details">
              <div>
                <dt>Context</dt>
                <dd>{media.detail.context}</dd>
              </div>
              <div>
                <dt>Problem</dt>
                <dd>{media.detail.problem}</dd>
              </div>
              <div>
                <dt>What I did</dt>
                <dd>{media.detail.approach}</dd>
              </div>
              <div>
                <dt>Result</dt>
                <dd>{media.detail.outcome}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  entry,
  onOpenMedia,
}: {
  entry: FieldExperienceEntry;
  onOpenMedia: (media: FieldExperienceMedia) => void;
}) {
  const Icon = ENTRY_ICONS[entry.id] ?? Monitor;
  const accent = TYPE_ACCENT[entry.type];
  const primaryMedia = entry.media?.[0];

  return (
    <article className="field-card" data-story-reveal>
      <div className="field-card-accent" style={{ background: accent }} aria-hidden />
      <div className="field-card-inner">
        <header className="field-card-header">
          <div className="field-card-heading">
            <span className="field-card-type">{fieldExperienceTypeLabels[entry.type]}</span>
            <h3>{entry.title}</h3>
            <p className="field-card-org">{entry.organization}</p>
            <p className="field-card-period">
              {entry.period}
              {entry.location ? ` · ${entry.location}` : ""}
            </p>
          </div>
          <div className="field-card-icon" aria-hidden>
            <Icon size={18} strokeWidth={1.5} />
          </div>
        </header>

        {entry.coverImage ? (
          <div className="field-card-cover">
            <Image
              src={entry.coverImage}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 720px"
              className="field-card-cover-image"
            />
          </div>
        ) : null}

        <p className="field-card-headline">{entry.headline}</p>

        <div className="field-card-block">
          <span className="field-card-label">Mission</span>
          <p>{entry.mission}</p>
        </div>

        <div className="field-card-block">
          <span className="field-card-label">Skills</span>
          <div className="field-chip-row">
            {entry.skills.map((skill) => (
              <span className="field-chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="field-card-block">
          <span className="field-card-label">Skills developed</span>
          <div className="field-chip-row field-chip-row-muted">
            {entry.skillsDeveloped.map((skill) => (
              <span className="field-chip field-chip-muted" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="field-card-block">
          <span className="field-card-label">Impact</span>
          <ul className="field-impact-list">
            {entry.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {primaryMedia ? (
          <button
            type="button"
            className="field-media-trigger"
            onClick={() => onOpenMedia(primaryMedia)}
          >
            <div className="field-media-preview">
              {primaryMedia.src ? (
                <Image
                  src={primaryMedia.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="field-media-preview-image"
                />
              ) : (
                <span className="field-media-preview-fallback" aria-hidden>
                  <Icon size={16} strokeWidth={1.5} />
                </span>
              )}
            </div>
            <div className="field-media-copy">
              <strong>{primaryMedia.title}</strong>
              <span>{primaryMedia.caption}</span>
            </div>
            <span className="field-media-action">
              Read more
              <ArrowUpRight size={12} strokeWidth={1.6} />
            </span>
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function FieldExperience() {
  const [activeMedia, setActiveMedia] = useState<FieldExperienceMedia | null>(null);
  const grouped = useMemo(() => groupByTimelineYear(fieldExperiences), []);

  return (
    <div className="field-experience">
      <style>{`
        .field-experience {
          margin-top: clamp(4rem, 8vh, 6rem);
        }

        .field-experience-head {
          margin-bottom: 1.25rem;
        }

        .field-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .field-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.75rem;
          margin-bottom: clamp(3rem, 6vh, 4.5rem);
        }

        .field-stat {
          padding: 1.1rem 1rem;
          border: 1px solid rgba(232,228,220,0.1);
          border-radius: 8px;
          background: rgba(255,255,255,0.018);
        }

        .field-stat strong {
          display: block;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--fg);
        }

        .field-stat span {
          display: block;
          margin-top: 0.45rem;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.62rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .field-intro-divider {
          display: grid;
          gap: 0.35rem;
          margin-bottom: clamp(2.5rem, 5vh, 3.5rem);
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(232,228,220,0.08);
        }

        .field-intro-divider h3 {
          margin: 0;
          font-size: clamp(1.6rem, 2.8vw, 2.35rem);
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

        .field-timeline {
          position: relative;
          display: grid;
          gap: clamp(2.5rem, 5vh, 3.5rem);
        }

        .field-timeline::before {
          content: "";
          position: absolute;
          left: 0.55rem;
          top: 0.4rem;
          bottom: 0.4rem;
          width: 1px;
          background: linear-gradient(
            180deg,
            rgba(138,42,58,0.55) 0%,
            rgba(232,228,220,0.14) 42%,
            rgba(232,228,220,0.06) 100%
          );
        }

        .field-year-group {
          display: grid;
          gap: 1.25rem;
          padding-left: 2rem;
        }

        .field-year-label {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--story-red-strong);
        }

        .field-year-label::before {
          content: "";
          position: absolute;
          left: -1.45rem;
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 50%;
          background: var(--story-red);
          box-shadow: 0 0 0 0.45rem rgba(138,42,58,0.14);
        }

        .field-year-entries {
          display: grid;
          gap: 1rem;
        }

        .field-card {
          position: relative;
          border: 1px solid rgba(232,228,220,0.11);
          border-radius: 10px;
          overflow: hidden;
          background:
            linear-gradient(145deg, rgba(138,42,58,0.08), transparent 42%),
            rgba(255,255,255,0.02);
          box-shadow: 0 18px 55px rgba(0,0,0,0.22);
        }

        .field-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
        }

        .field-card-inner {
          padding: clamp(1.2rem, 2vw, 1.6rem) clamp(1.2rem, 2vw, 1.6rem) clamp(1.2rem, 2vw, 1.5rem) calc(clamp(1.2rem, 2vw, 1.6rem) + 0.35rem);
        }

        .field-card-header {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: flex-start;
        }

        .field-card-type {
          display: inline-block;
          margin-bottom: 0.55rem;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .field-card-heading h3 {
          margin: 0;
          font-size: clamp(1.35rem, 2.2vw, 1.85rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .field-card-org {
          margin: 0.45rem 0 0;
          color: rgba(232,228,220,0.82);
          font-size: 0.95rem;
        }

        .field-card-period {
          margin: 0.3rem 0 0;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.64rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .field-card-icon {
          display: grid;
          place-items: center;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.12);
          color: var(--story-cream);
          background: rgba(255,255,255,0.03);
          flex-shrink: 0;
        }

        .field-card-cover {
          position: relative;
          margin-top: 1rem;
          min-height: 11rem;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(232,228,220,0.08);
        }

        .field-card-cover-image {
          object-fit: cover;
        }

        .field-card-headline {
          margin: 1rem 0 0;
          color: rgba(232,228,220,0.9);
          font-size: 1rem;
          line-height: 1.55;
          font-weight: 400;
        }

        .field-card-block {
          margin-top: 1.1rem;
        }

        .field-card-label {
          display: block;
          margin-bottom: 0.45rem;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .field-card-block p {
          margin: 0;
          color: var(--fg-dim);
          line-height: 1.6;
          font-weight: 300;
        }

        .field-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .field-chip {
          display: inline-flex;
          align-items: center;
          min-height: 1.75rem;
          padding: 0 0.65rem;
          border-radius: 999px;
          border: 1px solid rgba(138,42,58,0.28);
          background: rgba(138,42,58,0.1);
          color: rgba(232,228,220,0.9);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .field-chip-muted {
          border-color: rgba(232,228,220,0.12);
          background: rgba(255,255,255,0.03);
          color: var(--story-muted);
        }

        .field-impact-list {
          margin: 0;
          padding-left: 1rem;
          color: var(--fg-dim);
          line-height: 1.65;
          font-weight: 300;
        }

        .field-impact-list li + li {
          margin-top: 0.35rem;
        }

        .field-media-trigger {
          width: 100%;
          margin-top: 1.15rem;
          padding: 0.85rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.85rem;
          align-items: center;
          border: 1px solid rgba(232,228,220,0.1);
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
          color: inherit;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.25s var(--ease), background 0.25s var(--ease), transform 0.25s var(--ease);
        }

        .field-media-trigger:hover,
        .field-media-trigger:focus-visible {
          border-color: rgba(214,173,114,0.34);
          background: rgba(255,255,255,0.035);
          transform: translateY(-2px);
          outline: none;
        }

        .field-media-preview {
          position: relative;
          width: 4.5rem;
          height: 3.4rem;
          border-radius: 6px;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          flex-shrink: 0;
        }

        .field-media-preview-image {
          object-fit: cover;
        }

        .field-media-preview-fallback {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          color: var(--story-muted);
        }

        .field-media-copy {
          display: grid;
          gap: 0.2rem;
          min-width: 0;
        }

        .field-media-copy strong {
          font-size: 0.82rem;
          color: var(--fg);
        }

        .field-media-copy span {
          color: var(--story-muted);
          font-size: 0.76rem;
          line-height: 1.45;
        }

        .field-media-action {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
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
          width: min(1080px, 100%);
          max-height: min(88vh, 920px);
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
        }

        .field-modal-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        }

        .field-modal-media {
          position: relative;
          min-height: 22rem;
          background:
            radial-gradient(circle at 70% 24%, rgba(138,42,58,0.16), transparent 42%),
            rgba(255,255,255,0.02);
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
          padding: clamp(1.2rem, 2.5vw, 1.8rem);
          border-left: 1px solid rgba(232,228,220,0.08);
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

        .field-modal-details {
          display: grid;
          gap: 1rem;
          margin: 1.4rem 0 0;
        }

        .field-modal-details dt {
          margin-bottom: 0.25rem;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .field-modal-details dd {
          margin: 0;
          color: var(--fg-dim);
          line-height: 1.65;
          font-weight: 300;
        }

        @media (max-width: 980px) {
          .field-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .field-modal-layout {
            grid-template-columns: 1fr;
          }

          .field-modal-copy {
            border-left: none;
            border-top: 1px solid rgba(232,228,220,0.08);
          }
        }

        @media (max-width: 620px) {
          .field-year-group {
            padding-left: 1.5rem;
          }

          .field-media-trigger {
            grid-template-columns: 1fr;
          }

          .field-media-action {
            justify-self: start;
          }
        }
      `}</style>

      <div className="field-experience-head" data-story-reveal>
        <span className="field-eyebrow">
          <Briefcase size={13} strokeWidth={1.6} />
          {fieldExperienceIntro.eyebrow}
        </span>
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

      <div className="field-timeline">
        {grouped.map((group) => (
          <section className="field-year-group" key={group.year} aria-label={`${group.year}`}>
            <h4 className="field-year-label" data-story-reveal>
              {group.year}
            </h4>
            <div className="field-year-entries">
              {group.entries.map((entry) => (
                <ExperienceCard
                  key={entry.id}
                  entry={entry}
                  onOpenMedia={setActiveMedia}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {activeMedia ? (
        <ExperienceModal media={activeMedia} onClose={() => setActiveMedia(null)} />
      ) : null}
    </div>
  );
}
