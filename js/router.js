// ═══════════════════════════════════════════════════════════════
// ROUTER.JS — Académie Pirate
// Hash routing : #/login | #/parent | #/carte | #/iles
//               #/quiz  | #/histoire | #/kanto
//
// ✅ FIX : le magic link (access_token) n'est PLUS géré ici.
//    C'est auth.js + supabase-patch.js qui gèrent l'auth via afInit().
//    Le router ne redirige vers 'parent' QU'APRÈS que l'auth soit établie.
// ═══════════════════════════════════════════════════════════════

// ── Table de routage ──
var ROUTES = {
  'login'      : showLogin,
  'parent'     : showParentDashboard, // remplacé par supabase-patch.js → afShowParentDashboard
  'carte'      : showCarte,
  'iles'       : showIles,
  'grand-bleu' : showIles,        // URL-01 : alias canonique du Grand Bleu
  'quiz'       : showQuiz,
  'histoire'   : showHistoire,
  'kanto'      : showKanto,
  'pays-du-feu': showPaysduFeu,
  'namek'      : showNamek,
  'english'    : function(silent) { if (typeof showEnglish === 'function') showEnglish(silent); },
  'select'     : function() { if (typeof showChildSelect === 'function') showChildSelect(); }
};

// ── Sections HTML ──
function getSection(id) { return document.getElementById(id); }

function hideAll() {
  document.body.classList.remove('login-active');

  // Masquer le fond héros login (avatar strips)
  var heroBg = document.getElementById('login-hero-bg');
  if (heroBg) heroBg.style.display = 'none';

  const login = getSection('login-screen');
  if (login) login.classList.add('gone');

  const avatar = getSection('avatar-screen');
  if (avatar) avatar.classList.add('gone');

  const parentSec = document.getElementById('parent-sec');
  if (parentSec) parentSec.style.display = 'none';

  const globe = getSection('globe-sec');
  if (globe) globe.style.display = 'none';

  const divider = document.querySelector('.world-divider');
  if (divider) divider.style.display = 'none';

  const map = getSection('map-sec');
  if (map) map.style.display = 'none';

  const hIles = document.getElementById('histoire-iles-sec');
  const hQuiz = document.getElementById('histoire-quiz-sec');
  if (hIles) hIles.style.display = 'none';
  if (hQuiz) hQuiz.style.display = 'none';

  const histBg = document.getElementById('hist-bg');
  if (histBg) histBg.classList.remove('visible');
  const histOv = document.getElementById('hist-overlay');
  if (histOv) histOv.classList.remove('visible');

  const quiz = getSection('quiz-sec');
  if (quiz) quiz.style.display = 'none';

  const kantoIles = document.getElementById('kanto-iles-sec');
  if (kantoIles) kantoIles.style.display = 'none';
  const kantoQuiz = document.getElementById('kanto-quiz-sec');
  if (kantoQuiz) kantoQuiz.style.display = 'none';
  const kantoBg = document.getElementById('kanto-bg');
  if (kantoBg) kantoBg.classList.remove('visible');

  const pdfIles = document.getElementById('pdf-iles-sec');
  const pdfQuiz = document.getElementById('pdf-quiz-sec');
  if (pdfIles) pdfIles.style.display = 'none';
  if (pdfQuiz) pdfQuiz.style.display = 'none';
  const pdfBg = document.getElementById('pdf-bg');
  if (pdfBg) pdfBg.classList.remove('visible');

  const jjkIles = document.getElementById('jjk-iles-sec');
  const jjkQuiz = document.getElementById('jjk-quiz-sec');
  if (jjkIles) jjkIles.style.display = 'none';
  if (jjkQuiz) jjkQuiz.style.display = 'none';
  const jjkBg = document.getElementById('jjk-bg');
  if (jjkBg) jjkBg.classList.remove('visible');

  const aotLevels = document.getElementById('aot-levels-sec');
  const aotIles   = document.getElementById('aot-iles-sec');
  const aotQuiz   = document.getElementById('aot-quiz-sec');
  if (aotLevels) aotLevels.style.display = 'none';
  if (aotIles)   aotIles.style.display   = 'none';
  if (aotQuiz)   aotQuiz.style.display   = 'none';
  const aotBg = document.getElementById('aot-bg');
  if (aotBg) aotBg.classList.remove('visible');

  // Restaurer le fond manga quand on quitte Kanto
  const mangaBg = document.getElementById('manga-bg');
  if (mangaBg) mangaBg.style.display = '';

  if (typeof hideContinentPanel === 'function') hideContinentPanel();
}

