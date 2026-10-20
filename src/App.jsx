/*
  SUJET : portfolio de FOKOU JEYSON (ONEJEYSIR), étudiant L3 Génie logiciel à l'ENSPD,
  Full-Stack en formation, Cameroun. Public : recruteurs de stage, clients locaux, pairs.
  Mission unique : montrer un jeune développeur qui CONSTRUIT des produits, honnêtement.

  PLAN DE DESIGN
  - Monde emprunté : la planche de dessin technique (cartouche, cotes, guides de construction,
    révisions). Logique volée : un plan montre l'état réel d'une construction, sans mentir.
  - Type : Archivo (axe wdth 112–125, 800–900) pour les titres, Archivo texte, JetBrains Mono
    pour les labels/métadonnées.
  - Couleurs : jaune #FFD60A (marqueur / chantier), anthracite #141412, encre #0D0D0B,
    papier #F3F0E7, pierre #8B877C, vert #3FB27F (uniquement statut « en ligne »).
  - Layout :
      [nav ── monogramme 1J · liens · thème]
      [badge / NOM · rôle ][ planche : monogramme dessiné ]
      [ DES IDÉES / AUX EXPÉRIENCES / ▇NUMÉRIQUES▇ ][ cartouche ]
      [══════════ O N E J E Y S I R  (contour → rempli) ══════════]
      [projets : grand cas + secondaires + emplacement] [matrice compétences 3 niveaux]
      [services en lignes à remplissage jaune] [processus rail] [contact + formulaire]
  - Signature : le mot ONEJEYSIR tracé en contour puis « construit » de gauche à droite par
    une barre jaune, et le monogramme 1J (le 1 de ONE et le J de JEYSIR partagent une hampe)
    dessiné sur sa planche.
  - Motion : tracé de plan (pathLength), masques montants, remplissage chantier, curseur de mesure
    ambiant, morph carte → étude de cas (layoutId), rail du processus lié au scroll.
*/
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import "./styles.css";
import { nav } from "./data/site";
import { projects } from "./data/projects";
import { goTo, useActiveSection, useProjectRoute, useTheme } from "./lib/hooks";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const IDS = nav.map((n) => n.id);

function Site() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(IDS);
  const [slug, openProject, closeProject] = useProjectRoute();
  const [prefill, setPrefill] = useState({ type: "", tick: 0 });
  const reduced = useReducedMotion();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    document.title = "FOKOU JEYSON · ONEJEYSIR · Développeur Full-Stack en formation";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = "Portfolio de FOKOU JEYSON (ONEJEYSIR), étudiant en Génie logiciel à l'ENSPD et développeur Full-Stack en formation au Cameroun : projets, compétences, services et contact.";
    document.documentElement.lang = "fr";
  }, []);

  const request = useCallback((type) => {
    setPrefill((p) => ({ type, tick: p.tick + 1 }));
    goTo("contact", { reduced });
    setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), reduced ? 50 : 700);
  }, [reduced]);

  return (
    <div className="site" data-theme={theme}>
      <a href="#main" className="skip">Aller au contenu</a>
      <Nav active={active} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Projects onOpen={openProject} />
        <Skills />
        <Services onRequest={request} />
        <Process />
        <Contact prefillType={prefill.type} prefillTick={prefill.tick} />
      </main>
      <Footer />
      <AnimatePresence>
        {project && <ProjectDetail key={project.slug} project={project} onClose={closeProject} />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Site />
    </MotionConfig>
  );
}
