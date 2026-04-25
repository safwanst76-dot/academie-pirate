// ═══════════════════════════════════════════════════════════
// QUIZ-HISTOIRE.JS — Académie Pirate V2
// 🐉 Magnolia · Histoire · Dragon Ball Z
// ─────────────────────────────────────────────────────────
// CE FICHIER = STUB MINIMAL V2
// Seules les constantes globales sont ici.
// Toute la logique est dans :
//   → quiz-router.js  (navigation, cinématiques, niveaux)
//   → quiz-engine.js  (AP_QuizEngine — moteur questions)
//   → lesson-data.js  (lesson_magnolia — leçons)
//   → audio.js        (audio-engine-dbz-patch.js — BGM)
// NE PAS rajouter de fonctions hist_* ici : conflit V1/V2
// ═══════════════════════════════════════════════════════════

// ── Storage URL ─────────────────────────────────────────────
var DBZ_STORAGE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-magnolia/characters/';

// ── Avatars héros (utilisés par quiz-engine + lesson) ───────
var HIST_AVATARS = {
  1: DBZ_STORAGE + 'goku.jpg',
  2: DBZ_STORAGE + 'vegeta.jpg',
  3: DBZ_STORAGE + 'piccolo.png',
  4: DBZ_STORAGE + 'gohan.jpg',
  5: DBZ_STORAGE + 'trunks.jpg',
  6: DBZ_STORAGE + 'krilin.jpg',
  7: DBZ_STORAGE + 'android18.jpg',
  8: DBZ_STORAGE + 'bulma.jpg'
};
