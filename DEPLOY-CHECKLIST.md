# DEPLOY-CHECKLIST.md

Procédure de mise en ligne. **Écrite pour être suivie à la lettre, jamais exécutée par l'agent.**
Branche à déployer : `main`, une fois la pull request de `focus-automation-voice` relue et fusionnée, avec la CI au vert (onglet `Actions` de GitHub : build, contrôles du HTML, contrastes et `npm audit`). Lis `docs/REVIEW.md` avant de commencer.

Convention : chaque étape porte sa commande, ce qu'il faut vérifier après, et **ce qui doit te faire arrêter**.

---

## 0. Avant tout, une remarque sur l'ordre

L'étape 6 (réécriture d'historique) est **irréversible** et peut, selon la réponse de l'étape 2, déclencher un déploiement de production. Elle est volontairement en dernier, après vérification de la production. Ne la remonte pas.

---

## 1. Passer le dépôt GitHub en privé

C'est la seule mesure qui produit un effet immédiat sans rien déployer. Elle ferme l'accès anonyme au dépôt et à son historique, qui contient encore les coordonnées personnelles de cinq personnes dans le commit `c887605`.

```
gh repo edit Syntexia-AI/syntexia-website --visibility private --accept-visibility-change-consequences
```

**Vérifier :**
```
gh repo view Syntexia-AI/syntexia-website --json visibility
curl -s -o /dev/null -w "%{http_code}\n" https://raw.githubusercontent.com/Syntexia-AI/syntexia-website/main/install-signature.html
```
La première doit renvoyer `PRIVATE`. La seconde doit renvoyer `404`, alors qu'elle renvoie `200` aujourd'hui.

**Conséquence à connaître :** sur l'offre Vercel Hobby, un projet ne peut être relié qu'à un dépôt d'organisation **public** ; un dépôt privé d'organisation demande l'offre Pro. Si le dépôt passe en privé et que le compte Vercel reste en Hobby, la mise en ligne se fait à la main avec la CLI (étapes 3 et 5), ce qui fonctionne sans lien Git.

**Arrêter si :** la visibilité reste `PUBLIC`. Ne continue pas la mise en ligne tant que ce point n'est pas réglé, il est plus urgent que le reste.

---

## 2. Déterminer si le projet Vercel est lié à GitHub

**Cette réponse commande l'étape 6. Réponds-y avant d'aller plus loin.**

Ouvre le tableau de bord Vercel, projet `syntexia-website`, `Settings` puis `Git`.

- **Cas A, un dépôt Git est connecté.** Note-le. Tout push sur la branche de production déclenchera un déploiement automatique.
- **Cas B, aucun dépôt connecté.** Les déploiements se font uniquement par la CLI.

**Vérifier :** la section `Connected Git Repository` affiche soit un dépôt, soit un bouton pour en connecter un.

---

## 3. Déployer une preview

```
cd C:\Users\bapti\Code\syntexia-website
node -v
git checkout main
git pull
npm ci
npx vercel deploy
```

`node -v` doit afficher `v22.12` ou plus récent : Astro 7 ne tourne pas en dessous.

La commande affiche une URL de preview. Appelle-la `$PREVIEW` dans la suite.

**Vérifier, dans cet ordre :**

```
curl -sI $PREVIEW/install-signature | head -1
```
Doit renvoyer `308` ou `301`, pas `200`.

```
curl -s -o /dev/null -w "%{http_code}\n" $PREVIEW/docs/CLAIMS.md
curl -s -o /dev/null -w "%{http_code}\n" $PREVIEW/docs/REVIEW.md
curl -s -o /dev/null -w "%{http_code}\n" $PREVIEW/design/syntexia-home-4da.html
```
Les trois doivent renvoyer `404`. **C'est un point de contrôle sérieux :** ces fichiers décrivent les défauts du site et contiennent la maquette de travail. S'ils répondent `200`, arrête tout.

```
curl -s $PREVIEW/ | grep -c "We read the paperwork nobody wants to"
```
Doit renvoyer au moins `1`, ce qui prouve que le texte est bien dans le HTML sans exécuter de JavaScript.

Ouvre ensuite `$PREVIEW` dans un navigateur, **JavaScript désactivé**, et vérifie que la page s'affiche complètement. C'est le point qui différencie ce site du précédent.

```
curl -s -o /dev/null -w "%{http_code}\n" $PREVIEW/robots.txt
curl -s -o /dev/null -w "%{http_code}\n" $PREVIEW/og-image.png
curl -sI $PREVIEW/ | grep -iE "x-content-type-options|x-frame-options|referrer-policy|permissions-policy|content-security-policy|cross-origin-opener-policy"
```
Les deux premiers `200`. Les six en-têtes doivent apparaître.

**Note sur la redirection apex vers www :** elle ne peut pas être testée sur une URL de preview, qui n'utilise pas le domaine. Elle se vérifie à l'étape 8.

