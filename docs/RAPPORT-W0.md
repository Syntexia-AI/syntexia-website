# RAPPORT-W0.md

Wagon W0, inventaire et registre. Aucune modification de code.
Branche `refonte-2026-09`, créée depuis `main` au commit `c887605`. `main` n'a pas été touchée.
Date : 2026-08-31.

---

## FAIT

**1. Repo cloné et lu intégralement.**
Le repo n'existait pas en local. Cloné dans `C:\Users\bapti\Code\syntexia-website` depuis `https://github.com/Syntexia-AI/syntexia-website.git`.
Preuve : `git log -1` retourne `c887605d74b2236bd97689f16799dac08fcec2bd`, un auteur et une adresse de commit (non reproduits ici, A1), `2026-08-18 16:55:45 +0100`, message `Initial commit: syntexia.ai website`. Commit unique, conforme.
`git ls-files` : 71 fichiers. Volume : 2,5 Mo dont 1,9 Mo de `.git`.

**2. Section 1 de la directive confirmée point par point.**
Livrable : `docs/INVENTAIRE.md`, 16 points plus la section 1.1, chacun étiqueté CONFIRMÉ, DIVERGENCE ou PRÉCISION, avec fichier et ligne.
Résultat : la directive est exacte sur l'essentiel. **13 divergences ou précisions** relevées, dont 4 changent le périmètre de travail. Elles sont récapitulées en fin d'INVENTAIRE.md.

**3. Point W0.2, forme canonique, sondé.**
Preuve :
```
curl -sI https://syntexia.ai      -> HTTP/1.1 200 OK  Etag: "7507e03adafd3ad98cd940972f50011c"  Content-Length: 3051
curl -sI https://www.syntexia.ai  -> HTTP/1.1 200 OK  Etag: "7507e03adafd3ad98cd940972f50011c"  Content-Length: 3051
```
**Aucune des deux formes ne redirige vers l'autre.** Le site sert le même document sur deux hôtes, sans `rel="canonical"` sur aucune page. La question posée par la directive (« noter lequel redirige vers l'autre ») n'a pas de réponse : il faut trancher, pas constater. Porté en TODO-HUMAIN 3.

**4. Routes de production sondées.**
Preuve, codes HTTP réels : `/` `/about` `/team` `/blog` `/posts/precedent-meets-pace` `/posts/the-quiet-revolution-coming-to-audit` `/install-signature` répondent **200**. `/robots.txt` `/sitemap.xml` `/favicon.ico` `/apple-touch-icon.png` `/security` répondent **404**. `/og-image.svg` répond **200**.
Sept routes déployées, comme annoncé. Aucune page secteur.

**5. Correspondance production / repo établie.**
`diff` entre le HTML servi par `https://www.syntexia.ai/` et `index.html` du repo : **vide**. Le déployé est exactement le commité. Tout constat fait sur le repo vaut pour la production.

**6. Registre des claims écrit.**
Livrable : `docs/CLAIMS.md`. **94 entrées** relevées, réparties en 10 familles, chacune avec page, fichier, ligne et texte exact.
Répartition : 7 VÉRIFIÉ (source interne au repo uniquement), 41 À VALIDER, 16 CONTRADICTOIRE, 11 RETIRÉ par la directive, 12 FAUX ou INVENTÉ, 7 formulations interdites.
La liste minimale imposée par la directive W0 point 3 est couverte intégralement, ligne par ligne.

**7. Gabarit FACTS-SITE.md déposé.**
Livrable : `docs/FACTS-SITE.md`, gabarit de la section 6 de la directive, enrichi de renvois vers les lignes de CLAIMS.md que chaque champ débloque, et des quatre champs supplémentaires imposés par W4 point 5 (`people_on_shift`) et W4 point 4 (`huit_lignes_horaires`). **Aucune valeur n'a été renseignée par moi**, sauf celles dont la source est le repo.

**8. Numéros de ligne vérifiés mécaniquement.**
Chaque référence `fichier:ligne` d'INVENTAIRE.md et CLAIMS.md a été recontrôlée par `sed -n "Np"` avec correspondance du motif attendu. 17 références contrôlées après une première rédaction, 8 corrigées. Contrôle final : 17/17 OK.

**9. Aucun secret en dur dans le repo.**
Preuve : `git grep -nIE "sk_[A-Za-z0-9]{10,}|re_[A-Za-z0-9]{10,}|ghp_[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{30,}|xox[baprs]-|-----BEGIN [A-Z ]*PRIVATE KEY"` retourne **zéro résultat**.
`DEPLOY.md` ne cite que des noms de variables (`GODADDY_API_KEY`, `GODADDY_API_SECRET`), jamais leurs valeurs. C'est le seul bon point de ce fichier.

