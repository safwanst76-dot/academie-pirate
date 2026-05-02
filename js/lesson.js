// ═══════════════════════════════════════════════════════════════════════
// LESSON.JS — Académie Pirate
// Page Leçon : Héros animé (30s) + Contenu pédagogique coloré
// Lancée AVANT le quiz depuis startIsland() de chaque monde
// Règle ND-03 : overlay isolé z-index:8500, propre show/hide
// ═══════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// 1. DONNÉES PÉDAGOGIQUES — 4 MONDES × 8 ÎLES
// ══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// LESSON_DATA — EXTERNALISÉ dans js/worlds/[monde]/lesson-data.js
// Règle A3 : données séparées du moteur
// Les fichiers lesson-data.js s'enregistrent via LESSON_REGISTRY
// ═══════════════════════════════════════════════════════════════════

// Registry global — alimenté par chaque lesson-data.js
var LESSON_REGISTRY = window.LESSON_REGISTRY || {};

// Compatibilité rétro : LESSON_DATA pointe sur LESSON_REGISTRY
var LESSON_DATA = LESSON_REGISTRY;

// ══════════════════════════════════════════════════════════════
// 2. ÉTAT DE LA PAGE LEÇON
// ══════════════════════════════════════════════════════════════
var _lesson_world   = null;
var _lesson_island  = 0;
var _lesson_cb      = null; // callback → lance le quiz après la leçon
var _lesson_timer   = null;

// ══════════════════════════════════════════════════════════════
// 3. ENTRÉE PRINCIPALE — appelée par startIsland() de chaque monde
// ══════════════════════════════════════════════════════════════
function showLesson(worldKey, islandN, avatarUrl, color, callback) {
  var worldData = LESSON_DATA[worldKey];
  if (!worldData || !worldData.lessons[islandN]) {
    // Pas de leçon pour cette île → lancer le quiz directement
    if (callback) callback();
    return;
  }

  _lesson_world  = worldKey;
  _lesson_island = islandN;
  _lesson_cb     = callback;

  var lesson    = worldData.lessons[islandN];
  var worldCfg  = worldData;

  _buildLessonOverlay(lesson, worldCfg, avatarUrl, color, islandN);
}

// ══════════════════════════════════════════════════════════════
// 4. CONSTRUIRE L'OVERLAY
// ══════════════════════════════════════════════════════════════
function _buildLessonOverlay(lesson, worldCfg, avatarUrl, color, n) {
  var ov = document.getElementById('lesson-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'lesson-overlay';
    document.body.appendChild(ov);
  }

  var accent    = color || worldCfg.color;
  var bg        = worldCfg.bg || '#080010';
  var textAccent = worldCfg.textAccent || '#FFD700';
  var particles  = worldCfg.particles || 'fire';

  ov.innerHTML = _buildLessonHTML(lesson, accent, bg, textAccent, avatarUrl, n, worldCfg);
  ov.style.cssText = 'position:fixed;inset:0;z-index:8500;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;background:'+bg+';opacity:0;transition:opacity .4s;pointer-events:auto';

  // Lancer les particules CSS
  _spawnParticles(ov, particles, accent);

  requestAnimationFrame(function(){ ov.style.opacity = '1'; });
  window.scrollTo(0,0);

  // ── Mini-jeux Phase 3 — initialisation après rendu DOM ──────
  if (lesson.minigames && lesson.minigames.length > 0) {
    _initMinigames(lesson.minigames);
  }

  // ── Leçon dialoguée Phase 3b ────────────────────────────────
  _initLessonDialog(lesson, accent);

  // Auto-skip après 90s (sécurité)
  clearTimeout(_lesson_timer);
  _lesson_timer = setTimeout(function(){ lesson_start(); }, 90000);
}

