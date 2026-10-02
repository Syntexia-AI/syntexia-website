# INVENTAIRE.md

Wagon W0. Confirmation point par point de la section 1 de la directive, contre le code réel.

Repo : Syntexia-AI/syntexia-website, commit `c887605d74b2236bd97689f16799dac08fcec2bd`, auteur : voir `git log -1 --format=%an`, 2026-08-18 16:55:45 +0100, commit unique.
Branche de travail : `refonte-2026-09`, créée depuis `main`. Aucune modification de code en W0.
Date de l'inventaire : 2026-08-31.

Légende : **CONFIRMÉ** = la directive dit vrai. **DIVERGENCE** = le code dit autre chose. **PRÉCISION** = la directive dit vrai mais incomplet.

---

## 1. Absence de build

**CONFIRMÉ.** Aucun `package.json`, aucun `node_modules`, aucun lockfile. `git ls-files` retourne 71 fichiers, tous statiques. `vercel.json` porte `cleanUrls: true` et `trailingSlash: false`.

## 2. Sept routes déployées

**CONFIRMÉ.** Sondage HTTP réel du 2026-08-31 sur `https://www.syntexia.ai` :

| route | code |
|---|---|
| `/` | 200 |
| `/about` | 200 |
| `/team` | 200 |
| `/blog` | 200 |
| `/posts/precedent-meets-pace` | 200 |
| `/posts/the-quiet-revolution-coming-to-audit` | 200 |
| `/install-signature` | 200 |
| `/robots.txt` | 404 |
| `/sitemap.xml` | 404 |
| `/favicon.ico` | 404 |
| `/apple-touch-icon.png` | 404 |
| `/security` | 404 |
| `/og-image.svg` | 200 |

**CONFIRMÉ.** Aucune page secteur n'existe. Les secteurs sont la grille `INDUSTRIES` de `src/sections.jsx:392-398`, cinq cartes sans lien.

Contrôle supplémentaire : le HTML servi en production pour `/` est **identique octet pour octet** au `index.html` du repo (3051 octets, `diff` vide). Le déployé correspond au commité.

## 3. Home : chargement React

**CONFIRMÉ** ligne par ligne dans `index.html` :

- `react@18.3.1/umd/react.development.js` (l.36), SRI présent.
- `react-dom@18.3.1/umd/react-dom.development.js` (l.37), SRI présent.
- `@babel/standalone@7.29.0/babel.min.js` (l.38), SRI présent.
- Les trois depuis `unpkg.com`, `crossorigin="anonymous"`.
- `src/tweaks-panel.jsx` (l.54), `src/sections.jsx` (l.55), `src/app.jsx` (l.56) en `type="text/babel"`.
- `window.TWEAK_DEFAULTS` avec marqueurs `/*EDITMODE-BEGIN*/` et `/*EDITMODE-END*/` (l.45-51).

**PRÉCISION non portée par la directive, et elle est structurante.** Le rendu est intégralement client. Le HTML servi pour la home ne contient **32 mots**, dont la totalité est le `<title>` et le bloc `TWEAK_DEFAULTS`. Aucun titre, aucun paragraphe, aucun lien de navigation n'existe dans le document servi. Conséquences : aucun contenu indexable sans exécution JavaScript, et transpilation Babel en navigateur à chaque visite. C'est la justification technique de W2, au delà du confort.

Corollaire : `.reveal { opacity: 0 }` (`src/styles.css:1136`) n'est levé que par `IntersectionObserver` dans `useReveal` (`src/sections.jsx:8-28`). Si le JS échoue après le premier rendu, la page est visuellement vide. Les pages statiques n'utilisent pas `.reveal` (0 occurrence), elles ne sont pas exposées à ce risque.

## 4. Autres pages

**CONFIRMÉ.** `about.html`, `team.html`, `blog.html`, `posts/*.html` : `grep '<script'` retourne zéro sur les cinq fichiers. Toutes chargent `/src/styles.css?v=3`.

## 5. `src/design-canvas.jsx`

**CONFIRMÉ.** 966 lignes, 52 Ko, référencé uniquement par `_internal/Syntexia Logo.html:327`. Code mort en production.

**DIVERGENCE.** La directive ne mentionne pas `src/logo-app.jsx` : 214 lignes, 8 Ko, référencé uniquement par `_internal/Syntexia Logo.html:328`. Même statut de code mort. Il doit rejoindre la liste de suppression de W1.

## 6. `src/styles.css`

