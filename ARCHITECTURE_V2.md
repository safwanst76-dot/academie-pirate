# ACADÉMIE PIRATE — ARCHITECTURE V2
*Document de référence — À lire en priorité avant tout développement*
*Version : 2.3 | Mise à jour : 3 Avril 2026*

---

## ⚠️ RÈGLE FONDAMENTALE — PRODUCTION READY (PR-00)

**Tout ce qui est développé pour Académie Pirate DOIT être production ready.**

Cela signifie, pour chaque livrable :

```
✅ SYNTAXE VALIDÉE    → node --check fichier.js avant tout commit
✅ ZÉRO ERREUR CONSOLE → pas de TypeError, ReferenceError, 404 assets
✅ FALLBACKS ACTIFS   → onerror sur images, try/catch sur appels DB/API
✅ TESTÉ EN PROD      → vérifier sur l'URL GitHub Pages réelle, pas juste en local
✅ ZÉRO RÉGRESSION    → les mondes V1 fonctionnent encore après chaque modif
✅ ASSETS UPLOADÉS    → images/audio uploadés dans Supabase AVANT déploiement code
✅ DB COHÉRENTE       → migration SQL exécutée AVANT déploiement code qui la lit
✅ CLÉS SÉCURISÉES    → jamais de service_role_key dans le code source ou git
```

**Checklist avant chaque `git push` :**
1. `node --check` sur chaque fichier JS modifié → 0 erreur
2. Ouvrir la console navigateur sur prod → 0 erreur rouge
3. Tester le flow complet de l'île concernée (leçon → ciné → quiz → résultat)
4. Vérifier que les autres mondes (V1) fonctionnent toujours
5. Vérifier que les assets référencés existent dans Supabase Storage

---

## VISION GLOBALE

Académie Pirate V2 transforme l'app d'une collection de quiz statiques vers une **plateforme pédagogique complète** couvrant le programme officiel Éducation Nationale française CM2 → 4ème, avec :
- Contenu enrichissable depuis l'admin **sans toucher au code**
- Leçons **interactives gamifiées** (mini-jeux — Phase 3)
- Questions stockées en **Supabase DB** (plus de hardcoding JS)
- Architecture **réutilisable** pour tous les mondes

---

## CE QUI CHANGE — V1 → V2

| Aspect | V1 (actuel) | V2 (cible) |
|---|---|---|
| Questions | Hardcodées en JS | Supabase DB |
| Leçons | Texte statique | Interactives + mini-jeux (Phase 3) |
| Contenu | Figé dans le code | Ajoutables depuis admin (Phase 2) |
| Îles | 8 fixes par monde | ∞ ajoutables |
| Niveaux | 1 par monde | CM2/6ème/5ème/4ème |
| Quiz engine | 1 fichier par monde | 1 engine réutilisable (js/engine/) |

---

## PATTERN EXACT D'UNE ÎLE — Flow complet implémenté

C'est le pattern de référence. **Ne jamais s'en écarter.**

