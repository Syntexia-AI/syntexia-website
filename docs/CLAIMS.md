# CLAIMS.md

Registre des affirmations factuelles publiées par le site. Établi en W0, à statuer par l'humain avant W1.

> **Clôture de la passe complète, 2026-08-31.**
>
> Ce registre a été établi en W0 sur l'ancien site. La passe complète l'a soldé.
>
> - **Trois entrées sont passées SOURCÉES.** La raison sociale et le numéro de
>   société (Companies House, fiche 16847343, consultée le 2026-08-31, active
>   depuis le 11/11/2025), et deux affirmations de `/security` démontrables par
>   le build : absence de cookie et de traceur, polices servies depuis notre
>   origine.
> - **Section D, partenariat Anthropic : close en NON SOURCÉ.** L'annuaire
>   officiel `partnerhub.claude.com/directory` listait 82 partenaires au jour de
>   la consultation, sans Syntexia, et aucune source tierce ne le nomme. Les huit
>   mentions sont retirées du rendu. Ce n'est pas une preuve d'absence de
>   partenariat, c'est une absence de preuve.
> - **Entrées I1 à I5 : confirmées FAUSSES.** Aucun snapshot Wayback du domaine,
>   à aucune date, aucune trace d'un ancien site Wix. Les cinq cartes sont
>   supprimées.
> - **Sections A, B, C, G : restent non sourcées, donc absentes du rendu**, avec
>   les blocs qui les portaient.
> - **Une entrée est apparue puis a été retirée pendant la passe.** Le titre de
>   la home disait « across our live deployments », formulation proposée par la
>   directive. Le vérificateur de claims l'a relevée comme affirmation de statut
>   non sourcée. Segment retiré. Titre final : « One Tuesday. Nobody was on shift. »
>
> Ce qui reste retiré et comment le restaurer : `docs/REVIEW.md` section 3.
> Sources tierces consultées : `docs/SOURCES-P2.md`.

Règle : une affirmation qui n'est pas **VÉRIFIÉ** ne peut pas apparaître dans le rendu. Sans ligne correspondante dans `docs/FACTS-SITE.md`, elle sort.

## Statuts

- **VÉRIFIÉ** : source vérifiable identifiée. Peut être publié. **Jamais attribué sans source externe** (amendement A4).
- **À VALIDER** : aucune source. Décision de Karim requise. Ne peut pas être publié en l'état.
- **CONTRADICTOIRE** : le site affirme deux choses incompatibles. Une des deux au moins est fausse, mais le repo ne dit pas laquelle. Décision requise.
- **FAUSSE** : la fausseté est démontrable depuis le repo seul. Qualifiée sans validation humaine, en vertu de l'amendement A4.
- **SUPPRESSION PAR DÉFAUT** : affirmation non sourcée dans un article. Retirée sans réécriture, réintégrable telle quelle si FACTS-SITE.md la source (amendement A3).
- **RETIRÉ** : la directive impose déjà sa disparition, indépendamment de sa véracité.

Au 2026-08-31, **une seule affirmation est adossée à une source externe** : la raison sociale et le numéro de société, confirmés sur Companies House. Les sept lignes marquées VÉRIFIÉ (E1, E2, E3, F2, H1, H2, H3) le sont au titre d une source **interne au repo**, ce qui prouve ce que le site déclare, pas que la déclaration est vraie. Deux affirmations de /security sont sourcées par le **build** lui-même, quatrième type de source admis.

## Amendements appliqués

Ce registre intègre les amendements du 2026-08-31 : **A1** (aucune donnée personnelle ici, section E réécrite en références), **A2** (canonique tranchée), **A3** (hiérarchie des règles, entrée H9), **A4** (qualification autonome, entrées I1 à I5 et G1 à G12), **A5** (suppression de tout compte de secteurs, entrées B1 et B5).

---

