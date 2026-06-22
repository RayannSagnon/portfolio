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
      { label: "Platform", value: "Android" },
      { label: "Kotlin", value: "2.0" },
      { label: "Jetpack", value: "Compose" },
      { label: "License", value: "MIT" },
      { label: "CI", value: "GitHub Actions" },
    ],
    why: {
      title: "Why StudentOS",
      body: "StudentOS combines a polished dashboard, task organization, and study-session support to give students a simple command center for their academic routine.",
    },
    highlights: [
      "Clean Material 3 interface",
      "Smart dashboard with weekly progress and study streak",
      "Course and assignment tracking",
      "Focus session flow for study blocks",
      "Local persistence with Firebase-ready integration",
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
        "JDK 11 or newer",
        "Android SDK with API 35",
      ],
      steps: [
        "Open the project in Android Studio.",
        "Sync Gradle.",
        "Launch an emulator or connect a device.",
        "Run the app.",
      ],
      buildCommand: "./gradlew assembleDebug",
    },
    projectStructure: `app/
  src/main/java/com/studentos/app/
    ui/           # Screens and Compose UI
    navigation/   # Route definitions
    viewmodel/    # Screen state and logic
    data/         # Repositories, Room, Firebase integration`,
    roadmap: [
      "Improve analytics and reporting",
      "Add reminders and notifications",
      "Expand study-session insights",
      "Polish the onboarding experience",
    ],
  },
};
