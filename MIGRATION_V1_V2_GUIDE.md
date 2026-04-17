# 🏴‍☠️ ACADÉMIE PIRATE — GUIDE MIGRATION V1 → V2
## Processus complet, étape par étape, pour tous les mondes
*Version 2.0 — Basé sur l'expérience Pays du Feu (migration validée en production)*
*Référence absolue : Grand Bleu (Français × One Piece) — monde de référence V2*

---

## ⚠️ RÈGLES ABSOLUES AVANT DE COMMENCER

```
1. git fetch origin && git reset --hard origin/main  (DEV-01 — TOUJOURS)
2. Lire js/worlds/grand-bleu/quiz-router.js          (MODÈLE à copier)
3. Ne JAMAIS modifier boss-battle.js sans ajouter TOUS les boss du monde
4. Bucket Supabase = island-{monde} (PAS juste {monde})
5. Extensions : utiliser le path du JSON, pas l'extension du fichier source
```

---

## CHECKLIST AUDIT INITIAL (15 min)

Avant de toucher quoi que ce soit :

```
□ Quiz V1 : js/worlds/{monde}/quiz.js — noter les IDs HTML utilisés
□ Lesson data : js/worlds/{monde}/lesson-data.js — structure actuelle
□ Assets JSON : scripts/assets/{monde}.json — bucket, paths, extensions
□ Sources : scripts/sources/{monde}/ — quels fichiers existent ?
□ Supabase Storage — quels fichiers sont dans le bucket ?
□ Supabase DB — chapitres/questions déjà insérés ?
□ index.html — sections HTML {prefix}-levels-sec existent-elles ?
□ router.js — routes /#/{monde} et /#/{monde}/{niveau} ?
□ boss-battle.js — tous les boss_name de la DB sont-ils mappés ?
```

**Output : une liste de ce qui manque pour chaque phase.**

---

## PHASE 1 — ASSETS (images vers Supabase)

### 1a. Vérifier le JSON assets

```json
// scripts/assets/{monde}.json
{
  "name": "Nom du Monde",
  "storage": "supabase",
  "bucket": "island-{monde}",   // ← TOUJOURS island-{monde}
  "characters": [
    {
      "id": "personnage",
      "name": "Prénom Nom",
      "type": "hero",
      "path": "characters/personnage.jpg",  // ← CE PATH = NOM DANS LE BUCKET
      "jikanId": 0
    }
  ]
}
```

> ⚠️ **RÈGLE CRITIQUE : le `path` dans le JSON = nom du fichier dans le bucket.**
> Si sources/naruto/kakashi.jpeg mais JSON dit `characters/kakashi.jpg`
> → Le bucket reçoit `kakashi.jpg` (pas `kakashi.jpeg`).
> → Dans TOUT le code, utiliser l'extension du JSON, pas du fichier source.

### 1b. Préparer les sources

```bash
mkdir -p scripts/sources/{monde}
# Copier images HQ (PNG/JPG haute résolution)
# Convention : {id}.{ext} avec ext IDENTIQUE au JSON path
```

### 1c. Dry-run puis upload

```bash
# Vérifier d'abord
node scripts/upload.js --world={monde} --dry-run --sources-only

# Uploader (uniquement sources locales)
SUPABASE_SERVICE_KEY=eyJ... node scripts/upload.js --world={monde} --sources-only

# Résultat attendu : X / 0 échecs
```

### 1d. Vérifier dans Supabase Storage

Ouvrir Supabase Dashboard → Storage → `island-{monde}` → `characters/`
Vérifier que chaque fichier a bien l'extension du JSON (`.jpg` pas `.jpeg`).

---

## PHASE 2 — BASE DE DONNÉES (migrations SQL)

### 2a. Créer le fichier de migration

Nommage : `migration_{monde}_{niveau}.sql` (un fichier par niveau)

