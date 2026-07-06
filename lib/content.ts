import type {
  EventMedia,
  EventService,
  GalleryImage,
  Testimonial,
  TimelineEntry,
} from "@/types";
import { images } from "@/lib/images";

/** Línea de tiempo de la historia del restaurante (sección Historia). */
export const timeline: TimelineEntry[] = [
  {
    year: "1999",
    title: "El primer puesto",
    description:
      "Angélica Millán y Nicanor Orozco abren un pequeño puesto de comida ambulante en el barrio San Pablo de Medellín, con recetas de familia e ingredientes frescos.",
  },
  {
    year: "2006",
    title: "Nuestro primer local",
    description:
      "El voz a voz de la comunidad nos permite abrir las puertas de un local propio y recibir a las familias en la mesa.",
  },
  {
    year: "2014",
    title: "Un referente de la tradición",
    description:
      "La Guayaba se consolida como referente de comida típica antioqueña y colombiana, ampliando su carta y sus salones.",
  },
  {
    year: "Hoy",
    title: "Sabor que sigue creciendo",
    description:
      "Seguimos siendo un restaurante familiar que preserva la tradición culinaria colombiana con una experiencia cálida, auténtica y cercana.",
  },
];

/** Servicios que ofrece La Guayaba para eventos (sección Eventos). */
export const eventServices: EventService[] = [
  {
    id: "decoracion",
    title: "Decoración",
    description: "Ambientación y montaje a la medida de cada celebración.",
    icon: "Flower2",
  },
  {
    id: "video-beam",
    title: "Video beam",
    description: "Proyección para presentaciones, homenajes y sorpresas.",
    icon: "Projector",
  },
  {
    id: "sonido",
    title: "Sonido",
    description: "Equipo profesional para que la fiesta suene increíble.",
    icon: "Volume2",
  },
  {
    id: "miniteca",
    title: "Miniteca",
    description: "Música y luces para llenar la pista toda la noche.",
    icon: "Disc3",
  },
  {
    id: "meseros",
    title: "Meseros",
    description: "Servicio atento y cercano durante todo el evento.",
    icon: "ConciergeBell",
  },
  {
    id: "bar",
    title: "Bar",
    description: "Barra de licores y cócteles de autor para tus invitados.",
    icon: "Martini",
  },
  {
    id: "cafe",
    title: "Café",
    description: "Estación de café colombiano recién preparado.",
    icon: "Coffee",
  },
  {
    id: "flores",
    title: "Arreglos florales",
    description: "Flores frescas que visten cada rincón del salón.",
    icon: "Leaf",
  },
];

/**
 * Galería de eventos reales de La Guayaba (fotos y video).
 * Reemplaza cada `src` por las fotos/videos propios del restaurante.
 * Un elemento marcado como "video" muestra un botón de reproducción.
 */
export const eventGallery: EventMedia[] = [
  { id: "eg-wedding", src: images.events.wedding, alt: "Matrimonio celebrado en La Guayaba", kind: "image" },
  { id: "eg-table", src: images.events.table, alt: "Mesa decorada con flores para un evento", kind: "image" },
  { id: "eg-party", src: images.events.party, alt: "Fiesta con música y luces en La Guayaba", kind: "video" },
  { id: "eg-dinner", src: images.events.dinner, alt: "Cena empresarial montada y servida", kind: "image" },
  { id: "eg-buffet", src: images.events.buffet, alt: "Estación de comida tipo buffet para eventos", kind: "image" },
  { id: "eg-salon", src: images.events.salon, alt: "Salón preparado para recibir a los invitados", kind: "image" },
];

/** Tipos de eventos que celebramos, para la introducción de la sección. */
export const eventTypes: string[] = [
  "Matrimonios",
  "Cumpleaños",
  "Aniversarios",
  "Eventos empresariales",
  "Grados",
  "Fechas especiales",
];

/** Imágenes de la galería. Reemplaza cada src por tus fotos reales. */
export const galleryImages: GalleryImage[] = [
  { id: "g1", src: images.gallery[0], alt: "Plato tradicional de la casa recién servido", span: "tall" },
  { id: "g2", src: images.gallery[1], alt: "Detalle de la mesa en La Guayaba" },
  { id: "g3", src: images.gallery[2], alt: "Ambiente cálido del restaurante" },
  { id: "g4", src: images.gallery[3], alt: "Preparación en la parrilla al carbón", span: "wide" },
  { id: "g5", src: images.gallery[4], alt: "Postre de la casa" },
  { id: "g6", src: images.gallery[5], alt: "Familia disfrutando en La Guayaba", span: "tall" },
  { id: "g7", src: images.gallery[6], alt: "Cóctel de autor servido en la barra" },
  { id: "g8", src: images.gallery[7], alt: "Salón preparado para un evento" },
  { id: "g9", src: images.gallery[8], alt: "Rincón del restaurante con detalles en madera", span: "wide" },
];

/** Opiniones de clientes (sección de testimonios). */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "María Restrepo",
    role: "Cliente frecuente",
    quote:
      "La bandeja paisa sabe como la de mi abuela. Es el sitio al que llevo a toda mi familia cuando quiero sentirme en casa.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Andrés Gómez",
    role: "Evento empresarial",
    quote:
      "Organizamos la cena de fin de año de la empresa y todo fue impecable: la comida, la decoración y la atención. Repetimos sin dudarlo.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Laura y Sebastián",
    role: "Aniversario",
    quote:
      "Celebramos nuestro aniversario y nos hicieron sentir consentidos toda la noche. El postre de guayaba es una locura.",
    rating: 5,
  },
];

/** Vista previa de categorías destacadas en el inicio (MenuPreview). */
export const menuPreviewCategories = [
  {
    id: "platos-tipicos",
    name: "Platos típicos",
    description: "Bandeja paisa, cazuela, sancocho y más.",
    image: images.menuPreview.tipicos,
  },
  {
    id: "parrilla",
    name: "Parrilla",
    description: "Cortes al carbón, jugosos y dorados.",
    image: images.menuPreview.parrilla,
  },
  {
    id: "pescados",
    name: "Pescados",
    description: "Del mar y del río, frescos cada día.",
    image: images.menuPreview.pescados,
  },
  {
    id: "postres",
    name: "Postres",
    description: "El dulce final hecho en casa.",
    image: images.menuPreview.postres,
  },
] as const;
