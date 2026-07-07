"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import { menuData } from "@/lib/menu";
import { links } from "@/lib/site-config";
import { Logo } from "@/components/layout/Logo";
import { GardenDecor } from "@/components/ui/Botanical";
import { WhatsAppIcon } from "@/components/shared/icons";

/** Qué encontrará el comensal dentro de cada categoría (guía rápida). */
const BLURBS: Record<string, string> = {
  comidas: "Típicos, parrilla, del mar, para compartir y postres",
  "sin-licor": "Jugos naturales, limonadas, sodas y refrescos",
  "con-licor": "Cócteles, sangría, licores y cervezas bien frías",
};

/**
 * Portada de la carta: elige entre Comidas / Bebidas sin licor / Bebidas con
 * licor. Cada tarjeta es un enlace real a /menu/[slug] (indexable, compartible
 * y con navegación por historial), no un cambio de estado en cliente.
 */
export function MenuLanding() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-brown text-cream">
      {/* Ambiente: casa rosada arriba, jardín verde abajo (como el local). */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(231,154,156,0.20),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_118%,rgba(55,103,58,0.28),transparent_55%)]"
        aria-hidden="true"
      />
      <GardenDecor tone="dark" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-lg flex-col items-center justify-center px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <Logo tone="light" variant="stacked" className="h-24 sm:h-28" priority />
          <h1 className="eyebrow mt-6 text-guayaba-light">Nuestra carta</h1>
          <p className="mt-3 max-w-xs text-sm text-cream/65">
            Cocina antioqueña con sabor de casa. Elige y explora.
          </p>
        </motion.div>

        <nav aria-label="Categorías de la carta" className="mt-9 w-full space-y-4 sm:mt-11 sm:space-y-5">
          {menuData.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: reduce ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/menu/${cat.slug}`}
                aria-label={`Ver ${cat.label}`}
                className="group relative flex h-40 w-full overflow-hidden rounded-[1.7rem] text-left ring-1 ring-cream/12 shadow-[var(--shadow-card)] transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-[3px] active:scale-[0.985] sm:h-44"
              >
                <Image
                  src={cat.cover}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 92vw, 512px"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-brown/92 via-brown/68 to-brown/25 transition-colors duration-500 group-hover:from-brown/85"
                  aria-hidden="true"
                />

                <div className="relative flex w-full flex-col justify-center gap-2 py-6 pl-7 pr-16 sm:pl-8">
                  <span className="h-px w-8 bg-guayaba/80 transition-all duration-500 group-hover:w-12" aria-hidden="true" />
                  <span className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-cream [text-shadow:0_2px_16px_rgba(0,0,0,0.4)] sm:text-4xl">
                    {cat.labelLines.map((line, j) => (
                      <span key={j} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                  <span className="max-w-[16rem] text-xs leading-relaxed text-cream/70 sm:text-[0.8rem]">
                    {BLURBS[cat.key]}
                  </span>
                </div>

                <span
                  className="absolute right-5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-guayaba group-hover:bg-guayaba group-hover:text-brown"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <a
          href={links.whatsappOrder}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-guayaba px-6 py-3 text-sm font-semibold text-brown shadow-[0_14px_34px_-12px_rgba(231,154,156,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-guayaba-dark"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Pedir a domicilio
        </a>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de La Guayaba"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/40 hover:text-cream"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/40 hover:text-cream"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
