// ═══════════════════════════════════════════════════════════════
// QUIZ-ENGINE.JS — Académie Pirate V2
// Moteur quiz réutilisable — lit les questions depuis Supabase DB
// Utilisé par tous les nouveaux mondes (English, etc.)
// Règle DB-02 : engine réutilisable, zéro duplication
// Règle NR-01 : zéro régression sur les mondes V1
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── État interne ──────────────────────────────────────────────
  var _state = {
    matiere:      null,   // code matière ex: 'english'
    niveau:       null,   // code niveau ex: 'cm2'
    chapitre:     null,   // objet chapitre courant
    questions:    [],     // questions du chapitre
    currentQ:     0,      // index question courante
    answers:      {},     // { index: valeur }
    score:        0,
    xp:           0,
    startTime:    null,
    onComplete:   null,   // callback fin de quiz
    onBack:       null,   // callback retour carte
  };

  // ── Config ────────────────────────────────────────────────────
  var XP_CORRECT  = 2;
  var XP_PERFECT  = 10;  // bonus si 11/11
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
  // API PUBLIQUE
  // ══════════════════════════════════════════════════════════════

  /**
   * Lance le quiz pour un chapitre donné
   * @param {string} chapitreId - UUID du chapitre
   * @param {object} opts - { onComplete, onBack, matiere, niveau }
   */
  async function launch(chapitreId, opts) {
    opts = opts || {};
    _state.onComplete = opts.onComplete || null;
    _state.onBack     = opts.onBack     || null;
    _state.matiere    = opts.matiere    || 'english';
    _state.niveau     = opts.niveau     || 'cm2';
    _state.startTime  = Date.now();
    _state.answers    = {};
    _state.score      = 0;
    _state.currentQ   = 0;

    try {
      // Charger le chapitre + questions depuis DB
      await _loadChapitre(chapitreId);
      await _loadQuestions(chapitreId);

      if (!_state.questions.length) {
        console.error('[QuizEngine] Aucune question pour ce chapitre:', chapitreId);
        return;
      }

      // Afficher la section quiz
      _showQuizSection();
      _renderHeader();
      _renderQuestion(_state.currentQ);

      // Musique
      if (_state.chapitre && _state.chapitre.bgm) {
        if (typeof stopBGM === 'function') stopBGM();
        if (typeof playBGM === 'function') {
          setTimeout(function(){ playBGM(_state.chapitre.bgm); }, 300);
        }
      }

    } catch(e) {
      console.error('[QuizEngine] Erreur launch:', e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // CHARGEMENT DEPUIS DB
  // ══════════════════════════════════════════════════════════════

  async function _loadChapitre(chapitreId) {
    var db = _getDb();
    var res = await db.from('chapitres')
      .select('*, matieres(code,nom), niveaux(code,nom)')
      .eq('id', chapitreId)
      .single();

    if (res.error) throw new Error(res.error.message);
    _state.chapitre = res.data;
  }

  async function _loadQuestions(chapitreId) {
    var db = _getDb();
    var res = await db.from('questions')
      .select('*')
      .eq('chapitre_id', chapitreId)
      .eq('actif', true)
      .order('ordre', { ascending: true });

    if (res.error) throw new Error(res.error.message);
    _state.questions = res.data || [];
  }

  // ══════════════════════════════════════════════════════════════
  // RENDU UI
  // ══════════════════════════════════════════════════════════════

  function _showQuizSection() {
    // Masquer les sections îles
    var ilesEl = document.getElementById('aot-iles-sec');
    var levelsEl = document.getElementById('aot-levels-sec');
    var quizEl  = document.getElementById('aot-quiz-sec');
    if (ilesEl)   ilesEl.style.display   = 'none';
    if (levelsEl) levelsEl.style.display = 'none';
    if (quizEl)   { quizEl.style.display = 'block'; }
    window.scrollTo(0, 0);
  }

  function _renderHeader() {
    var ch = _state.chapitre;
    if (!ch) return;

    var titleEl = document.getElementById('aot-qTitle');
    var fillEl  = document.getElementById('aot-qProgFill');
    var lblEl   = document.getElementById('aot-qProgLbl');
    var container = document.getElementById('aot-qContainer');

    if (titleEl) titleEl.textContent = ch.nom + ' — ' + ch.topic;
    if (fillEl)  fillEl.style.width  = '0%';
    if (lblEl)   lblEl.textContent   = '0 / ' + _state.questions.length;
    if (container) container.innerHTML = '';
  }

  function _renderQuestion(idx) {
    var q   = _state.questions[idx];
    if (!q) return;

    var ch  = _state.chapitre;
    var total = _state.questions.length;

    // Mise à jour progress bar
    var pct = Math.round((idx / total) * 100);
    var fillEl = document.getElementById('aot-qProgFill');
    var lblEl  = document.getElementById('aot-qProgLbl');
    if (fillEl) fillEl.style.width = pct + '%';
    if (lblEl)  lblEl.textContent  = idx + ' / ' + total;

    // Options depuis JSON
    var opts = [];
    try {
      opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    } catch(e) { opts = []; }

    var keys = ['A', 'B', 'C', 'D'];
    var isBoss = q.is_boss || q.type === 'boss';

    // Boss banner
    var bossBanner = isBoss
      ? '<div class="aot-boss-banner">' +
          '<div class="aot-boss-label">⚔️ COMBAT FINAL</div>' +
          '<div class="aot-boss-name">' + (ch.boss_name || 'BOSS') + '</div>' +
        '</div>'
      : '';

    // Personnage
    var heroImg  = ch.hero_image || '';
    var heroName = ch.hero_name  || '';
    var msgs = [
      'Montre-moi ce que tu sais faire !',
      'Réfléchis bien avant de répondre.',
      'Chaque question te rapproche de la victoire !',
      'Tu peux le faire !',
      'Concentre-toi !',
    ];
    var msg = msgs[idx % msgs.length];

    // Options HTML
    var optsHtml = opts.map(function(opt, j) {
      var safe = opt.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
      return '<button class="aot-opt" id="aot-opt-' + idx + '-' + j + '" ' +
        'data-qi="' + idx + '" data-oi="' + j + '" data-v="' + safe + '" ' +
        'onclick="window.AP_QuizEngine._selectOpt(' + idx + ',' + j + ',this)">' +
        '<span class="aot-opt-key">' + keys[j] + '</span>' +
        '<span class="aot-opt-txt">' + opt + '</span>' +
        '</button>';
    }).join('');

    var cardHtml =
      '<div class="aot-q-card' + (isBoss ? ' aot-boss-card' : '') + '" id="aot-qcard-' + idx + '">' +
        bossBanner +
        '<div class="aot-char-panel">' +
          '<div class="aot-char-img">' +
            '<img src="' + heroImg + '" alt="' + heroName + '" onerror="this.style.display=\'none\'">' +
          '</div>' +
          '<div class="aot-char-speech">' +
            '<div class="aot-char-name">' + heroName + '</div>' +
            '<div class="aot-speech-bubble">' + msg + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="aot-q-body">' +
          '<div class="aot-q-num">Question ' + (idx + 1) + ' / ' + total + '</div>' +
          '<div class="aot-q-txt">' + q.question + '</div>' +
          '<div class="aot-opts">' + optsHtml + '</div>' +
          '<div class="aot-feedback" id="aot-fb-' + idx + '"></div>' +
          '<div class="aot-expl" id="aot-expl-' + idx + '">' + (q.explication || '') + '</div>' +
        '</div>' +
      '</div>';

    var container = document.getElementById('aot-qContainer');
    if (container) {
      container.innerHTML = cardHtml;
      // Scroll vers la question
      setTimeout(function(){
        var card = document.getElementById('aot-qcard-' + idx);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    // Bouton suivant (caché au début)
    _renderNextBtn(idx);
  }

  function _renderNextBtn(idx) {
    var total = _state.questions.length;
    var isLast = (idx === total - 1);
    var container = document.getElementById('aot-qContainer');
    if (!container) return;

    var btnWrap = document.createElement('div');
    btnWrap.className = 'aot-submit-wrap';
    btnWrap.id = 'aot-next-wrap-' + idx;
    btnWrap.style.display = 'none';

    if (isLast) {
      btnWrap.innerHTML =
        '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._showResults()">' +
        '🏆 VOIR LES RÉSULTATS</button>';
    } else {
      btnWrap.innerHTML =
        '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._nextQuestion()">' +
        '➡️ QUESTION SUIVANTE</button>';
    }

    container.appendChild(btnWrap);
  }

  // ══════════════════════════════════════════════════════════════
  // INTERACTIONS
  // ══════════════════════════════════════════════════════════════

  function _selectOpt(qi, oi, btnEl) {
    // Ignorer si déjà répondu
    if (_state.answers[qi] !== undefined) return;

    var q    = _state.questions[qi];
    var opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    var selected = opts[oi];
    var correct  = q.reponse;
    var isCorrect = (selected === correct);

    // Enregistrer la réponse
    _state.answers[qi] = selected;
    if (isCorrect) _state.score++;

    // Désactiver tous les boutons
    var allBtns = document.querySelectorAll('[id^="aot-opt-' + qi + '-"]');
    allBtns.forEach(function(b) {
      b.disabled = true;
      var v = b.getAttribute('data-v');
      if (v === correct) {
        b.classList.add('aot-correct');
      } else if (b === btnEl && !isCorrect) {
        b.classList.add('aot-wrong');
      }
    });

    // Feedback
    var fbEl = document.getElementById('aot-fb-' + qi);
    if (fbEl) {
      fbEl.textContent = isCorrect ? '✅ Bonne réponse !' : '❌ Mauvaise réponse !';
      fbEl.className   = 'aot-feedback ' + (isCorrect ? 'aot-ok' : 'aot-ko');
    }

    // Explication
    var explEl = document.getElementById('aot-expl-' + qi);
    if (explEl) explEl.classList.add('aot-show');

    // Sons
    if (isCorrect && typeof sfxCorrect === 'function') sfxCorrect();
    else if (!isCorrect && typeof sfxWrong === 'function') sfxWrong();

    // Afficher le bouton suivant
    var nextWrap = document.getElementById('aot-next-wrap-' + qi);
    if (nextWrap) nextWrap.style.display = 'block';

    // Mise à jour progress bar
    var total = _state.questions.length;
    var pct   = Math.round(((qi + 1) / total) * 100);
    var fillEl = document.getElementById('aot-qProgFill');
    var lblEl  = document.getElementById('aot-qProgLbl');
    if (fillEl) fillEl.style.width = pct + '%';
    if (lblEl)  lblEl.textContent  = (qi + 1) + ' / ' + total;
  }

  function _nextQuestion() {
    _state.currentQ++;
    if (_state.currentQ < _state.questions.length) {
      _renderQuestion(_state.currentQ);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // RÉSULTATS
  // ══════════════════════════════════════════════════════════════

  function _showResults() {
    var score  = _state.score;
    var total  = _state.questions.length;
    var ch     = _state.chapitre;
    var pct    = Math.round(score / total * 100);
    var isPerfect = (score === total);
    var isWin     = (score >= Math.ceil(total * 0.6));

    // Calcul XP
    var xpGained = score * XP_CORRECT + (isPerfect ? XP_PERFECT : 0);
    _state.xp = xpGained;

    // Étoiles
    var stars = [];
    for (var i = 0; i < total; i++) {
      stars.push(i < score ? '⭐' : '☆');
    }

    // GIF
    var gifPool = isPerfect ? GIFS.perfect : (isWin ? GIFS.win : GIFS.lose);
    var gif     = gifPool[Math.floor(Math.random() * gifPool.length)];

    // Titre résultat
    var titre = isPerfect ? '🏆 PARFAIT !' : (isWin ? '✅ BIEN JOUÉ !' : '💪 CONTINUE !');

    // Sauvegarder progression
    _saveProgression(score, total, xpGained);

    // Musique victoire/défaite
    if (typeof stopBGM === 'function') stopBGM();
    if (typeof playBGM === 'function') {
      setTimeout(function(){
        playBGM(isPerfect || isWin ? 'aot-victory' : 'aot-defeat');
      }, 300);
    }

    // SFX
    if (isPerfect && typeof sfxPerfect === 'function') sfxPerfect();
    else if (isWin && typeof sfxFanfare === 'function') sfxFanfare();

    // Rendu
    var container = document.getElementById('aot-qContainer');
    if (container) {
      container.innerHTML =
        '<div class="aot-result-card" style="--isle-color:' + (ch.ile_color || '#4a5c3f') + '">' +
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
            '<div class="aot-result-stars">' + stars.slice(0, 11).join('') + '</div>' +
            (gif ? '<img src="' + gif + '" class="aot-result-gif" onerror="this.style.display=\'none\'">' : '') +
            '<div class="aot-result-xp">+' + xpGained + ' XP ⚔️</div>' +
            '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._goBack()">' +
            '🗺️ RETOUR À LA CARTE</button>' +
            '<button class="aot-btn aot-btn-outline" style="margin-top:10px" ' +
            'onclick="window.AP_QuizEngine._retry()">' +
            '🔁 REJOUER</button>' +
          '</div>' +
        '</div>';
    }

    // Scroll vers résultats
    setTimeout(function(){
      var rc = container ? container.querySelector('.aot-result-card') : null;
      if (rc) rc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);

    // Session recap
    if (window.AP && window.AP.recap) {
      var islandId = _state.matiere + '_' + _state.niveau + '_' + ch.numero;
      window.AP.recap.show(_state.matiere, score, total, ch.numero, function() {
        _goBack();
      });
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SAUVEGARDE PROGRESSION
  // ══════════════════════════════════════════════════════════════

  async function _saveProgression(score, total, xp) {
    var ch = _state.chapitre;
    if (!ch) return;

    // island_id format : matiere_niveau_numero ex: english_cm2_1
    var islandId = _state.matiere + '_' + _state.niveau + '_' + ch.numero;

    // Sauvegarde locale
    try {
      var local = JSON.parse(localStorage.getItem('ap_english_progress') || '{}');
      local[islandId] = { score: score, total: total, xp: xp, date: Date.now() };
      localStorage.setItem('ap_english_progress', JSON.stringify(local));
    } catch(e) {}

    // Sauvegarde Supabase
    try {
      if (typeof dbSaveProgression === 'function') {
        await dbSaveProgression(islandId, score, total, xp);
      } else {
        var db = _getDb();
        if (db) {
          await db.from('progressions').upsert({
            island_id:    islandId,
            score:        score,
            total:        total,
            xp:           xp,
            completed_at: new Date().toISOString(),
            created_at:   new Date().toISOString(),
          }, { onConflict: 'island_id,child_id' });
        }
      }
    } catch(e) {
      console.warn('[QuizEngine] Sauvegarde DB échouée:', e.message);
    }

    // Mise à jour XP global
    try {
      if (window.AP && typeof window.AP.addXP === 'function') {
        window.AP.addXP(xp);
      } else if (typeof updateHUD === 'function') {
        updateHUD();
      }
    } catch(e) {}
  }

  // ══════════════════════════════════════════════════════════════
  // NAVIGATION
  // ══════════════════════════════════════════════════════════════

  function _goBack() {
    if (typeof stopBGM === 'function') stopBGM();

    var quizEl  = document.getElementById('aot-quiz-sec');
    var ilesEl  = document.getElementById('aot-iles-sec');
    if (quizEl) quizEl.style.display = 'none';
    if (ilesEl) ilesEl.style.display = 'block';

    _state.answers = {};
    window.scrollTo(0, 0);

    if (typeof playBGM === 'function') {
      setTimeout(function(){ playBGM('aot-map'); }, 300);
    }

    if (typeof _state.onBack === 'function') _state.onBack();
  }

  function _retry() {
    _state.answers  = {};
    _state.score    = 0;
    _state.currentQ = 0;

    _renderHeader();
    _renderQuestion(0);

    if (_state.chapitre && _state.chapitre.bgm) {
      if (typeof stopBGM === 'function') stopBGM();
      if (typeof playBGM === 'function') {
        setTimeout(function(){ playBGM(_state.chapitre.bgm); }, 300);
      }
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

  // ── Charger les chapitres d'un monde+niveau ──────────────────
  async function getChapitres(matiereCode, niveauCode) {
    var db = _getDb();
    if (!db) return [];
    try {
      var res = await db.from('v_chapitres_complets')
        .select('*')
        .eq('matiere_code', matiereCode)
        .eq('niveau_code',  niveauCode)
        .order('ordre_affichage', { ascending: true });
      return (res.data || []);
    } catch(e) {
      console.error('[QuizEngine] getChapitres:', e.message);
      return [];
    }
  }

  // ── Charger progression locale ──────────────────────────────
  function getLocalProgress(matiereCode, niveauCode) {
    try {
      var key  = 'ap_' + matiereCode + '_progress';
      var data = JSON.parse(localStorage.getItem(key) || '{}');
      var result = {};
      Object.keys(data).forEach(function(k) {
        if (k.startsWith(matiereCode + '_' + niveauCode)) {
          result[k] = data[k];
        }
      });
      return result;
    } catch(e) { return {}; }
  }

  // ══════════════════════════════════════════════════════════════
  // EXPORT GLOBAL
  // ══════════════════════════════════════════════════════════════

  window.AP_QuizEngine = {
    launch:           launch,
    getChapitres:     getChapitres,
    getLocalProgress: getLocalProgress,
    // Méthodes exposées pour les onclick inline
    _selectOpt:       _selectOpt,
    _nextQuestion:    _nextQuestion,
    _showResults:     _showResults,
    _goBack:          _goBack,
    _retry:           _retry,
  };

  console.info('⚙️ quiz-engine.js v1 chargé — moteur DB réutilisable tous mondes');

})();
