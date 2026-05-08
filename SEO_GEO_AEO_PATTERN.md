# 🔍 SEO / GEO / AEO PATTERN — Académie Pirate
## Pattern de référence — Visibilité moteurs de recherche, IA génératives et answer engines
*Version 1.0 — 8 mai 2026 — Basé sur audit du repo réel (commit main)*
*À enregistrer à la racine du repo : `SEO_GEO_AEO_PATTERN.md`*
*Pattern **OBLIGATOIRE** au même rang que `WORLD_EVOLUTION_PATTERN.md` et `GRAND_BLEU_PATTERN.md`*

---

## ⚠️ RÈGLE FONDAMENTALE

**Aucun update qui touche `index.html`, `js/router.js`, `config.js`, `sitemap.xml`, `robots.txt`, `llms.txt`, `manifest.json` ou un nouveau monde/route ne part en prod sans avoir traversé les 7 phases de ce pattern.**

```
SEO  = Google classique (texte brut, classements traditionnels)
GEO  = IA génératives (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews)
AEO  = Featured snippets, People Also Ask, recherche vocale
```

En 2026, les AI Overviews ont fait baisser le CTR organique de **58%** sur les top-rankings.
Être **cité** par l'IA devient plus important qu'être **classé** par Google.

---

## PHILOSOPHIE — Pourquoi ce pattern existe

**Concurrence directe (basée sur recherches mai 2026)** :

| Concurrent | Force | Faiblesse | Notre angle |
|---|---|---|---|
| pass-education.fr | Autorité officielle, contenu massif | Ennuyeux, pas gamifié | Manga + gamification |
| Khan Academy | UX premium, mondiale | Générique, pas culturellement ciblé | Univers manga FR |
| Duolingo | Engagement record | Que des langues | 6 matières × programme officiel |
| Capitaine Maths / Boriol | Apps maths-pirate | 1 seule matière | Toutes matières |
| Bordas, Hatier | Marque + distribution | Cher, peu interactif | Gratuit, web-first |

**Notre niche unique** = **6 univers manga × programme officiel CM2→3ème**.
Personne ne fait ça. C'est notre territoire SEO/GEO/AEO **à protéger et à dominer**.

**Objectif** : devenir la 1ère réponse sur :
- "apprendre français CM2 manga"
- "réviser brevet 2026 en s'amusant"
- "soutien scolaire gratuit collège"
- "quiz One Piece pour enfants"
- "Khan Academy version manga"
- (et tous les long-tail manga × matière scolaire)

---

## 📊 BILAN INITIAL — État au 8 mai 2026

> ⚠️ **À mettre à jour à chaque audit complet.**

### Scores actuels

| Dimension | Score | Statut |
|---|---|---|
| 🟦 SEO | **5/10** | 🟠 Below average |
| 🟪 GEO | **4/10** | 🔴 Needs Work |
| 🟩 AEO | **2/10** | 🔴 Needs Work |
| **GLOBAL** | **11/30** | 🔴 Critique |

### Forces existantes (à préserver)

- ✅ `robots.txt` exemplaire — whitelist GPTBot, Claude-Web, anthropic-ai, PerplexityBot, Gemini, CCBot, cohere-ai
- ✅ 35 entrées `SEO_ROUTES` avec titles+desc spécifiques par niveau (`js/router.js`)
- ✅ JSON-LD dynamique injecté à chaque navigation (`_injectJSONLD()`)
- ✅ Meta dynamiques (title, description, OG, Twitter, canonical) par route
- ✅ `pushState` partiel : `js/worlds/grand-bleu/quiz-router.js:137` push correctement
- ✅ Sub-routing 5 niveaux (CM2→3ème) pour kanto, english, namek
- ✅ 6 mondes actifs : grand-bleu, magnolia, kanto, pays-du-feu, english, namek
- ✅ 50 avatars complets avec quotes pédagogiques (`data/avatars.json`)
- ✅ 40 cinématiques uniques par île × niveau (GB_ISLE_INTRO)
- ✅ `CNAME` correctement configuré → `aca-pirate.ch`

### Faiblesses critiques (à corriger)

> 25 bugs documentés ci-dessous dans la section **PIÈGES CONNUS — Bugs trouvés en mai 2026**.

---

## LES 3 DIMENSIONS — À COUVRIR SYSTÉMATIQUEMENT À CHAQUE UPDATE

### 🟦 SEO — Google classique
Optimise pour : crawlers Google/Bing, classements organiques, rich snippets.
Leviers : titles, meta descriptions, headings, contenu textuel, internal linking, performance, mobile-first.

### 🟪 GEO — Generative Engine Optimization
Optimise pour : ChatGPT (2,5 milliards de prompts/jour, 65% sont des recherches), Perplexity, Gemini, Google AI Overviews, Bing Copilot, Claude.
Leviers : E-E-A-T, schema riche, contenu factuel dense, citations vérifiables, signaux d'auteur, mentions externes (Reddit, presse).

### 🟩 AEO — Answer Engine Optimization
Optimise pour : featured snippets, People Also Ask, recherche vocale (Siri, Alexa, Google Assistant).
Leviers : FAQ schema (5-10 questions/page, réponses 40-60 mots), HowTo schema, headings phrasés en questions, langage conversationnel.

---

## LES 7 PHASES D'UN UPDATE SEO/GEO/AEO

### ━━━ PHASE 0 — AUDIT AVANT MODIFICATION (5 min) ━━━

**Règle PR-00 SEO/GEO/AEO** : aucune modif sans audit préalable.

```bash
# 1. Synchroniser le repo (DEV-01)
cd ~/academie-pirate/academie-pirate
git fetch origin && git reset --hard origin/main

# 2. Vérifier l'indexation actuelle
# → https://www.google.com/search?q=site:aca-pirate.ch
# → Noter le nombre de pages indexées
# → Idem Bing : https://www.bing.com/search?q=site:aca-pirate.ch
# → Tester ChatGPT : "Quels sont les sites de quiz éducatifs avec mangas ?"

# 3. Tester la page concernée
ROUTE="grand-bleu/cm2"
curl -sI "https://aca-pirate.ch/" | head -20
# Vérifier : 200 OK + content-type
```

**Checklist Phase 0** :
```
□ La route existe-t-elle dans SEO_ROUTES (js/router.js) ?
□ Le title actuel est-il <= 60 chars ?
□ La meta description <= 155 chars ?
□ JSON-LD injecté pour cette route (cf. _injectJSONLD) ?
□ La sous-route est-elle gérée par seoKey ?
□ La page est-elle dans sitemap.xml ?
□ La page est-elle mentionnée dans llms.txt ?
□ Indexée par Google ? (site:aca-pirate.ch + route)
```

**Output Phase 0** : un mini-rapport `audits/audit-{route}-{date}.md` qui sert de baseline.

---

### ━━━ PHASE 1 — META TAGS DYNAMIQUES (SEO-01) ━━━

**Règle SEO-01** : chaque route a une entrée dans `SEO_ROUTES` avec title ≤ 60 chars + description ≤ 155 chars.

#### 1a. Format exact pour `js/router.js` → `SEO_ROUTES`

```javascript
// ═══════════════════════════════════════════════════════
// SEO-01 — Format obligatoire pour SEO_ROUTES
// title:       50-60 chars, action verb + bénéfice + marque
// desc:        150-155 chars, CTA + chiffres concrets + mots-clés
// ═══════════════════════════════════════════════════════

'grand-bleu/cm2': {
  title: 'Français CM2 avec One Piece — Académie Pirate',           // 50 chars
  desc:  'Révise le français CM2 avec Luffy, Zoro, Nami. 88 questions gratuites, 8 îles, leçons gamifiées. Programme officiel.', // 119 chars
},
```

#### 1b. Templates par type de route

```javascript
// Homepage
'login': {
  title: 'Académie Pirate — Apprendre avec les Mangas, Gratuitement',   // 60
  desc:  'Plateforme gratuite pour réviser français, maths, anglais, histoire et sciences avec One Piece, Naruto, DBZ. CM2 à 3ème.',
},

// Carte / Hub
'carte': {
  title: 'Carte du Monde — 6 Mondes Manga · Académie Pirate',           // 51
  desc:  '6 univers manga, 6 matières, 5 niveaux scolaires : choisis ton monde et commence l\'aventure pédagogique. Tout gratuit.',
},

// Niveau de monde
'grand-bleu/4eme': {
  title: 'Français 4ème avec One Piece — Brevet · Académie Pirate',     // 58
  desc:  'Maîtrise littéraire 4ème, modes verbaux, prépa Brevet. 88 questions gratuites avec les pirates de One Piece. Programme officiel.',
},

// Niveau Brevet (3ème)
'kanto/3eme': {
  title: 'Sciences 3ème Brevet · Académie Pirate · Demon Slayer',       // 58
  desc:  'Révise le Brevet Sciences 3ème : mécanique, chimie, génétique, immunité. 88 questions avec Tanjiro, Zenitsu, Nezuko. Gratuit.',
},
```