```sql
-- MIGRATION {MONDE} — {NIVEAU}
-- Exécuter dans Supabase SQL Editor

-- 1. Chapitres (8 îles)
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic,
  hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, {N}, 'Île de {Perso}', '{Topic}',
  '{Perso}',
  'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-{monde}/characters/{perso}.jpg',
  '{monde}-map', '{Boss}', '{couleur}', {N}
FROM matieres m, niveaux n
WHERE m.code='{code_matiere}' AND n.code='{niveau}';

-- 2. Questions (11 par île)
WITH ch AS (SELECT c.id FROM chapitres c
  JOIN matieres m ON c.matiere_id=m.id
  JOIN niveaux n ON c.niveau_id=n.id
  WHERE m.code='{code}' AND n.code='{niveau}' AND c.numero={N})
INSERT INTO questions (chapitre_id, question, options, reponse,
  explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.* FROM ch, (VALUES
  (1, '...', '["A","B","C","D"]', 'A', '...', 'qcm', false, 1),
  ...
  (11, '⚔️ BOSS !', '["A","B","C","D"]', 'A', '...', 'boss', true, 3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- 3. Leçons (1 par île)
INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, '{Perso}', '{Citation}',
  '[{...slides JSONB...}]'::jsonb,
  '[]'::jsonb,
  '{Conseil}',
  '[{...warmup JSONB...}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id
  JOIN niveaux n ON c.niveau_id=n.id
WHERE m.code='{code}' AND n.code='{niveau}' AND c.numero={N};
```

> ⚠️ **L'URL hero_image dans le SQL doit utiliser l'extension du JSON path.**

### 2b. Exécuter dans l'ordre : cm2 → 6eme → 5eme → 4eme → 3eme

Vérification après chaque exécution :
```sql
SELECT n.code, c.numero, c.hero_name, LEFT(c.hero_image, 60) AS img
FROM chapitres c
JOIN matieres m ON c.matiere_id = m.id
JOIN niveaux n ON c.niveau_id = n.id
WHERE m.code = '{code_matiere}'
ORDER BY n.ordre, c.numero;
```

---

## PHASE 3 — QUIZ-ROUTER (copie exacte Grand Bleu)

### 3a. Créer js/worlds/{monde}/quiz-router.js

**Copier quiz-router-grand-bleu.js et adapter ces 6 éléments uniquement :**

```javascript
// 1. Variables de base
var MATIERE_CODE = '{code_matiere}';  // ex: 'maths', 'sciences'
var PREFIX       = '{prefix}';        // ex: 'pdf', 'kanto'

// 2. Nom de bucket (pour le fond animé)
var STORAGE_BG = 'https://.../island-{monde}/characters/';

// 3. Cinématiques — 40 entrées : '{niveau}_{1-8}'
var {PREFIX}_ISLE_INTRO = {
  'cm2_1': { bg:'#...', lines:['...','...','...'], kanji:'...',
             kanjiColor:'#...', bubble:'Citation du personnage !' },
  // ... 40 entrées pour 5 niveaux × 8 îles
};

// 4. Niveaux
var NIVEAUX = [
  { code:'cm2',  nom:'CM2',  emoji:'⭐',        color:'#...', desc:'...' },
  { code:'6eme', nom:'6ème', emoji:'⭐⭐',       color:'#...', desc:'...' },
  { code:'5eme', nom:'5ème', emoji:'⭐⭐⭐',     color:'#...', desc:'...' },
  { code:'4eme', nom:'4ème', emoji:'⭐⭐⭐⭐',   color:'#...', desc:'...' },
  { code:'3eme', nom:'3ème', emoji:'⭐⭐⭐⭐⭐', color:'#...', desc:'...' },
];

// 5. Préfixes HTML — remplacer 'gb-' par '{prefix}-'
//    gb-levels-sec → {prefix}-levels-sec
//    gb-iles-sec   → {prefix}-iles-sec
//    gb-quiz-sec   → {prefix}-quiz-sec
//    gb-qContainer → {prefix}-qContainer
//    gb-qTitle     → {prefix}-qTitle
//    gb-qProgFill  → {prefix}-qProgFill
//    gb-qProgLbl   → {prefix}-qProgLbl

// 6. Exports globaux
window.show{Monde}V2    = show{Monde}V2;
window.{prefix}_showLevel    = showLevel;
window.{prefix}_showLevels   = function(){ show{Monde}V2(true); };
window.{prefix}_startIsland  = startIsland;
window.{prefix}_skipCine     = function() { ... };
```

> ✅ **Ordre leçon → cinématique → quiz** (identique Grand Bleu)

---

## PHASE 4 — LESSON-DATA (40 leçons = 5 niveaux × 8 îles)

### 4a. Créer js/worlds/{monde}/lesson-data.js