```
CLIC SUR UNE ÎLE (dans la grille)
    ↓
1. LEÇON (lesson-overlay — js/lesson.js)
   ├── Hero quote animé
   ├── Slides de contenu (règles + exemples)
   ├── Astuce du héros (hero tip)
   ├── 2 questions d'échauffement (warmup)
   └── Bouton "JE SUIS PRÊT — LANCER LE QUIZ !"
    ↓ callback
2. BGM déclenché (playBGM après leçon — règle AU-04)
    ↓
3. CINÉMATIQUE (7 secondes — aot_playCinematic)
   ├── Héros en plein écran (hero_image depuis DB)
   ├── Kanji japonais animé (cfg.kanji + couleur)
   ├── Lignes dramatiques (cfg.lines[])
   ├── Bulle de discours (cfg.bubble) — adaptée à la leçon du niveau
   ├── TTS speechSynthesis.speak(bubble) — lang=fr-FR, rate=0.9, pitch=1.1
   ├── Auto-skip après 7000ms
   └── Bouton "⏭ PASSER"
    ↓ callback
4. QUIZ (js/engine/quiz-engine.js V4)
   ├── Toutes les 11 questions affichées D'UN COUP (innerHTML = html)
   ├── Labels cliquables — sélection marquée visuellement
   ├── Barre de progression mise à jour à chaque réponse
   ├── Bouton "CORRIGER" TOUJOURS visible en bas (pas caché)
   └── Question 11 = BOSS BATTLE (boss_name depuis DB)
    ↓ clic "CORRIGER"
5. CORRECTION
   ├── Labels colorés : vert (bonne réponse) / rouge (mauvaise)
   ├── Feedback ✅/❌ par question
   ├── Explication 💡 affichée sous chaque question
   └── Barre de progression à 100%
    ↓ (PAS de scrollTo — pattern exact V1)
6. RÉSULTATS (ajouté à la FIN du container : innerHTML += html)
   ├── Score X/11 + titre selon score
   ├── Étoiles ⭐ selon score
   ├── GIF animé (perfect/win/lose depuis bucket island-aot/gifs/)
   ├── XP gagné
   ├── Bouton "RETOUR À LA CARTE"
   └── Bouton "REJOUER"
    ↓ scrollIntoView(block:'center') après 400ms
7. RETOUR
   ├── playBGM('aot-map')
   ├── Masquer aot-quiz-sec
   ├── Afficher aot-iles-sec
   └── Grille rechargée avec progression mise à jour
```

### Règle critique du pattern quiz (V1 exact)
```
✅ innerHTML = html     → Remplace TOUT le container (rendu initial)
✅ innerHTML += html    → AJOUTE la result-card À LA FIN
✅ Bouton CORRIGER      → TOUJOURS visible (pas conditionnel)
✅ PAS de scrollTo(0,0) → dans corriger() ou showResults()
✅ scrollIntoView       → block:'center' après 400ms sur resCard
✅ BGM                  → playBGM() APRÈS lesson (callback AU-04)
✅ TTS                  → speechSynthesis.speak(bubble) dans cinématique
```

---

## ARCHITECTURE DB — TABLES SUPABASE

### Tables créées (Migration V9)

```sql
matieres   — code, nom, emoji, couleur, monde_id
niveaux    — code (cm2/6eme/5eme/4eme), nom, ordre, emoji
chapitres  — matiere_id, niveau_id, numero, nom, topic, hero_name,
             hero_image, bgm, boss_name, ile_color, ordre_affichage
questions  — chapitre_id, question, options (jsonb), reponse,
             explication, type (qcm/boss), is_boss, difficulte, ordre
lecons     — chapitre_id, hero_name, hero_quote, slides (jsonb),
             mini_jeux (jsonb), hero_tip, warmup (jsonb)
```

### Vue utilitaire
```sql
v_chapitres_complets — JOIN chapitres + matieres + niveaux + COUNT(questions)
```

### Structure questions.options (jsonb)
```json
["option A", "option B", "option C", "option D"]
```
La réponse = texte exact d'une des options (comparison string).

---

## STRUCTURE DES FICHIERS — État actuel

```
js/
├── worlds/
│   ├── english/
│   │   ├── audio.js          ✅ v1 — patch audio aot-* (Supabase only)
│   │   ├── lesson-data.js    ✅ v1.2 — 32 leçons CM2→4ème + 21 personnages
│   │   └── quiz-router.js    ✅ v2 — nav niveaux + grille + cinématique CIN-01
│   ├── namek/                ✅ Quiz V1 hardcodé — ne pas toucher
│   ├── kanto/                ✅ Quiz V1 hardcodé — ne pas toucher
│   ├── pays-du-feu/          ✅ Quiz V1 hardcodé — ne pas toucher
│   └── magnolia/             ✅ Quiz V1 hardcodé — ne pas toucher
│
├── engine/
│   └── quiz-engine.js        ✅ v4 — pattern pixel-perfect V1
│                                  (innerHTML=, innerHTML+=, scrollIntoView 400ms)
│
└── features/
    ├── push-notifications.js ✅
    ├── badges.js             ✅
    ├── session-recap.js      ✅
    └── child-profile.js      ✅

css/
└── quiz-english.css          ✅ — .aot-* + cinématique + résultats

js/lesson.js                  ✅ — lesson_english(niveauCode, numero, cb)
js/router.js                  ✅ — ROUTES english + showEnglish() + hideAll()
js/globe.js                   ✅ — continent Paradis (english, AOT)
config.js                     ✅ — 'english' active:true

Supabase DB :
  matieres + niveaux          ✅ — tables créées
  chapitres English (32)      ✅ — CM2 + 6ème + 5ème + 4ème
  questions English (352)     ✅ — 4 niveaux × 8 chapitres × 11 questions

Supabase Storage bucket island-aot :
  characters/ (21 perso)      ✅ — voir liste complète ci-dessous
  music/ (6 MP3)              ✅ — aot-map/battle/victory/boss/isle/defeat
  gifs/ (11 GIFs)             ✅ — perfect×3 / win×5 / lose×3
```