#### 1c. Bug à corriger — `seoKey` doit prendre la sous-route pour TOUS les mondes

**Fichier concerné** : `js/router.js`

```javascript
// ❌ ACTUEL (ligne ~339) — ne marche que pour english
var seoKey = (sub && route === 'english') ? route + '/' + sub : route;

// ✅ CORRECT
var seoKey = sub ? route + '/' + sub : route;
```

#### 1d. Règles de rédaction — Title

```
✅ "Français CM2 avec One Piece — Académie Pirate"
   (matière + niveau + univers + marque, 50 chars)

❌ "Académie Pirate — Quiz manga pour enfants CM2, 6ème, 5ème, 4ème | Français, Maths, Anglais"
   (110 chars → tronqué dans SERP, mots-clés perdus)

❌ "Bienvenue sur Académie Pirate"
   (mot vide "Bienvenue", aucune intention)
```

#### 1e. Règles de rédaction — Description

```
✅ "Révise le français CM2 avec Luffy, Zoro, Nami. 88 questions gratuites,
    8 îles, leçons gamifiées. Programme officiel."
   (verbe d'action, chiffres, mots-clés, 119 chars)

❌ "Académie Pirate : quiz éducatifs gratuits pour enfants 8-13 ans.
    Apprends le français, les maths, l'anglais et l'histoire avec One Piece,
    Naruto, Dragon Ball Z et Demon Slayer. CM2, 6ème, 5ème, 4ème."
   (250 chars → tronqué)
```

---

### ━━━ PHASE 2 — DONNÉES STRUCTURÉES JSON-LD (GEO-01) ━━━

**Règle GEO-01** : `_injectJSONLD()` doit couvrir **tous les mondes** + sous-routes, pas juste 4 sur 6.

> 📊 Donnée 2026 : les pages avec schema complet ont **+27% de probabilité d'être citées par les LLMs**.

#### 2a. Schémas obligatoires par type de page

| Route | Schéma minimal | Schémas additionnels |
|---|---|---|
| `login` (homepage) | `EducationalOrganization` + `WebSite` + `SearchAction` | `Person` (founder) |
| `carte` | `WebApplication` | `BreadcrumbList` |
| `{monde}` (parent) | `Course` (collection) | `BreadcrumbList`, `FAQPage` |
| `{monde}/{niveau}` | `Course` (specific) | `BreadcrumbList`, `Quiz`, `FAQPage` |
| `parent` | `WebPage` | (privé, pas critique) |

#### 2b. Bugs JSON-LD à corriger dans `js/router.js`

**Fichier concerné** : `js/router.js` lignes 269-310 (fonction `_injectJSONLD`)

```javascript
// ❌ ACTUEL — 5 bugs majeurs
ld = {
  '@type': 'WebApplication',
  'url': 'https://safwanst76-dot.github.io/academie-pirate/',  // ❌ BUG #1 mauvaise URL
  'educationalLevel': 'CM2, 6ème, 5ème',                        // ❌ BUG #2 manque 4ème/3ème
  'teaches': ['Français', 'Mathématiques', 'Histoire', 'Sciences Physiques'],  // ❌ BUG #3 manque Anglais, Géo
  'offers': { 'description': 'Freemium — 1 île gratuite par monde' },  // ❌ BUG #4 faux (tout gratuit)
};
// ❌ BUG #5 : _injectJSONLD ne génère rien pour 'english' ni 'namek'
```

```javascript
// ✅ CORRECT — voir templates 2c
```

#### 2c. Templates JSON-LD adaptés à la stack

##### Template A — Homepage (route 'login')

À ajouter dans `_injectJSONLD()` ou directement dans `index.html` :

```javascript
function _ldHomepage() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://aca-pirate.ch/#organization',
        'name': 'Académie Pirate',
        'alternateName': 'Aca-Pirate',
        'url': 'https://aca-pirate.ch',
        'logo': 'https://aca-pirate.ch/assets/images/ui/logo.svg',
        'description': 'Plateforme éducative gamifiée qui enseigne le programme scolaire français (CM2 à 3ème) à travers 6 univers manga (One Piece, Naruto, Dragon Ball Z, Demon Slayer, Attack on Titan, Jujutsu Kaisen).',
        'foundingDate': '2025',
        'inLanguage': 'fr-FR',
        'audience': {
          '@type': 'EducationalAudience',
          'educationalRole': 'student',
          'audienceType': 'Enfants 8-15 ans'
        },
        'teaches': [
          'Français', 'Mathématiques', 'Anglais',
          'Histoire', 'Sciences Physiques', 'Géographie'
        ],
        'sameAs': [
          // À remplir au fur et à mesure des créations de profils
          // 'https://www.tiktok.com/@academiepirate',
          // 'https://www.instagram.com/academiepirate',
          // 'https://www.youtube.com/@academiepirate',
          'https://github.com/safwanst76-dot/academie-pirate'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aca-pirate.ch/#website',
        'url': 'https://aca-pirate.ch',
        'name': 'Académie Pirate',
        'inLanguage': 'fr-FR',
        'publisher': { '@id': 'https://aca-pirate.ch/#organization' },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://aca-pirate.ch/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };
}
```

##### Template B — Monde × Niveau (ex: grand-bleu/cm2)

```javascript
function _ldCourse(route, sub) {
  // route = 'grand-bleu', sub = 'cm2'
  var WORLD_META = {
    'grand-bleu':  { matiere: 'Français',           univers: 'One Piece',         couleur: '#e63946' },
    'magnolia':    { matiere: 'Histoire',           univers: 'Dragon Ball Z',     couleur: '#8b5cf6' },
    'kanto':       { matiere: 'Sciences Physiques', univers: 'Demon Slayer',      couleur: '#C0392B' },
    'pays-du-feu': { matiere: 'Mathématiques',      univers: 'Naruto',            couleur: '#F97316' },
    'english':     { matiere: 'Anglais',            univers: 'Attack on Titan',   couleur: '#4a5c3f' },
    'namek':       { matiere: 'Géographie',         univers: 'Jujutsu Kaisen',    couleur: '#7c3aed' }
  };
  var w = WORLD_META[route];
  if (!w) return null;

  var NIVEAU_NOMS = { 'cm2': 'CM2', '6eme': '6ème', '5eme': '5ème', '4eme': '4ème', '3eme': '3ème' };
  var niveauNom = NIVEAU_NOMS[sub] || 'Tous niveaux';

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': w.matiere + ' ' + niveauNom + ' avec ' + w.univers,
    'description': SEO_ROUTES[route + (sub ? '/' + sub : '')]?.desc || '',
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'Académie Pirate',
      '@id': 'https://aca-pirate.ch/#organization'
    },
    'url': 'https://aca-pirate.ch/#/' + route + (sub ? '/' + sub : ''),
    'inLanguage': 'fr-FR',
    'courseCode': route.toUpperCase() + (sub ? '-' + sub.toUpperCase() : ''),
    'educationalLevel': niveauNom,
    'teaches': w.matiere,
    'audience': {
      '@type': 'EducationalAudience',
      'audienceType': 'Élèves ' + niveauNom
    },
    'isAccessibleForFree': true,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EUR',
      'availability': 'https://schema.org/InStock'
    },
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'online',
      'courseWorkload': 'PT2H'  // ~2h pour 8 îles × 11 questions
    }
  };
}
```

##### Template C — FAQPage pour pages de monde

```javascript
function _ldFAQ(route) {
  // À adapter par monde — exemple grand-bleu
  if (route !== 'grand-bleu') return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'L\'Académie Pirate est-elle vraiment gratuite ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Oui, l\'Académie Pirate est 100% gratuite. Les 6 mondes, 30 cours et plus de 2640 questions sont accessibles sans abonnement, sans publicité ciblée et sans achat in-app.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Combien de questions le monde Grand Bleu contient-il ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Le monde Grand Bleu (Français × One Piece) contient 88 questions par niveau, soit 440 questions au total sur 5 niveaux (CM2, 6ème, 5ème, 4ème, 3ème). Chaque île propose 11 questions progressives.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Les leçons suivent-elles le programme scolaire officiel ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Oui, chaque monde et chaque niveau respecte le Bulletin Officiel de l\'Éducation Nationale française. Le contenu est révisé annuellement pour rester aligné avec les programmes en vigueur.'
        }
      }
    ]
  };
}
```

