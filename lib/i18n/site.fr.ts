import type { SiteCopy } from "./site.en";

export const siteFr: SiteCopy = {
  navLabel: "Navigation principale",
  languageLabel: "Langue",
  goHome: "Rayann Sagnon, accueil",
  nav: { work: "Projets", about: "À propos", contact: "Contact" },
  linkedin: "Me joindre sur LinkedIn",
  email: "Envoyer un courriel",
  home: {
    role: "Étudiant en génie électrique à l'Université d'Ottawa. Je cherche un stage de 4 mois en électronique pour l'été 2027.",
    portraitAlt: "Rayann Sagnon en polo rayé grenat, debout devant une peinture abstraite dorée.",
    workHeading: "Projets",
    workLabel: "Projets",
    projects: [
      { id: "tachometer", href: "/projects/tachometer", name: "Tachymètre à LED", status: "Étape du schéma", placeholder: "Capture du schéma Altium à venir" },
      { id: "standout", href: "/projects/standout", name: "Standout Studio", status: "Travail client", placeholder: "" },
      { id: "rcx", href: "/projects/kits", name: "Voiture RC-X", status: "Kit, contrôle par téléphone ajouté", placeholder: "Vidéo à venir : la voiture RC-X pilotée au téléphone" },
      { id: "arm", href: "/projects/kits", name: "Bras robotique", status: "Kit, vision par ordinateur ajoutée", placeholder: "Vidéo à venir : le bras robotique et sa vision par ordinateur" },
    ],
  },
  tachometer: {
    title: "Tachymètre à LED",
    status: "Étape du schéma",
    description:
      "Un potentiomètre simule le régime du moteur entre 0 et 5 V. Un comparateur quadruple TLV1704 compare ce signal à quatre seuils et allume jusqu'à quatre LED. Je conçois ma propre version dans Altium, dans le cadre du projet d'initiation électrique d'uOSupermileage.",
    photoAlt: "Rayann Sagnon au Makerspace d'uOttawa, avec des câbles de test suspendus derrière lui.",
    schematicSlot: "Capture du schéma Altium à venir (Tachometer.SchDoc)",
    storyTitle: "J'ai dessiné le schéma deux fois",
    story:
      "Le premier était illisible. Les fils se croisaient partout, et j'avais répété un composant alors qu'un autre type de comparateur aurait suffi. J'ai recommencé en utilisant des net labels.",
    benchTitle: "Tournez le potentiomètre",
    sliderLabel: "Tension du potentiomètre",
    simulation: "Simulation du comportement attendu. Le vrai circuit n'est pas encore testé.",
    ledCount: (n: number) => (n === 0 ? "Aucune LED" : n === 1 ? "1 LED" : `${n} LED`),
    whereTitle: "Où j'en suis",
    where:
      "La première version du schéma compile sans erreur. Un de ses six avertissements signale un possible court-circuit entre +5 V et GND, que je dois corriger. Viendront ensuite les empreintes et le routage du circuit imprimé.",
  },
  standout: {
    title: "Standout Studio",
    description:
      "J'ai cofondé un studio web bilingue à Ottawa. Je m'occupe surtout du design et du code. Nos clients nous ont payé environ 3 000 $ CA jusqu'ici.",
    imageAlt: "La page d'accueil de Standout Studio, avec le titre Stand out et un amas de sphères blanches.",
    steps: [
      ["Rencontres clients", "On cerne ce dont le client a besoin"],
      ["Proposition", "Portée, budget et échéancier"],
      ["Design et code", "Ma partie principale, avec les retours du client en cours de route"],
      ["Lancement", "On met le site en ligne et on montre au client comment le mettre à jour"],
    ],
    visit: "Visiter standoutstudio.ca",
  },
  kits: {
    title: "Montés à partir de kits",
    intro: "Deux kits que j'ai montés, et ce que j'ai ajouté à chacun.",
    items: [
      { name: "Voiture RC-X", detail: "Kit de voiture Arduino Elegoo. J'y ai ajouté le contrôle par téléphone.", slot: "Vidéo à venir : la voiture RC-X pilotée au téléphone" },
      { name: "Bras robotique", detail: "Kit Adeept. J'y ai ajouté la vision par ordinateur.", slot: "Vidéo à venir : le bras robotique et sa vision par ordinateur" },
    ],
  },
  about: {
    portraitAlt: "Rayann Sagnon assis sur un canapé vert devant une fenêtre à Ottawa.",
    routeTitle: "De Ouagadougou à Ottawa",
    route: [
      {
        place: "Ouagadougou, Burkina Faso",
        title: "Vélo, télés et Nintendo DS",
        body: "Je modifiais sans arrêt mon vélo pour y ajouter ce qui me manquait. Quand une télé affichait No Signal à la maison, je cherchais la solution. J'ai aussi modifié ma Nintendo DS.",
        image: "/images/about-teaser/childhood-origin.jpeg",
        alt: "Rayann enfant, souriant à la maison à Ouagadougou.",
      },
      {
        place: "Burkina Faso",
        title: "Hackathon et stage",
        body: "En 2022, mon équipe a pris la première place sur environ 135 au hackathon Orange From Scratch. À l'été 2023, j'ai fait un stage d'observation chez CVP Burkina, comme assistant du webmestre.",
        image: "/images/about/hackathon-winning-team.png",
        alt: "Rayann et son équipe du hackathon, avec leurs trophées de première place.",
      },
      {
        place: "Ottawa, Canada",
        title: "Génie électrique",
        body: "Je suis passé du génie logiciel au génie électrique à l'Université d'Ottawa. Je veux travailler sur des systèmes entiers, du capteur et du circuit jusqu'au code qui commande le moteur. Je conçois mon premier circuit imprimé avec uOSupermileage.",
        image: "/images/about-teaser/makerspace-lab.jpeg",
        alt: "Rayann Sagnon au Makerspace d'uOttawa.",
      },
    ],
    siri: "Bien avant Apple Intelligence, j'ai relié Siri à l'API d'OpenAI avec Raccourcis sur iPhone. Quand je disais « Siri Pro », c'est à ChatGPT que je parlais.",
    experienceTitle: "Expérience",
    experience: [
      { id: "training", title: "Adjoint à la formation en ligne et à l'engagement", meta: "Université d'Ottawa, depuis 2026", body: "Je crée des modules de formation sur l'accessibilité pour le personnel de l'université, avec Articulate et Brightspace." },
      { id: "support", title: "Adjoint au support informatique", meta: "Faculté de génie d'uOttawa, janvier à avril 2026", body: "J'ai réglé des problèmes matériels et logiciels pour les étudiants et le personnel, et j'ai suivi les demandes." },
      { id: "facilities", title: "Coordonnateur des installations informatiques", meta: "Groupe scolaire les Lauréats, 2023 à 2025", body: "Je m'occupais des ordinateurs, des imprimantes et des réseaux de l'école, et j'ai formé plus de 50 enseignants et élèves." },
      { id: "hackathon", title: "Première place, Orange From Scratch", meta: "Hackathon, environ 135 équipes, 2022", body: "" },
    ],
    skillsTitle: "Compétences pratiques",
    skills: [
      ["Soudure", "Pratique, laboratoires de cours à uOttawa"],
      ["Oscilloscope", "Pratique, laboratoires de cours à uOttawa"],
      ["Arduino", "Projets, voiture RC-X et bras robotique"],
      ["Altium Designer", "En apprentissage, schéma du tachymètre pour uOSupermileage"],
      ["Support matériel informatique", "Expérience de travail, Faculté de génie d'uOttawa et Groupe scolaire les Lauréats"],
    ],
    course: ["ELG 2538, Théorie des circuits I", "Université d'Ottawa, en cours, automne 2026"],
    cv: "Télécharger mon CV",
  },
  contact: {
    title: "Vous cherchez un stagiaire en électronique pour l'été 2027 ?",
    availability: "Disponible pendant 4 mois.",
    portraitAlt: "Rayann Sagnon en polo rayé grenat, debout devant une peinture abstraite dorée.",
  },
};
