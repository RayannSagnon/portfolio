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
  /** Emplacement carousel uniquement, pas de page projet */
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
    tag: "OS académique · Beta fermée",
    type: "software",
    hue: 218,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    cardImage: "/images/projects/studentos/card.png",
    blurb:
      "Un système d'exploitation académique pour étudiants : cours, tâches, calendrier, focus et Ask AI dans un seul espace, en beta fermée sur React Native / Expo.",
    architecture: [],
    tradeoffs: [
      ["Décision", "OTP par courriel scolaire pour l'onboarding beta"],
      ["Compromis", "Profondeur académique plutôt qu'un autre Notion"],
      ["Contrainte", "Valider l'usage avant de scaler la distribution App Store"],
    ],
    highlights: [
      ["Pourquoi", "Les étudiants échouent par fragmentation, pas par manque d'outils."],
      ["Suite", "Chemin natif iOS : Expo Go → TestFlight → App Store."],
    ],
  },
  {
    slug: "signs",
    code: "02",
    name: "SIgns",
    tag: "Accessibilité · Langue des signes",
    type: "software",
    hue: 168,
    glyph: "",
    repoUrl: "https://github.com/screadman/SIgns",
    cardImage: "/images/projects/signs/card.png",
    blurb:
      "Une app React Native, construite à deux, qui rend l'apprentissage de la langue des signes accessible via un dictionnaire visuel et des leçons structurées.",
    architecture: [],
    tradeoffs: [
      ["Décision", "Dictionnaire + leçons comme deux piliers produit"],
      ["Compromis", "Un seul codebase RN pour shipper iOS et Android à deux"],
      ["Contrainte", "Rester accessible sans devenir un clone d'app de langues parlées"],
    ],
    highlights: [
      ["Pourquoi", "Les apps de langues parlées dominent ; les langues des signes restent sous-servies."],
      ["Suite", "Parcours de leçons plus riches et boucles de progression plus fortes."],
    ],
  },
];