#### 2d. Patch complet de `_injectJSONLD()` à appliquer

```javascript
function _injectJSONLD(route, sub) {
  // Supprimer l'ancien
  var old = document.getElementById('ap-ld-json');
  if (old) old.remove();

  var graph = [_ldHomepage()['@graph'][0]];  // toujours injecter Organization

  // Ajouter Course si route monde
  var WORLDS = ['grand-bleu', 'magnolia', 'kanto', 'pays-du-feu', 'english', 'namek'];
  if (WORLDS.indexOf(route) !== -1) {
    var c = _ldCourse(route, sub);
    if (c) graph.push(c);

    var f = _ldFAQ(route);
    if (f) graph.push(f);
  } else if (route === 'carte' || route === 'login') {
    // Ajouter WebSite + SearchAction sur home/carte
    graph.push(_ldHomepage()['@graph'][1]);
  }

  var s = document.createElement('script');
  s.id = 'ap-ld-json';
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.appendChild(s);
}
```

#### 2e. Validation OBLIGATOIRE après chaque modif JSON-LD

```bash
# 1. Tester avec l'outil officiel Google
# → https://search.google.com/test/rich-results
# → Coller chaque URL → 0 erreur attendu

# 2. Validateur Schema.org
# → https://validator.schema.org/

# 3. Test runtime
# Ouvrir https://aca-pirate.ch/#/grand-bleu/cm2
# Console : document.getElementById('ap-ld-json').textContent
# Copier dans le validator
```

**⚠️ JSON-LD invalide = pénalité Google + invisibilité IA. Toujours valider avant push.**

---

### ━━━ PHASE 3 — CANONICAL & ROUTING (SEO-02) ━━━

**Règle SEO-02** : chaque route a un canonical unique. Pas de canonical générique = `/`.

#### 3a. Bug critique à corriger dans `js/router.js`

**Fichier concerné** : `js/router.js` ligne ~309

```javascript
// ❌ ACTUEL — toutes les routes ont le même canonical = aca-pirate.ch/
canonical.href = window.location.origin + window.location.pathname;

// ✅ CORRECT — canonical = origin + hash route
function _setCanonical(route, sub) {
  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  // Construire l'URL canonique avec le hash
  var path = '#/' + route + (sub ? '/' + sub : '');
  canonical.href = 'https://aca-pirate.ch/' + path;
  // Note : pour un vrai SEO multipages, voir Phase 5 (pages statiques)
}
```

> ⚠️ **Limite** : même corrigé, Google n'indexe pas optimalement les hash routes. Le vrai fix passe par la Phase 5 (pages statiques pré-rendues). Mais ce fix immédiat aide déjà.

#### 3b. Hreflang — supprimer les doublons inutiles

**Fichier concerné** : `index.html` lignes 60-62

```html
<!-- ❌ ACTUEL — 3 hreflang qui pointent tous vers / -->
<link rel="alternate" hreflang="fr-FR" href="https://aca-pirate.ch/">
<link rel="alternate" hreflang="fr-CH" href="https://aca-pirate.ch/">
<link rel="alternate" hreflang="fr"    href="https://aca-pirate.ch/">

<!-- ✅ CORRECT — 1 seul hreflang générique fr + un x-default -->
<link rel="alternate" hreflang="fr"        href="https://aca-pirate.ch/">
<link rel="alternate" hreflang="x-default" href="https://aca-pirate.ch/">
```

Si on veut vraiment cibler 3 pays francophones, créer 3 vraies sous-URLs (`/fr-CH/`, `/fr-FR/`, `/fr-BE/`). Sinon, 1 seul `fr` suffit.

---

### ━━━ PHASE 4 — CONTENU & E-E-A-T (GEO-02) ━━━

**Règle GEO-02** : E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) sur chaque page de contenu.

> 📊 Donnée 2026 : les pages avec **identité d'auteur visible** ont **+41% de chances d'être citées** par les LLMs.

#### 4a. Page "À propos / Qui sommes-nous" — OBLIGATOIRE

**Fichier à créer** : `pages/a-propos/index.html` (cf. Phase 5 pour le pré-rendu)

Doit contenir au minimum :

```
□ Nom complet du/des fondateur(s)
□ Photo réelle (pas un avatar manga)
□ Bio détaillée : formation, expérience, pourquoi ce projet
□ Lien LinkedIn vérifiable
□ Adresse email de contact
□ Adresse postale (au moins canton/ville pour .ch)
□ Mentions légales accessibles
□ Politique de confidentialité (RGPD-compliant car cible UE/CH)
□ Mentions de presse / partenariats / certifications si existants
□ Schema Person + Organization injecté
```

**Sans cette page, GEO score plafonne à 5/10** peu importe le reste.

#### 4b. H1 unique sur chaque page

**Fichier concerné** : `index.html` ligne ~166

```html
<!-- ❌ ACTUEL -->
<div class="login-title">🏴‍☠️ ACADÉMIE PIRATE</div>

<!-- ✅ CORRECT -->
<h1 class="login-title">🏴‍☠️ ACADÉMIE PIRATE</h1>
```

Idem pour chaque section monde — au lieu de `<div class="gb-map-title">`, mettre `<h1>` (visible uniquement quand la section est affichée).

#### 4c. Densité factuelle sur chaque page de monde

Les IA citent en priorité les pages avec **faits vérifiables et chiffres concrets** :

```
✅ "L'Académie Pirate couvre 6 mondes manga, 5 niveaux scolaires
   (CM2 à 3ème) et propose 2 640+ questions originales validées
   selon le Bulletin Officiel de l'Éducation Nationale française."

❌ "Notre site propose plein de contenu de qualité pour réviser."
   (zéro fait, zéro chiffre, zéro citation possible)
```

**Règle GEO-03** : chaque page de monde affiche un encart **« {Monde} en chiffres »** :
- X îles
- Y questions
- Z personnages
- Niveaux couverts
- Programme officiel respecté

#### 4d. Pages institutionnelles à créer (par ordre de priorité)

| # | Page | URL | Effort | Impact |
|---|---|---|---|---|
| 1 | À propos | `/a-propos` | 1j | E-E-A-T critique |
| 2 | Notre méthode | `/methode` | 1j | Différenciation |
| 3 | FAQ Parents | `/faq` | 1j | AEO + featured snippets |
| 4 | Programmes officiels | `/programmes` | 1j | Autorité |
| 5 | Pour les enseignants | `/enseignants` | 1j | B2B + presse |
| 6 | Contact | `/contact` | 30 min | NAP local |
| 7 | Mentions légales | `/mentions-legales` | 30 min | Légal CH/UE |
| 8 | Confidentialité | `/confidentialite` | 1h | RGPD |

#### 4e. Articles de blog — Stratégie de contenu

Créer `/blog/` avec 12 articles sur 3 mois :

```
Articles à fort potentiel SEO/GEO (prioritaires) :
□ "Comment réviser le brevet 3ème en s'amusant — guide 2026"     (volume ~25k/mois)
□ "10 personnages de One Piece pour mémoriser le français"       (niche)
□ "Pourquoi le manga aide à mieux apprendre — études citées"     (E-E-A-T)
□ "Programme scolaire CM2 à 3ème — récap par matière"            (~5k/mois)
□ "Khan Academy vs Académie Pirate vs Duolingo : comparatif"    (intent comparatif)
□ "Témoignages : 50 parents racontent leur expérience"           (social proof)

Articles mois 2 :
□ "Top 20 quiz de français CM2 gratuits — Académie Pirate dans le top 3"
□ "Réviser les maths 6ème avec Naruto — Pays du Feu expliqué"
□ "Anglais Brevet : checklist complète des notions à maîtriser"
□ "Géographie 5ème : 8 thèmes essentiels par Jujutsu Kaisen"

Articles mois 3 :
□ "Pourquoi mon enfant n'aime pas réviser : 5 solutions testées"
□ "Manga et école : les neurosciences confirment l'engagement"
```

Format type :
- 1 500 à 2 500 mots
- H1 unique, 5-10 H2 phrasés en questions (cf. Phase 6 AEO)
- Citations de sources autoritaires (Éducation Nationale, INSEE, études)
- Auteur identifié + date de publication + date de mise à jour
- 3-5 images avec alt-text descriptifs
- FAQ schema en bas
- CTA vers le monde correspondant

#### 4f. Mentions externes — Le levier 2026

> 📊 Donnée 2026 : **85% des citations dans ChatGPT proviennent de sources tierces**, pas du site lui-même.

Stratégie de mentions externes (à pousser hors du repo, à tracker via tableur) :

