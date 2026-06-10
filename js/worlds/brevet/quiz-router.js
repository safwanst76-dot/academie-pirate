// ═══════════════════════════════════════════════════════════════════
// QUIZ-ROUTER-BREVET.JS — Académie Pirate
// 🎓 Brevet · Révisions DNB 3ème · multi-manga
// Épreuve Français (matiere 'brevet-francais') : annales + leçons
// Pattern : DB-driven via AP_QuizEngine (comme Grand Bleu V2),
//           mais MONO-NIVEAU (3ème) → on affiche directement les chapitres.
// Préfixe isolant : .brevet-* (ARCHI-01 / AU-02)
// Chemin cible : js/worlds/brevet/quiz-router.js
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var MATIERE_CODE = 'brevet-francais';
  var NIVEAU_CODE  = '3eme';
  var _chapitres   = [];
  var _bgLoaded    = false;

  // ── Entrée du monde Brevet ─────────────────────────────────────
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
    _loadGrid();
    _loadBgStrips();

    if (typeof stopBGM === 'function') stopBGM();
    setTimeout(function(){ if (typeof playBGM === 'function') playBGM('map'); }, 300);
    window.scrollTo(0, 0);
  }

  // ── Charger les chapitres depuis la DB ─────────────────────────
  async function _loadGrid() {
    var ilesEl = document.getElementById('brevet-iles-sec');
    if (ilesEl) ilesEl.innerHTML = _header() +
      '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4)"><div style="font-size:2rem">⏳</div></div>';

    _chapitres = [];
    if (window.AP_QuizEngine) {
      _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, NIVEAU_CODE);
    }
    var progress = window.AP_QuizEngine
      ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, NIVEAU_CODE)
      : {};
    _buildGrid(progress);
  }

  function _header() {
    return '<div class="brevet-map-header">' +
      '<button class="brevet-back-btn" onclick="navigateTo(\'carte\')">← Carte</button>' +
      '<div class="brevet-map-title">🎓 BREVET — FRANÇAIS</div>' +
      '<div class="brevet-map-sub">DNB 3ème · Annales corrigées + Leçons méthode</div>' +
    '</div>';
  }

  function _buildGrid(progress) {
    var ilesEl = document.getElementById('brevet-iles-sec');
    if (!ilesEl) return;

    if (!_chapitres.length) {
      ilesEl.innerHTML = _header() +
        '<div style="text-align:center;padding:60px;color:rgba(255,255,255,.4);font-weight:800">🔒 Contenu en préparation…</div>';
      return;
    }

    var grid = '<div class="brevet-grid">';
    _chapitres.forEach(function(ch) {
      var key   = MATIERE_CODE+'_'+NIVEAU_CODE+'_'+ch.numero;
      var prog  = progress[key];
      var done  = !!prog;
      var score = prog ? prog.score : 0;
      var total = prog ? prog.total : 0;
      var color = ch.ile_color || '#eab308';
      var img   = ch.hero_image || '';
      var isAnnale = /annale/i.test(ch.nom || '');
      var badge = isAnnale ? '📜 ANNALE' : '📚 LEÇON';

      grid +=
        '<div class="brevet-card'+(done?' done':'')+'" style="--c:'+color+'" onclick="window.brevet_start(\''+ch.id+'\')">' +
          '<div class="brevet-card-img-wrap">' +
            '<img class="brevet-card-img" src="'+img+'" alt="'+(ch.hero_name||'')+'" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="brevet-card-img-fallback" style="background:'+color+'22;color:'+color+'">🎓</div>' +
            '<div class="brevet-card-overlay" style="background:linear-gradient(to top,'+color+'66,transparent)"></div>' +
            '<div class="brevet-card-badge" style="background:'+color+'">'+badge+'</div>' +
          '</div>' +
          '<div class="brevet-card-body">' +
            '<div class="brevet-card-hero" style="color:'+color+'">'+(ch.hero_name||'')+'</div>' +
            '<div class="brevet-card-name">'+((ch.nom||'').toUpperCase())+'</div>' +
            '<div class="brevet-card-topic">'+(ch.topic||'')+'</div>' +
            (done ? '<div class="brevet-card-score">'+score+'/'+total+' ⭐</div>' : '') +
          '</div>' +
        '</div>';
    });
    grid += '</div>';
    ilesEl.innerHTML = _header() + grid;
  }

  // ── Lancer un chapitre (fiche puis quiz) ───────────────────────
  function startChapitre(chapitreId) {
    if (!chapitreId) return;
    var ch = _chapitres.find(function(c){ return c.id===chapitreId; });
    if (!ch) return;

    if (typeof playBGM === 'function') playBGM(ch.bgm || 'map');

    // Fiche-leçon si dispo (Phase 2) — sinon on va directement au quiz
    if (typeof lesson_brevet === 'function') {
      lesson_brevet(NIVEAU_CODE, ch.numero, function(){ _launchQuiz(chapitreId); });
    } else {
      _launchQuiz(chapitreId);
    }
  }

  function _launchQuiz(chapitreId) {
    if (!window.AP_QuizEngine) { console.error('[BrevetRouter] AP_QuizEngine manquant'); return; }
    _show('brevet-quiz-sec'); _hide('brevet-iles-sec');

    window.AP_QuizEngine.launch(chapitreId, {
      matiere:    MATIERE_CODE,
      niveau:     NIVEAU_CODE,
      quizSecId:  'brevet-quiz-sec',
      ilesSecId:  'brevet-iles-sec',
      containerId:'brevet-qContainer',
      titleId:    'brevet-qTitle',
      progFillId: 'brevet-qProgFill',
      progLblId:  'brevet-qProgLbl',
      bgmBack:    'map',
      onBack: function() {
        _hide('brevet-quiz-sec'); _show('brevet-iles-sec');
        var progress = window.AP_QuizEngine
          ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, NIVEAU_CODE) : {};
        _buildGrid(progress);
        if (typeof playBGM === 'function') setTimeout(function(){ playBGM('map'); }, 300);
      },
    });
  }

  // ── Fond animé (réutilise des avatars déjà présents) ───────────
  function _loadBgStrips() {
    if (_bgLoaded) return; _bgLoaded = true;
    var bg = document.getElementById('brevet-bg');
    if (!bg) return;
    bg.innerHTML = '';
    var urls = [
      'assets/images/avatars/luffy.jpg','assets/images/avatars/zoro.jpg',
      'assets/images/avatars/nami.jpg','assets/images/avatars/robin.jpg',
      'assets/images/avatars/law.jpg','assets/images/avatars/ace.jpg',
      'assets/images/avatars/shanks.jpg','assets/images/avatars/brook.jpg'
    ];
    var doubled = urls.concat(urls);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'brevet-bg-strip';
      doubled.filter(function(_, i){ return i % 5 === s; }).forEach(function(src){
        var img = document.createElement('img');
        img.src = src; img.alt = ''; img.loading = 'lazy';
        img.onerror = function(){ this.style.display = 'none'; };
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  }

  function _show(id){ var el=document.getElementById(id); if(el) el.style.display='block'; }
  function _hide(id){ var el=document.getElementById(id); if(el) el.style.display='none'; }

  // ── Exports ────────────────────────────────────────────────────
  window.showBrevetV2 = showBrevet;
  window.brevet_start = startChapitre;

  console.info('🎓 quiz-router-brevet.js — Brevet Français · DB-driven · mono-niveau 3ème');
})();