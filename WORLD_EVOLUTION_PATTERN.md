# 🏴‍☠️ ACADÉMIE PIRATE — WORLD EVOLUTION PATTERN
## Template de référence — Évolution de chaque monde
*Version 1.0 — À enregistrer dans le repo à la racine*
*Ce document est le pattern OBLIGATOIRE pour faire évoluer tout monde V1 → V2*

---

## PHILOSOPHIE — Pourquoi ce pattern existe

pass-education.fr a du contenu officiel excellent mais ennuyeux.
Nous avons l'expérience gamifiée que les enfants adorent.
**Notre avantage** = leur programme + notre univers manga + notre moteur quiz.

L'objectif est le **top 1% mondial** (Duolingo/Khan Academy niveau) :
- Contenu enrichissable sans toucher au code (ADM-01)
- Chaque monde couvre 4+ niveaux (CM2 → 3ème)
- iOS/Android ready dès maintenant (APP-01)

---

## LES 7 PHASES D'ÉVOLUTION D'UN MONDE

### ━━━ PHASE 0 — AUDIT (15 min) ━━━

**Objectif** : Comprendre l'état exact avant de toucher quoi que ce soit.

```bash
# DEV-01 obligatoire
cd ~/academie-pirate/academie-pirate
git fetch origin && git reset --hard origin/main
```

**Checklist audit** :
```
□ Lire js/worlds/{monde}/quiz.js — quelles îles existent en V1 ?
□ Lire js/worlds/{monde}/lesson-data.js — quelles leçons existent ?
□ Vérifier scripts/assets/{monde}.json — quels assets sont mappés ?
□ Vérifier assets/images/{dossier}/ — quelles images sont en LOCAL ?
□ Vérifier Supabase Storage bucket — quelles images sont déjà uploadées ?
□ Vérifier Supabase DB tables — quelles questions sont déjà en DB ?
□ Vérifier config.js — le monde est-il actif ?
□ Vérifier router.js — les routes existent-elles ?
□ Vérifier index.html — les sections HTML existent-elles ?
```

**Output de la Phase 0** :
- Liste des images à migrer (local → Supabase)
- Liste des questions à créer en DB
- Liste des fichiers JS à créer/modifier

---

### ━━━ PHASE 1 — MIGRATION ASSETS (ASSET-01) ━━━

**Objectif** : Déplacer toutes les images locales vers Supabase Storage.

**Règle ASSET-01** : Tout asset image passe par le script upload, jamais manuellement.

#### 1a. Mettre à jour scripts/assets/{monde}.json

```json
{
  "name": "Nom du Monde",
  "emoji": "🏴‍☠️",
  "storage": "supabase",        ← CHANGER de "local" à "supabase"
  "bucket": "nom-du-bucket",    ← Bucket Supabase cible
  "localDir": null,             ← Retirer si était renseigné
  "color": "#e63946",
  "characters": [
    {
      "id": "luffy",
      "name": "Monkey D. Luffy",
      "type": "hero",
      "path": "characters/luffy.png",   ← Chemin dans le bucket
      "jikanId": 14830
    }
  ]
}
```

#### 1b. Déposer images manuelles dans scripts/sources/{monde}/

```bash
mkdir -p scripts/sources/{monde}
# Copier les meilleures images depuis Downloads
# Convention : {id-personnage}.{ext}
cp ~/Downloads/luffy-hq.png scripts/sources/{monde}/luffy.png
```

#### 1c. Uploader vers Supabase

```bash
# Créer le bucket si inexistant dans Supabase Dashboard

# Upload depuis sources/ en priorité (meilleures images)
SUPABASE_SERVICE_KEY=ta_clé node scripts/audit.js --fix --sources-only --world={monde}

# Ou upload complet avec fallback Jikan
SUPABASE_SERVICE_KEY=ta_clé node scripts/upload.js --world={monde}
```

#### 1d. Vérifier les URLs

```bash
# Audit pour confirmer que tout est en ligne et > 5KB
node scripts/audit.js --world={monde}
open audit-report.html
```

#### 1e. Mettre à jour scripts/assets/{monde}.json avec chemins finaux

**Output Phase 1** :
- Bucket `{nom-bucket}/characters/{id}.png` pour chaque personnage
- Bucket `{nom-bucket}/bosses/{id}.png` pour chaque boss
- Bucket `{nom-bucket}/gifs/` pour les animations résultats
- URL Supabase vérifiée pour chaque asset

---