```
Plateformes prioritaires :
□ Reddit : r/Parents, r/AskFrance, r/manga, r/EducationFR, r/college
□ Quora français
□ Linkedin posts (algorithme aime les longs posts éducatifs)
□ Product Hunt (lancement officiel)
□ Hacker News (angle technique : "Free Khan Academy with manga")
□ Presse FR : Le Parisien, 20 Minutes, Cafe Pédagogique
□ Blogs parents : LesPros, Magicmaman, Famili
□ TikTok Edu (algorithme natif favorable)
□ YouTube : créateurs manga + créateurs éducation
```

Chaque mention sur une de ces plateformes augmente la probabilité d'être cité par ChatGPT/Perplexity/Gemini.

---

### ━━━ PHASE 5 — PAGES STATIQUES PRÉ-RENDUES (SEO-03) ━━━

**Règle SEO-03** : toute route monde × niveau a un fichier HTML statique avec contenu textuel ≥ 800 mots.

#### 5a. Pourquoi c'est critique

Le SPA actuel ne contient que de l'UI vide pour les crawlers. Les questions et leçons vivent en DB Supabase, **invisibles aux bots**. Sans pages statiques :
- Google n'indexe qu'**1 page** (la home)
- ChatGPT/Perplexity ne peuvent rien citer
- Les sous-routes /grand-bleu/cm2 sont invisibles

#### 5b. Architecture cible

```
academie-pirate/
├── index.html              ← SPA actuel (login + carte)
├── pages/                   ← NOUVEAU : pages statiques pré-rendues
│   ├── a-propos/index.html
│   ├── methode/index.html
│   ├── faq/index.html
│   ├── programmes/index.html
│   ├── enseignants/index.html
│   ├── contact/index.html
│   ├── mentions-legales/index.html
│   ├── confidentialite/index.html
│   ├── grand-bleu/
│   │   ├── index.html       ← Présentation monde
│   │   ├── cm2/index.html   ← Niveau spécifique avec contenu
│   │   ├── 6eme/index.html
│   │   ├── 5eme/index.html
│   │   ├── 4eme/index.html
│   │   └── 3eme/index.html
│   ├── magnolia/...
│   ├── kanto/...
│   ├── pays-du-feu/...
│   ├── english/...
│   ├── namek/...
│   └── blog/
│       ├── index.html
│       └── {slug}/index.html
└── scripts/
    └── build-seo-pages.js   ← NOUVEAU : générateur
```

#### 5c. Script générateur — `scripts/build-seo-pages.js`

```javascript
// ═══════════════════════════════════════════════════════════════════
// BUILD-SEO-PAGES.JS — Académie Pirate
// Génère 30+ pages statiques HTML pour les routes monde × niveau
// À lancer dans le pipeline CI/CD : node scripts/build-seo-pages.js
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const WORLDS = {
  'grand-bleu':  { matiere: 'Français',           univers: 'One Piece',         heros: ['Luffy', 'Zoro', 'Nami', 'Robin'] },
  'magnolia':    { matiere: 'Histoire',           univers: 'Dragon Ball Z',     heros: ['Goku', 'Vegeta', 'Piccolo'] },
  'kanto':       { matiere: 'Sciences Physiques', univers: 'Demon Slayer',      heros: ['Tanjiro', 'Zenitsu', 'Inosuke'] },
  'pays-du-feu': { matiere: 'Mathématiques',      univers: 'Naruto',            heros: ['Naruto', 'Sasuke', 'Sakura'] },
  'english':     { matiere: 'Anglais',            univers: 'Attack on Titan',   heros: ['Eren', 'Mikasa', 'Levi'] },
  'namek':       { matiere: 'Géographie',         univers: 'Jujutsu Kaisen',    heros: ['Yuji', 'Megumi', 'Nobara'] },
};
const NIVEAUX = ['cm2', '6eme', '5eme', '4eme', '3eme'];
const NIVEAU_NOMS = { 'cm2': 'CM2', '6eme': '6ème', '5eme': '5ème', '4eme': '4ème', '3eme': '3ème' };

function buildPage(world, niveau) {
  const w = WORLDS[world];
  const niveauNom = NIVEAU_NOMS[niveau];
  const title = `${w.matiere} ${niveauNom} avec ${w.univers} — Académie Pirate`;
  const desc = `Révise le ${w.matiere.toLowerCase()} ${niveauNom} avec ${w.heros.join(', ')}. 88 questions gratuites, 8 îles, leçons gamifiées.`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://aca-pirate.ch/pages/${world}/${niveau}/">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="stylesheet" href="/css/main.css">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://aca-pirate.ch/pages/${world}/${niveau}/">
<meta property="og:locale" content="fr_FR">

<!-- Schema.org -->
<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Course',
  'name': `${w.matiere} ${niveauNom} avec ${w.univers}`,
  'description': desc,
  'provider': {
    '@type': 'EducationalOrganization',
    'name': 'Académie Pirate',
    'url': 'https://aca-pirate.ch'
  },
  'inLanguage': 'fr-FR',
  'educationalLevel': niveauNom,
  'teaches': w.matiere,
  'isAccessibleForFree': true,
  'audience': {
    '@type': 'EducationalAudience',
    'audienceType': `Élèves ${niveauNom}`
  }
}, null, 2)}
</script>
</head>
<body>

<header>
  <a href="/">🏴‍☠️ Académie Pirate</a>
  <nav>
    <a href="/pages/a-propos/">À propos</a>
    <a href="/pages/methode/">Notre méthode</a>
    <a href="/pages/faq/">FAQ</a>
    <a href="/pages/contact/">Contact</a>
  </nav>
</header>

<main>
  <h1>${w.matiere} ${niveauNom} avec ${w.univers}</h1>

  <p class="lead">${desc}</p>

  <section>
    <h2>Qu'est-ce que le monde ${world.replace('-', ' ')} sur Académie Pirate ?</h2>
    <p>
      Le monde ${world.replace('-', ' ')} est l'univers de l'Académie Pirate dédié au ${w.matiere.toLowerCase()}.
      Il couvre l'intégralité du programme officiel ${niveauNom} de l'Éducation Nationale française
      à travers 8 îles peuplées par les héros de ${w.univers} : ${w.heros.join(', ')} et bien d'autres.
    </p>
    <p>
      Chaque île aborde une notion spécifique du programme, expliquée par un héros et testée par 11 questions
      progressives. La 11ème question, dite « boss », est une synthèse complète de la notion étudiée.
    </p>
  </section>

  <section>
    <h2>Comment fonctionne une île ?</h2>
    <ol>
      <li><strong>Cinématique d'introduction</strong> : un héros de ${w.univers} t'accueille et te met dans l'ambiance.</li>
      <li><strong>Leçon</strong> : 3 sections de cours avec exemples concrets et astuces mnémotechniques.</li>
      <li><strong>Échauffement</strong> : 2 questions simples pour vérifier la compréhension.</li>
      <li><strong>Quiz principal</strong> : 11 questions progressives pour valider la notion.</li>
      <li><strong>Récompense</strong> : XP, étoiles, badges. Possibilité de rejouer pour améliorer le score.</li>
    </ol>
  </section>

  <section>
    <h2>${world.replace('-', ' ')} ${niveauNom} en chiffres</h2>
    <ul>
      <li>8 îles thématiques</li>
      <li>11 questions par île, soit 88 questions au total</li>
      <li>8 leçons interactives avec sections, exemples et astuces</li>
      <li>40 cinématiques uniques (5 niveaux × 8 îles)</li>
      <li>100% conforme au Bulletin Officiel de l'Éducation Nationale française</li>
      <li>100% gratuit, sans publicité ciblée, sans achat in-app</li>
    </ul>
  </section>

  <section class="faq">
    <h2>Questions fréquentes</h2>

    <details>
      <summary><h3>L'Académie Pirate est-elle gratuite ?</h3></summary>
      <p>
        Oui, l'Académie Pirate est 100% gratuite. Les 6 mondes, 30 cours et plus de 2 640 questions
        sont accessibles sans abonnement, sans publicité ciblée et sans achat in-app.
      </p>
    </details>

    <details>
      <summary><h3>Faut-il créer un compte pour jouer ?</h3></summary>
      <p>
        Un compte parent (gratuit, sans carte bancaire) est nécessaire pour suivre la progression
        de l'enfant et lui créer un profil. Les enfants se connectent avec un code PIN simple
        (4 à 8 caractères) sans email.
      </p>
    </details>

    <details>
      <summary><h3>Le contenu est-il conforme au programme officiel ?</h3></summary>
      <p>
        Oui, chaque monde et chaque niveau respecte le Bulletin Officiel de l'Éducation Nationale
        française. Le contenu est révisé annuellement pour rester aligné avec les programmes
        en vigueur.
      </p>
    </details>

    <details>
      <summary><h3>Sur quels appareils l'Académie Pirate fonctionne-t-elle ?</h3></summary>
      <p>
        L'Académie Pirate fonctionne dans tous les navigateurs modernes (Chrome, Safari, Firefox,
        Edge) sur ordinateur, tablette et smartphone. L'application peut aussi être installée
        en PWA pour un accès hors-ligne partiel.
      </p>
    </details>
  </section>

  <section class="cta">
    <h2>Commence l'aventure maintenant</h2>
    <a href="/#/${world}/${niveau}" class="btn-primary">
      ▶ Lancer le monde ${w.matiere} ${niveauNom}
    </a>
  </section>
</main>

<footer>
  <p>© 2026 Académie Pirate — <a href="/pages/mentions-legales/">Mentions légales</a> · <a href="/pages/confidentialite/">Confidentialité</a></p>
</footer>

</body>
</html>`;
}

