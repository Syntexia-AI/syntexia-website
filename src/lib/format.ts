/** Date d'un article, au format du site : « August 2026 ». */
export function monthYear(date: Date): string {
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

/** Date ISO courte, pour l'attribut datetime et le JSON-LD : « 2026-08-14 ». */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
