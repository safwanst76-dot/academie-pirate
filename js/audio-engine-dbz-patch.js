// ═══════════════════════════════════════════════════════
// AUDIO-ENGINE-DBZ-PATCH.JS — Académie Pirate — v3
// ✅ Supabase Storage (grand-bleu) — prioritaire
// ✅ Fallback YouTube si Supabase indisponible
// ⚠️ Charger CE fichier APRÈS audio-engine.js dans index.html
// ═══════════════════════════════════════════════════════

(function() {

  // ── CONFIG ──
  var SUPABASE_BASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-magnolia/';

  // Mapping track → fichier dans le bucket grand-bleu
  var SUPABASE_FILES = {
    'dbz-map':     'dbz-map.mp3',
    'dbz-battle':  'dbz-battle.mp3',
    'dbz-victory': 'dbz-victory.mp3',
    'dbz-isle':    'dbz-isle.mp3',
  };

  // Fallback YouTube si Supabase échoue
  var YT_IDS = {
    'dbz-map':     'vRA4wGDEajw',
    'dbz-battle':  'Lttvfc3ywJs',
    'dbz-victory': 'Lttvfc3ywJs',
    'dbz-isle':    'vRA4wGDEajw',
  };

  // ── État interne ──
  var _ytPlayer = null, _ytReady = false, _ytPending = null, _ytCurrent = null;
  var _audioEl = null;
  var _originalPlayBGM = window.playBGM;
  var _originalStopBGM = window.stopBGM;

  // ── YouTube API ──
  function _injectYT() {
    if (document.getElementById('yt-api-script')) return;
    var tag = document.createElement('script');
    tag.id  = 'yt-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  function _ensureContainer() {
    if (document.getElementById('yt-dbz-wrap')) return;
    var wrap = document.createElement('div');
    wrap.id = 'yt-dbz-wrap';
    wrap.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-9999;bottom:0;left:0;overflow:hidden';
    var div = document.createElement('div');
    div.id = 'yt-dbz-player';
    wrap.appendChild(div);
    document.body.appendChild(wrap);
  }

  var _prevYTReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function() {
    if (typeof _prevYTReady === 'function') _prevYTReady();
    _ensureContainer();
    _ytPlayer = new YT.Player('yt-dbz-player', {
      height: '1', width: '1',
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0,
                    iv_load_policy: 3, modestbranding: 1, rel: 0, playsinline: 1 },
      events: {
        onReady: function(e) {
          _ytReady = true;
          e.target.setVolume(45);
          if (_ytPending) { _ytLoad(_ytPending); _ytPending = null; }
        },
        onStateChange: function(e) {
          if (e.data === YT.PlayerState.ENDED) { _ytPlayer.seekTo(0); _ytPlayer.playVideo(); }
        },
        onError: function(e) { console.warn('[DBZ Patch] YouTube error:', e.data); }
      }
    });
  };

  function _ytLoad(track) {
    var id = YT_IDS[track];
    if (!id) return;
    _ytCurrent = track;
    _ytPlayer.loadVideoById({ videoId: id, startSeconds: 0 });
    _ytPlayer.playVideo();
  }

  function _ytStop() {
    if (_ytPlayer && _ytReady) { try { _ytPlayer.stopVideo(); } catch(e) {} }
    _ytCurrent = null;
  }

  // ── Jouer depuis Supabase Storage ──
  function _playSupabase(track) {
    return new Promise(function(resolve, reject) {
      var filename = SUPABASE_FILES[track];
      if (!filename) { reject(new Error('Track non mappé : ' + track)); return; }

      var src = SUPABASE_BASE + filename;

      if (!_audioEl) {
        _audioEl = new Audio();
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
      // Pas une track DBZ → laisser les autres patches gérer
      _ytStop();
      _stopSupabase();
      if (typeof _originalPlayBGM === 'function') _originalPlayBGM(track);
      return;
    }

    // Stopper tout
    _ytStop();
    _stopSupabase();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();

    // Essayer Supabase d'abord
    _playSupabase(track).then(function() {
      console.log('[DBZ Patch] ✓ Supabase joué :', track);
    }).catch(function() {
      // Fallback YouTube
      console.warn('[DBZ Patch] Supabase échoué → YouTube :', track);
      if (!_ytReady) {
        _ytPending = track;
        _injectYT();
        _ensureContainer();
        return;
      }
      _ytLoad(track);
    });
  };

  // ── stopBGM override ──
  window.stopBGM = function() {
    _ytStop();
    _stopSupabase();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();
  };

  // ── Volume ──
  var _origSetVolume = window.setVolume;
  window.setVolume = function(v) {
    if (_audioEl) _audioEl.volume = parseFloat(v) * 0.9;
    if (_ytPlayer && _ytReady) _ytPlayer.setVolume(v * 100);
    if (typeof _origSetVolume === 'function') _origSetVolume(v);
  };

  console.info('🐉 audio-engine-dbz-patch.js v3 — Supabase Storage prioritaire, YouTube fallback');

})();