// Générer toutes les pages
Object.keys(WORLDS).forEach(world => {
  // Page parent (monde)
  const dir = path.join(__dirname, '..', 'pages', world);
  fs.mkdirSync(dir, { recursive: true });

  NIVEAUX.forEach(niveau => {
    const niveauDir = path.join(dir, niveau);
    fs.mkdirSync(niveauDir, { recursive: true });
    fs.writeFileSync(
      path.join(niveauDir, 'index.html'),
      buildPage(world, niveau),
      'utf8'
    );
    console.log(`✅ pages/${world}/${niveau}/index.html`);
  });
});

console.log('\\n🏴‍☠️ Génération terminée — 30 pages SEO créées');
```

#### 5d. Lancer le générateur

```bash
# Lancer en local
node scripts/build-seo-pages.js

# Vérifier
ls -la pages/grand-bleu/cm2/index.html
# → fichier existe, ~6KB

# Tester en local
python3 -m http.server 8000
# Ouvrir http://localhost:8000/pages/grand-bleu/cm2/

# Commit
git add pages/ scripts/build-seo-pages.js
git commit -m "feat(seo): pages statiques pré-rendues 30 routes (SEO-03)"
git push
```

#### 5e. Lien interne — Faire pointer le SPA vers les pages statiques

Dans `index.html`, ajouter un menu avec liens vers `/pages/...` pour le SEO. Visible aux crawlers, optionnel pour les utilisateurs (peut être masqué visuellement avec `display:none` mais détectable par bots).

```html
<!-- ═══ NAVIGATION SEO (visible aux crawlers, masquée à l'utilisateur logged-in) ═══ -->
<nav id="seo-nav" style="display:none">
  <a href="/pages/a-propos/">À propos</a>
  <a href="/pages/methode/">Notre méthode</a>
  <a href="/pages/faq/">FAQ</a>
  <a href="/pages/grand-bleu/">Français · One Piece</a>
  <a href="/pages/grand-bleu/cm2/">Français CM2</a>
  <a href="/pages/grand-bleu/6eme/">Français 6ème</a>
  <!-- ... toutes les routes ... -->
</nav>
```

> ⚠️ **Ne PAS utiliser `display:none` complètement** — Google peut détecter le cloaking. Utiliser plutôt `position:absolute; left:-9999px` ou `visibility:hidden; height:0`. **OU** simplement laisser le menu visible en footer.

---

### ━━━ PHASE 6 — FAQ & FEATURED SNIPPETS (AEO-01) ━━━

**Règle AEO-01** : toute page de monde a une section FAQ avec 5-10 questions et JSON-LD `FAQPage`.

> 📊 Donnée 2026 : les pages avec `FAQPage` schema sont citées **significativement plus** dans ChatGPT, Perplexity et Google AI Overviews.

#### 6a. Format optimal

```
□ 5 à 10 questions par page (sweet spot)
□ Réponses de 40 à 60 mots (pas 30, pas 80)
□ Questions phrasées comme un humain les pose à voix haute
□ Réponse complète en 1ère phrase, détails ensuite
□ Données chiffrées et vérifiables dans la réponse
□ Une mention naturelle du nom de la marque dans 2-3 réponses
```

#### 6b. Schema HowTo — pour les leçons en étapes

À ajouter dans les pages statiques de niveau (cf. Phase 5) :

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment accorder le participe passé avec être",
  "description": "Méthode en 3 étapes pour ne plus jamais se tromper, expliquée par Nami de One Piece.",
  "totalTime": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Repérer l'auxiliaire être",
      "text": "Dans la phrase, identifie le verbe conjugué. Si l'auxiliaire est « être » (suis, es, est, sommes, êtes, sont, étais...), passe à l'étape 2."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identifier le sujet",
      "text": "Demande-toi qui fait l'action. Le sujet peut être singulier ou pluriel, masculin ou féminin. Note son genre et son nombre."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Accorder le participe passé",
      "text": "Le participe passé s'accorde en genre et en nombre avec le sujet. Exemple : « Nami est partie » (féminin singulier)."
    }
  ]
}
```

#### 6c. Headings phrasés en questions

```
✅ <h2>Comment fonctionne le quiz de l'Académie Pirate ?</h2>
✅ <h2>Quels mangas sont utilisés pour enseigner les maths ?</h2>
✅ <h2>Pourquoi apprendre avec un univers manga ?</h2>

❌ <h2>Fonctionnement du quiz</h2>
❌ <h2>Univers manga</h2>
❌ <h2>Avantages</h2>
```

Les IA cherchent des questions explicites pour générer leurs réponses. Une H2 phrasée en question = signal direct.

#### 6d. SpeakableSpecification — recherche vocale

Dans les pages statiques :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Français CM2 avec One Piece",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".lead", ".speakable-faq summary"]
  }
}
</script>

<p class="lead">L'Académie Pirate enseigne le français CM2 à travers 8 îles peuplées par les héros de One Piece, gratuitement.</p>
```

---

### ━━━ PHASE 7 — TECHNIQUE & VALIDATION (PR-00 SEO/GEO/AEO) ━━━

**Règle PR-00 SEO/GEO/AEO** : aucun push prod sans avoir traversé cette checklist.

#### 7a. sitemap.xml — Régénération automatique

**Fichier à créer** : `scripts/generate-sitemap.js`

```javascript
// ═══════════════════════════════════════════════════════════════════
// GENERATE-SITEMAP.JS — Académie Pirate
// Génère sitemap.xml automatiquement depuis config.js + pages/
// À lancer après build-seo-pages.js dans le CI/CD
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const BASE = 'https://aca-pirate.ch';
const today = new Date().toISOString().split('T')[0];
const WORLDS = ['grand-bleu', 'magnolia', 'kanto', 'pays-du-feu', 'english', 'namek'];
const NIVEAUX = ['cm2', '6eme', '5eme', '4eme', '3eme'];
const STATIC_PAGES = ['a-propos', 'methode', 'faq', 'programmes', 'enseignants', 'contact', 'mentions-legales', 'confidentialite'];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n';

// Homepage
xml += `  <url>
    <loc>${BASE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>\\n`;

// Pages institutionnelles
STATIC_PAGES.forEach(page => {
  xml += `  <url>
    <loc>${BASE}/pages/${page}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\\n`;
});

// Mondes + niveaux
WORLDS.forEach(w => {
  xml += `  <url>
    <loc>${BASE}/pages/${w}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>\\n`;

  NIVEAUX.forEach(n => {
    xml += `  <url>
    <loc>${BASE}/pages/${w}/${n}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\\n`;
  });
});

// Blog (si articles existants)
const blogDir = path.join(__dirname, '..', 'pages', 'blog');
if (fs.existsSync(blogDir)) {
  fs.readdirSync(blogDir).forEach(slug => {
    if (slug === 'index.html') return;
    if (fs.statSync(path.join(blogDir, slug)).isDirectory()) {
      xml += `  <url>
    <loc>${BASE}/pages/blog/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\\n`;
    }
  });
}

xml += '</urlset>\\n';
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), xml, 'utf8');