**CONFIRMÉ** : six palettes (`copper` / `steel` / `mono` par `dark` / `light`), déclarées l.13, 27, 41, 57, 71, 85. Seule `copper/dark` est activée (`app.jsx:10-12` la pose depuis `TWEAK_DEFAULTS`).

**CONFIRMÉ** : `.hero-title .verb` l.327. `.reveal` transition `.8s` l.1136-1140. `backdrop-filter: blur(16px) saturate(160%)` l.170-171. `.nav-links .nav-link:not(.nav-cta) { display: none; }` l.274, sans menu de remplacement. Aucun `:focus-visible` (0 occurrence). `prefers-reduced-motion` l.228 ne couvre que `.brand-mark`.

**CONFIRMÉ** : `border-radius` 999px présent 7 fois, 50% présent 7 fois.

**PRÉCISION** : la directive liste les rayons 18 / 16 / 14 / 12 / 10px. Décompte réel : 18px ×3, 16px ×2, 14px ×1, 12px ×1, 10px ×1, **4px ×1** non listé. Total 16 déclarations de `border-radius`.

**DIVERGENCE, et l'écart est du simple au double.** La directive annonce « `font-size` 9, 10 et 11px à une vingtaine d'endroits ». Décompte réel des tailles sous le plancher de 13px : 11px ×16, 10.5px ×16, 10px ×6, 12px ×1, 11.5px ×1, 9.5px ×1, 9px ×1, soit **42 occurrences**. Le chantier de W3 point 5 est deux fois plus lourd qu'annoncé.

Relevé complémentaire pour W3 : `text-transform: uppercase` 28 occurrences. `linear-gradient` 3 occurrences (l.444, 445, 900). `font-feature-settings: 'ss01','ss02','cv11'` l.109, spécifique à Geist. Polices déclarées : Geist (corps, l.108), Instrument Serif (`.serif`, `.serif-it`), JetBrains Mono (`.mono` et une quinzaine d'usages d'interface).

Palette `copper/dark` réelle, l.13-26, à reprendre telle quelle en W3 sauf `--mute-2` :

```
--bg:#0B0A08   --bg-2:#110F0C   --surface:#181612   --line:#2A2622   --line-soft:#1E1B17
--ink:#F4F0E6  --ink-2:#C9C3B5  --mute:#837C6F      --mute-2:#5A554B
--accent:oklch(0.79 0.12 65)    --accent-ink:#0B0A08    --selection:oklch(0.42 0.08 65)
```

La directive impose de remonter `--mute-2` de `#5A554B` à `#6F6A5F`. Valeur de départ confirmée.

## 7. Sections de la home

**CONFIRMÉ.** `src/sections.jsx` définit dans l'ordre : `useReveal` (l.8), `Reveal` (l.30), `BRAND_PATTERN` (l.47), `BrandMark` (l.54), `Nav` (l.66), `HERO_VARIANTS` (l.91), `Hero` (l.127), `LOG_SEED` (l.190), `nowTs` (l.204), `LiveLog` (l.209), `Strip` (l.249), `PILLARS` (l.272), `Pillars` (l.323), `INDUSTRIES` (l.392), `Industries` (l.400), `POSTS` (l.439), `Insights` (l.469), `About` (l.513), `CTA` (l.576), `Footer` (l.612). Assemblage dans `app.jsx:29-37`.

Détails confirmés :

- `Hero` : le `<h1>` contient le sous-titre dans un `<span className="small">` (h1 l.140, span l.142). Badge `Live` l.134. Trois variantes `editorial` / `bold` / `quiet`.
- `LiveLog` : en-tête `/ inside customer environment · anonymized` (l.231), horodatage vivant via `nowTs()` (l.204-208), rotation toutes les 1800 ms. `LOG_SEED` contient bien `Citizen request #48921` (l.191) et `Discrepancy £842` (l.198), plus `€12,400 / PO-7733`, `SKU LX-204`, `cohort Q1-26 · +14%`. **Toutes ces données sont inventées et présentées sous un libellé qui affirme l'inverse.**
- `Strip` : marquee, items `Live in production`, `UK · Headquartered London`, `Anthropic Claude Partner Network`, `Operations across Europe`, `Real organisations · real ops`, `Embedded, not bolted on` (l.251-256).
- `Pillars` : auto-avance `setInterval(..., 7000)` l.329. Métriques confirmées : `~70 %`, `Days → hrs` (deux fois), `~80 %`, `↑`, `↓`, `Pre-pay`, plus `60 %`, `3 → 1`, `0`, `Now`, `Act · not react`.
- `Industries` : cinq cartes conformes (Financial Services `−60%`, Audit & Assurance `Hours saved`, Public Sector `~70%`, Retail & Luxury `Live`, Legal Services `Live`).
- `Insights` : trois cartes, la troisième (`Hospitality intelligence, beyond the dashboard.`, Mar 2026) pointe vers `/blog` (l.465).
- `About` : stats `5` / `UK` / `EU` (l.534-544). Signature `we build the intelligence businesses run on.` l.564.
- `CTA` : `mailto:office@syntexia.ai`, `tel:+442046204570`, `Location` vers `#` (l.599).
- `Footer` : `Approach`, `Security`, `Careers`, `LinkedIn` vers `#` (l.632, 633, 642, 651).

