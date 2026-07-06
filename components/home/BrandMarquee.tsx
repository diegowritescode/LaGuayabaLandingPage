import { Marquee } from "@/components/ui/Marquee";

const words = [
  "Tradición",
  "Familia",
  "Cocina colombiana",
  "Sabor antioqueño",
  "Hecho con amor",
  "Desde 1999",
  "Calidez",
  "Parrilla al carbón",
];

/** Cinta de marca: un latido de color y ritmo entre el hero y la historia. */
export function BrandMarquee() {
  return (
    <div className="relative bg-forest py-6 text-cream sm:py-7">
      <Marquee items={words} className="font-serif text-2xl italic sm:text-3xl" />
    </div>
  );
}
