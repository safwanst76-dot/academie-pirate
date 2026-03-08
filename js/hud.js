// ═══════════════════════════════════════
// HUD + BADGES + VISUAL FX — Académie Pirate
// ═══════════════════════════════════════

const LEVELS = [
  {min:0,  name:"Mousse"},          {min:10, name:"Matelot"},
  {min:25, name:"Quartier-Maître"}, {min:40, name:"Navigateur"},
  {min:55, name:"Capitaine"},       {min:70, name:"Vice-Amiral"},
  {min:80, name:"👑 Roi des Pirates"}
];

function getLvl(x) {
  for (var i = LEVELS.length - 1; i >= 0; i--)
    if (x >= LEVELS[i].min) return LEVELS[i];
  return LEVELS[0];
}

function updateHUD() {
  document.getElementById('hXP').textContent = xp;
  document.getElementById('hLVL').textContent = getLvl(xp).name;
  document.getElementById('hISLE').textContent = Object.keys(completedIslands).length;
  document.getElementById('hSTREAK').textContent = streak;
  document.getElementById('xpFill').style.width = Math.min(100, Math.round(xp / 80 * 100)) + '%';
  document.getElementById('xpLbl').textContent = xp + ' / 80 XP';
}

function starsStr(s, max) {
  var r = '';
  for (var i = 0; i < max; i++) r += i < s ? '⭐' : '☆';
  return r;
}

function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3000);
}

// Badges
const BADGE_RULES = [
  {id:'b0', check: function() { return Object.keys(completedIslands).length >= 1; }, msg:'🌊 Première île explorée !'},
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
      sfxFanfare();
    }
  });
}

// Visual FX
function fxCorrect(word) {
  var el = document.getElementById('attackCorrect');
  el.textContent = word || 'PARFAIT!';
  el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire');
  setTimeout(function() { el.classList.remove('fire'); }, 750);
  document.getElementById('screenFlash').className = 'screen-flash green-f';
  setTimeout(function() { document.getElementById('screenFlash').className = 'screen-flash'; }, 400);
}

function fxWrong() {
  var el = document.getElementById('attackWrong');
  el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire');
  setTimeout(function() { el.classList.remove('fire'); }, 550);
  document.getElementById('screenFlash').className = 'screen-flash red-f';
  setTimeout(function() { document.getElementById('screenFlash').className = 'screen-flash'; }, 400);
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
        s.style.top = (10 + Math.random() * 50) + 'vh';
        document.body.appendChild(s);
        setTimeout(function() { s.remove(); }, 1300);
      }, i * 90);
    })(i);
  }
}
