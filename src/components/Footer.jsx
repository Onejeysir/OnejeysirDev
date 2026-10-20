import { useReducedMotion } from "framer-motion";
import { links, nav, profile } from "../data/site";
import { goTo } from "../lib/hooks";
import { Monogram, Wordmark } from "./Logo";

export default function Footer() {
  const reduced = useReducedMotion();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Monogram size={56} />
            <div>
              <Wordmark />
              <p className="mono" style={{ color: "var(--muted)" }}>{profile.fullName} · {profile.location}</p>
            </div>
          </div>
          <nav aria-label="Pied de page" className="foot-links">
            {nav.map((n) => <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); goTo(n.id, { reduced }); }}>{n.label}</a>)}
            {links.github && <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
          </nav>
        </div>
        <div className="foot-base mono">
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
          <span>Conçu et codé par ONEJEYSIR</span>
        </div>
      </div>
    </footer>
  );
}
