export type Project = {
  slug: string;
  code: string;
  name: string;
  tag: string;
  type: "software" | "embedded" | "ai" | "hardware" | "speculative";
  hue: number;
  glyph: string;
  blurb: string;
  /** Optional cover image shown on the carousel card */
  cardImage?: string;
  /** Vertical anchor on the card, as a CSS top percentage (default 65%) */
  cardImageTop?: string;
  /** Optional link to the project repository */
  repoUrl?: string;
  /** Carousel-only slot — no dedicated project page */
  comingSoon?: boolean;
  architecture: [string, string][];
  tradeoffs: [string, string][];
  highlights: [string, string][];
};

const placeholderProjects: Omit<Project, "slug" | "code" | "name" | "hue">[] = [
  { tag: "Coming soon", type: "software", glyph: "", blurb: "Placeholder for a future project.", comingSoon: true, architecture: [], tradeoffs: [], highlights: [] },
  { tag: "Coming soon", type: "embedded", glyph: "", blurb: "Placeholder for a future project.", comingSoon: true, architecture: [], tradeoffs: [], highlights: [] },
  { tag: "Coming soon", type: "ai", glyph: "", blurb: "Placeholder for a future project.", comingSoon: true, architecture: [], tradeoffs: [], highlights: [] },
  { tag: "Coming soon", type: "hardware", glyph: "", blurb: "Placeholder for a future project.", comingSoon: true, architecture: [], tradeoffs: [], highlights: [] },
  { tag: "Coming soon", type: "software", glyph: "", blurb: "Placeholder for a future project.", comingSoon: true, architecture: [], tradeoffs: [], highlights: [] },
  { tag: "Coming soon", type: "embedded", glyph: "", blurb: "Placeholder for a future project.", comingSoon: true, architecture: [], tradeoffs: [], highlights: [] },
];

const placeholderHues = [18, 350, 38, 200, 160, 270];

export const projects: Project[] = [
  {
    slug: "studentos",
    code: "01",
    name: "StudentOS",
    tag: "Academic Workspace · Intelligent Interface",
    type: "software",
    hue: 218,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    blurb:
      "An academic workspace that consolidates productivity, planning, and study workflows into one adaptive surface, built for students who live in nine tabs.",
    architecture: [],
    tradeoffs: [
      ["Decision",    "Local-first storage over cloud sync"],
      ["Tradeoff",    "Slower onboarding for stronger privacy"],
      ["Constraint",  "Runs offline on aging hardware"],
    ],
    highlights: [
      ["Why",  "Students live in 9 tabs. They deserve one place."],
      ["Next", "Cross-institution learning patterns."],
    ],
  },
  ...placeholderProjects.map((project, i) => {
    const n = i + 2;
    const code = String(n).padStart(2, "0");
    return {
      ...project,
      slug: `project-${code}`,
      code,
      name: `Project ${n}`,
      hue: placeholderHues[i] ?? 200,
    };
  }),
];
