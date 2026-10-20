// ─────────────────────────────────────────────────────────────
// PROJETS — ajoute un objet au tableau pour publier une réalisation.
// Champs facultatifs : image, demo, repo, details. Les liens vides sont masqués.
// status : "live" | "dev" | "concept"
// features[].state : "done" (vérifié) | "wip" (en cours) | "planned" (visé)
// ─────────────────────────────────────────────────────────────
export const STATUS = {
  live: { label: "En ligne", tone: "ok" },
  dev: { label: "En développement", tone: "wip" },
  concept: { label: "En conception", tone: "idle" },
};

export const FEATURE_STATE = {
  done: "Réalisé",
  wip: "En cours",
  planned: "Visé",
};

export const projects = [
  {
    slug: "onejeysirtech",
    title: "ONEJEYSIRTECH",
    tagline: "Trouver le bon technicien, sans chercher pendant des jours.",
    description:
      "Plateforme de mise en relation entre clients et techniciens spécialisés : recherche par métier, profils, et suivi des demandes de service.",
    category: "Plateforme web",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    status: "dev",
    featured: true,
    visual: "tech",
    image: "", // import d'une vraie capture : import shot from "../assets/tech.png"
    demo: "",
    repo: "",
    details: {
      context:
        "Au Cameroun, trouver un électricien, un plombier ou un réparateur fiable passe souvent par le bouche-à-oreille.",
      problem:
        "Les clients ne savent pas qui contacter ni comment comparer ; les techniciens qualifiés manquent de visibilité.",
      goals: [
        "Rendre les techniciens trouvables par métier et par zone",
        "Structurer une demande de service claire",
        "Donner aux techniciens un profil professionnel",
      ],
      solution:
        "Une application web PHP/MySQL : le client parcourt des catégories, consulte des profils et envoie une demande ; le technicien la reçoit et y répond.",
      architecture: [
        { layer: "Interface", value: "HTML, CSS, JavaScript : pages responsive, formulaires" },
        { layer: "Serveur", value: "PHP : routage, sessions, logique métier" },
        { layer: "Données", value: "MySQL : utilisateurs, techniciens, catégories, demandes" },
        { layer: "Local", value: "WampServer / XAMPP, phpMyAdmin" },
      ],
      features: [
        { name: "Recherche de techniciens", state: "planned" },
        { name: "Catégories de services", state: "planned" },
        { name: "Profils professionnels", state: "planned" },
        { name: "Demandes de services", state: "planned" },
        { name: "Gestion des comptes", state: "planned" },
        { name: "Messagerie", state: "planned" },
        { name: "Évaluations", state: "planned" },
        { name: "Administration", state: "planned" },
      ],
      challenges: [
        {
          issue: "Modéliser des relations client ↔ technicien ↔ demande sans doublons",
          answer: "Schéma relationnel normalisé et clés étrangères sur les demandes",
        },
        {
          issue: "Sécuriser les comptes et les formulaires",
          answer: "Mots de passe hachés, requêtes préparées, validation côté serveur",
        },
      ],
      next: [
        "Géolocalisation des techniciens",
        "Notifications de nouvelles demandes",
        "Migration progressive vers Laravel",
      ],
    },
  },
  {
    slug: "onejeysiredu237",
    title: "ONEJEYSIREDU237",
    tagline: "Réviser mieux, arriver prêt au concours.",
    description:
      "Projet EdTech pour accompagner les apprenants camerounais dans leurs révisions et leur préparation aux concours.",
    category: "EdTech",
    tech: [], // ⚠️ à renseigner : technologies réellement utilisées
    status: "concept",
    featured: false,
    visual: "edu",
    image: "",
    demo: "",
    repo: "",
    details: {
      context:
        "Les concours d'entrée (grandes écoles, fonction publique) mobilisent chaque année de nombreux candidats au Cameroun.",
      problem:
        "Les ressources de révision sont dispersées, rarement structurées par concours, et peu adaptées au mobile.",
      goals: [
        "Regrouper des contenus de révision par concours",
        "Permettre de s'entraîner régulièrement",
        "Rester léger et utilisable sur smartphone",
      ],
      solution:
        "Une plateforme éducative pensée mobile d'abord, organisée par concours et par matière.",
      audience: "Élèves, étudiants et candidats aux concours au Cameroun.",
      architecture: [],
      features: [], // ⚠️ à documenter : fonctionnalités réellement développées
      challenges: [],
      next: [],
    },
  },
  // Exemple pour ajouter un projet :
  // {
  //   slug: "mon-projet", title: "Mon projet", tagline: "…", description: "…",
  //   category: "Site vitrine", tech: ["React", "Tailwind CSS"], status: "live",
  //   visual: "generic", image: "", demo: "https://…", repo: "https://github.com/Onejeysir/…",
  //   details: { context: "…", problem: "…", goals: [], solution: "…", architecture: [], features: [], challenges: [], next: [] },
  // },
];
