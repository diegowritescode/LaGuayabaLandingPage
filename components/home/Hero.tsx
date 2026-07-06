"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { images } from "@/lib/images";
import { siteConfig, links } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { SectionFoliage } from "@/components/ui/Botanical";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
  };
  // Revelado con máscara: la línea sube desde abajo dentro de un recorte.
  const line: Variants = {
    hidden: { y: reduce ? 0 : "115%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Fotografía de fondo: parallax + zoom Ken Burns */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20 h-[122%]">
        <Image
          src={images.hero}
          alt="Mesa servida con platos tradicionales de La Guayaba"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
      </motion.div>

      {/* Overlays cálidos para legibilidad */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brown/95 via-brown/55 to-brown/75"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_50%_25%,transparent_28%,rgba(74,45,39,0.6)_100%)]"
        aria-hidden="true"
      />

      {/* Follaje que asoma sobre la entrada (como la vegetación del local) */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        <SectionFoliage tone="dark" variant="top" />
      </div>

      {/* Marco de esquinas (detalle editorial) */}
      <div className="pointer-events-none absolute inset-4 z-10 hidden sm:block md:inset-6">
        <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-cream/25" />
        <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-cream/25" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-cream/25" />
        <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-cream/25" />
      </div>

      {/* Etiqueta vertical */}
      <motion.span
        variants={fade}
        initial="hidden"
        animate="visible"
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-cream/50 lg:block"
      >
        Medellín · Colombia
      </motion.span>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:px-10"
      >
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.span
            variants={fade}
            className="eyebrow inline-flex items-center gap-3 text-guayaba-light"
          >
            <span className="h-px w-10 bg-guayaba-light/60" aria-hidden="true" />
            {siteConfig.tagline}
          </motion.span>

          <h1
            className="font-display mt-6 text-cream"
            aria-label={siteConfig.heroHeadline}
          >
            <span className="block overflow-hidden py-[0.06em]">
              <motion.span
                variants={line}
                className="block text-[3rem] leading-[0.95] sm:text-[5rem] lg:text-[6.6rem]"
              >
                La <span className="accent text-guayaba-light">tradición</span>{" "}
                colombiana
              </motion.span>
            </span>
            <span className="block overflow-hidden py-[0.06em]">
              <motion.span
                variants={line}
                className="block text-[3rem] leading-[0.95] sm:text-[5rem] lg:text-[6.6rem]"
              >
                servida desde{" "}
                <span className="text-guayaba-light">1999</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            className="mt-7 max-w-lg text-lg leading-relaxed text-cream/85 sm:text-xl"
          >
            Cocina típica antioqueña y colombiana hecha con amor, en el corazón
            de Medellín. Un lugar para reunir a la familia alrededor de la mesa.
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={links.whatsappReservation}
              size="lg"
              variant="primary"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Reservar mesa
            </Button>
            <Button
              href="/menu"
              size="lg"
              variant="light"
              icon={<UtensilsCrossed className="h-5 w-5" />}
            >
              Ver carta
            </Button>
          </motion.div>

          {/* Fila de metadatos editorial */}
          <motion.ul
            variants={fade}
            className="mt-12 hidden max-w-2xl items-center gap-6 border-t border-cream/15 pt-6 text-sm text-cream/70 sm:flex"
          >
            <li className="font-serif text-lg italic text-cream/90">
              Cocina antioqueña
            </li>
            <li className="h-4 w-px bg-cream/20" aria-hidden="true" />
            <li>Av. Guayabal · Medellín</li>
            <li className="h-4 w-px bg-cream/20" aria-hidden="true" />
            <li>Restaurante · Bar</li>
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#historia"
        aria-label="Desliza para ver más"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="group absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-cream/60 transition-colors hover:text-cream sm:flex"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em]">
          Desliza
        </span>
        <span className="relative flex h-9 w-[1.35rem] justify-center rounded-full border border-cream/40 pt-1.5">
          <motion.span
            animate={reduce ? undefined : { y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-cream/80"
          />
        </span>
      </motion.a>
    </section>
  );
}
