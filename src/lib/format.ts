// Les dates des articles sont des jours sans heure, lus en UTC minuit. Elles
// se formatent donc en UTC : construit à l'ouest de Greenwich, un article du
// 1er août afficherait sinon « July ».

/** Date d'un article, au format du site : « August 2026 ». */
export function monthYear(date: Date): string {
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Date ISO courte, pour l'attribut datetime et le JSON-LD : « 2026-08-14 ». */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
