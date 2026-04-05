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

  // Questions d'échauffement
  var warmupHTML = lesson.warmup.map(function(w, i) {
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
        '<div class="lesson-warmup-sub">2 questions avant le vrai quiz !</div>' +
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

// ── GRAND BLEU — Français / One Piece ──────────────────────────
// Les characters ne sont PAS dans Supabase grand-bleu.
// On utilise charImages[n] (alimenté par islands.js via Jikan API)
// avec fallback sur les assets locaux du repo.
function lesson_grand_bleu(n, thenCallback) {
  var LOCAL = {
    1: 'assets/images/avatars/luffy.png',
    2: 'assets/images/avatars/nami.png',
    3: 'assets/images/avatars/zoro.png',
    4: 'assets/images/avatars/robin.png',
    5: 'assets/images/avatars/usopp.png',
    6: 'assets/images/avatars/sanji.png',
    7: 'assets/images/avatars/chopper.png',
    8: 'assets/images/avatars/brook.png'
  };
  // Priorité : Jikan (charImages chargé par islands.js) > local fallback
  var avatar = (typeof charImages !== 'undefined' && charImages[n] && charImages[n] !== LOCAL[n])
    ? charImages[n]
    : (LOCAL[n] || 'assets/images/avatars/luffy.png');
  showLesson('grandbleu', n, avatar, '#e63946', thenCallback);
}

// ── MAGNOLIA — Histoire / Dragon Ball Z ────────────────────────
// Assets DBZ = LOCAUX dans le repo (assets/images/dbz/).
// Pas dans Supabase. HIST_AVATARS de quiz-histoire.js est la référence.
function lesson_magnolia(n, thenCallback) {
  // Utiliser HIST_AVATARS si disponible (défini dans quiz-histoire.js)
  var avatar;
  if (typeof HIST_AVATARS !== 'undefined' && HIST_AVATARS[n]) {
    avatar = HIST_AVATARS[n];
  } else {
    var LOCAL_DBZ = {
      1: 'assets/images/dbz/1.png',
      2: 'assets/images/dbz/2.png',
      3: 'assets/images/dbz/3.png',
      4: 'assets/images/dbz/4.png',
      5: 'assets/images/dbz/5.png',
      6: 'assets/images/dbz/6.png',
      7: 'assets/images/dbz/7.png',
      8: 'assets/images/dbz/8.png'
    };
    avatar = LOCAL_DBZ[n] || 'assets/images/dbz/1.png';
  }
  showLesson('magnolia', n, avatar, '#8b5cf6', thenCallback);
}

// ── KANTO — Sciences / Demon Slayer ────────────────────────────
// Tous les characters sont dans Supabase island-demon-slayer/characters/
// Confirmés uploadés. Utiliser KANTO_AVATARS si disponible (quiz-kanto.js).
function lesson_kanto(n, thenCallback) {
  var SUPABASE_DS = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer';
  // Map exact des fichiers uploadés (noms vérifiés)
  var KANTO_MAP = {
    1: SUPABASE_DS + '/characters/tanjiro.jpeg',
    2: SUPABASE_DS + '/characters/zenitsu.jpeg',
    3: SUPABASE_DS + '/characters/inosuke.jpeg',
    4: SUPABASE_DS + '/characters/obanai.jpeg',   // île 4 = obanai (fix appliqué)
    5: SUPABASE_DS + '/characters/kanao.jpeg',
    6: SUPABASE_DS + '/characters/tengen.jpeg',
    7: SUPABASE_DS + '/characters/rengoku.jpg',
    8: SUPABASE_DS + '/characters/mitsuri.jpeg'
  };
  // Priorité : KANTO_AVATARS (quiz-kanto.js) > KANTO_MAP Supabase
  var avatar = (typeof KANTO_AVATARS !== 'undefined' && KANTO_AVATARS[n])
    ? KANTO_AVATARS[n]
    : (KANTO_MAP[n] || KANTO_MAP[1]);
  showLesson('kanto', n, avatar, '#C0392B', thenCallback);
}

// ── PAYS DU FEU — Maths / Naruto ───────────────────────────────
// Characters + GIFs dans Supabase island-pays-du-feu/
// Attention : certains noms ont des espaces → encodés en %20
// PDF_AVATARS de quiz-pays-du-feu.js est la référence.
function lesson_paysdufeu(n, thenCallback) {
  var SUPABASE_PDF = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu';
  var PDF_MAP = {
    1: SUPABASE_PDF + '/gifs/naruto%20GIF6.gif',           // GIF animé île Naruto
    2: SUPABASE_PDF + '/characters/sasuke.png',
    3: SUPABASE_PDF + '/characters/sakura.jpg',
    4: SUPABASE_PDF + '/characters/hatake%20kakashi.jpeg',  // espace encodé
    5: SUPABASE_PDF + '/characters/gaara%20.jpg',           // espace encodé
    6: SUPABASE_PDF + '/gifs/itachi%20uchiha%20naruto%20GIF.gif',
    7: SUPABASE_PDF + '/characters/minato%20.jpg',          // espace encodé
    8: SUPABASE_PDF + '/characters/jiraiya.webp'
  };
  // Priorité : PDF_AVATARS (quiz-pays-du-feu.js) > PDF_MAP
  var avatar = (typeof PDF_AVATARS !== 'undefined' && PDF_AVATARS[n])
    ? PDF_AVATARS[n]
    : (PDF_MAP[n] || PDF_MAP[2]);
  showLesson('paysdufeu', n, avatar, '#F97316', thenCallback);
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

console.info('📖 lesson.js chargé — 4 mondes × 8 îles × 2 questions échauffement + mini-jeux Phase 3');
