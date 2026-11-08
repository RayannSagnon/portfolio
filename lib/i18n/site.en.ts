export const siteEn = {
  navLabel: "Main navigation",
  languageLabel: "Language",
  goHome: "Rayann Sagnon, home",
  nav: { work: "Work", about: "About", contact: "Contact" },
  linkedin: "Connect on LinkedIn",
  email: "Send an email",
  home: {
    role: "Electrical Engineering student at the University of Ottawa. I'm looking for a 4-⁠month hardware internship for summer 2027.",
    portraitAlt: "Rayann Sagnon in a garnet striped polo, standing in front of a gold abstract painting.",
    workHeading: "Work",
    workLabel: "Projects",
    projects: [
      { id: "tachometer", href: "/projects/tachometer", name: "LED Tachometer", status: "Schematic stage", placeholder: "Altium schematic capture coming soon" },
      { id: "standout", href: "/projects/standout", name: "Standout Studio", status: "Client work", placeholder: "" },
      { id: "rcx", href: "/projects/kits", name: "RC-X car", status: "Kit, phone control added", placeholder: "Video coming soon: the RC-X car driven from a phone" },
      { id: "arm", href: "/projects/kits", name: "Robotic arm", status: "Kit, computer vision added", placeholder: "Video coming soon: the robotic arm and its computer vision" },
    ],
  },
  tachometer: {
    title: "LED Tachometer",
    status: "Schematic stage",
    description:
      "A potentiometer simulates engine speed between 0 and 5 V. A TLV1704 quad comparator checks that signal against four thresholds and turns on up to four LEDs. I'm designing my own version in Altium for uOSupermileage's electrical initiation project.",
    photoAlt: "Rayann Sagnon at the uOttawa Makerspace, with test leads hanging behind him.",
    schematicSlot: "Altium schematic capture coming soon (Tachometer.SchDoc)",
    storyTitle: "I drew the schematic twice",
    story:
      "The first one was unreadable. Wires crossed everywhere, and I had repeated a part when a different type of comparator would have done the job. I started over and used net labels.",
    benchTitle: "Turn the potentiometer",
    sliderLabel: "Potentiometer voltage",
    simulation: "Simulation of the expected behaviour. The real circuit is not tested yet.",
    ledCount: (n: number) => (n === 0 ? "No LED" : n === 1 ? "1 LED" : `${n} LEDs`),
    whereTitle: "Where it stands",
    where:
      "The first version of the schematic compiles with no errors. One of its six warnings points to a possible short between +5 V and GND, so I'm fixing that next. Then footprints and PCB layout.",
  },
  standout: {
    title: "Standout Studio",
    description:
      "I co-founded a bilingual web studio in Ottawa. My part is mainly design and code. Clients have paid us about $3K CAD so far.",
    imageAlt: "The Standout Studio homepage, with the headline Stand out and a pile of white spheres.",
    steps: [
      ["Client meetings", "We work out what the client needs"],
      ["Proposal", "Scope, budget and timeline"],
      ["Design and code", "My main part, with client feedback along the way"],
      ["Launch", "We put the site live and show the client how to update it"],
    ],
    visit: "Visit standoutstudio.ca",
  },
  kits: {
    title: "Built from kits",
    intro: "Two kits I built, and what I added to each.",
    items: [
      { name: "RC-X car", detail: "Elegoo Arduino car kit. I added control from my phone.", slot: "Video coming soon: the RC-X car driven from a phone" },
      { name: "Robotic arm", detail: "Adeept kit. I added computer vision.", slot: "Video coming soon: the robotic arm and its computer vision" },
    ],
  },
  about: {
    portraitAlt: "Rayann Sagnon seated on a green sofa in front of a window in Ottawa.",
    routeTitle: "From Ouagadougou to Ottawa",
    route: [
      {
        place: "Ouagadougou, Burkina Faso",
        title: "Bikes, TVs and a Nintendo DS",
        body: "I kept modifying my bike to add features I wanted. When a TV at home showed No Signal, I went looking for the fix. I also modded my Nintendo DS.",
        image: "/images/about-teaser/childhood-origin.jpeg",
        alt: "Rayann as a small child, smiling at home in Ouagadougou.",
      },
      {
        place: "Burkina Faso",
        title: "Hackathon and internship",
        body: "In 2022, my team took first place out of about 135 teams at the Orange From Scratch hackathon. In summer 2023, I did an observation internship at CVP Burkina, assisting the webmaster.",
        image: "/images/about/hackathon-winning-team.png",
        alt: "Rayann and his hackathon team holding first place trophies.",
      },
      {
        place: "Ottawa, Canada",
        title: "Electrical Engineering",
        body: "I moved from Software Engineering to Electrical Engineering at the University of Ottawa. I want to work on whole systems, from the sensor and circuit to the code that drives the motor. I'm designing my first PCB with uOSupermileage.",
        image: "/images/about-teaser/makerspace-lab.jpeg",
        alt: "Rayann Sagnon at the uOttawa Makerspace.",
      },
    ],
    siri: "Long before Apple Intelligence, I used iPhone Shortcuts to connect Siri to the OpenAI API. When I said “Siri Pro”, I was talking to ChatGPT.",
    experienceTitle: "Experience",
    experience: [
      { id: "training", title: "Online Training and Engagement Assistant", meta: "University of Ottawa, 2026 to present", body: "I build accessibility training modules for university staff, using Articulate and Brightspace." },
      { id: "support", title: "IT Support Assistant", meta: "uOttawa Faculty of Engineering, Jan to Apr 2026", body: "I fixed hardware and software problems for students and staff, and tracked the tickets." },
      { id: "facilities", title: "IT Facilities Coordinator", meta: "Groupe scolaire les Lauréats, 2023 to 2025", body: "I looked after the school's computers, printers and networks, and trained more than 50 teachers and students." },
      { id: "hackathon", title: "First place, Orange From Scratch", meta: "Hackathon, about 135 teams, 2022", body: "" },
    ],
    skillsTitle: "Hands-on skills",
    skills: [
      ["Soldering", "Hands-on, uOttawa course labs"],
      ["Oscilloscope", "Hands-on, uOttawa course labs"],
      ["Arduino", "Projects, RC-X car and robotic arm"],
      ["Altium Designer", "Learning, tachometer schematic for uOSupermileage"],
      ["Computer hardware support", "Work experience, uOttawa Faculty of Engineering and Groupe scolaire les Lauréats"],
    ],
    course: ["ELG 2138, Circuit Theory I", "University of Ottawa, in progress fall 2026"],
    cv: "Download my CV",
  },
  contact: {
    title: "Hiring a hardware intern for summer 2027?",
    availability: "Available for 4 months.",
    portraitAlt: "Rayann Sagnon in a garnet striped polo, standing in front of a gold abstract painting.",
  },
};

export type SiteCopy = typeof siteEn;
