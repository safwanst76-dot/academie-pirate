# 🔍 AUDIT SEO / GEO / AEO — Académie Pirate
**URL auditée** : https://aca-pirate.ch
**Date** : 4 mai 2026
**Type** : Audit Complet (Full Audit)
**Pages crawlées** : homepage (HTML brut), robots.txt, sitemap.xml + tentatives /namek, /magnolia, /english, /kanto, /pays-du-feu, /english/3eme, /about, /parents, /blog, /faq

---

## 📊 SCORES SYNTHÉTIQUES

| Dimension | Score | Status |
|---|---|---|
| **SEO**  (Google classique) | **4/10** | 🟠 Below average |
| **GEO**  (ChatGPT, Perplexity, Gemini) | **3/10** | 🔴 Needs Work |
| **AEO**  (featured snippets, voice search) | **2/10** | 🔴 Needs Work |
| **GLOBAL** | **9/30** | 🔴 Critique |

### Top 3 priorités (à attaquer DEMAIN)
1. **Sortir de la SPA-only** : générer des pages HTML statiques pré-rendues pour les 30 routes (`/grand-bleu/cm2`, `/namek/3eme`, etc.) — sinon Google ne verra **JAMAIS** le contenu pédagogique.
2. **Ajouter Schema.org JSON-LD** (EducationalOrganization, Course, FAQPage, Quiz) sur chaque page — c'est ce qui fait apparaître le site dans les résultats riches Google **ET** dans les réponses ChatGPT/Perplexity.
3. **Créer 30+ landing pages SEO** ciblées sur les requêtes parents : "réviser le brevet en 3ème", "exercices français CM2 gratuit", "quiz histoire 5ème gratuit", etc.

### Plus grande force
**Contenu pédagogique massif et conforme programme officiel** : 2640 questions vérifiées (6 matières × 5 niveaux), preuve d'autorité (E-E-A-T) inégalable face aux concurrents — mais **invisible aux moteurs** car derrière du JavaScript.

---

## 🔬 ANALYSE DÉTAILLÉE PAR DIMENSION

### 🟢 CE QUI FONCTIONNE BIEN

| Élément | Constat | Note |
|---|---|---|
| `<title>` homepage | "Académie Pirate — Quiz manga pour enfants CM2, 6ème, 5ème, 4ème ‑ Français, Maths, Anglais" — 110 chars (un peu long, ~95 limite Google), mais riche en mots-clés | 7/10 |
| `<meta description>` | "Académie Pirate : quiz éducatifs gratuits..." — 250 chars (limite ~155), tronquée mais informative | 6/10 |
| `og:title` / `og:description` / `og:image` | ✅ Présents (image Luffy depuis Supabase Storage) | 8/10 |
| `canonical` | ✅ `https://aca-pirate.ch/` | 9/10 |
| `hreflang` | ✅ fr / fr-FR / fr-CH / fr-BE | 9/10 |
| `robots.txt` | ✅ Excellente config : autorise tous les bots IA (GPTBot, Claude-Web, PerplexityBot, Gemini, Google-Extended), bloque Ahrefs/Semrush/MJ12 | 10/10 |
| `manifest.json` PWA | ✅ Présent + theme-color + apple-mobile-web-app | 8/10 |
| `llms.txt` | ✅ Existe (rare et bonne pratique GEO) | 6/10 *(obsolète : voir plus bas)* |
| HTTPS | ✅ Force HTTPS (GitHub Pages) | 10/10 |
| Mobile viewport | ✅ Configuration correcte | 9/10 |
| Structure sémantique HTML | `<header>`, `<main>`, etc. présents | 7/10 |

---

### 🔴 PROBLÈMES CRITIQUES

#### 1. Architecture SPA → invisibilité totale du contenu pédagogique
**Constat** : Le site est une SPA. **Toutes les routes** (`#/namek`, `#/english/3eme`, `#/magnolia/4eme`, etc.) utilisent du **hash routing** que Google **ignore complètement**.

Test effectué :
```
/namek           → HTTP 404
/magnolia        → HTTP 404
/english         → HTTP 404
/english/3eme    → HTTP 404
/kanto           → HTTP 404
/pays-du-feu     → HTTP 404
/about           → HTTP 404
/parents         → HTTP 404
```

**Impact** : Google n'indexe **qu'une seule page** (la home écran de login). Les 30 niveaux + 240 îles + 2640 questions sont **totalement invisibles**.

