# Benchmark — sites de concurrents IA vocale

Sources : homepages consultées via WebFetch le 2026-08-31. Pour PolyAI, l'URL `polyai.com` renvoyait une erreur `certificate has expired` ; le site a été consulté via `https://poly.ai` (redirection vers le même site) à la place. Toutes les autres URL de la liste ont chargé sans problème.

---

## PolyAI (poly.ai)

**1. Premier écran**
- H1 exact : « PolyAI: The world's most lifelike voice AI agents »
- Sous-titre exact : « Introducing Dialog-RSN-1, our most advanced frontier dialog model. »
- Boutons exacts : « Start building », « Request demo »

**2. Preuves**
- Logos clients nommés : PG&E, Audibel, Fogo De Chao, Howard Brown Health, Unicredit, Quicken, Simplyhealth, Golden Nugget, Melting Pot.
- Chiffres affichés : « 0 pt CSAT boost from day one » (assureur santé), « $0.2M revenue from one voice agent » (hôtel-casino), « 0% reduction in seasonal hiring, saving $1 million+ » (enseigne retail), « 0% of calls resolved without human agents » (livraison). Les valeurs à « 0 » sont très probablement des compteurs animés en JavaScript qui ne se sont pas exécutés lors du fetch statique, donc la vraie valeur n'a pas pu être capturée. Non vérifié au-delà de ce constat.
- Études de cas : témoignages nommés, ex. « Lauren Sullivan, Chief Information Officer, Howard Brown Health ».
- Démo interactive : non détectée sur la home.
- Audio jouable : non détecté (vidéos avec poster image, pas de lecteur audio autonome).

