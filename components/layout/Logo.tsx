import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "horizontal" | "stacked" | "mark";

type LogoProps = {
  /** "dark" = sobre fondo claro (emblema café); "light" = sobre fondo oscuro (emblema crema). */
  tone?: "dark" | "light";
  /** Composición del logo. */
  variant?: LogoVariant;
  /** Atajo equivalente a variant="mark" (compatibilidad). */
  markOnly?: boolean;
  /** Alto en clases de Tailwind (p. ej. "h-11"); el ancho se ajusta solo. */
  className?: string;
  priority?: boolean;
};

/** Proporciones reales de cada lockup (para reservar espacio y evitar CLS). */
const DIMS: Record<LogoVariant, { w: number; h: number; sizes: string }> = {
  horizontal: { w: 820, h: 332, sizes: "220px" },
  stacked: { w: 600, h: 519, sizes: "200px" },
  mark: { w: 419, h: 512, sizes: "56px" },
};

/**
 * Logo oficial de La Guayaba (emblema modernizado monocromo).
 * Se sirve como PNG transparente en dos colores —café para fondos claros y
 * crema para fondos oscuros— según el `tone`. Un solo diseño, adaptable.
 */
export function Logo({
  tone = "dark",
  variant = "horizontal",
  markOnly = false,
  className,
  priority = false,
}: LogoProps) {
  const v: LogoVariant = markOnly ? "mark" : variant;
  const color = tone === "light" ? "cream" : "brown";
  const { w, h, sizes } = DIMS[v];

  return (
    <Image
      src={`/images/logo-${v}-${color}.png`}
      alt="La Guayaba Restaurante · Bar"
      width={w}
      height={h}
      priority={priority}
      sizes={sizes}
      className={cn("w-auto max-w-full object-contain", className)}
    />
  );
}
