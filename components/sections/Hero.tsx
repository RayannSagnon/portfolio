"use client";
import { site } from "@/content/site";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HERO_BUILD_PHRASES = [
  "tech that makes sense.",
  "useful tech.",
  "sensible tech.",
  "robots.",
  "apps.",
  "websites.",
  "softwares.",
  "hardwares.",
  "interfaces.",
  "prototypes.",
  "smart tools.",
  "physical AI.",
  "student tools.",
  "embedded products.",
  "automation.",
  "small machines.",
  "useful products.",
  "real-world systems.",
  "tools that work.",
] as const;

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
  const sectionRef    = useRef<HTMLElement>(null);
  const paraRef       = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [typingTrigger, setTypingTrigger] = useState(0);

  // Fire typing every time Hero enters the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTypingTrigger(t => t + 1); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
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
      style={{ height: "100vh", padding: 0, position: "relative" }}
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
      `}</style>

      <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>

        {/* Background grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          opacity: 0.6,
        }} />

        {/* Ambient orb */}
        <div aria-hidden style={{
          position: "absolute", right: "-20%", top: "10%",
          width: "80vmin", height: "80vmin", borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, var(--accent-soft) 0%, transparent 60%)",
          filter: "blur(60px)",
          animation: "orb 18s cubic-bezier(.2,.7,.1,1) infinite",
        }} />

        {/* Hero content */}
        <div style={{
          position: "absolute", inset: 0, padding: "0 8vw",
          display: "flex", alignItems: "center",
          zIndex: 5,
        }}>
          <div style={{ width: "100%", display: "grid", gap: "4vh" }}>

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
                  text={lastName + ", building"}
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
                    phrases={HERO_BUILD_PHRASES}
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
              From{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>Ottawa, Canada</em>, I explore the space between{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>electrical engineering</em>,{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>computing</em>, and{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>design</em>, building thoughtful technology across{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>embedded systems</em>,{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>AI</em>, and{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>human interaction</em>.
            </p>

          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
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
          <span>scroll</span>
          <span style={{ animation: "bounce 1.8s ease-in-out infinite" }}></span>
        </div>

      </div>
    </section>
  );
}


