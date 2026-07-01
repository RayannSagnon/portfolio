export const site = {
  name: "Rayann Sagnon",
  tagline: "Portfolio d'ingénierie",
  version: "1.0.04",
  discipline: "Génie électrique / informatique",
  location: "Ottawa / Canada",
  focus: "Embarqué · IA · Interaction",
  status: "En construction / Disponible",
  email: "rsagn083@uottawa.ca",
  linkedin: "https://linkedin.com/in/rayannsagnonelectricalengineer",
  github: "https://github.com/rayannsagnon",
  instagram: "https://instagram.com/rayannsagnon",
  university: "uOttawa",
  year: "2026",
  portfolioUrl: "https://www.rayannsagnon.com",
  portfolioHost: "www.rayannsagnon.com",
  description:
    "Rayann Sagnon — site portfolio officiel sur www.rayannsagnon.com. Étudiant en génie électrique et en technologie de l'informatique à l'Université d'Ottawa. Projets en systèmes embarqués, IA et interaction homme-machine.",
  ogTitle: "Rayann Sagnon · Portfolio d'ingénierie",
  ogDescription:
    "Portfolio officiel de Rayann Sagnon. Génie électrique, systèmes embarqués, IA et design d'interaction à uOttawa.",
  /** Photo de profil pour Open Graph et le schéma Person */
  profileImage: "/images/about-teaser/makerspace-lab.jpeg",
  profileImageAlt:
    "Rayann Sagnon, étudiant en génie électrique et technologie informatique à l'Université d'Ottawa",
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
  { id: "all", label: "Tous les articles" },
  { id: "embedded", label: "Embarqué" },
  { id: "ai", label: "IA" },
  { id: "robotics", label: "Robotique" },
  { id: "architecture", label: "Architecture" },
  { id: "essays", label: "Essais d'ingénierie" },
] as const satisfies { id: BlogCategoryId; label: string }[];

export const archiveEntries: readonly ArchiveEntry[] = [
  {
    slug: "quiet-intelligence-of-embedded-systems",
    code: "A·001",
    title: "Sur l'intelligence discrète des systèmes embarqués.",
    preview:
      "Pourquoi les machines les plus intéressantes sont celles qu'on finit par ne plus remarquer, et ce que cela coûte à concevoir.",
    readTime: "12 MIN",
    date: "2026.03",
    category: "embedded",
    categoryLabel: "Systèmes embarqués",
    tags: ["Embarqué", "Lisibilité", "Fiabilité"],
    featured: true,
    visual: "embedded-intelligence",
    accent: 160,
  },
  {
    slug: "curiosity-before-certainty",
    code: "A·002",
    title: "La curiosité avant la certitude.",
    preview:
      "Un essai de travail sur la formation en ingénierie, et pourquoi je refuse de me limiter à un seul domaine.",
    readTime: "06 MIN",
    date: "2026.02",
    category: "essays",
    categoryLabel: "Essais d'ingénierie",
    tags: ["Apprentissage", "Goût", "Éducation"],
    visual: "curiosity-map",
    accent: 38,
  },
  {
    slug: "designing-interfaces-that-disappear",
    code: "A·003",
    title: "Concevoir des interfaces qui disparaissent.",
    preview:
      "Sur la construction d'interfaces qui demandent moins d'attention à l'humain, pas plus.",
    readTime: "09 MIN",
    date: "2026.01",
    category: "architecture",
    categoryLabel: "Design d'interaction",
    tags: ["Interaction", "IHM", "Récupération"],
    visual: "invisible-interface",
    accent: 218,
  },
  {
    slug: "rc-x-control-lessons",
    code: "A·004",
    title: "RC-X : leçons de contrôle tirées d'une petite autonomie.",
    preview:
      "Décisions d'ingénierie, compromis de communication et ce qu'une plateforme à l'échelle 1:10 m'a appris sur le contrôle en temps réel.",
    readTime: "14 MIN",
    date: "2025.11",
    category: "robotics",
    categoryLabel: "Robotique",
    tags: ["RC-X", "Temps réel", "Contrôle"],
    visual: "rcx-control",
    accent: 18,
  },
  {
    slug: "the-whiteboard-is-a-sensor",
    code: "A·005",
    title: "Le tableau blanc est un capteur.",
    preview:
      "Une exploration des assistants IA physiques et de ce que la vision par ordinateur attend de l'espace qui l'entoure.",
    readTime: "11 MIN",
    date: "2025.10",
    category: "ai",
    categoryLabel: "IA physique",
    tags: ["Vision", "OCR", "Interfaces"],
    visual: "whiteboard-sensor",
    accent: 350,
  },
  {
    slug: "build-for-clarity",
    code: "A·006",
    title: "Construire pour la clarté.",
    preview:
      "Un court manifeste sur l'ingénierie à long terme, la concentration plutôt que le débit, et pourquoi je choisis toujours la profondeur.",
    readTime: "04 MIN",
    date: "2025.09",
    category: "architecture",
    categoryLabel: "Artisanat d'ingénierie",
    tags: ["Concentration", "Profondeur", "Artisanat"],
    visual: "craft-manifesto",
    accent: 270,
  },
] as const;

export const featuredArchiveEntry = archiveEntries.find((entry) => entry.featured) ?? archiveEntries[0]!;
