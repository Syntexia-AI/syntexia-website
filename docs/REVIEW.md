# REVIEW.md

Paquet de revue de la passe complète. Branche `refonte-2026-09`, 2026-08-31.
`main` est intacte à `c887605`. **Rien n'a été poussé, rien n'a été déployé.**

---

## 1. Blocages

**Aucun blocage.** Les six portes sont passées. Un incident a demandé trois tentatives et une décision, il est résolu :

Le moteur Markdown d'Astro 7 charge un binaire natif que la **politique Application Control de ta machine bloque** (`An Application Control policy has blocked this file`, sur `@bruits/satteri-win32-x64-msvc`). Le repli WASI n'est pas installable par npm sur une machine x64. Astro 5 fait le même travail en JavaScript pur, sans binaire natif. Le site tourne donc sur Astro 5.18.2 avec `@astrojs/vercel` 8.2.11. Effet secondaire favorable : cela supprime aussi les trois alertes `high` de npm audit, qui venaient de `path-to-regexp` via l'adaptateur Vercel 11.

---

## 2. Ce qui a changé

1. Le site est passé d'un prototype React transpilé par Babel dans le navigateur à un site statique Astro. **La home servait 8 mots sans JavaScript, elle en sert 422.**
2. Sept routes plus une page 404, toutes en HTML statique, aucune requête vers unpkg, Google Fonts ou un CDN.
3. Archivo et Courier Prime auto-hébergées depuis `/fonts/`, preload des deux graisses d'Archivo.
4. Palette d'origine conservée, trois valeurs corrigées par la mesure de contraste, échelle à cinq crans, focus visible partout, `prefers-reduced-motion` étendu à tout le site.
5. Toutes les affirmations chiffrées non sourcées sont sorties du rendu, avec les blocs qui les portaient.
6. Un fait a été gagné en cours de route : Companies House confirme la société, donc le pied de page porte enfin une mention légale réelle, liée à sa fiche.
7. En-têtes de sécurité posés, apex en 301 vers www, `/install-signature` en 301 vers `/`, CSP en Report-Only.
8. Formulaire de contact fonctionnel, avec pot de miel, et repli explicite tant que les variables Resend ne sont pas posées.

---

## 3. Ce qui a été retiré, et comment le remettre

C'est la section à lire. Chaque ligne se restaure en renseignant **une valeur dans `src/facts.ts`**, ce qui rallume le bloc au prochain build. Rien n'est perdu, tout est conditionnel.

### 3.1 Retiré faute de source, restaurable en une ligne

| Origine | Retiré | Motif | Restauration |
|---|---|---|---|
| `sections.jsx:534-535` | stat `5` `Industries live in production` | compte non sourcé | renseigner `sectors` et le compte revient de lui-même s'il est voulu |
| `about.html:110` | `Live in five industries.` | compte non sourcé | idem |
| maquette `.d2` | bloc `totals` : `000` calls, `0 000` documents, `0` people | trois nombres non sourcés | `dayTotals = { value: { calls: '…', documents: '…', people: '…' }, source: '…' }` dans `src/facts.ts` |
| maquette `.d2` | segment `across five companies` du titre | nombre non sourcé | `deploymentCount = { value: 5, source: '…' }` |
| directive P4 | segment `across our live deployments` du titre | statut de déploiement non sourcé, relevé par le vérificateur de claims | idem, le titre complet revient avec le nombre |
| `sections.jsx:280-318` | les 12 métriques des piliers, dont `~70 %`, `60 %`, `~80 %`, `3 → 1`, `Days → hrs` | aucune source | rendre la source dans `docs/FACTS-SITE.md`, puis rétablir le bloc |
| `sections.jsx:393-397` | les 5 KPI de secteurs, dont `−60%`, `~70%`, `Hours saved`, `Live` | aucune source | idem |
| `sections.jsx:190-201` | `LiveLog` en entier, dix messages horodatés sous l'en-tête `inside customer environment · anonymized` | données fabriquées présentées comme réelles | ne pas restaurer en l'état |
| `sections.jsx:250-257` | marquee `Strip` | forme interdite, plus contenu non sourcé | sans objet |
| 8 emplacements | `Member of the Anthropic Claude Partner Network`, `Frontier model partner` | voir 4.2 | `partnerNetworkUrl = { value: 'URL', source: '…' }` |
| `about.html:153` | `early access to the latest models` | arbitrage : retiré | rétablir seulement si contractuel |
| `about.html:166-172` | section `03 / Where`, `Headquartered between London & Lisbon` | contradictoire et non sourcé | `location = { value: '…', source: '…' }` |
| `sections.jsx:601`, `team.html:120` | `London · Lisbon` | idem, plus lien mort | idem |
| `about.html:185` | `Meet the founder.` | singulier non statué | trancher `meet_the_founder` |
| `blog.html:100-135` | 4 cartes d'articles inexistants, datées | voir 4.3 | recréer les articles, sinon ne pas restaurer |
| `sections.jsx:458-466` | 5e carte, `Hospitality intelligence`, vers `/blog` | idem | idem |
| `sections.jsx:564` | `we build the intelligence businesses run on.` | signature de fin de section, interdite | sans objet |
| `sections.jsx:81` | bouton de nav `Get in touch` | libellé interdit, et pas de bouton dans la nav | sans objet |
| `about.html:114-129` | 3 paragraphes de `02 / Practice` | affirmaient un statut de déploiement et des résultats mesurés | renseigner les secteurs et les chiffres |
| maquette `.d4` | `Hosted in the EU, on infrastructure we can name in a contract.` | affirmation d'hébergement non sourcée | renseigner `where_it_runs` |
| maquette `.d4` | les 4 réponses de contrat : hébergement, rétention, sous-traitants, entraînement | engagements contractuels sans source | ajouter des entrées dans `contractAnswers` de `src/facts.ts` |
| tel. `+44 20 4620 4570` | retiré du pied de page | on ignore s'il est répondu | `phone = { value: '+44 20 4620 4570', source: '…' }` |

