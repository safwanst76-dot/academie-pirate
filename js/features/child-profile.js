// ═══════════════════════════════════════════════════════════════════
// CHILD-PROFILE.JS — Académie Pirate
// Écran profil enfant : XP, niveau, streak, îles complétées
// Règle A5 : expose via window.AP.childProfile
// Nouveau fichier — ne modifie rien d'existant
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Thèmes par monde ────────────────────────────────────────────
  var WORLD_THEMES = {
    'grandbleu':  { color: '#e63946', emoji: '🏴‍☠️', name: 'Grand Bleu',   subject: 'Français'  },
    'magnolia':   { color: '#8b5cf6', emoji: '🐉',   name: 'Magnolia',     subject: 'Histoire'  },
    'kanto':      { color: '#C0392B', emoji: '⚔️',   name: 'Kanto',        subject: 'Sciences'  },
    'paysdufeu':  { color: '#F97316', emoji: '🔥',   name: 'Pays du Feu',  subject: 'Maths'     },
  };

  // ── Niveaux (cohérents avec config.js) ──────────────────────────
  var LEVELS = [
    { min: 0,    name: 'Mousse',           icon: '⚓' },
    { min: 50,   name: 'Novice Pirate',    icon: '🗺️' },
    { min: 150,  name: 'Pirate Confirmé',  icon: '⚔️' },
    { min: 300,  name: 'Ninja Genin',      icon: '🍃' },
    { min: 500,  name: 'Chunin',           icon: '💫' },
    { min: 800,  name: 'Jonin',            icon: '⚡' },
    { min: 1200, name: 'Capitaine',        icon: '🏴‍☠️' },
    { min: 1800, name: 'Amiral',           icon: '🌊' },
    { min: 2500, name: 'Légende',          icon: '💎' },
    { min: 3500, name: 'Roi des Pirates',  icon: '👑' },
  ];

  function _getLevel(totalXP) {
    for (var i = LEVELS.length - 1; i >= 0; i--) {
      if (totalXP >= LEVELS[i].min) return LEVELS[i];
    }
    return LEVELS[0];
  }

  function _getNextLevel(totalXP) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (LEVELS[i].min > totalXP) return LEVELS[i];
    }
    return null; // niveau max atteint
  }

  function _getLevelProgress(totalXP) {
    var current = _getLevel(totalXP);
    var next    = _getNextLevel(totalXP);
    if (!next) return 100;
    var range   = next.min - current.min;
    var done    = totalXP - current.min;
    return Math.min(100, Math.round(done / range * 100));
  }

  // ── Afficher le profil ───────────────────────────────────────────
  function show() {
    // Récupérer les données de l'enfant actif
    var child = null;
    try {
      if (typeof _activeChild !== 'undefined' && _activeChild) {
        child = _activeChild;
      } else if (typeof dbGetActiveChild === 'function') {
        child = dbGetActiveChild();
      }
    } catch (e) {}

    // Si pas d'enfant connecté → afficher l'écran avatar habituel
    if (!child) {
      if (typeof showAvatarScreen === 'function') showAvatarScreen();
      return;
    }

    // Données de progression
    var totalXP  = (typeof xp !== 'undefined' ? xp : 0) + (child.xp_total || 0);
    // Déduplication — si xp global = xp_total DB, on prend le max
    totalXP = Math.max(
      typeof xp !== 'undefined' ? xp : 0,
      child.xp_total || 0
    );

    var level    = _getLevel(totalXP);
    var nextLvl  = _getNextLevel(totalXP);
    var progress = _getLevelProgress(totalXP);
    var streak   = typeof window.streak !== 'undefined' ? window.streak : (child.current_streak || 0);
    var islands  = typeof completedIslands !== 'undefined' ? completedIslands : {};
    var isleCount = Object.keys(islands).length;

    // Construire les stats par monde
    var worldStats = _buildWorldStats(islands, child);

    _renderOverlay(child, totalXP, level, nextLvl, progress, streak, isleCount, worldStats);
  }

  function _buildWorldStats(islands, child) {
    var stats = {};

    // Grand Bleu (clés numériques 1-8)
    var gbCount = 0, gbPerfect = 0;
    for (var k in islands) {
      if (!isNaN(parseInt(k)) && parseInt(k) >= 1 && parseInt(k) <= 8) {
        gbCount++;
        if (islands[k] === 10) gbPerfect++;
      }
    }
    if (gbCount > 0) stats['grandbleu'] = { count: gbCount, perfect: gbPerfect, total: 8 };

    // Magnolia (clés hist_1..8)
    var histCount = 0, histPerfect = 0;
    for (var k2 in islands) {
      if (String(k2).startsWith('hist_')) {
        histCount++;
        if (islands[k2] === 10) histPerfect++;
      }
    }
    if (histCount > 0) stats['magnolia'] = { count: histCount, perfect: histPerfect, total: 8 };

    // Kanto (clés kanto_1..8)
    var kantoCount = 0, kantoPerfect = 0;
    for (var k3 in islands) {
      if (String(k3).startsWith('kanto_')) {
        kantoCount++;
        if (islands[k3] === 10) kantoPerfect++;
      }
    }
    if (kantoCount > 0) stats['kanto'] = { count: kantoCount, perfect: kantoPerfect, total: 8 };

    // Pays du Feu (clés pdf_1..8)
    var pdfCount = 0, pdfPerfect = 0;
    for (var k4 in islands) {
      if (String(k4).startsWith('pdf_')) {
        pdfCount++;
        if (islands[k4] === 10) pdfPerfect++;
      }
    }
    if (pdfCount > 0) stats['paysdufeu'] = { count: pdfCount, perfect: pdfPerfect, total: 8 };

    return stats;
  }

  function _renderOverlay(child, totalXP, level, nextLvl, progress, streak, isleCount, worldStats) {
    // Supprimer si déjà ouvert
    var existing = document.getElementById('cp-overlay');
    if (existing) { existing.remove(); return; }

    // Monde stats HTML
    var worldHtml = '';
    for (var worldKey in WORLD_THEMES) {
      var t     = WORLD_THEMES[worldKey];
      var stats = worldStats[worldKey];
      if (!stats) continue;
      var pct = Math.round(stats.count / stats.total * 100);
      worldHtml += '<div class="cp-world-row">' +
        '<div class="cp-world-emoji">' + t.emoji + '</div>' +
        '<div class="cp-world-info">' +
          '<div class="cp-world-name" style="color:' + t.color + '">' + t.name + '</div>' +
          '<div class="cp-world-sub">' + t.subject + ' · ' + stats.count + '/' + stats.total + ' îles' +
            (stats.perfect > 0 ? ' · ' + stats.perfect + ' ⭐ parfait' : '') + '</div>' +
          '<div class="cp-world-bar"><div class="cp-world-fill" style="width:' + pct + '%;background:' + t.color + '"></div></div>' +
        '</div>' +
      '</div>';
    }

    var nextXpHtml = nextLvl
      ? '<div class="cp-next-level">Prochain niveau : <strong>' + nextLvl.name + '</strong> à ' + nextLvl.min + ' XP</div>'
      : '<div class="cp-next-level">🏆 Niveau maximum atteint !</div>';

    var html = '<div class="cp-overlay" id="cp-overlay">' +
      '<div class="cp-backdrop" onclick="window.AP.childProfile.hide()"></div>' +
      '<div class="cp-panel">' +
        // Header
        '<div class="cp-header">' +
          '<img class="cp-avatar" src="assets/images/avatars/' + (child.avatar_id || 'luffy') + '.png" ' +
            'onerror="this.onerror=null;this.src=\'assets/images/avatars/luffy.jpg\'" alt="' + child.username + '">' +
          '<div class="cp-header-info">' +
            '<div class="cp-username">' + child.username + '</div>' +
            '<div class="cp-level-badge">' + level.icon + ' ' + level.name + '</div>' +
          '</div>' +
          '<button class="cp-close-btn" onclick="window.AP.childProfile.hide()">✕</button>' +
        '</div>' +
        // XP
        '<div class="cp-xp-section">' +
          '<div class="cp-xp-row">' +
            '<div class="cp-stat">' +
              '<div class="cp-stat-val">' + totalXP + '</div>' +
              '<div class="cp-stat-lbl">XP Total</div>' +
            '</div>' +
            '<div class="cp-stat">' +
              '<div class="cp-stat-val">🔥 ' + streak + '</div>' +
              '<div class="cp-stat-lbl">Jours de suite</div>' +
            '</div>' +
            '<div class="cp-stat">' +
              '<div class="cp-stat-val">' + isleCount + '</div>' +
              '<div class="cp-stat-lbl">Îles complétées</div>' +
            '</div>' +
          '</div>' +
          '<div class="cp-xp-bar-wrap">' +
            '<div class="cp-xp-bar"><div class="cp-xp-fill" style="width:' + progress + '%"></div></div>' +
            '<div class="cp-xp-pct">' + progress + '%</div>' +
          '</div>' +
          nextXpHtml +
        '</div>' +
        // Mondes
        (worldHtml ? '<div class="cp-worlds-section"><div class="cp-section-title">⚔️ MES AVENTURES</div>' + worldHtml + '</div>' : '') +
        // Bouton jouer
        '<button class="cp-play-btn" onclick="window.AP.childProfile.hide();navigateTo(\'carte\')">' +
          '🗺️ RETOUR À LA CARTE' +
        '</button>' +
      '</div>' +
    '</div>';

    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el.firstElementChild);

    // Animation entrée
    requestAnimationFrame(function() {
      var panel = document.querySelector('.cp-panel');
      if (panel) panel.classList.add('cp-panel-in');
    });
  }

  function hide() {
    var ov = document.getElementById('cp-overlay');
    if (!ov) return;
    ov.style.opacity = '0';
    setTimeout(function() { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 300);
  }

  // ── API publique ─────────────────────────────────────────────────
  window.AP         = window.AP || {};
  window.AP.childProfile = { show: show, hide: hide };

  // Fonction globale appelée par le onclick de l'avatar dans le header
  window.showChildProfileOrAvatar = function() {
    var child = null;
    try {
      if (typeof _activeChild !== 'undefined' && _activeChild) child = _activeChild;
      else if (typeof dbGetActiveChild === 'function') child = dbGetActiveChild();
    } catch(e) {}

    if (child) {
      show();
    } else {
      if (typeof showAvatarScreen === 'function') showAvatarScreen();
    }
  };

  console.info('👤 child-profile.js chargé');
})();
