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
      { label: "Platform", value: "React Native" },
      { label: "Expo", value: "SDK 54" },
      { label: "Stage", value: "Closed beta" },
      { label: "License", value: "MIT" },
    ],
    why: {
      title: "Why StudentOS",
      body: "University students do not fail because they lack tools. They fail because academic life is fragmented. StudentOS is a student-first planner that behaves like an academic OS: home, classes, calendar, focus, Ask AI, and cloud sync with school-email OTP for closed beta.",
    },
    highlights: [
      "Academic objects: classes, tasks, exams, vacations",
      "Home command center with weekly progress and next actions",
      "Focus timer / stopwatch with music in the product loop",
      "Ask AI study coach via server proxy",
      "Closed beta join with school email + OTP",
      "Native path: Expo Go → EAS → TestFlight / App Store",
    ],
    techStack: [
      "React Native",
      "Expo Router (SDK 54)",
      "TypeScript",
      "Zustand + AsyncStorage",
      "Express API + SQLite",
      "EAS Build / Submit",
    ],
    gettingStarted: {
      prerequisites: [
        "Node.js 20+",
        "npm",
        "Expo Go on iPhone for device testing",
      ],
      steps: [
        "Clone the StudentOS repository.",
        "Run npm install (and npm --prefix server install if using the local API).",
        "Start with npm run start:go and scan the QR code in Expo Go.",
        "Join the closed beta with school email + verification code.",
      ],
      buildCommand: "npm run start:go",
    },
    projectStructure: `app/           # Expo Router screens
components/    # Shared UI
src/           # Domain logic
server/        # Express API + SQLite
store/         # Beta + native distribution docs
screenshots/   # Product captures`,
    roadmap: [
      "Harden native iOS distribution (TestFlight / App Store)",
      "Complete calendar and music OAuth providers",
      "Grow closed-beta feedback into prioritized product learning",
      "Scale only after students run a full semester inside StudentOS",
    ],
  },
  signs: {
    badges: [
      { label: "Platform", value: "React Native" },
      { label: "Team", value: "2 builders" },
      { label: "Focus", value: "Accessibility" },
      { label: "Pillars", value: "Dictionary + lessons" },
    ],
    why: {
      title: "Why SIgns",
      body: "Most language-learning products focus on spoken languages. SIgns bridges that gap with a mobile-first experience built around a visual dictionary and structured, bite-sized lessons, shipped by a two-person team.",
    },
    highlights: [
      "Visual dictionary with search, categories, and favorites",
      "Structured lesson paths by difficulty",
      "Recognition, matching, and recall exercises",
      "Progress tracking and completion streaks",
      "Single React Native codebase for iOS and Android",
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
        "npm or yarn",
        "iOS Simulator, Android emulator, or a physical device",
      ],
      steps: [
        "Clone the SIgns repository (screadman/SIgns).",
        "Open the asl-app workspace and install dependencies.",
        "Start the React Native app on iOS or Android.",
        "Explore the dictionary and lesson flows end to end.",
      ],
    },
    projectStructure: `asl-app/
  assets/asl/     # Sign media by category
  assets/onboarding/
  # React Native screens, navigation, and state`,
    roadmap: [
      "Expand conversational lesson coverage",
      "Strengthen progress and review loops",
      "Improve discovery across the dictionary",
      "Keep accessibility first as the product grows",
    ],
  },
};
