export type Project = {
  slug: string;
  code: string;
  name: string;
  tag: string;
  type: "software" | "embedded" | "ai" | "hardware" | "speculative" | "client";
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
  /**
   * When false, excluded from the homepage product carousel.
   * Use for client / venture work shown in VentureSpotlight instead.
   */
  showInCarousel?: boolean;
  architecture: [string, string][];
  tradeoffs: [string, string][];
  highlights: [string, string][];
};

export const projects: Project[] = [
  {
    slug: "standout",
    code: "00",
    name: "Standout Studio",
    tag: "Client work · Co-founder",
    type: "client",
    hue: 172,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/standout-studio",
    showInCarousel: false,
    blurb:
      "Bilingual Ottawa web studio. Real client meetings, scoped proposals, design and build iterations, and delivered sites, about $3K in early revenue so far.",
    architecture: [],
    tradeoffs: [
      ["Decision", "Partner with clients as a studio, not one-off freelance tickets"],
      ["Tradeoff", "Fewer projects, clearer scope, and care after launch"],
      ["Constraint", "Budget and timeline set with the client before build"],
    ],
    highlights: [
      ["Role", "Co-founder · product framing, web delivery, client iteration"],
      ["Proof", "Paying clients, live sites, bilingual Ottawa studio"],
    ],
  },
  {
    slug: "signs",
    code: "01",
    name: "SIgns",
    tag: "Accessibility · Preparing Android beta",
    type: "software",
    hue: 168,
    glyph: "",
    repoUrl: "https://github.com/screadman/SIgns",
    cardImage: "/images/projects/signs/card.png",
    blurb:
      "A React Native learning product co-built with Steven Readman. Visual dictionary and structured lessons for ASL learners. Now entering real-world testing and Android beta.",
    architecture: [],
    tradeoffs: [
      ["Decision", "Dictionary + lessons as the two product pillars"],
      ["Tradeoff", "One RN codebase so a two-person team can reach both platforms"],
      ["Constraint", "Keep learning accessible without becoming a spoken-language clone"],
    ],
    highlights: [
      ["Why", "Spoken-language apps dominate; sign languages stay underserved."],
      ["Now", "Store path, beta recruitment, and feedback-driven iteration."],
    ],
  },
  {
    slug: "studentos",
    code: "02",
    name: "StudentOS",
    tag: "Product exploration · Paused before beta",
    type: "software",
    hue: 218,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    cardImage: "/images/projects/studentos/card.png",
    blurb:
      "An academic OS prototype: classes, tasks, calendar, focus, and Ask AI in one workspace. Advanced far enough to expose a hard product decision, then paused before paid beta.",
    architecture: [],
    tradeoffs: [
      ["Decision", "Pause before Apple distribution fees and AI API spend on free testers"],
      ["Tradeoff", "Academic depth over becoming another Notion"],
      ["Constraint", "Useful AI coaching has a marginal cost without monetization"],
    ],
    highlights: [
      ["Why", "Students fail from fragmentation, not from a lack of tools."],
      ["Lesson", "Do not run a beta that burns money before the model is clear."],
    ],
  },
  {
    slug: "rcx",
    code: "03",
    name: "RC-X",
    tag: "Embedded · Real-time control",
    type: "embedded",
    hue: 35,
    glyph: "",
    cardImage: "/images/projects/rcx/hero.png",
    showInCarousel: true,
    blurb:
      "A small remote-control platform that became a lesson in real-time control. The loop is the product: read input, interpret, drive actuators, observe, repeat. Kit-based chassis teaching sensing, actuation, latency, and operator trust.",
    architecture: [],
    tradeoffs: [
      ["Decision", "Bare-metal firmware for fewer invisible decisions between input and output"],
      ["Tradeoff", "More glue code, but a legible platform where bugs have fewer places to hide"],
      ["Constraint", "Radio channel forces the question: what does the operator need now vs log later?"],
    ],
    highlights: [
      ["Core", "The control loop must feel boring — predictable enough that the vehicle disappears under operator intent"],
      ["Next", "Onboard perception, richer diagnostics, and eventually closed-loop autonomy"],
    ],
  },
];
