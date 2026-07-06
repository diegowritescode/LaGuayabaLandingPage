import { MapPin, Phone, Mail, Instagram, Navigation } from "lucide-react";
import { contact, links } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function LocationMap() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="Cómo llegar"
          title="Te esperamos en Guayabal"
          description="Estamos en la Avenida Guayabal, muy cerca del corazón de Medellín. Ven a visitarnos o escríbenos para lo que necesites."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Mapa */}
          <Reveal direction="right" className="lg:col-span-3">
            <div className="relative h-72 overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)] ring-1 ring-brown/5 sm:h-96 lg:h-full lg:min-h-[26rem]">
              <iframe
                title="Ubicación de La Guayaba Restaurante en el mapa"
                src={links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>

          {/* Tarjeta de contacto */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-[2rem] bg-brown p-8 text-cream shadow-[var(--shadow-card)]">
              <h3 className="text-2xl text-cream">La Guayaba Restaurante - Bar</h3>

              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-guayaba/20 text-guayaba-light">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="text-cream/85">
                    {contact.address.line1}, {contact.address.line2}
                    <br />
                    {contact.address.city}
                  </span>
                </li>
                <li>
                  <a href={links.phone} className="flex items-center gap-3.5 text-cream/85 transition-colors hover:text-white">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-guayaba/20 text-guayaba-light">
                      <Phone className="h-5 w-5" />
                    </span>
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={links.email} className="flex items-center gap-3.5 break-all text-cream/85 transition-colors hover:text-white">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-guayaba/20 text-guayaba-light">
                      <Mail className="h-5 w-5" />
                    </span>
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 text-cream/85 transition-colors hover:text-white"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-guayaba/20 text-guayaba-light">
                      <Instagram className="h-5 w-5" />
                    </span>
                    {contact.instagramHandle}
                  </a>
                </li>
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <Button
                  href={links.mapDirections}
                  variant="primary"
                  size="md"
                  icon={<Navigation className="h-5 w-5" />}
                  className="w-full"
                >
                  Cómo llegar
                </Button>
                <Button
                  href={links.whatsapp}
                  variant="light"
                  size="md"
                  className="w-full"
                >
                  Escríbenos por WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
