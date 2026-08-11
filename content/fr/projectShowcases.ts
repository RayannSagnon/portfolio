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
  /** Bannière pleine largeur au-dessus du contenu de la page */
  showHeroBanner?: boolean;
  hero: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Ratio de cadre partagé pour les mockups */
  screenFrame: {
    width: number;
    height: number;
  };
  screens: ShowcaseScreen[];
};

export const projectShowcases: Record<string, ProjectShowcaseData> = {
  studentos: {
    status: "Beta fermée · Expo",
    showHeroBanner: true,
    hero: {
      src: "/images/projects/studentos/hero-presentation.png",
      alt: "Bannière StudentOS : centre de commande académique pour étudiants",
      width: 2560,
      height: 1280,
    },
    screenFrame: {
      width: 640,
      height: 1380,
    },
    screens: [
      {
        src: "/images/projects/studentos/screen-login.png",
        alt: "Écran de connexion OTP StudentOS",
        label: "Rejoindre la beta",
        caption: "Courriel scolaire + code unique : onboarding beta à faible friction.",
        width: 640,
        height: 1380,
      },
      {
        src: "/images/projects/studentos/screen-home.png",
        alt: "Centre de commande StudentOS",
        label: "Accueil",
        caption: "Progression hebdomadaire, série et prochaine action académique.",
        width: 640,
        height: 1380,
      },
      {
        src: "/images/projects/studentos/screen-calendar.png",
        alt: "Écran calendrier StudentOS",
        label: "Calendrier",
        caption: "Cours, examens et vacances visibles en jour, semaine et mois.",
        width: 640,
        height: 1380,
      },
      {
        src: "/images/projects/studentos/screen-focus.png",
        alt: "Écran de concentration StudentOS",
        label: "Focus",
        caption: "Blocs d'étude avec timer et musique : le deep work dans la boucle produit.",
        width: 640,
        height: 1380,
      },
    ],
  },
  signs: {
    status: "Livré · Équipe de 2",
    showHeroBanner: true,
    hero: {
      src: "/images/projects/signs/hero-banner-fr.png",
      alt: "Bannière SIgns : apprendre la langue des signes avec parcours guidés et Practice Mirror",
      width: 3200,
      height: 1200,
    },
    screenFrame: {
      width: 500,
      height: 1024,
    },
    screens: [
      {
        src: "/images/projects/signs/screen-home.png",
        alt: "Parcours d'accueil SIgns",
        label: "Accueil",
        caption: "Un parcours clair avec série, gemmes et la prochaine leçon.",
        width: 500,
        height: 1024,
      },
      {
        src: "/images/projects/signs/screen-practice.png",
        alt: "Écran d'exercices SIgns",
        label: "Pratique",
        caption: "Quiz du jour, défis, flashcards et associations à ton rythme.",
        width: 498,
        height: 1024,
      },
      {
        src: "/images/projects/signs/screen-profile.png",
        alt: "Écran profil et progression SIgns",
        label: "Profil",
        caption: "Niveau, jours de pratique, badges et boucles de motivation.",
        width: 495,
        height: 1024,
      },
      {
        src: "/images/projects/signs/icon.png",
        alt: "Icône de l'app SIgns",
        label: "Marque",
        caption: "Construit à deux autour du dictionnaire et des leçons structurées.",
        width: 1024,
        height: 1024,
      },
    ],
  },
};
