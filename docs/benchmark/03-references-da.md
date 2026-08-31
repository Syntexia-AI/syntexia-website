# 03 — Références DA : agents opérationnels haut de gamme & sobriété chère

Date de consultation : **2026-08-31**. Outils : WebFetch (conversion HTML→Markdown par un modèle intermédiaire, ne restitue pas le CSS ni le JS exécuté) + WebSearch en complément pour les points structurellement invisibles à WebFetch (couleurs calculées, typographie, mouvement, WebGL).

## Méthode et limites — à lire avant le reste

WebFetch convertit la page en Markdown avant analyse : il ne voit ni feuille de style, ni classes CSS calculées, ni JavaScript exécuté. Concrètement :
- Les **H1 / sous-titres cités ci-dessous sont vérifiés** : copiés mot à mot depuis la sortie directe de WebFetch sur l'URL indiquée, à la date du 2026-08-31.
- Les affirmations sur **couleurs exactes, épaisseur de filets, letter-spacing, présence de dégradés/glass/glow, mouvement, WebGL** ne sont **pas vérifiables par simple WebFetch** (il ne « voit » pas le rendu). Chaque fois que ces points sont documentés, c'est via une **source secondaire nommée et citée** (design system publié, étude de cas d'agence, article technique). En l'absence de source secondaire fiable, le point est marqué **[NON VÉRIFIÉ]** plutôt qu'inventé.
- **Palantir.com** : 2 tentatives WebFetch (`palantir.com` et `www.palantir.com`, 2026-08-31) ne renvoient que le fragment `Home | Palantir` + un lien vers `/sitemap.xml` — la page ne délivre aucun contenu exploitable à cet outil (probable rendu 100 % JS / protection anti-bot). Aucun titre H1 ni DA actuelle vérifiable en direct. Pas de titre inventé ci-dessous.
- **Railway.com** : 2 tentatives WebFetch (`railway.com` et `railway.com/`, 2026-08-31) renvoient toutes deux une page `Railway for AI Agents` — une doc d'onboarding pour agents IA (setup MCP/CLI), pas la home marketing humaine. Railway sert donc un contenu différent selon le client qui requête la racine du domaine. Home marketing non vérifiable en direct via cet outil. Fait notable en soi (voir point 6 sobriété).

---

## PARTIE 1 — Agents opérationnels haut de gamme

### Sierra (sierra.ai)