**PRÉCISION.** Le troisième pilier porte `industry: 'Procurement'` (l.300). Procurement n'apparaît dans aucune autre liste de secteurs du site. C'est un sixième secteur nommé sur la home, invisible dans le décompte « five ».

**PRÉCISION.** La `Nav` contient un `nav-cta` intitulé `Get in touch` (l.80-82), formulation interdite par la section 2 de la directive et emplacement interdit par la section 3.

**CONFIRMÉ.** `BRAND_PATTERN` est bien une matrice 5×5 formant un S, valeur `2` au centre pour le point d'accent (l.47-53).

## 8. `about.html`

**CONFIRMÉ.** Numérotation propre : `01 / Thesis` (l.81), `02 / Practice` (l.109), `03 / Where` (l.165), `04 / Team` (l.184). L'audit externe se trompe, la directive a raison.

**PRÉCISION.** Une anomalie voisine existe : `/ 003` en l.137, classe `seal-num`, dans le bloc Anthropic inséré entre 02 et 03. Ce n'est pas un numéro de section mais il est confusable à la lecture.

**CONFIRMÉ.** `early access to the latest models` l.153. `Meet the founder.` au singulier l.185.

**DIVERGENCE.** La directive annonce « `Live in five industries` puis six nommées ». Le texte l.110 dit bien `Live in five industries`, mais la liste l.115-116 est : `financial services and audit, public sector, legal, retail and luxury, and hospitality`. Cela fait **cinq segments** si les composés comptent pour un, ou **sept noms** si on les décompose. Jamais six. La contradiction est réelle mais pas celle décrite.

**CONFIRMÉ.** 14 tirets cadratins.

## 9. `team.html`

**CONFIRMÉ.** Deux fiches. Fiche 1 : nom, fonction et lien LinkedIn (`team.html:80-85`). Fiche 2 : nom et fonction, sans lien (`team.html:93-94`). Aucune photo, aucune biographie pour l une comme pour l autre. Les valeurs ne sont pas reproduites ici, amendement A1.

**PRÉCISION.** `team.html:66-67` donne une **troisième** liste de secteurs, différente des deux autres : `financial services, audit, public sector, retail, hospitality, and now legal`.

## 10. `blog.html`

**CONFIRMÉ.** Six cartes, quatre vers `#` (l.100, 110, 120, 130). La carte `Boost B2B sales with operational AI analytics.` est bien présente (titre l.105, `href="#"` l.100, catégorie `Playbook`, date `Apr 2026`). `Subscribe` en `mailto:office@syntexia.ai?subject=Subscribe%20to%20Syntexia%20Insights` (l.152).

## 11. Articles

**CONFIRMÉ, et la contradiction est triple.** `the-quiet-revolution-coming-to-audit.html` : meta `article:published_time` = `2026-04-15` (l.21), carte blog = `Apr 2026`, carte home = `Apr 2026`, mais le hero de l'article affiche `May 2026` (l.78). Auteur affiché `Syntexia Editorial` (l.80), et **aucune** meta `article:author`.

`precedent-meets-pace.html` : meta `article:published_time` = `2026-05-23` (l.21), meta `article:author` (l.22) et auteur affiché (l.115) portent le même nom, non reproduit ici (A1), date affichée `May 2026` (l.113). Cohérent.

**PRÉCISION.** `the-quiet-revolution-coming-to-audit.html:130` affirme `Inside the firms we work with, intelligence is now embedded in the day-to-day workflow of engagement teams.` C'est une affirmation de déploiement client, non sourcée, dans un article que la directive protège de toute modification hors typographie. Arbitrage requis, voir RAPPORT-W0.

