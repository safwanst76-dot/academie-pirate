# ACADÉMIE PIRATE — ARCHITECTURE V2
*Document de référence — À lire en priorité avant tout développement*
*Version : 2.0 | Date : 31 Mars 2026*

---

## VISION GLOBALE

Académie Pirate V2 transforme l'app d'une collection de quiz statiques vers une **plateforme pédagogique complète** couvrant le programme officiel Éducation Nationale française CM2 → 4ème, avec :
- Contenu enrichissable depuis l'admin **sans toucher au code**
- Leçons **interactives gamifiées** (mini-jeux)
- Questions stockées en **Supabase DB** (plus de hardcoding JS)
- Architecture **réutilisable** pour tous les mondes

---

## CE QUI CHANGE — V1 → V2

| Aspect | V1 (actuel) | V2 (cible) |
|---|---|---|
| Questions | Hardcodées en JS | Supabase DB |
| Leçons | Texte statique | Interactives + mini-jeux |
| Contenu | Figé dans le code | Ajoutables depuis admin |
| Îles | 8 fixes par monde | ∞ ajoutables |
| Niveaux | 1 par monde | CM2/6ème/5ème/4ème |
| Quiz engine | 1 fichier par monde | 1 engine réutilisable |

---

## ARCHITECTURE DB — TABLES SUPABASE

```sql
-- ══════════════════════════════════════
-- TABLE 1 : matieres
-- ══════════════════════════════════════
CREATE TABLE matieres (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code        text UNIQUE NOT NULL,  -- 'french', 'english', 'maths', 'histoire', 'sciences'
  nom         text NOT NULL,         -- 'Français', 'Anglais', etc.
  emoji       text,                  -- '🏴‍☠️'
  couleur     text,                  -- '#e63946'
  monde_id    text,                  -- lien vers globe.js continent id
  actif       boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- ══════════════════════════════════════
-- TABLE 2 : niveaux
-- ══════════════════════════════════════
CREATE TABLE niveaux (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code        text UNIQUE NOT NULL,  -- 'cm2', '6eme', '5eme', '4eme'
  nom         text NOT NULL,         -- 'CM2', '6ème', '5ème', '4ème'
  ordre       integer NOT NULL,      -- 1, 2, 3, 4
  emoji       text                   -- '⭐', '⭐⭐', etc.
);

-- ══════════════════════════════════════
-- TABLE 3 : chapitres (= îles)
-- ══════════════════════════════════════
CREATE TABLE chapitres (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  matiere_id      uuid REFERENCES matieres(id),
  niveau_id       uuid REFERENCES niveaux(id),
  numero          integer NOT NULL,      -- 1 à 8 (ou plus)
  nom             text NOT NULL,         -- 'Île de l'Alphabet'
  topic           text NOT NULL,         -- 'Alphabet & Phonétique'
  description     text,
  hero_name       text,                  -- 'Eren Jäger'
  hero_image      text,                  -- URL Supabase Storage
  bgm             text,                  -- 'aot-map'
  boss_name       text,                  -- 'Titan Colossal'
  boss_image      text,                  -- URL image boss
  ile_color       text,                  -- couleur de l'île
  actif           boolean DEFAULT true,
  ordre_affichage integer,
  created_at      timestamptz DEFAULT now()
);

-- ══════════════════════════════════════
-- TABLE 4 : questions
-- ══════════════════════════════════════
CREATE TABLE questions (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  chapitre_id     uuid REFERENCES chapitres(id) ON DELETE CASCADE,
  question        text NOT NULL,
  options         jsonb NOT NULL,        -- ["option A", "option B", "option C", "option D"]
  reponse         text NOT NULL,         -- la bonne réponse (texte exact d'une option)
  explication     text,                  -- explication après réponse
  type            text DEFAULT 'qcm',    -- 'qcm' | 'vrai_faux' | 'texte_trou' | 'boss'
  is_boss         boolean DEFAULT false, -- dernière question de l'île
  difficulte      integer DEFAULT 1,     -- 1=facile, 2=moyen, 3=difficile
  ordre           integer,               -- position dans le quiz
  actif           boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

-- ══════════════════════════════════════
-- TABLE 5 : lecons
-- ══════════════════════════════════════
CREATE TABLE lecons (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  chapitre_id     uuid REFERENCES chapitres(id) ON DELETE CASCADE,
  hero_name       text,
  hero_quote      text,
  slides          jsonb,    -- [{icon, title, color, content, examples[]}]
  mini_jeux       jsonb,    -- [{type, data, xp_reward}]
  hero_tip        text,
  warmup          jsonb,    -- [{q, a, o[]}]
  actif           boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

-- ══════════════════════════════════════
-- TABLE 6 : mini_jeux_types (référence)
-- ══════════════════════════════════════
-- Pas de table séparée — les mini-jeux sont dans lecons.mini_jeux (jsonb)
-- Types supportés (dans le JSON) :
--   'flashcards'    : retourner pour voir la réponse
--   'tri_mots'      : glisser dans la bonne catégorie
--   'association'   : relier terme ↔ définition
--   'texte_trous'   : cliquer le bon mot manquant
--   'vrai_faux'     : swipe left/right rapide
```

