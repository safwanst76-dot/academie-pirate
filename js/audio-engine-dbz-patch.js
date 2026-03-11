// ═══════════════════════════════════════════════════════
// AUDIO-ENGINE-DBZ-PATCH.JS — Académie Pirate
// ✅ Patch minimal — NE TOUCHE PAS à audio-engine.js
// Intercepte uniquement les tracks "dbz-*" → YouTube IFrame
// Toutes les autres tracks → audio-engine.js original
// ⚠️  Charger CE fichier APRÈS audio-engine.js dans index.html
// ═══════════════════════════════════════════════════════

(function() {

  // ── YouTube video IDs par track DBZ ──
  var YT_IDS = {
    'dbz-map':     'vRA4wGDEajw',   // lien 1
    'dbz-battle':  'Lttvfc3ywJs',   // lien 2
    'dbz-victory': 'Lttvfc3ywJs',
    'dbz-isle':    'vRA4wGDEajw',
  };

  // ── État interne du patch ──
  var _ytPlayer     = null;
  var _ytReady      = false;
  var _ytPending    = null;
  var _ytCurrent    = null;

  // ── Sauvegarder le playBGM original (One Piece / MP3) ──
  var _originalPlayBGM = window.playBGM;

  // ── Injecter YouTube IFrame API (une seule fois) ──
  if (!document.getElementById('yt-api-script')) {
    var tag = document.createElement('script');
    tag.id  = 'yt-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  // ── Conteneur invisible pour le player YT ──
  function _ensureContainer() {
    if (document.getElementById('yt-dbz-wrap')) return;
    var wrap = document.createElement('div');
    wrap.id = 'yt-dbz-wrap';
    wrap.style.cssText = [
      'position:fixed', 'width:1px', 'height:1px',
      'opacity:0', 'pointer-events:none',
      'z-index:-9999', 'bottom:0', 'left:0', 'overflow:hidden'
    ].join(';');
    var div = document.createElement('div');
    div.id = 'yt-dbz-player';
    wrap.appendChild(div);
    document.body.appendChild(wrap);
  }

  // ── Callback YouTube (global, appelé par l'API) ──
  // On chaîne avec un éventuel onYouTubeIframeAPIReady existant
  var _prevYTReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function() {
    if (typeof _prevYTReady === 'function') _prevYTReady();
    _ensureContainer();
    _ytPlayer = new YT.Player('yt-dbz-player', {
      height: '1', width: '1',
      playerVars: {
        autoplay: 0, controls: 0, disablekb: 1,
        fs: 0, iv_load_policy: 3, modestbranding: 1,
        rel: 0, playsinline: 1
      },
      events: {
        onReady: function(e) {
          _ytReady = true;
          e.target.setVolume(45);
          if (_ytPending) {
            _ytLoad(_ytPending);
            _ytPending = null;
          }
        },
        onStateChange: function(e) {
          // Boucle infinie quand la vidéo se termine
          if (e.data === YT.PlayerState.ENDED) {
            _ytPlayer.seekTo(0);
            _ytPlayer.playVideo();
          }
        },
        onError: function(e) {
          console.warn('[DBZ Patch] YouTube error:', e.data);
        }
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
    if (_ytPlayer && _ytReady) {
      try { _ytPlayer.stopVideo(); } catch(e) {}
    }
    _ytCurrent = null;
  }

  // ── Nouvelle playBGM — point d'entrée unique ──
  window.playBGM = function(track) {
    var isDbz = (typeof track === 'string') && track.startsWith('dbz-');

    if (isDbz) {
      // ── Couper la musique One Piece (MP3 natif) si elle tourne ──
      if (bgmAudio) {
        try { bgmAudio.pause(); bgmAudio.currentTime = 0; bgmAudio = null; currentBGM = null; } catch(e) {}
      }

      // ── Même track DBZ déjà en lecture → rien faire ──
      if (_ytCurrent === track && _ytReady && _ytPlayer) {
        try {
          if (_ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) return;
        } catch(e) {}
      }

      if (!_ytReady) {
        _ytPending = track;
        if (document.readyState !== 'loading') _ensureContainer();
        else document.addEventListener('DOMContentLoaded', _ensureContainer);
        return;
      }

      _ytStop();
      _ytLoad(track);

    } else {
      // ── Track non-DBZ → couper YouTube + lancer MP3 original ──
      _ytStop();
      // Respecter le flag musicPlaying de l'engine original
      if (typeof _originalPlayBGM === 'function') {
        _originalPlayBGM(track);
      }
    }
  };

  // ── stopBGM couvre les deux cas ──
  var _originalStopBGM = window.stopBGM;
  window.stopBGM = function() {
    _ytStop();
    if (typeof _originalStopBGM === 'function') _originalStopBGM();
  };

  // ── setBGMVolume : YT + audio natif ──
  window.setBGMVolume = function(vol) {
    if (_ytPlayer && _ytReady) _ytPlayer.setVolume(vol);
    if (typeof window.setVolume === 'function') window.setVolume(vol / 100);
  };

  console.info('🐉 audio-engine-dbz-patch.js actif — tracks dbz-* → YouTube IFrame');

})();