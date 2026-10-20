import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { process } from "../data/services";
import { useMedia, useScrollContainer } from "../lib/hooks";
import { SecHead } from "./Reveal";

export default function Process() {
  const ref = useRef(null);
  const wide = useMedia("(min-width: 1024px)");
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container, target: ref, offset: ["start 80%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(4, Math.floor(v * 4 + 0.35)));
  });

  return (
    <section id="processus" className="section" aria-labelledby="process-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SecHead kicker="Mon processus" id="process-title" lines={["Quatre étapes,", "zéro surprise."]} />
        <div className="proc-wrap" ref={ref}>
          <span className="proc-rail" aria-hidden="true">
            <motion.i style={wide ? { scaleX: p } : { scaleY: p }} />
          </span>
          <ol className="process">
          {process.map((s, i) => (
            <motion.li
              key={s.n}
              className={`step ${reached > i ? "on" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: wide ? i * 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="step-node" aria-hidden="true">{s.n}</span>
              <div className="step-card">
                <span className="label"><b>{s.n}</b> · {s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </motion.li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
