export type ProjectBadge = {
  label: string;
  value: string;
};

export type ProjectReadmeData = {
  badges: ProjectBadge[];
  why: {
    title: string;
    body: string;
  };
  highlights: string[];
  techStack: string[];
  gettingStarted: {
    prerequisites: string[];
    steps: string[];
    buildCommand?: string;
  };
  projectStructure?: string;
  roadmap?: string[];
};

export const projectReadmes: Record<string, ProjectReadmeData> = {
  studentos: {
    badges: [
      { label: "Plateforme", value: "React Native" },
      { label: "Expo", value: "SDK 54" },
      { label: "Stade", value: "Beta fermée" },
      { label: "Licence", value: "MIT" },
    ],
    why: {
      title: "Pourquoi StudentOS",
      body: "Les étudiants n'échouent pas par manque d'outils. Ils échouent parce que la vie académique est fragmentée. StudentOS est un planner étudiant qui se comporte comme un OS académique : accueil, cours, calendrier, focus, Ask AI, sync cloud et OTP par courriel scolaire pour la beta fermée.",
    },
    highlights: [
      "Objets académiques : cours, tâches, examens, vacances",
      "Centre de commande avec progression et prochaines actions",
      "Timer / chronomètre de focus avec musique dans la boucle produit",
      "Coach Ask AI via proxy serveur",
      "Beta fermée via courriel scolaire + OTP",
      "Chemin natif : Expo Go → EAS → TestFlight / App Store",
    ],
    techStack: [
      "React Native",
      "Expo Router (SDK 54)",
      "TypeScript",
      "Zustand + AsyncStorage",
      "API Express + SQLite",
      "EAS Build / Submit",
    ],
    gettingStarted: {
      prerequisites: [
        "Node.js 20+",
        "npm",
        "Expo Go sur iPhone pour tester sur appareil",
      ],
      steps: [
        "Cloner le dépôt StudentOS.",
        "Lancer npm install (et npm --prefix server install si besoin de l'API locale).",
        "Démarrer avec npm run start:go et scanner le QR dans Expo Go.",
        "Rejoindre la beta avec courriel scolaire + code de vérification.",
      ],
      buildCommand: "npm run start:go",
    },
    projectStructure: `app/           # Écrans Expo Router
components/    # UI partagée
src/           # Logique domaine
server/        # API Express + SQLite
store/         # Docs beta + distribution native
screenshots/   # Captures produit`,
    roadmap: [
      "Durcir la distribution native iOS (TestFlight / App Store)",
      "Finaliser les OAuth calendrier et musique",
      "Transformer le feedback beta en apprentissages produit priorisés",
      "Scaler seulement après qu'un semestre complet tourne dans StudentOS",
    ],
  },
  signs: {
    badges: [
      { label: "Plateforme", value: "React Native" },
      { label: "Équipe", value: "2 builders" },
      { label: "Focus", value: "Accessibilité" },
      { label: "Piliers", value: "Dictionnaire + leçons" },
    ],
    why: {
      title: "Pourquoi SIgns",
      body: "La plupart des produits d'apprentissage de langues se concentrent sur l'oral. SIgns comble ce manque avec une expérience mobile autour d'un dictionnaire visuel et de leçons structurées, livré par une équipe de deux.",
    },
    highlights: [
      "Dictionnaire visuel avec recherche, catégories et favoris",
      "Parcours de leçons structurés par difficulté",
      "Exercices de reconnaissance, association et rappel",
      "Suivi de progression et séries de complétion",
      "Un seul codebase React Native pour iOS et Android",
    ],
    techStack: [
      "React Native",
      "React Navigation",
      "Zustand",
      "Node.js",
      "PostgreSQL",
    ],
    gettingStarted: {
      prerequisites: [
        "Node.js",
        "npm ou yarn",
        "Simulateur iOS, émulateur Android ou appareil physique",
      ],
      steps: [
        "Cloner le dépôt SIgns (screadman/SIgns).",
        "Ouvrir le workspace asl-app et installer les dépendances.",
        "Lancer l'app React Native sur iOS ou Android.",
        "Parcourir le dictionnaire et les flux de leçons de bout en bout.",
      ],
    },
    projectStructure: `asl-app/
  assets/asl/     # Médias de signes par catégorie
  assets/onboarding/
  # Écrans React Native, navigation et état`,
    roadmap: [
      "Élargir la couverture des leçons conversationnelles",
      "Renforcer les boucles de progression et de révision",
      "Améliorer la découverte dans le dictionnaire",
      "Garder l'accessibilité au centre en grandissant",
    ],
  },
};
