import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups, TIERS } from "../data/skills";
import { SecHead } from "./Reveal";

export default function Skills() {
  const [focus, setFocus] = useState(null);
  return (
    <section id="competences" className="section" aria-labelledby="skills-title" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <SecHead
          kicker="Compétences"
          id="skills-title"
          lines={["Ma stack,", "sans maquillage."]}
          lead="Pas de pourcentages. Chaque technologie est rangée selon ce que j'en fais vraiment aujourd'hui."
        />
        <div className="legend" role="group" aria-label="Mettre en évidence un niveau">
          {TIERS.map((t) => (
            <button key={t.id} type="button" className="lg-btn" aria-pressed={focus === t.id} title={t.hint} onClick={() => setFocus((f) => (f === t.id ? null : t.id))}>
              <span className={`tier-mark ${t.id}`} aria-hidden="true" />{t.label}
            </button>
          ))}
        </div>
        <div className="matrix">
          <div className="mx-head" aria-hidden="true">
            <div className="label">Domaine</div>
            {TIERS.map((t) => <div key={t.id} className="label"><span className={`tier-mark ${t.id}`} />{t.label}</div>)}
          </div>
          {skillGroups.map((g, gi) => (
            <div className="mx-row" key={g.group}>
              <h3>{g.group}</h3>
              {TIERS.map((t) => {
                const items = g.items.filter((s) => s.tier === t.id);
                return (
                  <ul className="mx-cell" key={t.id} aria-label={`${g.group} · ${t.label}`}>
                    {items.map((s, si) => (
                      <motion.li
                        key={s.name}
                        className={`sk ${s.tier} ${focus && focus !== s.tier ? "dim" : ""}`}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: gi * 0.06 + si * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className={`tier-mark ${s.tier}`} aria-hidden="true" />
                        {s.name}
                        <span className="sr-only"> · {t.label}</span>
                      </motion.li>
                    ))}
                  </ul>
                );
              })}
            </div>
          ))}
        </div>
        <p className="mx-note">Lecture : jaune plein = utilisé dans un projet · demi = en consolidation · pointillé = en apprentissage.</p>
      </div>
    </section>
  );
}