**3. Ordre des blocs**
1. Navigation et bandeau de marque
2. « Own every conversation, chat, appointment... »
3. « The Agentic Dialog Platform » — build à vitesse
4. Bandeau de 11 logos clients
5. Vidéo témoignage « Finally. Someone who f***ing listens »
6. « Built for complexity. Better with every dialog »
7. Quatre cas d'usage chiffrés (compteurs à 0, cf. ci-dessus)
8. Détail plateforme « Agentic Dialog Platform »
9. Trois sections : builders, agents full-stack, guardrails
10. Témoignages clients avec citations
11. « At your command » — pourquoi les entreprises font confiance
12. Ressources « The last word » (guides, blog)
13. Footer (produit, industries, cas d'usage)

**4. Démo sans compte** : NON. « Start building » renvoie vers `studio.poly.ai` (connexion requise) ; « Request demo » est un formulaire. Aucun numéro affiché, aucune démo vocale navigateur.

**5. Design** : polices non identifiables depuis le HTML brut. Fond clair dominant. Boutons en forme de pilule (« pill badges ») sur les CTA. Pas de glassmorphism explicite détecté ; dégradés/glow suggérés par les visuels mais non confirmés dans le texte brut (non vérifié).

**6. Conformité/sécurité** : bloc dédié sur la home — « Guardrails for compliance, brand, and experience — Every agent is governed by default, with SOC 2, HIPAA, GDPR, PCI DSS as standard. » Lien de navigation vers `/security`. Aucune région d'hébergement mentionnée.

---

## Parloa (parloa.com)

**1. Premier écran**
- H1 exact : « Unhold your customers; hold onto loyalty. »
- Sous-titre exact : « AI agents that turn customer conversations into lasting loyalty »
- CTA exacts : « How our platform works », « Book a demo », « Early bird tickets available now → » (événement WAVE 2026)

**2. Preuves**
- Logos/études de cas nommés : BarmeniaGothaer (étude de cas « Mina »), TUI, ATU.
- Chiffres exacts : « Workload reduction at the switch board 90% », « NPS increase 179% », « Customers reported a stronger customer relationship with Barmenia 60% », « Real-time translation accuracy 97% », « Less phone time for staff 60% ».
- Démo interactive : aucune détectée. Audio jouable : aucun détecté.

**3. Ordre des blocs**
1. Navigation et héros avec vidéos
2. Proposition de valeur en trois colonnes
3. « Solutions for every industry » — six secteurs
4. Certification « SAP Endorsed App Premium »
5. Citation fondatrice + « AI Agent lifecycle »
6. Trois études de cas clients avec métriques
7. Sept badges de certifications sécurité
8. CTA « Build customer relationships »
9. Footer et newsletter

**4. Démo sans compte** : NON. Seules options « Book a demo » ou « Contact sales », compte/formulaire requis.

**5. Design** : polices non identifiables. Fond majoritairement clair avec sections sombres contrastées. Effets de « refraction layers » (images `refract_*.webp`) qui suggèrent dégradés/glassmorphism ; badges arrondis sur les certifications.

**6. Conformité/sécurité** : bloc dédié avec sept badges — « ISO 27001:2022 », « ISO 17442:2020 », « SOC 2 Type 1 », « SOC 2 Type 2 », « PCI DSS », « HIPAA », « DORA ». Pas de région d'hébergement mentionnée. RGPD traité via lien « Privacy policy » (Iubenda) et « Trust center ».

---

## Bland.ai (bland.ai)

**1. Premier écran**
- H1 exact : « Voice AI for regulated industries including healthcare, insurance, financial services, and logistics. »
- Sous-titre exact : « Built for high-stakes phone calls where security and trust actually matter. »
- CTA exacts : « Book a call », « Try for free », « Log in »

**2. Preuves**
- Logos clients nommés (11) : Kin Insurance, Mutual of Omaha, TravelPerk, Samsara, Corgi, EvenUp, Medallion, Innovaccer, Nuitée, First Financial Bank, Signant.
- Chiffre exact : « 633,767,891 calls resolved to date » (probablement un compteur, mais une valeur numérique réelle a bien été capturée, contrairement à PolyAI).
- Études de cas nommées : MyPlanAdvocate (« $40M added in five months »), American Way Health (« $430M+ in additional annual revenue »), IHFA (« $750K saved by retiring the IVR »).
- Démo interactive : oui, section « Talk to an agent » avec sélecteur de scénarios (Ask anything, Healthcare, Insurance, Financial services).
- Audio jouable : non détecté séparément de la démo interactive elle-même.

**3. Ordre des blocs**
1. Navigation et CTA (Log in, Try for free, Book a call)
2. Titre + sous-titre « industrie réglementée »
3. Bloc « 633M calls resolved » + démo « Talk to an agent »
4. Logos clients : « Trusted by the world's most security-conscious enterprises »
5. « One platform. Every call. » — 6 sous-sections
6. Tableau « déploiement en 30 jours en production »
7. Certifications et sécurité réglementée
8. « How people use Bland » — 10 cas d'usage
9. FAQ (8 questions)
10. CTA final « Secure voice AI that pays for itself »
11. Footer (produit, solutions, ressources)

**4. Démo sans compte** : OUI — c'est le seul des sept à proposer ça clairement sur la home. Mécanisme exact : « Click to speak with an agent » dans la section « Talk to an agent », dialogue vocal interactif directement dans le navigateur, sans inscription préalable.

**5. Design** : polices non identifiées. Fond clair. Badges arrondis (pill) sur les catégories : « Healthcare », « Insurance », « Financial services ». Pas de gradient/glow/glassmorphism détecté.

**6. Conformité/sécurité** : page dédiée `/trust-security`. Certifications : « SOC 2 TYPE II », « HIPAA BAA », « PCI DSS V4.0 ». Région d'hébergement : « US, EU, and APAC deployment options on request ». RGPD : lien « DPA » en footer + « Your Privacy Choices » (CCPA). Détails techniques affichés : « AES-256 at rest. TLS 1.3 in transit. HSM-backed keys. » et « Role-based access with least privilege. MFA on every production system. »

---

## Vapi (vapi.ai)

**1. Premier écran**
- H1 exact : « Speak human to every customer »
- Sous-titre exact : « Build and deploy voice agents that deliver the outcomes you want at the scale your customers need. »
- CTA exacts : « Request Demo », « Sign Up »

**2. Preuves**
- Clients nommés (section « Trusted at enterprise scale ») : Amazon Ring, Intuit, ServiceTitan, New York Life.
- Chiffres exacts : « zero to production in two weeks, and 100% of our inbound volume now runs through Vapi », « 1 Billion calls supported », « 99.9% uptime for enterprise clients », « 2.5M+ agents launched », « 750K+ developers », « <500ms average latency ».
- Études de cas nommées : Kavak (avec vidéo), GoHealth (« 5X revenue growth, 250k monthly calls »), Instawork (« 1M+ calls per month »).
- Démo interactive : oui, section « Support Agent » avec lecteur intégré et bouton « Initiate Call ».
- Audio jouable : oui, lecteur audio visible (« 0:00 ») dans la démo « Support Agent ».

**3. Ordre des blocs**
1. Navigation + promotion événement « VapiCon »
2. Héros « Speak human to every customer » + CTA
3. « Resolve support issues » + démo audio interactive
4. Citation client (Jason Mitura, Ring)
5. « Trusted at enterprise scale » — logos clients
6. « Unified Platform » — deux fonctionnalités clés
7. Intégrations API-first (25+ logos)
8. « Built for Enterprises » — six fonctionnalités
9. Cas Kavak avec vidéo
10. Cartes études de cas (GoHealth, Instawork)
11. « Everyday Calls » + statistiques
12. Footer

**4. Démo sans compte** : OUI. Mécanisme exact : bouton « Initiate Call » qui demande l'autorisation du microphone du navigateur pour un appel direct, sans création de compte préalable — même logique que Bland.ai.

**5. Design** : polices non identifiées. Fond sombre/noir avec texture verte (« green-texture », citée plusieurs fois dans le code). Aucune mention explicite de glassmorphism ou de glow ; pas de badges arrondis détectés.

**6. Conformité/sécurité** : mention en section « Built for Enterprises » — « SOC 2, HIPAA, and PCI compliant ». Aucune région d'hébergement mentionnée. Lien dédié en footer : « Security » vers `security.vapi.ai`.

---

## Retell AI (retellai.com)

**1. Premier écran**
- H1 exact : « #1 AI Voice Agent Platform for Automating PHONE Calls »
- Sous-titre exact : « Meet your AI call center from the future. »
- CTA exacts : « Try Our Live Demo », « Try For Free »

**2. Preuves**
- Logos clients visibles : CVS, SelectQuote, et d'autres logos affichés mais non nommés textuellement dans le contenu récupéré (non vérifié au-delà de ces deux noms).
- Chiffres exacts : « ~600ms latency », « increased scheduling NPS by 38% » (Pine Park Health), « cuts support costs by over 50% » (SWTCH), « 100% of inbound calls with only a 30% transfer rate » et « ~$280,000 per month » (Medical Data Systems).
- Études de cas nommées : « How Pine Park Health elevates senior care with intelligent voice automation », « How SWTCH keeps EV drivers moving with always-on voice support », « How Medical Data Systems scales $280,000 in monthly collections ».
- Démo interactive : oui, formulaire « Try Our Live Demo » avec choix de cas d'usage (Receptionist, Appointment Setter, Lead Qualification, Customer Service, Debt Collection, Survey).
- Audio jouable : liens « Play Video » associés aux études de cas (format vidéo, pas un lecteur audio pur).

**3. Ordre des blocs**
1. Navigation + logo
2. Titre « AI Voice Agent Platform for Phone Call Centers »
3. Bandeau de logos clients défilant
4. Formulaire interactif « Try Our Live Demo »
5. Trois études de cas avec témoignages
6. « Like People » — arguments voix IA
7. Trois points clés : Lowest Latency, Ultra Realistic Voice, Turn taking
8. « Effortless to Use » — framework + functions + RAG
9. Intégrations omnicanal (Voice, Chat, SMS, API)
10. Téléphonie optimisée (Branded Call ID, SIP, Batch, Verified Numbers)
11. Bloc conformité/sécurité (HIPAA, SSO, Redacting…)
12. FAQ (12 questions)
13. CTA final « Revolutionize your call operation »
14. Newsletter
15. Footer complet

**4. Démo sans compte** : PARTIEL. Le formulaire « Try Our Live Demo » demande nom et numéro de téléphone (pas de mot de passe/compte), avec citation exacte : « Receive a live call from our agent and discover how our AI caller transforms customer conversations. » C'est un appel entrant qu'on reçoit, pas une démo dans le navigateur, et un numéro de téléphone valide est requis.

**5. Design** : polices non identifiées. Fond clair, blanc dominant. Images haute résolution (.webp/.avif). Pas de badges arrondis, pas de glow/glassmorphism/dégradés détectés dans le contenu.

**6. Conformité/sécurité** : bloc dédié sur la home + Trust Center (`trust.retellai.com`). Certifications nommées : « HIPAA », « SOC2 Type II », « GDPR », « ISO 27001 ». Aucune région d'hébergement précisée. Lien HIPAA dédié : `docs.retellai.com/general/compliance`.

---

## Synthflow (synthflow.ai)

**1. Premier écran**
- H1 exact : « Enterprise-Ready Voice AI Agents for Automated Phone Calls »
- Sous-titre exact : « The only end-to-end Voice AI platform with in-house telephony, proven deployment framework, and ROI delivered in weeks — redefining how enterprises connect with customers. »
- CTA exacts : « Get a demo », « Read the Report »

**2. Preuves**
- Logos clients nommés : YMCA, Mathnasium, Freshworks, Thryv.
- Chiffres exacts : « 65M+ » (Customer Calls), « 4M+ » (Hours Saved), « +35% » (Answered Calls), « 99.99% » (Uptime), « 65% » (Routine Calls Automated, cas Freshworks), « 75% » (Reduction in Wait Times, Freshworks), « 600K+ » (Monthly Calls Handled, cas BPO).
- Études de cas nommées : Freshworks, Medbelle, un opérateur BPO (« $230M multinational »), une plateforme CRM (500K calls/mois), Smartcat, Peak Demand.
- Démo interactive : non fonctionnelle sur la home — des liens « Hear Demo » existent par secteur mais pointent vers des ancres non actives (`#`).
- Audio jouable : non détecté.

**3. Ordre des blocs**
1. Navigation, logo, menu « Solutions »
2. Héros : titre, sous-titre, CTA
3. Logos clients + statistiques (65M calls, 4M heures, etc.)
4. « BELL Framework » (Build, Evaluate, Launch, Learn)
5. Solution end-to-end : Multi-Agent, Telephony, Sandbox, etc.
6. IA conversationnelle omnicanale
7. Infrastructure de téléphonie (réseau propre, déploiement régional)
8. Cas d'usage par secteur (8 secteurs)
9. Bénéfices entreprise (5 points clés)
10. Intégrations (200+)
11. Carrousel d'études de cas (Freshworks, Medbelle, BPO, CRM, Smartcat, Peak)
12. FAQ
13. Footer (liens, certifications, réseaux sociaux)

**4. Démo sans compte** : NON. Tous les CTA renvoient vers `/talk-to-sales` ou des ancres `#` non fonctionnelles. Aucun numéro affiché, aucun widget de démo embarqué visible sur la home.

**5. Design** : polices non identifiées. Fond clair, blanc dominant, illustrations colorées (.avif). Présence de dégradés dans les illustrations. Badges arrondis (pill) pour les certifications en footer (SOC 2, GDPR, HIPAA, ISO 27001). Pas de glassmorphism ni de glow détectés.

**6. Conformité/sécurité** : certifications affichées en footer — « SOC 2 », « HIPAA », « PCI DSS », « GDPR », « ISO 27001 ». Région d'hébergement mentionnée explicitement : badges « EU Hosting » et « US Hosting ». Page dédiée : `security.synthflow.ai`. Lien « Privacy Policy » séparé (`docs.synthflow.ai`).

---

## Cognigy (cognigy.com)

Note : le site consulté à `cognigy.com` redirige vers la marque post-acquisition « NiCE Cognigy » et positionne le produit sur le contact center / l'IA conversationnelle multicanal (voix, chat, copilote), pas uniquement la voix. À prendre en compte dans la comparaison.

**1. Premier écran**
- H1 exact : « Say Goodbye to Poor Customer Service »
- Sous-titre exact : « Before Your Customers say Goodbye... Easily deploy AI Agents in your contact center to deliver fast, personalized, and exceptional service your customers demand and deserve. »
- CTA exacts : « See a Demo », « AI Agents for your Business »

**2. Preuves**
- Logos clients nommés (très nombreux, cas rare de liste longue) : Toyota, Flix, Nestle, Bosch, Lufthansa, Greyhound, TripAdvisor, AOK PLUS, Sixt, Mercedes-Benz, Frontier Airlines, Bayer, Henkel, Ergo, Munich Airport, DirectTravel, Linde, Nederlandse Spoorwegen, Fabletics, Swiss Airlines, Vueling, Carglass, Jungheinrich, Nuuday, Mobily.
- Chiffres exacts : « 16M+ automated conversations per year » (Lufthansa), « 25+ AI Agents » (Toyota), « 5 million customer interactions » (Henkel), « 1Bn+ Annual interactions », « 99% Routing Accuracy », « 70% AHT Reduction ».
- Études de cas nommées : Lufthansa, Toyota, Henkel, Salzburg AG.
- Démo interactive : pas de démo essayable, mais vidéo de démonstration produit intégrée (Agentic AI, avec bouton lecture).
- Audio jouable : non détecté.

**3. Ordre des blocs**
1. « Say Goodbye to Poor Customer Service » + CTA vidéo
2. « Leading brands trust NiCE Cognigy » — bandeau de logos
3. Trois piliers : Phone & Voice, Chat & Messaging, Agent Copilot
4. « Building and managing the Agentic AI Workforce » — vidéo démo
5. « Real product, Real customers, Real results » — quatre cas clients
6. « Driven by Performance » — trois KPI
7. « Deploy AI Agents that understand, decide » — capacités plateforme
8. « Give your agents superpowers with AI Copilot » — quatre bénéfices
9. « Scale up your enterprise contact center omni-channel » — quatre avantages
10. « Named a Leader in Forrester Wave » — rapport analyste
11. « NiCE Cognigy News » — trois actualités
12. Reconnaissance analystes et récompenses (visuel)
13. « Start shaping the future of customer service » — CTA footer

**4. Démo sans compte** : NON. « See a Demo » renvoie vers un formulaire HubSpot (`cta-service-cms2.hubspot.com`), pas de démo interactive dans le navigateur, aucun numéro de téléphone affiché.

**5. Design** : polices non identifiées. Fond clair, texte noir sur blanc. Aucun dégradé, glow, glassmorphism ni badge arrondi détecté dans le contenu récupéré.

**6. Conformité/sécurité** : rien sur la home elle-même. Renvoi vers un « Trust Center » dédié (`trust.cognigy.com`) et une « Privacy Policy » (`cognigy.com/privacy-policy`) en footer. Aucune certification nommée sur la page d'accueil, aucune région d'hébergement précisée : à vérifier sur le Trust Center (non consulté, hors périmètre de cette page d'accueil).

---

## Synthèse

**A. Qui ne peut pas nommer ses clients, et par quoi ils compensent ?**
Aucun des sept ne se retrouve dans la position de Syntexia (zéro logo publiable) : les sept affichent des logos clients nommés sur leur home, de PolyAI (9 logos) à Cognigy (24 logos, le plus dense). Le point commun le plus proche du problème Syntexia est plutôt la fiabilité des chiffres : PolyAI affiche des stats clients réelles mais les compteurs animés ont rendu « 0 pt » / « $0.2M » / « 0% » lors du fetch statique, donc l'output brut est structurellement vide de chiffre lisible sans exécution JS — un signal que même des acteurs financés misent sur des chiffres dynamiques plutôt que du texte figé. Aucun des sept ne remplace des logos par un mécanisme alternatif crédible (ex : nombre d'agents déployés sans nom client) ; ils masquent l'absence de preuve nommée par la densité (Cognigy), pas par un dispositif de substitution.

**B. Dispositif de preuve le plus convaincant**
Bland.ai et Vapi : la démo vocale jouable dans le navigateur sans compte (« Talk to an agent » / « Initiate Call »), couplée à des études de cas chiffrées et nommées (Bland : « $430M+ in additional annual revenue », Vapi : « 5X revenue growth »). Ça marche parce que le visiteur vérifie la promesse lui-même en 30 secondes, sans dépendre de la confiance qu'il accorde au chiffre affiché — la preuve devient expérientielle, pas déclarative.

**C. Trois faiblesses récurrentes**
1. CTA de démo qui ne sont pas des démos : Synthflow (« Hear Demo ») et Cognigy (« See a Demo ») renvoient vers des ancres mortes ou un formulaire HubSpot classique.
2. Chiffres non vérifiables en l'état : compteurs JS à zéro sur PolyAI, aucune source citée nulle part sur les sept sites.
3. Sécurité traitée en silo coupé du reste de la home : Cognigy et Parloa relèguent tout au Trust Center externe, zéro certification nommée avant ce clic, alors que Bland.ai et Synthflow l'intègrent en badges visibles dès la home.

**D. Trois choses à voler pour Syntexia**
1. Copier le mécanisme Bland.ai/Vapi : un numéro à appeler ou un bouton « parler à l'agent » dans le navigateur, sans compte, sur la home elle-même.
2. Copier le placement Bland.ai/Synthflow : badges de certification (SOC 2, HIPAA, GDPR, région d'hébergement) visibles au-dessus du pli ou juste sous le hero, pas seulement sur une page Trust Center séparée.
3. Copier le format d'étude de cas de Bland.ai/Retell : un chiffre business daté et attribué à un secteur nommé (« $750K saved by retiring the IVR », « increased scheduling NPS by 38% ») plutôt qu'un logo seul — reproductible pour Syntexia même sans nommer le client, en anonymisant secteur + métrique + preuve d'exécution.
