import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile, links } from "../data/site";
import { goTo, useScrollContainer } from "../lib/hooks";
import { MONO_PATH } from "./Logo";
import { Arrow, GitHub, Pin } from "./Icons";
import Magnetic from "./Magnetic";

const EASE = [0.22, 1, 0.36, 1];
const SNAP = [0.7, 0, 0.2, 1];

/* Planche technique : le monogramme est « dessiné » comme un plan, puis construit. */
function Plate() {
  const draw = (delay, dur = 0.9) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { delay, duration: dur, ease: EASE }, opacity: { delay, duration: 0.01 } },
  });
  const fade = (delay) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.5 } });
  const guide = { stroke: "var(--muted)", strokeWidth: 1, strokeDasharray: "3 5", fill: "none", vectorEffect: "non-scaling-stroke" };
  const dim = { stroke: "var(--text-2)", strokeWidth: 1, fill: "none" };
  const t = { fill: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 11 };

  return (
    <motion.figure
      className="plate"
      initial={{ opacity: 0, y: 30, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
      aria-label="Planche technique du monogramme ONEJEYSIR"
      style={{ margin: 0 }}
    >
      <div className="plate-head">
        <span className="label">fig. 01 · <b>monogramme</b></span>
        <span className="label">1:1</span>
      </div>
      <div className="plate-draw">
        <svg viewBox="40 10 320 290" role="img" aria-label="Le chiffre 1 et la lettre J partagent une même hampe : ONE et JEYSIR.">
          {/* Guides de construction */}
          <motion.path d="M40 92 H360" {...guide} {...draw(0.5, 1.1)} />
          <motion.path d="M40 220 H360" {...guide} {...draw(0.6, 1.1)} />
          <motion.path d="M214 10 V300" {...guide} {...draw(0.65, 1.1)} />
          <motion.path d="M110 62 L290 242" {...guide} {...draw(0.75, 1)} />
          <motion.circle cx="172" cy="178" r="42" {...guide} {...draw(0.85, 1)} />
          {/* Cotes */}
          <motion.g {...fade(1.2)}>
            <path d="M110 36 H290 M110 30 V42 M290 30 V42" {...dim} />
            <rect x="183" y="27" width="34" height="18" fill="var(--bg-2)" />
            <text x="200" y="40" textAnchor="middle" {...t}>180</text>
            <path d="M80 62 V242 M74 62 H86 M74 242 H86" {...dim} />
            <rect x="66" y="143" width="28" height="18" fill="var(--bg-2)" />
            <text x="80" y="156" textAnchor="middle" {...t}>180</text>
            <text x="222" y="285" {...t}>axe · hampe partagée</text>
            <text x="124" y="270" {...t}>R42</text>
          </motion.g>
          {/* Curseur de mesure : mouvement ambiant */}
          <g className="ambient" style={{ "--drift": "150px" }}>
            <motion.g {...fade(1.6)}>
              <path d="M118 22 v28" stroke="var(--jaune)" strokeWidth="1.5" />
              <circle cx="118" cy="36" r="3" fill="var(--jaune)" />
            </motion.g>
          </g>
          {/* Tuile */}
          <motion.rect x="110" y="62" width="180" height="180" rx="34" fill="none" stroke="var(--text)" strokeWidth="1.5" {...draw(1.0, 0.9)} />
          <motion.rect
            x="110" y="62" width="180" height="180" rx="34" fill="#FFD60A"
            initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.75, duration: 0.55, ease: SNAP }}
            style={{ transformOrigin: "200px 152px" }}
          />
          {/* Tracé du 1J */}
          <motion.path
            d={MONO_PATH} fill="none" stroke="#141412" strokeWidth="26" strokeLinecap="square" strokeLinejoin="miter"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 2.15, duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
          />
          {/* Points d'ancrage */}
          <motion.g {...fade(2.9)}>
            {[[160, 116], [214, 92], [214, 176], [134, 196]].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" fill="var(--bg-2)" stroke="var(--text)" strokeWidth="1.2" />
            ))}
          </motion.g>
        </svg>
      </div>
      <dl className="cartouche">
        <div><dt>Projet</dt><dd className="y">ONEJEYSIR</dd></div>
        <div><dt>Auteur</dt><dd>F. JEYSON</dd></div>
        <div><dt>Rôle</dt><dd>Full-Stack · formation</dd></div>
        <div><dt>Lieu</dt><dd>{profile.location}</dd></div>
        <div><dt>Révision</dt><dd>L3 · ENSPD</dd></div>
        <div><dt>État</dt><dd>en construction<span className="caret" aria-hidden="true" /></dd></div>
      </dl>
    </motion.figure>
  );
}

