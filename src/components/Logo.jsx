// Monogramme « 1J » : le « 1 » de ONE et le « J » de JEYSIR partagent la même hampe.
export const MONO_PATH = "M160 116 L214 92 L214 176 C214 206 196 220 172 220 C152 220 140 210 134 196";

export function Monogram({ size = 36, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="110 62 180 180" className={className} aria-hidden="true" focusable="false">
      <rect x="110" y="62" width="180" height="180" rx="34" fill="#FFD60A" />
      <path d={MONO_PATH} fill="none" stroke="#141412" strokeWidth="26" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="brand-word">ONE<i>J</i>EYSIR</span>
  );
}
