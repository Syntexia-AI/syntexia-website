# RAPPORT-W1a.md

Lot autonome W1a, ouvert par l'amendement A6 du 2026-08-31. Suppression des données personnelles et du code mort.
Branche `refonte-2026-09`. `main` intacte. **Rien n'a été poussé, rien n'a été déployé.**
Date : 2026-08-31.

---

## FAIT

**1. Les huit cibles de A6 sont supprimées du repo.**
30 fichiers retirés par `git rm -r` :

| cible | contenu | volume |
|---|---|---|
| `install-signature.html` | 5 personnes, 5 adresses nominatives, 5 mobiles, 5 fonctions | 438 lignes |
| `_internal/` | 6 fichiers, mêmes coordonnées plus une sixième adresse nominative | 144 Ko |
| `avatars/` | 10 images personnelles d'un dirigeant, marquées « NEVER ship » | 1,6 Mo |
| `_scripts/` | `build-avatars.js` | 8 Ko |
| `screenshots/` | 9 captures de travail | 128 Ko |
| `DEPLOY.md` | procédure GoDaddy, sous-domaine client, Google Workspace, Wix | 352 lignes |
| `src/design-canvas.jsx` | code mort, référencé par `_internal/` seul | 966 lignes |
| `src/logo-app.jsx` | code mort, référencé par `_internal/` seul | 214 lignes |

`src/` ne contient plus que `app.jsx`, `sections.jsx`, `styles.css`, `tweaks-panel.jsx`, tous les quatre encore utilisés par la home.

**2. Grep de contrôle imposé par la directive : vide.**
```
git grep -nE "$MOTIF_PII"
-> aucun résultat
```
Conformément à l'amendement A1, ce contrôle porte sur **tout le repo, `docs/` inclus**, et il est rejoué à chaque wagon, pas seulement en W6.

`$MOTIF_PII` est l'alternation des trois fragments de numéros et des cinq
fragments nominatifs relevés en W0. **Elle n'est pas écrite dans le dépôt** : la
recopier ici republierait, sous forme de motif de recherche, exactement ce que la
purge a retiré. Elle se reconstruit depuis les lignes source listées dans
`docs/INVENTAIRE.md`, ou depuis la sauvegarde d'avant purge.

**3. Redirection déclarée.**
`vercel.json` reçoit un bloc `redirects` :
```json
"redirects": [
  { "source": "/install-signature", "destination": "/", "permanent": true }
]
```
JSON validé par parseur. Aucune autre clé modifiée : `cleanUrls`, `trailingSlash` et les deux règles de cache sont inchangés.

**4. Aucune référence orpheline dans le code.**
`git grep` sur `install-signature`, `design-canvas`, `logo-app`, `_internal`, `avatars/`, `_scripts`, `DEPLOY.md`, hors `docs/` : les seules occurrences restantes sont la redirection de `vercel.json` et les règles de filet de `.vercelignore`, toutes deux intentionnelles. Aucun `<script>`, aucun `<link>`, aucun `href` ne pointe vers un fichier supprimé.

**5. Ajout hors liste A6, signalé comme tel : `docs/` et `design/` exclus du déploiement.**

C'est une correction d'un défaut que mon propre travail avait introduit, et il fallait le traiter avec ce lot.

Constat : `.vercelignore` n'excluait ni `docs/` ni `design/`, et Vercel sert les fichiers non exclus tels quels. Preuve que les `.md` sont bien servis :
```
curl -sI https://www.syntexia.ai/logo-pack/README.md  -> 200
```
Sans cette exclusion, le premier déploiement aurait publié `docs/CLAIMS.md`, `docs/RAPPORT-W0.md` et `design/syntexia-home-4da.html` sur le site. C'est à dire un registre qui documente publiquement que le site publie des données personnelles et que ses chiffres ne sont pas sourcés, plus la maquette de la refonte à venir.

