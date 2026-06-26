"use client";
import { useContent, useUI } from "@/lib/i18n/LocaleProvider";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function TypingText({
  text,
  trigger,
  delay = 0,
  speed = 72,
  keepCursor = false,
  showCursor = true,
}: {
  text: string;
  trigger: number;
  delay?: number;
  speed?: number;
  keepCursor?: boolean;
  showCursor?: boolean;
}) {
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (trigger === 0) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const reset = setTimeout(() => {
      setTyped("");
      setCursor(false);
    }, 0);
    const start = setTimeout(() => {
      if (showCursor) setCursor(true);
      const chars = Array.from(text);
      chars.forEach((_, i) => {
        const t = setTimeout(() => {
          setTyped(chars.slice(0, i + 1).join(""));
          if (i === chars.length - 1 && !keepCursor) {
            const hide = setTimeout(() => setCursor(false), 1400);
            timers.current.push(hide);
          }
        }, i * speed);
        timers.current.push(t);
      });
    }, delay + 1);

    timers.current.push(reset);
    timers.current.push(start);
    return () => { timers.current.forEach(clearTimeout); };
  }, [trigger, text, delay, speed, keepCursor, showCursor, reducedMotion]);

  if (reducedMotion) return <>{text}</>;

  return (
    <>
      {typed}
      {cursor && (
        <span aria-hidden style={{
          display: "inline-block",
          width: 3,
          height: "0.78em",
          background: "currentColor",
          marginLeft: 5,
          verticalAlign: "-0.05em",
          borderRadius: 1,
          animation: "typingBlink 0.65s step-end infinite",
        }} />
      )}
    </>
  );
}

function LoopingTypingText({
  phrases,
  trigger,
  delay = 0,
  typeSpeed = 52,
  eraseSpeed = 28,
  hold = 1500,
  gap = 320,
}: {
  phrases: readonly string[];
  trigger: number;
  delay?: number;
  typeSpeed?: number;
  eraseSpeed?: number;
  hold?: number;
  gap?: number;
}) {
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (trigger === 0 || phrases.length === 0) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const schedule = (callback: () => void, timeout: number) => {
      const timer = setTimeout(callback, timeout);
      timers.current.push(timer);
      return timer;
    };

    const erasePhrase = (phraseIndex: number) => {
      const chars = Array.from(phrases[phraseIndex]);
      chars.forEach((_, i) => {
        schedule(() => setTyped(chars.slice(0, chars.length - i - 1).join("")), i * eraseSpeed);
      });
      schedule(() => typePhrase((phraseIndex + 1) % phrases.length), chars.length * eraseSpeed + gap);
    };

    const typePhrase = (phraseIndex: number) => {
      const chars = Array.from(phrases[phraseIndex]);
      chars.forEach((_, i) => {
        schedule(() => setTyped(chars.slice(0, i + 1).join("")), i * typeSpeed);
      });
      schedule(() => erasePhrase(phraseIndex), chars.length * typeSpeed + hold);
    };

    schedule(() => {
      setTyped("");
      setStarted(true);
      typePhrase(0);
    }, delay);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [trigger, phrases, delay, typeSpeed, eraseSpeed, hold, gap, reducedMotion]);

  if (reducedMotion) return <>{phrases[0] ?? ""}</>;
  if (!started) return null;

  return (
    <>
      {typed}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 3,
          height: "0.78em",
          background: "currentColor",
          marginLeft: 5,
          verticalAlign: "-0.05em",
          borderRadius: 1,
          animation: "typingBlink 0.65s step-end infinite",
        }}
      />
    </>
  );
}

