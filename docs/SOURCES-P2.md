# SOURCES-P2 — Vérification tierce de trois affirmations du site syntexia.ai

Date de consultation : 2026-08-31
Méthode : sources publiques tierces uniquement (registre officiel, page publiée par le tiers concerné, archive indépendante). Toute page contrôlée par Syntexia (syntexia.ai, LinkedIn Syntexia, blog Syntexia) est exclue comme source valable pour ces vérifications.

---

## Vérification 1 — Companies House, numéro 16847343

**Question posée** : le numéro de société 16847343 correspond-il bien à "Syntexia.AI Ltd", est-il actif, et à quelle date a-t-il été immatriculé ?

**URL consultée** : https://find-and-update.company-information.service.gov.uk/company/16847343
(consultée le 2026-08-31, deux fois, résultats identiques aux deux passages)

**Ce qui a été trouvé littéralement** :
- Raison sociale exacte telle qu'enregistrée : **"SYNTEXIA.AI LTD"**
- Statut : **Active**
- Type de société : Private limited Company
- Date d'immatriculation (incorporation) : **11 November 2025**
- Adresse du siège social (registered office address) : 7 Chester Close, Richmond, England, TW10 6NR
- Codes SIC (nature d'activité) : 62012 (Business and domestic software development), 62020 (Information technology consultancy activities), 62090 (Other information technology service activities), 63110 (Data processing, hosting and related activities)
- Premiers comptes dus le 11 August 2027 (exercice clos au 30 November 2026)
- Prochaine confirmation statement due le 3 July 2027 (dernière datée du 19 June 2026)

**Conclusion** : la mention légale du site ("Syntexia.AI Ltd. Registered in England and Wales, company number 16847343") correspond exactement à l'enregistrement Companies House trouvé : raison sociale "SYNTEXIA.AI LTD", active, immatriculée le 11 novembre 2025. **SOURCÉ** — https://find-and-update.company-information.service.gov.uk/company/16847343

---

## Vérification 2 — Anthropic Claude Partner Network

**Question posée** : existe-t-il une URL publique, contrôlée par Anthropic ou par un tiers indépendant, qui nomme Syntexia comme membre du "Claude Partner Network" ou comme "Frontier model partner" ? Quel est le nom officiel exact de ce programme chez Anthropic ?

**URLs consultées (2026-08-31)** :
- https://www.anthropic.com/news/claude-partner-network
- https://partnerhub.claude.com/directory/ (= redirection depuis https://claude.com/partners/services, 301 vers cette URL)
- Recherches web ciblées : `"Syntexia" site:claude.com`, `"Syntexia" partner directory claude.com`, `"Syntexia" "selected to join the Claude Partner Network"`, `"Syntexia" "significant milestone" Claude Partner Network`

**Ce qui a été trouvé littéralement** :
- Le nom officiel du programme, tel qu'affiché sur anthropic.com, est **"Claude Partner Network"** (annonce : "Anthropic invests $100 million into the Claude Partner Network", lancé le 12 mars 2026). Aucune trace du nom "Claude Partner Network" désigné autrement dans les sources consultées.
- La page https://www.anthropic.com/news/claude-partner-network ne mentionne PAS "Syntexia". Elle cite nommément quatre partenaires (Accenture, Deloitte, Cognizant, Infosys) à titre de témoignages, sans liste exhaustive des membres. Elle renvoie vers un annuaire à claude.com/partners.
- L'annuaire officiel des partenaires (https://partnerhub.claude.com/directory/, redirigé depuis claude.com/partners/services) a été récupéré intégralement en HTML brut (291 467 octets, contenu rendu côté serveur, incluant 82 entrées de partenaires nommées avec leur "name" en JSON embarqué : Accenture, Bain & Company, Boston Consulting Group, Capgemini, Cognizant, Deloitte, DXC, Infosys, KPMG, McKinsey & Company, PwC, Tata Consultancy Services, UST, Bounteous, Caylent, EPAM Systems, Forgd, Fractal, Globant, Indicium AI, etc.). Une recherche texte insensible à la casse de la chaîne "syntexia" dans ce HTML brut ne retourne **aucune occurrence**.
- Plusieurs recherches web font apparaître un texte affirmant que "Syntexia.AI has been selected to join the Claude Partner Network […] a significant milestone for them". Ce texte est systématiquement associé, dans les résultats de recherche, au domaine www.syntexia.ai lui-même ("Home | Syntexia") — c'est-à-dire une source contrôlée par Syntexia, pas un tiers. Le fetch direct de https://www.syntexia.ai/ (page d'accueil) n'a par ailleurs fait apparaître aucune mention de "Claude Partner Network", "Anthropic" ou "frontier model partner" dans le contenu retourné.
- Aucune annonce publiée par Anthropic (anthropic.com, claude.com) ni aucun tiers indépendant nommant explicitement Syntexia comme partenaire n'a été trouvé.

