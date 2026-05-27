# 🏴‍☠️ GRAND BLEU PATTERN — Référence mondiale Académie Pirate
*Pattern de référence validé en production — créé 12 Avril 2026, mis à jour 22 Mai 2026 (+ pièges #9/#10 sur conventions de nommage et formats)*
*Basé sur le monde Grand Bleu (Français × One Piece) — 100% fonctionnel*
*Tout nouveau monde DOIT suivre ce pattern exactement*

---

## ⚠️ RÈGLE FONDAMENTALE

**Le Grand Bleu est le monde de référence. Chaque nouveau monde copie son architecture exactement.**

```
Grand Bleu = Français × One Piece ✅ PRODUCTION
Tous les autres mondes = copier ce pattern, adapter le contenu
```

---

## STRUCTURE FICHIERS — Pattern exact

```
js/worlds/{monde}/
├── audio.js          → patch audio (préfixe {monde}-*)
├── lesson-data.js    → données leçons (LESSON_REGISTRY)
└── quiz-router.js    → router V2 (nav + cinématique + quiz)

css/
└── quiz-{monde}.css  → styles .{monde}-* (isolation AU-02)

data/
└── avatars.json      → URLs Supabase pour tous les univers

Supabase Storage bucket {bucket}/
├── characters/       → {perso}.jpg (8 uniques par niveau)
├── music/            → {monde}-map.mp3, battle.mp3, etc.
└── gifs/             → perfect/, win/, lose/
```

---

## CHECKLIST COMPLÈTE — Nouveau monde

### PHASE 0 — Avant de toucher au code

```bash
# DEV-01 OBLIGATOIRE — toujours synchroniser d'abord
git fetch origin && git reset --hard origin/main
```

**Audit obligatoire :**
```
□ Lire js/worlds/grand-bleu/quiz-router.js → c'est le modèle
□ Vérifier scripts/assets/{monde}.json → storage, bucket, characters
□ Vérifier Supabase Storage bucket → images déjà uploadées ?
□ Vérifier Supabase DB → chapitres/questions déjà en DB ?
□ Vérifier config.js → monde actif ?
□ Vérifier router.js → route existe ?
□ Vérifier index.html → sections HTML existent ?
```

---

### PHASE 1 — Upload assets vers Supabase (ASSET-01, AU-01)

**⚠️ Règle AU-01 : JAMAIS d'assets en local — tout dans Supabase Storage**

#### 1a. Préparer les sources locales
```bash
mkdir -p scripts/sources/{monde}
# Copier les meilleures images : {id}.jpg
cp ~/Downloads/perso1.jpg scripts/sources/{monde}/perso1.jpg
```

#### 1b. Mettre à jour scripts/assets/{monde}.json
```json
{
  "name": "Nom du Monde",
  "storage": "supabase",
  "bucket": "nom-du-bucket",
  "localDir": null,
  "color": "#e63946",
  "characters": [
    { "id": "perso1", "name": "Perso 1", "type": "hero", "path": "characters/perso1.jpg", "jikanId": 0 }
  ]
}
```

**⚠️ Extensions : vérifier les extensions réelles des fichiers (.jpg/.png/.gif)**

#### 1c. Dry-run obligatoire avant upload
```bash
node scripts/upload.js --world={monde} --dry-run --sources-only
# Vérifier : bonnes extensions, bon bucket, bons chemins
```

#### 1d. Upload réel
```bash
SUPABASE_SERVICE_KEY=eyJ... node scripts/upload.js --world={monde} --sources-only
# ✅ Succès : 26 / 0 échecs → parfait
# ❌ Si échecs → vérifier les sources dans scripts/sources/{monde}/
```

**⚠️ Règle ADM-02 : la SERVICE_KEY ne va JAMAIS dans le code ni dans git**

#### 1e. Vérifier les URLs dans Supabase Dashboard
```
Supabase → Storage → bucket → characters → clic sur image → Copy URL
Tester l'URL dans le navigateur → image s'affiche ✅
```

---

### PHASE 2 — Base de données (DB-01)

**⚠️ Règle DB-01 : Migration SQL AVANT tout code qui lit ces tables**

#### 2a. Structure SQL obligatoire
```sql
-- 1. Matière
INSERT INTO matieres (code, nom, emoji, couleur, monde_id)
VALUES ('{code}', '{Nom}', '{emoji}', '{couleur}', '{monde_id}');

-- 2. Niveaux (si pas déjà créés)
INSERT INTO niveaux (code, nom, ordre, emoji)
VALUES ('cm2','CM2',1,'⭐'), ('6eme','6ème',2,'⭐⭐') ...

-- 3. Chapitres — 8 HÉROS UNIQUES PAR NIVEAU ⚠️
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic,
  hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 1, 'Île de Perso1', 'Notion 1', 'Perso1',
  'https://{supabase}/storage/v1/object/public/{bucket}/characters/perso1.jpg',
  '{monde}-map', 'Boss1', '{couleur}', 1
FROM matieres m, niveaux n WHERE m.code='{code}' AND n.code='cm2';
-- Répéter pour les 8 îles avec 8 héros DIFFÉRENTS

-- 4. Questions (11 par chapitre — structure PED-01)
-- Q1-3 : notion principale (difficulté 1)
-- Q4-6 : approfondissement (difficulté 2)
-- Q7-9 : pièges classiques (difficulté 2-3)
-- Q10  : application contexte
-- Q11  : BOSS — synthèse complète

-- 5. Leçons
INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, hero_tip, warmup)
...
```

#### 2b. Règle critique — 8 héros UNIQUES par niveau
```sql
-- ❌ INTERDIT — même personnage 2 fois dans le même niveau
{1:'nami', 2:'luffy', 3:'robin', 4:'zoro', 5:'nami'...} -- nami répété !

-- ✅ CORRECT — 8 personnages différents
{1:'nami', 2:'luffy', 3:'robin', 4:'zoro', 5:'ace', 6:'shanks', 7:'law', 8:'brook'}
```

#### 2c. Vérification après migration
```sql
SELECT n.code, c.numero, c.hero_name, c.hero_image
FROM chapitres c
JOIN matieres m ON c.matiere_id = m.id
JOIN niveaux n ON c.niveau_id = n.id
WHERE m.code = '{code}'
ORDER BY n.ordre, c.numero;
-- Vérifier : 8 héros uniques par niveau, URLs Supabase correctes
```

---

### PHASE 3 — Quiz Router (copier quiz-router-grand-bleu.js)

**Copier `js/worlds/grand-bleu/quiz-router.js` et adapter ces 5 éléments :**

```javascript
// ── 1. Variables de base ──
var MATIERE_CODE = 'francais';          // → '{votre_code}'
var STORAGE_GB   = 'https://.../grand-bleu/'; // → '.../{votre_bucket}/'
var PREFIX       = 'gb';               // → '{monde}' (pour IDs HTML)

// ── 2. Cinématiques CIN-01 — clé 'niveau_numero' OBLIGATOIRE ──
var {MONDE}_ISLE_INTRO = {
  'cm2_1': { bg:'#...', lines:[...], kanji:'漢字', kanjiColor:'#...', bubble:"..." },
  // 40 entrées (5 niveaux × 8 îles) — bulle UNIQUE par île/niveau
  // ❌ JAMAIS copier-coller la même bulle d'un niveau à l'autre
};

// ── 3. Niveaux disponibles ──
var NIVEAUX = [
  { code:'cm2', nom:'CM2', emoji:'⭐', color:'#...', desc:'...' },
  // Ajouter les niveaux disponibles
];

// ── 4. IDs HTML — préfixe isolé (AU-02) ──
// Remplacer gb-* par {monde}-*
// gb-levels-sec → {monde}-levels-sec
// gb-iles-sec   → {monde}-iles-sec
// gb-quiz-sec   → {monde}-quiz-sec

// ── 5. Exports globaux ──
window.show{Monde}V2  = show{Monde}V2;
window.{monde}_showLevel    = showLevel;
window.{monde}_showLevels   = function(){ show{Monde}V2(true); };
window.{monde}_startIsland  = startIsland;
window.{monde}_skipCine     = skipCine;
```

**Règles critiques du router :**
```javascript
// ✅ CIN-01 — clé niveau_numero
var cfg = ISLE_INTRO[_currentNiveau + '_' + ch.numero]; // 'cm2_1', '6eme_3'...
// ❌ JAMAIS
var cfg = ISLE_INTRO[ch.numero]; // même cinématique pour tous les niveaux

// ✅ onerror ANTI-BOUCLE INFINIE
'onerror="this.onerror=null;this.src=\'fallback.jpg\'"'
// ❌ JAMAIS — crée une boucle infinie
'onerror="this.src=\'fallback.jpg\'"'

// ✅ AU-04 — BGM après leçon
lesson_xxx(niveau, numero, function() {
  playBGM(ch.bgm || 'map'); // DANS le callback
  _playCinematic(ch, ...);
});
```

---

### PHASE 4 — Lesson Data (copier lesson-data-grand-bleu.js)

```javascript
window.LESSON_REGISTRY['{monde}'] = {
  color: '{couleur}', bg: '{bg-dark}', textAccent: '{accent}',
  particles: 'water', // 'water' | 'fire' | 'sword' | 'star'
  worldName: '{Nom du monde}',

  avatar: function(n) {
    // ⚠️ 8 personnages UNIQUES — jamais le même 2 fois
    var map = {1:'perso1', 2:'perso2', 3:'perso3', 4:'perso4',
               5:'perso5', 6:'perso6', 7:'perso7', 8:'perso8'};
    return 'https://{supabase}/storage/v1/object/public/{bucket}/characters/'
           + (map[n] || 'perso1') + '.jpg';
  },

  lessons: {
    1: {
      heroName: 'Perso1',
      heroQuote: 'Citation mémorable liée à la notion !',
      rule: 'La règle en UNE PHRASE — ce que l\'enfant doit retenir',
      sections: [ /* max 3 sections */ ],
      heroTip: 'Astuce mnémotechnique en 1 phrase !',
      warmup: [
        { q: 'Question 1 ?', a: 'Bonne réponse', o: ['Bonne réponse', 'Mauvaise 1', 'Mauvaise 2'] },
        { q: 'Question 2 ?', a: 'Bonne réponse', o: ['Bonne réponse', 'Mauvaise A', 'Mauvaise B'] }
      ]
      // ⚠️ PED-01 : warmup = UNIQUEMENT les notions de CETTE leçon
    }
  }
};
```

---

### PHASE 5 — Intégration (copier le pattern Grand Bleu)

#### 5a. index.html — Sections HTML
```html
<!-- IDs stables — préfixe isolé {monde} -->
<div id="{monde}-bg"></div>
<section id="{monde}-levels-sec" style="display:none"></section>
<section id="{monde}-iles-sec"   style="display:none"></section>
<section id="{monde}-quiz-sec"   style="display:none">
  <div class="{monde}-quiz-header">
    <div class="{monde}-quiz-title" id="{monde}-qTitle">QUIZ</div>
    <div class="{monde}-prog-bar"><div class="{monde}-prog-fill" id="{monde}-qProgFill" style="width:0%"></div></div>
    <div class="{monde}-prog-lbl" id="{monde}-qProgLbl">0 / 0</div>
  </div>
  <div id="{monde}-qContainer"></div>
</section>
```

#### 5b. index.html — Ordre des scripts (ORDRE SACRÉ)
```html
<!-- Audio AVANT lesson-data -->
<script src="js/worlds/{monde}/audio.js"></script>
<!-- Lesson-data AVANT quiz-router -->
<script src="js/worlds/{monde}/lesson-data.js"></script>
<!-- Quiz-router AVANT router.js -->
<script src="js/worlds/{monde}/quiz-router.js"></script>
```

#### 5c. router.js — Ajouter la route
```javascript
function show{Monde}(silent) {
  if (!silent) history.pushState(null, '', '#/{route}');
  hideAll();
  if (typeof show{Monde}V2 === 'function') show{Monde}V2();
}
// Dans SEO_ROUTES :
'#{route}/cm2':  { title: 'Académie Pirate — {Matière} CM2', desc: '...' },
'#{route}/6eme': { title: 'Académie Pirate — {Matière} 6ème', desc: '...' },
```

#### 5d. config.js — Activer
```javascript
worlds: { '{monde}': { active: true, beta: false } }
```

#### 5e. data/avatars.json — Ajouter les personnages
```json
{
  "id": "perso1",
  "name": "Nom Perso",
  "universe": "{univers}",
  "color": "#e63946",
  "quote": "Citation courte",
  "quote_lesson": "Citation pour la leçon",
  "img": "https://{supabase}/storage/v1/object/public/{bucket}/characters/perso1.jpg"
}
```
**⚠️ JAMAIS de chemins locaux `assets/images/...` dans avatars.json — AU-01**

---

### PHASE 6 — CSS (copier quiz-grand-bleu.css)

```css
/* Préfixe isolé — AU-02 */
.{monde}-map-header { ... }
.{monde}-islands-grid { ... }
.{monde}-isle-card { ... }
.{monde}-bg-strip { ... }
/* Cinématique */
.{monde}-cine-inner { ... }
/* Quiz */
.{monde}-quiz-header { ... }
```

---

### PHASE 7 — Checklist PR-00 avant git push

```bash
# 1. Validation syntaxe — OBLIGATOIRE
node --check js/worlds/{monde}/audio.js
node --check js/worlds/{monde}/lesson-data.js
node --check js/worlds/{monde}/quiz-router.js
node --check js/router.js
# → 0 erreur autorisée

# 2. Vérifier les assets Supabase
# → Ouvrir chaque URL hero_image dans le navigateur

# 3. Test flow complet en local
# → Globe → monde → niveau → leçon → cinématique → quiz → résultats

# 4. Vérifier zéro régression V1
# → Grand Bleu fonctionne encore ✅
# → Magnolia fonctionne encore ✅
# → etc.

# 5. Console navigateur sur prod
# → 0 erreur rouge
# → 0 image 404
# → 0 boucle infinie onerror

# 6. Push
git add js/worlds/{monde}/ css/quiz-{monde}.css index.html router.js config.js data/avatars.json
git commit -m "feat: monde {Monde} V2 — {Matière} × {Univers} · CM2→4ème"
git push
```

---

## PIÈGES CONNUS — Ne jamais répéter

### 🐛 Piège #1 — Extensions d'images
```javascript
// ❌ Supposer que c'est .png
'assets/images/avatars/luffy.png' // → 404 si le fichier est .jpg

// ✅ Vérifier l'extension réelle
ls assets/images/avatars/ | grep luffy
// → luffy.jpg → utiliser .jpg
```

### 🐛 Piège #2 — onerror boucle infinie
```javascript
// ❌ Crée une boucle infinie si fallback aussi 404
onerror="this.src='assets/images/luffy.png'"

// ✅ Stoppe la boucle
onerror="this.onerror=null;this.src='assets/images/luffy.jpg'"
```

### 🐛 Piège #3 — CIN-01 niveau manquant
```javascript
// ❌ Même cinématique CM2 pour tous les niveaux
var cfg = ISLE_INTRO[ch.numero]; // → bug confirmé prod 2 avril 2026

// ✅ Clé niveau_numero obligatoire
var cfg = ISLE_INTRO[_currentNiveau + '_' + ch.numero]; // 'cm2_1', '6eme_3'
```

### 🐛 Piège #4 — Héros répétés dans la grille
```javascript
// ❌ Même personnage 2 fois dans le même niveau
map = {1:'nami', 2:'luffy', 5:'nami', 6:'luffy'} // répétitions visuelles

// ✅ 8 personnages uniques par niveau
map = {1:'nami', 2:'luffy', 3:'robin', 4:'zoro', 5:'ace', 6:'shanks', 7:'law', 8:'brook'}
```

### 🐛 Piège #5 — Assets locaux dans avatars.json
```json
// ❌ Viole AU-01 — crée des 404 sur GitHub Pages
{ "img": "assets/images/avatars/luffy.png" }

// ✅ URL Supabase complète
{ "img": "https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/grand-bleu/characters/luffy.jpg" }
```

### 🐛 Piège #6 — upload.js n'utilise pas les sources locales
```bash
# ❌ Sans --sources-only → cherche sur Jikan → 0 résultat
SUPABASE_SERVICE_KEY=... node scripts/upload.js --world=one-piece

# ✅ Avec --sources-only → utilise scripts/sources/{monde}/
SUPABASE_SERVICE_KEY=... node scripts/upload.js --world=one-piece --sources-only
```

### 🐛 Piège #7 — Avatar enfant = Luffy par défaut
```javascript
// ❌ AP.state non initialisé → Luffy par défaut dans les leçons
// Cause : afLaunchChild ne met pas à jour AP.state

// ✅ Dans afLaunchChild (auth.js)
if (window.AP && window.AP.state) {
  window.AP.state.initFromChild(child); // ← OBLIGATOIRE
}
```

### 🐛 Piège #8 — PIN enfant numérique seulement
```html
<!-- ❌ 6 cases numériques → ne supporte pas les codes alphanumériques -->
<input type="tel" maxlength="1" inputmode="numeric">

<!-- ✅ Champ unique alphanumérique 4-8 caractères -->
<input type="text" id="login-child-pin-field" minlength="4" maxlength="8"
  autocapitalize="characters" oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'')">
```

---

### 🐛 Piège #9 — Inventer le format d'un fichier (JSON/SQL/JS) sans vérifier l'existant

```bash
# ❌ ERREUR (22/05/2026) — création scripts/assets/sindria.json
# J'ai inventé un format avec subject/universe/level qui n'existe pas
{ "name": "...", "subject": "...", "universe": "...", "characters": [...] }

# ✅ CORRECT — TOUJOURS lire un fichier équivalent existant AVANT de créer
ls scripts/assets/                      # voir ce qui existe
cat scripts/assets/aot.json | head -30  # voir le VRAI format
# → puis copier le format exact (name/emoji/storage/bucket/localDir/color/characters[])
```

**Règle générale** : tout fichier dans une catégorie où il existe déjà des frères
(scripts/assets/*.json, supabase/migrations/*.sql, js/worlds/*/audio.js, css/quiz-*.css)
DOIT copier le format de ses frères. ZÉRO invention.

### 🐛 Piège #10 — Confusion {manga} vs {monde} dans les conventions de nommage
❌ ERREUR (22/05/2026) — j'ai créé sindria.json et scripts/sources/sindria/
La convention RÉELLE = nom du manga (pas du monde)
✅ TABLE DE MAPPING OBLIGATOIRE par monde :
ÉlémentConventionExemple "Sindria"scripts/assets/{X}.jsonNOM DU MANGAmagi.jsonscripts/sources/{X}/NOM DU MANGAmagi/js/worlds/{X}/NOM DU MONDEjs/worlds/sindria/css/quiz-{X}.cssNOM DU MONDEcss/quiz-sindria.cssbucket SupabaseNOM DU BUCKETisland-sindriaURL #/{route}NOM ROUTE#/arabe

**Vérification post-création** :
```bash
# AUCUN résultat ne doit apparaître :
grep -r "public/{NOM_MONDE_SI_DIFFERENT_DU_BUCKET}" js/ css/

# Au moins quelques résultats doivent apparaître :
grep -r "public/{NOM_DU_BUCKET}" js/ css/
```

---

### 🐛 Piège #11 — OUTPUT-01 : ne JAMAIS morceler les longs livrables

Quand un livrable fait plus de 50 lignes (doc .md, SQL, patch JS), Claude DOIT créer
le fichier complet en UN SEUL artefact téléchargeable. JAMAIS de heredoc bash long
à copier-coller dans le terminal.

**Raison** : les heredocs longs causent des erreurs de coupure, caractères mal
échappés (quotes, backticks, dollars), et mélanges avec le prompt.

Voir ARCHITECTURE_AUTH_V2.md pour le contexte.

---


## MAPPING PERSONNAGES — Grand Bleu référence

```javascript
// ✅ Pattern validé — 8 uniques par niveau, jamais de répétition
CM2  : {1:'nami',    2:'luffy',   3:'robin',   4:'zoro',
        5:'ace',     6:'shanks',  7:'law',     8:'brook'}

6ème : {1:'sanji',   2:'chopper', 3:'usopp',   4:'franky',
        5:'vivi',    6:'hancock', 7:'jinbe',   8:'sabo'}

5ème : {1:'mihawk',  2:'law',     3:'ace',     4:'whitebeard',
        5:'brook',   6:'franky',  7:'vivi',    8:'usopp'}

4ème : {1:'robin',   2:'zoro',    3:'nami',    4:'luffy',
        5:'sanji',   6:'franky',  7:'brook',   8:'ace'}

3ème : {1:'shanks',  2:'law',     3:'chopper', 4:'hancock',
        5:'vivi',    6:'usopp',   7:'jinbe',   8:'sabo'}
```

---

## ORDRE SACRÉ DES SCRIPTS — index.html

```html
<!-- Ce qui doit TOUJOURS être dans cet ordre : -->
1.  config.js
2.  supabase.js
3.  db.js
4.  core/events.js · core/state.js · core/api.js
5.  audio-engine.js
6.  js/worlds/{monde}/audio.js          ← audio AVANT lesson-data
7.  js/worlds/{monde}/lesson-data.js    ← lesson-data AVANT quiz-router
8.  js/worlds/{monde}/quiz-router.js    ← quiz-router AVANT router.js
9.  js/components/avatar-picker.js
10. js/engine/quiz-engine.js
11. router.js
12. supabase-patch.js                   ← TOUJOURS EN DERNIER
```

---

## ÉTAT DES MONDES — 21 Mai 2026 (mise à jour)

| Monde | Matière | Univers | Pattern V2 | CM2 | 6ème | 5ème | 4ème | 3ème |
|---|---|---|---|---|---|---|---|---|
| 🏴‍☠️ Grand Bleu | Français | One Piece | ✅ RÉFÉRENCE | ✅ | ✅ | ✅ | ✅ | ✅ |
| ⚔️ English | Anglais | AOT | ✅ V2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 🐉 Magnolia | Histoire | Dragon Ball Z | ✅ V2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| ⚔️ Kanto | Sciences | Demon Slayer | ✅ V2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 🔥 Pays du Feu | Maths | Naruto | ✅ V2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 🔮 Namek | Géographie | JJK | ✅ V2 | ✅ | ✅ | ✅ | ✅ | ✅ |

🏆 **TOUS LES 6 MONDES SONT EN V2 — 5 NIVEAUX × 8 ÎLES × 6 MONDES = 240 LEÇONS**

### Vérification (21 mai 2026)
- `js/worlds/{monde}/quiz-router.js` existe pour tous les 6 mondes ✅
- `LESSON_REGISTRY['{monde}_{niveau}']` × 5 niveaux pour magnolia/kanto/namek (autres formats internes pour english/grand-bleu/pays-du-feu) ✅
- Buckets Supabase Storage opérationnels :
  - `island-aot` (english)
  - `grand-bleu` (français)
  - `island-magnolia` (histoire)
  - `island-demon-slayer` (kanto)
  - `island-pays-du-feu` (maths)
  - `island-namek` (géographie)
- Test prod fonctionnel : tous mondes jouables sur https://aca-pirate.ch ✅

### Mondes futurs (à créer)
- 🌲 Forêt Konoha (matière à définir) — actuellement dans config.js mais `active: false`

---

*Ce document doit être consulté EN PREMIER avant tout développement d'un nouveau monde.*
*Règle PR-00 : tout livrable est production ready avant commit.*

*Grand Bleu Pattern V1.2 — Académie Pirate — créé 12 Avril 2026, mis à jour 22 Mai 2026 (+ pièges #9/#10 sur conventions de nommage et formats)*