### ━━━ PHASE 2 — MIGRATION DB (DB-01) ━━━

**Objectif** : Insérer toutes les questions + leçons en Supabase.

**Règle DB-01** : Migration SQL AVANT tout code qui lit ces tables.

#### 2a. Créer la migration SQL

Fichier : `supabase/migrations/migration_{monde}_cm2.sql`

```sql
-- ════════════════════════════════════════
-- MIGRATION {MONDE} — CM2
-- Exécuter dans Supabase SQL Editor
-- ════════════════════════════════════════

-- 1. Matière
INSERT INTO matieres (code, nom, emoji, couleur, monde_id)
VALUES ('{code}', '{Nom complet}', '{emoji}', '{couleur}', '{monde_id}')
ON CONFLICT (code) DO NOTHING;

-- 2. Niveaux (si pas déjà créés)
INSERT INTO niveaux (code, nom, ordre, emoji)
VALUES
  ('cm2',  'CM2',  1, '⭐'),
  ('6eme', '6ème', 2, '⭐⭐'),
  ('5eme', '5ème', 3, '⭐⭐⭐'),
  ('4eme', '4ème', 4, '⭐⭐⭐⭐'),
  ('3eme', '3ème', 5, '🏆')
ON CONFLICT (code) DO NOTHING;

-- 3. Chapitres (8 îles × niveau)
INSERT INTO chapitres
  (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image,
   bgm, boss_name, ile_color, ordre_affichage)
SELECT
  m.id, n.id, 1,
  'Île de {Personnage}', '{Topic}', '{Personnage}',
  '{URL_image}',
  '{monde}-map', '{Boss}', '{couleur}', 1
FROM matieres m, niveaux n
WHERE m.code = '{code}' AND n.code = 'cm2';

-- 4. Questions (11 par chapitre)
-- Voir template ci-dessous

-- 5. Leçons (1 par chapitre)
-- Voir template ci-dessous
```

#### Structure questions.options (JSONB) :
```json
["option A", "option B", "option C", "option D"]
```
La réponse = texte exact d'une des options.

#### Structure lecons.slides (JSONB) :
```json
[
  {
    "icon": "💡",
    "title": "Titre de la section",
    "color": "#e63946",
    "content": "Explication HTML avec <strong>balises</strong>",
    "examples": ["Exemple 1", "Exemple 2", "Exemple 3"]
  }
]
```

#### Structure lecons.warmup (JSONB) :
```json
[
  {
    "q": "Question d'échauffement ?",
    "a": "Bonne réponse",
    "o": ["Bonne réponse", "Mauvaise 1", "Mauvaise 2"]
  }
]
```

#### 2b. Exécuter dans Supabase SQL Editor

```
1. Ouvrir https://supabase.com → Projet → SQL Editor
2. Coller le contenu du fichier .sql
3. Exécuter (Run)
4. Vérifier : aucune erreur rouge
5. Confirmer dans Table Editor : données visibles
```

#### 2c. Créer les niveaux suivants au fil des sessions

```
migration_{monde}_6eme.sql  → Session suivante
migration_{monde}_5eme.sql  → Session d'après
migration_{monde}_4eme.sql
migration_{monde}_3eme.sql
```

**Output Phase 2** :
- 88 questions en DB par niveau (8 îles × 11 questions)
- 8 leçons en DB par niveau (1 par île)
- Vue `v_chapitres_complets` accessible

---

### ━━━ PHASE 3 — QUIZ ROUTER V2 (ARCHI-01) ━━━

**Objectif** : Créer le router JS qui remplace le quiz V1 hardcodé.

**Pattern exact** : Copier `js/worlds/english/quiz-router.js` et adapter.

#### Fichier : `js/worlds/{monde}/quiz-router.js`