1. **H1** : « Better outcomes. Built on Sierra. » — **Sous-titre** : « Leading brands succeed with Sierra ». *(WebFetch, sierra.ai, 2026-08-31)*
2. **Impression de qualité** : structure très aérée (hero → 23 logos clients → 4 points produit → 4 témoignages → 3 modules produit « Ghostwriter / Insights / Horizon » → 10 badges de conformité → CTA), ce qui produit une lecture lente et hiérarchisée. Détail typographique et colorimétrique exact **[NON VÉRIFIÉ]** — WebFetch ne restitue pas le CSS.
3. **Mouvement** : aucune classe `animate/transition` visible dans le Markdown, mais ceci ne prouve rien (JS non exécuté par l'outil). Source secondaire : la refonte a été conduite par l'agence Bakken & Baeck (« Sierra — Bringing conversational AI to life », bakkenbaeck.com/case/sierra), dont le résumé public mentionne des « éléments animés » pour rendre lisibles des fonctions IA complexes — présence de mouvement probable mais **nature et fréquence non vérifiées**.
4. **3D/WebGL/canvas** : aucune balise détectée dans le Markdown ; **non vérifiable de façon fiable** avec cet outil seul.
5. **Fond/accents** : logos clients en SVG dominent visuellement l'écran. Guide de marque officiel (sierra.ai/using-our-brand) confirme une version du logo inversée « blanc sur fond sombre » pensée pour des fonds sombres/chargés — indique un usage de fonds sombres au moins ponctuel, mais **couleur de fond de la home et nombre exact d'accents non vérifiés**.
6. **Une chose copiable** : la hiérarchie de preuve sociale très dense mais séquencée (logos → chiffres → témoignages → produit) avant toute feature détaillée — le produit n'arrive qu'après la preuve, pas avant.

### Decagon (decagon.ai)

1. **H1** : « The AI concierge for every customer » — **Sous-titre** : « Build, optimize, and scale AI agents that treat every customer like the only one. » *(WebFetch, decagon.ai, 2026-08-31)*
2. **Impression de qualité** : ~8 sections identifiées (logos clients, témoignages, différenciateurs produit, omnicanal, ROI chiffré, resource hub, CTA, footer) avec alternance texte/visuel régulière. Échelle typographique, contraste, rythme vertical exacts **[NON VÉRIFIÉ]**.
3. **Mouvement** : aucune preuve trouvée, ni via WebFetch ni via recherche secondaire ciblée (aucune étude de cas publique identifiée sur le design de decagon.ai). **[NON VÉRIFIÉ]**.
4. **3D/WebGL/canvas** : aucune balise détectée. **[NON VÉRIFIÉ]** faute de rendu exécuté.
5. **Fond/accents** : **[NON VÉRIFIÉ]** — pas de source secondaire fiable trouvée sur la palette réelle.
6. **Une chose copiable** : la section « ROI chiffré » placée avant les ressources/CTA — le chiffre business (pas la feature) sert de dernier argument avant la conversion, cohérent avec une cible B2B exigeante.

### Cresta (cresta.com)

1. **H1** : « AI agents for every customer conversation » — **Sous-titre récurrent** : « One AI platform. Every conversation. » *(WebFetch, cresta.com, 2026-08-31)*
2. **Impression de qualité** : ~12 sections (bandeau produit → 3 colonnes Automate/Augment/Analyze → galeries clients sectorielles → témoignages carrousel → 4 tuiles cas d'usage avec métriques → intégrations → certifications → CTA), page décrite comme aérée.
3. **Mouvement / effets** : **avertissement méthodologique** — sur ce site précis, la sortie WebFetch a affirmé la présence de glassmorphism, ombres portées floues, badges pill, dégradés et classes `animate/transition/fade/reveal`, avec plus d'assurance que sur les autres sites analysés. Comme WebFetch ne lit pas le CSS calculé, ces affirmations sont **probablement une inférence du modèle intermédiaire plutôt qu'une observation directe** — à considérer comme **[NON VÉRIFIÉ, signal faible]**, pas comme un fait établi. Aucune source secondaire n'a pu les confirmer.
4. **3D/WebGL/canvas** : non détecté. **[NON VÉRIFIÉ]**.
5. **Fond/accents** : WebFetch avance un fond clair avec 4-5 couleurs (bleu ~#0066FF, charcoal ~#1A1A1A, gris ~#666666, blanc) — même réserve que ci-dessus, **[NON VÉRIFIÉ, signal faible]**, hex non confirmés par une deuxième source.
6. **Une chose copiable** : les 4 tuiles cas d'usage assorties d'une métrique chiffrée chacune (structure « claim → preuve » à l'échelle de la tuile, pas seulement de la page) — pattern réutilisable indépendamment de la DA visuelle.

### Palantir (palantir.com)

**Page non chargée par l'outil disponible** (voir Méthode et limites). Aucune donnée vérifiée sur le hero actuel, la palette, la typographie ou le mouvement à la date du 2026-08-31. Seule information indirecte disponible : une étude de cas de l'agence Fictive Kin (fictivekin.com/work/palantir) décrit une DA antérieure construite autour d'un concept « Heads-Up-Display » en quadrants d'écran plutôt qu'une navigation classique — **référence historique de positionnement, non une confirmation de la home actuelle**. À ré-auditer manuellement (capture d'écran ou Playwright) avant toute citation dans le comparatif.

### Faculty (faculty.ai)

1. **H1** : « Frontier AI for the frontlines of the world. » — **Sous-titre affiché** : « PERSPECTIVES FROM THE FRONTLINE OF AI » (bloc éditorial, pas un sous-titre de hero classique). *(WebFetch, faculty.ai, 2026-08-31)*
2. **Impression de qualité** : source secondaire solide — refonte signée par l'agence **Koto** (Creative Review, creativereview.co.uk/koto-faculty-ai-branding ; koto.com/projects/faculty). La DA combine deux polices : **Faculty Glyphic**, custom, inspirée de l'Albertus (police historique de la signalétique londonienne, clin d'œil à Turing), pour les titres, et **Inter Tight** pour le texte courant. Mise en page inspirée des grilles éditoriales de presse (mastheads, grille magazine) plutôt que du gabarit SaaS standard — c'est le site le plus « éditorial » des cinq agents.
3. **Mouvement** : la même source mentionne des dégradés « qui introduisent de la couleur et du mouvement », sans préciser fréquence ni mécanisme (scroll-reveal vs. décoratif statique animé) — **fréquence exacte non vérifiée**.
4. **3D/WebGL/canvas** : aucune mention dans les sources trouvées. **[NON VÉRIFIÉ]**.
5. **Fond/accents** : WebFetch décrit un fond sombre avec logo blanc pour le hero (2-3 couleurs dominantes perçues) ; cohérent avec un usage de gradients pour l'accent évoqué par Koto, mais **hex exacts non vérifiés**.
6. **Une chose copiable** : le recours à une police display *propriétaire* rattachée à une histoire (Alan Turing / signalétique britannique) plutôt qu'à une police générique « tech » — un accent narratif dans le choix typographique lui-même, indépendant des effets visuels.

---

## PARTIE 2 — Références de sobriété chère

### Linear (linear.app)

1. **H1** : « The product development system for teams and agents » — **Sous-titre** : « Purpose-built for planning and building products. Designed for the AI era. » *(WebFetch, linear.app, 2026-08-31)*
2. **Impression de qualité — le point le mieux documenté du benchmark**. Sources convergentes (opendesigner.io, github.com/VoltAgent/awesome-design-md, designmd.cc/designmd.co, lobehub.com) : fond quasi noir **#08090a** (et #0f1011 sur certains blocs), palette **achromatique** (blanc/gris sur noir) percée d'un **unique accent indigo-violet** — #5e6ad2 en fond, #7170ff en interactif — réservé aux CTA, états actifs et éléments de marque. Typographie 100 % **Inter Variable** avec fonctionnalités OpenType `cv01`/`ss03` activées globalement (rendu plus géométrique), sur une plage de graisses large : 300 (corps léger) → 510 (« medium », poids signature de Linear) → 590 (semi-gras d'emphase). Traduction DA : l'impression de prix vient de la **discipline chromatique** (1 seul accent, appliqué avec parcimonie) combinée à une **hiérarchie par graisse de police** plutôt que par la couleur ou la taille.
3. **Mouvement** : structure de page en 7 sections espacées (Intake/integrations → Planning/monitoring → AI/automations → Build/review/ship → Testimonials → Changelog → Footer) suggérant un rythme de scroll long et régulier ; mécanique précise du mouvement **[NON VÉRIFIÉ]** par les sources consultées.
4. **3D/WebGL/canvas** : aucune preuve trouvée. **[NON VÉRIFIÉ]**.
5. **Fond/accents** : **sombre, confirmé par sources multiples. Un seul accent chromatique** (indigo-violet) — c'est la référence la plus proche du système Syntexia (un fond sombre, un seul accent) dans tout ce benchmark.
6. **Une chose copiable** : l'usage d'**un seul accent en deux valeurs** (fond de composant vs. état interactif) plutôt que d'une palette d'accents multiples — donne de la profondeur sans sortir du système à une couleur.

### Stripe (stripe.com)

1. **H1** (page FR) : « Une infrastructure financière qui booste votre croissance. » — **Sous-titre** : « Acceptez des paiements, proposez des services financiers et personnalisez votre modèle de revenus, quel que soit votre volume de transactions. » *(WebFetch, stripe.com, 2026-08-31 — géolocalisé FR)*
2. **Impression de qualité** : sources convergentes (shadcn.io/design/stripe, kevinhufnagl.com, designmd.co) — police propriétaire **Sohne** en graisse légère (300), encre **#0d253d** (bleu-marine profond, jamais de noir pur) pour le texte, accent de marque **indigo #533afd**. CTA en **forme pilule**, un seul bouton plein par bande (jamais deux CTA pleins en concurrence dans un même hero). Sections bento en haut de page.
3. **Mouvement** : **confirmé et documenté techniquement** — Stripe est la référence historique du dégradé animé dit « gradient mesh » (cream/sherbet/lavande/indigo/rose) plaqué sur le tiers supérieur de la plupart des pages marketing, via une librairie WebGL maison légère (« minigl », ~800 lignes, ~10 Ko) — documenté par plusieurs tutoriels techniques indépendants (kevinhufnagl.com « How To: Create the Stripe Website Gradient Effect », gist GitHub, Medium/Bootcamp). C'est une animation continue de fond, pas un scroll-reveal.
4. **3D/WebGL/canvas** : **oui, confirmé** — WebGL utilisé spécifiquement pour l'animation du dégradé de fond du hero (voir point 3). Usage décoratif, pas de modèle 3D d'objet.
5. **Fond/accents** : **clair**, mais **plusieurs couleurs d'accent visibles simultanément** dans le mesh (au moins 4-5 teintes qui se fondent), en plus de l'indigo de marque — Stripe est à l'opposé d'un système à un seul accent.
6. **Point important pour Syntexia** : Stripe **ne fait pas partie** des exemples « premium sans dégradé ». C'est un contre-exemple utile : sa richesse perçue vient largement d'un effet explicitement interdit par la charte Syntexia (dégradé décoratif + WebGL). Une chose copiable indépendamment du dégradé : la règle du **1 seul CTA plein par bande** — jamais deux boutons pleins en compétition visuelle.

### Anthropic (anthropic.com)

1. **H1** : « AI research and products that put safety at the frontier » — **Sous-titre** : « AI will have a vast impact on the world. Anthropic is a public benefit corporation dedicated to securing its benefits and mitigating its risks. » *(WebFetch, anthropic.com, 2026-08-31)*
2. **Impression de qualité** : sources multiples et convergentes, dont le **skill officiel de brand guidelines publié par Anthropic elle-même** (github.com/anthropics/skills, skill `brand-guidelines`) — fond **clair et chaud**, pas sombre : crème **#faf9f5**, quasi-noir **#141413** pour le texte, gris **#b0aea5**, un accent terracotta **#d97757** en signature, complété par un bleu **#6a9bcc** et un vert **#788c5d** en accents secondaires. Deux familles typographiques (pas une seule) : **Anthropic Serif** (Tiempos/Klim) pour les titres à fort impact éditorial, **Anthropic Sans** (Styrene) pour le corps de texte — registre proche d'une revue universitaire plutôt que d'un site tech. Profondeur obtenue par **blocs de couleur pleins** (larges pavés #141413 à coins de 24 px sur fond clair), **zéro ombre portée**, grille d'espacement en **base 4 px**.
3. **Mouvement** : **[NON VÉRIFIÉ]** — aucune source trouvée ne documente le comportement d'animation de la home.
4. **3D/WebGL/canvas** : **[NON VÉRIFIÉ]**.
5. **Fond/accents** : **clair** (contrairement à l'hypothèse spontanée « IA = fond sombre »), **3 accents distincts au moins** (terracotta, bleu, vert) — pas un système à accent unique.
6. **Une chose copiable, directement transposable en sombre** : la profondeur par **blocs de couleur pleins sans ombre** (contraste de teinte, pas de flou) — c'est exactement le mécanisme de profondeur compatible avec l'interdiction Syntexia des ombres portées floues.

### Vercel (vercel.com)

1. **H1** : « Agentic Infrastructure » — **Sous-titre** : « For coding agents to ship apps and agents automated by agents. » *(WebFetch, vercel.com, 2026-08-31 — home repositionnée « agents » à cette date)*
2. **Impression de qualité** : sources convergentes et officielles (vercel.com/geist/typography, shadcn.io/design/vercel, designmd.cc, designsystems.surf) — fond **quasi blanc #fafafa**, texte/typo **#171717**, **filets fins (hairline borders)**, absence de couleur décorative en dehors d'un élément signature. Échelle typographique précise documentée pour la home : **H1 hero 64 px / graisse 400**, titres de section répétés à **56 px / graisse 450**, affirmations de feature à **30 px**, couches d'UI dense à **14 px** — avec un **tracking négatif marqué (jusqu'à -0.06em)** sur les grandes tailles. Contraste typographique obtenu par la **graisse et le tracking**, pas par la couleur.
3. **Mouvement** : **[NON VÉRIFIÉ]** par les sources consultées pour le comportement précis (scroll-reveal ou non) — seule l'échelle statique est documentée.
4. **3D/WebGL/canvas** : pas de 3D produit, mais un **dégradé décoratif** documenté en hero (« vibrant, soft-focus gradient, orange vers vert sarcelle ») sur un fond par ailleurs monochrome — point de friction direct avec l'interdit Syntexia, à noter.
5. **Fond/accents** : **clair, quasi monochrome noir/blanc**, avec un unique élément de dégradé décoratif en hero — proche d'un système à accent unique mais pas totalement pur.
6. **Point notable pour Syntexia** : Vercel utilise **une police mono (Geist Mono) pour les titres et métadonnées** en capitales à 11-13 px — c'est un usage typographique **explicitement interdit** par la charte Syntexia (pas de mono en interface, pas de capitales interlettrées). Vercel prouve que cet effet fonctionne *pour un site développeur*, mais il ne doit pas être copié ici. Une chose copiable en revanche : la **hiérarchie purement par graisse + tracking négatif** à échelle typographique fixe (64/56/30/14), sans varier la couleur.

### Railway (railway.com)

**Home marketing non chargée par l'outil disponible** (voir Méthode et limites — la racine du domaine sert une doc pour agents IA au lieu de la page humaine). Aucune recherche secondaire ciblée n'a produit de source fiable et datée sur la DA actuelle de la home (les résultats de recherche renvoyaient du contenu générique « dark purple website design » sans rapport avec Railway spécifiquement). **Aucune donnée exploitable pour ce site** — à ré-auditer manuellement (navigateur direct ou Playwright) avant toute citation dans le comparatif. Fait technique notable en soi : Railway distingue le trafic agent du trafic humain à la racine du domaine, ce qui est un signal (hors DA) de maturité produit côté « agent-readiness ».

---

## SYNTHÈSE

### A. Les 2-3 leviers qui produisent l'impression de prix élevé, hors effets interdits — classés par impact

1. **Discipline chromatique stricte (le plus fort levier, le plus corrélé)** : chaque site jugé le plus « cher » limite ses accents. Linear : 1 seul accent en 2 valeurs sur fond quasi noir. Anthropic : fond clair + 3 accents mais appliqués en blocs pleins, jamais mélangés. Vercel : quasi zéro couleur hors un seul élément. À l'inverse, Stripe (accent le plus visuellement riche) obtient sa richesse via un dégradé WebGL animé — un effet interdit ici. **Conclusion : le nombre d'accents simultanés est le signal le plus fiable, indépendamment du fond clair/sombre.**
2. **Hiérarchie par graisse et tracking plutôt que par la couleur ou la taille brute** : Linear (300→510→590 sur une seule famille Inter), Vercel (mêmes tailles répétées à 64/56/30/14 px, variation par graisse 400/450 et tracking négatif jusqu'à -0.06em). C'est un levier directement copiable avec une seule famille (Archivo) et une échelle à 5 crans : faire porter la hiérarchie sur le **poids** et l'**interlettrage négatif**, pas sur l'ajout de tailles ou de couleurs.
3. **Profondeur par blocs de couleur pleins et filets fins, jamais par le flou** : Anthropic (blocs #141413 à coins nets, zéro ombre) et Vercel (hairline borders, pas de card shadow) créent du relief sans ombre portée floue ni glass — exactement compatible avec les interdits Syntexia.

### B. Qui réussit le premium en restant sobre (sans dégradé ni glow) ?

- **Linear** : le cas le plus pur — fond quasi noir, un seul accent en 2 valeurs, tout le reste de la hiérarchie vient de la graisse Inter. C'est la référence la plus proche du cahier des charges Syntexia (fond très sombre + accent unique).
- **Anthropic** : sobre mais pas single-accent (3 couleurs) ; sobre surtout par l'absence d'ombre et l'usage de blocs pleins — utile pour la mécanique de profondeur, moins pour la discipline chromatique.
- **Vercel** : sobre sur 95 % de la page (monochrome, hairline borders), mais casse la règle avec un dégradé décoratif en hero — **ne pas le citer comme exemple pur de sobriété**, seulement pour sa mécanique typographique.
- **Stripe** exclu de cette catégorie : sa richesse perçue dépend structurellement d'un dégradé WebGL animé, effet interdit par la charte Syntexia.

### C. Le mouvement : qui en met, qui n'en met pas, corrélation avec la qualité perçue ?

Aucune des dix pages n'a pu être auditée en exécution réelle (WebFetch ne rend pas le JS) — donc pas de mesure fiable de fréquence de mouvement par écran pour ce lot. Seul point ferme et documenté par sources techniques indépendantes : **Stripe** utilise une animation continue de fond (WebGL gradient mesh), pas du scroll-reveal. **Aucune corrélation établie entre volume de mouvement et impression de prix** dans ce corpus : les deux sites les mieux documentés pour leur sobriété perçue (Linear, Anthropic) n'ont **aucune preuve confirmée de mouvement notable**, alors que le site le plus animé confirmé (Stripe) est aussi celui qui s'écarte le plus des contraintes Syntexia. Le signal disponible penche plutôt vers : **la qualité perçue ne vient pas du volume de mouvement mais de la discipline chromatique et typographique (voir A)** — mais ceci reste une inférence sur un échantillon incomplet, à traiter comme une hypothèse de travail, pas un fait établi.

### D. Cinq recommandations concrètes et chiffrées

1. **Fixer l'accent cuivré à un seul usage fonctionnel** (CTA + état actif uniquement, en 2 valeurs de la même teinte comme Linear #5e6ad2/#7170ff) — jamais en fond de section ni en illustration décorative. Zéro deuxième accent, contrairement à Anthropic.
2. **Porter la hiérarchie du H1 sur le poids et le tracking, pas sur la taille seule** : sur Archivo, viser un écart de graisse net entre H1 et corps (ex. Bold/700 vs Regular/400) plutôt qu'un simple saut de taille, avec un tracking légèrement négatif sur le H1 (de l'ordre de -0.01 à -0.02em, jamais positif/interlettré) — inspiré du -0.06em de Vercel, adapté à Archivo qui est plus large qu'Geist.
3. **Porter le vide vertical entre sections à un multiple net et constant de l'échelle** (ex. base 8 px, sections espacées à 96-128 px) plutôt qu'un espacement variable — c'est la grille 4 px d'Anthropic et le rythme de scroll long de Linear (7 sections avec respiration constante) qui produisent la lecture « posée » plutôt que « dense ».
4. **Remplacer toute intention d'ombre portée par un bloc de couleur plein ou un filet 1 px** pour distinguer les cartes/modules — méthode directement pompée sur Anthropic (blocs #141413 sans ombre) et Vercel (hairline borders), 100 % compatible avec l'interdit Syntexia.
5. **Limiter le mouvement à un seul mécanisme, appliqué une fois par écran maximum** (ex. un fade + translateY discret au premier scroll-reveal de chaque section, rien d'autre) : aucun des sites sobres analysés ne documente de mouvement riche, donc ne pas chercher à compenser la sobriété chromatique par de l'animation — le risque est de retomber dans l'« animation en cascade » explicitement interdite.

---

*Sources citées inline par site. Points marqués [NON VÉRIFIÉ] : à confirmer par capture d'écran directe (Playwright, taille d'affichage réelle) avant toute décision de DA finale, en particulier Palantir et Railway (pages non chargées), Decagon et Cresta (pas de source secondaire fiable trouvée).*
