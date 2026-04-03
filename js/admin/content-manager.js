/**
 * ACADÉMIE PIRATE — Admin Content Manager
 * Phase 2 — js/admin/content-manager.js
 * CRUD questions + drag-and-drop reorder + prévisualisation temps réel
 * Règle PR-00 : Production Ready — try/catch partout, zéro erreur console
 *
 * Dépendances :
 *   - window.SUPABASE_URL    → URL du projet Supabase
 *   - window.SUPABASE_ANON_KEY → clé anon publique
 *   (jamais la service_role_key — règle PR-00)
 *
 * Usage :
 *   window.ContentManager.init('cm-root-id');
 */

(function (global) {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     SUPABASE HELPER — REST API (raw fetch, pas de dépendance CDN)
  ════════════════════════════════════════════════════════════════ */

  function getSupaConfig() {
    var url = global.SUPABASE_URL || '';
    var key = global.SUPABASE_ANON_KEY || '';
    if (!url || !key) {
      console.error('[ContentManager] SUPABASE_URL / SUPABASE_ANON_KEY manquants sur window');
    }
    return { url: url, key: key };
  }

  function supaFetch(path, opts) {
    opts = opts || {};
    var cfg = getSupaConfig();
    var url = cfg.url + '/rest/v1/' + path;
    var headers = {
      'apikey': cfg.key,
      'Authorization': 'Bearer ' + cfg.key,
      'Content-Type': 'application/json',
    };
    if (opts.prefer) headers['Prefer'] = opts.prefer;
    return fetch(url, {
      method: opts.method || 'GET',
      headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    }).then(function (res) {
      if (opts.method === 'DELETE' || opts.method === 'PATCH') {
        if (res.ok) return null;
      }
      return res.json().then(function (data) {
        if (!res.ok) {
          var msg = (data && data.message) ? data.message : ('HTTP ' + res.status);
          throw new Error(msg);
        }
        return data;
      });
    });
  }

  // Raccourcis REST
  function dbGet(table, params) {
    return supaFetch(table + '?' + params);
  }

  function dbInsert(table, body) {
    return supaFetch(table, { method: 'POST', body: body, prefer: 'return=representation' });
  }

  function dbUpdate(table, filter, body) {
    return supaFetch(table + '?' + filter, { method: 'PATCH', body: body, prefer: 'return=representation' });
  }

  function dbDelete(table, filter) {
    return supaFetch(table + '?' + filter, { method: 'DELETE' });
  }

  /* ═══════════════════════════════════════════════════════════════
     ÉTAT INTERNE
  ════════════════════════════════════════════════════════════════ */

  var S = {
    rootId:           null,   // ID du conteneur racine
    matieres:         [],     // Tous les mondes
    niveaux:          [],     // Tous les niveaux
    chapitres:        [],     // Chapitres du monde+niveau sélectionné
    questions:        [],     // Questions du chapitre sélectionné (triées par ordre)

    selMatiereId:     null,   // Matiere sélectionnée
    selNiveauId:      null,   // Niveau sélectionné
    selChapitre:      null,   // Objet chapitre sélectionné

    editingId:        null,   // ID question en cours d'édition (null = nouvelle)
    activeTab:        'form', // 'form' | 'preview'

    dragSrcIdx:       null,   // Index source pour drag-and-drop
    orderDirty:       false,  // Ordre modifié non sauvegardé

    pendingDeleteId:  null,   // ID en attente de suppression (modal)
  };

  /* ═══════════════════════════════════════════════════════════════
     ACCESSEURS DOM
  ════════════════════════════════════════════════════════════════ */

  function el(id) { return document.getElementById(id); }
  function root() { return el(S.rootId); }

  function qSel(sel, ctx) {
    return (ctx || root()).querySelector(sel);
  }

  /* ═══════════════════════════════════════════════════════════════
     INITIALISATION
  ════════════════════════════════════════════════════════════════ */

  function init(rootId) {
    S.rootId = rootId;
    var container = el(rootId);
    if (!container) {
      console.error('[ContentManager] Élément #' + rootId + ' introuvable');
      return;
    }

    container.classList.add('cm-root');
    container.innerHTML = buildShell();
    bindShellEvents();
    initToastContainer();
    loadMatieres();
  }

  /* ═══════════════════════════════════════════════════════════════
     STRUCTURE HTML (coque statique)
  ════════════════════════════════════════════════════════════════ */

  function buildShell() {
    return [
      '<div class="cm-selectors">',
        '<div class="cm-sel-group">',
          '<span class="cm-sel-label">🌍 Monde</span>',
          '<select id="cm-sel-monde" disabled>',
            '<option value="">Chargement…</option>',
          '</select>',
        '</div>',
        '<div class="cm-sel-group">',
          '<span class="cm-sel-label">📚 Niveau</span>',
          '<select id="cm-sel-niveau" disabled>',
            '<option value="">— sélectionnez un monde —</option>',
          '</select>',
        '</div>',
        '<div class="cm-sel-group">',
          '<span class="cm-sel-label">📖 Chapitre / Île</span>',
          '<select id="cm-sel-chapitre" disabled>',
            '<option value="">— sélectionnez un niveau —</option>',
          '</select>',
        '</div>',
        '<div class="cm-sel-info" id="cm-sel-info" style="display:none">',
          '<span style="font-size:11px;text-transform:uppercase;letter-spacing:1px">Questions</span>',
          '<strong id="cm-q-count">0</strong>',
          '<span style="font-size:11px">/ 11 recommandées</span>',
        '</div>',
      '</div>',

      '<div class="cm-workspace">',

        '<!-- PANNEAU LISTE -->',
        '<div class="cm-list-panel">',
          '<div class="cm-panel-header">',
            '<span class="cm-panel-title">⚡ Questions</span>',
            '<span class="cm-panel-badge" id="cm-list-badge">0</span>',
          '</div>',
          '<div class="cm-order-bar" id="cm-order-bar">',
            '↕ Ordre modifié',
            '<button class="cm-order-bar-save" id="cm-order-save-btn">Sauvegarder l\'ordre</button>',
          '</div>',
          '<div class="cm-q-list" id="cm-q-list">',
            '<div class="cm-empty">',
              '<div class="cm-empty-icon">🗺️</div>',
              '<p>Sélectionnez un monde, un niveau et un chapitre pour afficher les questions.</p>',
            '</div>',
          '</div>',
          '<button class="cm-add-btn" id="cm-add-btn" disabled>',
            '＋ Ajouter une question',
          '</button>',
        '</div>',

        '<!-- PANNEAU DROIT (form + preview) -->',
        '<div class="cm-right-panel">',
          '<div class="cm-right-tabs">',
            '<button class="cm-right-tab active" data-tab="form" id="cm-tab-form">✏️ Formulaire</button>',
            '<button class="cm-right-tab" data-tab="preview" id="cm-tab-preview">👁 Prévisualisation</button>',
          '</div>',
          '<div class="cm-right-content" id="cm-right-content">',
            buildPlaceholder(),
          '</div>',
        '</div>',

      '</div>',

      '<!-- MODAL SUPPRESSION -->',
      '<div class="cm-modal-backdrop" id="cm-modal" style="display:none">',
        '<div class="cm-modal">',
          '<h3>🗑️ Supprimer la question ?</h3>',
          '<p id="cm-modal-text">Cette action est irréversible. La question sera définitivement supprimée de la base de données.</p>',
          '<div class="cm-modal-actions">',
            '<button class="cm-btn secondary" id="cm-modal-cancel">Annuler</button>',
            '<button class="cm-btn primary" id="cm-modal-confirm">Supprimer</button>',
          '</div>',
        '</div>',
      '</div>',
    ].join('');
  }

  function buildPlaceholder() {
    return '<div class="cm-placeholder">' +
      '<div class="cm-placeholder-icon">✏️</div>' +
      '<p>Sélectionnez ou créez une question pour afficher le formulaire et la prévisualisation.</p>' +
    '</div>';
  }

  /* ═══════════════════════════════════════════════════════════════
     BINDING ÉVÉNEMENTS COQUE
  ════════════════════════════════════════════════════════════════ */

  function bindShellEvents() {
    el('cm-sel-monde').addEventListener('change', onMondeChange);
    el('cm-sel-niveau').addEventListener('change', onNiveauChange);
    el('cm-sel-chapitre').addEventListener('change', onChapitreChange);
    el('cm-add-btn').addEventListener('click', onAddClick);
    el('cm-order-save-btn').addEventListener('click', saveOrder);
    el('cm-modal-cancel').addEventListener('click', closeModal);
    el('cm-modal-confirm').addEventListener('click', confirmDelete);
    el('cm-tab-form').addEventListener('click', function () { switchTab('form'); });
    el('cm-tab-preview').addEventListener('click', function () { switchTab('preview'); });
  }

  /* ═══════════════════════════════════════════════════════════════
     CHARGEMENT DONNÉES — CASCADE
  ════════════════════════════════════════════════════════════════ */

  function loadMatieres() {
    var sel = el('cm-sel-monde');
    sel.innerHTML = '<option value="">Chargement…</option>';
    sel.disabled = true;

    dbGet('matieres', 'select=id,code,nom,emoji&order=code').then(function (rows) {
      S.matieres = rows || [];
      sel.innerHTML = '<option value="">— choisir un monde —</option>';
      S.matieres.forEach(function (m) {
        var opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = (m.emoji || '') + ' ' + m.nom;
        sel.appendChild(opt);
      });
      sel.disabled = false;
    }).catch(function (err) {
      console.error('[ContentManager] loadMatieres:', err);
      sel.innerHTML = '<option value="">Erreur chargement</option>';
      showToast('Erreur chargement des mondes : ' + err.message, 'error');
    });
  }

  function loadNiveaux(matiereId) {
    var sel = el('cm-sel-niveau');
    sel.innerHTML = '<option value="">Chargement…</option>';
    sel.disabled = true;
    el('cm-sel-chapitre').innerHTML = '<option value="">— sélectionnez un niveau —</option>';
    el('cm-sel-chapitre').disabled = true;
    S.chapitres = [];
    S.questions = [];
    renderQuestionList();

    // Récupère les niveau_id disponibles pour cette matière
    dbGet('chapitres', 'select=niveau_id&matiere_id=eq.' + matiereId).then(function (rows) {
      var niveauIds = [];
      (rows || []).forEach(function (r) {
        if (r.niveau_id && niveauIds.indexOf(r.niveau_id) === -1) {
          niveauIds.push(r.niveau_id);
        }
      });

      return dbGet('niveaux', 'select=id,code,nom,emoji,ordre&order=ordre').then(function (allNiveaux) {
        S.niveaux = (allNiveaux || []).filter(function (n) {
          return niveauIds.indexOf(n.id) !== -1;
        });
        sel.innerHTML = '<option value="">— choisir un niveau —</option>';
        S.niveaux.forEach(function (n) {
          var opt = document.createElement('option');
          opt.value = n.id;
          opt.textContent = (n.emoji || '') + ' ' + n.nom;
          sel.appendChild(opt);
        });
        sel.disabled = false;
      });
    }).catch(function (err) {
      console.error('[ContentManager] loadNiveaux:', err);
      sel.innerHTML = '<option value="">Erreur</option>';
      showToast('Erreur chargement des niveaux : ' + err.message, 'error');
    });
  }

  function loadChapitres(matiereId, niveauId) {
    var sel = el('cm-sel-chapitre');
    sel.innerHTML = '<option value="">Chargement…</option>';
    sel.disabled = true;
    S.questions = [];
    renderQuestionList();

    dbGet(
      'chapitres',
      'select=id,numero,nom,topic,boss_name&matiere_id=eq.' + matiereId +
        '&niveau_id=eq.' + niveauId + '&order=numero'
    ).then(function (rows) {
      S.chapitres = rows || [];
      sel.innerHTML = '<option value="">— choisir un chapitre —</option>';
      S.chapitres.forEach(function (ch) {
        var opt = document.createElement('option');
        opt.value = ch.id;
        opt.textContent = '⚔️ Île ' + ch.numero + ' — ' + ch.nom;
        sel.appendChild(opt);
      });
      sel.disabled = false;

      if (S.chapitres.length === 0) {
        sel.innerHTML = '<option value="">Aucun chapitre trouvé</option>';
      }
    }).catch(function (err) {
      console.error('[ContentManager] loadChapitres:', err);
      sel.innerHTML = '<option value="">Erreur</option>';
      showToast('Erreur chargement des chapitres : ' + err.message, 'error');
    });
  }

  function loadQuestions(chapitreId) {
    S.questions = [];
    S.orderDirty = false;
    el('cm-order-bar').classList.remove('visible');
    renderQuestionList(true); // loading state

    dbGet('questions', 'select=*&chapitre_id=eq.' + chapitreId + '&order=ordre').then(function (rows) {
      S.questions = rows || [];
      renderQuestionList();
      updateQCount();
    }).catch(function (err) {
      console.error('[ContentManager] loadQuestions:', err);
      showToast('Erreur chargement des questions : ' + err.message, 'error');
      renderQuestionList();
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     HANDLERS SÉLECTEURS
  ════════════════════════════════════════════════════════════════ */

  function onMondeChange() {
    var id = el('cm-sel-monde').value;
    S.selMatiereId = id || null;
    S.selNiveauId = null;
    S.selChapitre = null;
    S.editingId = null;
    el('cm-sel-niveau').innerHTML = '<option value="">— choisir un niveau —</option>';
    el('cm-sel-niveau').disabled = true;
    el('cm-sel-chapitre').innerHTML = '<option value="">— sélectionnez un niveau —</option>';
    el('cm-sel-chapitre').disabled = true;
    el('cm-sel-info').style.display = 'none';
    el('cm-add-btn').disabled = true;
    S.questions = [];
    renderQuestionList();
    clearRightPanel();

    if (id) loadNiveaux(id);
  }

  function onNiveauChange() {
    var id = el('cm-sel-niveau').value;
    S.selNiveauId = id || null;
    S.selChapitre = null;
    S.editingId = null;
    S.questions = [];
    renderQuestionList();
    clearRightPanel();
    el('cm-sel-info').style.display = 'none';
    el('cm-add-btn').disabled = true;

    if (id && S.selMatiereId) loadChapitres(S.selMatiereId, id);
  }

  function onChapitreChange() {
    var id = el('cm-sel-chapitre').value;
    S.selChapitre = S.chapitres.find(function (c) { return String(c.id) === id; }) || null;
    S.editingId = null;
    clearRightPanel();

    if (S.selChapitre) {
      el('cm-sel-info').style.display = '';
      el('cm-add-btn').disabled = false;
      loadQuestions(S.selChapitre.id);
    } else {
      el('cm-sel-info').style.display = 'none';
      el('cm-add-btn').disabled = true;
      S.questions = [];
      renderQuestionList();
    }
  }

  function onAddClick() {
    S.editingId = null;
    switchTab('form');
    renderForm(null);
  }

  /* ═══════════════════════════════════════════════════════════════
     RENDU LISTE QUESTIONS
  ════════════════════════════════════════════════════════════════ */

  function renderQuestionList(loading) {
    var list = el('cm-q-list');
    if (!list) return;

    var badge = el('cm-list-badge');

    if (loading) {
      list.innerHTML = '<div class="cm-empty"><div class="cm-spinner"></div></div>';
      if (badge) { badge.textContent = '…'; badge.className = 'cm-panel-badge'; }
      return;
    }

    if (!S.selChapitre) {
      list.innerHTML = '<div class="cm-empty"><div class="cm-empty-icon">🗺️</div>' +
        '<p>Sélectionnez un monde, un niveau et un chapitre.</p></div>';
      if (badge) { badge.textContent = '0'; badge.className = 'cm-panel-badge'; }
      return;
    }

    if (S.questions.length === 0) {
      list.innerHTML = '<div class="cm-empty"><div class="cm-empty-icon">📭</div>' +
        '<p>Aucune question pour ce chapitre.<br>Cliquez sur <strong>Ajouter</strong> pour créer la première.</p></div>';
      if (badge) { badge.textContent = '0'; badge.className = 'cm-panel-badge'; }
      return;
    }

    var html = S.questions.map(function (q, idx) {
      var isBoss = q.is_boss || q.type === 'boss';
      var isActive = S.editingId === q.id;
      var classes = 'cm-q-item' +
        (isBoss ? ' boss' : '') +
        (isActive ? ' active' : '');

      return [
        '<div class="' + classes + '" data-idx="' + idx + '" data-id="' + q.id + '"',
          ' draggable="true"',
          ' role="listitem"',
          ' aria-label="Question ' + (idx + 1) + '">',

          '<span class="cm-drag-handle" title="Glisser pour réordonner">⠿</span>',

          '<span class="cm-q-num">' + (isBoss ? '☠' : (idx + 1)) + '</span>',

          '<span class="cm-q-text">' + escHtml(q.question || '') + '</span>',

          '<div class="cm-q-actions">',
            '<button class="cm-q-btn edit" data-action="edit" data-id="' + q.id + '"',
              ' title="Modifier cette question">✏️</button>',
            '<button class="cm-q-btn del" data-action="del" data-id="' + q.id + '"',
              ' title="Supprimer cette question">🗑️</button>',
          '</div>',
        '</div>',
      ].join('');
    }).join('');

    list.innerHTML = html;

    // Événements sur les items
    list.querySelectorAll('.cm-q-item').forEach(function (item, idx) {
      item.addEventListener('click', function (e) {
        if (e.target.closest('[data-action]')) return;
        onQuestionClick(idx);
      });

      item.querySelector('[data-action="edit"]').addEventListener('click', function (e) {
        e.stopPropagation();
        onEditClick(S.questions[idx].id);
      });

      item.querySelector('[data-action="del"]').addEventListener('click', function (e) {
        e.stopPropagation();
        openDeleteModal(S.questions[idx].id, idx);
      });

      // Drag & Drop
      item.addEventListener('dragstart', function (e) { onDragStart(e, idx); });
      item.addEventListener('dragover',  function (e) { onDragOver(e, idx); });
      item.addEventListener('dragleave', function (e) { onDragLeave(e); });
      item.addEventListener('drop',      function (e) { onDrop(e, idx); });
      item.addEventListener('dragend',   function (e) { onDragEnd(e); });
    });

    if (badge) {
      badge.textContent = S.questions.length;
      badge.className = 'cm-panel-badge' + (S.questions.length >= 11 ? ' full' : '');
    }
  }

  function updateQCount() {
    var count = S.questions.length;
    var el_count = el('cm-q-count');
    if (el_count) el_count.textContent = count;
  }

  /* ═══════════════════════════════════════════════════════════════
     DRAG & DROP — Réordonnancement natif HTML5
  ════════════════════════════════════════════════════════════════ */

  function onDragStart(e, idx) {
    S.dragSrcIdx = idx;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', idx);
  }

  function onDragOver(e, idx) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (S.dragSrcIdx === idx) return;
    var items = el('cm-q-list').querySelectorAll('.cm-q-item');
    items.forEach(function (it) { it.classList.remove('drag-over'); });
    items[idx] && items[idx].classList.add('drag-over');
  }

  function onDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
  }

  function onDrop(e, toIdx) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    if (S.dragSrcIdx === null || S.dragSrcIdx === toIdx) return;

    // Réordonner le tableau en mémoire
    var moved = S.questions.splice(S.dragSrcIdx, 1)[0];
    S.questions.splice(toIdx, 0, moved);

    S.orderDirty = true;
    el('cm-order-bar').classList.add('visible');
    renderQuestionList();

    // Si la question éditée a bougé, on garde le formulaire cohérent
    if (S.editingId) {
      var newIdx = S.questions.findIndex(function (q) { return q.id === S.editingId; });
      if (newIdx !== -1) renderPreviewIfActive();
    }
  }

  function onDragEnd(e) {
    S.dragSrcIdx = null;
    el('cm-q-list').querySelectorAll('.cm-q-item').forEach(function (it) {
      it.classList.remove('dragging', 'drag-over');
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SAUVEGARDE DE L'ORDRE
  ════════════════════════════════════════════════════════════════ */

  function saveOrder() {
    if (!S.orderDirty || S.questions.length === 0) return;

    var btn = el('cm-order-save-btn');
    btn.textContent = 'Sauvegarde…';
    btn.disabled = true;

    // Met à jour le champ `ordre` selon la position dans le tableau
    var promises = S.questions.map(function (q, idx) {
      return dbUpdate('questions', 'id=eq.' + q.id, { ordre: idx + 1 });
    });

    Promise.all(promises).then(function () {
      S.questions.forEach(function (q, idx) { q.ordre = idx + 1; });
      S.orderDirty = false;
      el('cm-order-bar').classList.remove('visible');
      showToast('✅ Ordre sauvegardé', 'success');
    }).catch(function (err) {
      console.error('[ContentManager] saveOrder:', err);
      showToast('Erreur sauvegarde ordre : ' + err.message, 'error');
    }).finally(function () {
      btn.textContent = "Sauvegarder l'ordre";
      btn.disabled = false;
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     INTERACTIONS QUESTIONS
  ════════════════════════════════════════════════════════════════ */

  function onQuestionClick(idx) {
    var q = S.questions[idx];
    S.editingId = q.id;
    renderQuestionList(); // rafraîchit l'actif

    if (S.activeTab === 'form') {
      renderForm(q);
    } else {
      renderPreview(q, idx);
    }
  }

  function onEditClick(id) {
    var q = S.questions.find(function (q) { return q.id === id; });
    if (!q) return;
    S.editingId = id;
    switchTab('form');
    renderForm(q);
    renderQuestionList();
  }

  /* ═══════════════════════════════════════════════════════════════
     ONGLETS DROITE
  ════════════════════════════════════════════════════════════════ */

  function switchTab(tab) {
    S.activeTab = tab;
    el('cm-tab-form').classList.toggle('active', tab === 'form');
    el('cm-tab-preview').classList.toggle('active', tab === 'preview');

    if (tab === 'preview') {
      var activeQ = S.editingId ? S.questions.find(function (q) { return q.id === S.editingId; }) : null;
      if (activeQ) {
        var idx = S.questions.indexOf(activeQ);
        renderPreview(activeQ, idx);
      } else {
        // Prévisualise la question dont les champs sont remplis
        renderPreviewFromForm();
      }
    }
  }

  function renderPreviewIfActive() {
    if (S.activeTab === 'preview') {
      var q = S.editingId ? S.questions.find(function (q) { return q.id === S.editingId; }) : null;
      if (q) renderPreview(q, S.questions.indexOf(q));
    }
  }

  function clearRightPanel() {
    var content = el('cm-right-content');
    if (content) content.innerHTML = buildPlaceholder();
  }

  /* ═══════════════════════════════════════════════════════════════
     FORMULAIRE
  ════════════════════════════════════════════════════════════════ */

  function renderForm(q) {
    // q = null → nouvelle question
    var isBoss    = q ? (q.is_boss || q.type === 'boss') : false;
    var options   = q ? (Array.isArray(q.options) ? q.options : []) : ['', '', '', ''];
    var reponse   = q ? (q.reponse || '') : '';
    var diffOpts  = [1, 2, 3].map(function (d) {
      return '<option value="' + d + '"' + (q && q.difficulte === d ? ' selected' : '') + '>' +
        (d === 1 ? '⭐ Facile' : d === 2 ? '⭐⭐ Moyen' : '⭐⭐⭐ Difficile') + '</option>';
    }).join('');

    var optRows = ['A', 'B', 'C', 'D'].map(function (letter, i) {
      var val = options[i] || '';
      var isCorrect = val && val === reponse;
      return [
        '<div class="cm-option-row">',
          '<span class="cm-option-letter">' + letter + '</span>',
          '<input class="cm-option-input" type="text" id="cm-opt-' + i + '"',
            ' placeholder="Option ' + letter + '"',
            ' value="' + escAttr(val) + '">',
          '<button type="button" class="cm-option-correct' + (isCorrect ? ' selected' : '') + '"',
            ' data-opt="' + i + '" title="Marquer comme bonne réponse">',
            isCorrect ? '✅' : '○',
          '</button>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div class="cm-form" id="cm-form">',

        '<div class="cm-form-row">',
          '<div class="cm-field full">',
            '<label for="cm-f-question">❓ Question <span style="color:#e63946">*</span></label>',
            '<textarea id="cm-f-question" placeholder="Saisissez la question…" rows="3">' +
              escHtml(q ? q.question || '' : '') + '</textarea>',
            '<span class="cm-field-error">La question est obligatoire.</span>',
          '</div>',
        '</div>',

        '<div class="cm-field">',
          '<label>📝 Options (cliquez ○ pour marquer la bonne réponse)</label>',
          '<div class="cm-options-group" id="cm-options-group">',
            optRows,
          '</div>',
          '<span class="cm-field-error" id="cm-opt-error">Sélectionnez la bonne réponse.</span>',
        '</div>',

        '<div class="cm-form-row">',
          '<div class="cm-field">',
            '<label for="cm-f-diff">📊 Difficulté</label>',
            '<select id="cm-f-diff">' + diffOpts + '</select>',
          '</div>',
          '<div class="cm-field">',
            '<label>☠️ Boss Battle</label>',
            '<label class="cm-boss-toggle' + (isBoss ? ' active' : '') + '" id="cm-boss-toggle">',
              '<input type="checkbox" id="cm-f-boss"' + (isBoss ? ' checked' : '') + '>',
              '<span class="cm-boss-label">' + (isBoss ? '☠️ BOSS BATTLE activé' : 'Question normale') + '</span>',
            '</label>',
          '</div>',
        '</div>',

        '<div class="cm-field">',
          '<label for="cm-f-expl">💡 Explication (affichée après correction)</label>',
          '<textarea id="cm-f-expl" placeholder="Explication pédagogique…" rows="3">' +
            escHtml(q ? q.explication || '' : '') + '</textarea>',
        '</div>',

        '<div class="cm-form-actions">',
          '<button class="cm-btn primary" id="cm-save-btn">',
            q ? '💾 Enregistrer les modifications' : '➕ Créer la question',
          '</button>',
          q ? '<button class="cm-btn secondary" id="cm-cancel-btn">Annuler</button>' : '',
          '<button class="cm-btn secondary" id="cm-preview-btn" style="margin-left:auto">',
            '👁 Prévisualiser',
          '</button>',
        '</div>',

      '</div>',
    ].join('');

    var content = el('cm-right-content');
    content.innerHTML = html;

    // Binding formulaire
    bindFormEvents(q);
  }

  function bindFormEvents(q) {
    // Boutons bonne réponse
    var correctBtns = el('cm-right-content').querySelectorAll('.cm-option-correct');
    correctBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        correctBtns.forEach(function (b) {
          b.classList.remove('selected');
          b.textContent = '○';
        });
        btn.classList.add('selected');
        btn.textContent = '✅';
      });
    });

    // Boss toggle
    var bossChk = el('cm-f-boss');
    var bossToggle = el('cm-boss-toggle');
    bossChk.addEventListener('change', function () {
      bossToggle.classList.toggle('active', bossChk.checked);
      bossToggle.querySelector('.cm-boss-label').textContent =
        bossChk.checked ? '☠️ BOSS BATTLE activé' : 'Question normale';
    });

    // Sauvegarder
    el('cm-save-btn').addEventListener('click', function () { saveQuestion(q); });

    // Annuler
    var cancelBtn = el('cm-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        S.editingId = null;
        renderQuestionList();
        clearRightPanel();
      });
    }

    // Prévisualiser depuis le formulaire
    el('cm-preview-btn').addEventListener('click', function () {
      switchTab('preview');
      renderPreviewFromForm();
    });

    // Live preview si déjà en onglet preview
    ['cm-f-question', 'cm-f-expl'].forEach(function (id) {
      var field = el(id);
      if (field) field.addEventListener('input', function () {
        if (S.activeTab === 'preview') renderPreviewFromForm();
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     COLLECTE & VALIDATION FORMULAIRE
  ════════════════════════════════════════════════════════════════ */

  function collectForm() {
    var question  = (el('cm-f-question') ? el('cm-f-question').value.trim() : '');
    var expl      = (el('cm-f-expl')     ? el('cm-f-expl').value.trim()     : '');
    var diff      = parseInt(el('cm-f-diff') ? el('cm-f-diff').value : '1', 10);
    var isBoss    = el('cm-f-boss') ? el('cm-f-boss').checked : false;

    var opts = ['A', 'B', 'C', 'D'].map(function (_, i) {
      var inp = el('cm-opt-' + i);
      return inp ? inp.value.trim() : '';
    });

    var selectedBtn = el('cm-right-content').querySelector('.cm-option-correct.selected');
    var reponse = '';
    if (selectedBtn) {
      var optIdx = parseInt(selectedBtn.getAttribute('data-opt'), 10);
      reponse = opts[optIdx] || '';
    }

    return { question: question, options: opts, reponse: reponse,
             explication: expl, difficulte: diff, is_boss: isBoss,
             type: isBoss ? 'boss' : 'qcm' };
  }

  function validateForm(data) {
    var ok = true;

    // Réinitialise les erreurs
    var qField = el('cm-f-question');
    if (qField) qField.parentElement.classList.remove('has-error');
    var optErrEl = el('cm-opt-error');
    if (optErrEl) optErrEl.parentElement.classList.remove('has-error');

    if (!data.question) {
      var qField2 = el('cm-f-question');
      if (qField2) qField2.parentElement.classList.add('has-error');
      ok = false;
    }

    if (!data.reponse) {
      if (optErrEl) optErrEl.parentElement.classList.add('has-error');
      ok = false;
    }

    // Vérifie que la bonne réponse est dans les options
    if (data.reponse && data.options.indexOf(data.reponse) === -1) {
      if (optErrEl) optErrEl.parentElement.classList.add('has-error');
      ok = false;
    }

    return ok;
  }

  /* ═══════════════════════════════════════════════════════════════
     CRUD — CRÉER / MODIFIER
  ════════════════════════════════════════════════════════════════ */

  function saveQuestion(existingQ) {
    var data = collectForm();
    if (!validateForm(data)) {
      showToast('Formulaire invalide : vérifiez les champs en rouge.', 'error');
      return;
    }

    var btn = el('cm-save-btn');
    btn.disabled = true;
    btn.textContent = 'Sauvegarde…';

    if (existingQ) {
      // MISE À JOUR
      dbUpdate('questions', 'id=eq.' + existingQ.id, {
        question:    data.question,
        options:     data.options,
        reponse:     data.reponse,
        explication: data.explication,
        difficulte:  data.difficulte,
        is_boss:     data.is_boss,
        type:        data.type,
      }).then(function (rows) {
        var updated = rows && rows[0] ? rows[0] : Object.assign({}, existingQ, data);
        var idx = S.questions.findIndex(function (q) { return q.id === existingQ.id; });
        if (idx !== -1) S.questions[idx] = updated;
        S.editingId = updated.id;
        showToast('✅ Question modifiée', 'success');
        renderQuestionList();
        renderForm(updated);
      }).catch(function (err) {
        console.error('[ContentManager] saveQuestion update:', err);
        showToast('Erreur modification : ' + err.message, 'error');
        btn.disabled = false;
        btn.textContent = '💾 Enregistrer les modifications';
      });
    } else {
      // CRÉATION
      var nextOrdre = S.questions.length + 1;
      var payload = Object.assign({}, data, {
        chapitre_id: S.selChapitre.id,
        ordre:       nextOrdre,
      });

      dbInsert('questions', payload).then(function (rows) {
        var created = rows && rows[0] ? rows[0] : Object.assign({}, payload, { id: Date.now() });
        S.questions.push(created);
        S.editingId = created.id;
        updateQCount();
        showToast('✅ Question créée (Q.' + nextOrdre + ')', 'success');
        renderQuestionList();
        renderForm(created);
      }).catch(function (err) {
        console.error('[ContentManager] saveQuestion insert:', err);
        showToast('Erreur création : ' + err.message, 'error');
        btn.disabled = false;
        btn.textContent = '➕ Créer la question';
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     CRUD — SUPPRIMER
  ════════════════════════════════════════════════════════════════ */

  function openDeleteModal(id, idx) {
    S.pendingDeleteId = id;
    var q = S.questions[idx];
    var preview = q ? escHtml((q.question || '').substring(0, 80)) + '…' : '';
    el('cm-modal-text').innerHTML =
      'Cette action est <strong>irréversible</strong>. Question à supprimer :<br>' +
      '<em style="color:#8892b0;font-size:13px">"' + preview + '"</em>';
    el('cm-modal').style.display = 'flex';
  }

  function closeModal() {
    S.pendingDeleteId = null;
    el('cm-modal').style.display = 'none';
  }

  function confirmDelete() {
    if (!S.pendingDeleteId) return;
    var id = S.pendingDeleteId;
    var confirmBtn = el('cm-modal-confirm');
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Suppression…';

    dbDelete('questions', 'id=eq.' + id).then(function () {
      S.questions = S.questions.filter(function (q) { return q.id !== id; });
      if (S.editingId === id) {
        S.editingId = null;
        clearRightPanel();
      }
      // Recalcule les ordres locaux
      S.questions.forEach(function (q, idx) { q.ordre = idx + 1; });
      renderQuestionList();
      updateQCount();
      showToast('🗑️ Question supprimée', 'info');
      closeModal();
    }).catch(function (err) {
      console.error('[ContentManager] confirmDelete:', err);
      showToast('Erreur suppression : ' + err.message, 'error');
      closeModal();
    }).finally(function () {
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Supprimer';
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     PRÉVISUALISATION — Rendu identique quiz-engine.js V4
  ════════════════════════════════════════════════════════════════ */

  /**
   * Rendu à partir d'un objet question (depuis la DB ou en cours d'édition)
   * Reproduit exactement la structure HTML de quiz-engine.js V4 avec les classes .aot-*
   */
  function renderPreview(q, idx) {
    var content = el('cm-right-content');
    var isBoss = q.is_boss || q.type === 'boss';
    var num = idx + 1;
    var options = Array.isArray(q.options) ? q.options : [];
    var letters = ['A', 'B', 'C', 'D'];
    var bossCh = S.selChapitre;

    var bossHeader = isBoss ? [
      '<div class="cm-prev-boss-header">',
        '<div class="cm-prev-boss-title">☠️ BOSS BATTLE</div>',
        '<div class="cm-prev-boss-name">' + escHtml(bossCh ? bossCh.boss_name || '' : '') + '</div>',
      '</div>',
    ].join('') : '';

    var optHtml = options.map(function (opt, i) {
      var isCorrect = opt === q.reponse;
      return [
        '<div class="cm-prev-opt' + (isCorrect ? ' correct' : '') + '">',
          '<span class="cm-prev-opt-letter">' + letters[i] + '</span>',
          escHtml(opt),
          isCorrect ? ' <span style="margin-left:auto">✅</span>' : '',
        '</div>',
      ].join('');
    }).join('');

    var explHtml = q.explication ?
      '<div class="cm-prev-expl">💡 ' + escHtml(q.explication) + '</div>' : '';

    var html = [
      '<div class="cm-preview">',
        '<span class="cm-preview-label">Aperçu — Rendu quiz-engine V4</span>',

        // Structure identique à ce que quiz-engine.js injecte dans l'app enfant
        '<div class="aot-question-block' + (isBoss ? ' aot-boss-block' : '') + ' cm-preview-card">',
          bossHeader,
          '<div class="cm-prev-q-header">',
            '<span class="cm-prev-q-num' + (isBoss ? ' cm-prev-boss-q-num' : '') + '">',
              'Q.' + num,
            '</span>',
            '<span class="cm-prev-q-text">' + escHtml(q.question || '') + '</span>',
          '</div>',
          '<div class="cm-prev-options">',
            optHtml || '<em style="color:#8892b0;font-size:13px">Aucune option</em>',
          '</div>',
          explHtml,
        '</div>',

        // Méta
        '<div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:#8892b0;padding-top:4px">',
          '<span>📊 Difficulté : ' + renderDiff(q.difficulte) + '</span>',
          '<span>🏷 Type : ' + escHtml(q.type || 'qcm') + '</span>',
          '<span>↕ Ordre : ' + num + '</span>',
        '</div>',
      '</div>',
    ].join('');

    content.innerHTML = html;
  }

  /**
   * Rendu depuis les champs du formulaire (live preview)
   */
  function renderPreviewFromForm() {
    var data = collectForm();
    var idx = S.editingId
      ? S.questions.findIndex(function (q) { return q.id === S.editingId; })
      : S.questions.length; // Si nouvelle question : position en fin
    if (idx === -1) idx = S.questions.length;

    var fakeQ = Object.assign({ id: null }, data);
    renderPreview(fakeQ, idx);
  }

  function renderDiff(d) {
    if (d === 1) return '⭐ Facile';
    if (d === 2) return '⭐⭐ Moyen';
    if (d === 3) return '⭐⭐⭐ Difficile';
    return String(d || '—');
  }

  /* ═══════════════════════════════════════════════════════════════
     TOASTS
  ════════════════════════════════════════════════════════════════ */

  function initToastContainer() {
    if (!document.getElementById('cm-toast-wrap')) {
      var wrap = document.createElement('div');
      wrap.id = 'cm-toast-wrap';
      wrap.className = 'cm-toast-wrap';
      document.body.appendChild(wrap);
    }
  }

  function showToast(msg, type) {
    type = type || 'info';
    var wrap = document.getElementById('cm-toast-wrap');
    if (!wrap) return;

    var icons = { success: '✅', error: '❌', info: 'ℹ️' };
    var toast = document.createElement('div');
    toast.className = 'cm-toast ' + type;
    toast.innerHTML = '<span>' + (icons[type] || '') + '</span><span>' + escHtml(msg) + '</span>';
    wrap.appendChild(toast);

    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 320);
    }, 3500);
  }

  /* ═══════════════════════════════════════════════════════════════
     UTILITAIRES
  ════════════════════════════════════════════════════════════════ */

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  /* ═══════════════════════════════════════════════════════════════
     EXPOSITION PUBLIQUE
  ════════════════════════════════════════════════════════════════ */

  global.ContentManager = {
    init: init,
    // Exposé pour intégration depuis admin.html si besoin
    reload: function () {
      if (S.selChapitre) loadQuestions(S.selChapitre.id);
    },
  };

})(window);