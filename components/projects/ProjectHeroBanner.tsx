import Image from "next/image";
import { ProjectBackButton } from "@/components/projects/ProjectBackButton";
import type { ProjectShowcaseData } from "@/content/projectShowcases";

type Props = {
  hero: ProjectShowcaseData["hero"];
  projectName: string;
};

export function ProjectHeroBanner({ hero, projectName }: Props) {
  return (
    <header className="project-hero-banner" aria-label={`${projectName} banner`}>
      <style>{`
        .project-hero-banner {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: min(74vh, 760px);
          min-height: clamp(220px, 42vw, 420px);
          background: #121721;
          overflow: hidden;
        }

        .project-hero-banner-toolbar {
          position: absolute;
          top: clamp(1rem, 2.8vh, 1.85rem);
          left: clamp(1rem, 4vw, 2rem);
          z-index: 3;
        }

        .project-hero-banner-media {
          position: absolute;
          inset: 0;
        }

        .project-hero-banner-media img {
          object-fit: cover;
          object-position: center;
        }

        .project-hero-banner-fade {
          position: absolute;
          inset: auto 0 0;
          height: 42%;
          background: linear-gradient(
            to top,
            #070707 0%,
            rgba(7, 7, 7, 0.72) 38%,
            transparent 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .project-hero-banner {
            aspect-ratio: 4 / 3;
            max-height: min(56vh, 420px);
          }

          .project-hero-banner-media img {
            object-position: 42% center;
          }
        }
      `}</style>

      <div className="project-hero-banner-toolbar">
        <ProjectBackButton />
      </div>

      <div className="project-hero-banner-media">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="project-hero-banner-fade" aria-hidden />
    </header>
  );
}