---

## STRUCTURE DES FICHIERS JS — V2

```
js/
├── worlds/
│   ├── english/
│   │   ├── audio.js          ✅ FAIT — patch audio aot-*
│   │   ├── lesson-data.js    ✅ FAIT — données leçons (migration DB progressive)
│   │   ├── quiz-router.js    🔜 navigation niveaux + interface sélection
│   │   └── quiz-engine.js    🔜 moteur quiz lecture DB (réutilisable tous mondes)
│   ├── namek/                ✅ Quiz hardcodé V1 — ne pas toucher
│   ├── kanto/                ✅ Quiz hardcodé V1 — ne pas toucher
│   ├── pays-du-feu/          ✅ Quiz hardcodé V1 — ne pas toucher
│   └── magnolia/             ✅ Quiz hardcodé V1 — ne pas toucher
│
├── engine/                   🔜 NOUVEAU — moteurs réutilisables
│   ├── quiz-engine.js        🔜 Charge questions depuis DB, gère le quiz
│   ├── lesson-engine.js      🔜 Gère le flow leçon + mini-jeux
│   └── minigames/
│       ├── flashcards.js     🔜 Type 1 : Flashcards retournables
│       ├── tri-mots.js       🔜 Type 2 : Glisser-déposer catégories
│       ├── association.js    🔜 Type 3 : Relier terme ↔ définition
│       ├── texte-trous.js    🔜 Type 4 : Cliquer le mot manquant
│       └── vrai-faux.js      🔜 Type 5 : Swipe vrai/faux rapide
│
└── features/
    ├── push-notifications.js ✅ FAIT
    ├── badges.js             ✅ FAIT
    ├── session-recap.js      ✅ FAIT
    └── child-profile.js      ✅ FAIT
```

---

## FLOW COMPLET — Expérience enfant V2

```
Globe (carte du monde)
    ↓ clic sur un monde
Sélection du niveau (CM2 / 6ème / 5ème / 4ème)
    ↓ clic sur un niveau
Grille des îles (chapitres actifs depuis DB)
    ↓ clic sur une île
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CINÉMATIQUE INTRO (2-3s)
   → Personnage AoT apparaît
   → Quote motivante
   → Titre du chapitre
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. LEÇON INTERACTIVE (~3-5 min)
   ├── Slide 1 : Règle + exemples (texte animé)
   ├── 🎮 MINI-JEU 1 : selon le type de leçon
   ├── Slide 2 : Approfondissement
   ├── 🎮 MINI-JEU 2
   ├── Slide 3 : Astuce du héros
   └── 🎮 MINI-JEU 3 : Échauffement (2 questions warmup)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. QUIZ PRINCIPAL (11 questions depuis DB)
   ├── Questions 1-10 : QCM + feedback
   └── Question 11 : BOSS BATTLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. RÉSULTATS
   ├── Score + étoiles
   ├── GIF (perfect / win / lose)
   ├── XP gagné
   └── Session recap → retour carte
```

---

## MINI-JEUX — Spécifications détaillées

### Type 1 — Flashcards 🃏
```javascript
// Données JSON dans lecons.mini_jeux
{
  type: "flashcards",
  titre: "Vocabulaire de l'alphabet",
  xp_reward: 5,
  cartes: [
    { recto: "A", verso: "[eɪ] — comme dans 'age'" },
    { recto: "B", verso: "[biː] — comme dans 'bee'" },
    // ...
  ]
}
// Interaction : clic = retournement 3D
// Validation : swipe right (connu) / left (à revoir)
```

