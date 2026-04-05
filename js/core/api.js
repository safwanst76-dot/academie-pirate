/**
 * ACADÉMIE PIRATE — API Layer
 * js/core/api.js — Couche données unifiée
 * Règle ARCHI-01 : toutes les requêtes Supabase passent par ici
 *
 * PRINCIPES :
 * - Wrapper propre au-dessus de db.js (rétro-compat préservée)
 * - Toutes les nouvelles requêtes (Phase 3+) sont ici
 * - Gestion d'erreurs centralisée
 * - Cache léger pour éviter les doublons de requêtes
 * - Émission d'événements AP.events sur les changements d'état
 *
 * Usage :
 *   AP.api.children.getAll()                → [child, ...]
 *   AP.api.children.create(username, avId)  → { ok, child }
 *   AP.api.progression.save(...)            → { ok }
 *   AP.api.avatars.getAll()                 → [avatar, ...]
 *   AP.api.content.getChapitres(matiere, niveau) → [chapitre, ...]
 *   AP.api.content.getQuestions(chapitreId) → [question, ...]
 */

(function (global) {
  'use strict';

  // ── Helper : client Supabase ──────────────────────────────────
  function getDb() {
    if (typeof sb !== 'undefined') return sb;
    if (typeof global.sb !== 'undefined') return global.sb;
    throw new Error('[AP.api] Client Supabase (sb) non initialisé');
  }

  // ── Cache léger (TTL = 60s) ───────────────────────────────────
  var _cache = {};

  function _cacheGet(key) {
    var entry = _cache[key];
    if (!entry) return null;
    if (Date.now() - entry.ts > 60000) { delete _cache[key]; return null; }
    return entry.data;
  }

  function _cacheSet(key, data) {
    _cache[key] = { data: data, ts: Date.now() };
  }

  function _cacheInvalidate(prefix) {
    Object.keys(_cache).forEach(function (k) {
      if (k.startsWith(prefix)) delete _cache[k];
    });
  }

  // ── Émetteur d'événements ─────────────────────────────────────
  function _emit(event, data) {
    if (global.AP && global.AP.events) {
      global.AP.events.emit(event, data);
    }
  }

  // ── Gestion d'erreur centralisée ──────────────────────────────
  function _handleError(context, err) {
    var msg = err && err.message ? err.message : String(err);
    console.error('[AP.api] ' + context + ':', msg);
    _emit('ui:toast', { message: 'Erreur : ' + msg, type: 'error' });
    return { ok: false, error: msg };
  }

  // ══════════════════════════════════════════════════════════════
  // ENFANTS
  // ══════════════════════════════════════════════════════════════
  var children = {

    getAll: async function () {
      try {
        // Déléguer à db.js (rétro-compat)
        if (typeof global.dbGetChildren === 'function') {
          return await global.dbGetChildren();
        }
        var res = await getDb().from('child_profiles').select('*').order('created_at');
        if (res.error) throw res.error;
        return res.data || [];
      } catch (e) {
        _handleError('children.getAll', e);
        return [];
      }
    },

    create: async function (username, avatarId, pin) {
      try {
        _cacheInvalidate('children');
        if (typeof global.dbCreateChild === 'function') {
          return await global.dbCreateChild(username, avatarId || 'luffy', pin || null);
        }
        var user = (await getDb().auth.getUser()).data.user;
        var res  = await getDb().from('child_profiles')
          .insert({ parent_id: user.id, username, avatar_id: avatarId, pin })
          .select().single();
        if (res.error) throw res.error;
        return { ok: true, child: res.data };
      } catch (e) {
        return _handleError('children.create', e);
      }
    },

    update: async function (childId, updates) {
      try {
        _cacheInvalidate('children');
        if (typeof global.dbUpdateChild === 'function') {
          return await global.dbUpdateChild(childId, updates);
        }
        var res = await getDb().from('child_profiles')
          .update(updates).eq('id', childId).select().single();
        if (res.error) throw res.error;
        return { ok: true, child: res.data };
      } catch (e) {
        return _handleError('children.update', e);
      }
    },

    updateAvatar: async function (childId, avatarId) {
      var result = await children.update(childId, { avatar_id: avatarId });
      if (result.ok) {
        _emit('child:avatar-changed', { avatarId });
      }
      return result;
    }
  };

  // ══════════════════════════════════════════════════════════════
  // PROGRESSION
  // ══════════════════════════════════════════════════════════════
  var progression = {

    save: async function (childId, islandId, score, xpGained) {
      try {
        if (typeof global.dbSaveProgression === 'function') {
          return await global.dbSaveProgression(childId, islandId, score, xpGained);
        }
        var res = await getDb().from('progressions').upsert(
          { child_id: childId, island_id: islandId, score, xp: xpGained,
            updated_at: new Date().toISOString() },
          { onConflict: 'child_id,island_id' }
        ).select().single();
        if (res.error) throw res.error;
        _emit('quiz:complete', { score, xp: xpGained, islandId });
        return { ok: true, data: res.data };
      } catch (e) {
        return _handleError('progression.save', e);
      }
    },

    getAll: async function (childId) {
      try {
        if (typeof global.dbGetProgression === 'function') {
          return await global.dbGetProgression(childId);
        }
        var res = await getDb().from('progressions').select('*').eq('child_id', childId);
        if (res.error) throw res.error;
        return res.data || [];
      } catch (e) {
        _handleError('progression.getAll', e);
        return [];
      }
    }
  };

  // ══════════════════════════════════════════════════════════════
  // CONTENU — Questions / Chapitres (Supabase DB Phase 2+)
  // ══════════════════════════════════════════════════════════════
  var content = {

    getMatieres: async function () {
      var cKey = 'matieres';
      var cached = _cacheGet(cKey);
      if (cached) return cached;
      try {
        var res = await getDb().from('matieres').select('*').order('code');
        if (res.error) throw res.error;
        _cacheSet(cKey, res.data || []);
        return res.data || [];
      } catch (e) {
        _handleError('content.getMatieres', e);
        return [];
      }
    },

    getNiveaux: async function () {
      var cKey = 'niveaux';
      var cached = _cacheGet(cKey);
      if (cached) return cached;
      try {
        var res = await getDb().from('niveaux').select('*').order('ordre');
        if (res.error) throw res.error;
        _cacheSet(cKey, res.data || []);
        return res.data || [];
      } catch (e) {
        _handleError('content.getNiveaux', e);
        return [];
      }
    },

    getChapitres: async function (matiereCode, niveauCode) {
      var cKey = 'chapitres:' + matiereCode + ':' + niveauCode;
      var cached = _cacheGet(cKey);
      if (cached) return cached;
      try {
        // Résoudre les IDs
        var matieres = await content.getMatieres();
        var niveaux  = await content.getNiveaux();
        var matiere  = matieres.find(function (m) { return m.code === matiereCode; });
        var niveau   = niveaux.find(function (n) { return n.code === niveauCode; });
        if (!matiere || !niveau) return [];

        var res = await getDb().from('chapitres')
          .select('*')
          .eq('matiere_id', matiere.id)
          .eq('niveau_id', niveau.id)
          .order('numero');
        if (res.error) throw res.error;
        _cacheSet(cKey, res.data || []);
        return res.data || [];
      } catch (e) {
        _handleError('content.getChapitres', e);
        return [];
      }
    },

    getQuestions: async function (chapitreId) {
      var cKey = 'questions:' + chapitreId;
      var cached = _cacheGet(cKey);
      if (cached) return cached;
      try {
        var res = await getDb().from('questions')
          .select('*')
          .eq('chapitre_id', chapitreId)
          .order('ordre');
        if (res.error) throw res.error;
        _cacheSet(cKey, res.data || []);
        return res.data || [];
      } catch (e) {
        _handleError('content.getQuestions', e);
        return [];
      }
    },

    // Invalider le cache questions (ex: après édition admin)
    invalidateQuestions: function (chapitreId) {
      _cacheInvalidate('questions:' + chapitreId);
    }
  };

  // ══════════════════════════════════════════════════════════════
  // AVATARS — Pool tous univers (Phase 3a)
  // ══════════════════════════════════════════════════════════════
  var avatars = {

    /**
     * Retourne tous les avatars disponibles depuis avatars.json
     * Compatible avec le futur pool élargi 40+ personnages
     */
    getAll: function () {
      if (typeof global.AVATARS !== 'undefined' && Array.isArray(global.AVATARS)) {
        return Promise.resolve(global.AVATARS);
      }
      return fetch('data/avatars.json')
        .then(function (r) { return r.json(); })
        .then(function (d) { return d.avatars || []; })
        .catch(function (e) {
          _handleError('avatars.getAll', e);
          return [];
        });
    },

    /**
     * Retourne les avatars filtrés par univers
     */
    getByUniverse: async function (universe) {
      var all = await avatars.getAll();
      if (!universe) return all;
      return all.filter(function (av) { return av.universe === universe; });
    },

    /**
     * Résoudre un avatar par ID
     */
    resolve: async function (id) {
      var all = await avatars.getAll();
      var found = all.find(function (av) { return av.id === id; });
      return found || { id: id, img: 'assets/images/avatars/luffy.png', color: '#e63946', name: id };
    }
  };

  // ══════════════════════════════════════════════════════════════
  // AUTH
  // ══════════════════════════════════════════════════════════════
  var auth = {

    getUser: async function () {
      try {
        var res = await getDb().auth.getUser();
        return res.data.user || null;
      } catch (e) {
        return null;
      }
    },

    getSession: async function () {
      try {
        var res = await getDb().auth.getSession();
        return res.data.session || null;
      } catch (e) {
        return null;
      }
    }
  };

  // ── Utilitaire : cache invalidation globale ───────────────────
  function clearCache() {
    _cache = {};
  }

  // ── Exposition sur window.AP ──────────────────────────────────
  global.AP = global.AP || {};
  global.AP.api = {
    children,
    progression,
    content,
    avatars,
    auth,
    clearCache
  };

  console.info('🌐 AP.api chargé — couche données unifiée');

})(window);
