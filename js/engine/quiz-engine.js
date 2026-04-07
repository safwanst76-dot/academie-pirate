// ═══════════════════════════════════════════════════════════════
// QUIZ-ENGINE.JS V4 — Académie Pirate
// Pattern PIXEL-PERFECT du pays-du-feu :
//   1. Toutes les questions d'un coup (innerHTML = html)
//   2. Bouton "Corriger" TOUJOURS visible en bas
//   3. corriger() → colore + feedback + expl + appelle showResults()
//   4. showResults() → innerHTML += html (append à la FIN)
//   5. setTimeout 400ms → scrollIntoView block:'center'
//   6. PAS de scrollTo(0,0) dans corriger/showResults
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── État ──────────────────────────────────────────────────────
  var _currentChapitre = null;
  var _currentNiveau   = null;
  var _currentMatiere  = null;
  var _questions       = [];
  var _answers         = {};
  var _xp              = 0;
  var _onBack          = null;

  var STORAGE_AOT = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot';

  // GIFs résultats — bucket island-aot/gifs/
  var AOT_GIFS_PERFECT = [
    STORAGE_AOT + '/gifs/aot-perfect-1.gif',
    STORAGE_AOT + '/gifs/aot-perfect-2.gif',
    STORAGE_AOT + '/gifs/aot-perfect-3.gif',
  ];
  var AOT_GIFS_CORRECT = [
    STORAGE_AOT + '/gifs/aot-win-1.gif',
    STORAGE_AOT + '/gifs/aot-win-2.gif',
    STORAGE_AOT + '/gifs/aot-win-3.gif',
    STORAGE_AOT + '/gifs/aot-win-4.gif',
    STORAGE_AOT + '/gifs/aot-win-5.gif',
  ];
  var AOT_GIFS_LOSE = [
    STORAGE_AOT + '/gifs/aot-lose-1.gif',
    STORAGE_AOT + '/gifs/aot-lose-2.gif',
    STORAGE_AOT + '/gifs/aot-lose-3.gif',
  ];

  // ══════════════════════════════════════════════════════════════
  // 1. POINT D'ENTRÉE
  // ══════════════════════════════════════════════════════════════

  async function launch(chapitreId, opts) {
    opts = opts || {};
    _onBack          = opts.onBack   || null;
    _currentNiveau   = opts.niveau   || 'cm2';
    _currentMatiere  = opts.matiere  || 'english';
    _answers         = {};
    _xp              = 0;

    try {
      // Charger chapitre
      var db = _getDb();
      var resC = await db.from('chapitres').select('*').eq('id', chapitreId).single();
      if (resC.error) throw new Error(resC.error.message);
      _currentChapitre = resC.data;

      // Charger questions
      var resQ = await db.from('questions')
        .select('*')
        .eq('chapitre_id', chapitreId)
        .eq('actif', true)
        .order('ordre', { ascending: true });
      if (resQ.error) throw new Error(resQ.error.message);
      _questions = resQ.data || [];

      if (!_questions.length) {
        console.error('[QuizEngine] Aucune question:', chapitreId);
        return;
      }

      // Afficher section quiz
      _showSection();

      // Lancer le rendu (identique à pdf_launchIsland)
      _launchIsland();

      // Musique (après leçon — règle AU-04)
      if (typeof stopBGM === 'function') stopBGM();
      if (_currentChapitre.bgm && typeof playBGM === 'function') {
        setTimeout(function(){ playBGM(_currentChapitre.bgm); }, 300);
      }

    } catch(e) {
      console.error('[QuizEngine] Erreur:', e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 2. AFFICHER SECTION QUIZ + MASQUER TOUT
  // ══════════════════════════════════════════════════════════════

  function _showSection() {
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
  // 3. RENDU DES QUESTIONS — identique à pdf_launchIsland
  // ══════════════════════════════════════════════════════════════

  function _launchIsland() {
    _answers = {};

    var ch    = _currentChapitre;
    var qs    = _questions;
    var total = qs.length;
    var keys  = ['A','B','C','D'];

    // Header
    document.getElementById('aot-qTitle').textContent    = ch.nom + ' — ' + ch.topic;
    document.getElementById('aot-qProgFill').style.width = '0%';
    document.getElementById('aot-qProgLbl').textContent  = '0 / ' + total;

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
      var avatar   = ch.hero_image || '';
      var heroName = ch.hero_name  || '';

      var bossBanner = isBoss
        ? '<div class="aot-boss-banner">' +
            '<div class="aot-boss-label">⚔️ COMBAT FINAL — TITAN</div>' +
            '<div class="aot-boss-name">' + (ch.boss_name || 'TITAN COLOSSAL') + '</div>' +
          '</div>'
        : '';

      // Labels cliquables — identique à pdf-lbl pattern
      var optsHtml = opts.map(function(opt, j) {
        var safe = String(opt).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return '<label class="aot-opt" ' +
          'id="aot-lbl' + i + '_' + j + '" ' +
          'data-qi="' + i + '" data-oi="' + j + '" data-v="' + safe + '" ' +
          'onclick="window.AP_QuizEngine._selectOpt(this.dataset.qi,this.dataset.oi,this.dataset.v)">' +
          '<span class="aot-opt-key">' + keys[j] + '</span>' +
          '<span class="aot-opt-txt">' + String(opt) + '</span>' +
          '</label>';
      }).join('');

      html +=
        '<div class="aot-q-card' + (isBoss ? ' aot-boss-card' : '') + '" id="aot-qcard-' + i + '">' +
          bossBanner +
          '<div class="aot-char-panel">' +
            '<div class="aot-char-img">' +
              '<img src="' + avatar + '" alt="' + heroName + '" ' +
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
            '<div class="aot-expl"     id="aot-expl' + i + '"></div>' +
          '</div>' +
        '</div>';
    });

    // Bouton corriger TOUJOURS visible en bas (pattern exact V1)
    html +=
      '<div class="aot-submit-wrap">' +
        '<button class="aot-btn aot-btn-main" ' +
          'onclick="window.AP_QuizEngine._corriger()">⚔️ CORRIGER MES RÉPONSES</button>' +
      '</div>';

    // innerHTML = html (pattern exact V1 — PAS +=)
    document.getElementById('aot-qContainer').innerHTML = html;

    // ── Boss battle English (pattern identique aux autres mondes) ──
    var bossQ = qs.find(function(q) { return q.is_boss || q.type === 'boss'; });
    if (bossQ && window.AP && window.AP.boss) {
      var bossName = ch.boss_name || bossQ.boss_name || 'Titan Colossal';
      window.AP.boss.init('english', bossName, '', 1);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 4. SÉLECTION — identique à pdf_selectOpt
  // ══════════════════════════════════════════════════════════════

  function _selectOpt(qi, oi, val) {
    qi = parseInt(qi); oi = parseInt(oi);
    var total = _questions[qi] ? (typeof _questions[qi].options === 'string'
      ? JSON.parse(_questions[qi].options) : _questions[qi].options).length : 4;

    // Déselectionner les autres labels de cette question
    for (var j = 0; j < total; j++) {
      var lbl = document.getElementById('aot-lbl' + qi + '_' + j);
      if (lbl) lbl.classList.remove('aot-selected');
    }
    var sel = document.getElementById('aot-lbl' + qi + '_' + oi);
    if (sel) sel.classList.add('aot-selected');

    _answers[qi] = val;

    // Barre de progression
    var filled = Object.keys(_answers).length;
    var ttl    = _questions.length;
    var fillEl = document.getElementById('aot-qProgFill');
    var lblEl  = document.getElementById('aot-qProgLbl');
    if (fillEl) fillEl.style.width = Math.round(filled / ttl * 100) + '%';
    if (lblEl)  lblEl.textContent  = filled + ' / ' + ttl;
  }

  // ══════════════════════════════════════════════════════════════
  // 5. CORRECTION — identique à pdf_corriger
  // ══════════════════════════════════════════════════════════════

  function _corriger() {
    var qs    = _questions;
    var ch    = _currentChapitre;
    var score = 0;

    qs.forEach(function(q, i) {
      var fb   = document.getElementById('aot-fb' + i);
      var expl = document.getElementById('aot-expl' + i);
      var ans  = _answers[i];
      var opts = document.querySelectorAll('[id^="aot-lbl' + i + '_"]');

      // Colorer les labels
      opts.forEach(function(lbl) {
        lbl.style.pointerEvents = 'none';
        if (lbl.dataset.v === q.reponse) lbl.classList.add('aot-correct');
      });

      if (ans === q.reponse) {
        score++;
        if (fb) { fb.textContent = '✅ Correct !'; fb.className = 'aot-feedback aot-ok'; }
        if (typeof sfxOK === 'function') sfxOK();
      } else {
        if (fb) {
          fb.textContent = '❌ ' + (ans ? 'Mauvaise réponse.' : 'Non répondu.');
          fb.className   = 'aot-feedback aot-ko';
        }
        var selLbl = ans
          ? document.querySelector('[id^="aot-lbl' + i + '_"][data-v="' + String(ans).replace(/"/g,'&quot;') + '"]')
          : null;
        if (selLbl) selLbl.classList.add('aot-wrong');
        if (typeof sfxKO === 'function') sfxKO();
      }

      // Explication
      if (expl) {
        expl.innerHTML = '💡 ' + (q.explication || '');
        expl.classList.add('aot-show');
      }
    });

    // ── Boss battle hit (English — pattern identique aux autres mondes) ──
    if (window.AP && window.AP.boss && window.AP.boss.isActive()) {
      var hasBossQ = qs.some(function(q) { return q.is_boss || q.type === 'boss'; });
      if (hasBossQ) {
        var isCorrect = score >= Math.ceil(qs.length * 0.6); // 60%+ = victoire
        window.AP.boss.hit(isCorrect, true);
      }
    }

    // XP
    _xp += score * 2;

    // Barre à 100%
    var fillEl = document.getElementById('aot-qProgFill');
    var lblEl  = document.getElementById('aot-qProgLbl');
    if (fillEl) fillEl.style.width = '100%';
    if (lblEl)  lblEl.textContent  = qs.length + ' / ' + qs.length;

    // Sauvegarder
    _saveProgression(score, qs.length, score * 2);

    // Afficher résultats (PAS de scrollTo ici — identique V1)
    _showResults(score);
  }

  // ══════════════════════════════════════════════════════════════
  // 6. RÉSULTATS — identique à pdf_showResults
  //    innerHTML += html  →  append à la FIN
  //    setTimeout 400ms  →  scrollIntoView block:'center'
  // ══════════════════════════════════════════════════════════════

  function _showResults(score) {
    var ch    = _currentChapitre;
    var total = _questions.length;

    var txts = [
      { min: 11, t: 'LÉGENDE DE PARADIS ! 11/11 !!!' },
      { min: 9,  t: 'EXCELLENT ! Niveau Capitaine !' },
      { min: 7,  t: 'Bien joué, Soldat confirmé !' },
      { min: 5,  t: 'Continue l\'entraînement !' },
      { min: 0,  t: 'Ne lâche pas ! Réessaie !' }
    ];
    var res    = txts.find(function(r){ return score >= r.min; }) || txts[txts.length-1];
    var gained = score * 2;

    // GIF selon score — identique V1
    var gif = score === total
      ? AOT_GIFS_PERFECT[Math.floor(Math.random() * AOT_GIFS_PERFECT.length)]
      : score >= Math.ceil(total * 0.6)
        ? AOT_GIFS_CORRECT[score % AOT_GIFS_CORRECT.length]
        : AOT_GIFS_LOSE[0];

    var stars = _questions.map(function(_, i){ return i < score ? '⭐' : '☆'; }).join('');

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
          '<div class="aot-result-xp">+' + gained + ' XP Anglais ⚔️ — Total : ' + _xp + ' XP</div>' +
          '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._goBack()">🗺️ RETOUR À LA CARTE</button>' +
          '<button class="aot-btn aot-btn-outline" style="margin-top:10px" onclick="window.AP_QuizEngine._retry()">🔁 REJOUER</button>' +
        '</div>' +
      '</div>';

    // ⚠️ PATTERN EXACT V1 : c.innerHTML += html  (append à la FIN, PAS de remplacement)
    var c = document.getElementById('aot-qContainer');
    if (c) c.innerHTML += html;

    // ⚠️ PATTERN EXACT V1 : PAS de scrollTo(0,0) — scroll vers la result-card après 400ms
    setTimeout(function(){
      var rc = document.getElementById('aot-resCard');
      if (rc) rc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);

    // SFX + musique — identique V1
    if (score === total && typeof sfxPerfect === 'function') sfxPerfect();
    else if (score >= Math.ceil(total * 0.6) && typeof sfxFanfare === 'function') sfxFanfare();
  }

  // ══════════════════════════════════════════════════════════════
  // 7. NAVIGATION — identique à pdf_goBack / pdf_retry
  // ══════════════════════════════════════════════════════════════

  function _goBack() {
    if (typeof playBGM === 'function') playBGM('aot-map');
    var quizEl = document.getElementById('aot-quiz-sec');
    var ilesEl = document.getElementById('aot-iles-sec');
    if (quizEl) quizEl.style.display = 'none';
    if (ilesEl) ilesEl.style.display = 'block';
    _answers = {};
    window.scrollTo(0, 0);
    if (typeof _onBack === 'function') _onBack();
  }

  function _retry() {
    _answers = {};
    if (typeof lesson_english === 'function') {
      lesson_english(_currentNiveau, _currentChapitre.numero, function() {
        _launchIsland();
        if (_currentChapitre.bgm && typeof playBGM === 'function') {
          setTimeout(function(){ playBGM(_currentChapitre.bgm); }, 300);
        }
      });
    } else {
      _launchIsland();
    }
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════════════════════════════
  // 8. SAUVEGARDE
  // ══════════════════════════════════════════════════════════════

  async function _saveProgression(score, total, xp) {
    var ch = _currentChapitre;
    if (!ch) return;
    var islandId = _currentMatiere + '_' + _currentNiveau + '_' + ch.numero;

    // Local
    try {
      var key   = 'ap_' + _currentMatiere + '_progress';
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
      console.warn('[QuizEngine] save:', e.message);
    }

    try { if (typeof updateHUD === 'function') updateHUD(); } catch(e) {}
  }

  // ══════════════════════════════════════════════════════════════
  // 9. UTILITAIRES
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
      var out  = {};
      Object.keys(data).forEach(function(k) {
        if (k.startsWith(matiereCode + '_' + niveauCode)) out[k] = data[k];
      });
      return out;
    } catch(e) { return {}; }
  }

  // ══════════════════════════════════════════════════════════════
  // 10. EXPORT GLOBAL
  // ══════════════════════════════════════════════════════════════

  window.AP_QuizEngine = {
    launch:           launch,
    getChapitres:     getChapitres,
    getLocalProgress: getLocalProgress,
    // Exposés pour onclick inline
    _selectOpt:  _selectOpt,
    _corriger:   _corriger,
    _goBack:     _goBack,
    _retry:      _retry,
  };

  console.info('⚙️ quiz-engine.js v4 — pattern pixel-perfect V1 (pays-du-feu)');

})();
