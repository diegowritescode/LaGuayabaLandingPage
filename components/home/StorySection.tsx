import Image from "next/image";
import { Heart } from "lucide-react";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { timeline } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SectionFoliage } from "@/components/ui/Botanical";

export function StorySection() {
  return (
    <section id="historia" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
      <SectionFoliage tone="light" variant="left" />

      <Container size="wide" className="relative">
        <SectionHeading
          align="center"
          eyebrow="Nuestra historia"
          title={
            <>
              Más de 25 años sirviendo{" "}
              <span className="accent text-gradient-guayaba">tradición</span>
            </>
          }
          description={`La Guayaba nació en ${siteConfig.founded} como un pequeño puesto de comida ambulante en el barrio San Pablo de Medellín, fundado por ${siteConfig.founders.join(
            " y "
          )}.`}
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Collage de imágenes */}
          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <Reveal className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
              <Image
                src={images.storyPrimary}
                alt="Ambiente cálido del restaurante La Guayaba"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/30 to-transparent" aria-hidden="true" />
            </Reveal>

            {/* Imagen secundaria superpuesta */}
            <Reveal
              delay={0.25}
              className="absolute -bottom-8 -right-4 hidden aspect-square w-40 overflow-hidden rounded-3xl border-4 border-cream shadow-[var(--shadow-card)] sm:block sm:w-48"
            >
              <Image
                src={images.storySecondary}
                alt="Detalle de un plato tradicional servido en la mesa"
                fill
                sizes="12rem"
                className="object-cover"
              />
            </Reveal>

            {/* Insignia de años */}
            <div className="absolute -left-4 -top-6 flex flex-col items-center rounded-2xl bg-forest px-5 py-4 text-cream shadow-[var(--shadow-card)]">
              <span className="font-display text-3xl leading-none">
                <CountUp to={25} prefix="+" />
              </span>
              <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-cream/80">
                años
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-brown-soft/85 sm:text-lg">
                Con el paso de los años, gracias al apoyo de clientes,
                colaboradores y la comunidad, evolucionamos hasta convertirnos en
                un referente de comida típica antioqueña y colombiana. Hoy
                seguimos siendo un restaurante familiar que busca preservar la
                tradición con una experiencia cálida y cercana.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-0">
              {timeline.map((entry, i) => {
                const isLast = i === timeline.length - 1;
                return (
                  <Reveal as="li" key={entry.year} delay={i * 0.08} className="relative flex gap-5 pb-8 last:pb-0">
                    {/* Línea + punto */}
                    <div className="relative flex flex-col items-center">
                      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-guayaba/15 ring-1 ring-guayaba/30">
                        <span className="h-2.5 w-2.5 rounded-full bg-guayaba" />
                      </span>
                      {!isLast && (
                        <span
                          className="absolute top-11 h-full w-px bg-gradient-to-b from-guayaba/40 to-guayaba/5"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="-mt-0.5 pb-2">
                      <span className="font-serif text-2xl font-semibold text-guayaba-deep">
                        {entry.year}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-brown">
                        {entry.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-brown-soft/85">
                        {entry.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>

            <Reveal className="mt-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-guayaba-light/40 px-4 py-2 text-sm font-medium text-guayaba-deep">
                <Heart className="h-4 w-4 fill-guayaba-deep" />
                Hecho con amor, como en casa
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
