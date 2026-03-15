// ═══════════════════════════════════════════════════════
// ROUTER — Académie Pirate
// Hash routing : #/login | #/carte | #/iles | #/quiz | #/histoire | #/kanto
// ✅ FIX #5 — playBGM('kanto-map') au lieu de 'kanto-theme' inexistant
// ✅ FIX #6 — showKanto() délègue à quiz-kanto.js sans dupliquer la logique
// ═══════════════════════════════════════════════════════

var ROUTES = {
  'login'    : showLogin,
  'carte'    : showCarte,
  'iles'     : showIles,
  'quiz'     : showQuiz,
  'histoire' : showHistoire,
  'kanto'    : showKanto,
};

function getSection(id) { return document.getElementById(id); }

function hideAll() {
  document.body.classList.remove('login-active');

  var login = getSection('login-screen');
  if (login) login.classList.add('gone');

  var avatar = getSection('avatar-screen');
  if (avatar) avatar.classList.add('gone');

  var globe = getSection('globe-sec');
  if (globe) globe.style.display = 'none';

  var divider = document.querySelector('.world-divider');
  if (divider) divider.style.display = 'none';

  var map = getSection('map-sec');
  if (map) map.style.display = 'none';

  // Magnolia / Histoire
  var hIles = document.getElementById('histoire-iles-sec');
  var hQuiz = document.getElementById('histoire-quiz-sec');
  if (hIles) hIles.style.display = 'none';
  if (hQuiz) hQuiz.style.display = 'none';
  var histBg = document.getElementById('hist-bg');
  if (histBg) histBg.classList.remove('visible');
  var histOv = document.getElementById('hist-overlay');
  if (histOv) histOv.classList.remove('visible');

  // Grand Bleu quiz
  var quiz = getSection('quiz-sec');
  if (quiz) quiz.style.display = 'none';

  // Kanto
  var kantoIles = document.getElementById('kanto-iles-sec');
  if (kantoIles) kantoIles.style.display = 'none';
  var kantoQuiz = document.getElementById('kanto-quiz-sec');
  if (kantoQuiz) kantoQuiz.style.display = 'none';
  var kantoBg = document.getElementById('kanto-bg');
  if (kantoBg) kantoBg.classList.remove('visible');

  if (typeof hideContinentPanel === 'function') hideContinentPanel();
}

// ══════════════════════════════
// PAGE : LOGIN
// ══════════════════════════════
function showLogin() {
  hideAll();
  document.body.classList.add('login-active');
  var login = getSection('login-screen');
  if (login) login.classList.remove('gone');
  document.title = 'Académie Pirate — Connexion';
}

// ══════════════════════════════
// PAGE : CARTE DU MONDE
// ══════════════════════════════
function showCarte() {
  hideAll();
  var globe = getSection('globe-sec');
  if (globe) globe.style.display = 'flex';
  var divider = document.querySelector('.world-divider');
  if (divider) divider.style.display = 'flex';
  var panel = getSection('globe-panel');
  if (panel) {
    panel.classList.remove('visible');
    var globeSec = getSection('globe-sec');
    if (globeSec && panel.parentElement !== globeSec) {
      globeSec.appendChild(panel);
      panel.style.cssText = 'position:relative;bottom:auto;left:auto;transform:none;width:100%;max-width:min(680px,96vw);border-radius:16px;border:2px solid rgba(255,215,0,.2);margin-top:16px;display:none;';
    }
  }
  document.title = 'Académie Pirate — Carte du Monde';
  if (typeof buildTreasureMap === 'function') {
    var container = getSection('globe-container');
    if (container && !container.querySelector('svg')) buildTreasureMap();
  }
}

// ══════════════════════════════
// PAGE : ÎLES PIRATES
// ══════════════════════════════
function showIles() {
  hideAll();
  var map = getSection('map-sec');
  if (map) map.style.display = 'block';
  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') playBGM('map');
  document.title = 'Académie Pirate — Îles Pirates';
}

// ══════════════════════════════
// PAGE : QUIZ GRAND BLEU
// ══════════════════════════════
function showQuiz() {
  hideAll();
  var quiz = getSection('quiz-sec');
  if (quiz) quiz.style.display = 'block';
  document.title = 'Académie Pirate — Quiz';
}

// ══════════════════════════════
// PAGE : HISTOIRE / MAGNOLIA
// ══════════════════════════════
function showHistoire() {
  hideAll();
  if (typeof stopBGM === 'function') stopBGM();
  setTimeout(function() {
    if (typeof playBGM === 'function') playBGM('dbz-battle');
  }, 300);
  var sec = document.getElementById('histoire-iles-sec');
  if (sec) {
    sec.style.display = 'block';
    if (typeof buildHistoireGrid === 'function') buildHistoireGrid();
  }
  var histBg = document.getElementById('hist-bg');
  if (histBg) histBg.classList.add('visible');
  if (typeof loadHistBgStrips === 'function') loadHistBgStrips();
  var histOv = document.getElementById('hist-overlay');
  if (histOv) histOv.classList.add('visible');
  document.title = 'Académie Pirate — Histoire';
}

