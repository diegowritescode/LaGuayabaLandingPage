"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { galleryImages } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";

const aspectBySpan: Record<NonNullable<(typeof galleryImages)[number]["span"]>, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[5/4]",
  normal: "aspect-square",
};

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galeria" className="relative bg-cream-deep py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="Galería"
          title="Un vistazo a La Guayaba"
          description="Nuestros platos, nuestro ambiente y los momentos que se viven alrededor de la mesa. Toca cualquier foto para ampliarla."
        />

        <Stagger className="mt-14 columns-2 gap-3 md:columns-3 md:gap-4 [column-fill:_balance]">
          {galleryImages.map((img, i) => (
            <StaggerItem key={img.id} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl ring-1 ring-brown/5 shadow-[var(--shadow-soft)]",
                  aspectBySpan[img.span ?? "normal"]
                )}
                aria-label={`Ampliar imagen: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-brown/0 transition-colors duration-500 group-hover:bg-brown/30">
                  <ZoomIn className="h-8 w-8 text-cream opacity-0 transition-all duration-500 group-hover:opacity-100" />
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Lightbox
        items={galleryImages}
        index={active}
        onClose={() => setActive(null)}
        onIndexChange={setActive}
      />
    </section>
  );
}
