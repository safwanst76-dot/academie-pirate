// ═══════════════════════════════════════
// HUD + BADGES + VISUAL FX — Académie Pirate
// ═══════════════════════════════════════

// ── Variables globales d'état du jeu ──
// Ces variables sont partagées entre quiz.js, hud.js, save.js, etc.
// On les déclare ici avec var pour être sûr qu'elles sont globales.
// Si déjà déclarées ailleurs, var ne les écrase pas.
if (typeof xp               === 'undefined') var xp               = 0;
if (typeof streak           === 'undefined') var streak           = 0;
if (typeof completedIslands === 'undefined') var completedIslands = {};
if (typeof currentIsland    === 'undefined') var currentIsland    = 0;
if (typeof answers          === 'undefined') var answers          = {};

// ── Niveaux ──
const LEVELS = [
  {min:0,  name:"Mousse"},
  {min:10, name:"Matelot"},
  {min:25, name:"Quartier-Maître"},
  {min:40, name:"Navigateur"},
  {min:55, name:"Capitaine"},
  {min:70, name:"Vice-Amiral"},
  {min:80, name:"👑 Roi des Pirates"}
];

function getLvl(x) {
  for (var i = LEVELS.length - 1; i >= 0; i--)
    if (x >= LEVELS[i].min) return LEVELS[i];
  return LEVELS[0];
}

function updateHUD() {
  var elXP     = document.getElementById('hXP');
  var elLVL    = document.getElementById('hLVL');
  var elISLE   = document.getElementById('hISLE');
  var elSTREAK = document.getElementById('hSTREAK');
  var elFill   = document.getElementById('xpFill');
  var elLbl    = document.getElementById('xpLbl');
  if (elXP)     elXP.textContent     = xp;
  if (elLVL)    elLVL.textContent    = getLvl(xp).name;
  if (elISLE)   elISLE.textContent   = Object.keys(completedIslands).length;
  if (elSTREAK) elSTREAK.textContent = streak;
  if (elFill)   elFill.style.width   = Math.min(100, Math.round(xp / 80 * 100)) + '%';
  if (elLbl)    elLbl.textContent    = xp + ' / 80 XP';
}

function starsStr(s, max) {
  var r = '';
  for (var i = 0; i < max; i++) r += i < s ? '⭐' : '☆';
  return r;
}

function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3000);
}

// ── Badges ──
var BADGE_RULES = [
  {id:'b0', check: function() { return Object.keys(completedIslands).length >= 1; }, msg:'🌊 Première île conquise !'},
  {id:'b1', check: function() { return Object.values(completedIslands).some(function(s) { return s === 10; }); }, msg:'⚔️ Score PARFAIT 10/10 !'},
  {id:'b2', check: function() { return Object.keys(completedIslands).length >= 2; }, msg:'🔥 2 îles conquises !'},
  {id:'b3', check: function() { return Object.keys(completedIslands).length >= 4; }, msg:'💎 Toutes les îles !'},
  {id:'b4', check: function() { return xp >= 70; }, msg:'👑 Roi des Pirates !'},
];
var unlockedBadges = new Set();

function checkBadges() {
  BADGE_RULES.forEach(function(r) {
    if (!unlockedBadges.has(r.id) && r.check()) {
      unlockedBadges.add(r.id);
      var el = document.getElementById(r.id);
      if (el) el.classList.add('on');
      showToast(r.msg);
      if (typeof sfxFanfare === 'function') sfxFanfare();
    }
  });
}

// ── Visual FX ──
function fxCorrect(word) {
  var el = document.getElementById('attackCorrect');
  if (!el) return;
  el.textContent = word || 'PARFAIT!';
  el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire');
  setTimeout(function() { el.classList.remove('fire'); }, 750);
  var sf = document.getElementById('screenFlash');
  if (sf) {
    sf.className = 'screen-flash green-f';
    setTimeout(function() { sf.className = 'screen-flash'; }, 400);
  }
}

