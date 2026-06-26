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
    metrics: {
      label: string;
      before: number;
      after: number;
      unit?: string;
    }[];
  };
  how: {
    title: string;
    subtitle: string;
    layers: { label: string; detail: string }[];
    phases: { step: string; title: string; body: string }[];
  };
};

export const projectStories: Record<string, ProjectStoryData> = {
  studentos: {
    what: {
      title: "Un centre de commande pour les études",
      subtitle:
        "StudentOS regroupe planification, progression et concentration dans une seule surface Android au lieu de les disperser entre les onglets du navigateur.",
      modules: [
        {
          label: "Tableau de bord",
          description: "Progression hebdomadaire, séries et ce qui compte aujourd'hui.",
          icon: "layout-dashboard",
        },
        {
          label: "Cours",
          description: "Devoirs, échéances et contexte de cours dans un seul fil.",
          icon: "book-open",
        },
        {
          label: "Concentration",
          description: "Blocs d'étude chronométrés avec un rituel clair de début et de fin.",
          icon: "timer",
        },
        {
          label: "Tâches",
          description: "Capturer le travail, trier les priorités et boucler la boucle.",
          icon: "check-square",
        },
      ],
      stats: [
        { value: "4", label: "Flux de travail essentiels" },
        { value: "1", label: "Surface unifiée" },
        { value: "0", label: "Synchronisation cloud requise" },
      ],
    },
    why: {
      title: "Pourquoi il existe",
      subtitle:
        "La plupart des étudiants ne manquent pas d'outils. Ils manquent de continuité entre eux. StudentOS a été façonné autour de cette friction.",
      beforeLabel: "Avant : neuf onglets",
      afterLabel: "Après : un espace de travail",
      chaosTabs: [
        "Canvas",
        "Drive",
        "Notion",
        "Calendar",
        "Gmail",
        "Sheets",
        "Quizlet",
        "Slack",
        "Docs",
      ],
      metrics: [
        { label: "Changement de contexte", before: 88, after: 24, unit: "%" },
        { label: "Échéances suivies en un seul endroit", before: 22, after: 91, unit: "%" },
        { label: "Temps pour démarrer un bloc d'étude", before: 74, after: 31, unit: "%" },
      ],
    },
    how: {
      title: "Comment il a été construit",
      subtitle:
        "Un MVP local-first en Kotlin et Compose, conçu pour rester rapide sur le matériel réel des étudiants et évoluer vers la synchronisation plus tard.",
      layers: [
        { label: "Interface Compose", detail: "Écrans Material 3, navigation et animations." },
        { label: "ViewModels", detail: "Logique d'écran et actions utilisateur pilotées par StateFlow." },
        { label: "Repositories", detail: "Source unique de vérité entre les fonctionnalités." },
        { label: "Room + Firebase", detail: "Persistance hors ligne avec crochets prêts pour le cloud." },
      ],
      phases: [
        {
          step: "01",
          title: "Cartographier la boucle étudiante",
          body: "Entretiens, audits d'onglets et croquis de flux pour identifier ce qui se répète chaque semaine.",
        },
        {
          step: "02",
          title: "Concevoir le centre de commande",
          body: "Tableau de bord Material 3 d'abord, puis cours, tâches et concentration comme modules connectés.",
        },
        {
          step: "03",
          title: "Livrer le MVP local-first",
          body: "Room pour la persistance, Compose pour la vitesse, Firebase câblé mais optionnel au lancement.",
        },
        {
          step: "04",
          title: "Itérer en public",
          body: "CI GitHub Actions, documentation README et récit produit prêt pour le portfolio.",
        },
      ],
    },
  },
};