---

## PROGRAMME OFFICIEL ANGLAIS — Éducation Nationale France

### Niveau CM2 — A1 — Vocabulaire de base ✅ EN DB

| # | Île | Topic | Notions clés | Boss |
|---|---|---|---|---|
| 1 | Île de l'Alphabet | Alphabet & Phonétique | 26 lettres, voyelles AEIOU, TH [θ/ð], épeler | Titan Colossal |
| 2 | Île des Nombres | Chiffres & Nombres | 1-20 irrég., dizaines, forty/eighty, ordinaux | Titan Blindé |
| 3 | Île des Couleurs | Couleurs & Adjectifs | Couleurs, light/dark, adj avant nom, invariable | Titan Féminin |
| 4 | Île des Animaux | Animaux & Vocab | Domestiques, ferme, sauvages, sheep=sheep | Titan Bête |
| 5 | Île de la Famille | Famille & Possessifs | Membres, my/your/his/her/their, children | Titan Dansant |
| 6 | Île du Corps | Corps Humain & Pluriels | Visage, membres, foot→feet, tooth→teeth | Titan Mâchoire |
| 7 | Île de l'École | École & Jours semaine | Objets, matières, P.E., jours majuscules | Titan Chariot |
| 8 | Île de la Météo | Météo & Saisons | It is + adj, saisons, What's the weather like? | Ymir Fondatrice |

---

### Niveau 6ème — A1+ — Grammaire fondamentale ✅ EN DB

| # | Île | Topic | Notions clés | Hero | Boss |
|---|---|---|---|---|---|
| 1 | Île du Présent | Present Simple | He/She/It +s, do/does, don't/doesn't, marqueurs | Armin | Titan Cuirassé |
| 2 | Île de l'Être | Verbes BE & HAVE | am/is/are, have/has, contractions, have got | Levi | Titan Féminin |
| 3 | Île des Articles | A / AN / THE | a (consonne), an (voyelle/h muet), the, zéro art. | Historia | Titan Dansant |
| 4 | Île des Pluriels | Pluriels réguliers & irrég. | +s/+es, y→ies, f→ves, man→men, sheep | Jean | Titan Bête |
| 5 | Île des Mots | Adjectifs qualificatifs | Invariables, avant nom, ordre, antonymes | Hange | Titan Mâchoire |
| 6 | Île des Lieux | Prépositions lieu & temps | in/on/under, AT+heure, ON+jour, IN+mois | Erwin | Titan Chariot |
| 7 | Île des Questions | Questions Present Simple | Do/Does + sujet + V?, WH- questions | Reiner | Titan Colossal |
| 8 | Île du Quotidien | Vocabulaire & Fréquences | Nourriture, routines, always→never | Bertholdt | Ymir Fondatrice |

---

### Niveau 5ème — A2 — Grammaire intermédiaire ✅ EN DB

