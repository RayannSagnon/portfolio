"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useUI } from "@/lib/i18n/LocaleProvider";

const NAV_ITEMS = [
  {
    id: "profile-group",
    scrollTarget: "hero-anchor",
    labelKey: "profile" as const,
    hintKey: "profileHint" as const,
    sectionIds: ["hero", "about-teaser", "vision"],
  },
  {
    id: "projects-group",
    scrollTarget: "projects",
    labelKey: "projects" as const,
    hintKey: "projectsHint" as const,
    sectionIds: ["projects"],
  },
  {
    id: "contact-group",
    scrollTarget: "contact",
    labelKey: "contact" as const,
    hintKey: "contactHint" as const,
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

function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

const ICONS: Record<NavItemId, () => React.ReactElement> = {
  "profile-group": IconIdentity,
  "projects-group": IconProjects,
  "contact-group": IconContact,
};

export function SectionNav({ activeId, lightMode = false }: { activeId: string; lightMode?: boolean }) {
  const ui = useUI();
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
        .section-nav-menu-btn {
          display: grid;
          place-items: center;
          width: var(--touch-min);
          height: var(--touch-min);
          padding: 0;
          border-radius: 999px;
          cursor: pointer;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease);
        }
        .section-nav-menu-btn:active {
          transform: scale(0.96);
        }
        @media (max-width: 860px) {
          .section-nav-menu-btn {
            width: 2.125rem;
            height: 2.125rem;
          }
        }
        .section-nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding:
            calc(12px + var(--safe-top))
            var(--section-pad-x)
            calc(12px + var(--safe-bottom));
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .section-nav-overlay-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.85rem;
          margin-bottom: 0.35rem;
          border-bottom: 1px solid var(--nav-panel-border);
        }
        .section-nav-overlay-label {
          font-family: var(--font-jetbrains), monospace;
          font-size: 0.56rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--nav-faint);
        }
        .section-nav-overlay-close {
          display: grid;
          place-items: center;
          width: 2.125rem;
          height: 2.125rem;
          padding: 0;
          border-radius: 999px;
          background: none;
          border: 1px solid var(--nav-panel-border);
          color: var(--nav-faint);
          cursor: pointer;
        }
        .section-nav-overlay-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .section-nav-overlay-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          width: 100%;
          min-height: 3rem;
          padding: 0.65rem 0;
          border: none;
          border-bottom: 1px solid var(--nav-panel-border);
          background: none;
          text-align: left;
          cursor: pointer;
          font-family: var(--font-jetbrains), monospace;
          animation: menuSlide 0.35s var(--ease) both;
        }
        .section-nav-overlay-item.is-active {
          border-left: 2px solid var(--nav-accent);
          padding-left: 0.45rem;
        }
        .section-nav-overlay-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
        .section-nav-overlay-copy {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
          min-width: 0;
        }
        .section-nav-overlay-title {
          font-size: clamp(0.82rem, 3.6vw, 0.92rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .section-nav-overlay-hint {
          font-size: 0.56rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--nav-faint);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          from { opacity: 0; transform: translateY(-8px); }
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
        {NAV_ITEMS.map(({ id, scrollTarget, labelKey, hintKey }) => {
          const label = ui.nav[labelKey];
          const hint = ui.nav[hintKey];
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
                  width: 44,
                  height: 44,
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
        position: "fixed",
        top: "calc(14px + var(--safe-top))",
        right: "calc(14px + var(--safe-right))",
        zIndex: 60,
      }}>
        <button
          type="button"
          className="section-nav-menu-btn"
          aria-label={ui.menu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          style={{
            background: panelBg,
            border: `1px solid ${panelBorder}`,
            color: dim,
            ["--nav-accent" as string]: accent,
          }}
        >
          <IconMenu />
        </button>
      </div>
      ) : null}

      {/*  Mobile fullscreen menu  */}
      {menuOpen && (
        <div
          className="section-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={ui.portfolioNav}
          style={{
            background: mobileOverlayBg,
            ["--nav-panel-border" as string]: panelBorder,
            ["--nav-faint" as string]: faint,
            ["--nav-accent" as string]: accent,
          }}
        >
          <div className="section-nav-overlay-head">
            <span className="section-nav-overlay-label">{ui.portfolioNav}</span>
            <button
              type="button"
              className="section-nav-overlay-close"
              aria-label={ui.closeMenu}
              onClick={() => setMenuOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="section-nav-overlay-list">
            {NAV_ITEMS.map(({ id, scrollTarget, labelKey, hintKey }, index) => {
              const label = ui.nav[labelKey];
              const hint = ui.nav[hintKey];
              const isActive = activeGroup === id;
              const Icon = ICONS[id];
              return (
                <button
                  type="button"
                  key={id}
                  className={`section-nav-overlay-item${isActive ? " is-active" : ""}`}
                  style={{
                    color: isActive ? text : faint,
                    animationDelay: `${index * 0.05}s`,
                  }}
                  onClick={() => { scrollTo(scrollTarget); setMenuOpen(false); }}
                >
                  <span className="section-nav-overlay-icon" style={{ color: isActive ? accent : faint }}>
                    <Icon />
                  </span>
                  <span className="section-nav-overlay-copy">
                    <span className="section-nav-overlay-title">{label}</span>
                    <span className="section-nav-overlay-hint">{hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}


