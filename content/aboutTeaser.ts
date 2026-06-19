export type AboutTeaserTone = "ember" | "bronze" | "smoke";

export type AboutTeaserTile = {
  meta: string;
  title: string;
  caption: string;
  tone: AboutTeaserTone;
  src?: string;
  alt?: string;
  /** CSS object-position to keep faces in frame when tiles crop with object-fit: cover */
  focus?: string;
};

export const aboutTeaser = {
  title: "The person behind the work.",
  ctaLabel: "Beyond the resume",
} as const;

export const aboutTeaserTiles: readonly AboutTeaserTile[] = [
  {
    meta: "Origins",
    title: "Ouagadougou",
    caption: "Where usefulness came before labels, and access made technology feel important.",
    tone: "ember",
    src: "/images/about-teaser/childhood-origin.jpeg",
    alt: "A young Rayann smiling at home in Ouagadougou, March 2008.",
    focus: "center 42%",
  },
  {
    meta: "Early years",
    title: "First builds",
    caption: "School projects, design experiments, and the first instinct to make ideas tangible.",
    tone: "smoke",
    src: "/images/about-teaser/makerspace-lab.jpeg",
    alt: "Rayann working in a makerspace surrounded by electronics equipment.",
    focus: "center 48%",
  },
  {
    meta: "Community",
    title: "Humanitarian work",
    caption: "Leadership learned through care, coordination, and doing something useful together.",
    tone: "bronze",
    src: "/images/about-teaser/humanitarian-club-group.jpeg",
    alt: "Rayann with his humanitarian club members and their coordinators posing together in matching uniforms.",
    focus: "center 32%",
  },
  {
    meta: "Workbench",
    title: "Hands-on systems",
    caption: "Electronics, repairs, patience, and the discipline of making physical things behave.",
    tone: "smoke",
    src: "/images/about-teaser/young-formal-portrait.jpeg",
    alt: "A younger portrait of Rayann dressed formally during his school years.",
    focus: "center 12%",
  },
  {
    meta: "Team energy",
    title: "Hackathon rooms",
    caption: "Moments where prototypes stop being abstract and start feeling real.",
    tone: "ember",
    src: "/images/about-teaser/hackathon-trophy-team.jpeg",
    alt: "Rayann standing with teammates holding trophies after a competition.",
    focus: "center 14%",
  },
  {
    meta: "Ottawa",
    title: "A larger horizon",
    caption: "A new city, a deeper technical environment, and sharper questions about impact.",
    tone: "smoke",
    src: "/images/about-teaser/uottawa-sign.jpeg",
    alt: "Rayann sitting in front of the University of Ottawa sign.",
    focus: "center 58%",
  },
  {
    meta: "Everyday",
    title: "Campus rhythm",
    caption: "Labs, transit, lectures, and the ordinary routine behind long-term ambition.",
    tone: "bronze",
    src: "/images/about-teaser/ottawa-night-friends.jpeg",
    alt: "Rayann with friends in Ottawa at night.",
    focus: "center 42%",
  },
  {
    meta: "Off-hours",
    title: "Life outside the screen",
    caption: "Travel, movement, community, and the scenes that keep the work human.",
    tone: "ember",
    src: "/images/about-teaser/burkina-football.jpeg",
    alt: "Rayann playing football on a field in Burkina Faso.",
    focus: "center 35%",
  },
] as const;
