"use client";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

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

export function Signal() {
  return (
    <section
      id="signal"
      data-section="SIGNAL"
      data-num="08"
      style={{ padding: "14vh 8vw", display: "flex", flexDirection: "column", gap: "6vh", minHeight: "80vh" }}
    >
      <Reveal delay={100}>
        <h2 style={{
          fontWeight: 800,
          fontSize: "clamp(36px, 5.5vw, 90px)",
          lineHeight: 0.9, letterSpacing: "-0.045em",
          color: "var(--fg)",
        }}>
          Let&apos;s build<br />
          <em style={{ fontStyle: "normal", color: "var(--fg-dim)", fontWeight: 300 }}>something real.</em>
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
          Open to internships, research collaborations, and projects where
          embedded systems, AI, or physical interaction design intersect.
          I&apos;m particularly interested in work that compounds.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Primary CTA */}
          <a
            href={`mailto:${site.email}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
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
            Drop me an email →
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

      {/* Personalised footer */}
      <Reveal delay={400}>
        <div style={{
          marginTop: "6vh", paddingTop: 28, borderTop: "1px solid var(--line)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px 40px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ color: "var(--fg-faint)" }}>Rayann Sagnon</span>
            <span style={{ color: "var(--fg-faint)", opacity: 0.6 }}>Electrical Eng. & Computing</span>
            <span style={{ color: "var(--fg-faint)", opacity: 0.6 }}>University of Ottawa · 2026</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ color: "var(--fg-faint)" }}>{site.email}</span>
            <span style={{ color: "var(--fg-faint)", opacity: 0.6 }}>Ottawa, Canada</span>
            <span style={{ color: "var(--fg-faint)", opacity: 0.6 }}>Building / Available</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "right" }}>
            <span style={{ color: "var(--fg-faint)" }}>Inside the System v{site.version}</span>
            <span style={{ color: "var(--fg-faint)", opacity: 0.6 }}>Embedded · AI · Systems</span>
            <span style={{ color: "var(--fg-faint)", opacity: 0.4 }}>© 2026 All systems online</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
