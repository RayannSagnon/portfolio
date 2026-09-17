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
    tag: "Travail client · Co-fondateur",
    type: "client",
    hue: 172,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/standout-studio",
    showInCarousel: false,
    blurb:
      "Studio web bilingue à Ottawa. Vraies réunions clients, cadrage, itérations design/dev, sites livrés, environ 3 000 $ de revenus précoces à ce jour.",
    architecture: [],
    tradeoffs: [
      ["Décision", "Travailler en studio partenaire, pas en tickets freelance isolés"],
      ["Compromis", "Moins de projets, scope plus clair, suivi après livraison"],
      ["Contrainte", "Budget et délai fixés avec le client avant le build"],
    ],
    highlights: [
      ["Rôle", "Co-fondateur · cadrage produit, livraison web, itération client"],
      ["Preuve", "Clients payants, sites en ligne, studio bilingue à Ottawa"],
    ],
  },
  {
    slug: "signs",
    code: "01",
    name: "SIgns",
    tag: "Accessibilité · Préparation beta Android",
    type: "software",
    hue: 168,
    glyph: "",
    repoUrl: "https://github.com/screadman/SIgns",
    cardImage: "/images/projects/signs/card.png",
    blurb:
      "Produit d'apprentissage React Native co-construit avec Steven Readman. Dictionnaire visuel et leçons structurées pour l'ASL. Entrée en tests réels et beta Android.",
    architecture: [],
    tradeoffs: [
      ["Décision", "Dictionnaire + leçons comme deux piliers produit"],
      ["Compromis", "Un seul codebase RN pour atteindre les deux plateformes à deux"],
      ["Contrainte", "Rester accessible sans devenir un clone d'app de langues parlées"],
    ],
    highlights: [
      ["Pourquoi", "Les apps de langues parlées dominent ; les langues des signes restent sous-servies."],
      ["Maintenant", "Chemin store, recrutement beta et itération par feedback."],
    ],
  },
  {
    slug: "studentos",
    code: "02",
    name: "StudentOS",
    tag: "Exploration produit · En pause avant beta",
    type: "software",
    hue: 218,
    glyph: "",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    cardImage: "/images/projects/studentos/card.png",
    blurb:
      "Prototype d'OS académique : cours, tâches, calendrier, focus et Ask AI. Assez avancé pour révéler une décision produit dure, puis mis en pause avant une beta payante.",
    architecture: [],
    tradeoffs: [
      ["Décision", "Pause avant frais Apple et coûts API IA pour des testeurs gratuits"],
      ["Compromis", "Profondeur académique plutôt qu'un autre Notion"],
      ["Contrainte", "Un coach IA utile a un coût marginal sans monétisation"],
    ],
    highlights: [
      ["Pourquoi", "Les étudiants échouent par fragmentation, pas par manque d'outils."],
      ["Leçon", "Ne pas lancer une beta qui brûle de l'argent avant d'avoir un modèle clair."],
    ],
  },
  {
    slug: "rcx",
    code: "03",
    name: "RC-X",
    tag: "Embarqué · Contrôle temps réel",
    type: "embedded",
    hue: 35,
    glyph: "",
    cardImage: "/images/projects/rcx/card.png",
    cardLayout: "object",
    showInCarousel: true,
    blurb:
      "Une petite plateforme télécommandée devenue leçon de contrôle temps réel. La boucle est le produit : lire l'entrée, interpréter, actionner, observer, recommencer. Châssis kit enseignant perception, actionnement, latence et confiance de l'opérateur.",
    architecture: [],
    tradeoffs: [
      ["Décision", "Firmware bas niveau pour moins de décisions invisibles entre l'entrée et la sortie"],
      ["Compromis", "Plus de code de liaison, mais une plateforme lisible où les bugs ont moins d'endroits pour se cacher"],
      ["Contrainte", "Le canal radio force la question : de quoi l'opérateur a-t-il besoin maintenant vs journaliser plus tard ?"],
    ],
    highlights: [
      ["Cœur", "La boucle de contrôle doit sembler ennuyeuse — assez prévisible pour que le véhicule disparaisse sous l'intention de l'opérateur"],
      ["Suite", "Perception embarquée, diagnostics plus riches, et éventuellement autonomie en boucle fermée"],
    ],
  },
];