## 12. Blocage de traduction

**CONFIRMÉ, sur les sept pages sans exception.** `translate="no"` sur `<html>`, `<meta name="google" content="notranslate">`, `<meta http-equiv="Content-Language" content="en">`.

## 13. `og-image.svg`

**CONFIRMÉ.** `radialGradient id="glow"` l.8-13. `font-family="'Instrument Serif', Georgia, 'Times New Roman', serif"` sur les trois lignes de titre l.49-51.

**PRÉCISION.** Le fallback est `Georgia`, puis `Times New Roman`. Hors navigateur le rendu n'est donc pas vide, il est simplement dans la mauvaise police. Deux autres familles apparaissent : monospace l.16 et l.58, sans-serif l.55. Le SVG contient aussi un accent `#D9A56B` en dur, c'est à dire la valeur de repli de `--accent` et non le token.

## 14. Favicon

**CONFIRMÉ.** Seul `<link rel="icon" type="image/svg+xml" href="/syntexia-mark-dark.svg">`. `logo-pack/favicon-32.png` (901 o) et `logo-pack/favicon-48.png` (1951 o) existent mais ne sont pas à la racine. `/favicon.ico` répond 404 en production. `logo-pack/syntexia-mark-dark-256.png` (11770 o) est disponible pour l'apple-touch-icon.

## 15. `vercel.json`

**CONFIRMÉ.** 18 lignes. `cleanUrls`, `trailingSlash`, deux règles de cache. Aucun en-tête de sécurité, aucune redirection.

Contrôle en production : `Strict-Transport-Security: max-age=63072000` est **présent**, posé par Vercel et non par le repo. Absents : `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. La checklist W6 doit tenir compte du fait que HSTS est déjà acquis.

## 16. `src/tweaks-panel.jsx`

**CONFIRMÉ sur le fond, à corriger sur la ligne.** `window.parent.postMessage(..., '*')` aux lignes **171**, **225**, **231**. L'écoute sans vérification d'`origin` est le `addEventListener('message', onMsg)` de la ligne **224** ; la ligne 221 citée par la directive est la condition `__activate_edit_mode` à l'intérieur du handler. Le défaut est bien réel, sa localisation exacte est l.219-227.

---

## 1.1 Données personnelles

**CONFIRMÉ, et vérifié en production, pas seulement dans le repo.**

`https://www.syntexia.ai/install-signature` répond 200 et sert en clair, à quiconque connaît l'URL :

| ligne source | personne | rôle publié | email | mobile |
|---|---|---|---|---|
| `install-signature.html:278-286` | personne 1 | fonction de direction | nominatif `@syntexia.ai` | mobile UK, 11 chiffres |
| `install-signature.html:287-295` | personne 2 | fonction de co-fondateur et de direction | nominatif `@syntexia.ai` | mobile PT, 12 chiffres |
| `install-signature.html:296-304` | personne 3 | fonction de CTO | nominatif `@syntexia.ai` | mobile PT, 12 chiffres |
| `install-signature.html:305-313` | personne 4 | fonction de co-fondateur | nominatif `@syntexia.ai` | mobile PT, 12 chiffres |
| `install-signature.html:314-322` | personne 5 | fonction de co-fondateur | nominatif `@syntexia.ai` | mobile PT, 12 chiffres |

Source : `install-signature.html:277-323`. Extraction confirmée par requête HTTP anonyme sur la page en ligne.

**Les valeurs ne sont volontairement pas reproduites ici.** Ce document vit dans le même repo public que le fichier qu'il documente : y recopier les coordonnées reviendrait à les republier une seconde fois, et à les faire survivre à la suppression de `install-signature.html`. Les lignes source ci-dessus suffisent à retrouver chaque valeur dans le fichier tant qu'il existe, et le grep de contrôle de W1 point 1 vérifie leur disparition sans avoir besoin de ce tableau.

Trois observations que la directive ne porte pas :

1. La page publie aussi les **fonctions**, pas seulement les coordonnées.
2. Les personnes 4 et 5 portent le **même** numéro de mobile (`install-signature.html:311` et `:320`). Erreur de saisie probable, qui n'atténue rien.
3. `install-signature.html` attribue la fonction de CTO à sa personne 3 (l.296-304) tandis que `team.html:93-94` l attribue à une autre personne. Le site publie deux CTO simultanément.