`.vercelignore` exclut désormais `docs/` et `design/`, et conserve en filet de sécurité les cinq chemins supprimés en W1a, pour qu'une réapparition accidentelle ne soit jamais déployée.

**6. Amendements A1 à A5 et A7 intégrés aux documents W0.**

| amendement | ce qui a changé |
|---|---|
| A1 | `CLAIMS.md` section E réécrite en références `fichier:ligne`, sans nom ni fonction. `INVENTAIRE.md` section 1.1 et section 9 dénominalisées. `RAPPORT-W0.md` purgé de l'auteur et de l'adresse du commit. Contrôle : le grep élargi ne retourne plus rien dans `CLAIMS.md`, `INVENTAIRE.md` ni les rapports |
| A2 | `FACTS-SITE.md` ligne `canonique` passe de DÉCISION REQUISE à TRANCHÉ, valeur `www.syntexia.ai`, avec le contrôle W6 associé |
| A3 | `CLAIMS.md` H9 passe de À VALIDER à SUPPRESSION PAR DÉFAUT. Nouveau statut ajouté à la légende. L'arbitrage 1 du RAPPORT-W0 est clos |
| A4 | Nouveau statut FAUSSE. `CLAIMS.md` I1 à I5 passent de RETIRÉ à FAUSSE, avec justification. G1 à G12 confirmées. La légende précise que VÉRIFIÉ ne sera jamais attribué sans source externe |
| A5 | `CLAIMS.md` B1 et B5 passent de CONTRADICTOIRE à RETIRÉ. `FACTS-SITE.md` : section secteurs refondue, champ `client_en_production` ajouté par secteur, et chaque ligne indique quelles entrées de chiffres tombent avec le secteur |
| A7 | Les cinq corrections factuelles étaient déjà portées dans `INVENTAIRE.md`, elles y sont maintenues et la directive amendée les valide |

**7. Maquette déposée (A8).**
`design/syntexia-home-4da.html`, 32 061 octets, copiée depuis `Downloads`.
Structure vérifiée : blocs `.d1`, `.d2`, `.d3`, `.d4` présents. `.d2` contient **8 lignes horaires** et un bloc `totals`, conforme à W4 points 4 et 5. `.d3` contient une `band`, conforme à W4 point 9. `.d4` contient le statement `We read the paperwork nobody wants to read.` et la band `What we can put in a contract`, conformes à W5 point 1.

**8. Nouvelle qualification autonome, en vertu de A4.**
`CLAIMS.md` I1 à I5 passent de RETIRÉ à **FAUSSE**. `blog.html` affiche quatre dates de publication et la home une cinquième, pour cinq articles dont aucun n'existe : `posts/` ne contient que deux fichiers, et les cinq liens pointent vers `#` ou vers `/blog`. Afficher une date de publication pour un contenu jamais publié est faux, et la démonstration ne demande que le repo. Le registre compte désormais **17 entrées FAUSSES** au lieu de 12.

---

## NON FAIT

**1. Le reste de W1 n'est pas fait.** A6 le réserve : points 4 à 16 (og-image PNG, suppression du panneau de tweaks, robots, sitemap, JSON-LD, liens morts, favicons, en-têtes de sécurité, canonique, LiveLog, blocage de traduction, tirets cadratins, dates d'articles) attendent `FACTS-SITE.md`.

**2. La redirection apex vers www n'est pas posée.** A2 la tranche, mais A6 ne la met pas dans W1a. Elle reste au point 11 de W1. À noter pour l'exécution : sur Vercel elle se pose au niveau du domaine, ou dans `vercel.json` avec une condition `has` de type `host`, pas avec une `source` simple.

**3. Rien n'est déployé.** Les fichiers sont supprimés **de la branche**, pas de la production. `https://www.syntexia.ai/install-signature` répond toujours 200 à cette heure, et les cinq coordonnées y sont toujours servies.

**4. L'historique n'est pas réécrit.** Les fichiers restent intégralement accessibles sur `main` et sur GitHub. `git rm` ne supprime rien du passé.

