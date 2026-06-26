export type FieldExperienceType = "professional" | "volunteer" | "leadership" | "student";

export type FieldExperienceDetail = {
  context: string;
  problem: string;
  approach: string;
  outcome: string;
};

export type FieldExperienceDocument = {
  id: string;
  title: string;
  caption: string;
  kind: "pdf" | "image";
  src: string;
  downloadFileName: string;
};

export type FieldExperienceMedia = {
  src?: string;
  title: string;
  caption: string;
  detail: FieldExperienceDetail;
};

export type FieldExperienceEntry = {
  id: string;
  timelineYear: number;
  dateLabel: string;
  title: string;
  organization: string;
  type: FieldExperienceType;
  summary: string;
  skills: string[];
  documents?: FieldExperienceDocument[];
  media?: FieldExperienceMedia[];
};

export const fieldExperienceIntro = {
  eyebrow: "Expérience terrain",
  title: "Chaque projet enseigne quelque chose.",
  subtitle: "Chaque rôle laisse une façon de penser.",
};

export const fieldExperienceStats = [
  { value: "4+", label: "Expériences professionnelles" },
  { value: "6+", label: "Postes de leadership" },
  { value: "3+", label: "Années d'expérience technique" },
  { value: "2", label: "Pays" },
] as const;

export const fieldExperiences: FieldExperienceEntry[] = [
  {
    id: "online-training-assistant",
    timelineYear: 2026,
    dateLabel: "2026 · En cours",
    title: "Adjoint à la formation en ligne et à l'engagement",
    organization: "University of Ottawa",
    type: "professional",
    summary:
      "J'aide à construire des formations en accessibilité qui atteignent le personnel à travers l'université. Cela signifie extraire du contenu d'Articulate et Clipchamp vers Brightspace, structurer des modules autour des normes AODA et d'accommodation, et soutenir les événements DEIA avec des documents que les gens veulent vraiment ouvrir.",
    skills: [
      "Brightspace",
      "Articulate",
      "Accessibility",
      "Clipchamp",
      "WCAG",
      "AODA",
      "Training design",
      "Graphic design",
      "DEIA",
    ],
    documents: [
      {
        id: "human-rights-office-team",
        title: "Équipe du bureau des droits de la personne",
        caption:
          "Membre de l'équipe au bureau des droits de la personne, soutien aux forums DEIA et à l'engagement en accessibilité sur le campus.",
        kind: "image",
        src: "/documents/field-experience/human-rights-office-team.png",
        downloadFileName: "human-rights-office-team.png",
      },
    ],
    media: [
      {
        title: "Travail sur les modules d'accessibilité",
        caption: "Modules d'apprentissage Brightspace conçus pour la formation à l'échelle de l'université.",
        detail: {
          context:
            "L'université avait besoin d'une formation du personnel sur les obligations d'accessibilité en vertu de la loi ontarienne.",
          problem:
            "Les documents existants étaient dispersés entre plusieurs outils et difficiles à maintenir à grande échelle.",
          approach:
            "Extraction et intégration de contenu depuis Articulate et Clipchamp dans des modules Brightspace structurés.",
          outcome:
            "Le personnel a obtenu un parcours plus clair et plus cohérent pour la formation en accessibilité et accommodation.",
        },
      },
    ],
  },
  {
    id: "it-support-assistant",
    timelineYear: 2026,
    dateLabel: "Jan · Avr 2026",
    title: "Adjoint au support informatique",
    organization: "uOttawa Faculty of Engineering",
    type: "professional",
    summary:
      "J'ai soutenu des étudiants et du personnel dans un véritable environnement informatique d'ingénierie : diagnostic de problèmes matériels et logiciels, suivi de tickets et maintien de l'équipement de laboratoire. Cela m'a appris comment les systèmes d'entreprise sont déployés, documentés et maintenus quand des personnes comptent dessus.",
    skills: [
      "Windows",
      "Hardware diagnostics",
      "Networking",
      "SCCM",
      "Documentation",
      "Troubleshooting",
      "Customer support",
    ],
  },
  {
    id: "leagler",
    timelineYear: 2025,
    dateLabel: "2025 · En cours",
    title: "Membre",
    organization: "LEagler",
    type: "leadership",
    summary:
      "En dehors des cours, j'ai rejoint LEagler pour grandir à travers des ateliers, du réseautage et des événements communautaires. Cela m'a poussé à être plus confiant, à collaborer entre horizons différents et à pratiquer un leadership moins lié aux titres qu'à la constance.",
    skills: ["Networking", "Collaboration", "Teamwork", "Communication", "Event planning"],
  },
  {
    id: "free-store-volunteer",
    timelineYear: 2025,
    dateLabel: "Sep · Déc 2025",
    title: "Bénévole au Free Store",
    organization: "uOttawa Office of Campus Sustainability",
    type: "volunteer",
    summary:
      "Au Free Store, j'accueillais les visiteurs, maintenais les étagères organisées et aidais les étudiants à trouver ce dont ils avaient besoin sans frais. De petites routines d'attention, de tri et de réutilisation ont rendu une ressource du campus accueillante plutôt que chaotique.",
    skills: ["Community service", "Organization", "Sustainability", "Customer care"],
  },
  {
    id: "it-facilities-coordinator",
    timelineYear: 2024,
    dateLabel: "2023 · 2025",
    title: "Coordonnateur des installations informatiques",
    organization: "Groupe scolaire les Lauréats",
    type: "professional",
    summary:
      "J'ai supervisé les ordinateurs, imprimantes et réseaux de l'école tout en formant plus de 50 enseignants et étudiants sur les outils qu'ils utilisaient chaque jour. Quand quelque chose tombait en panne, je coordonnais les réparations et les mises à jour pour que les cours puissent continuer.",
    skills: [
      "IT infrastructure",
      "Hardware maintenance",
      "Network support",
      "Software deployment",
      "Technical training",
    ],
    media: [
      {
        title: "Certificat de coordonnateur des installations informatiques",
        caption: "Certificat reconnaissant la coordination informatique au Groupe Scolaire les Lauréats, de 2023 à 2025.",
        detail: {
          context:
            "L'école dépendait de laboratoires informatiques partagés, de postes de bibliothèque et d'appareils en salle d'étude.",
          problem:
            "Les pannes matérielles et les logiciels obsolètes ralentissaient les cours et le travail administratif.",
          approach:
            "Maintenance de l'équipement, coordination des réparations, déploiement des mises à jour et soutien aux utilisateurs sur le campus.",
          outcome:
            "Les enseignants et étudiants avaient un accès plus fiable aux outils dont ils avaient besoin chaque jour.",
        },
      },
    ],
  },
  {
    id: "magazine-editor",
    timelineYear: 2023,
    dateLabel: "2022 · 2024",
    title: "Rédacteur et éditeur",
    organization: "Groupe scolaire les Lauréats",
    type: "student",
    summary:
      "J'ai rédigé, édité et publié trois éditions du magazine scolaire en version imprimée et en ligne. Le travail était à la fois éditorial et design : mise en page, accompagnement des contributeurs et transformation des histoires d'étudiants en quelque chose que toute l'école pouvait tenir en main.",
    skills: ["Editing", "Writing", "Layout design", "Visual storytelling", "Publishing"],
    documents: [
      {
        id: "laureats-magazine-edition-2",
        title: "Magazine scolaire Lauréats",
        caption: "Deuxième édition conçue avec Adobe InDesign et Pages.",
        kind: "pdf",
        src: "/documents/field-experience/laureats-magazine-edition-2.pdf",
        downloadFileName: "laureats-magazine-edition-2.pdf",
      },
    ],
  },
  {
    id: "web-development-intern",
    timelineYear: 2023,
    dateLabel: "Été 2023",
    title: "Stagiaire en développement web",
    organization: "CVP Burkina",
    type: "student",
    summary:
      "Mon premier stage m'a confronté à HTML, CSS et JavaScript avec une vraie échéance. J'ai aidé à livrer un site web fonctionnel, débogué des problèmes avec l'équipe et appris à quel point le développement repose sur la patience, les tests et les petites corrections qui s'accumulent.",
    skills: ["HTML", "CSS", "JavaScript", "VS Code", "XAMPP", "Teamwork"],
  },
  {
    id: "charity-club-board",
    timelineYear: 2022,
    dateLabel: "2022 · 2025",
    title: "Membre du conseil",
    organization: "Groupe Scolaire Les Lauréats Charity Club",
    type: "leadership",
    summary:
      "Au conseil du club caritatif, j'ai aidé à organiser une aide menée par des étudiants pour des communautés touchées par le déplacement dans le nord du Burkina Faso. C'était une preuve précoce qu'une compétence technique compte peu si on n'apprend jamais à servir les gens autour de soi.",
    skills: ["Nonprofit organizing", "Community outreach", "Fundraising", "Team coordination"],
    documents: [
      {
        id: "halloween-charity-flyer",
        title: "Soirée caritative d'Halloween",
        caption: "Affiche pour une collecte de fonds scolaire soutenant des salles de classe dans des quartiers défavorisés.",
        kind: "image",
        src: "/documents/field-experience/halloween-charity-flyer.jpeg",
        downloadFileName: "halloween-charity-flyer.jpeg",
      },
      {
        id: "equality-booklet",
        title: "Livret sur l'égalité",
        caption: "Livret imprimé créé pour une initiative scolaire d'égalité et d'inclusion.",
        kind: "pdf",
        src: "/documents/field-experience/equality-booklet.pdf",
        downloadFileName: "equality-booklet.pdf",
      },
    ],
  },
  {
    id: "orange-hackathon",
    timelineYear: 2022,
    dateLabel: "2022",
    title: "Équipe gagnante",
    organization: "Orange Hackathon",
    type: "student",
    summary:
      "Notre équipe a concouru contre 135 autres sur un défi réel d'Orange et a remporté la première place. J'ai aidé à façonner le pitch, le récit produit et le document de soumission présenté au jury.",
    skills: ["Product storytelling", "Presentation design", "Teamwork", "Rapid prototyping"],
    documents: [
      {
        id: "orange-med-planner",
        title: "Orange Med Planner",
        caption: "Document de soumission présenté au jury du hackathon.",
        kind: "pdf",
        src: "/documents/field-experience/orange-med-planner.pdf",
        downloadFileName: "orange-med-planner.pdf",
      },
    ],
  },
];