```javascript
// ═══════════════════════════════════════════════════════
// QUIZ-ROUTER-{MONDE}.JS V2 — Académie Pirate
// ═══════════════════════════════════════════════════════
(function () {
  'use strict';

  var _currentNiveau = null;
  var _chapitres     = [];
  var MATIERE_CODE   = '{code}';     // ex: 'francais'
  var BUCKET         = '{bucket}';   // ex: 'grand-bleu'
  var STORAGE_BASE   = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/' + BUCKET + '/';

  // ── Cinématiques — 1 par (niveau, île) ───────────────
  // Règle CIN-01 : clé = 'niveau_numero', ex: 'cm2_1'
  // 40 entrées si 5 niveaux × 8 îles
  var {MONDE}_ISLE_INTRO = {
    'cm2_1': {
      bg: '#0a0510',
      lines: ['LIGNE 1…', '… LIGNE 2 !!', 'Ligne dramatique'],
      kanji: '漢字 !!',
      kanjiColor: '#e63946',
      bubble: "Bulle du personnage adaptée à la notion de cette île !"
    },
    // ... 39 autres entrées
  };

  var NIVEAUX = [
    { code: 'cm2',  nom: 'CM2',  emoji: '⭐',      color: '#e63946', desc: 'Description courte' },
    { code: '6eme', nom: '6ème', emoji: '⭐⭐',     color: '#f97316', desc: 'Description courte' },
    { code: '5eme', nom: '5ème', emoji: '⭐⭐⭐',   color: '#8b5cf6', desc: 'Description courte' },
    { code: '4eme', nom: '4ème', emoji: '⭐⭐⭐⭐', color: '#22c55e', desc: 'Description courte' },
  ];

  // ── Export globaux ───────────────────────────────────
  window.show{Monde}     = show{Monde};    // appelé par router.js
  window.{monde}_showLevel  = showLevel;
  window.{monde}_startIsland = startIsland;
  window.{monde}_skipCine    = skipCine;

  // ... (pattern identique à quiz-router-english.js)
})();
```

**Règles impératives** :
- `IIFE` strict mode (ARCHI-01)
- Préfixe CSS `.{monde}-*` (AU-02)
- Clé cinématique `niveau_numero` (CIN-01)
- `lesson_{monde}(niveau, numero, callback)` avant quiz (LG-01)
- `AP_QuizEngine.launch()` pour le moteur quiz (DB-02)
- `playBGM()` dans le callback leçon (AU-04)

---

### ━━━ PHASE 4 — LESSON DATA V2 ━━━

**Objectif** : Créer les données leçons pour chaque niveau.

**Fichier** : `js/worlds/{monde}/lesson-data.js`

```javascript
window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['{monde}'] = {
  color: '{couleur}',
  bg: '{bg-dark}',
  textAccent: '{accent}',
  particles: 'water',   // 'water' | 'fire' | 'sword' | 'star'
  worldName: '{Nom du monde}',

  avatar: function(n) {
    var map = { 1: 'perso1', 2: 'perso2', /* ... */ 8: 'perso8' };
    return 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/{bucket}/characters/' +
           (map[n] || 'perso1') + '.png';
  },

  lessons: {
    1: {
      heroName: 'Nom du perso',
      heroQuote: 'Citation courte et mémorable liée à la notion !',
      rule: 'La règle en UNE PHRASE — ce que l\'enfant doit retenir',
      sections: [
        {
          icon: '💡',
          title: 'Titre section 1',
          color: '{couleur}',
          content: 'Explication avec <strong>termes clés</strong> en gras.',
          examples: ['Exemple 1', 'Exemple 2', 'Exemple 3']
        },
        {
          icon: '📚',
          title: 'Titre section 2',
          color: '{couleur2}',
          content: 'Deuxième concept important.',
          examples: ['Exemple A', 'Exemple B']
        }
      ],
      heroTip: 'Le perso dit : "Astuce mnémotechnique en 1 phrase !"',
      warmup: [
        { q: 'Question 1 échauffement ?', a: 'Bonne réponse', o: ['Bonne réponse', 'Mauvaise 1', 'Mauvaise 2'] },
        { q: 'Question 2 échauffement ?', a: 'Bonne réponse', o: ['Bonne réponse', 'Mauvaise A', 'Mauvaise B'] }
      ]
    },
    // ... 7 autres leçons
  }
};
```

**Règles pédagogiques (PED-01)** :
- Warmup = strictement la notion de CETTE leçon (pas de notion future)
- Exemples avec les noms des personnages du monde (Luffy, Naruto...)
- Astuce mnémotechnique obligatoire (heroTip)
- Maximum 3 sections par leçon (lisibilité mobile)

---

### ━━━ PHASE 5 — INTÉGRATION (NR-01) ━━━

**Objectif** : Connecter le monde au reste de l'app sans régression.

#### 5a. router.js — Ajouter la route et la fonction show

```javascript
// Chercher "showEnglish" et ajouter en dessous :
function show{Monde}(silent) {
  if (!silent) history.pushState(null, '', '#/{route}');
  hideAll();
  if (typeof show{Monde}V2 === 'function') show{Monde}V2();
  else window.location.href = '#/{route}'; // fallback V1
}

// Dans SEO_ROUTES ajouter :
'#{route}/cm2':  { title: 'Académie Pirate — {Matière} CM2', desc: '...' },
'#{route}/6eme': { title: 'Académie Pirate — {Matière} 6ème', desc: '...' },
```

