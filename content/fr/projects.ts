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
  /** Emplacement carousel uniquement — pas de page projet */
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
    tag: "Espace académique · Interface intelligente",
    type: "software",
    hue: 218,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    cardImage: "/images/projects/studentos/screen-home.png",
    blurb:
      "Un espace académique qui regroupe productivité, planification et flux d'étude dans une surface adaptative, conçu pour les étudiants qui vivent dans neuf onglets.",
    architecture: [],
    tradeoffs: [
      ["Décision",    "Stockage local plutôt que synchronisation cloud"],
      ["Compromis",    "Intégration plus lente pour une confidentialité renforcée"],
      ["Contrainte",  "Fonctionne hors ligne sur du matériel vieillissant"],
    ],
    highlights: [
      ["Pourquoi",  "Les étudiants vivent dans 9 onglets. Ils méritent un seul endroit."],
      ["Suite", "Modèles d'apprentissage inter-institutionnels."],
    ],
  },
];
