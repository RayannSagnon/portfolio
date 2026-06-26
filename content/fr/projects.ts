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
  {
    slug: "rc-x",
    code: "02",
    name: "RC-X",
    tag: "Embarqué · Contrôle en temps réel",
    type: "embedded",
    hue: 18,
    glyph: "[ <RX>\n  <ESC>\n  <IMU> ]",
    blurb:
      "Une plateforme embarquée à l'échelle 1:10 pour le contrôle à distance en temps réel : firmware personnalisé, boucle sous 10 ms et une approche honnête axée sur le matériel pour le mouvement intelligent.",
    architecture: [
      ["MCU",   "STM32 · 168 MHz · firmware personnalisé"],
      ["Lien",  "2,4 GHz · boucle de contrôle sous 10 ms"],
      ["Capteurs", "IMU · effet Hall · mesure de courant"],
      ["Châssis", "Composite 1:10"],
    ],
    tradeoffs: [
      ["Décision",   "C bare-metal plutôt que RTOS"],
      ["Compromis",   "Moins d'abstraction, moins de surprises"],
      ["Contrainte", "Budget diagnostic sous 50 Ko/s"],
    ],
    highlights: [
      ["Pourquoi",  "Le matériel en temps réel est l'ingénierie la plus honnête."],
      ["Suite", "Vision embarquée · autonomie au tour."],
    ],
  },
  {
    slug: "physical-whiteboard-ai",
    code: "03",
    name: "Physical Whiteboard AI",
    tag: "IA physique · Vision par ordinateur",
    type: "ai",
    hue: 350,
    glyph: "[ ▢▢▢\n  ▢AI▢\n  ▢▢▢ ]",
    blurb:
      "Une unité d'IA physique de comptoir qui observe, comprend et répond au travail sur tableau blanc dans le monde réel, en traitant la pièce comme interface.",
    architecture: [
      ["Vision", "RGB · profondeur · pipeline OCR"],
      ["IA",  "Multimodal · conscient de l'espace"],
      ["Processus",   "Observer → comprendre → répondre"],
      ["Forme",   "Unité embarquée de comptoir"],
    ],
    tradeoffs: [
      ["Décision",   "Inférence sur appareil plutôt que cloud"],
      ["Compromis",   "Modèles plus petits, retour plus rapide"],
      ["Contrainte", "Enveloppe thermique sous refroidissement passif"],
    ],
    highlights: [
      ["Pourquoi",  "Le tableau blanc est l'interface originelle."],
      ["Suite", "Graphe de contexte multi-pièces."],
    ],
  },
  {
    slug: "dormlight",
    code: "04",
    name: "DormLight",
    tag: "Interface homme-machine · IoT",
    type: "hardware",
    hue: 38,
    glyph: "[ on-on\n  ⏻⏻⏻\n  cmd·lt ]",
    blurb:
      "Un contrôleur de chambre intelligent en rétrofit qui actionne physiquement les interrupteurs muraux : matériel embarqué qui adapte un espace qu'on ne peut pas recâbler.",
    architecture: [
      ["Actionneur", "Servo · déclencheur capacitif"],
      ["Lien",   "Wi-Fi · MQTT · courtier local"],
      ["Edge",   "ESP32-S3 · mises à jour OTA"],
      ["Sécurité", "Défaillance mécanique ouverte"],
    ],
    tradeoffs: [
      ["Décision",   "Actionnement mécanique plutôt que recâblage"],
      ["Compromis",   "Unité plus volumineuse, risque électrique nul"],
      ["Contrainte", "Autonomie batterie > 4 mois"],
    ],
    highlights: [
      ["Pourquoi",  "Adapter la pièce qu'on ne peut pas recâbler."],
      ["Suite", "Voix + détection de présence."],
    ],
  },
  {
    slug: "architecture-flow",
    code: "05",
    name: "Architecture Flow",
    tag: "Topologie interactive · Données",
    type: "software",
    hue: 200,
    glyph: "[ ◇→◇\n  ↓ ◇\n  flow→  ]",
    blurb:
      "Un visualiseur de topologie en direct pour des architectures logicielles complexes. Chaque point est un comportement, chaque arête une intention. L'architecture est l'idée, rendue visible.",
    architecture: [
      ["Forme",  "WebGL · topologie en direct"],
      ["Sources", "Événements sémantiques · relations"],
      ["Disposition", "Force-directed · pondérée"],
      ["Interaction", "Survol · focus · isolation"],
    ],
    tradeoffs: [
      ["Décision",   "Disposition force-directed plutôt que grille fixe"],
      ["Compromis",   "Mouvement vivant, moins de prévisibilité"],
      ["Contrainte", "60 ips avec 500+ points"],
    ],
    highlights: [
      ["Pourquoi",  "L'architecture est l'idée. Montrez-la."],
      ["Suite", "Superposition multi-projets."],
    ],
  },
  {
    slug: "embedded-vision",
    code: "06",
    name: "Embedded Vision",
    tag: "CV embarquée · Capteurs à faible coût",
    type: "embedded",
    hue: 160,
    glyph: "[ <eye>\n  <det>\n  <act> ]",
    blurb:
      "Une plateforme de vision embarquée à faible coût explorant la conscience spatiale sur de petits MCU. L'intelligence rapprochée du matériel.",
    architecture: [
      ["MCU",   "ESP32-S3 · ESP-DL"],
      ["IA", "Quantifié · sur appareil"],
      ["Capteurs", "Caméra mono · profondeur IR"],
      ["Forme",  "Sous 30 $ · châssis ouvert"],
    ],
    tradeoffs: [
      ["Décision",   "Quantification INT8 · pipeline 8 bits"],
      ["Compromis",   "~3 % de perte de précision pour 10× la vitesse"],
      ["Contrainte", "Fonctionne dans 280 Ko de SRAM"],
    ],
    highlights: [
      ["Pourquoi",  "L'intelligence appartient au edge."],
      ["Suite", "Stéréo multi-caméras · pose."],
    ],
  },
  {
    slug: "neural-interface",
    code: "07",
    name: "Neural Interface",
    tag: "Spéculatif · Homme-machine",
    type: "speculative",
    hue: 270,
    glyph: "[ ~~~~\n  /\\/\\\n  sense ]",
    blurb:
      "Une sonde spéculative sur l'interaction homme-machine ambiante : regard, geste, respiration comme entrées. La spéculation comme ingénierie à longue portée.",
    architecture: [
      ["Forme",  "Spatial · ambiant"],
      ["Contrôles", "Regard · geste · respiration"],
      ["Scène", "Graphe spatial génératif"],
      ["Interface", "HUD calme · minimal"],
    ],
    tradeoffs: [
      ["Décision",   "Contrôles ambiants plutôt que commandes explicites"],
      ["Compromis",   "Ambiguïté pour moins de friction"],
      ["Contrainte", "Budget de latence sous 80 ms"],
    ],
    highlights: [
      ["Pourquoi",  "La spéculation est l'ingénierie à longue portée."],
      ["Suite", "Construction incarnée."],
    ],
  },
];
