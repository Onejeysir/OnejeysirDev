import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FEATURE_STATE } from "../data/projects";
import { links } from "../data/site";
import { lockScroll } from "../lib/hooks";
import { ProjectVisual } from "./Visuals";
import { Status } from "./Projects";
import { Alert, ArrowUR, Close, GitHub } from "./Icons";

const EASE = [0.22, 1, 0.36, 1];

function Block({ k, title, children, i }) {
  return (
    <motion.section className="d-block" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 3) * 0.04 }}>
      <h2><span className="mono">{k}</span>{title}</h2>
      <div>{children}</div>
    </motion.section>
  );
}

const Todo = ({ children }) => <p className="todo">{children}</p>;

export default function ProjectDetail({ project: p, onClose }) {
  const closeRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const unlock = lockScroll();
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.title = `${p.title} · Étude de cas · ONEJEYSIR`;
    return () => {
      unlock();
      document.removeEventListener("keydown", onKey);
      document.title = "FOKOU JEYSON · ONEJEYSIR · Développeur Full-Stack en formation";
      opener?.focus?.({ preventScroll: true });
    };
  }, [onClose, p.title]);

  const d = p.details || {};
  const blocks = [];
  let n = 0;
  const key = () => String(++n).padStart(2, "0");

  blocks.push(<Block key="ctx" k={key()} title="Contexte" i={n}>{d.context ? <p>{d.context}</p> : <Todo>À documenter</Todo>}</Block>);
  blocks.push(<Block key="pb" k={key()} title="Problème" i={n}>{d.problem ? <p>{d.problem}</p> : <Todo>À documenter</Todo>}</Block>);
  if (d.audience) blocks.push(<Block key="aud" k={key()} title="Public visé" i={n}><p>{d.audience}</p></Block>);
  blocks.push(<Block key="obj" k={key()} title="Objectifs" i={n}>{d.goals?.length ? <ul className="d-list">{d.goals.map((g) => <li key={g}>{g}</li>)}</ul> : <Todo>À documenter</Todo>}</Block>);
  blocks.push(<Block key="sol" k={key()} title="Solution" i={n}>{d.solution ? <p>{d.solution}</p> : <Todo>À documenter</Todo>}</Block>);
  blocks.push(
    <Block key="arch" k={key()} title="Architecture technique" i={n}>
      {d.architecture?.length ? <dl className="arch">{d.architecture.map((a) => <div key={a.layer}><dt>{a.layer}</dt><dd>{a.value}</dd></div>)}</dl> : <Todo>Architecture à documenter</Todo>}
    </Block>
  );
  blocks.push(
    <Block key="feat" k={key()} title="Fonctionnalités" i={n}>
      {d.features?.length ? (
        <>
          <div className="feat-grid">
            {d.features.map((f) => (
              <div key={f.name} className={`feat ${f.state}`}><span>{f.name}</span><span className="mono">{FEATURE_STATE[f.state]}</span></div>
            ))}
          </div>
          {d.features.every((f) => f.state === "planned") && (
            <p className="disclaimer" style={{ marginTop: "0.75rem" }}><Alert />Périmètre fonctionnel visé. L'état de chaque fonctionnalité sera mis à jour au fil du développement.</p>
          )}
        </>
      ) : <Todo>Fonctionnalités développées : à documenter</Todo>}
    </Block>
  );
  blocks.push(
    <Block key="tech" k={key()} title="Technologies" i={n}>
      {p.tech.length ? <div className="techs">{p.tech.map((t) => <span className="tech" key={t}>{t}</span>)}</div> : <Todo>Technologies utilisées : à préciser</Todo>}
    </Block>
  );
  if (d.challenges?.length) {
    blocks.push(
      <Block key="ch" k={key()} title="Difficultés & solutions" i={n}>
        <dl className="ch">{d.challenges.map((c) => <div key={c.issue}><dt>{c.issue}</dt><dd>→ {c.answer}</dd></div>)}</dl>
      </Block>
    );
  }
  if (d.next?.length) blocks.push(<Block key="nx" k={key()} title="Améliorations futures" i={n}><ul className="d-list">{d.next.map((x) => <li key={x}>{x}</li>)}</ul></Block>);

  return (
    <motion.div
      ref={scrollRef}
      className="detail"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
    >
      <div className="detail-bar">
        <div className="wrap">
          <span className="label">Étude de cas · <b>{p.title}</b></span>
          <button ref={closeRef} type="button" className="btn btn-sm" onClick={onClose}>
            <Close width="18" height="18" /> Fermer
          </button>
        </div>
      </div>
      <motion.div layoutId={`visual-${p.slug}`} className="detail-hero" transition={{ duration: 0.6, ease: EASE }}>
        <ProjectVisual project={p} />
      </motion.div>
      <div className="wrap">
        <motion.header className="detail-head" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}>
          <div>
            <div className="p-top" style={{ justifyContent: "flex-start", gap: "0.75rem" }}>
              <span className="label">{p.category}</span>
              <Status status={p.status} />
            </div>
            <h1 id="detail-title" className="display" style={{ marginTop: "1rem" }}>{p.title}</h1>
          </div>
          <div>
            <p className="lead">{p.tagline} {p.description}</p>
            <div className="p-actions" style={{ marginTop: "1.25rem" }}>
              {p.demo && <a className="btn btn-primary btn-sm" href={p.demo} target="_blank" rel="noopener noreferrer">Voir la démo <ArrowUR /></a>}
              {p.repo && <a className="btn btn-sm" href={p.repo} target="_blank" rel="noopener noreferrer"><GitHub /> Dépôt GitHub</a>}
              {!p.demo && !p.repo && links.github && <a className="btn btn-sm" href={links.github} target="_blank" rel="noopener noreferrer"><GitHub /> Profil GitHub</a>}
            </div>
          </div>
        </motion.header>
        <div className="detail-body">{blocks}</div>
      </div>
    </motion.div>
  );
}
