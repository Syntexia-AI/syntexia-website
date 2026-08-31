# Benchmark concurrentiel. Synthèse.

2026-08-31. 25 sites analysés en direct, répartis en quatre lots.
Détail par lot : `01-voix.md`, `02-documents-audit.md`, `03-references-da.md`, `04-vibe-coded.md`.
Notre propre site mesuré : `00-notre-site.md`.

---

## Le constat qui commande tout le reste

**Notre problème n'est pas le design. C'est la preuve.**

Le site refondu est propre, léger, rapide, et il ne ressemble à rien de généré. Mesuré :
zéro requête tierce, 37 Ko au premier rendu, 2,8 Ko de JavaScript, 15 marqueurs de
site généré sur 15 absents. Sur ce terrain, nous sommes meilleurs que la plupart des
concurrents analysés.

Mais nous avons retiré tous les chiffres, tous les logos et tous les noms, faute de
source. **Il ne reste donc rien à vérifier pour le visiteur.** Il doit croire un texte.

Or le benchmark fait apparaître exactement **deux dispositifs de preuve qui ne
demandent ni logo, ni chiffre, ni nom de client**. Les deux sont dans nos cordes. L'un
est déjà construit et caché.

---

## Dispositif 1. La pièce reproduite. Personne ne le fait.

**Le constat le plus exploitable du benchmark.** Sur les huit acteurs du traitement
documentaire et de l'audit analysés (Rossum, Hyperscience, Instabase, Klarity devenu
Within, DataSnipper, Trullion, Fieldguide, Numeric) : **aucun ne montre une pièce
réelle ou caviardée.** Zéro sur huit.

Ce qu'ils font à la place :

| contournement | qui | ce que ça vaut |
|---|---|---|
| chiffre attribué (nom, fonction, pourcentage), sans jamais montrer la donnée source | Rossum, DataSnipper, Numeric | invérifiable |
| mockup d'interface stylisé qui cadre **autour** du document sans le montrer | Rossum, Trullion, Within | on voit le logiciel, pas le travail |
| photo lifestyle humaine en plein écran, zéro produit à l'écran | Fieldguide | rien à voir |
| noms d'IA connus en proxy de crédibilité | Within (OpenAI en tête) | emprunté |

**Nous avons déjà la pièce.** La page `/security` porte trois documents reconstitués,
en Courier Prime, avec les données client caviardées en noir : une facture fournisseur
portugaise, une balance analytique, une feuille d'heures. Elles sont légendées
« Illustrative documents. No customer data. »

**Et cette page n'est liée nulle part.** Elle attend un troisième fait sourcé pour
apparaître dans la navigation. Notre seul actif visuel réellement différenciant est
invisible.

## Dispositif 2. La démo essayable. Un seul concurrent le fait.

Sur les sept acteurs de la voix analysés, **un seul propose de parler à l'agent sans
créer de compte** : Bland.ai, avec un sélecteur de scénarios par industrie. Vapi a un
bouton d'appel navigateur. Les autres appellent « démo » un formulaire HubSpot
(Cognigy) ou une ancre morte (Synthflow, dont le bouton « Hear Demo » ne mène nulle
part).

C'est le dispositif de preuve le plus fort du panel, pour une raison simple : **le
visiteur vérifie la promesse lui-même en trente secondes**, au lieu de croire un
chiffre déclaratif.

Et c'est le seul type de preuve qui échappe entièrement à notre problème de sourcing.
Une démonstration qui fonctionne ne prétend rien : elle se produit.

Notre home ne contient aujourd'hui aucune occurrence de `try`, `demo`, `listen` ou
`call us`. Nous vendons de la voix, et c'est la seule chose au monde qui se prouve
sans donnée client, sans logo et sans chiffre.

---

## Notre concurrent le plus direct

**Bland.ai occupe littéralement notre positionnement.**

> « Voice AI for regulated industries including healthcare, insurance, financial
> services, and logistics. »
> « Built for high-stakes phone calls where security and trust actually matter. »

Comparé au nôtre :

> « One Tuesday. Nobody was on shift. »
> « Not a chatbot. Not a co-pilot. The layer that does the work inside the systems
> these companies already run. »

