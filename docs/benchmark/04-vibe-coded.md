# Benchmark — pattern « vibe coded » (esthétique IA générative par défaut)

Recherche web (WebSearch/WebFetch) menée le 2026-08-31. Aucune capture d'écran ni inspection DevTools réelle n'a été faite sur v0.dev, Lovable, Bolt.new ou Replit Agent dans cette passe (accès direct à leurs galeries non tenté) : tout ce qui suit vient de sources secondaires (retours d'expérience de développeurs, analyses de designers, documentation Tailwind/shadcn officielle pour les valeurs hex). Chaque affirmation est sourcée. Ce qui est déduit plutôt qu'observé directement dans une source est marqué « déduit ».

**Sources principales** (URL + ce qu'elles apportent) :
- [DEV — Why AI Websites All Look the Same](https://dev.to/gdg/why-ai-websites-all-look-the-same-and-how-to-build-something-different-1gan) — mécanisme shadcn/Tailwind comme choix par défaut statistique
- [Bhuwan Garbuja — Why every AI-generated website looks exactly the same](https://www.bhuwan-garbuja.com/blog/why-all-websites-look-the-same/) — composants shadcn par défaut, palette neutre
- [Developers Digest — AI Design Slop: 16 Patterns That Out Your App as Vibe-Coded](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it) — liste de marqueurs + taux d'incidence chiffrés (dark theme 34 %, gradients 27 %, grilles icône-carte 22 %)
- [DEV/kaplich — I analyzed 100 vibe-coded websites](https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275) — analyse empirique de 100 sites, défauts techniques
- [Sikora Software — Top 10 Signs a Website Was Built by AI](https://sikora.software/blog/ai-website-design) — 10 marqueurs détaillés avec exemples littéraux
- [The Fountain Institute — 7 Signs a UI Has Been Vibe Coded](https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui) — marqueurs UI (cards, glow, status dots)
- [VibeMole — How to Avoid Building Apps That Look Vibe Coded](https://vibemole.com/resources/avoid-vibecoded-app-design) — structure de page type, faux contenu
- [newsletters.ai — Why Do A Lot Of AI-Generated Websites Have Purple Vibes?](https://newsletters.ai/p/ai-vs-purple) et [DEV/jaainil — AI Purple Problem](https://dev.to/jaainil/ai-purple-problem-make-your-ui-unmistakable-3ono) — origine Tailwind indigo-500 du biais violet, citation rapportée d'Adam Wathan (créateur de Tailwind)
- [Pagely — Every AI-Built Product Looks the Same](https://pagely.com/blog/every-ai-built-product-looks-the-same-heres-the-opening-for-wordpress/) — badges de plateforme et domaines de déploiement
- [tailwindcolor.com](https://tailwindcolor.com/indigo) / [designrevision.com/tools/tailwind-colors](https://designrevision.com/tools/tailwind-colors) / [doc officielle Tailwind v3](https://v3.tailwindcss.com/docs/customizing-colors) — valeurs hex vérifiées
- [Web-Accessibility-Checker — WCAG contrast guide](https://web-accessibility-checker.com/en/blog/color-contrast-checker-wcag-guide) — seuil de gris passant AA, recalculé indépendamment ci-dessous
- [Landing Metrics — Lighthouse Score guide](https://www.landingmetrics.com/metrics/lighthouse-score) — benchmark Lighthouse médian toutes landing pages confondues (non spécifique à l'IA, voir §2.3)

---

## 1. Esthétique par défaut — marqueurs grep-ables

### 1.1 Couleurs

| Marqueur | Valeur exacte | Vérifié |
|---|---|---|
| Palette « violet AI » — Tailwind v3 | `indigo-500 #6366f1`, `violet-500 #8b5cf6`, `slate-900 #0f172a` | Oui — doc officielle Tailwind v3 |
| Palette « violet AI » — Tailwind v4 (OKLCH) | `indigo-500 #615fff`, `violet-500 #8e51ff`, `slate-900 #0f172b` | Oui — tailwindcolor.com |
| Origine du biais | Modèles entraînés sur un corpus massif de sites Tailwind/shadcn, où `indigo-500`/`bg-indigo-*` est le bleu-violet par défaut le plus fréquent → association statistique « moderne = violet ». Citation rapportée (non vérifiée à la source primaire Twitter/X) d'Adam Wathan, créateur de Tailwind, s'excusant d'avoir mis `bg-indigo-500` sur « tous les boutons » de Tailwind UI il y a des années | Rapporté par 2 sources secondaires, source primaire (X) non consultée |
| Dégradé hero | `bg-gradient-to-r from-indigo-500 to-violet-600` (ou variantes proches) appliqué au fond du hero et/ou au texte du H1 | Pattern décrit, syntaxe Tailwind déduite du nom de classe usuel |
| Boucle d'auto-renforcement | Les sites générés par IA se retrouvent en ligne et réintègrent le corpus d'entraînement des modèles suivants → le biais violet s'auto-amplifie dans le temps | Déduit / rapporté, pas de mesure longitudinale citée |

**Comment grep** : dans le CSS compilé ou le HTML, chercher `#615fff`, `#6366f1`, `#8e51ff`, `#8b5cf6`, `#0f172a`, `#0f172b`, ou les classes utilitaires `indigo-500`, `violet-500`/`-600`, `from-indigo`, `to-violet`.

### 1.2 Typographie

- Police Inter quasi systématique, en particulier sur les H1 centrés (source : Developers Digest).
- Combinaisons répétées observées : Space Grotesk, Instrument Serif, Geist (souvent Inter + un mot du H1 en italique serif comme accent).
- Guillemets typographiques « courbes » parfaits partout dans la copy — signale un texte collé depuis un prompt plutôt que tapé (source : Sikora Software).
- Tiret cadratin (—) en fréquence anormalement élevée dans les titres et CTA. Exemple littéral cité : « Build faster — without sacrificing quality — using our next-gen platform. » (source : Sikora Software). Note : cette même règle (« jamais de tiret cadratin ») est déjà un standard imposé dans les livrables Baptiste/Cinq., pour la même raison — c'est un tell IA documenté indépendamment.

**Comment grep** : compter les occurrences de `—` (U+2014) et `–` (U+2013) pour 100 mots de copy ; compter les guillemets `“ ”` (U+201C/201D) vs `" "` droits.

### 1.3 Composants et structure de page

- Badge pilule (« pill badge ») avec point animé/pulsant juste au-dessus du H1, souvent « ✨ New » ou équivalent — pattern packagé nativement dans les blocs shadcn (ex. `PillIndicator` avec `pulse`).
- Hero centré, sur-titré, avec sous-titre générique et deux CTA (un plein, un outline).
- Trois (ou quatre) feature cards structurellement identiques : icône en haut, titre, 1-2 lignes de description de longueur quasi égale — symétrie rigide plutôt que hiérarchie de contenu (source : Sikora Software, Fountain Institute).
- Cartes imbriquées sur 3-4 niveaux (carte dans carte dans carte), qui pondèrent tout au même niveau visuel et effacent la hiérarchie (source : Fountain Institute).
- Bordure colorée fine sur le bord gauche (ou haut) des cartes/blocs de contenu — « left-border gradient card » — pour donner un sentiment de « design » sans décision de mise en page réelle (source : Sikora Software, Developers Digest).
- Bandes latérales multicolores sur chaque bloc de contenu, sans logique de hiérarchie (source : Fountain Institute).
- « Status dots » (petits cercles colorés) sur des items de nav, en-têtes de carte, labels — qui ne correspondent à aucun état réel : « décoration qui ressemble à de la donnée » (source : Fountain Institute).
- Séquences numérotées « 1, 2, 3 » pour les étapes de fonctionnement.
- Bandeau de statistiques (« stat banner »), grille de logos clients.
- Sections toujours dans le même ordre : Hero → bandeau logos → 3 features → « How it works » en 3 étapes → témoignages → pricing (3 tiers) → FAQ → CTA final → footer 4 colonnes.
- Toast de notification qui glisse depuis le coin inférieur — présent même sans fonctionnalité qui le justifie (source : Bhuwan Garbuja).
- Emoji utilisés à la place d'icônes vectorielles — en nav, en bullet points, en décoration de fond. Ne s'adaptent pas au dark mode ni au hover, pas d'héritage de couleur CSS (source : Sikora Software, Fountain Institute).
- Sidebar à gauche, groupe de boutons en haut à droite, tableau de données centré — layout dashboard « par défaut » shadcn (source : Bhuwan Garbuja).

**Comment grep/vérifier** : compter les niveaux d'imbrication `<div class="card">` ; chercher les emoji Unicode (plages U+1F300–U+1FAFF, U+2600–U+27BF) dans le markup hors contenu éditorial ; vérifier si 3 cards ont un nombre de mots quasi identique (± 2 mots).

### 1.4 Effets CSS nommés

- Glassmorphism : panneaux en verre dépoli (`backdrop-filter: blur(...)`, fond semi-transparent, bordure fine claire) — persistance d'une tendance 2022 (source : Developers Digest).
- Glow décoratif : ombres colorées larges (`box-shadow` de couleur, halos radiaux) et fonds « aurora borealis » derrière le hero, sans fonction d'interaction ou de statut (source : Fountain Institute).
- Mode sombre par défaut, souvent choisi parce qu'il masque une structure de contenu faible : ajouter un dégradé + un glow + des cartes en verre donne une impression de « fini » même quand le contenu est vague (source : VibeMole).
- Coins arrondis systématiques sur boutons, cartes, inputs, sans variation (`rounded-xl`/`rounded-2xl` partout).

**Comment grep** : chercher `backdrop-filter`, `blur(`, `box-shadow` avec valeurs de couleur saturée, `rounded-xl`/`rounded-2xl`/`rounded-full` en fréquence très élevée dans le CSS.

### 1.5 Signatures de plateforme (le marqueur le plus direct)

- Badge visible « Built with v0 » (coin inférieur, ne disparaît pas toujours même en désactivant l'option « Show v0 Branding » côté gratuit) ou « Built with Lovable » injecté dans le HTML (source : discussions communauté Vercel, Lovable docs).
- Domaine de déploiement non reconfiguré : `*.lovable.app`, `*.bolt.host`, `*.v0.dev`, `*.vercel.app` visible dans une redirection ou un lien de partage (source : Pagely).
- Favicon par défaut de l'outil de build (ex. `vite.svg`) ou favicon générique/placeholder resté en prod (source : DEV/kaplich, sur l'analyse de 100 sites, particulièrement fréquent sur les sites Lovable).

**Comment grep** : `curl -s <url> | grep -iE "built with (v0|lovable)|lovable\.app|bolt\.host|v0\.dev"` ; inspecter `<link rel="icon">`.

---

## 2. Faiblesses par marqueur

| Marqueur | Originalité | Crédibilité | Technique (mesurable) |
|---|---|---|---|
| Dégradé indigo/violet Tailwind par défaut | Élevé — c'est littéralement « la police Times New Roman du design généré par IA » (citation Fountain Institute) | Faible en soi, mais renforce l'impression de « pas de vraie identité de marque » | Aucune en soi, sauf si le dégradé anime en continu (coût CPU/GPU mobile, voir 2.3) |
| Badge pilule + point pulsant | Élevé — composant shadcn copié-collé tel quel sur des milliers de sites | Signale un site monté vite, sans annonce produit réelle derrière le badge « New » | `animation: pulse` en boucle infinie = re-render continu, impact batterie mobile mesurable via DevTools Performance |
| 3 feature cards de longueur identique | Élevé | Signale une génération automatique plutôt qu'une hiérarchisation réelle des bénéfices | Aucune faiblesse technique directe |
| Cartes imbriquées 3-4 niveaux | Moyen | Neutre côté crédibilité | DOM plus profond → plus de nœuds à peindre, CSS de moins en moins spécifique, risque de spécificité en cascade et de repaints inutiles |
| Emoji en guise d'icônes | Élevé | Lecture « prototype », pas produit fini | Mesurable : les emoji ne suivent pas `currentColor`, cassent en dark mode, et surtout ne sont pas annoncés de façon fiable par tous les lecteurs d'écran → échec WCAG 1.1.1 (contenu non textuel) si utilisés comme seul porteur de sens sans alternative accessible |
| Glow/glassmorphism décoratif | Moyen | Signale « démo », pas « outil de travail » | `backdrop-filter: blur()` est coûteux en rendu (repaint GPU sur toute la zone), dégrade le score Lighthouse Performance sur mobile bas de gamme — mesurable au profiler |
| Toast qui glisse sans fonction | Faible | Signale un composant copié sans usage réel | Aucune faiblesse technique directe, sauf accessibilité si non annoncé en `aria-live` |
| Status dots sans état réel | Faible | « Décoration qui ressemble à de la donnée » — trompeur si l'utilisateur croit lire un statut système | Contraste souvent non testé (petit point coloré sur fond coloré) |
| Badge « Built with v0/Lovable » ou domaine `*.lovable.app` non reconfiguré | Nul (marqueur direct, pas un style) | Maximal — preuve irréfutable que le site n'a pas été personnalisé jusqu'au bout | Aucune, c'est une chaîne de caractères visible dans le HTML |
| Favicon par défaut / placeholder | Nul | Élevé — signal de site non finalisé, observé sur l'analyse empirique de 100 sites (DEV/kaplich) | Vérifiable en 1 ligne de `curl` |
| Texte gris clair sur fond clair | Faible (esthétique répandue hors IA aussi) | Faible | **Vérifiable et grave** : contraste souvent < 4,5:1. Recalcul indépendant fait dans cette recherche : `#767676` sur fond blanc pur donne un ratio de ≈ 4,54:1 (juste au-dessus du seuil AA texte normal) ; tout gris plus clair que `#767676` sur blanc **échoue** WCAG 2.1 AA 1.4.3. Beaucoup de vibe-coded sites utilisent des gris plus clairs que ça pour le texte secondaire. |
| Alt manquants sur les images | Nul | Faible en soi | Mesurable : sur l'analyse de 100 sites, « multiple images with no alt attributes » citée comme défaut récurrent — échec WCAG 1.1.1, cassant pour lecteurs d'écran |
| Hiérarchie de titres cassée (H1→H4, ou `<div>` stylés en heading) | Nul | Faible en soi | Mesurable : navigation au clavier/lecteur d'écran par landmarks cassée ; impact SEO direct (Google structure la page via les headings) — cité comme défaut fréquent sur les 100 sites analysés |
| Meta description manquante/générique, OpenGraph incomplet | Nul | Signale un site non finalisé | Mesurable : partage sur Slack/LinkedIn/Discord sans aperçu correct ; SEO dégradé — cité comme défaut fréquent sur les 100 sites analysés |
| Copyright avec année obsolète en footer | Nul | Fort — preuve que le site n'a pas été retouché depuis la génération initiale | Vérifiable par `grep` du footer contre l'année courante |
| Viewport meta manquant / touch targets mal dimensionnés | Nul | Faible en soi | Mesurable : rendu mobile cassé, échec direct au test « mobile-friendly » de Google |
| Images/héros non compressées | Faible | Faible | Mesurable : poids de page, LCP (Largest Contentful Paint) dégradé — cité comme défaut fréquent |

### 2.3 Sur la mesure Lighthouse en général

Aucune étude comparative rigoureuse « sites vibe-coded vs sites codés à la main » sur les scores Lighthouse n'a été trouvée dans cette recherche — **ne pas citer de chiffre agrégé comme s'il existait**. Le seul repère trouvé est un benchmark général (non spécifique à l'IA) : score Lighthouse médian toutes landing pages confondues ≈ 72 desktop / 37 mobile (source : Landing Metrics). Ce qui EST vérifiable site par site, sans étude préalable : `backdrop-filter`/glow lourds, images non compressées, JS tiers empilé, alt manquants, headings cassés, meta manquants — chacun mesurable directement par Lighthouse ou DevTools sur le site du client concurrent, sans avoir besoin d'un chiffre moyen.

---

## 3. Copy — formulations qui trahissent un site généré

Exemples littéraux relevés dans les sources (pattern générique de génération de landing page IA, pas des citations d'un site précis identifié) :

- **Titres/CTA de section** : « Ready to transform your [X]? », « Ready to stop guessing and start growing? », « Join thousands of businesses already using [produit] to [bénéfice] », « No credit card required », « Cancel anytime », « Start Building » / « Get Started Free ».
- **Formulations verbales génériques** (recensées dans les recherches sur la copy IA, usage très large donc à traiter comme des drapeaux rouges plutôt que des citations exactes d'un outil précis) : « Unlock the power of… », « Seamlessly integrate… », « Boost your productivity », « Effortlessly [verbe] », « Supercharge your [nom] », « next-gen platform ».
- **Titres de sections toujours identiques** : « Features », « How it works », « Why choose us », « Frequently Asked Questions », « Ready to get started? ».
- **Tiret cadratin dans les titres** pour créer un effet de rythme artificiel — exemple cité : « Build faster — without sacrificing quality — using our next-gen platform. »
- **Absence de spécificité chiffrée crédible** : bénéfices formulés en pourcentages ronds et non sourcés (« Boost efficiency by 50% ») sans étude de cas nommée derrière.

**Non vérifié** : je n'ai pas pu confirmer que ces formulations sortent verbatim d'un prompt système de v0/Lovable/Bolt spécifique — elles sont documentées comme des patterns récurrents observés par des développeurs et designers sur de nombreux sites, pas comme une fuite de prompt.

---

## 4. Faux signaux de preuve — comment ces sites simulent la traction

| Technique | Description | Source |
|---|---|---|
| Témoignages sans identité vérifiable | Prénom + initiale (« John D. »), ou combinaisons de noms très communes (John Smith, Sarah Johnson, Michael Brown, Alex Miller) + titre générique (« Verified User », « Product Lead ») | Sikora Software, 0xminds |
| Avatars stock ou générés | Portraits « impossiblement symétriques », visages IA hyperréalistes utilisés comme photo de témoignage | Sikora Software |
| Témoignages tous parfaits | Aucune nuance, uniquement des éloges — « si tous les témoignages sont parfaits, aucun n'est crédible » | 0xminds |
| Logos clients fictifs | Outils dédiés existent spécifiquement pour ça (ex. générateurs de « fake trusted-by wall » avec des centaines de logos de marques inventées) — preuve que la pratique est assez répandue pour avoir généré son propre marché | fakelogo.com (cité comme illustration du problème, pas recommandé) |
| Compteurs animés à zéro figé | Sur un fetch statique (sans exécution JS), les compteurs animés affichent souvent « 0 » car l'animation ne s'est jamais déclenchée — un signe indirect que le chiffre affiché à l'utilisateur normal est généré côté client sans donnée réelle en fallback | Observé dans le benchmark concurrent PolyAI (`docs/benchmark/01-voix.md` de ce même dossier, § PolyAI) — pattern générique, pas spécifique à un outil de vibe coding |
| Dashboards/captures d'interface factices | Faux écrans produit affichés en hero sans lien vers un vrai produit testable, ou sans mention qu'il s'agit d'une maquette | VibeMole |
| Badges de certification décoratifs | Badges type SOC2/ISO affichés sans lien vers un rapport d'audit ou une page trust center vérifiable | Déduit du pattern général observé dans le benchmark concurrent (Parloa, Bland.ai dans `01-voix.md`, qui eux sourcent correctement leurs badges — sert de contre-exemple de bonne pratique) |

**Recommandation implicite du client (VibeMole, cohérente avec la philosophie « proof-first » du CLAUDE.md Cinq.)** : remplacer par du réel — capture d'écran d'un vrai rapport, un exemple de résultat réel, un avant/après réel, plutôt que la simulation.

---

## 5. Test de reconnaissance — checklist 10-15 points vérifiables

| # | Critère | Comment vérifier | Seuil de bascule « généré » |
|---|---|---|---|
| 1 | Palette primaire = indigo/violet Tailwind par défaut | `grep` du CSS/HTML pour `#6366f1`, `#615fff`, `#8b5cf6`, `#8e51ff`, ou classes `indigo-500`/`violet-500`/`violet-600` | Présence de la valeur exacte (tolérance ± 5 % en luminosité) |
| 2 | Badge de plateforme dans le HTML | `curl -s <url> \| grep -iE "built with (v0\|lovable)"` | 1 occurrence = généré confirmé |
| 3 | Domaine de déploiement non reconfiguré | Vérifier redirections/liens vers `*.lovable.app`, `*.bolt.host`, `*.v0.dev`, `*.vercel.app` | 1 lien externe restant = signal fort |
| 4 | Favicon par défaut/placeholder | Inspecter `<link rel="icon">`, comparer au favicon générique de l'outil (ex. `vite.svg`) ou absence de favicon | Favicon générique ou 404 = positif |
| 5 | Copyright obsolète en footer | `grep` du footer pour une année < année courante | Année ≠ année en cours au moment de la visite |
| 6 | 3 feature cards de longueur quasi identique | Compter les mots de chaque description de carte | Écart ≤ 2 mots entre les 3 cartes |
| 7 | Badge pilule + point pulsant au-dessus du H1 | Observation binaire visuelle | Présent/absent |
| 8 | Emoji utilisés comme icônes fonctionnelles (nav, features, bullets) | `grep` des plages Unicode emoji (U+1F300–U+1FAFF, U+2600–U+27BF) dans le markup hors zone éditoriale | ≥ 1 emoji utilisé en tant qu'icône (pas en tant que contenu rédactionnel) |
| 9 | Tiret cadratin en fréquence élevée dans les titres/CTA | Compter `—`/`–` pour 100 mots de copy visible | > 1 occurrence pour 100 mots dans les titres/CTA (zone habituellement sans ponctuation longue) |
| 10 | Contraste texte secondaire gris sur fond clair | Contrast checker (WebAIM, DevTools) sur le texte gris le plus fréquent | Ratio < 4,5:1 (texte normal) ou < 3:1 (grand texte) |
| 11 | Alt manquants sur les images | `grep -c '<img' vs grep -c 'alt='` ou audit Lighthouse Accessibility | > 0 image sans `alt` ni `alt=""` intentionnel |
| 12 | Hiérarchie de titres cassée | Lister l'ordre des balises `<h1>`–`<h6>` dans le DOM | Saut de niveau (ex. h1 → h4) ou `<div>` stylé visuellement comme un heading sans balise sémantique |
| 13 | Meta description/OpenGraph manquants ou génériques | `view-source` ou audit SEO (Lighthouse SEO) | `<meta name="description">` absente, vide, ou dupliquée avec le H1 mot pour mot |
| 14 | Témoignages sans identité vérifiable | Recherche du nom + entreprise cité (LinkedIn/Google) | Aucune trace publique de la personne citée, ou titre générique type « Verified User » |
| 15 | Effets décoratifs coûteux sans fonction | DevTools Performance : compter les `backdrop-filter`/`box-shadow` colorés animés en continu | ≥ 1 effet `blur`/`glow` en boucle infinie sans lien avec un état d'interface |

**Seuil global proposé (déduit, pas issu d'une source)** : 4 critères positifs ou plus sur 15 = un observateur averti reconnaît le site comme généré au premier coup d'œil ; 7 ou plus = reconnaissance quasi certaine, y compris pour un public non technique.

---

## Ce qui n'a pas pu être vérifié

- Aucune galerie publique (v0.dev/gallery, showcase Lovable/Bolt) n'a été directement consultée en WebFetch dans cette passe — les marqueurs viennent d'analyses tierces convergentes (6+ sources indépendantes citant les mêmes patterns), pas d'une observation directe de captures d'écran par cet agent.
- La citation attribuée à Adam Wathan (Tailwind) n'a pas été vérifiée à la source primaire (X/Twitter), seulement rapportée par deux sources secondaires concordantes.
- Aucun chiffre agrégé fiable de type « X % des sites vibe-coded ont un score Lighthouse < Y » n'existe dans les sources trouvées — ne pas en inventer un dans la copy client.
- Les formulations de copy (§3) sont des patterns récurrents documentés, pas des citations confirmées d'un prompt système d'un outil précis.
