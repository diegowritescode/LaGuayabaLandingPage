// @ts-check
/**
 * Núcleo compartido para generar el QR de la carta.
 * Lo usan generate-qr.mjs (archivos sueltos) y generate-sticker.mjs (tarjeta).
 *
 * El QR apunta a la ruta corta y estable /carta (redirigida en next.config.ts),
 * no a /menu directo: así el código impreso nunca cambia aunque muevas la carta.
 */

import QRCode from "qrcode";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Misma base de URL que la app (site-config.ts). Define NEXT_PUBLIC_SITE_URL en
// el hosting para el dominio definitivo; el fallback es el provisional actual.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://laguayaba.deviego.xyz").replace(/\/+$/, "");
export const TARGET = `${SITE_URL}/carta`;

export const DARK = "#4a2d27"; // --color-brown  (módulos)
export const LIGHT = "#fdf9f5"; // --color-cream  (fondo)

const LOGO_PATH = join(ROOT, "public/images/logo-mark-brown.png");

/**
 * SVG del QR. Corrección de errores nivel H (~30% de tolerancia): aguanta el
 * logo al centro y suciedad/reflejos al escanear.
 * @param {{ withLogo?: boolean, widthPx?: number, margin?: number }} [opts]
 */
export async function buildQrSvg({ withLogo = true, widthPx = 2048, margin = 4 } = {}) {
  const baseSvg = await QRCode.toString(TARGET, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin,
    color: { dark: DARK, light: LIGHT },
    width: widthPx,
  });
  if (!withLogo) return baseSvg;

  // El viewBox viene en unidades de "módulo" (0 0 N N); trabajamos ahí.
  const vb = baseSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const size = vb ? parseFloat(vb[1]) : 33;
  const c = size / 2;
  const back = size * 0.26; // recuadro claro tras el logo
  const logo = size * 0.2; // logo (con nivel H, muy seguro)
  const uri = `data:image/png;base64,${(await readFile(LOGO_PATH)).toString("base64")}`;

  const overlay =
    `<rect x="${c - back / 2}" y="${c - back / 2}" width="${back}" height="${back}" ` +
    `rx="${back * 0.18}" fill="${LIGHT}"/>` +
    `<image x="${c - logo / 2}" y="${c - logo / 2}" width="${logo}" height="${logo}" ` +
    `href="${uri}" preserveAspectRatio="xMidYMid meet"/>`;

  return baseSvg.replace("</svg>", `${overlay}</svg>`);
}

/**
 * El QR ya rasterizado como PNG (para incrustarlo en la tarjeta de mesa).
 * @param {{ withLogo?: boolean, sizePx?: number }} [opts]
 * @returns {Promise<Buffer>}
 */
export async function buildQrPngBuffer({ withLogo = true, sizePx = 1400 } = {}) {
  const svg = await buildQrSvg({ withLogo, widthPx: sizePx });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
