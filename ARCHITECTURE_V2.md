# ACADÉMIE PIRATE — ARCHITECTURE V2
*Document de référence — À lire en priorité avant tout développement*
*Version : 2.1 | Mise à jour : 1er Avril 2026*

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
   ├── Bulle de discours (cfg.bubble)
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
│   │   ├── audio.js          ✅ FAIT — patch audio aot-* (Supabase only)
│   │   ├── lesson-data.js    ✅ FAIT — 32 leçons CM2→4ème (LESSON_REGISTRY)
│   │   └── quiz-router.js    ✅ FAIT V2 — nav niveaux + grille + cinématique + hideAll()
│   ├── namek/                ✅ Quiz V1 hardcodé — ne pas toucher
│   ├── kanto/                ✅ Quiz V1 hardcodé — ne pas toucher
│   ├── pays-du-feu/          ✅ Quiz V1 hardcodé — ne pas toucher
│   └── magnolia/             ✅ Quiz V1 hardcodé — ne pas toucher
│
├── engine/
│   └── quiz-engine.js        ✅ FAIT V4 — pattern pixel-perfect V1
│                                  (innerHTML=, innerHTML+=, scrollIntoView 400ms)
│
└── features/
    ├── push-notifications.js ✅ FAIT
    ├── badges.js             ✅ FAIT
    ├── session-recap.js      ✅ FAIT
    └── child-profile.js      ✅ FAIT

css/
└── quiz-english.css          ✅ FAIT — .aot-* + cinématique + résultats

js/lesson.js                  ✅ FAIT — lesson_english(niveauCode, numero, cb) ajoutée
js/router.js                  ✅ FAIT — ROUTES english + showEnglish() + hideAll() AOT
js/globe.js                   ✅ FAIT — continent Paradis (english, AOT)
config.js                     ✅ FAIT — 'english' active:true

Supabase DB :
  matieres + niveaux          ✅ FAIT
  chapitres English CM2       ✅ FAIT — 8 chapitres
  questions English CM2       ✅ FAIT — 88 questions (8×11)
  chapitres 6ème/5ème/4ème    🔜 À CRÉER — 24 chapitres
  questions 6ème/5ème/4ème    🔜 À CRÉER — 264 questions (24×11)

Supabase Storage bucket island-aot :
  characters/                 ✅ UPLOADÉ — 10 personnages AOT
  music/                      ✅ UPLOADÉ — 6 MP3
  gifs/                       ✅ UPLOADÉ — 11 GIFs (perfect/win/lose)
