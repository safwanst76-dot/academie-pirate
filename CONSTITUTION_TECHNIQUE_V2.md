# 📜 CONSTITUTION TECHNIQUE — Académie Pirate v2

## RÈGLE ABSOLUE #0 — LIRE AVANT MODIFIER

**Avant toute modification d'un fichier existant :**

1. **Lire la version actuelle** du fichier depuis GitHub (pas depuis la mémoire, pas depuis les outputs)
2. **Identifier l'ancre exacte** — copier-coller les lignes réelles du fichier
3. **Montrer exactement** ce qui change — avant / après
4. **Le dev fait la modification manuellement** dans son éditeur
5. **Vérification visuelle** avant sauvegarde
6. **Test en navigation privée** avant commit
7. **Commit ciblé** — un seul fichier par commit si possible

> ⚠️ Les fichiers GitHub évoluent tous les jours. La mémoire de Claude est toujours potentiellement obsolète. **Ne jamais utiliser un script automatique pour modifier un fichier qui fonctionne.**

---

## RÈGLE #1 — ZÉRO RÉGRESSION (NR-01)

Toute nouvelle implémentation ne doit jamais casser ce qui fonctionne.

- Un fichier qui fonctionne **ne se modifie que chirurgicalement**
- Chaque modification = **une seule ancre, un seul endroit**
- Si une modification casse quelque chose → `git revert` immédiat

---

## RÈGLE #2 — NE PAS TOUCHER (NR-02)

Les fichiers core ne se modifient **jamais directement** :

| Fichier | Statut |
|---|---|
| `js/audio-engine.js` | 🔒 INTOUCHABLE |
| `css/main.css` | 🔒 INTOUCHABLE |
| `css/quiz.css` | 🔒 INTOUCHABLE |
| `js/supabase-patch.js` | ⚠️ Dernier script absolu |
| `js/auth.js` | ⚠️ Modifier avec ancre exacte uniquement |
| `js/db.js` | ⚠️ Modifier avec ancre exacte uniquement |

---

## RÈGLE #3 — ORDRE DE CHARGEMENT SACRÉ (OC)

```
1.  config.js          ← EN PREMIER ABSOLU
2.  supabase.js
3.  db.js
4.  analytics.js
5.  islands.js
6.  ui.js
7.  hud.js
8.  audio-engine.js    ← NE JAMAIS MODIFIER
9.  worlds/magnolia/audio.js
10. worlds/kanto/audio.js
11. worlds/pays-du-feu/audio.js
12. save.js
13. avatar.js
14. cinematic.js
15. worlds/grand-bleu/quiz.js
16. progression.js
17. auth.js
18. parent.js
19. globe.js
20. child-select.js
21. worlds/magnolia/quiz.js
22. worlds/kanto/quiz.js
23. worlds/pays-du-feu/quiz.js
24. worlds/grand-bleu/lesson-data.js
25. worlds/magnolia/lesson-data.js
26. worlds/kanto/lesson-data.js
27. worlds/pays-du-feu/lesson-data.js
28. lesson.js
29. services/daily.js
30. router.js
31. supabase-patch.js  ← DERNIER ABSOLU
```

---

## RÈGLE #4 — AUDIO (AU)

- **AU-01** : YouTube interdit — Supabase Storage uniquement
- **AU-02** : Isolation par préfixe de track (`isle-*`, `dbz-*`, `kanto-*`, `naruto-*`)
- **AU-03** : Retry autoplay sur clic — jamais bloquer
- **AU-04** : `playBGM` se déclenche APRÈS la leçon (dans le callback), pas avant
- **AU-05** : Ne jamais modifier `audio-engine.js`

---

## RÈGLE #5 — CSS (CS)

- Isolation par préfixe : `.pdf-*`, `.hist-*`, `.kanto-*`, `.lesson-*`, `.dr-*`
- Ne jamais modifier `main.css` ni `quiz.css`
- Mobile-first obligatoire

---

## RÈGLE #6 — ARCHITECTURE MODULAIRE (A)

