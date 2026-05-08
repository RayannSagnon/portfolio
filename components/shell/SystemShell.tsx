"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CursorLight } from "./CursorLight";
import { SystemDock } from "./SystemDock";

type SectionMeta = { num: string; name: string; id: string };

export function SystemShell() {
  const router = useRouter();
  const [section, setSection] = useState<SectionMeta>({ num: "01", name: "HERO", id: "hero" });
  const [visible, setVisible] = useState(false);

  // Hide shell while ScatterIntro is active
  useEffect(() => {
    const check = () => setVisible(window.scrollY >= window.innerHeight * 1.85);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Section tracker
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setSection({
              num: el.dataset.num ?? "00",
              name: el.dataset.section ?? "—",
              id: el.id,
            });
          }
        }
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Carousel accent sync — listens for hue events from ImmersiveCarousel
  useEffect(() => {
    const onActive = (e: Event) => {
      const { accent, accentSoft } = (e as CustomEvent<{ accent: string; accentSoft: string }>).detail;
      document.documentElement.style.setProperty("--accent", accent);
      document.documentElement.style.setProperty("--accent-soft", accentSoft);
    };
    const onLeave = () => {
      document.documentElement.style.removeProperty("--accent");
      document.documentElement.style.removeProperty("--accent-soft");
    };
    window.addEventListener("carousel:active", onActive);
    window.addEventListener("carousel:leave", onLeave);
    return () => {
      window.removeEventListener("carousel:active", onActive);
      window.removeEventListener("carousel:leave", onLeave);
    };
  }, []);

  const shellStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transition: "opacity 0.6s ease",
  };

  return (
    <>
      <CursorLight />

      {/* RS monogram */}
      <div style={{
        position: "fixed", top: 20, left: 20, zIndex: 60,
        display: "flex", alignItems: "center", gap: 8,
        pointerEvents: "none",
        ...shellStyle,
      }}>
        <button
          onClick={() => {
            router.push("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            display: "flex", alignItems: "center",
            border: "1px solid rgba(232,228,220,0.14)",
            borderRadius: 8,
            padding: "5px 9px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "rgba(7,7,7,0.45)",
            userSelect: "none",
            cursor: "pointer",
            pointerEvents: "auto",
            transition: "border-color 0.3s, background 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(232,228,220,0.35)";
            e.currentTarget.style.background = "rgba(7,7,7,0.7)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(232,228,220,0.14)";
            e.currentTarget.style.background = "rgba(7,7,7,0.45)";
          }}
          aria-label="Go to home"
        >
          <span style={{ color: "var(--fg)" }}>R</span>
          <span style={{ color: "var(--accent)", transition: "color 0.7s ease" }}>S</span>
        </button>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 8px var(--accent)",
          transition: "background 0.7s ease, box-shadow 0.7s ease",
          animation: "pulse 2.6s cubic-bezier(.2,.7,.1,1) infinite",
          display: "inline-block",
          flexShrink: 0,
        }} />
      </div>

      <div style={shellStyle}>
        <SystemDock activeId={section.id} />
      </div>
    </>
  );
}
