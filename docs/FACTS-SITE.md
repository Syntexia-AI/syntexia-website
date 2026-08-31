# FACTS-SITE.md

Une ligne par fait. Source obligatoire. Sans source, le fait n'entre pas sur le site.

**État au 2026-08-31 : gabarit déposé, non rempli.** Aucune valeur ci-dessous n'a été renseignée par moi, sauf les quatre lignes marquées `statut: VÉRIFIÉ` dont la source est le repo lui-même, et la ligne `canonique` dont le constat W0 est reporté tel quel.

Ce fichier est à remplir par Karim et Baptiste. W1 ne démarre pas avant.
Chaque ligne renseignée doit basculer la ligne correspondante de `docs/CLAIMS.md`.

```
## Société
raison_sociale: Syntexia.AI Ltd | source: Companies House 16847343 (URL) | statut: À VALIDER (le numéro vient de la directive, pas du repo. Aucune mention de raison sociale ni de numéro d'immatriculation n'existe dans le site actuel.)
canonique: www.syntexia.ai | source: amendement A2 du 2026-08-31 | statut: TRANCHÉ. Apex en 301 permanent vers www dans vercel.json. Les og:url du repo sont déjà corrects, ils ne changent pas. Contrôle W6 : `curl -sI https://syntexia.ai` renvoie 301.
siege_formulation: | source: | statut: À VALIDER (le site se contredit : voir CLAIMS.md C7 contre C3/C8)
operations_formulation: | source: | statut: À VALIDER (Karim)
linkedin_societe_url: | statut: ABSENT du repo
linkedin_karim_url: https://www.linkedin.com/in/karim-vissangy-17aa893a/ | source: team.html:83 | statut: VÉRIFIÉ (source repo)
linkedin_baptiste_url: | statut: ABSENT du repo
annonce_partner_network_url: | statut: ABSENT du repo (bloque les 8 mentions du partenariat, voir CLAIMS.md section D)
early_access_models: | statut: À VALIDER (Karim) (about.html:153)
telephone_+44_20_4620_4570_repondu: | statut: À VALIDER (non testable depuis l'environnement d'exécution)
email_contact: office@syntexia.ai | source: sections.jsx:593 et les 5 pages statiques | statut: VÉRIFIÉ (source repo)

## Équipe
karim: titre=CEO & Chief AI Officer (team.html:81) | bio_2_phrases= | photo= | statut: titre VÉRIFIÉ (source repo), bio et photo ABSENTES
baptiste: titre=CTO (team.html:94) | bio_2_phrases= | photo= | statut: titre VÉRIFIÉ (source repo), bio et photo ABSENTES
meet_the_founder: | statut: À VALIDER (about.html:185 dit le singulier. Le fichier supprimé en W1a en publiait trois portant la fonction de co-fondateur. Voir CLAIMS.md E6 à E9.)

## Secteurs réellement en production (liste fermée, sans compte)
# Amendement A5 : aucun compte de secteurs n'apparaît sur le site. Ni « five »,
# ni la stat « 5 », ni aucune formulation équivalente. Une seule liste nommée.
# Statut binaire par secteur, source obligatoire. Un secteur sans client en
# production nommé ici ne figure pas sur le site, ET SES CHIFFRES PARTENT AVEC LUI.
secteurs: | source: | statut: DÉCISION REQUISE, BLOQUANTE (huit noms distincts sur quatre listes contradictoires. Voir CLAIMS.md section B.)
public_sector_live: | client_en_production: | source: | statut: À VALIDER (emporte A1, A2, A3, A15 s'il tombe)
financial_services_live: | client_en_production: | source: | statut: À VALIDER (emporte A4, A5, A6, A13 s'il tombe)
audit_live: | client_en_production: | source: | statut: À VALIDER (emporte A14 s'il tombe)
legal_live: | client_en_production: | source: | statut: À VALIDER (sections.jsx:397 affiche « Live ». Emporte A17 s'il tombe)
retail_luxury_live: | client_en_production: | source: | statut: À VALIDER (sections.jsx:396 affiche « Live ». Emporte A10, A11, A12, A16 s'il tombe)
hospitality_live: | client_en_production: | source: | statut: À VALIDER (nommé sur /about et /team, absent de la grille de la home)
procurement_live: | client_en_production: | source: | statut: À VALIDER (nommé sur la home uniquement, sections.jsx:300. Emporte A7, A8, A9 s'il tombe)

## Chiffres (conservateurs, datés, sinon supprimés)
deployments_live: | date: | source: | statut: À VALIDER (alimente le titre W4 point 2 et la mention W4 point 6)
calls_answered_mois: | date: | source: | statut: À VALIDER (total W4 point 5)
documents_read_mois: | date: | source: | statut: À VALIDER (total W4 point 5)
people_on_shift: | date: | source: | statut: À VALIDER (total W4 point 5)
internal_data_requests_-60: | date: | source: | statut: À VALIDER (CLAIMS.md A4 et A13)
citizen_requests_70: | date: | source: | statut: À VALIDER (CLAIMS.md A1 et A15)
procurement_docs_80: | date: | source: | statut: À VALIDER (CLAIMS.md A7)
ledgers_3_vers_1: | date: | source: | statut: À VALIDER (CLAIMS.md A5)

## Articles
quiet_revolution: date= | auteur= | statut: À VALIDER (trois emplacements, deux dates : meta 2026-04-15, cartes Apr 2026, hero May 2026. Auteur affiché « Syntexia Editorial », sans meta author.)
precedent_meets_pace: date=2026-05-23 | auteur=Karim Vissangy | source: precedent-meets-pace.html:21-22, cohérent avec l'affichage l.113 et l.115 | statut: VÉRIFIÉ (source repo, cohérent)
firms_we_work_with: | source: | statut: À VALIDER (the-quiet-revolution:130, affirmation de déploiement client non sourcée dans un article protégé. Voir arbitrage 1 du RAPPORT-W0.)

## Security & data
where_it_runs: | source: | statut: À VALIDER (bloque W5 point 1)
retention: | source: | statut: À VALIDER (bloque W5 point 1)
subprocessors: | source: | statut: À VALIDER (bloque W5 point 1)
training: | source: | statut: À VALIDER (bloque W5 point 1)

## Journée type de la home (W4 point 4)
huit_lignes_horaires: | source: | statut: À VALIDER (à défaut, les huit DayRow de la maquette servent d'opérations types. Rien d'autre ne peut les remplacer.)

## Formulaire
RESEND_API_KEY: posée sur Vercel par: | statut: NON POSÉE
CONTACT_TO: | statut: NON RENSEIGNÉ
```

## Rappel de la règle

Une ligne vide vaut refus de publication, pas autorisation implicite. Le rendu ne contient que ce que ce fichier autorise nommément.
