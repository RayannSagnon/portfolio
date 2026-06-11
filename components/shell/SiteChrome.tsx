"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CursorLight } from "./CursorLight";
import { SectionNav } from "./SectionNav";

type SectionMeta = { num: string; name: string; id: string };

function getRouteSection(pathname: string): SectionMeta {
  if (pathname.startsWith("/projects") || pathname.startsWith("/archive")) {
    return { num: "04", name: "PROJECTS", id: "projects" };
  }
  if (pathname.startsWith("/about")) {
    return { num: "02", name: "PROFILE", id: "identity" };
  }
  return { num: "01", name: "HERO", id: "hero" };
}

export function SiteChrome() {
  const router = useRouter();
  const pathname = usePathname();
  const [section, setSection] = useState<SectionMeta>({ num: "01", name: "HERO", id: "hero" });
  const [visible, setVisible] = useState(false);
  const [logoLightMode, setLogoLightMode] = useState(false);
  const [dockLightMode, setDockLightMode] = useState(false);

  // Hide navigation while ScatterIntro is active.
  useEffect(() => {
    const check = () => {
      if (pathname !== "/") {
        setVisible(true);
        return;
      }
      setVisible(window.scrollY >= window.innerHeight * 1.85);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  // Track the section currently under the fixed navigation.
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setSection({
              num: el.dataset.num ?? "00",
              name: el.dataset.section ?? "-",
              id: el.id,
            });
          }
        }
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const check = () => {
      if (pathname.startsWith("/archive")) {
        setLogoLightMode(true);
        setDockLightMode(true);
        return;
      }

      const archive = document.getElementById("archive");
      if (!archive) {
        setLogoLightMode(false);
        setDockLightMode(false);
        return;
      }

      const rect = archive.getBoundingClientRect();
      const logoY = 52;
      const dockY = window.matchMedia("(max-width: 860px)").matches ? 36 : window.innerHeight / 2;
      const logoInArchive = rect.top <= logoY && rect.bottom >= logoY;
      const dockInArchive = rect.top <= dockY && rect.bottom >= dockY;
      setLogoLightMode(logoInArchive);
      setDockLightMode(dockInArchive);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // Carousel accent sync: listens for hue events from ImmersiveCarousel
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

  const logoAccent = logoLightMode ? "#7f2635" : "var(--accent)";
  const logoBorder = logoLightMode ? "rgba(92,58,25,0.28)" : "rgba(232,228,220,0.14)";
  const logoBorderHover = logoLightMode ? "rgba(92,58,25,0.44)" : "rgba(232,228,220,0.35)";
  const logoBg = logoLightMode ? "rgba(242,219,187,0.94)" : "rgba(7,7,7,0.45)";
  const logoBgHover = logoLightMode ? "rgba(255,239,216,0.98)" : "rgba(7,7,7,0.7)";
  const logoText = logoLightMode ? "#17110c" : "var(--fg)";
  const logoShadow = logoLightMode
    ? "0 14px 34px rgba(72,43,20,0.20), inset 0 1px 0 rgba(255,248,236,0.62)"
    : "none";
  const activeSection = pathname === "/" ? section : getRouteSection(pathname);

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
          type="button"
          onClick={() => {
            router.push("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            display: "flex", alignItems: "center",
            border: `1px solid ${logoBorder}`,
            borderRadius: 8,
            padding: "5px 9px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: logoBg,
            boxShadow: logoShadow,
            userSelect: "none",
            cursor: "pointer",
            pointerEvents: "auto",
            transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = logoBorderHover;
            e.currentTarget.style.background = logoBgHover;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = logoBorder;
            e.currentTarget.style.background = logoBg;
          }}
          aria-label="Go to home"
        >
          <span style={{ color: logoText }}>R</span>
          <span style={{ color: logoAccent, transition: "color 0.7s ease" }}>S</span>
        </button>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: logoAccent,
          boxShadow: logoLightMode ? "0 0 12px rgba(127,38,53,0.48)" : "0 0 8px var(--accent)",
          transition: "background 0.7s ease, box-shadow 0.7s ease",
          animation: "pulse 2.6s cubic-bezier(.2,.7,.1,1) infinite",
          display: "inline-block",
          flexShrink: 0,
        }} />
      </div>

      <div style={shellStyle}>
        <SectionNav activeId={activeSection.id} lightMode={dockLightMode} />
      </div>
    </>
  );
}

