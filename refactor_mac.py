#!/usr/bin/env python3
"""
Refactorisation Académie Pirate
index.html 2000 lignes → modules séparés
"""
import os, json

BASE = '/Users/talebsafwan/academie-pirate'

# ═══════════════════════════════════════════════════════════
# 1. data/avatars.json
# ═══════════════════════════════════════════════════════════
avatars = {
  "version": "1.0",
  "avatars": [
    {"id":"luffy",   "name":"Luffy",   "color":"#e63946", "quote":"Je serai Roi des Pirates !",    "img":"https://cdn.myanimelist.net/images/characters/9/310307.jpg"},
    {"id":"zoro",    "name":"Zoro",    "color":"#22c55e", "quote":"Je ne me perdrai jamais !",      "img":"https://cdn.myanimelist.net/images/characters/3/100534.jpg"},
    {"id":"nami",    "name":"Nami",    "color":"#f59e0b", "quote":"L'argent ET la grammaire !",     "img":"https://cdn.myanimelist.net/images/characters/2/69389.jpg"},
    {"id":"usopp",   "name":"Usopp",   "color":"#92400e", "quote":"J'ai 8000 hommes !",             "img":"https://cdn.myanimelist.net/images/characters/9/69387.jpg"},
    {"id":"sanji",   "name":"Sanji",   "color":"#3b82f6", "quote":"Pour mes Nakamas !",             "img":"https://cdn.myanimelist.net/images/characters/8/69390.jpg"},
    {"id":"chopper", "name":"Chopper", "color":"#ec4899", "quote":"Je ne suis pas content !",       "img":"https://cdn.myanimelist.net/images/characters/7/69391.jpg"},
    {"id":"robin",   "name":"Robin",   "color":"#8b5cf6", "quote":"La connaissance est une arme.",  "img":"https://cdn.myanimelist.net/images/characters/6/69392.jpg"},
    {"id":"brook",   "name":"Brook",   "color":"#6366f1", "quote":"Yohohoho ! Puis-je voir ?",      "img":"https://cdn.myanimelist.net/images/characters/4/69389.jpg"},
    {"id":"ace",     "name":"Ace",     "color":"#f97316", "quote":"Je ne regrette rien !",          "img":"https://cdn.myanimelist.net/images/characters/5/284121.jpg"},
    {"id":"shanks",  "name":"Shanks",  "color":"#dc2626", "quote":"Je mise sur toi !",              "img":"https://cdn.myanimelist.net/images/characters/3/99170.jpg"},
    {"id":"law",     "name":"Law",     "color":"#0ea5e9", "quote":"Room. Shambles !",               "img":"https://cdn.myanimelist.net/images/characters/2/236545.jpg"},
    {"id":"hancock", "name":"Hancock", "color":"#f43f5e", "quote":"L'amour est invincible !",       "img":"https://cdn.myanimelist.net/images/characters/3/91667.jpg"}
  ]
}

with open(f'{BASE}/data/avatars.json', 'w', encoding='utf-8') as f:
    json.dump(avatars, f, ensure_ascii=False, indent=2)
print("✅ data/avatars.json")

