export type ProjectBadge = {
  label: string;
  value: string;
};

export type ProjectReadmeData = {
  badges: ProjectBadge[];
  why: {
    title: string;
    body: string;
  };
  highlights: string[];
  techStack: string[];
  gettingStarted: {
    prerequisites: string[];
    steps: string[];
    buildCommand?: string;
  };
  projectStructure?: string;
  roadmap?: string[];
};

export const projectReadmes: Record<string, ProjectReadmeData> = {
  standout: {
    badges: [
      { label: "Type", value: "Travail client" },
      { label: "Lieu", value: "Ottawa" },
      { label: "Langues", value: "EN / FR" },
      { label: "Stade", value: "Studio actif" },
    ],
    why: {
      title: "Pourquoi Standout Studio",
      body: "Les freelances et les entreprises locales ont besoin d'une première impression claire en ligne, pas d'un dump de gabarits. Standout Studio est un studio web bilingue à Ottawa : vraies réunions, propositions cadrées, itérations design/dev, sites livrés et environ 3 000 $ de revenus précoces à ce jour.",
    },
    highlights: [
      "Découverte client : entendre la demande, trouver le vrai job",
      "Cadrage budget / échéancier avant le build",
      "Sites marketing Next.js / TypeScript maintenables",
      "Contenu bilingue EN/FR conçu dès le départ",
      "Suivi après livraison, pas un handoff silencieux",
      "Preuve réelle : clients payants et sites en ligne",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "CSS / design systems",
      "Vercel",
    ],
    gettingStarted: {
      prerequisites: [
        "Node.js 20+",
        "npm",
        "Accès au dépôt du site client concerné",
      ],
      steps: [
        "Cloner le dépôt Standout Studio ou le dépôt du site client.",
        "Installer les dépendances avec npm install.",
        "Lancer le serveur de développement local.",
        "Itérer avec le client jusqu'à la mise en ligne.",
      ],
      buildCommand: "npm run dev",
    },
    projectStructure: `app/           # Routes et pages Next.js
components/    # UI partagée
content/       # Contenu bilingue
public/        # Assets statiques`,
    roadmap: [
      "Continuer les livraisons clients avec un scope clair",
      "Renforcer le modèle de contenu bilingue EN/FR",
      "Garder le suivi post-lancement comme différenciateur",
      "Scaler le studio sans redevenir une boutique à tickets",
    ],
  },
  studentos: {
    badges: [
      { label: "Plateforme", value: "React Native" },
      { label: "Expo", value: "SDK 54" },
      { label: "Stade", value: "Exploration / pause" },
      { label: "Licence", value: "MIT" },
    ],
    why: {
      title: "Pourquoi StudentOS",
      body: "Les étudiants n'échouent pas par manque d'outils. Ils échouent parce que la vie académique est fragmentée. StudentOS a été exploré comme un OS académique : accueil, calendrier, focus et Ask AI. Assez loin pour révéler un problème de modèle — un coach IA utile a un coût marginal, et la distribution Apple n'est pas gratuite — puis mis en pause avant une beta payante.",
    },
    highlights: [
      "Objets académiques : cours, tâches, examens, vacances",
      "Centre de commande avec progression et prochaines actions",
      "Timer / chronomètre de focus avec musique dans la boucle produit",
      "Coach Ask AI via proxy serveur (centre de coût)",
      "Chemin d'adhésion OTP par courriel scolaire conçu",
      "Pause volontaire avant frais Apple et burn API",
    ],
    techStack: [
      "React Native",
      "Expo Router (SDK 54)",
      "TypeScript",
      "Zustand + AsyncStorage",
      "API Express + SQLite",
      "EAS Build / Submit",
    ],
    gettingStarted: {
      prerequisites: [
        "Node.js 20+",
        "npm",
        "Expo Go sur iPhone pour tester sur appareil",
      ],
      steps: [
        "Cloner le dépôt StudentOS.",
        "Lancer npm install (et npm --prefix server install si besoin de l'API locale).",
        "Démarrer avec npm run start:go et scanner le QR dans Expo Go.",
        "Explorer le prototype localement ; pas de beta publique active.",
      ],
      buildCommand: "npm run start:go",
    },
    projectStructure: `app/           # Écrans Expo Router
components/    # UI partagée
src/           # Logique domaine
server/        # API Express + SQLite
store/         # Docs distribution native
screenshots/   # Captures produit`,
    roadmap: [
      "Reprendre seulement si le modèle de monétisation est clair",
      "Éviter une beta portfolio qui brûle frais Apple + API IA",
      "Garder StudentOS comme étude de cas produit et architecture",
      "Documenter la leçon : pause avant burn ≠ échec",
    ],
  },
  signs: {
    badges: [
      { label: "Plateforme", value: "React Native" },
      { label: "Équipe", value: "2 builders" },
      { label: "Stade", value: "Préparation beta Android" },
      { label: "Piliers", value: "Dictionnaire + leçons" },
    ],
    why: {
      title: "Pourquoi SIgns",
      body: "La plupart des produits d'apprentissage de langues se concentrent sur l'oral. SIgns comble ce manque avec une expérience mobile autour d'un dictionnaire visuel et de leçons structurées, co-construit avec Steven Readman. On prépare maintenant la beta Android, le recrutement de testeurs et l'itération par feedback réel.",
    },
    highlights: [
      "Dictionnaire visuel avec recherche, catégories et favoris",
      "Parcours de leçons structurés par difficulté",
      "Exercices de reconnaissance, association et rappel",
      "Suivi de progression et séries de complétion",
      "Un seul codebase React Native pour iOS et Android",
      "Co-construit avec Steven Readman (équipe de 2)",
    ],
    techStack: [
      "React Native",
      "React Navigation",
      "Zustand",
      "Node.js",
      "PostgreSQL",
    ],
    gettingStarted: {
      prerequisites: [
        "Node.js",
        "npm ou yarn",
        "Simulateur iOS, émulateur Android ou appareil physique",
      ],
      steps: [
        "Cloner le dépôt SIgns (screadman/SIgns).",
        "Ouvrir le workspace asl-app et installer les dépendances.",
        "Lancer l'app React Native sur iOS ou Android.",
        "Parcourir le dictionnaire et les flux de leçons de bout en bout.",
      ],
    },
    projectStructure: `asl-app/
  assets/asl/     # Médias de signes par catégorie
  assets/onboarding/
  # Écrans React Native, navigation et état`,
    roadmap: [
      "Soumettre et ouvrir la beta Android",
      "Recruter des apprenants et capturer le feedback réel",
      "Renforcer les boucles de progression et de révision",
      "Élargir la couverture des leçons conversationnelles",
    ],
  },
  rcx: {
    badges: [
      { label: "Plateforme", value: "Embarqué" },
      { label: "Base", value: "Kit ELEGOO" },
      { label: "Focus", value: "Contrôle temps réel" },
      { label: "Stade", value: "Plateforme d'apprentissage" },
    ],
    why: {
      title: "Pourquoi RC-X",
      body: "RC-X a commencé comme une petite plateforme télécommandée et est devenu une leçon de contrôle temps réel. Sur un ordinateur, on peut se cacher derrière l'abstraction. Sur un châssis en mouvement, la latence devient visible, le jitter devient mouvement, et un connecteur lâche devient un comportement. Les petites plateformes compressent la complexité — RC-X contient les mêmes familles de problèmes qu'un véhicule autonome complet : perception, actionnement, latence, sécurité, rétroaction et confiance de l'opérateur.",
    },
    highlights: [
      "Châssis kit ELEGOO Smart Robot Car",
      "Quatre roues motrices avec moteurs DC",
      "Capteur ultrasonique sur servo panoramique",
      "Module caméra pour retour visuel",
      "Voie firmware bare-metal pour lisibilité de la plateforme",
      "Boucle de contrôle conçue pour sembler ennuyeuse — assez prévisible pour que le véhicule disparaisse sous l'intention de l'opérateur",
      "Discipline de compromis radio : quoi envoyer maintenant vs journaliser plus tard",
    ],
    techStack: [
      "Kit ELEGOO Smart Robot Car",
      "Capteur ultrasonique style HC-SR04",
      "Servo panoramique pour orientation capteur",
      "Module caméra",
      "Moteurs DC à engrenages",
      "Carte de contrôle + shield",
      "Pack batterie",
      "Firmware bare-metal",
    ],
    gettingStarted: {
      prerequisites: [
        "Kit ELEGOO Smart Robot Car ou châssis 4WD similaire",
        "Environnement de développement firmware",
        "Liaison radio pour télécommande",
      ],
      steps: [
        "Assembler la plateforme kit : châssis, moteurs, capteurs, câblage.",
        "Construire la boucle de contrôle : lire l'entrée, interpréter, actionner, observer.",
        "Ajuster jusqu'à ce que la boucle semble ennuyeuse — assez prévisible pour disparaître.",
        "Voir l'essai archive pour les leçons profondes : /archive/rc-x-control-lessons",
      ],
    },
    projectStructure: `chassis/       # Assemblage physique
firmware/      # Boucle de contrôle et pilotes périphériques
comms/         # Liaison radio et diagnostics
docs/          # Notes matériel et schémas de câblage`,
    roadmap: [
      "Aller vers la perception embarquée",
      "Diagnostics plus riches sans encombrer le canal de contrôle",
      "Éventuellement autonomie en boucle fermée",
    ],
  },
};