---

## Les trois constats qui commandent la suite

### A. Les données personnelles sont publiées, en production et sur GitHub, en accès anonyme

La directive le disait. C'est vérifié, et c'est pire que décrit sur trois points.

Preuve en production, requête anonyme sur `https://www.syntexia.ai/install-signature` :
```
curl -s https://www.syntexia.ai/install-signature \
  | grep -oE "\+(44|351) [0-9 ]{9,14}|[a-z]+\.[a-z]+@syntexia\.ai" | sort -u
-> 5 adresses nominatives @syntexia.ai
-> 5 numéros de mobile personnels (1 UK, 4 PT), plus le numéro de bureau
```
Les valeurs ne sont pas reproduites dans ce rapport : il vit dans le même repo public que le fichier qu'il documente. La commande ci-dessus les restitue tant que la page existe, et cesse d'en produire une fois W1 appliqué.

Preuve sur GitHub, sans jeton :
```
https://api.github.com/repos/Syntexia-AI/syntexia-website                              -> 200
https://raw.githubusercontent.com/Syntexia-AI/syntexia-website/main/install-signature.html -> 200
gh repo view : visibility PUBLIC, isPrivate false
```

Les trois aggravations non portées par la directive :
1. La page publie aussi les **fonctions** de chacun, pas seulement les coordonnées.
2. Deux des cinq personnes portent le **même** numéro de mobile (`install-signature.html:311` et `:320`).
3. `install-signature.html:300` attribue la fonction de CTO à une personne, pendant que `team.html:93-94` l attribue à une autre. Le site publie deux CTO.

Le repo contient par ailleurs `_internal/` (qui ajoute une sixième adresse nominative, pour une sixième personne absente de la liste des cinq), `avatars/` (1,6 Mo d'images personnelles d un dirigeant, marquées `# Personal assets (NEVER ship)` dans `DEPLOY.md:103`), `_scripts/`, `screenshots/`, et `DEPLOY.md` lui-même qui expose un sous-domaine client et la configuration Google Workspace. `.vercelignore` les exclut du site, `.gitignore` ne les exclut pas de GitHub.

C'est le point 0 de W1, et la partie qui compte (réécriture d'historique, force push, désindexation) relève de l'humain. Procédure en TODO-HUMAIN 1.

### B. La home ne sert aucun contenu sans JavaScript

Non porté par la directive, et cela change la lecture de W2.

Preuve : le HTML servi pour `/` contient **32 mots**, dont la totalité est le `<title>` et le bloc `window.TWEAK_DEFAULTS`. Aucun titre, aucun paragraphe, aucun lien de navigation. Tout le contenu est produit par React chargé depuis unpkg en **build de développement**, puis transpilé par Babel **dans le navigateur du visiteur** à chaque visite.

Corollaire : `.reveal { opacity: 0 }` n'est levé que par `IntersectionObserver`. Un échec JS après le premier rendu laisse une page vide, pas une page dégradée.

W2 n'est donc pas un confort de maintenance. C'est ce qui rend la home indexable et lisible sans exécution de code.

### C. Le journal d'opérations affirme une provenance client que son propre code contredit

`src/sections.jsx:230-231` affiche `Intelligence · live ops feed` et `/ inside customer environment · anonymized`.
`src/sections.jsx:190-201` contient dix messages codés en dur, dont `Citizen request #48921`, `Discrepancy £842`, `€12,400 / PO-7733`, `SKU LX-204`, `cohort Q1-26 · +14%`.
`src/sections.jsx:204-208` les horodate à l'heure locale du visiteur, rotation toutes les 1800 ms.

Ce n'est pas une donnée à valider, c'est une donnée fabriquée présentée comme réelle, sur le site d'une société qui vend de la conformité. C'est la seule ligne du registre que je qualifie sans attendre l'humain (CLAIMS.md G1 et G12).

W1 point 12 arrête l'affirmation. W4 point 8 supprime le composant. Les deux sont nécessaires, dans cet ordre.

---

## NON FAIT

**1. `docs/FACTS-SITE.md` n'est pas rempli.** Gabarit déposé, valeurs vides. C'est la tâche de l'humain, et W1 en dépend.

**2. Aucun statut de CLAIMS.md n'est passé à VÉRIFIÉ au titre d'une source externe.** Les 7 VÉRIFIÉ existants ne prouvent que ce que le repo déclare.

