"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/shared/icons";

export function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);

  // Aparece con un pequeño retraso para no competir con el hero.
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="group fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)] sm:bottom-6 sm:right-6"
        >
          {/* Anillo de pulso */}
          <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] motion-safe:animate-ping motion-safe:[animation-duration:2.5s]" aria-hidden="true" />
          <WhatsAppIcon className="h-7 w-7" />
          <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-brown px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 max-sm:hidden">
            ¿Reservamos tu mesa?
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