**Conclusion** : aucune source tierce (Anthropic ou indépendante) ne confirme Syntexia comme membre du Claude Partner Network ou "Frontier model partner" ; la seule affirmation en ce sens provient de Syntexia elle-même. Le nom officiel du programme est "Claude Partner Network". **NON SOURCÉ**

---

## Vérification 3 — Wayback Machine, les 4 articles de blog annoncés

**Question posée** : pour chacun des 4 titres ci-dessous, a-t-il réellement été publié un jour (ancien site, y compris un éventuel ancien site Wix de Syntexia) ?
1. "Boost B2B sales with operational AI analytics." (daté Apr 2026)
2. "Hospitality intelligence, beyond the dashboard." (daté Mar 2026)
3. "Why \"embedded\" beats \"co-pilot\" in regulated industries." (daté Feb 2026)
4. "What public sector teams actually want from AI." (daté Jan 2026)

**URLs / requêtes consultées (2026-08-31)** :
- http://archive.org/wayback/available?url=syntexia.ai
- http://archive.org/wayback/available?url=syntexia.ai&timestamp=20260101
- http://archive.org/wayback/available?url=www.syntexia.ai
- http://archive.org/wayback/available?url=syntexia.ai/blog
- https://web.archive.org/cdx/search/cdx?url=syntexia.ai*&output=json&limit=500
- https://web.archive.org/cdx/search/cdx?url=syntexia.ai&matchType=domain&output=json&limit=1000&collapse=urlkey
- https://web.archive.org/cdx/search/cdx?url=www.syntexia.ai*&output=json&limit=1000
- https://web.archive.org/cdx/search/cdx?url=syntexia.ai (sans paramètre output)
- https://web.archive.org/cdx/search/cdx?url=http://syntexia.ai
- https://web.archive.org/cdx/search/cdx?url=https://syntexia.ai
- http://web.archive.org/web/timemap/link/syntexia.ai
- Recherches web pour chacun des 4 titres exacts (entre guillemets), avec et sans le mot "Syntexia"
- Recherche d'un éventuel ancien site Wix : `"syntexia" wixsite.com OR "syntexia.wixsite"`, `Syntexia AI company old website before syntexia.ai domain history`
- Inspection du HTML brut de https://www.syntexia.ai/blog (recherche de traces "wixstatic"/"wix.com"/"wixsite")

**Ce qui a été trouvé littéralement** :
- `wayback/available` pour "syntexia.ai", "www.syntexia.ai" et "syntexia.ai/blog" retourne systématiquement `"archived_snapshots": {}` (vide) — aucun snapshot le plus récent disponible.
- Toutes les requêtes CDX (`web.archive.org/cdx/search/cdx`) pour le domaine syntexia.ai, sous toutes les variantes testées (wildcard, matchType=domain, avec/sans sous-domaine www, avec/sans schéma http/https, avec/sans paramètre output), retournent une réponse **vide** (`[]` ou chaîne vide). Le domaine syntexia.ai n'a **aucun snapshot archivé dans la Wayback Machine, à aucune date**.
- Aucun des 4 titres exacts, recherchés mot pour mot entre guillemets (avec ou sans "Syntexia"), ne remonte de résultat correspondant sur le web ouvert — ni sur syntexia.ai, ni ailleurs (blog tiers, réseau social, cache, republication).
- Aucune trace d'un ancien domaine Wix pour Syntexia n'a été identifiée (aucun résultat pour "syntexia.wixsite.com" ou équivalent). Le HTML brut de https://www.syntexia.ai/blog ne contient aucune référence à "wixstatic", "wix.com" ou "wixsite" — rien n'indique que le site actuel ait hérité d'assets d'un ancien site Wix identifiable.

**Conclusion, titre par titre** :
1. "Boost B2B sales with operational AI analytics." → **AUCUNE TRACE** (aucun snapshot Wayback du domaine syntexia.ai n'existe ; aucun résultat web indépendant)
2. "Hospitality intelligence, beyond the dashboard." → **AUCUNE TRACE**
3. "Why \"embedded\" beats \"co-pilot\" in regulated industries." → **AUCUNE TRACE**
4. "What public sector teams actually want from AI." → **AUCUNE TRACE**

Pour les 4 titres : **NON SOURCÉ**. Il n'a pas été possible de confirmer une publication passée, ni via la Wayback Machine (le domaine syntexia.ai n'y possède aucun snapshot, quelle que soit la date), ni via un éventuel ancien site Wix (aucune trace de son existence ou de son adresse n'a été trouvée).