Notre titre est narratif, le sien est descriptif. **Aucun des sept acteurs de la voix
n'a un titre narratif** : ils annoncent tous ce qu'ils font et pour qui, souvent
platement (« Enterprise-Ready Voice AI Agents for Automated Phone Calls ») ou avec un
superlatif creux (« The world's most lifelike », « #1 AI Voice Agent Platform »).

C'est notre différenciateur le plus net, et il a un coût : **on ne dit pas ce qu'on
fait au premier écran.** Le sous-titre le dit, mais un visiteur pressé peut repartir
sans avoir compris le métier. C'est un arbitrage à assumer consciemment, pas à subir.

Ce que Bland fait et que nous ne faisons pas, hors logos et chiffres :
des études de cas chiffrées **et sectorisées** (« $750K saved by retiring the IVR »),
une page sécurité qui descend au niveau technique (« AES-256 at rest. TLS 1.3 in
transit. HSM-backed keys »), un bloc de déploiement en trente jours, une FAQ de huit
questions.

---

## Les faiblesses des concurrents, dont il faut se garder

1. **Les chiffres ne sont quasiment jamais datés ni sourcés.** Rossum affiche quatorze
   statistiques, aucune datée. C'est la norme du secteur, et c'est précisément ce que
   notre règle « source ou suppression » nous interdit. Notre austérité actuelle est
   donc un choix défendable, à condition de la compenser par de la preuve d'un autre
   type.
2. **Les compteurs animés cassent sans JavaScript.** PolyAI sert « 0 pt », « $0.2M »
   et « 0 % » quand on charge sa page sans exécuter le script. Un visiteur, un
   moteur ou un aperçu de lien voit littéralement des zéros. C'est exactement le
   défaut que nous venons de corriger chez nous.
3. **La conformité est traitée en logo muet.** Trullion, Fieldguide et Numeric n'ont
   aucun lien sécurité sur leur page d'accueil. Cognigy et Parloa reléguent tout dans
   un centre de confiance externe. C'est une ouverture : la conformité lisible est un
   argument commercial sous-exploité par le secteur.
4. **Les faux boutons de démonstration.** Promettre une démo et servir un formulaire
   détruit la confiance au moment précis où on la demandait.

---

## Ce que les références de sobriété enseignent

Classement par impact sur le prix perçu, hors effets qui nous sont interdits :

1. **La discipline chromatique.** Un seul accent, réellement appliqué. Linear est le
   cas le plus pur : fond quasi noir `#08090a`, un indigo unique. C'est le facteur le
   plus corrélé au prix perçu.
2. **La hiérarchie par la graisse et l'approche, pas par la couleur ni la taille.**
   Linear passe de 300 à 590 sur une seule famille. Vercel tient tout avec 64/56/30/14
   px et une approche de -0,06em.
3. **La profondeur par blocs pleins et filets fins, jamais par le flou.** Anthropic et
   Vercel n'ont aucune ombre portée.

**Sur le mouvement, le résultat est net et il nous conforte.** Les deux sites les plus
sobres et les plus chers du panel, Linear et Anthropic, n'ont aucun mouvement notable.
Stripe est riche, mais sa richesse vient structurellement d'un dégradé WebGL animé en
continu, effet qui nous est interdit. **La qualité perçue tient à la discipline
chromatique et typographique, pas au volume d'animation.**

Notre choix d'un mouvement unique, porté par le mark, est aligné sur les meilleurs.

---

## Recommandations, par rapport impact sur coût

### 1. Remonter les documents reproduits sur la page d'accueil

Notre seul actif visuel différenciant est sur une page que personne ne peut atteindre.
Zéro concurrent sur huit ne montre de pièce. C'est le geste le plus rentable du lot :
le composant existe, les documents existent, il s'agit de les déplacer.

Effet : la page d'accueil montre enfin la **matière** du travail, pas seulement son
récit. Coût : faible. Aucun fait nouveau requis, les documents sont déclarés
illustratifs.

### 2. Ajouter une démonstration vocale essayable

Le dispositif de preuve le plus fort du benchmark, et le seul qui échappe entièrement
au problème de sourcing. Un numéro à appeler affiché sur la page d'accueil suffit.

Ce que cela demande de toi : un numéro dédié qui aboutit sur un agent, et l'accord
pour qu'il soit public. **C'est une décision, pas un développement.**

### 3. Remonter les boutons au premier écran

Mesuré : aucun bouton n'est visible sans scroller, ni sur desktop (`Book a call` à
1533 px pour un écran de 900) ni sur mobile (2365 px, presque trois écrans). La
maquette Turno concevait le bloc comme **un seul écran** ; notre implémentation l'a
étalé sur 1,7 parce que nos huit lignes prennent 858 px.

### 4. Écrire la sécurité en phrases, pas en badges

Le secteur traite la conformité en logo muet. Bland descend au détail technique et
s'en sert comme argument. Nous avons déjà le bon cadre (« What we can put in a
contract ») et il n'attend que des réponses.

### 5. Assumer explicitement le titre narratif

Il nous distingue des sept concurrents, et il ne dit pas notre métier. À trancher
sciemment : soit on le garde et on accepte que le métier se lise au sous-titre, soit
on ajoute une ligne descriptive courte au-dessus.

---

## Ce que nous faisons déjà mieux qu'eux

À conserver, ce sont des avantages réels et mesurés :

- **Zéro requête tierce.** La plupart des concurrents chargent des scripts d'analyse,
  des polices Google et des widgets de chat.
- **37 Ko au premier rendu**, contre des pages dont le seul framework dépasse souvent
  ce poids.
- **Tout le texte servi sans JavaScript**, quand PolyAI affiche des zéros.
- **Aucun chiffre non sourcé**, quand Rossum en affiche quatorze sans date.
- **Une page sécurité qui montre des pièces**, quand aucun des huit ne le fait.
- **15 marqueurs de site généré sur 15 absents.**

Le problème n'a jamais été que le site fasse pauvre. C'est qu'il est **avare de
preuve**, et que la preuve qu'il pourrait donner sans mentir est cachée ou absente.
