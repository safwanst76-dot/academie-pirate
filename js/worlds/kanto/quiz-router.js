// ═══════════════════════════════════════════════════════════════
// QUIZ-ROUTER-KANTO.JS V2 — Académie Pirate
// ⚔️ Kanto · Sciences · Demon Slayer
// Pattern exact Grand Bleu / Magnolia V2
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var _currentNiveau = null;
  var _chapitres     = [];
  var _kantoBgLoaded = false;
  var MATIERE_CODE   = 'sciences';
  var DS_STORAGE     = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer/';

  // ── Cinématiques par île — clé 'niveau_numero' (CIN-01) ──────
  var KANTO_ISLE_INTRO = {
    // ═ CM2 ═
    'cm2_1': { bg:'#1a0a05', kanji:'物質 !!', kanjiColor:'#f97316', lines:['SOLIDE…','… LIQUIDE !','GAZ !'], bubble:'"L\'eau, la glace et la vapeur — c\'est la même matière, des états différents !"' },
    'cm2_2': { bg:'#0a1a05', kanji:'力 !!', kanjiColor:'#22c55e', lines:['SOURCES…','… D\'ÉNERGIE !','RENOUVELABLES…'], bubble:'"Soleil, vent, eau — la nature nous donne tout ce qu\'il faut !"' },
    'cm2_3': { bg:'#0a0510', kanji:'電気 !!', kanjiColor:'#eab308', lines:['CIRCUIT…','… ÉLECTRIQUE !','ATTENTION !'], bubble:'"Une pile, des fils, une ampoule — et la lumière jaillit !"' },
    'cm2_4': { bg:'#051a0a', kanji:'生物 !!', kanjiColor:'#10b981', lines:['VIVANT…','… CLASSIFICATION !','UNITÉ ET DIVERSITÉ !'], bubble:'"Mammifères, oiseaux, poissons — tous unis par des caractères !"' },
    'cm2_5': { bg:'#1a0510', kanji:'食物 !!', kanjiColor:'#3b82f6', lines:['ALIMENTATION…','… NUTRITION !','ÉQUILIBRE !'], bubble:'"Chaque repas est un trésor — varie pour grandir fort !"' },
    'cm2_6': { bg:'#100510', kanji:'生命 !!', kanjiColor:'#ec4899', lines:['REPRODUCTION…','… CROISSANCE !','LE CYCLE DE LA VIE !'], bubble:'"De la graine à la fleur, du bébé à l\'adulte — tout vit, tout grandit !"' },
    'cm2_7': { bg:'#050510', kanji:'宇宙 !!', kanjiColor:'#8b5cf6', lines:['TERRE…','… SYSTÈME SOLAIRE !','PLANÈTES !'], bubble:'"Notre Terre danse autour du Soleil avec 7 sœurs planètes !"' },
    'cm2_8': { bg:'#0a0000', kanji:'災害 !!', kanjiColor:'#ef4444', lines:['VOLCANS…','… SÉISMES !','PRÉPARE-TOI !'], bubble:'"La Terre est vivante : volcans et séismes nous le rappellent. Sois prêt !"' },
    // ═ 6ÈME ═
    '6eme_1': { bg:'#001a05', kanji:'細胞 !!', kanjiColor:'#22c55e', lines:['CELLULE…','… UNITÉ !','DU VIVANT !'], bubble:'"Tous les êtres vivants sont faits de cellules — c\'est la preuve de leur parenté !"' },
    '6eme_2': { bg:'#1a0a05', kanji:'分類 !!', kanjiColor:'#ec4899', lines:['CARACTÈRES…','… PARTAGÉS !','CLASSIFICATION !'], bubble:'"Plus on partage, plus on est apparentés. La parenté est une histoire d\'amour !"' },
    '6eme_3': { bg:'#050a1a', kanji:'多様性 !!', kanjiColor:'#06b6d4', lines:['DIVERSITÉ…','… DU VIVANT !','PROTECTION !'], bubble:'"Du microbe à la baleine, la biodiversité est notre trésor !"' },
    '6eme_4': { bg:'#0a1500', kanji:'生態系 !!', kanjiColor:'#22c55e', lines:['ÉCOSYSTÈME…','… ÉQUILIBRE !','CHAÎNE TROPHIQUE !'], bubble:'"Producteurs, consommateurs, décomposeurs : tout est lié !"' },
    '6eme_5': { bg:'#000510', kanji:'季節 !!', kanjiColor:'#8b5cf6', lines:['SAISONS…','… ADAPTATION !','SURVIE !'], bubble:'"… Je suis comme la brume… les êtres vivants s\'adaptent à chaque saison."' },
    '6eme_6': { bg:'#1a0500', kanji:'栄養 !!', kanjiColor:'#fbbf24', lines:['NUTRITION…','… ÉQUILIBRE !','VARIÉTÉ !'], bubble:'"L\'alimentation équilibrée est la base de la force du corps."' },
    '6eme_7': { bg:'#150510', kanji:'生殖 !!', kanjiColor:'#a855f7', lines:['REPRODUCTION…','… SEXUÉE !','PUBERTÉ !'], bubble:'"De la fleur au fruit, de l\'enfance à l\'adulte — la vie continue !"' },
    '6eme_8': { bg:'#0a0000', kanji:'進化 !!', kanjiColor:'#ef4444', lines:['ÉVOLUTION…','… BIODIVERSITÉ !','PROTECTION !'], bubble:'"Préservons la biodiversité comme on combat les démons !"' },
    // ═ 5ÈME ═
    '5eme_1': { bg:'#000a1a', kanji:'水 !!', kanjiColor:'#3b82f6', lines:['EAU…','… 3 ÉTATS !','MASSE CONSERVÉE !'], bubble:'"L\'eau prend trois visages — comme mes danses du dieu du feu !"' },
    '5eme_2': { bg:'#1a0a05', kanji:'純物 !!', kanjiColor:'#a855f7', lines:['MÉLANGES…','… CORPS PURS !','SÉPARATION !'], bubble:'"AAH ! Heureusement il y a des techniques pour tout séparer !"' },
    '5eme_3': { bg:'#0a1a05', kanji:'速度 !!', kanjiColor:'#fbbf24', lines:['VITESSE…','… v = d/t !','PLUS VITE !'], bubble:'"GRAOOOH ! Plus vite, toujours plus vite ! C\'est ma formule de combat !"' },
    '5eme_4': { bg:'#1a0500', kanji:'力 !!', kanjiColor:'#ef4444', lines:['ÉNERGIE…','… SE TRANSFORME !','ENFLAMME-TOI !'], bubble:'"ENFLAMME TON CŒUR ! L\'énergie ne se perd pas, elle se TRANSFORME !"' },
    '5eme_5': { bg:'#0a0510', kanji:'回路 !!', kanjiColor:'#22c55e', lines:['SÉRIE…','… OU PARALLÈLE !','BRANCHEMENTS !'], bubble:'"Série ou parallèle… deux beautés différentes. Élégant !"' },
    '5eme_6': { bg:'#150510', kanji:'光 !!', kanjiColor:'#fbbf24', lines:['LUMIÈRE…','… SOURCE !','PROPAGATION !'], bubble:'"L\'amour de la lumière éclaire le monde !"' },
    '5eme_7': { bg:'#001515', kanji:'呼吸 !!', kanjiColor:'#06b6d4', lines:['RESPIRATION…','… CIRCULATION !','LE CYCLE !'], bubble:'"… inspirer, expirer. Le souffle nourrit le sang…"' },
    '5eme_8': { bg:'#0a0000', kanji:'消化 !!', kanjiColor:'#ef4444', lines:['DIGESTION…','… NUTRIMENTS !','LA FORCE !'], bubble:'"La force du Pilier vient de ce qu\'il MANGE !"' },
    // ═ 4ÈME ═
    '4eme_1': { bg:'#000510', kanji:'原子 !!', kanjiColor:'#3b82f6', lines:['ATOMES…','… MOLÉCULES !','LAVOISIER !'], bubble:'"Atomes et molécules — la matière n\'est rien d\'autre qu\'un assemblage."' },
    '4eme_2': { bg:'#1a1500', kanji:'電圧 !!', kanjiColor:'#fbbf24', lines:['TENSION…','… INTENSITÉ !','OHM !'], bubble:'"FLAMBOYANCE ! Voltmètre PARALLÈLE, ampèremètre SÉRIE !"' },
    '4eme_3': { bg:'#050a05', kanji:'音 !!', kanjiColor:'#a855f7', lines:['SON…','… PROPAGE !','HERTZ !'], bubble:'"Le son… une vibration silencieuse, comme ma haine."' },
    '4eme_4': { bg:'#1a0a00', kanji:'光色 !!', kanjiColor:'#fbbf24', lines:['LUMIÈRES…','… COULEURS !','RVB !'], bubble:'"Bénie soit la lumière. Toutes les couleurs cachées dans le blanc."' },
    '4eme_5': { bg:'#150510', kanji:'生殖 !!', kanjiColor:'#ec4899', lines:['REPRODUCTION…','… HUMAINE !','PUBERTÉ !'], bubble:'"… Un mystère du vivant que je peux comprendre maintenant."' },
    '4eme_6': { bg:'#0a0510', kanji:'遺伝 !!', kanjiColor:'#a855f7', lines:['ADN…','… CHROMOSOMES !','HÉRÉDITÉ !'], bubble:'"L\'ADN… c\'est ce qui nous fait tous différents !"' },
    '4eme_7': { bg:'#100500', kanji:'地震 !!', kanjiColor:'#ef4444', lines:['SÉISMES…','… VOLCANS !','PLAQUES !'], bubble:'"Mmh ! La Terre tremble ! Les plaques se déplacent !"' },
    '4eme_8': { bg:'#0a0000', kanji:'気候 !!', kanjiColor:'#ef4444', lines:['CLIMAT…','… RÉCHAUFFEMENT !','AGISSONS !'], bubble:'"La planète SOUFFRE. Nous devons agir comme contre les démons !"' },
    // ═ 3ÈME ═
    '3eme_1': { bg:'#000510', kanji:'力学 !!', kanjiColor:'#3b82f6', lines:['FORCES…','… NEWTON !','P = m × g !'], bubble:'"Forces et mouvement — la mécanique de Newton ! Comprends-les !"' },
    '3eme_2': { bg:'#1a0500', kanji:'電力 !!', kanjiColor:'#fbbf24', lines:['PUISSANCE…','… P = U × I !','ÉNERGIE !'], bubble:'"PUISSANCE et ÉNERGIE ! ENFLAMME ton calcul !"' },
    '3eme_3': { bg:'#0a0a05', kanji:'反応 !!', kanjiColor:'#a855f7', lines:['RÉACTIONS…','… CHIMIQUES !','LAVOISIER !'], bubble:'"Les atomes se réarrangent par AMOUR ! Lavoisier, mon héros !"' },
    '3eme_4': { bg:'#0a0510', kanji:'酸塩 !!', kanjiColor:'#ec4899', lines:['ACIDES…','… BASES !','pH 0-14 !'], bubble:'"pH 0 à 14, et MALHEUR à qui se trompe d\'échelle !"' },
    '3eme_5': { bg:'#000510', kanji:'進化 !!', kanjiColor:'#22c55e', lines:['ÉVOLUTION…','… DARWIN !','SÉLECTION !'], bubble:'"… Les espèces changent, comme la brume."' },
    '3eme_6': { bg:'#100510', kanji:'神経 !!', kanjiColor:'#3b82f6', lines:['NERVEUX…','… IMMUNITAIRE !','VACCINS !'], bubble:'"Bénis soient les neurones et les anticorps !"' },
    '3eme_7': { bg:'#150515', kanji:'遺伝 !!', kanjiColor:'#a855f7', lines:['GÉNOTYPE…','… PHÉNOTYPE !','MICROBIOTE !'], bubble:'"Génotype, phénotype, microbiote… élégant, n\'est-ce pas ?"' },
    '3eme_8': { bg:'#0a0000', kanji:'地球 !!', kanjiColor:'#ef4444', lines:['DÉFIS…','… PLANÉTAIRES !','LE BREVET !'], bubble:'"Atténuer, adapter, transitionner — pour préserver la VIE !"' }
  };

  // ── Niveaux disponibles ──────────────────────────────────────
  var NIVEAUX = [
    { code:'cm2',  nom:'CM2',  emoji:'⭐',         color:'#f97316', desc:'Sciences & technologie cycle 3' },
    { code:'6eme', nom:'6ème', emoji:'⭐⭐',       color:'#22c55e', desc:'SVT cycle 3 — vivant, écosystèmes, reproduction' },
    { code:'5eme', nom:'5ème', emoji:'⭐⭐⭐',     color:'#8b5cf6', desc:'Physique-Chimie + SVT — eau, énergie, lumière, corps humain' },
    { code:'4eme', nom:'4ème', emoji:'⭐⭐⭐⭐',   color:'#ef4444', desc:'PC + SVT — atomes, électricité, sons, génétique, séismes, climat' },
    { code:'3eme', nom:'3ème', emoji:'⭐⭐⭐⭐⭐', color:'#3b82f6', desc:'Brevet Sciences — mécanique, énergies, chimie, évolution, défis planétaires' }
  ];

  var COULEURS_NIVEAU = {
    'cm2':'#f97316', '6eme':'#22c55e', '5eme':'#8b5cf6',
    '4eme':'#ef4444', '3eme':'#3b82f6'
  };

  // ── Helpers DOM ──────────────────────────────────────────────
  function _hide(id){ var el=document.getElementById(id); if(el) el.style.display='none'; }
  function _show(id){ var el=document.getElementById(id); if(el) el.style.display='block'; }

  function _hideAll() {
    ['kanto-levels-sec','kanto-iles-sec','kanto-quiz-sec'].forEach(_hide);
    var bg = document.getElementById('kanto-bg');
    if (bg) bg.classList.remove('visible');
  }

  // ── Fond animé (strips Demon Slayer) ─────────────────────────
  function loadKantoBgStrips() {
    if (_kantoBgLoaded) return;
    var bg = document.getElementById('kanto-bg');
    if (!bg) return;
    bg.innerHTML = '';
    var imgs = [
      'tanjiro.jpg','nezuko.jpeg','zenitsu.jpg','inosuke.jpg',
      'giyu.png','shinobu.png','kanao.jpg','rengoku.jpg',
      'rui.jpg','akaza.jpg','doma.jpg','muzan.jpg'
    ].map(function(f){ return DS_STORAGE + 'characters/' + f; });
    var doubled = imgs.concat(imgs);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'kanto-bg-strip';
      for (var i = 0; i < doubled.length; i++) {
        var img = document.createElement('img');
        img.src = doubled[(i + s * 3) % doubled.length];
        img.loading = 'lazy';
        img.alt = '';
        strip.appendChild(img);
      }
      bg.appendChild(strip);
    }
    _kantoBgLoaded = true;
  }

  // ── Entrée principale du monde ───────────────────────────────
  function showKantoV2(silent) {
    if (!silent && window.history && window.history.pushState)
      history.pushState(null, '', '#/kanto');

    // Pattern Grand Bleu : hideAll() + masquer map-sec + manga-bg
    if (typeof hideAll === 'function') hideAll();
    _hideAll();

    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var mapSec = document.getElementById('map-sec');
    if (mapSec) mapSec.style.display = 'none';

    var bg = document.getElementById('hist-bg');
    if (bg) bg.classList.remove('visible');

    var kBg = document.getElementById('kanto-bg');
    if (kBg) { kBg.classList.add('visible'); loadKantoBgStrips(); }

    var sec = document.getElementById('kanto-levels-sec');
    if (sec) { sec.style.display = 'block'; _buildLevels(); }

    // Règle AU-04 : BGM après affichage
    if (typeof playBGM === 'function')
      setTimeout(function(){ playBGM('kanto-map'); }, 500);
    document.title = 'Académie Pirate — Kanto Sciences';
  }

  // ── Construction de l'écran "niveaux" ────────────────────────
  function _buildLevels() {
    var sec = document.getElementById('kanto-levels-sec');
    if (!sec) return;
    var html = ''
      + '<div class="kanto-world-header">'
      + '  <h1>⚔️ KANTO &mdash; SCIENCES</h1>'
      + '  <p>Maîtrise les sciences &mdash; Pourfends l\'ignorance !</p>'
      + '</div>'
      + '<div class="kanto-levels-grid">';

    NIVEAUX.forEach(function(n) {
      html += '<div class="kanto-level-card" onclick="kanto_showLevel(\''+n.code+'\')" style="--lvl-color:'+n.color+'">'
            + '  <div class="kanto-level-emoji">'+n.emoji+'</div>'
            + '  <div class="kanto-level-name" style="color:'+n.color+'">'+n.nom+'</div>'
            + '  <div class="kanto-level-desc">'+n.desc+'</div>'
            + '  <button class="kanto-level-btn" style="background:'+n.color+'">COMMENCER</button>'
            + '</div>';
    });
    html += '</div>';
    sec.innerHTML = html;
  }

  // ── Afficher un niveau (grille des îles) ─────────────────────
  async function showLevel(niveauCode, silent) {
    _currentNiveau = niveauCode;
    var niveau = NIVEAUX.find(function(n){ return n.code===niveauCode; });
    if (!niveau) return;

    if (!silent && window.history && window.history.pushState)
      history.pushState(null,'','#/kanto/'+niveauCode);

    // Pattern Grand Bleu : hideAll() + masquer map-sec + manga-bg
    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var mapSec = document.getElementById('map-sec');
    if (mapSec) mapSec.style.display = 'none';
    var bg = document.getElementById('kanto-bg');
    if (bg) { bg.classList.add('visible'); loadKantoBgStrips(); }

    _show('kanto-iles-sec'); _hide('kanto-levels-sec'); _hide('kanto-quiz-sec');
    window.scrollTo(0, 0);

    // Charger les chapitres pour ce niveau via AP_QuizEngine
    if (window.AP_QuizEngine && window.AP_QuizEngine.getChapitres) {
      _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, niveauCode);
    } else {
      _chapitres = [];
    }
    _buildGrid(niveau);
  }

  function _buildGrid(niveau) {
    var sec = document.getElementById('kanto-iles-sec');
    if (!sec) return;
    var color = niveau.color;
    var html = ''
      + '<div class="kanto-map-header">'
      + '  <button class="kanto-back-btn" onclick="kanto_showLevels()">&larr; Niveaux</button>'
      + '  <h2 style="color:'+color+'">⚔️ '+niveau.nom.toUpperCase()+' &mdash; SCIENCES</h2>'
      + '  <p>'+niveau.desc+' · Demon Slayer</p>'
      + '</div>'
      + '<div class="kanto-islands-grid">';

    _chapitres.forEach(function(ch) {
      var img = ch.hero_image || (DS_STORAGE + 'characters/tanjiro.jpg');
      html += '<div class="kanto-isle-card" style="--isle-color:'+color+'" onclick="kanto_startIsland('+ch.numero+')">'
            + '  <div class="kanto-isle-img-wrap">'
            + '    <img class="kanto-isle-img" src="'+img+'" loading="lazy" alt="'+ch.nom+'" onerror="this.onerror=null;this.src=\''+DS_STORAGE+'characters/tanjiro.jpg\'">'
            + '  </div>'
            + '  <div class="kanto-isle-body">'
            + '    <div class="kanto-isle-num">ÎLE #'+ch.numero+'</div>'
            + '    <div class="kanto-isle-name" style="color:'+color+'">'+ch.nom.toUpperCase()+'</div>'
            + '    <div class="kanto-isle-topic">'+ch.topic+'</div>'
            + '    <div class="kanto-isle-level" style="background:'+color+'33; color:'+color+'">'+niveau.nom+'</div>'
            + '  </div>'
            + '</div>';
    });
    html += '</div>';
    sec.innerHTML = html;
  }

  // ── Démarrer une île : leçon → cinématique → quiz ────────────
  function startIsland(numero) {
    var ch = _chapitres.find(function(c){ return c.numero===numero; });
    if (!ch) { console.warn('[kanto] chapitre',numero,'introuvable'); return; }

    // 1. Leçon (LessonDialog) — pattern Grand Bleu
    if (typeof window.lesson_kanto === 'function') {
      window.lesson_kanto(_currentNiveau, numero, function() {
        // 2. Après leçon : cinématique puis quiz
        if (typeof playBGM === 'function') playBGM(ch.bgm || 'kanto-battle');
        _playCinematic(ch, function() {
          _launchQuiz(ch);
        });
      });
    } else {
      // Fallback : direct cinématique
      _playCinematic(ch, function(){ _launchQuiz(ch); });
    }
  }

  // ── Cinématique (CIN-01) ─────────────────────────────────────
  function _playCinematic(ch, done) {
    var cfg = KANTO_ISLE_INTRO[_currentNiveau + '_' + ch.numero];
    if (!cfg) { done(); return; }

    var ov = document.getElementById('kanto-cine-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'kanto-cine-overlay';
      document.body.appendChild(ov);
    }
    ov.style.display = 'flex';
    ov.style.zIndex  = '9500';
    ov.style.background = cfg.bg || '#000';

    var hero = ch.hero_image || (DS_STORAGE + 'characters/tanjiro.jpg');
    var lines = (cfg.lines || []).map(function(l, i){
      return '<div class="kanto-cine-line" style="animation-delay:'+(i*0.4)+'s">'+l+'</div>';
    }).join('');

    ov.innerHTML = ''
      + '<div class="kanto-cine-inner">'
      + '  <div class="kanto-cine-content">'
      + '    <div class="kanto-cine-kanji" style="color:'+(cfg.kanjiColor||'#fff')+'">'+(cfg.kanji||'')+'</div>'
      + '    <div class="kanto-cine-lines">'+lines+'</div>'
      + '    <div class="kanto-cine-bubble">'
      + '      <span class="kanto-cine-char-name" style="color:'+(cfg.kanjiColor||'#fff')+'">'+(ch.hero_name||'').toUpperCase()+'</span>'
      + (cfg.bubble||'')
      + '    </div>'
      + '  </div>'
      + '  <div class="kanto-cine-char-wrap">'
      + '    <img class="kanto-cine-char" src="'+hero+'" alt="">'
      + '  </div>'
      + '</div>'
      + '<button class="kanto-skip-btn" onclick="kanto_skipCine()">⏭ PASSER</button>';

    // TTS lecture des lignes
    if ('speechSynthesis' in window) {
      try {
        var u = new SpeechSynthesisUtterance((cfg.lines||[]).join(' ') + ' ' + (cfg.bubble||''));
        u.lang = 'fr-FR'; u.rate = 0.95;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      } catch (e) {}
    }

    ov._cb = done;
    ov._t  = setTimeout(function(){ window.kanto_skipCine(); }, 7000);
  }

  // ── Lancement quiz (AP_QuizEngine) ───────────────────────────
  function _launchQuiz(ch) {
    _hide('kanto-iles-sec'); _hide('kanto-levels-sec');
    _show('kanto-quiz-sec');
    window.scrollTo(0, 0);

    if (window.AP_QuizEngine && window.AP_QuizEngine.launch) {
      window.AP_QuizEngine.launch({
        chapitre:    ch,
        containerId: 'kanto-qContainer',
        titleId:     'kanto-qTitle',
        progressFillId: 'kanto-qProgFill',
        progressLblId:  'kanto-qProgLbl',
        worldCode:   'kanto',
        themeColor:  COULEURS_NIVEAU[_currentNiveau] || '#C0392B',
        onBack: function() {
          _hide('kanto-quiz-sec');
          _show('kanto-iles-sec');
          if (typeof playBGM === 'function') playBGM('kanto-map');
        }
      });
    } else {
      console.warn('[kanto] AP_QuizEngine non disponible');
    }
  }

  // ── Exports globaux ──────────────────────────────────────────
  window.kanto_skipCine = function() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    var ov = document.getElementById('kanto-cine-overlay');
    if (!ov) return;
    clearTimeout(ov._t);
    var cb = ov._cb;
    ov.style.display='none'; ov.style.zIndex='-1'; ov.innerHTML='';
    if (cb) cb();
  };
  window.showKantoV2     = showKantoV2;
  window.kanto_showLevel = showLevel;
  window.kanto_showLevels= function(){ showKantoV2(true); };
  window.kanto_startIsland = startIsland;
  window.loadKantoBgStrips = loadKantoBgStrips;

  console.info('⚔️ quiz-router-kanto.js v2 — Sciences · Demon Slayer · CM2 · Pattern Grand Bleu');
})();
