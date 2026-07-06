import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { contact, links, navLinks, siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/layout/Logo";
import { SectionFoliage } from "@/components/ui/Botanical";

export function Footer() {
  const year = 2025;

  return (
    <footer className="relative overflow-hidden bg-brown text-cream/85">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.25]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-guayaba/10 blur-3xl" aria-hidden="true" />
      <SectionFoliage tone="dark" variant="footer" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-4">
            <Logo tone="light" variant="stacked" className="h-20" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {siteConfig.tagline} Cocina típica antioqueña y colombiana hecha
              con amor, en el corazón de Medellín.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${contact.instagramHandle}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-cream/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/30 hover:bg-guayaba hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escríbenos por WhatsApp"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 text-sm text-cream/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/30 hover:bg-forest hover:text-white"
              >
                <Phone className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav className="lg:col-span-3" aria-label="Enlaces del pie de página">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-guayaba-light">
              Explora
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-guayaba transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-guayaba-light">
              Contacto
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-cream/75">
              <li>
                <a
                  href={links.mapDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-guayaba" />
                  <span>
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                    <br />
                    {contact.address.city}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={links.phone}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="h-5 w-5 shrink-0 text-guayaba" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={links.email}
                  className="flex items-center gap-3 break-all transition-colors hover:text-white"
                >
                  <Mail className="h-5 w-5 shrink-0 text-guayaba" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Horario (preparado para completar) */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-guayaba-light">
              Horario
            </h2>
            <div className="mt-5 flex items-start gap-3 text-sm text-cream/75">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-guayaba" />
              <div>
                <p className="text-cream/90">Todos los días</p>
                <p className="mt-1 text-cream/60">
                  Consulta horarios por WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream/50">
            © {year} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-cream/50">
            Fundado en {siteConfig.founded} por {siteConfig.founders.join(" y ")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
