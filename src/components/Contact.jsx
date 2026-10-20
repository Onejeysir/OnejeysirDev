import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contactConfig, links } from "../data/site";
import { budgets, projectTypes } from "../data/services";
import { buildMailto, validateContact } from "../lib/validate";
import { MaskTitle, Reveal } from "./Reveal";
import { Alert, Arrow, ArrowUR, Check, Copy, GitHub, Info, Mail } from "./Icons";

const EMPTY = { name: "", email: "", type: "", budget: "", message: "", website: "" };

function Field({ id, label, optional, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label} {optional && <small>(facultatif)</small>}</label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p id={`${id}-err`} className="err" initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
            <Alert width="16" height="16" />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact({ prefillType, prefillTick }) {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | sent | failed | draft
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);
  const noticeRef = useRef(null);

  useEffect(() => {
    if (prefillType) setV((cur) => ({ ...cur, type: prefillType }));
  }, [prefillType, prefillTick]);

  useEffect(() => { if (state !== "idle" && state !== "sending") noticeRef.current?.focus(); }, [state]);

  const set = (k) => (e) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (touched[k]) setErrors(validateContact(next));
  };
  const blur = (k) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validateContact(v)); };
  const show = (k) => (touched[k] ? errors[k] : undefined);
  const aria = (k) => ({ "aria-invalid": show(k) ? "true" : "false", "aria-describedby": show(k) ? `${k}-err` : undefined });

  async function submit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const errs = validateContact(v);
    setErrors(errs);
    setTouched({ name: true, email: true, type: true, message: true });
    const first = Object.keys(errs)[0];
    if (first) { formRef.current?.querySelector(`#${first}`)?.focus(); return; }
    if (v.website) { setState("failed"); return; } // pot de miel anti-spam

    if (!contactConfig.formEndpoint) {
      // Aucun service d'envoi configuré : on prépare un e-mail, on ne prétend pas l'avoir envoyé.
      setDraft(buildMailto(links.email, v));
      setState("draft");
      return;
    }

    setState("sending");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(contactConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: v.name.trim(), email: v.email.trim(), type: v.type, budget: v.budget || "Non précisé", message: v.message.trim() }),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("sent");
      setV(EMPTY); setTouched({}); setErrors({});
    } catch {
      setDraft(links.email ? buildMailto(links.email, v) : null);
      setState("failed");
    } finally {
      clearTimeout(timer);
    }
  }

  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`À : ${links.email}\nObjet : ${draft.subject}\n\n${draft.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { setCopied(false); }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title" style={{ background: "var(--bg-2)" }}>
      <div className="wrap contact-grid">
        <div>
          <Reveal as="p" className="label" y={10}>Contact</Reveal>
          <div style={{ marginTop: "1.5rem" }}>
            <MaskTitle id="contact-title" className="display contact-title" lines={["Construisons", "quelque chose", "d'utile."]} />
          </div>
          <Reveal as="p" className="lead" delay={0.15} style={{ marginTop: "1.5rem" }}>
            Un site, une interface, une fonctionnalité ? Décrivez votre idée : je vous réponds avec des questions précises et une proposition honnête.
          </Reveal>
          <Reveal className="direct" delay={0.2}>
            {links.email && <a href={`mailto:${links.email}`}><strong><Mail /> E-mail</strong><span>{links.email}</span></a>}
            {links.github && <a href={links.github} target="_blank" rel="noopener noreferrer"><strong><GitHub /> GitHub</strong><span>@{links.githubHandle}</span></a>}
            {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><strong><ArrowUR /> LinkedIn</strong><span>Profil</span></a>}
            {links.whatsapp && <a href={links.whatsapp} target="_blank" rel="noopener noreferrer"><strong><ArrowUR /> WhatsApp</strong><span>Message direct</span></a>}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form ref={formRef} className="form" noValidate onSubmit={submit} aria-describedby="form-hint">
            <div className="row2">
              <Field id="name" label="Nom" error={show("name")}>
                <input id="name" className="input" autoComplete="name" value={v.name} onChange={set("name")} onBlur={blur("name")} {...aria("name")} />
              </Field>
              <Field id="email" label="Adresse e-mail" error={show("email")}>
                <input id="email" type="email" inputMode="email" className="input" autoComplete="email" value={v.email} onChange={set("email")} onBlur={blur("email")} {...aria("email")} />
              </Field>
            </div>
            <div className="row2">
              <Field id="type" label="Type de projet" error={show("type")}>
                <select id="type" className="input" value={v.type} onChange={set("type")} onBlur={blur("type")} {...aria("type")}>
                  <option value="">Choisir…</option>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field id="budget" label="Budget" optional>
                <select id="budget" className="input" value={v.budget} onChange={set("budget")}>
                  <option value="">Non précisé</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
            </div>
            <Field id="message" label="Message" error={show("message")}>
              <textarea id="message" className="input" value={v.message} onChange={set("message")} onBlur={blur("message")} placeholder="Le contexte, ce que vous voulez obtenir, vos délais…" {...aria("message")} />
            </Field>
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Ne pas remplir</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
            </div>

            <div className="form-foot">
              <p id="form-hint">{contactConfig.formEndpoint ? "Votre message m'est transmis directement." : "Votre message sera préparé dans votre messagerie e-mail."}</p>
              <button type="submit" className="btn btn-primary" disabled={state === "sending"} aria-busy={state === "sending"}>
                {state === "sending" ? (<><span className="spinner" aria-hidden="true" /> Envoi en cours…</>) : (<>{contactConfig.formEndpoint ? "Envoyer" : "Préparer le message"} <Arrow /></>)}
              </button>
            </div>

            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {state === "sent" && (
                  <motion.div key="ok" ref={noticeRef} tabIndex={-1} className="notice ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} style={{ display: "grid", color: "var(--vert)" }}><Check /></motion.span>
                    <div><strong>Message envoyé.</strong><p>Merci ! Je reviens vers vous par e-mail dès que possible.</p></div>
                  </motion.div>
                )}
                {state === "failed" && (
                  <motion.div key="ko" ref={noticeRef} tabIndex={-1} className="notice ko" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, x: [0, -6, 6, -3, 0] }} exit={{ opacity: 0 }}>
                    <Alert />
                    <div>
                      <strong>L'envoi a échoué.</strong>
                      <p>Le message n'est pas parti (connexion ou service indisponible). Vos informations sont conservées.</p>
                      <div className="actions">
                        <button type="submit" className="btn btn-sm">Réessayer</button>
                        {draft && <a className="btn btn-sm" href={draft.href}><Mail width="18" height="18" /> Écrire par e-mail</a>}
                      </div>
                    </div>
                  </motion.div>
                )}
                {state === "draft" && draft && (
                  <motion.div key="draft" ref={noticeRef} tabIndex={-1} className="notice info" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <span style={{ color: "var(--accent-text)", display: "grid" }}><Info /></span>
                    <div>
                      <strong>Votre message est prêt. Rien n'a encore été envoyé.</strong>
                      <p>Ouvrez votre messagerie pour l'envoyer à {links.email}, ou copiez-le.</p>
                      <div className="actions">
                        <a className="btn btn-primary btn-sm" href={draft.href} target="_top"><Mail width="18" height="18" /> Ouvrir ma messagerie</a>
                        <button type="button" className="btn btn-sm" onClick={copy}>{copied ? <><Check width="18" height="18" /> Copié</> : <><Copy width="18" height="18" /> Copier le message</>}</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
