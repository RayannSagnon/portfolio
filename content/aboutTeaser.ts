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
  /** Content zoom inside the tile (< 1 shows more of the photo; tile size stays full) */
  zoom?: number;
  /** Omit from the horizontal photo strip on narrow viewports */
  hideOnMobile?: boolean;
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
    src: "/images/about-teaser/graduation-baccalaureat.jpeg",
    alt: "Rayann with his parents at his baccalaureate graduation ceremony.",
    focus: "center 48%",
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
    src: "/images/about-teaser/montreal-oratory.jpeg",
    alt: "Rayann at the base of the Saint Joseph's Oratory steps in Montreal.",
    focus: "center 55%",
  },
  {
    meta: "Workbench",
    title: "Hands-on systems",
    caption: "Electronics, repairs, patience, and the discipline of making physical things behave.",
    tone: "smoke",
    src: "/images/about-teaser/mountain-landscape.png",
    alt: "Snow-capped mountains lit by sunset against a purple sky.",
    focus: "center 45%",
    hideOnMobile: true,
  },
  {
    meta: "Team energy",
    title: "Hackathon rooms",
    caption: "Moments where prototypes stop being abstract and start feeling real.",
    tone: "ember",
    src: "/images/about-teaser/aquarium-tunnel.jpeg",
    alt: "Rayann visiting an aquarium tunnel with sharks and tropical fish.",
    focus: "32% 60%",
  },
  {
    meta: "Ottawa",
    title: "A larger horizon",
    caption: "A new city, a deeper technical environment, and sharper questions about impact.",
    tone: "smoke",
    src: "/images/about-teaser/gokart-track.jpeg",
    alt: "Rayann driving a go-kart on an outdoor track.",
    focus: "center 48%",
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
    src: "/images/about-teaser/niagara-falls-night.jpeg",
    alt: "Rayann at Niagara Falls at night with the falls lit in green and blue.",
    focus: "center 50%",
  },
] as const;