const urlCount = (xml.match(/<url>/g) || []).length;
console.log(`✅ sitemap.xml généré — ${urlCount} URLs`);
```

#### 7b. llms.txt — Régénération automatique

**Fichier à créer** : `scripts/generate-llms-txt.js`

```javascript
// ═══════════════════════════════════════════════════════════════════
// GENERATE-LLMS-TXT.JS — Académie Pirate
// Régénère llms.txt depuis config.js — toujours synchronisé
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const txt = `# Académie Pirate — EdTech Manga pour enfants

## Description
Académie Pirate est une plateforme d'apprentissage gamifiée pour enfants (8-15 ans)
qui combine 6 univers manga (One Piece, Dragon Ball Z, Naruto, Demon Slayer,
Attack on Titan, Jujutsu Kaisen) et programme officiel de l'Éducation Nationale française.

## Matières enseignées
- Français (grammaire, conjugaison, orthographe) — One Piece (monde "Grand Bleu")
- Histoire (Antiquité, Moyen Âge, Renaissance) — Dragon Ball Z (monde "Magnolia")
- Mathématiques (calcul, fractions, géométrie, algèbre) — Naruto (monde "Pays du Feu")
- Sciences Physiques (matière, énergie, électricité) — Demon Slayer (monde "Kanto")
- Anglais (vocabulaire A1 à B1, grammaire, brevet) — Attack on Titan (monde "English")
- Géographie (habiter, mondialisation, DD) — Jujutsu Kaisen (monde "Namek")

## Niveaux scolaires
CM2 (10-11 ans) · 6ème (11-12 ans) · 5ème (12-13 ans) · 4ème (13-14 ans) · 3ème Brevet (14-15 ans)

## Volume de contenu
- 6 mondes actifs
- 30 cours (6 mondes × 5 niveaux)
- 240 îles (8 par cours)
- 2 640+ questions originales (11 par île)
- 240 leçons interactives
- 240 cinématiques uniques

## Fonctionnement
Chaque matière correspond à un "monde" manga avec 8 îles (chapitres) de 11 questions chacune.
Avant chaque quiz : page leçon avec le héros du monde qui explique la règle du jour.
Système XP, streaks, badges, cinématiques d'introduction.
Suivi de progression pour les parents via dashboard dédié.

## Modèle économique
100% gratuit. Aucun abonnement, aucune publicité ciblée, aucun achat in-app.

## Stack technique
HTML/CSS/JS vanilla · Supabase (auth + DB + Storage) · GitHub Pages

## URL principale
https://aca-pirate.ch

## URL technique
https://github.com/safwanst76-dot/academie-pirate

## Conformité programme
Contenu pédagogique conforme aux Bulletins Officiels de l'Éducation Nationale française,
révisé annuellement.

## Dernière mise à jour
${new Date().toISOString().split('T')[0]}
`;

fs.writeFileSync(path.join(__dirname, '..', 'llms.txt'), txt, 'utf8');
console.log('✅ llms.txt régénéré');
```

#### 7c. Checklist PR-00 SEO/GEO/AEO — OBLIGATOIRE avant chaque push

```bash
# 1. Synchroniser
git fetch origin && git reset --hard origin/main

# 2. Régénérer les fichiers SEO automatiquement
node scripts/build-seo-pages.js
node scripts/generate-sitemap.js
node scripts/generate-llms-txt.js

# 3. Validation HTML (W3C)
# → Coller chaque page modifiée sur https://validator.w3.org/
# → 0 erreur acceptée

# 4. Validation JSON-LD
# → https://search.google.com/test/rich-results
# → Coller chaque URL → 0 erreur, 0 warning critique

# 5. Validation Schema.org
# → https://validator.schema.org/

# 6. Lighthouse en local
npx lighthouse https://aca-pirate.ch/ --view
npx lighthouse https://aca-pirate.ch/pages/grand-bleu/cm2/ --view
# Cible : Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100

# 7. Mobile-friendly test
# → https://search.google.com/test/mobile-friendly

# 8. Vérifier l'indexation après push (J+3)
# → Google Search Console → Demande d'indexation manuelle
# → Bing Webmaster Tools → Submit URL

# 9. Tests IA (J+7)
# → ChatGPT : "Connais-tu Académie Pirate ?"
# → Perplexity : "site éducatif manga gratuit"
# → Claude : "quiz manga programme scolaire français"
# → Vérifier que aca-pirate.ch est cité

# 10. Push
git add -A
git commit -m "seo(geo,aeo): {description précise}"
git push
```

#### 7d. Core Web Vitals — Cibles à respecter

```
LCP (Largest Contentful Paint)    < 2.5s
INP (Interaction to Next Paint)   < 200ms
CLS (Cumulative Layout Shift)     < 0.1
```

**Règle TECH-01** : si un score Lighthouse Performance descend sous 90, l'update est rejetée.

#### 7e. Images — Optimisation

```
□ Format WebP (fallback PNG/JPG si nécessaire)
□ Lazy loading natif : <img loading="lazy" decoding="async">
□ Width/height attributes pour éviter le CLS
□ Alt text descriptif et keyword-relevant (pas "image1.png")
□ Compression : viser <100KB pour les héros, <30KB pour les avatars
□ Responsive : <picture> avec srcset pour mobile/desktop
```

---

## 🐛 PIÈGES CONNUS — Bugs trouvés en mai 2026

### 🔴 Piège #1 — Canonical générique = `/`

**Fichier** : `js/router.js:309`

```javascript
// ❌ Toutes les routes ont le même canonical → 1 seule page indexable
canonical.href = window.location.origin + window.location.pathname;

// ✅ Canonical par route avec hash
canonical.href = 'https://aca-pirate.ch/#/' + route + (sub ? '/' + sub : '');
```

### 🔴 Piège #2 — `seoKey` ne marche que pour english

**Fichier** : `js/router.js:339`

```javascript
// ❌ 4 mondes sur 5 ignorent leurs sous-routes SEO
var seoKey = (sub && route === 'english') ? route + '/' + sub : route;

// ✅ Toutes les sous-routes prises en compte
var seoKey = sub ? route + '/' + sub : route;
```

### 🔴 Piège #3 — JSON-LD bloqué sur github.io

**Fichier** : `js/router.js:281`

```javascript
// ❌ Mauvaise URL signalée aux IA
'url': 'https://safwanst76-dot.github.io/academie-pirate/'

// ✅ Vraie URL
'url': 'https://aca-pirate.ch/'
```

### 🔴 Piège #4 — `_injectJSONLD` ne couvre pas English ni Namek

**Fichier** : `js/router.js:283-298`

```javascript
// ❌ ACTUEL
} else if (route === 'iles' || route === 'histoire' || route === 'kanto' || route === 'pays-du-feu') {

// ✅ CORRECT — tous les mondes
} else if (['iles', 'grand-bleu', 'histoire', 'magnolia', 'kanto', 'pays-du-feu', 'english', 'namek'].indexOf(route) !== -1) {
```

### 🔴 Piège #5 — `educationalLevel` obsolète dans JSON-LD

**Fichier** : `js/router.js:290`

```javascript
// ❌ Manque 4ème, 3ème
'educationalLevel': 'CM2, 6ème, 5ème'

// ✅ Tous les niveaux actifs
'educationalLevel': 'CM2, 6ème, 5ème, 4ème, 3ème'
```

### 🔴 Piège #6 — `teaches` JSON-LD incomplet

**Fichier** : `js/router.js:291`

```javascript
// ❌ Manque Anglais, Géographie
'teaches': ['Français', 'Mathématiques', 'Histoire', 'Sciences Physiques']

// ✅ Toutes les matières actives
'teaches': ['Français', 'Mathématiques', 'Anglais', 'Histoire', 'Sciences Physiques', 'Géographie']
```

### 🔴 Piège #7 — `Offer` JSON-LD ment

**Fichier** : `js/router.js:296`

```javascript
// ❌ "Freemium 1 île" alors que FREE_ISLANDS_PER_WORLD=8 (tout gratuit)
'offers': { 'description': 'Freemium — 1 île gratuite par monde' }

// ✅ Tout gratuit
'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR', 'availability': 'https://schema.org/InStock' }
```

### 🔴 Piège #8 — title trop long dans index.html

**Fichier** : `index.html:7`

```html
<!-- ❌ 110 chars → tronqué dans Google -->
<title>Académie Pirate — Quiz manga pour enfants CM2, 6ème, 5ème, 4ème | Français, Maths, Anglais</title>

<!-- ✅ 50-60 chars -->
<title>Académie Pirate — Apprendre avec les Mangas, Gratuitement</title>
```

### 🔴 Piège #9 — meta description trop longue

**Fichier** : `index.html:8`

```html
<!-- ❌ 250 chars → tronqué -->
<meta name="description" content="Académie Pirate : quiz éducatifs gratuits pour enfants 8-13 ans. Apprends le français, les maths, l'anglais et l'histoire avec One Piece, Naruto, Dragon Ball Z et Demon Slayer. CM2, 6ème, 5ème, 4ème.">

