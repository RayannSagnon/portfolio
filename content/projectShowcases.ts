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
    hero: {
      src: "/images/projects/studentos/hero-presentation.png",
      alt: "StudentOS product presentation, mobile student productivity app",
      width: 1024,
      height: 576,
    },
    screenFrame: {
      width: 712,
      height: 1024,
    },
    screens: [
      {
        src: "/images/projects/studentos/screen-home.png",
        alt: "StudentOS home dashboard screen",
        label: "Dashboard",
        caption: "Weekly progress, focus sessions, and deadlines in one command center.",
        width: 712,
        height: 1024,
      },
      {
        src: "/images/projects/studentos/screen-profile.png",
        alt: "StudentOS profile screen",
        label: "Profile",
        caption: "Courses, tasks, focus hours, plus settings and academic analytics.",
        width: 712,
        height: 1024,
      },
    ],
  },
};