## A. Chiffres de performance

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| A1 | / | `src/sections.jsx:280` | `~70` `%` `Citizen requests triaged without manual handling` | À VALIDER |
| A2 | / | `src/sections.jsx:281` | `Days` `→ hrs` `Response time reduction across council services` | À VALIDER |
| A3 | / | `src/sections.jsx:282` | `0` `New platforms for staff to learn` | À VALIDER |
| A4 | / | `src/sections.jsx:292` | `60` `%` `Reduction in time answering internal data requests` | À VALIDER |
| A5 | / | `src/sections.jsx:293` | `3` `→ 1` `Disconnected ledgers unified for finance teams` | À VALIDER |
| A6 | / | `src/sections.jsx:294` | `Now` `Decisions made on current data, not last week's` | À VALIDER |
| A7 | / | `src/sections.jsx:304` | `~80` `%` `Routine procurement docs processed automatically` | À VALIDER |
| A8 | / | `src/sections.jsx:305` | `Days` `→ hrs` `Approval cycle time across the supplier base` | À VALIDER |
| A9 | / | `src/sections.jsx:306` | `Pre` `-pay` `Discrepancies caught before invoice settlement` | À VALIDER |
| A10 | / | `src/sections.jsx:316` | `↑` `Repeat-purchase rates lifted across cohorts` | À VALIDER |
| A11 | / | `src/sections.jsx:317` | `↓` `Stock-outs reduced on high-velocity SKUs` | À VALIDER |
| A12 | / | `src/sections.jsx:318` | `Act` `· not react` `Teams acting ahead, not chasing the report` | À VALIDER |
| A13 | / | `src/sections.jsx:393` | Financial Services, `Internal data requests`, `−60%` | À VALIDER |
| A14 | / | `src/sections.jsx:394` | Audit & Assurance, `Workpaper prep`, `Hours saved` | À VALIDER |
| A15 | / | `src/sections.jsx:395` | Public Sector, `Requests automated`, `~70%` | À VALIDER |
| A16 | / | `src/sections.jsx:396` | Retail & Luxury, `Stock-out reduction`, `Live` | À VALIDER |
| A17 | / | `src/sections.jsx:397` | Legal Services, `Operational lift`, `Live` | À VALIDER |

**Note A4 contre A13.** Le même chiffre est publié deux fois sur la même page sous deux formes : `60 %` en métrique de pilier (l.292) et `−60%` en KPI de carte secteur (l.393). Cohérent, mais à ne statuer qu'une fois.

**Note A1 contre A15.** Idem pour `~70`. Une seule décision.

---

## B. Périmètre : combien de secteurs, lesquels

C'est le point le plus contradictoire du site. Quatre listes distinctes coexistent.

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| B1 | / | `src/sections.jsx:534-535` | `5` `Industries live in production` | RETIRÉ (A5 : tout compte disparaît) |
| B2 | / | `src/sections.jsx:393-397` | Financial Services, Audit & Assurance, Public Sector, Retail & Luxury, Legal Services | CONTRADICTOIRE |
| B3 | / | `src/sections.jsx:555-556` | `We work across financial and audit services, public sector, legal, retail and hospitality.` | CONTRADICTOIRE |
| B4 | / | `src/sections.jsx:300` | `industry: 'Procurement'` | CONTRADICTOIRE |
| B5 | /about | `about.html:110` | `Live in five industries. Processing real operations, every day.` | RETIRÉ (A5 : tout compte disparaît) |
| B6 | /about | `about.html:115-116` | `financial services and audit, public sector, legal, retail and luxury, and hospitality` | CONTRADICTOIRE |
| B7 | /team | `team.html:66-67` | `across financial services, audit, public sector, retail, hospitality, and now legal` | CONTRADICTOIRE |

**Analyse.** L'union des secteurs nommés sur le site est : Financial Services, Audit, Public Sector, Legal, Retail, Luxury, Hospitality, Procurement, soit **huit noms distincts**, sous un compte affiché de **cinq**. Hospitality apparaît sur `/about` et `/team` mais pas dans la grille de la home. Procurement apparaît sur la home uniquement. La directive annonçait « six nommées » dans `about.html` : ce n'est pas ce que dit le fichier, voir INVENTAIRE.md point 8.

