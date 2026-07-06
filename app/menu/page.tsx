import type { Metadata } from "next";
import { MenuExperience } from "@/components/menu/MenuExperience";
import { MenuJsonLd } from "@/components/shared/MenuJsonLd";

export const metadata: Metadata = {
  title: "Nuestra carta",
  description:
    "La carta de La Guayaba: comidas típicas antioqueñas, parrilla, pescados, postres, bebidas y bar. Elige una categoría y hojea la carta página por página.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <MenuJsonLd />
      <MenuExperience />
    </>
  );
}
