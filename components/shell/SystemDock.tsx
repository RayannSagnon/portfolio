"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const NODES = [
  {
    id: "identity-group",
    scrollTarget: "hero",
    label: "IDENTITY",
    hint: "MIND · IDENTITY · VISION",
    sectionIds: ["hero", "identity", "vision"],
  },
  {
    id: "lab-group",
    scrollTarget: "the-lab",
    label: "LAB",
    hint: "LAB · SYSTEMS · ARCHIVE",
    sectionIds: ["the-lab", "lab", "archive"],
  },
  {
    id: "signal-group",
    scrollTarget: "signal",
    label: "SIGNAL",
    hint: "PHILOSOPHY · CONTACT",
    sectionIds: ["philosophy", "signal"],
  },
] as const;

type NodeId = typeof NODES[number]["id"];

function resolveGroup(activeId: string): NodeId {
  for (const node of NODES) {
    if ((node.sectionIds as readonly string[]).includes(activeId)) return node.id;
  }
  return "identity-group";
}

function IconIdentity() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconLab() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M6 10H3M6 14H3M18 10h3M18 14h3M10 6V3M14 6V3M10 18v3M14 18v3" />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const ICONS: Record<NodeId, () => React.ReactElement> = {
  "identity-group": IconIdentity,
  "lab-group": IconLab,
  "signal-group": IconSignal,
};

export function SystemDock({ activeId }: { activeId: string }) {
  const [hoverId, setHoverId] = useState<NodeId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const activeGroup = resolveGroup(activeId);

  function scrollTo(id: string) {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = (window as any).__lenis;
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
        .sys-dock { display: flex; }
        .sys-dock-mobile { display: none; }
        @media (max-width: 860px) {
          .sys-dock { display: none; }
          .sys-dock-mobile { display: flex; }
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

      {/* ── Desktop Sidebar ── */}
      <nav
        className="sys-dock"
        aria-label="System navigation"
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
          background: "rgba(7,7,7,0.55)",
          border: "1px solid rgba(232,228,220,0.12)",
          boxShadow: "0 0 0 1px rgba(138,42,58,0.12), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(232,228,220,0.06)",
          animation: "sideIn 0.8s cubic-bezier(0.2,0.8,0.05,1) 0.4s both",
        }}
      >
        {NODES.map(({ id, scrollTarget, label, hint }) => {
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
              {/* Tooltip — right side */}
              {isHovered && (
                <div style={{
                  position: "absolute",
                  left: "calc(100% + 14px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(7,7,7,0.92)",
                  border: "1px solid rgba(232,228,220,0.12)",
                  borderRadius: 4,
                  padding: "8px 14px",
                  whiteSpace: "nowrap",
                  fontFamily: "'JetBrains Mono', monospace",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  pointerEvents: "none",
                  animation: "tooltipRight 0.2s var(--ease) both",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                  zIndex: 70,
                }}>
                  <span style={{ fontSize: 10, color: "var(--fg)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 8, color: "var(--fg-faint)", letterSpacing: "0.12em" }}>
                    {hint}
                  </span>
                </div>
              )}

              <button
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
                  color: isActive ? "var(--accent)" : isHovered ? "var(--fg-dim)" : "var(--fg-faint)",
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
                    background: "var(--accent)",
                    boxShadow: "0 0 6px var(--accent)",
                    transition: "background 0.8s var(--ease), box-shadow 0.8s var(--ease)",
                  }} />
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* ── Mobile MENU button ── */}
      <div className="sys-dock-mobile" style={{
        position: "fixed", top: 12, right: 20, zIndex: 60,
      }}>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            background: "rgba(7,7,7,0.55)",
            border: "1px solid rgba(232,228,220,0.12)",
            color: "var(--fg-dim)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "10px 16px",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          <span style={{ color: "var(--accent)", marginRight: 6 }}>◆</span> MENU
        </button>
      </div>

      {/* ── Mobile fullscreen menu ── */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(7,7,7,0.96)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          padding: "40px 8vw",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingBottom: 24, borderBottom: "1px solid var(--line)",
            marginBottom: 32,
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, color: "var(--fg-faint)", letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              INSIDE THE SYSTEM · NAV
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: "none", border: "1px solid var(--line-strong)",
                color: "var(--fg-faint)", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "8px 14px", cursor: "pointer",
              }}
            >
              CLOSE ×
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1, justifyContent: "center" }}>
            {NODES.map(({ id, scrollTarget, label, hint }) => {
              const isActive = activeGroup === id;
              const Icon = ICONS[id];
              return (
                <button
                  key={id}
                  onClick={() => { scrollTo(scrollTarget); setMenuOpen(false); }}
                  style={{
                    background: "none", border: "none",
                    borderBottom: "1px solid var(--line)",
                    color: isActive ? "var(--fg)" : "var(--fg-faint)",
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                    padding: "20px 0",
                    display: "flex", alignItems: "center", gap: 20,
                    textAlign: "left",
                    animation: `menuSlide 0.4s var(--ease) both`,
                  }}
                >
                  <span style={{ color: isActive ? "var(--accent)" : "var(--fg-faint)" }}>
                    <Icon />
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                    <span style={{ fontSize: 20, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: isActive ? 600 : 400 }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 9, color: "var(--fg-faint)", letterSpacing: "0.12em" }}>
                      {hint}
                    </span>
                  </div>
                  {isActive && (
                    <span style={{ color: "var(--accent)", fontSize: 9, letterSpacing: "0.1em" }}>
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
