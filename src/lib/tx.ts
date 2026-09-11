export type Locale = "vi" | "en" | "zh" | "es" | "id";

/** Pick the right string for the current locale, fall back to English. */
export function tx(
  locale: string,
  strings: { vi: string; en: string; zh: string; es: string; id: string },
): string {
  return (strings as Record<string, string>)[locale] ?? strings.en;
}
