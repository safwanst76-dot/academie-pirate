// ═══════════════════════════════════════════════════════════════
// QUIZ-ENGINE.JS V3 — Académie Pirate
// Pattern IDENTIQUE V1 (pays-du-feu / namek / kanto) :
//   → Toutes les questions affichées d'un coup
//   → Bouton valider quand toutes répondues
//   → Corrections + GIF ajouté À LA FIN du container
//   → Scroll vers résultats après 400ms
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── État ──────────────────────────────────────────────────────
  var _state = {
    matiere:   null,
    niveau:    null,
    chapitre:  null,
    questions: [],
    answers:   {},
    score:     0,
    xp:        0,
    onBack:    null,
  };

  var STORAGE_AOT = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/';

  // GIFs depuis bucket island-aot/gifs/
  var AOT_GIFS_PERFECT = [
    STORAGE_AOT + 'gifs/aot-perfect-1.gif',
    STORAGE_AOT + 'gifs/aot-perfect-2.gif',
    STORAGE_AOT + 'gifs/aot-perfect-3.gif',
  ];
  var AOT_GIFS_CORRECT = [
    STORAGE_AOT + 'gifs/aot-win-1.gif',
    STORAGE_AOT + 'gifs/aot-win-2.gif',
    STORAGE_AOT + 'gifs/aot-win-3.gif',
    STORAGE_AOT + 'gifs/aot-win-4.gif',
    STORAGE_AOT + 'gifs/aot-win-5.gif',
  ];
  var AOT_GIFS_LOSE = [
    STORAGE_AOT + 'gifs/aot-lose-1.gif',
    STORAGE_AOT + 'gifs/aot-lose-2.gif',
    STORAGE_AOT + 'gifs/aot-lose-3.gif',
  ];

  // ══════════════════════════════════════════════════════════════
  // POINT D'ENTRÉE
  // ══════════════════════════════════════════════════════════════

  async function launch(chapitreId, opts) {
    opts = opts || {};
    _state.onBack  = opts.onBack  || null;
    _state.matiere = opts.matiere || 'english';
    _state.niveau  = opts.niveau  || 'cm2';
    _state.answers = {};
    _state.score   = 0;

    try {
      await _loadChapitre(chapitreId);
      await _loadQuestions(chapitreId);

      if (!_state.questions.length) {
        console.error('[QuizEngine] Aucune question:', chapitreId);
        return;
      }

      _showQuizSection();
      _renderQuiz();

      // Musique — après leçon (règle AU-04)
      if (typeof stopBGM === 'function') stopBGM();
      if (_state.chapitre && _state.chapitre.bgm && typeof playBGM === 'function') {
        setTimeout(function(){ playBGM(_state.chapitre.bgm); }, 300);
      }

    } catch(e) {
      console.error('[QuizEngine] Erreur launch:', e.message);
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
  // AFFICHAGE SECTION QUIZ
  // ══════════════════════════════════════════════════════════════

  function _showQuizSection() {
    var levelsEl = document.getElementById('aot-levels-sec');
    var ilesEl   = document.getElementById('aot-iles-sec');
    var quizEl   = document.getElementById('aot-quiz-sec');
    if (levelsEl) levelsEl.style.display = 'none';
    if (ilesEl)   ilesEl.style.display   = 'none';
    if (quizEl) {
      quizEl.style.display = 'block';
      quizEl.style.zIndex  = '5';
    }
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════════════════════════════
  // RENDU — TOUTES LES QUESTIONS D'UN COUP (pattern V1 exact)
  // ══════════════════════════════════════════════════════════════

  function _renderQuiz() {
    var ch    = _state.chapitre;
    var qs    = _state.questions;
    var total = qs.length;
    var keys  = ['A','B','C','D'];

    // Header
    var titleEl = document.getElementById('aot-qTitle');
    var fillEl  = document.getElementById('aot-qProgFill');
    var lblEl   = document.getElementById('aot-qProgLbl');
    if (titleEl) titleEl.textContent = ch.nom + ' — ' + ch.topic;
    if (fillEl)  fillEl.style.width  = '0%';
    if (lblEl)   lblEl.textContent   = '0 / ' + total;

    var msgs = [
      'Montre-moi ce que tu sais !',
      'Réfléchis bien avant de répondre.',
      'Chaque bonne réponse te rapproche de la victoire !',
      'Tu peux le faire, soldat !',
      'Concentre-toi !',
      'L\'Armée d\'Exploration compte sur toi !',
      'Ne lâche pas !',
      'Presque fini, tiens bon !',
    ];

    var html = '';

    qs.forEach(function(q, i) {
      var opts = [];
      try { opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options; } catch(e) {}

      var isBoss   = q.is_boss || q.type === 'boss';
      var msg      = msgs[i % msgs.length];
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
        return '<label class="aot-opt" ' +
          'id="aot-lbl' + i + '_' + j + '" ' +
          'data-qi="' + i + '" data-oi="' + j + '" data-v="' + safe + '" ' +
          'onclick="window.AP_QuizEngine._selectOpt(' + i + ',' + j + ',this)">' +
          '<span class="aot-opt-key">' + keys[j] + '</span>' +
          '<span class="aot-opt-txt">' + String(opt) + '</span>' +
          '</label>';
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
            '<div class="aot-feedback" id="aot-fb' + i + '"></div>' +
            '<div class="aot-expl" id="aot-expl' + i + '">' + (q.explication || '') + '</div>' +
          '</div>' +
        '</div>';
    });

    // Bouton valider (masqué, apparaît quand tout est répondu)
    html +=
      '<div class="aot-submit-wrap" id="aot-submit-wrap" style="display:none">' +
        '<button class="aot-btn aot-btn-main" ' +
          'onclick="window.AP_QuizEngine._corriger()">' +
          '⚔️ VALIDER MES RÉPONSES</button>' +
      '</div>';

    var container = document.getElementById('aot-qContainer');
    if (container) container.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════════════
  // SÉLECTION OPTION
  // ══════════════════════════════════════════════════════════════

  function _selectOpt(qi, oi, el) {
    if (_state.answers[qi] !== undefined) return;

    var q    = _state.questions[qi];
    var opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;

    _state.answers[qi] = opts[oi];

    // Déselectionner les autres labels de cette question
    var allLabels = document.querySelectorAll('[id^="aot-lbl' + qi + '_"]');
    allLabels.forEach(function(l) { l.classList.remove('aot-selected'); });
    if (el) el.classList.add('aot-selected');

    // Barre de progression
    var answered = Object.keys(_state.answers).length;
    var total    = _state.questions.length;
    var fillEl   = document.getElementById('aot-qProgFill');
    var lblEl    = document.getElementById('aot-qProgLbl');
    if (fillEl) fillEl.style.width = Math.round(answered / total * 100) + '%';
    if (lblEl)  lblEl.textContent  = answered + ' / ' + total;

    // Afficher bouton valider quand tout est répondu
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
  // CORRECTION (pattern exact V1)
  // ══════════════════════════════════════════════════════════════

  function _corriger() {
    var qs = _state.questions;
    _state.score = 0;

    qs.forEach(function(q, i) {
      var fb   = document.getElementById('aot-fb' + i);
      var expl = document.getElementById('aot-expl' + i);
      var ans  = _state.answers[i];
      var opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;

      // Colorer les labels
      var allLabels = document.querySelectorAll('[id^="aot-lbl' + i + '_"]');
      allLabels.forEach(function(lbl) {
        lbl.style.pointerEvents = 'none';
        if (lbl.dataset.v === q.reponse) {
          lbl.classList.add('aot-correct');
        }
      });

      if (ans === q.reponse) {
        _state.score++;
        if (fb) { fb.textContent = '✅ Correct !'; fb.className = 'aot-feedback aot-ok'; }
        if (typeof sfxOK === 'function') sfxOK();
      } else {
        if (fb) { fb.textContent = '❌ ' + (ans ? 'Mauvaise réponse.' : 'Non répondu.'); fb.className = 'aot-feedback aot-ko'; }
        var selLbl = ans
          ? document.querySelector('[id^="aot-lbl' + i + '_"][data-v="' + String(ans).replace(/"/g,'&quot;') + '"]')
          : null;
        if (selLbl) selLbl.classList.add('aot-wrong');
        if (typeof sfxKO === 'function') sfxKO();
      }

      if (expl) {
        expl.innerHTML = '💡 ' + (q.explication || '');
        expl.classList.add('aot-show');
      }
    });

    // Barre à 100%
    var fillEl = document.getElementById('aot-qProgFill');
    var lblEl  = document.getElementById('aot-qProgLbl');
    if (fillEl) fillEl.style.width = '100%';
    if (lblEl)  lblEl.textContent  = qs.length + ' / ' + qs.length;

    // Masquer bouton valider
    var sw = document.getElementById('aot-submit-wrap');
    if (sw) sw.style.display = 'none';

    // Scroll vers le haut pour voir les corrections depuis le début
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Afficher résultats après que l'élève ait eu le temps de voir les corrections
    _showResults();
  }

  // ══════════════════════════════════════════════════════════════
  // RÉSULTATS — GIF ajouté À LA FIN (pattern exact V1)
  // ══════════════════════════════════════════════════════════════

  function _showResults() {
    var score  = _state.score;
    var ch     = _state.chapitre;
    var total  = _state.questions.length;

    var txts = [
      { min: 11, t: 'LÉGENDE DE PARADIS ! 11/11 !!!' },
      { min: 9,  t: 'EXCELLENT ! Niveau Capitaine !' },
      { min: 7,  t: 'Bien joué, Soldat confirmé !' },
      { min: 5,  t: 'Continue l\'entraînement !' },
      { min: 0,  t: 'Ne lâche pas ! Réessaie !' }
    ];
    var res    = txts.find(function(r){ return score >= r.min; }) || txts[txts.length-1];
    var gained = score * 2 + (score === total ? 10 : 0);
    _state.xp  = gained;

    // GIF selon score (pattern exact V1)
    var gif = score === total
      ? AOT_GIFS_PERFECT[Math.floor(Math.random() * AOT_GIFS_PERFECT.length)]
      : score >= Math.ceil(total * 0.6)
        ? AOT_GIFS_CORRECT[score % AOT_GIFS_CORRECT.length]
        : AOT_GIFS_LOSE[0];

    var stars = _state.questions.map(function(_, i){ return i < score ? '⭐' : '☆'; }).join('');

    var html =
      '<div class="aot-result-card" id="aot-resCard" style="--isle-color:' + (ch.ile_color || '#4a5c3f') + '">' +
        '<div class="aot-result-banner">' +
          '<img src="' + (ch.hero_image || '') + '" class="aot-result-avatar" ' +
            'onerror="this.style.display=\'none\'">' +
          '<div class="aot-result-score-wrap">' +
            '<div class="aot-result-score">' + score + '/' + total + '</div>' +
            '<div class="aot-result-title">' + res.t + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="aot-result-body">' +
          '<div class="aot-result-topic">⚔️ ' + (ch.topic || '') + '</div>' +
          '<div class="aot-result-stars">' + stars + '</div>' +
          (gif ? '<img src="' + gif + '" class="aot-result-gif" onerror="this.style.display=\'none\'">' : '') +
          '<div class="aot-result-xp">+' + gained + ' XP Anglais ⚔️</div>' +
          '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._goBack()">🗺️ RETOUR À LA CARTE</button>' +
          '<button class="aot-btn aot-btn-outline" onclick="window.AP_QuizEngine._retry()" style="margin-top:10px">🔁 REJOUER</button>' +
        '</div>' +
      '</div>';

    // Ajouter À LA FIN du container (pattern exact V1 : c.innerHTML += html)
    var c = document.getElementById('aot-qContainer');
    if (c) c.innerHTML += html;

    // Scroll vers le HAUT pour que l'élève voie les corrections
    // puis scroll vers résultats après 400ms
    window.scrollTo(0, 0);
    setTimeout(function(){
      var rc = document.getElementById('aot-resCard');
      if (rc) rc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);

    // SFX
    if (score === total && typeof sfxPerfect === 'function') sfxPerfect();
    else if (score >= Math.ceil(total * 0.6) && typeof sfxFanfare === 'function') sfxFanfare();

    // Musique victoire/défaite
    if (typeof stopBGM === 'function') stopBGM();
    if (typeof playBGM === 'function') {
      setTimeout(function(){
        playBGM(score >= Math.ceil(total * 0.6) ? 'aot-victory' : 'aot-defeat');
      }, 300);
    }

    // Sauvegarder
    _saveProgression(score, total, gained);

    // Session recap
    if (window.AP && window.AP.recap) {
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
          island_id:  islandId,
          score:      score,
          total:      total,
          xp:         xp,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'island_id' });
      }
    } catch(e) {
      console.warn('[QuizEngine] DB save:', e.message);
    }

    // XP global
    try { if (typeof updateHUD === 'function') updateHUD(); } catch(e) {}
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
    var c = document.getElementById('aot-qContainer');
    if (c) c.innerHTML = '';
    _renderQuiz();
    window.scrollTo(0, 0);
    if (typeof stopBGM === 'function') stopBGM();
    if (_state.chapitre && _state.chapitre.bgm && typeof playBGM === 'function') {
      setTimeout(function(){ playBGM(_state.chapitre.bgm); }, 300);
    }
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
    _corriger:        _corriger,
    _goBack:          _goBack,
    _retry:           _retry,
  };

  console.info('⚙️ quiz-engine.js v3 chargé — pattern V1 exact (corrections + GIF fin + scroll 400ms)');

})();