**Tranché par l'amendement A5.** Tout **compte** de secteurs disparaît du site : `5` (B1), `Live in five industries` (B5), et toute formulation équivalente. Il reste **une seule liste nommée**, avec statut binaire par secteur et source obligatoire.

Conséquence directe : un secteur sans client en production nommé dans FACTS-SITE.md ne figure pas sur le site, **et ses chiffres partent avec lui**. Les entrées A1 à A17 sont donc conditionnées aux lignes `*_live` de FACTS-SITE.md, pas seulement à leur propre source. Si `public_sector_live` n'est pas renseigné, A1, A2, A3 et A15 tombent avec le secteur.

B1 et B5 passent de CONTRADICTOIRE à **RETIRÉ**. La contradiction n'est plus à arbitrer : le compte disparaît.

Reste à décider (Karim) : la liste elle-même, ligne `secteurs:` de FACTS-SITE.md. Tant qu'elle n'est pas remplie, W4 point 9 et W5 point 2 sont bloqués.

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| B8 | / | `src/sections.jsx:395` | Public Sector porte `~70%`, le chiffre le plus précis du site | À VALIDER |
| B9 | / | `src/sections.jsx:393` | Financial Services porte `−60%`, le second chiffre le plus précis | À VALIDER |
| B10 | / | `src/sections.jsx:409` | `Live in real organisations, processing real operations, every day.` | À VALIDER |
| B11 | / |  `src/sections.jsx:251` | `Live in production` (marquee) | RETIRÉ (section 2 : marquee interdit) |
| B12 | / |  `src/sections.jsx:134` | badge `Live` du hero | RETIRÉ (section 2 : pastilles interdites) |

---

## C. Lieu et implantation

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| C1 | / |  `src/sections.jsx:252` | `UK · Headquartered London` (marquee) | RETIRÉ (marquee) + À VALIDER sur le fond |
| C2 | / |  `src/sections.jsx:254` | `Operations across Europe` (marquee) | RETIRÉ (marquee) + À VALIDER sur le fond |
| C3 | / | `src/sections.jsx:538-539` | `UK` `Headquartered · London` | À VALIDER |
| C4 | / | `src/sections.jsx:542-543` | `EU` `Operations across Europe` | À VALIDER |
| C5 | / | `src/sections.jsx:601` | `London · Lisbon` (lien `Location` vers `#`) | À VALIDER |
| C6 | / | `src/sections.jsx:656` | `© 2026 Syntexia.AI · London · Lisbon` | À VALIDER |
| C7 | /about | `about.html:166` | `Headquartered between London & Lisbon. Operating across Europe.` | CONTRADICTOIRE avec C3 et C8 |
| C8 | /about | `about.html:170-172` | `Syntexia is built in London, with operations across Europe.` | CONTRADICTOIRE avec C7 |
| C9 | /about | `about.html:17` | `UK-headquartered, operating across Europe.` (og:description) | À VALIDER |
| C10 | /team | `team.html:120` | `London · Lisbon` (lien `Where` vers `#`) | À VALIDER |
| C11 | /blog + 2 articles | `blog.html:202`, `precedent-meets-pace.html:362`, `the-quiet-revolution:247` | `© 2026 Syntexia.AI · London · Lisbon` | À VALIDER |

**Analyse.** Le site dit tantôt « siège à Londres » (C3, C8, C9), tantôt « siège entre Londres et Lisbonne » (C7). Un siège social n'est pas partagé entre deux villes : c'est une adresse unique déposée. Le gabarit FACTS-SITE.md propose la formulation `Registered in the UK.` plus `Operating in Portugal.`, qui lève la contradiction sans rien inventer. Décision de Karim.

Aucune occurrence du mot `Portugal` sur le site. Le seul indice d'opérations portugaises dans le contenu public est le terme `sigilo profissional` employé dans `posts/precedent-meets-pace.html:209`.

---

