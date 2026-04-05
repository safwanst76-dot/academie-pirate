/**
 * ACADÉMIE PIRATE — Avatar Picker Component
 * js/components/avatar-picker.js
 * Règles : ARCHI-01 · RD-01 · UX-01 · AV-01
 *
 * Composant autonome : grille 51 avatars, filtres univers, sélection
 * Utilisé dans child-select.js (création profil) et futur écran settings
 *
 * Usage :
 *   AvatarPicker.render(containerEl, options)
 *   options = {
 *     selected: 'luffy',           // avatar pré-sélectionné
 *     onSelect: function(avatar)   // callback { id, name, img, color, ... }
 *   }
 */

(function (global) {
  'use strict';

  var UNIVERSE_LABELS = {
    'all':          { label: 'Tous',          emoji: '✨' },
    'one-piece':    { label: 'One Piece',     emoji: '🏴‍☠️' },
    'aot':          { label: 'Titan',         emoji: '⚔️'  },
    'naruto':       { label: 'Naruto',        emoji: '🔥'  },
    'demon-slayer': { label: 'Demon Slayer',  emoji: '🗡️'  },
    'dbz':          { label: 'Dragon Ball',   emoji: '🐉'  }
  };

  var _instances = {};  // containerEl → state (permet plusieurs pickers simultanés)

  /* ─── Point d'entrée ─────────────────────────────────────────── */
  function render(container, options) {
    if (!container) return;
    options = options || {};

    var state = {
      avatars:    [],
      filter:     'all',
      selected:   options.selected || 'luffy',
      onSelect:   options.onSelect || function () {}
    };

    _instances[container] = state;
    container.innerHTML = _buildShell();
    _bindFilterEvents(container, state);

    // Charger les avatars via AP.api
    _loadAvatars(container, state);
  }

  /* ─── Shell HTML ──────────────────────────────────────────────── */
  function _buildShell() {
    var tabs = Object.keys(UNIVERSE_LABELS).map(function (u) {
      var info = UNIVERSE_LABELS[u];
      return '<button class="avp-tab" data-universe="' + u + '">' +
        info.emoji + ' <span class="avp-tab-label">' + info.label + '</span>' +
      '</button>';
    }).join('');

    return '<div class="avp-wrap">' +
      '<div class="avp-filters" role="tablist" aria-label="Filtrer par univers">' +
        tabs +
      '</div>' +
      '<div class="avp-grid" id="avp-grid" role="listbox" aria-label="Choisir un avatar">' +
        '<div class="avp-loading"><div class="ap-spinner"></div></div>' +
      '</div>' +
    '</div>';
  }

  /* ─── Chargement données ──────────────────────────────────────── */
  function _loadAvatars(container, state) {
    var loader = function () {
      // Priorité : AP.api > AVATARS global > fetch direct
      var p;
      if (global.AP && global.AP.api && global.AP.api.avatars) {
        p = global.AP.api.avatars.getAll();
      } else if (typeof global.AVATARS !== 'undefined' && Array.isArray(global.AVATARS)) {
        p = Promise.resolve(global.AVATARS);
      } else {
        p = fetch('data/avatars.json')
          .then(function (r) { return r.json(); })
          .then(function (d) { return d.avatars || []; });
      }

      p.then(function (avatars) {
        state.avatars = avatars;
        // Mettre à jour le global AVATARS pour rétro-compat
        if (typeof global.AVATARS === 'undefined') global.AVATARS = avatars;
        _renderGrid(container, state);
        _setActiveTab(container, 'all');
      }).catch(function (err) {
        console.error('[AvatarPicker] Erreur chargement:', err);
        var grid = container.querySelector('#avp-grid');
        if (grid) grid.innerHTML = '<p class="avp-error">❌ Impossible de charger les avatars.</p>';
      });
    };

    // Légère pause pour que le DOM soit rendu
    setTimeout(loader, 50);
  }

  /* ─── Rendu grille ────────────────────────────────────────────── */
  function _renderGrid(container, state) {
    var grid = container.querySelector('#avp-grid');
    if (!grid) return;

    var filtered = state.filter === 'all'
      ? state.avatars
      : state.avatars.filter(function (av) { return av.universe === state.filter; });

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="avp-empty">Aucun personnage dans cet univers.</p>';
      return;
    }

    grid.innerHTML = filtered.map(function (av) {
      var isSelected = av.id === state.selected;
      return '<div class="avp-item' + (isSelected ? ' avp-item--selected' : '') + '"' +
        ' role="option"' +
        ' aria-selected="' + isSelected + '"' +
        ' data-id="' + _esc(av.id) + '"' +
        ' title="' + _esc(av.name) + '"' +
        ' style="--av-color:' + _esc(av.color || '#ffd700') + '">' +
        '<div class="avp-img-wrap">' +
          '<img class="avp-img"' +
            ' src="' + _esc(av.img) + '"' +
            ' alt="' + _esc(av.name) + '"' +
            ' loading="lazy"' +
            ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="avp-fallback" style="display:none">' +
            (av.universe === 'one-piece' ? '🏴‍☠️' :
             av.universe === 'aot' ? '⚔️' :
             av.universe === 'naruto' ? '🔥' :
             av.universe === 'demon-slayer' ? '🗡️' : '🐉') +
          '</div>' +
          (isSelected ? '<div class="avp-check">✓</div>' : '') +
        '</div>' +
        '<span class="avp-name">' + _esc(av.name) + '</span>' +
      '</div>';
    }).join('');

    // Bind click events
    grid.querySelectorAll('.avp-item').forEach(function (item) {
      item.addEventListener('click', function () {
        _selectAvatar(container, state, item.dataset.id);
      });
    });

    // Scroll vers l'avatar sélectionné
    var selectedEl = grid.querySelector('.avp-item--selected');
    if (selectedEl) {
      setTimeout(function () {
        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  /* ─── Sélection avatar ────────────────────────────────────────── */
  function _selectAvatar(container, state, id) {
    var avatar = state.avatars.find(function (av) { return av.id === id; });
    if (!avatar) return;

    state.selected = id;

    // Mise à jour visuelle sans re-render complet
    container.querySelectorAll('.avp-item').forEach(function (item) {
      var isSelected = item.dataset.id === id;
      item.classList.toggle('avp-item--selected', isSelected);
      item.setAttribute('aria-selected', isSelected);
      // Ajouter/retirer le check
      var existing = item.querySelector('.avp-check');
      if (isSelected && !existing) {
        var check = document.createElement('div');
        check.className = 'avp-check';
        check.textContent = '✓';
        item.querySelector('.avp-img-wrap').appendChild(check);
      } else if (!isSelected && existing) {
        existing.remove();
      }
    });

    // SFX si disponible
    if (typeof sfxOK === 'function') { try { sfxOK(); } catch (e) {} }

    // Animation pop sur l'item sélectionné
    var selectedEl = container.querySelector('.avp-item--selected');
    if (selectedEl) {
      selectedEl.classList.remove('avp-pop');
      void selectedEl.offsetWidth;
      selectedEl.classList.add('avp-pop');
    }

    // Mettre à jour AP.state si disponible
    if (global.AP && global.AP.state) {
      global.AP.state.set('avatar', {
        id:    avatar.id,
        img:   avatar.img,
        color: avatar.color || '#ffd700',
        name:  avatar.name,
        quote: avatar.quote || '',
        quote_lesson: avatar.quote_lesson || ''
      });
    }

    // Callback
    try { state.onSelect(avatar); } catch (e) {
      console.error('[AvatarPicker] onSelect error:', e);
    }
  }

  /* ─── Filtres univers ─────────────────────────────────────────── */
  function _bindFilterEvents(container, state) {
    container.addEventListener('click', function (e) {
      var tab = e.target.closest('.avp-tab');
      if (!tab) return;
      var universe = tab.dataset.universe;
      if (!universe) return;
      state.filter = universe;
      _setActiveTab(container, universe);
      _renderGrid(container, state);
    });
  }

  function _setActiveTab(container, universe) {
    container.querySelectorAll('.avp-tab').forEach(function (tab) {
      tab.classList.toggle('avp-tab--active', tab.dataset.universe === universe);
    });
  }

  /* ─── API publique ────────────────────────────────────────────── */

  /** Obtenir l'avatar sélectionné dans un container */
  function getSelected(container) {
    var state = _instances[container];
    if (!state) return null;
    return state.avatars.find(function (av) { return av.id === state.selected; }) || null;
  }

  /** Changer la sélection programmatiquement */
  function setSelected(container, id) {
    var state = _instances[container];
    if (!state) return;
    _selectAvatar(container, state, id);
  }

  /* ─── Utils ───────────────────────────────────────────────────── */
  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ─── Exposition ARCHI-01 ────────────────────────────────────── */
  global.AP = global.AP || {};
  global.AP.components = global.AP.components || {};
  global.AP.components.AvatarPicker = {
    render:      render,
    getSelected: getSelected,
    setSelected: setSelected
  };

  // Alias court pour rétro-compat avec child-select.js existant
  global.AvatarPicker = global.AP.components.AvatarPicker;

  console.info('🎭 AvatarPicker chargé — 51 personnages · 5 univers');

})(window);