**Conséquence concrète** : un parent qui Google "réviser anglais 3ème brevet gratuit" ne tombera **jamais** sur Académie Pirate, même si on a le meilleur contenu.

#### 2. Sitemap.xml dérisoire
**Constat** : Le sitemap ne contient **qu'1 URL** (la home). Le commentaire avoue :
```
SPA : une seule URL réelle, les autres sont des hash routes (#/...)
```
**Impact** : Google n'a aucun indice qu'il existe d'autres pages à crawler.

#### 3. Aucun schema.org JSON-LD
**Constat** : 0 balise `<script type="application/ld+json">` dans la page.

**Schémas critiques manquants** :
- `EducationalOrganization` (entité Académie Pirate)
- `Course` (un par monde × niveau = 30 cours)
- `Quiz` (un par chapitre = 240 quiz)
- `FAQPage` (FAQ parents : "Comment ça marche ?", "Combien ça coûte ?", "Quel niveau pour mon enfant ?")
- `BreadcrumbList`
- `Person` (auteur des contenus pédagogiques)
- `Review`/`AggregateRating` (témoignages parents)

**Impact GEO** : ChatGPT/Perplexity ne peuvent pas **citer** Académie Pirate dans leurs réponses car ils ne savent pas que c'est une "EducationalOrganization" légitime.

#### 4. Aucune page de contenu informationnelle
**Constat** : pas de blog, pas de FAQ, pas de pages "À propos", pas de pages "Parents", pas de pages "Pour les profs".

**Impact AEO** : Aucune chance d'apparaître en featured snippet ("Comment réviser le brevet ?", "Apprendre l'anglais avec les mangas — ça marche ?", "Différence entre CM2 et 6ème en français").

#### 5. Contenu textuel pauvre (UI seulement)
**Constat** : ~1185 mots dans le HTML brut, mais **90% sont du texte d'interface** (boutons, labels, titres d'îles). Pas de prose informative.

Pour ranker sur "soutien scolaire CM2", Google attend **1500-3000 mots de contenu pédagogique réel** par page cible.

#### 6. `llms.txt` obsolète
**Manque actuellement** :
- Namek (Géographie × JJK) ❌
- Paradis/AOT (Anglais) ❌
- Niveaux 4ème et 3ème ❌
- Le bon domaine (mentionne `safwanst76-dot.github.io` au lieu de `aca-pirate.ch`)
- Sciences est listée comme "Physiques" alors que c'est SVT+PC

**Impact GEO** : ChatGPT et Claude lisent `llms.txt` pour comprendre le site. Avec une version obsolète, ils sous-estiment l'offre Académie Pirate.

#### 7. Pas de signaux d'autorité E-E-A-T
**Manquent** :
- Aucun nom d'auteur des contenus (qui a écrit les questions ?)
- Aucun CV / credentials (prof, ancienne enseignante ?)
- Aucun avis parent / testimonial public
- Aucune presse / mention externe
- Pas de page "L'équipe"
- Pas de mentions légales accessibles depuis le menu

**Impact** : Google et les IA ne peuvent pas vérifier la **fiabilité** du contenu éducatif. Catastrophique pour un site éducatif visant des enfants.

#### 8. Pas de balisage AEO/voice search
**Manquent** :
- Pas de questions phrasées en H2 ("Comment apprendre l'anglais avec les mangas ?")
- Pas de réponses concises 40-60 mots juste en-dessous
- Pas de listes ordonnées étape-par-étape (HowTo schema)
- Pas de tableaux comparatifs (CM2 vs 6ème, etc.)

---

## 🎯 PLAN D'ACTION DÉTAILLÉ — À INTÉGRER DANS LA MÉMOIRE PROJET

### 📅 PHASE 1 — FONDATIONS SEO (Semaine 1, mardi-vendredi)

#### 1.1 Pré-rendu statique des routes (CRITIQUE)
**Objectif** : Faire en sorte que `/namek/3eme` retourne une vraie page HTML 200 OK avec contenu rendu côté serveur.

**Solution recommandée** : Build script Node qui génère 30 fichiers HTML statiques au déploiement.

```bash
# Structure cible
/grand-bleu/index.html        # Présentation monde
/grand-bleu/cm2/index.html    # CM2 — Île 1-8 listées
/grand-bleu/6eme/index.html
/grand-bleu/5eme/index.html
/grand-bleu/4eme/index.html
/grand-bleu/3eme/index.html
/namek/index.html
/namek/cm2/index.html
... etc (30 pages au total)
```