## D. Partenariat Anthropic

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| D1 | / |  `src/sections.jsx:253` | `Anthropic Claude Partner Network` (marquee) | RETIRÉ (marquee) |
| D2 | / |  `src/sections.jsx:178-179` | `Partner network` `Anthropic Claude` (hero-meta) | RETIRÉ (hero-meta supprimé en W4) |
| D3 | / | `src/sections.jsx:560-561` | `We're a proud member of the Anthropic Claude Partner Network` | À VALIDER + `proud` est un mot interdit (section 2) |
| D4 | / | `src/sections.jsx:657` | `Member · Anthropic Claude Partner Network` | À VALIDER |
| D5 | /about | `about.html:149` | `A proud member of the Anthropic Claude Partner Network.` | À VALIDER + `proud` interdit |
| D6 | /about | `about.html:158` | `Frontier model partner · Member · 2026 onwards` | À VALIDER |
| D7 | /about | `about.html:17` | `Member of the Anthropic Claude Partner Network.` (og:description) | À VALIDER |
| D8 | /team, /blog, articles | `team.html:169`, `blog.html:203`, `precedent-meets-pace.html:363`, `the-quiet-revolution:248` | `Member · Anthropic Claude Partner Network` | À VALIDER |

**Point dur.** **Aucune** de ces huit mentions n'est un lien. Il n'existe nulle part dans le repo une URL vers une annonce, une page de vérification ou un annuaire de partenaires. La directive conditionne l'affichage du bloc partenariat (W4 point 11, W5 point 2) à la présence de `annonce_partner_network_url` dans FACTS-SITE.md. Sans cette URL, les huit mentions sortent du rendu.

`Frontier model partner` (D6) est un niveau de partenariat nommé. Il demande une source distincte de l'appartenance simple au réseau.

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| D9 | /about | `about.html:153` | `Our partnership with Anthropic gives us early access to the latest models` | À VALIDER (Karim) |

**Note D9.** Phrase complète l.151-157 : `We build with Claude, the model family we believe sets the standard for the kind of careful, high-stakes work our customers operate in. Our partnership with Anthropic gives us early access to the latest models, deep technical integration, and the engineering relationship that lets us deliver intelligence that's safe, accurate, and accountable inside regulated industries.` L'accès anticipé aux modèles est une clause contractuelle : elle existe ou elle n'existe pas. W5 point 2 impose son retrait sauf validation explicite.

---

## E. Personnes

**Application de l'amendement A1.** Cette section ne reproduit aucun nom, aucune fonction, aucune adresse et aucun numéro. Chaque entrée renvoie à `fichier:ligne`. Les valeurs se lisent à la source tant qu'elle existe, et le grep de contrôle vérifie leur disparition sans avoir besoin de ce tableau.

| # | page | fichier:ligne | objet de l'affirmation | statut |
|---|---|---|---|---|
| E1 | /team | `team.html:80-81` | fiche 1 : nom et fonction | VÉRIFIÉ (source repo) |
| E2 | /team | `team.html:83` | fiche 1 : URL LinkedIn | VÉRIFIÉ (source repo) |
| E3 | /team | `team.html:93-94` | fiche 2 : nom et fonction | VÉRIFIÉ (source repo) |
| E4 | /team | absent | fiche 2 : URL LinkedIn | À VALIDER (absente du repo) |
| E5 | toutes | absent | URL LinkedIn de la société | À VALIDER (absente du repo) |
| E6 | /about | `about.html:185` | `Meet the founder.` (singulier) | CONTRADICTOIRE |
| E7 | /install-signature | `install-signature.html:296-304` | une 3e personne porte la fonction de CTO | CONTRADICTOIRE avec E3 |
| E8 | /install-signature | `install-signature.html:287-295` | une personne porte la fonction de co-fondateur | CONTRADICTOIRE avec E6 |
| E9 | /install-signature | `install-signature.html:305-322` | deux autres personnes portent la fonction de co-fondateur | CONTRADICTOIRE avec E6 |
| E10 | /team | absent | biographies, photos des deux fiches | À VALIDER (absentes) |

**Analyse E6 contre E7 à E9.** `/about` dit « le fondateur » au singulier. `/install-signature`, servi sur le même domaine, publie **trois** personnes portant la fonction de co-fondateur. Et deux pages du site publient simultanément **deux** titulaires de la fonction de CTO (E3 et E7).