function fxWrong() {
  var el = document.getElementById('attackWrong');
  if (!el) return;
  el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire');
  setTimeout(function() { el.classList.remove('fire'); }, 550);
  var sf = document.getElementById('screenFlash');
  if (sf) {
    sf.className = 'screen-flash red-f';
    setTimeout(function() { sf.className = 'screen-flash'; }, 400);
  }
}

function starRain(n) {
  n = n || 6;
  var emojis = ['⭐','✨','💫','🌟','⚡','🔥'];
  for (var i = 0; i < n; i++) {
    (function(i) {
      setTimeout(function() {
        var s = document.createElement('div');
        s.className = 'star-p';
        s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        s.style.left = Math.random() * 85 + 'vw';
        s.style.top  = (10 + Math.random() * 50) + 'vh';
        document.body.appendChild(s);
        setTimeout(function() { s.remove(); }, 1300);
      }, i * 90);
    })(i);
  }
}

function updateStreakDots() {
  var bar = document.getElementById('streak-bar');
  if (!bar) return;
  bar.innerHTML = '';
  for (var i = 0; i < 5; i++) {
    var dot = document.createElement('div');
    dot.className = 'streak-dot' + (i < streak ? ' on' : '');
    bar.appendChild(dot);
  }
}

// ── GIFs combat ──
var GIFS_CORRECT = [
  'https://media.giphy.com/media/T7Qx28nEdo9NK/giphy.gif',
  'https://media0.giphy.com/media/TXSxuSHx9i6TNeBSry/giphy.gif',
  'https://media.giphy.com/media/tIZUToOMEFGM0/giphy.gif',
  'https://media.giphy.com/media/7BW9U2cJPQZ0s/giphy.gif',
];
var GIFS_WRONG = [
  'https://media.giphy.com/media/9QPhSxfiHKdGdJfrlT/giphy.gif',
  'https://media.giphy.com/media/U8fhZ6bL4gm0eZ7NJH/giphy.gif',
  'https://media.giphy.com/media/l4EoSBIpWo73b9bW0/giphy.gif',
];
var GIFS_PERFECT = [
  'https://media.giphy.com/media/vplUlYHL0WnaE/giphy.gif',
  'https://media.giphy.com/media/Muqc4t03A8sz4ksa5i/giphy.gif',
];

function showCombatGif(type) {
  var overlay = document.getElementById('combat-gif-overlay');
  var img     = document.getElementById('combat-gif-img');
  if (!overlay || !img) return;
  var list = type === 'wrong' ? GIFS_WRONG : type === 'perfect' ? GIFS_PERFECT : GIFS_CORRECT;
  img.src = list[Math.floor(Math.random() * list.length)];
  overlay.classList.add('active');
  setTimeout(function() { overlay.classList.remove('active'); }, 1800);
}

function closeCombatVideo() {
  var overlay = document.getElementById('combat-overlay');
  var video   = document.getElementById('combat-video');
  if (overlay) overlay.classList.remove('active');
  if (video) { video.pause(); video.src = ''; }
}

// ── Navigation ──
function goBack() {
  if (typeof playBGM === 'function') playBGM('map');
  var quiz = document.getElementById('quiz-sec');
  var map  = document.getElementById('map-sec');
  if (quiz) quiz.style.display = 'none';
  if (map)  map.style.display  = 'block';
  answers = {};
  window.scrollTo(0, 0);
}

function retry(n) {
  answers = {};
  if (typeof startIsland === 'function') startIsland(n);
}

// ── Expose global ──
window.updateHUD      = updateHUD;
window.starsStr       = starsStr;
window.showToast      = showToast;
window.checkBadges    = checkBadges;
window.fxCorrect      = fxCorrect;
window.fxWrong        = fxWrong;
window.starRain       = starRain;
window.updateStreakDots = updateStreakDots;
window.showCombatGif  = showCombatGif;
window.closeCombatVideo = closeCombatVideo;
window.goBack         = goBack;
window.retry          = retry;
window.GIFS_CORRECT   = GIFS_CORRECT;
window.GIFS_WRONG     = GIFS_WRONG;
window.GIFS_PERFECT   = GIFS_PERFECT;

console.info('🏴‍☠️ hud.js chargé');