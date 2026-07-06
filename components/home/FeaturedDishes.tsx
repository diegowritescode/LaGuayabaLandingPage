import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { featuredDishes } from "@/lib/menu-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionFoliage } from "@/components/ui/Botanical";

export function FeaturedDishes() {
  return (
    <section
      id="especialidades"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-deep py-20 sm:py-28"
    >
      <SectionFoliage tone="light" variant="right" />
      <Container size="wide" className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            className="max-w-2xl"
            eyebrow="Especialidades"
            title={
              <>
                Los platos que nos hacen <span className="accent text-guayaba-deep">únicos</span>
              </>
            }
          />
          <p className="max-w-sm text-base leading-relaxed text-brown-soft/85 lg:pb-2 lg:text-right">
            Recetas de familia que han pasado de generación en generación,
            preparadas cada día con ingredientes frescos.
          </p>
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDishes.map((dish, i) => (
            <StaggerItem key={dish.id}>
              <article className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 text-cream shadow-[var(--shadow-soft)] ring-1 ring-brown/10 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.08]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brown/92 via-brown/35 to-brown/10 transition-all duration-500 group-hover:from-brown/95"
                  aria-hidden="true"
                />

                {/* Encabezado: índice + insignia */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-display text-5xl leading-none text-cream/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {dish.tag && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-md">
                      <Star className="h-3.5 w-3.5 fill-guayaba-light text-guayaba-light" />
                      {dish.tag}
                    </span>
                  )}
                </div>

                {/* Pie: nombre + descripción al hover */}
                <div className="relative z-10">
                  <h3 className="font-display text-3xl text-cream">{dish.name}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:grid-rows-[1fr]">
                    <p className="overflow-hidden text-sm leading-relaxed text-cream/85 opacity-0 transition-opacity duration-500 group-hover:pt-3 group-hover:opacity-100">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}

          {/* Tarjeta CTA hacia la carta completa */}
          <StaggerItem>
            <Link
              href="/menu"
              className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-forest p-7 text-cream shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cream/10 blur-2xl transition-transform duration-[900ms] group-hover:scale-150"
                aria-hidden="true"
              />
              <span className="eyebrow relative text-guayaba-light">La carta</span>
              <div className="relative">
                <h3 className="font-display text-4xl leading-[1.05] text-cream">
                  Descubre todos nuestros platos
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cream">
                  Ver la carta completa
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 transition-all duration-300 group-hover:bg-cream group-hover:text-forest">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </Link>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
