import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 26, as = "div", className, ...rest }) {
  const C = motion[as];
  return (
    <C className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, ease: EASE, delay }} {...rest}>
      {children}
    </C>
  );
}

/** Titre qui monte depuis un masque, ligne par ligne (déclenché par le titre lui-même). */
const lineV = { hidden: { y: "105%" }, show: (i) => ({ y: "0%", transition: { duration: 0.85, ease: EASE, delay: i * 0.08 } }) };
export function MaskTitle({ lines, id, className = "display" }) {
  return (
    <motion.h2 id={id} className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {lines.map((l, i) => (
        <span className="mask" key={i}>
          <motion.span custom={i} variants={lineV}>{l}</motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

export function SecHead({ kicker, n, lines, id, lead }) {
  return (
    <div className="sec-head">
      <Reveal as="p" className="label" y={10}>{n && <><b>{n}</b> · </>}{kicker}</Reveal>
      <MaskTitle lines={lines} id={id} />
      {lead && <Reveal as="p" className="lead" delay={0.15}>{lead}</Reveal>}
    </div>
  );
}
