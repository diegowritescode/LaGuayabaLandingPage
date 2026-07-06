import type { MetadataRoute } from "next";
import { menuData } from "@/lib/menu";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap data-driven: se genera a partir de las rutas reales del sitio,
 * incluidas las páginas de cada categoría de la carta. Al añadir una nueva
 * categoría (o en el futuro un blog/sedes) el sitemap se actualiza solo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/menu", priority: 0.9, changeFrequency: "monthly" },
    ...menuData.map((c) => ({
      path: `/menu/${c.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
