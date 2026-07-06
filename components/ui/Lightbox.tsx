"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxItem = {
  src: string;
  alt: string;
  /** Salta la optimización de next/image (útil para imágenes generadas). */
  unoptimized?: boolean;
};

type LightboxProps = {
  items: LightboxItem[];
  /** Índice activo, o null si está cerrado. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Visor a pantalla completa reutilizable (galería principal y de eventos).
 * Navegación por teclado (← → Esc), bloqueo de scroll y cierre por backdrop.
 */
export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const isOpen = index !== null;

  const next = useCallback(() => {
    if (index !== null) onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index !== null) onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, next, prev]);

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brown/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Anterior"
            className="absolute left-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Siguiente"
            className="absolute right-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-4 h-[72vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[index].src}
              alt={items[index].alt}
              fill
              unoptimized={items[index].unoptimized}
              sizes="90vw"
              className="rounded-2xl object-contain"
            />
          </motion.div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-brown/60 px-4 py-1.5 text-center text-sm text-cream/80">
            {items[index].alt} · {index + 1} / {items.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
