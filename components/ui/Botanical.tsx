/**
 * Botanical — kit de follaje vectorial de La Guayaba.
 *
 * El restaurante físico está LLENO de plantas (muros verdes, palmas, pothos
 * colgantes) sobre una casa rosada con madera. Estas hojas en SVG traen esa
 * personalidad a TODO el sitio: nítidas a cualquier tamaño, en los verdes de la
 * marca, sin peticiones de red y sin costo de rendimiento.
 *
 * Todas usan `currentColor`, así que el color se controla con `text-*`
 * (text-leaf, text-forest, text-forest-deep) y la opacidad/blur desde el
 * contenedor. Son decorativas: siempre aria-hidden y pointer-events-none.
 */

/* Hoja base — lámina ovada y puntiaguda con nervadura. */
const LEAF_PATH = "M50 118 C22 94 12 52 50 4 C88 52 78 94 50 118 Z";

function LeafBlade() {
  return (
    <>
      <path d={LEAF_PATH} fill="currentColor" />
      {/* Nervadura central + venas, un tono más claro para dar relieve. */}
      <g stroke="currentColor" strokeWidth={1.4} fill="none" opacity={0.35} className="text-cream">
        <path d="M50 110 L50 14" strokeLinecap="round" />
        <path d="M50 88 C40 82 34 80 26 82" />
        <path d="M50 88 C60 82 66 80 74 82" />
        <path d="M50 66 C41 61 35 60 28 62" />
        <path d="M50 66 C59 61 65 60 72 62" />
        <path d="M50 46 C43 42 38 41 33 43" />
        <path d="M50 46 C57 42 62 41 67 43" />
      </g>
    </>
  );
}

/** Mata de hojas: un abanico de láminas esbeltas que nacen de un mismo punto. */
export function LeafTuft({ className }: { className?: string }) {
  const fan = [
    { rot: -66, sc: 0.68, sx: 0.52, op: 0.4 },
    { rot: -47, sc: 0.84, sx: 0.58, op: 0.6 },
    { rot: -28, sc: 0.98, sx: 0.6, op: 0.82 },
    { rot: -9, sc: 1.08, sx: 0.58, op: 1 },
    { rot: 10, sc: 1.03, sx: 0.6, op: 0.9 },
    { rot: 29, sc: 0.92, sx: 0.6, op: 0.7 },
    { rot: 48, sc: 0.8, sx: 0.56, op: 0.52 },
    { rot: 67, sc: 0.66, sx: 0.52, op: 0.38 },
  ];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      {fan.map((f, i) => (
        <g
          key={i}
          transform={`translate(100 192) rotate(${f.rot}) scale(${f.sx * f.sc} ${f.sc}) translate(-50 -118)`}
          opacity={f.op}
        >
          <LeafBlade />
        </g>
      ))}
    </svg>
  );
}

/* Construye la lámina lenticular de un foliolo de palma. */
function leaflet(sx: number, sy: number, len: number, angDeg: number, w: number) {
  const a = (angDeg * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = -Math.sin(a);
  const tx = sx + len * dx;
  const ty = sy + len * dy;
  const px = -dy;
  const py = dx;
  const mx = sx + len * 0.45 * dx;
  const my = sy + len * 0.45 * dy;
  const c1x = mx + (w / 2) * px;
  const c1y = my + (w / 2) * py;
  const c2x = mx - (w / 2) * px;
  const c2y = my - (w / 2) * py;
  return `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${c1x.toFixed(1)} ${c1y.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)} Q${c2x.toFixed(1)} ${c2y.toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)} Z`;
}

/** Fronda de palma — tallo curvo con foliolos a ambos lados. */
export function PalmFrond({ className }: { className?: string }) {
  const N = 11;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = 84 - 26 * Math.sin(t * Math.PI * 0.55);
    const y = 214 - t * 198;
    pts.push([x, y]);
  }
  const stem = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const leaflets: string[] = [];
  pts.forEach(([x, y], i) => {
    if (i === 0) return;
    const t = i / N;
    const len = 50 * (1 - 0.62 * t) + 9;
    const ang = 58 - t * 26;
    const w = 10 * (1 - 0.5 * t) + 3;
    leaflets.push(leaflet(x, y, len, ang, w));
    leaflets.push(leaflet(x, y, len, 180 - ang, w));
  });
  return (
    <svg viewBox="0 0 170 220" className={className} aria-hidden="true" focusable="false">
      <path d={stem} stroke="currentColor" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.7} />
      {leaflets.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * GardenDecor — capa decorativa RICA para enmarcar la carta (vista de menú).
 * `tone="light"` para cuerpos claros; `tone="dark"` para franjas oscuras.
 */
export function GardenDecor({ tone = "light" }: { tone?: "light" | "dark" }) {
  const green = tone === "dark" ? "text-leaf" : "text-forest";
  const o =
    tone === "dark"
      ? { tuft: 0.2, frond: 0.18, side: 0.14 }
      : { tuft: 0.1, frond: 0.13, side: 0.08 };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`absolute -bottom-20 -left-16 h-72 w-52 rotate-[-8deg] blur-[1px] sm:h-96 sm:w-72 ${green}`} style={{ opacity: o.frond }}>
        <PalmFrond className="h-full w-full" />
      </div>
      <div className={`absolute -right-24 -top-20 h-60 w-60 rotate-[26deg] blur-[1px] sm:h-80 sm:w-80 ${green}`} style={{ opacity: o.tuft }}>
        <LeafTuft className="h-full w-full" />
      </div>
      <div className={`absolute -bottom-24 -right-20 h-56 w-56 -rotate-[36deg] blur-[1px] sm:h-72 sm:w-72 ${green}`} style={{ opacity: o.tuft }}>
        <LeafTuft className="h-full w-full" />
      </div>
      <div className={`absolute -left-28 top-1/3 hidden h-96 w-72 rotate-[34deg] blur-[2px] lg:block ${green}`} style={{ opacity: o.side }}>
        <PalmFrond className="h-full w-full" />
      </div>
      <div className={`absolute -right-28 bottom-1/4 hidden h-96 w-72 -scale-x-100 rotate-[30deg] blur-[2px] lg:block ${green}`} style={{ opacity: o.side }}>
        <PalmFrond className="h-full w-full" />
      </div>
    </div>
  );
}