#### 5b. index.html — Ajouter les sections HTML

```html
<!-- Règle : IDs stables — ne jamais changer après création -->
<section id="{monde}-levels-sec" style="display:none"></section>
<section id="{monde}-iles-sec"   style="display:none"></section>
<section id="{monde}-quiz-sec"   style="display:none"></section>
<div     id="{monde}-bg" class="{monde}-bg"></div>
```

#### 5c. index.html — Ajouter les scripts dans l'ordre sacré

```html
<!-- ORDRE SACRÉ (Constitution Technique #3) -->
<!-- Après les autres worlds quiz mais AVANT lesson.js -->
<script src="js/worlds/{monde}/audio.js"></script>
<script src="js/worlds/{monde}/lesson-data.js"></script>

<!-- AVANT router.js -->
<script src="js/worlds/{monde}/quiz-router.js"></script>
```

#### 5d. config.js — Activer le monde

```javascript
worlds: {
  // ...
  '{monde}': { active: true, beta: false }
}
```

#### 5e. globe.js — Ajouter le continent/île sur le globe

```javascript
// Pattern identique aux continents existants
```

---

### ━━━ PHASE 6 — TEST & DÉPLOIEMENT (PR-00) ━━━

**Checklist OBLIGATOIRE avant git push** :

```bash
# 1. Validation syntaxe JS
node --check js/worlds/{monde}/quiz-router.js
node --check js/worlds/{monde}/lesson-data.js
node --check js/router.js
# → 0 erreur autorisée

# 2. Test en local
open index.html  # Chrome en mode incognito
# → Tester flow complet : globe → monde → niveau → leçon → quiz → résultats

# 3. Vérifier les anciens mondes ne sont pas cassés
# → Grand Bleu V1 fonctionne encore
# → Kanto fonctionne encore
# → Pays du Feu fonctionne encore
```

**Test prod après push** :
```bash
# Attendre 2-3 min GitHub Pages
curl -s https://aca-pirate.ch | grep "version"
# Hard reload : Cmd+Shift+R
# Console navigateur : 0 erreur rouge
```

---

### ━━━ PHASE 7 — NIVEAUX SUIVANTS ━━━

**Itération** : répéter Phase 2 → Phase 3 (partiellement) → Phase 4 pour chaque niveau.

```
Session 1 : CM2 (8 îles × 11 questions = 88)
Session 2 : 6ème (88 questions)
Session 3 : 5ème (88 questions)
Session 4 : 4ème (88 questions)
Session 5 : 3ème (88 questions) — optionnel
```

Seule Phase 2 change entre les sessions (SQL + lesson-data).
Le quiz-router.js accepte automatiquement les nouveaux niveaux.

---

## TEMPLATE TABLEAU — PROGRAMME PAR MONDE

| # | Île | Topic | Notion principale | Hero | Boss |
|---|---|---|---|---|---|
| 1 | Île de {Perso1} | {Notion 1} | {Détail} | {Perso1} | {Boss1} |
| 2 | Île de {Perso2} | {Notion 2} | {Détail} | {Perso2} | {Boss2} |
| 3 | Île de {Perso3} | {Notion 3} | {Détail} | {Perso3} | {Boss3} |
| 4 | Île de {Perso4} | {Notion 4} | {Détail} | {Perso4} | {Boss4} |
| 5 | Île de {Perso5} | {Notion 5} | {Détail} | {Perso5} | {Boss5} |
| 6 | Île de {Perso6} | {Notion 6} | {Détail} | {Perso6} | {Boss6} |
| 7 | Île de {Perso7} | {Notion 7} | {Détail} | {Perso7} | {Boss7} |
| 8 | Île de {Perso8} | {Notion 8 + Boss final} | {Détail} | {Perso8} | {BossF} |

**Structure pédagogique des 11 questions (immuable)** :
- Q 1-3 : Notion principale, application directe (difficulté 1)
- Q 4-6 : Approfondissement, cas variés (difficulté 2)
- Q 7-9 : Pièges classiques, erreurs fréquentes (difficulté 3)
- Q 10  : Synthèse dans un contexte One Piece/Naruto/etc.
- Q 11  : BOSS — question complexe, synthèse du chapitre complet

---

