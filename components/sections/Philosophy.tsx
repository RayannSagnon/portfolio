"use client";
import { useRef, useEffect, useState, type MouseEvent } from "react";
import { useContent } from "@/lib/i18n/LocaleProvider";
import { Reveal } from "@/components/motion/Reveal";
import { GlassSurface } from "@/components/ui/GlassSurface";

type PopBurst = {
  id: number;
  x: number;
  y: number;
};

const MOBILE_MQ = "(max-width: 860px)";

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;
}

export function Philosophy() {
  const { philosophy } = useContent();
  const { axioms } = philosophy;
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs   = useRef<(HTMLParagraphElement | null)[]>([]);
  const glossRefs  = useRef<(HTMLParagraphElement | null)[]>([]);
  const boldRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const pillRef    = useRef<HTMLButtonElement>(null);

  const hasPositionedRef = useRef(false);
  const activeIdxRef     = useRef(-1);
  const isPoppingRef     = useRef(false);
  const updatePillRef    = useRef<(withTransition: boolean) => void>(() => {});
  const popTimersRef     = useRef<number[]>([]);

  const [activeIdx, setActiveIdx] = useState(-1);
  const [isPopping, setIsPopping] = useState(false);
  const [isRespawning, setIsRespawning] = useState(false);
  const [popBursts, setPopBursts] = useState<PopBurst[]>([]);

  const clearPopTimers = () => {
    popTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    popTimersRef.current = [];
  };

  const schedulePopTimer = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    popTimersRef.current.push(timer);
    return timer;
  };

  const handleEnter = (i: number) => {
    if (isMobileViewport()) return;
    const row   = rowRefs.current[i];
    const text  = textRefs.current[i];
    const gloss = glossRefs.current[i];
    if (row)   row.style.background = "rgba(255,255,255,0.03)";
    if (text)  text.style.transform = "translateX(10px)";
    if (gloss) gloss.style.opacity  = "1";
  };

  const handleLeave = (i: number) => {
    if (isMobileViewport()) return;
    const row   = rowRefs.current[i];
    const text  = textRefs.current[i];
    const gloss = glossRefs.current[i];
    if (row)   row.style.background = "";
    if (text)  text.style.transform = "";
    if (gloss) gloss.style.opacity  = "";
  };

  const handlePillPop = (event: MouseEvent<HTMLButtonElement>) => {
    const idx = activeIdxRef.current;
    const pill = pillRef.current;
    if (idx < 0 || !pill || isPoppingRef.current) return;

    const rect = pill.getBoundingClientRect();
    const burstId = Date.now();
    setPopBursts((current) => [
      ...current,
      { id: burstId, x: event.clientX - rect.left, y: event.clientY - rect.top },
      { id: burstId + 1, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);

    isPoppingRef.current = true;
    setIsPopping(true);
    pill.style.pointerEvents = "none";

    schedulePopTimer(() => {
      setPopBursts((current) => current.filter((burst) => burst.id !== burstId && burst.id !== burstId + 1));
    }, 520);

    schedulePopTimer(() => {
      isPoppingRef.current = false;
      setIsPopping(false);
      setIsRespawning(true);
      updatePillRef.current(false);

      schedulePopTimer(() => {
        setIsRespawning(false);
      }, 520);
    }, 380);
  };

  // Scroll-driven pill: desktop only
  useEffect(() => {
    const updatePill = (withTransition: boolean) => {
      const pill = pillRef.current;
      const idx  = activeIdxRef.current;
      if (!pill) return;

      if (idx < 0 || isPoppingRef.current) {
        pill.style.opacity = "0";
        pill.style.pointerEvents = "none";
        return;
      }

      const boldEl = boldRefs.current[idx];
      if (!boldEl) return;

      const rect = boldEl.getBoundingClientRect();

      if (withTransition && hasPositionedRef.current) {
        pill.style.transition = [
          "left 0.55s cubic-bezier(0.23,1,0.32,1)",
          "top 0.55s cubic-bezier(0.23,1,0.32,1)",
          "width 0.5s cubic-bezier(0.23,1,0.32,1)",
          "height 0.4s cubic-bezier(0.23,1,0.32,1)",
          "opacity 0.35s ease",
        ].join(", ");
      } else {
        pill.style.transition = hasPositionedRef.current
          ? "none"
          : "opacity 0.35s ease";
      }

      pill.style.left   = `${rect.left - 14}px`;
      pill.style.top    = `${rect.top  - 10}px`;
      pill.style.width  = `${rect.width + 28}px`;
      pill.style.height = `${rect.height + 20}px`;
      pill.style.opacity = "1";
      pill.style.pointerEvents = "auto";
      hasPositionedRef.current = true;
    };

    updatePillRef.current = updatePill;

    const findActive = () => {
      if (isMobileViewport()) {
        const pill = pillRef.current;
        if (pill) {
          pill.style.opacity = "0";
          pill.style.pointerEvents = "none";
        }
        return;
      }

      const section = sectionRef.current;
      const pill    = pillRef.current;
      if (!section || !pill) return;

      const sr = section.getBoundingClientRect();

      if (sr.bottom < 0 || sr.top > window.innerHeight) {
        if (activeIdxRef.current !== -1) {
          activeIdxRef.current = -1;
          setActiveIdx(-1);
          clearPopTimers();
          isPoppingRef.current = false;
          setIsPopping(false);
          setIsRespawning(false);
          hasPositionedRef.current = false;
          pill.style.transition = "opacity 0.35s ease";
          pill.style.opacity = "0";
          pill.style.pointerEvents = "none";
        }
        return;
      }

      const cy = window.innerHeight * 0.45;
      let best = -1;
      let dist = Infinity;

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        const d = Math.abs(rect.top + rect.height / 2 - cy);
        if (d < dist) { dist = d; best = i; }
      });

      const changed = best !== activeIdxRef.current;

      activeIdxRef.current = best;
      setActiveIdx(best);
      if (!isPoppingRef.current) {
        updatePill(changed);
      }
    };

    window.addEventListener("scroll", findActive, { passive: true });
    window.addEventListener("resize", findActive);
    findActive();

    return () => {
      clearPopTimers();
      window.removeEventListener("scroll", findActive);
      window.removeEventListener("resize", findActive);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      data-section="PHILOSOPHY"
      data-num="06"
      className="philosophy-section"
    >
      <style>{`
        .philosophy-section {
          padding: 14vh 8vw;
          display: flex;
          flex-direction: column;
          gap: 8vh;
        }

        .philosophy-eyebrow {
          display: none;
          margin: 0 0 0.15rem;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .philosophy-rows {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .philosophy-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0 40px;
          align-items: baseline;
          padding: 40px 0;
          border-bottom: 1px solid var(--line);
          cursor: default;
          transition: background 0.35s ease;
          border-radius: 4px;
        }

        .philosophy-row-index {
          display: none;
        }

        .philosophy-row-title {
          margin: 0;
          font-weight: 800;
          font-size: clamp(28px, 5vw, 72px);
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: var(--fg);
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .philosophy-row-title em {
          font-style: italic;
          font-weight: 300;
          color: var(--fg-dim);
        }

        .philosophy-row-gloss {
          margin: 0;
          max-width: 300px;
          font-size: clamp(12px, 1vw, 14px);
          color: var(--fg-faint);
          line-height: 1.6;
          font-weight: 300;
          align-self: center;
          opacity: 0.4;
          transition: opacity 0.35s ease;
        }

        .philosophy-pill {
          position: fixed;
          z-index: 50;
          opacity: 0;
          border: none;
          padding: 0;
          margin: 0;
          background: transparent;
          border-radius: 60px;
          cursor: pointer;
          touch-action: manipulation;
          transform-origin: center center;
          transition: transform 0.28s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .philosophy-pill:not(:disabled):hover {
          transform: scale(1.03);
        }

        .philosophy-pill:not(:disabled):active {
          transform: scale(0.98);
        }

        .philosophy-pill.is-popping {
          pointer-events: none;
          animation: philosophy-pill-pop 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .philosophy-pill.is-respawning {
          pointer-events: none;
          animation: philosophy-pill-respawn 0.52s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .philosophy-pill-burst {
          position: absolute;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          border: 1px solid rgba(232, 228, 220, 0.72);
          background: rgba(255, 255, 255, 0.18);
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
          animation: philosophy-pill-burst 0.52s ease-out forwards;
        }

        .philosophy-pill-burst:nth-child(2) {
          animation-delay: 0.04s;
          border-color: rgba(138, 42, 58, 0.62);
        }

        @keyframes philosophy-pill-pop {
          0% {
            transform: scale(1);
            filter: blur(0);
            opacity: 1;
          }
          35% {
            transform: scale(1.18);
            filter: blur(1px);
            opacity: 0.92;
          }
          100% {
            transform: scale(1.42);
            filter: blur(8px);
            opacity: 0;
          }
        }

        @keyframes philosophy-pill-burst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(7);
            opacity: 0;
          }
        }

        @keyframes philosophy-pill-respawn {
          0% {
            transform: scale(0.68);
            filter: blur(8px);
            opacity: 0;
          }
          62% {
            transform: scale(1.05);
            filter: blur(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            filter: blur(0);
            opacity: 1;
          }
        }

        @media (max-width: 860px) {
          .philosophy-section {
            padding:
              calc(var(--safe-top) + 4.5rem)
              var(--section-pad-x)
              calc(var(--safe-bottom) + 2rem);
            gap: 1.15rem;
          }

          .philosophy-eyebrow {
            display: block;
          }

          .philosophy-pill {
            display: none !important;
          }

          .philosophy-rows {
            gap: 0.55rem;
          }

          .philosophy-row {
            grid-template-columns: 1fr;
            gap: 0.45rem;
            align-items: start;
            padding: 0.95rem 0.9rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.09);
            border-radius: 12px;
            background:
              linear-gradient(160deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01));
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
          }

          .philosophy-row-index {
            display: block;
            font-family: var(--font-jetbrains), monospace;
            font-size: 0.52rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(240, 240, 240, 0.34);
          }

          .philosophy-row-title {
            font-size: clamp(1.35rem, 6.2vw, 1.72rem);
            line-height: 1.05;
            transform: none !important;
          }

          .philosophy-row-gloss {
            max-width: none;
            align-self: start;
            opacity: 1 !important;
            font-size: clamp(0.84rem, 3.7vw, 0.92rem);
            line-height: 1.58;
            color: rgba(240, 240, 240, 0.58);
          }
        }

        @media (max-width: 480px) {
          .philosophy-section {
            padding-bottom: calc(var(--safe-bottom) + 1.65rem);
            gap: 1rem;
          }

          .philosophy-rows {
            gap: 0.5rem;
          }

          .philosophy-row {
            padding: 0.85rem 0.8rem 0.9rem;
            border-radius: 10px;
          }

          .philosophy-row-title {
            font-size: clamp(1.22rem, 5.8vw, 1.55rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .philosophy-pill.is-popping {
            animation: none;
            opacity: 0;
          }

          .philosophy-pill.is-respawning {
            animation: none;
            opacity: 1;
          }

          .philosophy-pill-burst {
            animation: none;
            display: none;
          }
        }
      `}</style>

      <p className="philosophy-eyebrow">06 / PHILOSOPHY</p>

      <button
        ref={pillRef}
        type="button"
        className={`philosophy-pill${isPopping ? " is-popping" : ""}${isRespawning ? " is-respawning" : ""}`}
        aria-label={
          activeIdx >= 0
            ? `Pop lens on ${axioms[activeIdx]?.text ?? "highlighted word"}`
            : "Philosophy lens"
        }
        disabled={activeIdx < 0 || isPopping || isRespawning}
        onClick={handlePillPop}
      >
        {popBursts.map((burst) => (
          <span
            key={burst.id}
            className="philosophy-pill-burst"
            style={{ left: burst.x, top: burst.y }}
            aria-hidden
          />
        ))}
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={60}
          brightness={50}
          opacity={0.93}
          blur={11}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          mixBlendMode="difference"
        />
      </button>

      <div className="philosophy-rows">
        {axioms.map(({ text, emphasis, gloss }, i) => (
          <Reveal key={`${text}-${emphasis}`} delay={i * 120}>
            <div
              ref={(el) => { rowRefs.current[i] = el; }}
              className="philosophy-row"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              <span className="philosophy-row-index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>

              <p
                ref={(el) => { textRefs.current[i] = el; }}
                className="philosophy-row-title"
              >
                <span ref={(el) => { boldRefs.current[i] = el; }}>
                  {text}
                </span>{" "}
                <em>{emphasis}</em>
              </p>

              <p
                ref={(el) => { glossRefs.current[i] = el; }}
                className="philosophy-row-gloss"
              >
                {gloss}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