**Arrêter si :** un fichier de `docs/` ou `design/` répond `200`, ou si la home est vide sans JavaScript.

---

## 4. Sans objet

Le formulaire de contact a été retiré : le site donne l'adresse et le téléphone directement. Aucune variable d'environnement n'est à poser. L'étape est gardée pour que les numéros des suivantes ne changent pas.

---

## 5. Déployer en production

```
npx vercel deploy --prod
```

**Vérifier immédiatement :**
```
curl -sI https://www.syntexia.ai/install-signature | head -1
curl -s https://www.syntexia.ai/install-signature | grep -c "@syntexia.ai"
```
La première doit montrer une redirection. La seconde doit renvoyer `0`.

**Arrêter si :** la page répond encore `200` avec des coordonnées. Reviens à l'étape 3.

---

## 6. Réécrire l'historique. En dernier, et seulement maintenant.

**Trois avertissements, à lire avant de taper quoi que ce soit.**

1. **Cette commande est irréversible.** Elle détruit tout l'historique distant, sans retour possible.
2. **Si le projet Vercel est lié à GitHub (cas A de l'étape 2), ce force push déclenche un déploiement de production complet.** C'est pour cela qu'on le fait après avoir vérifié la production, pas avant.
3. **Cette commande détruit toute branche qui n'a pas été fusionnée avant** (`focus-automation-voice`, `refonte-2026-09`, `hotfix-install-signature`…). Assure-toi que l'arbre de travail contient bien l'état que tu veux garder.

Depuis l'arbre final, celui que tu viens de déployer :

```
git status --porcelain          # doit être vide
git checkout --orphan clean
git add -A
git commit -m "Syntexia website"
git branch -D main
git branch -m main
git push --force origin main
```

Puis supprime toute autre branche distante :
```
git ls-remote --heads origin
git push origin --delete <nom-de-branche>   # une fois par branche listée, sauf main
```

**Vérifier :**
```
git log --oneline            # un seul commit
git ls-remote --heads origin # une seule branche, main
```
Et sur GitHub, l'onglet des commits doit montrer un unique commit, sans `install-signature.html` ni `_internal/` dans son arborescence.

**Arrêter si :** `git status --porcelain` n'est pas vide avant de commencer. Tu perdrais du travail non commité.

---

## 7. Google Search Console

1. Demande la suppression de `https://www.syntexia.ai/install-signature`, via `Retraits` puis `Nouvelle demande`.
2. Soumets le nouveau sitemap : `https://www.syntexia.ai/sitemap.xml`.

**Vérifier :** la demande de retrait apparaît en statut `En attente`, et le sitemap est accepté. Il est généré au build et liste toutes les pages indexables : 10 URL au 2026-10-02, une de plus par article publié.

**Note :** il n'y a jamais eu de `robots.txt` sur ce site, donc rien n'a jamais empêché l'indexation de cette page. Considère que son contenu a pu être collecté pendant les treize jours de publication, et traite l'étape 3 du `docs/RAPPORT-W0.md` (faire tourner les coordonnées, informer les personnes concernées) indépendamment de cette demande.

---

## 8. Vérification finale sur le domaine réel

```
curl -sI https://syntexia.ai | head -1
```
Doit renvoyer `301` vers `https://www.syntexia.ai`. **C'est le seul endroit où cette redirection est testable.** Si elle ne fonctionne pas, vérifie dans Vercel que le domaine apex est bien rattaché au projet.

```
for r in / /about /team /blog /security /legal /posts/precedent-meets-pace /posts/the-quiet-revolution-coming-to-audit /posts/the-number-that-is-almost-right /posts/the-order-a-firm-works-in /robots.txt /sitemap.xml /favicon.ico /og-image.png; do
  printf "%-50s %s\n" "$r" "$(curl -s -o /dev/null -w '%{http_code}' https://www.syntexia.ai$r)"
done
```
Toutes doivent renvoyer `200`.

```
curl -sI https://www.syntexia.ai/ | grep -iE "strict-transport|content-security|x-content-type|x-frame|referrer-policy|permissions-policy|cross-origin-opener"
curl -s https://www.syntexia.ai/ | grep -c "We read the paperwork nobody wants to"
curl -s -o /dev/null -w "%{http_code}\n" https://www.syntexia.ai/docs/CLAIMS.md
```
Sept en-têtes présents. Le `grep` au moins `1`. Le dernier `404`.

---

## 9. Après la mise en ligne

- Crée le compte Plausible si tu veux des statistiques, puis décommente la balise dans `src/layouts/Base.astro` et ajoute `https://plausible.io` à `script-src` et `connect-src` dans la CSP de `vercel.json`. **Attention :** dès que tu le fais, la page `/security` ne peut plus affirmer que le site ne charge aucun script tiers. Le texte est à revoir en même temps.
- Reprends `docs/REVIEW.md` section 4 : les cinq décisions en attente. Chacune se traduit par une ligne dans `src/facts.ts` et rallume un bloc du site.
