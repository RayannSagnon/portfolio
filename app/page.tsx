import type { ReactNode } from "react";
import { ScatterIntro } from "@/components/sections/ScatterIntro";
import { Hero } from "@/components/sections/Hero";
import { IdentityLayer } from "@/components/sections/IdentityLayer";
import { Vision } from "@/components/sections/Vision";
import { ImmersiveCarousel } from "@/components/lab/ImmersiveCarousel";
import { ArchivePreview } from "@/components/sections/ArchivePreview";
import { Philosophy } from "@/components/sections/Philosophy";
import { Signal } from "@/components/sections/Signal";

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
      {/* ① Intro — beige scatter, Hero slides up over it */}
      <ScatterIntro />

      {/* ② Hero — cover effect over ScatterIntro */}
      <Card z={1}>
        <Hero />
      </Card>

      {/* ③ IdentityLayer + Vision — seamless dark continuation, positioned so z=4 carousel doesn't cover */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <IdentityLayer />
        <Vision />
      </div>

      {/* ④ ImmersiveCarousel — same cover effect as Hero over ScatterIntro */}
      <Card z={4} sticky={false} clip={false}>
        <ImmersiveCarousel />
      </Card>

      {/* ⑤ Remaining sections */}
      <Card z={5} sticky={false} bg="#181818">
        <ArchivePreview />
      </Card>
      <Card z={6} sticky={false}>
        <Philosophy />
      </Card>
      <Card z={7} sticky={false}>
        <Signal />
      </Card>
    </main>
  );
}