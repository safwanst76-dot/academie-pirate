// ═══════════════════════════════════════════════════════════
// QUIZ-KANTO.JS — Académie Pirate V2
// ⚔️ Kanto · Sciences · Demon Slayer
// ─────────────────────────────────────────────────────────
// CE FICHIER = STUB MINIMAL V2 (pattern Magnolia)
// Toute la logique est dans :
//   → quiz-router.js  (navigation, cinématiques, niveaux)
//   → quiz-engine.js  (AP_QuizEngine — moteur questions)
//   → lesson-data.js  (lesson_kanto — leçons)
//   → audio.js        (audio-engine-kanto-patch.js — BGM)
// NE PAS rajouter de fonctions kanto_* ici : conflit V1/V2
// ═══════════════════════════════════════════════════════════

var DS_STORAGE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer/characters/';

// ── Avatars héros (utilisés par quiz-engine + lesson) ───────
// Mapping CM2 par défaut (le router V2 utilise les hero_image de la DB)
var KANTO_AVATARS = {
  1: DS_STORAGE + 'tanjiro.jpg',
  2: DS_STORAGE + 'nezuko.jpeg',
  3: DS_STORAGE + 'zenitsu.jpg',
  4: DS_STORAGE + 'inosuke.jpg',
  5: DS_STORAGE + 'giyu.png',
  6: DS_STORAGE + 'shinobu.png',
  7: DS_STORAGE + 'kanao.jpg',
  8: DS_STORAGE + 'rengoku.jpg'
};

// ── Boss avatars (pour AP_QuizEngine boss-battle) ───────────
var KANTO_BOSS_AVATARS = {
  'Rui':      DS_STORAGE + 'rui.jpg',
  'Akaza':    DS_STORAGE + 'akaza.jpg',
  'Hantengu': DS_STORAGE + 'hantengu.jpg',
  'Doma':     DS_STORAGE + 'doma.jpg',
  'Gyokko':   DS_STORAGE + 'gyokko.jpg',
  'Gyutaro':  DS_STORAGE + 'gyutaro.jpg',
  'Nakime':   DS_STORAGE + 'nakime.jpeg',
  'Muzan':    DS_STORAGE + 'muzan.jpg'
};
