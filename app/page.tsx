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
import { SectionCurveEnd, SECTION_LIP_HEIGHT } from "@/components/motion/SectionCurveEnd";

// Card = next section slides up over the previous one (rounded top + shadow)
function Card({
  children,
  bg = "var(--bg)",
  z,
  clip = true,
  sticky = true,
  afterCurve = false,
}: {
  children: ReactNode;
  bg?: string;
  z: number;
  clip?: boolean;
  sticky?: boolean;
  /** Pull up over a SectionCurveEnd lip on the previous section */
  afterCurve?: boolean;
}) {
  return (
    <div
      style={{
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : undefined,
        zIndex: z,
        borderRadius: "24px 24px 0 0",
        marginTop: afterCurve ? `calc(-1 * ${SECTION_LIP_HEIGHT})` : -24,
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

      {/* 4. Vision scrolls away with a curved end; Projects card covers it */}
      <div style={{ position: "relative", zIndex: 3, backgroundColor: "var(--bg)" }}>
        <SectionCurveEnd>
          <Vision />
        </SectionCurveEnd>
      </div>

      <Card z={4} afterCurve>
        <ImmersiveCarousel />
      </Card>

      {/* 5. Remaining sections */}
      <Card z={5} bg="#eee8df">
        <ArchivePreview />
      </Card>

      <div style={{ position: "relative", zIndex: 6, backgroundColor: "var(--bg)" }}>
        <SectionCurveEnd>
          <Philosophy />
        </SectionCurveEnd>
      </div>

      <Card z={7} afterCurve>
        <Contact />
      </Card>
    </main>
  );
}