**3. Aucune modification de code.** Conforme à W0. Seuls quatre fichiers ont été créés, tous dans `docs/`.

**4. Rien n'a été poussé.** La branche `refonte-2026-09` est locale. `main` est intacte.

---

## NON VÉRIFIÉ

**1. Le numéro `+44 20 4620 4570` est-il répondu.** Un appel sortant n'est pas une vérification que je peux conduire. Bloque CLAIMS.md F1 et W5 point 5.

**2. La véracité de tout chiffre du site.** Aucun des 17 chiffres de performance n'a de source. Je peux prouver ce que le site dit, pas si c'est vrai.

**3. L'URL LinkedIn de Karim n'a pas été résolue.** Elle est bien dans `team.html:83`, mais LinkedIn bloque les requêtes automatisées : je n'ai pas confirmé qu'elle pointe sur un profil vivant.

**4. L'état d'indexation de `/install-signature` par les moteurs.** Il n'y a pas de `robots.txt` (404), donc rien ne l'a jamais interdit. Savoir si Google a effectivement indexé la page demande un accès à la Search Console. Cela conditionne l'urgence de la demande de suppression (TODO-HUMAIN 1, étape 4).

**5. Le rendu réel des pages.** Aucune capture n'a été prise en W0, aucune n'était demandée. Toute affirmation visuelle de ce rapport découle du code, pas d'un rendu observé.

**6. Le comportement exact du bloc de contradiction `install-signature.html` avec Companies House.** Le numéro `16847343` vient de la directive, pas du repo : aucune raison sociale ni numéro d'immatriculation n'apparaît nulle part sur le site actuel.

---

## TODO-HUMAIN

### 1. Données personnelles. Le reste attend.

**Étape 1, immédiate et indépendante des wagons.** Rendre le repo privé, ou retirer `install-signature.html` de la production. Tant que ce n'est pas fait, cinq numéros de mobile personnels restent servis en 200 à qui connaît l'URL. W1 supprime les fichiers, mais W1 ne se déploie pas tout seul.

**Étape 2, après validation de W1.** Réécriture d'historique. Commande exacte, à exécuter par un humain, dans le repo, après avoir vérifié qu'aucun travail non poussé ne sera perdu :
```
git checkout --orphan clean
git add -A
git commit -m "Syntexia website"
git branch -D main
git branch -m main
git push --force origin main
```
Cette commande détruit l'historique de `origin/main` sans retour possible. Elle n'est pas exécutable par moi (interdiction de push, section 0 de la directive).

**Étape 3.** Faire tourner les cinq numéros de mobile et les cinq adresses nominatives. La suppression du fichier ne rappelle pas ce qui a été récupéré pendant les treize jours de publication (commit du 2026-08-18, constat du 2026-08-31).

**Étape 4.** Demande de suppression de `https://www.syntexia.ai/install-signature` dans Google Search Console, et de la version GitHub via le formulaire de suppression de contenu en cache. À faire après le déploiement de la redirection W1.

**Étape 5.** Informer les cinq personnes concernées. Trois d'entre elles ne travaillent plus chez Syntexia d'après la directive, et n'ont donc plus de raison de découvrir cela par un tiers.

### 2. Remplir `docs/FACTS-SITE.md`. Bloque W1.

Par ordre d'impact décroissant :

| # | décision | ce qu'elle débloque |
|---|---|---|
| 1 | La liste **fermée** des secteurs en production et leur compte | CLAIMS.md B1 à B7, W4 point 9, W5 point 2. Le site affiche aujourd'hui huit noms distincts sous un compte de cinq |
| 2 | La formulation de l'implantation | CLAIMS.md C1 à C11, W5 point 5. Le site dit à la fois « siège à Londres » et « siège entre Londres et Lisbonne » |
| 3 | L'URL de l'annonce du partenariat Anthropic | CLAIMS.md D1 à D9, W4 point 11. Aucune des 8 mentions n'est un lien aujourd'hui. Sans URL, les 8 sortent |
| 4 | Les trois totaux de la journée type | W4 point 5. La directive impose le retrait du bloc entier si un seul des trois manque |
| 5 | Le numéro de téléphone est-il répondu | CLAIMS.md F1, W5 point 5 |
| 6 | Date et auteur réels de « The quiet revolution » | CLAIMS.md H4 à H8. Trois emplacements, deux dates. Recommandation : retenir `2026-04-15`, majoritaire et porté par la meta |
| 7 | `early access to the latest models` est-il contractuel | CLAIMS.md D9, W5 point 2 |
| 8 | Raison sociale et numéro Companies House | W5 point 5. Le numéro `16847343` vient de la directive, il n'est nulle part dans le repo |
| 9 | LinkedIn société, LinkedIn Baptiste, bios et photos des deux fiches | W1 point 7, W5 points 3 et 4 |

