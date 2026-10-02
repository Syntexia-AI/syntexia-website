# FACTS-PRODUIT.md

Ce que Syntexia fait réellement, établi le 2026-08-31 en lisant les 13 dépôts de
l'organisation `Syntexia-AI`, et non en supposant.

**Source** : les README et la structure des dépôts produits. C'est une source de
type 1 au sens de `FACTS-SITE.md` (le code lui-même).

**Ce dépôt est public : ce document ne nomme aucun client.** Anonymisé le
2026-10-02. Les dépôts et les clients sont désignés par une lettre ; la
correspondance reste dans l'organisation, hors de ce dépôt. Aucun nom de client ne
va sur le site sans accord écrit du client concerné : ce sont des cabinets d'audit et
des sociétés portugaises, la confidentialité est structurelle à leur métier.

---

## 1. Deux lignes de produit, pas cinq secteurs

### Ligne A. Automatisation de la paperasse d'audit

C'est le cœur. Trois dépôts, dont deux documentés en détail.

| dépôt | pour qui | quoi |
|---|---|---|
| plateforme d'audit A | un cabinet d'audit portugais (pilote) | couche d'automatisation au dessus de **CaseWare Working Papers Desktop** |
| plateforme d'audit B | un second cabinet d'audit portugais (SROC) | plateforme orientée acceptation, au dessus de **CaseWare Cloud** |
| moteur d'audit C | un troisième client audit | moteur, sur un sous-domaine dédié |

**La phrase de positionnement existe déjà, elle est dans le README de la plateforme A :**

> « The agent pre-fills, the auditor validates. No CaseWare write-back. »

Ce que ces plateformes suivent, c'est le flux réel d'un cabinet portugais :
`Aceitação/Continuação` (dont branqueamento de capitais) → `Planeamento` →
`Execução` → `Conclusão`, avec l'exécution verrouillée tant que l'acceptation et le
BCFT ne sont pas conclus par entité. Les conclusions sont datées, ce qui constitue
la chronologie de la preuve d'audit.

Conformité réellement implémentée, ce sont des normes publiques :
- **DL 98/2015** (classificateur de seuils légaux portugais)
- **BCFT / LBC-FT** (blanchiment), modèle à 8 questions, dérogation PEP obligatoire
- Indépendance (seuils 20 % et 15 %), matrice d'approbation par nombre d'associés

Interface **100 % PT-PT**.

### Ligne B. Réception téléphonique

Quatre dépôts, même moteur, un locataire de premier rang par client.

| dépôt | pour qui | quoi |
|---|---|---|
| réceptionniste A | une société cliente | réceptionniste PT/EN |
| réceptionniste B | une maison de ventes aux enchères | réceptionniste PT/EN |
| spécification C | la même maison de ventes | spécification, pilote prévu septembre 2026 |
| réceptionniste D | un studio de sport | réceptionniste, avec réservation |

Pile technique commune : FastAPI, Telnyx, Soniox pour la transcription, Azure pour la
synthèse, Anthropic pour la conversation, Supabase pour les données.

Ce qu'elles font : répondre, transférer vers une personne, enregistrer un rappel,
prendre un message, raccrocher. Chez B les transferts sont derrière un
interrupteur, **et sa posture de lancement est fermée** : elle promet un rappel
immédiat plutôt que de composer un numéro.

### Ligne C, adjacente. Plateforme de gestion

Une plateforme de gestion (remplace progressivement l'outil en place chez le studio
de sport, multi-tenant, a vocation à servir d'autres clients) et une application
membre, cliente de l'API de la plateforme.

---

## 2. Ce que le site affirme, et ce que le code dit

| secteur affiché sur la home | vérifié dans les 13 dépôts |
|---|---|
| Audit and assurance | **OUI**, trois dépôts, deux cabinets nommés |
| Public sector | **AUCUNE TRACE**, 0 occurrence dans l'organisation |
| Financial services | **AUCUNE TRACE**, 0 occurrence |
| Hospitality | **AUCUNE TRACE**. Une maison de ventes aux enchères et un studio de sport ne sont pas de l'hôtellerie |
| Retail | **AUCUNE TRACE**, 0 occurrence |

Recherche menée sur l'organisation entière (`search/code`, org:Syntexia-AI) pour
`public sector`, `financial services`, `banking`, `municipality`, `camara municipal`,
`retail` : **zéro résultat pour chacun**.

**Quatre secteurs sur cinq sont affirmés sans le moindre déploiement.** C'est
exactement le type d'affirmation que la règle « source ou suppression » interdit, et
il avait survécu parce que je l'avais repris de la maquette sans le confronter au
code.

---

## 3. Le fil rouge réel, celui qui peut être publié

Il n'y a pas cinq secteurs. Il y a quatre constantes, et toutes sont vérifiables dans
le code sans nommer un seul client.

1. **Le Portugal.** Tout est en portugais européen. Les normes implémentées sont
   portugaises. Les clients sont au Portugal.
2. **L'agent prépare, l'humain décide.** C'est écrit noir sur blanc dans le README de
   la plateforme A, et c'est la posture de lancement de la réceptionniste B. Ce n'est pas un slogan, c'est
   une contrainte d'architecture.
3. **Un locataire par client, jamais de donnée partagée.** « Architecture replicated
   from the proven blueprint, architecture only, never data. » Chaque cabinet a sa
   plateforme, ses règles, ses gabarits.
4. **Aucune donnée synthétique.** « No synthetic data anywhere in the app: dev, tests
   and demo run on real files only. » Et les données client sont exclues du dépôt dès
   le premier commit, en lecture seule à vie.

Le point 3 et le point 4 sont des **arguments commerciaux de premier ordre** pour un
cabinet d'audit, et ils ne sont nulle part sur le site.

---

## 4. Deux erreurs de ma part, à corriger

**1. Le positionnement.** J'ai écrit « Voice and document systems for regulated
companies » en déduisant la voix de l'ancien site et de ma mémoire, sans vérifier.
La voix existe bien, mais elle est la partie visible et non le produit défendable.
Le cœur est l'audit, et il est absent du site.

**2. La recommandation de démonstration vocale publique.** Elle était irréalisable et
je ne l'avais pas vérifiée. Chaque bot est un locataire mono-client branché sur le
Supabase d'une société réelle, avec ses numéros de transfert et ses règles. Il n'y a
aucun agent générique à faire appeler. Publier un numéro reviendrait à exposer une
ligne cliente. Cette recommandation est retirée du benchmark.

---

## 5. Ce qui reste à trancher, et qui n'appartient qu'à toi

- **Peut-on nommer un client ?** A et B sont des cabinets d'audit. Un logo
  ou une étude de cas nommée change complètement la crédibilité du site. Cela demande
  leur accord écrit.
- **Peut-on citer CaseWare ?** L'intégration est un fait technique et un argument
  fort auprès des cabinets qui l'utilisent. Reste à savoir si le nom peut être
  employé publiquement sans accord de l'éditeur.
- **Que met-on en avant, l'audit ou la réception ?** Le code dit que l'audit est le
  produit, la réception le déploiement. Le site dit l'inverse.
- **Le Portugal s'affiche-t-il ?** Aujourd'hui le site ne mentionne aucun lieu. La
  réalité est portugaise et c'est une force pour un cabinet portugais, pas une
  limite.
