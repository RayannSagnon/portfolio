export const aboutHero = {
  title: "A Peek Into My World",
  intro:
    "Behind every project is a story. Mine began in Burkina Faso and continues today in Canada. A journey shaped by new environments, meaningful challenges, and relentless curiosity; where I come from, what shaped me, and why I keep choosing engineering.",
  closing:
    "I am learning to build technology that can move between classrooms, communities, labs, and real life. The goal is not only to make things work. The goal is to make them matter.",
};

export type JourneyChapter = {
  place: string;
  moment: string;
  image: string;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  body: string;
  highlights?: string[];
};

export const journeyChapters: JourneyChapter[] = [
  {
    place: "Ouagadougou, Burkina Faso",
    moment: "",
    image: "Origin photo",
    imageSrc: "/images/about/ouagadougou-origin-collage.png",
    imageAlt: "Childhood photo alongside Microsoft Word and Encarta Kids screenshots.",
    title: "It usually started with a simple question: why?",
    body:
      "Long before I knew what engineering was, I was the kind of kid who would spend hours exploring software, clicking through menus, testing features, and figuring out what was possible. I remember sitting in front of my mother's computer, opening Microsoft Word and experimenting with every option I could find, not because I needed to, but because I wanted to understand how it all worked. That curiosity never really left. It simply grew from software to systems, electronics, and the technology I study today.",
    highlights: [
      "exploring",
      "understand how it all worked",
      "curiosity",
      "systems, electronics, and the technology",
    ],
  },
  {
    place: "School years",
    moment: "",
    image: "School work photo",
    imageSrc: "/images/about/school-years-collage.png",
    imageAlt: "Vintage collage of school presentations, graduation, and team photos.",
    title: "Being useful became a habit.",
    body:
      "Throughout school, I was naturally drawn to anything that could help people move forward. Whether it was explaining something I had learned, supporting a project, contributing to the school newspaper, or participating in community and charity initiatives, I enjoyed being part of something bigger than myself. Long before I started studying engineering, I was already motivated by the same idea that drives me today: using my skills to create value for others.",
    highlights: [
      "help people move forward",
      "community and charity initiatives",
      "something bigger than myself",
      "create value for others",
    ],
  },
  {
    place: "IT support",
    moment: "",
    image: "IT support photo",
    imageSrc: "/images/about/first-portfolio-screenshot.png",
    imageAlt: "Screenshot of Rayann's first portfolio website with profile photo and introduction.",
    title: "I couldn't stop building.",
    body:
      "My first experience with programming came during an internship at a technology company in Burkina Faso. As part of the internship, I completed my first web development course and discovered HTML and CSS. What started as a learning experience quickly turned into an obsession. I spent hours building practice websites, recreating landing pages for hotels, restaurants, and local services, studying how they were structured and designed. A few years later, I designed and developed my first portfolio website. Looking back, it wasn't the code itself that fascinated me most, but the idea of creating something from scratch and seeing it come to life.",
    highlights: [
      "first web development course",
      "HTML and CSS",
      "building practice websites",
      "first portfolio website",
      "creating something from scratch",
    ],
  },
  {
    place: "Hackathon From Scratch",
    moment: "First place team award",
    image: "Hackathon photo",
    imageSrc: "/images/about/hackathon-winning-team.png",
    imageAlt: "Rayann and his hackathon team holding first place trophies.",
    title: "I learned what a team can build.",
    body:
      "At my first hackathon, organized with Orange, my team and I competed against 135 other teams to solve a real challenge. We spent days brainstorming, building, testing ideas, and refining our presentation. When we were announced as the winning team, the achievement felt bigger than the trophy itself. It showed me that innovation is rarely a solo effort. The best ideas emerge when different people bring their skills together around a shared goal.",
    highlights: [
      "first hackathon",
      "135 other teams",
      "winning team",
      "innovation is rarely a solo effort",
    ],
  },
  {
    place: "Ottawa, Canada",
    moment: "University of Ottawa",
    image: "Ottawa chapter photo",
    title: "Engineering became the language.",
    body:
      "Moving to Canada did not erase where I came from. It gave me a larger technical environment, new questions, and the chance to connect software, hardware, AI, and human needs with more depth.",
  },
];

export const formativeMoments = [
  {
    title: "The Humanitarian Club",
    image: "Humanitarian club photo",
    kicker: "Leadership was not a title first.",
    body:
      "It began with people, planning, and the pressure of doing something useful together. That experience still shapes how I think about teams: clarity matters, but care matters too.",
  },
  {
    title: "My First Hackathon",
    image: "Hackathon team photo",
    kicker: "A prototype can change the energy in a room.",
    body:
      "Winning was exciting, but the real lesson was quieter: technology becomes powerful when a group turns a vague idea into something others can understand, test, and believe in.",
  },
  {
    title: "The IT Room",
    image: "IT support photo",
    kicker: "Small fixes can carry real weight.",
    body:
      "Supporting students and teachers made me respect reliability. Sometimes the most meaningful work is not flashy. It is the thing that lets someone else keep going.",
  },
  {
    title: "The Move to Canada",
    image: "Canada arrival photo",
    kicker: "Ambition changed scale.",
    body:
      "Ottawa gave me distance, contrast, and new tools. It also made the question sharper: how can I build with enough depth here to create impact beyond here?",
  },
];

export const photoJournal = [
  {
    title: "Workbench",
    type: "Electronics photo",
    caption: "Hands, components, repairs, failed attempts, and the patience of making physical things behave.",
  },
  {
    title: "Late code",
    type: "Coding photo",
    caption: "The quiet repetition of debugging, redesigning, and trying one more version until the idea becomes usable.",
  },
  {
    title: "Team room",
    type: "Event photo",
    caption: "Hackathons, school initiatives, group decisions, and the energy that appears when people build together.",
  },
  {
    title: "Community",
    type: "Volunteer photo",
    caption: "The part of the work that keeps the technology grounded in real people, not only technical ambition.",
  },
  {
    title: "Ottawa",
    type: "City photo",
    caption: "A new city, a new rhythm, and a place where the next version of the story is being built.",
  },
  {
    title: "Everyday",
    type: "Personal photo",
    caption: "Training, friends, music, travel, and the ordinary scenes that make the work feel human.",
  },
];

export const filmBeats = [
  "Ouagadougou",
  "Ottawa",
  "Code at night",
  "Electronics bench",
  "Team sprint",
  "Volunteer room",
  "Campus life",
  "Public voice",
];

export const driveStatements = [
  {
    question: "Why technology?",
    answer:
      "Because a good tool can reduce distance between someone and a possibility they did not have before.",
  },
  {
    question: "Why engineering?",
    answer:
      "Because engineering forces imagination to meet reality: time, cost, reliability, safety, materials, and people.",
  },
  {
    question: "What am I building toward?",
    answer:
      "A future where intelligent technology is practical, accessible, and useful enough to serve people beyond the screen.",
  },
];