### Type 2 — Tri de mots 🔀
```javascript
{
  type: "tri_mots",
  titre: "Voyelles ou consonnes ?",
  xp_reward: 8,
  categories: ["Voyelles", "Consonnes"],
  elements: [
    { texte: "A", categorie: "Voyelles" },
    { texte: "B", categorie: "Consonnes" },
    // ...
  ]
}
// Interaction : drag & drop ou tap pour sélectionner puis placer
```

### Type 3 — Association 🔗
```javascript
{
  type: "association",
  titre: "Lettre → Prononciation",
  xp_reward: 6,
  paires: [
    { gauche: "H", droite: "[eɪtʃ]" },
    { gauche: "W", droite: "[ˈdʌbəljuː]" },
    // max 6 paires simultanées
  ]
}
// Interaction : tap gauche puis tap droite pour relier
```

### Type 4 — Texte à trous 🕳️
```javascript
{
  type: "texte_trous",
  titre: "Complète la phrase",
  xp_reward: 7,
  phrases: [
    {
      texte: "My name ___ Eren.",
      trou: 1,  // position du mot manquant (index)
      options: ["is", "are", "am", "be"],
      reponse: "is"
    }
  ]
}
// Interaction : tap sur le trou → affiche les options → tap pour choisir
```

### Type 5 — Vrai/Faux rapide ⚡
```javascript
{
  type: "vrai_faux",
  titre: "Vrai ou Faux ?",
  xp_reward: 5,
  chrono: 5,  // secondes par question
  affirmations: [
    { texte: "The plural of 'child' is 'childs'", reponse: false },
    { texte: "She HAS a dog → correct", reponse: true },
    // ...
  ]
}
// Interaction : bouton VRAI vert / FAUX rouge avec timer visuel
```

---

## ADMIN V2 — Onglet Contenu

### Interface éditeur de contenu

```
Admin.html
├── 📊 Dashboard (existant)
├── 📣 Notifications (existant)
└── 📚 CONTENU (nouveau)
    ├── Sélecteur : Monde | Niveau | Chapitre
    ├── Onglet QUESTIONS
    │   ├── Liste des questions (drag pour réordonner)
    │   ├── + Ajouter une question
    │   │   ├── Champ question
    │   │   ├── 4 options (A/B/C/D)
    │   │   ├── Sélecteur bonne réponse
    │   │   ├── Explication (optionnel)
    │   │   ├── Type (QCM / Boss / Vrai-Faux / Texte à trous)
    │   │   └── Difficulté (⭐/⭐⭐/⭐⭐⭐)
    │   └── 👁️ Prévisualisation en temps réel
    │       → rendu exact comme dans l'app
    ├── Onglet LEÇON
    │   ├── Éditeur de slides (markdown léger)
    │   ├── Éditeur mini-jeux (+ Ajouter mini-jeu)
    │   └── 👁️ Prévisualisation interactive
    └── Onglet CHAPITRES
        ├── Liste des îles (actif/inactif)
        ├── Réorganiser l'ordre
        └── + Ajouter un chapitre
```

---

## PLAN D'EXÉCUTION — PHASES

### ✅ PHASE 0 — Terminé
- Grand Bleu (Français), Magnolia (Histoire), Kanto (Sciences)
- Pays du Feu (Maths), Namek (Géographie) — quiz V1 hardcodés
- Admin dashboard basique + notifications email + web push

### 🔜 PHASE 1 — En cours (English V2)
**Objectif** : Monde English fonctionnel avec architecture DB
```
1. migration_v9_english.sql   ← tables + données N1 CM2
2. js/engine/quiz-engine.js   ← moteur quiz depuis DB
3. js/worlds/english/quiz-router.js  ← navigation niveaux
4. css/quiz-english.css       ← styles .aot-*
5. index.html + router.js + globe.js + config.js
6. Upload bucket island-aot
```

