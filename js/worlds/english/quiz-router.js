// ═══════════════════════════════════════════════════════════════
// QUIZ-ROUTER-ENGLISH.JS V2 — Académie Pirate
// Navigation : sélection niveau → grille îles → leçon → quiz
// Fond animé : Jikan API AOT (ID 16498) en priorité
// Leçon : lesson_english(niveau, numero, callback) avant quiz
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var _currentNiveau = null;
  var _chapitres     = [];
  var _bgLoaded      = false;
  var MATIERE_CODE   = 'english';

  var STORAGE_AOT = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/';

  var NIVEAUX = [
    { code: 'cm2',  nom: 'CM2',  emoji: '⭐',      color: '#8b6914', desc: 'Vocabulaire de base' },
    { code: '6eme', nom: '6ème', emoji: '⭐⭐',     color: '#4a5c3f', desc: 'Grammaire fondamentale' },
    { code: '5eme', nom: '5ème', emoji: '⭐⭐⭐',   color: '#c0a030', desc: 'Grammaire intermédiaire' },
    { code: '4eme', nom: '4ème', emoji: '⭐⭐⭐⭐', color: '#8b4513', desc: 'Grammaire avancée' },
  ];

  // ══════════════════════════════════════════════════════════════
  // ENTRÉE — appelé par router.js showEnglish()
  // ══════════════════════════════════════════════════════════════

  function showEnglish() {
    // Masquer TOUT (globe, autres mondes) — règle NR-01
    if (typeof hideAll === 'function') hideAll();

    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';

    var aotBg = document.getElementById('aot-bg');
    if (aotBg) aotBg.classList.add('visible');

    _show('aot-levels-sec');
    _hide('aot-iles-sec');
    _hide('aot-quiz-sec');

    _buildLevels();
    loadAotBgStrips();
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════════════════════════════
  // FOND ANIMÉ — Jikan API AOT (pattern exact pays-du-feu)
  // ══════════════════════════════════════════════════════════════

  var _aotBgLoaded = false;
  async function loadAotBgStrips() {
    if (_aotBgLoaded) return;
    _aotBgLoaded = true;

    var bg = document.getElementById('aot-bg');
    if (!bg) return;
    bg.innerHTML = '';

    // Fallback Supabase (toujours disponible, jamais de rate-limit)
    var supabaseGifs = [
      STORAGE_AOT + 'gifs/aot-win-1.gif',
      STORAGE_AOT + 'gifs/aot-win-2.gif',
      STORAGE_AOT + 'gifs/aot-win-3.gif',
      STORAGE_AOT + 'gifs/aot-win-4.gif',
      STORAGE_AOT + 'gifs/aot-win-5.gif',
      STORAGE_AOT + 'gifs/aot-perfect-1.gif',
      STORAGE_AOT + 'gifs/aot-perfect-2.gif',
      STORAGE_AOT + 'gifs/aot-perfect-3.gif',
    ];

    // Priorité 1 : Jikan AOT Saison 1 (ID 16498)
    var urls = supabaseGifs;
    try {
      var r = await fetch('https://api.jikan.moe/v4/anime/16498/pictures');
      if (r.ok) {
        var data = await r.json();
        if (data.data && data.data.length >= 8) {
          urls = data.data.map(function(p){
            return p.jpg.large_image_url || p.jpg.image_url;
          });
        }
      }
    } catch(e) {}

    // Priorité 2 : Jikan AOT Saison 2 (ID 25777) si S1 rate-limité
    if (urls === supabaseGifs) {
      try {
        var r2 = await fetch('https://api.jikan.moe/v4/anime/25777/pictures');
        if (r2.ok) {
          var data2 = await r2.json();
          if (data2.data && data2.data.length >= 8) {
            urls = data2.data.map(function(p){
              return p.jpg.large_image_url || p.jpg.image_url;
            });
          }
        }
      } catch(e) {}
    }

    // Distribuer en round-robin sur 5 strips (pattern exact V1)
    var doubled = urls.concat(urls);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'aot-bg-strip';
      var stripImgs = doubled.filter(function(_, i){ return i % 5 === s; });
      if (!stripImgs.length) stripImgs = doubled.slice(0, 4);
      stripImgs.forEach(function(src) {
        var img = document.createElement('img');
        img.src = src; img.alt = ''; img.loading = 'lazy';
        img.onerror = function(){ this.style.display = 'none'; };
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // ÉCRAN SÉLECTION NIVEAU
  // ══════════════════════════════════════════════════════════════

  function _buildLevels() {
    var sec = document.getElementById('aot-levels-sec');
    if (!sec) return;

    var html =
      '<div class="aot-map-header">' +
        '<div class="aot-map-title">⚔️ ANGLAIS — PARADIS</div>' +
        '<div class="aot-map-sub">Attack on Titan · Choisis ton niveau</div>' +
      '</div>' +
      '<div class="aot-levels-grid">';

    NIVEAUX.forEach(function(n) {
      html +=
        '<div class="aot-level-card" ' +
          'onclick="window.aot_showLevel(\'' + n.code + '\')" ' +
          'style="--level-color:' + n.color + '">' +
          '<div class="aot-level-emoji">' + n.emoji + '</div>' +
          '<div class="aot-level-nom">' + n.nom + '</div>' +
          '<div class="aot-level-desc">' + n.desc + '</div>' +
          '<div class="aot-level-btn">COMMENCER ⚔️</div>' +
        '</div>';
    });

    html += '</div>';
    sec.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════════════
  // GRILLE DES ÎLES
  // ══════════════════════════════════════════════════════════════

  async function showLevel(niveauCode) {
    _currentNiveau = niveauCode;
    var niveau     = NIVEAUX.find(function(n){ return n.code === niveauCode; });
    if (!niveau) return;

    // Masquer globe + autres sections
    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var aotBg = document.getElementById('aot-bg');
    if (aotBg) aotBg.classList.add('visible');

    var ilesEl = document.getElementById('aot-iles-sec');
    if (ilesEl) {
      ilesEl.innerHTML =
        '<div class="aot-map-header">' +
          '<div class="aot-map-title">⚔️ ' + niveau.nom + ' — ANGLAIS</div>' +
          '<div class="aot-map-sub">Chargement...</div>' +
        '</div>' +
        '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4);' +
        'font-family:Nunito,sans-serif;font-weight:800"><div style="font-size:2rem">⏳</div></div>';
    }

    _show('aot-iles-sec');
    _hide('aot-levels-sec');
    _hide('aot-quiz-sec');
    window.scrollTo(0, 0);

    // Charger depuis DB
    _chapitres = [];
    if (window.AP_QuizEngine) {
      _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, niveauCode);
    }

    var progress = {};
    if (window.AP_QuizEngine) {
      progress = window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, niveauCode);
    }

    _buildGrid(niveau, progress);
  }

  function _buildGrid(niveau, progress) {
    var ilesEl = document.getElementById('aot-iles-sec');
    if (!ilesEl) return;

    var backBtn =
      '<button class="aot-back-btn" onclick="window.aot_showEnglish()">← Changer de niveau</button>';

    var header =
      '<div class="aot-map-header">' +
        backBtn +
        '<div class="aot-map-title">⚔️ ' + niveau.nom + ' — ANGLAIS</div>' +
        '<div class="aot-map-sub">' + niveau.desc + ' · Attack on Titan</div>' +
      '</div>';

    if (!_chapitres.length) {
      ilesEl.innerHTML = header +
        '<div style="text-align:center;padding:60px;color:rgba(255,255,255,.4);' +
        'font-family:Nunito,sans-serif;font-weight:800">🔒 Ce niveau arrive bientôt !</div>';
      return;
    }

    var grid = '<div class="aot-islands-grid" id="aot-islands-grid">';

    _chapitres.forEach(function(ch) {
      var key   = MATIERE_CODE + '_' + _currentNiveau + '_' + ch.numero;
      var prog  = progress[key];
      var done  = !!prog;
      var score = prog ? prog.score : 0;
      var total = prog ? prog.total : 11;
      var stars = done
        ? _state_questions_to_stars(score, total)
        : '';

      grid +=
        '<div class="aot-isle-card' + (done ? ' done' : '') + '" ' +
          'style="--isle-color:' + (ch.ile_color || '#4a5c3f') + '" ' +
          'onclick="window.aot_startIsland(\'' + ch.id + '\')">' +
          '<div class="aot-isle-img-wrap">' +
            '<img class="aot-isle-img" src="' + (ch.hero_image || '') + '" ' +
              'alt="' + (ch.hero_name || '') + '" onerror="this.style.display=\'none\';' +
              'this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="aot-isle-img-fallback" ' +
              'style="background:' + (ch.ile_color || '#4a5c3f') + '22;' +
              'color:' + (ch.ile_color || '#4a5c3f') + '">⚔️</div>' +
            '<div class="aot-isle-overlay" ' +
              'style="background:linear-gradient(to top,' + (ch.ile_color || '#4a5c3f') + 'cc,transparent)">' +
            '</div>' +
          '</div>' +
          '<div class="aot-isle-body">' +
            '<div class="aot-isle-num">ÎLE #' + ch.numero + '</div>' +
            '<div class="aot-isle-name" style="color:' + (ch.ile_color || '#8b6914') + '">' +
              (ch.nom || '').toUpperCase() +
            '</div>' +
            '<div class="aot-isle-topic">' + (ch.topic || '') + '</div>' +
            '<div class="aot-isle-level" ' +
              'style="border-color:' + (ch.ile_color || '#8b6914') + '55;' +
              'color:' + (ch.ile_color || '#8b6914') + '">' +
              niveau.nom +
            '</div>' +
            (done ? '<div class="aot-isle-stars">' + score + '/' + total + ' ' + stars + '</div>' : '') +
          '</div>' +
        '</div>';
    });

    grid += '</div>';
    ilesEl.innerHTML = header + grid;
  }

  function _state_questions_to_stars(score, total) {
    var s = '';
    for (var i = 0; i < Math.min(score, 5); i++) s += '⭐';
    return s;
  }

  // ══════════════════════════════════════════════════════════════
  // DÉMARRAGE D'UNE ÎLE — leçon AVANT quiz (règle AU-04)
  // ══════════════════════════════════════════════════════════════

  function startIsland(chapitreId) {
    if (!chapitreId) return;
    var ch = _chapitres.find(function(c){ return c.id === chapitreId; });
    if (!ch) return;

    // Leçon avant le quiz — même pattern que lesson_paysdufeu(n, callback)
    if (typeof lesson_english === 'function') {
      lesson_english(_currentNiveau, ch.numero, function() {
        _launchQuiz(chapitreId, ch);
      });
    } else {
      // Pas de leçon → lancer directement
      _launchQuiz(chapitreId, ch);
    }
  }

  function _launchQuiz(chapitreId, ch) {
    if (!window.AP_QuizEngine) {
      console.error('[AotRouter] AP_QuizEngine non chargé');
      return;
    }

    _show('aot-quiz-sec');
    _hide('aot-iles-sec');
    _hide('aot-levels-sec');

    window.AP_QuizEngine.launch(chapitreId, {
      matiere: MATIERE_CODE,
      niveau:  _currentNiveau,
      onBack: function() {
        // Recharger la grille avec la progression mise à jour
        _show('aot-iles-sec');
        _hide('aot-quiz-sec');
        var niveau = NIVEAUX.find(function(n){ return n.code === _currentNiveau; });
        var progress = window.AP_QuizEngine
          ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, _currentNiveau)
          : {};
        if (niveau) _buildGrid(niveau, progress);
        if (typeof playBGM === 'function') setTimeout(function(){ playBGM('aot-map'); }, 300);
      },
    });
  }

  // ══════════════════════════════════════════════════════════════
  // UTILITAIRES
  // ══════════════════════════════════════════════════════════════

  function _show(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
  }

  function _hide(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  // EXPORTS GLOBAUX
  // ══════════════════════════════════════════════════════════════

  window.showEnglish     = showEnglish;   // ← appelé par router.js
  window.aot_showEnglish = showEnglish;
  window.aot_showLevel   = showLevel;
  window.aot_startIsland = startIsland;
  window.buildAotLevels  = showEnglish;
  window.loadAotBgStrips = loadAotBgStrips;

  console.info('⚔️ quiz-router-english.js v2 chargé — Jikan AOT + leçon avant quiz');

})();
