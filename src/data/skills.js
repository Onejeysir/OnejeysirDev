// Niveau réel : "used" (utilisé dans des projets) | "consolidating" | "learning"
// ⚠️ Répartition proposée d'après ton profil : ajuste-la honnêtement.
export const TIERS = [
  { id: "used", label: "Utilisé en projet", hint: "Déjà mis en œuvre dans une réalisation" },
  { id: "consolidating", label: "En consolidation", hint: "Pratiqué, encore en approfondissement" },
  { id: "learning", label: "En apprentissage", hint: "Découverte et premiers exercices" },
];

export const skillGroups = [
  {
    group: "Front-End",
    items: [
      { name: "HTML5", tier: "used" },
      { name: "CSS3", tier: "used" },
      { name: "JavaScript", tier: "used" },
      { name: "React", tier: "learning" },
      { name: "Tailwind CSS", tier: "learning" },
    ],
  },
  {
    group: "Back-End",
    items: [
      { name: "PHP", tier: "used" },
      { name: "Laravel", tier: "learning" },
    ],
  },
  {
    group: "Bases de données",
    items: [
      { name: "MySQL", tier: "used" },
      { name: "Modélisation relationnelle", tier: "consolidating" },
    ],
  },
  {
    group: "Programmation",
    items: [
      { name: "C", tier: "consolidating" },
      { name: "Algorithmique", tier: "consolidating" },
    ],
  },
  {
    group: "Outils",
    items: [
      { name: "Visual Studio Code", tier: "used" },
      { name: "WampServer", tier: "used" },
      { name: "XAMPP", tier: "used" },
      { name: "phpMyAdmin", tier: "used" },
      { name: "Git", tier: "consolidating" },
      { name: "GitHub", tier: "consolidating" },
      { name: "Composer", tier: "learning" },
    ],
  },
];
