"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Maximize2 } from "lucide-react";
import { eventGallery } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";

const lightboxItems = eventGallery.map((e) => ({ src: e.src, alt: e.alt }));

export function EventsGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {eventGallery.map((item, i) => {
          // Bento: el 1.º y el 4.º ocupan doble ancho para dar ritmo editorial.
          const wide = i === 0 || i === 3;
          const isVideo = item.kind === "video";
          return (
            <StaggerItem
              key={item.id}
              className={cn(wide && "col-span-2")}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={
                  isVideo ? `Reproducir: ${item.alt}` : `Ampliar: ${item.alt}`
                }
                className="group relative block h-56 w-full overflow-hidden rounded-2xl ring-1 ring-brown/10 shadow-[var(--shadow-soft)] sm:h-64 lg:h-72"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={wide ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isVideo
                      ? "bg-brown/45 group-hover:bg-brown/35"
                      : "bg-brown/10 group-hover:bg-brown/30"
                  )}
                />

                {isVideo ? (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-brown shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-7 w-7 fill-brown" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                      Ver video
                    </span>
                  </span>
                ) : (
                  <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-brown opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                )}
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Lightbox
        items={lightboxItems}
        index={active}
        onClose={() => setActive(null)}
        onIndexChange={setActive}
      />
    </>
  );
}