Chaque page contient :
- Le `<title>` + meta description spécifique au niveau
- Le contenu pédagogique (programme officiel, exemples de questions, héros, boss)
- Le schema.org Course
- Un CTA "Commencer le quiz" qui charge la SPA

**Fichier à créer** : `scripts/build-seo-pages.js`
**Effort** : 1-2 jours
**Impact** : 🔴 Critique — débloque TOUT le reste

#### 1.2 Sitemap.xml complet
Un sitemap listant les 30 pages mondes×niveaux + pages annexes (À propos, FAQ, Parents, Blog).

**Effort** : 30 min (script auto-généré)

#### 1.3 Schema.org JSON-LD partout
Sur chaque page, injecter :
- `EducationalOrganization` (sur toutes)
- `Course` + `LearningResource` (sur pages monde×niveau)
- `Quiz` ou `Question` (sur îles individuelles)
- `BreadcrumbList`
- `FAQPage` (sur la future FAQ)

**Fichier à créer** : `js/seo/schema-generator.js`
**Effort** : 1 jour

#### 1.4 Mise à jour `llms.txt`
Ajouter Namek, Paradis, niveaux 4ème/3ème, bon domaine. Lister les 30 cours disponibles avec liens directs.

**Effort** : 30 min

---

### 📅 PHASE 2 — CONTENU SEO (Semaines 2-3)

#### 2.1 Pages "Mondes" enrichies (6 pages)
Chaque monde mérite **1500-2000 mots** :
- Histoire du manga/anime
- Comment ce monde enseigne la matière X
- Les 8 îles expliquées
- Les héros et leur lien pédagogique
- Liste des programmes par niveau (CM2 → 3ème)
- FAQ courte (3-5 questions)
- Exemples de questions par niveau

**Cibles SEO par monde** :
| Monde | Mot-clé principal | Volume estimé France |
|---|---|---|
| Grand Bleu | "apprendre français One Piece" / "exercices français manga" | ~2k/mois |
| Magnolia | "réviser histoire avec Dragon Ball" / "quiz histoire collège" | ~5k/mois |
| Namek | "exercices géographie collège" / "Jujutsu Kaisen apprendre" | ~3k/mois |
| Pays du Feu | "exercices maths Naruto" / "réviser maths CM2" | ~10k/mois |
| Kanto | "réviser SVT collège" / "Demon Slayer pédagogique" | ~4k/mois |
| Paradis (English) | "apprendre anglais Attack on Titan" / "anglais brevet 3ème" | ~8k/mois |

#### 2.2 Pages "Niveaux" (5 pages : CM2, 6ème, 5ème, 4ème, 3ème)
Hub par niveau scolaire : présente toutes les matières disponibles pour ce niveau.

**Cibles SEO** :
- "réviser CM2 gratuit"
- "réviser 6ème en ligne"
- "exercices 5ème"
- "soutien scolaire 4ème"
- "réviser brevet 3ème" (volume très élevé : ~20k/mois)

#### 2.3 Page "Réviser le Brevet 2026"
Hub spécial avec toutes les matières 3ème + simulateur d'épreuves + planning de révisions. **Cible énorme** en mai-juin.

#### 2.4 Page "FAQ Parents" (massive AEO)
20-30 questions phrasées naturellement :
- "Académie Pirate, c'est gratuit ?"
- "À partir de quel âge mon enfant peut utiliser le site ?"
- "Le contenu est-il conforme au programme officiel ?"
- "Comment Académie Pirate aide à réviser le brevet ?"
- "Mon enfant peut-il jouer sans surveillance ?"
- "Différences entre One Piece et Naruto sur Académie Pirate ?"

Chaque réponse en 40-60 mots, schema FAQPage. **Excellente cible voice search + featured snippets**.

#### 2.5 Page "Programme officiel par niveau"
6 pages détaillant le programme Éducation Nationale couvert par Académie Pirate :
- Programme CM2 — toutes matières
- Programme 6ème
- Programme 5ème
- Programme 4ème
- Programme 3ème (Brevet)
- Programme cycle 4

**Cible parents perdus** qui cherchent "qu'est-ce qu'on apprend en 5ème en histoire".

---

### 📅 PHASE 3 — BLOG & AUTORITÉ E-E-A-T (Semaines 4-8)

#### 3.1 Création d'un blog `/blog`
**12 articles minimum sur 3 mois**, calendrier éditorial :

