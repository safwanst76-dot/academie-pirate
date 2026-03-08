// ═══════════════════════════════════════
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