- **A1** : Un nouveau monde = `js/worlds/[monde]/` avec `quiz.js` + `lesson-data.js` + `audio.js`
- **A2** : `config.js` est la seule source de vérité (URLs, feature flags, mondes)
- **A3** : Données de leçon séparées du moteur (`lesson-data.js` ≠ `lesson.js`)
- **A4** : `js/core/` ne se modifie jamais sauf décision architecturale
- **A5** : Chaque service expose son API via `window.AP.[service]`
- **A6** : Feature flags dans `config.js` avant tout développement
- **A7** : Migration progressive — une phase = un composant = un commit = un test

---

## RÈGLE #7 — BASE DE DONNÉES (DB)

- Migration SQL **avant** tout nouveau code qui utilise une table
- Tester le SQL dans l'éditeur Supabase avant de coder le JS
- `dbSaveProgression` : garde `if (!childId || !islandId) return;`
- RLS activé sur toutes les tables
- GRANT explicite pour `anon` et `authenticated`

---

## RÈGLE #8 — WORKFLOW DE DÉVELOPPEMENT

```
1. LIRE le fichier actuel sur GitHub (pas depuis la mémoire)
2. IDENTIFIER l'ancre exacte
3. MONTRER le diff avant/après
4. MODIFICATION manuelle par le dev dans VS Code
5. VÉRIFICATION visuelle de la syntaxe
6. TEST en navigation privée
7. COMMIT ciblé avec message explicite
8. PUSH
```

---

## RÈGLE #9 — SCRIPTS AUTOMATIQUES

Les scripts Python de patch (`apply_*.py`) sont **interdits** pour les fichiers qui fonctionnent en production.

Ils sont **autorisés uniquement** pour :
- Créer de nouveaux fichiers
- Modifier des fichiers **jamais déployés**
- Extraire/analyser du contenu (lecture seule)

---

## BUCKETS SUPABASE — RÉFÉRENCE

| Monde | Bucket | Contenu |
|---|---|---|
| Grand Bleu | `grand-bleu` | Audio isle-1..8, map, battle, victory |
| Magnolia | `island-magnolia` | `map.mp3`, `battle.mp3`, `victory.mp3`, `dbz-isle.mp3`, `defeat.mp3` |
| Kanto | `island-demon-slayer` | `bgm_map.mp3`, `bgm_battle.mp3`, `bgm_boss.mp3`, `bgm_01..03.mp3`, characters/ |
| Pays du Feu | `island-pays-du-feu` | `music/bgm_*.mp3`, characters/, gifs/ |

---

## FEATURE FLAGS — ÉTAT ACTUEL

| Flag | État | Note |
|---|---|---|
| `LESSONS` | ✅ true | Page leçon active |
| `ANALYTICS` | ✅ true | Tracking Supabase actif |
| `DAILY_REWARD` | ✅ true | Daily reward actif |
| `BADGES` | 🔜 false | À développer |
| `STRIPE` | 🔜 false | À développer |
| `NOTIFICATIONS` | 🔜 false | Push web |
| `BOSS_MECHANIC` | 🔜 false | HP bar boss |
| `LEADERBOARD` | 🔜 false | Classement familial |

---

## MONDES — ÉTAT ACTUEL

| Monde | Route | Statut | Fichiers |
|---|---|---|---|
| 🏴‍☠️ Grand Bleu | `iles` | ✅ Prod | `worlds/grand-bleu/` |
| 🐉 Magnolia | `histoire` | ✅ Prod | `worlds/magnolia/` |
| ⚔️ Kanto | `kanto` | ✅ Prod | `worlds/kanto/` |
| 🔥 Pays du Feu | `pays-du-feu` | ✅ Prod | `worlds/pays-du-feu/` |
| 🌀 Namek | `namek` | 🔒 Locked | À créer |
| 🌿 Forêt Konoha | `foret-konoha` | 🔒 Locked | À créer |

---

*Dernière mise à jour : 23 mars 2026*
*Version : 2.0*