| # | Île | Topic | Notions clés | Hero | Boss |
|---|---|---|---|---|---|
| 1 | Île du Passé | Past Simple régulier | V+ed, rules, didn't+V-base, Did? | Eren | Titan Géant |
| 2 | Île des Irréguliers | 30 Verbes irréguliers | go/went, see/saw, write/wrote, buy/bought | Levi | Titan Blindé |
| 3 | Île de l'Action | Present Continuous | am/is/are+ing, stative verbs, now | Annie | Titan Féminin |
| 4 | Île des Pouvoirs | Verbes modaux | can/must/should/may/might + V-base | Erwin | Titan Bête |
| 5 | Île des Comparaisons | Comparatifs | adj+er, more+adj, as...as, better/worse | Ymir | Titan Dansant |
| 6 | Île du Temps | Past Continuous | was/were+ing, while/when, interruption | Sasha | Titan Mâchoire |
| 7 | Île des Enquêtes | Questions au passé | Did/WH+did, who=sujet, Was/Were? | Porco | Titan Chariot |
| 8 | Île des Révisions | Synthèse 5ème | Tous temps + pièges classiques | Mikasa | Ymir Fondatrice |

---

### Niveau 4ème — B1 — Grammaire avancée ✅ EN DB

| # | Île | Topic | Notions clés | Hero | Boss |
|---|---|---|---|---|---|
| 1 | Île de l'Expérience | Present Perfect | have/has+pp, ever/never/already/yet/just | Historia | Titan Colossal |
| 2 | Île de la Durée | PP vs Past Simple | since/for, marqueurs, erreurs classiques | Levi | Titan Blindé |
| 3 | Île des Prédictions | Futur WILL | prédictions, décisions spontanées, promesses | Hange | Titan Géant |
| 4 | Île des Plans | BE GOING TO | plans, intentions, évidence, will vs going to | Zeke | Titan Blindé |
| 5 | Île des Champions | Superlatifs | the+est/most, best/worst, structures avancées | Eren | Titan Féminin |
| 6 | Île des Confirmations | Question Tags | phrase±→tag∓, auxiliaires, exceptions | Pieck | Titan Dansant |
| 7 | Île des Transformations | Voix Passive | be+pp, actif→passif, by+agent, tous temps | Floch | Titan Mâchoire |
| 8 | Île des Révisions | Synthèse 4ème | PP/will/going to/superlatifs/tags/passif | Armin | Ymir Fondatrice |

**Structure pédagogique des 11 questions :**
- Q 1-3 : Notion principale (difficulté 1 — facile)
- Q 4-6 : Approfondissement (difficulté 2 — moyen)
- Q 7-9 : Pièges classiques (difficulté 2-3 — difficile)
- Q 10 : Application en contexte (difficulté 3)
- Q 11 : BOSS — synthèse complète du chapitre

---

## CINÉMATIQUE — Règle CIN-01 (critique)

### Règle CIN-01 — Clé niveau_numero OBLIGATOIRE

**⚠️ Bug confirmé en prod le 2 avril 2026** — utiliser `ISLE_INTRO[ch.numero]` affiche la cinématique CM2 pour tous les niveaux.

```javascript
// ✅ CORRECT
var cfg = MONDE_ISLE_INTRO[_currentNiveau + '_' + ch.numero];
// ex: 'cm2_1', '6eme_3', '5eme_7', '4eme_2'

// ❌ FAUX — même cinématique CM2 pour tous les niveaux
var cfg = MONDE_ISLE_INTRO[ch.numero];
```

**32 entrées par monde** (4 niveaux × 8 îles). Chaque bulle est adaptée au sujet de la leçon du niveau concerné. Ne jamais copier-coller les bulles d'un niveau à l'autre.

### Règle CIN-02 — Durée et TTS
```javascript
ov._t = setTimeout(skipCine, 7000); // 7s minimum pour laisser le TTS terminer
utt.lang = 'fr-FR'; utt.rate = 0.9; utt.pitch = 1.1;
```

---

## MINI-JEUX — Phase 3 (non encore implémentés)

```javascript
// Types prévus dans lecons.mini_jeux (jsonb)
'flashcards'  → retournement 3D, swipe right (connu) / left (à revoir)
'tri_mots'    → drag & drop dans catégories
'association' → relier terme ↔ définition (max 6 paires)
'texte_trous' → cliquer le mot manquant dans la phrase
'vrai_faux'   → timer 5s, bouton VRAI/FAUX
```

---

## PLAN D'EXÉCUTION — PHASES

