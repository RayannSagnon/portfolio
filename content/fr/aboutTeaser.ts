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
  /** Échelle du contenu dans la tuile (plus bas = plus de photo visible ; 0,85–1) */
  scale?: number;
  hideOnMobile?: boolean;
};

export const aboutTeaser = {
  title: "La personne derrière le travail.",
  ctaLabel: "Au-delà du CV",
} as const;

export const aboutTeaserTiles: readonly AboutTeaserTile[] = [
  {
    meta: "Origines",
    title: "Ouagadougou",
    caption: "Là où l'utilité précédait les étiquettes, et où l'accès rendait la technologie importante.",
    tone: "ember",
    src: "/images/about-teaser/graduation-baccalaureat.jpeg",
    alt: "Rayann avec ses parents lors de la cérémonie de remise du baccalauréat.",
    focus: "center 44%",
    scale: 0.97,
  },
  {
    meta: "Premières années",
    title: "Premières constructions",
    caption: "Projets scolaires, expériences de design et le premier instinct de rendre les idées tangibles.",
    tone: "smoke",
    src: "/images/about-teaser/makerspace-lab.jpeg",
    alt: "Rayann travaillant dans un makerspace entouré d'équipement électronique.",
    focus: "center 35%",
    scale: 0.97,
  },
  {
    meta: "Communauté",
    title: "Travail humanitaire",
    caption: "Le leadership appris par l'attention, la coordination et le fait d'être utile ensemble.",
    tone: "bronze",
    src: "/images/about-teaser/montreal-oratory.jpeg",
    alt: "Rayann au pied des marches de l'Oratoire Saint-Joseph à Montréal.",
    focus: "center 58%",
    scale: 0.92,
  },
  {
    meta: "Établi",
    title: "Systèmes pratiques",
    caption: "Électronique, réparations, patience et la discipline de faire se comporter les objets physiques.",
    tone: "smoke",
    src: "/images/about-teaser/mountain-landscape.png",
    alt: "Montagnes enneigées éclairées par le coucher de soleil sous un ciel violet.",
    focus: "center 42%",
    scale: 0.94,
    hideOnMobile: true,
  },
  {
    meta: "Énergie d'équipe",
    title: "Salles de hackathon",
    caption: "Des moments où les prototypes cessent d'être abstraits et commencent à sembler réels.",
    tone: "ember",
    src: "/images/about-teaser/aquarium-tunnel.jpeg",
    alt: "Rayann visitant un tunnel d'aquarium avec des requins et des poissons tropicaux.",
    focus: "34% 58%",
    scale: 0.92,
  },
  {
    meta: "Ottawa",
    title: "Un horizon plus vaste",
    caption: "Une nouvelle ville, un environnement technique plus profond et des questions plus nettes sur l'impact.",
    tone: "smoke",
    src: "/images/about-teaser/gokart-track.jpeg",
    alt: "Rayann conduisant un kart sur une piste extérieure.",
    focus: "center 54%",
    scale: 0.92,
  },
  {
    meta: "Quotidien",
    title: "Rythme du campus",
    caption: "Laboratoires, transports, cours et la routine ordinaire derrière une ambition à long terme.",
    tone: "bronze",
    src: "/images/about-teaser/ottawa-night-friends.jpeg",
    alt: "Rayann avec des amis à Ottawa la nuit.",
    focus: "center 56%",
    scale: 0.9,
  },
  {
    meta: "Hors écran",
    title: "La vie en dehors de l'écran",
    caption: "Voyages, mouvement, communauté et les scènes qui gardent le travail humain.",
    tone: "ember",
    src: "/images/about-teaser/niagara-falls-night.jpeg",
    alt: "Rayann aux chutes du Niagara la nuit, les chutes illuminées en vert et bleu.",
    focus: "center 52%",
    scale: 0.92,
  },
] as const;
