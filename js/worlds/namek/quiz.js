// ═══════════════════════════════════════════════════════════
// QUIZ-NAMEK.JS — Académie Pirate V2
// 🔮 Namek · Géographie · Jujutsu Kaisen
// ─────────────────────────────────────────────────────────
// CE FICHIER = STUB MINIMAL V2 (pattern Magnolia / Kanto)
// Toute la logique est dans :
//   → quiz-router.js  (navigation, cinématiques, niveaux)
//   → quiz-engine.js  (AP_QuizEngine — moteur questions)
//   → lesson-data.js  (lesson_namek — leçons)
//   → audio.js        (audio-engine-namek-patch.js — BGM)
// NE PAS rajouter de fonctions namek_* ici : conflit V1/V2
// ═══════════════════════════════════════════════════════════

var JJK_STORAGE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/';

// ── Avatars héros (utilisés par quiz-engine + lesson) ───────
// Mapping CM2 par défaut (le router V2 utilise les hero_image de la DB)
var NAMEK_AVATARS = {
  1: JJK_STORAGE + 'yuji.png',
  2: JJK_STORAGE + 'megumi.jpg',
  3: JJK_STORAGE + 'nobara.png',
  4: JJK_STORAGE + 'gojo.jpg',
  5: JJK_STORAGE + 'inumaki.png',
  6: JJK_STORAGE + 'yuta.jpg',
  7: JJK_STORAGE + 'todo.jpg',
  8: JJK_STORAGE + 'nanami.jpg'
};

// ── Boss avatars (pour AP_QuizEngine boss-battle) ───────────
var NAMEK_BOSS_AVATARS = {
  'Sukuna': JJK_STORAGE + 'sukuna.jpg',
  'Mahito': JJK_STORAGE + 'mahito.jpg',
  'Jogo':   JJK_STORAGE + 'jogo.png',
  'Hanami': JJK_STORAGE + 'hanami.png',
  'Dagon':  JJK_STORAGE + 'dagon.png'
};
