import Image from "next/image";
import { Phone, CalendarHeart } from "lucide-react";
import { links, contact } from "@/lib/site-config";
import { images } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFoliage } from "@/components/ui/Botanical";

export function CTAReservation() {
  return (
    <section className="relative overflow-hidden">
      {/* Fotografía de fondo */}
      <Image
        src={images.ctaReservation}
        alt="Ambiente cálido de La Guayaba listo para recibirte"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brown/96 via-brown/82 to-brown/78"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_25%,rgba(74,45,39,0.55)_100%)]"
        aria-hidden="true"
      />
      <SectionFoliage tone="dark" variant="corners" />

      {/* Marco de esquinas */}
      <div className="pointer-events-none absolute inset-5 z-10 hidden sm:block">
        <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-cream/25" />
        <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-cream/25" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-cream/25" />
        <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-cream/25" />
      </div>

      <Container size="default" className="relative py-24 text-center sm:py-32 lg:py-40">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cream backdrop-blur-md">
            <CalendarHeart className="h-4 w-4" />
            Reservas
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display mx-auto mt-7 max-w-3xl text-[2.7rem] leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            Tu mesa te espera en{" "}
            <span className="accent text-guayaba-light">La Guayaba</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
            Reserva en segundos por WhatsApp o llámanos. Ideal para almuerzos en
            familia, cenas especiales y celebraciones.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={links.whatsappReservation} variant="primary" size="lg">
              Reservar por WhatsApp
            </Button>
            <Button
              href={links.phone}
              variant="light"
              size="lg"
              icon={<Phone className="h-5 w-5" />}
            >
              {contact.phoneDisplay}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 text-sm text-cream/60">
            Respuesta inmediata · {contact.address.line2}, Medellín
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
