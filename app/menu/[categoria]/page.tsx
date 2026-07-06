import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { menuData } from "@/lib/menu";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { CategoryMenu } from "@/components/menu/CategoryMenu";
import { JsonLd } from "@/components/shared/JsonLd";

// Solo existen las categorías reales de la carta (nada dinámico/arbitrario).
export const dynamicParams = false;

export function generateStaticParams() {
  return menuData.map((c) => ({ categoria: c.slug }));
}

function getCategory(slug: string) {
  return menuData.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return {};
  return buildMetadata({
    absoluteTitle: cat.metaTitle,
    description: cat.metaDescription,
    path: `/menu/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Carta", path: "/menu" },
    { name: cat.label, path: `/menu/${cat.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <CategoryMenu category={cat} />
    </>
  );
}
