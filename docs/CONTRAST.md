# CONTRAST.md

Ratios WCAG 2.1 de chaque couple texte/fond du site, calculés depuis les tokens réels
de `src/styles/tokens.css`.

Reproduire : `node scripts/contrast.mjs`. Le script sort en code 1 si un couple échoue.
Date : 2026-10-01, direction « le point au cœur » (`docs/DA-2026-10.md`). La mesure de
la palette précédente, sombre et cuivrée, reste dans l'historique git.

Seuils : 4.5:1 pour le texte courant, 3:1 pour le grand texte et pour les objets
graphiques porteurs de sens (WCAG 1.4.11).

| texte | fond | usage | ratio | seuil | verdict |
|---|---|---|---|---|---|
| `--black` | `--white` | Titres et texte principal sur papier | **21.00:1** | 4.5:1 | PASSE |
| `--graphite` | `--white` | Paragraphes sur papier | **11.18:1** | 4.5:1 | PASSE |
| `--stone` | `--white` | Dates, rôles, légendes sur papier | **5.64:1** | 4.5:1 | PASSE |
| `--white` | `--black` | Bouton principal, texte blanc sur noir | **21.00:1** | 4.5:1 | PASSE |
| `--copper` | `--white` | Point final, coches, anneau de focus : objet graphique | **4.19:1** | 3:1 | PASSE |
| `--black` | `--desk` | Titres sur le bureau | **17.94:1** | 4.5:1 | PASSE |
| `--graphite` | `--desk` | Paragraphes sur le bureau | **9.55:1** | 4.5:1 | PASSE |
| `--stone` | `--desk` | Légendes sur le bureau (démonstration, pièces) | **4.81:1** | 4.5:1 | PASSE |
| `--copper` | `--desk` | Point final et focus sur le bureau : objet graphique | **3.58:1** | 3:1 | PASSE |
| `--typewriter` | `--white` | Encre des pièces reproduites | **16.84:1** | 4.5:1 | PASSE |
| `--stone` | `--paper-2` | Rail de phases de l interface reproduite | **5.22:1** | 4.5:1 | PASSE |
| `--white` | `--black` | Titres et texte principal sur noir | **21.00:1** | 4.5:1 | PASSE |
| `--ash` | `--black` | Paragraphes sur noir | **12.32:1** | 4.5:1 | PASSE |
| `--ash-2` | `--black` | Légendes, pied de page sur noir | **6.19:1** | 4.5:1 | PASSE |
| `--soot-2` | `--black` | Verbes au repos des onglets, 40px et plus : grand texte | **3.51:1** | 3:1 | PASSE |
| `--copper-lit` | `--black` | Point final, filet de progression, focus sur noir | **9.12:1** | 3:1 | PASSE |
| `--black` | `--copper-lit` | Texte sélectionné | **9.12:1** | 4.5:1 | PASSE |

Couples évalués : 17. Échecs : 0.

## Trois points de méthode

**Le cuivre n'est jamais du texte courant.** Sur papier et sur bureau, il ne sert
qu'au point final des titres, aux coches de l'agent et à l'anneau de focus : des
objets graphiques, seuil 3:1. Sur noir, il prend sa valeur claire, `--copper-lit`.

**Les verbes au repos des onglets sont évalués comme du grand texte.** Ils font 40px
au minimum. Leur gris est volontairement bas, pour que le verbe actif ressorte, et
reste au-dessus de 3:1.

**Les filets ne sont pas évalués.** `--hairline` sur papier et `--soot` sur noir ne
servent qu'à des séparateurs décoratifs, hors du champ de WCAG 1.4.11. Le site n'a
plus de champ de formulaire.

## Ce qui n'est pas couvert ici

Le calcul porte sur les couples déclarés dans les tokens, pas sur un rendu observé.
Un texte posé sur une image échapperait à ce contrôle. Le site n'en comporte aucun au
2026-10-01 : les portraits de la page équipe ne portent aucun texte.
