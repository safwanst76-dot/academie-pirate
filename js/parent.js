// ═══════════════════════════════════════════════════════════
// PARENT.JS — Académie Pirate
// Tableau de bord parent : profil + gestion enfants + résultats
// ✅ FIX : plus de JSON.stringify dans les attributs onclick HTML
//    → utilise data-child-id + _pdChildren Map globale
// ═══════════════════════════════════════════════════════════

// Cache des objets enfants indexés par id — évite tout JSON dans le HTML
var _pdChildren = {};

// ── Déconnexion ──
function handleLogout() {
  if (typeof sbSignOut === 'function') sbSignOut();
  else location.reload();
}

// ── Lien invitation ──
function getChildInviteLink(parentEmail) {
  var base = 'https://safwanst76-dot.github.io/academie-pirate';
  return base + '?parent=' + encodeURIComponent(parentEmail);
}

// ══════════════════════════════════════════════════════════════
// TABLEAU DE BORD PARENT
// ══════════════════════════════════════════════════════════════
async function showParentDashboard() {
  if (typeof hideAll === 'function') hideAll();
  document.title = 'Académie Pirate — Tableau de bord';

  var sec = document.getElementById('parent-sec');
  if (sec) sec.style.display = 'block';

  var user = (typeof sbGetUser === 'function') ? sbGetUser() : null;
  var children = [];
  try {
    if (typeof dbGetChildren === 'function') children = await dbGetChildren() || [];
  } catch(e) { children = []; }

  var container = document.getElementById('parent-content');
  if (!container) return;

  var email = user ? (user.email || '') : '';

  // Afficher le nom du parent dans le header
  var displayName = email.split('@')[0] || '';
  var parentBtn   = document.getElementById('headerParentBtn');
  var parentNameEl = document.getElementById('headerParentName');
  if (parentBtn && displayName) parentBtn.style.display = 'flex';
  if (parentNameEl && displayName) parentNameEl.textContent = '👤 ' + displayName;

  // ✅ Stocker les enfants dans le cache global (pas de JSON dans le HTML)
  _pdChildren = {};
  children.forEach(function(c) { _pdChildren[c.id] = c; });

  var childrenHtml = '';
  if (children.length === 0) {
    childrenHtml =
      '<div class="pd-empty">Aucun aventurier lié pour l\'instant.' +
      '<br><span>Utilise le bouton ci-dessous pour créer le profil de ton enfant.</span></div>';
  } else {
    childrenHtml = children.map(function(child) {
      var lvl = child.level || 1;
      var xp  = child.xp_total || 0;
      var av  = child.avatar_id || 'luffy';
      // ✅ data-child-id uniquement — pas de JSON dans l'attribut
      return '<div class="pd-child-card" data-child-id="' + child.id + '">' +
        '<div class="pd-child-avatar">' +
          '<img src="assets/images/avatars/' + av + '.png" ' +
               'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" ' +
               'alt="' + child.username + '">' +
          '<div class="pd-child-avatar-fallback">🏴‍☠️</div>' +
        '</div>' +
        '<div class="pd-child-info">' +
          '<div class="pd-child-name">' + child.username + '</div>' +
          '<div class="pd-child-stats">⭐ ' + xp + ' XP · Niveau ' + lvl + '</div>' +
        '</div>' +
        '<div class="pd-child-arrow">→ Voir résultats</div>' +
      '</div>';
    }).join('');
  }

  container.innerHTML =
    '<div class="pd-section">' +
      '<div class="pd-section-title">⚓ PROFIL CAPITAINE</div>' +
      '<div class="pd-profile">' +
        '<div class="pd-profile-email">✉️ ' + email + '</div>' +
      '</div>' +
    '</div>' +

    '<div class="pd-section">' +
      '<div class="pd-section-title">👦 MES AVENTURIERS</div>' +
      childrenHtml +
      '<button class="pd-btn-add" onclick="showChildSelect()">＋ Ajouter un aventurier</button>' +
    '</div>' +

    '<div class="pd-section">' +
      '<button class="pd-btn-play" onclick="showChildSelect()">🎮 JOUER MAINTENANT</button>' +
      '<button class="pd-btn-logout" onclick="handleLogout()">← Se déconnecter</button>' +
    '</div>';

  // ✅ Attacher les listeners après injection du HTML (évite tout onclick inline avec data)
  container.querySelectorAll('.pd-child-card[data-child-id]').forEach(function(card) {
    card.addEventListener('click', function() {
      var cid = card.getAttribute('data-child-id');
      var childObj = _pdChildren[cid];
      if (childObj) showChildResults(cid, childObj);
    });
  });
}

