export type FieldExperienceType = "professional" | "volunteer" | "leadership" | "student";

export type FieldExperienceDetail = {
  context: string;
  problem: string;
  approach: string;
  outcome: string;
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
  title: string;
  organization: string;
  period: string;
  location?: string;
  type: FieldExperienceType;
  mission: string;
  headline: string;
  skills: string[];
  skillsDeveloped: string[];
  impact: string[];
  coverImage?: string;
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

export const fieldExperienceTypeLabels: Record<FieldExperienceType, string> = {
  professional: "Professional",
  volunteer: "Volunteer",
  leadership: "Leadership",
  student: "Student project",
};

export const fieldExperiences: FieldExperienceEntry[] = [
  {
    id: "online-training-assistant",
    timelineYear: 2026,
    title: "Online Training and Engagement Assistant",
    organization: "University of Ottawa",
    period: "May 2026 · Present",
    location: "Ottawa, ON · Hybrid",
    type: "professional",
    mission: "Accessibility training for the university community.",
    headline: "Improved accessibility training for university staff.",
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
    skillsDeveloped: [
      "Learning module design",
      "Multimedia integration",
      "Accessibility standards",
      "Promotional design",
    ],
    impact: [
      "Built accessible learning modules on AODA and accommodation standards",
      "Improved multimedia integration across Brightspace courses",
      "Supported DEIA initiatives through events and promotional assets",
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
    title: "IT Support Assistant",
    organization: "uOttawa Faculty of Engineering",
    period: "Jan 2026 · Apr 2026",
    location: "Ottawa, ON · On site",
    type: "professional",
    mission: "Supporting engineering students and staff with reliable IT.",
    headline:
      "Learned how enterprise IT systems are deployed, maintained, and documented in a real engineering environment.",
    skills: [
      "Windows",
      "Hardware diagnostics",
      "Networking",
      "SCCM",
      "Documentation",
      "Troubleshooting",
      "Customer support",
    ],
    skillsDeveloped: [
      "Windows deployment",
      "Ticket management",
      "Hardware repair workflows",
      "Lab compliance support",
    ],
    impact: [
      "Diagnosed hardware and software issues for students and staff",
      "Managed and documented requests through the ticketing system",
      "Maintained laboratory equipment and network assets",
    ],
  },
  {
    id: "leagler",
    timelineYear: 2025,
    title: "Member",
    organization: "LEagler",
    period: "Aug 2025 · Present",
    location: "Ottawa, ON",
    type: "leadership",
    mission: "Growing through networking, workshops, and community leadership.",
    headline: "Strengthened collaboration and professional presence outside the classroom.",
    skills: ["Networking", "Collaboration", "Teamwork", "Communication", "Event planning"],
    skillsDeveloped: [
      "Professional networking",
      "Cross-team collaboration",
      "Community engagement",
    ],
    impact: [
      "Participated in workshops and social activities that built leadership habits",
      "Represented values of passion, diversity, and commitment in group settings",
      "Connected with peers across disciplines through structured events",
    ],
  },
  {
    id: "free-store-volunteer",
    timelineYear: 2025,
    title: "Free Store Volunteer",
    organization: "uOttawa Office of Campus Sustainability",
    period: "Sep 2025 · Dec 2025",
    location: "Ottawa, ON · On site",
    type: "volunteer",
    mission: "Making campus resources accessible through reuse and organization.",
    headline: "Supported a campus program that gives students access to free essentials.",
    skills: ["Community service", "Organization", "Sustainability", "Customer care"],
    skillsDeveloped: [
      "Front-desk hospitality",
      "Inventory organization",
      "Sustainability operations",
    ],
    impact: [
      "Welcomed visitors and guided them through the Free Store",
      "Kept shelves organized so items stayed easy to find",
      "Helped extend the life of campus goods through reuse",
    ],
    coverImage: "/images/about/charity-club-collage.png",
  },
  {
    id: "it-facilities-coordinator",
    timelineYear: 2024,
    title: "IT Facilities Coordinator",
    organization: "Groupe scolaire les Lauréats",
    period: "Sep 2023 · Jun 2025",
    location: "Ouagadougou, Burkina Faso",
    type: "professional",
    mission: "Keeping school IT infrastructure reliable for daily learning.",
    headline: "Maintained IT infrastructure serving hundreds of users.",
    skills: [
      "IT infrastructure",
      "Hardware maintenance",
      "Network support",
      "Software deployment",
      "Technical training",
    ],
    skillsDeveloped: [
      "Infrastructure supervision",
      "End-user training",
      "Repair coordination",
      "Security-minded updates",
    ],
    impact: [
      "Supervised computers, printers, and networks across the school",
      "Trained 50+ teachers and students on digital tools",
      "Coordinated repairs and software updates to keep systems secure",
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
    title: "Editor and Writer",
    organization: "Groupe scolaire les Lauréats",
    period: "Sep 2022 · Oct 2024",
    location: "Ouagadougou, Burkina Faso",
    type: "student",
    mission: "Publishing the school magazine in print and digital formats.",
    headline: "Turned student voices into a publication the whole school could read.",
    skills: [
      "Editing",
      "Writing",
      "Layout design",
      "Visual storytelling",
      "Publishing",
    ],
    skillsDeveloped: [
      "Editorial planning",
      "Print and digital production",
      "Visual layout",
    ],
    impact: [
      "Wrote, edited, and published three editions of the school newspaper",
      "Designed layouts and visuals that improved readability and reach",
      "Coordinated student contributors across writing and production",
    ],
  },
  {
    id: "web-development-intern",
    timelineYear: 2023,
    title: "Web Development Intern",
    organization: "CVP Burkina",
    period: "Jun 2023 · Jul 2023",
    location: "Ouagadougou, Burkina Faso · On site",
    type: "student",
    mission: "Building a first real website with HTML, CSS, and JavaScript.",
    headline: "Turned curiosity about the web into shipped front-end work.",
    skills: ["HTML", "CSS", "JavaScript", "VS Code", "XAMPP", "Teamwork"],
    skillsDeveloped: [
      "Front-end development",
      "Local development workflows",
      "Collaborative debugging",
    ],
    impact: [
      "Contributed to a fully functional website for the organization",
      "Tested features and resolved issues with the development team",
      "Built confidence working across front-end and back-end basics",
    ],
    coverImage: "/images/about/first-portfolio-screenshot.png",
  },
  {
    id: "charity-club-board",
    timelineYear: 2022,
    title: "Board Member",
    organization: "Groupe Scolaire Les Lauréats Charity Club",
    period: "Sep 2022 · Sep 2025",
    location: "Ouagadougou, Burkina Faso",
    type: "leadership",
    mission: "Organizing aid for communities affected by displacement.",
    headline: "Helped lead student-led humanitarian work beyond the classroom.",
    skills: [
      "Nonprofit organizing",
      "Community outreach",
      "Fundraising",
      "Team coordination",
    ],
    skillsDeveloped: [
      "Board-level planning",
      "Humanitarian logistics",
      "Community partnership",
    ],
    impact: [
      "Supported refugees from northern Burkina Faso through student-led initiatives",
      "Coordinated club efforts around fundraising and outreach",
      "Kept volunteer work connected to real community needs",
    ],
    coverImage: "/images/about/charity-club-collage.png",
  },
];
