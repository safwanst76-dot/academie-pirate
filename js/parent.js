// ═══════════════════════════════════════════════════════════════
// PARENT.JS v2 — Académie Pirate
// ─ Résultats enfant (showChildResults) + helpers dashboard
// ─ showParentDashboard() est SUPPRIMÉ ici → géré par afShowParentDashboard (auth.js)
// ─ _pdChildren : cache partagé, alimenté par auth.js ET ici
// ═══════════════════════════════════════════════════════════════

// Cache global enfants (utilisé par showChildResults)
// auth.js alimente ce cache via _bindDashboardEvents → showChildResults(id, childObj)
var _pdChildren = {};

// ── Déconnexion ──
function handleLogout() {
  if (typeof afSignOut === 'function') afSignOut();
  else if (typeof sbSignOut === 'function') sbSignOut();
  else location.reload();
}

// ── Lien invitation ──
function getChildInviteLink(parentEmail) {
  return 'https://safwanst76-dot.github.io/academie-pirate?parent=' + encodeURIComponent(parentEmail);
}

// ══════════════════════════════════════════════════════════════
// showParentDashboard() : alias vers afShowParentDashboard
// ─ Conservé pour compatibilité avec les scripts qui appellent
//   encore showParentDashboard() (supabase.js stubs, router.js, etc.)
// ─ supabase-patch.js remplace ROUTES['parent'] directement mais
//   ce stub sert de filet de sécurité.
// ══════════════════════════════════════════════════════════════
function showParentDashboard() {
  if (typeof afShowParentDashboard === 'function') {
    afShowParentDashboard();
  }
}

// ══════════════════════════════════════════════════════════════
// UTILITAIRE : trouver les données d'une île par son ID
// ══════════════════════════════════════════════════════════════
function _getIslandData(islandId) {
  if (!islandId) return null;

  if (islandId.startsWith('kanto_')) {
    var n = parseInt(islandId.replace('kanto_', ''));
    if (typeof ISLANDS_KANTO !== 'undefined' && ISLANDS_KANTO[n]) {
      return { isle: ISLANDS_KANTO[n], world: 'Kanto · Sciences', emoji: '⚔️' };
    }
  }
  if (islandId.startsWith('hist_')) {
    var n2 = parseInt(islandId.replace('hist_', ''));
    if (typeof ISLANDS_HISTOIRE !== 'undefined' && ISLANDS_HISTOIRE[n2]) {
      return { isle: ISLANDS_HISTOIRE[n2], world: 'Magnolia · Histoire', emoji: '🐉' };
    }
  }
  var n3 = parseInt(islandId);
  if (!isNaN(n3) && typeof ISLANDS !== 'undefined' && ISLANDS[n3]) {
    return { isle: ISLANDS[n3], world: 'Grand Bleu · Français', emoji: '🏴‍☠️' };
  }
  return null;
}

