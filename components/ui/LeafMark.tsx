import { cn } from "@/lib/utils";

/**
 * Ramita de guayaba — motivo botánico de la marca (INFO: "hojas de guayaba").
 * Se usa como acento en antetítulos y separadores para dar identidad propia.
 */
export function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      fill="none"
      aria-hidden="true"
    >
      {/* Tallo */}
      <path
        d="M16 30c0-7 0-13 0-22"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Hoja izquierda */}
      <path
        d="M16 15c-1.7-4.6-5.6-6.4-9.8-6.2.3 4.7 3.4 8 9.8 8.1Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M16 16.9C12.4 14.8 9 12.3 7 9.4"
        stroke="var(--color-cream)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Hoja derecha */}
      <path
        d="M16 10.5c1.5-3.9 4.8-5.4 8.4-5.2-.2 4-2.9 6.8-8.4 6.9Z"
        fill="currentColor"
        opacity="0.72"
      />
      <path
        d="M16 12.1C18.9 10.3 21.6 8.4 23.2 6.2"
        stroke="var(--color-cream)"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
