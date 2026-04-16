// ═══════════════════════════════════════════════════════════════
// QUIZ-ROUTER-PAYS-DU-FEU.JS V2 — Académie Pirate
// Maths × Naruto | CM2 → 3ème
// Pattern : WORLD_EVOLUTION_PATTERN.md — ARCHI-01
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var MATIERE_CODE = 'maths';
  var BUCKET       = 'pays-du-feu';
  var STORAGE_BASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/' + BUCKET + '/';

  var _currentNiveau  = null;
  var _chapitres      = [];
  var _progressionKey = 'pdf_progression_v2';

  var NIVEAUX = [
    { code: 'cm2',  nom: 'CM2',  emoji: '\u2B50',         color: '#F97316', desc: 'Nombres, mesures, géométrie' },
    { code: '6eme', nom: '6ème', emoji: '\u2B50\u2B50',         color: '#ef4444', desc: 'Fractions, proportionnalité, cercle' },
    { code: '5eme', nom: '5ème', emoji: '\u2B50\u2B50\u2B50',       color: '#8b5cf6', desc: 'Pythagore, calcul littéral' },
    { code: '4eme', nom: '4ème', emoji: '\u2B50\u2B50\u2B50\u2B50',     color: '#22c55e', desc: 'Équations, probabilités, cosinus' },
    { code: '3eme', nom: '3ème', emoji: '\u{1F3C6}',           color: '#fbbf24', desc: 'Fonctions, Thalès, trigonométrie' }
  ];

  // CIN-01 : clé = 'niveau_numero'
  var PDF_ISLE_INTRO = {
    'cm2_1': { bg: '#0d0500', lines: ['Naruto Uzumaki...', '... ouvre son carnet de maths !!', 'LES GRANDS NOMBRES T\'ATTENDENT !'], kanji: '\u6570\u5b57 !!', kanjiColor: '#F97316', bubble: "Crois en toi ! Les milliards n'ont aucun secret pour un futur Hokage !" },
    'cm2_2': { bg: '#0d0005', lines: ['Sakura Haruno...', '... sort ses potions de fractions !!', 'NUMÉRATEUR VS DÉNOMINATEUR !'], kanji: '\u5206\u6570 !!', kanjiColor: '#ec4899', bubble: "Concentration maximale ! Une fraction c'est juste une pizza découpée !" },
    'cm2_3': { bg: '#000510', lines: ['Sasuke Uchiha...', '... active son Sharingan des tables !!', 'LA MULTIPLICATION NE ME TROMPERA PAS !'], kanji: '\u4e57\u7b97 !!', kanjiColor: '#3b82f6', bubble: "Je ne perdrai jamais... face à une multiplication. Prépare-toi !" },
    'cm2_4': { bg: '#050505', lines: ['Kakashi Hatake...', '... aligne ses virgules au millimètre !!', 'VIRGULES ALIGNÉES — VICTOIRE ASSURÉE !'], kanji: '\u5c0f\u6570 !!', kanjiColor: '#6b7280', bubble: "Désolé d'être en retard... j'alignais mes décimaux. Suis-moi !" },
    'cm2_5': { bg: '#001000', lines: ['Rock Lee...', '... soulève 500 kg de conversions !!', "L'ENTRAÎNEMENT EST LA CLÉ !"], kanji: '\u5909\u63db !!', kanjiColor: '#22c55e', bubble: "Je ne suis pas un génie, mais je maîtrise TOUTES les conversions !" },
    'cm2_6': { bg: '#0a0018', lines: ['Hinata Hyuga...', '... mesure chaque côté avec précision !!', 'PÉRIMÈTRE ET AIRE — MA SPÉCIALITÉ !'], kanji: '\u9762\u7a4d !!', kanjiColor: '#a855f7', bubble: "N-Naruto-kun... je vais t'expliquer la différence entre aire et périmètre !" },
    'cm2_7': { bg: '#0a0402', lines: ['Gaara du Désert...', '... sculpte des figures géométriques dans le sable !!', 'LA GÉOMÉTRIE EST MON ART !'], kanji: '\u5e7e\u4f55\u5b66 !!', kanjiColor: '#92400e', bubble: "Ma technique favorite ? La symétrie axiale. Prépare-toi !" },
    'cm2_8': { bg: '#1a0000', lines: ["L'Hokage lance son défi final...", '... OROCHIMARU SURGIT !!', 'PROPORTIONNALITÉ — BOSS FINAL CM2 !'], kanji: '\u6bd4\u4f8b !!', kanjiColor: '#dc2626', bubble: "Tu as survécu jusqu'ici ? La proportionnalité décidera de tout !" },
    '6eme_1': { bg: '#0d0500', lines: ['Naruto — Niveau Genin...', "La numération du collège l'attend !!", 'DÉCIMAUX ET ENTIERS SOUS CONTRÔLE !'], kanji: '\u6570 !!', kanjiColor: '#F97316', bubble: "6ème ? Piece of cake pour un futur Hokage !" },
    '6eme_2': { bg: '#0d0005', lines: ['Hinata...', '... fractions niveau collège !!', 'GO !'], kanji: '\u5206', kanjiColor: '#ec4899', bubble: "Les fractions, on les maîtrise ensemble !" },
    '6eme_3': { bg: '#000510', lines: ['Shikamaru...', '... proportionnalité !!', "C'est troublant..."], kanji: '\u6bd4', kanjiColor: '#3b82f6', bubble: "Quel problème troublant... mais je vais le résoudre !" },
    '6eme_4': { bg: '#050505', lines: ['Ino...', '... angles et droites !!', 'Précision !!'], kanji: '\u89d2', kanjiColor: '#6b7280', bubble: "Construire un angle à 47° ? Simple pour moi !" },
    '6eme_5': { bg: '#001000', lines: ['Choji...', '... aires et périmètres !!', 'Pour les pizzas !'], kanji: '\u5468', kanjiColor: '#22c55e', bubble: "Je calcule l'aire de chaque pizza avant de la manger !" },
    '6eme_6': { bg: '#0a0018', lines: ['Tenten...', '... cercle et disque !!', 'Précision !'], kanji: '\u5186', kanjiColor: '#a855f7', bubble: "Un cercle parfait. Comme mes armes !" },
    '6eme_7': { bg: '#0a0402', lines: ['Neji...', '... statistiques !!', 'Le destin des données...'], kanji: '\u7d71', kanjiColor: '#92400e', bubble: "Les données ne mentent pas. Analysons !" },
    '6eme_8': { bg: '#1a0000', lines: ['ZABUZA SURGIT !!', 'Boss final 6ème !!', 'RÉSISTE !'], kanji: '\u6ce2', kanjiColor: '#dc2626', bubble: "Montrez-moi vos maths de collège !" },
    '5eme_1': { bg: '#0d0500', lines: ['Naruto...', '... calcul littéral !!', 'X c\'est quoi ?!'], kanji: '\u6587\u5b57', kanjiColor: '#F97316', bubble: "X égale la puissance d'un ninja ! Trouvons-le !" },
    '5eme_2': { bg: '#000510', lines: ['Sasuke...', '... priorités opératoires !!', "L'ordre est crucial !"], kanji: '\u512a\u5148', kanjiColor: '#3b82f6', bubble: "Comme dans un combat : l'ordre des opérations est VITAL." },
    '5eme_3': { bg: '#0d0005', lines: ['Sakura...', '... le théorème de Pythagore !!', 'a²+b²=c² !'], kanji: '\u76f4\u89d2', kanjiColor: '#ec4899', bubble: "Pythagore ? Un grand ninja des maths !" },
    '5eme_4': { bg: '#001000', lines: ['Rock Lee...', '... aires avancées !!', 'Transpire et calcule !'], kanji: '\u9762\u7a4d', kanjiColor: '#22c55e', bubble: "Pour calculer l'aire d'un triangle, j'ai fait 1000 exercices !" },
    '5eme_5': { bg: '#0a0402', lines: ['Gaara...', '... la médiatrice !!', 'Équidistance !'], kanji: '\u5782\u76f4', kanjiColor: '#92400e', bubble: "La médiatrice : équidistante des deux extrémités !" },
    '5eme_6': { bg: '#050505', lines: ['Temari...', '... symétrie centrale !!', 'Retournement !'], kanji: '\u5bfe\u79f0', kanjiColor: '#6b7280', bubble: "La symétrie centrale, c'est comme lancer un boomerang !" },
    '5eme_7': { bg: '#0a0018', lines: ['Kankuro...', '... translations et rotations !!', 'En avant !'], kanji: '\u5909\u63db', kanjiColor: '#a855f7', bubble: "Chaque transformation est un mouvement de puppet !" },
    '5eme_8': { bg: '#1a0000', lines: ['OROCHIMARU REVIENT !!', 'Proportionnalité avancée !!', 'BOSS 5ème !'], kanji: '\u901f\u5ea6', kanjiColor: '#dc2626', bubble: "Vitesse, échelle, pourcentages... tu es prêt ?" },
    '4eme_1': { bg: '#0d0500', lines: ['Naruto...', '... les puissances !!', 'PUISSANCE MAXIMALE !'], kanji: '\u7d2f\u4e57', kanjiColor: '#F97316', bubble: "x^n = ma puissance au temps t !" },
    '4eme_2': { bg: '#000510', lines: ['Sasuke...', '... développer et factoriser !!', "L'algèbre !"], kanji: '\u5c55\u958b', kanjiColor: '#3b82f6', bubble: "Développer = attaquer. Factoriser = mettre en commun." },
    '4eme_3': { bg: '#0d0005', lines: ['Sakura...', '... les équations !!', 'x = ?'], kanji: '\u65b9\u7a0b\u5f0f', kanjiColor: '#ec4899', bubble: "Résoudre une équation, c'est trouver la vérité cachée !" },
    '4eme_4': { bg: '#050505', lines: ['Kakashi...', '... Pythagore avancé !!', 'La réciproque !'], kanji: '\u5b9a\u7406', kanjiColor: '#6b7280', bubble: "La réciproque de Pythagore : si c²=a²+b² alors angle droit !" },
    '4eme_5': { bg: '#0a0402', lines: ['Shikamaru...', '... statistiques avancées !!', 'Médiane !'], kanji: '\u7d71\u8a08', kanjiColor: '#92400e', bubble: "La médiane... troublant mais résolu !" },
    '4eme_6': { bg: '#0a0018', lines: ['Hinata...', '... probabilités !!', 'Hasard ?'], kanji: '\u78ba\u7387', kanjiColor: '#a855f7', bubble: "Le hasard n'existe pas pour un Hyuga !" },
    '4eme_7': { bg: '#001000', lines: ['Rock Lee...', '... le cosinus !!', 'SOH CAH TOA !'], kanji: '\u4f59\u5f26', kanjiColor: '#22c55e', bubble: "cos = côté adjacent / hypoténuse !" },
    '4eme_8': { bg: '#1a0000', lines: ['PAIN SURGIT !!', 'Boss final 4ème !!', 'LE VRAI NINJA !'], kanji: '\u75db\u307f', kanjiColor: '#dc2626', bubble: "Reconnais la douleur de l'algèbre... et tu comprends les maths !" },
    '3eme_1': { bg: '#0d0500', lines: ['Naruto...', '... les fonctions !!', 'f(x) !'], kanji: '\u95a2\u6570', kanjiColor: '#F97316', bubble: "f(x) = ma puissance au temps x. En route !" },
    '3eme_2': { bg: '#000510', lines: ['Sasuke...', '... identités remarquables !!', '(a+b)² !'], kanji: '\u56e0\u6570', kanjiColor: '#3b82f6', bubble: "(a+b)² = a² + 2ab + b². Mémorise !" },
    '3eme_3': { bg: '#0d0005', lines: ['Sakura...', "... systèmes d'équations !!", 'Deux inconnues !'], kanji: '\u9023\u7acb', kanjiColor: '#ec4899', bubble: "Deux équations, deux inconnues. Je peux les résoudre !" },
    '3eme_4': { bg: '#050505', lines: ['Kakashi...', '... le théorème de Thalès !!', 'Triangles semblables !'], kanji: '\u76f8\u4f3c', kanjiColor: '#6b7280', bubble: "Thalès : les triangles gardent leurs proportions." },
    '3eme_5': { bg: '#001000', lines: ['Minato Namikaze...', '... la trigonométrie !!', 'sin cos tan !'], kanji: '\u4e09\u89d2', kanjiColor: '#22c55e', bubble: "Le Yondaime Hokage enseigne : SOH CAH TOA !" },
    '3eme_6': { bg: '#0a0402', lines: ['Jiraiya...', '... probabilités avancées !!', 'La loi des grands nombres !'], kanji: '\u78ba\u7387', kanjiColor: '#92400e', bubble: "Le grand Jiraiya a tout vu... même les probabilités conditionnelles !" },
    '3eme_7': { bg: '#0a0018', lines: ['Tsunade...', '... volumes de solides !!', 'Sphères et cônes !'], kanji: '\u4f53\u7a4d', kanjiColor: '#a855f7', bubble: "Je calcule les volumes... de mes potions de guérison !" },
    '3eme_8': { bg: '#1a0000', lines: ['MADARA UCHIHA SURGIT !!', 'Boss ultime — Brevet blanc !!', "L'AFFRONTEMENT FINAL !"], kanji: '\u5922', kanjiColor: '#dc2626', bubble: "Tu penses maîtriser les maths de CM2 à la 3ème ? Prouve-le !" }
  };

  // Exports globaux (NR-01)
  window.showPaysduFeuV2 = showPaysduFeu;
  window.pdf_showLevel   = showLevel;
  window.pdf_startIsland = startIsland;
  window.pdf_skipCine    = skipCine;

  function showPaysduFeu() {
    _hidePDF();
    _renderLevels();
    var sec = document.getElementById('paysdufeu-levels-sec');
    if (sec) sec.style.display = 'block';
    if (typeof trackWorldEnter === 'function') trackWorldEnter('paysdufeu');
  }

  function _renderLevels() {
    var sec = document.getElementById('paysdufeu-levels-sec');
    if (!sec) return;
    var prog = _loadProgression();
    var html = '<div class="pdf-levels-wrap">';
    html += '<button class="pdf-back-btn" onclick="showCarte()">← Carte du monde</button>';
    html += '<h2 class="pdf-levels-title">🔥 Pays du Feu — Mathématiques</h2>';
    html += '<p class="pdf-levels-sub">Univers Naruto | Du CM2 à la 3ème</p>';
    html += '<div class="pdf-levels-grid">';
    NIVEAUX.forEach(function (niv) {
      var isLocked  = _isLocked(niv.code, prog);
      var completed = prog[niv.code] && prog[niv.code].completed;
      html += '<div class="pdf-level-card' + (isLocked ? ' locked' : '') + (completed ? ' completed' : '') + '"'
           + ' style="border-color:' + niv.color + '"'
           + (isLocked ? '' : ' onclick="pdf_showLevel(\'' + niv.code + '\')"') + '>';
      html += '<div class="pdf-level-emoji">' + niv.emoji + '</div>';
      html += '<div class="pdf-level-name">' + niv.nom + '</div>';
      html += '<div class="pdf-level-desc">' + niv.desc + '</div>';
      if (isLocked)  html += '<div class="pdf-level-lock">🔒</div>';
      if (completed) html += '<div class="pdf-level-done">✅</div>';
      html += '</div>';
    });
    html += '</div></div>';
    sec.innerHTML = html;
  }

  function showLevel(niveauCode) {
    _currentNiveau = niveauCode;
    _hidePDF();
    var niv = NIVEAUX.find(function (n) { return n.code === niveauCode; });
    if (!niv) return;
    if (typeof history !== 'undefined') history.pushState(null, '', '#/pays-du-feu/' + niveauCode);
    _fetchChapitres(niveauCode, function (chapitres) {
      _chapitres = chapitres;
      _renderIles(niveauCode, chapitres, niv);
    });
  }

  function _fetchChapitres(niveauCode, cb) {
    var url = 'https://bwxzrqsvccqmzvonsswi.supabase.co/rest/v1/v_chapitres_complets'
            + '?matiere_code=eq.' + MATIERE_CODE
            + '&niveau_code=eq.' + niveauCode
            + '&order=numero.asc';
    fetch(url, { headers: { 'apikey': window.SUPABASE_ANON_KEY || '', 'Authorization': 'Bearer ' + (window.SUPABASE_ANON_KEY || '') } })
    .then(function (r) { return r.json(); })
    .then(function (data) { cb(data || []); })
    .catch(function () { cb([]); });
  }

  function _renderIles(niveauCode, chapitres, niv) {
    var sec = document.getElementById('paysdufeu-iles-sec');
    if (!sec) { sec = document.createElement('section'); sec.id = 'paysdufeu-iles-sec'; document.body.appendChild(sec); }
    sec.style.display = 'block';
    var prog    = _loadProgression();
    var nivProg = prog[niveauCode] || {};
    var html    = '<div class="pdf-iles-wrap">';
    html += '<button class="pdf-back-btn" onclick="showPaysduFeu()">← Niveaux</button>';
    html += '<h2 class="pdf-iles-title" style="color:' + niv.color + '">' + niv.emoji + ' ' + niv.nom + ' — Maths</h2>';
    html += '<div class="pdf-iles-grid">';
    chapitres.forEach(function (ch) {
      var done  = nivProg[ch.numero] && nivProg[ch.numero].done;
      var score = (nivProg[ch.numero] && nivProg[ch.numero].score) || 0;
      html += '<div class="pdf-ile-card' + (done ? ' done' : '') + '"'
           + ' style="border-color:' + (ch.ile_color || niv.color) + '"'
           + ' onclick="pdf_startIsland(' + ch.numero + ',\'' + niveauCode + '\')">';
      html += '<img src="' + ch.hero_image + '" class="pdf-ile-hero" onerror="this.style.display=\'none\'">';
      html += '<div class="pdf-ile-num">Île ' + ch.numero + '</div>';
      html += '<div class="pdf-ile-name">' + ch.nom + '</div>';
      html += '<div class="pdf-ile-topic">' + ch.topic + '</div>';
      if (done) html += '<div class="pdf-ile-stars">' + _scoreToStars(score) + '</div>';
      html += '</div>';
    });
    html += '</div></div>';
    sec.innerHTML = html;
  }

  // Règle LG-01 : leçon AVANT quiz. Règle AU-04 : playBGM() dans le callback.
  function startIsland(numero, niveauCode) {
    niveauCode = niveauCode || _currentNiveau;
    var chapitre = _chapitres.find(function (c) { return c.numero === numero; });
    if (!chapitre) return;
    var cinKey  = niveauCode + '_' + numero;
    var cinData = PDF_ISLE_INTRO[cinKey] || { bg: '#0d0500', lines: ['En avant !'], kanji: '🔥', kanjiColor: '#F97316', bubble: "C'est parti !" };
    _showCinematic(cinData, function () {
      if (typeof lesson_paysdufeu === 'function') {
        lesson_paysdufeu(numero, function () {
          playBGM('pays-du-feu-' + niveauCode);
          _launchQuiz(chapitre, niveauCode);
        });
      } else {
        playBGM('pays-du-feu-' + niveauCode);
        _launchQuiz(chapitre, niveauCode);
      }
    });
  }

  function _showCinematic(data, cb) {
    var overlay = document.createElement('div');
    overlay.id  = 'pdf-cine-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:' + data.bg + ';z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;';
    var linesHtml = data.lines.map(function (l, i) {
      return '<div class="pdf-cine-line" style="animation-delay:' + (i * 0.6) + 's">' + l + '</div>';
    }).join('');
    overlay.innerHTML = '<div class="pdf-cine-kanji" style="color:' + data.kanjiColor + '">' + data.kanji + '</div>'
      + '<div class="pdf-cine-lines">' + linesHtml + '</div>'
      + '<div class="pdf-cine-bubble">' + data.bubble + '</div>'
      + '<button class="pdf-cine-skip" id="pdf-skip-btn" onclick="pdf_skipCine()">Passer →</button>';
    document.body.appendChild(overlay);
    _cineCb    = cb;
    _cineTimer = setTimeout(skipCine, 4000);
  }

  var _cineCb = null, _cineTimer = null;

  function skipCine() {
    if (_cineTimer) { clearTimeout(_cineTimer); _cineTimer = null; }
    var o = document.getElementById('pdf-cine-overlay');
    if (o) o.remove();
    if (_cineCb) { var fn = _cineCb; _cineCb = null; fn(); }
  }

  function _launchQuiz(chapitre, niveauCode) {
    _hidePDF();
    var quizSec = document.getElementById('paysdufeu-quiz-sec');
    if (!quizSec) { quizSec = document.createElement('section'); quizSec.id = 'paysdufeu-quiz-sec'; document.body.appendChild(quizSec); }
    quizSec.style.display = 'block';
    if (window.AP_QuizEngine && typeof AP_QuizEngine.launch === 'function') {
      AP_QuizEngine.launch({
        chapitreId: chapitre.id,
        heroName: chapitre.hero_name,
        heroImage: chapitre.hero_image,
        bossName: chapitre.boss_name,
        ileColor: chapitre.ile_color || '#F97316',
        worldKey: 'paysdufeu',
        container: quizSec,
        onComplete: function (score, total) {
          _saveIslandScore(_currentNiveau, chapitre.numero, score, total);
          if (window.AP && window.AP.recap) {
            AP.recap.show('paysdufeu', score, total, chapitre.numero, function () { showLevel(_currentNiveau); });
          } else { showLevel(_currentNiveau); }
        },
        onBack: function () { showLevel(_currentNiveau); }
      });
    } else {
      quizSec.innerHTML = '<div style="color:#F97316;text-align:center;padding:2rem"><h2>⚠️ Moteur quiz non chargé</h2><button onclick="showPaysduFeu()">Retour</button></div>';
    }
  }

  function _loadProgression() {
    try { return JSON.parse(localStorage.getItem(_progressionKey) || '{}'); } catch (e) { return {}; }
  }
  function _saveIslandScore(niveauCode, numero, score, total) {
    var prog = _loadProgression();
    if (!prog[niveauCode]) prog[niveauCode] = {};
    prog[niveauCode][numero] = { done: true, score: score, total: total, ts: Date.now() };
    var count = Object.keys(prog[niveauCode]).filter(function (k) { return !isNaN(k); }).length;
    if (count >= 8) prog[niveauCode].completed = true;
    try { localStorage.setItem(_progressionKey, JSON.stringify(prog)); } catch (e) {}
  }
  function _isLocked(code, prog) {
    var idx = NIVEAUX.findIndex(function (n) { return n.code === code; });
    if (idx === 0) return false;
    var prev = NIVEAUX[idx - 1];
    return !(prog[prev.code] && prog[prev.code].completed);
  }
  function _scoreToStars(score) {
    if (score >= 10) return '\u2B50\u2B50\u2B50';
    if (score >= 7)  return '\u2B50\u2B50';
    if (score >= 4)  return '\u2B50';
    return '';
  }
  function _hidePDF() {
    ['paysdufeu-levels-sec','paysdufeu-iles-sec','paysdufeu-quiz-sec'].forEach(function (id) {
      var el = document.getElementById(id); if (el) el.style.display = 'none';
    });
  }

})();
