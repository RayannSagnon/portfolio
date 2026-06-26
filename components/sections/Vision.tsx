"use client";
import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/lib/i18n/LocaleProvider";

export function Vision() {
  const ui = useUI();
  const pillars = ui.vision.pillars;

  return (
    <section
      id="vision"
      data-section="VISION"
      data-num="03"
      className="vision-section"
      style={{ borderTop: "none" }}
    >
      <style>{`
        .vision-section {
          padding: 14vh 8vw;
          display: flex;
          flex-direction: column;
          gap: 8vh;
        }

        .vision-intro {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .vision-eyebrow {
          display: none;
          margin: 0;
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .vision-heading {
          margin: 0;
          font-weight: 800;
          font-size: clamp(28px, 3.6vw, 58px);
          line-height: 1;
          letter-spacing: -0.035em;
          color: var(--fg);
          max-width: 760px;
        }

        .vision-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2px;
          margin-top: 2vh;
        }

        .vision-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 36px 32px;
          border-top: 1px solid var(--line);
          border-right: 1px solid var(--line);
          transition:
            border-color 0.35s var(--ease),
            background 0.35s var(--ease),
            box-shadow 0.35s var(--ease),
            transform 0.35s var(--ease);
        }

        .vision-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(232, 228, 220, 0.10), transparent 58%),
            linear-gradient(145deg, rgba(232, 228, 220, 0.035), transparent 56%);
          transition: opacity 0.35s var(--ease);
        }

        @media (hover: hover) and (pointer: fine) {
          .vision-card:hover {
            transform: translateY(-6px);
            border-color: rgba(232, 228, 220, 0.18);
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.26);
          }

          .vision-card:hover::before {
            opacity: 1;
          }

          .vision-card:hover .vision-card-title {
            color: var(--fg);
            transform: translateY(-2px);
          }

          .vision-card:hover .vision-card-body {
            color: var(--fg-dim);
          }
        }

        .vision-card-index {
          display: none;
        }

        .vision-card-title,
        .vision-card-body {
          margin: 0;
          transition: color 0.28s var(--ease), transform 0.28s var(--ease);
        }

        .vision-card-title {
          font-weight: 700;
          font-size: clamp(16px, 1.4vw, 20px);
          color: var(--fg);
          letter-spacing: -0.02em;
        }

        .vision-card-body {
          font-size: clamp(13px, 1.1vw, 15px);
          color: var(--fg-dim);
          line-height: 1.65;
          font-weight: 300;
        }

        @media (max-width: 860px) {
          .vision-section {
            padding:
              calc(var(--safe-top) + 4.5rem)
              var(--section-pad-x)
              calc(var(--safe-bottom) + 2rem);
            gap: 1.35rem;
          }

          .vision-eyebrow {
            display: block;
          }

          .vision-intro {
            gap: 0.55rem;
          }

          .vision-heading {
            font-size: clamp(1.55rem, 7.2vw, 2rem);
            line-height: 1.08;
            max-width: none;
            text-wrap: balance;
          }

          .vision-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
            margin-top: 0.15rem;
          }

          .vision-card {
            gap: 0.5rem;
            padding: 0.95rem 0.9rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.09);
            border-radius: 12px;
            background:
              linear-gradient(160deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01));
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
            transform: none !important;
          }

          .vision-card::before {
            display: none;
          }

          .vision-card-index {
            display: block;
            font-family: var(--font-jetbrains), monospace;
            font-size: 0.52rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(240, 240, 240, 0.34);
          }

          .vision-card-title {
            font-size: clamp(0.98rem, 4.2vw, 1.08rem);
            line-height: 1.25;
          }

          .vision-card-body {
            font-size: clamp(0.84rem, 3.7vw, 0.92rem);
            line-height: 1.58;
            color: rgba(240, 240, 240, 0.58);
          }
        }

        @media (max-width: 480px) {
          .vision-section {
            padding-bottom: calc(var(--safe-bottom) + 1.65rem);
            gap: 1.15rem;
          }

          .vision-heading {
            font-size: clamp(1.42rem, 6.8vw, 1.78rem);
          }

          .vision-grid {
            gap: 0.5rem;
          }

          .vision-card {
            padding: 0.85rem 0.8rem 0.9rem;
            border-radius: 10px;
          }
        }
      `}</style>

      <Reveal delay={100}>
        <div className="vision-intro">
          <p className="vision-eyebrow">03 / VISION</p>
          <h2 className="vision-heading">{ui.vision.heading}</h2>
        </div>
      </Reveal>

      <div className="vision-grid">
        {pillars.map(({ label, body }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div
              className="vision-card"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
              }}
            >
              <span className="vision-card-index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="vision-card-title">{label}</p>
              <p className="vision-card-body">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
