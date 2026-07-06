import type { Metadata } from "next";
import { siteConfig, contact, links } from "@/lib/site-config";

/**
 * SEO — utilidades centralizadas.
 *
 * Un solo lugar para construir URLs absolutas, metadata por página y los datos
 * estructurados (schema.org). Cualquier página nueva (blog, sedes, promos)
 * hereda SEO consistente reutilizando `buildMetadata` y los builders de schema.
 */

/** Construye una URL absoluta a partir de una ruta relativa. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}

type BuildMetadataArgs = {
  title?: string;
  /** Usa el título tal cual (sin la plantilla "… | La Guayaba"). */
  absoluteTitle?: string;
  description?: string;
  /** Ruta canónica relativa, p. ej. "/menu/comidas". */
  path?: string;
};

/**
 * Genera metadata por página coherente con OpenGraph/Twitter/canonical.
 * La imagen OG se hereda de app/opengraph-image.tsx (definida en el layout).
 */
export function buildMetadata({
  title,
  absoluteTitle,
  description,
  path = "/",
}: BuildMetadataArgs): Metadata {
  const resolvedTitle = absoluteTitle
    ? { absolute: absoluteTitle }
    : title;
  const ogTitle = absoluteTitle ?? (title ? `${title} | ${siteConfig.legalName}` : undefined);

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: absoluteUrl(path),
      siteName: siteConfig.legalName,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

/** Quita claves con valor undefined para un JSON-LD limpio. */
function compact<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

const RESTAURANT_ID = absoluteUrl("/#restaurant");
const WEBSITE_ID = absoluteUrl("/#website");

/**
 * @graph con la ficha del negocio local (Restaurant) + el sitio (WebSite),
 * enlazados por @id. Es la base para que Google entienda la entidad negocio
 * (SEO local: NAP, geo, cocina, menú, redes).
 */
export function restaurantGraph() {
  const openingHours = siteConfig.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

  const restaurant = compact({
    "@type": "Restaurant",
    "@id": RESTAURANT_ID,
    name: siteConfig.legalName,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    telephone: `+${contact.phoneIntl}`,
    email: contact.email,
    image: [absoluteUrl(siteConfig.ogImage), absoluteUrl("/images/logo-mark-brown.png")],
    logo: absoluteUrl("/icon-512.png"),
    servesCuisine: [...siteConfig.cuisines],
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currency,
    foundingDate: String(siteConfig.founded),
    founder: siteConfig.founders.map((name) => ({ "@type": "Person", name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.streetAddress,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    geo: siteConfig.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        }
      : undefined,
    hasMap: links.mapDirections,
    areaServed: { "@type": "City", name: siteConfig.areaServed },
    hasMenu: absoluteUrl("/menu"),
    acceptsReservations: links.whatsappReservation,
    openingHoursSpecification: openingHours.length ? openingHours : undefined,
    sameAs: [contact.instagramUrl],
  });

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.legalName,
    inLanguage: "es-CO",
    publisher: { "@id": RESTAURANT_ID },
  };

  return { "@context": "https://schema.org", "@graph": [restaurant, website] };
}

/** BreadcrumbList a partir de una ruta de migas { name, path }. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** FAQPage a partir de pares pregunta/respuesta. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export { RESTAURANT_ID };
