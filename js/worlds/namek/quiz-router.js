// ═══════════════════════════════════════════════════════════════
// QUIZ-ROUTER-NAMEK.JS V2 — Académie Pirate
// 🔮 Namek · Géographie · Jujutsu Kaisen
// Pattern exact Grand Bleu / Magnolia / Kanto V2
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var _currentNiveau = null;
  var _chapitres     = [];
  var _namekBgLoaded = false;
  var MATIERE_CODE   = 'geo';
  var JJK_STORAGE    = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/';

  // ── Cinématiques par île — clé 'niveau_numero' (CIN-01) ──────
  var NAMEK_ISLE_INTRO = {
    // ═ CM2 ═
    'cm2_1': { bg:'#1a0a2e', kanji:'都市 !!', kanjiColor:'#f97316', lines:['VILLES…','… MÉTROPOLES !','VIVANTES !'], bubble:'"Les villes sont vivantes — pleines de gens, de bruits, de mouvement !"' },
    'cm2_2': { bg:'#0a2e1a', kanji:'田舎 !!', kanjiColor:'#22c55e', lines:['CAMPAGNE…','… AGRICULTURE !','CALME !'], bubble:'"La campagne... le calme. Peu de gens, beaucoup d\'espace."' },
    'cm2_3': { bg:'#0a1a3e', kanji:'海岸 !!', kanjiColor:'#06b6d4', lines:['LITTORAL…','… PÊCHE !','TOURISME !'], bubble:'"Le littoral, c\'est ma zone de confort ! Pêcheurs, surfeurs, touristes !"' },
    'cm2_4': { bg:'#1a1a3e', kanji:'山 !!', kanjiColor:'#a855f7', lines:['MONTAGNE…','… SOMMETS !','GLACIERS !'], bubble:'"En montagne, je vois LOIN — comme avec mes Six Yeux !"' },
    'cm2_5': { bg:'#2e0a1a', kanji:'移動 !!', kanjiColor:'#fbbf24', lines:['TGV…','… AVION !','VÉLO !'], bubble:'"Saumon ! (Se déplacer rapidement, c\'est important !)"' },
    'cm2_6': { bg:'#0a2e2e', kanji:'通信 !!', kanjiColor:'#3b82f6', lines:['INTERNET…','… SATELLITES !','RÉSEAUX !'], bubble:'"Communiquer m\'a sauvé — autrefois isolé, maintenant en lien !"' },
    'cm2_7': { bg:'#1a3e0a', kanji:'環境 !!', kanjiColor:'#22c55e', lines:['ÉCOQUARTIER…','… RECYCLAGE !','PLANÈTE !'], bubble:'"BROTHER ! Mieux habiter, c\'est respecter la nature !"' },
    'cm2_8': { bg:'#2e0a2e', kanji:'巨都 !!', kanjiColor:'#dc2626', lines:['MÉTROPOLE…','… MÉGAPOLE !','FINAL !'], bubble:'"7h - 19h. Les métropoles sont des fourmilières humaines."' }
  };

  // ── Niveaux disponibles ──────────────────────────────────────
  var NIVEAUX = [
    { code:'cm2',  nom:'CM2',  emoji:'⭐',         color:'#f97316', desc:'Géographie cycle 3 — habiter, se déplacer, communiquer' }
    // Niveaux à venir : '6eme', '5eme', '4eme', '3eme'
  ];

  var COULEURS_NIVEAU = {
    'cm2':'#f97316', '6eme':'#22c55e', '5eme':'#8b5cf6',
    '4eme':'#ef4444', '3eme':'#3b82f6'
  };

  // ── Helpers DOM ──────────────────────────────────────────────
  function _hide(id){ var el=document.getElementById(id); if(el) el.style.display='none'; }
  function _show(id){ var el=document.getElementById(id); if(el) el.style.display='block'; }

  function _hideAll() {
    ['namek-levels-sec','namek-iles-sec','namek-quiz-sec'].forEach(_hide);
    var bg = document.getElementById('namek-bg');
    if (bg) bg.classList.remove('visible');
  }

  // ── Fond animé (strips JJK) ──────────────────────────────────
  function loadNamekBgStrips() {
    if (_namekBgLoaded) return;
    var bg = document.getElementById('namek-bg');
    if (!bg) return;
    bg.innerHTML = '';
    var imgs = [
      'yuji.png','megumi.jpg','nobara.png','gojo.jpg',
      'inumaki.png','yuta.jpg','todo.jpg','nanami.jpg',
      'sukuna.jpg','mahito.jpg','jogo.png','dagon.png'
    ].map(function(f){ return JJK_STORAGE + 'characters/' + f; });
    var doubled = imgs.concat(imgs);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'namek-bg-strip';
      for (var i = 0; i < doubled.length; i++) {
        var img = document.createElement('img');
        img.src = doubled[(i + s * 3) % doubled.length];
        img.loading = 'lazy';
        img.alt = '';
        strip.appendChild(img);
      }
      bg.appendChild(strip);
    }
    _namekBgLoaded = true;
  }

  // ── Entrée principale du monde ───────────────────────────────
  function showNamekV2(silent) {
    if (!silent && window.history && window.history.pushState)
      history.pushState(null, '', '#/namek');

    if (typeof hideAll === 'function') hideAll();
    _hideAll();

    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var mapSec = document.getElementById('map-sec');
    if (mapSec) mapSec.style.display = 'none';

    var bg = document.getElementById('hist-bg');
    if (bg) bg.classList.remove('visible');

    var nBg = document.getElementById('namek-bg');
    if (nBg) { nBg.classList.add('visible'); loadNamekBgStrips(); }

    var sec = document.getElementById('namek-levels-sec');
    if (sec) { sec.style.display = 'block'; _buildLevels(); }

    if (typeof playBGM === 'function')
      setTimeout(function(){ playBGM('jjk-map'); }, 500);
    document.title = 'Académie Pirate — Namek Géographie';
  }

  // ── Construction de l'écran "niveaux" ────────────────────────
  function _buildLevels() {
    var sec = document.getElementById('namek-levels-sec');
    if (!sec) return;
    var html = ''
      + '<div class="namek-world-header">'
      + '  <h1>🔮 NAMEK &mdash; GÉOGRAPHIE</h1>'
      + '  <p>Explore le monde &mdash; Maîtrise les territoires !</p>'
      + '</div>'
      + '<div class="namek-levels-grid">';

    NIVEAUX.forEach(function(n) {
      html += '<div class="namek-level-card" onclick="namek_showLevel(\''+n.code+'\')" style="--lvl-color:'+n.color+'">'
            + '  <div class="namek-level-emoji">'+n.emoji+'</div>'
            + '  <div class="namek-level-name" style="color:'+n.color+'">'+n.nom+'</div>'
            + '  <div class="namek-level-desc">'+n.desc+'</div>'
            + '  <button class="namek-level-btn" style="background:'+n.color+'">COMMENCER</button>'
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
      history.pushState(null,'','#/namek/'+niveauCode);

    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var mapSec = document.getElementById('map-sec');
    if (mapSec) mapSec.style.display = 'none';

    var bg = document.getElementById('namek-bg');
    if (bg) { bg.classList.add('visible'); loadNamekBgStrips(); }

    _hide('namek-levels-sec');
    _hide('namek-quiz-sec');
    _show('namek-iles-sec');
    window.scrollTo(0, 0);

    if (window.AP_QuizEngine && window.AP_QuizEngine.getChapitres) {
      _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, niveauCode);
    } else {
      _chapitres = [];
    }
    _buildGrid(niveau);
    _show('namek-iles-sec');
  }

  function _buildGrid(niveau) {
    var sec = document.getElementById('namek-iles-sec');
    if (!sec) return;
    var color = niveau.color;
    var html = ''
      + '<div class="namek-map-header">'
      + '  <button class="namek-back-btn" onclick="namek_showLevels()">&larr; Niveaux</button>'
      + '  <h2 style="color:'+color+'">🔮 '+niveau.nom.toUpperCase()+' &mdash; GÉOGRAPHIE</h2>'
      + '  <p>'+niveau.desc+' · Jujutsu Kaisen</p>'
      + '</div>'
      + '<div class="namek-islands-grid">';

    _chapitres.forEach(function(ch) {
      var img = ch.hero_image || (JJK_STORAGE + 'characters/yuji.png');
      html += '<div class="namek-isle-card" style="--isle-color:'+color+'" onclick="namek_startIsland(\''+ch.id+'\')">'
            + '  <div class="namek-isle-img-wrap">'
            + '    <img class="namek-isle-img" src="'+img+'" loading="lazy" alt="'+ch.nom+'" onerror="this.onerror=null;this.src=\''+JJK_STORAGE+'characters/yuji.png\'">'
            + '  </div>'
            + '  <div class="namek-isle-body">'
            + '    <div class="namek-isle-num">ÎLE #'+ch.numero+'</div>'
            + '    <div class="namek-isle-name" style="color:'+color+'">'+ch.nom.toUpperCase()+'</div>'
            + '    <div class="namek-isle-topic">'+ch.topic+'</div>'
            + '    <div class="namek-isle-level" style="background:'+color+'33; color:'+color+'">'+niveau.nom+'</div>'
            + '  </div>'
            + '</div>';
    });
    html += '</div>';
    sec.innerHTML = html;
  }

  // ── Démarrer une île : leçon → cinématique → quiz ────────────
  function startIsland(chapitreId) {
    if (!chapitreId) return;
    var ch = _chapitres.find(function(c){ return c.id===chapitreId; });
    if (!ch) { console.warn('[namek] chapitre id',chapitreId,'introuvable'); return; }

    if (typeof window.lesson_namek === 'function') {
      window.lesson_namek(_currentNiveau, ch.numero, function() {
        if (typeof playBGM === 'function') playBGM(ch.bgm || 'jjk-battle');
        _playCinematic(ch, function() {
          _launchQuiz(chapitreId, ch);
        });
      });
    } else {
      if (typeof playBGM === 'function') playBGM(ch.bgm || 'jjk-battle');
      _playCinematic(ch, function(){ _launchQuiz(chapitreId, ch); });
    }
  }

  // ── Cinématique (CIN-01) ─────────────────────────────────────
  function _playCinematic(ch, done) {
    var cfg = NAMEK_ISLE_INTRO[_currentNiveau + '_' + ch.numero];
    if (!cfg) { done(); return; }

    var ov = document.getElementById('namek-cine-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'namek-cine-overlay';
      document.body.appendChild(ov);
    }
    ov.style.display = 'flex';
    ov.style.zIndex  = '9500';
    ov.style.background = cfg.bg || '#000';

    var hero = ch.hero_image || (JJK_STORAGE + 'characters/yuji.png');
    var lines = (cfg.lines || []).map(function(l, i){
      return '<div class="namek-cine-line" style="animation-delay:'+(i*0.4)+'s">'+l+'</div>';
    }).join('');

    ov.innerHTML = ''
      + '<div class="namek-cine-inner">'
      + '  <div class="namek-cine-content">'
      + '    <div class="namek-cine-kanji" style="color:'+(cfg.kanjiColor||'#fff')+'">'+(cfg.kanji||'')+'</div>'
      + '    <div class="namek-cine-lines">'+lines+'</div>'
      + '    <div class="namek-cine-bubble">'
      + '      <span class="namek-cine-char-name" style="color:'+(cfg.kanjiColor||'#fff')+'">'+(ch.hero_name||'').toUpperCase()+'</span>'
      + (cfg.bubble||'')
      + '    </div>'
      + '  </div>'
      + '  <div class="namek-cine-char-wrap">'
      + '    <img class="namek-cine-char" src="'+hero+'" alt="">'
      + '  </div>'
      + '</div>'
      + '<button class="namek-skip-btn" onclick="namek_skipCine()">⏭ PASSER</button>';

    if ('speechSynthesis' in window) {
      try {
        var u = new SpeechSynthesisUtterance((cfg.lines||[]).join(' ') + ' ' + (cfg.bubble||''));
        u.lang = 'fr-FR'; u.rate = 0.95;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      } catch (e) {}
    }

    ov._cb = done;
    ov._t  = setTimeout(function(){ window.namek_skipCine(); }, 7000);
  }

  // ── Lancement quiz (AP_QuizEngine) ───────────────────────────
  function _launchQuiz(chapitreId, ch) {
    if (!window.AP_QuizEngine) { console.error('[namek] AP_QuizEngine manquant'); return; }
    _hide('namek-iles-sec'); _hide('namek-levels-sec');
    _show('namek-quiz-sec');
    window.scrollTo(0, 0);

    window.AP_QuizEngine.launch(chapitreId, {
      matiere:    MATIERE_CODE,
      niveau:     _currentNiveau,
      quizSecId:  'namek-quiz-sec',
      ilesSecId:  'namek-iles-sec',
      containerId:'namek-qContainer',
      titleId:    'namek-qTitle',
      progFillId: 'namek-qProgFill',
      progLblId:  'namek-qProgLbl',
      bgmBack:    'jjk-map',
      onBack: function() {
        _hide('namek-quiz-sec');
        _show('namek-iles-sec');
        var niveau = NIVEAUX.find(function(n){ return n.code===_currentNiveau; });
        if (niveau) _buildGrid(niveau);
        if (typeof playBGM === 'function') setTimeout(function(){ playBGM('jjk-map'); }, 300);
      }
    });
  }

  // ── Exports globaux ──────────────────────────────────────────
  window.namek_skipCine = function() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    var ov = document.getElementById('namek-cine-overlay');
    if (!ov) return;
    clearTimeout(ov._t);
    var cb = ov._cb;
    ov.style.display='none'; ov.style.zIndex='-1'; ov.innerHTML='';
    if (cb) cb();
  };
  window.showNamekV2     = showNamekV2;
  window.namek_showLevel = showLevel;
  window.namek_showLevels= function(){ showNamekV2(true); };
  window.namek_startIsland = startIsland;
  window.loadNamekBgStrips = loadNamekBgStrips;

  console.info('🔮 quiz-router-namek.js v2 — Géographie · Jujutsu Kaisen · CM2 · Pattern Grand Bleu');
})();
