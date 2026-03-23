// ═══════════════════════════════════════════════════════════════════
// BADGES.JS — Académie Pirate
// Étend le système existant de hud.js (5 badges)
// Ajoute : overlay unlock dramatique + 20 badges + sauvegarde Supabase
// Règle NR-02 : ne touche pas hud.js
// Règle A5 : expose via window.AP.badges
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Catalogue complet des badges ─────────────────────────────────
  var BADGE_CATALOG = [
    // ─ Démarrage ─
    { id: 'first_island',   emoji: '🌊', name: 'Premier Pas',        desc: 'Complète ta première île',                   rarity: 'common',    world: null         },
    { id: 'first_perfect',  emoji: '⭐', name: 'Perfectionniste',     desc: 'Obtiens un score parfait 10/10',             rarity: 'rare',      world: null         },
    { id: 'three_islands',  emoji: '🗺️', name: 'Explorateur',        desc: 'Complète 3 îles',                            rarity: 'common',    world: null         },
    { id: 'five_islands',   emoji: '⚓', name: 'Marin Confirmé',      desc: 'Complète 5 îles',                            rarity: 'rare',      world: null         },
    { id: 'ten_islands',    emoji: '🏴‍☠️', name: 'Capitaine',         desc: 'Complète 10 îles',                           rarity: 'epic',      world: null         },
    { id: 'twenty_islands', emoji: '👑', name: 'Roi des Pirates',     desc: 'Complète 20 îles',                           rarity: 'legendary', world: null         },

    // ─ XP ─
    { id: 'xp_50',          emoji: '✨', name: 'Novice',              desc: 'Atteins 50 XP',                              rarity: 'common',    world: null         },
    { id: 'xp_200',         emoji: '💫', name: 'Apprenti',           desc: 'Atteins 200 XP',                             rarity: 'rare',      world: null         },
    { id: 'xp_500',         emoji: '🌟', name: 'Guerrier XP',        desc: 'Atteins 500 XP',                             rarity: 'epic',      world: null         },
    { id: 'xp_1000',        emoji: '💎', name: 'Légende XP',         desc: 'Atteins 1000 XP',                            rarity: 'legendary', world: null         },

    // ─ Streaks ─
    { id: 'streak_3',       emoji: '🔥', name: 'En Feu',              desc: '3 jours consécutifs',                        rarity: 'common',    world: null         },
    { id: 'streak_7',       emoji: '⚡', name: 'Une Semaine !',       desc: '7 jours consécutifs',                        rarity: 'epic',      world: null         },
    { id: 'streak_30',      emoji: '🌙', name: 'Indestructible',      desc: '30 jours consécutifs',                       rarity: 'legendary', world: null         },

    // ─ Grand Bleu (Français) ─
    { id: 'gb_master',      emoji: '🏴‍☠️', name: 'Maître des Mers',   desc: 'Complète les 8 îles du Grand Bleu',          rarity: 'epic',      world: 'grandbleu'  },
    { id: 'gb_perfect',     emoji: '📖', name: 'Grammairien',         desc: 'Score parfait dans le Grand Bleu',           rarity: 'rare',      world: 'grandbleu'  },

    // ─ Magnolia (Histoire) ─
    { id: 'mg_master',      emoji: '🐉', name: 'Historien Légendaire',desc: 'Complète les 8 îles de Magnolia',            rarity: 'epic',      world: 'magnolia'   },
    { id: 'mg_perfect',     emoji: '📜', name: 'Chroniqueur',         desc: 'Score parfait dans Magnolia',                rarity: 'rare',      world: 'magnolia'   },

    // ─ Kanto (Sciences) ─
    { id: 'kt_master',      emoji: '⚔️', name: 'Chasseur de Démons', desc: 'Complète les 8 îles de Kanto',               rarity: 'epic',      world: 'kanto'      },
    { id: 'kt_perfect',     emoji: '🔬', name: 'Scientifique',        desc: 'Score parfait dans Kanto',                   rarity: 'rare',      world: 'kanto'      },

    // ─ Pays du Feu (Maths) ─
    { id: 'pdf_master',     emoji: '🔥', name: 'Ninja des Maths',     desc: 'Complète les 8 îles du Pays du Feu',         rarity: 'epic',      world: 'paysdufeu'  },
    { id: 'pdf_perfect',    emoji: '🧮', name: 'Calculateur',         desc: 'Score parfait dans le Pays du Feu',          rarity: 'rare',      world: 'paysdufeu'  },
  ];

  var RARITY_COLORS = {
    'common':    { color: '#94a3b8', glow: 'rgba(148,163,184,.4)', label: 'Commun'    },
    'rare':      { color: '#3b82f6', glow: 'rgba(59,130,246,.5)',  label: 'Rare'      },
    'epic':      { color: '#8b5cf6', glow: 'rgba(139,92,246,.6)',  label: 'Épique'    },
    'legendary': { color: '#f59e0b', glow: 'rgba(245,158,11,.7)',  label: 'Légendaire'},
  };

  // Badges déjà débloqués (chargés depuis Supabase au lancement)
  var _unlocked = new Set();
  var _loaded   = false;

  // ── Charger les badges depuis Supabase ───────────────────────────
  async function loadFromDB() {
    var db    = typeof sb !== 'undefined' ? sb : null;
    var child = _getChild();
    if (!db || !child) return;

    try {
      var res = await db.from('badges_unlocked')
        .select('badge_id').eq('child_id', child.id);
      if (res && res.data) {
        res.data.forEach(function(row) { _unlocked.add(row.badge_id); });
      }
      _loaded = true;
    } catch (e) {
      console.warn('[badges] loadFromDB:', e && e.message);
    }
  }

  // ── Vérifier et débloquer ────────────────────────────────────────
  function check() {
    var currentXP      = typeof xp !== 'undefined' ? xp : 0;
    var currentStreak  = typeof streak !== 'undefined' ? streak : 0;
    var islands        = typeof completedIslands !== 'undefined' ? completedIslands : {};
    var isleKeys       = Object.keys(islands);
    var totalIslands   = isleKeys.length;

    var rules = [
      { id: 'first_island',   cond: totalIslands >= 1  },
      { id: 'first_perfect',  cond: Object.values(islands).some(function(s){ return s === 10; }) },
      { id: 'three_islands',  cond: totalIslands >= 3  },
      { id: 'five_islands',   cond: totalIslands >= 5  },
      { id: 'ten_islands',    cond: totalIslands >= 10 },
      { id: 'twenty_islands', cond: totalIslands >= 20 },
      { id: 'xp_50',          cond: currentXP >= 50    },
      { id: 'xp_200',         cond: currentXP >= 200   },
      { id: 'xp_500',         cond: currentXP >= 500   },
      { id: 'xp_1000',        cond: currentXP >= 1000  },
      { id: 'streak_3',       cond: currentStreak >= 3  },
      { id: 'streak_7',       cond: currentStreak >= 7  },
      { id: 'streak_30',      cond: currentStreak >= 30 },
      // Grand Bleu — clés numériques 1-8
      { id: 'gb_master',  cond: _worldComplete(islands, function(k){ return !isNaN(parseInt(k)) && parseInt(k)>=1 && parseInt(k)<=8; }, 8) },
      { id: 'gb_perfect', cond: _worldPerfect(islands,  function(k){ return !isNaN(parseInt(k)) && parseInt(k)>=1 && parseInt(k)<=8; })    },
      // Magnolia — clés hist_1..8
      { id: 'mg_master',  cond: _worldComplete(islands, function(k){ return String(k).startsWith('hist_'); }, 8) },
      { id: 'mg_perfect', cond: _worldPerfect(islands,  function(k){ return String(k).startsWith('hist_'); })    },
      // Kanto — clés kanto_1..8
      { id: 'kt_master',  cond: _worldComplete(islands, function(k){ return String(k).startsWith('kanto_'); }, 8) },
      { id: 'kt_perfect', cond: _worldPerfect(islands,  function(k){ return String(k).startsWith('kanto_'); })    },
      // Pays du Feu — clés pdf_1..8
      { id: 'pdf_master', cond: _worldComplete(islands, function(k){ return String(k).startsWith('pdf_'); }, 8) },
      { id: 'pdf_perfect',cond: _worldPerfect(islands,  function(k){ return String(k).startsWith('pdf_'); })    },
    ];

    rules.forEach(function(rule) {
      if (rule.cond && !_unlocked.has(rule.id)) {
        _unlock(rule.id);
      }
    });

    // Aussi mettre à jour les 5 badges legacy dans le DOM
    _syncLegacyBadges(islands, currentXP);
  }

  function _worldComplete(islands, filter, needed) {
    return Object.keys(islands).filter(filter).length >= needed;
  }

  function _worldPerfect(islands, filter) {
    var keys = Object.keys(islands).filter(filter);
    return keys.length > 0 && keys.some(function(k){ return islands[k] === 10; });
  }

  // ── Débloquer un badge ────────────────────────────────────────────
  function _unlock(badgeId) {
    _unlocked.add(badgeId);
    var badge = BADGE_CATALOG.find(function(b){ return b.id === badgeId; });
    if (!badge) return;

    // Sauvegarder en Supabase
    _saveToDB(badgeId);

    // Analytics
    if (window.AP && typeof window.AP.track === 'function') {
      window.AP.track('badge_unlock', { meta: { badge_id: badgeId, rarity: badge.rarity } });
    }

    // Overlay unlock dramatique
    _showUnlockOverlay(badge);
  }

  async function _saveToDB(badgeId) {
    var db    = typeof sb !== 'undefined' ? sb : null;
    var child = _getChild();
    if (!db || !child) return;
    try {
      await db.from('badges_unlocked').insert({
        child_id:  child.id,
        badge_id:  badgeId,
      });
    } catch (e) {
      // Ignorer les doublons (unique constraint)
    }
  }

  // ── Overlay unlock ────────────────────────────────────────────────
  var _queue   = [];
  var _showing = false;

  function _showUnlockOverlay(badge) {
    _queue.push(badge);
    if (!_showing) _processQueue();
  }

  function _processQueue() {
    if (!_queue.length) { _showing = false; return; }
    _showing = true;
    var badge  = _queue.shift();
    var rarity = RARITY_COLORS[badge.rarity] || RARITY_COLORS['common'];

    var html = '<div class="bdg-unlock-overlay" id="bdg-unlock-overlay">' +
      '<div class="bdg-unlock-card" style="--bdg-color:' + rarity.color + ';--bdg-glow:' + rarity.glow + '">' +
        '<div class="bdg-unlock-rarity">' + rarity.label.toUpperCase() + '</div>' +
        '<div class="bdg-unlock-emoji">' + badge.emoji + '</div>' +
        '<div class="bdg-unlock-title">BADGE DÉBLOQUÉ !</div>' +
        '<div class="bdg-unlock-name">' + badge.name + '</div>' +
        '<div class="bdg-unlock-desc">' + badge.desc + '</div>' +
        '<div class="bdg-unlock-particles" id="bdg-particles"></div>' +
      '</div>' +
    '</div>';

    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el.firstElementChild);

    // Particules
    _spawnParticles(rarity.color);

    // Son
    if (typeof sfxFanfare === 'function') setTimeout(sfxFanfare, 200);

    // Auto-fermer après 3.5s
    setTimeout(function() {
      var ov = document.getElementById('bdg-unlock-overlay');
      if (ov) {
        ov.style.opacity = '0';
        setTimeout(function() {
          if (ov.parentNode) ov.parentNode.removeChild(ov);
          _processQueue();
        }, 400);
      } else {
        _processQueue();
      }
    }, 3500);
  }

  function _spawnParticles(color) {
    var container = document.getElementById('bdg-particles');
    if (!container) return;
    for (var i = 0; i < 16; i++) {
      var p = document.createElement('div');
      p.className = 'bdg-particle';
      p.style.left              = (Math.random() * 100) + '%';
      p.style.animationDelay    = (Math.random() * 1) + 's';
      p.style.animationDuration = (1 + Math.random() * 2) + 's';
      p.style.width  = (4 + Math.random() * 6) + 'px';
      p.style.height = p.style.width;
      p.style.background = color;
      container.appendChild(p);
    }
  }

  // ── Sync badges legacy (b0-b4 dans le DOM) ───────────────────────
  function _syncLegacyBadges(islands, currentXP) {
    var rules = [
      { id: 'b0', cond: Object.keys(islands).length >= 1  },
      { id: 'b1', cond: Object.values(islands).some(function(s){ return s===10; }) },
      { id: 'b2', cond: Object.keys(islands).length >= 2  },
      { id: 'b3', cond: Object.keys(islands).length >= 4  },
      { id: 'b4', cond: currentXP >= 70                   },
    ];
    rules.forEach(function(r) {
      var el = document.getElementById(r.id);
      if (el && r.cond) el.classList.add('on');
    });
  }

  // ── Écran collection badges ───────────────────────────────────────
  function showCollection() {
    var existing = document.getElementById('bdg-collection-overlay');
    if (existing) { existing.remove(); return; }

    var html = '<div class="bdg-collection-overlay" id="bdg-collection-overlay">' +
      '<div class="bdg-collection-backdrop" onclick="window.AP.badges.hideCollection()"></div>' +
      '<div class="bdg-collection-panel">' +
        '<div class="bdg-collection-header">' +
          '<div class="bdg-collection-title">🏆 MES BADGES</div>' +
          '<div class="bdg-collection-count">' + _unlocked.size + ' / ' + BADGE_CATALOG.length + '</div>' +
          '<button class="bdg-collection-close" onclick="window.AP.badges.hideCollection()">✕</button>' +
        '</div>' +
        '<div class="bdg-collection-grid">' +
          BADGE_CATALOG.map(function(b) {
            var unlocked = _unlocked.has(b.id);
            var rarity   = RARITY_COLORS[b.rarity] || RARITY_COLORS['common'];
            return '<div class="bdg-col-item' + (unlocked ? ' unlocked' : ' locked') + '" ' +
              'style="--item-color:' + rarity.color + ';--item-glow:' + rarity.glow + '">' +
              '<div class="bdg-col-emoji">' + (unlocked ? b.emoji : '🔒') + '</div>' +
              '<div class="bdg-col-name">' + (unlocked ? b.name : '???') + '</div>' +
              '<div class="bdg-col-rarity">' + rarity.label + '</div>' +
              (unlocked ? '<div class="bdg-col-desc">' + b.desc + '</div>' : '') +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';

    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el.firstElementChild);

    requestAnimationFrame(function() {
      var panel = document.querySelector('.bdg-collection-panel');
      if (panel) panel.classList.add('bdg-panel-in');
    });
  }

  function hideCollection() {
    var ov = document.getElementById('bdg-collection-overlay');
    if (!ov) return;
    ov.style.opacity = '0';
    setTimeout(function() { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 300);
  }

  // ── Helpers ──────────────────────────────────────────────────────
  function _getChild() {
    try {
      if (typeof _activeChild !== 'undefined' && _activeChild) return _activeChild;
      if (typeof dbGetActiveChild === 'function') return dbGetActiveChild();
    } catch(e) {}
    return null;
  }

  // ── Patch de checkBadges de hud.js ───────────────────────────────
  // On surcharge checkBadges pour appeler notre système étendu EN PLUS
  var _originalCheckBadges = window.checkBadges;
  window.checkBadges = function() {
    if (typeof _originalCheckBadges === 'function') _originalCheckBadges();
    check();
  };

  // ── API publique ──────────────────────────────────────────────────
  window.AP        = window.AP || {};
  window.AP.badges = {
    check:          check,
    loadFromDB:     loadFromDB,
    showCollection: showCollection,
    hideCollection: hideCollection,
    isUnlocked:     function(id) { return _unlocked.has(id); },
    getAll:         function() { return BADGE_CATALOG; },
    getUnlocked:    function() { return Array.from(_unlocked); },
  };

  // Charger les badges au lancement (quand l'enfant se connecte)
  // afLaunchChild appelle loadFromDB via auth.js
  window.AP.badges.init = function() {
    loadFromDB().then(function() {
      check(); // Vérifier si des badges méritent d'être débloqués
    });
  };

  console.info('🏆 badges.js chargé — ' + BADGE_CATALOG.length + ' badges disponibles');
})();
