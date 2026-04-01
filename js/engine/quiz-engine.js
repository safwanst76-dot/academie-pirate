// ═══════════════════════════════════════════════════════════════
// QUIZ-ENGINE.JS V2 — Académie Pirate
// Moteur quiz réutilisable — lit depuis Supabase DB
// Pattern IDENTIQUE aux mondes V1 :
//   → Toutes les questions affichées d'un coup
//   → GIF résultat à la fin selon score
//   → Corrections après soumission
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── État interne ──
  var _state = {
    matiere:    null,
    niveau:     null,
    chapitre:   null,
    questions:  [],
    answers:    {},
    score:      0,
    onBack:     null,
  };

  var STORAGE_AOT = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/';

  var GIFS = {
    perfect: [
      STORAGE_AOT + 'gifs/aot-perfect-1.gif',
      STORAGE_AOT + 'gifs/aot-perfect-2.gif',
      STORAGE_AOT + 'gifs/aot-perfect-3.gif',
    ],
    win: [
      STORAGE_AOT + 'gifs/aot-win-1.gif',
      STORAGE_AOT + 'gifs/aot-win-2.gif',
      STORAGE_AOT + 'gifs/aot-win-3.gif',
      STORAGE_AOT + 'gifs/aot-win-4.gif',
      STORAGE_AOT + 'gifs/aot-win-5.gif',
    ],
    lose: [
      STORAGE_AOT + 'gifs/aot-lose-1.gif',
      STORAGE_AOT + 'gifs/aot-lose-2.gif',
      STORAGE_AOT + 'gifs/aot-lose-3.gif',
    ],
  };

  // ══════════════════════════════════════════════════════════════
  // POINT D'ENTRÉE
  // ══════════════════════════════════════════════════════════════

  async function launch(chapitreId, opts) {
    opts = opts || {};
    _state.onBack   = opts.onBack   || null;
    _state.matiere  = opts.matiere  || 'english';
    _state.niveau   = opts.niveau   || 'cm2';
    _state.answers  = {};
    _state.score    = 0;

    try {
      await _loadChapitre(chapitreId);
      await _loadQuestions(chapitreId);

      if (!_state.questions.length) {
        console.error('[QuizEngine] Aucune question pour:', chapitreId);
        return;
      }

      _showQuizSection();
      _renderAll();

      // Musique
      if (typeof stopBGM === 'function') stopBGM();
      if (_state.chapitre && _state.chapitre.bgm && typeof playBGM === 'function') {
        setTimeout(function(){ playBGM(_state.chapitre.bgm); }, 300);
      }

    } catch(e) {
      console.error('[QuizEngine] Erreur:', e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // CHARGEMENT DB
  // ══════════════════════════════════════════════════════════════

  async function _loadChapitre(id) {
    var db = _getDb();
    var res = await db.from('chapitres').select('*').eq('id', id).single();
    if (res.error) throw new Error(res.error.message);
    _state.chapitre = res.data;
  }

  async function _loadQuestions(id) {
    var db = _getDb();
    var res = await db.from('questions')
      .select('*')
      .eq('chapitre_id', id)
      .eq('actif', true)
      .order('ordre', { ascending: true });
    if (res.error) throw new Error(res.error.message);
    _state.questions = res.data || [];
  }

  // ══════════════════════════════════════════════════════════════
  // RENDU — TOUTES LES QUESTIONS D'UN COUP (pattern V1)
  // ══════════════════════════════════════════════════════════════

  function _showQuizSection() {
    var levelsEl = document.getElementById('aot-levels-sec');
    var ilesEl   = document.getElementById('aot-iles-sec');
    var quizEl   = document.getElementById('aot-quiz-sec');
    if (levelsEl) levelsEl.style.display = 'none';
    if (ilesEl)   ilesEl.style.display   = 'none';
    if (quizEl)   quizEl.style.display   = 'block';
    window.scrollTo(0, 0);
  }

  function _renderAll() {
    var ch    = _state.chapitre;
    var qs    = _state.questions;
    var total = qs.length;

    // Header
    var titleEl = document.getElementById('aot-qTitle');
    var fillEl  = document.getElementById('aot-qProgFill');
    var lblEl   = document.getElementById('aot-qProgLbl');
    if (titleEl) titleEl.textContent = ch.nom + ' — ' + ch.topic;
    if (fillEl)  fillEl.style.width  = '0%';
    if (lblEl)   lblEl.textContent   = '0 / ' + total;

    var container = document.getElementById('aot-qContainer');
    if (!container) return;

    var keys = ['A','B','C','D'];
    var msgs = [
      'Montre-moi ce que tu sais !',
      'Réfléchis bien avant de répondre.',
      'Chaque bonne réponse te rapproche de la victoire !',
      'Tu peux le faire !',
      'Concentre-toi, soldat !',
      'L\'Armée d\'Exploration compte sur toi !',
      'Ne lâche pas !',
      'Presque fini, tiens bon !',
    ];

    var html = '';

    qs.forEach(function(q, i) {
      var opts = [];
      try { opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options; } catch(e) {}

      var isBoss = q.is_boss || q.type === 'boss';
      var msg    = msgs[i % msgs.length];
      var heroImg  = ch.hero_image || '';
      var heroName = ch.hero_name  || '';

      var bossBanner = isBoss
        ? '<div class="aot-boss-banner">' +
            '<div class="aot-boss-label">⚔️ COMBAT FINAL</div>' +
            '<div class="aot-boss-name">' + (ch.boss_name || 'BOSS') + '</div>' +
          '</div>'
        : '';

      var optsHtml = opts.map(function(opt, j) {
        var safe = String(opt).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return '<button class="aot-opt" ' +
          'id="aot-opt-' + i + '-' + j + '" ' +
          'data-qi="' + i + '" data-oi="' + j + '" data-v="' + safe + '" ' +
          'onclick="window.AP_QuizEngine._selectOpt(' + i + ',' + j + ',this)">' +
          '<span class="aot-opt-key">' + keys[j] + '</span>' +
          '<span class="aot-opt-txt">' + String(opt) + '</span>' +
          '</button>';
      }).join('');

      html +=
        '<div class="aot-q-card' + (isBoss ? ' aot-boss-card' : '') + '" id="aot-qcard-' + i + '">' +
          bossBanner +
          '<div class="aot-char-panel">' +
            '<div class="aot-char-img">' +
              '<img src="' + heroImg + '" alt="' + heroName + '" ' +
              'onerror="this.style.display=\'none\'">' +
            '</div>' +
            '<div class="aot-char-speech">' +
              '<div class="aot-char-name">' + heroName + '</div>' +
              '<div class="aot-speech-bubble">' + msg + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="aot-q-body">' +
            '<div class="aot-q-num">Question ' + (i+1) + ' / ' + total + '</div>' +
            '<div class="aot-q-txt">' + q.question + '</div>' +
            '<div class="aot-opts">' + optsHtml + '</div>' +
            '<div class="aot-feedback" id="aot-fb-' + i + '"></div>' +
            '<div class="aot-expl" id="aot-expl-' + i + '">' + (q.explication || '') + '</div>' +
          '</div>' +
        '</div>';
    });

    // Bouton soumettre (caché au début)
    html +=
      '<div class="aot-submit-wrap" id="aot-submit-wrap" style="display:none">' +
        '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._submit()">' +
        '✅ VALIDER MES RÉPONSES</button>' +
      '</div>';

    container.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════════════
  // SÉLECTION D'UNE OPTION
  // ══════════════════════════════════════════════════════════════

  function _selectOpt(qi, oi, btnEl) {
    if (_state.answers[qi] !== undefined) return;

    var q    = _state.questions[qi];
    var opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;

    _state.answers[qi] = opts[oi];

    // Marquer visuellement la sélection
    var allBtns = document.querySelectorAll('[id^="aot-opt-' + qi + '-"]');
    allBtns.forEach(function(b) {
      b.classList.remove('aot-selected');
    });
    if (btnEl) btnEl.classList.add('aot-selected');

    // Mettre à jour la progress bar
    var answered = Object.keys(_state.answers).length;
    var total    = _state.questions.length;
    var pct      = Math.round(answered / total * 100);
    var fillEl   = document.getElementById('aot-qProgFill');
    var lblEl    = document.getElementById('aot-qProgLbl');
    if (fillEl) fillEl.style.width = pct + '%';
    if (lblEl)  lblEl.textContent  = answered + ' / ' + total;

    // Afficher le bouton soumettre quand toutes les questions sont répondues
    if (answered === total) {
      var submitWrap = document.getElementById('aot-submit-wrap');
      if (submitWrap) {
        submitWrap.style.display = 'block';
        setTimeout(function(){
          submitWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SOUMISSION — CORRECTION + RÉSULTATS (pattern V1)
  // ══════════════════════════════════════════════════════════════

  function _submit() {
    var qs    = _state.questions;
    var total = qs.length;
    _state.score = 0;

    // Corriger chaque question
    qs.forEach(function(q, i) {
      var selected = _state.answers[i];
      var correct  = q.reponse;
      var isOk     = (selected === correct);
      if (isOk) _state.score++;

      var opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;

      // Désactiver + colorier les boutons
      opts.forEach(function(opt, j) {
        var btn = document.getElementById('aot-opt-' + i + '-' + j);
        if (!btn) return;
        btn.disabled = true;
        if (opt === correct) {
          btn.classList.add('aot-correct');
          btn.classList.remove('aot-selected', 'aot-wrong');
        } else if (opt === selected && !isOk) {
          btn.classList.add('aot-wrong');
          btn.classList.remove('aot-selected');
        } else {
          btn.classList.remove('aot-selected');
        }
      });

      // Feedback
      var fbEl = document.getElementById('aot-fb-' + i);
      if (fbEl) {
        fbEl.textContent = isOk ? '✅ Bonne réponse !' : '❌ Mauvaise réponse !';
        fbEl.className   = 'aot-feedback ' + (isOk ? 'aot-ok' : 'aot-ko');
      }

      // Explication
      var explEl = document.getElementById('aot-expl-' + i);
      if (explEl) explEl.classList.add('aot-show');
    });

    // Masquer le bouton soumettre
    var submitWrap = document.getElementById('aot-submit-wrap');
    if (submitWrap) submitWrap.style.display = 'none';

    // Afficher les résultats
    _showResults();
  }

  // ══════════════════════════════════════════════════════════════
  // RÉSULTATS AVEC GIF (pattern V1)
  // ══════════════════════════════════════════════════════════════

  function _showResults() {
    var score  = _state.score;
    var total  = _state.questions.length;
    var ch     = _state.chapitre;
    var isPerfect = (score === total);
    var isWin     = (score >= Math.ceil(total * 0.6));

    // XP
    var xpGained = score * 2 + (isPerfect ? 10 : 0);

    // Étoiles
    var stars = '';
    for (var i = 0; i < total; i++) stars += (i < score ? '⭐' : '☆');

    // GIF
    var gifPool = isPerfect ? GIFS.perfect : (isWin ? GIFS.win : GIFS.lose);
    var gif     = gifPool[Math.floor(Math.random() * gifPool.length)];

    // Titre
    var titre = isPerfect ? '🏆 PARFAIT !' : (isWin ? '✅ BIEN JOUÉ !' : '💪 CONTINUE !');

    // Musique
    if (typeof stopBGM === 'function') stopBGM();
    if (typeof playBGM === 'function') {
      setTimeout(function(){
        playBGM(isPerfect || isWin ? 'aot-victory' : 'aot-defeat');
      }, 300);
    }

    // SFX
    if (isPerfect && typeof sfxPerfect === 'function') sfxPerfect();
    else if (isWin && typeof sfxFanfare === 'function') sfxFanfare();

    // Insérer la carte résultats AVANT les corrections
    var container = document.getElementById('aot-qContainer');
    if (!container) return;

    var resCard = document.createElement('div');
    resCard.id = 'aot-resCard';
    resCard.className = 'aot-result-card';
    resCard.style.setProperty('--isle-color', ch.ile_color || '#4a5c3f');

    resCard.innerHTML =
      '<div class="aot-result-banner">' +
        '<img src="' + (ch.hero_image || '') + '" class="aot-result-avatar" ' +
          'onerror="this.style.display=\'none\'">' +
        '<div class="aot-result-score-wrap">' +
          '<div class="aot-result-score">' + score + ' / ' + total + '</div>' +
          '<div class="aot-result-title">' + titre + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="aot-result-body">' +
        '<div class="aot-result-topic">' + (ch.topic || '') + '</div>' +
        '<div class="aot-result-stars">' + stars.substring(0, 22) + '</div>' +
        (gif ? '<img src="' + gif + '" class="aot-result-gif" onerror="this.style.display=\'none\'">' : '') +
        '<div class="aot-result-xp">+' + xpGained + ' XP ⚔️ — Total English : ' + xpGained + ' XP</div>' +
        '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._goBack()">' +
          '🗺️ RETOUR À LA CARTE</button>' +
        '<button class="aot-btn aot-btn-outline" style="margin-top:10px" ' +
          'onclick="window.AP_QuizEngine._retry()">' +
          '🔁 REJOUER</button>' +
      '</div>';

    // Insérer au début du container
    container.insertBefore(resCard, container.firstChild);

    // Scroll vers le résultat
    setTimeout(function(){
      resCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);

    // Sauvegarder
    _saveProgression(score, total, xpGained);

    // Session recap
    if (window.AP && window.AP.recap) {
      var islandId = _state.matiere + '_' + _state.niveau + '_' + ch.numero;
      window.AP.recap.show(_state.matiere, score, total, ch.numero, function() {
        _goBack();
      });
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SAUVEGARDE
  // ══════════════════════════════════════════════════════════════

  async function _saveProgression(score, total, xp) {
    var ch = _state.chapitre;
    if (!ch) return;
    var islandId = _state.matiere + '_' + _state.niveau + '_' + ch.numero;

    // Local
    try {
      var key   = 'ap_' + _state.matiere + '_progress';
      var local = JSON.parse(localStorage.getItem(key) || '{}');
      local[islandId] = { score: score, total: total, xp: xp, date: Date.now() };
      localStorage.setItem(key, JSON.stringify(local));
    } catch(e) {}

    // Supabase
    try {
      var db = _getDb();
      if (db) {
        await db.from('progressions').upsert({
          island_id:    islandId,
          score:        score,
          total:        total,
          xp:           xp,
          created_at:   new Date().toISOString(),
          updated_at:   new Date().toISOString(),
        }, { onConflict: 'island_id' });
      }
    } catch(e) {
      console.warn('[QuizEngine] Sauvegarde DB:', e.message);
    }

    // XP global
    try {
      if (typeof updateHUD === 'function') updateHUD();
    } catch(e) {}
  }

  // ══════════════════════════════════════════════════════════════
  // NAVIGATION
  // ══════════════════════════════════════════════════════════════

  function _goBack() {
    if (typeof stopBGM === 'function') stopBGM();
    var quizEl = document.getElementById('aot-quiz-sec');
    var ilesEl = document.getElementById('aot-iles-sec');
    if (quizEl) quizEl.style.display = 'none';
    if (ilesEl) ilesEl.style.display = 'block';
    _state.answers = {};
    window.scrollTo(0, 0);
    if (typeof playBGM === 'function') setTimeout(function(){ playBGM('aot-map'); }, 300);
    if (typeof _state.onBack === 'function') _state.onBack();
  }

  function _retry() {
    _state.answers = {};
    _state.score   = 0;
    var container = document.getElementById('aot-qContainer');
    if (container) container.innerHTML = '';
    _renderAll();
    if (typeof stopBGM === 'function') stopBGM();
    if (_state.chapitre && _state.chapitre.bgm && typeof playBGM === 'function') {
      setTimeout(function(){ playBGM(_state.chapitre.bgm); }, 300);
    }
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════════════════════════════
  // UTILITAIRES
  // ══════════════════════════════════════════════════════════════

  function _getDb() {
    if (typeof sb !== 'undefined') return sb;
    if (typeof getDb === 'function') return getDb();
    return null;
  }

  async function getChapitres(matiereCode, niveauCode) {
    var db = _getDb();
    if (!db) return [];
    try {
      var res = await db.from('v_chapitres_complets')
        .select('*')
        .eq('matiere_code', matiereCode)
        .eq('niveau_code',  niveauCode)
        .order('ordre_affichage', { ascending: true });
      return res.data || [];
    } catch(e) {
      console.error('[QuizEngine] getChapitres:', e.message);
      return [];
    }
  }

  function getLocalProgress(matiereCode, niveauCode) {
    try {
      var key  = 'ap_' + matiereCode + '_progress';
      var data = JSON.parse(localStorage.getItem(key) || '{}');
      var result = {};
      Object.keys(data).forEach(function(k) {
        if (k.startsWith(matiereCode + '_' + niveauCode)) result[k] = data[k];
      });
      return result;
    } catch(e) { return {}; }
  }

  // ══════════════════════════════════════════════════════════════
  // EXPORT
  // ══════════════════════════════════════════════════════════════

  window.AP_QuizEngine = {
    launch:           launch,
    getChapitres:     getChapitres,
    getLocalProgress: getLocalProgress,
    _selectOpt:       _selectOpt,
    _submit:          _submit,
    _showResults:     _showResults,
    _goBack:          _goBack,
    _retry:           _retry,
  };

  console.info('⚙️ quiz-engine.js v2 chargé — pattern V1 (toutes questions + GIF résultat)');

})();
