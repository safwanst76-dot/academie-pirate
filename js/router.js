// ═══════════════════════════════════════════════════════
// ROUTER — Académie Pirate
// Hash routing : #/login | #/carte | #/iles | #/quiz
// ═══════════════════════════════════════════════════════

const ROUTES = {
  'login'  : showLogin,
  'carte'  : showCarte,
  'iles'   : showIles,
  'quiz'   : showQuiz,
};

// ── Sections HTML ──
function getSection(id) { return document.getElementById(id); }

function hideAll() {
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

  // Panneau info continent EN DESSOUS de la carte (pas en overlay)
  const panel = getSection('globe-panel');
  if (panel) {
    panel.classList.remove('visible');
    // Déplacer le panneau dans globe-sec si pas déjà fait
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

  // Rebuild la carte si pas encore fait
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
// NAVIGATION
// ══════════════════════════════
function navigateTo(route) {
  window.location.hash = '/' + route;
}

function getCurrentRoute() {
  const hash = window.location.hash; // ex: #/carte
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
    // Route inconnue → login
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
    // Afficher en dessous de la carte
    const panel = getSection('globe-panel');
    if (!panel) return;

    // S'assurer que le panneau est dans globe-sec
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
             onclick="navigateTo('iles')">
             ⚔️ COMMENCER L'AVENTURE !
           </button>`
      }
    `;

    // Scroll doux vers le panneau
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);

  } else {
    // Comportement original sur les autres pages
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
// NAVIGATION UI — Barre de nav entre pages
// ══════════════════════════════
function buildNavBar() {
  // Ne pas recréer si déjà là
  if (document.getElementById('pirate-nav')) return;

  const nav = document.createElement('div');
  nav.id = 'pirate-nav';
  nav.innerHTML = `
    <button class="pnav-btn" data-route="carte" onclick="navigateTo('carte')">🗺️ Carte</button>
    <button class="pnav-btn" data-route="iles" onclick="navigateTo('iles')">🏝️ Îles Pirates</button>
  `;

  // Insérer après le header principal
  const header = document.querySelector('#hdr') || document.querySelector('header');
  if (header) {
    header.insertAdjacentElement('afterend', nav);
  } else {
    document.body.insertAdjacentElement('afterbegin', nav);
  }
}

function updateNavActive() {
  const route = getCurrentRoute();
  document.querySelectorAll('.pnav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.route === route);
  });
}

// ══════════════════════════════
// INIT
// ══════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Bloquer le router si Supabase traite un magic link
  if (window.location.hash.includes("access_token")) {
    console.log("🔑 Magic link détecté — router suspendu");
    return;
  }
  // Construire la navbar (visible seulement quand connecté)
  buildNavBar();

  // Si pas de hash → login
  if (!window.location.hash || window.location.hash === '#') {
    navigateTo('login');
  } else {
    handleRoute();
  }

  // Mettre à jour le style actif de la nav à chaque changement
  window.addEventListener('hashchange', updateNavActive);
});

// ── CSS navbar injecté dynamiquement ──
const navStyle = document.createElement('style');
navStyle.textContent = `
#pirate-nav {
  display: none; /* caché par défaut, affiché quand connecté */
  align-items: center; justify-content: center; gap: 10px;
  padding: 8px 14px;
  background: rgba(0,0,0,0.4);
  border-bottom: 1px solid rgba(255,215,0,0.15);
  position: relative; z-index: 100;
}
#pirate-nav.visible { display: flex; }

.pnav-btn {
  font-family: 'Bangers', cursive;
  font-size: 1rem; letter-spacing: 2px;
  padding: 6px 18px; border-radius: 20px;
  border: 2px solid rgba(255,215,0,0.2);
  background: transparent; color: rgba(255,255,255,0.5);
  cursor: pointer; transition: all .2s;
}
.pnav-btn:hover {
  border-color: rgba(255,215,0,0.5);
  color: #ffd700; background: rgba(255,215,0,0.08);
}
.pnav-btn.active {
  border-color: #ffd700; color: #ffd700;
  background: rgba(255,215,0,0.12);
  box-shadow: 0 0 12px rgba(255,215,0,0.2);
}
`;
document.head.appendChild(navStyle);