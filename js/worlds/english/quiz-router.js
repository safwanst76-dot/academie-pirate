// ═══════════════════════════════════════════════════════════════
// QUIZ-ROUTER.JS — ⚔️ Paradis · Anglais · Attack on Titan
// Gère : sélection niveau → grille îles → quiz engine
// Dépend de : js/engine/quiz-engine.js
// Règle NR-01 : zéro régression mondes V1
// Règle AU-04 : playBGM après leçon dans callback
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── État ──────────────────────────────────────────────────────
  var _currentNiveau   = null;  // code niveau sélectionné ex: 'cm2'
  var _chapitres       = [];    // chapitres chargés depuis DB
  var _bgLoaded        = false; // fond animé chargé

  var MATIERE_CODE = 'english';

  // ── Niveaux disponibles ───────────────────────────────────────
  var NIVEAUX = [
    { code: 'cm2',  nom: 'CM2',  emoji: '⭐',       color: '#8b6914', desc: 'Vocabulaire de base' },
    { code: '6eme', nom: '6ème', emoji: '⭐⭐',      color: '#4a5c3f', desc: 'Grammaire fondamentale' },
    { code: '5eme', nom: '5ème', emoji: '⭐⭐⭐',    color: '#c0a030', desc: 'Grammaire intermédiaire' },
    { code: '4eme', nom: '4ème', emoji: '⭐⭐⭐⭐',  color: '#8b4513', desc: 'Grammaire avancée' },
  ];

  // ══════════════════════════════════════════════════════════════
  // POINT D'ENTRÉE — appelé par router.js showEnglish()
  // ══════════════════════════════════════════════════════════════

  function showEnglish() {
    _showSection('aot-levels-sec');
    _hideSection('aot-iles-sec');
    _hideSection('aot-quiz-sec');
    _buildLevels();
    _loadBgStrips();
    window.scrollTo(0, 0);
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
        '<div class="aot-level-card" onclick="window.aot_showLevel(\'' + n.code + '\')" ' +
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
  // ÉCRAN GRILLE DES ÎLES
  // ══════════════════════════════════════════════════════════════

  async function showLevel(niveauCode) {
    _currentNiveau = niveauCode;

    var niveau = NIVEAUX.find(function(n){ return n.code === niveauCode; });
    if (!niveau) return;

    // Afficher un loading
    var ilesSec = document.getElementById('aot-iles-sec');
    if (ilesSec) {
      ilesSec.innerHTML =
        '<div class="aot-map-header">' +
          '<div class="aot-map-title">⚔️ ' + niveau.nom + ' — ANGLAIS</div>' +
          '<div class="aot-map-sub">Chargement des îles...</div>' +
        '</div>' +
        '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4);font-family:Nunito,sans-serif;font-weight:800">' +
          '<div style="font-size:2rem;margin-bottom:8px">⏳</div>Chargement...</div>';
    }

    _showSection('aot-iles-sec');
    _hideSection('aot-levels-sec');
    _hideSection('aot-quiz-sec');
    window.scrollTo(0, 0);

    // Charger les chapitres depuis DB
    try {
      if (window.AP_QuizEngine) {
        _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, niveauCode);
      }
    } catch(e) {
      console.error('[AotRouter] Erreur chargement chapitres:', e.message);
      _chapitres = [];
    }

    // Charger progression locale
    var progress = {};
    if (window.AP_QuizEngine) {
      progress = window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, niveauCode);
    }

    _buildIslandsGrid(niveau, progress);
  }

  function _buildIslandsGrid(niveau, progress) {
    var ilesSec = document.getElementById('aot-iles-sec');
    if (!ilesSec) return;

    // Bouton retour
    var backBtn =
      '<button class="aot-back-btn" onclick="window.aot_showEnglish()">' +
      '← Changer de niveau</button>';

    var header =
      '<div class="aot-map-header">' +
        backBtn +
        '<div class="aot-map-title">⚔️ ' + niveau.nom + ' — ANGLAIS</div>' +
        '<div class="aot-map-sub">' + niveau.desc + ' · Attack on Titan</div>' +
      '</div>';

    if (!_chapitres.length) {
      ilesSec.innerHTML = header +
        '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4);' +
        'font-family:Nunito,sans-serif;font-weight:800">' +
        '🔒 Ce niveau arrive bientôt !</div>';
      return;
    }

    var grid = '<div class="aot-islands-grid">';

    _chapitres.forEach(function(ch) {
      var islandKey = MATIERE_CODE + '_' + _currentNiveau + '_' + ch.numero;
      var prog      = progress[islandKey];
      var done      = !!prog;
      var score     = prog ? prog.score : 0;
      var total     = prog ? prog.total : 11;
      var stars     = '';
      for (var i = 0; i < (done ? Math.min(score, 5) : 0); i++) stars += '⭐';

      grid +=
        '<div class="aot-isle-card' + (done ? ' done' : '') + '" ' +
        'style="--isle-color:' + (ch.ile_color || '#4a5c3f') + '" ' +
        'onclick="window.aot_startIsland(\'' + ch.id + '\')">' +
          '<div class="aot-isle-img-wrap">' +
            '<img class="aot-isle-img" src="' + (ch.hero_image || '') + '" ' +
            'alt="' + ch.hero_name + '" onerror="this.style.display=\'none\'">' +
            '<div class="aot-isle-img-fallback" style="' + (!ch.hero_image ? 'display:flex' : '') + '">⚔️</div>' +
            '<div class="aot-isle-overlay" style="background:linear-gradient(to top,rgba(0,0,0,.7),transparent)"></div>' +
          '</div>' +
          '<div class="aot-isle-body">' +
            '<div class="aot-isle-num">ÎLE ' + ch.numero + '</div>' +
            '<div class="aot-isle-name" style="color:' + (ch.ile_color || '#8b6914') + '">' + ch.nom + '</div>' +
            '<div class="aot-isle-topic">' + ch.topic + '</div>' +
            '<span class="aot-isle-level" style="color:' + (ch.ile_color || '#8b6914') + ';border-color:' + (ch.ile_color || '#8b6914') + '">' +
              niveau.nom +
            '</span>' +
            (done ? '<div class="aot-isle-stars">' + (score + '/' + total) + ' ' + stars + '</div>' : '') +
          '</div>' +
        '</div>';
    });

    grid += '</div>';
    ilesSec.innerHTML = header + grid;
  }

  // ══════════════════════════════════════════════════════════════
  // LANCEMENT D'UNE ÎLE
  // ══════════════════════════════════════════════════════════════

  async function startIsland(chapitreId) {
    if (!chapitreId) return;

    var ch = _chapitres.find(function(c){ return c.id === chapitreId; });
    if (!ch) return;

    var niveau = NIVEAUX.find(function(n){ return n.code === _currentNiveau; });

    // Leçon avant le quiz (règle AU-04)
    if (typeof lesson_english === 'function') {
      lesson_english(_currentNiveau, ch.numero, function() {
        _launchQuiz(chapitreId, ch, niveau);
      });
    } else {
      // Pas de leçon → lancer directement le quiz
      _launchQuiz(chapitreId, ch, niveau);
    }
  }

  function _launchQuiz(chapitreId, ch, niveau) {
    if (!window.AP_QuizEngine) {
      console.error('[AotRouter] AP_QuizEngine non chargé');
      return;
    }

    // Afficher la section quiz
    _showSection('aot-quiz-sec');
    _hideSection('aot-iles-sec');
    _hideSection('aot-levels-sec');

    // Lancer le moteur quiz
    window.AP_QuizEngine.launch(chapitreId, {
      matiere: MATIERE_CODE,
      niveau:  _currentNiveau,
      onBack: function() {
        // Retour à la grille des îles
        _showSection('aot-iles-sec');
        _hideSection('aot-quiz-sec');
        if (typeof playBGM === 'function') {
          setTimeout(function(){ playBGM('aot-map'); }, 300);
        }
      },
    });
  }

  // ══════════════════════════════════════════════════════════════
  // FOND ANIMÉ
  // ══════════════════════════════════════════════════════════════

  async function _loadBgStrips() {
    if (_bgLoaded) return;
    _bgLoaded = true;

    var bg = document.getElementById('aot-bg');
    if (!bg) return;
    bg.innerHTML = '';

    var urls = [];

    // Priorité 1 : Jikan API — Attack on Titan (MAL ID 16498)
    try {
      var r = await fetch('https://api.jikan.moe/v4/anime/16498/pictures');
      if (r.ok) {
        var data = await r.json();
        if (data.data && data.data.length >= 5) {
          urls = data.data.map(function(p){
            return p.jpg.large_image_url || p.jpg.image_url;
          });
        }
      }
    } catch(e) {}

    // Priorité 2 : Saison 2 AOT (MAL ID 25777)
    if (urls.length < 5) {
      try {
        var r2 = await fetch('https://api.jikan.moe/v4/anime/25777/pictures');
        if (r2.ok) {
          var data2 = await r2.json();
          if (data2.data && data2.data.length >= 5) {
            urls = data2.data.map(function(p){
              return p.jpg.large_image_url || p.jpg.image_url;
            });
          }
        }
      } catch(e) {}
    }

    // Fallback : personnages depuis Supabase
    if (urls.length < 5) {
      var base = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/characters/';
      urls = [
        base + 'eren.jpeg',
        base + 'levi.jpg',
        base + 'mikasa.gif',
        base + 'armin.jpg',
        base + 'erwin.jpg',
        base + 'hange.jpeg',
        base + 'historia.png',
        base + 'jean.jpg',
      ];
    }

    // Construire les 5 strips
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
  // UTILITAIRES
  // ══════════════════════════════════════════════════════════════

  function _showSection(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
  }

  function _hideSection(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  // EXPORT GLOBAL
  // ══════════════════════════════════════════════════════════════

  window.aot_showEnglish = showEnglish;
  window.showEnglish = showEnglish;
  window.aot_showLevel   = showLevel;
  window.aot_startIsland = startIsland;
  window.buildAotLevels  = showEnglish;  // alias pour router.js
  window.loadAotBgStrips = _loadBgStrips; // alias pour router.js

  console.info('⚔️ quiz-router-english.js v1 chargé — navigation niveaux + îles');

})();
