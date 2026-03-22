// ═══════════════════════════════════════════════════════════════
// AUDIO-ENGINE-NARUTO-PATCH.JS — Académie Pirate
// Pays : Pays du Feu · Univers : Naruto
// ✅ Supabase Storage bucket island-pays-du-feu/music/ — UNIQUEMENT
// ❌ YouTube supprimé — règle AU-01
// ✅ Isolation préfixe naruto-* — règle AU-02
// ✅ Retry autoplay sur clic — règle AU-03
// ❌ Ne modifie pas audio-engine.js — règle AU-05
// ⚠️ Charger APRÈS audio-engine.js, AVANT supabase-patch.js
// ═══════════════════════════════════════════════════════════════

(function () {

  var STORAGE_BASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu/music/';

  // Mapping track → fichier MP3 dans le bucket
  var SUPABASE_FILES = {
    'naruto-map':     'bgm_map.mp3',
    'naruto-battle':  'bgm_battle.mp3',
    'naruto-victory': 'bgm_victory.mp3',
    'naruto-boss':    'bgm_boss.mp3',
    'naruto-isle':    'bgm_map.mp3',
  };

  var _audioEl        = null;
  var _currentSrc     = null;
  var _originalPlayBGM = window.playBGM;
  var _originalStopBGM = window.stopBGM;

  function _getAudioEl() {
    if (!_audioEl) {
      _audioEl         = new Audio();
      _audioEl.loop    = true;
      _audioEl.volume  = 0.45;
      _audioEl.preload = 'auto';
    }
    return _audioEl;
  }

  function _stopHTML5() {
    if (_audioEl) {
      try { _audioEl.pause(); _audioEl.currentTime = 0; } catch (e) {}
    }
    _currentSrc = null;
  }

  function _play(url) {
    var el = _getAudioEl();
    // Déjà en cours → ne rien faire
    if (_currentSrc === url && !el.paused) return;
    el.src = url;
    el.load();
    var p = el.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        _currentSrc = url;
        console.log('[Naruto Patch] ✓ Audio Supabase :', url.split('/').pop());
      }).catch(function (e) {
        // Autoplay bloqué (règle AU-03) → retry sur premier clic
        if (e && e.name === 'NotAllowedError') {
          console.info('[Naruto Patch] autoplay bloqué, attente clic');
          document.addEventListener('click', function _retry() {
            el.play().catch(function(){});
            document.removeEventListener('click', _retry);
          }, { once: true });
          return;
        }
        console.warn('[Naruto Patch] Erreur Supabase :', e && e.message);
      });
    } else {
      _currentSrc = url;
    }
  }

  // ── playBGM override (règle OC-04 : sauvegarder l'original) ──
  window.playBGM = function (track) {
    var isNaruto = (typeof track === 'string') && track.startsWith('naruto-');

    if (!isNaruto) {
      // Pas une track Naruto → déléguer aux autres patches (règle AU-02)
      _stopHTML5();
      if (typeof _originalPlayBGM === 'function') _originalPlayBGM(track);
      return;
    }

    // Stopper tout ce qui tourne
    _stopHTML5();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();

    var file = SUPABASE_FILES[track];
    if (!file) {
      console.warn('[Naruto Patch] Track non mappé :', track);
      return;
    }

    _play(STORAGE_BASE + file);
  };

  // ── stopBGM override ──
  window.stopBGM = function () {
    _stopHTML5();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();
  };

  // ── Volume ──
  var _origSetVolume = window.setVolume;
  window.setVolume = function (v) {
    if (_audioEl) _audioEl.volume = parseFloat(v) * 0.9;
    if (typeof _origSetVolume === 'function') _origSetVolume(v);
  };

  console.info('🔥 audio-engine-naruto-patch.js v1 — Supabase uniquement, YouTube supprimé');
})();
