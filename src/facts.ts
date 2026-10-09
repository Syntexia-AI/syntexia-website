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

/** Implantation. Révisé par Karim le 2026-10-02 : la société veut être vue
    comme européenne, pas seulement portugaise (Malte peut suivre, puis le
    Royaume-Uni). Formulation retenue, la sienne : « A UK company working with
    organisations across Europe ». La décision précédente suit, pour mémoire.

    Tranché par Karim le 2026-09-01 : « Working in Portugal is
    a strength in our market, no reason to hide it. » La société est
    immatriculée au Royaume-Uni, le travail se fait au Portugal. Les deux sont
    vrais et se disent séparément, ce qui lève la contradiction de l'ancien
    site entre « Londres » et « Londres et Lisbonne ». */
export const location: SourcedFact<string> = {
  value: 'A UK company working with organisations across Europe.',
  source:
    'décision Karim, 2026-10-02 (« The work happens in Portugal » jugé trop limitant), plus Companies House pour la partie UK',
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

/** URL publique d'annonce du partenariat Anthropic. Sans elle, la mention
    du partenariat (voir partnerNetwork plus bas) est rendue sans lien.

    Recherche menée le 2026-08-31. Le programme existe bien sous ce nom
    (anthropic.com/news/claude-partner-network), mais l'annuaire officiel des
    partenaires (https://partnerhub.claude.com/directory/, 82 partenaires
    nommés au jour de la consultation) ne mentionne pas Syntexia, et aucune
    source tierce ne le fait. La seule affirmation trouvée provient du site
    de Syntexia lui-même, ce qui n'est pas une source recevable.

    Cela ne démontre pas l'absence de partenariat : un annuaire peut être
    partiel ou en retard. C'est pourquoi le statut est « non sourcé » et non
    « faux ». Question de revue ouverte, voir docs/REVIEW.md. */
// Typée explicitement : sans le cast, TypeScript la réduit à null dans ce
// fichier et refuse tout accès à .value plus bas.
export const partnerNetworkUrl = NONE as SourcedFact<string> | null;

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
export const partnerNetwork: SourcedFact<{ tier: string; programme: string; description: string }> | null = {
  // description : les mots d'Anthropic, page d'annonce du programme
  // (anthropic.com/news/claude-partner-network), consultée le 2026-10-09 :
  // « a program for partner organizations helping enterprises adopt
  // Claude ». Le niveau n'y figure pas : il vient du post de la société.
  value: {
    tier: 'Registered Partner',
    programme: 'Claude Partner Network',
    description: 'Anthropic’s programme for partner organisations helping enterprises adopt Claude',
  },
  // Le niveau exact vient du post public de la société : « Syntexia.AI is an
  // official Registered Partner in the Anthropic Claude Partner Network, the
  // programme through which Anthropic supports the firms putting Claude into
  // production ». C'est publié, donc citable, même si la source reste la
  // société. Cela explique aussi l'annuaire : il ne référence que les tiers
  // supérieurs, et la Services Track est la voie pour y monter.
  source: 'publication LinkedIn de Syntexia.AI, plus validation Karim du 2026-09-01',
};

/** Programme startups d'Anthropic. Ajouté le 2026-10-09, retours de Karim :
 *  « We're in the Claude Partner Network and in Claude Startups, so show both
 *  together near the main buttons, and also in the footer and on About. »
 *
 *  Appartenance : déclaration de Karim, du même type que la validation du
 *  partenariat ci-dessus. Nom et statut vérifiés le 2026-10-09 sur la page
 *  du programme, https://claude.com/programs/startups : titre « Claude
 *  Startups », participants appelés « members ». */
export const startupProgramme: SourcedFact<{ name: string; status: string }> | null = {
  value: { name: 'Claude Startups', status: 'Member' },
  source:
    'appartenance : Karim, 2026-10-09 ; nom et statut : claude.com/programs/startups, consulté le 2026-10-09',
};

/** Les programmes Anthropic, dans l'ordre d'affichage. Rendus en texte, sans
 *  logo : nous n'avons pas d'autorisation d'usage de leur marque. Accueil
 *  (sous les boutons et dans la bande partenariat), pied de page et About
 *  lisent tous cette liste, qui ne contient que des faits renseignés. */
export interface Programme {
  name: string;
  status: string;
  url: string | null;
}

export const programmes: Programme[] = [
  partnerNetwork && {
    name: partnerNetwork.value.programme,
    status: partnerNetwork.value.tier,
    url: partnerNetworkUrl ? partnerNetworkUrl.value : null,
  },
  startupProgramme && {
    name: startupProgramme.value.name,
    status: startupProgramme.value.status,
    url: null,
  },
].filter((p): p is Programme => Boolean(p));

/** Les deux règles dures du produit, énoncées publiquement par le CTO.
    Elles disent en une ligne ce que la page /security développe. */
export const hardRules: string[] = [
  'Client data never trains a model.',
  'Every result points back to its source document.',
];

/** Les fiches de l'équipe.
 *
 *  Biographies construites depuis les profils LinkedIn publics des deux
 *  intéressés, seule source disponible, sur le moule d'une notice de
 *  consultant : le parcours qui justifie la place, puis ce qui est fait
 *  concrètement, du prototype au déploiement.
 *
 *  Deux prudences volontaires.
 *  Les chiffres de missions passées chez d'autres employeurs (croissance
 *  d'EBITDA, revenus générés) ne sont pas repris : ils portent sur des
 *  clients tiers et ne se vérifient pas depuis ce site.
 *  « 2 500 utilisateurs » est repris tel qu'il figure sur le profil public,
 *  qui dit « 2,500+ paying users on the initial prototype ». Le texte interne
 *  d'origine parlait de « 2 500 praticiens », ce que la source ne dit pas :
 *  ce sont des utilisateurs, pas nécessairement tous des praticiens.
 *
 *  Portraits. Un portrait n'est rendu que s'il a été fourni par la personne
 *  elle-même. Sinon photo vaut null et rien n'est rendu à sa place : ni
 *  silhouette, ni initiales, ni image d'attente.
 *  Fichiers dans public/team/, nommés <base>-560.webp, <base>-1120.webp et
 *  <base>-1120.jpg, recadrés en 4:5, sans métadonnées. Pour ajouter un
 *  portrait : déposer les trois fichiers, puis renseigner photo ci-dessous. */
export interface Portrait {
  /** Chemin public sans suffixe, par exemple '/team/baptiste-bouault'. */
  base: string;
  alt: string;
  source: string;
}

export const team: {
  name: string;
  role: string;
  bio: string[];
  linkedin: string | null;
  photo: Portrait | null;
}[] = [
  {
    name: 'Karim Vissangy',
    role: 'CEO and Chief AI Officer',
    bio: [
      'Co-founder and chief executive of a European voice AI platform, after two decades running strategy and operations for international hotel groups. Economics at ISEG Lisbon, MBA at UCL.',
      'He leads Syntexia between London and Lisbon, from the strategy conversation with a leadership team through to the product that ends up running in their systems.',
    ],
    linkedin: 'https://www.linkedin.com/in/karim-vissangy-17aa893a/',
    // En attente de la photo de Karim, demandée le 2026-10-01.
    photo: null,
  },
  {
    name: 'Baptiste Bouault',
    role: 'CTO and Lead AI Engineer',
    bio: [
      'Co-founder of an AI health-tech product that reached 2,500 users, then Data and AI consultant to CAC 40 groups, where he took use cases from prototype through to deployment inside client teams. ESSEC and UC Berkeley.',
      'He owns the technical side of Syntexia end to end. Every build starts with a refusal list: the things the model is not allowed to do. Deterministic engines handle the numbers, the model only writes around figures already calculated and locked, and nothing reaches a user without clearing an automated check. Each system is tested on both failure modes, giving a wrong answer and refusing a question it should have answered.',
    ],
    linkedin: 'https://www.linkedin.com/in/baptiste-bouault/',
    photo: {
      base: '/team/baptiste-bouault',
      alt: 'Portrait of Baptiste Bouault',
      source: 'photo fournie par Baptiste le 2026-10-01',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Secteurs                                                            */
/* ------------------------------------------------------------------ */

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
 *  de constatation. Voir docs/FACTS-PRODUIT.md.
 *
 *  Ordre revu le 2026-10-02, à la demande de Karim : l'audit reste un secteur
 *  parmi d'autres, pas la pièce centrale. Viennent d'abord les secteurs des
 *  deux cas montrés sur l'accueil (factures, help desk). */
export const sectors: { name: string; blurb: string }[] = [
  {
    // Réécrit le 2026-10-09 sur le récit achats et finance demandé par Karim.
    // L'ancienne version : « Calls answered at any hour, bookings taken,
    // supplier paperwork read overnight. »
    name: 'Hospitality',
    blurb: 'Orders drafted from the forecast and bought at one agreed price for every site. Calls answered at any hour.',
  },
  {
    name: 'Financial services',
    blurb: 'Cross-ledger answers, plain-language reports, decisions on current data.',
  },
  {
    name: 'Retail and luxury',
    blurb: 'Customer foresight, inventory risk, trends caught before the peak.',
  },
  {
    name: 'Audit and assurance',
    blurb: 'Evidence-grade workpapers, client acceptance and anti-money-laundering checks. Methodical at machine speed.',
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
];

/* ------------------------------------------------------------------ */
/* Cas montrés sur l'accueil                                           */
/* ------------------------------------------------------------------ */

/** Les deux cas de l'accueil, anonymisés. Choisis et décrits par Karim le
 *  2026-10-02.
 *
 *  RÈGLES D'ANONYMAT, à tenir dans le site ET dans ce dépôt, qui est public :
 *  aucun nom de client, aucun nom de logiciel ou de système tiré de leurs
 *  documents, aucun lieu, aucun nombre de sites ou d'établissements. Seuls
 *  les descripteurs ci-dessous sont publiés. Depuis le 2026-10-09 : aucun nom
 *  de programme ni de concours non plus, et aucun chiffre, sauf une cible
 *  présentée comme telle.
 *
 *  Le cas voix est un prototype : aucune formulation ne doit le présenter
 *  comme déployé (« live », « in production », « every day »…).
 *
 *  Dans les démonstrations, documents, montants, quantités, noms et numéros
 *  sont fictifs, et le disent. */
export const cases = {
  /** Recentré le 2026-10-09 à la demande de Karim : montrer l'automatisation
   *  des achats et de la finance plutôt que la lecture de factures, que
   *  d'autres copient facilement. Le récit est le sien, en quatre temps :
   *  commandes tirées de la prévision, un seul meilleur prix pour tous les
   *  sites, facture contrôlée contre la commande et le prix, rapprochement et
   *  clôture comme sous-produits. La démonstration de facture devient
   *  l'étape 3. L'ancien texte : « Supplier invoices arrive in every format,
   *  get read, checked against the order and the supplier codes, and posted
   *  into the ERP. Anything uncertain is flagged with its reason, and a
   *  person validates it. » */
  automation: {
    client: 'A multi-restaurant hospitality group',
    flow: 'Purchasing and finance run as one flow, from the forecast to the close. Reading the invoice is one step of four.',
    rule: 'Anything uncertain is flagged with its reason, and a person decides. It works in almost any business that buys from suppliers.',
    steps: [
      {
        title: 'Orders follow the forecast',
        body: 'Each site’s order is drafted from what it expects to use and what it already has in stock. The person who runs the site confirms it.',
      },
      {
        title: 'One best price, every site',
        body: 'Every site orders at the best price the group has agreed, from the supplier that holds it.',
      },
      {
        title: 'Invoices checked against order and price',
        body: 'Invoices arrive in any language and any format. Each line is read and checked against the order and the agreed price, and a difference is flagged with its reason.',
      },
      {
        title: 'The close as a by-product',
        body: 'Orders, deliveries and invoices are matched as they arrive, so the month-end close starts from lines that already agree.',
      },
    ],
    source: 'Karim, 2026-10-02 pour le cas ; récit en quatre étapes, Karim, retours du 2026-10-09',
  },
  voice: {
    client: 'An IT help desk at a European bank',
    flow: 'Staff call, the line answers, confirms who they are, resets the password or unlocks the account, and opens a ticket for anything else.',
    stage: 'prototype',
    source: 'Karim, 2026-10-02',
  },
} as const;

/* ------------------------------------------------------------------ */
/* Page security                                                       */
/* ------------------------------------------------------------------ */

/** Ce que la page /security peut mettre dans un contrat. Une entrée n'est
    écrite ici qu'avec sa source. La page n'est liée depuis la navigation,
    l'accueil et le pied de page qu'à partir de SECURITY_LINK_THRESHOLD
    entrées. */
export const contractAnswers: { title: string; body: string; source: string }[] = [
  // « Who decides », « Who else touches your data » et « Where your files
  // live » viennent de l'architecture réelle des plateformes, lue dans les
  // dépôts le 2026-08-31 (docs/FACTS-PRODUIT.md) : des contraintes de
  // conception, pas des intentions commerciales. « What the phone line
  // does » reprend le cas voix décrit par Karim le 2026-10-02.
  {
    title: 'Who decides',
    // Réécrit le 2026-10-02 : le mot « agent » est retiré du site (Syntexia est
    // une couche d'intelligence), et la phrase « nothing is written back »
    // ne valait que pour l'audit.
    // Réécrit le 2026-10-09 pour rééquilibrer la page hors audit (retours de
    // Karim) : la règle d'audit tient désormais en une proposition, à côté de
    // celle des écritures ERP, qui reprend l'état final de la démonstration
    // des factures (« Entry prepared, posted once validated »). La version
    // précédente finissait par : « In audit, nothing is written back into
    // your audit software by us, and no conclusion is reached without a
    // person signing it. »
    body:
      'Syntexia prepares the work, and a person decides. Anything uncertain is flagged with its reason and waits for someone to validate it before it reaches your ERP. In audit, no conclusion is reached without a person signing it.',
    source:
      "architecture des plateformes, README d'une des plateformes d'audit, 2026-08-31 ; principe de validation confirmé par Karim, 2026-10-02",
  },
  {
    // Ajouté le 2026-10-09 : la page ne parlait que de documents. Le contenu
    // est celui du cas voix décrit par Karim le 2026-10-02 (la ligne confirme
    // qui appelle avant d'agir, ouvre un ticket pour tout le reste), sans
    // rien y ajouter.
    title: 'What the phone line does',
    body:
      'It confirms who is calling before it acts on an account, and anything it is not set up to handle becomes a ticket for your team.',
    source: 'cas voix décrit par Karim, 2026-10-02 (cases.voice)',
  },
  {
    title: 'Who else touches your data',
    body:
      'Nobody. Each organisation gets its own deployment, with its own rules and its own templates. We reuse the architecture between clients. We never reuse the data.',
    source: "architecture des plateformes, README de la seconde plateforme d'audit, 2026-08-31",
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

/** Nombre d'entrées sourcées requis pour lier /security. */
const SECURITY_LINK_THRESHOLD = 3;

export const securityIsLinked = contractAnswers.length >= SECURITY_LINK_THRESHOLD;
