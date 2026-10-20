const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Indiquez votre nom.";
  else if (v.name.trim().length < 2) e.name = "Le nom doit contenir au moins 2 caractères.";
  if (!v.email.trim()) e.email = "Indiquez votre adresse e-mail pour recevoir une réponse.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Cette adresse ne semble pas valide (ex. nom@domaine.com).";
  if (!v.type) e.type = "Choisissez le type de projet.";
  if (!v.message.trim()) e.message = "Décrivez votre projet en quelques lignes.";
  else if (v.message.trim().length < 20) e.message = `Encore ${20 - v.message.trim().length} caractères minimum : précisez votre besoin.`;
  else if (v.message.length > 3000) e.message = "Message trop long (3000 caractères maximum).";
  return e;
}

export function buildMailto(to, v) {
  const subject = `[Portfolio] ${v.type} · ${v.name.trim()}`;
  const body = [
    `Nom : ${v.name.trim()}`,
    `E-mail : ${v.email.trim()}`,
    `Type de projet : ${v.type}`,
    `Budget : ${v.budget || "Non précisé"}`,
    "",
    v.message.trim(),
  ].join("\n");
  return { href: `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, subject, body };
}