### 🔒 PHASE 2 — Admin Contenu
**Objectif** : Pouvoir ajouter des questions sans code
```
1. admin.html onglet "Contenu"
2. CRUD questions (ajouter/modifier/supprimer)
3. Prévisualisation en temps réel
4. Remplir N2-N4 English via admin
```

### 🔒 PHASE 3 — Leçons gamifiées
**Objectif** : Mini-jeux dans les leçons
```
1. js/engine/lesson-engine.js
2. js/engine/minigames/flashcards.js
3. js/engine/minigames/tri-mots.js
4. js/engine/minigames/association.js
5. js/engine/minigames/texte-trous.js
6. js/engine/minigames/vrai-faux.js
7. Intégration dans le flow île
```

### 🔒 PHASE 4 — Contenu complet
**Objectif** : Programme complet CM2→4ème toutes matières
```
Remplir via admin (sans code) :
- English : N2 (6ème) + N3 (5ème) + N4 (4ème)
- Namek : N2-N4 Géographie
- Kanto : N2-N4 Sciences
- Pays du Feu : N2-N4 Maths
- Magnolia : N2-N4 Histoire
- Grand Bleu : N2-N4 Français
```

### 🔒 PHASE 5 — Nouveaux mondes
**Objectif** : Compléter la carte du monde
```
🌿 Forêt Konoha → SVT (Naruto)
🌊 Monde Aqua   → Géographie (One Piece)
⚡ Monde Éclair  → Physique-Chimie (My Hero Academia)
```

---

## PROGRAMME OFFICIEL — Référence

### Anglais (monde English — Attack on Titan)
| Niveau | Thèmes principaux |
|---|---|
| CM2 | Alphabet, chiffres, couleurs, animaux, famille, corps, école, météo |
| 6ème | Present simple, BE/HAVE, articles, pluriels, adjectifs, prépositions |
| 5ème | Past simple, present continuous, can/must/should, comparatifs |
| 4ème | Present perfect, will/going to, superlatifs, passif, question tags |

### Français (monde Grand Bleu — One Piece)
| Niveau | Thèmes principaux |
|---|---|
| CM2 | Grammaire base, conjugaison présent/passé, orthographe, dictée |
| 6ème | Nature des mots, fonctions, conjugaison, ponctuation |
| 5ème | Subjonctif, conditionnel, figures de style, lecture |
| 4ème | Argumentation, stylistique, littérature, expression écrite |

### Maths (monde Pays du Feu — Naruto)
| Niveau | Thèmes principaux |
|---|---|
| CM2 | Opérations, fractions, géométrie base, mesures, numération |
| 6ème | Fractions avancées, proportionnalité, géométrie, statistiques |
| 5ème | Nombres relatifs, équations, géométrie dans l'espace, probabilités |
| 4ème | Puissances, théorème de Pythagore, fonctions, trigonométrie |

### Histoire-Géo (monde Magnolia/Namek)
| Niveau | Thèmes principaux |
|---|---|
| CM2 | Antiquité, Gaule, Rome, Moyen Âge |
| 6ème | Préhistoire, Antiquité orientale, Grèce, Rome, début christianisme |
| 5ème | Moyen Âge, Renaissance, Réformes, Grandes découvertes |
| 4ème | Révolutions, XIXe siècle, industrialisation, colonisation |

### Sciences (monde Kanto — Demon Slayer)
| Niveau | Thèmes principaux |
|---|---|
| CM2 | États de la matière, cycles naturels, corps humain, animaux |
| 6ème | Signaux, lumière, électricité, Internet, nutrition |
| 5ème | Reproduction, géologie, chimie base, forces, mouvements |
| 4ème | Énergie, optique, chimie organique, corps humain avancé |

---

## RÈGLES ARCHITECTURALES V2

### Règle DB-01 — Questions en base
Toutes les nouvelles questions sont en Supabase DB.
Les anciens mondes (V1) gardent leurs questions hardcodées — **zéro régression**.

### Règle DB-02 — Engine réutilisable
`js/engine/quiz-engine.js` est utilisé par TOUS les nouveaux mondes.
Pas de duplication de logique quiz entre les mondes.

### Règle DB-03 — Migration progressive
Les mondes V1 migrent vers DB **uniquement** quand on les enrichit.
Ne pas migrer un monde V1 qui fonctionne sans raison.

