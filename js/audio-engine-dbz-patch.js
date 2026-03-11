// ═══════════════════════════════════════════════════════
// AUDIO-ENGINE-DBZ-PATCH.JS — Académie Pirate — v2
// ✅ PRÉFÈRE LES MP3 LOCAUX (assets/audio/bgm/) avant YouTube
// ✅ Fallback YouTube uniquement si fichier local manquant
// ⚠️ Charger CE fichier APRÈS audio-engine.js dans index.html
// ═══════════════════════════════════════════════════════

(function() {

  // ── CONFIGURATION ──
  var LOCAL_AUDIO_PATH = 'assets/audio/bgm/';  // ← Ton dossier réel
  var YT_IDS = {
    'dbz-map':     'vRA4wGDEajw',
    'dbz-battle':  'Lttvfc3ywJs',
    'dbz-victory': 'Lttvfc3ywJs',
    'dbz-isle':    'vRA4wGDEajw',
  };

  // ── État interne ──
  var _ytPlayer = null, _ytReady = false, _ytPending = null, _ytCurrent = null;
  var _localAudioEl = null;  // ← Nouveau : élément audio pour MP3 locaux
  var _originalPlayBGM = window.playBGM;

  // ── Injecter YouTube API (seulement si nécessaire) ──
  function _injectYT() {
    if (document.getElementById('yt-api-script')) return;
    var tag = document.createElement('script');
    tag.id = 'yt-api-script';
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
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, rel: 0, playsinline: 1 },
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

  // ── NOUVEAU : Jouer un MP3 local ──
  function _playLocal(track) {
    return new Promise(function(resolve, reject) {
      if (!_localAudioEl) {
        _localAudioEl = new Audio();
        _localAudioEl.loop = true;
        _localAudioEl.volume = 0.45;
      }
      var src = LOCAL_AUDIO_PATH + track + '.mp3';
      _localAudioEl.src = src;
      _localAudioEl.load();
      var p = _localAudioEl.play();
      if (p && typeof p.catch === 'function') {
        p.then(resolve).catch(reject);
      } else {
        resolve();
      }
    });
  }

  function _stopLocal() {
    if (_localAudioEl) {
      try { _localAudioEl.pause(); _localAudioEl.currentTime = 0; } catch(e) {}
    }
  }

  // ── NOUVELLE playBGM : Local d'abord, YouTube fallback ──
  window.playBGM = function(track) {
    var isDbz = (typeof track === 'string') && track.startsWith('dbz-');

    if (isDbz) {
      // ── 1. ESSAYER LE MP3 LOCAL D'ABORD ──
      _ytStop();  // Couper YouTube si actif
      _stopLocal();  // Couper un éventuel local précédent

      _playLocal(track).then(function() {
        // Succès : MP3 local joué
        console.log('[DBZ Patch] MP3 local joué :', track);
      }).catch(function() {
        // Échec : fichier local manquant → fallback YouTube
        console.log('[DBZ Patch] MP3 local introuvable, fallback YouTube :', track);

        // Couper le local (au cas où)
        _stopLocal();

        // YouTube logic (original)
        if (bgmAudio) {
          try { bgmAudio.pause(); bgmAudio.currentTime = 0; bgmAudio = null; currentBGM = null; } catch(e) {}
        }
        if (_ytCurrent === track && _ytReady && _ytPlayer) {
          try { if (_ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) return; } catch(e) {}
        }
        if (!_ytReady) {
          _ytPending = track;
          _injectYT();
          if (document.readyState !== 'loading') _ensureContainer();
          else document.addEventListener('DOMContentLoaded', _ensureContainer);
          return;
        }
        _ytStop();
        _ytLoad(track);
      });

    } else {
      // ── Track non-DBZ → utiliser l'engine original ──
      _ytStop();
      _stopLocal();
      if (typeof _originalPlayBGM === 'function') { _originalPlayBGM(track); }
    }
  };

  // ── stopBGM : coupe les deux sources ──
  var _originalStopBGM = window.stopBGM;
  window.stopBGM = function() {
    _ytStop();
    _stopLocal();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();
  };

  // ── setBGMVolume : gère les deux sources ──
  window.setBGMVolume = function(vol) {
    if (_ytPlayer && _ytReady) _ytPlayer.setVolume(vol);
    if (_localAudioEl) _localAudioEl.volume = vol / 100;
    if (typeof window.setVolume === 'function') window.setVolume(vol / 100);
  };

  console.info('🐉 audio-engine-dbz-patch.js v2 — MP3 locaux prioritaires, YouTube fallback');

})();