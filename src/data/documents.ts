/* Pièces et écrans reproduits sur le site. Entièrement fictifs : aucun
   client, aucun fournisseur réel, aucun montant, aucune quantité réels. Les
   fournisseurs et leurs numéros fiscaux sont caviardés à l'affichage.

   Depuis le 2026-10-09, la démonstration des achats suit les mêmes trois
   articles d'un bout à l'autre : commandés à partir de la prévision
   (étape 1), achetés au prix convenu (étape 2), facturés en portugais
   (étape 3, InvoiceRun), rapprochés pour la clôture (étape 4). L'huile
   d'olive est la ligne qui accroche : facturée 96,20 pour un prix convenu de
   92,40.

   Les pièces gardent la langue et les conventions de leur pays (virgule
   décimale). Les écrans de Syntexia sont en anglais, montants en euros à
   l'anglaise : c'est tout le propos, n'importe quelle langue en entrée, un
   seul écran en sortie. */

export interface DocumentRow {
  label: string;
  value: string;
  redacted?: boolean;
  /** Ligne signalée : elle porte la marque de signalement, pas la coche. */
  flagged?: boolean;
}

export interface SampleDocument {
  heading: string;
  /** Langue de la pièce, pour les lecteurs d'écran (attribut lang). */
  lang: string;
  rows: DocumentRow[];
  total?: DocumentRow;
}

/* ------------------------------------------------------------------ */
/* Les trois articles suivis d'une étape à l'autre                     */
/* ------------------------------------------------------------------ */

/** Nom au catalogue (anglais), nom court pour les vignettes des étapes 1 et
    4, ligne telle qu'imprimée sur la facture portugaise, et montants des
    deux côtés. */
export interface TrackedLine {
  en: string;
  short: string;
  printed: string;
  printedValue: string;
  value: string;
}

/** Leur somme fait bien le total : 184,50 + 96,20 + 41,75 = 322,45. */
export const LINES: TrackedLine[] = [
  {
    en: 'Salt cod, desalted, 5 kg',
    short: 'Salt cod',
    printed: 'Bacalhau demolhado 5 kg',
    printedValue: '184,50',
    value: '€184.50',
  },
  {
    en: 'Extra virgin olive oil, 5 L',
    short: 'Olive oil',
    printed: 'Azeite virgem extra 5 L',
    printedValue: '96,20',
    value: '€96.20',
  },
  {
    en: 'New potatoes, 25 kg',
    short: 'Potatoes',
    printed: 'Batata nova 25 kg',
    printedValue: '41,75',
    value: '€41.75',
  },
];

/** La ligne qui accroche, aux étapes 2, 3 et 4. */
export const FLAGGED = 1;

/** Le prix convenu pour l'huile, celui de l'étape 2. Écart avec la facture :
    (96,20 - 92,40) / 92,40 = 4,1 %. */
export const AGREED_PRICE = '€92.40';
export const INVOICED_PRICE = '€96.20';
export const PRICE_GAP = '4.1%';

/** Numéros communs aux étapes. */
export const ORDER_REF = '4471';
export const DELIVERY_REF = 'GR 3307';
export const INVOICE_REF = 'FT 2026/0148';
export const INVOICE_TOTAL = '€322.45';

/* ------------------------------------------------------------------ */
/* Étape 1 : la commande tirée de la prévision                         */
/* ------------------------------------------------------------------ */

/** Ce que le site prévoit d'utiliser, ce qu'il a, ce qui est proposé. La
    facture ne montre que des montants de ligne ; les quantités commandées
    (3, 1, 1) ne sont qu'à l'étape 1. */
export const ORDER_DRAFT = {
  heading: 'Suggested order',
  when: 'Thursday delivery',
  rows: [
    { short: LINES[0].short, expected: 4, stock: 1, order: 3 },
    { short: LINES[1].short, expected: 2, stock: 1, order: 1 },
    { short: LINES[2].short, expected: 2, stock: 1, order: 1 },
  ],
};

