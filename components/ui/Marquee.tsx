import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Invierte el sentido del desplazamiento. */
  reverse?: boolean;
};

function Track({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <ul
      className="animate-marquee flex shrink-0 items-center gap-10 pr-10"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-guayaba">✦</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Cinta infinita con las palabras de la marca. Puro CSS (respeta
 * prefers-reduced-motion vía la regla global). Decorativa: se oculta a
 * lectores de pantalla y el contenido se duplica para un bucle sin costuras.
 */
export function Marquee({ items, className, reverse = false }: MarqueeProps) {
  return (
    <div
      className={cn("marquee-pause flex w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      <Track items={items} reverse={reverse} />
      <Track items={items} reverse={reverse} />
    </div>
  );
}
