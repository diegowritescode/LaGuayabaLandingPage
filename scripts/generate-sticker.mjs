// @ts-check
/**
 * Tarjeta / pegatina de mesa con el QR de la carta — lista para imprimir.
 * Pensada para pegar en la mesa o el servilletero.
 *
 * - Cuadrada 90×90 mm + 3 mm de sangrado (bleed) por lado → 96×96 mm totales.
 * - Textos VECTORIZADOS en Cormorant Garamond (la fuente de los títulos del
 *   sitio): se convierten a trazos, así imprimen idénticos sin depender de que
 *   la imprenta tenga la fuente instalada.
 * - Logo y QR incrustados (data URI): el archivo es 100% autocontenido.
 *
 * Salidas en public/qr/:
 *   - laguayaba-tarjeta-mesa.svg  → PARA IMPRENTA (vectorial, autocontenido)
 *   - laguayaba-tarjeta-mesa.png  → 300 DPI (servicios de stickers online, DIY)
 *
 * Uso:  npm run sticker
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
import opentype from "opentype.js";
import { ROOT, TARGET, SITE_URL, DARK, LIGHT, buildQrPngBuffer } from "./qr-core.mjs";

// --- Config (todo cambiable de un vistazo) ---------------------------------
const BROWN_SOFT = "#5c3a32";
const OUT_DIR = join(ROOT, "public/qr");
const LOGO_PATH = join(ROOT, "public/images/logo-stacked-brown.png");
const LOGO_RATIO = 600 / 518; // ancho/alto del logo-stacked-brown.png
const DPI = 300;

// Fuente de marca (Cormorant Garamond). Se descarga una vez y se cachea fuera
// de git (node_modules/.cache), así el script funciona offline en adelante.
const FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf";
const FONT_CACHE = join(ROOT, "node_modules/.cache/laguayaba-fonts/cormorant-garamond.ttf");

// Geometría en milímetros (unidades del viewBox).
const BLEED = 3;
const CARD = 90;
const TOTAL = CARD + BLEED * 2; // 96
const CX = TOTAL / 2; // 48
const L = {
  frameInset: 5, // marco decorativo, medido desde el corte
  logoW: 24,
  logoTop: 10.5,
  ctaSize: 6.4,
  ctaGap: 6.5, // separación logo → CTA
  qrSize: 37,
  qrGap: 4.5, // separación CTA → QR
  instrSize: 3.0,
  instrGap: 4.5, // separación QR → instrucción
};
const CTA = "Escanea nuestra carta";
const INSTRUCTION = "Apunta la cámara de tu celular al código";
// ---------------------------------------------------------------------------

/** Buffer de Node → ArrayBuffer que opentype.js espera. */
function toArrayBuffer(buf) {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

async function loadFont() {
  try {
    return opentype.parse(toArrayBuffer(await readFile(FONT_CACHE)));
  } catch {
    /* no cacheada aún: la descargamos */
  }
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`No pude descargar la fuente (HTTP ${res.status}). ¿Hay conexión?`);
  const ab = await res.arrayBuffer();
  await mkdir(dirname(FONT_CACHE), { recursive: true });
  await writeFile(FONT_CACHE, Buffer.from(ab));
  return opentype.parse(ab);
}

/** Texto centrado en `cx`, con la línea base en `baselineY`, vectorizado. */
function centeredText(font, text, sizeMm, cx, baselineY, fill) {
  const width = font.getAdvanceWidth(text, sizeMm);
  const path = font.getPath(text, cx - width / 2, baselineY, sizeMm);
  return `<path d="${path.toPathData(2)}" fill="${fill}"/>`;
}

async function dataUri(pngBuffer) {
  return `data:image/png;base64,${pngBuffer.toString("base64")}`;
}

async function build() {
  await mkdir(OUT_DIR, { recursive: true });

  const font = await loadFont();
  const logoBuf = await readFile(LOGO_PATH);
  const qrBuf = await buildQrPngBuffer({ withLogo: true, sizePx: 1400 });

  // Posiciones derivadas.
  const logoH = L.logoW / LOGO_RATIO;
  const logoX = CX - L.logoW / 2;
  const ctaBaseline = L.logoTop + logoH + L.ctaGap;
  const qrTop = ctaBaseline + L.qrGap;
  const qrX = CX - L.qrSize / 2;
  const instrBaseline = qrTop + L.qrSize + L.instrGap;

  const fx = BLEED + L.frameInset;
  const fw = CARD - L.frameInset * 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TOTAL}mm" height="${TOTAL}mm" viewBox="0 0 ${TOTAL} ${TOTAL}">
  <!-- Fondo a sangre (llega hasta el borde del papel) -->
  <rect x="0" y="0" width="${TOTAL}" height="${TOTAL}" fill="${LIGHT}"/>
  <!-- Marco decorativo (dentro de la zona segura) -->
  <rect x="${fx}" y="${fx}" width="${fw}" height="${fw}" rx="6" ry="6" fill="none" stroke="${DARK}" stroke-width="0.5"/>
  <rect x="${fx + 1.3}" y="${fx + 1.3}" width="${fw - 2.6}" height="${fw - 2.6}" rx="4.7" ry="4.7" fill="none" stroke="${DARK}" stroke-width="0.2" opacity="0.55"/>
  <!-- Logo -->
  <image x="${logoX}" y="${L.logoTop}" width="${L.logoW}" height="${logoH}" href="${await dataUri(logoBuf)}" preserveAspectRatio="xMidYMid meet"/>
  <!-- Llamado a la acción -->
  ${centeredText(font, CTA, L.ctaSize, CX, ctaBaseline, DARK)}
  <!-- QR (incrustado) -->
  <image x="${qrX}" y="${qrTop}" width="${L.qrSize}" height="${L.qrSize}" href="${await dataUri(qrBuf)}" preserveAspectRatio="xMidYMid meet"/>
  <!-- Instrucción -->
  ${centeredText(font, INSTRUCTION, L.instrSize, CX, instrBaseline, BROWN_SOFT)}
</svg>`;

  await writeFile(join(OUT_DIR, "laguayaba-tarjeta-mesa.svg"), svg, "utf8");

  // Renderizamos holgado (densidad alta) y reducimos al tamaño exacto de 300 DPI:
  // así los bordes quedan nítidos y el PNG pesa lo justo.
  const px = Math.round((TOTAL / 25.4) * DPI);
  await sharp(Buffer.from(svg), { density: DPI })
    .resize(px, px)
    .png()
    .toFile(join(OUT_DIR, "laguayaba-tarjeta-mesa.png"));

  console.log("✓ Tarjeta de mesa generada. QR ->", TARGET);
  console.log(`  Tamaño: ${CARD}×${CARD} mm + ${BLEED} mm de sangrado (${TOTAL}×${TOTAL} mm, ${px}×${px} px @${DPI}dpi)`);
  console.log("  public/qr/laguayaba-tarjeta-mesa.svg  (imprenta, vectorial)");
  console.log("  public/qr/laguayaba-tarjeta-mesa.png  (300 DPI)");
  console.log("  Sitio:", SITE_URL);
}

build().catch((err) => {
  console.error("✗ Error generando la tarjeta:", err);
  process.exit(1);
});
