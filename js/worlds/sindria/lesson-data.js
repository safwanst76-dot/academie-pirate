// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA-SINDRIA.JS — Académie Pirate V2
// 🇸🇦 Sindria · Arabe littéraire (Fusha) · Magi
// Pattern exact Grand Bleu : LESSON_REGISTRY par niveau
// 5 niveaux × 8 îles = 40 entrées
// ═══════════════════════════════════════════════════════════════════

window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

var _MAGI = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-sindria/characters/';

// ── Mapping avatars par niveau (règle CIN-01 — 8 UNIQUES par niveau) ──
// Validé 22 mai 2026 — mapping Magi V1.1
var _MAGI_AVATARS = {
  'cm2':  {1:'aladdin.jpg',     2:'alibaba.jpg',     3:'morgiana.jpg',     4:'hakuryuu.jpg',
           5:'ugo.jpg',          6:'kassim.jpg',       7:'leila.jpg',        8:'sahsa.jpg'},
  '6eme': {1:'sinbad.jpg',      2:'jafar.jpg',        3:'masrur.jpg',       4:'sharrkan.jpg',
           5:'yamraiha.jpg',    6:'pisti.jpg',        7:'spartos.jpg',      8:'hinahoho.jpg'},
  '5eme': {1:'kouen.jpg',       2:'koumei.jpg',       3:'kouha.jpg',        4:'hakuei.jpg',
           5:'kougyoku.jpg',    6:'judar.jpg',        7:'seishuu.jpg',      8:'kokuhyou.jpg'},
  '4eme': {1:'scheherazade.jpg',2:'muu.jpg',          3:'myron.jpg',        4:'lolo.jpg',
           5:'razol.jpg',       6:'titus.jpg',        7:'nerva.jpg',        8:'ignatius.jpg'},
  '3eme': {1:'yunan.jpg',       2:'sphintus.jpg',     3:'drakon.jpg',       4:'nephria.jpg',
           5:'solomon.jpg',     6:'arba.jpg',         7:'david.jpg',        8:'aladdin-adulte.jpg'}
};

// ═══════════════════════════════════════════════════════════════════
// REGISTRES (à remplir lors des phases de contenu)
// ═══════════════════════════════════════════════════════════════════

window.LESSON_REGISTRY['sindria_cm2'] = {
  color: '#d4a017', bg: '#0a0500', textAccent: '#f59e0b',
  particles: 'star', worldName: 'Sindria',
  avatar: function(n) { return _MAGI + (_MAGI_AVATARS['cm2'][n] || 'aladdin.jpg'); },
  lessons: {
    // TODO : 8 leçons CM2 (initiation arabe ludique)
  }
};

window.LESSON_REGISTRY['sindria_6eme'] = {
  color: '#d4a017', bg: '#0a0500', textAccent: '#f59e0b',
  particles: 'star', worldName: 'Sindria',
  avatar: function(n) { return _MAGI + (_MAGI_AVATARS['6eme'][n] || 'sinbad.jpg'); },
  lessons: {
    // TODO : 8 leçons 6ème (A1+ — alphabet + grammaire de base)
  }
};

window.LESSON_REGISTRY['sindria_5eme'] = {
  color: '#d4a017', bg: '#0a0500', textAccent: '#f59e0b',
  particles: 'star', worldName: 'Sindria',
  avatar: function(n) { return _MAGI + (_MAGI_AVATARS['5eme'][n] || 'kouen.jpg'); },
  lessons: {
    // TODO : 8 leçons 5ème (A2 — passé + idâfa)
  }
};

window.LESSON_REGISTRY['sindria_4eme'] = {
  color: '#d4a017', bg: '#0a0500', textAccent: '#f59e0b',
  particles: 'star', worldName: 'Sindria',
  avatar: function(n) { return _MAGI + (_MAGI_AVATARS['4eme'][n] || 'scheherazade.jpg'); },
  lessons: {
    // TODO : 8 leçons 4ème (A2+ — subjonctif + apocopé)
  }
};

window.LESSON_REGISTRY['sindria_3eme'] = {
  color: '#d4a017', bg: '#0a0500', textAccent: '#f59e0b',
  particles: 'star', worldName: 'Sindria',
  avatar: function(n) { return _MAGI + (_MAGI_AVATARS['3eme'][n] || 'yunan.jpg'); },
  lessons: {
    // TODO : 8 leçons 3ème (B1 — verbes malades + déclinaison complète)
  }
};
