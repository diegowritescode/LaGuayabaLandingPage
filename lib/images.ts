/**
 * Imágenes del sitio — CENTRALIZADAS A PROPÓSITO.
 *
 * Todas las fotos son placeholders de Unsplash mientras llegan las fotografías
 * reales del restaurante. Para reemplazarlas:
 *   1. Sube tus fotos a /public/images (p. ej. /public/images/bandeja-paisa.jpg)
 *   2. Cambia el valor aquí por la ruta local (p. ej. "/images/bandeja-paisa.jpg")
 *   3. (Opcional) elimina el remotePatterns de Unsplash en next.config.ts
 *
 * No necesitas tocar ningún componente: todos leen desde este archivo.
 */

const UNSPLASH = "https://images.unsplash.com/";

/** Construye una URL de Unsplash optimizada al ancho indicado. */
function u(id: string, w = 1600, q = 72): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const images = {
  // Portada principal — foto grande a pantalla completa (calidad ajustada
  // para un buen LCP; Next redimensiona por dispositivo).
  hero: u("photo-1414235077428-338989a2e8c0", 1920, 62),

  // Sección Historia / ambiente del restaurante.
  storyPrimary: u("photo-1517248135467-4c7edcad34c4", 1200),
  storySecondary: u("photo-1559339352-11d035aa65de", 900),

  // Platos insignia (Especialidades).
  bandejaPaisa: u("photo-1504674900247-0877df9cc836", 1100),
  cazuela: u("photo-1546069901-ba9599a7e63c", 1100),
  postaCartagenera: u("photo-1600891964092-4316c288032e", 1100),
  costillasBbq: u("photo-1544025162-d76694265947", 1100),
  salmonGratinado: u("photo-1467003909585-2f8a72700288", 1100),

  // Franja de eventos (banner de cotización).
  eventsHero: u("photo-1533777324565-a040eb52facd", 1600),

  // Galería de eventos reales (reemplaza por fotos/videos del restaurante).
  events: {
    wedding: u("photo-1465495976277-4387d4b0b4c6", 1100),
    table: u("photo-1519225421980-715cb0215aed", 1000),
    dinner: u("photo-1511795409834-ef04bbd61622", 1000),
    buffet: u("photo-1555244162-803834f70033", 1100),
    party: u("photo-1492684223066-81342ee5ff30", 1000),
    salon: u("photo-1550966871-3ed3cdb5ed0c", 1000),
  },

  // Fondo del CTA de reservas.
  ctaReservation: u("photo-1546195643-70f48f9c5b87", 1800, 60),

  // Portadas de las categorías de la carta (menú de inicio).
  // Fotos apetitosas; se pueden reemplazar por fotos propias del restaurante.
  menuCovers: {
    comidas: u("photo-1504674900247-0877df9cc836", 1200),
    conLicor: u("photo-1536935338788-846bb9981813", 1100),
    sinLicor: u("photo-1621263764928-df1444c5e859", 1100),
  },

  // Galería (masonry).
  gallery: [
    u("photo-1555396273-367ea4eb4db5", 900),
    u("photo-1551782450-a2132b4ba21d", 900),
    u("photo-1529042410759-befb1204b468", 900),
    u("photo-1424847651672-bf20a4b0982b", 900),
    u("photo-1552566626-52f8b828add9", 900),
    u("photo-1565299624946-b28f40a0ae38", 900),
    u("photo-1600891964599-f61ba0e24092", 900),
    u("photo-1470337458703-46ad1756a187", 900),
    u("photo-1514933651103-005eec06c04b", 900),
  ],

  // Vistas previas de categorías de la carta.
  menuPreview: {
    tipicos: u("photo-1432139555190-58524dae6a55", 900),
    parrilla: u("photo-1558030006-450675393462", 900),
    pescados: u("photo-1519708227418-c8fd9a32b7a2", 900),
    postres: u("photo-1563805042-7684c019e1cb", 900),
  },

  // Encabezado de la página /menu (LCP — calidad ajustada).
  menuHeader: u("photo-1600335895229-6e75511892c8", 1400, 55),
} as const;
