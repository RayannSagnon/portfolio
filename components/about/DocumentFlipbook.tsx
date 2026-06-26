"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import type { FieldExperienceDocument } from "@/content/fieldExperience";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type DocumentFlipbookProps = {
  documents: FieldExperienceDocument[];
};

export function DocumentFlipbook({ documents }: DocumentFlipbookProps) {
  const [docIndex, setDocIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [direction, setDirection] = useState(0);

  const active = documents[docIndex];
  const isPdf = active.kind === "pdf";

  useEffect(() => {
    setPage(1);
    setPageCount(active.kind === "image" ? 1 : 1);
    setDirection(0);
  }, [active.id, active.kind]);

  const goToPage = (nextPage: number) => {
    setDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
  };

  const goPrev = () => {
    if (page > 1) goToPage(page - 1);
  };

  const goNext = () => {
    if (page < pageCount) goToPage(page + 1);
  };

  return (
    <div className="doc-flipbook">
      <style>{`
        .doc-flipbook {
          margin-top: 1.1rem;
          padding: 0.9rem;
          border: 1px solid rgba(232,228,220,0.1);
          border-radius: 10px;
          background: rgba(255,255,255,0.018);
        }

        .doc-flipbook-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }

        .doc-flipbook-tab {
          border: 1px solid rgba(232,228,220,0.12);
          border-radius: 999px;
          background: transparent;
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.56rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.35rem 0.65rem;
          cursor: pointer;
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease);
        }

        .doc-flipbook-tab.is-active,
        .doc-flipbook-tab:hover,
        .doc-flipbook-tab:focus-visible {
          color: var(--fg);
          border-color: rgba(163,63,77,0.45);
          background: rgba(138,42,58,0.12);
          outline: none;
        }

        .doc-flipbook-head {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          align-items: flex-start;
          margin-bottom: 0.7rem;
        }

        .doc-flipbook-head h4 {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .doc-flipbook-head p {
          margin: 0.25rem 0 0;
          color: var(--story-muted);
          font-size: 0.78rem;
          line-height: 1.45;
          font-weight: 300;
        }

        .doc-flipbook-download {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          flex-shrink: 0;
          min-height: 1.9rem;
          padding: 0 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.14);
          color: var(--fg-dim);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.56rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease);
        }

        .doc-flipbook-download:hover,
        .doc-flipbook-download:focus-visible {
          color: var(--fg);
          border-color: rgba(214,173,114,0.38);
          background: rgba(255,255,255,0.03);
          outline: none;
        }

        .doc-flipbook-stage {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(232,228,220,0.08);
          background:
            radial-gradient(circle at 50% 0%, rgba(138,42,58,0.08), transparent 42%),
            rgba(0,0,0,0.35);
          min-height: clamp(16rem, 42vw, 24rem);
          display: grid;
          place-items: center;
          touch-action: pan-y;
        }

        .doc-flipbook-page {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0.75rem;
        }

        .doc-flipbook-page .react-pdf__Page {
          display: flex;
          justify-content: center;
        }

        .doc-flipbook-page .react-pdf__Page__canvas {
          max-width: 100%;
          height: auto !important;
          border-radius: 4px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }

        .doc-flipbook-image {
          width: auto;
          max-width: 100%;
          max-height: clamp(14rem, 38vw, 22rem);
          height: auto;
          border-radius: 4px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
          object-fit: contain;
        }

        .doc-flipbook-controls {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.8rem;
        }

        .doc-flipbook-arrow {
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          border-radius: 999px;
          border: 1px solid rgba(232,228,220,0.12);
          background: rgba(255,255,255,0.02);
          color: var(--fg-dim);
          cursor: pointer;
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease), opacity 0.25s var(--ease);
        }

        .doc-flipbook-arrow:hover:not(:disabled),
        .doc-flipbook-arrow:focus-visible:not(:disabled) {
          color: var(--fg);
          border-color: rgba(163,63,77,0.45);
          background: rgba(138,42,58,0.1);
          outline: none;
        }

        .doc-flipbook-arrow:disabled {
          opacity: 0.28;
          cursor: default;
        }

        .doc-flipbook-dots {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .doc-flipbook-dot {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          border: none;
          padding: 0;
          background: rgba(232,228,220,0.22);
          cursor: pointer;
          transition: transform 0.25s var(--ease), background 0.25s var(--ease);
        }

        .doc-flipbook-dot.is-active {
          transform: scale(1.25);
          background: var(--story-red-strong);
        }

        .doc-flipbook-dot:hover,
        .doc-flipbook-dot:focus-visible {
          background: rgba(214,173,114,0.72);
          outline: none;
        }

        .doc-flipbook-loading {
          color: var(--story-muted);
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      {documents.length > 1 ? (
        <div className="doc-flipbook-tabs" role="tablist" aria-label="Documents">
          {documents.map((document, index) => (
            <button
              key={document.id}
              type="button"
              role="tab"
              aria-selected={index === docIndex}
              className={`doc-flipbook-tab${index === docIndex ? " is-active" : ""}`}
              onClick={() => setDocIndex(index)}
            >
              {document.title}
            </button>
          ))}
        </div>
      ) : null}

      <div className="doc-flipbook-head">
        <div>
          <h4>{active.title}</h4>
          <p>{active.caption}</p>
        </div>
        <a
          className="doc-flipbook-download"
          href={active.src}
          download={active.downloadFileName}
        >
          <Download size={12} strokeWidth={1.6} />
          Download
        </a>
      </div>

      <div
        className="doc-flipbook-stage"
        onPointerDown={(event) => {
          (event.currentTarget as HTMLElement).dataset.dragX = String(event.clientX);
        }}
        onPointerUp={(event) => {
          const start = Number((event.currentTarget as HTMLElement).dataset.dragX ?? event.clientX);
          const delta = event.clientX - start;
          if (Math.abs(delta) < 42) return;
          if (delta < 0) goNext();
          else goPrev();
        }}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={`${active.id}-${page}`}
            className="doc-flipbook-page"
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 36 : -36, rotateY: direction >= 0 ? 8 : -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -36 : 36, rotateY: direction >= 0 ? -8 : 8 }}
            transition={{ duration: 0.34, ease: [0.2, 0.8, 0.05, 1] }}
          >
            {isPdf ? (
              <Document
                file={active.src}
                loading={<span className="doc-flipbook-loading">Loading pages</span>}
                onLoadSuccess={({ numPages }) => setPageCount(numPages)}
              >
                <Page
                  pageNumber={page}
                  width={560}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            ) : (
              <Image
                src={active.src}
                alt={active.title}
                width={900}
                height={1200}
                className="doc-flipbook-image"
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="doc-flipbook-controls">
        <button
          type="button"
          className="doc-flipbook-arrow"
          aria-label="Previous page"
          onClick={goPrev}
          disabled={page <= 1}
        >
          <ChevronLeft size={14} strokeWidth={1.6} />
        </button>

        <div className="doc-flipbook-dots" role="tablist" aria-label="Pages">
          {Array.from({ length: pageCount }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                type="button"
                role="tab"
                aria-label={`Page ${pageNumber}`}
                aria-selected={pageNumber === page}
                className={`doc-flipbook-dot${pageNumber === page ? " is-active" : ""}`}
                onClick={() => goToPage(pageNumber)}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="doc-flipbook-arrow"
          aria-label="Next page"
          onClick={goNext}
          disabled={page >= pageCount}
        >
          <ChevronRight size={14} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}
