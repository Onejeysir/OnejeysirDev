# ONEJEYSIR · Portfolio de FOKOU JEYSON

Portfolio personnel en **React + Vite**, CSS organisé par variables (aucun framework CSS), animations **Framer Motion**.
Seules dépendances : `react`, `react-dom`, `framer-motion`.

## Structure

```
index.html            SEO, Open Graph, favicon, contenu <noscript>
public/               favicon.svg, og-image.png, robots.txt, sitemap.xml
api/contact.php       endpoint PHP optionnel pour le formulaire
src/
  App.jsx             assemblage des sections + plan de design
  main.jsx            point d'entrée
  styles.css          TOUS les tokens (couleurs, espacements, rayons, ombres, durées) + styles
  data/
    site.js           ⚙️ profil, liens, config du formulaire, navigation, parcours
    projects.js       ⚙️ projets (ajout = un objet dans le tableau)
    skills.js         ⚙️ compétences et niveau réel
    services.js       ⚙️ services, processus, types de projet, budgets
  components/         Nav, Hero, About, Projects, ProjectDetail, Visuals, Skills, Services, Process, Contact, Footer, Logo, Icons, Reveal, Magnetic
  lib/                hooks (thème, section active, route projet, scroll) + validation du formulaire
  assets/             tes captures d'écran
```

## Démarrer

```bash
npm install        # installer les dépendances (Node 18+)
npm run dev        # serveur de développement : http://localhost:5173
npm run build      # version de production dans dist/
npm run preview    # tester le build localement
```

## ⚠️ À configurer (dépend de tes informations)

| Où | Quoi |
|---|---|
| `src/data/site.js` → `links.email` | Confirme l'adresse publique de contact |
| `src/data/site.js` → `links.linkedin`, `links.whatsapp` | Vide = masqué. Renseigne seulement si le profil existe |
| `src/data/site.js` → `path[].years` | Ajoute les années du BTS et de l'ENSPD quand elles sont confirmées |
| `src/data/site.js` → `contactConfig.formEndpoint` | Voir « Formulaire » ci-dessous |
| `src/data/projects.js` → ONEJEYSIRTECH `features[].state` | Toutes sont « Visé » par défaut. Passe à `"done"` / `"wip"` ce qui fonctionne réellement |
| `src/data/projects.js` → ONEJEYSIREDU237 `tech`, `features`, `architecture` | Vides : le site affiche « à préciser ». Remplis avec la réalité |
| `src/data/projects.js` → `demo`, `repo`, `image` | Vide = bouton masqué / illustration conceptuelle affichée |
| `src/data/skills.js` → `tier` | Répartition proposée : ajuste-la honnêtement |
| `index.html`, `public/robots.txt`, `public/sitemap.xml` | Remplace `VOTRE-DOMAINE` après publication |

### Ajouter une capture d'écran
1. Place l'image dans `src/assets/` (WebP conseillé, ~1600 px de large).
2. Dans `projects.js` : `import techShot from "../assets/tech.webp";` puis `image: techShot`.

### Ajouter un projet
Copie le modèle commenté à la fin de `projects.js`. Les filtres (catégories et technologies) se génèrent tout seuls.

## Formulaire de contact

Le formulaire valide les champs, affiche les erreurs, un état de chargement, et **ne confirme l'envoi qu'après une réponse HTTP 2xx**.

- **Sans configuration** (`formEndpoint: ""`) : il prépare un e-mail pré-rempli dans la messagerie du visiteur et l'indique clairement (« Rien n'a encore été envoyé »).
- **Option A, Formspree (recommandé, gratuit)** : crée un formulaire sur formspree.io, copie l'URL `https://formspree.io/f/xxxx` dans `formEndpoint`. Le JSON envoyé (`name`, `email`, `type`, `budget`, `message`) est accepté tel quel.
- **Option B, PHP** : dépose `api/contact.php` sur un hébergement PHP, règle `$TO` et `$allowed`, puis mets son URL dans `formEndpoint`.

## Publier

**Netlify ou Vercel (le plus simple)**
1. Pousse le projet sur GitHub (`github.com/Onejeysir/onejeysir-portfolio` par exemple).
2. Importe le dépôt sur netlify.com ou vercel.com. Build : `npm run build`, dossier : `dist`.
3. Chaque `git push` republie le site automatiquement.

**GitHub Pages**
1. Dans `vite.config.js`, mets `base: "/<nom-du-repo>/"`.
2. `npm run build`, puis publie `dist/` (action « Deploy static content to Pages » ou branche `gh-pages`).

**Domaine personnalisé** : ajoute le domaine dans Netlify/Vercel (Domain settings), puis chez ton registrar crée un enregistrement `CNAME` (ou `A`) vers la cible indiquée. Ensuite remplace `VOTRE-DOMAINE` dans `index.html`, `robots.txt`, `sitemap.xml`.

## Mettre à jour le contenu
Modifie uniquement les fichiers de `src/data/`, puis `git push` (ou `npm run build` + redéploiement).

## Accessibilité & mouvement
- Navigation clavier complète, lien d'évitement, focus visible jaune, piège du focus dans le menu mobile et l'étude de cas, Échap pour fermer.
- `prefers-reduced-motion` respecté : les animations de transformation sont désactivées, les animations ambiantes coupées.
- Thème clair/sombre mémorisé, sinon préférence système.