**Mai** :
- "Comment réviser le Brevet 2026 en s'amusant" (cible massive)
- "Top 10 des mangas pour apprendre l'anglais"
- "Ado ne veut pas réviser ? Voici comment les motiver"

**Juin** :
- "Le brevet est passé — comment préparer la 2nde ?"
- "Apprendre les maths avec Naruto : ça marche vraiment ?"
- "Cycle 4 — guide complet pour les parents"

**Juillet** (cahier de vacances) :
- "Cahier de vacances gratuit CM2 → 6ème"
- "Cahier de vacances 6ème → 5ème"
- "Cahier de vacances 3ème → 2nde"

**Août-Septembre** (rentrée) :
- "Rentrée 6ème : que faut-il savoir ?"
- "Comment aider mon enfant à entrer en 4ème"
- "Outils de soutien scolaire — comparatif"

**Effort par article** : 800-1500 mots, 1 image, 1-2 schémas
**SEO** : chaque article cible 1 mot-clé long-tail

#### 3.2 Page "Notre méthode pédagogique"
Présenter la philosophie Académie Pirate :
- Pourquoi le manga ?
- Pourquoi la gamification ?
- Comment on conçoit les questions ?
- Conformité programme officiel : sources

**Page essentielle pour E-E-A-T (autorité)**.

#### 3.3 Page "Qui suis-je / L'équipe"
Présenter le créateur (toi !) :
- Photo
- Bio (1 paragraphe)
- Pourquoi Académie Pirate
- Liens sociaux (LinkedIn, Twitter)
- Schema.org `Person`

#### 3.4 Témoignages parents
Mettre en avant 5-10 témoignages parents (avec photo + prénom + niveau enfant). Schema `Review`. Idéalement obtenir des notes Google My Business.

---

### 📅 PHASE 4 — GEO (IA SEARCH) — Continu

Pour apparaître dans **ChatGPT Search, Perplexity, Gemini, Claude** :

#### 4.1 Mettre à jour llms.txt (1h)
Version v2 incluant Namek, Paradis, tous niveaux, vrai domaine.

#### 4.2 Densité factuelle
Sur chaque page mondes/niveaux, ajouter :
- Statistiques précises (440 questions par monde)
- Conformité programmes (numéros BO Éducation Nationale)
- Citation de sources autorisées (eduscol.education.fr)

#### 4.3 Page "Données et chiffres"
Page dédiée aux IA + journalistes :
- 6 mondes
- 30 cours
- 240 îles
- 2640 questions
- Conformité 100% programme officiel
- Méthodologie de validation

Schema `Dataset` + `Organization`.

#### 4.4 Backlinks autorisés
Sources qui font apparaître dans ChatGPT :
- Wikipedia (créer une page Wikipédia FR si pas encore fait)
- Articles de presse (envoyer à Le Monde/Famille Chrétienne/Phosphore une histoire)
- Annuaires éducatifs (parents.fr, magicmaman.com, doctissimo Famille)
- Citation par d'autres sites EdTech

---

### 📅 PHASE 5 — AEO (FEATURED SNIPPETS) — Semaines 5-8

Pour gagner les "Position 0" Google et les réponses Google Assistant/Siri :

#### 5.1 Snippet-friendly content
Sur chaque page niveau, un bloc :
```html
<h2>Comment réviser le brevet d'anglais avec Académie Pirate ?</h2>
<p>Académie Pirate propose 8 îles de quiz couvrant tout le programme
d'anglais 3ème : Past Simple, Present Perfect, Conditionals, Modaux,
Reported Speech, vocabulaire School & Jobs, faits culturels UK/USA,
et un bilan Brevet. Chaque île contient 11 questions avec un boss
final. 100% gratuit.</p>
```
→ Pattern direct response (40-60 mots) en réponse à H2 question.

#### 5.2 Tableaux comparatifs
"CM2 vs 6ème — qu'est-ce qui change ?" (table HTML).
"Brevet 2026 vs 2025 — ce qui change."

#### 5.3 HowTo schema
Pages tutoriel : "Comment créer un compte Académie Pirate" (HowTo schema), "Comment lier son compte parent à son enfant".

