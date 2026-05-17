# 🎯 Plan d'Action — Académie Pirate

**Date** : 16 mai 2026  
**Source** : Audit "Avocat du Diable" post-sessions SEO/GEO/AEO + BIZ-01  
**Statut** : À exécuter en parallèle de la roadmap principale  
**Revue** : mi-juin 2026

---

## 📊 Vue d'ensemble — Priorités par criticité

| Priorité | Catégorie | Délai | Risque si ignoré |
|---|---|---|---|
| **P0** | SEO — pages vides | 1 semaine | Déclassement Google (Helpful Content) sous 60-120j |
| **P0** | Légal — RGPD enfants + mentions | 1 semaine | Sanction CNIL possible |
| **P0** | Légal — Disclaimer IP manga | 1 jour | DMCA possible dès visibilité accrue |
| **P1** | BIZ-01 nuancée (user vs business) | 2 semaines | Fermeture portes B2B / partenariats |
| **P1** | Page À propos / Crédibilité | 2 semaines | Méfiance parent, frein adoption |
| **P1** | Disclaimer manga violent / âge | 1 semaine | Bad press / parents inquiets |
| **P2** | Roadmap saisonnière 2026 | 1 mois | Rater fenêtre rentrée septembre |
| **P2** | Décision V1/V2 globale | 1 mois | Schizophrénie technique 6 mois |
| **P2** | Plan redirects 301 anticipé | À planifier maintenant | SEO mort à la migration future |
| **P3** | Audit concurrents documenté | 1 trimestre | Pas de différenciation claire |
| **P3** | Enrichissement thin content | 1 trimestre | Risque Helpful Content Google |
| **P3** | Collecte témoignages parents | 1 trimestre | Pas de social proof |

---

## 🚨 P0 — RISQUES EXISTENTIELS (à régler sous 15 jours)

### P0.1 — SEO : Noindex des pages qui pointent vers du contenu inexistant

**Risque** : Google envoie des visiteurs sur des pages dont le quiz n'existe pas en prod → bounce rate très élevé → algo Helpful Content Update déclasse le site entier sous 60-120 jours.

