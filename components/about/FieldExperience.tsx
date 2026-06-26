"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, Briefcase, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  type FieldExperienceDocument,
  type FieldExperienceEntry,
  type FieldExperienceMedia,
  type FieldExperienceType,
} from "@/content/fieldExperience";
import { useContent, useUI } from "@/lib/i18n/LocaleProvider";

const DocumentFlipbook = dynamic(
  () => import("@/components/about/DocumentFlipbook").then((mod) => mod.DocumentFlipbook),
  { ssr: false, loading: () => <DocumentFlipbookLoading /> },
);

function DocumentFlipbookLoading() {
  const ui = useUI();
  return (
    <div style={{ marginTop: "1.1rem", color: "var(--story-muted)", fontFamily: "var(--font-jetbrains), monospace", fontSize: "0.62rem", textTransform: "uppercase" }}>
      {ui.loadingPreview}
    </div>
  );
}

const SKILL_COLLAPSED_COUNT = 4;

const TYPE_ACCENT: Record<FieldExperienceType, string> = {
  professional: "#a33f4d",
  volunteer: "#e8e4dc",
  leadership: "#8a8580",
  student: "#d6ad72",
};

type TimelineEntry = FieldExperienceEntry & {
  isFirstOfYear: boolean;
};

function buildTimelineEntries(entries: readonly FieldExperienceEntry[]): TimelineEntry[] {
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

function entryStory(entry: FieldExperienceEntry): string | null {
  const media = entry.media?.[0];
  if (media?.detail) return mediaNarrative(media);
  return null;
}

function useBodyScrollLock() {
  useEffect(() => {
    const scrollY = window.scrollY;
    const { style } = document.body;
    const root = document.documentElement;
    const lenis = window.__lenis;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    lenis?.stop();
    root.classList.add("field-modal-open");

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      style.overflow = previous.overflow;
      root.classList.remove("field-modal-open");
      lenis?.start();
      window.scrollTo(0, scrollY);
    };
  }, []);
}

function useModalScrollAssist() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const modal = scrollEl.closest<HTMLElement>(".field-modal");
    if (!modal) return;

    const onWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(max-width: 980px)").matches) return;

      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (maxScroll <= 0) return;

      event.preventDefault();
      scrollEl.scrollTop = Math.min(
        maxScroll,
        Math.max(0, scrollEl.scrollTop + event.deltaY),
      );
    };

    modal.addEventListener("wheel", onWheel, { passive: false });
    return () => modal.removeEventListener("wheel", onWheel);
  }, []);

  return scrollRef;
}

function useModalDismiss(onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock();

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return closeRef;
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
  const closeRef = useModalDismiss(onClose);
  const scrollRef = useModalScrollAssist();

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

        <div ref={scrollRef} className="field-modal-scroll">
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
    </div>
  );
}