**CONFIRMÉ.** Le repo est **public** : `visibility: PUBLIC`, `isPrivate: false`. Vérifié sans jeton : `https://api.github.com/repos/Syntexia-AI/syntexia-website` répond 200 en anonyme, et `https://raw.githubusercontent.com/Syntexia-AI/syntexia-website/main/install-signature.html` répond 200 en anonyme.

**CONFIRMÉ.** Le repo contient `_internal/` (144 Ko, six fichiers, dont `Syntexia Email Signatures.html` qui reprend les mêmes coordonnées et ajoute une sixième adresse nominative, pour une personne absente de la liste des cinq), `avatars/` (1,6 Mo, dix images personnelles d un dirigeant), `_scripts/build-avatars.js`, `screenshots/` (128 Ko), et `DEPLOY.md`.

**CONFIRMÉ.** `.vercelignore` exclut `_internal/`, `_scripts/`, `avatars/`, `screenshots/`, `DEPLOY.md` du déploiement. `.gitignore` ne les exclut pas. Ils sont donc absents du site et présents sur GitHub.

`DEPLOY.md` documente `GODADDY_API_KEY` et `GODADDY_API_SECRET` (l.194, 204, 222, 234), un sous-domaine client (l.214, 293, 302), la configuration Google Workspace (l.300-301, 305) et la résiliation Wix à venir (l.304). Il marque `avatars/` comme `# Personal assets (NEVER ship)` (l.103-104).

**Aucun secret en dur.** Balayage du repo entier sur les motifs `sk_`, `re_`, `ghp_`, `AIza`, `xox[baprs]-` et blocs de clé privée PEM : zéro résultat. `DEPLOY.md` ne cite que des **noms** de variables, jamais leurs valeurs.

**CONFIRMÉ.** Tout est dans l'unique commit `c887605`. Le repo pèse 2,5 Mo dont 1,9 Mo de `.git`. Une réécriture d'historique par branche orpheline est triviale à cette taille. Elle relève de l'humain.

---

## Fichiers attendus et absents

- `docs/AUDIT-2026-08-31.md` : **absent** du repo. La directive le disait à déposer avant lancement.
- `design/syntexia-home-4da.html` : **absent** du repo. Même remarque. C'est la source de vérité déclarée pour W3, W4 et W5. **Sans ce fichier, W4 et W5 ne peuvent pas démarrer.**

## Point W0.2, forme canonique

`curl -sI https://syntexia.ai` et `curl -sI https://www.syntexia.ai` retournent **tous deux 200**, avec le même `Etag: "7507e03adafd3ad98cd940972f50011c"` et le même `Content-Length: 3051`. **Aucune des deux formes ne redirige vers l'autre.** L'hypothèse de la directive, qui suppose une redirection existante à constater, ne se vérifie pas.

Le site sert donc le même contenu sur deux hôtes, sans `rel="canonical"` sur aucune page. Seul indice d'intention : tous les `og:url` du repo pointent sur la forme `www`.

La forme canonique est une décision, pas un constat. Elle est portée en TODO-HUMAIN.

---

## Synthèse des divergences avec la directive

| # | point de la directive | réalité |
|---|---|---|
| 1 | Tailles sous 13px « à une vingtaine d'endroits » | **42 occurrences** |
| 2 | Code mort : `design-canvas.jsx` | plus `logo-app.jsx` (214 lignes) |
| 3 | `about.html` : « five industries puis six nommées » | cinq segments, ou sept noms décomposés. Jamais six |
| 4 | W0.2 : « noter lequel redirige vers l'autre » | **aucun ne redirige**, les deux servent 200 |
| 5 | `tweaks-panel.jsx` écoute sans origin « ligne 221 » | handler l.219-227, écoute l.224 |
| 6 | Liens morts recensés (blog, footer, CTA) | plus `about.html:208` et `team.html:118` |
| 7 | `border-radius` 18/16/14/12/10px | plus un 4px |
| 8 | `og-image.svg` « ne se rend pas hors navigateur » | se rend en Georgia, mauvaise police mais pas vide |
| 9 | HSTS à ajouter (W6) | déjà présent, posé par Vercel |
| 10 | non mentionné | `Procurement` est un secteur nommé sur la home |
| 11 | non mentionné | trois listes de secteurs contradictoires sur trois pages |
| 12 | non mentionné | deux personnes différentes portent publiquement la fonction de CTO (`install-signature.html:296-304` contre `team.html:93-94`) |
| 13 | non mentionné | la home ne sert que 32 mots sans JavaScript |
