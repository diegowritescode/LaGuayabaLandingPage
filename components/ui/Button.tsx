import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "light";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Icono opcional a la derecha (componente de lucide-react). */
  icon?: React.ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  /** Fuerza destino externo (nueva pestaña). Se detecta solo para http/tel/mailto. */
  external?: boolean;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300 ease-[var(--ease-out-soft)] will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Texto marrón sobre rosa guayaba: 5.6:1 (AA) manteniendo el color de marca.
  primary:
    "bg-guayaba text-brown shadow-[0_12px_30px_-10px_rgba(168,79,90,0.55)] hover:bg-guayaba-dark hover:shadow-[0_16px_40px_-12px_rgba(168,79,90,0.65)] hover:-translate-y-0.5 focus-visible:outline-guayaba-deep",
  secondary:
    "bg-forest text-cream shadow-[0_12px_30px_-12px_rgba(43,83,48,0.7)] hover:bg-forest-deep hover:-translate-y-0.5 focus-visible:outline-forest",
  outline:
    "border border-brown/25 bg-transparent text-brown hover:border-brown/50 hover:bg-brown/5 focus-visible:outline-brown",
  light:
    "border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base",
};

function Content({ children, icon }: Pick<BaseProps, "children" | "icon">) {
  return (
    <>
      {/* Destello que barre al pasar el cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[850ms] ease-[var(--ease-out-soft)] group-hover:translate-x-[130%]"
      />
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 inline-flex transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );
}

/** Botón/enlace de marca con microinteracciones sutiles (hover, elevación). */
export function Button(props: ButtonProps) {
  const classes = cn(
    base,
    variants[props.variant ?? "primary"],
    sizes[props.size ?? "md"],
    props.className
  );

  if (props.href !== undefined) {
    const { href, external, children, icon } = props;
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
    const isHttp = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target={isHttp ? "_blank" : undefined}
          rel={isHttp ? "noopener noreferrer" : undefined}
          className={classes}
        >
          <Content icon={icon}>{children}</Content>
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        <Content icon={icon}>{children}</Content>
      </Link>
    );
  }

  const { children, icon, variant, size, className, ...rest } = props;
  void variant;
  void size;
  void className;
  return (
    <button className={classes} {...rest}>
      <Content icon={icon}>{children}</Content>
    </button>
  );
}
