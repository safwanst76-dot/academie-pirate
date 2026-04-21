// ═══════════════════════════════════════════════════════════════════
// QUIZ-ROUTER-MAGNOLIA.JS V2 — Académie Pirate
// 🐉 Magnolia · Histoire · Dragon Ball Z
// Pattern exact Grand Bleu V3
// PREFIX: hist | MATIERE: histoire | STORAGE: local assets/images/dbz/
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var _currentNiveau = null;
  var _chapitres     = [];
  var _histBgLoaded  = false;
  var MATIERE_CODE   = 'histoire';
  var DBZ_STORAGE    = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-magnolia/';

  // ── Cinématiques : clé 'niveau_numero' ──────────────────────────
  var HIST_ISLE_INTRO = {
    // CM2 — Préhistoire & Antiquité
    'cm2_1': { bg:'#0a0500', lines:['PRÉHISTOIRE…','… LES PREMIERS HOMMES !','Goku sait tout !'], kanji:'先史 !!', kanjiColor:'#f97316', bubble:"Kaméhaméha ! Les premiers Homo sapiens apparaissent en Afrique il y a 300 000 ans. L'outil change tout !" },
    'cm2_2': { bg:'#050a00', lines:['MÉSOPOTAMIE…','… LE CROISSANT FERTILE !','Bulma analyse !'], kanji:'文明 !!', kanjiColor:'#22c55e', bubble:"J'ai inventé le Radar Dragon ! Les Sumériens ont inventé l'écriture cunéiforme vers 3300 av. J.-C. !" },
    'cm2_3': { bg:'#000a0a', lines:['ÉGYPTE…','… LES PHARAONS !','Krilin est prêt !'], kanji:'王国 !!', kanjiColor:'#eab308', bubble:"Destructo-Disque ! L'Égypte ancienne dure 3000 ans. Le pharaon est dieu-roi. Les pyramides défient le temps !" },
    'cm2_4': { bg:'#0a000a', lines:['GRÈCE…','… ATHÈNES !','Gohan a étudié !'], kanji:'民主 !!', kanjiColor:'#a855f7', bubble:"Je protège mes amis ! La démocratie athénienne naît au Vème siècle av. J.-C. Les citoyens votent à l'Agora !" },
    'cm2_5': { bg:'#00050a', lines:['ROME…','… LA RÉPUBLIQUE !','Piccolo observe !'], kanji:'共和国 !!', kanjiColor:'#6366f1', bubble:"Je surpasserai Kami ! Rome fonde la République en 509 av. J.-C. Le Sénat dirige. SPQR !" },
    'cm2_6': { bg:'#0a0800', lines:['EMPIRE…','… ROMAIN !','Trunks voyage !'], kanji:'帝国 !!', kanjiColor:'#f59e0b', bubble:"Je viens du futur ! L'Empire romain à son apogée contrôle 50 millions de personnes. Auguste, premier emperor !" },
    'cm2_7': { bg:'#080000', lines:['CHRISTIANISME…','… SES DÉBUTS !','Android 18 analyse !'], kanji:'信仰 !!', kanjiColor:'#ec4899', bubble:"Jésus naît en Palestine sous l'Empire romain. Ses disciples répandent sa parole. Une religion nouvelle est née !" },
    'cm2_8': { bg:'#000a00', lines:['INVASIONS…','… CHUTE DE ROME !','Vegeta combat !'], kanji:'滅亡 !!', kanjiColor:'#ef4444', bubble:"Je suis le Prince des Saiyans ! Les peuples germaniques envahissent. Rome chute en 476 ap. J.-C. !" },
    // 6ème — L'Antiquité complète
    '6eme_1': { bg:'#0a0300', lines:['HUMANITÉ…','… SES ORIGINES !','Goku remonte le temps !'], kanji:'起源 !!', kanjiColor:'#f97316', bubble:"J'ai toujours aimé me battre ! L'Homo sapiens quitte l'Afrique et peuple la Terre entière il y a 70 000 ans !" },
    '6eme_2': { bg:'#030a00', lines:['GRÈCE…','… DÉMOCRATIE !','Gohan a tout lu !'], kanji:'民主主義 !!', kanjiColor:'#22c55e', bubble:"La connaissance est ma force ! Clisthène invente la démocratie en 508 av. J.-C. Tous les citoyens votent !" },
    '6eme_3': { bg:'#00030a', lines:['ALEXANDRE…','… LE GRAND !','Krilin conquiert !'], kanji:'征服 !!', kanjiColor:'#3b82f6', bubble:"Alexandre conquiert un empire de la Grèce à l'Inde en 13 ans. L'hellénisme se répand partout !" },
    '6eme_4': { bg:'#0a000a', lines:['ROME…','… FONDATION !','Trunks bâtit !'], kanji:'建国 !!', kanjiColor:'#8b5cf6', bubble:"Je construis pour l'avenir ! Romulus fonde Rome en 753 av. J.-C. selon la légende. La louve nourrit les jumeaux !" },
    '6eme_5': { bg:'#00080a', lines:['EMPIRE…','… ROMAIN !','Piccolo domine !'], kanji:'支配 !!', kanjiColor:'#06b6d4', bubble:"La paix de Rome — Pax Romana — dure 200 ans. Routes, aqueducs, thermes : Rome civilise le monde !" },
    '6eme_6': { bg:'#0a0500', lines:['CHRISTIANISME…','… EMPIRE !','Bulma enquête !'], kanji:'宗教 !!', kanjiColor:'#f59e0b', bubble:"En 313, Constantin légalise le christianisme avec l'Édit de Milan. Une religion change l'Empire !" },
    '6eme_7': { bg:'#050000', lines:['ROYAUMES…','… BARBARES !','Android 17 résiste !'], kanji:'侵略 !!', kanjiColor:'#ef4444', bubble:"Wisigoths, Francs, Vandales… Les royaumes germaniques remplacent Rome. Une nouvelle Europe se forme !" },
    '6eme_8': { bg:'#000505', lines:['BILAN…','… ANTIQUITÉ !','Vegeta conclut !'], kanji:'総括 !!', kanjiColor:'#a855f7', bubble:"Je suis le plus fort ! L'Antiquité va de -3300 à 476 ap. J.-C. Elle pose les bases de notre civilisation !" },
    // 5ème — Le Moyen Âge
    '5eme_1': { bg:'#0a0500', lines:['ISLAM…','… VII° SIÈCLE !','Goku médite !'], kanji:'啓示 !!', kanjiColor:'#f97316', bubble:"En 622, Mahomet quitte La Mecque pour Médine — c'est l'Hégire. Début du calendrier musulman !" },
    '5eme_2': { bg:'#000a05', lines:['CHARLEMAGNE…','… L\'EMPIRE !','Vegeta règne !'], kanji:'帝冠 !!', kanjiColor:'#22c55e', bubble:"Le jour de Noël 800, le pape couronne Charlemagne Empereur. Un empire carolingien s'étend sur l'Europe !" },
    '5eme_3': { bg:'#05000a', lines:['FÉODALITÉ…','… SEIGNEURS !','Trunks jure fidélité !'], kanji:'封建 !!', kanjiColor:'#8b5cf6', bubble:"Je protège mes vassaux ! Le vassal jure fidélité au seigneur et reçoit un fief. La pyramide féodale s'organise !" },
    '5eme_4': { bg:'#0a0800', lines:['L\'ÉGLISE…','… MOYEN ÂGE !','Gohan prie !'], kanji:'教会 !!', kanjiColor:'#eab308', bubble:"L'Église structure toute la société médiévale. Le pape, les évêques, les monastères : la foi partout !" },
    '5eme_5': { bg:'#000a0a', lines:['CROISADES…','… TERRE SAINTE !','Piccolo part !'], kanji:'十字軍 !!', kanjiColor:'#6366f1', bubble:"En 1095, le pape Urbain II appelle à libérer Jérusalem. Les croisades durent 200 ans !" },
    '5eme_6': { bg:'#0a0005', lines:['PESTE NOIRE…','… XIV° S. !','Android 18 lutte !'], kanji:'黒死病 !!', kanjiColor:'#ec4899', bubble:"1347-1351 : la Peste noire tue un tiers de l'Europe. La société médiévale est ébranlée !" },
    '5eme_7': { bg:'#050a05', lines:['CENT ANS…','… JEANNE D\'ARC !','Krilin résiste !'], kanji:'百年 !!', kanjiColor:'#f59e0b', bubble:"1337-1453 : la Guerre de Cent Ans oppose France et Angleterre. Jeanne d'Arc renverse le destin en 1429 !" },
    '5eme_8': { bg:'#0a000a', lines:['FIN DU…','… MOYEN ÂGE !','Goten conclut !'], kanji:'終焉 !!', kanjiColor:'#ef4444', bubble:"1453 : chute de Constantinople. L'imprimerie de Gutenberg. Les grandes découvertes. Le Moyen Âge s'achève !" },
    // 4ème — Temps Modernes & Révolution
    '4eme_1': { bg:'#0a0800', lines:['RENAISSANCE…','… L\'ART RENAÎT !','Goku s\'éveille !'], kanji:'復興 !!', kanjiColor:'#f97316', bubble:"XV°-XVI° siècle : la Renaissance redécouvre l'Antiquité. Léonard de Vinci, Michel-Ange, Raphaël !" },
    '4eme_2': { bg:'#000a08', lines:['DÉCOUVERTES…','… NOUVEAU MONDE !','Bulma explore !'], kanji:'発見 !!', kanjiColor:'#22c55e', bubble:"1492 : Christophe Colomb atteint l'Amérique. Vasco de Gama, Magellan… Le monde est plus grand que prévu !" },
    '4eme_3': { bg:'#08000a', lines:['RÉFORME…','… LUTHER !','Gohan remet en question !'], kanji:'改革 !!', kanjiColor:'#a855f7', bubble:"1517 : Luther affiche ses 95 thèses. La Réforme protestante divise la chrétienté en deux !" },
    '4eme_4': { bg:'#0a0000', lines:['LOUIS XIV…','… LE ROI SOLEIL !','Vegeta règne !'], kanji:'絶対王政 !!', kanjiColor:'#eab308', bubble:"L'État c'est moi ! Louis XIV concentre tous les pouvoirs. Versailles éblouit l'Europe entière !" },
    '4eme_5': { bg:'#000a0a', lines:['LUMIÈRES…','… PHILOSOPHIE !','Trunks pense !'], kanji:'啓蒙 !!', kanjiColor:'#3b82f6', bubble:"Voltaire, Rousseau, Montesquieu : les Lumières défendent la raison et la liberté contre l'absolutisme !" },
    '4eme_6': { bg:'#0a000a', lines:['RÉVOLUTION…','… 1789 !','Piccolo se soulève !'], kanji:'革命 !!', kanjiColor:'#ef4444', bubble:"14 juillet 1789 : prise de la Bastille ! La Déclaration des Droits de l'Homme change la France et le monde !" },
    '4eme_7': { bg:'#000808', lines:['NAPOLÉON…','… L\'EMPIRE !','Android 17 conquiert !'], kanji:'征服 !!', kanjiColor:'#f59e0b', bubble:"Napoléon Bonaparte, Premier Consul puis Empereur, répand les idées révolutionnaires à travers l'Europe !" },
    '4eme_8': { bg:'#050a00', lines:['BILAN…','… 4ÈME !','Krilin synthétise !'], kanji:'総合 !!', kanjiColor:'#06b6d4', bubble:"Renaissance, Réforme, Révolution : trois R qui transforment l'Europe du XV° au XIX° siècle !" },
    // 3ème — Époque contemporaine & Brevet
    '3eme_1': { bg:'#0a0300', lines:['XIX° SIÈCLE…','… INDUSTRIE !','Goku travaille !'], kanji:'産業革命 !!', kanjiColor:'#f97316', bubble:"La machine à vapeur, le chemin de fer, l'usine : la Révolution industrielle transforme l'économie et la société !" },
    '3eme_2': { bg:'#030a00', lines:['IMPÉRIALISME…','… COLONIAL !','Vegeta domine !'], kanji:'植民地 !!', kanjiColor:'#22c55e', bubble:"À la fin du XIX° siècle, l'Europe colonise l'Afrique et l'Asie. La conférence de Berlin partage l'Afrique !" },
    '3eme_3': { bg:'#0a000a', lines:['GRANDE GUERRE…','… 1914-1918 !','Gohan combat !'], kanji:'大戦 !!', kanjiColor:'#ef4444', bubble:"28 juin 1914 : assassinat de François-Ferdinand. La Première Guerre mondiale éclate. 18 millions de morts !" },
    '3eme_4': { bg:'#00050a', lines:['TOTALITARISMES…','… ENTRE-DEUX !','Piccolo résiste !'], kanji:'独裁 !!', kanjiColor:'#6366f1', bubble:"Fascisme en Italie, nazisme en Allemagne, stalinisme en URSS : les années 30 voient triompher les dictatures !" },
    '3eme_5': { bg:'#0a0500', lines:['SECONDE GUERRE…','… 1939-1945 !','Trunks protège !'], kanji:'世界大戦 !!', kanjiColor:'#8b5cf6', bubble:"Résistance, Shoah, Débarquement, Hiroshima… La Seconde Guerre mondiale est la plus meurtrière de l'histoire !" },
    '3eme_6': { bg:'#050000', lines:['GUERRE FROIDE…','… USA vs URSS !','Android 18 choisit !'], kanji:'冷戦 !!', kanjiColor:'#ec4899', bubble:"1947-1991 : deux blocs s'affrontent sans combattre directement. Course aux armements, Mur de Berlin, NASA !" },
    '3eme_7': { bg:'#000a05', lines:['DÉCOLONISATION…','… Ve RÉPUBLIQUE !','Bulma construit !'], kanji:'独立 !!', kanjiColor:'#f59e0b', bubble:"1958 : de Gaulle fonde la Ve République. Pendant ce temps, les colonies africaines et asiatiques accèdent à l'indépendance !" },
    '3eme_8': { bg:'#0a0a00', lines:['EUROPE…','… BREVET !','Goten est prêt !'], kanji:'統合 !!', kanjiColor:'#06b6d4', bubble:"1957 : Traité de Rome. L'Union européenne se construit pas à pas. La paix et la coopération comme idéal !" },
  };

  var NIVEAUX = [
    { code:'cm2',  nom:'CM2',  emoji:'⭐',         color:'#f97316', desc:'Préhistoire & Premières civilisations' },
    { code:'6eme', nom:'6ème', emoji:'⭐⭐',        color:'#22c55e', desc:'L\'Antiquité complète' },
    { code:'5eme', nom:'5ème', emoji:'⭐⭐⭐',      color:'#8b5cf6', desc:'Le Moyen Âge' },
    { code:'4eme', nom:'4ème', emoji:'⭐⭐⭐⭐',    color:'#ef4444', desc:'Temps Modernes & Révolution' },
    { code:'3eme', nom:'3ème', emoji:'⭐⭐⭐⭐⭐',  color:'#3b82f6', desc:'Époque contemporaine & Brevet' },
  ];

  // ── Fond animé DBZ local ─────────────────────────────────────
  function loadHistBgStrips() {
    if (_histBgLoaded) return;
    _histBgLoaded = true;
    var bg = document.getElementById('hist-bg');
    if (!bg) return;
    bg.innerHTML = '';
    var imgs = [
      'goku.jpg','vegeta.jpg','gohan.jpg','trunks.jpg',
      'piccolo.png','krilin.jpg','android18.jpg','bulma.jpg',
      'broly.jpg','freezer.png','majinbuu.png','cell.jpg',
    ].map(function(f){ return DBZ_STORAGE + 'characters/' + f; });
    var doubled = imgs.concat(imgs);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'hist-bg-strip';
      var si = doubled.filter(function(_,i){ return i%5===s; });
      if (!si.length) si = doubled.slice(0,3);
      si.forEach(function(src){
        var img = document.createElement('img');
        img.src = src; img.alt = ''; img.loading = 'lazy';
        img.onerror = function(){ this.style.display='none'; };
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  }

  // ── Afficher Magnolia V2 ──────────────────────────────────────
  function showMagnoliaV2(silent) {
    if (!silent && window.history && window.history.pushState)
      history.pushState(null,'','#/magnolia');
    if (window.AP) window.AP.trackWorldEnter('magnolia');
    if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('magnolia');

    // Règle NR-01 : appel hideAll() global (comme Grand Bleu) pour masquer globe/carte
    if (typeof hideAll === 'function') hideAll();
    _hideAll();

    // Masquer manga-bg (pattern Grand Bleu)
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';

    var bg = document.getElementById('hist-bg');
    if (bg) { bg.classList.add('visible'); loadHistBgStrips(); }

    var sec = document.getElementById('hist-levels-sec');
    if (sec) { sec.style.display = 'block'; _buildLevels(); }

    // Règle AU-04 : BGM après affichage, délai 500ms
    if (typeof playBGM === 'function')
      setTimeout(function(){ playBGM('dbz-map'); }, 500);
    document.title = 'Académie Pirate — Magnolia Histoire';
  }

  // ── Grille des niveaux ────────────────────────────────────────
  function _buildLevels() {
    var sec = document.getElementById('hist-levels-sec');
    if (!sec) return;
    var html = '<div class="hist-world-header">' +
      '<div class="hist-world-title">🐉 MAGNOLIA — HISTOIRE</div>' +
      '<div class="hist-world-sub">Maîtrise l\'Histoire — Conquiers les Ères !</div>' +
    '</div>' +
    '<div class="hist-levels-grid">';
    NIVEAUX.forEach(function(niv) {
      html +=
        '<div class="hist-level-card" style="--level-color:'+niv.color+'" ' +
          'onclick="window.hist_showLevel(\''+niv.code+'\')">' +
          '<div class="hist-level-emoji">'+niv.emoji+'</div>' +
          '<div class="hist-level-nom">'+niv.nom+'</div>' +
          '<div class="hist-level-desc">'+niv.desc+'</div>' +
          '<div class="hist-level-btn" style="background:'+niv.color+'">Commencer</div>' +
        '</div>';
    });
    html += '</div>';
    sec.innerHTML = html;
  }

  // ── Afficher un niveau ────────────────────────────────────────
  async function showLevel(niveauCode, silent) {
    _currentNiveau = niveauCode;
    var niveau = NIVEAUX.find(function(n){ return n.code===niveauCode; });
    if (!niveau) return;

    if (!silent && window.history && window.history.pushState)
      history.pushState(null,'','#/magnolia/'+niveauCode);

    // Pattern Grand Bleu : hideAll() + masquer map-sec + manga-bg
    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var mapSec = document.getElementById('map-sec');
    if (mapSec) mapSec.style.display = 'none';
    var bg = document.getElementById('hist-bg');
    if (bg) { bg.classList.add('visible'); loadHistBgStrips(); }

    _show('hist-iles-sec'); _hide('hist-levels-sec'); _hide('hist-quiz-sec');
    window.scrollTo(0, 0);

    _chapitres = [];
    if (window.AP_QuizEngine) {
      _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, niveauCode);
    }
    var progress = window.AP_QuizEngine
      ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, niveauCode) : {};
    _buildGrid(niveau, progress);
  }

  // ── Grille des îles ───────────────────────────────────────────
  function _buildGrid(niveau, progress) {
    var ilesEl = document.getElementById('hist-iles-sec');
    if (!ilesEl) return;
    var backBtn = '<button class="hist-back-btn" onclick="window.hist_showLevels()">← Niveaux</button>';
    var header  = '<div class="hist-map-header">' + backBtn +
      '<div class="hist-map-title">🐉 '+niveau.nom+' — HISTOIRE</div>' +
      '<div class="hist-map-sub">'+niveau.desc+' · Dragon Ball Z</div>' +
      '</div>';

    if (!_chapitres.length) {
      ilesEl.innerHTML = header +
        '<div style="text-align:center;padding:60px;color:rgba(255,255,255,.4);' +
        'font-family:Nunito,sans-serif;font-weight:800">🔒 Ce niveau arrive bientôt !</div>';
      return;
    }
    var grid = '<div class="hist-islands-grid">';
    _chapitres.forEach(function(ch) {
      var key   = MATIERE_CODE+'_'+_currentNiveau+'_'+ch.numero;
      var prog  = progress[key];
      var done  = !!prog;
      var score = prog ? prog.score : 0;
      var total = prog ? prog.total : 11;
      var color = ch.ile_color || '#f97316';
      var img   = ch.hero_image || '';
      grid +=
        '<div class="hist-isle-card'+(done?' done':'')+'" ' +
          'style="--isle-color:'+color+'" ' +
          'onclick="window.hist_startIsland(\''+ch.id+'\')">' +
          '<div class="hist-isle-img-wrap">' +
            '<img class="hist-isle-img" src="'+img+'" alt="'+(ch.hero_name||'')+'" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="hist-isle-img-fallback" style="background:'+color+'22;color:'+color+'">🐉</div>' +
            '<div class="hist-isle-overlay" style="background:linear-gradient(to top,'+color+'66,transparent)"></div>' +
          '</div>' +
          '<div class="hist-isle-body">' +
            '<div class="hist-isle-num">ÎLE #'+ch.numero+'</div>' +
            '<div class="hist-isle-name" style="color:'+color+'">'+((ch.nom||'').toUpperCase())+'</div>' +
            '<div class="hist-isle-topic">'+(ch.topic||'')+'</div>' +
            '<div class="hist-isle-level" style="border-color:'+color+'55;color:'+color+'">'+niveau.nom+'</div>' +
            (done?'<div class="hist-isle-stars">'+score+'/'+total+'</div>':'') +
          '</div>' +
        '</div>';
    });
    grid += '</div>';
    ilesEl.innerHTML = header + grid;
  }

  // ── Lancer une île ────────────────────────────────────────────
  function startIsland(chapitreId) {
    if (!chapitreId) return;
    var ch = _chapitres.find(function(c){ return c.id===chapitreId; });
    if (!ch) return;
    if (typeof lesson_magnolia === 'function') {
      lesson_magnolia(_currentNiveau, ch.numero, function() {
        if (typeof playBGM === 'function') playBGM(ch.bgm || 'dbz-map');
        _playCinematic(ch, function(){ _launchQuiz(chapitreId, ch); });
      });
    } else {
      if (typeof playBGM === 'function') playBGM(ch.bgm || 'dbz-map');
      _playCinematic(ch, function(){ _launchQuiz(chapitreId, ch); });
    }
  }

  // ── Cinématique intro ─────────────────────────────────────────
  function _playCinematic(ch, callback) {
    var cfg = HIST_ISLE_INTRO[_currentNiveau+'_'+ch.numero];
    if (!cfg) { if (callback) callback(); return; }
    var ov = document.getElementById('hist-cine-overlay');
    if (!ov) { ov = document.createElement('div'); ov.id='hist-cine-overlay'; document.body.appendChild(ov); }
    ov.innerHTML =
      '<div class="hist-cine-inner" style="background:'+cfg.bg+';min-height:100vh;width:100%">' +
        '<div class="hist-cine-char-wrap">' +
          '<img src="'+(ch.hero_image||'')+'" class="hist-cine-char" ' +
            'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="hist-cine-char-emoji" style="color:'+cfg.kanjiColor+'">🐉</div>' +
        '</div>' +
        '<div class="hist-cine-content">' +
          '<div class="hist-cine-kanji" style="color:'+cfg.kanjiColor+'">'+cfg.kanji+'</div>' +
          '<div class="hist-cine-lines">' +
            cfg.lines.map(function(l){ return '<div class="hist-cine-line">'+l+'</div>'; }).join('') +
          '</div>' +
          '<div class="hist-cine-bubble">' +
            '<span class="hist-cine-char-name" style="color:'+cfg.kanjiColor+'">'+(ch.hero_name||'')+'</span> ' +
            '<span class="hist-cine-bubble-text">"'+cfg.bubble+'"</span>' +
          '</div>' +
        '</div>' +
        '<button class="hist-skip-btn" onclick="window.hist_skipCine()">⏭ PASSER</button>' +
      '</div>';
    ov.style.cssText='position:fixed;inset:0;z-index:9500;display:flex;background:'+cfg.bg+
      ';opacity:0;transition:opacity .3s;pointer-events:auto';
    ov._cb = callback;
    requestAnimationFrame(function(){ ov.style.opacity='1'; });
    ov._t = setTimeout(window.hist_skipCine, 7000);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var utt = new SpeechSynthesisUtterance(cfg.bubble);
      utt.lang='fr-FR'; utt.rate=0.9; utt.pitch=1.1;
      window.speechSynthesis.speak(utt);
    }
  }

  // ── Lancer le quiz ────────────────────────────────────────────
  function _launchQuiz(chapitreId, ch) {
    if (!window.AP_QuizEngine) { console.error('[HistRouter] AP_QuizEngine manquant'); return; }
    _show('hist-quiz-sec');
    _hide('hist-iles-sec');
    _hide('hist-levels-sec');
    window.AP_QuizEngine.launch(chapitreId, {
      matiere:    MATIERE_CODE,
      niveau:     _currentNiveau,
      quizSecId:  'hist-quiz-sec',
      ilesSecId:  'hist-iles-sec',
      containerId:'hist-qContainer',
      titleId:    'hist-qTitle',
      progFillId: 'hist-qProgFill',
      progLblId:  'hist-qProgLbl',
      bgmBack:    'dbz-map',
      onBack: function() {
        _hide('hist-quiz-sec');
        _show('hist-iles-sec');
        var niveau = NIVEAUX.find(function(n){ return n.code===_currentNiveau; });
        var progress = window.AP_QuizEngine
          ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, _currentNiveau) : {};
        if (niveau) _buildGrid(niveau, progress);
        if (typeof playBGM === 'function') setTimeout(function(){ playBGM('dbz-map'); }, 300);
      },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────
  function _show(id){ var el=document.getElementById(id); if(el) el.style.display='block'; }
  function _hide(id){ var el=document.getElementById(id); if(el) el.style.display='none';  }
  function _hideAll() {
    ['hist-levels-sec','hist-iles-sec','hist-quiz-sec'].forEach(_hide);
    var bg = document.getElementById('hist-bg');
    if (bg) bg.classList.remove('visible');
  }

  // ── Exports globaux ───────────────────────────────────────────
  window.hist_skipCine = function() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    var ov = document.getElementById('hist-cine-overlay');
    if (!ov) return;
    clearTimeout(ov._t);
    var cb = ov._cb;
    ov.style.display='none'; ov.style.zIndex='-1'; ov.innerHTML='';
    if (cb) cb();
  };
  window.showMagnoliaV2  = showMagnoliaV2;
  window.hist_showLevel  = showLevel;
  window.hist_showLevels = function(){ showMagnoliaV2(true); };
  window.hist_startIsland= startIsland;
  window.loadHistBgStrips= loadHistBgStrips;

  console.info('🐉 quiz-router-magnolia.js v2 — Histoire · Dragon Ball Z · 5 niveaux · Pattern Grand Bleu');
})();
