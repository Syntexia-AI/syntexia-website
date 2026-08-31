/* facts.ts
   Miroir exécutable de docs/FACTS-SITE.md et docs/CLAIMS.md.

   Règle de la passe : source ou suppression. Ce fichier rend la règle
   mécanique. Un fait à `null` n'est pas affiché, et le bloc qui le portait
   disparaît avec lui plutôt que de rendre un gabarit vide.

   Pour réactiver une affirmation il suffit de renseigner sa valeur ici, avec
   sa source, et de rebuilder. Les lignes de restauration exactes sont dans
   docs/REVIEW.md.

   AUCUNE valeur ne doit être renseignée sans source vérifiable de l'un des
   quatre types admis : le repo, FACTS-SITE.md en statut VÉRIFIÉ, une source
   publique tierce datée, ou le build lui-même. */

export interface SourcedFact<T> {
  value: T;
  source: string;
}

/** Fait non sourcé. Non rendu. */
export const NONE = null;

/* ------------------------------------------------------------------ */
/* Société                                                             */
/* ------------------------------------------------------------------ */

/** Mention légale du pied de page.
    SOURCÉ le 2026-08-31 sur le registre officiel Companies House :
    SYNTEXIA.AI LTD, statut Active, immatriculée le 11 novembre 2025.
    https://find-and-update.company-information.service.gov.uk/company/16847343
    Détail dans docs/SOURCES-P2.md. */
export const legalEntity: SourcedFact<string> = {
  value: 'Syntexia.AI Ltd. Registered in England and Wales, company number 16847343.',
  source:
    'Companies House, fiche 16847343, consultée le 2026-08-31, voir docs/SOURCES-P2.md',
};

/** URL de la fiche Companies House, rendue en lien sur la mention légale. */
export const companiesHouseUrl =
  'https://find-and-update.company-information.service.gov.uk/company/16847343';

/** URL LinkedIn de la société. Absente du repo au 2026-08-31. */
export const linkedinCompany: SourcedFact<string> | null = NONE;

/** Implantation. Le site se contredisait (Londres seul contre Londres et
    Lisbonne). Aucune formulation n'est sourcée, donc aucune n'est rendue. */
export const location: SourcedFact<string> | null = NONE;

/** Adresse de contact fonctionnelle. Publiée sur les six pages du site
    d'origine, rattachée à personne. */
export const contactEmail: SourcedFact<string> = {
  value: 'office@syntexia.ai',
  source: 'repo, src/sections.jsx:593 et les cinq pages statiques',
};

/** Standard téléphonique. Sourcé dans le repo, mais on ignore s'il est
    répondu. Question de revue ouverte, donc non rendu pour l'instant. */
export const phone: SourcedFact<string> | null = NONE;

/* ------------------------------------------------------------------ */
/* Partenariat                                                         */
/* ------------------------------------------------------------------ */

/** URL publique d'annonce du partenariat Anthropic. Sans elle, les huit
    mentions du réseau partenaire sortent du rendu.

    Recherche menée le 2026-08-31. Le programme existe bien sous ce nom
    (anthropic.com/news/claude-partner-network), mais l'annuaire officiel des
    partenaires (https://partnerhub.claude.com/directory/, 82 partenaires
    nommés au jour de la consultation) ne mentionne pas Syntexia, et aucune
    source tierce ne le fait. La seule affirmation trouvée provient du site
    de Syntexia lui-même, ce qui n'est pas une source recevable.

    Cela ne démontre pas l'absence de partenariat : un annuaire peut être
    partiel ou en retard. C'est pourquoi le statut est « non sourcé » et non
    « faux ». Question de revue ouverte, voir docs/REVIEW.md. */
export const partnerNetworkUrl: SourcedFact<string> | null = NONE;

/* ------------------------------------------------------------------ */
/* Déploiements et secteurs                                            */
/* ------------------------------------------------------------------ */

/** Nombre de déploiements en production. Alimentait « across five companies »
    et la mention d'illustration de la home. */
export const deploymentCount: SourcedFact<number> | null = NONE;

/** Totaux de la journée type. Les trois sont requis ensemble : si l'un
    manque, le bloc entier disparaît. Pas de « 000 », pas de zéro de
    remplissage. */
export const dayTotals: SourcedFact<{
  calls: string;
  documents: string;
  people: string;
}> | null = NONE;

/** Liste des secteurs. Conservée en liste nommée, sans compte, sans statut
    et sans chiffre, conformément à l'arbitrage. Les libellés et les
    descriptions viennent du bloc .d3 de design/syntexia-home-4da.html.
    Ce sont des descriptions de ce que le système fait, catégorie A. */
export const sectors: { name: string; blurb: string }[] = [
  {
    name: 'Audit and assurance',
    blurb:
      'Working papers, trial balances, timesheets. Checked against the source, with the reference kept.',
  },
  {
    name: 'Public sector',
    blurb: 'Intake, routing, drafting. Inside the case system you already run.',
  },
  {
    name: 'Financial services',
    blurb: "Cross-ledger answers on current data, not on last month's export.",
  },
  {
    name: 'Hospitality',
    blurb: 'Bookings by phone, supplier invoices, stock. In Portuguese, at any hour.',
  },
  {
    name: 'Retail',
    blurb: 'Orders, stock-outs, supplier chasing. Fewer calls to the office.',
  },
];

/* ------------------------------------------------------------------ */
/* Page security                                                       */
/* ------------------------------------------------------------------ */

/** Les quatre réponses contractuelles. Chacune n'est rendue que si sourcée.
    La page /security n'est liée depuis la navigation et le pied de page
    qu'à partir de trois entrées sourcées. */
export const contractAnswers: { title: string; body: string; source: string }[] = [
  {
    title: 'Cookies and trackers',
    body:
      'This website sets no cookies, loads no trackers and asks for no consent, because there is nothing to consent to.',
    source: 'build, vérifiable dans docs/RECETTE.md',
  },
  {
    title: 'Where the fonts come from',
    body:
      'Every font is served from this domain. The site makes no request to Google, to a CDN, or to any third party.',
    source: 'build, vérifiable dans docs/RECETTE.md',
  },
];

/** Nombre d'entrées sourcées requis pour lier /security depuis la navigation
    et le pied de page. */
export const SECURITY_LINK_THRESHOLD = 3;

export const securityIsLinked = contractAnswers.length >= SECURITY_LINK_THRESHOLD;
