/**
 * Une clases condicionales de forma segura sin dependencias externas.
 * Filtra valores falsy y colapsa espacios.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

/**
 * Normaliza texto para búsquedas: minúsculas y sin tildes/diacríticos.
 * Así "salmon" encuentra "salmón" y "cafe" encuentra "café".
 */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
