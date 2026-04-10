// ═══════════════════════════════════════════════════════════════════
// QUIZ-ROUTER-GRAND-BLEU.JS V3 — Académie Pirate
// 🏴‍☠️ Grand Bleu · Français · One Piece
// Fixes V3 :
//   - Passe les IDs gb-* à AP_QuizEngine (quiz-engine V5)
//   - Overlay cinématique avec background propre
//   - onerror image → affiche l'emoji fallback
//   - Overlay couleur îles réduit à 40% (44 hex)
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var _currentNiveau = null;
  var _chapitres     = [];
  var _gbBgLoaded    = false;
  var MATIERE_CODE   = 'francais';
  var STORAGE_GB = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/grand-bleu/';

  // ── Cinématiques CIN-01 : clé 'niveau_numero' ─────────────────
  var GB_ISLE_INTRO = {
    'cm2_1':  { bg:'#0a0008', lines:['INFINITIF…','… OU PARTICIPE ?','Luffy sait choisir !'], kanji:'動詞 !!', kanjiColor:'#e63946', bubble:"Gum Gum Pistol ! -er ou -é ? Essaie VENDRE — si ça marche c'est l'infinitif !" },
    'cm2_2':  { bg:'#0a0500', lines:['AVEC ÊTRE…','… ON ACCORDE !','Genre ET nombre !'], kanji:'一致 !!', kanjiColor:'#f97316', bubble:"Je suis la meilleure navigatrice ! Le PP s'accorde avec le sujet quand on utilise ÊTRE !" },
    'cm2_3':  { bg:'#00080a', lines:['NOM…','… VERBE…','… ADJECTIF !'], kanji:'品詞 !!', kanjiColor:'#22c55e', bubble:"Trois sabres, sept classes de mots — nom, verbe, adjectif, adverbe, déterminant, pronom, préposition !" },
    'cm2_4':  { bg:'#05000a', lines:['DÉTERMINANT…','… PLUS NOM !','Le Groupe Nominal !'], kanji:'名詞句 !!', kanjiColor:'#845ef7', bubble:"Je veux vivre ! Le Groupe Nominal = déterminant + nom (+adjectifs). Le noyau, c'est le nom !" },
    'cm2_5':  { bg:'#0a0800', lines:['SUJET…','… PRÉDICAT !','Qui fait quoi ?'], kanji:'主語 !!', kanjiColor:'#f59e0b', bubble:"J'ai 8000 hommes ! Le sujet répond à QUI EST-CE QUI + verbe. NE...PAS encadre le verbe !" },
    'cm2_6':  { bg:'#000a05', lines:['GROUPE 1…','… GROUPE 2…','… GROUPE 3 !'], kanji:'活用 !!', kanjiColor:'#3b82f6', bubble:"Diable Jambe ! 3 groupes de verbes : -er, -ir (-issant), et les irréguliers. Je les maîtrise !" },
    'cm2_7':  { bg:'#050a00', lines:['A OU À ?','EST OU ET ?','Son ou sont ?'], kanji:'同音 !!', kanjiColor:'#ec4899', bubble:"Les homophones ! Remplace par AVAIT → c'est 'a'. Remplace par ÉTAIT → c'est 'est'. Simple !" },
    'cm2_8':  { bg:'#08000a', lines:['AVOIR…','… OU ÊTRE !','Le Passé Composé !'], kanji:'複合過去 !!', kanjiColor:'#8b5cf6', bubble:"Yohohoho ! Passé composé = auxiliaire + PP. ÊTRE pour les mouvements, AVOIR pour le reste !" },
    '6eme_1': { bg:'#0a0500', lines:['COD…','… COI…','Compléments essentiels !'], kanji:'補語 !!', kanjiColor:'#f97316', bubble:"Je serai le meilleur marin ! COD = directement après le verbe. COI = avec une préposition !" },
    '6eme_2': { bg:'#000a0a', lines:['OÙ ?','QUAND ?','COMMENT ?'], kanji:'状況補語 !!', kanjiColor:'#06d6a0', bubble:"Je brûle ! CCL = où, CCT = quand, CCM = comment. Ils se déplacent dans la phrase !" },
    '6eme_3': { bg:'#0a0005', lines:['PROPOSITIONS…','… SUBORDONNÉES !','Relative et conjonctive'], kanji:'従属節 !!', kanjiColor:'#e63946', bubble:"Je veux vivre ! Les subordonnées relatives introduites par QUI, QUE, DONT, OÙ qualifient un nom !" },
    '6eme_4': { bg:'#050a00', lines:['PASSÉ…','… SIMPLE !','Il alla, elle vint…'], kanji:'単純過去 !!', kanjiColor:'#22c55e', bubble:"Je reviendrai ! Passé simple = temps littéraire. Groupe 1 → -ai, -as, -a, -âmes, -âtes, -èrent !" },
    '6eme_5': { bg:'#00050a', lines:['IMPARFAIT…','… VS PASSÉ SIMPLE !','Durée vs Ponctuel'], kanji:'時制 !!', kanjiColor:'#3b82f6', bubble:"Je combats toujours ! Imparfait = durée, habitude. Passé simple = action brève. Les deux se complètent !" },
    '6eme_6': { bg:'#0a0005', lines:['COMPARAISON…','… MÉTAPHORE !','Figures de style'], kanji:'比喩 !!', kanjiColor:'#a855f7', bubble:"Comme une comparaison est forte ! Comparaison = comme. Métaphore = sans outil. Personnification !" },
    '6eme_7': { bg:'#000a05', lines:['ACCORD…','… DU GN !','Genre et nombre !'], kanji:'一致 !!', kanjiColor:'#10b981', bubble:"SUPER ! Le GN s'accorde en genre et nombre. L'adjectif qualificatif s'accorde avec le nom !" },
    '6eme_8': { bg:'#0a0500', lines:['CHAMP…','… LEXICAL !','Famille de mots'], kanji:'語彙 !!', kanjiColor:'#f97316', bubble:"Mer, marin, maritime ! Champ lexical de la mer. Synonymes, antonymes, familles de mots !" },
    '5eme_1': { bg:'#0a0010', lines:['SUBJONCTIF…','… PRÉSENT !','Que je sois…'], kanji:'接続法 !!', kanjiColor:'#6366f1', bubble:"Bien que je sois le maître ! Subjonctif après doute, souhait, sentiment. Que + subjonctif !" },
    '5eme_2': { bg:'#100a00', lines:['CONDITIONNEL…','… PRÉSENT !','Si j\'avais…'], kanji:'条件法 !!', kanjiColor:'#f59e0b', bubble:"Si j'avais mes deux bras, je serais invincible ! Conditionnel = infinitif + terminaisons imparfait !" },
    '5eme_3': { bg:'#000a10', lines:['DISCOURS…','… DIRECT !','… ET INDIRECT !'], kanji:'話法 !!', kanjiColor:'#06b6d4', bubble:"Dragon dit que la révolution viendrait ! Discours indirect = transposition des temps et pronoms !" },
    '5eme_4': { bg:'#100005', lines:['VOIX…','… PASSIVE !','Le sujet subit'], kanji:'受動態 !!', kanjiColor:'#ef4444', bubble:"L'île fut détruite ! Voix passive = être conjugué + PP accordé. Agent introduit par PAR ou DE !" },
    '5eme_5': { bg:'#00100a', lines:['ANAPHORE…','… ANTITHÈSE !','Figures avancées'], kanji:'修辞 !!', kanjiColor:'#22c55e', bubble:"Il combattit, il résista, il triompha ! Anaphore = répétition. Antithèse = opposition !" },
    '5eme_6': { bg:'#100800', lines:['SOUTENU…','… COURANT…','… FAMILIER !'], kanji:'語調 !!', kanjiColor:'#f97316', bubble:"Registres : soutenu, courant, familier. S'adapter au contexte !" },
    '5eme_7': { bg:'#001000', lines:['THÈSE…','… ARGUMENTS…','… EXEMPLES !'], kanji:'論証 !!', kanjiColor:'#10b981', bubble:"La liberté est essentielle ! Thèse, arguments, exemples, conclusion. TAEB !" },
    '5eme_8': { bg:'#0a0010', lines:['RÉVISIONS…','… 5ÈME !','Tout réuni !'], kanji:'復習 !!', kanjiColor:'#8b5cf6', bubble:"Révision complète : subjonctif, conditionnel, voix passive, figures de style !" },
    '4eme_1': { bg:'#100000', lines:['CONCORDANCE…','… DES TEMPS !','Subordonnées'], kanji:'時制一致 !!', kanjiColor:'#ef4444', bubble:"Il a dit qu'il viendrait ! Si verbe principal au passé → les temps changent dans la subordonnée !" },
    '4eme_2': { bg:'#001000', lines:['MODES…','… VERBAUX !','Indicatif, Subj., Cond.'], kanji:'法 !!', kanjiColor:'#22c55e', bubble:"Indicatif = réalité. Subjonctif = souhait/doute. Conditionnel = hypothèse. Impératif = ordre !" },
    '4eme_3': { bg:'#000010', lines:['IRONIE…','… ALLÉGORIE…','… EUPHÉMISME !'], kanji:'修辞高 !!', kanjiColor:'#6366f1', bubble:"Quelle belle défaite ! Ironie. L'allégorie donne une forme concrète à une idée abstraite !" },
    '4eme_4': { bg:'#100800', lines:['ROMAN…','… NOUVELLE…','… RÉCIT !'], kanji:'文学 !!', kanjiColor:'#f59e0b', bubble:"Les ponéglyphes cachent l'histoire ! Narrateur interne/externe. Focalisation zéro, interne, externe !" },
    '4eme_5': { bg:'#001008', lines:['NOMS…','… COMPOSÉS !','Traits d\'union'], kanji:'複合語 !!', kanjiColor:'#10b981', bubble:"Des chefs-d'œuvre, des arcs-en-ciel ! Les noms composés ont des règles d'accord complexes !" },
    '4eme_6': { bg:'#100010', lines:['PARAGRAPHE…','… STRUCTURÉ !','Intro, dev., concl.'], kanji:'文章 !!', kanjiColor:'#a855f7', bubble:"Structure : idée directrice, développement, exemple, bilan. Pour le brevet !" },
    '4eme_7': { bg:'#001010', lines:['RÉVISIONS…','… GRAMMAIRE !','Toutes fonctions'], kanji:'文法総 !!', kanjiColor:'#06b6d4', bubble:"Sujet, COD, COI, attribut, apposition, épithète — toutes les fonctions !" },
    '4eme_8': { bg:'#100810', lines:['BREVET…','… EN VUE !','CM2→4ème synthèse'], kanji:'総仕上 !!', kanjiColor:'#f97316', bubble:"Synthèse totale : tous les temps, tous les modes, toutes les figures. Tu es prêt !" },
    '3eme_1': { bg:'#0a0008', lines:['GRAMMAIRE…','… BREVET !','Syntaxe complète'], kanji:'文法 !!', kanjiColor:'#e63946', bubble:"Je serai Roi des Pirates ! Et toi tu maîtriseras la grammaire du brevet !" },
    '3eme_2': { bg:'#000a08', lines:['CONJUGAISON…','… BREVET !','Tous les temps'], kanji:'活用 !!', kanjiColor:'#22c55e', bubble:"Trois sabres, tous les temps ! Indicatif, subjonctif, conditionnel — aucun secret pour moi !" },
    '3eme_3': { bg:'#08000a', lines:['FIGURES…','… DE STYLE…','… BREVET !'], kanji:'修辞 !!', kanjiColor:'#845ef7', bubble:"Je veux vivre ! Les figures de style sont les armes du brevet. Maîtrise-les toutes !" },
    '3eme_4': { bg:'#000808', lines:['COMPRENDRE…','… LES TEXTES !','Méthode brevet'], kanji:'読解 !!', kanjiColor:'#3b82f6', bubble:"Je trace la route ! Lis le paratexte, fais une lecture globale, puis réponds aux questions !" },
    '3eme_5': { bg:'#080a00', lines:['ORTHOGRAPHE…','… BREVET !','Tous les pièges'], kanji:'正書法 !!', kanjiColor:'#ec4899', bubble:"Je soigne tout le monde ! Soigne ton orthographe — chaque faute coûte des points au brevet !" },
    '3eme_6': { bg:'#0a0800', lines:['EXPRESSION…','… ÉCRITE !','Méthode brevet'], kanji:'作文 !!', kanjiColor:'#f97316', bubble:"Je prépare le meilleur repas ! Structure : intro + développement + conclusion. Soigne le style !" },
    '3eme_7': { bg:'#080008', lines:['ENTRAÎNEMENT…','… BREVET !','Questions type examen'], kanji:'練習 !!', kanjiColor:'#f59e0b', bubble:"J'invente des histoires incroyables ! Entraîne-toi avec des questions type brevet !" },
    '3eme_8': { bg:'#0a0a0a', lines:['BREVET…','… SIMULATION !','C\'est l\'heure !'], kanji:'試験 !!', kanjiColor:'#8b5cf6', bubble:"Yohohoho ! Simulation complète du brevet. Tu es prêt. Montre ce que tu vaux !" },
  };

  var NIVEAUX = [
    { code:'cm2',  nom:'CM2',  emoji:'⭐',         color:'#e63946', desc:'Grammaire & Conjugaison de base' },
    { code:'6eme', nom:'6ème', emoji:'⭐⭐',        color:'#f97316', desc:'Fonctions & Figures de style' },
    { code:'5eme', nom:'5ème', emoji:'⭐⭐⭐',      color:'#8b5cf6', desc:'Subjonctif, Conditionnel & Argumentation' },
    { code:'4eme', nom:'4ème', emoji:'⭐⭐⭐⭐',    color:'#22c55e', desc:'Maîtrise littéraire & Brevet' },
    { code:'3eme', nom:'3ème', emoji:'⭐⭐⭐⭐⭐',  color:'#3b82f6', desc:'Révision complète Brevet' },
  ];

  // ── Fond animé One Piece ────────────────────────────────────────
  async function loadGbBgStrips() {
    if (_gbBgLoaded) return;
    _gbBgLoaded = true;
    var bg = document.getElementById('gb-bg');
    if (!bg) return;
    bg.innerHTML = '';

    // Fallback local — toujours disponible
    var localUrls = [
      'assets/images/avatars/luffy.png',  'assets/images/avatars/zoro.png',
      'assets/images/avatars/nami.png',   'assets/images/avatars/usopp.png',
      'assets/images/avatars/sanji.png',  'assets/images/avatars/chopper.png',
      'assets/images/avatars/robin.png',  'assets/images/avatars/franky.png',
      'assets/images/avatars/brook.png',  'assets/images/avatars/ace.png',
      'assets/images/avatars/shanks.png', 'assets/images/avatars/law.png',
    ];

    var urls = localUrls;

    // Essayer Jikan pour le fond animé (meilleures images One Piece)
    try {
      var r = await fetch('https://api.jikan.moe/v4/anime/21/pictures');
      if (r.ok) {
        var d = await r.json();
        if (d.data && d.data.length >= 8) {
          urls = d.data.map(function(p){ return p.jpg.large_image_url||p.jpg.image_url; });
        }
      }
    } catch(e) {}

    var doubled = urls.concat(urls);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'gb-bg-strip';
      var stripImgs = doubled.filter(function(_,i){ return i%5===s; });
      if (!stripImgs.length) stripImgs = doubled.slice(0,4);
      stripImgs.forEach(function(src) {
        var img = document.createElement('img');
        img.src = src; img.alt = ''; img.loading = 'lazy';
        img.onerror = function(){ this.style.display='none'; };
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  }

  // ── Afficher le monde Grand Bleu ───────────────────────────────
  function showGrandBleuV2(silent) {
    if (!silent && window.history && window.history.pushState) {
      history.pushState(null,'','#/grand-bleu');
    }
    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var mapSec = document.getElementById('map-sec');
    if (mapSec) mapSec.style.display = 'none';
    var gbBg = document.getElementById('gb-bg');
    if (gbBg) gbBg.classList.add('visible');

    _show('gb-levels-sec'); _hide('gb-iles-sec'); _hide('gb-quiz-sec');
    _buildLevels();
    loadGbBgStrips();

    if (typeof stopBGM === 'function') stopBGM();
    setTimeout(function(){ if (typeof playBGM === 'function') playBGM('map'); }, 300);
    window.scrollTo(0, 0);
  }

  // ── Grille de sélection des niveaux ────────────────────────────
  function _buildLevels() {
    var sec = document.getElementById('gb-levels-sec');
    if (!sec) return;
    var html = '<div class="gb-map-header">' +
      '<div class="gb-map-title">🏴‍☠️ FRANÇAIS — GRAND BLEU</div>' +
      '<div class="gb-map-sub">One Piece · Choisis ton niveau</div>' +
    '</div><div class="gb-levels-grid">';
    NIVEAUX.forEach(function(n) {
      html += '<div class="gb-level-card" onclick="window.gb_showLevel(\''+n.code+'\')" style="--level-color:'+n.color+'">' +
        '<div class="gb-level-emoji">'+n.emoji+'</div>' +
        '<div class="gb-level-nom">'+n.nom+'</div>' +
        '<div class="gb-level-desc">'+n.desc+'</div>' +
        '<div class="gb-level-btn">COMMENCER 🏴‍☠️</div>' +
      '</div>';
    });
    html += '</div>';
    sec.innerHTML = html;
  }

  // ── Afficher un niveau (charge les chapitres en DB) ───────────
  async function showLevel(niveauCode, silent) {
    _currentNiveau = niveauCode;
    if (!silent && window.history && window.history.pushState) {
      history.pushState(null,'','#/grand-bleu/'+niveauCode);
    }
    var niveau = NIVEAUX.find(function(n){ return n.code===niveauCode; });
    if (!niveau) return;

    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var gbBg = document.getElementById('gb-bg');
    if (gbBg) gbBg.classList.add('visible');

    var ilesEl = document.getElementById('gb-iles-sec');
    if (ilesEl) ilesEl.innerHTML =
      '<div class="gb-map-header">' +
        '<div class="gb-map-title">🏴‍☠️ '+niveau.nom+' — FRANÇAIS</div>' +
        '<div class="gb-map-sub">Chargement...</div>' +
      '</div>' +
      '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4)">' +
        '<div style="font-size:2rem">⏳</div>' +
      '</div>';

    _show('gb-iles-sec'); _hide('gb-levels-sec'); _hide('gb-quiz-sec');
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
    var ilesEl = document.getElementById('gb-iles-sec');
    if (!ilesEl) return;

    var backBtn = '<button class="gb-back-btn" onclick="window.gb_showLevels()">← Niveaux</button>';
    var header = '<div class="gb-map-header">' +
      backBtn +
      '<div class="gb-map-title">🏴‍☠️ '+niveau.nom+' — FRANÇAIS</div>' +
      '<div class="gb-map-sub">'+niveau.desc+' · One Piece</div>' +
    '</div>';

    if (!_chapitres.length) {
      ilesEl.innerHTML = header +
        '<div style="text-align:center;padding:60px;color:rgba(255,255,255,.4);' +
        'font-family:Nunito,sans-serif;font-weight:800">🔒 Ce niveau arrive bientôt !</div>';
      return;
    }

    var grid = '<div class="gb-islands-grid" id="gb-islands-grid">';
    _chapitres.forEach(function(ch) {
      var key   = MATIERE_CODE+'_'+_currentNiveau+'_'+ch.numero;
      var prog  = progress[key];
      var done  = !!prog;
      var score = prog ? prog.score : 0;
      var total = prog ? prog.total : 11;
      var stars = done ? _starsStr(score, total) : '';
      var color = ch.ile_color || '#e63946';
      var img   = ch.hero_image || '';

      // ▼ FIX onerror : afficher le fallback emoji si image manque
      grid +=
        '<div class="gb-isle-card'+(done?' done':'')+'" ' +
          'style="--isle-color:'+color+'" ' +
          'onclick="window.gb_startIsland(\''+ch.id+'\')">' +
          '<div class="gb-isle-img-wrap">' +
            '<img class="gb-isle-img" src="'+img+'" alt="'+(ch.hero_name||'')+'" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="gb-isle-img-fallback" ' +
              'style="background:'+color+'22;color:'+color+'">🏴‍☠️</div>' +
            // ▼ FIX opacité : 44 (27%) au lieu de cc (80%)
            '<div class="gb-isle-overlay" ' +
              'style="background:linear-gradient(to top,'+color+'66,transparent)"></div>' +
          '</div>' +
          '<div class="gb-isle-body">' +
            '<div class="gb-isle-num">ÎLE #'+ch.numero+'</div>' +
            '<div class="gb-isle-name" style="color:'+color+'">'+
              ((ch.nom||'').toUpperCase())+'</div>' +
            '<div class="gb-isle-topic">'+(ch.topic||'')+'</div>' +
            '<div class="gb-isle-level" style="border-color:'+color+'55;color:'+color+'">'+
              niveau.nom+'</div>' +
            (done ? '<div class="gb-isle-stars">'+score+'/'+total+' '+stars+'</div>' : '') +
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

  // ── Lancer une île ─────────────────────────────────────────────
  function startIsland(chapitreId) {
    if (!chapitreId) return;
    var ch = _chapitres.find(function(c){ return c.id===chapitreId; });
    if (!ch) return;

    if (typeof lesson_grand_bleu === 'function') {
      lesson_grand_bleu(_currentNiveau, ch.numero, function() {
        if (typeof playBGM === 'function') playBGM(ch.bgm || 'map');
        _playCinematic(ch, function(){ _launchQuiz(chapitreId, ch); });
      });
    } else {
      if (typeof playBGM === 'function') playBGM(ch.bgm || 'map');
      _playCinematic(ch, function(){ _launchQuiz(chapitreId, ch); });
    }
  }

  // ── Cinématique intro ──────────────────────────────────────────
  function _playCinematic(ch, callback) {
    var cfg = GB_ISLE_INTRO[_currentNiveau+'_'+ch.numero];
    if (!cfg) { if (callback) callback(); return; }

    var ov = document.getElementById('gb-cine-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'gb-cine-overlay';
      document.body.appendChild(ov);
    }

    ov.innerHTML =
      '<div class="gb-cine-inner" style="background:'+cfg.bg+';min-height:100vh;height:100%;width:100%">' +
        '<div class="gb-cine-char-wrap">' +
          '<img src="'+(ch.hero_image||'')+'" class="gb-cine-char" ' +
            'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="gb-cine-char-emoji" style="color:'+cfg.kanjiColor+'">🏴‍☠️</div>' +
        '</div>' +
        '<div class="gb-cine-content">' +
          '<div class="gb-cine-kanji" style="color:'+cfg.kanjiColor+'">'+cfg.kanji+'</div>' +
          '<div class="gb-cine-lines">' +
            cfg.lines.map(function(l){ return '<div class="gb-cine-line">'+l+'</div>'; }).join('') +
          '</div>' +
          '<div class="gb-cine-bubble">' +
            '<span class="gb-cine-char-name" style="color:'+cfg.kanjiColor+'">'+(ch.hero_name||'')+'</span>' +
            '<span class="gb-cine-bubble-text">"'+cfg.bubble+'"</span>' +
          '</div>' +
        '</div>' +
        '<button class="gb-skip-btn" onclick="window.gb_skipCine()">⏭ PASSER</button>' +
      '</div>';

    // ▼ FIX : background sur l'overlay lui-même (plus de transparence)
    ov.style.cssText = 'position:fixed;inset:0;z-index:9500;display:flex;' +
      'background:'+cfg.bg+';opacity:0;transition:opacity .3s;pointer-events:auto';
    ov._cb = callback;
    requestAnimationFrame(function(){ ov.style.opacity='1'; });
    ov._t = setTimeout(window.gb_skipCine, 7000);

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
      console.error('[GbRouter] AP_QuizEngine manquant');
      return;
    }

    // Montrer gb-quiz-sec, cacher les autres
    _show('gb-quiz-sec');
    _hide('gb-iles-sec');
    _hide('gb-levels-sec');

    // ▼ CLÉS : passer les IDs gb-* au quiz-engine V5
    window.AP_QuizEngine.launch(chapitreId, {
      matiere:    MATIERE_CODE,
      niveau:     _currentNiveau,
      quizSecId:  'gb-quiz-sec',
      ilesSecId:  'gb-iles-sec',
      containerId:'gb-qContainer',
      titleId:    'gb-qTitle',
      progFillId: 'gb-qProgFill',
      progLblId:  'gb-qProgLbl',
      bgmBack:    'map',
      onBack: function() {
        _hide('gb-quiz-sec');
        _show('gb-iles-sec');
        var niveau = NIVEAUX.find(function(n){ return n.code===_currentNiveau; });
        var progress = window.AP_QuizEngine
          ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, _currentNiveau)
          : {};
        if (niveau) _buildGrid(niveau, progress);
        if (typeof playBGM === 'function') {
          setTimeout(function(){ playBGM('map'); }, 300);
        }
      },
    });
  }

  // ── Helpers ────────────────────────────────────────────────────
  function _show(id) { var el=document.getElementById(id); if(el) el.style.display='block'; }
  function _hide(id) { var el=document.getElementById(id); if(el) el.style.display='none';  }

  // ── Exports globaux ────────────────────────────────────────────
  window.gb_skipCine = function() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    var ov = document.getElementById('gb-cine-overlay');
    if (!ov) return;
    clearTimeout(ov._t);
    var cb = ov._cb;
    ov.style.display='none'; ov.style.zIndex='-1'; ov.innerHTML='';
    if (cb) cb();
  };

  window.showGrandBleuV2  = showGrandBleuV2;
  window.gb_showLevel     = showLevel;
  window.gb_showLevels    = function(){ showGrandBleuV2(true); };
  window.gb_startIsland   = startIsland;
  window.loadGbBgStrips   = loadGbBgStrips;

  console.info('🏴‍☠️ quiz-router-grand-bleu.js v3 — Français · One Piece · 5 niveaux · IDs GB corrects');
})();
