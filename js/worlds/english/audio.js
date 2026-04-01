// ═══════════════════════════════════════════════════════════════
// AUDIO.JS — ⚔️ Paradis · Univers : Attack on Titan
// ✅ Supabase Storage bucket island-aot/music/ — UNIQUEMENT
// ❌ YouTube supprimé — règle AU-01
// ✅ Isolation préfixe aot-* — règle AU-02
// ✅ Retry autoplay sur clic — règle AU-03
// ✅ playBGM déclenché après leçon (callback) — règle AU-04
// ❌ Ne modifie pas audio-engine.js — règle AU-05
// ⚠️ Charger APRÈS audio-engine.js, AVANT supabase-patch.js
// ═══════════════════════════════════════════════════════════════

(function () {

  var STORAGE_BASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/music/';

  // Mapping track-id → fichier MP3 dans le bucket
  var SUPABASE_FILES = {
    'aot-map':     'aot-map.mp3',
    'aot-battle':  'aot-battle.mp3',
    'aot-victory': 'aot-victory.mp3',
    'aot-boss':    'aot-boss.mp3',
    'aot-isle':    'aot-isle.mp3',
    'aot-defeat':  'aot-defeat.mp3',
  };

  var _audioEl         = null;
  var _currentSrc      = null;
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
    if (_currentSrc === url && !el.paused) return;
    el.src = url;
    el.load();
    var p = el.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        _currentSrc = url;
        console.log('[AOT Patch] ✓ Audio Supabase :', url.split('/').pop());
      }).catch(function (e) {
        if (e && e.name === 'NotAllowedError') {
          console.info('[AOT Patch] autoplay bloqué, attente clic');
          document.addEventListener('click', function _retry() {
            el.play().catch(function () {});
            document.removeEventListener('click', _retry);
          }, { once: true });
          return;
        }
        console.warn('[AOT Patch] Erreur Supabase :', e && e.message);
      });
    } else {
      _currentSrc = url;
    }
  }

  // ── playBGM override ──────────────────────────────────────────
  window.playBGM = function (track) {
    var isAot = (typeof track === 'string') && track.startsWith('aot-');

    if (!isAot) {
      _stopHTML5();
      if (typeof _originalPlayBGM === 'function') _originalPlayBGM(track);
      return;
    }

    _stopHTML5();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();

    var file = SUPABASE_FILES[track];
    if (!file) {
      console.warn('[AOT Patch] Track non mappé :', track);
      return;
    }

    _play(STORAGE_BASE + file);
  };

  // ── stopBGM override ──────────────────────────────────────────
  window.stopBGM = function () {
    _stopHTML5();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();
  };

  // ── Volume ────────────────────────────────────────────────────
  var _origSetVolume = window.setVolume;
  window.setVolume = function (v) {
    if (_audioEl) _audioEl.volume = parseFloat(v) * 0.9;
    if (typeof _origSetVolume === 'function') _origSetVolume(v);
  };

  console.info('⚔️ audio-english.js v1 — Supabase uniquement, préfixe aot-*, YouTube supprimé');

})();
