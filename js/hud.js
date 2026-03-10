// ═══════════════════════════════════════
// HUD + BADGES — Académie Pirate
// NOTE: showToast, starsStr, fxCorrect, fxWrong, starRain
// sont dans ui.js — NE PAS les redéfinir ici !
// ═══════════════════════════════════════

var LEVELS = [
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

console.info('🏴‍☠️ hud.js chargé');