---

## NON VÉRIFIÉ

**1. Le rendu après suppression.** Aucune capture, aucun serveur local lancé. Les suppressions ne touchent aucun fichier chargé par une page servie (contrôle par `git grep`), mais cela reste une déduction du code, pas un rendu observé.

**2. L'effet réel de la redirection.** `vercel.json` est valide et la règle est syntaxiquement correcte, mais elle n'a pas été exercée : cela demande un déploiement.

**3. L'exclusion de `docs/` et `design/`.** `.vercelignore` est écrit, jamais éprouvé. Le premier déploiement doit être suivi d'un contrôle : `curl -sI https://www.syntexia.ai/docs/CLAIMS.md` doit renvoyer 404.

**4. L'indexation par les moteurs.** Toujours pas mesurable sans accès à la Search Console.

---

## TODO-HUMAIN

### 1. Le lot ne produit aucun effet tant qu'il n'est pas déployé

C'est le point à retenir de ce rapport. W1a prépare la suppression, il ne l'exécute pas en production.

**Mesure immédiate, indépendante de tout déploiement** : rendre le repo privé. Cela ferme l'accès anonyme à `raw.githubusercontent.com` et à l'historique en une action, sans attendre la validation de quoi que ce soit. La page du site reste servie, mais l'exposition est divisée par deux tout de suite.

### 2. Séquence de déploiement, quand tu valides

1. Revue de ce rapport et du diff.
2. Merge de `refonte-2026-09` vers `main`, ou cherry-pick du seul commit W1a.
3. Déploiement.
4. Contrôles après déploiement :
   - `curl -sI https://www.syntexia.ai/install-signature` renvoie **301** vers `/`
   - `curl -sI https://www.syntexia.ai/docs/CLAIMS.md` renvoie **404**
   - `curl -sI https://www.syntexia.ai/design/syntexia-home-4da` renvoie **404**
   - `curl -s https://www.syntexia.ai/install-signature | grep -c "@syntexia.ai"` renvoie **0**

### 3. Réécriture d'historique, après le déploiement

Inchangée depuis le RAPPORT-W0. À exécuter par un humain, dans le repo, après avoir vérifié qu'aucun travail non poussé ne sera perdu, **et après avoir merge ou sauvegardé la branche `refonte-2026-09`, que cette commande détruirait aussi si elle n'est pas rattachée** :
```
git checkout --orphan clean
git add -A
git commit -m "Syntexia website"
git branch -D main
git branch -m main
git push --force origin main
```

### 4. Ce qui ne change pas

Les points 3 (faire tourner les coordonnées), 4 (Search Console) et 5 (informer les cinq personnes) du RAPPORT-W0 restent ouverts. Ils ne dépendent d'aucun wagon.

### 5. Conséquence documentaire des suppressions

`CLAIMS.md` E7, E8, E9 et `INVENTAIRE.md` section 1.1 renvoient à `install-signature.html`, qui n'existe plus sur cette branche. Ces références restent résolvables sur `main` tant que l'historique n'est pas réécrit, et cessent de l'être après. C'est voulu : le registre garde la trace de ce qui a été publié, sans en reproduire le contenu.

### 6. Décision en attente pour la suite

`FACTS-SITE.md` reste à remplir. Les cinq décisions bloquantes du RAPPORT-W0 sont inchangées, moins la canonique que A2 vient de trancher. La plus lourde reste la liste fermée des secteurs, qui commande maintenant aussi le sort des chiffres A1 à A17 en vertu de A5.

---

## État de la branche

```
git log --oneline main..refonte-2026-09
```
Deux commits. `main` toujours à `c887605`. **Rien n'a été poussé.**

---

## Arrêt

W1a est terminé. Je m'arrête ici.

La suite de W1 (points 4 à 16) attend `docs/FACTS-SITE.md` rempli et un GO. W2 (sortie du prototype vers Astro) n'attend que le GO : il ne dépend d'aucun fait.
