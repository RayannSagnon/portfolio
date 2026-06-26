"use client";
import { useContent, useUI } from "@/lib/i18n/LocaleProvider";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const { site } = useContent();
  const ui = useUI();

  const socials = [
    {
      href: site.linkedin, label: "LinkedIn", target: "_blank",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      href: site.github, label: "GitHub", target: "_blank",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
    },
    {
      href: site.instagram, label: "Instagram", target: "_blank",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
  ] as const;

  return (
    <section
      id="contact"
      data-section="CONTACT"
      data-num="07"
      className="contact-section"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x) 0",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(2.5rem, 5vh, 6vh)",
        minHeight: "auto",
        overflow: "visible",
        background: "var(--bg)",
      }}
    >
      <style>{`
        @media (max-width: 860px) {
          .contact-section {
            gap: var(--mobile-stack-gap) !important;
            padding-top: var(--section-pad-y) !important;
          }

          .contact-section h2 {
            font-size: clamp(2rem, 9vw, 2.75rem) !important;
            line-height: 1.04 !important;
          }

          .contact-section > [data-reveal] p {
            font-size: clamp(0.92rem, 3.9vw, 1rem) !important;
            line-height: 1.62 !important;
          }

          .contact-cta-row {
            gap: 0.85rem !important;
            margin-top: 0.25rem;
          }
        }
      `}</style>
      <Reveal delay={100}>
        <h2 style={{
          fontWeight: 800,
          fontSize: "clamp(36px, 5.5vw, 90px)",
          lineHeight: 1,
          letterSpacing: "-0.045em",
          color: "var(--fg)",
          paddingTop: "0.06em",
        }}>
          {ui.contact.titleLine1}<br />
          <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>{ui.contact.titleLine2}</em>
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <p style={{
          maxWidth: 520,
          fontSize: "clamp(14px, 1.3vw, 18px)",
          lineHeight: 1.65,
          color: "var(--fg-dim)",
          fontWeight: 300,
        }}>
          {ui.contact.body}
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="contact-cta-row" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Primary CTA */}
          <a
            href={`mailto:${site.email}`}
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--fg)",
              background: "var(--accent)",
              padding: "13px 28px",
              borderRadius: 999,
              textDecoration: "none",
              transition: "opacity 0.3s var(--ease)",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {ui.contact.emailCta}
          </a>

          {/* Social icon buttons */}
          {socials.map(({ href, label, target, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : undefined}
              style={{
                width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--line-strong)",
                borderRadius: 50,
                color: "var(--fg-faint)",
                textDecoration: "none",
                transition: "border-color 0.3s var(--ease), color 0.3s var(--ease), box-shadow 0.3s var(--ease)",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.boxShadow = "0 0 14px var(--accent-glow)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--line-strong)";
                e.currentTarget.style.color = "var(--fg-faint)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </Reveal>

      {/* Site footer */}
      <Reveal delay={400}>
        <footer
          aria-label="Site footer"
          style={{
            margin: "3vh 0 0",
            background: "var(--bg)",
            overflow: "visible",
          }}
        >
          <style>{`
            .contact-footer-hero {
              min-height: clamp(96px, 14vw, 180px);
              display: flex;
              align-items: flex-end;
              position: relative;
              padding: 0 0 18px;
            }
            .contact-footer-name {
              color: rgba(232, 228, 220, 0.14);
              font-family: var(--font-inter-tight), system-ui, sans-serif;
              font-size: clamp(38px, 10.7vw, 205px);
              font-weight: 900;
              line-height: 0.86;
              letter-spacing: 0;
              white-space: nowrap;
              user-select: none;
              width: 100%;
              max-width: 100%;
              display: block;
            }
            .contact-footer-bar {
              min-height: 86px;
              background: var(--bg);
              border-top: 1px solid rgba(232,228,220,0.08);
              display: grid;
              grid-template-columns: auto auto;
              justify-content: space-between;
              align-items: center;
              gap: 24px;
              padding: 20px 0 max(1.25rem, env(safe-area-inset-bottom, 0px));
            }
            .contact-footer-copy {
              color: rgba(232,228,220,0.88);
              font-size: clamp(14px, 1.2vw, 18px);
              line-height: 1.4;
            }
            .contact-footer-meta {
              display: flex;
              flex-direction: column;
              gap: 6px;
              text-align: right;
              color: rgba(232,228,220,0.78);
              font-family: var(--font-jetbrains), monospace;
              font-size: 9px;
              letter-spacing: 0.16em;
              text-transform: uppercase;
            }
            .contact-social-link {
              width: var(--touch-min);
              height: var(--touch-min);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              color: rgba(232,228,220,0.92);
              text-decoration: none;
              touch-action: manipulation;
              -webkit-tap-highlight-color: transparent;
              transition: color 0.2s var(--ease), transform 0.16s var(--ease);
            }
            @media (hover: hover) and (pointer: fine) {
              .contact-social-link:hover,
              .contact-social-link:focus-visible {
                color: var(--accent);
                transform: translateY(-2px);
                outline: none;
              }
            }
            @media (max-width: 760px) {
              .contact-footer-hero {
                min-height: 96px;
                padding: 0.75rem 0 1.35rem;
                margin-top: 0.5rem;
              }
              .contact-footer-name {
                white-space: nowrap;
                font-size: clamp(34px, 10.5vw, 78px);
                line-height: 0.9;
              }
              .contact-footer-bar {
                grid-template-columns: 1fr;
                justify-content: stretch;
                align-items: start;
                gap: 1rem;
                padding: 1.5rem 0 max(1.5rem, env(safe-area-inset-bottom, 0px));
              }
              .contact-footer-meta {
                text-align: left;
              }
            }
          `}</style>

          <div className="contact-footer-hero">
            <span className="contact-footer-name">{site.name}</span>
          </div>

          <div className="contact-footer-bar">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {socials.map(({ href, label, target, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                  className="contact-social-link"
                >
                  {icon}
                </a>
              ))}
            </div>

            <div className="contact-footer-meta">
              <span>{site.email}</span>
              <span>{site.discipline}</span>
            </div>
          </div>
        </footer>
      </Reveal>
    </section>
  );
}


