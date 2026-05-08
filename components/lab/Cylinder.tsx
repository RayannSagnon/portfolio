"use client";
import { projects } from "@/content/projects";
import { CYLINDER_RADIUS } from "@/hooks/useLabCylinder";
import { ProjectFace } from "./ProjectFace";

type Props = {
  angle: number;
  activeIdx: number;
  snapTo: (idx: number) => void;
  onPointerDown: React.PointerEventHandler<HTMLElement>;
  onPointerMove: React.PointerEventHandler<HTMLElement>;
  onPointerUp: React.PointerEventHandler<HTMLElement>;
};

export function Cylinder({ angle, activeIdx, snapTo }: Omit<Props, "onPointerDown" | "onPointerMove" | "onPointerUp"> & Partial<Pick<Props, "onPointerDown" | "onPointerMove" | "onPointerUp">>) {
  return (
    <div className="cyl-wrap" style={{ touchAction: "none" }}>
      <div
        className="cylinder"
        style={{ transform: `rotateY(${angle}deg)` }}
        aria-label={`Rotating project showcase. Currently showing: ${projects[activeIdx].name}`}
      >
        {projects.map((project, idx) => (
          <ProjectFace
            key={project.slug}
            project={project}
            idx={idx}
            activeIdx={activeIdx}
            onClick={() => snapTo(idx)}
          />
        ))}
      </div>

      {/* Depth shadow behind cylinder */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "50%",
        transform: `translate(-50%, -50%) translateZ(${-CYLINDER_RADIUS}px)`,
        width: 280, height: 400,
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.8), transparent)",
        filter: "blur(30px)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