### ✅ PHASE 0 — V1 Terminé
- Grand Bleu (Français), Magnolia (Histoire), Kanto (Sciences)
- Pays du Feu (Maths), Namek (Géographie) — quiz V1 hardcodés
- Admin dashboard + notifications email + web push

### ✅ PHASE 1 — English V2 Terminé
```
✅ migration_v9_english.sql    — tables + English CM2 (88 questions)
✅ js/engine/quiz-engine.js V4 — pattern pixel-perfect V1
✅ js/worlds/english/quiz-router.js V2 — nav + cinématique CIN-01
✅ css/quiz-english.css         — .aot-* complet
✅ js/lesson.js                 — lesson_english() ajoutée
✅ index.html + router.js + globe.js + config.js
✅ bucket island-aot uploadé    — 21 personnages + 6 MP3 + 11 GIFs
✅ Syntaxe JS validée Node.js   — 0 erreur
```

### ✅ PHASE 1b — Contenu English Terminé
```
✅ migration_english_6eme.sql  — 8 chapitres × 11 questions = 88 questions
✅ migration_english_5eme.sql  — 8 chapitres × 11 questions = 88 questions
✅ migration_english_4eme.sql  — 8 chapitres × 11 questions = 88 questions
✅ fix CIN-01                  — clés niveau_numero, bulles adaptées par niveau
✅ lesson-data.js v1.2         — 4 corrections warmup + mapping 21 personnages
✅ update_hero_images.sql      — nouveaux personnages en DB
   Total : 352 questions · 21 personnages · 4 niveaux 100% fonctionnels
```

### 🔜 PHASE 2 — Admin onglet Contenu (prochaine)
**Objectif** : CRUD questions depuis l'interface admin, sans code
```
1. admin.html onglet "Contenu"
   - Sélecteur Monde / Niveau / Chapitre
   - Liste questions avec drag pour réordonner
   - Formulaire ajouter/modifier/supprimer question
   - Prévisualisation temps réel (rendu identique app enfant)
2. Onglet LEÇON — éditeur slides + warmup
3. Onglet CHAPITRES — activer/désactiver/réordonner îles
```

### 🔒 PHASE 3 — Leçons gamifiées
```
1. js/engine/lesson-engine.js
2. js/engine/minigames/flashcards.js
3. js/engine/minigames/tri-mots.js
4. js/engine/minigames/association.js
5. js/engine/minigames/texte-trous.js
6. js/engine/minigames/vrai-faux.js
```

### 🔒 PHASE 4 — Contenu complet toutes matières
```
Maths Pays du Feu : N2 (6ème) + N3 (5ème) + N4 (4ème)
Français Grand Bleu : N2-N4
Histoire Magnolia : N2-N4
Sciences Kanto : N2-N4
Géo Namek : N2-N4
```

### 🔒 PHASE 5 — Nouveaux mondes
```
🌿 Forêt Konoha → SVT (Naruto)
🌊 Monde Aqua   → Géographie (One Piece)
⚡ Monde Éclair  → Physique-Chimie (My Hero Academia)
```

---

## PROGRAMME OFFICIEL — Toutes matières

### Anglais (monde English — Attack on Titan)
| Niveau | CECRL | Status |
|---|---|---|
| CM2 | A1 | ✅ 88 questions en DB |
| 6ème | A1+ | ✅ 88 questions en DB |
| 5ème | A2 | ✅ 88 questions en DB |
| 4ème | B1 | ✅ 88 questions en DB |

### Français (monde Grand Bleu — One Piece)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | Conjugaison présent/passé composé, accord, homophones | ✅ V1 hardcodé |
| 6ème-4ème | Nature/fonctions, subjonctif, conditionnel, figures de style | 🔜 Phase 4 |

### Maths (monde Pays du Feu — Naruto)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | Opérations, fractions, géométrie, mesures | ✅ V1 hardcodé |
| 6ème-4ème | Fractions avancées, équations, Pythagore, fonctions | 🔜 Phase 4 |