# ═══════════════════════════════════════════════════════════
# 2. js/avatar.js
# ═══════════════════════════════════════════════════════════
avatar_js = r"""// ═══════════════════════════════════════
// AVATAR SYSTEM — Académie Pirate
// ═══════════════════════════════════════

let AVATARS = [];
let selectedAvatarId = 'luffy';
let playerName = '';
let playerData = {name:'Pirate', avatarId:'luffy', avatarImg:'', avatarColor:'#e63946', avatarQuote:'', charName:'Luffy'};

// Charger les avatars depuis le JSON
async function loadAvatars() {
  try {
    const r = await fetch('data/avatars.json');
    const data = await r.json();
    AVATARS = data.avatars;
    buildAvatarGrid();
    updateAvatarPreview();
  } catch(e) {
    console.warn('avatars.json non chargé, fallback inline');
    // Fallback minimal si fetch échoue
    AVATARS = [
      {id:'luffy', name:'Luffy', color:'#e63946', quote:'Je serai Roi des Pirates !', img:'https://cdn.myanimelist.net/images/characters/9/310307.jpg'}
    ];
    buildAvatarGrid();
  }
}

function buildAvatarGrid() {
  var grid = document.getElementById('avGrid');
  if (!grid) return;
  grid.innerHTML = '';
  AVATARS.forEach(function(av) {
    var div = document.createElement('div');
    div.className = 'av-char' + (av.id === selectedAvatarId ? ' selected' : '');
    div.onclick = (function(id) { return function() { selectAvatar(id); }; })(av.id);
    var img = document.createElement('img');
    img.alt = av.name; img.src = av.img;
    img.onerror = function() { this.style.opacity = '0.3'; };
    var nd = document.createElement('div');
    nd.className = 'av-char-name'; nd.textContent = av.name;
    div.appendChild(img); div.appendChild(nd); grid.appendChild(div);
  });
}

function selectAvatar(id) {
  selectedAvatarId = id;
  document.querySelectorAll('.av-char').forEach(function(el) {
    var nm = el.querySelector('.av-char-name');
    var av = AVATARS.find(function(a) { return a.id === id; });
    el.classList.toggle('selected', !!(nm && av && nm.textContent === av.name));
  });
  updateAvatarPreview();
}

function updateAvatarPreview() {
  var av = AVATARS.find(function(a) { return a.id === selectedAvatarId; }) || AVATARS[0];
  if (!av) return;
  var inp = document.getElementById('avNameInput');
  var nameVal = inp ? inp.value.trim() : '';
  var previewImg = document.getElementById('avPreviewImg');
  if (previewImg) { previewImg.src = av.img || ''; }
  var nameEl = document.getElementById('avPreviewName');
  if (nameEl) nameEl.textContent = nameVal || 'Ton nom ici';
  var charEl = document.getElementById('avPreviewChar');
  if (charEl) charEl.textContent = 'Personnage : ' + av.name;
  var quoteEl = document.getElementById('avPreviewQuote');
  if (quoteEl) quoteEl.textContent = av.quote;
}

function startAdventure() {
  var av = AVATARS.find(function(a) { return a.id === selectedAvatarId; }) || AVATARS[0];
  var inp = document.getElementById('avNameInput');
  var nameVal = inp ? inp.value.trim() : '';
  playerData = {
    name: nameVal || 'Pirate',
    avatarId: av.id, avatarImg: av.img,
    avatarColor: av.color, avatarQuote: av.quote, charName: av.name
  };
  playerName = playerData.name;
  try { localStorage.setItem('ap_player', JSON.stringify(playerData)); } catch(e) {}
  updateHeaderAvatar();
  loadProgress();
  var screen = document.getElementById('avatar-screen');
  if (screen) screen.classList.add('gone');
  setTimeout(function() { try { sfxCineVictory(); } catch(e) {} }, 300);
}

function showAvatarScreen() {
  var screen = document.getElementById('avatar-screen');
  if (!screen) return;
  screen.classList.remove('gone');
  if (playerData.name && playerData.name !== 'Pirate') {
    var inp = document.getElementById('avNameInput');
    if (inp) inp.value = playerData.name;
  }
  selectAvatar(playerData.avatarId || 'luffy');
  updateAvatarPreview();
}

function updateHeaderAvatar() {
  var img = document.getElementById('headerAvatarImg');
  var nameEl = document.getElementById('headerAvatarName');
  if (img) img.src = playerData.avatarImg || '';
  if (nameEl) nameEl.textContent = playerData.name || 'Pirate';
}

function loadPlayerData() {
  try {
    var saved = localStorage.getItem('ap_player');
    if (saved) {
      playerData = JSON.parse(saved);
      playerName = playerData.name;
      selectedAvatarId = playerData.avatarId || 'luffy';
      updateHeaderAvatar();
      loadProgress();
      return true;
    }
  } catch(e) {}
  return false;
}

// Clé de progression unique par joueur
function progressKey() {
  var name = (playerData && playerData.name) ? playerData.name.toLowerCase().replace(/\s+/g, '_') : 'default';
  return 'academie_pirate_v3_' + name;
}
"""

