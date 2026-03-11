// ═══════════════════════════════════════════════════════
// ROUTER — Académie Pirate
// Hash routing : #/login | #/carte | #/iles | #/quiz
// ═══════════════════════════════════════════════════════

const ROUTES = {
  'login'    : showLogin,
  'carte'    : showCarte,
  'iles'     : showIles,
  'quiz'     : showQuiz,
  'histoire' : showHistoire,
};

// ── Sections HTML ──
function getSection(id) { return document.getElementById(id); }

function hideAll() {
  var currentRoute = window.location.hash;
  // Retirer le mode login du body (header redevient visible)
  document.body.classList.remove('login-active');

  // Login
  const login = getSection('login-screen');
  if (login) login.classList.add('gone');

  // Avatar
  const avatar = getSection('avatar-screen');
  if (avatar) avatar.classList.add('gone');

  // Globe/Carte
  const globe = getSection('globe-sec');
  if (globe) globe.style.display = 'none';

  const divider = document.querySelector('.world-divider');
  if (divider) divider.style.display = 'none';

  // Îles
  const map = getSection('map-sec');
  if (map) map.style.display = 'none';

  var hIles = document.getElementById('histoire-iles-sec');
  var hQuiz = document.getElementById('histoire-quiz-sec');
  if (hIles) hIles.style.display = 'none';
  if (hQuiz) hQuiz.style.display = 'none';
  var histBg = document.getElementById('hist-bg');
  if (histBg) histBg.classList.remove('visible');
  var histOv = document.getElementById('hist-overlay');
  if (histOv) histOv.classList.remove('visible');

  // Quiz
  const quiz = getSection('quiz-sec');
  if (quiz) quiz.style.display = 'none';

  // Panneau continent
  hideContinentPanel?.();
}

// ══════════════════════════════
// PAGE : LOGIN
// ══════════════════════════════
function showLogin() {
  hideAll();
  document.body.classList.add('login-active');
  const login = getSection('login-screen');
  if (login) login.classList.remove('gone');
  document.title = 'Académie Pirate — Connexion';
}

// ══════════════════════════════
// PAGE : CARTE DU MONDE
// ══════════════════════════════
function showCarte() {
  hideAll();

  const globe = getSection('globe-sec');
  if (globe) globe.style.display = 'flex';

  const divider = document.querySelector('.world-divider');
  if (divider) divider.style.display = 'flex';

  const panel = getSection('globe-panel');
  if (panel) {
    panel.classList.remove('visible');
    const globeSec = getSection('globe-sec');
    if (globeSec && panel.parentElement !== globeSec) {
      globeSec.appendChild(panel);
      panel.style.cssText = `
        position: relative; bottom: auto; left: auto;
        transform: none; width: 100%; max-width: min(680px, 96vw);
        border-radius: 16px; border: 2px solid rgba(255,215,0,.2);
        margin-top: 16px; display: none;
      `;
    }
  }

  document.title = 'Académie Pirate — Carte du Monde';

  if (typeof buildTreasureMap === 'function') {
    const container = getSection('globe-container');
    if (container && !container.querySelector('svg')) buildTreasureMap();
  }
}

// ══════════════════════════════
// PAGE : ÎLES PIRATES
// ══════════════════════════════
function showIles() {
  hideAll();
  const map = getSection('map-sec');
  if (map) map.style.display = 'block';
  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') playBGM('map');
  document.title = 'Académie Pirate — Îles Pirates';
}

// ══════════════════════════════
// PAGE : QUIZ
// ══════════════════════════════
function showQuiz() {
  hideAll();
  const quiz = getSection('quiz-sec');
  if (quiz) quiz.style.display = 'block';
  document.title = 'Académie Pirate — Quiz';
}

// ══════════════════════════════
// PAGE : HISTOIRE
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
// NAVIGATION
// ══════════════════════════════
function navigateTo(route) {
  window.location.hash = '/' + route;
}

function getCurrentRoute() {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return 'login';
  const route = hash.replace('#/', '').split('/')[0];
  return route || 'login';
}

