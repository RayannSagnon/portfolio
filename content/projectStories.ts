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
    /** Optional. Omit or leave empty. Never invent user-measured percentages. */
    metrics?: {
      label: string;
      before: number;
      after: number;
      unit?: string;
    }[];
    /** Product decisions told as narrative instead of fake charts */
    decisions?: { label: string; body: string }[];
  };
  how: {
    title: string;
    subtitle: string;
    layers: { label: string; detail: string }[];
    phases: { step: string; title: string; body: string }[];
  };
};

export const projectStories: Record<string, ProjectStoryData> = {
  standout: {
    what: {
      title: "Client work, not a demo stack",
      subtitle:
        "Standout Studio is a bilingual Ottawa web studio. The proof is meetings, scoped proposals, iterations with clients, delivered sites, and early paid work.",
      modules: [
        {
          label: "Discovery",
          description: "Hear what the client asks for, then find the real job behind the request.",
          icon: "book-open",
        },
        {
          label: "Scope",
          description: "Budget, timeline, and what we refuse so the site can ship cleanly.",
          icon: "layers",
        },
        {
          label: "Iterate",
          description: "Proposals, feedback rounds, and design/dev changes until it fits.",
          icon: "check-square",
        },
        {
          label: "Deliver",
          description: "Launch the site and keep it alive with clear ownership after handoff.",
          icon: "smartphone",
        },
      ],
      stats: [
        { value: "~$3K", label: "Early revenue" },
        { value: "2", label: "Languages" },
        { value: "OTT", label: "Ottawa based" },
      ],
    },
    why: {
      title: "Why the studio exists",
      subtitle:
        "Freelancers and local businesses need a clear first impression online. The work is understanding the person, then shipping a site they can run themselves.",
      beforeLabel: "What clients often arrive with",
      afterLabel: "What we aim to leave them with",
      chaosTabs: [
        "Vague brief",
        "Competitor screenshots",
        "Too many pages",
        "Unclear offer",
        "No bilingual plan",
        "Budget anxiety",
      ],
      metrics: [],
      decisions: [
        {
          label: "Fewer clients, longer care",
          body: "We take on fewer clients, scope each one clearly and stay available after launch.",
        },
        {
          label: "Bilingual by default",
          body: "Ottawa work often needs English and French, so the content is planned in both languages from the first draft.",
        },
        {
          label: "Real numbers only",
          body: "Early revenue is real and modest: about $3K CAD so far.",
        },
      ],
    },
    how: {
      title: "How client work actually moved",
      subtitle:
        "Discovery, proposal, feedback, build, launch. My role covers product framing, web delivery and iteration with the client.",
      layers: [
        { label: "Product", detail: "Need framing, priorities, and what we cut." },
        { label: "Design", detail: "First impression, layout, and bilingual content structure." },
        { label: "Build", detail: "Next.js / TypeScript marketing sites that stay maintainable." },
        { label: "Delivery", detail: "Handoff, go-live, and a studio that answers." },
      ],
      phases: [
        {
          step: "01",
          title: "Hear the real job",
          body: "Clients rarely need every page they list. Meetings surface the offer, audience, and constraint that matter.",
        },
        {
          step: "02",
          title: "Propose and simplify",
          body: "Scope budget and timeline. Refuse extras that would delay a clean first launch.",
        },
        {
          step: "03",
          title: "Iterate in the open",
          body: "Share proposals, take feedback, and change the design until the client can defend the result.",
        },
        {
          step: "04",
          title: "Ship and stay reachable",
          body: "Deliver the live site and make sure the client knows how to keep it up to date.",
        },
      ],
    },
  },
  signs: {
    what: {
      title: "Make sign language as easy to start as any spoken language",
      subtitle:
        "SIgns is a mobile learning product co-built with Steven Readman: a visual dictionary and structured lessons. We are moving from build into store submission, beta recruitment, and real feedback.",
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
        { value: "β", label: "Android beta ahead" },
      ],
    },
    why: {
      title: "Why it exists",
      subtitle:
        "Most language products optimize for speech. Sign languages stay underserved. We are only now putting the product in front of real learners, so this page does not invent usage metrics.",
      beforeLabel: "What learners juggle today",
      afterLabel: "What SIgns aims to be",
      chaosTabs: [
        "YouTube clips",
        "Static PDFs",
        "Random apps",
        "Inconsistent demos",
        "No progress path",
        "Spoken-only UX",
      ],
      metrics: [],
      decisions: [
        {
          label: "Two pillars first",
          body: "Dictionary + lessons before expanding into features that dilute the learning loop.",
        },
        {
          label: "Shared ownership",
          body: "Steven and I co-built as a team of two. Product framing, mobile UX, and engineering moved together on one React Native codebase.",
        },
        {
          label: "Beta before polish theater",
          body: "The next proof is testers and store feedback, not another screenshot deck.",
        },
      ],
    },
    how: {
      title: "How we are launching",
      subtitle:
        "Idea → build → store path → recruit testers → learn. Android beta is the current gate.",
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
          title: "Ship the core loop",
          body: "Dictionary and structured lessons in one RN app, built by a team of two.",
        },
        {
          step: "03",
          title: "Enter real testing",
          body: "Prepare Android beta, recruit learners, and capture what breaks in practice.",
        },
        {
          step: "04",
          title: "Iterate from feedback",
          body: "Replace assumptions with tester problems, then change the product.",
        },
      ],
    },
  },
  studentos: {
    what: {
      title: "An academic OS, explored far enough to pause",
      subtitle:
        "StudentOS was built as a student-first planner: home, calendar, focus, and Ask AI on React Native. It is a product exploration paused before a paid beta, not a live closed beta with users.",
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
        { value: "∥", label: "Paused" },
        { value: "1", label: "Academic OS concept" },
        { value: "OTP", label: "School-email path designed" },
      ],
    },
    why: {
      title: "Why it exists, and why it stopped",
      subtitle:
        "Students do not lack apps. They lack continuity. Building far enough revealed a model problem: useful AI coaching has a marginal cost, and Apple distribution is not free. I refused a portfolio beta that burns money without a monetization path.",
      beforeLabel: "Fragmented student stack",
      afterLabel: "Intended academic workspace",
      chaosTabs: [
        "Notion",
        "Calendar",
        "Canvas",
        "Notes",
        "Gmail",
        "Reminders",
        "Drive",
        "Group chats",
      ],
      metrics: [],
      decisions: [
        {
          label: "Pause before paid beta",
          body: "I would not fund Apple fees or AI API usage for free testers just to write “beta” on a portfolio.",
        },
        {
          label: "Architecture vs economics",
          body: "An AI study coach that feels useful introduces cost per user. Without monetization, scale is a liability.",
        },
        {
          label: "Keep the learning",
          body: "StudentOS remains the case study for vision, academic job-to-be-done, and the hard stop before burn.",
        },
      ],
    },
    how: {
      title: "How far it went",
      subtitle:
        "Problem framing → academic OS design → Expo build path → pause before distribution spend. Resume only if the model is clear.",
      layers: [
        { label: "Expo UI", detail: "React Native screens, navigation, and motion." },
        { label: "Client state", detail: "Zustand store + AsyncStorage for local continuity." },
        { label: "API + auth", detail: "Express API, JWT sync, school-email OTP join path." },
        { label: "Ask AI", detail: "Server-proxied study coach, the cost center that forced the pause." },
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
          title: "Build the prototype deep",
          body: "Ship enough of the loop on Expo to feel the product, including the AI coaching path.",
        },
        {
          step: "04",
          title: "Pause on purpose",
          body: "Stop before Apple spend and AI burn. Treat that stop as a product decision, not a failure.",
        },
      ],
    },
  },
};