```javascript
window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['{monde}'] = {
  color: '{couleur}',
  bg: '{bg_sombre}',
  textAccent: '{couleur_texte}',
  particles: 'fire',  // ou 'water', 'lightning', etc.
  worldName: '{Nom du Monde}',

  // ── Avatars par niveau et numéro ──────────────────────────
  // ⚠️ Extensions = PATH du JSON (pas l'extension du fichier source)
  avatars: {
    'cm2':  { 1:'perso1.jpg', 2:'perso2.jpg', ..., 8:'perso8.jpg' },
    '6eme': { 1:'perso1.jpg', 2:'perso2.jpg', ..., 8:'perso8.jpg' },
    '5eme': { 1:'perso1.jpg', 2:'perso2.jpg', ..., 8:'perso8.jpg' },
    '4eme': { 1:'perso1.jpg', 2:'perso2.jpg', ..., 8:'perso8.jpg' },
    '3eme': { 1:'perso1.jpg', 2:'perso2.jpg', ..., 8:'perso8.jpg' },
  },

  // ── Leçons — clés composites 'cm2_1', '6eme_3', etc. ─────
  lessons: {
    'cm2_1': {
      heroName: 'Nom du personnage',
      heroQuote: 'Citation courte et percutante !',
      rule: 'La règle résumée en une phrase',
      sections: [
        {
          icon: '🔢',
          title: 'Titre de la section',
          color: '#couleur',
          content: 'Explication avec <strong>balises HTML</strong> autorisées.',
          examples: ['Exemple 1', 'Exemple 2', 'Exemple 3']
        }
      ],
      heroTip: 'Nom dit : "Conseil mémorable !"',
      warmup: [
        { q: 'Question ?', a: 'Réponse', o: ['Réponse', 'Leurre1', 'Leurre2', 'Leurre3'] }
      ]
    },
    // ... 39 autres leçons
  }
};

// ── Point d'entrée — UNIQUE, ne pas dupliquer dans lesson.js ──
window.lesson_{monde} = function(niveauCode, numeroIle, callback) {
  var STORAGE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-{monde}/characters/';
  var registry = window.LESSON_REGISTRY && window.LESSON_REGISTRY['{monde}'];

  if (!registry) { if (callback) callback(); return; }

  var lessonKey  = niveauCode + '_' + numeroIle;
  var lessonData = registry.lessons[lessonKey] || registry.lessons[numeroIle];

  if (!lessonData) { if (callback) callback(); return; }

  var avatarsMap = registry.avatars && registry.avatars[niveauCode];
  var avatarFile = (avatarsMap && avatarsMap[numeroIle]) || 'personnage-defaut.jpg';
  var avatarUrl  = STORAGE + avatarFile;

  if (typeof showLesson === 'function') {
    showLesson('{monde}', lessonKey, avatarUrl, '{couleur}', callback);
  } else {
    if (callback) callback();
  }
};
```

### 4b. Ajouter lesson_{monde} dans lesson.js

Dans `js/lesson.js`, ajouter JUSTE après les autres fonctions lesson_* :

```javascript
// ── {MONDE} — {Matière} / {Univers} ──────────────────────
// NE PAS DÉFINIR window.lesson_{monde} ici — défini dans lesson-data.js
// (lesson-data.js se charge après lesson.js → écrase cette version)
```

> ⚠️ **Piège fréquent** : Si `lesson.js` définit `lesson_{monde}(n, cb)` (ancienne signature)
> ET `lesson-data.js` définit `lesson_{monde}(niveauCode, n, cb)` (nouvelle signature),
> la version de lesson-data.js ÉCRASE celle de lesson.js.
> La signature dans lesson-data.js DOIT être `(niveauCode, numeroIle, callback)`.

---

## PHASE 5 — HTML (index.html)

Ajouter les sections dans index.html (pattern identique Grand Bleu) :

```html
<!-- ═══ {MONDE} ({Matière} × {Univers}) ═══ -->
<div id="{prefix}-bg"></div>
<section id="{prefix}-levels-sec" style="display:none"></section>
<section id="{prefix}-iles-sec"   style="display:none"></section>
<section id="{prefix}-quiz-sec"   style="display:none">
  <div class="{prefix}-quiz-header">
    <div class="{prefix}-quiz-title" id="{prefix}-qTitle">QUIZ</div>
    <div class="{prefix}-prog-bar">
      <div class="{prefix}-prog-fill" id="{prefix}-qProgFill" style="width:0%"></div>
    </div>
    <div class="{prefix}-prog-lbl" id="{prefix}-qProgLbl">0 / 0</div>
  </div>
  <div id="{prefix}-qContainer"></div>
</section>
```

> ✅ sections `levels-sec` et `iles-sec` sont VIDES — remplies par JS.
> ❌ Ne pas mettre de HTML hardcodé dedans.