#### 5.4 SpeakableSpecification
Marquer les réponses-clés FAQ pour Google Assistant :
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": [".speakable-answer"]
}
```

---

## 📊 MATRICE DE PRIORITÉS

| Priorité | Action | Effort | Impact | Quand |
|---|---|---|---|---|
| 🔴 **Critique** | Pré-rendu HTML 30 routes | 2j | Énorme — débloque tout SEO | Sem 1 |
| 🔴 **Critique** | Schema.org JSON-LD (EducationalOrganization, Course) | 1j | Énorme — visibilité IA + Google | Sem 1 |
| 🔴 **Critique** | Sitemap complet 30+ URLs | 30 min | Élevé — guide Google | Sem 1 |
| 🟠 **Haute** | 6 pages "Monde" enrichies (1500 mots) | 3-4j | Élevé — captures recherches manga+matière | Sem 2-3 |
| 🟠 **Haute** | 5 pages "Niveau" (hub matières) | 2-3j | Élevé — captures "réviser X" | Sem 2-3 |
| 🟠 **Haute** | Page "Réviser le Brevet 2026" | 1j | Énorme en mai-juin | Sem 2 |
| 🟠 **Haute** | FAQ Parents 20+ questions (FAQPage schema) | 1j | Élevé — featured snippets | Sem 2 |
| 🟡 **Moyenne** | llms.txt mis à jour | 30 min | Moyen — ChatGPT/Claude | Sem 1 |
| 🟡 **Moyenne** | Page "Programme officiel par niveau" × 5 | 2j | Moyen — autorité E-E-A-T | Sem 3 |
| 🟡 **Moyenne** | Blog (12 articles 3 mois) | Continu | Moyen-élevé long terme | Sem 4-12 |
| 🟡 **Moyenne** | Page Méthode + Équipe (E-E-A-T) | 1j | Moyen — légitimité | Sem 4 |
| 🟢 **Quick win** | Migrer hash routing → vraie navigation pushState | 1j | Élevé pour SEO | Sem 1-2 |
| 🟢 **Quick win** | Wikipédia FR Académie Pirate | 2h | Massif pour GEO si accepté | Sem 2 |
| 🟢 **Quick win** | Demander avis Google My Business | 1h | Local SEO + autorité | Continu |

---

## 🔑 MOTS-CLÉS PRIORITAIRES (à cibler dans contenus)

### Volume élevé (> 5000 recherches/mois France)
- "réviser le brevet" → cible page 3ème + Hub Brevet
- "exercice maths CM2" → cible Pays du Feu/CM2
- "soutien scolaire en ligne gratuit" → cible homepage + pages niveaux
- "anglais 3ème" → cible Paradis/3ème
- "quiz histoire collège" → cible Magnolia (toutes 6e-3e)

### Volume moyen (1000-5000 recherches/mois)
- "réviser ses leçons en s'amusant"
- "site éducatif gratuit collège"
- "apprendre l'anglais avec les animes"
- "exercice français 6ème"
- "programme histoire 4ème"

### Volume faible mais conversion élevée (< 1000)
- "Académie Pirate" (brand)
- "quiz manga éducatif"
- "apprendre avec One Piece"
- "Naruto pédagogique"
- "Attack on Titan apprendre anglais"

---

## 🏆 OBJECTIFS MESURABLES À 3 / 6 / 12 MOIS

### À 3 mois (août 2026)
- ✅ 30 pages indexées dans Google Search Console (vs 1 actuel)
- ✅ Schema.org sur 100% des pages
- ✅ Apparaître dans ChatGPT/Perplexity quand on demande "site éducatif manga gratuit"
- ✅ Position 1-3 sur "Académie Pirate" (brand)
- ✅ 100 visites organiques/jour (vs ~10 estimé actuel)

### À 6 mois (novembre 2026)
- ✅ Position 1-10 sur "réviser le brevet en s'amusant"
- ✅ 5+ featured snippets gagnés
- ✅ 500 visites organiques/jour
- ✅ 12 articles blog publiés
- ✅ Wikipédia FR Académie Pirate validée

### À 12 mois (mai 2027)
- ✅ Position 1-3 sur "soutien scolaire gratuit"-like
- ✅ 2000+ visites organiques/jour
- ✅ Référencement par 10+ sites éducatifs autorisés
- ✅ Citation régulière dans réponses ChatGPT/Perplexity sur sujets éducatifs
- ✅ Reconnaissance comme **acteur EdTech francophone**

---

## ⚠️ CE QU'ON NE PEUT PAS AUDITER ICI

Pour aller plus loin, lance ces outils gratuits sur le site :
1. **Google PageSpeed Insights** (https://pagespeed.web.dev) — Core Web Vitals, vitesse mobile
2. **Google Search Console** (déjà actif ?) — voir ce que Google indexe vraiment
3. **Bing Webmaster Tools**
4. **Schema.org Validator** (validator.schema.org) — vérifier le JSON-LD une fois ajouté
5. **Rich Results Test Google** — voir comment Google affiche le site
6. **Ahrefs gratuit** (3 recherches/mois) — voir backlinks existants

---

## 📁 LIVRABLES TECHNIQUES À CRÉER

```
/scripts/
  build-seo-pages.js          # Pré-rendu 30 pages mondes×niveaux
  generate-sitemap.js         # Sitemap auto avec toutes routes
  generate-llms-txt.js        # llms.txt à jour automatiquement
  
