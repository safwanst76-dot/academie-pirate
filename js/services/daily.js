// ═══════════════════════════════════════════════════════════════════
// DAILY.JS — Académie Pirate
// Daily reward + Streak saver
// Règle A5 : expose API via window.AP.daily
// Charger dans js/services/ — après db.js, avant router.js
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────
  var XP_REWARDS = [10, 12, 15, 18, 20, 25, 50]; // jours 1→7
  var STREAK_MESSAGES = [
    '⚓ Tu es de retour, Moussaillon !',
    '🔥 2 jours de suite — continue !',
    '⚡ 3 jours ! Tu deviens un vrai ninja !',
    '💎 4 jours ! Incroyable capitaine !',
    '🌟 5 jours ! Tu es un Saiyen !',
    '👑 6 jours ! Légendaire !',
    '🏴‍☠️ 7 jours ! ROI DES PIRATES !'
  ];
  var WORLD_THEMES = {
    'grandbleu':  { color: '#e63946', bg: '#0a0205', accent: '#f4c95d', emoji: '🏴‍☠️', hero: 'Luffy' },
    'magnolia':   { color: '#8b5cf6', bg: '#080418', accent: '#f59e0b', emoji: '🐉',   hero: 'Goku'  },
    'kanto':      { color: '#C0392B', bg: '#0a0408', accent: '#D4AF37', emoji: '⚔️',   hero: 'Tanjiro' },
    'paysdufeu':  { color: '#F97316', bg: '#0d0500', accent: '#FFD700', emoji: '🔥',   hero: 'Naruto' },
  };

  // ── Point d'entrée principal ─────────────────────────────────────
  // Appelé depuis auth.js après afLaunchChild()
  async function checkAndShow(child) {
    if (!child || !child.id) return;

    try {
      var status = await _getStreakStatus(child);
      if (!status) return;

      if (status === 'claimed_today') return; // déjà réclamé

      var streakData = await _computeStreak(child, status);
      _showOverlay(child, streakData, status);
    } catch (e) {
      console.warn('[daily] checkAndShow error:', e && e.message);
    }
  }

  // ── Calculer la streak ────────────────────────────────────────────
  async function _getStreakStatus(child) {
    var db = typeof sb !== 'undefined' ? sb : null;
    if (!db) return 'available';

    try {
      var res = await db.from('v_child_streaks')
        .select('streak_status, current_streak, streak_jokers, last_reward_date')
        .eq('id', child.id)
        .maybeSingle();
      if (res && res.data) return res.data;
      return { streak_status: 'available', current_streak: 0, streak_jokers: 1 };
    } catch (e) {
      return { streak_status: 'available', current_streak: 0, streak_jokers: 1 };
    }
  }

  async function _computeStreak(child, statusData) {
    var status   = typeof statusData === 'string' ? statusData : statusData.streak_status;
    var current  = typeof statusData === 'object' ? (statusData.current_streak || 0) : 0;
    var jokers   = typeof statusData === 'object' ? (statusData.streak_jokers  || 1) : 1;

    var isJoker  = (status === 'joker_available' && jokers > 0);
    var newStreak = (status === 'streak_broken' && !isJoker) ? 1 : Math.min(current + 1, 999);
    var dayIdx    = Math.min(newStreak - 1, 6); // index 0-6 pour les récompenses
    var xpGained  = XP_REWARDS[dayIdx];

    return {
      newStreak: newStreak,
      xpGained:  xpGained,
      isJoker:   isJoker,
      jokers:    jokers,
      dayIdx:    dayIdx,
      status:    status,
    };
  }

  // ── Sauvegarder la récompense ─────────────────────────────────────
  async function _claimReward(child, streakData) {
    var db = typeof sb !== 'undefined' ? sb : null;

    // 1. XP global
    if (typeof xp !== 'undefined') {
      xp += streakData.xpGained;
      if (typeof updateHUD  === 'function') updateHUD();
      if (typeof checkBadges === 'function') checkBadges();
      if (typeof saveProgress === 'function') saveProgress();
    }

    if (!db) return;

    try {
      // 2. Insérer dans daily_rewards
      await db.from('daily_rewards').insert({
        child_id:    child.id,
        reward_date: new Date().toISOString().split('T')[0],
        xp_gained:   streakData.xpGained,
        streak_day:  streakData.newStreak,
        joker_used:  streakData.isJoker,
      });

      // 3. Mettre à jour child_profiles
      var updates = {
        current_streak:   streakData.newStreak,
        last_reward_date: new Date().toISOString().split('T')[0],
      };
      if (streakData.newStreak > (child.best_streak || 0)) {
        updates.best_streak = streakData.newStreak;
      }
      if (streakData.isJoker) {
        updates.streak_jokers = Math.max(0, streakData.jokers - 1);
      }
      // Recharger 1 joker le lundi
      var today = new Date();
      if (today.getDay() === 1) { // lundi
        updates.streak_jokers = Math.min((child.streak_jokers || 0) + 1, 3);
      }
      await db.from('child_profiles').update(updates).eq('id', child.id);

    } catch (e) {
      console.warn('[daily] claimReward DB error:', e && e.message);
    }

    // 4. Analytics
    if (window.AP && typeof window.AP.track === 'function') {
      window.AP.track('daily_login', { value: streakData.xpGained, meta: { streak: streakData.newStreak } });
    }
  }

  // ── Afficher l'overlay ────────────────────────────────────────────
  function _showOverlay(child, streakData, statusData) {
    // Déterminer le thème selon le dernier monde joué (localStorage)
    var lastWorld = 'grandbleu';
    try {
      var saved = JSON.parse(localStorage.getItem('ap_last_world') || '{}');
      if (saved && WORLD_THEMES[saved]) lastWorld = saved;
    } catch (e) {}
    var theme = WORLD_THEMES[lastWorld] || WORLD_THEMES['grandbleu'];

    var msg     = STREAK_MESSAGES[streakData.dayIdx] || STREAK_MESSAGES[0];
    var isJoker = streakData.isJoker;

    // Construire les 7 cases du calendrier
    var calHtml = [1,2,3,4,5,6,7].map(function(day) {
      var done    = day < streakData.newStreak;
      var current = day === streakData.newStreak;
      var xpDay   = XP_REWARDS[day - 1];
      return '<div class="dr-cal-day' + (done ? ' done' : '') + (current ? ' current' : '') + '">' +
        '<div class="dr-cal-num">' + day + '</div>' +
        '<div class="dr-cal-xp">+' + xpDay + ' XP</div>' +
        (current ? '<div class="dr-cal-star">⭐</div>' : done ? '<div class="dr-cal-star">✅</div>' : '') +
      '</div>';
    }).join('');

    // Joker badge
    var jokerHtml = '';
    if (isJoker) {
      jokerHtml = '<div class="dr-joker-badge">🛡️ STREAK SAVER activé — ta série est préservée !</div>';
    }
    if (streakData.jokers > 0 && !isJoker) {
      jokerHtml = '<div class="dr-joker-info">🛡️ ' + streakData.jokers + ' joker(s) disponible(s) si tu rates un jour</div>';
    }

    var html = '<div class="dr-overlay" id="dr-overlay" style="--dr-color:' + theme.color + ';--dr-bg:' + theme.bg + ';--dr-accent:' + theme.accent + '">' +
      '<div class="dr-particles" id="dr-particles"></div>' +
      '<div class="dr-card">' +
        '<div class="dr-emoji">' + theme.emoji + '</div>' +
        '<div class="dr-title">CONNEXION DU JOUR !</div>' +
        '<div class="dr-streak">🔥 Série de <span class="dr-streak-num">' + streakData.newStreak + '</span> jour' + (streakData.newStreak > 1 ? 's' : '') + ' !</div>' +
        '<div class="dr-msg">' + msg + '</div>' +
        jokerHtml +
        '<div class="dr-calendar">' + calHtml + '</div>' +
        '<div class="dr-reward-wrap">' +
          '<div class="dr-reward-label">Récompense du jour</div>' +
          '<div class="dr-reward-xp">+' + streakData.xpGained + ' XP</div>' +
        '</div>' +
        '<button class="dr-btn" id="dr-claim-btn" onclick="window.AP.daily.claim()">⚡ RÉCLAMER MA RÉCOMPENSE !</button>' +
      '</div>' +
    '</div>';

    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el.firstElementChild);

    // Spawn particules
    _spawnParticles(theme.color);

    // Stocker pour le claim
    window._drPending = { child: child, streakData: streakData };

    // Son
    if (typeof sfxFanfare === 'function') setTimeout(sfxFanfare, 300);
  }

  // ── Réclamer la récompense (appelé par le bouton) ─────────────────
  function claim() {
    var pending = window._drPending;
    if (!pending) return;

    var btn = document.getElementById('dr-claim-btn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ En cours…'; }

    _claimReward(pending.child, pending.streakData).then(function() {
      // Animation de fermeture
      var ov = document.getElementById('dr-overlay');
      if (ov) {
        ov.style.opacity = '0';
        ov.style.transform = 'scale(1.05)';
        setTimeout(function() { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 500);
      }
      // Toast
      if (typeof showToast === 'function') {
        showToast('+' + pending.streakData.xpGained + ' XP ! ' + (pending.streakData.newStreak >= 7 ? '👑 LÉGENDAIRE !' : '🔥 Série de ' + pending.streakData.newStreak + ' !'));
      }
      window._drPending = null;
    }).catch(function(e) {
      console.warn('[daily] claim error:', e);
      if (btn) { btn.disabled = false; btn.textContent = '⚡ RÉCLAMER MA RÉCOMPENSE !'; }
    });
  }

  // ── Particules CSS ────────────────────────────────────────────────
  function _spawnParticles(color) {
    var container = document.getElementById('dr-particles');
    if (!container) return;
    for (var i = 0; i < 20; i++) {
      var p = document.createElement('div');
      p.className = 'dr-particle';
      p.style.left   = (Math.random() * 100) + '%';
      p.style.animationDelay    = (Math.random() * 3) + 's';
      p.style.animationDuration = (2 + Math.random() * 3) + 's';
      p.style.width  = (4 + Math.random() * 8) + 'px';
      p.style.height = p.style.width;
      p.style.background = color;
      container.appendChild(p);
    }
  }

  // ── API publique ──────────────────────────────────────────────────
  window.AP         = window.AP || {};
  window.AP.daily   = {
    check: checkAndShow,
    claim: claim,
  };

  // Sauvegarder le dernier monde joué (appelé par router.js)
  window.AP.setLastWorld = function(worldKey) {
    try { localStorage.setItem('ap_last_world', JSON.stringify(worldKey)); } catch(e) {}
  };

  console.info('🔥 daily.js chargé — daily reward + streak saver');
})();