/**
 * SectionFoliage — acento botánico LIGERO (1–2 elementos) para las secciones
 * del inicio. Cada `variant` coloca el follaje en un sitio distinto para que,
 * al hacer scroll, la vegetación se sienta intencional y variada (no repetida).
 * El contenedor de la sección debe ser `relative` y recortar el desborde
 * (overflow-hidden), y el contenido ir por encima (relative/z-10).
 */
type FoliageVariant = "corners" | "left" | "right" | "top" | "footer";

export function SectionFoliage({
  tone = "light",
  variant = "corners",
}: {
  tone?: "light" | "dark";
  variant?: FoliageVariant;
}) {
  const green = tone === "dark" ? "text-leaf" : "text-forest";
  const b = tone === "dark" ? 1 : 0.62; // factor de opacidad base (más tenue en claro)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {variant === "corners" && (
        <>
          <div className={`absolute -bottom-14 -left-14 h-56 w-40 rotate-[-6deg] blur-[1px] sm:h-72 sm:w-52 ${green}`} style={{ opacity: 0.16 * b }}>
            <PalmFrond className="h-full w-full" />
          </div>
          <div className={`absolute -right-16 -top-12 h-48 w-48 rotate-[24deg] blur-[1px] sm:h-64 sm:w-64 ${green}`} style={{ opacity: 0.15 * b }}>
            <LeafTuft className="h-full w-full" />
          </div>
        </>
      )}

      {variant === "left" && (
        <>
          <div className={`absolute -bottom-16 -left-16 h-64 w-48 rotate-[-4deg] blur-[1px] sm:h-80 sm:w-56 ${green}`} style={{ opacity: 0.17 * b }}>
            <PalmFrond className="h-full w-full" />
          </div>
          <div className={`absolute -left-20 top-10 hidden h-56 w-56 rotate-[52deg] blur-[2px] lg:block ${green}`} style={{ opacity: 0.1 * b }}>
            <LeafTuft className="h-full w-full" />
          </div>
        </>
      )}

      {variant === "right" && (
        <>
          <div className={`absolute -right-16 -top-14 h-52 w-52 rotate-[28deg] blur-[1px] sm:h-64 sm:w-64 ${green}`} style={{ opacity: 0.16 * b }}>
            <LeafTuft className="h-full w-full" />
          </div>
          <div className={`absolute -bottom-16 -right-14 h-56 w-44 -scale-x-100 rotate-[-4deg] blur-[1px] sm:h-72 sm:w-52 ${green}`} style={{ opacity: 0.14 * b }}>
            <PalmFrond className="h-full w-full" />
          </div>
        </>
      )}

      {variant === "top" && (
        <>
          <div className={`absolute -left-12 -top-10 h-48 w-40 rotate-[128deg] blur-[1px] sm:h-60 sm:w-48 ${green}`} style={{ opacity: 0.15 * b }}>
            <PalmFrond className="h-full w-full" />
          </div>
          <div className={`absolute -right-12 -top-10 h-48 w-40 -scale-x-100 rotate-[128deg] blur-[1px] sm:h-60 sm:w-48 ${green}`} style={{ opacity: 0.15 * b }}>
            <PalmFrond className="h-full w-full" />
          </div>
        </>
      )}

      {variant === "footer" && (
        <>
          <div className={`absolute -bottom-20 -left-16 h-64 w-48 rotate-[-6deg] blur-[1px] sm:h-80 sm:w-56 ${green}`} style={{ opacity: 0.16 * b }}>
            <PalmFrond className="h-full w-full" />
          </div>
          <div className={`absolute -bottom-20 -right-16 h-56 w-56 -rotate-[30deg] blur-[1px] sm:h-72 sm:w-72 ${green}`} style={{ opacity: 0.15 * b }}>
            <LeafTuft className="h-full w-full" />
          </div>
        </>
      )}
    </div>
  );
}
