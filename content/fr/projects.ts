export type Project = {
  slug: string;
  code: string;
  name: string;
  tag: string;
  type: "software" | "embedded" | "ai" | "hardware" | "speculative" | "client";
  hue: number;
  glyph: string;
  blurb: string;
  cardImage?: string;
  cardImageTop?: string;
  repoUrl?: string;
  comingSoon?: boolean;
  showInCarousel?: boolean;
  cardLayout?: "phone" | "object";
  architecture: [string, string][];
  tradeoffs: [string, string][];
  highlights: [string, string][];
};

export const projects: Project[] = [
  {
    slug: "standout",
    code: "00",
    name: "Standout Studio",
    tag: "Travail client Â· Co-fondateur",
    type: "client",
    hue: 172,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/standout-studio",
    showInCarousel: false,
    blurb:
      "Studio web bilingue Ã  Ottawa. Vraies rÃ©unions clients, cadrage, itÃ©rations design/dev, sites livrÃ©s, environ 3 000 $ de revenus prÃ©coces Ã  ce jour.",
    architecture: [],
    tradeoffs: [
      ["DÃ©cision", "Travailler en studio partenaire, pas en tickets freelance isolÃ©s"],
      ["Compromis", "Moins de projets, scope plus clair, suivi aprÃ¨s livraison"],
      ["Contrainte", "Budget et dÃ©lai fixÃ©s avec le client avant le build"],
    ],
    highlights: [
      ["RÃ´le", "Co-fondateur Â· cadrage produit, livraison web, itÃ©ration client"],
      ["Preuve", "Clients payants, sites en ligne, studio bilingue Ã  Ottawa"],
    ],
  },
  {
    slug: "signs",
    code: "01",
    name: "SIgns",
    tag: "AccessibilitÃ© Â· PrÃ©paration beta Android",
    type: "software",
    hue: 168,
    glyph: "",
    repoUrl: "https://github.com/screadman/SIgns",
    cardImage: "/images/projects/signs/card.png",
    blurb:
      "Produit d'apprentissage React Native co-construit avec Steven Readman. Dictionnaire visuel et leÃ§ons structurÃ©es pour l'ASL. EntrÃ©e en tests rÃ©els et beta Android.",
    architecture: [],
    tradeoffs: [
      ["DÃ©cision", "Dictionnaire + leÃ§ons comme deux piliers produit"],
      ["Compromis", "Un seul codebase RN pour atteindre les deux plateformes Ã  deux"],
      ["Contrainte", "Rester accessible sans devenir un clone d'app de langues parlÃ©es"],
    ],
    highlights: [
      ["Pourquoi", "Les apps de langues parlÃ©es dominent ; les langues des signes restent sous-servies."],
      ["Maintenant", "Chemin store, recrutement beta et itÃ©ration par feedback."],
    ],
  },
  {
    slug: "studentos",
    code: "02",
    name: "StudentOS",
    tag: "Exploration produit Â· En pause avant beta",
    type: "software",
    hue: 218,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    cardImage: "/images/projects/studentos/card.png",
    blurb:
      "Prototype d'OS acadÃ©mique : cours, tÃ¢ches, calendrier, focus et Ask AI. Assez avancÃ© pour rÃ©vÃ©ler une dÃ©cision produit dure, puis mis en pause avant une beta payante.",
    architecture: [],
    tradeoffs: [
      ["DÃ©cision", "Pause avant frais Apple et coÃ»ts API IA pour des testeurs gratuits"],
      ["Compromis", "Profondeur acadÃ©mique plutÃ´t qu'un autre Notion"],
      ["Contrainte", "Un coach IA utile a un coÃ»t marginal sans monÃ©tisation"],
    ],
    highlights: [
      ["Pourquoi", "Les Ã©tudiants Ã©chouent par fragmentation, pas par manque d'outils."],
      ["LeÃ§on", "Ne pas lancer une beta qui brÃ»le de l'argent avant d'avoir un modÃ¨le clair."],
    ],
  },
  {
    slug: "rcx",
    code: "03",
    name: "RC-X",
    tag: "EmbarquÃ© Â· ContrÃ´le temps rÃ©el",
    type: "embedded",
    hue: 35,
    glyph: "",
    cardImage: "/images/projects/rcx/card.png",
    cardLayout: "object",
    showInCarousel: true,
    blurb:
      "Une petite plateforme tÃ©lÃ©commandÃ©e devenue leÃ§on de contrÃ´le temps rÃ©el. La boucle est le produit : lire l'entrÃ©e, interprÃ©ter, actionner, observer, recommencer. ChÃ¢ssis kit enseignant perception, actionnement, latence et confiance de l'opÃ©rateur.",
    architecture: [],
    tradeoffs: [
      ["DÃ©cision", "Firmware bas niveau pour moins de dÃ©cisions invisibles entre l'entrÃ©e et la sortie"],
      ["Compromis", "Plus de code de liaison, mais une plateforme lisible oÃ¹ les bugs ont moins d'endroits pour se cacher"],
      ["Contrainte", "Le canal radio force la question : de quoi l'opÃ©rateur a-t-il besoin maintenant vs journaliser plus tard ?"],
    ],
    highlights: [
      ["CÅ“ur", "La boucle de contrÃ´le doit sembler ennuyeuse â€” assez prÃ©visible pour que le vÃ©hicule disparaisse sous l'intention de l'opÃ©rateur"],
      ["Suite", "Perception embarquÃ©e, diagnostics plus riches, et Ã©ventuellement autonomie en boucle fermÃ©e"],
    ],
  },
];