function handleRoute() {
  const route = getCurrentRoute();
  const handler = ROUTES[route];
  if (handler) {
    handler();
  } else {
    navigateTo('login');
  }
}

// ── Écouter les changements de hash ──
window.addEventListener('hashchange', handleRoute);

// ── Patch : goBack() redirige vers iles ──
window._originalGoBack = window.goBack;
window.goBack = function() {
  navigateTo('iles');
};

// ── Patch : startIsland() reste sur quiz ──
window._originalStartIsland = window.startIsland;
window.startIsland = function(n) {
  if (typeof window._originalStartIsland === 'function') {
    window._originalStartIsland(n);
  }
  navigateTo('quiz');
};

// ── Patch : showContinentPanel affiche EN DESSOUS sur page carte ──
window._originalShowContinentPanel = window.showContinentPanel;
window.showContinentPanel = function(c) {
  const route = getCurrentRoute();

  if (route === 'carte') {
    const panel = getSection('globe-panel');
    if (!panel) return;

    const globeSec = getSection('globe-sec');
    if (globeSec && panel.parentElement !== globeSec) {
      globeSec.appendChild(panel);
    }

    panel.style.cssText = `
      position: relative; bottom: auto; left: auto; transform: none;
      width: 100%; max-width: min(680px, 96vw);
      border-radius: 16px; border: 2px solid rgba(255,215,0,.25);
      margin-top: 16px; display: flex; flex-direction: column; gap: 14px;
      background: linear-gradient(160deg, #0a0d1a 0%, #120820 100%);
      padding: 24px 20px; box-shadow: 0 8px 40px rgba(0,0,0,.5);
    `;

    panel.innerHTML = `
      <div class="gp-header">
        <div class="gp-emoji">${c.emoji}</div>
        <div>
          <div class="gp-name">${c.name}</div>
          <div class="gp-universe" style="color:${c.color}">${c.universe}</div>
        </div>
      </div>
      <div class="gp-subject">📚 ${c.subject}</div>
      <div class="gp-desc">${c.desc}</div>
      <div class="gp-chars">
        ${c.chars.map((ch, i) => `
          <span class="gp-char-badge" style="border-color:${c.charColors[i]}55;color:${c.charColors[i]}">
            👤 ${ch}
          </span>`).join('')}
      </div>
      ${c.locked
        ? `<div class="gp-locked-msg">🔒 Bientôt disponible !</div>`
        : `<button class="gp-play-btn"
             style="background:linear-gradient(135deg,${c.color},${c.color}99)"
             onclick="navigateTo('${c.id === 'history' ? 'histoire' : 'iles'}')">
             ⚔️ COMMENCER L'AVENTURE !
           </button>`
      }
    `;

    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);

  } else {
    if (typeof window._originalShowContinentPanel === 'function') {
      window._originalShowContinentPanel(c);
    }
  }
};

// ── Patch : hideContinentPanel ──
window.hideContinentPanel = function() {
  const panel = getSection('globe-panel');
  if (panel) {
    panel.classList.remove('visible');
    if (getCurrentRoute() === 'carte') panel.style.display = 'none';
  }
  const overlay = getSection('globe-overlay');
  if (overlay) overlay.classList.remove('visible');
};

// ══════════════════════════════
// NAVIGATION UI — supprimée (boutons Carte/Îles gérés par header)
// ══════════════════════════════
function buildNavBar() {
  // Désactivé — la navbar #pirate-nav est masquée via CSS header.css
}

function updateNavActive() {}

// ══════════════════════════════
// INIT
// ══════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Bloquer le router si Supabase traite un magic link
  if (window.location.hash.includes("access_token")) {
    console.log("🔑 Magic link détecté — router suspendu, Supabase gère la redirection");
    return;
  }

  // Si pas de hash → login
  if (!window.location.hash || window.location.hash === '#') {
    navigateTo('login');
  } else {
    handleRoute();
  }

  window.addEventListener('hashchange', updateNavActive);
});

// ── CSS navbar retiré (géré par header.css) ──