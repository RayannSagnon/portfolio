export type ShowcaseScreen = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  width: number;
  height: number;
};

export type ProjectShowcaseData = {
  status: string;
  /** Full-width presentation banner above the page content */
  showHeroBanner?: boolean;
  hero: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Shared frame ratio so every phone mockup sits in the same box */
  screenFrame: {
    width: number;
    height: number;
  };
  screens: ShowcaseScreen[];
};

export const projectShowcases: Record<string, ProjectShowcaseData> = {
  studentos: {
    status: "Prototype · MVP",
    showHeroBanner: true,
    hero: {
      src: "/images/projects/studentos/hero-presentation.png",
      alt: "Présentation produit StudentOS, application mobile de productivité étudiante",
      width: 1024,
      height: 576,
    },
    screenFrame: {
      width: 519,
      height: 1024,
    },
    screens: [
      {
        src: "/images/projects/studentos/screen-home.png",
        alt: "Écran d'accueil du tableau de bord StudentOS",
        label: "Tableau de bord",
        caption: "Progression hebdomadaire, sessions de concentration et échéances dans un centre de commande.",
        width: 519,
        height: 1024,
      },
      {
        src: "/images/projects/studentos/screen-courses.png",
        alt: "Écran des cours StudentOS",
        label: "Cours",
        caption: "Cartes de cours avec parcours codés par couleur et contexte des enseignants en un coup d'œil.",
        width: 519,
        height: 1024,
      },
      {
        src: "/images/projects/studentos/screen-tasks.png",
        alt: "Écran des devoirs StudentOS",
        label: "Tâches",
        caption: "Devoirs actifs et terminés avec étiquettes de cours et dates d'échéance.",
        width: 519,
        height: 1024,
      },
    ],
  },
};