function _buildLessonHTML(lesson, accent, bg, textAccent, avatarUrl, n, worldCfg) {
  // Sections de la leçon
  var sectionsHTML = lesson.sections.map(function(sec) {
    var examplesHTML = sec.examples.map(function(ex) {
      return '<li class="lesson-example">' + ex + '</li>';
    }).join('');
    return '<div class="lesson-section" style="--sec-color:' + sec.color + '">' +
      '<div class="lesson-sec-header">' +
        '<span class="lesson-sec-icon">' + sec.icon + '</span>' +
        '<span class="lesson-sec-title">' + sec.title + '</span>' +
      '</div>' +
      '<ul class="lesson-examples">' + examplesHTML + '</ul>' +
    '</div>';
  }).join('');

  // Questions d'échauffement — avatar pose les questions (Phase 3b)
  var warmupHTML = lesson.warmup.map(function(w, i) {
    // LessonDialog.buildWarmupCard disponible → avatar questioner
    if (typeof LessonDialog !== 'undefined' && LessonDialog.buildWarmupCard) {
      return LessonDialog.buildWarmupCard(w, i, accent);
    }
    // Fallback rétro-compat
    var optsHTML = w.o.map(function(opt, j) {
      return '<button class="lesson-warmup-opt" id="lwu_'+i+'_'+j+'" onclick="lessonWarmupSelect('+i+','+j+','+JSON.stringify(w.a).replace(/</g,'&lt;')+')" data-val="'+opt.replace(/"/g,'&quot;')+'">'+opt+'</button>';
    }).join('');
    return '<div class="lesson-warmup-card" id="lwucard_'+i+'">' +
      '<div class="lesson-warmup-q">' + (i+1) + '. ' + w.q + '</div>' +
      '<div class="lesson-warmup-opts">' + optsHTML + '</div>' +
      '<div class="lesson-warmup-fb" id="lwufb_'+i+'"></div>' +
    '</div>';
  }).join('');

  return '' +
  // ─ HÉROS ANIMÉ ────────────────────────────────────────────
  '<div class="lesson-hero-panel" style="background:linear-gradient(180deg,'+_hexDarken(bg,0.4)+' 0%,'+bg+' 100%)">' +
    '<div class="lesson-particles" id="lesson-particles"></div>' +
    '<div class="lesson-hero-inner">' +
      '<div class="lesson-hero-img-wrap">' +
        '<div class="lesson-hero-aura" style="background:radial-gradient(ellipse,'+accent+'55 0%,transparent 70%)"></div>' +
        '<img class="lesson-hero-img" src="'+avatarUrl+'" alt="'+lesson.heroName+'" onerror="this.style.display=\'none\'">' +
        '<div class="lesson-hero-power-ring" style="border-color:'+accent+'"></div>' +
        '<div class="lesson-hero-power-ring lesson-ring-2" style="border-color:'+accent+'88"></div>' +
      '</div>' +
      '<div class="lesson-hero-content">' +
        '<div class="lesson-hero-name" style="color:'+accent+'">' + lesson.heroName + '</div>' +
        '<div class="lesson-hero-world" style="color:'+textAccent+'">' + worldCfg.worldName + '</div>' +
        '<div class="lesson-hero-bubble">' +
          '<div class="lesson-hero-bubble-inner">' +
            '<div class="lesson-hero-quote" id="lesson-hero-quote">' + lesson.heroQuote + '</div>' +
          '</div>' +
          '<div class="lesson-bubble-tail" style="border-top-color:rgba(255,255,255,.95)"></div>' +
        '</div>' +
      '</div>' +
      // Compagnon enfant — même niveau que le héros (AV-01)
      '<div id="lesson-companion-hero" style="align-self:flex-end"></div>' +
    '</div>' +
    '<div class="lesson-hero-bar">' +
      '<div class="lesson-hero-bar-fill" id="lesson-hero-bar-fill" style="background:linear-gradient(90deg,'+accent+','+textAccent+')"></div>' +
    '</div>' +
    '<button class="lesson-skip-hero-btn" onclick="lesson_skipHero()" style="border-color:'+accent+'44;color:'+accent+'">⏭ Passer</button>' +
  '</div>' +
  // ─ CONTENU LEÇON ──────────────────────────────────────────
  '<div class="lesson-content-panel" id="lesson-content-panel" style="display:none">' +
    '<div class="lesson-content-inner">' +
      // Bannière titre
      '<div class="lesson-banner" style="background:linear-gradient(135deg,'+_hexDarken(accent,0.3)+','+accent+'22);border-color:'+accent+'44">' +
        '<div class="lesson-banner-world" style="color:'+accent+'">' + worldCfg.worldName + ' · ' + lesson.heroName + '</div>' +
        '<div class="lesson-rule-title">📌 La règle du jour</div>' +
        '<div class="lesson-rule-text">' + lesson.rule + '</div>' +
      '</div>' +
      // Sections
      sectionsHTML +
      // ── Mini-jeux Phase 3 — rétro-compatible (absent = rien) ──
      (lesson.minigames && lesson.minigames.length > 0
        ? '<div class="mg-section">' +
            '<div class="mg-section-title" style="--lesson-accent:' + accent + '">🃏 Entraînement interactif</div>' +
            '<div id="lesson-minigame-zone"></div>' +
          '</div>'
        : '') +
      // Astuce du héros
      '<div class="lesson-hero-tip" style="background:'+accent+'15;border-color:'+accent+'44">' +
        '<div class="lesson-tip-icon">💡</div>' +
        '<div class="lesson-tip-text">' + lesson.heroTip + '</div>' +
      '</div>' +
      // Échauffement
      '<div class="lesson-warmup">' +
        '<div class="lesson-warmup-title" style="color:'+accent+'">⚡ Échauffement rapide</div>' +
        warmupHTML +
      '</div>' +
      // Bouton lancer
      '<div class="lesson-start-wrap">' +
        '<button class="lesson-start-btn" id="lesson-start-btn" onclick="lesson_start()" style="background:linear-gradient(135deg,'+accent+','+_hexDarken(accent,0.3)+');box-shadow:0 4px 20px '+accent+'66">⚔️ JE SUIS PRÊT — LANCER LE QUIZ !</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ══════════════════════════════════════════════════════════════
// 5. ANIMATION BARRE DU HÉROS (30 secondes)
// ══════════════════════════════════════════════════════════════
var _heroBarInterval = null;
var _heroBarProgress = 0;
var _heroBarDuration = 30; // secondes

function _startHeroBar() {
  _heroBarProgress = 0;
  clearInterval(_heroBarInterval);
  _heroBarInterval = setInterval(function() {
    _heroBarProgress += 100 / (_heroBarDuration * 20); // 20fps
    var bar = document.getElementById('lesson-hero-bar-fill');
    if (bar) bar.style.width = Math.min(_heroBarProgress, 100) + '%';
    if (_heroBarProgress >= 100) {
      clearInterval(_heroBarInterval);
      lesson_skipHero();
    }
  }, 50);
}

function lesson_skipHero() {
  clearInterval(_heroBarInterval);
  var heroPanel    = document.querySelector('.lesson-hero-panel');
  var contentPanel = document.getElementById('lesson-content-panel');
  if (heroPanel)    { heroPanel.style.opacity = '0'; setTimeout(function(){ heroPanel.style.display='none'; }, 400); }
  if (contentPanel) { setTimeout(function(){ contentPanel.style.display='block'; window.scrollTo(0,0); }, 420); }
}

// ══════════════════════════════════════════════════════════════
// 6. QUESTIONS D'ÉCHAUFFEMENT
// ══════════════════════════════════════════════════════════════
var _warmupAnswers = [null, null];

function lessonWarmupSelect(qi, oi, correctAnswer) {
  if (_warmupAnswers[qi] !== null) return; // déjà répondu
  _warmupAnswers[qi] = oi;

  var allOpts = document.querySelectorAll('[id^="lwu_'+qi+'_"]');
  allOpts.forEach(function(btn) { btn.disabled = true; });

  var selectedOpt = document.getElementById('lwu_'+qi+'_'+oi);
  var fb          = document.getElementById('lwufb_'+qi);
  var isCorrect   = selectedOpt && selectedOpt.getAttribute('data-val') === correctAnswer;

  if (selectedOpt) selectedOpt.classList.add(isCorrect ? 'lwu-correct' : 'lwu-wrong');

  if (!isCorrect) {
    allOpts.forEach(function(btn) {
      if (btn.getAttribute('data-val') === correctAnswer) btn.classList.add('lwu-correct');
    });
  }

  if (fb) {
    fb.textContent = isCorrect ? '✅ Parfait !' : '❌ La bonne réponse était : ' + correctAnswer;
    fb.className   = 'lesson-warmup-fb ' + (isCorrect ? 'lwu-fb-ok' : 'lwu-fb-ko');
  }

  if (typeof sfxOK === 'function' && isCorrect)  sfxOK();
  if (typeof sfxKO === 'function' && !isCorrect) sfxKO();

  // Phase 3b — réaction avatar compagnon
  if (typeof LessonDialog !== 'undefined') {
    try { LessonDialog.reactWarmup(qi, isCorrect); } catch(e) {}
  }
}

// ══════════════════════════════════════════════════════════════
// 7. LANCER LE QUIZ
// ══════════════════════════════════════════════════════════════
function lesson_start() {
  clearTimeout(_lesson_timer);
  clearInterval(_heroBarInterval);
  var ov = document.getElementById('lesson-overlay');
  if (ov) {
    ov.style.opacity = '0';
    ov.style.pointerEvents = 'none';
    setTimeout(function(){
      ov.style.display = 'none';
      ov.innerHTML     = '';
      if (_lesson_cb) { _lesson_cb(); _lesson_cb = null; }
    }, 400);
  } else {
    if (_lesson_cb) { _lesson_cb(); _lesson_cb = null; }
  }
}

// ══════════════════════════════════════════════════════════════
// 8. FERMETURE DIRECTE (retour arrière)
// ══════════════════════════════════════════════════════════════
function lesson_close() {
  clearTimeout(_lesson_timer);
  clearInterval(_heroBarInterval);
  var ov = document.getElementById('lesson-overlay');
  if (ov) { ov.style.opacity='0'; ov.style.pointerEvents='none'; setTimeout(function(){ ov.style.display='none'; ov.innerHTML=''; }, 400); }
  _lesson_cb = null;
}

// ══════════════════════════════════════════════════════════════
// 9. PARTICULES CSS (sans library)
// ══════════════════════════════════════════════════════════════
function _spawnParticles(container, type, accent) {
  var count = 18;
  var wrap  = container.querySelector('.lesson-particles') || container;
  for (var i = 0; i < count; i++) {
    (function(idx) {
      var p = document.createElement('div');
      p.className = 'lesson-particle lesson-particle-' + type;
      var x = Math.random() * 100;
      var delay = Math.random() * 4;
      var dur   = 2.5 + Math.random() * 3;
      var size  = 4 + Math.random() * 8;
      p.style.cssText = 'left:'+x+'%;animation-delay:'+delay+'s;animation-duration:'+dur+'s;width:'+size+'px;height:'+size+'px;background:'+accent;
      wrap.appendChild(p);
    })(i);
  }
  // Démarrer la barre héros après un court délai
  setTimeout(_startHeroBar, 500);
}

// ══════════════════════════════════════════════════════════════
// 10. INTÉGRATION — WRAPPERS POUR CHAQUE MONDE
// ══════════════════════════════════════════════════════════════
//
// AUDIT ASSETS (Mars 2026) — règle JS-05 : vérification d'existence avant usage
//
// GRAND BLEU  : bucket grand-bleu → AUDIO uniquement (pas de characters uploadés)
//               → Priorité 1 : charImages[n] (Jikan API, chargé par islands.js)
//               → Priorité 2 : assets/images/avatars/ (locaux dans le repo)
//
// MAGNOLIA    : characters = assets/images/dbz/1.png à 8.png (LOCAUX repo GitHub)
//               → Pas dans Supabase → chemins locaux directs
//
// KANTO       : bucket island-demon-slayer/characters/ (uploadés et confirmés 200)
//               → tanjiro.jpeg, zenitsu.jpeg, inosuke.jpeg, shinobu.png,
//                 kanao.jpeg, tengen.jpeg, rengoku.jpg, mitsuri.jpeg, obanai.jpeg
//
// PAYS DU FEU : bucket island-pays-du-feu/characters/ + /gifs/ (uploadés et confirmés)
//               → sasuke.png, sakura.jpg, "hatake kakashi.jpeg", "gaara .jpg",
//                 "minato .jpg", jiraiya.webp → espaces encodés en %20
//               → île #1 : gifs/naruto%20GIF6.gif (GIF animé)
//               → île #6 : gifs/itachi%20uchiha%20naruto%20GIF.gif
// ══════════════════════════════════════════════════════════════

// ── GRAND BLEU — Français / One Piece ─────────────────────────
// V2 : accepte (niveauCode, n, callback) appelé par quiz-router V2
// V1 rétro-compat : accepte (n, callback) depuis quiz.js
function lesson_grand_bleu(niveauCodeOrN, nOrCallback, thenCallback) {
  // Détection signature (V1 = 2 args, V2 = 3 args)
  var niveauCode, n, callback;
  if (typeof nOrCallback === 'function') {
    // Ancienne signature V1 : lesson_grand_bleu(n, callback)
    n          = parseInt(niveauCodeOrN) || 1;
    callback   = nOrCallback;
    niveauCode = 'cm2';
  } else {
    // Nouvelle signature V2 : lesson_grand_bleu(niveauCode, n, callback)
    niveauCode = niveauCodeOrN || 'cm2';
    n          = parseInt(nOrCallback) || 1;
    callback   = thenCallback;
  }
 
  // ── Images locales — assets/images/avatars/ (toujours disponibles) ──
  var CM2_MAP = {
    1: 'assets/images/avatars/luffy.jpg',
    2: 'assets/images/avatars/nami.jpg',
    3: 'assets/images/avatars/zoro.jpg',
    4: 'assets/images/avatars/robin.jpg',
    5: 'assets/images/avatars/usopp.jpg',
    6: 'assets/images/avatars/sanji.jpg',
    7: 'assets/images/avatars/chopper.jpg',
    8: 'assets/images/avatars/brook.jpg'
  };
 
  var NIVEAU_MAP = {
    '6eme': {
      1: 'assets/images/avatars/shanks.jpg',
      2: 'assets/images/avatars/ace.jpg',
      3: 'assets/images/avatars/law.jpg',
      4: 'assets/images/avatars/hancock.jpg',
      5: 'assets/images/avatars/vivi.jpg',
      6: 'assets/images/avatars/sabo.jpg',
      7: 'assets/images/avatars/franky.jpg',
      8: 'assets/images/avatars/jinbe.jpg'
    },
    '5eme': {
      1: 'assets/images/avatars/mihawk.jpg',
      2: 'assets/images/avatars/mihawk.jpg',
      3: 'assets/images/avatars/shanks.jpg',
      4: 'assets/images/avatars/whitebeard.png',  // ← reste .png
      5: 'assets/images/avatars/shanks.jpg',
      6: 'assets/images/avatars/smoker.jpg',
      7: 'assets/images/avatars/luffy.jpg',
      8: 'assets/images/avatars/usopp.jpg'
    },
    '4eme': {
      1: 'assets/images/avatars/robin.jpg',
      2: 'assets/images/avatars/robin.jpg',
      3: 'assets/images/avatars/law.jpg',
      4: 'assets/images/avatars/nami.jpg',
      5: 'assets/images/avatars/zoro.jpg',
      6: 'assets/images/avatars/sanji.jpg',
      7: 'assets/images/avatars/luffy.jpg',
      8: 'assets/images/avatars/brook.jpg'
    },
    '3eme': {
      1: 'assets/images/avatars/luffy.jpg',
      2: 'assets/images/avatars/zoro.jpg',
      3: 'assets/images/avatars/robin.jpg',
      4: 'assets/images/avatars/nami.jpg',
      5: 'assets/images/avatars/chopper.jpg',
      6: 'assets/images/avatars/sanji.jpg',
      7: 'assets/images/avatars/usopp.jpg',
      8: 'assets/images/avatars/brook.jpg'
    }
  };
 
  var niveauAvatars = NIVEAU_MAP[niveauCode] || CM2_MAP;
  var avatar = niveauAvatars[n] || CM2_MAP[n] || 'assets/images/avatars/luffy.jpg';
 
  var COULEURS = {
    'cm2':  '#e63946',
    '6eme': '#f97316',
    '5eme': '#8b5cf6',
    '4eme': '#22c55e',
    '3eme': '#3b82f6'
  };
  var color = COULEURS[niveauCode] || '#e63946';
 
  showLesson('grandbleu', n, avatar, color, callback);
}

// ── MAGNOLIA — Histoire / Dragon Ball Z ────────────────────────
// Pattern exact lesson_grand_bleu : showLesson('magnolia_'+niveauCode, n, avatar, color, callback)
// LESSON_REGISTRY['magnolia_cm2'...'magnolia_3eme'] défini dans lesson-data.js
function lesson_magnolia(niveauCodeOrN, nOrCallback, thenCallback) {
  // Détection signature V1/V2 (comme lesson_grand_bleu)
  var niveauCode, n, callback;
  if (typeof nOrCallback === 'function') {
    n          = parseInt(niveauCodeOrN) || 1;
    callback   = nOrCallback;
    niveauCode = 'cm2';
  } else {
    niveauCode = niveauCodeOrN || 'cm2';
    n          = parseInt(nOrCallback) || 1;
    callback   = thenCallback;
  }

  var DBZ = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-magnolia/characters/';
  var AVATARS = {
    'cm2':  {1:'goku.jpg',  2:'bulma.jpg',     3:'krilin.jpg',   4:'gohan.jpg', 5:'piccolo.png', 6:'trunks.jpg',    7:'android18.jpg', 8:'vegeta.jpg'},
    '6eme': {1:'goku.jpg',  2:'gohan.jpg',      3:'krilin.jpg',   4:'trunks.jpg',5:'piccolo.png', 6:'bulma.jpg',     7:'android17.jpg', 8:'vegeta.jpg'},
    '5eme': {1:'goku.jpg',  2:'vegeta.jpg',     3:'trunks.jpg',   4:'gohan.jpg', 5:'piccolo.png', 6:'android18.jpg', 7:'krilin.jpg',    8:'goten.jpg'},
    '4eme': {1:'goku.jpg',  2:'bulma.jpg',      3:'gohan.jpg',    4:'vegeta.jpg',5:'trunks.jpg',  6:'piccolo.png',   7:'android17.jpg', 8:'krilin.jpg'},
    '3eme': {1:'goku.jpg',  2:'vegeta.jpg',     3:'gohan.jpg',    4:'piccolo.png',5:'trunks.jpg', 6:'android18.jpg', 7:'bulma.jpg',     8:'goten.jpg'}
  };
  var avatarMap = AVATARS[niveauCode] || AVATARS['cm2'];
  var avatar = DBZ + (avatarMap[n] || 'goku.jpg');

  var COULEURS = {'cm2':'#f97316','6eme':'#22c55e','5eme':'#8b5cf6','4eme':'#ef4444','3eme':'#3b82f6'};
  var color = COULEURS[niveauCode] || '#f97316';

  showLesson('magnolia_' + niveauCode, n, avatar, color, callback);
}

// ── KANTO V2 — Sciences / Demon Slayer ────────────────────────
// Signature V2 : (niveauCode, numeroIle, callback) — pattern Grand Bleu
// V1 rétro-compat : (n, callback)
// LESSON_REGISTRY['kanto_cm2'...'kanto_3eme'] dans lesson-data.js
function lesson_kanto(niveauCodeOrN, nOrCallback, thenCallback) {
  // Détection signature
  var niveauCode, n, callback;
  if (typeof nOrCallback === 'function') {
    n          = parseInt(niveauCodeOrN) || 1;
    callback   = nOrCallback;
    niveauCode = 'cm2';
  } else {
    niveauCode = niveauCodeOrN || 'cm2';
    n          = parseInt(nOrCallback) || 1;
    callback   = thenCallback;
  }

  var DS = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer/characters/';
  // 8 héros uniques par niveau (règle Grand Bleu PATTERN)
  var AVATARS = {
    'cm2':  {1:'tanjiro.jpg',  2:'nezuko.jpeg', 3:'zenitsu.jpg',  4:'inosuke.jpg', 5:'giyu.png', 6:'shinobu.png', 7:'kanao.jpg',     8:'rengoku.jpg'},
    '6eme': {1:'tengen.jpg',   2:'mitsuri.jpeg',3:'obanai.jpeg',  4:'sanemi.jpg',  5:'muichiro.jpg',6:'gyomei.jpg',7:'genya.jpg',    8:'tanjiro.jpg'},
    '5eme': {1:'tanjiro.jpg',  2:'zenitsu.jpg', 3:'inosuke.jpg',  4:'rengoku.jpg', 5:'shinobu.png',6:'mitsuri.jpeg',7:'muichiro.jpg',8:'sanemi.jpg'},
    '4eme': {1:'giyu.png',     2:'tengen.jpg',  3:'obanai.jpeg',  4:'gyomei.jpg',  5:'kanao.jpg',  6:'genya.jpg',  7:'nezuko.jpeg',  8:'tanjiro.jpg'},
    '3eme': {1:'tanjiro.jpg',  2:'rengoku.jpg', 3:'mitsuri.jpeg', 4:'sanemi.jpg',  5:'muichiro.jpg',6:'gyomei.jpg', 7:'shinobu.png',  8:'giyu.png'}
  };
  var avatarMap = AVATARS[niveauCode] || AVATARS['cm2'];
  var avatar = DS + (avatarMap[n] || 'tanjiro.jpg');

  var COULEURS = {'cm2':'#f97316','6eme':'#22c55e','5eme':'#8b5cf6','4eme':'#ef4444','3eme':'#3b82f6'};
  var color = COULEURS[niveauCode] || '#C0392B';

  showLesson('kanto_' + niveauCode, n, avatar, color, callback);
}

// ── NAMEK V2 — Géographie / Jujutsu Kaisen ─────────────────────
// Signature V2 : (niveauCode, numeroIle, callback) — pattern Grand Bleu
// V1 rétro-compat : (n, callback)
// LESSON_REGISTRY['namek_cm2'...'namek_3eme'] dans lesson-data.js
function lesson_namek(niveauCodeOrN, nOrCallback, thenCallback) {
  var niveauCode, n, callback;
  if (typeof nOrCallback === 'function') {
    n          = parseInt(niveauCodeOrN) || 1;
    callback   = nOrCallback;
    niveauCode = 'cm2';
  } else {
    niveauCode = niveauCodeOrN || 'cm2';
    n          = parseInt(nOrCallback) || 1;
    callback   = thenCallback;
  }

  var JJK = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek/characters/';
  // 8 héros uniques par niveau (règle Grand Bleu PATTERN)
  // Pour CM2 : Yuji, Megumi, Nobara, Gojo, Inumaki, Yuta, Todo, Nanami
  var AVATARS = {
    'cm2':  {1:'yuji.png',   2:'megumi.jpg', 3:'nobara.png', 4:'gojo.jpg',   5:'inumaki.png',6:'yuta.jpg',  7:'todo.jpg',  8:'nanami.jpg'},
    '6eme': {1:'choso.png',  2:'todo.jpg',   3:'nanami.jpg', 4:'panda.jpg',  5:'maki.jpg',   6:'naoya.jpg', 7:'geto.png',  8:'yuji.png'},
    '5eme': {1:'yuji.png',   2:'megumi.jpg', 3:'gojo.jpg',   4:'nanami.jpg', 5:'maki.jpg',   6:'todo.jpg',  7:'yuta.jpg',  8:'nobara.png'},
    '4eme': {1:'panda.jpg',  2:'inumaki.png',3:'choso.png',  4:'naoya.jpg',  5:'mei-mei.jpg',6:'ijichi.jpg',7:'geto.png',  8:'yuji.png'},
    '3eme': {1:'gojo.jpg',   2:'yuji.png',   3:'megumi.jpg', 4:'nobara.png', 5:'nanami.jpg', 6:'maki.jpg',  7:'yuta.jpg',  8:'todo.jpg'}
  };
  var avatarMap = AVATARS[niveauCode] || AVATARS['cm2'];
  var avatar = JJK + (avatarMap[n] || 'yuji.png');

  var COULEURS = {'cm2':'#f97316','6eme':'#22c55e','5eme':'#8b5cf6','4eme':'#ef4444','3eme':'#3b82f6'};
  var color = COULEURS[niveauCode] || '#7c3aed';

  showLesson('namek_' + niveauCode, n, avatar, color, callback);
}

// ── PAYS DU FEU V3 — Maths / Naruto ────────────────────────────
// Signature identique à lesson_english : (niveauCode, numeroIle, thenCallback)
// Bucket corrigé : island-pays-du-feu (sans espaces)
function lesson_paysdufeu(niveauCode, numeroIle, thenCallback) {
  var SUPABASE_PDF = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu/characters/';
  var AVATARS = {
    'cm2':  { 1:'naruto.jpg',    2:'sakura.jpg',     3:'sasuke.png',   4:'kakashi.jpg',
              5:'rock-lee.jpg',  6:'hinata.jpg',     7:'gaara.jpg',    8:'hokage.jpg' },
    '6eme': { 1:'naruto.jpg',    2:'hinata.jpg',     3:'shikamaru.jpg',4:'ino.jpg',
              5:'choji.gif',     6:'tenten.jpg',     7:'neji.jpg',     8:'zabuza.jpg' },
    '5eme': { 1:'naruto.jpg',    2:'sasuke.png',     3:'sakura.jpg',   4:'rock-lee.jpg',
              5:'gaara.jpg',     6:'temari.jpg',     7:'kankuro.jpg',  8:'orochimaru.jpg' },
    '4eme': { 1:'naruto.jpg',    2:'sasuke.png',     3:'sakura.jpg',   4:'kakashi.jpg',
              5:'shikamaru.jpg', 6:'hinata.jpg',     7:'rock-lee.jpg', 8:'pain.jpg' },
    '3eme': { 1:'naruto.jpg',    2:'sasuke.png',     3:'sakura.jpg',   4:'kakashi.jpg',
              5:'minato.jpg',    6:'jiraiya.jpg',    7:'tsunade.jpg',  8:'madara.jpg' },
  };
  var avatarMap = AVATARS[niveauCode] || AVATARS['cm2'];
  var avatar    = SUPABASE_PDF + (avatarMap[numeroIle] || 'naruto.jpg');
  // Clé niveau_ile : 'cm2_1', '6eme_3', etc.
  var lessonKey = niveauCode + '_' + numeroIle;
  showLesson('paysdufeu', lessonKey, avatar, '#F97316', thenCallback);
}

// ══════════════════════════════════════════════════════════════
// 10b. ENGLISH (Attack on Titan)
// ══════════════════════════════════════════════════════════════
function lesson_english(niveauCode, numeroIle, thenCallback) {
  var STORAGE_AOT = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/characters/';
  // Mapping niveau → personnages par île
  var AVATARS = {
    'cm2':  { 1:'eren.jpeg', 2:'mikasa.gif', 3:'armin.jpg', 4:'levi.jpg', 5:'historia.png', 6:'jean.jpg', 7:'hange.jpeg', 8:'erwin.jpg' },
    '6eme': { 1:'armin.jpg', 2:'levi.jpg', 3:'historia.png', 4:'jean.jpg', 5:'hange.jpeg', 6:'erwin.jpg', 7:'connie.jpg', 8:'sasha.jpeg' },
    '5eme': { 1:'eren.jpeg', 2:'levi.jpg', 3:'hange.jpeg', 4:'erwin.jpg', 5:'connie.jpg', 6:'sasha.jpeg', 7:'armin.jpg', 8:'historia.png' },
    '4eme': { 1:'historia.png', 2:'levi.jpg', 3:'hange.jpeg', 4:'erwin.jpg', 5:'eren.jpeg', 6:'historia.png', 7:'jean.jpg', 8:'connie.jpg' },
  };
  var niveauIdx = { 'cm2': 1, '6eme': 2, '5eme': 3, '4eme': 4 };
  var n         = parseInt(niveauIdx[niveauCode] || 1);
  var lessonKey = n + '_' + numeroIle;  // ex: '1_1', '2_3'
  var avatarMap = AVATARS[niveauCode] || AVATARS['cm2'];
  var avatar    = STORAGE_AOT + (avatarMap[numeroIle] || 'eren.jpeg');
  showLesson('english', lessonKey, avatar, '#4a5c3f', thenCallback);
}

// ══════════════════════════════════════════════════════════════
// 11. UTILITAIRES
// ══════════════════════════════════════════════════════════════
function _hexDarken(hex, amount) {
  var c = hex.replace('#','');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  var r = Math.max(0, parseInt(c.substr(0,2),16) - Math.round(255*amount));
  var g = Math.max(0, parseInt(c.substr(2,2),16) - Math.round(255*amount));
  var b = Math.max(0, parseInt(c.substr(4,2),16) - Math.round(255*amount));
  return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
}

// ══════════════════════════════════════════════════════════════
// 12. MINI-JEUX — Phase 3
// Orchestrateur : lance le bon moteur selon le type
// Rétro-compatible : si le moteur n'est pas chargé → passe silencieusement
// ══════════════════════════════════════════════════════════════
function _initMinigames(minigames) {
  // Attendre que le DOM du content-panel soit visible (après skipHero)
  // On injecte le mini-jeu dès que la zone est disponible
  var maxTries = 40; // 4 secondes max
  var tries = 0;

  function tryInit() {
    var zone = document.getElementById('lesson-minigame-zone');
    if (!zone) {
      if (tries++ < maxTries) setTimeout(tryInit, 100);
      return;
    }

    var mg = minigames[0]; // Phase 3 : 1 mini-jeu par leçon
    if (!mg || !mg.type) return;

    try {
      if (mg.type === 'flashcards' && window.MiniFlashcards) {
        MiniFlashcards.init(zone, mg, function () {
          // Après le mini-jeu : scroll smooth vers le warmup
          var warmup = document.querySelector('.lesson-warmup');
          if (warmup) warmup.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      // Autres types ajoutés ici en Phase 3 suite :
      // else if (mg.type === 'tri_mots' && window.MiniTriMots) { ... }
      // else if (mg.type === 'association' && window.MiniAssociation) { ... }
    } catch (err) {
      console.error('[lesson.js] Erreur init minigame:', err);
      // Fail silently — la leçon continue normalement sans le mini-jeu
    }
  }

  tryInit();
}

// ══════════════════════════════════════════════════════════════
// 13. LEÇON DIALOGUÉE — Phase 3b (ARCHI-01)
// ══════════════════════════════════════════════════════════════
function _initLessonDialog(lesson, accent) {
  if (typeof LessonDialog === 'undefined') return;
  setTimeout(function () {
    try {
      var heroSlot = document.getElementById('lesson-companion-hero');
      if (heroSlot) {
        LessonDialog.renderCompanion(heroSlot, { heroName: lesson.heroName || 'le héros' });
      }
      if (window.AP && window.AP.events) {
        window.AP.events.emit('lesson:start', {
          heroName: lesson.heroName, world: _lesson_world, island: _lesson_island
        });
      }
    } catch (err) {
      console.warn('[lesson] LessonDialog:', err);
    }
  }, 120);
}

console.info('📖 lesson.js chargé — Phase 3b · avatar compagnon · 4 mondes × 8 îles');
