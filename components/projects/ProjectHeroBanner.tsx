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
          padding-top: clamp(4.25rem, 9vh, 5.75rem);
          background: #121721;
          overflow: hidden;
        }

        .project-hero-banner-frame {
          position: relative;
          width: min(100%, calc(72vh * 16 / 9));
          max-width: 100%;
          margin: 0 auto;
          aspect-ratio: 16 / 9;
        }

        .project-hero-banner-toolbar {
          position: absolute;
          top: clamp(1.35rem, 3.2vh, 2rem);
          left: clamp(1rem, 4vw, 2rem);
          z-index: 3;
        }

        .project-hero-banner-media {
          position: absolute;
          inset: 0;
        }

        .project-hero-banner-media img {
          object-fit: contain;
          object-position: center center;
        }

        .project-hero-banner-fade {
          position: absolute;
          inset: auto 0 0;
          height: 28%;
          background: linear-gradient(
            to top,
            #070707 0%,
            rgba(7, 7, 7, 0.55) 42%,
            transparent 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .project-hero-banner {
            padding-top: clamp(3.75rem, 8vh, 4.75rem);
          }

          .project-hero-banner-frame {
            width: 100%;
            aspect-ratio: 4 / 3;
          }
        }
      `}</style>

      <div className="project-hero-banner-toolbar">
        <ProjectBackButton />
      </div>

      <div className="project-hero-banner-frame">
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
      </div>
    </header>
  );
}
