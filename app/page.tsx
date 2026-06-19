import type { ReactNode } from "react";
import { ScatterIntro } from "@/components/sections/ScatterIntro";
import { Hero } from "@/components/sections/Hero";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Vision } from "@/components/sections/Vision";
import { ImmersiveCarousel } from "@/components/projects/ImmersiveCarousel";
import { ArchivePreview } from "@/components/sections/ArchivePreview";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";
import { HashAnchorJump } from "@/components/motion/HashAnchorJump";
import { CoverReveal } from "@/components/motion/CoverReveal";

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
        boxShadow: sticky ? "0 -20px 56px rgba(0,0,0,0.30)" : undefined,
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

      {/* 4. Vision lifts away to hand off into Projects */}
      <CoverReveal
        cover={<Vision />}
        under={<ImmersiveCarousel />}
        coverZ={4}
        underZ={3}
      />

      {/* 5. Remaining sections */}
      <Card z={5} sticky={false} bg="#eee8df">
        <ArchivePreview />
      </Card>
      <CoverReveal cover={<Philosophy />} under={<Contact />} coverZ={7} underZ={6} />
    </main>
  );
}