function DocumentsModal({
  entry,
  documents,
  onClose,
}: {
  entry: FieldExperienceEntry;
  documents: FieldExperienceDocument[];
  onClose: () => void;
}) {
  const closeRef = useModalDismiss(onClose);
  const scrollRef = useModalScrollAssist();
  const story = entryStory(entry);

  return (
    <div className="field-modal-root" role="presentation" onClick={onClose}>
      <div
        className="field-modal field-modal-documents"
        role="dialog"
        aria-modal="true"
        aria-labelledby="field-doc-modal-title"
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

        <div ref={scrollRef} className="field-modal-scroll">
        <div className="field-modal-layout field-modal-documents-layout">
          <div className="field-modal-documents-preview">
            <DocumentFlipbook documents={documents} embedded />
          </div>

          <div className="field-modal-copy field-modal-copy-documents">
            <h3 id="field-doc-modal-title">
              {entry.title} · {entry.organization}
            </h3>
            <p className="field-modal-caption">{entry.summary}</p>
            {story ? <p className="field-modal-story">{story}</p> : null}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export function FieldExperience() {
  const { fieldExperience } = useContent();
  const { fieldExperienceIntro, fieldExperienceStats, fieldExperiences } = fieldExperience;
  const ui = useUI();
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<Record<string, HTMLElement | null>>({});

  const [activeMedia, setActiveMedia] = useState<FieldExperienceMedia | null>(null);
  const [activeDocumentPreview, setActiveDocumentPreview] = useState<{
    entry: FieldExperienceEntry;
    documents: FieldExperienceDocument[];
  } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(fieldExperiences[0]?.id ?? null);
  const activeIdRef = useRef<string | null>(fieldExperiences[0]?.id ?? null);

  const timelineEntries = useMemo(
    () => buildTimelineEntries(fieldExperiences as readonly FieldExperienceEntry[]),
    [fieldExperiences],
  );

  useEffect(() => {
    const root = rootRef.current;
    const rail = railRef.current;
    const progress = progressRef.current;
    if (!root || !rail || !progress) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncActiveEntry = () => {
      const focusY = window.innerHeight * 0.42;
      const hysteresis = 56;

      let nearestId: string | null = null;
      let nearestDist = Infinity;

      fieldExperiences.forEach((entry) => {
        const node = entryRefs.current[entry.id];
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const anchor = rect.top + Math.min(rect.height * 0.38, 72);
        const dist = Math.abs(anchor - focusY);

        if (dist < nearestDist) {
          nearestDist = dist;
          nearestId = entry.id;
        }
      });

      if (!nearestId) return;

      const currentId = activeIdRef.current;
      if (currentId && currentId !== nearestId) {
        const currentNode = entryRefs.current[currentId];
        if (currentNode) {
          const rect = currentNode.getBoundingClientRect();
          const currentAnchor = rect.top + Math.min(rect.height * 0.38, 72);
          const currentDist = Math.abs(currentAnchor - focusY);
          if (currentDist <= nearestDist + hysteresis) {
            nearestId = currentId;
          }
        }
      }

      if (nearestId !== activeIdRef.current) {
        activeIdRef.current = nearestId;
        setActiveId(nearestId);
      }
    };

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        syncActiveEntry();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    syncActiveEntry();

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
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      context?.revert();
    };
  }, [fieldExperiences]);

  const openEntryPreview = (entry: FieldExperienceEntry) => {
    if (entry.documents?.length) {
      setActiveDocumentPreview({ entry, documents: entry.documents });
      return;
    }

    const media = entry.media?.[0];
    if (media?.src) setActiveMedia(media);
  };

  return (
    <div className="field-experience" ref={rootRef}>
      <style>{`
        .field-experience {
          margin-top: clamp(2.75rem, 5vh, 4rem);
        }

        .field-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.85rem;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.66rem;
          text-transform: uppercase;
        }

        .field-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.5rem;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
        }

        .field-stat {
          padding: 0.65rem 0.75rem;
          border: 1px solid rgba(232,228,220,0.08);
          border-radius: 8px;
          background: rgba(255,255,255,0.015);
        }

        .field-stat strong {
          display: block;
          font-size: clamp(1.35rem, 2.4vw, 1.75rem);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .field-stat span {
          display: block;
          margin-top: 0.28rem;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.54rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .field-intro-divider {
          display: grid;
          gap: 0.25rem;
          margin-bottom: clamp(1.35rem, 2.5vh, 1.85rem);
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(232,228,220,0.08);
        }

        .field-intro-divider h3 {
          margin: 0;
          font-size: clamp(1.2rem, 2vw, 1.55rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          font-weight: 900;
        }

        .field-intro-divider p {
          margin: 0;
          color: var(--story-muted);
          font-size: 0.88rem;
          line-height: 1.5;
          font-weight: 300;
        }

        .field-rail {
          position: relative;
          display: grid;
          gap: 0;
          --field-date-col: 5.6rem;
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
          gap: 0 0.75rem;
          align-items: start;
          padding: 0.2rem 0;
        }

        .field-row-date {
          padding-top: 0.32rem;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.56rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.35;
          transition: color 0.3s var(--ease);
        }

        .field-row-year {
          display: block;
          margin-bottom: 0.18rem;
          color: var(--story-red-strong);
          font-size: 0.64rem;
          letter-spacing: 0.09em;
          transition: color 0.3s var(--ease), text-shadow 0.3s var(--ease);
        }

        .field-row.is-active .field-row-year {
          color: #d6ad72;
          text-shadow: 0 0 18px rgba(214,173,114,0.28);
        }

        .field-row-body {
          position: relative;
          padding: 0.5rem 0.7rem 0.58rem;
          border-radius: 8px;
          border: 1px solid transparent;
          transition:
            background 0.35s var(--ease),
            border-color 0.35s var(--ease);
        }

        .field-row-body--clickable {
          width: 100%;
          margin: 0;
          padding: 0.5rem 0.7rem 0.58rem;
          border: 1px solid transparent;
          text-align: left;
          font: inherit;
          color: inherit;
          background: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }

        .field-row-body--clickable:hover {
          background: rgba(255,255,255,0.02);
          border-color: rgba(232,228,220,0.06);
        }

        .field-row-body--clickable:focus-visible {
          outline: 1px solid rgba(214,173,114,0.45);
          outline-offset: 2px;
        }

        .field-row.is-active .field-row-body,
        .field-row.is-active .field-row-body--clickable:hover {
          background: rgba(255,255,255,0.028);
          border-color: rgba(232,228,220,0.1);
        }

        .field-row.is-active .field-row-date {
          color: rgba(232,228,220,0.82);
        }

        .field-row-title {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.25rem;
          margin: 0;
          font-size: clamp(0.88rem, 1.2vw, 0.98rem);
          line-height: 1.3;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: rgba(232,228,220,0.72);
          transition: color 0.3s var(--ease);
        }

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
          margin: 0.38rem 0 0;
          max-width: 58ch;
          color: var(--fg-dim);
          font-size: 0.82rem;
          line-height: 1.5;
          font-weight: 300;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          transition: color 0.3s var(--ease);
        }

        .field-row.is-active .field-row-summary {
          color: rgba(232,228,220,0.88);
        }

        .field-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.28rem;
          margin-top: 0.5rem;
        }

        .field-chip {
          display: inline-flex;
          align-items: center;
          min-height: 1.35rem;
          padding: 0 0.45rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.12);
          background: rgba(255,255,255,0.02);
          color: rgba(232,228,220,0.68);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.5rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: color 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease);
        }

        .field-chip-more {
          color: rgba(232,228,220,0.42);
          border-style: dashed;
        }

        .field-row.is-active .field-chip {
          color: rgba(232,228,220,0.88);
          border-color: color-mix(in srgb, var(--row-accent, #a33f4d) 34%, rgba(232,228,220,0.12));
          background: color-mix(in srgb, var(--row-accent, #a33f4d) 10%, rgba(255,255,255,0.02));
        }

        .field-row-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.42rem;
          color: var(--story-red-strong);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s var(--ease), transform 0.3s var(--ease), color 0.3s var(--ease);
          pointer-events: none;
        }

        .field-row.is-active .field-row-link,
        .field-row-has-preview .field-row-link {
          opacity: 1;
          transform: translateY(0);
        }

        .field-row-body--clickable:hover .field-row-link {
          color: #d6ad72;
        }

        .field-modal-root {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: grid;
          place-items: center;
          padding: 1rem;
          overflow: hidden;
          overscroll-behavior: none;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .field-modal {
          position: relative;
          display: flex;
          flex-direction: column;
          width: min(760px, 100%);
          max-height: min(78vh, 680px);
          overflow: hidden;
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
          min-height: 0;
          flex: 1;
          overflow: hidden;
        }

        .field-modal-scroll {
          display: contents;
        }

        .field-modal-documents-layout {
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
        }

        .field-modal-media {
          position: relative;
          min-height: 14rem;
          overflow-y: auto;
          overscroll-behavior: contain;
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
          padding-right: 2.75rem;
          overflow-y: auto;
          overscroll-behavior: contain;
          border-right: 1px solid rgba(232,228,220,0.08);
        }

        .field-modal-copy-documents {
          border-right: none;
          border-left: 1px solid rgba(232,228,220,0.08);
        }

        .field-modal-documents-preview {
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: clamp(0.85rem, 1.6vw, 1.1rem);
          padding-right: 0.55rem;
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
          width: min(900px, 100%);
          max-height: min(78vh, 680px);
          overflow: hidden;
          padding: 0;
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

          .field-modal {
            max-height: min(92dvh, 720px);
          }

          .field-modal-scroll {
            display: block;
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-y;
          }

          .field-modal-layout,
          .field-modal-documents-layout {
            display: flex;
            flex-direction: column;
            overflow: visible;
            min-height: auto;
          }

          .field-modal-copy {
            border-right: none;
            border-bottom: 1px solid rgba(232,228,220,0.08);
            overflow: visible;
          }

          .field-modal-copy-documents {
            border-left: none;
            border-top: 1px solid rgba(232,228,220,0.08);
            border-bottom: none;
            overflow: visible;
          }

          .field-modal-documents-layout .field-modal-documents-preview {
            order: -1;
            overflow: visible;
          }

          .field-modal-media {
            border-top: 1px solid rgba(232,228,220,0.08);
            overflow: visible;
          }
        }

        @media (max-width: 720px) {
          .field-rail {
            --field-date-col: 4.2rem;
          }

          .field-row-body {
            padding: 0.45rem 0.55rem 0.52rem;
          }

          .field-row-link {
            opacity: 1;
            transform: none;
          }

          .field-chip {
            font-size: 0.58rem;
            padding: 0.42rem 0.75rem;
            min-height: 2rem;
          }

          .field-stat strong {
            font-size: clamp(1.35rem, 6vw, 1.75rem);
          }

          .field-stat span {
            font-size: 0.58rem;
          }
        }

        @media (max-width: 480px) {
          .field-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.4rem;
          }

          .field-stat {
            padding: 0.55rem 0.6rem;
          }

          .field-rail {
            --field-date-col: 3.5rem;
          }

          .field-row {
            gap: 0 0.5rem;
          }

          .field-modal,
          .field-modal-documents {
            width: 100%;
            max-height: min(92dvh, 720px);
            border-radius: 10px;
          }

          .field-modal-root {
            padding: 0.5rem;
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
          const isActive = activeId === entry.id;
          const visibleSkills = entry.skills.slice(0, SKILL_COLLAPSED_COUNT);
          const hiddenSkillCount = entry.skills.length - visibleSkills.length;
          const RowBody = hasPreview ? "button" : "div";
          const rowBodyProps = hasPreview
            ? {
                type: "button" as const,
                onClick: () => openEntryPreview(entry),
                "aria-label": `${ui.seeMore}: ${entry.title} · ${entry.organization}`,
              }
            : {};

          return (
            <article
              key={entry.id}
              ref={(node) => {
                entryRefs.current[entry.id] = node;
              }}
              className={[
                "field-row",
                hasPreview ? "field-row-has-preview" : "",
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-field-entry
              data-entry-id={entry.id}
              style={{ "--row-accent": accent } as CSSProperties}
            >
              <div className="field-row-date">
                {entry.isFirstOfYear ? (
                  <span className="field-row-year">{entry.timelineYear}</span>
                ) : null}
                <span>{entry.dateLabel}</span>
              </div>
              <RowBody
                className={[
                  "field-row-body",
                  hasPreview ? "field-row-body--clickable" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                {...rowBodyProps}
              >
                <h3 className="field-row-title">
                  <span>
                    {entry.title} · {entry.organization}
                  </span>
                </h3>
                <p className="field-row-summary">{entry.summary}</p>
                <div className="field-chip-row">
                  {visibleSkills.map((skill) => (
                    <span className="field-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                  {hiddenSkillCount > 0 ? (
                    <span className="field-chip field-chip-more">+{hiddenSkillCount}</span>
                  ) : null}
                </div>
                {hasPreview ? (
                  <span className="field-row-link" aria-hidden>
                    {ui.seeMore}
                    <ArrowUpRight size={12} strokeWidth={1.6} />
                  </span>
                ) : null}
              </RowBody>
            </article>
          );
        })}
      </div>

      {activeDocumentPreview ? (
        <DocumentsModal
          entry={activeDocumentPreview.entry}
          documents={activeDocumentPreview.documents}
          onClose={() => setActiveDocumentPreview(null)}
        />
      ) : null}

      {activeMedia ? (
        <ExperienceModal media={activeMedia} onClose={() => setActiveMedia(null)} />
      ) : null}
    </div>
  );
}
