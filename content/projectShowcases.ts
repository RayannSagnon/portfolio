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
    status: "Prototype · MVP",
    showHeroBanner: true,
    hero: {
      src: "/images/projects/studentos/hero-presentation.png",
      alt: "StudentOS product presentation, mobile student productivity app",
      width: 1024,
      height: 576,
    },
    screenFrame: {
      width: 519,
      height: 1024,
    },
    screens: [
      {
        src: "/images/projects/studentos/screen-home.png",
        alt: "StudentOS home dashboard screen",
        label: "Dashboard",
        caption: "Weekly progress, focus sessions, and deadlines in one command center.",
        width: 519,
        height: 1024,
      },
      {
        src: "/images/projects/studentos/screen-courses.png",
        alt: "StudentOS courses screen",
        label: "Courses",
        caption: "Course cards with color-coded tracks and instructor context at a glance.",
        width: 519,
        height: 1024,
      },
      {
        src: "/images/projects/studentos/screen-tasks.png",
        alt: "StudentOS assignments screen",
        label: "Tasks",
        caption: "Active and completed assignments with course tags and due dates.",
        width: 519,
        height: 1024,
      },
    ],
  },
};
