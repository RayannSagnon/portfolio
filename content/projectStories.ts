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
      title: "One command center for school",
      subtitle:
        "StudentOS pulls planning, progress, and focus into a single Android surface instead of scattering them across browser tabs.",
      modules: [
        {
          label: "Dashboard",
          description: "Weekly progress, streaks, and what matters today.",
          icon: "layout-dashboard",
        },
        {
          label: "Courses",
          description: "Assignments, deadlines, and course context in one lane.",
          icon: "book-open",
        },
        {
          label: "Focus",
          description: "Timed study blocks with a clear start and stop ritual.",
          icon: "timer",
        },
        {
          label: "Tasks",
          description: "Capture work, sort priorities, and close the loop.",
          icon: "check-square",
        },
      ],
      stats: [
        { value: "4", label: "Core workflows" },
        { value: "1", label: "Unified surface" },
        { value: "0", label: "Required cloud sync" },
      ],
    },
    why: {
      title: "Why it exists",
      subtitle:
        "Most students do not lack tools. They lack continuity between them. StudentOS was shaped around that friction.",
      beforeLabel: "Before: nine tabs",
      afterLabel: "After: one workspace",
      chaosTabs: [
        "Canvas",
        "Drive",
        "Notion",
        "Calendar",
        "Gmail",
        "Sheets",
        "Quizlet",
        "Slack",
        "Docs",
      ],
      metrics: [
        { label: "Context switching", before: 88, after: 24, unit: "%" },
        { label: "Deadlines tracked in one place", before: 22, after: 91, unit: "%" },
        { label: "Time to start a study block", before: 74, after: 31, unit: "%" },
      ],
    },
    how: {
      title: "How it was built",
      subtitle:
        "A local-first MVP in Kotlin and Compose, designed to stay fast on real student hardware and grow toward sync later.",
      layers: [
        { label: "Compose UI", detail: "Material 3 screens, navigation, and motion." },
        { label: "ViewModels", detail: "StateFlow-driven screen logic and user actions." },
        { label: "Repositories", detail: "Single source of truth across features." },
        { label: "Room + Firebase", detail: "Offline persistence with cloud-ready hooks." },
      ],
      phases: [
        {
          step: "01",
          title: "Map the student loop",
          body: "Interviews, tab audits, and workflow sketches to find what actually repeats every week.",
        },
        {
          step: "02",
          title: "Design the command center",
          body: "Material 3 dashboard first, then courses, tasks, and focus as connected modules.",
        },
        {
          step: "03",
          title: "Ship the local-first MVP",
          body: "Room for persistence, Compose for speed, Firebase wired but optional at launch.",
        },
        {
          step: "04",
          title: "Iterate in public",
          body: "GitHub Actions CI, README docs, and a portfolio-ready product story.",
        },
      ],
    },
  },
};
