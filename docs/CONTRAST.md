# CONTRAST.md

Ratios WCAG 2.1 de chaque couple texte/fond du site, calculés depuis les tokens réels.

Reproduire : `node scripts/contrast.mjs`. Le script sort en code 1 si un couple échoue.
Date : 2026-08-31.

| texte | fond | usage | ratio | seuil | verdict |
|---|---|---|---|---|---|
| `--ink` | `--bg` | Corps et titres sur le fond | **17.39:1** | 4.5:1 | PASSE |
| `--ink-2` | `--bg` | Paragraphes, texte des lignes horaires | **11.27:1** | 4.5:1 | PASSE |
| `--mute` | `--bg` | Modalite des lignes, labels de champs, dates | **4.93:1** | 4.5:1 | PASSE |
| `--mute-2` | `--bg` | Mention d illustration, legende, mention legale | **4.57:1** | 4.5:1 | PASSE |
| `--accent-fallback` | `--bg` | Chiffre de preuve, 44px, grand texte | **9.87:1** | 3:1 | PASSE |
| `--accent-oklch` | `--bg` | Idem, valeur oklch reelle | **10.02:1** | 3:1 | PASSE |
| `--accent-ink` | `--accent-fallback` | Texte du bouton principal | **9.87:1** | 4.5:1 | PASSE |
| `--accent-ink` | `--accent-oklch` | Idem, valeur oklch reelle | **10.02:1** | 4.5:1 | PASSE |
| `--ink` | `--surface` | Titre de document reproduit | **15.88:1** | 4.5:1 | PASSE |
| `--ink-2` | `--surface` | Corps de document reproduit | **10.29:1** | 4.5:1 | PASSE |
| `--mute` | `--surface` | Libelles dans un document reproduit | **4.51:1** | 4.5:1 | PASSE |
| `--ink` | `--bg-2` | Saisie de formulaire | **16.81:1** | 4.5:1 | PASSE |
| `--line-strong` | `--bg` | Bordure des champs de formulaire, composant d interface | **3.02:1** | 3:1 | PASSE |
| `--line` | `--bg` | Separateurs decoratifs. Hors champ de WCAG 1.4.11, seuil indicatif | **1.32:1** | 1:1 | PASSE |

accent oklch(0.79 0.12 65) converti en sRGB : rgb(240, 170, 99)
Couples evalues : 14. Echecs : 0.


## Trois corrections imposées par la mesure

La directive fixait `--mute-2` à `#6F6A5F` en affirmant que la valeur passait 4.5:1.
**Elle ne le passe pas.** Mesure : 3.68:1 sur `--bg`. La valeur d'origine `#5A554B`
donnait 2.60:1. La règle qui justifiait le changement, atteindre 4.5:1, a été tenue
plutôt que la valeur littérale.

| token | valeur directive | ratio obtenu | valeur retenue | ratio final |
|---|---|---|---|---|
| `--mute-2` | `#6F6A5F` | 3.68:1 | `#7F796C` | 4.57:1 |
| `--mute` | `#837C6F` | 4.37:1 sur `--surface` | `#867E71` | 4.51:1 |
| bordure de champ | `--line` `#2A2622` | 1.32:1 | `--line-strong` `#655C52` | 3.02:1 |

Les trois écarts sont visuellement imperceptibles : même teinte, clarté remontée de
quelques points. Ils sont journalisés dans `docs/REVIEW.md`.

## Deux points de méthode

**L'accent est déclaré deux fois.** `--accent: #EDA968` puis `--accent: oklch(0.79 0.12 65)`.
Un navigateur sans oklch retient le premier, les autres le second. Les deux sont donc
mesurés séparément. Ils donnent 9.87:1 et 10.02:1, l'écart est sans effet.

**`--line` n'est pas évalué comme du texte.** Il ne sert qu'à des séparateurs
décoratifs, hors du champ de WCAG 1.4.11 qui vise les composants d'interface et les
objets graphiques porteurs de sens. Les bordures qui sont bien un composant
d'interface, celles des champs de formulaire, utilisent `--line-strong` et passent 3:1.

## Ce qui n'est pas couvert ici

Le calcul porte sur les couples déclarés dans les tokens, pas sur un rendu observé.
Un texte posé sur une image, ou une superposition non prévue, échapperait à ce
contrôle. Le site n'en comporte aucun au 2026-08-31 : aucune image de fond, aucun
dégradé, aucune superposition.
