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

/** URL LinkedIn de la société.
    Absente du repo, retrouvée et vérifiée le 2026-09-01 par requête directe :
    https://www.linkedin.com/company/syntexia-ai renvoie 200, titre de page
    « Syntexia.AI | LinkedIn », secteur Software Development. Le slug court
    /company/syntexia renvoie 404 et n'existe pas.
    Sa tagline y est déjà « Intelligence that lives in your ecosystem ». */
export const linkedinCompany: SourcedFact<string> = {
  value: 'https://www.linkedin.com/company/syntexia-ai',
  source: 'vérifié par requête directe le 2026-09-01, HTTP 200',
};

/** Implantation. Tranché par Karim le 2026-09-01 : « Working in Portugal is
    a strength in our market, no reason to hide it. » La société est
    immatriculée au Royaume-Uni, le travail se fait au Portugal. Les deux sont
    vrais et se disent séparément, ce qui lève la contradiction de l'ancien
    site entre « Londres » et « Londres et Lisbonne ». */
export const location: SourcedFact<string> = {
  value: 'Registered in the UK. The work happens in Portugal.',
  source: 'décision Karim, 2026-09-01, plus Companies House pour la partie UK',
};

/** Adresse de contact fonctionnelle. Publiée sur les six pages du site
    d'origine, rattachée à personne. */
export const contactEmail: SourcedFact<string> = {
  value: 'office@syntexia.ai',
  source: 'repo, src/sections.jsx:593 et les cinq pages statiques',
};

/** Standard téléphonique. Publié sur les six pages de l'ancien site, remis à
    la demande de Baptiste le 2026-09-01.
    La question « ce numéro est-il effectivement répondu » a été posée à Karim
    et n'a pas reçu de réponse. Elle reste ouverte dans docs/REVIEW.md : un
    numéro qui sonne dans le vide coûte plus cher qu'un numéro absent. */
export const phone: SourcedFact<{ display: string; dial: string }> = {
  value: { display: '+44 20 4620 4570', dial: '+442046204570' },
  source: 'repo, sections.jsx:597 et les cinq pages statiques',
};

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

/** Appartenance au réseau partenaire, sans URL publique.
 *
 *  Karim, le 2026-09-01 : « the partner directory is only for higher-tier
 *  companies and we're not at that tier yet, which is why you found nothing. »
 *  Cela explique le résultat de la recherche du 2026-08-31 et lève le doute :
 *  l'absence de l'annuaire n'était pas une absence de partenariat.
 *
 *  La source est donc une validation interne, pas une page publique. La
 *  mention est rendue, sobrement et sans lien, tant qu'aucune URL n'existe.
 *  Dès qu'une annonce publique sort, renseigner partnerNetworkUrl au dessus :
 *  la mention deviendra cliquable toute seule. */
export const partnerNetwork: SourcedFact<string> | null = {
  value: 'Member of the Anthropic Claude Partner Network.',
  source: 'validation Karim, 2026-09-01. Pas encore listé publiquement, tier inférieur.',
};

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

/** Les secteurs pour lesquels nous construisons.
 *
 *  Libellés et descriptions repris de l'ancien site, commit c887605,
 *  src/sections.jsx INDUSTRIES, validés par Karim.
 *
 *  DIFFÉRENCE IMPORTANTE AVEC L'ORIGINAL, à connaître avant de toucher au
 *  titre de la section qui les affiche.
 *
 *  L'ancien site les présentait sous « Live in real organisations, processing
 *  real operations, every day » et leur accolait des KPI (« −60 % », « ~70 % »,
 *  « Live »). Vérification du 2026-08-31 sur les treize dépôts : seuls l'audit
 *  et l'accueil téléphonique ont un déploiement. Une recherche sur
 *  l'organisation entière retourne zéro occurrence de « public sector »,
 *  « financial services », « banking » et « retail ».
 *
 *  Ces secteurs sont donc rendus comme ce qu'ils sont : les marchés pour
 *  lesquels le produit est construit. Ni statut, ni chiffre, ni « live ». Le
 *  titre de la section doit rester au futur ou au général, jamais au présent
 *  de constatation. Voir docs/FACTS-PRODUIT.md. */
export const sectors: { name: string; blurb: string }[] = [
  {
    name: 'Audit and assurance',
    blurb: 'Evidence-grade workpapers, client acceptance and anti-money-laundering checks. Methodical at machine speed.',
  },
  {
    name: 'Financial services',
    blurb: 'Cross-ledger answers, plain-language reports, decisions on current data.',
  },
  {
    name: 'Legal services',
    blurb:
      "Contract analysis, due diligence at scale, and the knowledge bench: the firm's own expertise made queryable.",
  },
  {
    name: 'Public sector',
    blurb: 'Triage incoming requests, route them across departments, draft the responses.',
  },
  {
    name: 'Retail and luxury',
    blurb: 'Customer foresight, inventory risk, trends caught before the peak.',
  },
  {
    name: 'Hospitality',
    blurb: 'Calls answered at any hour, bookings taken, supplier paperwork read overnight.',
  },
];

/* ------------------------------------------------------------------ */
/* Page security                                                       */
/* ------------------------------------------------------------------ */

/** Les quatre réponses contractuelles. Chacune n'est rendue que si sourcée.
    La page /security n'est liée depuis la navigation et le pied de page
    qu'à partir de trois entrées sourcées. */
export const contractAnswers: { title: string; body: string; source: string }[] = [
  // Les trois premières viennent de l'architecture réelle des plateformes,
  // lue dans les dépôts le 2026-08-31. Voir docs/FACTS-PRODUIT.md. Ce sont des
  // contraintes de conception, pas des intentions commerciales.
  {
    title: 'Who decides',
    body:
      'The agent prepares the file. The auditor validates it. Nothing is written back into your audit software by us, and no conclusion is reached without a person signing it.',
    source: 'architecture des plateformes, README kreston-intelligence, 2026-08-31',
  },
  {
    title: 'Who else touches your data',
    body:
      'Nobody. Each firm gets its own deployment, with its own rules and its own templates. We reuse the architecture between clients. We never reuse the data.',
    source: 'architecture des plateformes, README ctng-intelligence, 2026-08-31',
  },
  {
    title: 'Where your files live',
    body:
      'Inside your deployment, and nowhere else. Client files are excluded from our source control from the first commit and stay read-only. We do not keep a copy to train on, or to demonstrate with.',
    source: 'politique de données des dépôts produits, 2026-08-31',
  },
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

/** Métriques des quatre piliers. L'ancien site en affichait douze, dont
 *  « ~70 % », « 60 % », « ~80 % » et « 3 vers 1 », aucune sourcée. Le wording
 *  des piliers est validé, les chiffres ne le sont pas : ils reviennent dès
 *  qu'une source existe, pilier par pilier, sans toucher au composant.
 *
 *  Exemple de ce qu'il faut écrire pour rallumer un bloc :
 *    lives: [{ value: '~70%', label: 'Requests handled without a person',
 *              source: 'mesure client X, mars 2026' }]
 */
export const pillarMetrics: Record<string, { value: string; label: string }[]> = {
  // lives: [],
  // communicates: [],
  // acts: [],
  // shows: [],
};

/** Nombre d'entrées sourcées requis pour lier /security depuis la navigation
    et le pied de page. */
export const SECURITY_LINK_THRESHOLD = 3;

export const securityIsLinked = contractAnswers.length >= SECURITY_LINK_THRESHOLD;
