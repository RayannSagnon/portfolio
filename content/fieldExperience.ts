export type FieldExperienceType = "professional" | "volunteer" | "leadership" | "student";

export type FieldExperienceDetail = {
  context: string;
  problem: string;
  approach: string;
  outcome: string;
};

export type FieldExperienceDocument = {
  id: string;
  title: string;
  caption: string;
  kind: "pdf" | "image";
  src: string;
  downloadFileName: string;
};

export type FieldExperienceMedia = {
  src?: string;
  title: string;
  caption: string;
  detail: FieldExperienceDetail;
};

export type FieldExperienceEntry = {
  id: string;
  timelineYear: number;
  dateLabel: string;
  title: string;
  organization: string;
  type: FieldExperienceType;
  summary: string;
  skills: string[];
  documents?: FieldExperienceDocument[];
  media?: FieldExperienceMedia[];
};

export const fieldExperienceIntro = {
  eyebrow: "Field experience",
  title: "Every project teaches something.",
  subtitle: "Every role leaves a way of thinking.",
};

export const fieldExperienceStats = [
  { value: "4+", label: "Professional experiences" },
  { value: "6+", label: "Leadership positions" },
  { value: "3+", label: "Years of technical experience" },
  { value: "2", label: "Countries" },
] as const;

export const fieldExperiences: FieldExperienceEntry[] = [
  {
    id: "online-training-assistant",
    timelineYear: 2026,
    dateLabel: "2026 · Present",
    title: "Online Training and Engagement Assistant",
    organization: "University of Ottawa",
    type: "professional",
    summary:
      "I help build accessibility training that reaches staff across the university. That means pulling content from Articulate and Clipchamp into Brightspace, shaping modules around AODA and accommodation standards, and supporting DEIA events with materials people actually want to open.",
    skills: [
      "Brightspace",
      "Articulate",
      "Accessibility",
      "Clipchamp",
      "WCAG",
      "AODA",
      "Training design",
      "Graphic design",
      "DEIA",
    ],
    media: [
      {
        title: "Accessibility module work",
        caption: "Brightspace learning modules built for university-wide training.",
        detail: {
          context:
            "The university needed staff training on accessibility obligations under Ontario law.",
          problem:
            "Existing materials were scattered across tools and hard to maintain at scale.",
          approach:
            "Extracted and integrated content from Articulate and Clipchamp into structured Brightspace modules.",
          outcome:
            "Staff gained a clearer, more consistent path through accessibility and accommodation training.",
        },
      },
    ],
  },
  {
    id: "it-support-assistant",
    timelineYear: 2026,
    dateLabel: "Jan · Apr 2026",
    title: "IT Support Assistant",
    organization: "uOttawa Faculty of Engineering",
    type: "professional",
    summary:
      "I supported students and staff inside a real engineering IT environment: diagnosing hardware and software issues, tracking tickets, and keeping lab equipment dependable. It taught me how enterprise systems are deployed, documented, and maintained when people are counting on them.",
    skills: [
      "Windows",
      "Hardware diagnostics",
      "Networking",
      "SCCM",
      "Documentation",
      "Troubleshooting",
      "Customer support",
    ],
  },
  {
    id: "leagler",
    timelineYear: 2025,
    dateLabel: "2025 · Present",
    title: "Member",
    organization: "LEagler",
    type: "leadership",
    summary:
      "Outside class, I joined LEagler to grow through workshops, networking, and community events. It pushed me to show up with more confidence, collaborate across backgrounds, and practice the kind of leadership that is less about titles and more about consistency.",
    skills: ["Networking", "Collaboration", "Teamwork", "Communication", "Event planning"],
  },
  {
    id: "free-store-volunteer",
    timelineYear: 2025,
    dateLabel: "Sep · Dec 2025",
    title: "Free Store Volunteer",
    organization: "uOttawa Office of Campus Sustainability",
    type: "volunteer",
    summary:
      "At the Free Store, I welcomed visitors, kept shelves organized, and helped students find what they needed without cost. Small routines of care, sorting, and reuse made a campus resource feel welcoming instead of chaotic.",
    skills: ["Community service", "Organization", "Sustainability", "Customer care"],
  },
  {
    id: "it-facilities-coordinator",
    timelineYear: 2024,
    dateLabel: "2023 · 2025",
    title: "IT Facilities Coordinator",
    organization: "Groupe scolaire les Lauréats",
    type: "professional",
    summary:
      "I supervised the school's computers, printers, and networks while training more than 50 teachers and students on the tools they used every day. When something broke, I coordinated repairs and updates so classes could keep moving.",
    skills: [
      "IT infrastructure",
      "Hardware maintenance",
      "Network support",
      "Software deployment",
      "Technical training",
    ],
    media: [
      {
        title: "IT Facilities Coordinator certificate",
        caption: "Certificate recognizing IT coordination at Groupe Scolaire les Lauréats, 2023 to 2025.",
        detail: {
          context:
            "The school relied on shared computer labs, library workstations, and study hall devices.",
          problem:
            "Hardware failures and outdated software slowed down classes and administrative work.",
          approach:
            "Maintained equipment, coordinated repairs, deployed updates, and supported users across campus.",
          outcome:
            "Teachers and students had more reliable access to the tools they needed every day.",
        },
      },
    ],
  },
  {
    id: "magazine-editor",
    timelineYear: 2023,
    dateLabel: "2022 · 2024",
    title: "Editor and Writer",
    organization: "Groupe scolaire les Lauréats",
    type: "student",
    summary:
      "I wrote, edited, and published three editions of the school magazine in print and online. The work was part editorial, part design: shaping layouts, guiding contributors, and turning student stories into something the whole school could hold.",
    skills: ["Editing", "Writing", "Layout design", "Visual storytelling", "Publishing"],
    documents: [
      {
        id: "laureats-magazine-edition-2",
        title: "Lauréats School Magazine",
        caption: "Second edition designed with Adobe InDesign and Pages.",
        kind: "pdf",
        src: "/documents/field-experience/laureats-magazine-edition-2.pdf",
        downloadFileName: "laureats-magazine-edition-2.pdf",
      },
    ],
  },
  {
    id: "web-development-intern",
    timelineYear: 2023,
    dateLabel: "Summer 2023",
    title: "Web Development Intern",
    organization: "CVP Burkina",
    type: "student",
    summary:
      "My first internship put HTML, CSS, and JavaScript in front of a real deadline. I helped ship a working website, debugged issues with the team, and learned how much of development is patience, testing, and small fixes that add up.",
    skills: ["HTML", "CSS", "JavaScript", "VS Code", "XAMPP", "Teamwork"],
  },
  {
    id: "charity-club-board",
    timelineYear: 2022,
    dateLabel: "2022 · 2025",
    title: "Board Member",
    organization: "Groupe Scolaire Les Lauréats Charity Club",
    type: "leadership",
    summary:
      "On the charity club board, I helped organize student-led aid for communities affected by displacement in northern Burkina Faso. It was early proof that technical skill means little if you never learn how to serve people around you.",
    skills: ["Nonprofit organizing", "Community outreach", "Fundraising", "Team coordination"],
    documents: [
      {
        id: "halloween-charity-flyer",
        title: "Halloween Charity Party",
        caption: "Flyer for a school fundraiser supporting classrooms in underserved neighborhoods.",
        kind: "image",
        src: "/documents/field-experience/halloween-charity-flyer.jpeg",
        downloadFileName: "halloween-charity-flyer.jpeg",
      },
      {
        id: "equality-booklet",
        title: "Equality Booklet",
        caption: "Printed booklet created for a school equality and inclusion initiative.",
        kind: "pdf",
        src: "/documents/field-experience/equality-booklet.pdf",
        downloadFileName: "equality-booklet.pdf",
      },
    ],
  },
  {
    id: "orange-hackathon",
    timelineYear: 2022,
    dateLabel: "2022",
    title: "Winning Team",
    organization: "Orange Hackathon",
    type: "student",
    summary:
      "Our team competed against 135 others on a real Orange challenge and took first place. I helped shape the pitch, the product story, and the submission document that went in front of the jury.",
    skills: ["Product storytelling", "Presentation design", "Teamwork", "Rapid prototyping"],
    documents: [
      {
        id: "orange-med-planner",
        title: "Orange Med Planner",
        caption: "Submission document presented to the hackathon jury.",
        kind: "pdf",
        src: "/documents/field-experience/orange-med-planner.pdf",
        downloadFileName: "orange-med-planner.pdf",
      },
    ],
  },
];
