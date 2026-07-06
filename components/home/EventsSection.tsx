import Image from "next/image";
import {
  Flower2,
  Projector,
  Volume2,
  Disc3,
  ConciergeBell,
  Martini,
  Coffee,
  Leaf,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { eventServices, eventTypes } from "@/lib/content";
import { images } from "@/lib/images";
import { links } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EventsGallery } from "@/components/home/EventsGallery";
import { SectionFoliage } from "@/components/ui/Botanical";

const iconMap: Record<string, LucideIcon> = {
  Flower2,
  Projector,
  Volume2,
  Disc3,
  ConciergeBell,
  Martini,
  Coffee,
  Leaf,
};

export function EventsSection() {
  return (
    <section id="eventos" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <SectionFoliage tone="light" variant="right" />

      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow="Eventos y celebraciones"
          title={
            <>
              Celebraciones que se{" "}
              <span className="accent text-guayaba-deep">recuerdan</span>
            </>
          }
          description="Matrimonios, cumpleaños, aniversarios y eventos empresariales con la calidez de siempre. Así se viven los eventos en La Guayaba."
        />

        {/* Tipos de evento */}
        <Reveal className="mt-8">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {eventTypes.map((type) => (
              <li
                key={type}
                className="inline-flex items-center gap-1.5 rounded-full bg-guayaba-light/40 px-4 py-2 text-sm font-medium text-guayaba-deep"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {type}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Galería inmersiva de eventos reales */}
        <EventsGallery />

        {/* Panel "todo incluido" sobre una foto de evento + CTA de cotización */}
        <Reveal className="mt-8 sm:mt-10">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
            <Image
              src={images.eventsHero}
              alt="Montaje de un evento en La Guayaba"
              fill
              sizes="(max-width: 1024px) 100vw, 72rem"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brown/94" aria-hidden="true" />
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

            <div className="relative p-8 sm:p-12 lg:p-14">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <span className="eyebrow text-guayaba-light">Todo incluido</span>
                  <h3 className="font-display mt-4 text-3xl leading-tight text-cream sm:text-4xl">
                    Nos encargamos de cada detalle
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-cream/75">
                    Tú eliges la fecha y los invitados; nosotros ponemos la
                    comida, el montaje y el ambiente. Estos son los servicios
                    que puedes sumar a tu evento:
                  </p>
                </div>
                <Button
                  href={links.whatsappEvents}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  className="shrink-0"
                >
                  Cotizar por WhatsApp
                </Button>
              </div>

              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cream/15 pt-10 md:grid-cols-4">
                {eventServices.map((service) => {
                  const Icon = iconMap[service.icon] ?? Sparkles;
                  return (
                    <li key={service.id}>
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-guayaba/20 text-guayaba-light">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h4 className="mt-4 text-base font-semibold text-cream">
                        {service.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-cream/70">
                        {service.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