with open(f'{BASE}/js/avatar.js', 'w', encoding='utf-8') as f:
    f.write(avatar_js)
print("✅ js/avatar.js")

# ═══════════════════════════════════════════════════════════
# 3. js/save.js — sauvegarde/chargement progression
# ═══════════════════════════════════════════════════════════
save_js = r"""// ═══════════════════════════════════════
// SAVE / LOAD — Académie Pirate
// Progression séparée par joueur
// ═══════════════════════════════════════

function saveProgress() {
  var data = {xp: xp, streak: streak, completedIslands: completedIslands, timestamp: new Date().toISOString()};
  try { localStorage.setItem(progressKey(), JSON.stringify(data)); } catch(e) {}
  if (typeof WEBAPP_URL !== 'undefined' && WEBAPP_URL) {
    fetch(WEBAPP_URL, {method:'POST', body: JSON.stringify(data)}).catch(function(){});
  }
}

function loadProgress() {
  try {
    var s = localStorage.getItem(progressKey());
    if (!s) return;
    var d = JSON.parse(s);
    xp = d.xp || 0;
    streak = d.streak || 0;
    completedIslands = d.completedIslands || {};
    Object.keys(completedIslands).forEach(function(n) {
      var el = document.getElementById('stars' + n);
      if (el) el.textContent = starsStr(completedIslands[n], 10);
      var isle = document.getElementById('isle' + n);
      if (isle) isle.classList.add('done');
    });
    updateHUD();
  } catch(e) {}
}
"""

with open(f'{BASE}/js/save.js', 'w', encoding='utf-8') as f:
    f.write(save_js)
print("✅ js/save.js")

# ═══════════════════════════════════════════════════════════
# 4. js/hud.js — HUD, badges, toast, FX visuels
# ═══════════════════════════════════════════════════════════
hud_js = r"""// ═══════════════════════════════════════
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
"""

with open(f'{BASE}/js/hud.js', 'w', encoding='utf-8') as f:
    f.write(hud_js)
print("✅ js/hud.js")

# ═══════════════════════════════════════════════════════════
# 5. css/main.css — tout le CSS de index.html
# ═══════════════════════════════════════════════════════════
# On lit le CSS depuis index.html et on l'extrait
with open(f'{BASE}/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

css_start = html.find('<style>') + len('<style>')
css_end = html.find('</style>')
css_content = html[css_start:css_end]

with open(f'{BASE}/css/main.css', 'w', encoding='utf-8') as f:
    f.write('/* ═══ ACADÉMIE PIRATE — CSS Principal ═══ */\n')
    f.write(css_content)
print(f"✅ css/main.css ({len(css_content.split(chr(10)))} lignes)")

# ═══════════════════════════════════════════════════════════
# 6. Nettoyer les fichiers .py parasites du repo
# ═══════════════════════════════════════════════════════════
py_files = ['fix.py','fix2.py','fix3.py','megafix.py','patch_avatar.py','patch_images.py']
for pf in py_files:
    fp = f'{BASE}/{pf}'
    if os.path.exists(fp):
        os.remove(fp)
        print(f"🗑️  Supprimé: {pf}")

print("\n" + "="*50)
print("RÉSUMÉ — fichiers créés/modifiés:")
print("  data/avatars.json  — 12 avatars")
print("  js/avatar.js       — système avatar")
print("  js/save.js         — progression par joueur")
print("  js/hud.js          — HUD + badges + FX")
print("  css/main.css       — tout le CSS")
print()
print("PROCHAINE ÉTAPE:")
print("  Modifier index.html pour utiliser ces fichiers")
print("  Supprimer le CSS inline et les blocs JS migrés")
print("="*50)
