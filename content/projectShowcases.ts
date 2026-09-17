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
    status: "Exploration · Paused before beta",
    showHeroBanner: true,
    hero: {
      src: "/images/projects/studentos/hero-presentation.png",
      alt: "StudentOS product banner: academic command center for university students",
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
        alt: "StudentOS school-email OTP sign-in screen",
        label: "Auth path",
        caption: "School-email OTP path designed for a future beta, not a live cohort today.",
        width: 640,
        height: 1380,
      },
      {
        src: "/images/projects/studentos/screen-home.png",
        alt: "StudentOS home command center",
        label: "Home",
        caption: "Weekly progress, streak, and the next academic action in one place.",
        width: 640,
        height: 1380,
      },
      {
        src: "/images/projects/studentos/screen-calendar.png",
        alt: "StudentOS calendar screen",
        label: "Calendar",
        caption: "Classes, exams, and vacations visible across day, week, and month.",
        width: 640,
        height: 1380,
      },
      {
        src: "/images/projects/studentos/screen-focus.png",
        alt: "StudentOS focus timer screen",
        label: "Focus",
        caption: "Study blocks with timer and music: deep work inside the product loop.",
        width: 640,
        height: 1380,
      },
    ],
  },
  signs: {
    status: "Preparing Android beta · Team of 2",
    showHeroBanner: true,
    hero: {
      src: "/images/projects/signs/hero-banner-en.png",
      alt: "SIgns product banner: learn sign language with guided paths and Practice Mirror",
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
        alt: "SIgns home learning path",
        label: "Home",
        caption: "A clear learning path with streak, gems, and the next lesson to continue.",
        width: 500,
        height: 1024,
      },
      {
        src: "/images/projects/signs/screen-practice.png",
        alt: "SIgns practice drills screen",
        label: "Practice",
        caption: "Daily quiz, challenges, flashcards, and matching drills at your own pace.",
        width: 498,
        height: 1024,
      },
      {
        src: "/images/projects/signs/screen-profile.png",
        alt: "SIgns profile and progress screen",
        label: "Profile",
        caption: "Level progress, practice days, badges, and motivation loops in one place.",
        width: 495,
        height: 1024,
      },
      {
        src: "/images/projects/signs/icon.png",
        alt: "SIgns app icon",
        label: "Brand",
        caption: "Built by a two-person team around dictionary learning and structured lessons.",
        width: 1024,
        height: 1024,
      },
    ],
  },
  standout: {
    status: "Client work · Early revenue",
    showHeroBanner: false,
    hero: {
      src: "/images/projects/signs/hero-banner-en.png",
      alt: "Standout Studio",
      width: 1600,
      height: 600,
    },
    screenFrame: {
      width: 1600,
      height: 900,
    },
    screens: [],
  },
  rcx: {
    status: "Embedded · Control platform",
    showHeroBanner: true,
    hero: {
      src: "/images/projects/rcx/hero.png",
      alt: "RC-X four-wheel robot platform on wood floor: black acrylic chassis, yellow wheels, ELEGOO control board, ultrasonic sensor on pan servo, camera module",
      width: 1600,
      height: 1200,
    },
    screenFrame: {
      width: 1600,
      height: 1200,
    },
    screens: [
      {
        src: "/images/projects/rcx/labeled.png",
        alt: "RC-X platform with labeled components: camera module, ultrasonic sensor, pan servo, control board, battery pack, DC gear motor, drive wheel",
        label: "Architecture",
        caption: "Kit-based ELEGOO chassis with camera, ultrasonic on pan servo, control board, battery pack, and DC gear motors.",
        width: 1600,
        height: 1200,
      },
    ],
  },
};
