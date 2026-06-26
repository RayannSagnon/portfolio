import type { ReactNode } from "react";
import { ScatterIntro } from "@/components/sections/ScatterIntro";
import { Hero } from "@/components/sections/Hero";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Vision } from "@/components/sections/Vision";
import { ImmersiveCarousel } from "@/components/projects/ImmersiveCarousel";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";
import { HashAnchorJump } from "@/components/motion/HashAnchorJump";

// Card = section that slides up over the previous one
function Card({
  children,
  bg = "var(--bg)",
  z,
  clip = true,
  sticky = true,
}: {
  children: ReactNode;
  bg?: string;
  z: number;
  clip?: boolean;
  sticky?: boolean;
}) {
  return (
    <div
      style={{
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : undefined,
        zIndex: z,
        borderRadius: "24px 24px 0 0",
        marginTop: -24,
        backgroundColor: bg,
        boxShadow: "0 -20px 56px rgba(0,0,0,0.30)",
        ...(clip ? { overflow: "hidden" } : {}),
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <HashAnchorJump />

      {/* 1. Intro: beige scatter, Hero slides up over it */}
      <ScatterIntro />

      {/* Scroll anchor for nav dock: not sticky so lenis.scrollTo(el) works */}
      <div id="hero-anchor" style={{ height: 0, marginTop: -24 }} />

      {/* 2. Hero: cover effect over ScatterIntro */}
      <Card z={1}>
        <Hero />
      </Card>

      {/* 3. AboutTeaser: z=2, solid bg, covers Hero on scroll */}
      <div style={{ position: "relative", zIndex: 2, backgroundColor: "var(--bg)" }}>
        <AboutTeaser />
      </div>

      {/* 4. Vision: z=3, solid dark bg, slides over Hero seamlessly (no card edge) */}
      <div style={{ position: "relative", zIndex: 3, backgroundColor: "var(--bg)" }}>
        <Vision />
      </div>

      {/* 5. ImmersiveCarousel: card cover effect over Vision */}
      <Card z={4} sticky={false}>
        <ImmersiveCarousel />
      </Card>

      {/* 6. Remaining sections: solid tail blocks sticky hero bleed-through */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          isolation: "isolate",
          backgroundColor: "var(--bg)",
        }}
      >
        <Card z={5} sticky={false} clip={false}>
          <Philosophy />
        </Card>
        <Card z={6} sticky={false} clip={false}>
          <Contact />
        </Card>
        <div
          aria-hidden
          style={{
            height: "clamp(6rem, 14vh, 10rem)",
            background: "var(--bg)",
          }}
        />
      </div>
    </main>
  );
}
