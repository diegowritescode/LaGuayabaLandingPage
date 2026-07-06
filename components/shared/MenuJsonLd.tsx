import { menuData } from "@/lib/menu";
import { siteConfig } from "@/lib/site-config";

/**
 * Datos estructurados schema.org/Menu para la carta digital.
 * Expone platos y precios a los buscadores (mejora el SEO del restaurante).
 */
export function MenuJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Carta de ${siteConfig.legalName}`,
    inLanguage: "es-CO",
    hasMenuSection: menuData.flatMap((cat) =>
      cat.subcategories.map((sub) => ({
        "@type": "MenuSection",
        name: `${cat.label} · ${sub.name}`,
        ...(sub.note ? { description: sub.note } : {}),
        hasMenuItem: sub.dishes.map((dish) => ({
          "@type": "MenuItem",
          name: dish.name,
          ...(dish.description ? { description: dish.description } : {}),
          ...(dish.tags?.includes("vegetariano")
            ? { suitableForDiet: "https://schema.org/VegetarianDiet" }
            : {}),
          offers: dish.prices.map((p) => ({
            "@type": "Offer",
            price: p.value,
            priceCurrency: "COP",
            ...(p.label ? { name: p.label } : {}),
          })),
        })),
      }))
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
