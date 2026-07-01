export const site = {
  name: "Rayann Sagnon",
  tagline: "Engineering Portfolio",
  version: "1.0.04",
  discipline: "Electrical Eng. / Computing",
  location: "Ottawa / Canada",
  focus: "Embedded · AI · Interaction",
  status: "Building / Available",
  email: "rsagn083@uottawa.ca",
  linkedin: "https://linkedin.com/in/rayannsagnonelectricalengineer",
  github: "https://github.com/rayannsagnon",
  instagram: "https://instagram.com/rayannsagnon",
  university: "uOttawa",
  year: "2026",
  description:
    "Rayann Sagnon — Electrical Engineering & Computing Technology student at the University of Ottawa. Official portfolio of embedded systems, AI, and human-machine interaction projects.",
  ogTitle: "Rayann Sagnon · Electrical Engineering Portfolio",
  ogDescription:
    "Official portfolio of Rayann Sagnon. Electrical engineering, embedded systems, AI, and interaction design at uOttawa.",
} as const;

export type BlogCategoryId = "all" | "embedded" | "ai" | "robotics" | "architecture" | "essays";

export type BlogVisual =
  | "embedded-intelligence"
  | "curiosity-map"
  | "invisible-interface"
  | "rcx-control"
  | "whiteboard-sensor"
  | "craft-manifesto";

export type ArchiveEntry = {
  slug: string;
  code: string;
  title: string;
  preview: string;
  readTime: string;
  date: string;
  category: Exclude<BlogCategoryId, "all">;
  categoryLabel: string;
  tags: string[];
  featured?: boolean;
  visual: BlogVisual;
  accent: number;
  relatedProject?: string;
};

export const blogCategories = [
  { id: "all", label: "All articles" },
  { id: "embedded", label: "Embedded" },
  { id: "ai", label: "AI" },
  { id: "robotics", label: "Robotics" },
  { id: "architecture", label: "Architecture" },
  { id: "essays", label: "Engineering Essays" },
] as const satisfies { id: BlogCategoryId; label: string }[];

export const archiveEntries: readonly ArchiveEntry[] = [
  {
    slug: "quiet-intelligence-of-embedded-systems",
    code: "A·001",
    title: "On the quiet intelligence of embedded systems.",
    preview:
      "Why the most interesting machines are the ones you stop noticing, and what that costs to engineer.",
    readTime: "12 MIN",
    date: "2026.03",
    category: "embedded",
    categoryLabel: "Embedded Systems",
    tags: ["Embedded", "Legibility", "Reliability"],
    featured: true,
    visual: "embedded-intelligence",
    accent: 160,
  },
  {
    slug: "curiosity-before-certainty",
    code: "A·002",
    title: "Curiosity before certainty.",
    preview:
      "A working essay on engineering education, and why I refuse to pick a single area.",
    readTime: "06 MIN",
    date: "2026.02",
    category: "essays",
    categoryLabel: "Engineering Essays",
    tags: ["Learning", "Taste", "Education"],
    visual: "curiosity-map",
    accent: 38,
  },
  {
    slug: "designing-interfaces-that-disappear",
    code: "A·003",
    title: "Designing interfaces that disappear.",
    preview:
      "On building interfaces that ask less attention from the human, not more.",
    readTime: "09 MIN",
    date: "2026.01",
    category: "architecture",
    categoryLabel: "Interaction Design",
    tags: ["Interaction", "HMI", "Recovery"],
    visual: "invisible-interface",
    accent: 218,
  },
  {
    slug: "rc-x-control-lessons",
    code: "A·004",
    title: "RC-X: control lessons from a small autonomy.",
    preview:
      "Engineering decisions, communication trade-offs, and what a 1:10-scale platform taught me about real-time control.",
    readTime: "14 MIN",
    date: "2025.11",
    category: "robotics",
    categoryLabel: "Robotics",
    tags: ["RC-X", "Real-Time", "Control"],
    visual: "rcx-control",
    accent: 18,
  },
  {
    slug: "the-whiteboard-is-a-sensor",
    code: "A·005",
    title: "The whiteboard is a sensor.",
    preview:
      "An exploration of physical-AI assistants and what computer vision wants from the room around it.",
    readTime: "11 MIN",
    date: "2025.10",
    category: "ai",
    categoryLabel: "Physical AI",
    tags: ["Vision", "OCR", "Interfaces"],
    visual: "whiteboard-sensor",
    accent: 350,
  },
  {
    slug: "build-for-clarity",
    code: "A·006",
    title: "Build for clarity.",
    preview:
      "A short manifesto on long-term engineering, focus over throughput, and why I keep choosing depth.",
    readTime: "04 MIN",
    date: "2025.09",
    category: "architecture",
    categoryLabel: "Engineering Craft",
    tags: ["Focus", "Depth", "Craft"],
    visual: "craft-manifesto",
    accent: 270,
  },
] as const;

export const featuredArchiveEntry = archiveEntries.find((entry) => entry.featured) ?? archiveEntries[0]!;
