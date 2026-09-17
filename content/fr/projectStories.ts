export type StoryIcon =
  | "layout-dashboard"
  | "book-open"
  | "timer"
  | "check-square"
  | "layers"
  | "smartphone"
  | "database"
  | "cloud";

export type ProjectStoryData = {
  what: {
    title: string;
    subtitle: string;
    modules: {
      label: string;
      description: string;
      icon: StoryIcon;
    }[];
    stats: { value: string; label: string }[];
  };
  why: {
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    chaosTabs: string[];
    /** Optionnel. Omettre ou laisser vide. Ne jamais inventer de pourcentages mesurés. */
    metrics?: {
      label: string;
      before: number;
      after: number;
      unit?: string;
    }[];
    /** Décisions produit racontées en récit plutôt qu'avec de faux graphiques */
    decisions?: { label: string; body: string }[];
  };
  how: {
    title: string;
    subtitle: string;
    layers: { label: string; detail: string }[];
    phases: { step: string; title: string; body: string }[];
  };
};

export const projectStories: Record<string, ProjectStoryData> = {
  standout: {
    what: {
      title: "Du vrai travail client, pas une démo",
      subtitle:
        "Standout Studio est un studio web bilingue à Ottawa. La preuve, ce sont les réunions, les propositions cadrées, les itérations avec les clients, les sites livrés et les premiers revenus.",
      modules: [
        {
          label: "Découverte",
          description:
            "Écouter ce que le client demande, puis trouver le vrai besoin derrière la demande.",
          icon: "book-open",
        },
        {
          label: "Cadrage",
          description:
            "Budget, échéancier et ce qu'on refuse pour que le site puisse sortir proprement.",
          icon: "layers",
        },
        {
          label: "Itérer",
          description:
            "Propositions, tours de feedback et changements design/dev jusqu'à ce que ça colle.",
          icon: "check-square",
        },
        {
          label: "Livrer",
          description:
            "Mettre le site en ligne et le garder vivant avec une propriété claire après le transfert.",
          icon: "smartphone",
        },
      ],
      stats: [
        { value: "~$3K", label: "Revenus précoces" },
        { value: "2", label: "Langues" },
        { value: "OTT", label: "Basé à Ottawa" },
      ],
    },
    why: {
      title: "Pourquoi le studio existe",
      subtitle:
        "Les freelances et les entreprises locales ont besoin d'une première impression claire en ligne, pas d'un dump de gabarits. Le travail, c'est comprendre la personne, puis livrer un site qu'elle peut posséder.",
      beforeLabel: "Ce avec quoi les clients arrivent souvent",
      afterLabel: "Ce qu'on vise à leur laisser",
      chaosTabs: [
        "Brief vague",
        "Captures de concurrents",
        "Trop de pages",
        "Offre floue",
        "Pas de plan bilingue",
        "Anxiété budgétaire",
      ],
      metrics: [],
      decisions: [
        {
          label: "Partenaire, pas boutique à tickets",
          body: "Moins de clients, un scope plus clair et du soin après le lancement battent la course aux builds ponctuels.",
        },
        {
          label: "Bilingue par défaut",
          body: "Le travail à Ottawa demande souvent EN/FR. On conçoit le modèle de contenu pour les deux, pas en rattrapage.",
        },
        {
          label: "Honnêteté sur la scène",
          body: "Les revenus précoces sont réels et modestes (~$3K jusqu'ici). C'est assez pour prouver la livraison sans les déguiser en ARR.",
        },
      ],
    },
    how: {
      title: "Comment le travail client a vraiment avancé",
      subtitle:
        "Découverte → proposition → feedback → build → lancement. Mon rôle couvre le cadrage produit, la livraison web et l'itération avec le client.",
      layers: [
        { label: "Produit", detail: "Cadrage du besoin, priorités et ce qu'on coupe." },
        {
          label: "Design",
          detail: "Première impression, mise en page et structure de contenu bilingue.",
        },
        {
          label: "Build",
          detail: "Sites marketing Next.js / TypeScript qui restent maintenables.",
        },
        {
          label: "Livraison",
          detail: "Transfert, mise en ligne et un studio qui répond.",
        },
      ],
      phases: [
        {
          step: "01",
          title: "Entendre le vrai job",
          body: "Les clients ont rarement besoin de toutes les pages qu'ils listent. Les réunions font émerger l'offre, l'audience et la contrainte qui comptent.",
        },
        {
          step: "02",
          title: "Proposer et simplifier",
          body: "Cadre le budget et l'échéancier. Refuser les extras qui retarderaient un premier lancement propre.",
        },
        {
          step: "03",
          title: "Itérer à découvert",
          body: "Partager les propositions, prendre le feedback et changer le design jusqu'à ce que le client puisse défendre le résultat.",
        },
        {
          step: "04",
          title: "Shipper et rester joignable",
          body: "Livrer le site en ligne. Garder la propriété claire pour que la première impression ne pourrisse pas après le transfert.",
        },
      ],
    },
  },
  signs: {
    what: {
      title: "Rendre la langue des signes aussi facile à démarrer qu'une langue parlée",
      subtitle:
        "SIgns est un produit d'apprentissage mobile co-construit avec Steven Readman : un dictionnaire visuel et des leçons structurées. On passe du build à la soumission store, au recrutement beta et au vrai feedback.",
      modules: [
        {
          label: "Dictionnaire",
          description: "Chercher ou parcourir des signes avec démos et descriptions claires.",
          icon: "book-open",
        },
        {
          label: "Leçons",
          description: "Parcours progressifs, des salutations à la conversation.",
          icon: "layers",
        },
        {
          label: "Pratique",
          description: "Exercices de reconnaissance, association et rappel.",
          icon: "check-square",
        },
        {
          label: "Progression",
          description: "Suivi et séries pour faire revenir les apprenants.",
          icon: "smartphone",
        },
      ],
      stats: [
        { value: "2", label: "Builders" },
        { value: "2", label: "Piliers produit" },
        { value: "β", label: "Beta Android à venir" },
      ],
    },
    why: {
      title: "Pourquoi ça existe",
      subtitle:
        "La plupart des produits de langues optimisent pour l'oral. Les langues des signes restent sous-servies. On met seulement maintenant le produit devant de vrais apprenants, alors cette page n'invente pas de métriques d'usage.",
      beforeLabel: "Ce que les apprenants jonglent aujourd'hui",
      afterLabel: "Ce que SIgns vise à être",
      chaosTabs: [
        "Clips YouTube",
        "PDF statiques",
        "Apps aléatoires",
        "Démos inconsistantes",
        "Pas de parcours",
        "UX oral-only",
      ],
      metrics: [],
      decisions: [
        {
          label: "Deux piliers d'abord",
          body: "Dictionnaire + leçons avant d'élargir vers des features qui diluent la boucle d'apprentissage.",
        },
        {
          label: "Propriété partagée",
          body: "Steven et moi avons co-construit à deux. Cadrage produit, UX mobile et ingénierie ont avancé ensemble sur un seul codebase React Native.",
        },
        {
          label: "Beta avant le théâtre du polish",
          body: "La prochaine preuve, ce sont les testeurs et le feedback store, pas un autre deck de captures.",
        },
      ],
    },
    how: {
      title: "Comment on lance",
      subtitle:
        "Idée → build → chemin store → recruter des testeurs → apprendre. La beta Android est la porte actuelle.",
      layers: [
        { label: "React Native", detail: "UI mobile partagée pour les deux plateformes." },
        { label: "Navigation", detail: "React Navigation entre dictionnaire et leçons." },
        { label: "État", detail: "Zustand pour progression, favoris et flux de session." },
        { label: "Backend", detail: "API Node.js avec PostgreSQL pour le contenu d'apprentissage." },
      ],
      phases: [
        {
          step: "01",
          title: "Définir le manque",
          body: "Les apps de langues parlées dominent ; les apprenants de langue des signes n'ont pas de départ clair ni de boucle de pratique durable.",
        },
        {
          step: "02",
          title: "Shipper la boucle centrale",
          body: "Dictionnaire et leçons structurées dans une app RN, construite par une équipe de deux.",
        },
        {
          step: "03",
          title: "Entrer en vrais tests",
          body: "Préparer la beta Android, recruter des apprenants et capturer ce qui casse en pratique.",
        },
        {
          step: "04",
          title: "Itérer à partir du feedback",
          body: "Remplacer les hypothèses par les problèmes des testeurs, puis changer le produit.",
        },
      ],
    },
  },
  studentos: {
    what: {
      title: "Un OS académique, exploré assez loin pour faire pause",
      subtitle:
        "StudentOS a été construit comme un planner étudiant : accueil, calendrier, focus et Ask AI sur React Native. C'est une exploration produit mise en pause avant une beta payante, pas une beta fermée live avec des utilisateurs.",
      modules: [
        {
          label: "Accueil",
          description: "Progression hebdomadaire, série et ce qui compte aujourd'hui.",
          icon: "layout-dashboard",
        },
        {
          label: "Calendrier",
          description: "Cours, examens et vacances en jour, semaine et mois.",
          icon: "book-open",
        },
        {
          label: "Focus",
          description: "Timer et chronomètre avec musique dans la boucle d'étude.",
          icon: "timer",
        },
        {
          label: "Ask AI",
          description: "Coach d'étude pour planifier et avancer académiquement.",
          icon: "cloud",
        },
      ],
      stats: [
        { value: "∥", label: "En pause" },
        { value: "1", label: "Concept d'OS académique" },
        { value: "OTP", label: "Chemin courriel scolaire conçu" },
      ],
    },
    why: {
      title: "Pourquoi ça existe, et pourquoi ça s'est arrêté",
      subtitle:
        "Les étudiants ne manquent pas d'apps. Ils manquent de continuité. Construire assez loin a révélé un problème de modèle : un coach IA utile a un coût marginal, et la distribution Apple n'est pas gratuite. J'ai refusé une beta portfolio qui brûle de l'argent sans chemin de monétisation.",
      beforeLabel: "Stack étudiante fragmentée",
      afterLabel: "Espace académique visé",
      chaosTabs: [
        "Notion",
        "Calendrier",
        "Canvas",
        "Notes",
        "Gmail",
        "Rappels",
        "Drive",
        "Groupes",
      ],
      metrics: [],
      decisions: [
        {
          label: "Pause avant beta payante",
          body: "Je ne financerais pas les frais Apple ni l'usage d'API IA pour des testeurs gratuits juste pour écrire « beta » sur un portfolio.",
        },
        {
          label: "Architecture vs économie",
          body: "Un coach d'étude IA qui se sent utile introduit un coût par utilisateur. Sans monétisation, scaler est une dette.",
        },
        {
          label: "Garder l'apprentissage",
          body: "StudentOS reste l'étude de cas pour la vision, le job académique à accomplir et l'arrêt dur avant de brûler.",
        },
      ],
    },
    how: {
      title: "Jusqu'où ça a été",
      subtitle:
        "Cadrage du problème → design d'OS académique → chemin de build Expo → pause avant les frais de distribution. Reprendre seulement si le modèle est clair.",
      layers: [
        { label: "Expo UI", detail: "Écrans React Native, navigation et motion." },
        {
          label: "État client",
          detail: "Store Zustand + AsyncStorage pour la continuité locale.",
        },
        {
          label: "API + auth",
          detail: "API Express, sync JWT, chemin d'adhésion OTP courriel scolaire.",
        },
        {
          label: "Ask AI",
          detail: "Coach d'étude via proxy serveur, le centre de coût qui a forcé la pause.",
        },
      ],
      phases: [
        {
          step: "01",
          title: "Nommer la fragmentation",
          body: "Cartographier la semaine étudiante : cours, deadlines, focus et le coût de jongler avec cinq outils.",
        },
        {
          step: "02",
          title: "Concevoir l'OS académique",
          body: "L'accueil comme surface de prochaine action, puis calendrier, focus, profil, GPA et Ask AI comme jobs connectés.",
        },
        {
          step: "03",
          title: "Construire le prototype en profondeur",
          body: "Shipper assez de la boucle sur Expo pour sentir le produit, y compris le chemin de coaching IA.",
        },
        {
          step: "04",
          title: "Pause volontaire",
          body: "S'arrêter avant les frais Apple et le burn IA. Traiter cet arrêt comme une décision produit, pas un échec.",
        },
      ],
    },
  },
  rcx: {
    what: {
      title: "La boucle est le produit",
      subtitle:
        "RC-X a commencé comme une petite plateforme télécommandée et est devenu une leçon de contrôle temps réel. Sur un châssis en mouvement, la voiture vous dit immédiatement quand vos hypothèses sont fausses. La latence devient visible. Le jitter devient mouvement.",
      modules: [
        {
          label: "Perception",
          description: "Distance ultrasonique, flux caméra et retour des roues du châssis.",
          icon: "layers",
        },
        {
          label: "Boucle de contrôle",
          description: "Lire l'entrée, interpréter, actionner, observer, recommencer — assez vite pour sembler ennuyeuse.",
          icon: "timer",
        },
        {
          label: "Comms",
          description: "Liaison radio avec la question dure : quoi envoyer maintenant vs journaliser plus tard.",
          icon: "cloud",
        },
        {
          label: "Actionneurs",
          description: "Moteurs DC et servo panoramique répondant à la boucle en temps réel.",
          icon: "smartphone",
        },
      ],
      stats: [
        { value: "Kit", label: "Plateforme ELEGOO" },
        { value: "4WD", label: "Roues motrices" },
        { value: "RT", label: "Boucle temps réel" },
      ],
    },
    why: {
      title: "Pourquoi cette plateforme existe",
      subtitle:
        "Les petites plateformes compressent la complexité. RC-X n'est pas un véhicule autonome complet, mais il contient les mêmes familles de problèmes : perception, actionnement, latence, sécurité, rétroaction et confiance de l'opérateur. L'échelle est plus petite. Les leçons ne le sont pas.",
      beforeLabel: "Ce qui se cache sur un ordinateur",
      afterLabel: "Ce qu'un châssis en mouvement révèle",
      chaosTabs: [
        "Couches d'abstraction",
        "Latence cachée",
        "Jitter invisible",
        "Échecs silencieux",
        "Bugs de timing",
        "État non reproductible",
      ],
      metrics: [],
      decisions: [
        {
          label: "Le bare metal comme professeur",
          body: "Une voie firmware de bas niveau signifie moins de décisions invisibles entre l'entrée et la sortie. Quand la voiture se comporte mal, il y a moins d'endroits où le bug peut se cacher.",
        },
        {
          label: "Diagnostics vs contrôle",
          body: "Plus on envoie, plus on encombre le canal de contrôle. Les systèmes temps réel consistent à décider quelle information a le droit d'interrompre le présent.",
        },
        {
          label: "Confiance par prévisibilité",
          body: "La boucle doit sembler ennuyeuse — assez prévisible pour que le véhicule disparaisse sous l'intention de l'opérateur. C'est la différence entre un appareil et une plateforme.",
        },
      ],
    },
    how: {
      title: "Comment la plateforme s'est construite",
      subtitle:
        "Châssis kit ELEGOO avec module caméra, capteur ultrasonique, servo panoramique et moteurs DC. Le chemin firmware est resté bas niveau pour garder la plateforme lisible.",
      layers: [
        { label: "Châssis", detail: "Kit ELEGOO 4WD avec cadre acrylique noir et roues motrices jaunes." },
        { label: "Perception", detail: "Ultrasonique style HC-SR04 sur servo panoramique, plus module caméra." },
        { label: "Actionnement", detail: "Moteurs DC pilotés via carte de contrôle, alimentation par pack batterie." },
        { label: "Firmware", detail: "Boucle de contrôle bare-metal possédant timing, périphériques et états de défaillance." },
      ],
      phases: [
        {
          step: "01",
          title: "Assembler le kit",
          body: "Plateforme ELEGOO Smart Robot Car : châssis, moteurs, ultrasonique, caméra, carte de contrôle, pack batterie, câblage.",
        },
        {
          step: "02",
          title: "Construire la boucle de contrôle",
          body: "Lire l'entrée, interpréter l'intention, actionner, observer le résultat. Assez vite pour disparaître.",
        },
        {
          step: "03",
          title: "Apprendre les compromis",
          body: "La bande passante radio est finie. Décider ce dont l'opérateur a besoin maintenant versus ce qui peut être journalisé plus tard.",
        },
        {
          step: "04",
          title: "Vers la perception embarquée",
          body: "Prochaine version : déplacer plus d'intelligence sur la plateforme — diagnostics plus riches, éventuellement autonomie en boucle fermée.",
        },
      ],
    },
  },
};