```

---

## PROGRAMME OFFICIEL ANGLAIS — Éducation Nationale France

### Niveau CM2 — A1 — Vocabulaire de base ✅ EN DB

| # | Île | Topic | Notions clés | Boss |
|---|---|---|---|---|
| 1 | Île de l'Alphabet | Alphabet & Phonétique | 26 lettres, voyelles AEIOU, TH [θ/ð], épeler, spelling | Titan Colossal |
| 2 | Île des Nombres | Chiffres & Nombres | 1-20 irrég., dizaines, forty/eighty pièges, ordinaux, dates | Titan Blindé |
| 3 | Île des Couleurs | Couleurs & Adjectifs | Couleurs base, light/dark, adj avant nom, invariable | Titan Féminin |
| 4 | Île des Animaux | Animaux & Vocab | Domestiques, ferme, sauvages, sheep=sheep, I have a dog | Titan Bête |
| 5 | Île de la Famille | Famille & Possessifs | Membres, my/your/his/her/their, children | Titan Dansant |
| 6 | Île du Corps | Corps Humain & Pluriels | Visage, membres, foot→feet, tooth→teeth, child→children | Titan Mâchoire |
| 7 | Île de l'École | École & Jours semaine | Objets, matières, P.E., jours majuscules | Titan Chariot |
| 8 | Île de la Météo | Météo & Saisons | It is + adj, saisons, What's the weather like?, going to | Ymir Fondatrice |

---

### Niveau 6ème — A1+ — Grammaire fondamentale 🔜 À CRÉER

| # | Île | Topic | Notions clés | Hero | Boss |
|---|---|---|---|---|---|
| 1 | Île du Présent | Present Simple | He/She/It +s, do/does, don't/doesn't, marqueurs (every day, always, never) | Armin | Titan Cuirassé |
| 2 | Île de l'Être | Verbes BE & HAVE | am/is/are, have/has, contractions I'm/She's, have got | Levi | Titan Féminin |
| 3 | Île des Articles | A / AN / THE | a (consonne), an (voyelle/h muet), the (spécifique), zéro article | Historia | Titan Dansant |
| 4 | Île des Pluriels | Pluriels réguliers & irrég. | +s, +es, y→ies, f→ves, man→men, child→children, sheep | Jean | Titan Bête |
| 5 | Île des Mots | Adjectifs qualificatifs | Invariables, avant nom, opinion→taille→couleur, antonymes | Hange | Titan Mâchoire |
| 6 | Île des Lieux | Prépositions de lieu & temps | in/on/under/behind/next to, AT+heure, ON+jour, IN+mois | Erwin | Titan Chariot |
| 7 | Île des Questions | Questions Present Simple | Do/Does + sujet + V?, WH- (what/where/when/who/why/how) | Connie | Titan Colossal |
| 8 | Île du Quotidien | Vocabulaire quotidien | Nourriture, repas, routines, adverbes fréquence (always 100%→never 0%) | Sasha | Ymir Fondatrice |

**Questions par chapitre — structure pédagogique :**
- Q 1-3 : Notion principale (facile — difficulté 1)
- Q 4-6 : Approfondissement (moyen — difficulté 2)
- Q 7-9 : Pièges classiques et cas particuliers (moyen/difficile — difficulté 2-3)
- Q 10 : Application en contexte (difficile — difficulté 3)
- Q 11 : BOSS — synthèse du chapitre entier (boss — difficulté 3)

---

### Niveau 5ème — A2 — Grammaire intermédiaire 🔜 À CRÉER

| # | Île | Topic | Notions clés | Hero | Boss |
|---|---|---|---|---|---|
| 1 | Île du Passé | Past Simple régulier | V+ed, rules (double, e muet, y→ied), didn't+V-base, Did? | Eren | Titan Géant |
| 2 | Île des Irréguliers | Verbes irréguliers | 30 essentiels : go/went, see/saw, have/had, make/made, take/took | Levi | Titan Blindé |
| 3 | Île de l'Action | Present Continuous | am/is/are+ing, stative verbs (know/like/want), now/right now | Hange | Titan Féminin |
| 4 | Île des Pouvoirs | Modaux | can (capacité), must (obligation), should (conseil), may/might (probabilité), V-base obligatoire | Erwin | Titan Bête |
| 5 | Île des Comparaisons | Comparatifs | adj+er+than (court), more+adj+than (long), as...as, good→better, bad→worse | Connie | Titan Dansant |
| 6 | Île du Temps | Past vs Continuous | was/were+ing, while+Past Cont., when+Past Simple, interruption | Sasha | Titan Mâchoire |
| 7 | Île des Enquêtes | Questions au passé | Did+sujet+V?, WH+did, who=sujet (pas did !), Was/Were? | Armin | Titan Chariot |
| 8 | Île des Révisions | Synthèse 5ème | Tous temps, pièges, He speaks/He spoke/He is speaking/He was speaking | Mikasa | Ymir Fondatrice |

---

### Niveau 4ème — B1 — Grammaire avancée 🔜 À CRÉER

| # | Île | Topic | Notions clés | Hero | Boss |
|---|---|---|---|---|---|
| 1 | Île de l'Expérience | Present Perfect | have/has+pp, ever/never/already/yet/just, expérience de vie | Historia | Titan Colossal |
| 2 | Île de la Durée | PP vs Past Simple | since (point) vs for (durée), marqueurs PP vs PS, erreurs classiques | Levi | Titan Blindé |
| 3 | Île des Prédictions | Futur WILL | prédictions, décisions spontanées, promesses, won't, I'll/She'll | Hange | Titan Géant |
| 4 | Île des Plans | BE GOING TO | plans décidés, intentions, évidence visible, will vs going to | Erwin | Titan Blindé |
| 5 | Île des Champions | Superlatifs | the+adj+est, the most+adj, best/worst, the+comp+the+comp | Eren | Titan Féminin |
| 6 | Île des Confirmations | Question Tags | phrase+ → tag-, phrase- → tag+, auxiliaire identique, aren't I? | Jean | Titan Dansant |
| 7 | Île des Transformations | Voix Passive | be+pp, actif→passif (COD→sujet), by+agent, tous temps | Connie | Titan Mâchoire |
| 8 | Île des Révisions | Synthèse 4ème | PP/will/going to/superlatifs/tags/passif, distinctions clés | Armin | Ymir Fondatrice |

---

## CINÉMATIQUE — Données AOT_ISLE_INTRO

Défini dans `js/worlds/english/quiz-router.js`. Structure pour chaque île :

```javascript
{
  bg:         '#0a0a00',           // couleur fond cinématique
  lines:      ["L'ALPHABET…","… ANGLAIS !!","26 lettres !"],  // 3 lignes max
  kanji:      '自由 !!',           // caractère japonais + !!
  kanjiColor: '#8b6914',           // couleur kaki/marron/or
  bubble:     "Texte prononcé par TTS — phrase héros motivante"
}
```

**Règle cinématique :**
- Durée : 7000ms (7 secondes) — laisse le TTS terminer
- TTS : `lang='fr-FR', rate=0.9, pitch=1.1`
- Auto-skip : `setTimeout(aot_skipCine, 7000)`
- Bouton : "⏭ PASSER" toujours visible

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
✅ migration_v9_english.sql   — tables + English CM2 (88 questions)
✅ js/engine/quiz-engine.js V4 — pattern pixel-perfect V1
✅ js/worlds/english/quiz-router.js V2 — nav + cinématique + hideAll
✅ css/quiz-english.css        — .aot-* + cinématique AOT
✅ js/lesson.js                — lesson_english() ajoutée
✅ index.html + router.js + globe.js + config.js
✅ bucket island-aot uploadé   — characters + music + gifs
✅ Syntaxe JS validée Node.js
```

