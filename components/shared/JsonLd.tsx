import { restaurantGraph } from "@/lib/seo";

/**
 * Renderiza cualquier objeto de datos estructurados (schema.org) como JSON-LD.
 * El contenido es estático y controlado por nosotros.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Ficha del negocio local (Restaurant) + WebSite, enlazados por @id.
 * Se coloca una sola vez, en la página de inicio.
 */
export function RestaurantJsonLd() {
  return <JsonLd data={restaurantGraph()} />;
}
