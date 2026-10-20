import { forwardRef, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { projects, STATUS } from "../data/projects";
import { useMedia } from "../lib/hooks";
import { SecHead } from "./Reveal";
import { ProjectVisual } from "./Visuals";
import { Arrow, ArrowUR, GitHub } from "./Icons";

const EASE = [0.22, 1, 0.36, 1];

export function Status({ status }) {
  const s = STATUS[status] || STATUS.concept;
  return <span className={`status ${s.tone}`}><i aria-hidden="true" />{s.label}</span>;
}

const Card = forwardRef(function Card({ p, onOpen, index }, outerRef) {
  const ref = useRef(null);
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useSpring(rx, { stiffness: 120, damping: 20 });
  const py = useSpring(ry, { stiffness: 120, damping: 20 });
  const parallax = fine && !reduced;

  const onMove = (e) => {
    if (!parallax || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(((e.clientX - r.left) / r.width - 0.5) * -1);
    ry.set(((e.clientY - r.top) / r.height - 0.5) * -1);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.article
      ref={outerRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.08, layout: { duration: 0.5, ease: EASE } }}
      className={`p-card ${p.featured ? "featured" : ""}`}
      aria-labelledby={`p-${p.slug}`}
    >
      <motion.div layoutId={`visual-${p.slug}`} className="p-visual" ref={ref} onPointerMove={onMove} onPointerLeave={reset}>
        <ProjectVisual project={p} px={px} py={py} />
        {!p.image && <span className="note">Illustration · capture à venir</span>}
      </motion.div>
      <div className="p-body">
        <div className="p-top">
          <span className="label">{p.category}{p.featured ? " · projet principal" : ""}</span>
          <Status status={p.status} />
        </div>
        <h3 id={`p-${p.slug}`} className="display p-title">{p.title}</h3>
        <p className="p-tag">{p.tagline}</p>
        <p className="p-desc">{p.description}</p>
        {p.featured && p.details && (
          <dl className="p-spec">
            <div><dt>Problème</dt><dd>{p.details.problem}</dd></div>
            <div><dt>Solution</dt><dd>{p.details.solution}</dd></div>
          </dl>
        )}
        <div className="techs" aria-label="Technologies">
          {p.tech.length ? p.tech.map((t) => <span className="tech" key={t}>{t}</span>) : <span className="tech empty">Stack à préciser</span>}
        </div>
        <div className="p-actions">
          {p.details && (
            <button type="button" className="btn btn-primary btn-sm" onClick={() => onOpen(p.slug)}>
              Étude de cas <Arrow />
            </button>
          )}
          {p.demo && <a className="btn btn-sm" href={p.demo} target="_blank" rel="noopener noreferrer">Démo <ArrowUR /><span className="sr-only"> (nouvel onglet)</span></a>}
          {p.repo && <a className="btn btn-sm" href={p.repo} target="_blank" rel="noopener noreferrer"><GitHub /> Code<span className="sr-only"> (nouvel onglet)</span></a>}
        </div>
      </div>
    </motion.article>
  );
});

export default function Projects({ onOpen }) {
  const [filter, setFilter] = useState("all");

  const options = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category))];
    const techs = [...new Set(projects.flatMap((p) => p.tech))];
    return [
      { key: "all", label: "Tous", count: projects.length },
      ...cats.map((c) => ({ key: `cat:${c}`, label: c, count: projects.filter((p) => p.category === c).length })),
      ...techs.map((t) => ({ key: `tech:${t}`, label: t, count: projects.filter((p) => p.tech.includes(t)).length })),
    ];
  }, []);

  const visible = projects.filter((p) => {
    if (filter === "all") return true;
    const [kind, value] = [filter.slice(0, filter.indexOf(":")), filter.slice(filter.indexOf(":") + 1)];
    return kind === "cat" ? p.category === value : p.tech.includes(value);
  });

  return (
    <section id="projets" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <SecHead
          kicker="Projets"
          id="projects-title"
          lines={["Ce que je", "construis."]}
          lead="Des produits pensés à partir de vrais problèmes. Chaque projet se lit comme une étude de cas : le besoin, les choix techniques, l'état réel."
        />

        <div className="filters" role="group" aria-label="Filtrer les projets">
          <span className="label">Filtrer</span>
          <LayoutGroup id="filters">
            {options.map((o) => (
              <button key={o.key} type="button" className="f-btn" aria-pressed={filter === o.key} onClick={() => setFilter(o.key)}>
                {filter === o.key && <motion.span layoutId="f-bg" className="f-bg" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                {o.label}<span className="f-count">{o.count}</span>
              </button>
            ))}
          </LayoutGroup>
        </div>
        <p className="sr-only" aria-live="polite">{visible.length} projet{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}</p>

        <motion.div layout className="proj-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => <Card key={p.slug} p={p} onOpen={onOpen} index={i} />)}
            {filter === "all" && (
              <Slot key="slot" />
            )}
          </AnimatePresence>
        </motion.div>
        {visible.length === 0 && <p className="empty-state">Aucun projet pour ce filtre.</p>}
      </div>
    </section>
  );
}

const Slot = forwardRef(function Slot(_, ref) {
  return (
    <motion.div ref={ref} layout className="p-card slot" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} exit={{ opacity: 0 }}>
      <div>
        <div className="slot-plus" aria-hidden="true">+</div>
        <p className="label">Prochaine réalisation</p>
        <p style={{ marginTop: "0.5rem", color: "var(--text-2)", maxWidth: "30ch" }}>La suite se construit en ce moment. Elle apparaîtra ici.</p>
      </div>
    </motion.div>
  );
});
