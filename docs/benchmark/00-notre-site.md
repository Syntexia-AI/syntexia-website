# Notre site, mesuré

Auto-audit de `syntexia.ai` refondu, avant confrontation aux concurrents.
Mesures prises le 2026-08-31 sur le build réel, pas sur le code.

---

## 1. Test du site généré par IA : 14 marqueurs sur 14 absents

Les marqueurs cherchés sont ceux que produisent par défaut v0, Lovable, Bolt et
consorts. Recherche menée sur `dist/client/`, c'est à dire le HTML et le CSS
réellement servis.

| marqueur | verdict |
|---|---|
| dégradé violet ou indigo (`purple-*`, `indigo-*`, `#7c3aed`, `#6366f1`) | absent |
| dégradé CSS de toute nature (`linear-gradient`, `bg-gradient`) | absent |
| verre dépoli (`backdrop-blur`, `backdrop-filter`) | absent |
| badges arrondis (`rounded-full`, `border-radius: 9999px`) | absent |
| ombres portées (`shadow-xl`, `shadow-2xl`, `box-shadow`) | absent |
| animations en cascade (`animate-in`, `fade-in`, `animation-delay`) | absent |
| police Inter | absent |
| utilitaires Tailwind par défaut (`max-w-7xl`, `mx-auto`, `text-gray-*`) | absent |
| emojis dans l'interface | absent |
| preuve sociale creuse (`Trusted by`, `Loved by`, `Backed by`) | absent |
| compteurs animés (`countUp`, `data-count`, `odometer`) | absent |
| icônes lucide ou heroicons | absent |
| fond à points ou à grille (`bg-grid`, `bg-dot`) | absent |
| témoignages | absent |

Un premier passage avait signalé « Inter présent ». C'était un faux positif : la
recherche insensible à la casse attrapait les mots `interface`, `internal` et
`intelligence`. Vérification ciblée sur le nom de police : `Archivo` et
`Courier Prime` uniquement.

## 2. Métriques objectives

| mesure | valeur |
|---|---|
| requêtes vers un domaine tiers | **0** |
| transféré au premier rendu | **~37 Ko**, dont 28 Ko de polices |
| HTML de la home | 12,5 Ko brut, 3,2 Ko gzip |
| CSS total | 14,3 Ko brut, 3,3 Ko gzip |
| JavaScript total | 6,1 Ko brut, **2,8 Ko gzip** |
| couleurs distinctes déclarées | 14 |
| tailles de police distinctes | 12 |
| mots servis sans JavaScript, home | 422 |

Repère : three.js seul pèse environ 150 Ko gzip, soit plus de quatre fois le poids
total de notre premier rendu, polices comprises.

## 3. Typographie et rythme mesurés sur le rendu

| mesure | valeur |
|---|---|
| H1 | 64 px, interligne 67,2 px (1,05), approche -1,41 px |
| corps des lignes horaires | 16,5 px |
| rapport H1 sur corps | **3,88** |
| largeur de la colonne de texte | 1180 px |
| espace vertical entre sections | 96 px |
| hauteur totale de la home | 3478 px, soit 3,9 écrans |
| mots au premier écran | 112 |

## 4. Deux faiblesses trouvées en mesurant, pas en regardant

### 4.1 Aucun bouton n'est visible au premier écran

Mesure de la position des boutons, viewport standard :

| appareil | premier bouton | viewport | verdict |
|---|---|---|---|
| desktop 1440 | `Book a call` à **1533 px** | 900 px | invisible, 1,7 écran de scroll |
| mobile 390 | `Book a call` à **2365 px** | 844 px | invisible, 2,8 écrans de scroll |

Décomposition de la hauteur du bloc d'accueil, mesurée :

```
titre plus mark      360 px
mention illustration  39 px
huit lignes horaires 858 px   (8 fois 107 px)
-------------------------------
section entière     1566 px
```

**Origine de l'écart.** La maquette Turno place bien les boutons après les totaux,
mais elle dessinait le bloc `.d2` comme **un seul écran** dans un cadre contenu.
Notre implémentation l'a étalée sur 1,7 écran : nos huit lignes prennent 858 px
là où la maquette les comprimait. Ce n'est pas la maquette qui a tort, c'est
l'implémentation qui a dérivé.

Pour tenir dans un écran de 900 px, masthead déduit, il resterait 371 px pour huit
lignes, soit 46 px chacune. Impossible avec un texte sur deux lignes. Le bloc ne
peut donc pas tenir en un écran tel quel : il faut soit remonter les boutons, soit
réduire le nombre de lignes visibles d'emblée.

### 4.2 Aucune démonstration essayable

Recherche de `try`, `demo`, `call us`, `listen`, `play` dans la home : aucune
occurrence. Le visiteur ne peut rien vérifier par lui-même. Il doit croire un texte.

C'est d'autant plus gênant que nous vendons de la voix, et que la voix est la seule
chose au monde qu'on peut prouver en trente secondes sans donnée client, sans
logo et sans chiffre.
