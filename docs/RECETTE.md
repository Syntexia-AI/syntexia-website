# RECETTE.md

Recette de la passe complète. Chaque ligne porte sa commande et sa sortie réelle.
Exécutée le 2026-08-31 sur la branche `refonte-2026-09`, serveur local `astro dev` sur le port 4321.

```
$ git grep -nE "7757 998|932 733|966 660|amin\.martins|rui\.baiao|miguel\.fiel|fernando\.carvalho|alex@syntexia"
docs/RAPPORT-W1a.md:29:git grep -nE "7757 998|932 733|966 660|amin\.martins|rui\.baiao|miguel\.fiel|fernando\.carvalho|alex@syntexia"

# La seule occurrence possible est la commande elle-même, citée dans un
# rapport. Contrôle ciblé sur une vraie donnée plutôt que sur le motif :
$ git grep -oE "\+(44|351) ?[0-9]{2,4} ?[0-9]{3} ?[0-9]{3}|[a-z]+\.[a-z]+@syntexia\.ai" | sort -u
docs/INVENTAIRE.md:+442046204570

$ grep -rn "—" src/ public/
public/syntexia-mark-dark.svg:2:  <title>Syntexia Mark — dark</title>

$ grep -rn "unpkg\|babel\|googleapis\|gstatic\|JetBrains\|Instrument Serif\|Geist" dist/
(aucun résultat)

$ grep -rn "__edit_mode\|TWEAK\|tweaks" dist/ src/
(aucun résultat)

$ grep -rn 'href="#"' dist/
(aucun résultat)

$ grep -rn "notranslate\|translate=\"no\"\|Content-Language" dist/
(aucun résultat)

$ grep -rnE "font-size:\s*(1[0-2]|[0-9])(\.[0-9]+)?px" src/
(aucun résultat)

$ grep -rn "backdrop-filter\|linear-gradient\|box-shadow" src/
(aucun résultat)

$ ls dist/docs dist/design dist/logo-pack
ls: cannot access 'dist/docs': No such file or directory
ls: cannot access 'dist/design': No such file or directory
ls: cannot access 'dist/logo-pack': No such file or directory
```

## Routes et ressources servies

```
$ for r in ... ; do curl -s -o /dev/null -w "%{http_code}" http://localhost:4321$r ; done
/                                                200
/about                                           200
/team                                            200
/blog                                            200
/security                                        200
/posts/precedent-meets-pace                      200
/posts/the-quiet-revolution-coming-to-audit      200
/robots.txt                                      200
/sitemap.xml                                     200
/favicon.ico                                     200
/og-image.png                                    200
/apple-touch-icon.png                            200
/site.webmanifest                                200
/fonts/archivo-400.woff2                         200
/nexistepas                                      404  (page 404 marquée, code attendu)
```

## Texte servi sans JavaScript

Compté sur le HTML statique de `dist/client/`, scripts et styles retirés.

| route | mots servis sans JS |
|---|---|
| `/404.html` | 50 |
| `/about/index.html` | 184 |
| `/blog/index.html` | 78 |
| `/index.html` | 422 |
| `/posts/precedent-meets-pace/index.html` | 1158 |
| `/posts/the-quiet-revolution-coming-to-audit/index.html` | 601 |
| `/security/index.html` | 233 |
| `/team/index.html` | 43 |

Mesure faite avec un dépouillement non gourmand (perl, non greedy multiligne). Une
mesure au sed ligne à ligne, utilisée dans une première version de ce document,
donnait des chiffres faux dans les deux sens : elle avalait du contenu entre le
premier et le dernier script de la page.

Même mesure appliquée à la production actuelle : **8 mots**. Tout le reste de
l'ancienne home était produit par React après transpilation Babel dans le
navigateur du visiteur.

## Validation HTML

```
$ npx html-validate "dist/client/**/*.html"
(sortie vide, code de retour 0, sur les 8 pages)
```

## Formulaire de contact

```
$ curl -X POST /api/contact  (sans RESEND_API_KEY ni CONTACT_TO)
{"error":"The form is not connected yet.","fallback":"office@syntexia.ai"}
status: 503

$ curl -X POST /api/contact  (pot de miel rempli)
{"ok":true}
status: 200

$ curl -X POST /api/contact  (adresse invalide)
{"error":"That email address does not look right."}
status: 400
```

## Contrôle final, après correction des vérificateurs

```
$ node scripts/contrast.mjs   (extrait)

accent oklch(0.79 0.12 65) converti en sRGB : rgb(240, 170, 99)
Couples evalues : 14. Echecs : 0.

$ npx html-validate "dist/client/**/*.html"
(sortie vide, code 0, 8 pages)

$ grep -o "<h1[^>]*>[^<]*" dist/client/index.html
<h1 data-astro-cid-j7pv25f6>One Tuesday. Nobody was on shift.

$ grep -c "day-row" dist/client/index.html   # 8 lignes horaires + 2 en CSS
10

$ grep -o "A typical Tuesday[^<]*" dist/client/index.html
A typical Tuesday. This is not a live feed and no customer data appears on this page.

$ grep -o "company number [0-9]*" dist/client/index.html
company number 16847343

$ grep -riE "em>" dist/client/*/index.html | grep -c "<h[1-6]"   # emphase dans un titre
0
```