**État réel du contenu prod (à confirmer lors de l'audit)** :

| Monde | CM2 | 6ème | 5ème | 4ème | 3ème |
|---|---|---|---|---|---|
| English (Anglais) | ✅ V2 DB | ✅ V2 DB | ✅ V2 DB | ✅ V2 DB | ❌ vide |
| Pays du Feu (Maths) | ✅ V1 | ❌ | ❌ | ❌ | ❌ |
| Grand Bleu (Français) | ✅ V1 | ❌ | ❌ | ❌ | ❌ |
| Magnolia (Histoire) | ✅ V1 | ❌ | ❌ | ❌ | ❌ |
| Kanto (Sciences) | ❌ | ✅ V1 | ✅ V1 | ❌ | ❌ |
| Namek (Géo) | ❌ | ❌ | ❌ | ❌ | ❌ |

**Estimation** : 277 pages SEO indexables, ~70 avec contenu prod, ~200 vides.

**Actions** :
- [ ] Audit page par page : vérifier pour chaque URL que le quiz existe vraiment en prod
- [ ] Pour les pages sans quiz : ajouter `<meta name="robots" content="noindex,nofollow">` dans le head
- [ ] CTA honnête sur ces pages : "Quiz en développement — reviens en septembre 2026" + lien vers les mondes/niveaux disponibles
- [ ] Mettre à jour sitemap.xml : ne lister que les pages indexables réelles
- [ ] Resoumettre sitemap dans GSC + IndexNow après nettoyage

**Critère de validation** :
- 0 page SEO indexable qui pointe vers un quiz inexistant
- Sitemap.xml ne contient que les pages avec contenu prod
- Test : Inspecter 10 URLs random dans GSC → 100% trouvent un quiz fonctionnel

**Temps estimé** : 4-6h

---

### P0.2 — Légal : Politique de confidentialité + Mentions légales (RGPD enfants)

**Risque** : Cible 8-15 ans + collecte d'emails (magic link Supabase) + tracking (localStorage, analytics) sans documentation RGPD = sanction CNIL possible dès la première réclamation parentale.

**Actions** :
- [ ] Créer page `/confidentialite/` :
  - Données collectées (email, progression quiz, avatar, prénom)
  - Finalités (suivi de progression, magic link auth)
  - Durée de conservation (ex : 24 mois après dernière connexion)
  - Droits utilisateur (accès, suppression, portabilité)
  - Spécifique enfants : consentement parental requis si <16 ans
  - Contact DPO
- [ ] Créer page `/mentions-legales/` :
  - Identité de l'éditeur (nom + email + adresse ou "projet indépendant" + ville)
  - Hébergeur (GitHub Pages — Microsoft Corp, USA)
  - DB : Supabase (Zurich, Suisse)
  - Cookies / trackers utilisés
- [ ] Ajouter consentement parental visible à l'inscription :
  - Case "J'ai 16 ans ou plus / un parent autorise mon inscription"
  - Double opt-in email
- [ ] Politique de rétention : suppression auto du compte après 24 mois d'inactivité
- [ ] Lien vers /confidentialite/ et /mentions-legales/ dans le footer de TOUTES les pages

**Critère de validation** :
- Les 2 pages existent et sont accessibles depuis le footer
- L'inscription nécessite un consentement explicite âge / parent
- Politique de rétention documentée et techniquement appliquée

**Temps estimé** : 1-2 jours

---

### P0.3 — Légal : Disclaimer IP manga (anti-DMCA) ✅ DONE (16 mai 2026)

**Risque** : Usage non-licencié de noms et concepts de personnages appartenant à Shueisha, Toei Animation, Wit Studio, Mappa. Aujourd'hui sous le radar mais DMCA possible dès visibilité accrue.

**Actions** :
- [ ] Ajouter dans le footer de toutes les pages :
  > "Académie Pirate est un projet pédagogique indépendant non affilié à Shueisha, Toei Animation, Wit Studio, Mappa, ni à aucun éditeur de manga. Les noms et concepts cités sont utilisés à des fins éducatives uniquement."
- [ ] Section "Droits et IP" détaillée dans `/mentions-legales/`
- [ ] Section "Disclaimer IP" dans `llms.txt` pour les crawlers IA
- [ ] Audit Supabase Storage : remplacer les images officielles de manga par :
  - Illustrations originales générées
  - Portraits stylisés "Académie Pirate" (style propre)
  - Fan-art crédité avec licence Creative Commons
- [ ] Documenter règle **IP-01** dans ARCHITECTURE_V2.md : "Aucune image officielle manga dans Supabase Storage"

**Plan B** :
- [ ] Préparer mentalement un pivot "personnages 100% originaux Académie Pirate" si pression légale (cf. Yo-Kai Watch sans Pikachu). Documenter dans ARCHITECTURE_V2.md.

**Critère de validation** :
- Disclaimer présent sur 100% des pages (footer)
- Section IP dans mentions légales + llms.txt
- 0 image officielle manga dans Supabase Storage (audit)
- Règle IP-01 dans ARCHITECTURE_V2.md

**Temps estimé** : 1 jour (disclaimer) + plusieurs jours si remplacement images

---


---

### P0.4 — SEO contenu : qualité des pages SEO existantes ✅ DONE

**Date** : 16 mai 2026 — terminé le jour même  
**Périmètre** : améliorer la qualité du contenu des 86 pages SEO indexables, 
SANS toucher au pattern, à l'app, à l'architecture URL.

#### Réalisé
- [x] Audit qualité contenu des 86 pages SEO indexables (sitemap.xml)
- [x] Fix 3 ap-rule tronquées (Eren CM2 spelling, Hange CM2 objets, Connie 5e comparatif)
      Source : js/worlds/english/lesson-data.js (app live)
- [x] Replace global 75 placeholders sur 45 pages :
      - 29× `&amp;#x27;` → `&#x27;`
      - 46× `\&quot;` → `&quot;`
- [x] Validation : 0 bug résiduel sur les 86 pages indexables
- [x] IndexNow signal (Bing HTTP 200, Yandex HTTP 202)

#### Reste à faire (optionnel)
- [ ] Nettoyer les 190 pages noindex (cosmétique uniquement, hors sitemap)
      → décision : à voir après P0.5 (URLs vont changer de toute façon)

**Note** : l'ancienne formulation P0.4 (Pre-rendering hybride / Option B) 
a été annulée le 16 mai 2026 sur décision propriétaire : 
"on ne touche pas au pattern, seulement l'indexation SEO/GEO/AEO". 
La problématique URL est reportée en P0.5.


## 🔧 P1 — STRATÉGIQUE (à régler sous 1 mois)

### P1.1 — Réécrire BIZ-01 (wording user vs stratégie business)

**Risque actuel** : BIZ-01 dit "Aucune monétisation prévue. Pas de Stripe, pas d'abonnement, pas de freemium." Ferme les portes à : dons, B2B école, partenariat éditeur, mécène, OPCO, levée de fonds future.

**Action** :
- [ ] Réécrire la section dans ARCHITECTURE_V2.md ainsi :
WORDING UTILISATEUR (immuable, aligné sur 277 pages) :
"100% gratuit, sans publicité — apprendre en s'amusant."
STRATÉGIE BUSINESS (ouverte, sans engagement) :
Aucune monétisation à ce jour. Options possibles à évaluer en temps voulu :

Dons libres (Liberapay, Buy Me a Coffee)
Partenariat école / OPCO / B2B
Licence pédagogique (académies, communes)
Mécène / sponsor éthique
Si un jour ad-supported : version Premium "sans pub" préservant le gratuit

GARANTIE UTILISATEUR :
Si une monétisation est introduite, elle ne dégradera JAMAIS
l'accès gratuit déjà existant à un contenu déjà publié.

**Critère de validation** :
- BIZ-01 réécrite ne ferme aucune porte business
- Le wording user "100% gratuit" reste immuable
- Aucune contradiction avec le contenu public (pages SEO, llms.txt)

**Temps estimé** : 30 min

---

### P1.2 — Page À propos / Crédibilité

**Risque** : Aucune présence visible de "qui est derrière le projet" → méfiance parent → frein à l'adoption.

**Actions** :
- [ ] Créer page `/a-propos/` :
  - Qui tu es (prénom + photo + bio courte 5-10 lignes)
  - Pourquoi ce projet (story personnelle, motivation)
  - Méthodologie pédagogique (alignement programme EN, format quiz)
  - Encart "Pourquoi gratuit ?" — réponse honnête
  - Section "Témoignages" — vide au départ, à enrichir
  - Email de contact
- [ ] Ajouter lien "À propos" dans le footer
- [ ] Stratégie de collecte de témoignages : email post-quiz pour les parents intéressés

**Critère de validation** :
- Page À propos existe et est accessible
- Au moins 3 témoignages collectés et publiés sous 2 mois

**Temps estimé** : 1 jour création + collecte continue

---

### P1.3 — UX : Disclaimer mangas violents / âge

**Risque** : AoT, JJK, Demon Slayer ont du gore + morts + violence. Parent qui ne connaît pas l'univers peut fuir, ou article de presse "Académie Pirate présente Attack on Titan aux CM2".

**Actions** :
- [ ] Ajouter encart visible sur la home + landing matières concernées :
  > "Univers manga adaptés aux 8-15 ans : violence visuelle écartée, pas de gore, focus aventure et apprentissage. Lecture parentale recommandée pour la découverte initiale."
- [ ] Ajouter mention dans les pages SEO concernées (English, Sciences, Géo)

**Critère de validation** :
- Encart visible sur home + landing des 3 mondes "à risque" (English/AoT, Sciences/DS, Géo/JJK)

**Temps estimé** : 2h

---

## 📅 P2 — TACTIQUE (à régler sous 1 mois)

### P2.1 — Roadmap saisonnière 2026

**Risque** : Septembre 2026 = pic d'acquisition annuel. Si le contenu n'est pas prêt → 4 mois de fenêtre perdus.

**Action** :
- [ ] Calendrier explicite à ajouter dans ROADMAP.md :
MAI-JUIN 2026 : Phase 4 — Maths CM2-3ème complet + Français CM2-3ème complet
(priorité brevet 3ème saison de panique avril-juin)
JUILLET-AOÛT 2026 : Histoire CM2-3ème + Sciences CM2-3ème
SEPTEMBRE 2026 : Géo CM2-3ème + campagne com rentrée
OCT-DÉC 2026 : Nouveaux mondes (Konoha SVT, Aqua, Éclair) si phase 4 terminée
JANVIER 2027 : Bilan + ajustement stratégie

**Critère de validation** :
- Calendrier dans ROADMAP.md avec deadlines explicites
- Décision claire : sprinter Phase 4 OU réduire le scope (ex : Maths + Français seulement)

**Temps estimé** : 1h de décision

---

### P2.2 — Décision V1/V2 globale

**Risque** : 5 mondes en V1 hardcodé pour 1 monde en V2 DB = schizophrénie technique. Phase 2 (admin onglet Contenu) bloquée tant que migration incomplète.

**Options à arbitrer** :
- [ ] **Option A — Sprint migration** : migrer 5 mondes × 5 niveaux × 8 îles × 11 questions = ~2200 questions en DB sur 4-6 mois solo
- [ ] **Option B — Mixte assumé** : V1 hardcodé pour CM2 existant, V2 DB uniquement pour les nouveaux niveaux
- [ ] **Option C — Scope réduit** : V2 seulement pour 2 matières prioritaires (Maths + Français), garder les 3 autres en V1

**Action** :
- [ ] Choisir une option et la documenter dans ARCHITECTURE_V2.md
- [ ] Marquer les pages SEO impactées (cf. P0.1)

**Temps estimé** : 1h de décision + documentation

---

### P2.3 — Plan redirects 301 anticipé (si migration future)

**Risque** : Migration vers Next.js / Infomaniak mentionnée comme architecture cible. Sans plan de redirects 301 préparé, les 277 URLs SEO meurent à la migration.

**Action** :
- [ ] Avant tout dev nouvelle archi, créer dans ARCHITECTURE_V2.md une section "Plan de migration" :
  - Liste des 277 URLs actuelles à préserver
  - Mapping URL ancienne → URL nouvelle (si changement de pattern)
  - Mécanisme de redirects (server config, Next.js redirects, .htaccess)
  - Validation post-migration : crawl complet + 0 erreur 404

**Critère de validation** :
- Plan de migration documenté AVANT tout dev Next.js
- Pas de migration sans validation explicite

**Temps estimé** : 2h documentation

---

## 🎯 P3 — TACTIQUE LONG TERME (à régler sous 1 trimestre)

### P3.1 — Audit concurrents documenté

**Actions** :
- [ ] Page interne (non indexée) `/audit-competition.md` listant 5-10 concurrents :
  - Lumibot, SchoolMouv, Maxicours, Brainpop, Khan Academy
  - Hatier, Magnard (éditeurs)
  - Profs YouTubeurs (HugoDécrypte, MaProfDeMaths, etc.)
- [ ] Forces / faiblesses / positionnement de chacun
- [ ] 3-5 points où Académie Pirate est démontrablement mieux
- [ ] Mise à jour trimestrielle

**Temps estimé** : 1 jour

---

### P3.2 — Enrichissement contenu des pages SEO (anti thin content)

**Risque** : Pages SEO toutes structurées de la même façon (8 FAQ × 277 pages) = signal de "thin content" pour Google Helpful Content Update.

**Actions** :
- [ ] Pour les 30 pages SEO les plus stratégiques (top intention de recherche brevet) : ajouter 300-500 mots de contenu pédagogique original
- [ ] Varier les FAQ entre pages (pas la même structure × 6 répétée)
- [ ] Ajouter liens externes vers ressources de référence (Eduscol, Wikipedia, pass-education) pour "topical authority"

**Temps estimé** : 30 min × 30 pages = 15h sur le trimestre

---

### P3.3 — Stratégie collecte témoignages parents

**Actions** :
- [ ] Email post-quiz proposant un retour court (1 question : "Comment ton enfant a vécu Académie Pirate ?")
- [ ] Page À propos avec section "Témoignages" mise à jour
- [ ] Objectif : 10-20 témoignages d'ici fin 2026

**Temps estimé** : Setup 2h + collecte continue

---

## 📋 Méthode de suivi

Ce document est revu **chaque mois** pour mettre à jour les statuts :
- `[ ]` = À faire
- `[x]` = Fait
- 🚧 = En cours
- ❌ = Abandonné (raison documentée)

Le statut global est intégré dans `ROADMAP.md` via la section "Plan d'action prioritaire".

---

## 🎯 Top 3 à attaquer cette semaine (résumé exécutif)

1. **P0.1 — Audit des pages SEO vides + noindex** (4-6h, évite déclassement Google sous 60-120j)
2. **P0.2 — RGPD enfants + mentions légales** (1-2 jours, évite sanction CNIL)
3. **P0.3 — Disclaimer IP manga dans footer + llms.txt** (1h, réduit risque DMCA)

Tout le reste suit ensuite.

---

*Plan d'Action généré le 16 mai 2026 — suite à l'audit "Avocat du Diable" sur l'état post-sessions SEO/GEO/AEO + BIZ-01*  
*À revoir : mi-juin 2026*
