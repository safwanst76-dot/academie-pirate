// ═══════════════════════════════════════════════════════════════
// AUDIO-ENGINE-KANTO-PATCH.JS — Académie Pirate
// Pays : Kanto · Sciences · Univers : Demon Slayer
// ✅ PRIORITÉ 1 : MP3 dans Supabase Storage (island-demon-slayer)
// ✅ PRIORITÉ 2 : Fichier local assets/audio/bgm/
// ✅ PRIORITÉ 3 : Fallback YouTube (si hors ligne ou fichier manquant)
// Charger CE fichier APRÈS audio-engine.js dans index.html
// ═══════════════════════════════════════════════════════════════

(function () {

  // ── CONFIG ──
  var SUPABASE_URL     = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
  var BUCKET           = 'island-demon-slayer';
  var STORAGE_BASE     = SUPABASE_URL + '/storage/v1/object/public/' + BUCKET + '/music/';
  var LOCAL_AUDIO_PATH = 'assets/audio/bgm/';

  // Mapping track-id → fichier MP3 dans Supabase
  // Les noms doivent correspondre exactement à ce qui a été uploadé
  var SUPABASE_FILES = {
    // ✅ CORRECTION : 'kanto-theme' ajouté (router.js l'appelait, causait un silence)
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
    // ✅ CORRECTION : île 6 → bgm_01 (épique Rengoku, pas bgm_quiz)
    'kanto-isle-6':  'bgm_01.mp3',
    // ✅ CORRECTION : île 7 → bgm_02 (différent de île 1)
    'kanto-isle-7':  'bgm_02.mp3',
    'kanto-isle-8':  'bgm_boss.mp3',
  };

  // Fallback YouTube si Supabase ET local sont indisponibles
  var YT_IDS = {
    // ✅ CORRECTION : 'kanto-theme' ajouté
    'kanto-theme':   '4o6wKKUB4z8',
    'kanto-map':     '4o6wKKUB4z8',  // Kamado Tanjiro no Uta
    'kanto-battle':  'rD2Kj3ivNME',  // Gurenge
    'kanto-victory': 'SVhHhtG4DPM',  // Flame Hashira Theme
    'kanto-boss':    'BqVnDDjSIiM',  // DS OST Boss
    'kanto-quiz':    'BqVnDDjSIiM',
    'kanto-isle':    '4o6wKKUB4z8',
    'kanto-isle-1':  'lawxxhiqEGc',
    'kanto-isle-2':  'CEp-alXpKYI',
    'kanto-isle-3':  '1mlLv97kxFI',
    'kanto-isle-4':  '4o6wKKUB4z8',
    'kanto-isle-5':  'rD2Kj3ivNME',
    // ✅ CORRECTION : cohérent avec SUPABASE_FILES
    'kanto-isle-6':  'lawxxhiqEGc',
    'kanto-isle-7':  'CEp-alXpKYI',
    'kanto-isle-8':  'SVhHhtG4DPM',
  };

  // ── État interne ──
  var _audioEl     = null;
  var _ytPlayer    = null;
  var _ytReady     = false;
  var _ytPending   = null;
  var _ytCurrent   = null;
  var _currentSrc  = null;

  var _originalPlayBGM = window.playBGM;
  var _originalStopBGM = window.stopBGM;

  // ══════════════════════════════════
  // AUDIO HTML5 (Supabase + local)
  // ══════════════════════════════════
  function _getAudioEl() {
    if (!_audioEl) {
      _audioEl          = new Audio();
      _audioEl.loop     = true;
      _audioEl.volume   = 0.45;
      _audioEl.preload  = 'auto';
    }
    return _audioEl;
  }

  function _stopHTML5() {
    if (_audioEl) {
      try { _audioEl.pause(); _audioEl.currentTime = 0; } catch (e) {}
    }
    _currentSrc = null;
  }

  // Tente de jouer une liste d'URLs dans l'ordre (premier succès = victoire)
  function _tryPlaySources(sources, onSuccess, onFail) {
    var idx = 0;
    var el  = _getAudioEl();

    function tryNext() {
      if (idx >= sources.length) {
        if (typeof onFail === 'function') onFail();
        return;
      }
      var src = sources[idx++];
      el.src = src;
      el.load();
      var p = el.play();
      if (p && typeof p.then === 'function') {
        p.then(function () {
          _currentSrc = src;
          if (typeof onSuccess === 'function') onSuccess(src);
        }).catch(tryNext);
      } else {
        // Pas de Promise → vieux navigateur, on espère que ça marche
        _currentSrc = src;
        if (typeof onSuccess === 'function') onSuccess(src);
      }
    }
    tryNext();
  }

  // ══════════════════════════════════
  // YOUTUBE FALLBACK
  // ══════════════════════════════════
  function _injectYT() {
    if (document.getElementById('yt-kanto-api')) return;
    var tag    = document.createElement('script');
    tag.id     = 'yt-kanto-api';
    tag.src    = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  function _ensureYTContainer() {
    if (document.getElementById('yt-kanto-wrap')) return;
    var wrap     = document.createElement('div');
    wrap.id      = 'yt-kanto-wrap';
    wrap.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-9999;bottom:0;left:0;overflow:hidden';
    var div      = document.createElement('div');
    div.id       = 'yt-kanto-player';
    wrap.appendChild(div);
    document.body.appendChild(wrap);
  }

  // On préserve l'éventuel onYouTubeIframeAPIReady existant (DBZ patch)
  var _prevYTReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (typeof _prevYTReady === 'function') _prevYTReady();
    _ensureYTContainer();
    _ytPlayer = new YT.Player('yt-kanto-player', {
      height: '1', width: '1',
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0,
                    iv_load_policy: 3, modestbranding: 1, rel: 0, playsinline: 1 },
      events: {
        onReady: function (e) {
          _ytReady = true;
          e.target.setVolume(45);
          if (_ytPending) { _ytPlayId(_ytPending); _ytPending = null; }
        },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.ENDED) {
            _ytPlayer.seekTo(0); _ytPlayer.playVideo();
          }
        },
        onError: function (e) { console.warn('[Kanto Patch] YouTube error:', e.data); }
      }
    });
  };

  function _ytPlayId(ytId) {
    _ytCurrent = ytId;
    _ytPlayer.loadVideoById({ videoId: ytId, startSeconds: 0 });
    _ytPlayer.playVideo();
  }

  function _ytStop() {
    if (_ytPlayer && _ytReady) {
      try { _ytPlayer.stopVideo(); } catch (e) {}
    }
    _ytCurrent = null;
  }

  function _ytPlay(track) {
    var ytId = YT_IDS[track];
    if (!ytId) { console.warn('[Kanto Patch] Pas d\'ID YouTube pour', track); return; }

    if (!_ytReady) {
      _ytPending = track;
      _injectYT();
      _ensureYTContainer();
      return;
    }
    _ytStop();
    _ytPlayId(ytId);
  }

  // ══════════════════════════════════
  // MAIN playBGM override
  // ══════════════════════════════════
  window.playBGM = function (track) {
    var isKanto = (typeof track === 'string') && track.startsWith('kanto-');

    if (!isKanto) {
      // Track non-Kanto → stopper le kanto et passer à l'engine original
      _stopHTML5();
      _ytStop();
      if (typeof _originalPlayBGM === 'function') _originalPlayBGM(track);
      return;
    }

    // Stopper tout ce qui tourne
    _ytStop();
    _stopHTML5();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();

    var supabaseFile = SUPABASE_FILES[track];
    var sources      = [];

    // Source 1 : Supabase Storage (si le fichier est mappé)
    if (supabaseFile) {
      sources.push(STORAGE_BASE + supabaseFile);
    }

    // Source 2 : Fichier local
    sources.push(LOCAL_AUDIO_PATH + track + '.mp3');
    if (supabaseFile) sources.push(LOCAL_AUDIO_PATH + supabaseFile);

    _tryPlaySources(
      sources,
      function (src) {
        console.log('[Kanto Patch] ✓ Audio joué :', src);
      },
      function () {
        // Toutes les sources HTML5 ont échoué → YouTube fallback
        console.log('[Kanto Patch] Fallback YouTube pour', track);
        _ytPlay(track);
      }
    );
  };

  // ══════════════════════════════════
  // stopBGM override
  // ══════════════════════════════════
  window.stopBGM = function () {
    _stopHTML5();
    _ytStop();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();
  };

  // ══════════════════════════════════
  // Volume
  // ══════════════════════════════════
  var _origSetVolume = window.setVolume;
  window.setVolume = function (v) {
    if (_audioEl)  _audioEl.volume = parseFloat(v) * 0.9;
    if (_ytPlayer && _ytReady) _ytPlayer.setVolume(v * 100);
    if (typeof _origSetVolume === 'function') _origSetVolume(v);
  };

  console.info('⚔️  audio-engine-kanto-patch.js chargé — Supabase Storage prioritaire, YouTube fallback');

})();