// ══════════════════════════════
// PAGES
// ══════════════════════════════

function showLogin() {
  hideAll();
  document.body.classList.add('login-active');
  const login = getSection('login-screen');
  if (login) login.classList.remove('gone');
  document.title = 'Académie Pirate — Connexion';
}

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
        position: relative; bottom: auto; left: auto; transform: none;
        width: 100%; max-width: min(680px, 96vw);
        border-radius: 16px; border: 2px solid rgba(255,215,0,.2);
        margin-top: 16px; display: none;
      `;
    }
  }

  document.title = 'Académie Pirate — Carte du Monde';

  // globe.js renomme globe-container → treasure-map lors du premier appel.
  // On cherche les deux IDs et on reconstruit si aucun SVG trouvé.
  if (typeof buildTreasureMap === 'function') {
    const container = getSection('globe-container') || getSection('treasure-map');
    if (!container) {
      // Le div n'existe pas encore — le créer dynamiquement
      const globeSec = getSection('globe-sec');
      if (globeSec) {
        const div = document.createElement('div');
        div.id = 'globe-container';
        globeSec.insertBefore(div, globeSec.firstChild.nextSibling || null);
      }
      buildTreasureMap();
    } else if (!container.querySelector('svg')) {
      buildTreasureMap();
    }
  }
}

function showIles() {
  hideAll();
  if (window.AP) window.AP.trackWorldEnter('grandbleu');
  if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('grandbleu');
  const map = getSection('map-sec');
  if (map) map.style.display = 'block';
  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') playBGM('map');
  document.title = 'Académie Pirate — Grand Bleu · Français';
}

function showQuiz() {
  hideAll();
  const quiz = getSection('quiz-sec');
  if (quiz) quiz.style.display = 'block';
  document.title = 'Académie Pirate — Quiz';
}

function showHistoire() {
  hideAll();
  if (window.AP) window.AP.trackWorldEnter('magnolia');
  if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('magnolia');
  if (typeof stopBGM === 'function') stopBGM();
  setTimeout(function () {
    if (typeof playBGM === 'function') playBGM('dbz-map'); // carte → music map
  }, 300);
  const sec = document.getElementById('histoire-iles-sec');
  if (sec) {
    sec.style.display = 'block';
    if (typeof buildHistoireGrid === 'function') buildHistoireGrid();
  }
  const histBg = document.getElementById('hist-bg');
  if (histBg) histBg.classList.add('visible');
  if (typeof loadHistBgStrips === 'function') loadHistBgStrips();
  const histOv = document.getElementById('hist-overlay');
  if (histOv) histOv.classList.add('visible');
  document.title = 'Académie Pirate — Histoire';
}

function showKanto() {
  hideAll();
  if (window.AP) window.AP.trackWorldEnter('kanto');
  if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('kanto');

  const mangaBg = document.getElementById('manga-bg');
  if (mangaBg) mangaBg.style.display = 'none';

  const kantoIles = document.getElementById('kanto-iles-sec');
  if (kantoIles) kantoIles.style.display = 'block';

  const kantoQuiz = document.getElementById('kanto-quiz-sec');
  if (kantoQuiz) kantoQuiz.style.display = 'none';

  const kantoBg = document.getElementById('kanto-bg');
  if (kantoBg) kantoBg.classList.add('visible');

  if (typeof buildKantoGrid   === 'function') buildKantoGrid();
  if (typeof loadKantoAssets  === 'function') loadKantoAssets();
  if (typeof loadKantoProgress=== 'function') loadKantoProgress();
  if (typeof loadKantoBgStrips=== 'function') loadKantoBgStrips();

  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') setTimeout(function () { playBGM('kanto-map'); }, 300);

  document.title = 'Académie Pirate — Kanto';
}

function showPaysduFeu() {
  hideAll();
  if (window.AP) window.AP.trackWorldEnter('paysdufeu');
  if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('paysdufeu');

  const mangaBg = document.getElementById('manga-bg');
  if (mangaBg) mangaBg.style.display = 'none';

  const pdfBg = document.getElementById('pdf-bg');
  if (pdfBg) pdfBg.classList.add('visible');

  // quiz-pays-du-feu.js expose showPaysduFeu — mais c'est ce router qui l'appelle
  // On appelle directement buildPdfGrid + loadPdfProgress depuis quiz-pays-du-feu.js
  var pdfIles = document.getElementById('pdf-iles-sec');
  if (pdfIles) pdfIles.style.display = 'block';
  if (typeof buildPdfGrid     === 'function') buildPdfGrid();
  if (typeof loadPdfProgress  === 'function') loadPdfProgress();
  if (typeof loadPdfBgStrips  === 'function') loadPdfBgStrips();

  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') setTimeout(function(){ playBGM('naruto-map'); }, 300);
  document.title = 'Académie Pirate — Pays du Feu';
}
function showNamek() {
  hideAll();
  if (window.AP) window.AP.trackWorldEnter('namek');
  if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('namek');

  const mangaBg = document.getElementById('manga-bg');
  if (mangaBg) mangaBg.style.display = 'none';

  const jjkBg = document.getElementById('jjk-bg');
  if (jjkBg) jjkBg.classList.add('visible');

  var jjkIles = document.getElementById('jjk-iles-sec');
  if (jjkIles) jjkIles.style.display = 'block';

  if (typeof buildJjkGrid      === 'function') buildJjkGrid();
  if (typeof loadJjkProgress   === 'function') loadJjkProgress();
  if (typeof loadJjkBgStrips   === 'function') loadJjkBgStrips();
  
  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') setTimeout(function(){ playBGM('jjk-map'); }, 300);
  document.title = 'Académie Pirate — Namek';

  function showEnglish() {
  hideAll();
  if (window.AP) window.AP.trackWorldEnter('english');
  if (window.AP && window.AP.setLastWorld) window.AP.setLastWorld('english');

  const mangaBg = document.getElementById('manga-bg');
  if (mangaBg) mangaBg.style.display = 'none';

  const aotBg = document.getElementById('aot-bg');
  if (aotBg) aotBg.classList.add('visible');

  const aotLevels = document.getElementById('aot-levels-sec');
  if (aotLevels) aotLevels.style.display = 'block';

  if (typeof buildAotLevels    === 'function') buildAotLevels();
  if (typeof loadAotBgStrips   === 'function') loadAotBgStrips();

  if (typeof stopBGM === 'function') stopBGM();
  if (typeof playBGM === 'function') setTimeout(function(){ playBGM('aot-map'); }, 300);
  document.title = 'Académie Pirate — English';
}
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

// Sous-route (ex: 'cm2' dans #/english/cm2) — jamais utilisé pour comparer
function _getSubRoute() {
  var hash = window.location.hash;
  var parts = hash.replace('#/', '').split('/');
  return parts[1] || null;
}

// ── SEO : meta dynamique par route ──────────────────────────────
var SEO_ROUTES = {
  'login':       { title: "Académie Pirate — Rejoins l'équipage !",              desc: "Plateforme d'apprentissage gamifiée manga pour enfants CM2-5ème. Français, Maths, Histoire, Sciences." },
  'carte':       { title: "Académie Pirate — Carte du Monde",                     desc: "Choisis ton univers manga et pars à l'aventure pédagogique !" },
  'iles':        { title: "Académie Pirate — Grand Bleu (Français · One Piece)",  desc: "8 îles de grammaire et conjugaison avec l'équipage Chapeau de Paille." },
  'quiz':        { title: "Académie Pirate — Quiz Français",                       desc: "Quiz interactif de grammaire française. Niveau CM2-6ème." },
  'histoire':    { title: "Académie Pirate — Magnolia (Histoire · Dragon Ball Z)", desc: "8 îles d'histoire : Antiquité, Moyen Âge, Islam, Renaissance." },
  'kanto':       { title: "Académie Pirate — Kanto (Sciences · Demon Slayer)",    desc: "8 îles de sciences physiques : signaux, lumière, électricité, Internet." },
  'pays-du-feu': { title: "Académie Pirate — Pays du Feu (Maths · Naruto)",      desc: "8 îles de mathématiques : calcul, fractions, géométrie, nombres relatifs." },
  'parent':      { title: 'Académie Pirate — Dashboard Parent',                    desc: 'Suivez la progression de votre enfant : XP, îles complétées, résultats détaillés.' },
  'grand-bleu':  { title: 'Académie Pirate — Grand Bleu · Français One Piece',    desc: '8 îles de grammaire et conjugaison avec les pirates de One Piece. Programme CM2-4ème.' },
  'english':     { title: 'Académie Pirate — Anglais · Attack on Titan',           desc: "Révise l'anglais CM2 à 4ème avec les héros d'Attack on Titan. Programme officiel." },
  'english/cm2': { title: 'Quiz Anglais CM2 — Vocabulaire A1 · Académie Pirate',  desc: '8 îles anglais CM2 : alphabet, chiffres, couleurs, animaux, famille. Niveau A1.' },
  'english/6eme':{ title: 'Quiz Anglais 6ème — Grammaire A1+ · Académie Pirate',  desc: '8 îles anglais 6ème : Present Simple, BE/HAVE, articles, pluriels. Niveau A1+.' },
  'english/5eme':{ title: 'Quiz Anglais 5ème — Grammaire A2 · Académie Pirate',   desc: '8 îles anglais 5ème : Past Simple, modaux, comparatifs. Niveau A2.' },
  'english/4eme':{ title: 'Quiz Anglais 4ème — Grammaire B1 · Académie Pirate',   desc: '8 îles anglais 4ème : Present Perfect, futur, voix passive. Niveau B1.' },
  'namek':       { title: 'Académie Pirate — Namek · Géographie JJK',             desc: '8 îles de géographie avec Jujutsu Kaisen. Programme officiel 6ème.' },
  'select':      { title: 'Académie Pirate — Choisir ton aventurier',              desc: 'Sélectionne ton personnage manga pour commencer ton aventure pédagogique.' },
};

function _updateSEO(route) {
  var seo = SEO_ROUTES[route] || SEO_ROUTES['login'];
  // Title
  document.title = seo.title;
  // Meta description
  var metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
  metaDesc.content = seo.desc;
  // OG tags
  _setMeta('og:title',       seo.title);
  _setMeta('og:description', seo.desc);
  _setMeta('og:url',         window.location.href);
  _setMeta('og:type',        'website');
  _setMeta('og:image',       'https://aca-pirate.ch/assets/images/og-preview.png');
  // Twitter Card
  _setMeta('twitter:card',        'summary_large_image');
  _setMeta('twitter:title',       seo.title);
  _setMeta('twitter:description', seo.desc);
  // Canonical
  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = window.location.origin + window.location.pathname;
}

function _setMeta(property, content) {
  var el = document.querySelector('meta[property="' + property + '"],meta[name="' + property + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function _injectJSONLD(route, opts) {
  // Supprimer l'ancien
  var old = document.getElementById('ap-ld-json');
  if (old) old.remove();

  var ld = null;
  opts = opts || {};

  if (route === 'carte') {
    ld = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Académie Pirate',
      'url': 'https://safwanst76-dot.github.io/academie-pirate/',
      'applicationCategory': 'EducationalApplication',
      'operatingSystem': 'Web',
      'description': 'Plateforme d\'apprentissage gamifiée manga pour enfants 8-13 ans.',
      'educationalLevel': 'CM2, 6ème, 5ème',
      'teaches': ['Français', 'Mathématiques', 'Histoire', 'Sciences Physiques'],
      'inLanguage': 'fr',
      'audience': { '@type': 'EducationalAudience', 'educationalRole': 'student', 'audienceType': 'children 8-13' },
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR', 'description': 'Freemium — 1 île gratuite par monde' }
    };
  } else if (route === 'iles' || route === 'histoire' || route === 'kanto' || route === 'pays-du-feu') {
    var worldNames = { 'iles': 'Grand Bleu — Français', 'histoire': 'Magnolia — Histoire', 'kanto': 'Kanto — Sciences Physiques', 'pays-du-feu': 'Pays du Feu — Mathématiques' };
    ld = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'Académie Pirate · ' + (worldNames[route] || route),
      'description': SEO_ROUTES[route] ? SEO_ROUTES[route].desc : '',
      'provider': { '@type': 'Organization', 'name': 'Académie Pirate' },
      'educationalLevel': 'CM2-5ème',
      'inLanguage': 'fr',
      'isAccessibleForFree': true,
      'courseMode': 'online'
    };
  }

  if (ld) {
    var s = document.createElement('script');
    s.id = 'ap-ld-json';
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }
}

function handleRoute() {
  var route   = getCurrentRoute();   // toujours une string
  var sub     = _getSubRoute();      // 'cm2', '6eme', etc. ou null
  var handler = ROUTES[route];

  // SEO dynamique — sous-route incluse si présente
  var seoKey = (sub && route === 'english') ? route + '/' + sub : route;
  _updateSEO(seoKey);
  _injectJSONLD(route);

  if (window.AP && typeof window.AP.trackPage === 'function') {
    window.AP.trackPage(seoKey);
  }

  if (handler) {
    // Sous-routes English : #/english/cm2 → showEnglish puis showLevel(sub)
    if (route === 'english' && sub) {
      var validLevels = ['cm2', '6eme', '5eme', '4eme'];
      if (validLevels.indexOf(sub) !== -1) {
        handler(true); // silent = ne re-push pas l'URL
        setTimeout(function() {
          if (typeof window.aot_showLevel === 'function') {
            window.aot_showLevel(sub, true);
          }
        }, 80);
        return;
      }
    }
    handler();
  } else {
    navigateTo('login');
  }
}

// ── Écouter les changements de hash ──
window.addEventListener('hashchange', handleRoute);

// ── Patches utilitaires ──
window.goBack = function () { navigateTo('grand-bleu'); };

// Sauvegarder le startIsland de quiz.js avant d'écraser
// (scripts chargés avant router.js → window.startIsland existe déjà)
window._originalStartIsland = window.startIsland;

window.startIsland = function (n) {
  // Appeler le vrai startIsland de quiz.js (cinématique + _launchIsland)
  if (typeof window._originalStartIsland === 'function') {
    window._originalStartIsland(n);
  }
  // Mettre à jour le hash sans déclencher hideAll (quiz.js gère l'affichage)
  if (window.location.hash !== '#/quiz') {
    history.replaceState(null, '', '#/quiz');
  }
};

// ── showContinentPanel : afficher le panneau sous la carte ──
window._originalShowContinentPanel = window.showContinentPanel;
window.showContinentPanel = function (c) {
  const route = getCurrentRoute();

  if (route === 'carte') {
    const panel = getSection('globe-panel');
    if (!panel) return;

    const globeSec = getSection('globe-sec');
    if (globeSec && panel.parentElement !== globeSec) globeSec.appendChild(panel);

    panel.style.cssText = `
      position: relative; bottom: auto; left: auto; transform: none;
      width: 100%; max-width: min(680px, 96vw);
      border-radius: 16px; border: 2px solid rgba(255,215,0,.25);
      margin-top: 16px; display: flex; flex-direction: column; gap: 14px;
      background: linear-gradient(160deg, #0a0d1a 0%, #120820 100%);
      padding: 24px 20px; box-shadow: 0 8px 40px rgba(0,0,0,.5);
    `;

   const targetRoute = c.id === 'history' ? 'histoire' : c.id === 'kanto' ? 'kanto' : c.id === 'math' ? 'pays-du-feu' : c.id === 'geography' ? 'namek' : c.id === 'english' ? 'english' : 'iles';
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
             onclick="navigateTo('${targetRoute}')">
             ⚔️ COMMENCER L'AVENTURE !
           </button>`
      }`;

    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);

  } else {
    if (typeof window._originalShowContinentPanel === 'function') {
      window._originalShowContinentPanel(c);
    }
  }
};

window.hideContinentPanel = function () {
  const panel = getSection('globe-panel');
  if (panel) {
    panel.classList.remove('visible');
    if (getCurrentRoute() === 'carte') panel.style.display = 'none';
  }
  const overlay = getSection('globe-overlay');
  if (overlay) overlay.classList.remove('visible');
};

// ══════════════════════════════
// INIT DOM
// ══════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // ✅ FIX : Ne PAS gérer le magic link ici.
  // auth.js + supabase-patch.js gèrent l'auth AVANT que le router décide la route.
  // sbInit() (patché) est appelé par le DOMContentLoaded de supabase.js.
  // Quand l'auth se termine, _handleSignedIn() appelle navigateTo('parent').
  //
  // Le router doit juste gérer le hash COURANT (hors magic link).

  const hash = window.location.hash;

  // Si c'est un magic link → ne pas router, laisser auth.js gérer
  if (hash.includes('access_token')) {
    // Rien : supabase-patch.js + auth.js géreront la redirection
    return;
  }

  // Hash vide ou root → déléguer à auth.js (qui appellera showLogin ou Dashboard)
  if (!hash || hash === '#' || hash === '#/') {
    // Pas de navigateTo ici : sbInit() s'en charge via afInit()
    return;
  }

  // Hash existant (ex: #/carte) → router normalement
  handleRoute();

  window.addEventListener('hashchange', function () {
    // Ignorer les magic links dans les hashchanges
    if (!window.location.hash.includes('access_token')) handleRoute();
  });
});

function buildNavBar() {} // désactivé — géré par header.css
function updateNavActive() {}

console.info('🔑 router.js chargé — hash routing actif');
