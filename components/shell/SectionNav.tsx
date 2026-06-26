"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    id: "profile-group",
    scrollTarget: "hero-anchor",
    label: "PROFILE",
    hint: "INTRO  /  STORY  /  VISION",
    sectionIds: ["hero", "about-teaser", "vision"],
  },
  {
    id: "projects-group",
    scrollTarget: "projects",
    label: "PROJECTS",
    hint: "PROJECTS  /  CASE STUDIES",
    sectionIds: ["projects"],
  },
  {
    id: "contact-group",
    scrollTarget: "contact",
    label: "CONTACT",
    hint: "IDEAS  /  CONTACT",
    sectionIds: ["philosophy", "contact"],
  },
] as const;

type NavItemId = typeof NAV_ITEMS[number]["id"];

function resolveGroup(activeId: string): NavItemId {
  for (const item of NAV_ITEMS) {
    if ((item.sectionIds as readonly string[]).includes(activeId)) return item.id;
  }
  return "profile-group";
}

function IconIdentity() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconProjects() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M6 10H3M6 14H3M18 10h3M18 14h3M10 6V3M14 6V3M10 18v3M14 18v3" />
    </svg>
  );
}

function IconContact() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const ICONS: Record<NavItemId, () => React.ReactElement> = {
  "profile-group": IconIdentity,
  "projects-group": IconProjects,
  "contact-group": IconContact,
};

export function SectionNav({ activeId, lightMode = false }: { activeId: string; lightMode?: boolean }) {
  const [hoverId, setHoverId] = useState<NavItemId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const activeGroup = resolveGroup(activeId);
  const accent = lightMode ? "#7f2635" : "var(--accent)";
  const text = lightMode ? "#17110c" : "var(--fg)";
  const dim = lightMode ? "#45372a" : "var(--fg-dim)";
  const faint = lightMode ? "#665542" : "var(--fg-faint)";
  const panelBg = lightMode ? "rgba(242,219,187,0.94)" : "rgba(7,7,7,0.55)";
  const panelBorder = lightMode ? "rgba(92,58,25,0.28)" : "rgba(232,228,220,0.12)";
  const panelShadow = lightMode
    ? "0 18px 46px rgba(72,43,20,0.22), inset 0 1px 0 rgba(255,248,236,0.62)"
    : "0 0 0 1px rgba(138,42,58,0.12), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(232,228,220,0.06)";
  const tooltipBg = lightMode ? "rgba(255,239,216,0.98)" : "rgba(7,7,7,0.92)";
  const tooltipShadow = lightMode ? "0 12px 32px rgba(72,43,20,0.22)" : "0 4px 20px rgba(0,0,0,0.6)";
  const mobileOverlayBg = lightMode ? "rgba(234,216,191,0.98)" : "rgba(7,7,7,0.96)";

  function scrollTo(id: string) {
    if (pathname === "/") {
      const lenis = window.__lenis;
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  }

  return (
    <>
      <style>{`
        .section-nav { display: flex; }
        .section-nav-mobile { display: none; }
        @media (max-width: 860px) {
          .section-nav { display: none; }
          .section-nav-mobile { display: flex; }
        }
        @keyframes sideIn {
          from { opacity: 0; transform: translateY(-50%) translateX(-12px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes tooltipRight {
          from { opacity: 0; transform: translateY(-50%) translateX(-6px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/*  Desktop Sidebar  */}
      <nav
        className="section-nav"
        aria-label="Portfolio navigation"
        style={{
          position: "fixed",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 60,
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: "8px 0",
          borderRadius: 999,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: panelBg,
          border: `1px solid ${panelBorder}`,
          boxShadow: panelShadow,
          animation: "sideIn 0.8s cubic-bezier(0.2,0.8,0.05,1) 0.4s both",
        }}
      >
        {NAV_ITEMS.map(({ id, scrollTarget, label, hint }) => {
          const isActive = activeGroup === id;
          const isHovered = hoverId === id;
          const Icon = ICONS[id];

          return (
            <div
              key={id}
              style={{ position: "relative" }}
              onMouseEnter={() => setHoverId(id)}
              onMouseLeave={() => setHoverId(null)}
            >
              {/* Tooltip: right side */}
              {isHovered && (
                <div style={{
                  position: "absolute",
                  left: "calc(100% + 14px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: tooltipBg,
                  border: `1px solid ${panelBorder}`,
                  borderRadius: 4,
                  padding: "8px 14px",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-jetbrains), monospace",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  pointerEvents: "none",
                  animation: "tooltipRight 0.2s var(--ease) both",
                  boxShadow: tooltipShadow,
                  zIndex: 70,
                }}>
                  <span style={{ fontSize: 10, color: text, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 8, color: faint, letterSpacing: "0.12em" }}>
                    {hint}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => scrollTo(scrollTarget)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  color: isActive ? accent : isHovered ? dim : faint,
                  transition: "color 0.3s var(--ease)",
                }}
              >
                <Icon />
                {isActive && (
                  <span style={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: accent,
                    boxShadow: lightMode ? "0 0 10px rgba(127,38,53,0.48)" : "0 0 6px var(--accent)",
                    transition: "background 0.8s var(--ease), box-shadow 0.8s var(--ease)",
                  }} />
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/*  Mobile MENU button (hidden on /about — page has its own nav)  */}
      {pathname !== "/about" ? (
      <div className="section-nav-mobile" style={{
        position: "fixed", top: 12, right: 20, zIndex: 60,
      }}>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          style={{
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            background: panelBg,
            border: `1px solid ${panelBorder}`,
            color: dim,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "10px 16px",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          <span style={{ color: accent, marginRight: 6 }}></span> MENU
        </button>
      </div>
      ) : null}

      {/*  Mobile fullscreen menu  */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: mobileOverlayBg,
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          padding: "40px 8vw",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingBottom: 24, borderBottom: `1px solid ${panelBorder}`,
            marginBottom: 32,
          }}>
            <span style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9, color: faint, letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              PORTFOLIO  /  NAV
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{
                background: "none", border: `1px solid ${panelBorder}`,
                color: faint, fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "8px 14px", cursor: "pointer",
              }}
            >
              CLOSE x
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1, justifyContent: "center" }}>
            {NAV_ITEMS.map(({ id, scrollTarget, label, hint }) => {
              const isActive = activeGroup === id;
              const Icon = ICONS[id];
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => { scrollTo(scrollTarget); setMenuOpen(false); }}
                  style={{
                    background: "none", border: "none",
                    borderBottom: `1px solid ${panelBorder}`,
                    color: isActive ? text : faint,
                    fontFamily: "var(--font-jetbrains), monospace",
                    cursor: "pointer",
                    padding: "20px 0",
                    display: "flex", alignItems: "center", gap: 20,
                    textAlign: "left",
                    animation: `menuSlide 0.4s var(--ease) both`,
                  }}
                >
                  <span style={{ color: isActive ? accent : faint }}>
                    <Icon />
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                    <span style={{ fontSize: 20, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: isActive ? 600 : 400 }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 9, color: faint, letterSpacing: "0.12em" }}>
                      {hint}
                    </span>
                  </div>
                  {isActive && (
                    <span style={{ color: accent, fontSize: 9, letterSpacing: "0.1em" }}>
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}


