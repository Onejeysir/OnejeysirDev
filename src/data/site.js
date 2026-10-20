// ─────────────────────────────────────────────────────────────
// CONFIGURATION PERSONNELLE — tout ce qui dépend de toi est ici.
// Laisse une valeur vide ("") pour masquer automatiquement le lien.
// ─────────────────────────────────────────────────────────────
export const profile = {
  firstName: "Jeyson",
  fullName: "FOKOU JEYSON",
  brand: "ONEJEYSIR",
  role: "Full-Stack Developer",
  status: "Étudiant en Génie logiciel · Niveau 3 · ENSPD",
  location: "Cameroun",
  headline: ["Des idées", "aux expériences", "numériques."],
  intro:
    "Étudiant en Génie logiciel, je conçois des interfaces web, j'explore le Full-Stack et je construis des projets concrets, pas à pas, pour transformer des idées en outils utiles.",
};

export const links = {
  github: "https://github.com/Onejeysir",
  githubHandle: "Onejeysir",
  email: "jeysonudalric150@gmail.com", // ⚠️ à confirmer : adresse publique de contact
  linkedin: "", // ex. "https://www.linkedin.com/in/ton-profil"
  whatsapp: "", // ex. "https://wa.me/2376XXXXXXXX"
};

// Envoi du formulaire.
// - Si `formEndpoint` est renseigné (Formspree, Web3Forms, Getform, ou ton
//   propre script PHP), le formulaire POSTe en JSON et ne confirme qu'après
//   une réponse HTTP 2xx.
// - Sinon, il prépare un e-mail pré-rempli dans la messagerie du visiteur.
export const contactConfig = {
  formEndpoint: "", // ex. "https://formspree.io/f/xxxxxxx"
};

export const nav = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "À propos" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

// Parcours : ordre chronologique. Ajoute `years: "2022 — 2024"` quand les dates sont confirmées.
export const path = [
  {
    step: "BTS",
    title: "BTS en Génie logiciel",
    place: "Cameroun",
    note: "Obtenu. Les bases : algorithmique, programmation C, bases de données, premiers sites web.",
    years: "",
    done: true,
  },
  {
    step: "L3",
    title: "Génie logiciel · Niveau 3",
    place: "ENSPD",
    note: "En cours. Conception logicielle, architecture, et approfondissement du développement web.",
    years: "",
    done: false,
  },
  {
    step: "→",
    title: "Développeur Full-Stack",
    place: "Objectif",
    note: "Construire des produits utiles, adaptés aux besoins locaux, et les mener jusqu'en production.",
    years: "",
    done: false,
    goal: true,
  },
];

export const interests = [
  "Front-End",
  "Back-End",
  "Applications web",
  "Interfaces responsive",
  "Bases de données",
  "Produits numériques",
  "EdTech",
  "Solutions locales",
];
