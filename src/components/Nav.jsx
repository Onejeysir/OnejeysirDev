import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { nav, links } from "../data/site";
import { getScrollEl, goTo, lockScroll, scrollTopNow, useScrollContainer } from "../lib/hooks";
import { Monogram, Wordmark } from "./Logo";
import { Close, GitHub, Menu, Moon, Sun } from "./Icons";

export default function Nav({ active, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container });
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const burgerRef = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    const target = getScrollEl() || window;
    const on = () => setScrolled(scrollTopNow() > 12);
    on();
    target.addEventListener("scroll", on, { passive: true });
    return () => target.removeEventListener("scroll", on);
  }, []);

  // Menu mobile : verrou du défilement, Échap, piège du focus.
  useEffect(() => {
    if (!open) return undefined;
    const unlock = lockScroll();
    const first = sheetRef.current?.querySelector("button, a");
    first?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); burgerRef.current?.focus(); }
      if (e.key === "Tab" && sheetRef.current) {
        const f = [...sheetRef.current.querySelectorAll("a[href], button")];
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { unlock(); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const jump = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // Laisse le menu se fermer avant de défiler.
    requestAnimationFrame(() => goTo(id, { reduced }));
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <motion.div
          className="wrap nav-in"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <a href="#accueil" className="brand" onClick={(e) => jump(e, "accueil")} aria-label="ONEJEYSIR, retour à l'accueil">
            <Monogram size={34} />
            <Wordmark />
          </a>
          <nav aria-label="Navigation principale">
            <ul className="nav-links">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined} onClick={(e) => jump(e, n.id)}>
                    {active === n.id && (
                      <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
                    )}
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-actions">
            {links.github && (
              <a className="btn btn-sm nav-gh" href={links.github} target="_blank" rel="noopener noreferrer">
                <GitHub /> GitHub<span className="sr-only"> (nouvel onglet)</span>
              </a>
            )}
            <button type="button" className="icon-btn" onClick={onToggleTheme} aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.25 }} style={{ display: "grid" }}>
                  <ThemeIcon />
                </motion.span>
              </AnimatePresence>
            </button>
            <button ref={burgerRef} type="button" className="icon-btn burger" aria-expanded={open} aria-controls="menu-mobile" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}>
              <Menu />
            </button>
          </div>
        </motion.div>
        <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={sheetRef}
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="sheet-top">
              <a href="#accueil" className="brand" onClick={(e) => jump(e, "accueil")} aria-label="Accueil">
                <Monogram size={34} /><Wordmark />
              </a>
              <button type="button" className="icon-btn" aria-label="Fermer le menu" onClick={() => { setOpen(false); burgerRef.current?.focus(); }}>
                <Close />
              </button>
            </div>
            <nav aria-label="Navigation mobile">
              <ol>
                {nav.map((n, i) => (
                  <motion.li key={n.id} initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                    <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined} onClick={(e) => jump(e, n.id)}>
                      <span className="mono">{String(i + 1).padStart(2, "0")}</span>{n.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <div className="sheet-foot">
              {links.github && (
                <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer"><GitHub /> github.com/{links.githubHandle}</a>
              )}
              <a className="btn btn-primary" href="#contact" onClick={(e) => jump(e, "contact")}>Discuter d'un projet</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
