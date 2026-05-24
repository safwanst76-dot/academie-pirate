// ═══════════════════════════════════════════════════════════
// AUDIO-SINDRIA.JS — Académie Pirate V2
// 🇸🇦 Sindria · Arabe · Magi
// Préfixe audio : sindria-* (isolation AU-02)
// BGM hébergés sur Supabase Storage bucket "sindria/music/"
// ═══════════════════════════════════════════════════════════
(function () {
  'use strict';
  
  var BGM_URLS = {
    'sindria-map':     'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-sindria/music/sindria-map.mp3',
    'sindria-battle':  'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-sindria/music/battle.mp3',
    'sindria-victory': 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-sindria/music/victory.mp3'
  };
  
  // Enregistrement auprès de l'audio-engine global
  if (window.AP_Audio && typeof window.AP_Audio.registerWorld === 'function') {
    window.AP_Audio.registerWorld('sindria', BGM_URLS);
  } else {
    // Fallback : exposer la table pour récupération différée
    window._sindria_BGM = BGM_URLS;
  }
})();
