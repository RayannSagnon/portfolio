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
      title: "Un OS académique, pas une autre to-do",
      subtitle:
        "StudentOS transforme un semestre fragmenté en un centre de commande : accueil, calendrier, focus et Ask AI sur React Native, avec sync cloud et OTP par courriel scolaire pour la beta fermée.",
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
          description: "Coach d'étude pour planifier et avancer.",
          icon: "cloud",
        },
      ],
      stats: [
        { value: "β", label: "Beta fermée" },
        { value: "1", label: "OS académique" },
        { value: "OTP", label: "Courriel scolaire" },
      ],
    },
    why: {
      title: "Pourquoi ça existe",
      subtitle:
        "Les étudiants ne manquent pas d'apps. Ils manquent de continuité. StudentOS est pensé pour le job académique, pas la productivité générique.",
      beforeLabel: "Avant : stack fragmentée",
      afterLabel: "Après : un espace académique",
      chaosTabs: [
        "Notion",
        "Calendrier",
        "Canvas",
        "Notes",
        "Gmail",
        "Rappels",
        "Drive",
        "Groupes",
        "Tableurs",
      ],
      metrics: [
        { label: "Changement de contexte", before: 88, after: 28, unit: "%" },
        { label: "Visibilité du semestre", before: 30, after: 86, unit: "%" },
        { label: "Friction avant le deep work", before: 72, after: 34, unit: "%" },
      ],
    },
    how: {
      title: "Comment ça shippe",
      subtitle:
        "Un chemin produit en beta fermée : valider avec les étudiants d'abord, puis durcir la distribution native. Expo Go aujourd'hui, TestFlight et App Store ensuite.",
      layers: [
        { label: "Expo UI", detail: "Écrans React Native, navigation et motion." },
        { label: "État client", detail: "Store Zustand + AsyncStorage pour la continuité locale." },
        { label: "API + auth", detail: "API Express, sync JWT, OTP courriel scolaire." },
        { label: "Ask AI", detail: "Coach d'étude via proxy serveur." },
      ],
      phases: [
        {
          step: "01",
          title: "Nommer la fragmentation",
          body: "Cartographier la semaine étudiante : cours, deadlines, focus et le coût de cinq outils.",
        },
        {
          step: "02",
          title: "Concevoir l'OS académique",
          body: "L'accueil comme surface de prochaine action, puis calendrier, focus, profil, GPA et Ask AI.",
        },
        {
          step: "03",
          title: "Ouvrir une beta fermée",
          body: "OTP scolaire, sync cloud et boucle de feedback depuis Profil → Beta feedback.",
        },
        {
          step: "04",
          title: "Mériter la distribution native",
          body: "Passer d'Expo Go aux builds EAS, TestFlight et App Store une fois l'usage validé.",
        },
      ],
    },
  },
  signs: {
    what: {
      title: "Rendre la langue des signes aussi facile à démarrer qu'une langue parlée",
      subtitle:
        "SIgns est un produit d'apprentissage mobile construit à deux : un dictionnaire visuel et des leçons structurées pour des apprenants souvent laissés de côté.",
      modules: [
        {
          label: "Dictionnaire",
          description: "Chercher ou parcourir des signes avec démos et descriptions.",
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
          description: "Suivi et séries pour faire revenir l'apprenant.",
          icon: "smartphone",
        },
      ],
      stats: [
        { value: "2", label: "Builders" },
        { value: "2", label: "Piliers produit" },
        { value: "1", label: "Codebase RN" },
      ],
    },
    why: {
      title: "Pourquoi ça existe",
      subtitle:
        "La plupart des produits de langues optimisent pour l'oral. Les langues des signes restent sous-servies malgré des millions d'apprenants potentiels.",
      beforeLabel: "Avant : marché oral-first",
      afterLabel: "Après : produit sign-first",
      chaosTabs: [
        "Clips YouTube",
        "PDF statiques",
        "Apps aléatoires",
        "Démos inconsistantes",
        "Pas de parcours",
        "UX oral-only",
      ],
      metrics: [
        { label: "Temps jusqu'au premier signe utile", before: 70, after: 25, unit: "%" },
        { label: "Couverture de leçons structurées", before: 18, after: 82, unit: "%" },
        { label: "Friction de révision", before: 65, after: 30, unit: "%" },
      ],
    },
    how: {
      title: "Comment c'était construit",
      subtitle:
        "Un ship React Native à deux : un codebase pour iOS et Android, centré sur une UI de leçons et de dictionnaire réutilisable.",
      layers: [
        { label: "React Native", detail: "UI mobile partagée pour les deux plateformes." },
        { label: "Navigation", detail: "React Navigation entre dictionnaire et leçons." },
        { label: "État", detail: "Zustand pour progression, favoris et session." },
        { label: "Backend", detail: "API Node.js et PostgreSQL pour le contenu." },
      ],
      phases: [
        {
          step: "01",
          title: "Définir le manque",
          body: "Les apps orales dominent ; les apprenants de langue des signes n'ont pas de départ clair ni de boucle durable.",
        },
        {
          step: "02",
          title: "Choisir deux piliers",
          body: "Shipper un dictionnaire visuel et des leçons structurées avant d'ajouter des features secondaires.",
        },
        {
          step: "03",
          title: "Avancer à deux",
          body: "Choisir React Native pour atteindre les deux stores sans diviser l'équipe.",
        },
        {
          step: "04",
          title: "Enseigner par étapes",
          body: "Passer des salutations à la conversation avec reconnaissance, association et rappel.",
        },
      ],
    },
  },
};