// ══════════════════════════════
// PAGE : KANTO — Sciences × Demon Slayer
// ✅ FIX #6 — hideAll() puis délégation TOTALE à showKanto() de quiz-kanto.js
//    On ne duplique plus la logique ici. quiz-kanto.js est chargé après router.js,
//    donc au moment où handleRoute() appelle ROUTES['kanto'], showKanto() de
//    quiz-kanto.js est déjà définie et écrase cette déclaration.
//    Cette fonction sert de FALLBACK si quiz-kanto.js n'est pas encore chargé.
// ══════════════════════════════
function showKanto() {
  hideAll();
  document.title = 'Académie Pirate — Kanto';

  // ✅ FIX #5 — 'kanto-map' existe dans audio-engine-kanto-patch.js (plus 'kanto-theme')
  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') {
    setTimeout(function() { playBGM('kanto-map'); }, 300);
  }

  // Afficher la section îles
  var kantoIles = document.getElementById('kanto-iles-sec');
  if (kantoIles) kantoIles.style.display = 'block';

  // Fond animé
  var kantoBg = document.getElementById('kanto-bg');
  if (kantoBg) kantoBg.classList.add('visible');

  // Construire la grille si dispo (définie dans quiz-kanto.js)
  if (typeof buildKantoGrid === 'function') buildKantoGrid();

  // Charger assets et progression (fonctions async de quiz-kanto.js)
  if (typeof loadKantoAssets   === 'function') loadKantoAssets();
  if (typeof loadKantoProgress === 'function') loadKantoProgress();
  if (typeof loadKantoBgStrips === 'function') loadKantoBgStrips();
}

// ══════════════════════════════
// NAVIGATION
// ══════════════════════════════
function navigateTo(route) {
  window.location.hash = '/' + route;
}

function getCurrentRoute() {
  var hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return 'login';
  return hash.replace('#/', '').split('/')[0] || 'login';
}

function handleRoute() {
  var route   = getCurrentRoute();
  var handler = ROUTES[route];
  if (handler) { handler(); } else { navigateTo('login'); }
}

window.addEventListener('hashchange', handleRoute);

// ── Patches navigation ──
window._originalGoBack = window.goBack;
window.goBack = function() { navigateTo('iles'); };

window._originalStartIsland = window.startIsland;
window.startIsland = function(n) {
  if (typeof window._originalStartIsland === 'function') window._originalStartIsland(n);
  navigateTo('quiz');
};

// ── Patch showContinentPanel — affiche le panneau sous la carte ──
window._originalShowContinentPanel = window.showContinentPanel;
window.showContinentPanel = function(c) {
  var route = getCurrentRoute();

  if (route === 'carte') {
    var panel = getSection('globe-panel');
    if (!panel) return;
    var globeSec = getSection('globe-sec');
    if (globeSec && panel.parentElement !== globeSec) globeSec.appendChild(panel);

    panel.style.cssText = 'position:relative;bottom:auto;left:auto;transform:none;' +
      'width:100%;max-width:min(680px,96vw);border-radius:16px;' +
      'border:2px solid rgba(255,215,0,.25);margin-top:16px;' +
      'display:flex;flex-direction:column;gap:14px;' +
      'background:linear-gradient(160deg,#0a0d1a 0%,#120820 100%);' +
      'padding:24px 20px;box-shadow:0 8px 40px rgba(0,0,0,.5);';

    var targetRoute = c.id === 'history' ? 'histoire' : c.id === 'kanto' ? 'kanto' : c.id === 'french' ? 'iles' : c.id;

    var charsHtml = c.chars.map(function(ch, i) {
      return '<span class="gp-char-badge" style="border-color:' + c.charColors[i] + '55;color:' + c.charColors[i] + '">👤 ' + ch + '</span>';
    }).join('');

    var playBtn = c.locked
      ? '<div class="gp-locked-msg">🔒 Bientôt disponible !</div>'
      : '<button class="gp-play-btn" style="background:linear-gradient(135deg,' + c.color + ',' + c.color + '99)" onclick="navigateTo(\'' + targetRoute + '\')">⚔️ COMMENCER L\'AVENTURE !</button>';

    panel.innerHTML =
      '<div class="gp-header">' +
        '<div class="gp-emoji">' + c.emoji + '</div>' +
        '<div><div class="gp-name">' + c.name + '</div>' +
        '<div class="gp-universe" style="color:' + c.color + '">' + c.universe + '</div></div>' +
      '</div>' +
      '<div class="gp-subject">📚 ' + c.subject + '</div>' +
      '<div class="gp-desc">' + c.desc + '</div>' +
      '<div class="gp-chars">' + charsHtml + '</div>' +
      playBtn;

    setTimeout(function() { panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);

  } else {
    if (typeof window._originalShowContinentPanel === 'function') {
      window._originalShowContinentPanel(c);
    }
  }
};

window.hideContinentPanel = function() {
  var panel = getSection('globe-panel');
  if (panel) {
    panel.classList.remove('visible');
    if (getCurrentRoute() === 'carte') panel.style.display = 'none';
  }
  var overlay = getSection('globe-overlay');
  if (overlay) overlay.classList.remove('visible');
};

function buildNavBar() {}
function updateNavActive() {}

// ══════════════════════════════
// INIT
// ══════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.hash.includes("access_token")) {
    console.log("🔑 Magic link détecté — router suspendu");
    return;
  }
  if (!window.location.hash || window.location.hash === '#') {
    navigateTo('login');
  } else {
    handleRoute();
  }
  window.addEventListener('hashchange', updateNavActive);
});