/* Mot-signature : contour tracé, puis rempli de gauche à droite comme un chantier qui avance. */
function BigWord() {
  const reduced = useReducedMotion();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container });
  const x = useTransform(scrollYProgress, [0, 0.25], ["0%", reduced ? "0%" : "-6%"]);
  const style = { fontFamily: "var(--font-display)", fontWeight: 900, fontVariationSettings: '"wdth" 125', fontSize: 168, letterSpacing: "-6px" };
  return (
    <motion.div style={{ x }} aria-hidden="true">
      <svg viewBox="0 0 1000 150" preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="fillclip">
            <motion.rect x="0" y="-20" height="200" initial={{ width: 0 }} animate={{ width: 1000 }} transition={{ delay: 1.5, duration: 1.6, ease: [0.65, 0, 0.35, 1] }} />
          </clipPath>
        </defs>
        <motion.text
          x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs" style={style}
          fill="none" stroke="var(--line)" strokeWidth="1.5"
          initial={{ strokeDasharray: "2400", strokeDashoffset: 2400 }} animate={{ strokeDashoffset: 0 }}
          transition={{ delay: 0.4, duration: 1.8, ease: EASE }}
        >
          ONEJEYSIR
        </motion.text>
        <g clipPath="url(#fillclip)">
          <text x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs" style={style} fill="var(--text)">
            ONE<tspan fill="var(--jaune)">J</tspan>EYSIR
          </text>
        </g>
        <motion.rect y="0" width="6" height="150" fill="var(--jaune)" initial={{ x: 0, opacity: 0 }} animate={{ x: [0, 994], opacity: [1, 1, 0] }} transition={{ delay: 1.5, duration: 1.6, ease: [0.65, 0, 0.35, 1], opacity: { delay: 1.5, duration: 1.9, times: [0, 0.85, 1] } }} />
      </svg>
    </motion.div>
  );
}

function Ruler() {
  return (
    <svg viewBox="0 0 1000 14" preserveAspectRatio="none" style={{ width: "100%", height: 14 }} aria-hidden="true">
      {Array.from({ length: 101 }, (_, i) => (
        <line key={i} x1={i * 10} x2={i * 10} y1="0" y2={i % 10 === 0 ? 14 : i % 5 === 0 ? 9 : 5} stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const line = (i) => ({
    initial: { y: "105%" },
    animate: { y: "0%" },
    transition: { delay: 0.35 + i * 0.09, duration: 0.85, ease: EASE },
  });
  const up = (d) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: EASE } });
  const [l1, l2, l3] = profile.headline;

  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap hero-main">
        <div>
          <motion.span className="badge" {...up(0.2)}>
            <span className="pulse" aria-hidden="true" />
            {profile.status}
          </motion.span>
          <motion.p className="hero-id" {...up(0.3)}>
            <strong>{profile.fullName}</strong>
            <span className="sep" aria-hidden="true" />
            <span className="mono">{profile.brand} · {profile.role}</span>
          </motion.p>
          <h1 id="hero-title" className="display">
            <span className="mask"><motion.span {...line(0)}>{l1}</motion.span></span>
            <span className="mask"><motion.span {...line(1)}>{l2}</motion.span></span>
            <span className="mask">
              <motion.span {...line(2)}>
                <span className="hl">
                  <motion.span className="hl-bar" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.05, duration: 0.6, ease: SNAP }} />
                  {l3}
                </span>
              </motion.span>
            </span>
          </h1>
          <motion.p className="lead" {...up(0.75)}>{profile.intro}</motion.p>
          <motion.div className="hero-cta" {...up(0.9)}>
            <Magnetic>
              <a className="btn btn-primary" href="#projets" onClick={(e) => { e.preventDefault(); goTo("projets", { reduced }); }}>
                Explorer mes projets <Arrow />
              </a>
            </Magnetic>
            <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); goTo("contact", { reduced }); }}>
              Discuter d'un projet
            </a>
          </motion.div>
          <motion.div className="hero-meta mono" {...up(1.05)}>
            <span><Pin /> {profile.location}</span>
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer"><GitHub /> github.com/{links.githubHandle}<span className="sr-only"> (nouvel onglet)</span></a>
            )}
          </motion.div>
        </div>
        <Plate />
      </div>

      <div className="wrap hero-word">
        <BigWord />
        <Ruler />
        <div className="word-ruler mono">
          <span>0 · idée</span>
          <a href="#a-propos" className="scroll-cue" onClick={(e) => { e.preventDefault(); goTo("a-propos", { reduced }); }}>
            <span className="track" aria-hidden="true"><i /></span>
            Défiler
          </a>
          <span>produit · ∞</span>
        </div>
      </div>
    </section>
  );
}
