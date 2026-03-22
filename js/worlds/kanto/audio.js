// ═══════════════════════════════════════════════════════════════
// AUDIO-ENGINE-KANTO-PATCH.JS — Académie Pirate — v4
// ✅ Supabase Storage UNIQUEMENT (island-demon-slayer)
// ❌ YouTube supprimé — plus de pubs
// ═══════════════════════════════════════════════════════════════

(function () {

  var STORAGE_BASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer/music/';

  var SUPABASE_FILES = {
    'kanto-theme':   'bgm_map.mp3',
    'kanto-map':     'bgm_map.mp3',
    'kanto-battle':  'bgm_battle.mp3',
    'kanto-victory': 'bgm_victory.mp3',
    'kanto-boss':    'bgm_boss.mp3',
    'kanto-quiz':    'bgm_quiz.mp3',
    'kanto-isle':    'bgm_01.mp3',
    'kanto-isle-1':  'bgm_01.mp3',
    'kanto-isle-2':  'bgm_02.mp3',
    'kanto-isle-3':  'bgm_03.mp3',
    'kanto-isle-4':  'bgm_map.mp3',
    'kanto-isle-5':  'bgm_battle.mp3',
    'kanto-isle-6':  'bgm_01.mp3',
    'kanto-isle-7':  'bgm_02.mp3',
    'kanto-isle-8':  'bgm_boss.mp3',
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

  function _play(url, onFail) {
    var el = _getAudioEl();
    if (_currentSrc === url && !el.paused) return; // déjà en cours
    el.src = url;
    el.load();
    var p = el.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        _currentSrc = url;
        console.log('[Kanto] ✓ Audio Supabase :', url.split('/').pop());
      }).catch(function (e) {
        // Autoplay bloqué → attendre un clic
        console.warn('[Kanto] autoplay bloqué, attente clic');
        document.addEventListener('click', function _retry() {
          el.play().catch(function(){});
          document.removeEventListener('click', _retry);
        }, { once: true });
      });
    } else {
      _currentSrc = url;
    }
  }

  // ── playBGM override ──
  window.playBGM = function (track) {
    var isKanto = (typeof track === 'string') && track.startsWith('kanto-');

    if (!isKanto) {
      _stopHTML5();
      if (typeof _originalPlayBGM === 'function') _originalPlayBGM(track);
      return;
    }

    _stopHTML5();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();

    var file = SUPABASE_FILES[track];
    if (!file) {
      console.warn('[Kanto] Track non mappé :', track);
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

  console.info('⚔️  audio-engine-kanto-patch.js v4 — Supabase uniquement, YouTube supprimé');
})();
