import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMedia } from "../lib/hooks";

/** Attraction magnétique légère, uniquement avec une souris. */
export default function Magnetic({ children, strength = 0.22 }) {
  const ref = useRef(null);
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });
  const active = fine && !reduced;
  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-flex", x: active ? x : 0, y: active ? y : 0 }}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      {children}
    </motion.span>
  );
}
