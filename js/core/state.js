/**
 * ACADÉMIE PIRATE — State Manager
 * js/core/state.js — Source de vérité unique de l'application
 * Règle ARCHI-01 : état centralisé, jamais éparpillé
 *
 * Usage :
 *   AP.state.get('child')          → objet enfant actif
 *   AP.state.set('child', child)   → met à jour + émet child:selected
 *   AP.state.get('avatar')         → { id, img, color, name }
 *   AP.state.get('world')          → 'english' | 'grand-bleu' | ...
 *   AP.state.get('level')          → 'cm2' | '6eme' | ...
 *
 * Bridges vers l'existant :
 *   Quand on set('child', ...), on met aussi à jour _activeChild (db.js)
 *   et playerData (avatar.js) pour rétro-compat avec les mondes V1.
 */

(function (global) {
  'use strict';

  // ── État interne ──────────────────────────────────────────────
  var _state = {

    // Authentification
    user:    null,   // Supabase auth user (parent connecté)
    isAuth:  false,

    // Enfant actif
    child: null,     // { id, username, avatar_id, xp_total, level, ... }

    // Avatar de l'enfant
    avatar: {
      id:    'luffy',
      img:   'assets/images/avatars/luffy.jpg',
      color: '#e63946',
      name:  'Luffy',
      quote: 'Je serai Roi des Pirates !'
    },

    // Navigation courante
    world:   null,   // 'english' | 'grand-bleu' | 'pays-du-feu' | ...
    level:   null,   // 'cm2' | '6eme' | '5eme' | '4eme'
    island:  null,   // numéro (1-8)

    // Session courante
    xp:      0,
    xpGained: 0,     // XP gagné dans la session courante

    // UI
    loading: false,
  };

  // ── Getters / Setters ─────────────────────────────────────────

  function get(key) {
    if (!(key in _state)) {
      console.warn('[AP.state] Clé inconnue:', key);
      return undefined;
    }
    return _state[key];
  }

  function set(key, value) {
    if (!(key in _state)) {
      console.warn('[AP.state] Clé inconnue:', key);
      return;
    }

    var old = _state[key];
    _state[key] = value;

    // Émettre l'événement de changement si AP.events est chargé
    if (global.AP && global.AP.events) {
      global.AP.events.emit('state:change', { key: key, value: value, old: old });
    }

    // ── Bridges rétro-compat ──────────────────────────────────

    if (key === 'child' && value) {
      // Bridge → db.js (_activeChild)
      if (typeof global.dbSetActiveChild === 'function') {
        global.dbSetActiveChild(value);
      }
      // Émettre l'événement spécifique
      if (global.AP && global.AP.events) {
        global.AP.events.emit('child:selected', value);
      }
    }

    if (key === 'avatar' && value) {
      // Bridge → avatar.js (playerData)
      if (typeof global.playerData !== 'undefined') {
        global.playerData.avatarId  = value.id;
        global.playerData.avatarImg = value.img;
        global.playerData.avatarColor = value.color;
        global.playerData.charName  = value.name;
        global.playerData.avatarQuote = value.quote;
      }
      if (global.AP && global.AP.events) {
        global.AP.events.emit('child:avatar-changed', value);
      }
    }

    if (key === 'world' && value) {
      if (global.AP && global.AP.events) {
        global.AP.events.emit('nav:world-enter', { worldId: value });
      }
    }

    if (key === 'level' && value) {
      if (global.AP && global.AP.events) {
        global.AP.events.emit('nav:level-selected', {
          worldId: _state.world,
          level: value
        });
      }
    }

    if (key === 'xp') {
      if (global.AP && global.AP.events) {
        global.AP.events.emit('child:xp-updated', {
          xp:     value,
          level:  _state.child ? (_state.child.level || 1) : 1,
          gained: _state.xpGained
        });
      }
    }
  }

  // ── Helpers métier ────────────────────────────────────────────

  /**
   * Initialiser l'état depuis un enfant Supabase
   * Appelé lors de la sélection du profil enfant
   */
  function initFromChild(child) {
    if (!child) return;
    set('child', child);
    set('xp', child.xp_total || 0);

    // Charger l'avatar correspondant
    var avatarId = child.avatar_id || 'luffy';
    var avatarData = _resolveAvatar(avatarId);
    set('avatar', avatarData);
  }

  /**
   * Résoudre un avatar par son ID
   * Compatible avec tous les univers (ARCHI-01 + AV-01)
   */
  function _resolveAvatar(id) {
    // Chercher dans AVATARS (avatars.json chargé par avatar.js)
    if (typeof global.AVATARS !== 'undefined' && Array.isArray(global.AVATARS)) {
      var found = global.AVATARS.find(function (av) { return av.id === id; });
      if (found) return {
        id:    found.id,
        img:   found.img,
        color: found.color || '#e63946',
        name:  found.name,
        quote: found.quote || ''
      };
    }
    // Fallback
    return {
      id:    id,
      img:   'assets/images/avatars/' + id + '.png',
      color: '#e63946',
      name:  id,
      quote: ''
    };
  }

  /**
   * Snapshot complet (debug)
   */
  function snapshot() {
    return JSON.parse(JSON.stringify(_state));
  }

  /**
   * Reset partiel (ex: fin de session)
   */
  function resetSession() {
    _state.world   = null;
    _state.level   = null;
    _state.island  = null;
    _state.xpGained = 0;
  }

  // ── Init : lecture depuis l'existant au démarrage ─────────────
  function _syncFromExisting() {
    // Si playerData (avatar.js) est déjà chargé, synchroniser
    if (typeof global.playerData !== 'undefined' && global.playerData.avatarId) {
      _state.avatar = {
        id:    global.playerData.avatarId,
        img:   global.playerData.avatarImg || '',
        color: global.playerData.avatarColor || '#e63946',
        name:  global.playerData.charName || '',
        quote: global.playerData.avatarQuote || ''
      };
    }
    // Si _activeChild (db.js) est déjà chargé
    if (typeof global.dbGetActiveChild === 'function') {
      var c = global.dbGetActiveChild();
      if (c) _state.child = c;
    }
  }

  // Synchroniser après chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _syncFromExisting);
  } else {
    _syncFromExisting();
  }

  // ── Exposition sur window.AP ──────────────────────────────────
  global.AP = global.AP || {};
  global.AP.state = {
    get:           get,
    set:           set,
    initFromChild: initFromChild,
    resetSession:  resetSession,
    snapshot:      snapshot
  };

  // Breakpoints exposés pour usage JS (cohérence avec tokens.css)
  global.AP.BP = {
    SM:   320,
    MD:   768,
    LG:   1024,
    XL:   1280,
    isMobile:  function () { return window.innerWidth < 768; },
    isTablet:  function () { return window.innerWidth >= 768 && window.innerWidth < 1024; },
    isDesktop: function () { return window.innerWidth >= 1024; }
  };

  console.info('🧠 AP.state chargé — source de vérité unique');

})(window);
