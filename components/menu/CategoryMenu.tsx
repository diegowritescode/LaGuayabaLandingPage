"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search, X, Star, Leaf, SearchX } from "lucide-react";
import type { MenuCategory, Dish, MenuPrice } from "@/lib/menu";
import { cop } from "@/lib/menu";
import { cn, normalizeText } from "@/lib/utils";
import { LeafMark } from "@/components/ui/LeafMark";
import { GardenDecor, PalmFrond } from "@/components/ui/Botanical";

export function CategoryMenu({ category }: { category: MenuCategory }) {
  const [query, setQuery] = useState("");
  const [activeSub, setActiveSub] = useState(category.subcategories[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const q = normalizeText(query);
  const searching = q.length > 0;

  const filtered = useMemo(() => {
    if (!searching) return category.subcategories;
    return category.subcategories
      .map((sub) => ({
        ...sub,
        dishes: sub.dishes.filter((d) =>
          normalizeText(`${d.name} ${d.description ?? ""}`).includes(q)
        ),
      }))
      .filter((sub) => sub.dishes.length > 0);
  }, [category, q, searching]);

  const totalResults = filtered.reduce((n, s) => n + s.dishes.length, 0);

  useEffect(() => {
    if (searching) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.getAttribute("data-sub");
        if (id) setActiveSub(id);
      },
      { rootMargin: "-220px 0px -60% 0px", threshold: 0 }
    );
    const els = Object.values(sectionRefs.current).filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [category, searching]);

  const scrollToSub = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    setActiveSub(id);
    const barH = barRef.current?.offsetHeight ?? 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = el.getBoundingClientRect().top + window.scrollY - 60 - barH - 20;
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-cream text-brown"
    >
      {/* Cabecera compacta oscura (da contraste al navbar transparente) */}
      <header className="relative overflow-hidden bg-brown pt-28 pb-12 text-cream">
        <Image
          src={category.cover}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/75 via-brown/80 to-brown" />
        {/* Palmas que enmarcan la cabecera — evocan los muros verdes del local. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-12 -top-8 h-52 w-44 rotate-[128deg] text-leaf opacity-30 blur-[1px] sm:h-60 sm:w-52">
            <PalmFrond className="h-full w-full" />
          </div>
          <div className="absolute -right-12 -top-8 h-52 w-44 -scale-x-100 rotate-[128deg] text-leaf opacity-30 blur-[1px] sm:h-60 sm:w-52">
            <PalmFrond className="h-full w-full" />
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:px-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-sm font-medium text-cream/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/45 hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" />
            Todas las categorías
          </Link>
          <h1 className="font-display mt-5 text-4xl text-cream sm:text-5xl lg:text-6xl">
            {category.label}
          </h1>
          {category.intro && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/75 sm:text-base">
              {category.intro}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-cream/70">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-guayaba-light text-guayaba-light" /> Insignia de la casa
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Leaf className="h-3.5 w-3.5 text-leaf" /> Vegetariano
            </span>
          </div>
        </div>
      </header>

      {/* Barra pegajosa: búsqueda + subcategorías */}
      <div
        ref={barRef}
        className="sticky top-[3.75rem] z-30 border-b border-brown/10 bg-cream/95 backdrop-blur-xl"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brown-soft/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Busca en ${category.label.toLowerCase()}…`}
              aria-label={`Buscar en ${category.label}`}
              className="w-full rounded-full border border-brown/12 bg-white/70 py-3 pl-12 pr-11 text-sm text-brown outline-none transition-colors placeholder:text-brown-soft/55 focus:border-guayaba focus:ring-2 focus:ring-guayaba/25"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Borrar búsqueda"
                className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brown-soft/60 transition-colors hover:bg-brown/5 hover:text-brown"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {!searching && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => scrollToSub(sub.id)}
                  aria-current={activeSub === sub.id}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    activeSub === sub.id
                      ? "bg-brown text-cream shadow-[0_8px_20px_-8px_rgba(74,45,39,0.5)]"
                      : "bg-white/70 text-brown-soft ring-1 ring-brown/10 hover:bg-guayaba-light/30 hover:text-guayaba-deep"
                  )}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cuerpo de la carta */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
        {/* Jardín botánico de fondo — la personalidad verde del restaurante. */}
        <GardenDecor tone="light" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:px-8">
          {searching && totalResults === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brown/15 bg-white/40 py-20 text-center">
              <SearchX className="h-12 w-12 text-guayaba" />
              <p className="mt-4 text-lg text-brown">Sin resultados</p>
              <p className="mt-2 max-w-sm text-sm text-brown-soft/80">
                No encontramos platos para “{query}”. Prueba con otra palabra.
              </p>
            </div>
          ) : (
            <div className="space-y-14">
              {searching && (
                <p className="text-sm text-brown-soft/80">
                  {totalResults} resultado{totalResults === 1 ? "" : "s"} para “{query}”
                </p>
              )}
              {filtered.map((sub) => (
                <section
                  key={sub.id}
                  data-sub={sub.id}
                  ref={(el) => {
                    sectionRefs.current[sub.id] = el;
                  }}
                  aria-labelledby={`sub-${sub.id}`}
                  className="scroll-mt-40"
                >
                  <div className="flex items-center gap-3 border-b border-brown/12 pb-4">
                    <LeafMark className="h-5 w-5 text-guayaba-deep" />
                    <div>
                      <h2 id={`sub-${sub.id}`} className="font-display text-2xl text-brown sm:text-3xl">
                        {sub.name}
                      </h2>
                      {sub.note && (
                        <p className="mt-1 max-w-2xl text-sm text-brown-soft/85">{sub.note}</p>
                      )}
                    </div>
                  </div>

                  <ul className="mt-7 grid gap-x-12 gap-y-7 lg:grid-cols-2">
                    {sub.dishes.map((dish, i) => (
                      <DishRow key={`${dish.name}-${i}`} dish={dish} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PricePill({ price }: { price: MenuPrice }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-full bg-guayaba-light/40 px-3 py-1">
      {price.label && (
        <span className="text-[0.68rem] font-medium uppercase tracking-wide text-brown-soft/80">
          {price.label}
        </span>
      )}
      <span className="font-serif text-sm font-semibold text-guayaba-deep">
        {cop(price.value)}
      </span>
    </span>
  );
}

function DishRow({ dish }: { dish: Dish }) {
  const single = dish.prices.length === 1;

  return (
    <li>
      <div className="flex items-baseline gap-2.5">
        <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 font-serif text-lg font-semibold leading-snug text-brown">
          {dish.name}
          {dish.tags?.includes("insignia") && (
            <Star className="h-4 w-4 shrink-0 fill-guayaba text-guayaba" aria-label="Insignia de la casa" />
          )}
          {dish.tags?.includes("vegetariano") && (
            <Leaf className="h-4 w-4 shrink-0 text-leaf" aria-label="Vegetariano" />
          )}
        </h3>
        {single && (
          <>
            <span
              className="mx-1 mb-1.5 hidden h-px flex-1 self-end border-b border-dotted border-brown/25 sm:block"
              aria-hidden="true"
            />
            <span className="ml-auto shrink-0 font-serif text-lg font-semibold text-guayaba-deep sm:ml-0">
              {cop(dish.prices[0].value)}
            </span>
          </>
        )}
      </div>

      {dish.note && (
        <span className="mt-1.5 inline-block rounded-full bg-guayaba-light/45 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-guayaba-deep">
          {dish.note}
        </span>
      )}

      {dish.description && (
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-brown-soft/85">
          {dish.description}
        </p>
      )}

      {!single && (
        <div className="mt-3 flex flex-wrap gap-2">
          {dish.prices.map((p, i) => (
            <PricePill key={i} price={p} />
          ))}
        </div>
      )}
    </li>
  );
}
