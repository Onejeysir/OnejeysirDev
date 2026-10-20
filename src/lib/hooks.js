import { useEffect, useState, useCallback } from "react";

const THEME_KEY = "onejeysir-theme";

function safeGet(key) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch { /* stockage indisponible */ }
}

/** Thème clair/sombre : préférence mémorisée, sinon préférence système. */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = safeGet(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: light)").matches) return "light";
    return "dark";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.background = theme === "light" ? "#f3f0e7" : "#141412";
    safeSet(THEME_KEY, theme);
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return [theme, toggle];
}

/** Section actuellement visible (pour l'état actif de la navigation). */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const target = getScrollEl() || window;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    target.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { target.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [ids]);
  return active;
}

/** Media query réactive. */
export function useMedia(query, initial = false) {
  const [match, setMatch] = useState(() => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : initial));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, [query]);
  return match;
}

/** Route de détail projet : #/projet/<slug> */
export function useProjectRoute() {
  const read = () => {
    const m = window.location.hash.match(/^#\/projet\/([\w-]+)/);
    return m ? m[1] : null;
  };
  const [slug, setSlug] = useState(read);
  useEffect(() => {
    const on = () => setSlug(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const open = useCallback((s) => {
    try { window.history.pushState(null, "", `#/projet/${s}`); } catch { /* ignore */ }
    setSlug(s);
  }, []);
  const close = useCallback(() => {
    try { window.history.replaceState(null, "", "#projets"); } catch { /* ignore */ }
    setSlug(null);
  }, []);
  return [slug, open, close];
}

/** Défilement doux vers une section + focus pour les lecteurs d'écran. */
export function goTo(id, { reduced } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  try { window.history.replaceState(null, "", `#${id}`); } catch { /* ignore */ }
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/** Élément qui défile réellement (fenêtre, ou #root dans certains hébergements intégrés). */
export function getScrollEl() {
  const r = typeof document !== "undefined" ? document.getElementById("root") : null;
  if (r) {
    const o = getComputedStyle(r).overflowY;
    if (o === "auto" || o === "scroll") return r;
  }
  return null;
}
export function useScrollContainer() {
  const [ref] = useState(() => {
    const el = getScrollEl();
    if (el && getComputedStyle(el).position === "static") el.style.position = "relative";
    return { current: el };
  });
  return ref.current ? ref : undefined;
}
export function scrollTopNow() {
  const el = getScrollEl();
  return el ? el.scrollTop : window.scrollY;
}
export function lockScroll() {
  const el = getScrollEl() || document.body;
  const prev = el.style.overflow;
  el.style.overflow = "hidden";
  return () => { el.style.overflow = prev; };
}
