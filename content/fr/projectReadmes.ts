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
      { label: "Plateforme", value: "Android" },
      { label: "Kotlin", value: "2.0" },
      { label: "Jetpack", value: "Compose" },
      { label: "Licence", value: "MIT" },
      { label: "CI", value: "GitHub Actions" },
    ],
    why: {
      title: "Pourquoi StudentOS",
      body: "StudentOS combine un tableau de bord soigné, l'organisation des tâches et le soutien aux sessions d'étude pour offrir aux étudiants un centre de commande simple pour leur routine académique.",
    },
    highlights: [
      "Interface Material 3 épurée",
      "Tableau de bord intelligent avec progression hebdomadaire et série d'étude",
      "Suivi des cours et des devoirs",
      "Flux de session de concentration pour les blocs d'étude",
      "Persistance locale avec intégration prête pour Firebase",
    ],
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Navigation Compose",
      "Room Database",
      "Firebase Auth / Firestore",
      "ViewModel + StateFlow",
    ],
    gettingStarted: {
      prerequisites: [
        "Android Studio",
        "JDK 11 ou plus récent",
        "Android SDK avec API 35",
      ],
      steps: [
        "Ouvrir le projet dans Android Studio.",
        "Synchroniser Gradle.",
        "Lancer un émulateur ou connecter un appareil.",
        "Exécuter l'application.",
      ],
      buildCommand: "./gradlew assembleDebug",
    },
    projectStructure: `app/
  src/main/java/com/studentos/app/
    ui/           # Écrans et interface Compose
    navigation/   # Définitions des routes
    viewmodel/    # État et logique des écrans
    data/         # Repositories, Room, intégration Firebase`,
    roadmap: [
      "Améliorer les analyses et les rapports",
      "Ajouter des rappels et des notifications",
      "Étendre les insights des sessions d'étude",
      "Peaufiner l'expérience d'intégration",
    ],
  },
};
