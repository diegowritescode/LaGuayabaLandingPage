/**
 * Tipos compartidos de La Guayaba.
 * Centralizados para mantener consistencia entre datos y componentes.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type MenuCategory =
  | "para-compartir"
  | "platos-tipicos"
  | "parrilla"
  | "pescados"
  | "otros-antojos"
  | "menu-infantil"
  | "postres"
  | "bebidas"
  | "licores"
  | "cocteles"
  | "cervezas"
  | "adiciones";

export type MenuCategoryInfo = {
  id: MenuCategory;
  name: string;
  description: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Precio en pesos colombianos (COP), sin separadores. */
  price: number;
  category: MenuCategory;
  /** Marca platos insignia de la casa. */
  signature?: boolean;
  /** Apto para menú vegetariano. */
  vegetarian?: boolean;
};

export type FeaturedDish = {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Etiqueta corta, ej. "Insignia de la casa". */
  tag?: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type EventService = {
  id: string;
  title: string;
  description: string;
  /** Nombre del icono de lucide-react. */
  icon: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** Controla el tamaño de la celda dentro del grid tipo masonry. */
  span?: "tall" | "wide" | "normal";
};

export type EventMedia = {
  id: string;
  src: string;
  alt: string;
  /** "video" muestra un botón de reproducción (listo para un video real). */
  kind: "image" | "video";
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};
