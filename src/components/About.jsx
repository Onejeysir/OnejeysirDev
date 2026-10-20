import { motion } from "framer-motion";
import { path, interests } from "../data/site";
import { Reveal, SecHead } from "./Reveal";

export default function About() {
  return (
    <section id="a-propos" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SecHead kicker="À propos" id="about-title" lines={["Apprendre en", "construisant."]} />
        <div className="about-grid">
          <div>
            <Reveal as="p" className="about-big">
              Je suis <em>Jeyson</em>, étudiant en Génie logiciel. Mon terrain d'apprentissage, ce sont <em>mes propres projets</em> : chaque produit me fait passer de l'interface à la base de données.
            </Reveal>
            <Reveal as="p" className="about-body" delay={0.1}>
              Après un BTS en Génie logiciel au Cameroun, je poursuis en Niveau 3 à l'ENSPD. J'avance couche par couche : HTML, CSS et JavaScript côté interface, PHP et MySQL côté serveur, et désormais React et Laravel. Ce qui m'intéresse : des applications utiles, pensées pour des besoins locaux réels.
            </Reveal>
            <Reveal className="chips" delay={0.2}>
              {interests.map((i) => <span className="chip" key={i}>{i}</span>)}
            </Reveal>
          </div>

          <ol className="timeline" aria-label="Parcours académique">
            {path.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.12} className={`tl-item ${p.done ? "done" : ""} ${p.goal ? "goal" : ""}`}>
                {i < path.length - 1 && (
                  <span className="tl-line" aria-hidden="true">
                    <motion.i initial={{ scaleY: 0 }} whileInView={{ scaleY: p.done ? 1 : 0.5 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.2 }} />
                  </span>
                )}
                <span className="tl-node" aria-hidden="true">{p.step}</span>
                <div>
                  <span className="label">{p.place}{p.years ? ` · ${p.years}` : ""} · <b>{p.done ? "obtenu" : p.goal ? "cap" : "en cours"}</b></span>
                  <h3>{p.title}</h3>
                  <p>{p.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