// ══════════════════════════════════════════════════════════════
// RÉSULTATS D'UN ENFANT
// ══════════════════════════════════════════════════════════════
function _getIslandData(islandId) {
  if (islandId && islandId.startsWith('kanto_')) {
    var n = parseInt(islandId.replace('kanto_', ''));
    if (typeof ISLANDS_KANTO !== 'undefined' && ISLANDS_KANTO[n]) {
      return { isle: ISLANDS_KANTO[n], world: 'Kanto · Sciences', emoji: '⚔️' };
    }
  }
  if (islandId && islandId.startsWith('hist_')) {
    var n2 = parseInt(islandId.replace('hist_', ''));
    if (typeof ISLANDS_HISTOIRE !== 'undefined' && ISLANDS_HISTOIRE[n2]) {
      return { isle: ISLANDS_HISTOIRE[n2], world: 'Magnolia · Histoire', emoji: '🐉' };
    }
  }
  var n3 = parseInt(islandId);
  if (!isNaN(n3)) {
    if (typeof ISLANDS !== 'undefined' && ISLANDS[n3]) {
      return { isle: ISLANDS[n3], world: 'Grand Bleu · Français', emoji: '🏴‍☠️' };
    }
  }
  return null;
}

async function showChildResults(childId, childObj) {
  var child = childObj || _pdChildren[childId] || { username: '?', level: 1, avatar_id: 'luffy' };

  var container = document.getElementById('parent-content');
  if (!container) return;

  container.innerHTML = '<div class="pd-loading">⏳ Chargement des résultats de ' + child.username + '…</div>';

  var prog = [];
  try {
    if (typeof dbGetProgression === 'function') {
      prog = await dbGetProgression(childId) || [];
    }
  } catch(e) { prog = []; }

  var worlds   = {};
  var totalXP  = 0;
  var totalOk  = 0;
  var totalQs  = 0;

  prog.forEach(function(row) {
    totalXP += row.xp || 0;
    totalOk += row.score || 0;
    var data = _getIslandData(row.island_id || '');
    totalQs += data && data.isle && data.isle.qs ? data.isle.qs.length : (row.total || 11);
    var world = data ? data.world : 'Autre';
    var emoji = data ? data.emoji : '📚';
    if (!worlds[world]) worlds[world] = { emoji: emoji, islands: [] };
    worlds[world].islands.push({ row: row, data: data });
  });

  var pct = totalQs > 0 ? Math.round(totalOk / totalQs * 100) : 0;
  var fillClass = pct >= 70 ? 'pd-fill-good' : pct >= 40 ? 'pd-fill-mid' : 'pd-fill-low';
  var valClass  = pct >= 70 ? 'pd-good'      : pct >= 40 ? 'pd-mid'      : 'pd-low';

  var html =
    '<button class="pd-back-btn" onclick="showParentDashboard()">← Retour</button>' +

    '<div class="pd-results-header">' +
      '<div class="pd-results-avatar">' +
        '<img src="assets/images/avatars/' + (child.avatar_id || 'luffy') + '.png" ' +
             'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" alt="">' +
        '<div class="pd-results-avatar-fallback">🏴‍☠️</div>' +
      '</div>' +
      '<div class="pd-results-child-info">' +
        '<div class="pd-results-name">' + child.username + '</div>' +
        '<div class="pd-results-level">Niveau ' + (child.level || 1) + ' · ' + totalXP + ' XP total</div>' +
      '</div>' +
    '</div>' +

    '<div class="pd-chart-wrap">' +
      '<div class="pd-chart-title">📊 RÉSUMÉ GÉNÉRAL</div>' +
      '<div class="pd-chart-stats">' +
        '<div class="pd-stat">' +
          '<span class="pd-stat-val">' + prog.length + '</span>' +
          '<span class="pd-stat-lbl">Îles tentées</span>' +
        '</div>' +
        '<div class="pd-stat">' +
          '<span class="pd-stat-val">' + totalOk + '/' + totalQs + '</span>' +
          '<span class="pd-stat-lbl">Bonnes réponses</span>' +
        '</div>' +
        '<div class="pd-stat">' +
          '<span class="pd-stat-val ' + valClass + '">' + pct + '%</span>' +
          '<span class="pd-stat-lbl">Réussite globale</span>' +
        '</div>' +
      '</div>' +
      '<div class="pd-chart-bar-wrap">' +
        '<div class="pd-chart-bar">' +
          '<div class="pd-chart-fill ' + fillClass + '" style="width:' + pct + '%"></div>' +
        '</div>' +
        '<div class="pd-chart-pct">' + pct + '% de réussite</div>' +
      '</div>' +
    '</div>';

  if (prog.length === 0) {
    html += '<div class="pd-empty">Aucun quiz complété pour l\'instant.<br>' +
            '<span>L\'enfant doit d\'abord jouer pour voir ses résultats ici.</span></div>';
  } else {
    Object.keys(worlds).forEach(function(worldName) {
      var w = worlds[worldName];
      html += '<div class="pd-world-section"><div class="pd-world-title">' + w.emoji + ' ' + worldName + '</div>';

      w.islands.forEach(function(item) {
        var row       = item.row;
        var data      = item.data;
        var isle      = data ? data.isle : null;
        var score     = row.score || 0;
        var total     = isle && isle.qs ? isle.qs.length : (row.total || 11);
        var xp        = row.xp || 0;
        var isleName  = isle ? (isle.name || row.island_id) : row.island_id;
        var isleColor = isle ? (isle.color || '#ffd700') : '#ffd700';
        var spct      = total > 0 ? Math.round(score / total * 100) : 0;
        var sClass    = spct >= 80 ? 'pd-fill-good' : spct >= 50 ? 'pd-fill-mid' : 'pd-fill-low';
        var snClass   = spct >= 80 ? 'pd-good'      : spct >= 50 ? 'pd-mid'      : 'pd-low';
        var stars     = '';
        for (var i = 0; i < total; i++) stars += i < score ? '⭐' : '☆';
        var detailId  = 'pd-qs-' + row.island_id;
        var btnId     = 'pd-btn-' + row.island_id;

        html +=
          '<div class="pd-isle-block">' +
            '<div class="pd-isle-header" data-detail="' + detailId + '">' +
              '<div class="pd-isle-name" style="color:' + isleColor + '">' + isleName + '</div>' +
              '<div class="pd-isle-score">' +
                '<span class="pd-score-num ' + snClass + '">' + score + '/' + total + '</span>' +
                '<span class="pd-isle-xp">+' + xp + ' XP</span>' +
              '</div>' +
            '</div>' +
            '<div class="pd-isle-stars">' + stars + '</div>' +
            '<div class="pd-isle-bar">' +
              '<div class="pd-isle-bar-fill ' + sClass + '" style="width:' + spct + '%"></div>' +
            '</div>';

        if (isle && isle.qs && isle.qs.length > 0) {
          html += '<div class="pd-qs-detail" id="' + detailId + '" style="display:none">';
          isle.qs.forEach(function(q, idx) {
            html +=
              '<div class="pd-q-row">' +
                '<div class="pd-q-num">Q' + (idx + 1) + '</div>' +
                '<div class="pd-q-content">' +
                  '<div class="pd-q-text">' + q.q + '</div>' +
                  '<div class="pd-q-answer">✅ ' + q.a + '</div>' +
                  (q.exp ? '<div class="pd-q-exp">💡 ' + q.exp + '</div>' : '') +
                '</div>' +
              '</div>';
          });
          html +=
            '</div>' +
            '<button class="pd-qs-toggle" id="' + btnId + '" data-detail="' + detailId + '">▼ Voir les questions</button>';
        }

        html += '</div>'; // pd-isle-block
      });

      html += '</div>'; // pd-world-section
    });
  }

  container.innerHTML = html;

  // ✅ Listeners pour toggle questions (pas de onclick inline)
  container.querySelectorAll('[data-detail]').forEach(function(el) {
    el.addEventListener('click', function() {
      toggleIsleDetail(el.getAttribute('data-detail'));
    });
  });
}

// Toggle affichage questions
function toggleIsleDetail(detailId) {
  var el  = document.getElementById(detailId);
  var btn = document.getElementById(detailId.replace('pd-qs-', 'pd-btn-'));
  if (!el) return;
  var open = el.style.display === 'block';
  el.style.display = open ? 'none' : 'block';
  if (btn) btn.textContent = open ? '▼ Voir les questions' : '▲ Masquer les questions';
}