/* ------------------------------------------------------------------ */
/* Étape 2 : un seul meilleur prix pour tous les sites                 */
/* ------------------------------------------------------------------ */

export const PRICE_CHECK = {
  item: LINES[FLAGGED].en,
  offers: [
    { supplier: 'Supplier A', price: '€94.10', agreed: false },
    { supplier: 'Supplier B', price: AGREED_PRICE, agreed: true },
    { supplier: 'Supplier C', price: '€97.80', agreed: false },
  ],
};

/* ------------------------------------------------------------------ */
/* Étape 3 : la facture, en quatre langues et quatre formats           */
/* ------------------------------------------------------------------ */

/** La facture lue dans la démonstration, telle qu'imprimée. */
export const INVOICE: SampleDocument = {
  heading: `FATURA ${INVOICE_REF}`,
  lang: 'pt-PT',
  rows: [
    { label: 'Fornecedor', value: '', redacted: true },
    { label: 'NIF', value: '', redacted: true },
    { label: 'Encomenda', value: ORDER_REF },
    ...LINES.map((l, i) => ({ label: l.printed, value: l.printedValue, flagged: i === FLAGGED })),
  ],
  total: { label: 'Total', value: '322,45' },
};

/** La boîte de réception : une langue et un format par pièce. Les en-têtes
    sont ceux qu'on lit sur les feuilles de l'étape 3. */
export const INBOX = [
  { ref: INVOICE_REF, head: `FATURA ${INVOICE_REF}`, lang: 'pt-PT', language: 'Portuguese', format: 'PDF', current: true },
  { ref: 'F-2026-0311', head: 'FACTURA F-2026-0311', lang: 'es-ES', language: 'Spanish', format: 'Scan', current: false },
  { ref: 'FA-2026-0412', head: 'FACTURE FA-2026-0412', lang: 'fr-FR', language: 'French', format: 'Photo', current: false },
  { ref: 'INV-88412', head: 'INVOICE INV-88412', lang: 'en', language: 'English', format: 'E-invoice', current: false },
];

/* ------------------------------------------------------------------ */
/* Étape 4 : le rapprochement, matière de la clôture                   */
/* ------------------------------------------------------------------ */

/** Commande, livraison, facture, ligne à ligne. L'huile attend une
    validation, comme à la fin de la démonstration de l'étape 3. */
export const MATCH = {
  rows: LINES.map((l, i) => ({ short: l.short, flagged: i === FLAGGED })),
};

/* ------------------------------------------------------------------ */
/* Page security : une pièce par langue, et un appel                   */
/* ------------------------------------------------------------------ */

export const FACTURA_ES: SampleDocument = {
  heading: 'FACTURA F-2026-0311',
  lang: 'es-ES',
  rows: [
    { label: 'Proveedor', value: '', redacted: true },
    { label: 'NIF', value: '', redacted: true },
    { label: 'Aceite de oliva virgen extra 5 L', value: '92,40' },
    { label: 'Harina de trigo 25 kg', value: '18,60' },
  ],
  total: { label: 'Total', value: '111,00' },
};

export const LIVRAISON_FR: SampleDocument = {
  heading: 'BON DE LIVRAISON BL-0577',
  lang: 'fr-FR',
  rows: [
    { label: 'Fournisseur', value: '', redacted: true },
    { label: 'Beurre doux 5 kg', value: '4' },
    { label: 'Crème entière 1 L', value: '12' },
    { label: 'Commande', value: '5102' },
  ],
};

/** Le résumé de l'appel de la démonstration voix (CallTranscript) : mêmes
    actions, même ticket. */
export const CALL_SUMMARY: SampleDocument = {
  heading: 'CALL SUMMARY',
  lang: 'en',
  rows: [
    { label: 'Caller', value: '', redacted: true },
    { label: 'Identity', value: 'Confirmed' },
    { label: 'Account', value: 'Unlocked' },
    { label: 'Ticket', value: 'HD-20418' },
  ],
};