### 🔜 PHASE 1b — Contenu English (en cours)
**Objectif** : Remplir les 3 niveaux restants via SQL
```
🔜 migration_english_6eme.sql  — 8 chapitres × 11 questions = 88 questions
🔜 migration_english_5eme.sql  — 8 chapitres × 11 questions = 88 questions
🔜 migration_english_4eme.sql  — 8 chapitres × 11 questions = 88 questions
   Total : 264 nouvelles questions pédagogiques
```

### 🔒 PHASE 2 — Admin Contenu
**Objectif** : CRUD questions sans code
```
1. admin.html onglet "Contenu"
   - Sélecteur Monde / Niveau / Chapitre
   - Liste questions avec drag pour réordonner
   - Formulaire ajouter/modifier/supprimer question
   - Prévisualisation temps réel (rendu identique app)
2. Onglet LEÇON — éditeur slides + mini-jeux
3. Onglet CHAPITRES — activer/désactiver/réordonner
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
7. Intégration dans le flow île (entre slides)
```

### 🔒 PHASE 4 — Contenu complet toutes matières
**Objectif** : Programme complet CM2→4ème toutes matières
```
Anglais English  : N2 (6ème) + N3 (5ème) + N4 (4ème) ← PHASE 1b
Français GB      : N2-N4
Maths PdF        : N2-N4
Histoire Magnolia: N2-N4
Sciences Kanto   : N2-N4
Géo Namek        : N2-N4
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
| Niveau | Chapitres | CECRL | Status |
|---|---|---|---|
| CM2 | Alphabet, Nombres, Couleurs, Animaux, Famille, Corps, École, Météo | A1 | ✅ 88 questions en DB |
| 6ème | Present Simple, BE/HAVE, Articles, Pluriels, Adjectifs, Prépositions, Questions, Vocab | A1+ | 🔜 À créer |
| 5ème | Past Simple, Irréguliers, Present Cont., Modaux, Comparatifs, Past Cont., Questions Passé, Révisions | A2 | 🔜 À créer |
| 4ème | Present Perfect, PP vs PS, WILL, Going To, Superlatifs, Question Tags, Passif, Révisions | B1 | 🔜 À créer |

### Français (monde Grand Bleu — One Piece)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | Conjugaison présent/passé composé, accord participe passé, on/ont/son/sont, ces/ses | ✅ V1 hardcodé |
| 6ème | Nature des mots, fonctions, imparfait, futur simple, ponctuation | 🔜 Phase 4 |
| 5ème | Subjonctif, conditionnel présent, figures de style, discours indirect | 🔜 Phase 4 |
| 4ème | Argumentation, stylistique, voix passive, connecteurs logiques | 🔜 Phase 4 |

### Maths (monde Pays du Feu — Naruto)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | Opérations, fractions simples, périmètre/aire, mesures, numération décimale | ✅ V1 hardcodé |
| 6ème | Fractions opérations, proportionnalité, symétrie, statistiques | 🔜 Phase 4 |
| 5ème | Nombres relatifs, équations 1er degré, Pythagore, probabilités | 🔜 Phase 4 |
| 4ème | Puissances, développer/factoriser, fonctions linéaires, trigonométrie | 🔜 Phase 4 |

### Histoire-Géo (monde Magnolia/Namek)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | Gaule, Rome, Moyen Âge, Grandes découvertes | ✅ V1 hardcodé |
| 6ème | Préhistoire, Mésopotamie, Grèce antique, Rome, début du christianisme | 🔜 Phase 4 |
| 5ème | Moyen Âge, croisades, Renaissance, Réforme, Grandes découvertes | 🔜 Phase 4 |
| 4ème | Révolutions, XIXe siècle, industrialisation, colonisation, 1ère GM | 🔜 Phase 4 |

### Sciences (monde Kanto — Demon Slayer)
| Niveau | Thèmes principaux | Status |
|---|---|---|
| CM2 | États matière, reproduction animale, corps humain, environnement | ✅ V1 hardcodé |
| 6ème | Signaux lumineux, électricité, nutrition, Internet, êtres vivants | 🔜 Phase 4 |
| 5ème | Reproduction végétale, géologie, corps humain, forces, vitesse | 🔜 Phase 4 |
| 4ème | Énergie, optique géométrique, atomes, réactions chimiques, génétique | 🔜 Phase 4 |

---

## RÈGLES ARCHITECTURALES V2

### Règle AU-01 — Bucket Supabase uniquement
Tous les assets audio/images/gifs viennent de Supabase Storage. Pas de YouTube, pas de CDN externe.

### Règle AU-02 — Isolation préfixe
Chaque monde a ses propres préfixes pour les tracks audio.
AOT : `aot-*`, Naruto : `naruto-*`, DBZ : `dbz-*`, JJK : `jjk-*`.

### Règle AU-03 — Autoplay sur clic
Si `play()` retourne `NotAllowedError`, attendre un clic utilisateur avant de rejouer.

### Règle AU-04 — BGM après leçon
`playBGM()` est TOUJOURS déclenché dans le **callback** de la leçon, jamais avant.
Cela évite le double audio (leçon + bgm en même temps).

### Règle DB-01 — Questions en base
Toutes les nouvelles questions sont en Supabase DB.
Les anciens mondes (V1) gardent leurs questions hardcodées — **zéro régression**.

### Règle DB-02 — Engine réutilisable
`js/engine/quiz-engine.js` est utilisé par TOUS les nouveaux mondes.
Pas de duplication de logique quiz.

### Règle DB-03 — Migration progressive
Les mondes V1 migrent vers DB **uniquement** quand on les enrichit.

### Règle NR-01 — Zéro régression V1
`showEnglish()` appelle TOUJOURS `hideAll()` en premier.
Les autres mondes ne sont jamais touchés lors des modifications English.

### Règle LG-01 — Leçon avant quiz
Chaque île a une leçon via `lesson_english(niveauCode, numero, callback)`.
La leçon utilise les données de `LESSON_REGISTRY['english']` dans `lesson-data.js`.

### Règle ADM-01 — Contenu sans code
Tout nouveau contenu (questions/leçons/chapitres) créable depuis l'admin.

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
| `island-aot` | English | characters/ + music/ + gifs/ | ✅ UPLOADÉ |

### Bucket island-aot — détail
```
characters/ :
  armin.jpg · connie.jpg · eren.jpeg · erwin.jpg · hange.jpeg
  historia.png · jean.jpg · levi.jpg · mikasa.gif · sasha.jpeg