---

## PHASE 6 — CSS (quiz-{monde}.css)

Créer `css/quiz-{monde}.css` avec ces classes minimales :

```css
/* Fond animé */
#{prefix}-bg { position:fixed; inset:0; z-index:0; display:flex; opacity:0; transition:opacity 1s; }
#{prefix}-bg.visible { opacity:1; }
.{prefix}-bg-strip { flex:1; animation:{prefix}-scroll 32s linear infinite; }
.{prefix}-bg-strip img { width:100%; aspect-ratio:3/4; object-fit:cover; opacity:.55; }

/* Sections */
#{prefix}-levels-sec, #{prefix}-iles-sec, #{prefix}-quiz-sec {
  display:none; position:relative; z-index:2; width:100%; min-height:100vh;
}

/* Grille niveaux */
.{prefix}-levels-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; padding:16px; max-width:720px; margin:0 auto; }
@media (min-width:540px) { .{prefix}-levels-grid { grid-template-columns:repeat(3,1fr); } }
.{prefix}-level-card { border-radius:18px; border:2px solid var(--level-color); cursor:pointer; padding:22px 14px; display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center; }
.{prefix}-level-emoji { font-size:2rem; }
.{prefix}-level-nom   { font-family:'Bangers',cursive; font-size:1.9rem; color:var(--level-color); letter-spacing:3px; }
.{prefix}-level-desc  { font-family:'Nunito',sans-serif; font-size:.78rem; font-weight:800; color:rgba(255,255,255,.75); }
.{prefix}-level-btn   { padding:8px 18px; border-radius:24px; background:var(--level-color); color:#000; font-family:'Bangers',cursive; }

/* Grille îles */
.{prefix}-islands-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; padding:12px; max-width:960px; margin:0 auto; }
@media (min-width:580px) { .{prefix}-islands-grid { grid-template-columns:repeat(3,1fr); } }
@media (min-width:900px) { .{prefix}-islands-grid { grid-template-columns:repeat(4,1fr); } }
.{prefix}-isle-card { border-radius:16px; overflow:hidden; cursor:pointer; border:2px solid rgba(255,255,255,.2); }
.{prefix}-isle-img-wrap { position:relative; width:100%; aspect-ratio:3/4; overflow:hidden; }
.{prefix}-isle-img { width:100%; height:100%; object-fit:cover; object-position:center top; }
.{prefix}-isle-img-fallback { display:none; position:absolute; inset:0; align-items:center; justify-content:center; font-size:3rem; }
.{prefix}-isle-body { padding:10px 12px; }

/* Bouton retour */
.{prefix}-back-btn { display:inline-flex; align-items:center; padding:7px 14px; border-radius:20px; border:1px solid var(--{prefix}-color,.5); cursor:pointer; font-family:'Nunito',sans-serif; font-size:.82rem; font-weight:900; margin-bottom:8px; }

/* Header quiz sticky */
#{prefix}-quiz-sec { padding-top:0; }
.{prefix}-quiz-header { position:sticky; top:0; z-index:100; background:rgba(0,0,0,.96); border-bottom:2px solid var(--{prefix}-color); padding:10px 16px 8px; }
.{prefix}-prog-bar { width:100%; height:7px; background:rgba(255,255,255,.15); border-radius:8px; margin-top:6px; overflow:hidden; }
.{prefix}-prog-fill { height:100%; background:var(--{prefix}-color); border-radius:8px; transition:width .4s; }

/* Cinématique */
#{prefix}-cine-overlay { position:fixed; inset:0; z-index:9500; display:flex; }
.{prefix}-cine-char { height:95%; max-width:55vw; object-fit:contain; }
.{prefix}-skip-btn { position:absolute; bottom:16px; right:16px; z-index:3; }
```

Ajouter dans `index.html` `<head>` :
```html
<link rel="stylesheet" href="css/quiz-{monde}.css">
```

---

## PHASE 7 — ROUTER.JS

Ajouter les routes dans `js/router.js` :

```javascript
'/{monde}':      function(){ if (typeof show{Monde}V2 === 'function') show{Monde}V2(); },
'/{monde}/cm2':  function(){ if (typeof show{Monde}V2 === 'function') { show{Monde}V2(); setTimeout(function(){ if(typeof {prefix}_showLevel==='function') {prefix}_showLevel('cm2',true); },200); } },
'/{monde}/6eme': function(){ if (typeof show{Monde}V2 === 'function') { show{Monde}V2(); setTimeout(function(){ if(typeof {prefix}_showLevel==='function') {prefix}_showLevel('6eme',true); },200); } },
// ... idem 5eme, 4eme, 3eme
```