### Histoire-Géo (monde Magnolia/Namek)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | Gaule, Rome, Moyen Âge | ✅ V1 hardcodé |
| 6ème-4ème | Antiquité → Révolutions | 🔜 Phase 4 |

### Sciences (monde Kanto — Demon Slayer)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | États matière, corps humain, environnement | ✅ V1 hardcodé |
| 6ème-4ème | Électricité, optique, chimie, génétique | 🔜 Phase 4 |

---

## RÈGLES ARCHITECTURALES V2

### Règle PR-00 — Production Ready OBLIGATOIRE ⚠️
Tout livrable DOIT être production ready avant tout commit.
Voir la section "RÈGLE FONDAMENTALE" en tête de document.
**Résumé** : syntaxe validée + 0 erreur console + testé en prod + zéro régression.

### Règle AU-01 — Bucket Supabase uniquement
Tous les assets viennent de Supabase Storage. Pas de YouTube, pas de CDN externe.

### Règle AU-02 — Isolation préfixe
AOT : `aot-*` · Naruto : `naruto-*` · DBZ : `dbz-*` · JJK : `jjk-*`

### Règle AU-03 — Autoplay sur clic
Si `play()` retourne `NotAllowedError`, attendre un clic utilisateur.

### Règle AU-04 — BGM après leçon
`playBGM()` TOUJOURS dans le callback de la leçon, jamais avant.

### Règle DB-01 — Questions en base
Nouvelles questions → Supabase DB. Mondes V1 → hardcodé (zéro régression).

### Règle DB-02 — Engine réutilisable
`js/engine/quiz-engine.js` utilisé par TOUS les nouveaux mondes.

### Règle DB-03 — Migration progressive
Migrer vers DB uniquement quand on enrichit un monde V1.

### Règle NR-01 — Zéro régression V1
`showEnglish()` appelle TOUJOURS `hideAll()`. Les mondes V1 ne sont jamais touchés.

### Règle LG-01 — Leçon avant quiz
Chaque île a une leçon via `lesson_english(niveauCode, numero, callback)`.

### Règle CIN-01 — Clé cinématique niveau_numero OBLIGATOIRE
`ISLE_INTRO[_currentNiveau + '_' + ch.numero]` — jamais `ISLE_INTRO[ch.numero]`.
32 entrées par monde. Bulle adaptée à chaque niveau+île.

### Règle CIN-02 — Durée et TTS
7000ms minimum. `lang='fr-FR', rate=0.9, pitch=1.1`.

### Règle PED-01 — Warmup aligné sur la leçon
Les questions d'échauffement (warmup) doivent strictement correspondre
aux notions enseignées dans CETTE leçon.
Ne jamais utiliser une notion d'une leçon future dans le warmup.
Exemple corrigé : leçon 3_1 (verbes réguliers) → warmup avec "walk" (régulier),
pas "go" (irrégulier, leçon 3_2).

### Règle ADM-01 — Contenu sans code
Tout nouveau contenu créable depuis l'admin sans modifier le JS.

---

## ASSETS — Référence complète

### Buckets Supabase Storage
| Bucket | Monde | Contenu | Status |
|---|---|---|---|
| `grand-bleu` | Grand Bleu | Audio map/battle/victory | ✅ |
| `island-magnolia` | Magnolia | Audio DBZ | ✅ |
| `island-demon-slayer` | Kanto | Audio + characters/ | ✅ |
| `island-pays-du-feu` | Pays du Feu | Audio + characters/ + gifs/ | ✅ |
| `island-namek` | Namek | characters/ + music/ | ✅ |
| `island-aot` | English | characters/(21) + music/(6) + gifs/(11) | ✅ |

### Bucket island-aot — 21 personnages
```
characters/ :
  — Survey Corps —
  armin.jpg · connie.jpg · eren.jpeg · erwin.jpg · hange.jpeg
  historia.png · jean.jpg · levi.jpg · mikasa.gif · sasha.jpeg

  — Warriors & autres —
  annie.jpeg · bertholdt.jpg · colt.jpeg · falco.gif · floch.jpg
  gabi.gif · pieck.jpg · porco.gif · reiner.jpg · ymir.jpeg · zeke.jpg

  — Réservés futurs niveaux —
  connie.jpg · falco.gif · gabi.gif · colt.jpeg
```