<!-- ✅ 150-155 chars -->
<meta name="description" content="Plateforme gratuite : révise français, maths, anglais, histoire, sciences avec One Piece, Naruto, DBZ. CM2 à 3ème. 2640+ questions.">
```

### 🔴 Piège #10 — Pas de H1 dans le DOM

**Fichier** : `index.html:166`

```html
<!-- ❌ div à la place de h1 -->
<div class="login-title">🏴‍☠️ ACADÉMIE PIRATE</div>

<!-- ✅ h1 -->
<h1 class="login-title">🏴‍☠️ ACADÉMIE PIRATE</h1>
```

### 🔴 Piège #11 — Hreflang triplé inutile

**Fichier** : `index.html:60-62`

```html
<!-- ❌ 3 hreflang qui pointent au même endroit -->
<link rel="alternate" hreflang="fr-FR" href="https://aca-pirate.ch/">
<link rel="alternate" hreflang="fr-CH" href="https://aca-pirate.ch/">
<link rel="alternate" hreflang="fr"    href="https://aca-pirate.ch/">

<!-- ✅ 1 fr générique + x-default -->
<link rel="alternate" hreflang="fr"        href="https://aca-pirate.ch/">
<link rel="alternate" hreflang="x-default" href="https://aca-pirate.ch/">
```

### 🔴 Piège #12 — sitemap.xml = 1 URL

**Fichier** : `sitemap.xml`

```xml
<!-- ❌ 1 seule URL → Google n'indexe rien -->
<url><loc>https://aca-pirate.ch/</loc>...</url>

<!-- ✅ 30+ URLs (cf. scripts/generate-sitemap.js) -->
```

### 🔴 Piège #13 — config.js BASE_URL faux

**Fichier** : `config.js:18`

```javascript
// ❌
BASE_URL: 'https://safwanst76-dot.github.io/academie-pirate'

// ✅
BASE_URL: 'https://aca-pirate.ch'
```

### 🔴 Piège #14 — config.js OG_IMAGE faux

**Fichier** : `config.js:152`

```javascript
// ❌
OG_IMAGE: 'https://safwanst76-dot.github.io/academie-pirate/assets/images/ui/og-preview.png'

// ✅ + créer une vraie image OG 1200×630
OG_IMAGE: 'https://aca-pirate.ch/assets/images/ui/og-preview.png'
```

### 🔴 Piège #15 — config.js EMAIL_FROM domaine .fr

**Fichier** : `config.js:155`

```javascript
// ❌ Email .fr alors que site .ch → spam très probable
EMAIL_FROM: 'noreply@academie-pirate.fr'

// ✅ Choisir UN domaine et l'utiliser partout
EMAIL_FROM: 'noreply@aca-pirate.ch'  // ou créer academie-pirate.fr en redirect
```

### 🔴 Piège #16 — llms.txt URL fausse

**Fichier** : `llms.txt:23`

```
# ❌
## URL
https://safwanst76-dot.github.io/academie-pirate/

# ✅
## URL principale
https://aca-pirate.ch
```

### 🔴 Piège #17 — llms.txt niveaux obsolètes

**Fichier** : `llms.txt:13`

```
# ❌ Manque 4ème, 3ème
## Niveaux scolaires
CM2 (10-11 ans) · 6ème (11-12 ans) · 5ème (12-13 ans)

# ✅
## Niveaux scolaires
CM2 · 6ème · 5ème · 4ème · 3ème Brevet
```

### 🔴 Piège #18 — llms.txt matières incomplètes

**Fichier** : `llms.txt:7-12`

Manque Anglais (English/AOT) et Géographie (Namek). Les IA ne savent pas que ces mondes existent.

### 🔴 Piège #19 — llms.txt prix faux

**Fichier** : `llms.txt:21`

```
# ❌
## Modèle économique
Freemium : première île gratuite par monde. Abonnement Famille 5€/mois.

# ✅
## Modèle économique
100% gratuit. Aucun abonnement.
```

### 🔴 Piège #20 — README.md totalement obsolète

**Fichier** : `README.md`

Mentionne UNIQUEMENT One Piece, 8 îles, grammaire. Faux : 6 mondes, 30 cours, 240 îles. Le README est ce que GitHub affiche en premier — c'est aussi un signal de crédibilité pour les IA et journalistes.

### 🔴 Piège #21 — manifest.json icons = photo Luffy

**Fichier** : `manifest.json:18-26`

```json
// ❌ Icônes pointent vers une photo de Luffy (pas une icône)
"icons": [{ "src": "https://...supabase.co/...luffy.jpg", "sizes": "192x192", ... }]

