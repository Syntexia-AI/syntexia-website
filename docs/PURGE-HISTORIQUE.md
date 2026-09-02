# Purger les données personnelles de l'historique Git

Établi le 2026-09-02. À exécuter par un humain. Les commandes de réécriture et
de poussée ne sont jamais lancées par l'agent.

---

## Le constat, vérifié

L'arbre de travail actuel est propre : aucune donnée personnelle, aucun fichier
sensible suivi. **L'historique ne l'est pas.**

```
git show c887605:install-signature.html   ->  5 numéros de mobile lisibles
```

Trois commits contiennent le fichier : `c887605` (initial), `2ec5097` (W1a, qui
le supprime) et `e87ecf7` (le hotfix). Supprimer un fichier ne l'efface pas du
passé : Git conserve chaque version.

Le commit initial contient aussi `_internal/` (six fichiers, dont les mêmes
coordonnées plus une sixième adresse nominative) et `avatars/` (dix images
personnelles d'un dirigeant, marquées « NEVER ship » dans le guide de
déploiement d'origine).

**Le dépôt est privé aujourd'hui**, ce qui limite l'accès aux membres de
l'organisation. Mais il a été public du 18 au 31 août, treize jours, et tout
membre présent ou futur, comme toute personne ayant cloné pendant cette fenêtre,
garde ces données.

---

## Plus urgent que l'historique : la page est encore en ligne

Vérifié le 2026-09-02 : `https://www.syntexia.ai/install-signature` répond
**HTTP 200** et sert toujours les cinq coordonnées. La purge de l'historique Git
ne change rien à cela. Tant que cette page est servie, elle est indexable et
accessible sans authentification, par tout le monde.

La redirection 301 vers `/` est déjà écrite dans `vercel.json` et attend une
mise en production. C'est la première chose à faire, avant toute manipulation
d'historique.

---

## Trois options, par ordre de radicalité

### Option A. Pousser sans rien réécrire

Le nouveau site part sur `main`, le site déployé devient propre, l'historique
garde les données.

**Ce que ça règle** : l'exposition publique du site.
**Ce que ça ne règle pas** : les cinq mobiles restent récupérables par tout
membre de l'organisation, indéfiniment.

Cette option était défendable tant qu'on pensait le dépôt privé depuis toujours.
Il a été public treize jours. L'argument « personne n'y a accès » ne tient plus :
il faut retirer les données, pas seulement fermer la porte.

### Option B. Réécrire en retirant les fichiers, garder l'historique de travail

**C'est l'option recommandée.** Elle retire les trois chemins sensibles de tous
les commits, et conserve les 22 commits, leurs messages et la documentation
produite pendant la refonte, qui a de la valeur.

### Option C. Branche orpheline, un seul commit

Tout l'historique disparaît, y compris les rapports, les décisions et le
benchmark. Plus simple, plus destructif. C'est ce que décrivait la première
version de `DEPLOY-CHECKLIST.md`, avant que l'historique ne contienne du travail
qui mérite d'être gardé.

---

## Option B, procédure exacte

### Avant de commencer

```bash
cd C:\Users\bapti\Code\syntexia-website
git status --porcelain          # doit être vide
git branch                      # noter les branches à conserver
```

**Fais une copie de sauvegarde du dossier entier avant de lancer quoi que ce
soit.** Une réécriture ratée ne se rattrape pas.

```bash
cd ..
cp -r syntexia-website syntexia-website-sauvegarde-avant-purge
cd syntexia-website
```

### 1. Retirer les trois chemins de tous les commits

`git filter-repo` est l'outil recommandé mais n'est pas installé ici et pip
n'est pas disponible. `git filter-branch` est présent et fait le travail. Il est
déprécié, ce qui n'a pas d'importance pour une opération unique.

```bash
git filter-branch --force --index-filter \
  "git rm -r --cached --ignore-unmatch install-signature.html _internal avatars" \
  --prune-empty --tag-name-filter cat -- --all
```

Ce que fait chaque option : `--index-filter` réécrit chaque commit sans avoir à
extraire l'arbre, ce qui est rapide. `--ignore-unmatch` évite l'échec sur les
commits où le fichier n'existe pas. `--prune-empty` supprime les commits qui
deviendraient vides. `-- --all` traite toutes les branches, pas seulement la
courante.

### 2. Vérifier avant de pousser

```bash
git show c887605:install-signature.html
```
Doit répondre que le chemin n'existe pas. Attention, le SHA aura changé : prends
celui du premier commit après réécriture avec `git log --oneline | tail -1`.

```bash
git log --all --oneline -- install-signature.html    # doit être vide
git log --all --oneline -- _internal                 # doit être vide
git log --all --oneline -- avatars                   # doit être vide
git grep -aE "7757 998|932 733|966 660|amin\.martins|rui\.baiao|miguel\.fiel|fernando\.carvalho|alex@syntexia" $(git rev-list --all) 2>/dev/null | head
```
La dernière commande fouille **tous les commits** et non l'arbre courant. Elle
doit ne rien retourner, hors les fichiers de `docs/` qui citent la commande de
contrôle elle-même.

**Si l'une de ces vérifications échoue, n'aille pas plus loin.** Restaure la
sauvegarde et recommence.

### 3. Nettoyer les références et les objets

```bash
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

Le poids de `.git` doit baisser nettement : il est de 36 Mo aujourd'hui, dont
1,6 Mo d'images personnelles et 144 Ko de fichiers internes.

### 4. Pousser

```bash
git push --force origin main
git push --force origin refonte-2026-09
```

**Avertissement.** Si le projet Vercel est branché sur GitHub, ce force push sur
`main` déclenche un déploiement de production complet. Vérifie l'état de
`main` avant : c'est lui qui partira en ligne.

### 5. Supprimer les branches devenues inutiles

```bash
git ls-remote --heads origin
git push origin --delete hotfix-install-signature   # si elle a été poussée
```

---

## Ce que la réécriture ne règle pas, et qu'il faut savoir

**GitHub garde des objets en cache.** Après un force push, les anciens commits
restent parfois accessibles quelque temps par leur SHA direct, via l'interface
ou l'API, même s'ils n'apparaissent plus dans l'historique. GitHub documente ce
comportement et propose de contacter son support pour purger ces objets. Si tu
veux une garantie forte, la seule méthode sûre est de **supprimer le dépôt et
d'en recréer un** à partir de l'arbre nettoyé.

**Les clones existants gardent tout.** Toute personne ayant cloné le dépôt avant
la purge conserve l'historique complet sur sa machine. La réécriture ne les
atteint pas.

**Le dépôt a été public treize jours, c'est établi.** L'API GitHub renvoie un
`PublicEvent` daté du 2026-08-18T15:55:50Z, l'événement émis quand un dépôt
devient public, et le dépôt est privé aujourd'hui, sa dernière modification
datant du 2026-08-31T15:31:30Z. Pendant ces treize jours, l'historique complet,
donc les cinq mobiles, était lisible par n'importe qui. Ce qui a été récupéré pendant
cette fenêtre ne se rappelle pas. Les trois actions qui restent, indépendantes
de toute manipulation Git :

1. Faire tourner les cinq numéros de mobile et les cinq adresses nominatives.
2. Demander la suppression de `/install-signature` dans Google Search Console,
   une fois la redirection déployée.
3. Informer les cinq personnes concernées. Plusieurs ne travaillent plus dans la
   société et n'ont pas à l'apprendre par un tiers.

---

## Sur la question « retirer seulement ceux qui ne sont plus là »

Techniquement, ce n'est pas possible sans réécrire le fichier plutôt que le
supprimer, ce qui reviendrait à publier une version expurgée d'un document qui
n'avait pas à être publié.

Et ce ne serait pas souhaitable : le fichier expose aussi le mobile personnel du
dirigeant en poste. Un numéro personnel n'a pas davantage vocation à figurer
dans un dépôt parce que la personne est encore dans la société.

**Le fichier part en entier, pour tout le monde.**
