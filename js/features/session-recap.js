// ═══════════════════════════════════════════════════════════════════
// SESSION-RECAP.JS — Académie Pirate
// Overlay récap post-quiz : XP gagné, îles du jour, suggestion
// Règle A5 : expose via window.AP.recap
// Nouveau fichier — ne modifie rien d'existant
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Config ───────────────────────────────────────────────────────
  var AUTO_CLOSE_MS = 5000; // fermeture auto après 5 secondes
  var _timer        = null;

  // Thèmes par monde
  var WORLD_THEMES = {
    'grandbleu':  { color: '#e63946', bg: '#0a0205', emoji: '🏴‍☠️', name: 'Grand Bleu',  subject: 'Français'  },
    'magnolia':   { color: '#8b5cf6', bg: '#080418', emoji: '🐉',   name: 'Magnolia',    subject: 'Histoire'  },
    'kanto':      { color: '#C0392B', bg: '#0a0408', emoji: '⚔️',   name: 'Kanto',       subject: 'Sciences'  },
    'paysdufeu':  { color: '#F97316', bg: '#0d0500', emoji: '🔥',   name: 'Pays du Feu', subject: 'Maths'     },
  };

  // Messages selon le score
  var SCORE_MSGS = [
    { min: 1.0,  msg: '🏆 LÉGENDAIRE ! Score parfait !',          color: '#ffd700' },
    { min: 0.8,  msg: '⭐ EXCELLENT ! Tu maîtrises !',            color: '#06d6a0' },
    { min: 0.6,  msg: '👍 Bien joué ! Continue comme ça !',       color: '#3b82f6' },
    { min: 0.4,  msg: '💪 Tu progresses ! Réessaie pour mieux !', color: '#f97316' },
    { min: 0.0,  msg: '🔥 Ne lâche pas ! La prochaine sera mieux !', color: '#e63946' },
  ];

  // ── Point d'entrée principal ─────────────────────────────────────
  // Appelé par goBack() de chaque monde AVANT la navigation
  // worldKey : 'grandbleu' | 'magnolia' | 'kanto' | 'paysdufeu'
  // score    : nombre de bonnes réponses
  // total    : nombre total de questions
  // islandN  : numéro de l'île
  // afterCb  : callback à appeler quand l'enfant ferme le récap
  function show(worldKey, score, total, islandN, afterCb) {
    // Données
    var theme    = WORLD_THEMES[worldKey] || WORLD_THEMES['grandbleu'];
    var xpGained = score * 2;
    var pct      = total > 0 ? score / total : 0;
    var msgObj   = SCORE_MSGS.find(function(m){ return pct >= m.min; }) || SCORE_MSGS[SCORE_MSGS.length - 1];

    // XP de session (depuis le début de la connexion)
    var sessionXP = _getSessionXP(xpGained);
    var totalXP   = typeof xp !== 'undefined' ? xp : 0;

    // Îles complétées aujourd'hui
    var todayIslands = _getTodayIslands();

    // Suggestion prochaine île
    var suggestion = _getSuggestion(worldKey, islandN);

    _renderOverlay(theme, score, total, xpGained, sessionXP, totalXP, todayIslands, msgObj, suggestion, afterCb);
  }

  // ── Render ───────────────────────────────────────────────────────
  function _renderOverlay(theme, score, total, xpGained, sessionXP, totalXP, todayIslands, msgObj, suggestion, afterCb) {
    // Supprimer si déjà ouvert
    var existing = document.getElementById('sr-overlay');
    if (existing) existing.remove();

    var starsHtml = Array.from({ length: total }, function(_, i) {
      return '<span class="sr-star' + (i < score ? ' on' : '') + '">⭐</span>';
    }).join('');

    var suggHtml = suggestion
      ? '<div class="sr-suggestion">💡 Prochaine étape : <strong>' + suggestion + '</strong></div>'
      : '';

    var todayHtml = todayIslands > 0
      ? '<div class="sr-today">🗺️ ' + todayIslands + ' île' + (todayIslands > 1 ? 's' : '') + ' explorée' + (todayIslands > 1 ? 's' : '') + " aujourd'hui</div>"
      : '';

    var html = '<div class="sr-overlay" id="sr-overlay" style="--sr-color:' + theme.color + ';--sr-bg:' + theme.bg + '">' +
      '<div class="sr-card">' +
        '<div class="sr-world-badge">' + theme.emoji + ' ' + theme.name + '</div>' +
        '<div class="sr-score-msg" style="color:' + msgObj.color + '">' + msgObj.msg + '</div>' +
        '<div class="sr-stars">' + starsHtml + '</div>' +
        '<div class="sr-score-num">' + score + '<span class="sr-score-total">/' + total + '</span></div>' +
        '<div class="sr-xp-row">' +
          '<div class="sr-xp-item">' +
            '<div class="sr-xp-val">+' + xpGained + '</div>' +
            '<div class="sr-xp-lbl">XP gagnés</div>' +
          '</div>' +
          '<div class="sr-xp-divider"></div>' +
          '<div class="sr-xp-item">' +
            '<div class="sr-xp-val">+' + sessionXP + '</div>' +
            '<div class="sr-xp-lbl">Session</div>' +
          '</div>' +
          '<div class="sr-xp-divider"></div>' +
          '<div class="sr-xp-item">' +
            '<div class="sr-xp-val">' + totalXP + '</div>' +
            '<div class="sr-xp-lbl">Total XP</div>' +
          '</div>' +
        '</div>' +
        todayHtml +
        suggHtml +
        '<div class="sr-progress-wrap">' +
          '<div class="sr-progress-bar"><div class="sr-progress-fill" id="sr-progress-fill"></div></div>' +
          '<div class="sr-progress-lbl" id="sr-progress-lbl">5s</div>' +
        '</div>' +
        '<button class="sr-btn" onclick="window.AP.recap.close()">' +
          '🗺️ RETOUR À LA CARTE' +
        '</button>' +
      '</div>' +
    '</div>';

    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el.firstElementChild);

    // Stocker le callback
    window._srAfterCb = afterCb;

    // Lancer le compte à rebours
    _startCountdown(AUTO_CLOSE_MS);

    // Analytics
    if (window.AP && typeof window.AP.track === 'function') {
      window.AP.track('quiz_complete', {
        world: Object.keys(WORLD_THEMES).find(function(k){ return WORLD_THEMES[k].color === WORLD_THEMES[Object.keys(WORLD_THEMES)[0]].color; }),
        value: score,
        meta:  { total: total, pct: Math.round(score / total * 100) }
      });
    }
  }

  // ── Compte à rebours ─────────────────────────────────────────────
  function _startCountdown(ms) {
    var start   = Date.now();
    var fill    = document.getElementById('sr-progress-fill');
    var lbl     = document.getElementById('sr-progress-lbl');
    clearInterval(_timer);

    _timer = setInterval(function() {
      var elapsed = Date.now() - start;
      var pct     = Math.min(100, elapsed / ms * 100);
      var secs    = Math.max(0, Math.ceil((ms - elapsed) / 1000));

      if (fill) fill.style.width = pct + '%';
      if (lbl)  lbl.textContent  = secs + 's';

      if (elapsed >= ms) {
        clearInterval(_timer);
        _timer = null;
        close();
      }
    }, 100);
  }

  // ── Fermer et naviguer ────────────────────────────────────────────
  function close() {
    clearInterval(_timer);
    _timer = null;

    var ov = document.getElementById('sr-overlay');
    if (ov) {
      ov.style.opacity = '0';
      ov.style.transform = 'scale(1.02)';
      setTimeout(function() {
        if (ov.parentNode) ov.parentNode.removeChild(ov);
        if (window._srAfterCb) {
          window._srAfterCb();
          window._srAfterCb = null;
        }
      }, 350);
    } else {
      if (window._srAfterCb) { window._srAfterCb(); window._srAfterCb = null; }
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────
  function _getSessionXP(lastGained) {
    try {
      var stored = parseInt(sessionStorage.getItem('ap_session_xp') || '0', 10);
      stored += lastGained;
      sessionStorage.setItem('ap_session_xp', String(stored));
      return stored;
    } catch(e) { return lastGained; }
  }

  function _getTodayIslands() {
    try {
      var stored = parseInt(sessionStorage.getItem('ap_today_islands') || '0', 10);
      stored++;
      sessionStorage.setItem('ap_today_islands', String(stored));
      return stored;
    } catch(e) { return 1; }
  }

  function _getSuggestion(worldKey, islandN) {
    // Suggérer l'île suivante dans le même monde
    var maxIslands = 8;
    if (islandN < maxIslands) {
      var theme = WORLD_THEMES[worldKey];
      return theme ? 'Île #' + (islandN + 1) + ' — ' + theme.name : null;
    }
    // Monde complété → suggérer un autre monde
    var others = Object.keys(WORLD_THEMES).filter(function(k){ return k !== worldKey; });
    var other  = WORLD_THEMES[others[Math.floor(Math.random() * others.length)]];
    return other ? other.emoji + ' ' + other.name + ' — ' + other.subject : null;
  }

  // ── API publique ──────────────────────────────────────────────────
  window.AP       = window.AP || {};
  window.AP.recap = { show: show, close: close };

  console.info('📊 session-recap.js chargé');
})();
