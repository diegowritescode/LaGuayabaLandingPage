// @ts-check
/**
 * Genera los archivos sueltos del QR de la carta — profesional, gratuito y sin
 * terceros. La lógica del QR vive en qr-core.mjs (compartida con la tarjeta).
 *
 * Salidas en public/qr/:
 *   - laguayaba-carta.svg         → PARA IMPRENTA (vectorial, con logo al centro)
 *   - laguayaba-carta.png         → alta resolución (WhatsApp, redes, prints rápidos)
 *   - laguayaba-carta-simple.svg  → sin logo (máxima fiabilidad; ideal para < 2 cm)
 *
 * Uso:  npm run qr
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { ROOT, TARGET, LIGHT, buildQrSvg } from "./qr-core.mjs";

const OUT_DIR = join(ROOT, "public/qr");
const RASTER_PX = 2048;

async function build() {
  await mkdir(OUT_DIR, { recursive: true });

  const svgLogo = await buildQrSvg({ withLogo: true, widthPx: RASTER_PX });
  const svgSimple = await buildQrSvg({ withLogo: false, widthPx: RASTER_PX });

  await writeFile(join(OUT_DIR, "laguayaba-carta.svg"), svgLogo, "utf8");
  await writeFile(join(OUT_DIR, "laguayaba-carta-simple.svg"), svgSimple, "utf8");

  await sharp(Buffer.from(svgLogo))
    .resize(RASTER_PX, RASTER_PX, { fit: "contain", background: LIGHT })
    .png()
    .toFile(join(OUT_DIR, "laguayaba-carta.png"));

  console.log("✓ QR generado apuntando a:", TARGET);
  console.log("  public/qr/laguayaba-carta.svg         (imprenta, con logo)");
  console.log("  public/qr/laguayaba-carta.png         (2048px, con logo)");
  console.log("  public/qr/laguayaba-carta-simple.svg  (sin logo, máxima fiabilidad)");
}

build().catch((err) => {
  console.error("✗ Error generando el QR:", err);
  process.exit(1);
});
