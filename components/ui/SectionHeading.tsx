import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { LeafMark } from "@/components/ui/LeafMark";

type SectionHeadingProps = {
  /** Antetítulo corto en versalitas. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Color del antetítulo/detalle. Útil sobre fondos oscuros. */
  tone?: "dark" | "light";
  className?: string;
};

/** Encabezado de sección: antetítulo con motivo botánico + título display. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2.5",
              tone === "light" ? "text-guayaba-light" : "text-guayaba-deep"
            )}
          >
            <LeafMark className="h-4 w-4" />
            <span className="eyebrow">{eyebrow}</span>
            <span
              className={cn(
                "h-px w-8",
                tone === "light" ? "bg-guayaba-light/50" : "bg-guayaba/50"
              )}
              aria-hidden="true"
            />
          </span>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "font-display mt-5 text-[2.1rem] sm:text-5xl lg:text-[3.4rem]",
            tone === "light" ? "text-cream" : "text-brown"
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
              isCenter ? "mx-auto" : "",
              tone === "light" ? "text-cream/75" : "text-brown-soft/80"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
