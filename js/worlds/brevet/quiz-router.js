// ═══════════════════════════════════════════════════════════════
// QUIZ-ROUTER-BREVET.JS — Académie Pirate
// 🎓 Brevet · Révisions DNB 3ème · HUB multi-matières
// Matières (monde 'brevet') : Français, Maths, Histoire-Géo, Sciences
// Pattern : DB-driven via AP_QuizEngine · mono-niveau 3ème
// Préfixe isolant : .brevet-* (ARCHI-01 / AU-02)
// Chemin : js/worlds/brevet/quiz-router.js
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var NIVEAU_CODE = '3eme';

  // Matières du Brevet — active:false ⇒ carte "🔒 Bientôt" tant que le contenu n'est pas prêt
  var SUBJECTS = [
    { code: 'brevet-francais',     label: 'Français',      sub: 'Multi-manga',   icon: '📖', color: '#3b82f6', music: 'map',             active: true  },
    { code: 'brevet-maths',        label: 'Mathématiques', sub: 'Naruto',        icon: '🔢', color: '#f97316', music: 'pays-du-feu-map', active: true },
    { code: 'brevet-histoire-geo', label: 'Histoire-Géo',  sub: 'Dragon Ball Z', icon: '🗺️', color: '#a855f7', music: 'dbz-map',         active: true },
    { code: 'brevet-sciences',     label: 'Sciences',      sub: 'Demon Slayer',  icon: '🔬', color: '#10b981', music: 'kanto-map',       active: true }
  ];

  var _matiere   = null;   // matière courante
  var _music     = 'map';  // musique de la matière courante
  var _chapitres = [];
  var _bgLoaded  = false;

  // ── Entrée du monde Brevet → HUB des matières ─────────────────
  function showBrevet(silent) {
    if (!silent && window.history && window.history.pushState) {
      history.pushState(null, '', '#/brevet');
    }
    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var bg = document.getElementById('brevet-bg');
    if (bg) bg.classList.add('visible');

    _show('brevet-iles-sec'); _hide('brevet-quiz-sec');
    _buildHub();
    _loadBgStrips();

    if (typeof stopBGM === 'function') stopBGM();
    setTimeout(function () { if (typeof playBGM === 'function') playBGM('map'); }, 300);
    window.scrollTo(0, 0);
  }

  // ── HUB : choisir sa matière ──────────────────────────────────
  function _buildHub() {
    var el = document.getElementById('brevet-iles-sec');
    if (!el) return;

    var cards = SUBJECTS.map(function (s) {
      var locked  = !s.active;
      var onclick = locked ? '' : 'onclick="window.brevet_subject(\'' + s.code + '\')"';
      return '' +
        '<div class="brevet-subject-card' + (locked ? ' locked' : '') + '" style="--c:' + s.color + '" ' + onclick + '>' +
          '<div class="brevet-subject-icon">' + s.icon + '</div>' +
          '<div class="brevet-subject-label">' + s.label + '</div>' +
          '<div class="brevet-subject-sub">' + s.sub + '</div>' +
          (locked
            ? '<div class="brevet-subject-soon">🔒 Bientôt</div>'
            : '<div class="brevet-subject-go">Réviser →</div>') +
        '</div>';
    }).join('');

    el.innerHTML =
      '<div class="brevet-map-header">' +
        '<button class="brevet-back-btn" onclick="navigateTo(\'carte\')">← Carte</button>' +
        '<div class="brevet-map-title">🎓 BREVET — DNB 3ÈME</div>' +
        '<div class="brevet-map-sub">Choisis ton épreuve à réviser</div>' +
      '</div>' +
      '<div class="brevet-hub">' + cards + '</div>';
  }

  // Retour au hub depuis une grille
  window.brevet_home = function () {
    _show('brevet-iles-sec'); _hide('brevet-quiz-sec');
    _buildHub();
    if (typeof playBGM === 'function') playBGM('map');
    window.scrollTo(0, 0);
  };

  // ── Choix d'une matière → grille des chapitres ────────────────
  function chooseSubject(code) {
    var s = _subject(code);
    if (!s || !s.active) return;
    _matiere = code;
    _music   = s.music || 'map';
    if (typeof playBGM === 'function') playBGM(_music);
    _loadGrid(s);
  }

  // ── Charger les chapitres de la matière courante ──────────────
  async function _loadGrid(subject) {
    var ilesEl = document.getElementById('brevet-iles-sec');
    if (ilesEl) ilesEl.innerHTML = _header(subject) +
      '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4)"><div style="font-size:2rem">⏳</div></div>';

    _chapitres = [];
    if (window.AP_QuizEngine) {
      _chapitres = await window.AP_QuizEngine.getChapitres(_matiere, NIVEAU_CODE);
    }
    var progress = window.AP_QuizEngine
      ? window.AP_QuizEngine.getLocalProgress(_matiere, NIVEAU_CODE)
      : {};
    _buildGrid(progress, subject);
  }

  function _header(subject) {
    var label = subject ? subject.label : 'Brevet';
    return '<div class="brevet-map-header">' +
      '<button class="brevet-back-btn" onclick="window.brevet_home()">← Matières</button>' +
      '<div class="brevet-map-title">🎓 BREVET — ' + label.toUpperCase() + '</div>' +
      '<div class="brevet-map-sub">DNB 3ème · Annales corrigées + Leçons méthode</div>' +
    '</div>';
  }

  function _buildGrid(progress, subject) {
    var ilesEl = document.getElementById('brevet-iles-sec');
    if (!ilesEl) return;

    if (!_chapitres.length) {
      ilesEl.innerHTML = _header(subject) +
        '<div style="text-align:center;padding:60px;color:rgba(255,255,255,.4);font-weight:800">🔒 Contenu en préparation…</div>';
      return;
    }

    var fallbackColor = subject ? subject.color : '#eab308';
    var grid = '<div class="brevet-grid">';
    _chapitres.forEach(function (ch) {
      var key      = _matiere + '_' + NIVEAU_CODE + '_' + ch.numero;
      var prog     = progress[key];
      var done     = !!prog;
      var score    = prog ? prog.score : 0;
      var total    = prog ? prog.total : 0;
      var color    = ch.ile_color || fallbackColor;
      var img      = ch.hero_image || '';
      var isAnnale = /annale/i.test(ch.nom || '');
      var badge    = isAnnale ? '📜 ANNALE' : '📚 LEÇON';

      grid +=
        '<div class="brevet-card' + (done ? ' done' : '') + '" style="--c:' + color + '" onclick="window.brevet_start(\'' + ch.id + '\')">' +
          '<div class="brevet-card-img-wrap">' +
            '<img class="brevet-card-img" src="' + img + '" alt="' + (ch.hero_name || '') + '" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="brevet-card-img-fallback" style="background:' + color + '22;color:' + color + '">🎓</div>' +
            '<div class="brevet-card-overlay" style="background:linear-gradient(to top,' + color + '66,transparent)"></div>' +
            '<div class="brevet-card-badge" style="background:' + color + '">' + badge + '</div>' +
          '</div>' +
          '<div class="brevet-card-body">' +
            '<div class="brevet-card-hero" style="color:' + color + '">' + (ch.hero_name || '') + '</div>' +
            '<div class="brevet-card-name">' + ((ch.nom || '').toUpperCase()) + '</div>' +
            '<div class="brevet-card-topic">' + (ch.topic || '') + '</div>' +
            (done ? '<div class="brevet-card-score">' + score + '/' + total + ' ⭐</div>' : '') +
          '</div>' +
        '</div>';
    });
    grid += '</div>';
    ilesEl.innerHTML = _header(subject) + grid;
  }

  // ── Lancer un chapitre (fiche puis quiz) ──────────────────────
  function startChapitre(chapitreId) {
    if (!chapitreId || !_matiere) return;
    var ch = _chapitres.find(function (c) { return c.id === chapitreId; });
    if (!ch) return;

    if (typeof playBGM === 'function') playBGM(ch.bgm || _music);

    // Fiche-leçon si dispo (Phase 2) — sinon directement au quiz
    if (typeof lesson_brevet === 'function') {
      lesson_brevet(NIVEAU_CODE, ch.numero, function () { _launchQuiz(chapitreId); });
    } else {
      _launchQuiz(chapitreId);
    }
  }

  function _launchQuiz(chapitreId) {
    if (!window.AP_QuizEngine) { console.error('[BrevetRouter] AP_QuizEngine manquant'); return; }
    _show('brevet-quiz-sec'); _hide('brevet-iles-sec');

    window.AP_QuizEngine.launch(chapitreId, {
      matiere:     _matiere,
      niveau:      NIVEAU_CODE,
      quizSecId:   'brevet-quiz-sec',
      ilesSecId:   'brevet-iles-sec',
      containerId: 'brevet-qContainer',
      titleId:     'brevet-qTitle',
      progFillId:  'brevet-qProgFill',
      progLblId:   'brevet-qProgLbl',
      bgmBack:     _music,
      onBack: function () {
        _hide('brevet-quiz-sec'); _show('brevet-iles-sec');
        var subject  = _subject(_matiere);
        var progress = window.AP_QuizEngine
          ? window.AP_QuizEngine.getLocalProgress(_matiere, NIVEAU_CODE) : {};
        _buildGrid(progress, subject);
        if (typeof playBGM === 'function') setTimeout(function () { playBGM(_music); }, 300);
      }
    });
  }

  // ── Fond animé (réutilise des avatars déjà présents) ──────────
  function _loadBgStrips() {
    if (_bgLoaded) return; _bgLoaded = true;
    var bg = document.getElementById('brevet-bg');
    if (!bg) return;
    bg.innerHTML = '';
    var urls = [
      'assets/images/avatars/luffy.jpg', 'assets/images/avatars/zoro.jpg',
      'assets/images/avatars/nami.jpg',  'assets/images/avatars/robin.jpg',
      'assets/images/avatars/law.jpg',   'assets/images/avatars/ace.jpg',
      'assets/images/avatars/shanks.jpg','assets/images/avatars/brook.jpg'
    ];
    var doubled = urls.concat(urls);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'brevet-bg-strip';
      doubled.filter(function (_, i) { return i % 5 === s; }).forEach(function (src) {
        var img = document.createElement('img');
        img.src = src; img.alt = ''; img.loading = 'lazy';
        img.onerror = function () { this.style.display = 'none'; };
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  }

  function _subject(code) { return SUBJECTS.find(function (x) { return x.code === code; }); }
  function _show(id) { var el = document.getElementById(id); if (el) el.style.display = 'block'; }
  function _hide(id) { var el = document.getElementById(id); if (el) el.style.display = 'none'; }

  // ── Exports ───────────────────────────────────────────────────
  window.showBrevetV2   = showBrevet;
  window.brevet_subject = chooseSubject;
  window.brevet_start   = startChapitre;

  console.info('🎓 quiz-router-brevet.js — Brevet · hub multi-matières · DB-driven · 3ème');
})();