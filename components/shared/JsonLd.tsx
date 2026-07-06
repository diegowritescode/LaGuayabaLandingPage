import { siteConfig, contact, links } from "@/lib/site-config";

/**
 * Datos estructurados (schema.org/Restaurant) para mejorar el SEO y la
 * aparición en resultados enriquecidos de Google.
 */
export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.legalName,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    telephone: `+${contact.phoneIntl}`,
    email: contact.email,
    servesCuisine: ["Colombiana", "Antioqueña", "Parrilla", "Pescados"],
    priceRange: "$$",
    foundingDate: String(siteConfig.founded),
    founder: siteConfig.founders.map((name) => ({
      "@type": "Person",
      name,
    })),
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
      addressLocality: "Medellín",
      addressCountry: "CO",
    },
    sameAs: [contact.instagramUrl],
    acceptsReservations: links.whatsappReservation,
  };

  return (
    <script
      type="application/ld+json"
      // El contenido es estático y controlado por nosotros.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
