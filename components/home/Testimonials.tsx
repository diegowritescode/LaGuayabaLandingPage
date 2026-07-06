import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionFoliage } from "@/components/ui/Botanical";

export function Testimonials() {
  return (
    <section id="opiniones" className="relative overflow-hidden bg-cream-deep py-20 sm:py-28">
      <SectionFoliage tone="light" variant="left" />
      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen nuestros comensales"
          description="La mejor receta es la que reúne a la familia. Esto es lo que cuentan quienes ya vivieron la experiencia La Guayaba."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <figure className="relative flex h-full flex-col rounded-3xl bg-cream p-7 shadow-[var(--shadow-soft)] ring-1 ring-brown/5">
                <Quote className="h-9 w-9 shrink-0 text-guayaba-light" aria-hidden="true" />
                <div
                  className="mt-3 flex gap-0.5"
                  role="img"
                  aria-label={`${t.rating} de 5 estrellas`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-guayaba text-guayaba" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-brown-soft">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-brown/10 pt-4">
                  <p className="font-semibold text-brown">{t.name}</p>
                  <p className="text-sm text-guayaba-deep">{t.role}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