/js/seo/
  schema-generator.js         # JSON-LD par type de page
  meta-tags.js                # <title>+<meta> dynamiques par route
  
/templates-seo/
  monde.html                  # Template pour les 6 mondes
  niveau.html                 # Template pour les 5 niveaux
  ile.html                    # Template pour les 240 îles (overkill ? À voir)
  hub-brevet.html             # Page spéciale "Réviser le Brevet"
  faq.html                    # FAQ parents
  blog-article.html           # Template article blog
  
/blog/
  index.html                  # Liste articles
  ado-revisions-motivation.html
  reviser-brevet-2026.html
  apprendre-anglais-avec-animes.html
  ... etc
  
/data/
  seo-keywords.json           # Mots-clés cibles par page
  programmes-officiels.json   # Données programme Education Nationale
```

---

## 🎯 RÈGLES PROJET À AJOUTER

À intégrer dans **CONSTITUTION_TECHNIQUE_V2.md** :

```markdown
### SEO-01 : Toute nouvelle route SPA = page HTML pré-rendue
Avant de publier une nouvelle route #/X/Y, créer le fichier statique
correspondant /X/Y/index.html via le script build-seo-pages.js.

### SEO-02 : Schema.org JSON-LD obligatoire
Chaque page HTML pré-rendue doit contenir au moins :
- `EducationalOrganization` (au global)
- Le schema spécifique à la page (Course, Quiz, FAQPage, etc.)

### SEO-03 : Title et meta description par page
Aucune page ne peut avoir le même <title> que la home. Chaque page
a un title spécifique de 50-60 chars max et description 150-160 chars.

### SEO-04 : Sitemap synchronisé
Le sitemap.xml est régénéré automatiquement à chaque déploiement
par scripts/generate-sitemap.js. Il liste toutes les pages publiques.

### SEO-05 : llms.txt à jour
Toute nouvelle matière ou niveau ajouté nécessite la mise à jour
de llms.txt dans le même commit.
```

---

## 💰 ESTIMATION GAINS BUSINESS

Hypothèses conservatrices :
- Phase 1 (SEO basics) : x10 visibilité Google (1→10 pages indexées effectivement)
- Phase 2 (contenu) : 500 visites/jour à 6 mois × taux conversion 2% = 10 inscriptions/jour
- Phase 3 (autorité) : 2000 visites/jour à 12 mois × 2% = 40 inscriptions/jour

À 5€/mois abonnement Famille × 30% conversion freemium :
- 6 mois : 10 × 30% × 5€ × 30j × 12 = **5400€/an de récurrent à 6 mois**
- 12 mois : 40 × 30% × 5€ × 30j × 12 = **21 600€/an à 12 mois**

ROI investissement temps : ~30 jours-développeur étalés sur 3 mois = excellent.

---

## 🚀 RECOMMANDATION FINALE

**On a un produit pédagogique de très haute qualité (2640 questions, 6 mondes, 5 niveaux, conformité 100% programme officiel) qui est techniquement invisible.**

Le **goulot d'étranglement n°1** = l'architecture SPA qui empêche Google de voir le contenu.

**Plan dès demain (mardi)** :
1. Matin : créer `scripts/build-seo-pages.js` (pré-rendu 30 pages)
2. Après-midi : générer schema.org JSON-LD + sitemap complet
3. Mercredi : déployer + soumettre nouveau sitemap à Google Search Console
4. Jeudi-vendredi : commencer rédaction page "Réviser le Brevet 2026" (cible massive en mai-juin)
5. Semaine suivante : 6 pages "Monde" enrichies en parallèle de la création du blog

**Si tu veux**, je peux te coder le script de pré-rendu dès demain matin pour qu'on attaque la Phase 1 immédiatement.

---

*Document généré par audit Claude — 4 mai 2026*
*À versionner dans le repo et garder synchro avec l'évolution du site*
