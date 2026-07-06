# La Guayaba — Restaurante · Bar 🍈

Sitio web oficial de **La Guayaba Restaurante - Bar**: comida típica antioqueña
y colombiana en Medellín desde 1999.

Landing page premium + carta completa, construida como un producto real: cálida,
elegante, familiar y muy rápida.

---

## 🧱 Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (tokens de marca en `app/globals.css`)
- **Framer Motion** (animaciones suaves, con respeto a `prefers-reduced-motion`)
- **Lucide React** (iconos)
- Fuentes: **Cormorant Garamond** (títulos) + **Inter** (texto), vía `next/font`
- Mapa: **Google Maps** embebido (sin API key)

---

## 🚀 Cómo empezar

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # linter
```

---

## 📁 Estructura

```
app/
  layout.tsx            # layout raíz: fuentes + metadata/SEO + navbar/footer/widgets
  page.tsx              # página de inicio (compone las secciones)
  menu/page.tsx         # carta digital por categorías (/menu) + JSON-LD del menú
  globals.css           # sistema de diseño (tokens @theme, base, utilidades)
  not-found.tsx         # 404 con la identidad de la marca
  opengraph-image.tsx   # imagen OG generada dinámicamente
  icon.png              # favicon (emblema real de La Guayaba, fondo transparente)
  apple-icon.png        # icono para iOS (emblema sobre fondo crema)
  manifest.ts / robots.ts / sitemap.ts

components/
  ui/                   # primitivas reutilizables (Button, Container, Reveal, SectionHeading, Botanical)
  layout/               # Navbar, Footer, Logo
  home/                 # secciones del inicio (Hero, Story, Featured, MenuPreview, ...)
  menu/                 # MenuClient (filtro + búsqueda de la carta)
  shared/               # FloatingWhatsApp, BackToTop, JsonLd

public/
  images/logo-{mark,horizontal,stacked}-{brown,cream}.png  # logo en 3 composiciones × 2 colores
  icon-192/512/-maskable.png                                # iconos PWA

lib/
  site-config.ts        # identidad, contacto, enlaces (WhatsApp, mapa, redes) y navegación
  menu-data.ts          # la carta completa + platos destacados
  content.ts            # historia (timeline), servicios de eventos, galería, opiniones
  images.ts             # TODAS las imágenes, centralizadas
  utils.ts              # helpers (cn, formatPrice, normalizeText)

types/                  # tipos compartidos
```

---

## ✏️ Personalización rápida

Casi todo el contenido vive en `lib/` — no necesitas tocar los componentes.

| Quiero cambiar… | Edita |
| --- | --- |
| Teléfono, dirección, correo, Instagram, WhatsApp | `lib/site-config.ts` |
| **La carta digital (categorías, subcategorías, platos y precios)** | `lib/menu.ts` |
| Portadas de las categorías del menú | `lib/images.ts` → `menuCovers` |
| Platos destacados del inicio (con foto) | `lib/menu-data.ts` → `featuredDishes` |
| Historia, servicios de eventos, opiniones | `lib/content.ts` |
| Fotografías | `lib/images.ts` |
| Colores de la marca | bloque `@theme` en `app/globals.css` |
| Enlaces del menú de navegación | `navLinks` en `lib/site-config.ts` |

### 📸 Reemplazar las fotos por las reales

Todas las imágenes son **placeholders de Unsplash** mientras llegan las fotos
reales del restaurante. Para cambiarlas:

1. Sube tus fotos a `public/images/` (p. ej. `public/images/bandeja-paisa.jpg`).
2. En `lib/images.ts`, cambia el valor por la ruta local
   (p. ej. `"/images/bandeja-paisa.jpg"`).
3. (Opcional) elimina el `remotePatterns` de Unsplash en `next.config.ts`.

No hay que tocar ningún componente: todos leen las imágenes desde `lib/images.ts`.

---

## 🔎 SEO y accesibilidad

- Metadata completa + Open Graph + Twitter Cards (imagen OG generada dinámicamente).
- `robots.txt` y `sitemap.xml` automáticos, `manifest.webmanifest` y favicon.
- Datos estructurados `schema.org/Restaurant` (JSON-LD).
- HTML semántico, foco visible, textos alternativos, buen contraste y respeto a
  `prefers-reduced-motion`.

> Antes de publicar, cambia `siteConfig.url` en `lib/site-config.ts` por tu
> dominio real (afecta canonical, sitemap y OpenGraph).

---

## 📌 Pendiente de datos

- **Horario:** el footer y la sección de contacto ya tienen el espacio listo
  ("Consulta horarios por WhatsApp"). Cuando lo tengas, actualízalo en
  `components/layout/Footer.tsx`.
- **Fotos reales** del restaurante (ver arriba).

---

Hecho con cariño para La Guayaba. 🌿
