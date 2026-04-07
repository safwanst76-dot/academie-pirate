// ═══════════════════════════════════════════════════════════════════
// BOSS-BATTLE.JS — Académie Pirate v2
// Moteur de combat boss : HP dynamique, attaques animées, GIFs Giphy
// Règle A5 : expose via window.AP.boss
// Nouveau fichier — ne modifie rien d'existant
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var GIPHY = 'https://media.giphy.com/media/';

  // ── Map centralisée des images boss (fallback si non passé par le quiz) ──
  var BOSS_IMGS = {
    // Grand Bleu — One Piece
    'Arlong':       'assets/images/avatars' + '/clown.png',
    'Don Krieg':    'assets/images/avatars' + '/whitebeard.png',
    'Mihawk':       'assets/images/avatars' + '/shanks.png',
    'Crocodile':    'assets/images/avatars' + '/crocodile.png',
    'Perona':       'assets/images/avatars' + '/hancock.png',
    'Absalom':      'assets/images/avatars' + '/smoker.png',
    'Hogback':      'assets/images/avatars' + '/hawkins.png',
    'Ryuma':        'assets/images/avatars' + '/brook.png',
    // Magnolia — 'assets/images/dbz' (HIST_BOSS_AVATARS)
    'Freezer':      'assets/images/dbz' + '/freezer.png',
    'Cell':         'assets/images/dbz' + '/cell.png',
    'Broly':        'assets/images/dbz' + '/broly.png',
    'Majin Buu':    'assets/images/dbz' + '/boubou.png',
    'Beerus':       'assets/images/dbz' + '/babidi.png',
    'Babidi':       'assets/images/dbz' + '/babidi.png',
    'Black Goku':   'assets/images/dbz' + '/1.png',
    'Zamasu':       'assets/images/dbz' + '/2.png',
    // Kanto — Demon Slayer (KANTO_BOSS_AVATARS)
    'Muzan':        'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/nakime.jpeg',
    'Akaza':        'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/gyutaro.jpg',
    'Kokushibo':    'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/kokushibo.png',
    'Daki':         'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/kanao.jpg',
    'Rui':          'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/nezuko.jpeg',
    'Gyomei':       'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/giyu.png',
    'Sanemi':       'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/inosuke.jpg',
    'Obanai':       'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer' + '/characters/obanai.jpeg',
    // Pays du Feu — Naruto
    'Kakashi':              'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/characters/hatake%20kakashi.jpeg',
    'Orochimaru':           'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/characters/sasuke.png',
    'Tsunade':              'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/characters/sakura.jpg',
    'Zabuza':               'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/characters/jiraiya.webp',
    'Gaara Kazekage':       'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/characters/gaara%20.jpg',
    'Itachi Uchiha':        'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/gifs/itachi%20uchiha%20naruto%20GIF.gif',
    'Madara Uchiha':        'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/characters/minato%20.jpg',
    'Pain — Le Dieu':       'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu' + '/gifs/naruto%20GIF6.gif',
    // English — 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot'
    'Titan Colossal':       'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot' + '/characters/armin.jpg',
    'Titan Cuirassé':       'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot' + '/characters/reiner.jpg',
    'Titan Féminin':        'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot' + '/characters/annie.jpeg',
    'Titan Bestial':        'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/characters/zeke.jpg',
    // Namek — JJK (bucket island-namek)
    'Mahito':               'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/mahito.jpg',
    'Jogo':                 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/jogo.png',
    'Hanami':               'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/hanami.png',
    'Ryomen Sukuna':        'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/sukuna.jpg',
    'Dagon':                'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/dagon.png',
    'Choso':                'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/choso.png',
    'Geto Suguru':          'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/geto.png',
    'Kenjaku':              'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/kenjaku.png',
  };

  function _resolveBossImg(bossName, bossImgProvided) {
    if (bossImgProvided) return bossImgProvided;
    return BOSS_IMGS[bossName] || '';
  }

  // ── GIFs par univers (URLs directes Giphy) ───────────────────────
  var BATTLE_GIFS = {
    grandbleu: {
      attack:  [GIPHY + '3eSyxD82Lde81BgBJ0/giphy.gif',
                GIPHY + 'wOlKGNAdO84JuW5JQP/giphy.gif'],
      defend:  [GIPHY + 'X6UKH7nxchwgY5IY59/giphy.gif'],
      victory: [GIPHY + 'wOlKGNAdO84JuW5JQP/giphy.gif'],
    },
    magnolia: {
      attack:  [GIPHY + 'k4pIebL51xpiOet0xo/giphy.gif',
                GIPHY + 'UKjzsIilo1SCjkl7Wf/giphy.gif'],
      defend:  [GIPHY + 'VN3NVVGOKCbBWBMdET/giphy.gif'],
      victory: [GIPHY + '14fDAUGhWvgiyc/giphy.gif'],
    },
    kanto: {
      attack:  [GIPHY + '5yASwIq0gYlXpUsUkP/giphy.gif',
                GIPHY + 'cYQuMAQSVph5MNXdGs/giphy.gif'],
      defend:  [GIPHY + 'Auz1uziECLjoqzWuPE/giphy.gif'],
      victory: [GIPHY + 'efCdWBE19bR26ScE02/giphy.gif'],
    },
    paysdufeu: {
      attack:  [GIPHY + 'XDVNmIREHVTfsBowCT/giphy.gif'],
      defend:  [GIPHY + 'cYQuMAQSVph5MNXdGs/giphy.gif'],
      victory: [GIPHY + 'XDVNmIREHVTfsBowCT/giphy.gif'],
    },
  };

  // ── Config par univers ───────────────────────────────────────────
  var WORLD_CONFIG = {
    grandbleu: { color: '#e63946', bg: '#0a0205', name: 'Grand Bleu'  },
    magnolia:  { color: '#8b5cf6', bg: '#080418', name: 'Magnolia'    },
    kanto:     { color: '#C0392B', bg: '#0a0408', name: 'Kanto'       },
    paysdufeu: { color: '#F97316', bg: '#0d0500', name: 'Pays du Feu' },
    namek:     { color: '#7c3aed', bg: '#0a0418', name: 'Namek'       },
    english:   { color: '#4a5c3f', bg: '#080c06', name: 'English'     },
  };

  // ── État ─────────────────────────────────────────────────────────
  var _s = {
    active: false, worldKey: null,
    bossName: null, bossImg: null,
    hp: 100, hpPerHit: 34, totalHits: 3, hits: 0,
  };

  // ── API : init ───────────────────────────────────────────────────
  function initBoss(worldKey, bossName, bossImg, totalBossQs) {
    _s.active    = true;
    _s.worldKey  = worldKey || 'grandbleu';
    _s.bossName  = bossName || 'BOSS';
    _s.bossImg   = _resolveBossImg(bossName, bossImg);
    _s.totalHits = totalBossQs || 3;
    _s.hpPerHit  = Math.floor(100 / _s.totalHits);
    _s.hp        = 100;
    _s.hits      = 0;
    _showBossIntro();
  }

  // ── API : résultat question boss ─────────────────────────────────
  function onBossHit(isCorrect, isLastQ) {
    if (!_s.active) return;
    _s.hits++;

    if (isCorrect) {
      var dmg   = (isLastQ || _s.hits >= _s.totalHits) ? _s.hp : _s.hpPerHit;
      _s.hp     = Math.max(0, _s.hp - dmg);
      _showAttackAnim('attack');
      _updateInlineHp();
      if (_s.hp <= 0 || isLastQ) {
        setTimeout(function() { _showVictory(); }, 2200);
      }
    } else {
      _showAttackAnim('defend');
    }
  }

  // ── Intro plein écran ────────────────────────────────────────────
  function _showBossIntro() {
    var cfg = WORLD_CONFIG[_s.worldKey] || WORLD_CONFIG.grandbleu;
    var div = document.createElement('div');
    div.id  = 'bb-intro';
    div.className = 'bb-overlay bb-intro';
    div.style.cssText = '--bb-color:' + cfg.color + ';--bb-bg:' + cfg.bg;
    div.innerHTML =
      '<div class="bb-intro-bg"></div>' +
      '<div class="bb-intro-card">' +
        '<div class="bb-intro-label">⚔️ COMBAT FINAL</div>' +
        '<div class="bb-boss-portrait">' +
          '<img src="' + _s.bossImg + '" onerror="this.style.display=\'none\'" alt="' + _s.bossName + '">' +
          '<div class="bb-boss-ring"></div>' +
        '</div>' +
        '<div class="bb-intro-name">' + _s.bossName.toUpperCase() + '</div>' +
        '<div class="bb-intro-hp-wrap">' +
          '<div class="bb-bar"><div class="bb-bar-fill" id="bb-intro-fill" style="width:100%"></div></div>' +
          '<span class="bb-bar-lbl">HP 100%</span>' +
        '</div>' +
        '<div class="bb-intro-sub">Réponds correctement pour vaincre le boss !</div>' +
      '</div>';
    document.body.appendChild(div);
    _shake();
    if (typeof sfxCineRiser === 'function') sfxCineRiser();
    setTimeout(function() { _removeEl('bb-intro'); }, 3000);
  }

  // ── Animation attaque ────────────────────────────────────────────
  function _showAttackAnim(type) {
    var cfg  = WORLD_CONFIG[_s.worldKey] || WORLD_CONFIG.grandbleu;
    var gifs = BATTLE_GIFS[_s.worldKey]  || BATTLE_GIFS.grandbleu;
    var arr  = gifs[type] || gifs.attack;
    var gif  = arr[Math.floor(Math.random() * arr.length)];

    var hpColor = _s.hp > 60 ? '#06d6a0' : _s.hp > 30 ? '#ffd700' : '#e63946';
    var label   = type === 'attack' ? '💥 ATTAQUE !' : '🛡️ LE BOSS RÉSISTE !';
    var dmgTxt  = type === 'attack' ? '-' + _s.hpPerHit + ' HP' : 'BLOQUÉ !';

    _removeEl('bb-attack');
    var div = document.createElement('div');
    div.id  = 'bb-attack';
    div.className = 'bb-overlay bb-attack';
    div.style.cssText = '--bb-color:' + cfg.color;
    div.innerHTML =
      '<div class="bb-attack-gif-wrap">' +
        '<img class="bb-attack-gif" src="' + gif + '" alt="' + type + '">' +
        '<div class="bb-attack-flash bb-flash-' + type + '"></div>' +
      '</div>' +
      '<div class="bb-attack-label">' + label + '</div>' +
      '<div class="bb-attack-hp">' +
        '<div class="bb-bar bb-bar-sm">' +
          '<div class="bb-bar-fill" style="width:' + _s.hp + '%;background:' + hpColor + '"></div>' +
        '</div>' +
        '<span class="bb-bar-lbl" style="color:' + hpColor + '">' +
          dmgTxt + ' — Boss HP : ' + _s.hp + '%' +
        '</span>' +
      '</div>';
    document.body.appendChild(div);

    if (type === 'attack') {
      document.body.classList.add('bb-flash-body');
      setTimeout(function() { document.body.classList.remove('bb-flash-body'); }, 250);
    } else {
      _shake();
    }
    setTimeout(function() { _removeEl('bb-attack'); }, 2500);
  }

  // ── Victoire boss ────────────────────────────────────────────────
  function _showVictory() {
    var cfg  = WORLD_CONFIG[_s.worldKey] || WORLD_CONFIG.grandbleu;
    var gifs = BATTLE_GIFS[_s.worldKey]  || BATTLE_GIFS.grandbleu;
    var gif  = gifs.victory[0];

    _removeEl('bb-attack');
    var div = document.createElement('div');
    div.id  = 'bb-victory';
    div.className = 'bb-overlay bb-victory';
    div.style.cssText = '--bb-color:' + cfg.color + ';--bb-bg:' + cfg.bg;
    div.innerHTML =
      '<div class="bb-victory-particles" id="bb-vp"></div>' +
      '<div class="bb-victory-card">' +
        '<div class="bb-victory-crown">🏆</div>' +
        '<div class="bb-victory-title">BOSS VAINCU !</div>' +
        '<img class="bb-victory-gif" src="' + gif + '" alt="victory">' +
        '<div class="bb-victory-boss">' + _s.bossName.toUpperCase() + ' est vaincu !</div>' +
        '<div class="bb-victory-xp">+10 XP BONUS 💥</div>' +
      '</div>';
    document.body.appendChild(div);

    _spawnParticles('bb-vp', cfg.color, 35);
    if (typeof sfxFanfare  === 'function') sfxFanfare();
    if (typeof sfxPerfect  === 'function') setTimeout(sfxPerfect, 600);
    if (typeof starRain    === 'function') setTimeout(function() { starRain(12); }, 400);

    // Bonus XP (règle AA #4 : sync xp global)
    if (typeof xp !== 'undefined') {
      xp += 10;
      if (typeof updateHUD   === 'function') updateHUD();
      if (typeof checkBadges === 'function') checkBadges();
    }

    _s.active = false;
    setTimeout(function() { _removeEl('bb-victory'); }, 5000);
  }

  // ── Mettre à jour HP bar inline ──────────────────────────────────
  function _updateInlineHp() {
    var fills = document.querySelectorAll(
      '.boss-hp-fill,.hist-boss-hp-fill,.kanto-boss-hp-fill,.pdf-boss-hp-fill'
    );
    var hpColor = _s.hp > 60 ? 'linear-gradient(90deg,#06d6a0,#3b82f6)'
                : _s.hp > 30 ? 'linear-gradient(90deg,#ffd700,#f97316)'
                : 'linear-gradient(90deg,#e63946,#ff0000)';
    fills.forEach(function(el) {
      el.style.width      = _s.hp + '%';
      el.style.background = hpColor;
    });
    var lbls = document.querySelectorAll('.boss-hp-lbl');
    lbls.forEach(function(el) {
      var bars = '█'.repeat(Math.ceil(_s.hp / 10)) + '░'.repeat(10 - Math.ceil(_s.hp / 10));
      el.textContent = 'HP: ' + bars + ' ' + _s.hp + '%';
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────
  function _shake() {
    document.body.classList.add('bb-shake');
    setTimeout(function() { document.body.classList.remove('bb-shake'); }, 600);
  }
  function _removeEl(id) {
    var el = document.getElementById(id);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
  function _spawnParticles(containerId, color, count) {
    var c = document.getElementById(containerId);
    if (!c) return;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'bb-particle';
      p.style.left              = (Math.random() * 100) + '%';
      p.style.animationDelay    = (Math.random() * 2) + 's';
      p.style.animationDuration = (1.5 + Math.random() * 3) + 's';
      p.style.width  = (4 + Math.random() * 10) + 'px';
      p.style.height = p.style.width;
      p.style.background = color;
      c.appendChild(p);
    }
  }

  // ── API publique ─────────────────────────────────────────────────
  window.AP      = window.AP || {};
  window.AP.boss = {
    init:     initBoss,
    hit:      onBossHit,
    isActive: function() { return _s.active; },
    getHp:    function() { return _s.hp; },
    reset:    function() { _s.active = false; _s.hp = 100; },
  };

  console.info('⚔️ boss-battle.js v2 — HP dynamique + GIFs Giphy + animations CSS');
})();