### 3. Trancher la forme canonique. Bloque W1 point 11.

Constat : apex et www répondent tous deux 200, aucune redirection n'existe. Il n'y a rien à constater, il y a à décider.
Seul indice d'intention dans le repo : tous les `og:url` pointent sur `www`.
Recommandation : retenir `www.syntexia.ai` et rediriger l'apex, ce qui aligne la redirection sur les métadonnées déjà écrites et évite de les réécrire. Décision de Baptiste, à porter dans FACTS-SITE.md.

### 4. Déposer les deux fichiers manquants. Bloque W3, W4 et W5.

- `docs/AUDIT-2026-08-31.md` : absent du repo.
- `design/syntexia-home-4da.html` : **absent du repo**, et c'est bloquant. La directive en fait la source de vérité pour la hiérarchie, les espacements et le copy de W4, pour le bloc `.d4` de `/security` en W5, et pour la liste secteurs du bloc `.d3`. Sans ce fichier, W4 et W5 ne peuvent pas démarrer sans réinterpréter, ce que la section 3 de la directive interdit explicitement.

W1 et W2 peuvent démarrer sans lui.

### 5. Deux arbitrages que je n'ai pas le droit de trancher

**Arbitrage 1. Une affirmation non sourcée dans un article protégé.**
`posts/the-quiet-revolution-coming-to-audit.html:130` affirme : `Inside the firms we work with, intelligence is now embedded in the day-to-day workflow of engagement teams.` C'est une affirmation de déploiement client, sans nom ni source.
Deux règles de la directive se contredisent sur cette phrase : la section 5 impose « zéro affirmation non VÉRIFIÉ visible », la section 0 interdit de modifier les articles hors typographie.
Trois options :
- **a.** Statuer la phrase dans FACTS-SITE.md (`firms_we_work_with`) et la garder si elle est vraie. Coût nul, c'est le cas le plus probable.
- **b.** L'inscrire comme exception explicite au critère d'acceptation, au motif qu'un article d'opinion signé n'est pas de la copy institutionnelle.
- **c.** Retirer la phrase, ce qui rouvre le principe « les articles ne sont pas modifiés ».
Recommandation : **a**, avec repli sur **b**.

**Arbitrage 2. Les quatre entrées de blog sans destination portent des dates.**
`blog.html` annonce quatre articles inexistants, datés Apr, Mar, Feb et Jan 2026. W1 point 8 les supprime, ce qui est net. Mais si l'un de ces textes existe réellement ailleurs (ancien blog Wix, brouillon), le supprimer perd du contenu au lieu de le republier. La carte `Boost B2B sales with operational AI analytics` est explicitement un titre repris de l'ancien blog Wix.
Question à Karim : ces quatre textes existent-ils quelque part. Si oui, ils relèvent d'un wagon de migration de contenu, pas d'une suppression.

### 6. Variables et comptes, à préparer sans urgence

- `RESEND_API_KEY` et `CONTACT_TO` sur Vercel (W4 point 12). Non posées.
- Compte Plausible et domaine (W2 point 8).
- Accès Google Search Console, pour la demande de suppression du point 1 étape 4.

---

## État de la branche

```
git branch --show-current  ->  refonte-2026-09
git log --oneline main..refonte-2026-09
```
Un commit, `W0: inventaire, registre des claims, gabarit FACTS-SITE`.
Fichiers créés, tous dans `docs/` : `INVENTAIRE.md`, `CLAIMS.md`, `FACTS-SITE.md`, `RAPPORT-W0.md`.
Aucun fichier du site modifié. Aucun fichier supprimé. **Rien n'a été poussé.**

---

## Arrêt

W0 est terminé. Je m'arrête ici, conformément à la section 0 de la directive.

Pour lancer W1, il faut : `docs/FACTS-SITE.md` rempli (au moins les décisions 1 à 3 du TODO-HUMAIN 2), la forme canonique tranchée, et un GO écrit.

W1 point 0 (suppression des fichiers à données personnelles) est le seul lot qui ne dépend d'aucune de ces réponses. Si l'urgence le justifie, il peut être lancé seul, avant les autres décisions, sur simple GO.