---

## PHASE 8 — BOSS-BATTLE.JS

**Ajouter TOUS les boss_name utilisés dans les migrations SQL :**

```javascript
// {Monde} — {Univers}
'{Boss1}':    '{URL_SUPABASE}/characters/{perso1}.jpg',
'{Boss2}':    '{URL_SUPABASE}/characters/{perso2}.jpg',
// Fallbacks pour boss secondaires sans image uploadée
'{BossSec}':  '{URL_SUPABASE}/characters/{perso_proche}.jpg',
```

> ⚠️ **Vérifier** : chaque `boss_name` dans les chapitres DB doit avoir une entrée ici.
> SQL pour lister tous les boss_name : `SELECT DISTINCT boss_name FROM chapitres WHERE matiere_id = (SELECT id FROM matieres WHERE code = '{code}');`

---

## PHASE 9 — SCRIPTS JS (index.html)

Ajouter dans `index.html` dans le bon ordre :

```html
<!-- Après les autres quiz-router -->
<script src="js/worlds/{monde}/quiz-router.js"></script>

<!-- Après les autres lesson-data -->
<script src="js/worlds/{monde}/lesson-data.js"></script>

<!-- Audio si nécessaire -->
<script src="js/worlds/{monde}/audio.js"></script>
```

---

## PHASE 10 — VALIDATION FINALE

```
□ Grille de niveaux s'affiche avec les 5 cartes
□ Clic sur CM2 → îles avec images
□ Clic sur une île → leçon (dialogue manga) → cinématique → quiz
□ Questions s'affichent et se valident
□ Question boss → boss-battle avec image
□ Résultats + retour aux îles
□ Bouton "← Niveaux" fonctionne
□ Autres niveaux → "Ce niveau arrive bientôt !" (si pas encore migré)
□ Fond animé avec images du monde
□ Audio BGM se lance
```

---

## CHECKLIST ANTI-BUGS (lessons apprises avec Pays du Feu)

| Problème | Cause | Fix |
|---|---|---|
| Image vide dans leçon | Extension `.jpeg` vs `.jpg` | Utiliser le `path` du JSON assets |
| Leçon saute direct au quiz | Clé `'cm2_1'` pas trouvée | Vérifier clés composites dans lessons |
| Boss sans image | boss_name absent de boss-battle.js | Ajouter TOUS les boss_name |
| Niveaux ne s'affichent pas | quiz-router.js pas chargé dans index.html | Vérifier les `<script>` |
| `pdf-levels-sec` vide | Pas de `<section id="...">` dans index.html | Ajouter les 3 sections HTML |
| window.lesson_X écrasé | Deux définitions (lesson.js ET lesson-data.js) | Une seule dans lesson-data.js |
| Syntaxe Error SW | Cache service worker | Cmd+Shift+R ou unregister SW |
| Images îles vides | fix_images.sql pas exécuté | Exécuter avec bonne extension |

---

## ÉTAT DES MONDES

| Monde | Matière | Univers | Bucket | V2 Status |
|---|---|---|---|---|
| **Grand Bleu** | Français | One Piece | `grand-bleu` | ✅ V2 — RÉFÉRENCE |
| **English** | Anglais | Attack on Titan | `island-aot` | ✅ V2 |
| **Pays du Feu** | Maths | Naruto | `island-pays-du-feu` | ✅ V2 — 5 niveaux |
| **Magnolia** | Histoire | Dragon Ball Z | `dbz-local` | ⚠️ V1 — à migrer |
| **Kanto** | Sciences | Demon Slayer | `island-demon-slayer` | ⚠️ V1 — à migrer |
| **Namek** | Géographie | Jujutsu Kaisen | `island-namek` | ⚠️ V1 — à migrer |

---

## ORDRE DE MIGRATION RECOMMANDÉ

```
1. Kanto (Sciences × Demon Slayer)
   → Bucket island-demon-slayer déjà rempli
   → PREFIX: 'kanto'
   → MATIERE_CODE: 'sciences'

2. Namek (Géographie × JJK)
   → Bucket island-namek déjà rempli
   → PREFIX: 'jjk'
   → MATIERE_CODE: 'geographie'

3. Magnolia (Histoire × DBZ)
   → Images locales assets/images/dbz/
   → PREFIX: 'hist'
   → MATIERE_CODE: 'histoire'
```
