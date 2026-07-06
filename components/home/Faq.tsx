import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content";
import { faqSchema } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFoliage } from "@/components/ui/Botanical";
import { JsonLd } from "@/components/shared/JsonLd";

/**
 * Preguntas frecuentes. Acordeón nativo <details>/<summary>: accesible por
 * teclado, sin JavaScript (0 coste de INP) y con contenido siempre presente en
 * el HTML — útil para el usuario y para el SEO local. Emite FAQPage (schema.org).
 */
export function Faq() {
  return (
    <section id="faq" className="faq relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <SectionFoliage tone="light" variant="right" />

      <Container size="default" className="relative">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
          description="Lo que más nos preguntan antes de visitarnos o celebrar con nosotros."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-brown/10 rounded-3xl border border-brown/10 bg-white/60 px-6 shadow-[var(--shadow-soft)] sm:px-8">
          {faqs.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-lg font-semibold text-brown transition-colors hover:text-guayaba-deep">
                {f.question}
                <ChevronDown
                  className="faq-chevron h-5 w-5 shrink-0 text-guayaba-deep transition-transform duration-300"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brown-soft/85 sm:text-base">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>

      <JsonLd data={faqSchema([...faqs])} />
    </section>
  );
}
