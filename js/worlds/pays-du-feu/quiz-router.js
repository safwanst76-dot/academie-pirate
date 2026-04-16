// ═══════════════════════════════════════════════════════════════════
// QUIZ-ROUTER-PAYS-DU-FEU.JS V3 — Académie Pirate
// 🔥 Pays du Feu · Maths · Naruto
// Pattern : Grand Bleu V3 (référence mondiale)
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var _currentNiveau = null;
  var _chapitres     = [];
  var MATIERE_CODE   = 'maths';

  // ── Cinématiques CIN-01 : clé 'niveau_numero' ──────────────────
  var PDF_ISLE_INTRO = {
    'cm2_1': { bg:'#0d0500', lines:['NARUTO UZUMAKI…','… ouvre son carnet de maths !!','LES GRANDS NOMBRES T\'ATTENDENT !'], kanji:'数字 !!', kanjiColor:'#F97316', bubble:"Crois en toi ! Les milliards n'ont aucun secret pour un futur Hokage !" },
    'cm2_2': { bg:'#0d0005', lines:['SAKURA HARUNO…','… sort ses potions de fractions !!','NUMÉRATEUR VS DÉNOMINATEUR !'], kanji:'分数 !!', kanjiColor:'#ec4899', bubble:"Concentration maximale ! Une fraction c'est juste une pizza découpée !" },
    'cm2_3': { bg:'#000510', lines:['SASUKE UCHIHA…','… active son Sharingan des tables !!','LA MULTIPLICATION NE ME TROMPERA PAS !'], kanji:'乗算 !!', kanjiColor:'#3b82f6', bubble:"Je ne perdrai jamais… face à une multiplication. Prépare-toi !" },
    'cm2_4': { bg:'#050505', lines:['KAKASHI HATAKE…','… aligne ses virgules au millimètre !!','VIRGULES ALIGNÉES — VICTOIRE ASSURÉE !'], kanji:'小数 !!', kanjiColor:'#6b7280', bubble:"Désolé d'être en retard… j'alignais mes décimaux. Suis-moi !" },
    'cm2_5': { bg:'#001000', lines:['ROCK LEE…','… soulève 500 kg de conversions !!','L\'ENTRAÎNEMENT EST LA CLÉ !'], kanji:'変換 !!', kanjiColor:'#22c55e', bubble:"Je ne suis pas un génie, mais je maîtrise TOUTES les conversions !" },
    'cm2_6': { bg:'#0a0018', lines:['HINATA HYUGA…','… mesure chaque côté avec précision !!','PÉRIMÈTRE ET AIRE — MA SPÉCIALITÉ !'], kanji:'面積 !!', kanjiColor:'#a855f7', bubble:"N-Naruto-kun… je vais t'expliquer la différence entre aire et périmètre !" },
    'cm2_7': { bg:'#0a0402', lines:['GAARA DU DÉSERT…','… sculpte des figures dans le sable !!','LA GÉOMÉTRIE EST MON ART !'], kanji:'幾何学 !!', kanjiColor:'#92400e', bubble:"Ma technique favorite ? La symétrie axiale. Prépare-toi !" },
    'cm2_8': { bg:'#1a0000', lines:['L\'HOKAGE LANCE SON DÉFI…','… OROCHIMARU SURGIT !!','PROPORTIONNALITÉ — BOSS FINAL CM2 !'], kanji:'比例 !!', kanjiColor:'#dc2626', bubble:"Tu as survécu jusqu'ici ? La proportionnalité décidera de tout !" },
    '6eme_1': { bg:'#0d0500', lines:['NARUTO — NIVEAU GENIN…','… la numération du collège l\'attend !!','DÉCIMAUX ET ENTIERS SOUS CONTRÔLE !'], kanji:'数 !!', kanjiColor:'#F97316', bubble:"6ème ? Piece of cake pour un futur Hokage !" },
    '6eme_2': { bg:'#0d0005', lines:['HINATA…','… fractions niveau collège !!','MÊME DÉNOMINATEUR !'], kanji:'分', kanjiColor:'#ec4899', bubble:"Les fractions de même dénominateur, c'est parti !" },
    '6eme_3': { bg:'#000510', lines:['SHIKAMARU…','… proportionnalité !!','C\'EST TROUBLANT…'], kanji:'比', kanjiColor:'#3b82f6', bubble:"Quel problème troublant… mais je vais le résoudre !" },
    '6eme_4': { bg:'#050505', lines:['INO…','… angles et droites !!','PRÉCISION !!'], kanji:'角', kanjiColor:'#ec4899', bubble:"Construire un angle à 47° ? Simple pour moi !" },
    '6eme_5': { bg:'#001000', lines:['CHOJI…','… aires et périmètres !!','POUR LES PIZZAS !'], kanji:'周', kanjiColor:'#22c55e', bubble:"Je calcule l'aire de chaque pizza avant de la manger !" },
    '6eme_6': { bg:'#0a0018', lines:['TENTEN…','… cercle et disque !!','PRÉCISION !'], kanji:'円', kanjiColor:'#a855f7', bubble:"Un cercle parfait. Comme mes armes !" },
    '6eme_7': { bg:'#0a0402', lines:['NEJI…','… statistiques !!','LE DESTIN DES DONNÉES…'], kanji:'統', kanjiColor:'#92400e', bubble:"Les données ne mentent pas. Analysons !" },
    '6eme_8': { bg:'#1a0000', lines:['ZABUZA SURGIT !!','BOSS FINAL 6ÈME !!','RÉSISTE !'], kanji:'波', kanjiColor:'#dc2626', bubble:"Montrez-moi vos maths de collège !" },
    '5eme_1': { bg:'#0d0500', lines:['NARUTO…','… calcul littéral !!','X C\'EST QUOI ?!'], kanji:'文字', kanjiColor:'#F97316', bubble:"X égale la puissance d'un ninja ! Trouvons-le !" },
    '5eme_2': { bg:'#000510', lines:['SASUKE…','… priorités opératoires !!','L\'ORDRE EST CRUCIAL !'], kanji:'優先', kanjiColor:'#3b82f6', bubble:"Comme dans un combat : l'ordre des opérations est VITAL." },
    '5eme_3': { bg:'#0d0005', lines:['SAKURA…','… le théorème de Pythagore !!','a²+b²=c² !'], kanji:'直角', kanjiColor:'#ec4899', bubble:"Pythagore ? Un grand ninja des maths !" },
    '5eme_4': { bg:'#001000', lines:['ROCK LEE…','… aires avancées !!','TRANSPIRE ET CALCULE !'], kanji:'面積', kanjiColor:'#22c55e', bubble:"Pour calculer l'aire d'un triangle, j'ai fait 1000 exercices !" },
    '5eme_5': { bg:'#0a0402', lines:['GAARA…','… la médiatrice !!','ÉQUIDISTANCE !'], kanji:'垂直', kanjiColor:'#92400e', bubble:"La médiatrice : équidistante des deux extrémités !" },
    '5eme_6': { bg:'#050505', lines:['TEMARI…','… symétrie centrale !!','RETOURNEMENT !'], kanji:'対称', kanjiColor:'#6b7280', bubble:"La symétrie centrale, c'est comme lancer un boomerang !" },
    '5eme_7': { bg:'#0a0018', lines:['KANKURO…','… translations et rotations !!','EN AVANT !'], kanji:'変換', kanjiColor:'#a855f7', bubble:"Chaque transformation est un mouvement de puppet !" },
    '5eme_8': { bg:'#1a0000', lines:['OROCHIMARU REVIENT !!','PROPORTIONNALITÉ AVANCÉE !!','BOSS 5ÈME !'], kanji:'速度', kanjiColor:'#dc2626', bubble:"Vitesse, échelle, pourcentages… tu es prêt ?" },
    '4eme_1': { bg:'#0d0500', lines:['NARUTO…','… les puissances !!','PUISSANCE MAXIMALE !'], kanji:'累乗', kanjiColor:'#F97316', bubble:"x^n = ma puissance au temps t !" },
    '4eme_2': { bg:'#000510', lines:['SASUKE…','… développer et factoriser !!','L\'ALGÈBRE !'], kanji:'展開', kanjiColor:'#3b82f6', bubble:"Développer = attaquer. Factoriser = mettre en commun." },
    '4eme_3': { bg:'#0d0005', lines:['SAKURA…','… les équations !!','x = ?'], kanji:'方程式', kanjiColor:'#ec4899', bubble:"Résoudre une équation, c'est trouver la vérité cachée !" },
    '4eme_4': { bg:'#050505', lines:['KAKASHI…','… Pythagore avancé !!','LA RÉCIPROQUE !'], kanji:'定理', kanjiColor:'#6b7280', bubble:"La réciproque de Pythagore : si c²=a²+b² alors angle droit !" },
    '4eme_5': { bg:'#0a0402', lines:['SHIKAMARU…','… statistiques avancées !!','MÉDIANE !'], kanji:'統計', kanjiColor:'#92400e', bubble:"La médiane… troublant mais résolu !" },
    '4eme_6': { bg:'#0a0018', lines:['HINATA…','… probabilités !!','HASARD ?'], kanji:'確率', kanjiColor:'#a855f7', bubble:"Le hasard n'existe pas pour un Hyuga !" },
    '4eme_7': { bg:'#001000', lines:['ROCK LEE…','… le cosinus !!','SOH CAH TOA !'], kanji:'余弦', kanjiColor:'#22c55e', bubble:"cos = côté adjacent / hypoténuse !" },
    '4eme_8': { bg:'#1a0000', lines:['PAIN SURGIT !!','BOSS FINAL 4ÈME !!','LE VRAI NINJA !'], kanji:'痛み', kanjiColor:'#dc2626', bubble:"Reconnais la douleur de l'algèbre… et tu comprends les maths !" },
    '3eme_1': { bg:'#0d0500', lines:['NARUTO…','… les fonctions !!','f(x) !'], kanji:'関数', kanjiColor:'#F97316', bubble:"f(x) = ma puissance au temps x. En route !" },
    '3eme_2': { bg:'#000510', lines:['SASUKE…','… identités remarquables !!','(a+b)² !'], kanji:'因数', kanjiColor:'#3b82f6', bubble:"(a+b)² = a² + 2ab + b². Mémorise !" },
    '3eme_3': { bg:'#0d0005', lines:['SAKURA…','… systèmes d\'équations !!','DEUX INCONNUES !'], kanji:'連立', kanjiColor:'#ec4899', bubble:"Deux équations, deux inconnues. Je peux les résoudre !" },
    '3eme_4': { bg:'#050505', lines:['KAKASHI…','… le théorème de Thalès !!','TRIANGLES SEMBLABLES !'], kanji:'相似', kanjiColor:'#6b7280', bubble:"Thalès : les triangles gardent leurs proportions." },
    '3eme_5': { bg:'#001000', lines:['MINATO NAMIKAZE…','… la trigonométrie !!','sin cos tan !'], kanji:'三角', kanjiColor:'#22c55e', bubble:"Le Yondaime Hokage enseigne : SOH CAH TOA !" },
    '3eme_6': { bg:'#0a0402', lines:['JIRAIYA…','… probabilités avancées !!','LA LOI DES GRANDS NOMBRES !'], kanji:'確率', kanjiColor:'#92400e', bubble:"Le grand Jiraiya a tout vu… même les probabilités conditionnelles !" },
    '3eme_7': { bg:'#0a0018', lines:['TSUNADE…','… volumes de solides !!','SPHÈRES ET CÔNES !'], kanji:'体積', kanjiColor:'#a855f7', bubble:"Je calcule les volumes… de mes potions de guérison !" },
    '3eme_8': { bg:'#1a0000', lines:['MADARA UCHIHA SURGIT !!','BOSS ULTIME — BREVET BLANC !!','L\'AFFRONTEMENT FINAL !'], kanji:'夢', kanjiColor:'#dc2626', bubble:"Tu penses maîtriser les maths de CM2 à la 3ème ? Prouve-le !" },
  };

  var NIVEAUX = [
    { code:'cm2',  nom:'CM2',  emoji:'⭐',         color:'#F97316', desc:'Nombres, mesures, géométrie' },
    { code:'6eme', nom:'6ème', emoji:'⭐⭐',        color:'#ef4444', desc:'Fractions, proportionnalité, cercle' },
    { code:'5eme', nom:'5ème', emoji:'⭐⭐⭐',      color:'#8b5cf6', desc:'Pythagore, calcul littéral, symétrie' },
    { code:'4eme', nom:'4ème', emoji:'⭐⭐⭐⭐',    color:'#22c55e', desc:'Équations, probabilités, cosinus' },
    { code:'3eme', nom:'3ème', emoji:'⭐⭐⭐⭐⭐',  color:'#fbbf24', desc:'Fonctions, Thalès, trigonométrie, brevet' },
  ];

  // ── Fond animé Naruto ───────────────────────────────────────────
  async function _loadBgStrips() {
    var bg = document.getElementById('pdf-bg');
    if (!bg || bg.dataset.loaded) return;
    bg.dataset.loaded = '1';
    bg.innerHTML = '';
    var localUrls = [
      'scripts/sources/naruto/naruto.jpg',   'scripts/sources/naruto/sasuke.png',
      'scripts/sources/naruto/sakura.jpg',   'scripts/sources/naruto/kakashi.jpeg',
      'scripts/sources/naruto/gaara.jpg',    'scripts/sources/naruto/itachi.jpeg',
      'scripts/sources/naruto/minato.jpg',   'scripts/sources/naruto/jiraiya.webp',
    ];
    var doubled = localUrls.concat(localUrls);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'pdf-bg-strip';
      doubled.filter(function(_,i){ return i%5===s; }).forEach(function(src) {
        var img = document.createElement('img');
        img.src = src; img.alt = ''; img.loading = 'lazy';
        img.onerror = function(){ this.style.display='none'; };
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  }

  // ── Afficher le monde Pays du Feu ──────────────────────────────
  function showPaysduFeuV2(silent) {
    if (!silent && window.history && window.history.pushState) {
      history.pushState(null,'','#/pays-du-feu');
    }
    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var pdfBg = document.getElementById('pdf-bg');
    if (pdfBg) pdfBg.classList.add('visible');

    _show('pdf-levels-sec'); _hide('pdf-iles-sec'); _hide('pdf-quiz-sec');
    _buildLevels();
    _loadBgStrips();

    if (typeof stopBGM === 'function') stopBGM();
    setTimeout(function(){ if (typeof playBGM === 'function') playBGM('pdf-map'); }, 300);
    window.scrollTo(0, 0);
  }

  // ── Grille de sélection des niveaux ────────────────────────────
  function _buildLevels() {
    var sec = document.getElementById('pdf-levels-sec');
    if (!sec) return;
    var html = '<div class="pdf-map-header">' +
      '<div class="pdf-map-title">🔥 MATHS — PAYS DU FEU</div>' +
      '<div class="pdf-map-sub">Naruto · Choisis ton niveau</div>' +
    '</div><div class="pdf-levels-grid">';
    NIVEAUX.forEach(function(n) {
      html += '<div class="pdf-level-card" onclick="window.pdf_showLevel(\''+n.code+'\')" style="--level-color:'+n.color+'">' +
        '<div class="pdf-level-emoji">'+n.emoji+'</div>' +
        '<div class="pdf-level-nom">'+n.nom+'</div>' +
        '<div class="pdf-level-desc">'+n.desc+'</div>' +
        '<div class="pdf-level-btn">COMMENCER 🔥</div>' +
      '</div>';
    });
    html += '</div>';
    sec.innerHTML = html;
  }

  // ── Afficher un niveau (charge les chapitres depuis DB) ─────────
  async function showLevel(niveauCode, silent) {
    _currentNiveau = niveauCode;
    if (!silent && window.history && window.history.pushState) {
      history.pushState(null,'','#/pays-du-feu/'+niveauCode);
    }
    var niveau = NIVEAUX.find(function(n){ return n.code===niveauCode; });
    if (!niveau) return;

    if (typeof hideAll === 'function') hideAll();
    var pdfBg = document.getElementById('pdf-bg');
    if (pdfBg) pdfBg.classList.add('visible');

    var ilesEl = document.getElementById('pdf-iles-sec');
    if (ilesEl) ilesEl.innerHTML =
      '<div class="pdf-map-header">' +
        '<div class="pdf-map-title">🔥 '+niveau.nom+' — MATHS</div>' +
        '<div class="pdf-map-sub">Chargement...</div>' +
      '</div>' +
      '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4)"><div style="font-size:2rem">⏳</div></div>';

    _show('pdf-iles-sec'); _hide('pdf-levels-sec'); _hide('pdf-quiz-sec');
    window.scrollTo(0, 0);

    _chapitres = [];
    if (window.AP_QuizEngine) {
      _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, niveauCode);
    }
    var progress = window.AP_QuizEngine
      ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, niveauCode)
      : {};
    _buildGrid(niveau, progress);
  }

  // ── Grille des îles ────────────────────────────────────────────
  function _buildGrid(niveau, progress) {
    var ilesEl = document.getElementById('pdf-iles-sec');
    if (!ilesEl) return;

    var backBtn = '<button class="pdf-back-btn" onclick="window.pdf_showLevels()">← Niveaux</button>';
    var header = '<div class="pdf-map-header">' +
      backBtn +
      '<div class="pdf-map-title">🔥 '+niveau.nom+' — MATHS</div>' +
      '<div class="pdf-map-sub">'+niveau.desc+' · Naruto</div>' +
    '</div>';

    if (!_chapitres.length) {
      ilesEl.innerHTML = header +
        '<div style="text-align:center;padding:60px;color:rgba(255,255,255,.4);font-family:Nunito,sans-serif;font-weight:800">🔒 Ce niveau arrive bientôt !</div>';
      return;
    }

    var grid = '<div class="pdf-islands-grid" id="pdf-islands-grid">';
    _chapitres.forEach(function(ch) {
      var key   = MATIERE_CODE+'_'+_currentNiveau+'_'+ch.numero;
      var prog  = progress[key];
      var done  = !!prog;
      var score = prog ? prog.score : 0;
      var total = prog ? prog.total : 11;
      var stars = done ? _starsStr(score, total) : '';
      var color = ch.ile_color || '#F97316';
      var img   = ch.hero_image || '';
      grid +=
        '<div class="pdf-isle-card'+(done?' done':'')+'" ' +
          'style="--isle-color:'+color+'" ' +
          'onclick="window.pdf_startIsland(\''+ch.id+'\')">' +
          '<div class="pdf-isle-img-wrap">' +
            '<img class="pdf-isle-img" src="'+img+'" alt="'+(ch.hero_name||'')+'" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="pdf-isle-img-fallback" style="background:'+color+'22;color:'+color+'">🔥</div>' +
            '<div class="pdf-isle-overlay" style="background:linear-gradient(to top,'+color+'66,transparent)"></div>' +
          '</div>' +
          '<div class="pdf-isle-body">' +
            '<div class="pdf-isle-num">ÎLE #'+ch.numero+'</div>' +
            '<div class="pdf-isle-name" style="color:'+color+'">'+(ch.nom||'').toUpperCase()+'</div>' +
            '<div class="pdf-isle-topic">'+(ch.topic||'')+'</div>' +
            '<div class="pdf-isle-level" style="border-color:'+color+'55;color:'+color+'">'+niveau.nom+'</div>' +
            (done ? '<div class="pdf-isle-stars">'+score+'/'+total+' '+stars+'</div>' : '') +
          '</div>' +
        '</div>';
    });
    grid += '</div>';
    ilesEl.innerHTML = header + grid;
  }

  function _starsStr(score, total) {
    var s = '';
    for (var i = 0; i < Math.min(score, 5); i++) s += '⭐';
    return s;
  }

  // ── Lancer une île — ordre : leçon → cinématique → quiz ─────────
  function startIsland(chapitreId) {
    if (!chapitreId) return;
    var ch = _chapitres.find(function(c){ return c.id===chapitreId; });
    if (!ch) return;

    if (typeof lesson_paysdufeu === 'function') {
      lesson_paysdufeu(_currentNiveau, ch.numero, function() {
        if (typeof playBGM === 'function') playBGM(ch.bgm || 'pdf-map');
        _playCinematic(ch, function(){ _launchQuiz(chapitreId, ch); });
      });
    } else {
      if (typeof playBGM === 'function') playBGM(ch.bgm || 'pdf-map');
      _playCinematic(ch, function(){ _launchQuiz(chapitreId, ch); });
    }
  }

  // ── Cinématique intro — pattern exact Grand Bleu ───────────────
  function _playCinematic(ch, callback) {
    var cfg = PDF_ISLE_INTRO[_currentNiveau+'_'+ch.numero];
    if (!cfg) { if (callback) callback(); return; }

    var ov = document.getElementById('pdf-cine-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'pdf-cine-overlay';
      document.body.appendChild(ov);
    }

    ov.innerHTML =
      '<div class="pdf-cine-inner" style="background:'+cfg.bg+';min-height:100vh;height:100%;width:100%">' +
        '<div class="pdf-cine-char-wrap">' +
          '<img src="'+(ch.hero_image||'')+'" class="pdf-cine-char" ' +
            'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="pdf-cine-char-emoji" style="color:'+cfg.kanjiColor+'">🔥</div>' +
        '</div>' +
        '<div class="pdf-cine-content">' +
          '<div class="pdf-cine-kanji" style="color:'+cfg.kanjiColor+'">'+cfg.kanji+'</div>' +
          '<div class="pdf-cine-lines">' +
            cfg.lines.map(function(l){ return '<div class="pdf-cine-line">'+l+'</div>'; }).join('') +
          '</div>' +
          '<div class="pdf-cine-bubble">' +
            '<span class="pdf-cine-char-name" style="color:'+cfg.kanjiColor+'">'+(ch.hero_name||'')+'</span>' +
            '<span class="pdf-cine-bubble-text">"'+cfg.bubble+'"</span>' +
          '</div>' +
        '</div>' +
        '<button class="pdf-skip-btn" onclick="window.pdf_skipCine()">⏭ PASSER</button>' +
      '</div>';

    ov.style.cssText = 'position:fixed;inset:0;z-index:9500;display:flex;' +
      'background:'+cfg.bg+';opacity:0;transition:opacity .3s;pointer-events:auto';
    ov._cb = callback;
    requestAnimationFrame(function(){ ov.style.opacity='1'; });
    ov._t = setTimeout(window.pdf_skipCine, 7000);

    // TTS — même pattern que Grand Bleu
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var utt = new SpeechSynthesisUtterance(cfg.bubble);
      utt.lang='fr-FR'; utt.rate=0.9; utt.pitch=1.1;
      window.speechSynthesis.speak(utt);
    }
  }

  // ── Lancer le quiz via AP_QuizEngine V5 ───────────────────────
  function _launchQuiz(chapitreId, ch) {
    if (!window.AP_QuizEngine) {
      console.error('[PdfRouter] AP_QuizEngine manquant');
      return;
    }
    _show('pdf-quiz-sec');
    _hide('pdf-iles-sec');
    _hide('pdf-levels-sec');

    window.AP_QuizEngine.launch(chapitreId, {
      matiere:    MATIERE_CODE,
      niveau:     _currentNiveau,
      quizSecId:  'pdf-quiz-sec',
      ilesSecId:  'pdf-iles-sec',
      containerId:'pdf-qContainer',
      titleId:    'pdf-qTitle',
      progFillId: 'pdf-qProgFill',
      progLblId:  'pdf-qProgLbl',
      bgmBack:    'pdf-map',
      onBack: function() {
        _hide('pdf-quiz-sec');
        _show('pdf-iles-sec');
        var niveau = NIVEAUX.find(function(n){ return n.code===_currentNiveau; });
        var progress = window.AP_QuizEngine
          ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, _currentNiveau)
          : {};
        if (niveau) _buildGrid(niveau, progress);
        if (typeof playBGM === 'function') {
          setTimeout(function(){ playBGM('pdf-map'); }, 300);
        }
      },
    });
  }

  // ── Helpers ────────────────────────────────────────────────────
  function _show(id) { var el=document.getElementById(id); if(el) el.style.display='block'; }
  function _hide(id) { var el=document.getElementById(id); if(el) el.style.display='none';  }

  // ── Exports globaux — pattern exact Grand Bleu ─────────────────
  window.pdf_skipCine = function() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    var ov = document.getElementById('pdf-cine-overlay');
    if (!ov) return;
    clearTimeout(ov._t);
    var cb = ov._cb;
    ov.style.display='none'; ov.style.zIndex='-1'; ov.innerHTML='';
    if (cb) cb();
  };

  window.showPaysduFeuV2  = showPaysduFeuV2;
  window.pdf_showLevel    = showLevel;
  window.pdf_showLevels   = function(){ showPaysduFeuV2(true); };
  window.pdf_startIsland  = startIsland;

  console.info('🔥 quiz-router-pays-du-feu.js v3 — Maths · Naruto · 5 niveaux · Pattern Grand Bleu');
})();
