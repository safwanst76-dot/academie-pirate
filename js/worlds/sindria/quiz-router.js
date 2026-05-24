// ═══════════════════════════════════════════════════════════════════
// QUIZ-ROUTER-SINDRIA.JS V2 — Académie Pirate
// 🇸🇦 Sindria · Arabe littéraire (Fusha) · Magi
// Pattern exact Grand Bleu V3
// PREFIX: sind | MATIERE: arabe | STORAGE: sindria
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var _currentNiveau = null;
  var _chapitres     = [];
  var _sindBgLoaded  = false;
  var MATIERE_CODE   = 'arabe';
  var MAGI_STORAGE   = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-sindria/';

  // ── Cinématiques : clé 'niveau_numero' ──────────────────────────
  // TODO : 40 entrées (5 niveaux × 8 îles) — à remplir lors du contenu
  var SIND_ISLE_INTRO = {
    // CM2 — Arc Balbadd (initiation arabe)
    // 'cm2_1': { bg:'#0a0500', lines:['BALBADD...','... LA CITÉ DES SABLES !','Aladdin entre en scène !'],
    //            kanji:'الفتى !!', kanjiColor:'#f59e0b',
    //            bubble:"Aladdin sourit. Salutations en arabe !" },
    // ... 39 autres entrées
  };

  // ── Niveaux disponibles ────────────────────────────────────────
  var NIVEAUX = [
    { code:'cm2',  nom:'CM2',  emoji:'⭐',     color:'#22c55e', desc:'Initiation ludique' },
    { code:'6eme', nom:'6ème', emoji:'⭐⭐',    color:'#3b82f6', desc:'A1+ : alphabet et bases' },
    { code:'5eme', nom:'5ème', emoji:'⭐⭐⭐',   color:'#a855f7', desc:'A2 : passé et idâfa' },
    { code:'4eme', nom:'4ème', emoji:'⭐⭐⭐⭐',  color:'#f59e0b', desc:'A2+ : subjonctif et apocopé' },
    { code:'3eme', nom:'3ème', emoji:'⭐⭐⭐⭐⭐', color:'#ef4444', desc:'B1 : verbes malades' }
  ];

  // ───────────────────────────────────────────────────────────────
  // showSindriaV2 — point d'entrée du monde
  // ───────────────────────────────────────────────────────────────
  function showSindriaV2(silent) {
    if (!silent && window.history && window.history.pushState)
      window.history.pushState(null, '', '#/arabe');
    if (window.AP) window.AP.trackWorldEnter('sindria');
    if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('sindria');
    
    // TODO : reste de la logique d'affichage (à copier depuis quiz-router-grand-bleu.js)
    console.log('[Sindria] showSindriaV2 appelé — stub V2');
  }

  // ── Exports globaux ────────────────────────────────────────────
  window.showSindriaV2     = showSindriaV2;
  // window.sind_showLevel   = showLevel;
  // window.sind_showLevels  = function(){ showSindriaV2(true); };
  // window.sind_startIsland = startIsland;
  // window.sind_skipCine    = skipCine;
})();