// ══════════════════════════════════════════════════════════════
// RÉSULTATS D'UN ENFANT
// ══════════════════════════════════════════════════════════════
async function showChildResults(childId, childObj) {
  var child = childObj || _pdChildren[childId] || { username: '?', level: 1, xp_total: 0, avatar_id: 'luffy' };

  var container = document.getElementById('parent-content');
  if (!container) return;

  // Passer en mode résultats
  var sec = document.getElementById('parent-sec');
  if (sec) sec.style.display = 'block';

  container.innerHTML = '<div class="pd-loading">⏳ Chargement des résultats de ' + child.username + '…</div>';

  var prog = [];
  try {
    if (typeof dbGetProgression === 'function') {
      prog = await dbGetProgression(childId) || [];
    }
  } catch (e) { prog = []; }

  // ── Calculs globaux ──
  var worlds  = {};
  var totalXP = 0;
  var totalOk = 0;
  var totalQs = 0;

  prog.forEach(function (row) {
    totalXP += row.xp   || 0;
    totalOk += row.score || 0;
    var data  = _getIslandData(row.island_id || '');
    var qLen  = data && data.isle && data.isle.qs ? data.isle.qs.length : (row.total || 11);
    totalQs  += qLen;

    var world = data ? data.world : 'Autre';
    var emoji = data ? data.emoji : '📚';
    if (!worlds[world]) worlds[world] = { emoji: emoji, islands: [] };
    worlds[world].islands.push({ row: row, data: data });
  });

  var pct       = totalQs > 0 ? Math.round(totalOk / totalQs * 100) : 0;
  var fillClass = pct >= 70 ? 'pd-fill-good' : pct >= 40 ? 'pd-fill-mid' : 'pd-fill-low';
  var valClass  = pct >= 70 ? 'pd-good'      : pct >= 40 ? 'pd-mid'      : 'pd-low';

  // ── HTML ──
  var html =
    '<button class="pd-back-btn" onclick="afShowParentDashboard()">← Retour</button>' +

    '<div class="pd-results-header">' +
      '<div class="pd-results-avatar">' +
        '<img src="assets/images/avatars/' + (child.avatar_id || 'luffy') + '.png"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"' +
          ' alt="' + child.username + '">' +
        '<div class="pd-results-avatar-fallback">🏴‍☠️</div>' +
      '</div>' +
      '<div>' +
        '<div class="pd-results-name">' + child.username + '</div>' +
        '<div class="pd-results-level">Niveau ' + (child.level || 1) + ' · ' + totalXP + ' XP total</div>' +
      '</div>' +
    '</div>' +

    '<div class="pd-chart-wrap">' +
      '<div class="pd-chart-title">📊 RÉSUMÉ GÉNÉRAL</div>' +
      '<div class="pd-chart-stats">' +
        '<div class="pd-stat"><span class="pd-stat-val">' + prog.length + '</span><span class="pd-stat-lbl">Îles tentées</span></div>' +
        '<div class="pd-stat"><span class="pd-stat-val">' + totalOk + '/' + totalQs + '</span><span class="pd-stat-lbl">Bonnes réponses</span></div>' +
        '<div class="pd-stat"><span class="pd-stat-val ' + valClass + '">' + pct + '%</span><span class="pd-stat-lbl">Réussite globale</span></div>' +
      '</div>' +
      '<div class="pd-chart-bar-wrap">' +
        '<div class="pd-chart-bar"><div class="pd-chart-fill ' + fillClass + '" style="width:' + pct + '%"></div></div>' +
        '<div class="pd-chart-pct">' + pct + '% de réussite</div>' +
      '</div>' +
    '</div>';

  if (prog.length === 0) {
    html += '<div class="pd-empty">Aucun quiz complété pour l\'instant.<span>L\'enfant doit d\'abord jouer pour voir ses résultats ici.</span></div>';
  } else {
    Object.keys(worlds).forEach(function (worldName) {
      var w = worlds[worldName];
      html += '<div class="pd-world-section"><div class="pd-world-title">' + w.emoji + ' ' + worldName + '</div>';

      w.islands.forEach(function (item) {
        var row      = item.row;
        var data     = item.data;
        var isle     = data ? data.isle : null;
        var score    = row.score || 0;
        var total    = isle && isle.qs ? isle.qs.length : (row.total || 11);
        var xp       = row.xp || 0;
        var isleName = isle ? (isle.name || row.island_id) : row.island_id;
        var color    = isle ? (isle.color || '#ffd700') : '#ffd700';
        var spct     = total > 0 ? Math.round(score / total * 100) : 0;
        var sClass   = spct >= 80 ? 'pd-fill-good' : spct >= 50 ? 'pd-fill-mid' : 'pd-fill-low';
        var snClass  = spct >= 80 ? 'pd-good'      : spct >= 50 ? 'pd-mid'      : 'pd-low';
        var stars    = '';
        for (var si = 0; si < total; si++) stars += si < score ? '⭐' : '☆';
        var detailId = 'pd-qs-' + row.island_id;
        var btnId    = 'pd-btn-' + row.island_id;

        html +=
          '<div class="pd-isle-block">' +
            '<div class="pd-isle-header">' +
              '<div class="pd-isle-name" style="color:' + color + '">' + isleName + '</div>' +
              '<div class="pd-isle-score">' +
                '<span class="pd-score-num ' + snClass + '">' + score + '/' + total + '</span>' +
                '<span class="pd-isle-xp"> +' + xp + ' XP</span>' +
              '</div>' +
            '</div>' +
            '<div class="pd-isle-stars">' + stars + '</div>' +
            '<div class="pd-isle-bar"><div class="pd-isle-bar-fill ' + sClass + '" style="width:' + spct + '%"></div></div>';

        if (isle && isle.qs && isle.qs.length > 0) {
          html += '<div class="pd-qs-detail" id="' + detailId + '" style="display:none">';
          isle.qs.forEach(function (q, idx) {
            html +=
              '<div class="pd-q-row">' +
                '<div class="pd-q-num">Q' + (idx + 1) + '</div>' +
                '<div class="pd-q-content">' +
                  '<div class="pd-q-text">' + (q.q || '') + '</div>' +
                  '<div class="pd-q-answer">✅ ' + (q.a || '') + '</div>' +
                  (q.exp ? '<div class="pd-q-exp">💡 ' + q.exp + '</div>' : '') +
                '</div>' +
              '</div>';
          });
          html +=
            '</div>' +
            '<button class="pd-qs-toggle" id="' + btnId + '"' +
              ' data-detail="' + detailId + '">▼ Voir les questions</button>';
        }

        html += '</div>'; // pd-isle-block
      });

      html += '</div>'; // pd-world-section
    });
  }

  container.innerHTML = html;

  // ── Listeners toggle questions ──
  container.querySelectorAll('.pd-qs-toggle[data-detail]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var detailId = btn.getAttribute('data-detail');
      var el = document.getElementById(detailId);
      if (!el) return;
      var open = el.style.display === 'flex' || el.style.display === 'block';
      el.style.display = open ? 'none' : 'flex';
      btn.textContent  = open ? '▼ Voir les questions' : '▲ Masquer les questions';
    });
  });
}

// ══════════════════════════════════════════════════════════════
// LANCER LA SÉLECTION ENFANT depuis le dashboard
// (utilisé si auth.js utilise encore ce helper)
// ══════════════════════════════════════════════════════════════
function _pdLaunchChildSelect(cachedChildren) {
  if (!cachedChildren || !cachedChildren.length) return;

  if (cachedChildren.length === 1) {
    var child = cachedChildren[0];
    if (typeof afLaunchChild === 'function') {
      // auth.js gère le PIN + le lancement
      afShowPinEntry
        ? afShowPinEntry(child, function () { afLaunchChild(child); })
        : afLaunchChild(child);
    } else {
      // Fallback legacy
      if (typeof dbSetActiveChild === 'function') dbSetActiveChild(child);
      if (typeof loadProgress   === 'function') loadProgress();
      if (typeof navigateTo     === 'function') navigateTo('carte');
    }
    return;
  }

  // Plusieurs enfants → auth.js gère le picker
  if (typeof afShowChildPicker === 'function') {
    afShowChildPicker(cachedChildren);
  } else if (typeof showChildSelect === 'function') {
    showChildSelect();
  } else {
    if (typeof navigateTo === 'function') navigateTo('carte');
  }
}

console.info('🏴‍☠️ parent.js v2 chargé — showChildResults + helpers');