## ÉTAT D'AVANCEMENT PAR MONDE — 21 Mai 2026

🏆 **PHASE 7 ATTEINTE POUR LES 6 MONDES — Évolution V1→V2 TERMINÉE**

| Monde | Matière | Univers | Phase | CM2 | 6ème | 5ème | 4ème | 3ème |
|---|---|---|---|---|---|---|---|---|
| 🏴‍☠️ Grand Bleu | Français | One Piece | ✅ Phase 7 | V2✅ | V2✅ | V2✅ | V2✅ | V2✅ |
| ⚔️ English | Anglais | AOT | ✅ Phase 7 | V2✅ | V2✅ | V2✅ | V2✅ | V2✅ |
| 🐉 Magnolia | Histoire | Dragon Ball Z | ✅ Phase 7 | V2✅ | V2✅ | V2✅ | V2✅ | V2✅ |
| ⚔️ Kanto | Sciences | Demon Slayer | ✅ Phase 7 | V2✅ | V2✅ | V2✅ | V2✅ | V2✅ |
| 🔥 Pays du Feu | Maths | Naruto | ✅ Phase 7 | V2✅ | V2✅ | V2✅ | V2✅ | V2✅ |
| 🌀 Namek | Géographie | JJK | ✅ Phase 7 | V2✅ | V2✅ | V2✅ | V2✅ | V2✅ |

**Total** : 6 mondes × 5 niveaux × 8 îles = **240 leçons en production**

### Vérification PROD-01 (21 mai 2026)
- Tous les `js/worlds/{monde}/quiz-router.js` présents en prod
- Tous les buckets Supabase Storage opérationnels
- Tous les LESSON_REGISTRY × 5 niveaux pour magnolia/kanto/namek (autres formats pour english/grand-bleu/pays-du-feu)
- Tests prod sur https://aca-pirate.ch : 6/6 mondes jouables ✅

---

## COMMENT UTILISER CE DOC MAINTENANT

L'évolution V1→V2 des **mondes existants** est terminée. Ce doc reste utile pour :

1. **Créer un nouveau monde** (ex : Forêt Konoha actuellement inactif dans config.js)
   → Suivre les 7 phases dans l'ordre
   → Consulter GRAND_BLEU_PATTERN.md AVANT (référence mondiale)

2. **Maintenir/améliorer un monde existant**
   → Ajouter du contenu (niveaux, îles, questions) via SQL Supabase, pas le code
   → Mettre à jour images via `scripts/sources/{monde}/` + `node scripts/upload.js`

3. **Référence pédagogique**
   → Le doc montre l'architecture cible (pattern Grand Bleu V3)
   → Utile pour onboarding nouvel assistant/développeur

### Mondes futurs (placeholder dans config.js)
- 🌲 Forêt Konoha — actuellement `active: false`, à activer après définition de la matière

---

## RÈGLES RAPPEL — Ne jamais oublier

```
PR-00  : node --check + 0 erreur console + testé prod avant push
ARCHI-01 : IIFE + tokens.css + api.js + events.js
DEV-01 : git fetch + reset --hard origin/main AVANT toute session
URL-01 : #/{monde}/{niveau} pour chaque route
CIN-01 : clé 'niveau_numero' dans ISLE_INTRO — jamais juste 'numero'
PED-01 : warmup = strictement les notions de CETTE leçon
ASSET-01 : images via upload.js, jamais à la main
AU-04  : playBGM() DANS le callback de la leçon
NR-01  : tester les V1 après chaque modification
APP-01 : code Capacitor-compatible dès maintenant
```

---

## GLOSSAIRE

| Terme | Définition |
|---|---|
| V1 | Quiz hardcodé en JS (pas de DB) |
| V2 | Quiz DB-driven (Supabase) + quiz-router + AP_QuizEngine |
| AP_QuizEngine | `js/engine/quiz-engine.js` — moteur quiz réutilisable |
| ISLE_INTRO | Objet cinématiques par clé `niveau_numero` |
| bucket | Espace Supabase Storage pour les assets d'un monde |
| IIFE | Immediately Invoked Function Expression = isolation du scope JS |
| CIN-01 | Règle : clé cinématique = niveau + '_' + numéro |
| PED-01 | Règle : warmup aligné sur la leçon en cours |

---

*Ce document doit être mis à jour à chaque phase complétée.*
*Placer à la racine du repo : `WORLD_EVOLUTION_PATTERN.md`*
*Version 1.0 — Académie Pirate — Avril 2026*
