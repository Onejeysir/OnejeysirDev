import { motion, useSpring, useTransform } from "framer-motion";

/* Illustrations conceptuelles en SVG (pas des captures). Remplace-les par
   de vraies captures via le champ `image` d'un projet. */

const C = { bg: "#0d0d0b", panel: "#1b1b18", line: "#34332e", mute: "#5a574f", text: "#f3f0e7", y: "#FFD60A" };

function useLayer(px, py, depth) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return { x, y };
}

export function TechVisual({ px, py }) {
  const back = useLayer(px, py, 6);
  const mid = useLayer(px, py, 14);
  const front = useLayer(px, py, 26);
  return (
    <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration conceptuelle de l'interface ONEJEYSIRTECH : recherche de techniciens par métier et par ville.">
      <rect width="800" height="560" fill={C.bg} />
      <motion.g style={back}>
        <rect x="70" y="60" width="660" height="460" rx="18" fill={C.panel} stroke={C.line} />
        <circle cx="96" cy="86" r="5" fill={C.line} /><circle cx="114" cy="86" r="5" fill={C.line} /><circle cx="132" cy="86" r="5" fill={C.line} />
        <rect x="160" y="78" width="260" height="16" rx="8" fill="#23221f" />
        <text x="100" y="140" fill={C.text} fontFamily="Archivo" fontWeight="900" fontSize="22" style={{ fontVariationSettings: '"wdth" 120' }}>ONEJEYSIR<tspan fill={C.y}>TECH</tspan></text>
        <text x="100" y="186" fill={C.text} fontFamily="Archivo" fontWeight="800" fontSize="30">Quel technicien cherchez-vous ?</text>
      </motion.g>
      <motion.g style={mid}>
        <rect x="100" y="210" width="600" height="58" rx="12" fill="#0f0f0d" stroke={C.y} strokeWidth="1.5" />
        <circle cx="132" cy="239" r="9" fill="none" stroke={C.y} strokeWidth="2.5" /><line x1="139" y1="246" x2="146" y2="253" stroke={C.y} strokeWidth="2.5" />
        <text x="160" y="246" fill={C.text} fontFamily="JetBrains Mono" fontSize="17">Électricien · Douala</text>
        <rect x="580" y="219" width="108" height="40" rx="9" fill={C.y} />
        <text x="634" y="245" fill="#1a1500" fontFamily="Archivo" fontWeight="800" fontSize="16" textAnchor="middle">Chercher</text>
        {["Électricité", "Plomberie", "Froid", "Informatique", "Menuiserie"].map((c, i) => {
          const x = 100 + [0, 118, 230, 312, 446][i];
          const w = [108, 102, 72, 124, 120][i];
          return (
            <g key={c}>
              <rect x={x} y="286" width={w} height="32" rx="16" fill={i === 0 ? "#2b2600" : "transparent"} stroke={i === 0 ? C.y : C.line} />
              <text x={x + w / 2} y="307" textAnchor="middle" fill={i === 0 ? C.y : "#a5a196"} fontFamily="Archivo" fontSize="13" fontWeight="600">{c}</text>
            </g>
          );
        })}
      </motion.g>
      <motion.g style={front}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${100 + i * 204} 340)`}>
            <rect width="192" height="150" rx="14" fill="#23221f" stroke={i === 0 ? C.y : C.line} />
            <circle cx="36" cy="38" r="18" fill={i === 0 ? C.y : C.line} />
            <rect x="64" y="26" width="96" height="10" rx="5" fill={C.text} opacity="0.85" />
            <rect x="64" y="44" width="64" height="8" rx="4" fill={C.mute} />
            <rect x="18" y="76" width="156" height="7" rx="3.5" fill={C.line} />
            <rect x="18" y="90" width="120" height="7" rx="3.5" fill={C.line} />
            <rect x="18" y="112" width="84" height="24" rx="12" fill="transparent" stroke={i === 0 ? C.y : C.mute} />
            <text x="60" y="128" textAnchor="middle" fill={i === 0 ? C.y : "#a5a196"} fontFamily="Archivo" fontSize="11" fontWeight="700">Demander</text>
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

export function EduVisual({ px, py }) {
  const back = useLayer(px, py, 8);
  const front = useLayer(px, py, 22);
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration conceptuelle d'ONEJEYSIREDU237 : une question d'entraînement sur smartphone.">
      <rect width="800" height="550" fill={C.bg} />
      <motion.g style={back}>
        <text x="60" y="140" fill="#1f1e1b" fontFamily="Archivo" fontWeight="900" fontSize="150" style={{ fontVariationSettings: '"wdth" 125' }}>237</text>
        <rect x="470" y="70" width="270" height="74" rx="14" fill={C.panel} stroke={C.line} />
        <text x="492" y="102" fill="#a5a196" fontFamily="JetBrains Mono" fontSize="13">progression</text>
        <rect x="492" y="116" width="226" height="8" rx="4" fill={C.line} />
        <rect x="492" y="116" width="136" height="8" rx="4" fill={C.y} />
      </motion.g>
      <motion.g style={front}>
        <rect x="280" y="120" width="240" height="460" rx="34" fill={C.panel} stroke={C.line} strokeWidth="2" />
        <rect x="360" y="134" width="80" height="8" rx="4" fill={C.line} />
        <text x="304" y="186" fill={C.y} fontFamily="JetBrains Mono" fontSize="12">CONCOURS · MATHS</text>
        <text x="304" y="216" fill={C.text} fontFamily="Archivo" fontWeight="800" fontSize="18">Question 4 / 20</text>
        <rect x="304" y="234" width="192" height="8" rx="4" fill={C.line} />
        <rect x="304" y="250" width="150" height="8" rx="4" fill={C.line} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="304" y={282 + i * 52} width="192" height="40" rx="10" fill={i === 1 ? "#2b2600" : "transparent"} stroke={i === 1 ? C.y : C.line} />
            <circle cx="326" cy={302 + i * 52} r="7" fill={i === 1 ? C.y : "none"} stroke={i === 1 ? C.y : C.mute} strokeWidth="1.5" />
            <rect x="342" y={298 + i * 52} width={[100, 120, 80, 110][i]} height="8" rx="4" fill={i === 1 ? C.text : C.mute} />
          </g>
        ))}
        <rect x="304" y="500" width="192" height="44" rx="12" fill={C.y} />
        <text x="400" y="528" textAnchor="middle" fill="#1a1500" fontFamily="Archivo" fontWeight="800" fontSize="15">Valider</text>
      </motion.g>
    </svg>
  );
}

export function GenericVisual() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration du projet">
      <rect width="800" height="550" fill={C.bg} />
      <rect x="250" y="125" width="300" height="300" rx="40" fill="none" stroke={C.line} strokeDasharray="6 8" />
      <path d="M400 230v90M355 275h90" stroke={C.y} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectVisual({ project, px, py }) {
  const zero = useSpring(0);
  const X = px || zero;
  const Y = py || zero;
  if (project.image) return <img src={project.image} alt={`Capture d'écran de ${project.title}`} loading="lazy" decoding="async" />;
  if (project.visual === "tech") return <TechVisual px={X} py={Y} />;
  if (project.visual === "edu") return <EduVisual px={X} py={Y} />;
  return <GenericVisual />;
}
