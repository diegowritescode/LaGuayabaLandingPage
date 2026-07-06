"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, links, contact } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // Solo estas rutas tienen una foto oscura a pantalla completa arriba, donde
  // el navbar puede ir transparente con texto claro. En el resto (404, futuras
  // páginas claras) el navbar va siempre sólido para mantener el contraste.
  const overDarkHero = pathname === "/" || pathname === "/menu";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // La barra es "sólida" al hacer scroll, con el menú abierto, o en rutas sin
  // hero oscuro (para no perder contraste sobre fondos claros).
  const solid = scrolled || open || !overDarkHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-soft)]",
        solid
          ? "border-b border-brown/5 bg-cream/85 py-2.5 shadow-[0_8px_30px_-16px_rgba(74,45,39,0.3)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-4"
      )}
    >
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
        aria-label="Navegación principal"
      >
        <Link
          href="/#inicio"
          className="rounded-lg transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => setOpen(false)}
        >
          <Logo tone={solid ? "dark" : "light"} className="h-11 sm:h-12" priority />
        </Link>

        {/* Enlaces de escritorio */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  solid
                    ? "text-brown-soft hover:text-guayaba-deep"
                    : "text-cream/90 hover:text-white"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-x-100",
                    solid ? "bg-guayaba" : "bg-cream"
                  )}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href={links.whatsappReservation}
            size="sm"
            variant={solid ? "primary" : "light"}
          >
            Reservar
          </Button>
        </div>

        {/* Botón de menú móvil */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            solid
              ? "text-brown hover:bg-brown/5"
              : "text-cream hover:bg-white/10"
          )}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mx-4 mb-3 mt-3 rounded-3xl border border-brown/10 bg-cream p-4 shadow-[var(--shadow-card)]">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.05 + i * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-serif text-lg text-brown transition-colors hover:bg-guayaba-light/30"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-3 flex flex-col gap-2 border-t border-brown/10 pt-4">
                <Button href={links.whatsappReservation} size="md" className="w-full">
                  Reservar por WhatsApp
                </Button>
                <a
                  href={links.phone}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-brown-soft transition-colors hover:text-guayaba-deep"
                >
                  <Phone className="h-4 w-4" />
                  {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
