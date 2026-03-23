// ═══════════════════════════════════════════════════════════════════
// ANALYTICS.JS — Académie Pirate
// Tracking interne 100% Supabase — RGPD compliant, zéro tiers
// Pas de cookies, pas d'IP stockée, session ID aléatoire
// Règle : charger APRÈS supabase.js, AVANT router.js
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────────────────────────
  var BATCH_SIZE     = 10;   // Envoyer par lots de 10 events
  var BATCH_DELAY_MS = 3000; // Max 3s avant envoi forcé
  var SESSION_TTL_MS = 30 * 60 * 1000; // 30min d'inactivité = nouvelle session

  // ── ÉTAT INTERNE ─────────────────────────────────────────────────
  var _sessionId    = null;
  var _sessionStart = Date.now();
  var _lastActivity = Date.now();
  var _queue        = [];
  var _batchTimer   = null;
  var _funnelSynced = false;
  var _platform     = _detectPlatform();
  var _initialized  = false;

  // ── INITIALISATION ───────────────────────────────────────────────
  function init() {
    if (_initialized) return;
    _initialized = true;

    _sessionId = _getOrCreateSession();
    _initFunnelSession();
    _trackUTM();
    _listenHashChange();
    _listenVisibility();

    console.info('📊 analytics.js chargé — session:', _sessionId.substr(0, 8) + '...');
  }

  // ── API PUBLIQUE ─────────────────────────────────────────────────

  /**
   * Tracker un événement.
   * @param {string} eventType  - voir liste dans migration_v4_analytics.sql
   * @param {object} opts       - { world, islandN, value, meta }
   */
  function track(eventType, opts) {
    opts = opts || {};
    _lastActivity = Date.now();

    // Vérifier si la session a expiré
    if (Date.now() - _lastActivity > SESSION_TTL_MS) {
      _sessionId = _createNewSession();
      _funnelSynced = false;
      _initFunnelSession();
    }

    var event = {
      session_id: _sessionId,
      parent_id:  _getParentId(),
      child_id:   _getChildId(),
      event_type: eventType,
      world:      opts.world    || null,
      island_n:   opts.islandN  || null,
      value:      opts.value    != null ? Number(opts.value) : null,
      meta:       opts.meta     || {},
      platform:   _platform,
    };

    // Enrichir le meta avec des données contextuelles
    event.meta.url   = window.location.hash || '/';
    event.meta.ts_ms = Date.now() - _sessionStart;

    _queue.push(event);
    _updateFunnel(eventType, opts);
    _scheduleBatch();
  }

  /**
   * Tracker la navigation (appelé par router.js)
   */
  function trackPage(route) {
    track('page_view', { meta: { route: route } });
  }

  /**
   * Tracker l'entrée dans un monde
   */
  function trackWorldEnter(worldKey) {
    track('world_enter', { world: worldKey });
    _patchFunnel({ reached_map: true, reached_world: worldKey });
  }

  /**
   * Tracker le démarrage d'une leçon
   */
  function trackLessonStart(worldKey, islandN) {
    track('lesson_start', { world: worldKey, islandN: islandN });
    _patchFunnel({ reached_lesson: true });
  }

  /**
   * Tracker le skip d'une leçon
   */
  function trackLessonSkip(worldKey, islandN, timeSpentMs) {
    track('lesson_skip', { world: worldKey, islandN: islandN, value: Math.round(timeSpentMs / 1000) });
  }

  /**
   * Tracker la fin d'une leçon (bouton "Je suis prêt")
   */
  function trackLessonComplete(worldKey, islandN, timeSpentMs) {
    track('lesson_complete', { world: worldKey, islandN: islandN, value: Math.round(timeSpentMs / 1000) });
  }

  /**
   * Tracker le démarrage d'un quiz
   */
  function trackQuizStart(worldKey, islandN) {
    track('quiz_start', { world: worldKey, islandN: islandN });
    _patchFunnel({ reached_quiz: true });
  }

  /**
   * Tracker la fin d'un quiz
   */
  function trackQuizComplete(worldKey, islandN, score, total) {
    var pct = total > 0 ? Math.round(score / total * 100) : 0;
    track('quiz_complete', {
      world: worldKey, islandN: islandN, value: score,
      meta: { total: total, pct: pct }
    });
    if (pct === 100) track('quiz_perfect', { world: worldKey, islandN: islandN, value: score });
    _patchFunnel({ completed_quiz: true, total_xp_inc: score * 2, islands_played_inc: 1 });
  }

  /**
   * Tracker le signup parent
   */
  function trackSignup(step) {
    track('signup_' + step);
  }

  /**
   * Tracker la connexion PIN enfant
   */
  function trackPinLogin() {
    track('pin_login');
  }

  // ── MISE À JOUR DU FUNNEL ────────────────────────────────────────
  function _updateFunnel(eventType, opts) {
    var patch = {};
    switch (eventType) {
      case 'world_enter':   patch.reached_map   = true; patch.reached_world = opts.world; break;
      case 'lesson_start':  patch.reached_lesson = true; break;
      case 'quiz_start':    patch.reached_quiz   = true; break;
      case 'quiz_complete': patch.completed_quiz = true; break;
    }
    if (Object.keys(patch).length > 0) _patchFunnel(patch);
  }

  function _patchFunnel(patch) {
    patch.last_seen_at = new Date().toISOString();
    patch.duration_s   = Math.round((Date.now() - _sessionStart) / 1000);

    // Gestion des champs incrémentaux
    if (patch.total_xp_inc) {
      var stored = _getFunnelStore();
      stored.total_xp = (stored.total_xp || 0) + patch.total_xp_inc;
      patch.total_xp  = stored.total_xp;
      _saveFunnelStore(stored);
      delete patch.total_xp_inc;
    }
    if (patch.islands_played_inc) {
      var stored2 = _getFunnelStore();
      stored2.islands_played = (stored2.islands_played || 0) + patch.islands_played_inc;
      patch.islands_played   = stored2.islands_played;
      _saveFunnelStore(stored2);
      delete patch.islands_played_inc;
    }

    _upsertFunnel(patch);
  }

  // ── ENVOI BATCH ──────────────────────────────────────────────────
  function _scheduleBatch() {
    if (_batchTimer) return;
    _batchTimer = setTimeout(_flushQueue, BATCH_DELAY_MS);
    if (_queue.length >= BATCH_SIZE) {
      clearTimeout(_batchTimer);
      _batchTimer = null;
      _flushQueue();
    }
  }

  function _flushQueue() {
    clearTimeout(_batchTimer);
    _batchTimer = null;
    if (!_queue.length) return;

    var toSend = _queue.splice(0, _queue.length);
    var db = typeof sb !== 'undefined' ? sb : (typeof getDb === 'function' ? getDb() : null);
    if (!db) {
      // Supabase pas encore dispo → remettre en queue
      _queue.unshift.apply(_queue, toSend);
      return;
    }

    // Supabase JS v2 : async/await
    (async function() {
      try {
        var res = await db.from('analytics_events').insert(toSend);
        if (res && res.error) {
          // Table absente (migration non exécutée) → silence
          if (res.error.message && res.error.message.includes('analytics_events')) return;
          console.warn('[analytics] insert error:', res.error.message);
        }
      } catch (e) {
        console.warn('[analytics] network error:', e && e.message);
      }
    })();
  }

  // ── FUNNEL UPSERT ─────────────────────────────────────────────────
  function _initFunnelSession() {
    var utm = _getUTM();
    var data = {
      session_id:   _sessionId,
      parent_id:    _getParentId(),
      child_id:     _getChildId(),
      platform:     _platform,
      referrer:     document.referrer || null,
      utm_source:   utm.source,
      utm_medium:   utm.medium,
      utm_campaign: utm.campaign,
      started_at:   new Date().toISOString(),
      last_seen_at: new Date().toISOString(),
    };
    var db = typeof sb !== 'undefined' ? sb : (typeof getDb === 'function' ? getDb() : null);
    if (!db) return;
    // Supabase JS v2 : async/await
    (async function() {
      try {
        await db.from('funnel_sessions').upsert(data, { onConflict: 'session_id' });
        _funnelSynced = true;
      } catch (e) {
        if (e && e.message && e.message.includes('funnel_sessions')) return;
        console.warn('[analytics] funnel init:', e && e.message);
      }
    })();
  }

  function _upsertFunnel(patch) {
    patch.session_id = _sessionId;
    var db = typeof sb !== 'undefined' ? sb : (typeof getDb === 'function' ? getDb() : null);
    if (!db) return;
    // Supabase JS v2 : pas de .catch() direct — async/await requis
    (async function() {
      try {
        await db.from('funnel_sessions').upsert(patch, { onConflict: 'session_id' });
      } catch (e) {
        // Table absente (migration non exécutée) → silence, non-bloquant
        if (e && e.message && e.message.includes('funnel_sessions')) return;
        console.warn('[analytics] funnel patch:', e && e.message);
      }
    })();
  }

  // ── SESSION ID ────────────────────────────────────────────────────
  function _getOrCreateSession() {
    try {
      var stored  = sessionStorage.getItem('ap_session_id');
      var storedTs = parseInt(sessionStorage.getItem('ap_session_ts') || '0', 10);
      if (stored && Date.now() - storedTs < SESSION_TTL_MS) {
        _sessionStart = storedTs;
        return stored;
      }
    } catch (e) {}
    return _createNewSession();
  }

  function _createNewSession() {
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    try {
      sessionStorage.setItem('ap_session_id', id);
      sessionStorage.setItem('ap_session_ts', String(Date.now()));
    } catch (e) {}
    _sessionStart = Date.now();
    return id;
  }

  // ── FUNNEL LOCAL STORE ────────────────────────────────────────────
  function _getFunnelStore() {
    try { return JSON.parse(sessionStorage.getItem('ap_funnel') || '{}'); } catch(e){ return {}; }
  }
  function _saveFunnelStore(data) {
    try { sessionStorage.setItem('ap_funnel', JSON.stringify(data)); } catch(e){}
  }

  // ── HELPERS ───────────────────────────────────────────────────────
  function _getParentId() {
    try {
      if (typeof _authUser !== 'undefined' && _authUser && _authUser.id) return _authUser.id;
    } catch (e) {}
    return null;
  }

  function _getChildId() {
    try {
      if (typeof _activeChild !== 'undefined' && _activeChild && _activeChild.id) return _activeChild.id;
      if (typeof dbGetActiveChild === 'function') {
        var c = dbGetActiveChild();
        if (c && c.id) return c.id;
      }
    } catch (e) {}
    return null;
  }

  function _detectPlatform() {
    var ua = navigator.userAgent;
    if (/iPad|tablet/i.test(ua)) return 'tablet';
    if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  function _trackUTM() {
    var params = new URLSearchParams(window.location.search);
    var utm = {
      source:   params.get('utm_source'),
      medium:   params.get('utm_medium'),
      campaign: params.get('utm_campaign')
    };
    if (utm.source || utm.medium || utm.campaign) {
      try { sessionStorage.setItem('ap_utm', JSON.stringify(utm)); } catch(e){}
    }
  }

  function _getUTM() {
    try { return JSON.parse(sessionStorage.getItem('ap_utm') || '{}'); } catch(e){ return {}; }
  }

  function _listenHashChange() {
    window.addEventListener('hashchange', function () {
      var route = window.location.hash.replace('#/', '') || 'login';
      track('page_view', { meta: { route: route } });
    });
  }

  function _listenVisibility() {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) _flushQueue();
    });
    window.addEventListener('beforeunload', function () {
      _flushQueue();
    });
  }

  // ── EXPOSE API GLOBALE ────────────────────────────────────────────
  window.AP = window.AP || {};
  window.AP.track            = track;
  window.AP.trackPage        = trackPage;
  window.AP.trackWorldEnter  = trackWorldEnter;
  window.AP.trackLessonStart = trackLessonStart;
  window.AP.trackLessonSkip  = trackLessonSkip;
  window.AP.trackLessonComplete = trackLessonComplete;
  window.AP.trackQuizStart   = trackQuizStart;
  window.AP.trackQuizComplete = trackQuizComplete;
  window.AP.trackSignup      = trackSignup;
  window.AP.trackPinLogin    = trackPinLogin;
  window.AP.flush            = _flushQueue;
  window.AP.sessionId        = function () { return _sessionId; };

  // Auto-init dès que le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();