Ces contradictions disparaissent mécaniquement avec la suppression de `install-signature.html` en W1a, mais la ligne `meet_the_founder: singulier/pluriel` de FACTS-SITE.md doit être statuée, car le singulier engage sur la structure de la société.

**Note sur les deux coordonnées de contact conservées en clair (entrées F1 et F2).** L'adresse `office@syntexia.ai` et le numéro de standard `+44 20 4620 4570` sont conservés en clair dans ce registre et dans `INVENTAIRE.md`. Ce sont les coordonnées **fonctionnelles** de la société, publiées volontairement sur les six pages du site, rattachées à aucune personne. Elles ne figurent dans aucun des motifs du grep de contrôle A1, dont les huit motifs visent exclusivement les cinq personnes exposées par le fichier supprimé en W1a.

Interprétation retenue : A1 interdit la republication de données **personnelles**, et énumère les marqueurs qui les trahissent. Une adresse de contact d'entreprise n'en est pas une, et la retirer rendrait les entrées F1 et F2 instatuables. Arbitrage journalisé ici, réversible d'une ligne si tu préfères la lecture stricte.

---

## F. Coordonnées

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| F1 | toutes | `src/sections.jsx:597`, `about.html:206`, `team.html:116`, `blog.html:197`, articles | `+44 20 4620 4570` | À VALIDER (répondu ?) |
| F2 | toutes | `src/sections.jsx:593`, et les cinq pages statiques | `office@syntexia.ai` | VÉRIFIÉ (source repo) |

**Note F1.** La directive demande explicitement si ce numéro est répondu. Un numéro publié qui sonne dans le vide est un défaut de conformité plus qu'un défaut de design. W5 point 5 conditionne son affichage à cette réponse. Non testé en W0 : un appel sortant n'est pas une vérification que je peux conduire.

---

## G. Journal d'opérations de la home

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| G1 | / | `src/sections.jsx:231` | `/ inside customer environment · anonymized` | **FAUX** |
| G2 | / | `src/sections.jsx:191` | `Citizen request #48921 → Planning Dept.` | INVENTÉ |
| G3 | / | `src/sections.jsx:192` | `Supplier invoice reply — €12,400 / PO-7733` | INVENTÉ |
| G4 | / | `src/sections.jsx:193` | `GRN ↔ Invoice ↔ PO (3-way, no variance)` | INVENTÉ |
| G5 | / | `src/sections.jsx:194` | `Stock-out risk: SKU LX-204 — 9 days` | INVENTÉ |
| G6 | / | `src/sections.jsx:195` | `Email "rate review" → Mortgage / High priority` | INVENTÉ |
| G7 | / | `src/sections.jsx:196` | `Voicemail transcribed · summary delivered` | INVENTÉ |
| G8 | / | `src/sections.jsx:197` | `Cash position pulled across 3 ledgers` | INVENTÉ |
| G9 | / | `src/sections.jsx:198` | `Discrepancy £842 → Finance lead` | INVENTÉ |
| G10 | / | `src/sections.jsx:199` | `Customer query — refund processed end-to-end` | INVENTÉ |
| G11 | / | `src/sections.jsx:200` | `Repeat-buy signal: cohort Q1-26 · +14%` | INVENTÉ |
| G12 | / | `src/sections.jsx:230` | `Intelligence · live ops feed` + horodatage `nowTs()` l.204-208 | **FAUX** |

**G1 et G12 sont la seule ligne du registre que je qualifie sans attendre l'humain.** Le composant génère dix messages codés en dur, les fait défiler toutes les 1800 ms et les horodate à l'heure du visiteur, sous un en-tête qui affirme `live ops feed` et `inside customer environment · anonymized`. Le libellé affirme une provenance client que le code contredit. Ce n'est pas une donnée à valider, c'est une donnée fabriquée présentée comme réelle.

W1 point 12 le neutralise (en-tête remplacé par `Illustration. Typical operations, no customer data.`, horodatage figé). W4 point 8 supprime le composant. Les deux étapes sont nécessaires : W1 arrête l'affirmation fausse immédiatement, W4 retire le bloc.

