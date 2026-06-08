"use client";
import { site } from "@/content/site";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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

  useEffect(() => {
    if (trigger === 0) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyped("");
    setCursor(false);

    const start = setTimeout(() => {
      if (showCursor) setCursor(true);
      const chars = Array.from(text);
      chars.forEach((_, i) => {
        const t = setTimeout(() => {
          setTyped(text.slice(0, i + 1));
          if (i === chars.length - 1 && !keepCursor) {
            const hide = setTimeout(() => setCursor(false), 1400);
            timers.current.push(hide);
          }
        }, i * speed);
        timers.current.push(t);
      });
    }, delay);

    timers.current.push(start);
    return () => { timers.current.forEach(clearTimeout); };
  }, [trigger, text, delay, speed, keepCursor]);

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

export function Hero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const paraRef       = useRef<HTMLParagraphElement>(null);
  const metaRef       = useRef<HTMLDivElement>(null);
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
      [paraRef.current, metaRef.current].filter(Boolean),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.14, duration: 0.9, ease: "power3.out", delay: 1.8 }
    );
    gsap.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 2.2 }
    );
  }, { scope: sectionRef, dependencies: [] });

  // "Rayann" = 6 chars * 72ms = 432ms done at ~delay+432ms
  // "Sagnon," = 7 chars, starts at 560ms
  // "building systems." = 18 chars, starts at 1200ms
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
                  text={lastName + ","}
                  trigger={typingTrigger}
                  delay={560}
                  speed={68}
                  showCursor={false}
                />{" "}
                <em style={{ fontStyle: "normal", color: "var(--fg)", fontWeight: 800 }}>
                  <TypingText
                    text="building systems."
                    trigger={typingTrigger}
                    delay={1200}
                    speed={55}
                    keepCursor={false}
                  />
                </em>
              </span>
            </h1>

            <p
              ref={paraRef}
              style={{
                maxWidth: 680,
                fontSize: "clamp(14px, 1.4vw, 20px)",
                lineHeight: 1.5,
                color: "var(--fg-dim)",
                fontWeight: 300,
                letterSpacing: "-0.005em",
                opacity: 0,
              }}
            >
              Designing intelligent systems where{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>engineering</em>,{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>interaction</em>, and{" "}
              <em style={{ color: "var(--fg)", fontStyle: "normal", fontWeight: 500 }}>technology</em>{" "}
              converge, exploring the space between embedded hardware, artificial intelligence, and human ambition.
            </p>

            <div
              ref={metaRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 32,
                marginTop: "4vh",
                paddingTop: 28,
                borderTop: "1px solid var(--line)",
                opacity: 0,
              }}
            >
              {[
                { lbl: "Discipline", val: site.discipline },
                { lbl: "Located",    val: site.location },
                { lbl: "Focus",      val: site.focus },
                { lbl: "Status",     val: site.status },
              ].map(({ lbl, val }) => (
                <div key={lbl} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--fg-dim)" }}>
                  <span style={{
                    display: "block",
                    color: "var(--fg-faint)",
                    marginBottom: 6,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: 9,
                  }}>
                    {lbl}
                  </span>
                  <span style={{ color: "var(--fg)" }}>{val}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          style={{
            position: "absolute", bottom: 40, left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'JetBrains Mono', monospace",
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
          <span style={{ animation: "bounce 1.8s ease-in-out infinite" }}>↓</span>
        </div>

      </div>
    </section>
  );
}