### Mapping personnages par niveau (sans répétitions)
```javascript
CM2  : { 1:eren.jpeg,    2:mikasa.gif,    3:armin.jpg,   4:levi.jpg,
         5:historia.png, 6:jean.jpg,      7:hange.jpeg,  8:erwin.jpg }

6ème : { 1:armin.jpg,    2:levi.jpg,      3:historia.png, 4:jean.jpg,
         5:hange.jpeg,   6:erwin.jpg,     7:reiner.jpg,   8:bertholdt.jpg }

5ème : { 1:eren.jpeg,    2:levi.jpg,      3:annie.jpeg,  4:erwin.jpg,
         5:ymir.jpeg,    6:sasha.jpeg,    7:porco.jpg,   8:mikasa.gif }

4ème : { 1:historia.png, 2:levi.jpg,      3:hange.jpeg,  4:zeke.jpg,
         5:eren.jpeg,    6:pieck.jpg,     7:floch.jpg,   8:armin.jpg }
```

---

## ÉTAT ACTUEL — 3 Avril 2026

### Monde English — Récapitulatif complet
| Composant | Fichier | Version | Status |
|---|---|---|---|
| Audio patch | `js/worlds/english/audio.js` | v1 | ✅ |
| Données leçons | `js/worlds/english/lesson-data.js` | v1.2 | ✅ 32 leçons · 21 perso |
| Router + cinématique | `js/worlds/english/quiz-router.js` | v2 | ✅ CIN-01 |
| Engine quiz | `js/engine/quiz-engine.js` | v4 | ✅ |
| Styles | `css/quiz-english.css` | v1 | ✅ |
| Leçon function | `js/lesson.js` | — | ✅ lesson_english() |
| Routes | `js/router.js` | — | ✅ |
| Globe | `js/globe.js` | — | ✅ continent Paradis |
| Config | `config.js` | — | ✅ english active:true |
| DB — questions | Supabase | — | ✅ 352 questions (4 niveaux) |
| DB — personnages | Supabase | — | ✅ hero_image 21 perso |
| Assets bucket | Supabase Storage | — | ✅ 21 perso + 6 MP3 + 11 GIFs |

### Fonctionnalités en production ✅
```
✅ Globe → clic Paradis → panel → Commencer l'aventure
✅ Sélection niveau (CM2 / 6ème / 5ème / 4ème)
✅ Grille 8 îles chargée depuis Supabase DB
✅ Fond animé Jikan API AOT (fallback Supabase gifs)
✅ Clic île → leçon overlay avec warmup aligné
✅ Cinématique 7s + TTS fr-FR + clé niveau_numero (CIN-01)
✅ Quiz 11 questions pattern V1 exact
✅ Corrections colorées + explications + GIF résultat
✅ Retour à la carte avec progression
✅ 4 niveaux 100% fonctionnels avec personnages uniques
```

### Bugs connus (non bloquants)
```
⚠️ 401 funnel_sessions → table analytics non créée (pas lié à AOT)
⚠️ 429 Jikan rate limit → fallback Supabase actif automatiquement
⚠️ 409 daily_rewards   → conflit date (feature V1, pas lié à AOT)
```

---

## PROCHAINES ACTIONS IMMÉDIATES

```
1. Phase 2 — Admin onglet Contenu
   → Interface CRUD questions + prévisualisation temps réel
   → Sélecteur Monde / Niveau / Chapitre
   → Formulaire ajout/modification/suppression
   → Drag & drop pour réordonner les questions

2. Phase 3 — Mini-jeux dans les leçons
   → flashcards, tri-mots, association, texte-trous, vrai-faux

3. Futurs mondes V2 (ordre suggéré)
   → Maths (Pays du Feu) — programme 6ème/5ème/4ème
   → Français (Grand Bleu) — programme 6ème/5ème/4ème
```

---

*Ce document doit être mis à jour à chaque phase complétée.*
*Règle PR-00 : tout livrable est production ready avant commit.*
*Version 2.3 — 3 Avril 2026*
