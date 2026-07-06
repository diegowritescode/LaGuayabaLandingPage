import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menuPreviewCategories } from "@/lib/content";
import { menuCategories } from "@/lib/menu-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionFoliage } from "@/components/ui/Botanical";

export function MenuPreview() {
  return (
    <section id="carta" className="relative overflow-hidden bg-brown py-20 text-cream sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-guayaba/10 blur-3xl" aria-hidden="true" />
      <SectionFoliage tone="dark" variant="corners" />

      <Container size="wide" className="relative">
        <SectionHeading
          tone="light"
          eyebrow="La carta"
          title="Una carta para cada antojo"
          description="Desde los clásicos de la montaña hasta cortes a la parrilla y sabores del mar. Explora algunas categorías y descubre la carta completa."
        />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {menuPreviewCategories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                href="/menu"
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-cream/10"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/30 to-transparent transition-opacity duration-500 group-hover:from-brown/95" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl text-cream sm:text-2xl">{cat.name}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-cream/80 opacity-0 transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:max-h-20 group-hover:opacity-100">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-guayaba-light">
                    Ver platos
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Todas las categorías como pastillas */}
        <Reveal className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {menuCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href="/menu"
                  className="inline-block rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-sm text-cream/80 transition-all duration-300 hover:border-guayaba/50 hover:bg-guayaba/15 hover:text-cream"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Button
            href="/menu"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Ver la carta completa
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
