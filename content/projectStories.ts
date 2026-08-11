export type StoryIcon =
  | "layout-dashboard"
  | "book-open"
  | "timer"
  | "check-square"
  | "layers"
  | "smartphone"
  | "database"
  | "cloud";

export type ProjectStoryData = {
  what: {
    title: string;
    subtitle: string;
    modules: {
      label: string;
      description: string;
      icon: StoryIcon;
    }[];
    stats: { value: string; label: string }[];
  };
  why: {
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    chaosTabs: string[];
    metrics: {
      label: string;
      before: number;
      after: number;
      unit?: string;
    }[];
  };
  how: {
    title: string;
    subtitle: string;
    layers: { label: string; detail: string }[];
    phases: { step: string; title: string; body: string }[];
  };
};

export const projectStories: Record<string, ProjectStoryData> = {
  studentos: {
    what: {
      title: "An academic OS, not another to-do app",
      subtitle:
        "StudentOS turns a fragmented semester into one command center: home, calendar, focus, and Ask AI on React Native, with cloud sync and school-email OTP for closed beta.",
      modules: [
        {
          label: "Home",
          description: "Weekly progress, streak, and what matters today.",
          icon: "layout-dashboard",
        },
        {
          label: "Calendar",
          description: "Classes, exams, and vacations across day, week, and month.",
          icon: "book-open",
        },
        {
          label: "Focus",
          description: "Timer and stopwatch with music inside the study loop.",
          icon: "timer",
        },
        {
          label: "Ask AI",
          description: "Study coach for planning and academic help.",
          icon: "cloud",
        },
      ],
      stats: [
        { value: "β", label: "Closed beta" },
        { value: "1", label: "Academic OS" },
        { value: "OTP", label: "School email join" },
      ],
    },
    why: {
      title: "Why it exists",
      subtitle:
        "Students do not lack apps. They lack continuity. StudentOS is built for the academic job-to-be-done, not generic productivity.",
      beforeLabel: "Before: fragmented stack",
      afterLabel: "After: one academic workspace",
      chaosTabs: [
        "Notion",
        "Calendar",
        "Canvas",
        "Notes",
        "Gmail",
        "Reminders",
        "Drive",
        "Group chats",
        "Spreadsheets",
      ],
      metrics: [
        { label: "Context switching", before: 88, after: 28, unit: "%" },
        { label: "Semester visibility", before: 30, after: 86, unit: "%" },
        { label: "Friction to start deep work", before: 72, after: 34, unit: "%" },
      ],
    },
    how: {
      title: "How it ships",
      subtitle:
        "A closed-beta product path: validate with students first, then harden native distribution. Expo Go today, TestFlight and App Store next.",
      layers: [
        { label: "Expo UI", detail: "React Native screens, navigation, and motion." },
        { label: "Client state", detail: "Zustand store + AsyncStorage for local continuity." },
        { label: "API + auth", detail: "Express API, JWT sync, school-email OTP beta join." },
        { label: "Ask AI", detail: "Server-proxied study coach for planning help." },
      ],
      phases: [
        {
          step: "01",
          title: "Name the fragmentation",
          body: "Map the student week: classes, deadlines, focus, and the cost of juggling five tools.",
        },
        {
          step: "02",
          title: "Design the academic OS",
          body: "Home as the next-action surface, then calendar, focus, profile, GPA, and Ask AI as connected jobs.",
        },
        {
          step: "03",
          title: "Open a closed beta",
          body: "School-email OTP, cloud sync, and a feedback loop from Profile → Beta feedback.",
        },
        {
          step: "04",
          title: "Earn native distribution",
          body: "Move from Expo Go to EAS builds, TestFlight, and the App Store once usage validates.",
        },
      ],
    },
  },
  signs: {
    what: {
      title: "Make sign language as easy to start as any spoken language",
      subtitle:
        "SIgns is a mobile-first learning product built by a two-person team: a visual dictionary and structured lessons for learners who are usually left out of language apps.",
      modules: [
        {
          label: "Dictionary",
          description: "Search or browse signs with clear demos and descriptions.",
          icon: "book-open",
        },
        {
          label: "Lessons",
          description: "Progressive paths from greetings to conversation.",
          icon: "layers",
        },
        {
          label: "Practice",
          description: "Recognition, matching, and recall exercises.",
          icon: "check-square",
        },
        {
          label: "Progress",
          description: "Tracking and streaks that keep learners returning.",
          icon: "smartphone",
        },
      ],
      stats: [
        { value: "2", label: "Builders" },
        { value: "2", label: "Product pillars" },
        { value: "1", label: "RN codebase" },
      ],
    },
    why: {
      title: "Why it exists",
      subtitle:
        "Most language products optimize for speech. Sign languages stay underserved despite millions of potential learners.",
      beforeLabel: "Before: spoken-first market",
      afterLabel: "After: sign-first product",
      chaosTabs: [
        "YouTube clips",
        "Static PDFs",
        "Random apps",
        "Inconsistent demos",
        "No progress path",
        "Spoken-only UX",
      ],
      metrics: [
        { label: "Time to first useful sign", before: 70, after: 25, unit: "%" },
        { label: "Structured lesson coverage", before: 18, after: 82, unit: "%" },
        { label: "Review friction", before: 65, after: 30, unit: "%" },
      ],
    },
    how: {
      title: "How it was built",
      subtitle:
        "A two-person React Native ship: one codebase for iOS and Android, focused on reusable lesson and dictionary UI.",
      layers: [
        { label: "React Native", detail: "Shared mobile UI for both platforms." },
        { label: "Navigation", detail: "React Navigation across dictionary and lessons." },
        { label: "State", detail: "Zustand for progress, favorites, and session flow." },
        { label: "Backend", detail: "Node.js API with PostgreSQL for learning content." },
      ],
      phases: [
        {
          step: "01",
          title: "Define the gap",
          body: "Spoken-language apps dominate; sign learners lack a clear start and a durable practice loop.",
        },
        {
          step: "02",
          title: "Pick two pillars",
          body: "Ship a visual dictionary and structured lessons before expanding into extra features.",
        },
        {
          step: "03",
          title: "Move as a team of two",
          body: "Choose React Native so one product surface can reach both stores without splitting the team.",
        },
        {
          step: "04",
          title: "Teach in steps",
          body: "Progress from greetings to conversational signing with recognition, matching, and recall.",
        },
      ],
    },
  },
};