music/ :
  aot-map.mp3 · aot-battle.mp3 · aot-victory.mp3
  aot-boss.mp3 · aot-isle.mp3 · aot-defeat.mp3

gifs/ :
  aot-perfect-1/2/3.gif  ← score 11/11
  aot-win-1/2/3/4/5.gif  ← score ≥ 7/11 (60%)
  aot-lose-1/2/3.gif     ← score < 7/11
```

### Mapping personnages par niveau
```javascript
CM2  : { 1:eren, 2:mikasa, 3:armin, 4:levi, 5:historia, 6:jean, 7:hange, 8:erwin }
6ème : { 1:armin, 2:levi, 3:historia, 4:jean, 5:hange, 6:erwin, 7:connie, 8:sasha }
5ème : { 1:eren, 2:levi, 3:hange, 4:erwin, 5:connie, 6:sasha, 7:armin, 8:historia }
4ème : { 1:historia, 2:levi, 3:hange, 4:erwin, 5:eren, 6:historia, 7:jean, 8:connie }
```

---

## ÉTAT ACTUEL — 1er Avril 2026

### Monde English — Récapitulatif complet
| Composant | Fichier | Status |
|---|---|---|
| Audio patch | `js/worlds/english/audio.js` | ✅ |
| Données leçons | `js/worlds/english/lesson-data.js` | ✅ 32 leçons |
| Router + cinématique | `js/worlds/english/quiz-router.js` | ✅ V2 |
| Engine quiz | `js/engine/quiz-engine.js` | ✅ V4 |
| Styles | `css/quiz-english.css` | ✅ |
| Leçon function | `js/lesson.js` | ✅ lesson_english() |
| Routes | `js/router.js` | ✅ |
| Globe | `js/globe.js` | ✅ continent Paradis |
| Config | `config.js` | ✅ english active:true |
| DB tables | Supabase | ✅ |
| Questions CM2 | Supabase DB | ✅ 88 questions |
| Questions 6ème | Supabase DB | 🔜 À créer |
| Questions 5ème | Supabase DB | 🔜 À créer |
| Questions 4ème | Supabase DB | 🔜 À créer |
| Assets bucket | Supabase Storage | ✅ uploadé |

### Fonctionnalités en production
```
✅ Globe → clic Paradis → panel → Commencer l'aventure
✅ Sélection niveau (CM2/6ème/5ème/4ème)
✅ Grille 8 îles chargée depuis Supabase DB
✅ Fond animé Jikan API AOT (fallback Supabase gifs)
✅ Clic île → leçon overlay avec warmup
✅ Cinématique 7s + TTS fr-FR
✅ Quiz 11 questions pattern V1 exact
✅ Corrections colorées + explications
✅ GIF résultat (perfect/win/lose)
✅ Retour à la carte avec progression
✅ Niveau 6ème/5ème/4ème → "Ce niveau arrive bientôt !"
```

### Bugs connus (non bloquants)
```
⚠️ 401 funnel_sessions → table analytics non créée (pas lié à AOT)
⚠️ 429 Jikan rate limit → fallback Supabase actif automatiquement
⚠️ 409 daily_rewards → conflit date (feature V1, pas lié à AOT)
```

---

## PROCHAINES ACTIONS IMMÉDIATES

```
1. migration_english_6eme.sql
   → 8 chapitres 6ème (Armin, Levi, Historia, Jean, Hange, Erwin, Connie, Sasha)
   → 88 questions alignées programme officiel 6ème
   → Structure : Q1-3 facile / Q4-6 moyen / Q7-9 difficile / Q10 contexte / Q11 BOSS

2. migration_english_5eme.sql
   → 8 chapitres 5ème
   → 88 questions alignées programme officiel 5ème

3. migration_english_4eme.sql
   → 8 chapitres 4ème
   → 88 questions alignées programme officiel 4ème

4. Phase 2 — Admin onglet Contenu
   → CRUD questions avec prévisualisation
   → Permet d'enrichir sans code

5. Phase 3 — Mini-jeux dans les leçons
```

---

*Ce document doit être mis à jour à chaque phase complétée.*
*Ne jamais déployer sans relire les Règles Architecturales V2.*
*Version 2.1 — 1er Avril 2026*