### Règle LG-01 — Leçon avant quiz
Chaque île a obligatoirement une leçon avant le quiz.
La leçon peut être simplifiée (slides seulement) en V1, gamifiée en V2.

### Règle LG-02 — Mini-jeux optionnels
Les mini-jeux sont optionnels (skip possible) pour ne pas bloquer l'enfant.
XP bonus accordé si le mini-jeu est complété.

### Règle ADM-01 — Contenu sans code
Tout nouveau contenu pédagogique (questions, leçons, chapitres) doit
être créable depuis l'admin sans modifier le code JS.

### Règle ADM-02 — Prévisualisation obligatoire
L'éditeur admin affiche un rendu temps réel identique à l'app.

---

## ASSETS — Référence complète

### Buckets Supabase Storage
| Bucket | Monde | Contenu |
|---|---|---|
| `grand-bleu` | Grand Bleu | Audio (map, battle, victory...) |
| `island-magnolia` | Magnolia | Audio (map, battle, dbz-isle...) |
| `island-demon-slayer` | Kanto | Audio + characters/ |
| `island-pays-du-feu` | Pays du Feu | Audio + characters/ + gifs/ |
| `island-namek` | Namek | characters/ + music/ |
| `island-aot` | English | characters/ + music/ + gifs/ 🔜 |

### Personnages Attack on Titan
```
characters/ :
  armin.jpg · connie.jpg · eren.jpeg · erwin.jpg · hange.jpeg
  historia.png · jean.jpg · levi.jpg · mikasa.gif · sasha.jpeg
```

### Musiques Attack on Titan
```
music/ :
  aot-map.mp3 · aot-battle.mp3 · aot-victory.mp3
  aot-boss.mp3 · aot-isle.mp3 · aot-defeat.mp3
```

### GIFs Attack on Titan
```
gifs/ :
  aot-perfect-1/2/3.gif (score 11/11)
  aot-win-1/2/3/4/5.gif (score ≥7/11)
  aot-lose-1/2/3.gif    (score <7/11)
```

---

## ÉTAT ACTUEL — 31 Mars 2026

| Fichier | Status | Notes |
|---|---|---|
| `js/worlds/english/audio.js` | ✅ FAIT | Bucket island-aot/music/ |
| `js/worlds/english/lesson-data.js` | ✅ FAIT | 32 leçons CM2→4ème |
| `js/worlds/english/quiz-router.js` | 🔜 À FAIRE | |
| `js/engine/quiz-engine.js` | 🔜 À FAIRE | |
| `css/quiz-english.css` | 🔜 À FAIRE | |
| `index.html` modifications | 🔜 À FAIRE | |
| `router.js` modifications | 🔜 À FAIRE | |
| `globe.js` + `config.js` | 🔜 À FAIRE | |
| `migration_v9_english.sql` | 🔜 À FAIRE | |
| Admin onglet Contenu | 🔜 Phase 2 | |
| Leçons gamifiées / mini-jeux | 🔜 Phase 3 | |

---

## PROCHAINES ACTIONS IMMÉDIATES

```
1. Créer migration_v9_english.sql
   → Tables : matieres, niveaux, chapitres, questions, lecons
   → Insérer données English Niveau 1 CM2 (8 chapitres × 11 questions = 88 questions)

2. Créer js/engine/quiz-engine.js
   → Charge chapitres depuis DB pour un monde+niveau donné
   → Charge questions depuis DB pour un chapitre donné
   → Gère le flow quiz (sélection, correction, score, XP)
   → Compatible avec l'architecture de session-recap.js existant

3. Créer js/worlds/english/quiz-router.js
   → showEnglish() → écran sélection niveau
   → showAotLevel(N) → grille îles du niveau N
   → showAotIsland(chapitreId) → lance quiz-engine.js

4. Créer css/quiz-english.css
   → Préfixe .aot-*
   → Couleurs : #4a5c3f (kaki), #8b6914 (marron), #0a0a0a (noir)
   → Inclure styles écran sélection niveau (.aot-level-card)

5. Modifications index.html + router.js + globe.js + config.js

6. Upload bucket island-aot dans Supabase

7. Tester le monde English complet
```

---

*Ce document doit être mis à jour à chaque phase complétée.*
*Ne jamais déployer sans relire les Règles Architecturales V2.*
