export const aboutHero = {
  title: "Un aperçu de mon univers",
  intro:
    "Derrière chaque projet se cache une histoire. La mienne a commencé au Burkina Faso et se poursuit aujourd'hui au Canada. Un parcours façonné par de nouveaux environnements, des défis significatifs et une curiosité sans relâche : d'où je viens, ce qui m'a formé, et pourquoi je continue de choisir l'ingénierie.",
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
    image: "Photo d'origine",
    imageSrc: "/images/about/ouagadougou-origin-collage.png",
    imageAlt: "Photo d'enfance aux côtés de captures d'écran de Microsoft Word et Encarta Kids.",
    title: "Tout commençait souvent par une question simple : pourquoi ?",
    body:
      "Bien avant de savoir ce qu'était l'ingénierie, j'étais le genre d'enfant qui passait des heures à explorer des logiciels, à parcourir les menus, à tester les fonctionnalités et à comprendre ce qui était possible. Je me souviens m'être assis devant l'ordinateur de ma mère, ouvrir Microsoft Word et expérimenter chaque option que je trouvais, non parce que j'en avais besoin, mais parce que je voulais comprendre comment tout cela fonctionnait. Cette curiosité ne m'a jamais vraiment quitté. Elle est simplement passée des logiciels aux systèmes, à l'électronique et aux technologies que j'étudie aujourd'hui.",
    highlights: [
      "explorer",
      "comprendre comment tout fonctionnait",
      "curiosité",
      "systèmes, électronique et technologie",
    ],
  },
  {
    place: "Années scolaires",
    moment: "",
    image: "Photo de travaux scolaires",
    imageSrc: "/images/about/school-years-collage.png",
    imageAlt: "Collage vintage de présentations scolaires, remise de diplôme et photos d'équipe.",
    title: "Être utile est devenu une habitude.",
    body:
      "Tout au long de mes études, j'étais naturellement attiré par tout ce qui pouvait aider les gens à avancer. Que ce soit expliquer quelque chose que j'avais appris, soutenir un projet, contribuer au journal de l'école ou participer à des initiatives communautaires et caritatives, j'aimais faire partie de quelque chose de plus grand que moi. Bien avant de commencer mes études en ingénierie, j'étais déjà motivé par la même idée qui me guide aujourd'hui : utiliser mes compétences pour créer de la valeur pour les autres.",
    highlights: [
      "aider les gens à avancer",
      "initiatives communautaires et caritatives",
      "plus grand que moi",
      "créer de la valeur pour les autres",
    ],
  },
  {
    place: "Club caritatif · UOttawa Free Store",
    moment: "",
    image: "Photo de bénévolat",
    imageSrc: "/images/about/charity-club-collage.png",
    imageAlt: "Collage d'événements de bénévolat du club caritatif, photos d'équipe et rassemblements communautaires.",
    title: "Donner en retour est resté partie de l'histoire.",
    body:
      "Le bénévolat n'a jamais semblé séparé du reste de ce que je construisais. Dans un club caritatif, j'ai appris que de petits efforts constants peuvent atteindre des personnes qui ne voient jamais le travail technique en coulisses. À l'University of Ottawa Sustainability Office, au Free Store, cette leçon s'est précisée : réutilisation, accès et attention sous une forme quotidienne très concrète. Que ce soit organiser des dons ou aider les étudiants à trouver ce dont ils avaient besoin, cela m'a rappelé que l'ingénierie doit rester connectée aux vraies communautés, pas seulement aux produits et au code.",
    highlights: [
      "club caritatif",
      "University of Ottawa Sustainability Office",
      "Free Store",
      "connectée aux vraies communautés",
      "Bénévolat",
    ],
  },
  {
    place: "",
    moment: "",
    image: "Photo de support informatique",
    imageSrc: "/images/about/first-portfolio-screenshot.png",
    imageAlt: "Capture d'écran du premier site portfolio de Rayann avec photo de profil et introduction.",
    title: "Je n'ai pas pu arrêter de construire.",
    body:
      "Ma première expérience en programmation est venue lors d'un stage dans une entreprise technologique au Burkina Faso. Dans le cadre du stage, j'ai suivi mon premier cours de développement web et découvert HTML et CSS. Ce qui a commencé comme une expérience d'apprentissage s'est rapidement transformé en obsession. J'ai passé des heures à construire des sites web d'entraînement, à recréer des pages d'accueil pour des hôtels, des restaurants et des services locaux, en étudiant leur structure et leur design. Quelques années plus tard, j'ai conçu et développé mon premier site portfolio. En y repensant, ce n'était pas le code en lui-même qui me fascinait le plus, mais l'idée de créer quelque chose à partir de zéro et de le voir prendre vie.",
    highlights: [
      "premier cours de développement web",
      "HTML et CSS",
      "sites web d'entraînement",
      "premier site portfolio",
      "créer quelque chose à partir de zéro",
    ],
  },
  {
    place: "Hackathon From Scratch",
    moment: "Prix de l'équipe gagnante",
    image: "Photo de hackathon",
    imageSrc: "/images/about/hackathon-winning-team.png",
    imageAlt: "Rayann et son équipe de hackathon tenant les trophées de première place.",
    title: "J'ai appris ce qu'une équipe peut construire.",
    body:
      "Lors de mon premier hackathon, organisé avec Orange, mon équipe et moi avons concouru contre 135 autres équipes pour résoudre un défi réel. Nous avons passé des jours à réfléchir, construire, tester des idées et affiner notre présentation. Quand nous avons été annoncés comme équipe gagnante, la réussite semblait plus grande que le trophée lui-même. Cela m'a montré que l'innovation est rarement un effort solitaire. Les meilleures idées émergent quand des personnes différentes réunissent leurs compétences autour d'un objectif commun.",
    highlights: [
      "premier hackathon",
      "135 autres équipes",
      "équipe gagnante",
      "l'innovation est rarement un effort solitaire",
    ],
  },
  {
    place: "Ottawa, Canada",
    moment: "University of Ottawa",
    image: "Photo du chapitre Ottawa",
    title: "L'ingénierie est devenue le langage.",
    body:
      "Déménager au Canada n'a pas effacé d'où je viens. Cela m'a offert un environnement technique plus vaste, de nouvelles questions et la chance de relier logiciel, matériel, IA et besoins humains avec plus de profondeur.",
  },
];
