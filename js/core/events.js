/**
 * ACADÉMIE PIRATE — Event Bus
 * js/core/events.js — Communication inter-composants découplée
 * Règle ARCHI-01 : les composants se parlent via events, pas directement
 *
 * Usage :
 *   AP.events.on('child:selected', function(child) { ... });
 *   AP.events.emit('child:selected', childData);
 *   AP.events.off('child:selected', handler);
 *   AP.events.once('quiz:complete', handler); // s'exécute une seule fois
 *
 * Catalogue des événements (à enrichir) :
 *
 *   AUTH
 *   ├── auth:login           → { user }
 *   ├── auth:logout          → {}
 *   └── auth:error           → { message }
 *
 *   ENFANT
 *   ├── child:selected       → { child }   (enfant sélectionné en début de session)
 *   ├── child:avatar-changed → { avatarId, avatarImg }
 *   └── child:xp-updated     → { xp, level, gained }
 *
 *   NAVIGATION
 *   ├── nav:world-enter      → { worldId }
 *   ├── nav:world-exit       → { worldId }
 *   ├── nav:level-selected   → { worldId, level }   (ex: english + cm2)
 *   └── nav:island-selected  → { worldId, level, islandNum }
 *
 *   LEÇON
 *   ├── lesson:start         → { worldId, level, islandNum }
 *   ├── lesson:hero-done     → {}
 *   ├── lesson:warmup-answer → { correct, questionIdx }
 *   └── lesson:complete      → {}
 *
 *   QUIZ
 *   ├── quiz:start           → { chapitreId, nbQuestions }
 *   ├── quiz:answer          → { questionIdx, correct }
 *   └── quiz:complete        → { score, xp, chapitreId }
 *
 *   UI
 *   ├── ui:toast             → { message, type }   ('success'|'error'|'info')
 *   └── ui:loading           → { active }
 */

(function (global) {
  'use strict';

  var _listeners = {};

  /**
   * S'abonner à un événement
   * @param {string} event
   * @param {function} handler
   * @returns {function} unsubscribe — appeler pour se désabonner
   */
  function on(event, handler) {
    if (typeof handler !== 'function') {
      console.error('[AP.events] handler must be a function for event:', event);
      return function () {};
    }
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(handler);

    // Retourne une fonction de désabonnement
    return function () { off(event, handler); };
  }

  /**
   * S'abonner une seule fois
   */
  function once(event, handler) {
    function wrapper(data) {
      handler(data);
      off(event, wrapper);
    }
    wrapper._originalHandler = handler;
    return on(event, wrapper);
  }

  /**
   * Se désabonner
   */
  function off(event, handler) {
    if (!_listeners[event]) return;
    _listeners[event] = _listeners[event].filter(function (h) {
      return h !== handler && h._originalHandler !== handler;
    });
  }

  /**
   * Émettre un événement
   * @param {string} event
   * @param {*} data
   */
  function emit(event, data) {
    if (!_listeners[event] || _listeners[event].length === 0) return;
    var handlers = _listeners[event].slice(); // copie pour éviter les mutations pendant l'itération
    handlers.forEach(function (handler) {
      try {
        handler(data);
      } catch (err) {
        console.error('[AP.events] Error in handler for "' + event + '":', err);
      }
    });
  }

  /**
   * Lister les événements actifs (debug)
   */
  function debug() {
    var result = {};
    Object.keys(_listeners).forEach(function (event) {
      result[event] = _listeners[event].length + ' handler(s)';
    });
    console.table(result);
    return result;
  }

  /**
   * Supprimer tous les listeners d'un événement (reset)
   */
  function clear(event) {
    if (event) {
      delete _listeners[event];
    } else {
      _listeners = {};
    }
  }

  // ── Exposition sur window.AP ──────────────────────────────────
  global.AP = global.AP || {};
  global.AP.events = { on: on, once: once, off: off, emit: emit, debug: debug, clear: clear };

  console.info('📡 AP.events chargé — bus pub/sub prêt');

})(window);
