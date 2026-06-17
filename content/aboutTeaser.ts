export type AboutTeaserTone = "ember" | "bronze" | "smoke";

export type AboutTeaserTile = {
  meta: string;
  title: string;
  caption: string;
  tone: AboutTeaserTone;
  src?: string;
  alt?: string;
};

export const aboutTeaser = {
  eyebrow: "Personal page / visual preface",
  title: "The person behind the work.",
  intro:
    "A more personal chapter built around real scenes rather than labels: where I come from, what shaped me, and the places where engineering, community, and everyday life meet.",
  kicker:
    "Burkina Faso, Ottawa, volunteering, workbenches, team rooms, and the quiet moments in between.",
  ctaLabel: "Beyond the resume",
} as const;

export const aboutTeaserTiles: readonly AboutTeaserTile[] = [
  {
    meta: "Origins",
    title: "Ouagadougou",
    caption: "Where usefulness came before labels, and access made technology feel important.",
    tone: "ember",
  },
  {
    meta: "Early years",
    title: "First builds",
    caption: "School projects, design experiments, and the first instinct to make ideas tangible.",
    tone: "smoke",
  },
  {
    meta: "Community",
    title: "Humanitarian work",
    caption: "Leadership learned through care, coordination, and doing something useful together.",
    tone: "bronze",
  },
  {
    meta: "Workbench",
    title: "Hands-on systems",
    caption: "Electronics, repairs, patience, and the discipline of making physical things behave.",
    tone: "smoke",
  },
  {
    meta: "Team energy",
    title: "Hackathon rooms",
    caption: "Moments where prototypes stop being abstract and start feeling real.",
    tone: "ember",
  },
  {
    meta: "Ottawa",
    title: "A larger horizon",
    caption: "A new city, a deeper technical environment, and sharper questions about impact.",
    tone: "smoke",
  },
  {
    meta: "Everyday",
    title: "Campus rhythm",
    caption: "Labs, transit, lectures, and the ordinary routine behind long-term ambition.",
    tone: "bronze",
  },
  {
    meta: "Off-hours",
    title: "Life outside the screen",
    caption: "Travel, movement, community, and the scenes that keep the work human.",
    tone: "ember",
  },
] as const;