// ✅ Vraie icône PNG carrée 192×192 et 512×512 (à créer)
"icons": [
  { "src": "/assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
  { "src": "/assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
]
```

### 🔴 Piège #22 — manifest.json screenshots avec mauvaise taille

**Fichier** : `manifest.json:11`

```json
// ❌ "630x1200" pointe vers luffy.jpg (probablement carré)
"screenshots": [{ "src": "https://...luffy.jpg", "sizes": "630x1200", ... }]

// ✅ Vrais screenshots 1280×720 et 720×1280 (à capturer)
"screenshots": [
  { "src": "/assets/screenshots/desktop.png", "sizes": "1280x720", "form_factor": "wide" },
  { "src": "/assets/screenshots/mobile.png",  "sizes": "720x1280", "form_factor": "narrow" }
]
```

### 🔴 Piège #23 — Pas d'EducationalOrganization sur la home

**Fichier** : `index.html`

Aucun JSON-LD inline dans le `<head>` du HTML statique. Le `_injectJSONLD()` runtime ne suffit pas car certains crawlers ne rendent pas le JS. Solution : injecter un `EducationalOrganization` minimal en HTML statique.

### 🔴 Piège #24 — pays-du-feu sans sub-routing

**Fichier** : `js/router.js:355-385`

Le bloc `if (route === 'pays-du-feu' && sub)` n'existe pas → les sous-routes `/pays-du-feu/cm2`, `/pays-du-feu/6eme` etc. tombent sur le router parent sans niveau pré-sélectionné. SEO_ROUTES définit ces sous-routes mais le routing logique manque.

### 🔴 Piège #25 — magnolia/grand-bleu sans 3ème

**Fichier** : `js/router.js:347` (grand-bleu)

```javascript
// ❌ Manque 3eme dans gbLevels
var gbLevels = ['cm2', '6eme', '5eme', '4eme'];

// ✅
var gbLevels = ['cm2', '6eme', '5eme', '4eme', '3eme'];
```

Similaire pour magnolia : aucun sub-routing du tout. À corriger ou désactiver les SEO_ROUTES correspondantes.

---

## 📋 RÈGLES RAPPEL — Aide-mémoire

```
PR-00-SEO : Aucune modif HTML/route/contenu sans audit + checklist Phase 7
SEO-01    : Title ≤ 60 chars, description ≤ 155 chars, dans SEO_ROUTES
SEO-02    : Canonical unique par route, pas générique = /
SEO-03    : Toute route monde × niveau a une page statique HTML pré-rendue
SEO-04    : sitemap.xml généré automatiquement à chaque push
SEO-05    : llms.txt synchronisé automatiquement à chaque push
GEO-01    : JSON-LD couvre les 6 mondes + Organization sur toutes les pages
GEO-02    : E-E-A-T sur chaque page de contenu (auteur, date, sources)
GEO-03    : Encart "{Monde} en chiffres" avec données vérifiables
AEO-01    : 5-10 FAQ + FAQPage schema sur chaque page de monde
AEO-02    : H2/H3 phrasés en questions
AEO-03    : Réponses FAQ 40-60 mots, fait en 1ère phrase
TECH-01   : Lighthouse Performance ≥ 90 sinon update rejetée
TECH-02   : Core Web Vitals : LCP <2.5s, INP <200ms, CLS <0.1
TECH-03   : Images en WebP, lazy loading, alt descriptifs
```

---

## 🛠️ TEMPLATES PRÊTS À COPIER

### Template 1 — `<head>` complet pour page statique

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>{TITLE_50_60_CHARS}</title>
<meta name="description" content="{DESC_150_155_CHARS}">
<link rel="canonical" href="https://aca-pirate.ch/{PATH}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#1B2A4A">

<link rel="alternate" hreflang="fr"        href="https://aca-pirate.ch/{PATH}">
<link rel="alternate" hreflang="x-default" href="https://aca-pirate.ch/{PATH}">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:image" content="https://aca-pirate.ch/assets/images/ui/og-{SLUG}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://aca-pirate.ch/{PATH}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Académie Pirate">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{TITLE}">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="https://aca-pirate.ch/assets/images/ui/og-{SLUG}.png">

<!-- Schema.org : Organization + Course + FAQPage selon le cas -->
<script type="application/ld+json">{JSON_LD}</script>

<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
</head>
```

### Template 2 — Encart "{Monde} en chiffres"

```html
<aside class="world-stats">
  <h2>{Monde} en chiffres</h2>
  <ul>
    <li><strong>5</strong> niveaux scolaires (CM2 à 3ème)</li>
    <li><strong>40</strong> îles thématiques au total (8 par niveau)</li>
    <li><strong>440+</strong> questions originales (88 par niveau)</li>
    <li><strong>40</strong> leçons interactives</li>
    <li><strong>40</strong> cinématiques uniques</li>
    <li><strong>100%</strong> conforme au programme officiel français</li>
    <li><strong>0€</strong> — totalement gratuit, sans publicité ciblée</li>
  </ul>
</aside>
```

### Template 3 — FAQ HTML + JSON-LD

```html
<section class="faq" itemscope itemtype="https://schema.org/FAQPage">
  <h2>Questions fréquentes</h2>

  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">L'Académie Pirate est-elle gratuite ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">Oui, l'Académie Pirate est 100% gratuite. Les 6 mondes, 30 cours et plus de 2 640 questions sont accessibles sans abonnement, sans publicité ciblée et sans achat in-app.</p>
    </div>
  </div>

  <!-- ... 4-9 autres questions ... -->
</section>
```

---

## 📈 ÉTAT D'AVANCEMENT SEO/GEO/AEO

> ⚠️ Mettre à jour à chaque PR.

| Phase | Description | Statut | Date |
|---|---|---|---|
| 0 | Audit initial | ✅ Fait | 8 mai 2026 |
| 1 | Meta tags dynamiques | 🟡 Partiel (bug seoKey, title trop long) | — |
| 2 | JSON-LD complet | 🟡 Partiel (4/6 mondes, URL bloquée) | — |
| 3 | Canonical & routing | 🔴 Bug (canonical générique) | — |
| 4 | Contenu E-E-A-T | 🔴 Aucune page institutionnelle | — |
| 5 | Pages statiques pré-rendues | 🔴 Aucune (1 seule page) | — |
| 6 | FAQ & AEO | 🔴 Aucune FAQ | — |
| 7 | Validation continue | 🔴 Pas de pipeline CI/CD SEO | — |

### Fixes prioritaires (Sprint 1 — semaine 1)

| # | Action | Fichier | Effort |
|---|---|---|---|
| 1 | Fix `seoKey` pour tous les mondes | `js/router.js:339` | 5 min |
| 2 | Fix canonical par route | `js/router.js:309` | 10 min |
| 3 | Fix URL JSON-LD (.ch au lieu de .github.io) | `js/router.js:281` | 5 min |
| 4 | Étendre `_injectJSONLD` à english + namek | `js/router.js:283-298` | 30 min |
| 5 | Fix `educationalLevel` + `teaches` | `js/router.js:290-291` | 5 min |
| 6 | Fix `Offer` (tout gratuit) | `js/router.js:296` | 5 min |
| 7 | Réduire title à 60 chars | `index.html:7` | 5 min |
| 8 | Réduire description à 155 chars | `index.html:8` | 5 min |
| 9 | Remplacer `div` par `h1` | `index.html:166` | 5 min |
| 10 | Réduire hreflang à 1 + x-default | `index.html:60-62` | 5 min |
| 11 | Fix `BASE_URL` config | `config.js:18` | 1 min |
| 12 | Fix `OG_IMAGE` config | `config.js:152` | 5 min |
| 13 | Régénérer `llms.txt` | `llms.txt` | 10 min |
| 14 | Régénérer `README.md` | `README.md` | 30 min |
| 15 | Régénérer `manifest.json` (icônes) | `manifest.json` | 1h (créer icônes) |

**Total Sprint 1** : ~3h de dev → passe le score Global de 11/30 à ~17-18/30 immédiatement.

### Fixes Sprint 2 — semaine 2

| # | Action | Effort |
|---|---|---|
| 16 | Créer `scripts/build-seo-pages.js` | 1j |
| 17 | Générer 30 pages statiques mondes × niveaux | 1j |
| 18 | Créer `scripts/generate-sitemap.js` | 30 min |
| 19 | Régénérer `sitemap.xml` (30+ URLs) | 5 min |
| 20 | Créer `pages/a-propos/index.html` | 1j |
| 21 | Créer `pages/methode/index.html` | 1j |
| 22 | Créer `pages/faq/index.html` (10 FAQ) | 1j |

### Fixes Sprint 3 — semaines 3-4

| # | Action | Effort |
|---|---|---|
| 23 | Créer `pages/blog/` + 4 articles initiaux | 1 sem |
| 24 | Soumettre sitemap à Google Search Console | 30 min |
| 25 | Soumettre à Bing Webmaster Tools | 30 min |
| 26 | Lancer campagne mentions externes (Reddit, Quora, presse) | continu |

---

## 🔧 OUTILS GRATUITS

| Outil | Usage |
|---|---|
| https://search.google.com/test/rich-results | Valider JSON-LD |
| https://validator.schema.org | Valider Schema.org |
| https://validator.w3.org | Valider HTML |
| https://pagespeed.web.dev | Core Web Vitals |
| https://search.google.com/test/mobile-friendly | Mobile-friendly |
| https://search.google.com/search-console | Indexation Google |
| https://www.bing.com/webmasters | Indexation Bing |
| https://ahrefs.com/website-authority-checker | Score d'autorité (gratuit limité) |
| https://www.opengraph.xyz | Tester OG tags |

---

## 🧪 COMMANDES BASH POUR AUDIT LOCAL

```bash
# ═══════════════════════════════════════════════════════
# AUDIT SEO/GEO/AEO COMPLET — À lancer avant chaque PR
# ═══════════════════════════════════════════════════════

ROUTE="grand-bleu/cm2"
URL="https://aca-pirate.ch/#/${ROUTE}"

# 1. Status HTTP
curl -sI "https://aca-pirate.ch/" | head -5

# 2. Meta tags
curl -s "https://aca-pirate.ch/" | grep -E '<title>|<meta|<link rel="canonical"' | head -20

# 3. Présence JSON-LD
curl -s "https://aca-pirate.ch/" | grep -c "application/ld+json"

# 4. Robots.txt
curl -s "https://aca-pirate.ch/robots.txt" | head -30

# 5. Sitemap
curl -s "https://aca-pirate.ch/sitemap.xml" | grep -c "<url>"

# 6. llms.txt
curl -s "https://aca-pirate.ch/llms.txt" | head -50

# 7. Lighthouse
npx lighthouse "$URL" --view --preset=desktop
npx lighthouse "$URL" --view --preset=mobile

# 8. Indexation Google
open "https://www.google.com/search?q=site:aca-pirate.ch"

# 9. Test ChatGPT (manuel)
echo "Aller sur chat.openai.com et demander : 'Connais-tu Académie Pirate ?'"

# 10. Vérifier syntaxe JS (router.js, config.js)
node --check js/router.js
node --check config.js
```

---

## 📝 GLOSSAIRE

| Terme | Définition |
|---|---|
| SEO | Search Engine Optimization — Google classique |
| GEO | Generative Engine Optimization — IA génératives (ChatGPT, Perplexity, Claude…) |
| AEO | Answer Engine Optimization — featured snippets, voice search, PAA |
| E-E-A-T | Experience, Expertise, Authoritativeness, Trustworthiness — facteurs Google |
| JSON-LD | JavaScript Object Notation for Linked Data — format de schema.org |
| Schema.org | Vocabulaire standardisé pour les données structurées |
| FAQPage | Schema schema.org pour les pages de FAQ |
| HowTo | Schema schema.org pour les contenus en étapes |
| Course | Schema schema.org pour les contenus pédagogiques |
| EducationalOrganization | Schema schema.org pour les structures éducatives |
| Speakable | Marquage des passages lisibles à voix haute |
| Hash routing | Routing SPA avec `#` dans l'URL — mal indexé par Google |
| pushState | API navigateur pour URLs propres sans rechargement |
| Core Web Vitals | Métriques performance Google (LCP, INP, CLS) |
| LCP | Largest Contentful Paint — temps avant l'élément principal |
| INP | Interaction to Next Paint — réactivité aux clics |
| CLS | Cumulative Layout Shift — stabilité visuelle |
| llms.txt | Fichier informatif pour les LLM crawlers (équivalent robots.txt pour IA) |

---

*Ce document doit être consulté EN PREMIER avant tout dev qui touche du HTML/contenu/route.*
*Règle PR-00 SEO/GEO/AEO : tout livrable est validé selon Phase 7 avant commit.*
*Pattern v1.0 — Académie Pirate — 8 mai 2026 — Basé sur audit code source réel*