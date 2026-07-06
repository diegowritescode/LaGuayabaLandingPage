"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import { menuData, type MenuCategory } from "@/lib/menu";
import { links } from "@/lib/site-config";
import { Logo } from "@/components/layout/Logo";
import { CategoryMenu } from "@/components/menu/CategoryMenu";
import { GardenDecor } from "@/components/ui/Botanical";

/** Qué encontrará el comensal dentro de cada categoría (guía rápida). */
const BLURBS: Record<string, string> = {
  comidas: "Típicos, parrilla, del mar, para compartir y postres",
  "sin-licor": "Jugos naturales, limonadas, sodas y refrescos",
  "con-licor": "Cócteles, sangría, licores y cervezas bien frías",
};

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

export function MenuExperience() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const active = menuData.find((c) => c.key === activeKey) ?? null;

  const openCategory = (key: string) => {
    setActiveKey(key);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {active ? (
        <CategoryMenu key={active.key} category={active} onBack={() => setActiveKey(null)} />
      ) : (
        <Landing key="landing" onOpen={openCategory} reduce={!!reduce} />
      )}
    </AnimatePresence>
  );
}

function Landing({
  onOpen,
  reduce,
}: {
  onOpen: (key: string) => void;
  reduce: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="relative min-h-[100svh] overflow-hidden bg-brown text-cream"
    >
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
      {/* Follaje que enmarca la entrada. */}
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

        <div className="mt-9 w-full space-y-4 sm:mt-11 sm:space-y-5">
          {menuData.map((cat, i) => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              onClick={() => onOpen(cat.key)}
              delay={0.15 + i * 0.09}
              reduce={reduce}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex items-center gap-4"
        >
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
            <WhatsAppGlyph className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

function CategoryCard({
  cat,
  onClick,
  delay,
  reduce,
}: {
  cat: MenuCategory;
  onClick: () => void;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={{ scale: 0.985 }}
      className="group relative flex h-40 w-full overflow-hidden rounded-[1.7rem] text-left ring-1 ring-cream/12 shadow-[var(--shadow-card)] sm:h-44"
      aria-label={`Ver ${cat.label}`}
    >
      <Image
        src={cat.cover}
        alt=""
        fill
        sizes="(max-width: 640px) 92vw, 512px"
        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-105"
      />
      {/* Degradado desde la izquierda: mantiene legible el texto sobre la foto. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brown/92 via-brown/68 to-brown/25 transition-colors duration-500 group-hover:from-brown/85"
        aria-hidden="true"
      />

      <div className="relative flex w-full flex-col justify-center gap-2 py-6 pl-7 pr-16 sm:pl-8">
        <span className="h-px w-8 bg-guayaba/80 transition-all duration-500 group-hover:w-12" aria-hidden="true" />
        <span className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-cream [text-shadow:0_2px_16px_rgba(0,0,0,0.4)] sm:text-4xl">
          {cat.labelLines.map((line, i) => (
            <span key={i} className="block">
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
    </motion.button>
  );
}