### 3.2 Retiré d'un article

Une seule phrase, dans `posts/the-quiet-revolution-coming-to-audit.html:130` :

> `Inside the firms we work with, intelligence is now embedded in the day-to-day workflow of engagement teams.`

Affirmation de déploiement client, sans nom ni source. Supprimée sans réécriture, le reste de l'article est intact. Pour la restaurer : la recoller telle quelle dans `src/content/posts/the-quiet-revolution-coming-to-audit.md`, après le paragraphe qui commence par `Where it's quietly already happening`, dès que `firms_we_work_with` est sourcé.

### 3.3 Retiré comme forme, sans perte de contenu

`useReveal` et `Reveal` (apparitions au scroll qui rendaient la page invisible sans JS), les cinq palettes inutilisées, `backdrop-filter`, les trois dégradés, les 42 tailles sous 13px, les 28 `text-transform:uppercase`, les 14 arrondis au dessus de 2px, `translate="no"` et les deux métas de blocage de traduction sur les sept pages, les 91 tirets cadratins, le panneau de tweaks et son protocole `postMessage` sans vérification d'origine.

---

## 4. Décisions qui t'attendent, par coût si on se trompe

### 4.1 La liste des secteurs. Coût élevé, c'est la colonne vertébrale.

Le site nommait **huit** secteurs sur quatre listes contradictoires, sous un compte affiché de cinq. La home affiche aujourd'hui cinq secteurs repris de la maquette, **sans statut et sans chiffre**, sous le titre `We build for`.

Il faut fixer la liste fermée dans `docs/FACTS-SITE.md`. Chaque secteur retiré emporte ses chiffres avec lui, les correspondances sont écrites ligne à ligne dans le fichier.

### 4.2 Le partenariat Anthropic. Coût élevé, et c'est le point le plus délicat.

L'ancien site l'affirmait **huit fois**, dont une fois comme `Frontier model partner`. Recherche du 2026-08-31 : le programme existe bien sous ce nom, mais l'annuaire officiel `partnerhub.claude.com/directory` listait **82 partenaires ce jour-là, sans Syntexia**, et aucune source tierce ne le confirme. La seule affirmation trouvée venait du site lui-même.

**Cela ne prouve pas qu'il n'y a pas de partenariat.** Un annuaire peut être partiel, ou en retard sur un accord récent. C'est pourquoi le statut retenu est « non sourcé » et non « faux ». Mais tant qu'aucune URL publique ne le nomme, la mention ne peut pas revenir sur un site qui vend de la conformité. Si tu as un contrat, une annonce ou une page d'annuaire, une seule ligne dans `src/facts.ts` rallume le bloc sur la home et sur `/about`.

### 4.3 Les quatre articles annoncés. Coût moyen.

Le blog annonçait quatre articles inexistants, avec des dates de publication. Vérification Wayback Machine : **le domaine `syntexia.ai` n'a aucun snapshot archivé, à aucune date**, et aucune trace d'un ancien site Wix n'a été trouvée. Statut retenu : `AUCUNE TRACE`, donc `FAUSSE`, donc cartes supprimées. Si ces textes existent quelque part (brouillons, export Wix hors ligne), ils sont à récupérer et à publier, pas à réannoncer.

### 4.4 Le standard téléphonique. Coût faible mais visible.

`+44 20 4620 4570` est retiré du pied de page parce que personne n'a pu vérifier qu'il est répondu. Un numéro publié qui sonne dans le vide coûte plus qu'un numéro absent. Réponds à la question, et il revient.

### 4.5 L'activation de `/security`. Coût faible, gain commercial réel.

La page existe, elle est complète, elle **n'est liée nulle part**. Elle porte deux entrées, toutes deux démontrables par le build : absence de cookie et de traceur, polices servies depuis notre origine. Le seuil d'activation est de trois entrées sourcées.

Pour l'activer : ajouter une troisième entrée dans `contractAnswers` de `src/facts.ts`. Le lien apparaît alors automatiquement dans la navigation et le pied de page. Les quatre questions qu'un acheteur pose (où ça tourne, combien de temps c'est gardé, qui d'autre y touche, est-ce que ça entraîne un modèle) attendent tes réponses.

### 4.6 Les interdits de copy dans les articles. Décision éditoriale.

Le vérificateur de règles relève dans les **articles** un mot de la liste interdite (`it elevates`), quatre superlatifs (`most useful`, `most visible`, `most valuable`, `most methodical`), deux triplets parallèles et une signature de fin (`From the Syntexia team.`).

Je ne les ai pas touchés. L'arbitrage de la directive dit que le reste d'un article ne bouge pas hors typographie et hors suppression d'affirmation non sourcée. Corriger ces points reviendrait à réécrire des phrases signées d'un auteur. Si tu veux appliquer les interdits lexicaux aux articles aussi, c'est une décision éditoriale, et elle demande une passe de réécriture assumée.

En revanche j'ai retiré les emphases dans les **titres** des articles (cinq `<em>` dans des `h2`), parce que c'est de la mise en forme et que le CSS les neutralisait déjà visuellement.

---

## 5. Avant et après

Captures Playwright, 1440 et 390, `prefers-reduced-motion` activé.

- **Avant**, production actuelle, lecture seule : `docs/shots/before/` (12 captures, 6 routes)
- **Après**, serveur local : `docs/shots/after/` (16 captures, 8 routes)

Correspondances : `home`, `about`, `team`, `blog`, `post-precedent`, `post-quiet-revolution`. Les routes `security` et `404` n'existent pas en production, elles n'ont pas de « avant ».

La comparaison la plus parlante est `home-1440` : à gauche un hero avec badge, journal d'opérations défilant et bandeau marquee, à droite une journée de travail déclarée comme illustration.

---

## 6. Ce qui reste faux, absent, ou non vérifié

**Non vérifié dans mon environnement :**

- **Le formulaire n'a jamais renvoyé 200.** Sans variables il renvoie 503, avec des variables factices il renvoie 502 parce que Resend refuse la clé. Cela prouve que la garde de configuration est franchie et que l'appel réseau part, pas que l'envoi aboutit. Un 200 réel exige une vraie clé.
- **La redirection apex vers www n'a pas été exercée.** La règle est écrite et le JSON est valide, mais elle ne s'évalue que sur Vercel.
- **La CSP est en Report-Only.** Elle n'a jamais bloqué quoi que ce soit. Elle doit passer bloquante après une observation en preview.
- **L'exclusion de `docs/` et `design/` du déploiement** repose maintenant sur le fait que seul le build est publié. Vérifié localement, à reconfirmer en preview.
- **Le rendu de la graisse 600 dans l'image OG** n'est pas garanti : Archivo a été chargée en variable font, et le moteur de rasterisation peut ne pas distinguer finement les instances. L'image fait bien 1200×630 et le texte est net.

**Absent, et qui le restera tant qu'une source n'arrive pas :**

- Aucune biographie, aucune photo sur `/team`. Deux fiches réduites au nom, à la fonction et, pour l'une, à un lien LinkedIn.
- Aucun lien LinkedIn de société nulle part, l'URL n'existe pas dans le repo.
- Aucune mention de lieu sur tout le site.
- Aucun chiffre, nulle part. C'est le résultat attendu de la règle, pas un oubli.

**Le reste :**

- Node 24 en local, Vercel utilisera Node 22 pour la fonction. Sans effet ici, signalé par le build.
- Le CSS du bloc `totals` reste dans le bundle alors que le bloc n'est pas rendu. C'est volontaire : il se rallume sans retoucher au style.
- `docs/RAPPORT-W1a.md` cite la commande de contrôle des données personnelles. Le motif de recherche y apparaît donc en clair, ce qui fait sonner un grep naïf. Ce n'est pas une donnée.

---

## 7. État du dépôt

```
git log --oneline main..refonte-2026-09
```

Quatre commits. `main` toujours à `c887605`. Aucune branche poussée, aucun déploiement, aucune réécriture d'historique.

La suite est dans `DEPLOY-CHECKLIST.md`, écrite pour être suivie à la lettre par un humain.

---

## 8. Serveur laissé en marche

`npx astro preview` **n'est pas utilisable** : l'adaptateur Vercel ne le supporte pas
(`The @astrojs/vercel adapter does not support the preview command`). C'est une
limitation de l'adaptateur, pas un défaut du site.

Le serveur laissé en marche est donc `npm run dev`, qui sert les huit routes et la
route `/api/contact`. C'est celui sur lequel toute la recette a été exécutée.

    http://localhost:4321/

Pour l'arrêter : repère le PID avec `netstat -ano | grep :4321` puis `taskkill /F /PID <pid>`.
Sur cette machine `pkill` ne tue pas les processus Node, ils apparaissent tous sous
`node.exe`. C'est ce qui a fait échouer un premier test du formulaire, contre un
serveur périmé resté en écoute.

---

## 9. Le mark en volume. Écart à la DA, assumé et borné.

Ajouté après la passe, sur décision explicite. **Un seul interdit est levé** :
« le mark garde `brandSignalEmerge`, c'est le seul mouvement du site ». L'écart porte
sur la **nature** du mouvement, pas sur son nombre. Il n'y a toujours qu'une seule
pièce animée sur le site, et c'est le logo.

Ce qui n'a pas bougé : aucun dégradé, aucun halo, aucune ombre, aucune apparition au
scroll, aucun arrondi au dessus de 2px, aucune emphase dans un titre. Les huit lignes
horaires, les pages intérieures et le pied de page sont inchangés.

### Ce que c'est

`src/components/MarkCanvas.astro`. WebGL écrit à la main : les matrices de perspective
et de rotation, le vertex shader et le fragment shader sont dans le fichier. **Aucune
bibliothèque, aucun CDN.** Three.js aurait pesé une cinquantaine de fois plus lourd que
tout le JavaScript du site réuni.

| mesure | valeur |
|---|---|
| poids du composant | 4,6 Ko non compressé |
| **tout le JavaScript du site, gzip** | **2,8 Ko** |
| géométrie | 25 cellules, 150 sommets, **un seul appel de dessin** |
| rotation complète | 44 secondes |

Les 25 points sont des billboards découpés en disques dans le fragment shader. Les
points allumés avancent, les éteints reculent : c'est ce relief qui fait lire le S en
volume. L'atténuation par la distance n'est pas un effet décoratif ajouté, c'est la
conséquence de la perspective. Les trois teintes sont celles des tokens, aucune couleur
n'a été introduite.

### Ce qui se passe quand ça ne marche pas

1. **Pas de JavaScript** : la grille CSS du mark reste dans le masthead, la page est
   complète. Le canvas ne remplace jamais rien, il s'ajoute.
2. **Pas de WebGL, ou pas d'extension de dérivées** : le composant renonce et ne pose
   pas son drapeau d'affichage. Rien de cassé, rien de crénelé.
3. **`prefers-reduced-motion`** : une seule image, sans boucle et sans écoute du
   pointeur.
4. **Hors écran ou onglet en arrière-plan** : la boucle s'arrête, plus rien ne consomme.

### Trois bugs trouvés en le vérifiant, tous corrigés

Ils méritent d'être listés parce qu'aucun n'aurait été visible sans mesurer les pixels
réellement rendus.

1. **En `prefers-reduced-motion`, le canvas dessinait mais restait invisible.** Le
   drapeau d'affichage était posé après un `return` anticipé. Les gens qui demandent
   moins d'animation ne voyaient donc rien du tout.
2. **En mode animé, le canvas était un rectangle blanc.** Un contexte WebGL jamais
   effacé a un contenu indéfini, que le navigateur affiche en blanc opaque. Le premier
   effacement dépendait du démarrage de la boucle. Une image est désormais dessinée
   immédiatement, sans attendre.
3. **Au redimensionnement de la fenêtre, le canvas redevenait blanc.** Changer la taille
   d'un canvas vide son buffer. En mode réduit, aucune boucle ne repasse derrière : le
   blanc était définitif. Le redessin est maintenant branché sur les deux chemins.

### Deux corrections de CSP faites au passage

Le site produisait deux `<script>` inline, ce qui aurait violé `script-src 'self'` au
moment de rendre la CSP bloquante. Le formulaire de contact n'utilise plus
`is:inline` (l'adresse de repli passe par un attribut de données), et Astro a reçu
l'instruction de ne plus inliner les petits scripts. **Le rendu ne contient plus aucun
script inline**, hors le JSON-LD qui n'est pas exécutable.

### Une correction de chiffre

J'ai annoncé « la home servait 32 mots, elle en sert 579 ». **Les deux chiffres étaient
faux.** Ma commande de mesure était gourmande et avalait du contenu entre le premier et
le dernier script de la page. Mesure refaite avec un dépouillement non gourmand, sur
l'ancien site et le nouveau, dans les mêmes conditions :

**8 mots avant, 422 après.** L'écart réel est plus grand que celui que j'avais annoncé.
