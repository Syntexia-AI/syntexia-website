/* Pièces reproduites sur le site. Entièrement fictives : aucun client, aucun
   fournisseur réel, aucun montant réel. Le fournisseur et son NIF sont
   caviardés à l'affichage.

   Une seule source pour la facture, qui sert à la démonstration de l'accueil
   (InvoiceRun) et à la page security (Sheet). */

export interface DocumentRow {
  label: string;
  value: string;
  redacted?: boolean;
}

export interface SampleDocument {
  heading: string;
  rows: DocumentRow[];
  total?: DocumentRow;
}

/** Les lignes de marchandises de la facture, réutilisées par la
    démonstration. Leur somme fait bien le total : 184,50 + 96,20 + 41,75. */
export const INVOICE_LINES: DocumentRow[] = [
  { label: 'Bacalhau demolhado 5 kg', value: '184,50' },
  { label: 'Azeite virgem extra 5 L', value: '96,20' },
  { label: 'Batata nova 25 kg', value: '41,75' },
];

export const INVOICE: SampleDocument = {
  heading: 'FATURA FT 2026/0148',
  rows: [
    { label: 'Fornecedor', value: '', redacted: true },
    { label: 'NIF', value: '', redacted: true },
    ...INVOICE_LINES,
  ],
  total: { label: 'Total', value: '322,45' },
};

/** Numéro de commande porté par la facture, contre lequel la démonstration
    rapproche les lignes. */
export const INVOICE_ORDER = '4471';

export const BALANCE: SampleDocument = {
  heading: 'BALANCETE ANALÍTICO',
  rows: [
    { label: '21 Clientes', value: '418 902,11' },
    { label: '22 Fornecedores', value: '207 441,08' },
    { label: '31 Compras', value: '', redacted: true },
    { label: '63 Gastos com pessoal', value: '', redacted: true },
  ],
  total: { label: 'Diferença', value: '0,00' },
};

export const TIMESHEET: SampleDocument = {
  heading: 'FOLHA DE HORAS',
  rows: [
    { label: 'Trabalho de campo', value: '7,5 h' },
    { label: 'Revisão', value: '3,0 h' },
    { label: 'Arquivo', value: '1,5 h' },
  ],
};
