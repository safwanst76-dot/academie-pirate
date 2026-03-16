// ═══════════════════════════════════════════════════════════
// PARENT.JS — Académie Pirate
// Tableau de bord parent : profil + gestion enfants + résultats
// Appelé par router.js via showParentDashboard()
// Dépend de : db.js (dbGetChildren, dbGetProgression)
//             supabase.js (sbGetUser)
//             child-select.js (showChildSelect, pour jouer)
// ═══════════════════════════════════════════════════════════

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
// TABLEAU DE BORD PARENT — page principale
// ══════════════════════════════════════════════════════════════
async function showParentDashboard() {
  // Masquer toutes les sections via hideAll si disponible
  if (typeof hideAll === 'function') hideAll();
  document.title = 'Académie Pirate — Tableau de bord';

  var sec = document.getElementById('parent-sec');
  if (sec) sec.style.display = 'block';

  // Récupérer user + enfants
  var user = (typeof sbGetUser === 'function') ? sbGetUser() : null;
  var children = [];
  try {
    if (typeof dbGetChildren === 'function') children = await dbGetChildren() || [];
  } catch(e) { children = []; }

  var container = document.getElementById('parent-content');
  if (!container) return;

  var email = user ? (user.email || '') : '';
  var childrenHtml = '';

  if (children.length === 0) {
    childrenHtml = '<div class="pd-empty">Aucun aventurier lié pour l\'instant.<br><span>Utilise le bouton ci-dessous pour créer le profil de ton enfant.</span></div>';
  } else {
    childrenHtml = children.map(function(child) {
      var lvl = child.level || 1;
      var xp  = child.xp_total || 0;
      var av  = child.avatar_id || 'luffy';
      return '<div class="pd-child-card" onclick="showChildResults(\'' + child.id + '\', ' + JSON.stringify(child).replace(/'/g,"&#39;") + ')">' +
        '<div class="pd-child-avatar">' +
          '<img src="assets/images/avatars/' + av + '.png" ' +
               'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" alt="' + child.username + '">' +
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
    // ── Profil parent ──
    '<div class="pd-section">' +
      '<div class="pd-section-title">⚓ PROFIL CAPITAINE</div>' +
      '<div class="pd-profile">' +
        '<div class="pd-profile-email">✉️ ' + email + '</div>' +
      '</div>' +
    '</div>' +

    // ── Mes aventuriers ──
    '<div class="pd-section">' +
      '<div class="pd-section-title">👦 MES AVENTURIERS</div>' +
      childrenHtml +
      '<button class="pd-btn-add" onclick="showChildSelect()">' +
        '＋ Ajouter un aventurier' +
      '</button>' +
    '</div>' +

    // ── Actions ──
    '<div class="pd-section">' +
      '<button class="pd-btn-play" onclick="showChildSelect()">' +
        '🎮 JOUER MAINTENANT' +
      '</button>' +
      '<button class="pd-btn-logout" onclick="handleLogout()">' +
        '← Se déconnecter' +
      '</button>' +
    '</div>';
}

// ══════════════════════════════════════════════════════════════
// RÉSULTATS D'UN ENFANT — détail complet
// ══════════════════════════════════════════════════════════════

// Mapping island_id → données de l'île (questions + titre)
function _getIslandData(islandId) {
  // Format : 'kanto_1', 'kanto_2', ... ou '1','2',... (Grand Bleu) ou 'hist_1',...
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
  // Grand Bleu (clé numérique)
  var n3 = parseInt(islandId);
  if (!isNaN(n3)) {
    if (typeof ISLANDS !== 'undefined' && ISLANDS[n3]) {
      return { isle: ISLANDS[n3], world: 'Grand Bleu · Français', emoji: '🏴‍☠️' };
    }
  }
  return null;
}

async function showChildResults(childId, childObj) {
  var child = typeof childObj === 'string' ? JSON.parse(childObj) : childObj;
  var sec = document.getElementById('parent-sec');
  var container = document.getElementById('parent-content');
  if (!container) return;

  // Loader
  container.innerHTML = '<div class="pd-loading">⏳ Chargement des résultats…</div>';

  var prog = [];
  try {
    if (typeof dbGetProgression === 'function') {
      prog = await dbGetProgression(childId) || [];
    }
  } catch(e) { prog = []; }

  // Regrouper par monde
  var worlds = {};
  prog.forEach(function(row) {
    var id  = row.island_id || '';
    var data = _getIslandData(id);
    var world = data ? data.world : 'Autre';
    var emoji = data ? data.emoji : '📚';
    if (!worlds[world]) worlds[world] = { emoji: emoji, islands: [] };
    worlds[world].islands.push({ row: row, data: data });
  });

  // Construire graphique progression XP (simple barres CSS)
  var totalXP  = prog.reduce(function(s, r) { return s + (r.xp || 0); }, 0);
  var totalOk  = prog.reduce(function(s, r) { return s + (r.score || 0); }, 0);
  var totalQs  = prog.reduce(function(s, r) {
    var d = _getIslandData(r.island_id);
    return s + (d && d.isle && d.isle.qs ? d.isle.qs.length : (r.total || 11));
  }, 0);
  var pct = totalQs > 0 ? Math.round(totalOk / totalQs * 100) : 0;

  // ── Header résultats ──
  var html =
    '<button class="pd-back-btn" onclick="showParentDashboard()">← Retour</button>' +

    '<div class="pd-results-header">' +
      '<div class="pd-results-avatar">' +
        '<img src="assets/images/avatars/' + (child.avatar_id||'luffy') + '.png" ' +
             'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" alt="">' +
        '<div class="pd-results-avatar-fallback">🏴‍☠️</div>' +
      '</div>' +
      '<div class="pd-results-child-info">' +
        '<div class="pd-results-name">' + child.username + '</div>' +
        '<div class="pd-results-level">Niveau ' + (child.level||1) + ' · ' + totalXP + ' XP total</div>' +
      '</div>' +
    '</div>' +

    // ── Graphique résumé ──
    '<div class="pd-chart-wrap">' +
      '<div class="pd-chart-title">📊 RÉSUMÉ GÉNÉRAL</div>' +
      '<div class="pd-chart-stats">' +
        '<div class="pd-stat"><span class="pd-stat-val">' + prog.length + '</span><span class="pd-stat-lbl">Îles tentées</span></div>' +
        '<div class="pd-stat"><span class="pd-stat-val">' + totalOk + '/' + totalQs + '</span><span class="pd-stat-lbl">Bonnes réponses</span></div>' +
        '<div class="pd-stat"><span class="pd-stat-val ' + (pct>=70?'pd-good':pct>=40?'pd-mid':'pd-low') + '">' + pct + '%</span><span class="pd-stat-lbl">Réussite globale</span></div>' +
      '</div>' +
      '<div class="pd-chart-bar-wrap">' +
        '<div class="pd-chart-bar">' +
          '<div class="pd-chart-fill ' + (pct>=70?'pd-fill-good':pct>=40?'pd-fill-mid':'pd-fill-low') + '" style="width:' + pct + '%"></div>' +
        '</div>' +
        '<div class="pd-chart-pct">' + pct + '% de réussite</div>' +
      '</div>' +
    '</div>';

  // ── Résultats par monde ──
  if (prog.length === 0) {
    html += '<div class="pd-empty">Aucun quiz complété pour l\'instant.</div>';
  } else {
    Object.keys(worlds).forEach(function(worldName) {
      var w = worlds[worldName];
      html += '<div class="pd-world-section">' +
        '<div class="pd-world-title">' + w.emoji + ' ' + worldName + '</div>';

      w.islands.forEach(function(item) {
        var row  = item.row;
        var data = item.data;
        var isle = data ? data.isle : null;
        var score  = row.score || 0;
        var total  = isle && isle.qs ? isle.qs.length : (row.total || 11);
        var xp     = row.xp || 0;
        var isleName = isle ? (isle.name || row.island_id) : row.island_id;
        var isleColor = isle ? (isle.color || '#ffd700') : '#ffd700';
        var scorePct = total > 0 ? Math.round(score / total * 100) : 0;
        var stars = '';
        for (var i = 0; i < total; i++) stars += i < score ? '⭐' : '☆';

        html += '<div class="pd-isle-block">' +
          '<div class="pd-isle-header" onclick="toggleIsleDetail(\'' + row.island_id + '\')">' +
            '<div class="pd-isle-name" style="color:' + isleColor + '">' + isleName + '</div>' +
            '<div class="pd-isle-score">' +
              '<span class="pd-score-num ' + (scorePct>=80?'pd-good':scorePct>=50?'pd-mid':'pd-low') + '">' + score + '/' + total + '</span>' +
              '<span class="pd-isle-xp">+' + xp + ' XP</span>' +
            '</div>' +
          '</div>' +
          '<div class="pd-isle-stars">' + stars + '</div>' +
          '<div class="pd-isle-bar">' +
            '<div class="pd-isle-bar-fill ' + (scorePct>=80?'pd-fill-good':scorePct>=50?'pd-fill-mid':'pd-fill-low') + '" style="width:' + scorePct + '%"></div>' +
          '</div>';

        // ── Questions détaillées (masquées par défaut) ──
        if (isle && isle.qs && isle.qs.length > 0) {
          html += '<div class="pd-qs-detail" id="pd-qs-' + row.island_id + '" style="display:none">';
          isle.qs.forEach(function(q, idx) {
            // On ne sait pas quelle réponse l'enfant a donnée (non stockée en DB actuellement)
            // On affiche la question + bonne réponse + explication
            html += '<div class="pd-q-row">' +
              '<div class="pd-q-num">Q' + (idx+1) + '</div>' +
              '<div class="pd-q-content">' +
                '<div class="pd-q-text">' + q.q + '</div>' +
                '<div class="pd-q-answer">✅ ' + q.a + '</div>' +
                (q.exp ? '<div class="pd-q-exp">💡 ' + q.exp + '</div>' : '') +
              '</div>' +
            '</div>';
          });
          html += '</div>' +
            '<button class="pd-qs-toggle" onclick="toggleIsleDetail(\'' + row.island_id + '\')" id="pd-btn-' + row.island_id + '">▼ Voir les questions</button>';
        }

        html += '</div>'; // pd-isle-block
      });

      html += '</div>'; // pd-world-section
    });
  }

  container.innerHTML = html;
}

// Toggle affichage questions d'une île
function toggleIsleDetail(islandId) {
  var el  = document.getElementById('pd-qs-' + islandId);
  var btn = document.getElementById('pd-btn-' + islandId);
  if (!el) return;
  var open = el.style.display === 'block';
  el.style.display = open ? 'none' : 'block';
  if (btn) btn.textContent = open ? '▼ Voir les questions' : '▲ Masquer les questions';
}