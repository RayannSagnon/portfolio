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
  /** Carousel-only slot, no dedicated project page */
  comingSoon?: boolean;
  architecture: [string, string][];
  tradeoffs: [string, string][];
  highlights: [string, string][];
};

export const projects: Project[] = [
  {
    slug: "studentos",
    code: "01",
    name: "StudentOS",
    tag: "Academic OS · Closed Beta",
    type: "software",
    hue: 218,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    cardImage: "/images/projects/studentos/card.png",
    blurb:
      "An academic operating system for university students: classes, tasks, calendar, focus, and Ask AI in one workspace, now in closed beta on React Native / Expo.",
    architecture: [],
    tradeoffs: [
      ["Decision", "School-email OTP for closed beta onboarding"],
      ["Tradeoff", "Academic depth over becoming another Notion"],
      ["Constraint", "Validate usage before scaling App Store distribution"],
    ],
    highlights: [
      ["Why", "Students fail from fragmentation, not from a lack of tools."],
      ["Next", "Native iOS path: Expo Go → TestFlight → App Store."],
    ],
  },
  {
    slug: "signs",
    code: "02",
    name: "SIgns",
    tag: "Accessibility · Sign Language",
    type: "software",
    hue: 168,
    glyph: "",
    repoUrl: "https://github.com/screadman/SIgns",
    cardImage: "/images/projects/signs/card.png",
    blurb:
      "A React Native app, built by a team of two, that makes learning sign language approachable through a visual dictionary and bite-sized structured lessons.",
    architecture: [],
    tradeoffs: [
      ["Decision", "Dictionary + lessons as the two product pillars"],
      ["Tradeoff", "One RN codebase so a two-person team can ship both platforms"],
      ["Constraint", "Keep learning accessible without turning into a spoken-language clone"],
    ],
    highlights: [
      ["Why", "Spoken-language apps dominate; sign languages stay underserved."],
      ["Next", "Deeper lesson paths and stronger progress loops."],
    ],
  },
];
