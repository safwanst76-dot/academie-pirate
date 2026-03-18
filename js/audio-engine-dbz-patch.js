// ═══════════════════════════════════════════════════════
// AUDIO-ENGINE-DBZ-PATCH.JS — Académie Pirate — v4
// ✅ Supabase Storage bucket island-magnolia — UNIQUEMENT
// ❌ YouTube supprimé — règle AU-01
// ❌ Autoplay bloqué → retry sur premier clic utilisateur
// ⚠️ Charger CE fichier APRÈS audio-engine.js dans index.html
// ═══════════════════════════════════════════════════════

(function() {

  // ── CONFIG ──
  var SUPABASE_BASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-magnolia/';

  // Mapping track → fichier dans bucket island-magnolia
  var SUPABASE_FILES = {
    'dbz-map':     'dbz-map.mp3',
    'dbz-battle':  'dbz-battle.mp3',
    'dbz-victory': 'dbz-victory.mp3',
    'dbz-isle':    'dbz-isle.mp3',
  };

  // ── État interne ──
  var _audioEl = null;
  var _originalPlayBGM = window.playBGM;
  var _originalStopBGM = window.stopBGM;

  // ── Audio Supabase ──
  function _playSupabase(track) {
    return new Promise(function(resolve, reject) {
      var filename = SUPABASE_FILES[track];
      if (!filename) { reject(new Error('Track non mappé : ' + track)); return; }

      var src = SUPABASE_BASE + filename;

      if (!_audioEl) {
        _audioEl        = new Audio();
        _audioEl.loop   = true;
        _audioEl.volume = 0.45;
      }

      // Déjà en cours → ne rien faire
      if (_audioEl.src === src && !_audioEl.paused) { resolve(); return; }

      _audioEl.src = src;
      _audioEl.load();
      var p = _audioEl.play();
      if (p && typeof p.then === 'function') {
        p.then(resolve).catch(reject);
      } else {
        resolve();
      }
    });
  }

  function _stopSupabase() {
    if (_audioEl) {
      try { _audioEl.pause(); _audioEl.currentTime = 0; } catch(e) {}
    }
  }

  // ── playBGM override ──
  window.playBGM = function(track) {
    var isDbz = (typeof track === 'string') && track.startsWith('dbz-');

    if (!isDbz) {
      // Pas une track DBZ → laisser les autres patches gérer (règle AU-02)
      _stopSupabase();
      if (typeof _originalPlayBGM === 'function') _originalPlayBGM(track);
      return;
    }

    // Stopper tout ce qui tourne
    _stopSupabase();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();

    // Jouer depuis Supabase
    _playSupabase(track).then(function() {
      console.log('[DBZ Patch] ✓ Supabase joué :', track);
    }).catch(function(e) {
      // Autoplay bloqué (NotAllowedError) → attendre le premier clic (règle AU-03)
      // Règle AU-01 : YouTube est interdit — on n'y bascule JAMAIS.
      if (e && e.name === 'NotAllowedError') {
        console.info('[DBZ Patch] autoplay bloqué, attente clic :', track);
        document.addEventListener('click', function _retry() {
          _playSupabase(track).catch(function(){});
          document.removeEventListener('click', _retry);
        }, { once: true });
        return;
      }
      // Autre erreur (réseau, fichier manquant) → log non-bloquant
      console.warn('[DBZ Patch] Erreur Supabase :', track, e && e.message);
    });
  };

  // ── stopBGM override ──
  window.stopBGM = function() {
    _stopSupabase();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();
  };

  // ── Volume ──
  var _origSetVolume = window.setVolume;
  window.setVolume = function(v) {
    if (_audioEl) _audioEl.volume = parseFloat(v) * 0.9;
    if (typeof _origSetVolume === 'function') _origSetVolume(v);
  };

  console.info('🐉 audio-engine-dbz-patch.js v4 — Supabase uniquement, YouTube supprimé');

})();