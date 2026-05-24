// ═══════════════════════════════════════════════════════════
// QUIZ-SINDRIA.JS — Académie Pirate V2
// 🇸🇦 Sindria · Arabe littéraire (Fusha) · Magi: The Labyrinth of Magic
// ─────────────────────────────────────────────────────────
// CE FICHIER = STUB MINIMAL V2
// Seules les constantes globales sont ici.
// Toute la logique est dans :
//   → quiz-router.js  (navigation, cinématiques, niveaux)
//   → quiz-engine.js  (AP_QuizEngine — moteur questions)
//   → lesson-data.js  (lesson_sindria — leçons)
//   → audio.js        (audio-engine-magi-patch.js — BGM)
// NE PAS rajouter de fonctions sind_* ici : conflit V1/V2
// ═══════════════════════════════════════════════════════════

// ── Storage URL ─────────────────────────────────────────────
var MAGI_STORAGE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-sindria/characters/';

// ── Avatars héros legacy (à remplir avec les 40 personnages mappés) ──
// Les vrais avatars dynamiques par niveau sont dans lesson-data.js (_MAGI_AVATARS)
var ARAB_AVATARS = {
  1: MAGI_STORAGE + 'aladdin.jpg',
  2: MAGI_STORAGE + 'alibaba.jpg',
  3: MAGI_STORAGE + 'morgiana.jpg',
  4: MAGI_STORAGE + 'hakuryuu.jpg',
  5: MAGI_STORAGE + 'ugo.jpg',
  6: MAGI_STORAGE + 'kassim.jpg',
  7: MAGI_STORAGE + 'leila.jpg',
  8: MAGI_STORAGE + 'sahsa.jpg'
};
