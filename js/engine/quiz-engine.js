// ═══════════════════════════════════════════════════════════════
// QUIZ-ENGINE.JS V5.1 — Académie Pirate
// + GIFs configurables via opts.gifs — si vide = pas de GIF
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var _currentChapitre = null;
  var _currentNiveau   = null;
  var _currentMatiere  = null;
  var _questions       = [];
  var _answers         = {};
  var _xp              = 0;
  var _onBack          = null;

  // IDs configurables
  var _quizSecId   = 'aot-quiz-sec';
  var _ilesSecId   = 'aot-iles-sec';
  var _containerId = 'aot-qContainer';
  var _titleId     = 'aot-qTitle';
  var _progFillId  = 'aot-qProgFill';
  var _progLblId   = 'aot-qProgLbl';
  var _bgmBack     = 'aot-map';

  // ▼ GIFs configurables — défaut = AOT (rétro-compat English)
  var _gifsP = [];  // perfect
  var _gifsC = [];  // correct (>60%)
  var _gifsL = [];  // lose (<60%)

  var STORAGE_AOT = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot';
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

  // ═══════════════════════════════════════════════════════════
  // 1. ENTRÉE
  // ═══════════════════════════════════════════════════════════
  async function launch(chapitreId, opts) {
    opts = opts || {};
    _onBack         = opts.onBack   || null;
    _currentNiveau  = opts.niveau   || 'cm2';
    _currentMatiere = opts.matiere  || 'english';
    _answers        = {};
    _xp             = 0;

    _quizSecId   = opts.quizSecId   || 'aot-quiz-sec';
    _ilesSecId   = opts.ilesSecId   || 'aot-iles-sec';
    _containerId = opts.containerId || 'aot-qContainer';
    _titleId     = opts.titleId     || 'aot-qTitle';
    _progFillId  = opts.progFillId  || 'aot-qProgFill';
    _progLblId   = opts.progLblId   || 'aot-qProgLbl';
    _bgmBack     = opts.bgmBack     || 'aot-map';

    // ▼ GIFs : si opts.gifs passé → utiliser. Sinon → défaut AOT
    if (opts.gifs) {
      _gifsP = opts.gifs.perfect || [];
      _gifsC = opts.gifs.correct || [];
      _gifsL = opts.gifs.lose    || [];
    } else {
      _gifsP = AOT_GIFS_PERFECT;
      _gifsC = AOT_GIFS_CORRECT;
      _gifsL = AOT_GIFS_LOSE;
    }

    try {
      var db = _getDb();
      var resC = await db.from('chapitres').select('*').eq('id', chapitreId).single();
      if (resC.error) throw new Error(resC.error.message);
      _currentChapitre = resC.data;

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

      _showSection();
      _launchIsland();

      if (typeof stopBGM === 'function') stopBGM();
      if (_currentChapitre.bgm && typeof playBGM === 'function') {
        setTimeout(function(){ playBGM(_currentChapitre.bgm); }, 300);
      }
    } catch(e) {
      console.error('[QuizEngine] Erreur:', e.message);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 2. AFFICHER SECTION
  // ═══════════════════════════════════════════════════════════
  function _showSection() {
    var quizEl = document.getElementById(_quizSecId);
    if (quizEl) { quizEl.style.display = 'block'; quizEl.style.zIndex = '5'; }
    window.scrollTo(0, 0);
  }

  // ═══════════════════════════════════════════════════════════
  // 3. RENDU DES QUESTIONS
  // ═══════════════════════════════════════════════════════════
  function _launchIsland() {
    _answers = {};
    var ch = _currentChapitre, qs = _questions, total = qs.length;
    var keys = ['A','B','C','D'];

    var titleEl    = document.getElementById(_titleId);
    var progFillEl = document.getElementById(_progFillId);
    var progLblEl  = document.getElementById(_progLblId);
    if (titleEl)    titleEl.textContent    = ch.nom + ' — ' + ch.topic;
    if (progFillEl) progFillEl.style.width = '0%';
    if (progLblEl)  progLblEl.textContent  = '0 / ' + total;

    var msgs = [
      'Montre-moi ce que tu sais !',
      'Réfléchis bien avant de répondre.',
      'Chaque bonne réponse te rapproche de la victoire !',
      'Tu peux le faire !', 'Concentre-toi !',
      'Ne lâche pas !', 'Presque fini, tiens bon !',
      'Tu es sur la bonne voie !',
    ];

    var html = '';
    qs.forEach(function(q, i) {
      var opts = [];
      try { opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options; } catch(e) {}

      var isBoss = q.is_boss || q.type === 'boss'
                || ((ch.numero === 8 || ch.numero === '8') && i === qs.length - 1);
      var msg = msgs[i % msgs.length];
      var avatar = ch.hero_image || '', heroName = ch.hero_name || '';

      var bossBanner = isBoss
        ? '<div class="aot-boss-banner">' +
            '<div class="aot-boss-label">⚔️ COMBAT FINAL</div>' +
            '<div class="aot-boss-name">' + (ch.boss_name || 'BOSS') + '</div>' +
          '</div>'
        : '';

      var optsHtml = opts.map(function(opt, j) {
        var safe = String(opt).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return '<label class="aot-opt" id="aot-lbl'+i+'_'+j+'" ' +
          'data-qi="'+i+'" data-oi="'+j+'" data-v="'+safe+'" ' +
          'onclick="window.AP_QuizEngine._selectOpt(this.dataset.qi,this.dataset.oi,this.dataset.v)">' +
          '<span class="aot-opt-key">'+keys[j]+'</span>' +
          '<span class="aot-opt-txt">'+String(opt)+'</span>' +
          '</label>';
      }).join('');

      html +=
        '<div class="aot-q-card'+(isBoss?' aot-boss-card':'')+'" id="aot-qcard-'+i+'">' +
          bossBanner +
          '<div class="aot-char-panel">' +
            '<div class="aot-char-img">' +
              '<img src="'+avatar+'" alt="'+heroName+'" onerror="this.style.display=\'none\'">' +
            '</div>' +
            '<div class="aot-char-speech">' +
              '<div class="aot-char-name">'+heroName+'</div>' +
              '<div class="aot-speech-bubble">'+msg+'</div>' +
            '</div>' +
          '</div>' +
          '<div class="aot-q-body">' +
            '<div class="aot-q-num">Question '+(i+1)+' / '+total+'</div>' +
            '<div class="aot-q-txt">'+q.question+'</div>' +
            '<div class="aot-opts">'+optsHtml+'</div>' +
            '<div class="aot-feedback" id="aot-fb'+i+'"></div>' +
            '<div class="aot-expl" id="aot-expl'+i+'"></div>' +
          '</div>' +
        '</div>';
    });

    html += '<div class="aot-submit-wrap">' +
      '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._corriger()">⚔️ CORRIGER MES RÉPONSES</button>' +
      '</div>';

    var container = document.getElementById(_containerId);
    if (container) container.innerHTML = html;

    var bossQ = qs.find(function(q){ return q.is_boss || q.type === 'boss'; });
    if ((bossQ || ch.numero === 8 || ch.numero === '8') && window.AP && window.AP.boss) {
      var bossName = ch.boss_name || (bossQ && bossQ.boss_name) || 'BOSS';
      window.AP.boss.init(_currentMatiere, bossName, '', 1);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 4. SÉLECTION
  // ═══════════════════════════════════════════════════════════
  function _selectOpt(qi, oi, val) {
    qi = parseInt(qi); oi = parseInt(oi);
    var opts = _questions[qi] ? (typeof _questions[qi].options === 'string'
      ? JSON.parse(_questions[qi].options) : _questions[qi].options) : [];
    for (var j = 0; j < opts.length; j++) {
      var lbl = document.getElementById('aot-lbl'+qi+'_'+j);
      if (lbl) lbl.classList.remove('aot-selected');
    }
    var sel = document.getElementById('aot-lbl'+qi+'_'+oi);
    if (sel) sel.classList.add('aot-selected');
    _answers[qi] = val;
    var filled = Object.keys(_answers).length, ttl = _questions.length;
    var fillEl = document.getElementById(_progFillId);
    var lblEl  = document.getElementById(_progLblId);
    if (fillEl) fillEl.style.width = Math.round(filled/ttl*100) + '%';
    if (lblEl)  lblEl.textContent  = filled + ' / ' + ttl;
  }

  // ═══════════════════════════════════════════════════════════
  // 5. CORRECTION
  // ═══════════════════════════════════════════════════════════
  function _corriger() {
    var qs = _questions, ch = _currentChapitre, score = 0;
    qs.forEach(function(q, i) {
      var fb = document.getElementById('aot-fb'+i);
      var expl = document.getElementById('aot-expl'+i);
      var ans = _answers[i];
      var lbls = document.querySelectorAll('[id^="aot-lbl'+i+'_"]');
      lbls.forEach(function(lbl) {
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
          fb.className = 'aot-feedback aot-ko';
        }
        var selLbl = ans ? document.querySelector('[id^="aot-lbl'+i+'_"][data-v="'+String(ans).replace(/"/g,'&quot;')+'"]') : null;
        if (selLbl) selLbl.classList.add('aot-wrong');
        if (typeof sfxKO === 'function') sfxKO();
      }
      if (expl) { expl.innerHTML = '💡 ' + (q.explication || ''); expl.classList.add('aot-show'); }
    });

    if (window.AP && window.AP.boss && window.AP.boss.isActive()) {
      var hasBoss = qs.some(function(q){ return q.is_boss||q.type==='boss'; }) || ch.numero===8 || ch.numero==='8';
      if (hasBoss) window.AP.boss.hit(score >= Math.ceil(qs.length*0.6), true);
    }
    _xp += score * 2;
    var fillEl = document.getElementById(_progFillId);
    var lblEl  = document.getElementById(_progLblId);
    if (fillEl) fillEl.style.width = '100%';
    if (lblEl)  lblEl.textContent  = qs.length + ' / ' + qs.length;
    _saveProgression(score, qs.length, score*2);
    _showResults(score);
  }

  // ═══════════════════════════════════════════════════════════
  // 6. RÉSULTATS
  // ═══════════════════════════════════════════════════════════
  function _showResults(score) {
    var ch = _currentChapitre, total = _questions.length;
    var txts = [
      { min:11, t:'LÉGENDAIRE ! 11/11 !!!' },
      { min:9,  t:'EXCELLENT ! Niveau Capitaine !' },
      { min:7,  t:'Bien joué, combattant confirmé !' },
      { min:5,  t:"Continue l'entraînement !" },
      { min:0,  t:'Ne lâche pas ! Réessaie !' }
    ];
    var res = txts.find(function(r){ return score>=r.min; }) || txts[txts.length-1];
    var gained = score * 2;

    // ▼ GIF : n'afficher que si des GIFs sont configurés
    var gif = '';
    if (_gifsP.length || _gifsC.length || _gifsL.length) {
      gif = score === total
        ? (_gifsP[Math.floor(Math.random() * Math.max(1,_gifsP.length))] || '')
        : score >= Math.ceil(total * 0.6)
          ? (_gifsC[score % Math.max(1,_gifsC.length)] || '')
          : (_gifsL[0] || '');
    }

    var stars = _questions.map(function(_,i){ return i<score?'⭐':'☆'; }).join('');

    var html =
      '<div class="aot-result-card" id="aot-resCard" style="--isle-color:'+(ch.ile_color||'#4a5c3f')+'">' +
        '<div class="aot-result-banner">' +
          '<img src="'+(ch.hero_image||'')+'" class="aot-result-avatar" onerror="this.style.display=\'none\'">' +
          '<div class="aot-result-score-wrap">' +
            '<div class="aot-result-score">'+score+'/'+total+'</div>' +
            '<div class="aot-result-title">'+res.t+'</div>' +
          '</div>' +
        '</div>' +
        '<div class="aot-result-body">' +
          '<div class="aot-result-topic">🏴‍☠️ '+(ch.topic||'')+'</div>' +
          '<div class="aot-result-stars">'+stars+'</div>' +
          (gif ? '<img src="'+gif+'" class="aot-result-gif" onerror="this.style.display=\'none\'">' : '') +
          '<div class="aot-result-xp">+'+gained+' XP — Total : '+_xp+' XP</div>' +
          '<button class="aot-btn aot-btn-main" onclick="window.AP_QuizEngine._goBack()">🗺️ RETOUR À LA CARTE</button>' +
          '<button class="aot-btn aot-btn-outline" style="margin-top:10px" onclick="window.AP_QuizEngine._retry()">🔁 REJOUER</button>' +
        '</div>' +
      '</div>';

    var c = document.getElementById(_containerId);
    if (c) c.innerHTML += html;

    setTimeout(function(){
      var rc = document.getElementById('aot-resCard');
      if (rc) rc.scrollIntoView({ behavior:'smooth', block:'center' });
    }, 400);

    if (score === total && typeof sfxPerfect === 'function') sfxPerfect();
  }

  // ═══════════════════════════════════════════════════════════
  // 7. NAVIGATION
  // ═══════════════════════════════════════════════════════════
  function _goBack() {
    var quizEl = document.getElementById(_quizSecId);
    if (quizEl) quizEl.style.display = 'none';
    if (typeof playBGM === 'function') playBGM(_bgmBack);
    _answers = {};
    window.scrollTo(0, 0);
    if (typeof _onBack === 'function') _onBack();
  }

  function _retry() {
    _answers = {};
    var container = document.getElementById(_containerId);
    if (container) container.innerHTML = '';
    var ch = _currentChapitre;
    if (_currentMatiere === 'francais' && typeof lesson_grand_bleu === 'function') {
      lesson_grand_bleu(_currentNiveau, ch.numero, function(){ _launchIsland(); });
    } else if (_currentMatiere === 'english' && typeof lesson_english === 'function') {
      lesson_english(_currentNiveau, ch.numero, function(){ _launchIsland(); });
    } else {
      _launchIsland();
    }
    window.scrollTo(0, 0);
  }

  // ═══════════════════════════════════════════════════════════
  // 8. SAUVEGARDE
  // ═══════════════════════════════════════════════════════════
  async function _saveProgression(score, total, xp) {
    var ch = _currentChapitre;
    if (!ch) return;
    var islandId = _currentMatiere + '_' + _currentNiveau + '_' + ch.numero;
    try {
      var key = 'ap_' + _currentMatiere + '_progress';
      var local = JSON.parse(localStorage.getItem(key) || '{}');
      local[islandId] = { score:score, total:total, xp:xp, date:Date.now() };
      localStorage.setItem(key, JSON.stringify(local));
    } catch(e) {}
    try {
      var db = _getDb();
      if (db) {
        await db.from('progressions').upsert({
          island_id: islandId, score:score, total:total, xp:xp,
          updated_at: new Date().toISOString()
        }, { onConflict:'island_id' });
      }
    } catch(e) { console.warn('[QuizEngine] save:', e.message); }
    try { if (typeof updateHUD === 'function') updateHUD(); } catch(e) {}
  }

  // ═══════════════════════════════════════════════════════════
  // 9. UTILITAIRES
  // ═══════════════════════════════════════════════════════════
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
        .eq('niveau_code', niveauCode)
        .order('ordre_affichage', { ascending: true });
      return res.data || [];
    } catch(e) { console.error('[QuizEngine] getChapitres:', e.message); return []; }
  }

  function getLocalProgress(matiereCode, niveauCode) {
    try {
      var key = 'ap_' + matiereCode + '_progress';
      var data = JSON.parse(localStorage.getItem(key) || '{}');
      var out = {};
      Object.keys(data).forEach(function(k) {
        if (k.startsWith(matiereCode + '_' + niveauCode)) out[k] = data[k];
      });
      return out;
    } catch(e) { return {}; }
  }

  // ═══════════════════════════════════════════════════════════
  // 10. EXPORT
  // ═══════════════════════════════════════════════════════════
  window.AP_QuizEngine = {
    launch: launch, getChapitres: getChapitres, getLocalProgress: getLocalProgress,
    _selectOpt: _selectOpt, _corriger: _corriger, _goBack: _goBack, _retry: _retry,
  };

  console.info('⚙️ quiz-engine.js v5.1 — IDs configurables + GIFs configurables · multi-monde');
})();
