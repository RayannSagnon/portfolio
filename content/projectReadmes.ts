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
  standout: {
    badges: [
      { label: "Type", value: "Client studio" },
      { label: "Role", value: "Co-founder" },
      { label: "Market", value: "Ottawa · EN/FR" },
      { label: "Stage", value: "Delivering" },
    ],
    why: {
      title: "Why Standout Studio",
      body: "Standout Studio is where product work meets paying clients: discovery meetings, scoped proposals, design and build iterations, and live sites. Early revenue is about $3K so far. That loop, problem → delivery → payment, is the proof, not a vanity metric.",
    },
    highlights: [
      "Co-founder role across product framing and web delivery",
      "Real client meetings and feedback rounds",
      "Bilingual Ottawa studio (English and French)",
      "Shipped marketing sites for paying clients",
      "About $3K in early studio revenue",
    ],
    techStack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "Vercel",
    ],
    gettingStarted: {
      prerequisites: ["A browser", "Curiosity about client delivery"],
      steps: [
        "Visit https://standoutstudio.ca for the live studio site.",
        "Review the GitHub repo for the marketing stack.",
        "Read this case study for discovery → delivery decisions.",
      ],
    },
    roadmap: [
      "Grow a small set of well-scoped client relationships",
      "Keep documenting V1 → feedback → V2 when clients allow it",
      "Stay bilingual and Ottawa-rooted",
    ],
  },
  studentos: {
    badges: [
      { label: "Platform", value: "React Native" },
      { label: "Expo", value: "SDK 54" },
      { label: "Stage", value: "Paused exploration" },
      { label: "License", value: "MIT" },
    ],
    why: {
      title: "Why StudentOS, and why it paused",
      body: "University students fail from fragmented academic life, not from a lack of tools. StudentOS explores an academic OS: home, classes, calendar, focus, Ask AI, and a school-email OTP path. I paused before a paid beta because useful AI coaching has a marginal cost and Apple distribution is not free. A portfolio beta that burns money without monetization is a bad product decision.",
    },
    highlights: [
      "Academic objects: classes, tasks, exams, vacations",
      "Home command center with weekly progress and next actions",
      "Focus timer / stopwatch with music in the product loop",
      "Ask AI study coach via server proxy (the cost center)",
      "School-email OTP path designed, not a live tester cohort",
      "Paused on purpose before Apple fees and API burn",
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
        "Expo Go if you want to run the prototype",
      ],
      steps: [
        "Clone the StudentOS repository.",
        "Run npm install (and npm --prefix server install if using the local API).",
        "Start with npm run start:go and scan the QR code in Expo Go.",
        "Treat this as a prototype exploration, not a public beta.",
      ],
      buildCommand: "npm run start:go",
    },
    projectStructure: `app/           # Expo Router screens
components/    # Shared UI
src/           # Domain logic
server/        # Express API + SQLite
store/         # Native distribution docs
screenshots/   # Product captures`,
    roadmap: [
      "Resume only if monetization and AI cost model are clear",
      "Keep the academic OS vision documented as product learning",
      "Do not run a vanity beta that burns distribution or API budget",
    ],
  },
  signs: {
    badges: [
      { label: "Platform", value: "React Native" },
      { label: "Team", value: "2 builders" },
      { label: "Focus", value: "Accessibility" },
      { label: "Stage", value: "Android beta ahead" },
    ],
    why: {
      title: "Why SIgns",
      body: "Most language-learning products focus on spoken languages. SIgns, co-built with Steven Readman, centers a visual dictionary and structured lessons for ASL learners. We are entering store submission and real tester recruitment. This page will gain real feedback metrics only after that loop exists.",
    },
    highlights: [
      "Visual dictionary with search, categories, and favorites",
      "Structured lesson paths by difficulty",
      "Recognition, matching, and recall exercises",
      "Progress tracking and completion streaks",
      "Single React Native codebase for iOS and Android",
      "Co-built with Steven Readman; shared product and engineering ownership",
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
      "Finish Android beta packaging and tester recruitment",
      "Replace assumptions with observed learner problems",
      "Iterate lesson and practice loops from real feedback",
    ],
  },
  rcx: {
    badges: [
      { label: "Platform", value: "Embedded" },
      { label: "Base", value: "ELEGOO kit" },
      { label: "Focus", value: "Real-time control" },
      { label: "Stage", value: "Learning platform" },
    ],
    why: {
      title: "Why RC-X",
      body: "RC-X started as a small remote-control platform and became a lesson in real-time control. On a laptop, you can hide behind abstraction. On a moving chassis, latency becomes visible, jitter becomes motion, and a loose connector becomes a behavior. Small platforms compress complexity — RC-X contains the same families of problems as a full autonomous vehicle: sensing, actuation, latency, safety, feedback, and operator trust.",
    },
    highlights: [
      "Kit-based ELEGOO Smart Robot Car chassis",
      "Four-wheel drive with DC gear motors",
      "Ultrasonic distance sensor on pan servo",
      "Camera module for visual feedback",
      "Bare-metal firmware path for platform legibility",
      "Control loop designed to feel boring — predictable enough that the vehicle disappears under operator intent",
      "Radio trade-off discipline: what to send now vs log later",
    ],
    techStack: [
      "ELEGOO Smart Robot Car kit",
      "HC-SR04-style ultrasonic sensor",
      "Pan servo for sensor aiming",
      "Camera module",
      "DC gear motors",
      "Control board + shield",
      "Battery pack",
      "Bare-metal firmware",
    ],
    gettingStarted: {
      prerequisites: [
        "ELEGOO Smart Robot Car kit or similar 4WD chassis",
        "Firmware development environment",
        "Radio link for remote control",
      ],
      steps: [
        "Assemble the kit platform: chassis, motors, sensors, wiring.",
        "Build the control loop: read input, interpret, drive actuators, observe.",
        "Tune until the loop feels boring — predictable enough to disappear.",
        "See the archive essay for deeper lessons: /archive/rc-x-control-lessons",
      ],
    },
    projectStructure: `chassis/       # Physical assembly
firmware/      # Control loop and peripheral drivers
comms/         # Radio link and diagnostics
docs/          # Hardware notes and wiring diagrams`,
    roadmap: [
      "Move toward onboard perception",
      "Richer diagnostics without crowding the control channel",
      "Eventually closed-loop autonomy",
    ],
  },
};