---

## H. Articles

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| H1 | /posts/precedent-meets-pace | `precedent-meets-pace.html:21` | `article:published_time` = `2026-05-23` | VÉRIFIÉ (source repo, cohérent) |
| H2 | idem | `precedent-meets-pace.html:22, 115` | auteur nominatif, non reproduit (A1) | VÉRIFIÉ (source repo, cohérent) |
| H3 | idem | `precedent-meets-pace.html:113`, `blog.html:83`, `src/sections.jsx:442` | date affichée `May 2026` | VÉRIFIÉ (cohérent avec H1) |
| H4 | /posts/the-quiet-revolution | `the-quiet-revolution:21` | `article:published_time` = `2026-04-15` | CONTRADICTOIRE |
| H5 | idem | `the-quiet-revolution:78` | date affichée dans l'article : `May 2026` | CONTRADICTOIRE avec H4 |
| H6 | idem | `blog.html:93`, `src/sections.jsx:451` | date affichée ailleurs : `Apr 2026` | CONTRADICTOIRE avec H5 |
| H7 | idem | `the-quiet-revolution:80` | auteur affiché `Syntexia Editorial` | À VALIDER |
| H8 | idem | absent | pas de meta `article:author` | À VALIDER |

**Analyse H4 à H6.** Trois emplacements, deux dates. Deux sources sur trois disent avril (meta et cartes), une dit mai (le hero de l'article). W1 point 15 impose d'aligner sur le statut de ce registre. **Recommandation : retenir `2026-04-15`**, majoritaire et portée par la meta, et corriger le hero. À confirmer par Karim, qui seul sait la date réelle de publication.

**H7.** Deux signatures différentes sur deux articles du même site (`Syntexia Editorial` sur un article, un auteur nominatif sur l autre). Si `Syntexia Editorial` ne recouvre aucune entité réelle, c'est un auteur fictif.

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| H9 | /posts/the-quiet-revolution | `the-quiet-revolution:130` | `Inside the firms we work with, intelligence is now embedded in the day-to-day workflow of engagement teams.` | **SUPPRESSION PAR DÉFAUT** (A3) |

**Point d'arbitrage H9.** Affirmation de déploiement client, sans nom ni source. Elle tombe sous le critère d'acceptation « zéro affirmation non VÉRIFIÉ visible » (section 5), mais la directive protège les articles de toute modification hors typographie (section 0). Les deux règles se contredisent sur cette phrase. Arbitrage porté au rapport W0. Aucun autre chiffre des deux articles n'est sourcé, mais tous les autres sont explicitement narratifs (`Consider a transaction involving ten commercial contracts...`), donc hors périmètre du registre.

---

## I. Cartes de blog sans destination

| # | page | fichier:ligne | texte exact | statut |
|---|---|---|---|---|
| I1 | /blog | `blog.html:100-105` | `Boost B2B sales with operational AI analytics.` `Playbook` `Apr 2026`, `href="#"` | **FAUSSE** (A4) : date de publication affichée pour un contenu inexistant |
| I2 | /blog | `blog.html:110-115` | `Hospitality intelligence, beyond the dashboard.` `Sector` `Mar 2026`, `href="#"` | **FAUSSE** (A4) : date de publication affichée pour un contenu inexistant |
| I3 | /blog | `blog.html:120-125` | `Why "embedded" beats "co-pilot" in regulated industries.` `Field Note` `Feb 2026`, `href="#"` | **FAUSSE** (A4) : date de publication affichée pour un contenu inexistant |
| I4 | /blog | `blog.html:130-135` | `What public sector teams actually want from AI.` `Sector` `Jan 2026`, `href="#"` | **FAUSSE** (A4) : date de publication affichée pour un contenu inexistant |
| I5 | / | `src/sections.jsx:458-466` | `Hospitality intelligence, beyond the dashboard.` `Mar 2026`, `href="/blog"` | **FAUSSE** (A4) : date de publication affichée pour un contenu inexistant |

Ces cinq entrées annoncent des articles qui n'existent pas. I1 reprend un titre du blog Wix de l'ancien site. Quatre dates de publication sont affichées pour du contenu inexistant.

---

## J. Formulations interdites par la section 2, indépendamment de leur véracité

| # | page | fichier:ligne | texte exact | motif |
|---|---|---|---|---|
| J1 | / | `src/sections.jsx:564` | `we build the intelligence businesses run on.` | signature de fin de section |
| J2 | / | `src/sections.jsx:81` | `Get in touch` (bouton de nav) | bouton qui ne dit pas ce qui se passe |
| J3 | / | `src/sections.jsx:101` | `quiet, embedded, always on` | triplet parallèle |
| J4 | / |  `src/sections.jsx:123` | `reading, routing, drafting, reconciling, anticipating` | énumération parallèle |
| J5 | / | `src/sections.jsx:560`, `about.html:149` | `proud` | mot interdit |
| J6 | / | `index.html:9` | `quiet, embedded, always on` (meta description) | triplet parallèle |
| J7 | toutes | 14 fichiers | tirets cadratins : about 14, articles 22 et 9, sections.jsx 18, index 6, team 6, blog 6, styles.css 3, app.jsx 1 | typographie interdite |

---

## Récapitulatif

Décompte par statut principal (une entrée mixte est comptée sur son statut le plus fort).

Décompte après application des amendements A3, A4 et A5.

| statut | nombre | entrées |
|---|---|---|
| VÉRIFIÉ (source repo interne uniquement, jamais au sens plein) | 7 | E1, E2, E3, F2, H1, H2, H3 |
| À VALIDER | 40 | A1 à A17, B8 à B10, C3 à C6, C9 à C11, D3 à D9, E4, E5, E10, F1, H7, H8 |
| CONTRADICTOIRE | 14 | B2, B3, B4, B6, B7, C7, C8, E6 à E9, H4 à H6 |
| **FAUSSE**, qualifiée sans validation humaine (A4) | **17** | G1 à G12, I1 à I5 |
| SUPPRESSION PAR DÉFAUT (A3) | 1 | H9 |
| RETIRÉ par la directive ou par A5 | 8 | B1, B5, B11, B12, C1, C2, D1, D2 |
| Formulation interdite, indépendamment de la véracité | 7 | J1 à J7 |
| **total** | **94** | |

Mouvements dus aux amendements : B1 et B5 passent de CONTRADICTOIRE à RETIRÉ (A5). I1 à I5 passent de RETIRÉ à FAUSSE (A4). H9 passe de À VALIDER à SUPPRESSION PAR DÉFAUT (A3).

**Justification de la qualification autonome des entrées I1 à I5 (A4).** `blog.html` affiche quatre dates de publication (`Apr 2026`, `Mar 2026`, `Feb 2026`, `Jan 2026`) et la home une cinquième (`Mar 2026`), pour des articles dont aucun n'existe : `posts/` ne contient que deux fichiers, et les cinq liens pointent vers `#` ou vers `/blog`. Afficher une date de publication pour un contenu qui n'a jamais été publié est faux, et la démonstration ne demande rien d'autre que le repo. Aucune validation humaine n'est requise pour cette qualification.

**Aucune ligne de ce registre n'est adossée à une source externe vérifiable à ce jour.**

Le fichier `docs/FACTS-SITE.md` (gabarit en section 6 de la directive) doit être rempli par l'humain avant le démarrage de W1. Les décisions les plus bloquantes, par ordre d'impact :

1. La liste fermée des secteurs et leur compte (bloque B1 à B7, W4 point 9, W5 point 2).
2. La formulation de l'implantation (bloque C1 à C11, W5 point 5).
3. L'URL de l'annonce du partenariat Anthropic (bloque D1 à D9, W4 point 11).
4. Les trois totaux de la journée type (bloque W4 point 5, dont la directive impose le retrait complet du bloc si un seul des trois manque).
5. Le numéro de téléphone est-il répondu (bloque F1, W5 point 5).