export function Hero() {
  const { site } = useContent();
  const ui = useUI();
  const sectionRef    = useRef<HTMLElement>(null);
  const paraRef       = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [typingTrigger, setTypingTrigger] = useState(0);

  useEffect(() => {
    const startTyping = () => setTypingTrigger((t) => (t > 0 ? t : 1));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const rect = entry.boundingClientRect;
        const inHero =
          rect.top < window.innerHeight * 0.55 &&
          rect.bottom > window.innerHeight * 0.3;
        if (inHero) startTyping();
      },
      { threshold: [0, 0.12, 0.3, 0.5] },
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    const fallback = window.setTimeout(() => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15) {
        startTyping();
      }
    }, 900);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      paraRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 1.8 }
    );
    gsap.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 2.2 }
    );
  }, { scope: sectionRef, dependencies: [] });

  const firstName = site.name.split(" ")[0];   // "Rayann"
  const lastName  = site.name.split(" ")[1];   // "Sagnon"
  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="HERO"
      data-num="01"
      style={{ height: "100dvh", minHeight: "100svh", padding: 0, position: "relative" }}
    >
      <style>{`
        @keyframes typingBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes orb {
          0%,100% { transform: translate(0,0) scale(1); opacity: 0.7; }
          50%      { transform: translate(-3%,4%) scale(1.06); opacity: 0.9; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }

        .hero-mobile-only {
          display: none;
        }

        @media (max-width: 860px) {
          .hero-desktop-only {
            display: none !important;
          }

          .hero-mobile-only {
            display: grid;
            gap: var(--mobile-inner-gap);
            width: 100%;
            padding-bottom: 4.5rem;
          }

          .hero-content-wrap {
            align-items: flex-start !important;
            justify-content: flex-start !important;
            padding-top: calc(var(--safe-top) + 5.25rem) !important;
          }

          #hero .hero-bg-grid {
            background-size: 52px 52px !important;
            opacity: 0.45 !important;
            mask-image: radial-gradient(ellipse 95% 72% at 50% 18%, black 18%, transparent 78%) !important;
          }

          #hero .hero-bg-orb {
            right: -35% !important;
            top: -8% !important;
            width: 72vmin !important;
            height: 72vmin !important;
            opacity: 0.85;
          }

          .hero-mobile-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            font-family: var(--font-jetbrains), monospace;
            font-size: 0.58rem;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--accent);
          }

          .hero-mobile-eyebrow-dot {
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 999px;
            background: var(--accent);
            box-shadow: 0 0 12px var(--accent-soft);
          }

          .hero-mobile-title {
            margin: 0;
            font-weight: 900;
            font-size: clamp(2.65rem, 13.5vw, 3.35rem);
            line-height: 0.9;
            letter-spacing: -0.045em;
            color: var(--fg);
          }

          .hero-mobile-title span {
            display: block;
          }

          .hero-mobile-title .hero-mobile-last {
            color: var(--fg-dim);
            font-style: italic;
            font-weight: 300;
          }

          .hero-mobile-focus {
            margin: 0;
            font-size: clamp(1rem, 4.6vw, 1.15rem);
            line-height: 1.2;
            letter-spacing: -0.03em;
            font-weight: 800;
            color: var(--fg);
          }

          .hero-mobile-bio {
            margin: 0;
            max-width: 34rem;
            font-size: clamp(0.92rem, 3.9vw, 1rem);
            line-height: 1.58;
            color: var(--fg-dim);
            font-weight: 300;
            opacity: 1 !important;
          }

          .hero-mobile-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-top: 0.15rem;
          }

          .hero-mobile-chip {
            display: inline-flex;
            align-items: center;
            min-height: 1.85rem;
            padding: 0 0.7rem;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.03);
            font-family: var(--font-jetbrains), monospace;
            font-size: 0.54rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(240,240,240,0.58);
          }

          .hero-scroll-hint {
            bottom: calc(var(--safe-bottom) + 1.1rem) !important;
            padding: 0.45rem 0.8rem;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.03);
            opacity: 1 !important;
          }
        }

        @media (max-width: 480px) {
          .hero-content-wrap {
            padding-top: calc(var(--safe-top) + 4.85rem) !important;
          }

          .hero-mobile-only {
            gap: var(--mobile-inner-gap);
          }

          .hero-mobile-title {
            font-size: clamp(2.35rem, 12.8vw, 2.9rem);
          }
        }
      `}</style>

      <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>

        {/* Background grid */}
        <div className="hero-bg-grid" aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          opacity: 0.6,
        }} />

        {/* Ambient orb */}
        <div className="hero-bg-orb" aria-hidden style={{
          position: "absolute", right: "-20%", top: "10%",
          width: "80vmin", height: "80vmin", borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, var(--accent-soft) 0%, transparent 60%)",
          filter: "blur(60px)",
          animation: "orb 18s cubic-bezier(.2,.7,.1,1) infinite",
        }} />

        {/* Hero content */}
        <div className="hero-content-wrap" style={{
          position: "absolute", inset: 0, padding: "0 var(--section-pad-x)",
          paddingTop: "calc(var(--safe-top) + 3.5rem)",
          display: "flex", alignItems: "center",
          zIndex: 5,
        }}>
          <div className="hero-mobile-only">
            <div className="hero-mobile-eyebrow">
              <span className="hero-mobile-eyebrow-dot" aria-hidden />
              <span>{ui.routeSection.hero}</span>
              <span aria-hidden>·</span>
              <span>{site.university}</span>
            </div>

            <h1 className="hero-mobile-title">
              <span>{firstName}</span>
              <span className="hero-mobile-last">{lastName}</span>
            </h1>

            <p className="hero-mobile-focus">{site.focus}</p>

            <p className="hero-mobile-bio">
              {ui.hero.bio}
            </p>

            <div className="hero-mobile-chips">
              <span className="hero-mobile-chip">{site.discipline}</span>
              <span className="hero-mobile-chip">{site.location}</span>
              <span className="hero-mobile-chip">{site.status}</span>
            </div>
          </div>

          <div className="hero-desktop-only" style={{ width: "100%", display: "grid", gap: "4vh" }}>

            <h1 style={{
              fontWeight: 900,
              fontSize: "clamp(40px, 9vw, 160px)",
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              color: "var(--fg)",
              fontVariantNumeric: "tabular-nums",
            }}>
              <TypingText
                text={firstName}
                trigger={typingTrigger}
                delay={0}
                speed={72}
                showCursor={false}
              />
              <span style={{ display: "block", color: "var(--fg-dim)", fontStyle: "italic", fontWeight: 300 }}>
                <TypingText
                  text={lastName + ui.hero.building}
                  trigger={typingTrigger}
                  delay={560}
                  speed={68}
                  showCursor={false}
                />
                <em
                  style={{
                    display: "block",
                    minHeight: "0.96em",
                    fontStyle: "normal",
                    color: "var(--fg)",
                    fontWeight: 800,
                    fontSize: "0.9em",
                    letterSpacing: "-0.05em",
                  }}
                >
                  <LoopingTypingText
                    phrases={ui.hero.phrases}
                    trigger={typingTrigger}
                    delay={1500}
                  />
                </em>
              </span>
            </h1>

            <p
              ref={paraRef}
              style={{
                maxWidth: 780,
                fontSize: "clamp(14px, 1.4vw, 20px)",
                lineHeight: 1.5,
                color: "var(--fg-dim)",
                fontWeight: 300,
                letterSpacing: "-0.005em",
                opacity: 0,
              }}
            >
              {ui.hero.bio}
            </p>

          </div>

        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="hero-scroll-hint"
          style={{
            position: "absolute", bottom: 40, left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 9,
            color: "var(--fg-faint)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 8,
            opacity: 0,
            userSelect: "none",
          }}
        >
          <span>{ui.scroll}</span>
          <span style={{ animation: "bounce 1.8s ease-in-out infinite" }}></span>
        </div>

      </div>
    </section>
  );
}


