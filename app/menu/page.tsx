import type { Metadata } from "next";
import { MenuLanding } from "@/components/menu/MenuLanding";
import { MenuJsonLd } from "@/components/shared/MenuJsonLd";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nuestra carta",
  description:
    "La carta de La Guayaba: comidas típicas antioqueñas, parrilla, pescados y postres, más el bar con cócteles, sangría y cervezas. Explora por categorías.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <MenuJsonLd />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Carta", path: "/menu" },
        ])}
      />
      <MenuLanding />
    </>
  );
}
