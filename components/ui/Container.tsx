import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Ancho máximo del contenido. */
  size?: "default" | "wide" | "narrow";
  as?: "div" | "section" | "header" | "footer" | "article";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

/** Contenedor responsive con padding lateral consistente en todo el sitio. */
export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)}
    >
      {children}
    </Tag>
  );
}
