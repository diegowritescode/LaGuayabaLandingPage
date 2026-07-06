import type { NavLink } from "@/types";

/**
 * Configuración global del sitio: identidad, contacto y enlaces.
 * Edita aquí para actualizar datos en todo el sitio de una sola vez.
 */

export const siteConfig = {
  name: "La Guayaba",
  legalName: "La Guayaba Restaurante - Bar",
  tagline: "Sabor tradicional desde 1999.",
  heroHeadline: "La tradición colombiana servida desde 1999.",
  description:
    "Restaurante tradicional en Medellín desde 1999. Disfruta bandeja paisa, parrilla, pescados, eventos y la auténtica gastronomía colombiana.",
  founded: 1999,
  founders: ["Angélica Millán", "Nicanor Orozco"],
  // Dominio del sitio. En producción define NEXT_PUBLIC_SITE_URL para el dominio
  // definitivo; el fallback es el dominio provisional actual. Afecta canonical,
  // sitemap y Open Graph.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://laguayaba.deviego.xyz").replace(/\/+$/, ""),
  // Se genera dinámicamente en app/opengraph-image.tsx.
  ogImage: "/opengraph-image",
  // Cocinas que sirve el restaurante (para servesCuisine en schema.org).
  cuisines: ["Colombiana", "Antioqueña", "Parrilla", "Pescados"],
  priceRange: "$$",
  currency: "COP",
  areaServed: "Medellín",
  // Ubicación geográfica exacta (para LocalBusiness / geo en schema.org).
  // Plus Code: 6CC9+CV Medellín.
  geo: { latitude: 6.221090330931885, longitude: -75.58034233448765 },
  /**
   * Horario de atención. Todos los días —incluidos festivos— de 8:00 a 20:00.
   * Se emite como openingHoursSpecification en el schema.org del restaurante.
   */
  openingHours: [
    {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    { days: ["PublicHolidays"], opens: "08:00", closes: "20:00" },
  ] as ReadonlyArray<{
    days: string[];
    opens: string;
    closes: string;
  }>,
} as const;

export const contact = {
  address: {
    line1: "Carrera 52 #18-05",
    line2: "Avenida Guayabal",
    city: "Medellín, Colombia",
    full: "Carrera 52 #18-05, Avenida Guayabal, Medellín, Colombia",
    // Campos separados para schema.org/PostalAddress (SEO local preciso).
    streetAddress: "Carrera 52 #18-05, Avenida Guayabal",
    locality: "Medellín",
    region: "Antioquia",
    country: "CO",
  },
  phoneDisplay: "312 774 4257",
  // Formato internacional para enlaces (Colombia +57), sin espacios ni signos.
  phoneIntl: "573127744257",
  email: "restaurantelaguayaba@gmail.com",
  instagramHandle: "@laguayaba_re",
  instagramUrl: "https://instagram.com/laguayaba_re",
} as const;

const whatsappBase = `https://wa.me/${contact.phoneIntl}`;

export const links = {
  whatsapp: `${whatsappBase}?text=${encodeURIComponent(
    "¡Hola! Me gustaría reservar una mesa en La Guayaba."
  )}`,
  whatsappReservation: `${whatsappBase}?text=${encodeURIComponent(
    "¡Hola! Quiero reservar una mesa en La Guayaba. ¿Me ayudan con la disponibilidad?"
  )}`,
  whatsappEvents: `${whatsappBase}?text=${encodeURIComponent(
    "¡Hola! Quiero cotizar un evento en La Guayaba. Les cuento los detalles:"
  )}`,
  whatsappOrder: `${whatsappBase}?text=${encodeURIComponent(
    "¡Hola! Quiero hacer un pedido a domicilio en La Guayaba."
  )}`,
  phone: `tel:+${contact.phoneIntl}`,
  email: `mailto:${contact.email}`,
  instagram: contact.instagramUrl,
  // Mapa embebido sin API key, centrado en la dirección del restaurante.
  mapEmbed:
    "https://www.google.com/maps?q=6.221090330931885,-75.58034233448765&z=17&output=embed",
  mapDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Carrera+52+%2318-05+Avenida+Guayabal+Medellin+Colombia",
} as const;

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Historia", href: "/#historia" },
  { label: "Especialidades", href: "/#especialidades" },
  { label: "Carta", href: "/menu" },
  { label: "Eventos", href: "/#eventos" },
  { label: "Galería", href: "/#galeria" },
  { label: "Contacto", href: "/#contacto" },
];
