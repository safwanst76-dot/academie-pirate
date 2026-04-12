// ═══════════════════════════════════════════════════════════
// child-select.js — Sélection profil enfant
// Appelé après login parent, avant la carte
// ═══════════════════════════════════════════════════════════

async function showChildSelect() {
  const children = await dbGetChildren();

  let overlay = document.getElementById('child-select-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'child-select-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="cs-screen">
      <div class="cs-title">🏴‍☠️ QUI JOUE ?</div>
      <div class="cs-subtitle">Choisis ton profil de pirate !</div>

      <div class="cs-profiles" id="cs-profiles">
        ${children.map(child => `
          <div class="cs-profile" onclick="selectChild('${child.id}', ${JSON.stringify(child).replace(/"/g, '&quot;')})">
            <div class="cs-avatar">
              <img src="${_resolveAvatarImg(child.avatar_id)}"
                   onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
                   alt="${child.username}">
              <div class="cs-avatar-fallback" style="display:none">🏴‍☠️</div>
            </div>
            <div class="cs-name">${child.username}</div>
            <div class="cs-xp">⭐ ${child.xp_total} XP · Niv.${child.level}</div>
          </div>
        `).join('')}

        <div class="cs-profile cs-add" onclick="showAddChild()">
          <div class="cs-avatar cs-avatar-add">＋</div>
          <div class="cs-name">Nouveau pirate</div>
        </div>
      </div>

      <div id="cs-add-form" style="display:none" class="cs-form">
        <div class="cs-form-title">✍️ Créer un profil</div>
        <input id="cs-input-name" class="cs-input" type="text"
               placeholder="Pseudo du pirate..." maxlength="20" autocomplete="off">
        <div class="cs-avatar-pick" id="cs-avatar-pick"></div>
        <button class="cs-btn-create" onclick="createChildProfile()">
          🏴‍☠️ CRÉER CE PIRATE !
        </button>
        <button class="cs-btn-cancel" onclick="hideAddChild()">Annuler</button>
      </div>

      <button class="cs-logout" onclick="handleLogout()">← Changer de compte</button>
    </div>
  `;

  // ── Avatar Picker — nouveau composant multi-univers (ARCHI-01) ──
  const pickEl = overlay.querySelector('#cs-avatar-pick');
  if (pickEl && typeof AvatarPicker !== 'undefined') {
    AvatarPicker.render(pickEl, {
      selected: _selectedAvatar || 'luffy',
      onSelect: function(avatar) {
        _selectedAvatar = avatar.id;
      }
    });
  }

  overlay.classList.add('visible');
  if (typeof positionLoginScreen === 'function') positionLoginScreen();
}

function hideChildSelect() {
  const el = document.getElementById('child-select-overlay');
  if (el) el.classList.remove('visible');
}

async function selectChild(childId, childObj) {
  const child = typeof childObj === 'string' ? JSON.parse(childObj) : childObj;
  dbSetActiveChild(child);
  // Sync AP.state (ARCHI-01)
  if (window.AP && window.AP.state) {
    window.AP.state.initFromChild(child);
  }
  // Émettre événement (ARCHI-01)
  if (window.AP && window.AP.events) {
    window.AP.events.emit('child:selected', child);
  }
  hideChildSelect();

  // Migrer localStorage si première fois
  const migrated = sessionStorage.getItem('migrated_' + childId);
  if (!migrated) {
    await dbMigrateLocalStorage(childId);
    sessionStorage.setItem('migrated_' + childId, '1');
  }

  // ── Charger la progression de CET enfant depuis la DB ──
  if (typeof loadProgress === 'function') await loadProgress();

  navigateTo('carte');
}

function showAddChild() {
  document.getElementById('cs-add-form').style.display = 'flex';
  document.getElementById('cs-profiles').style.display = 'none';
  document.getElementById('cs-input-name').focus();
}

function hideAddChild() {
  document.getElementById('cs-add-form').style.display = 'none';
  document.getElementById('cs-profiles').style.display = 'grid';
}

var _selectedAvatar = 'luffy';
// selectAvatarOpt conservé pour rétro-compat (appelé par onclick inline si besoin)
function selectAvatarOpt(id) {
  _selectedAvatar = id;
  var pickEl = document.getElementById('cs-avatar-pick');
  if (pickEl && typeof AvatarPicker !== 'undefined') {
    AvatarPicker.setSelected(pickEl, id);
  }
}

// Résoudre l'URL d'un avatar par son ID (supporte tous les univers)
function _resolveAvatarImg(avatarId) {
  if (typeof AVATARS !== 'undefined' && Array.isArray(AVATARS)) {
    var found = AVATARS.find(function(av) { return av.id === avatarId; });
    if (found) return found.img;
  }
  return 'assets/images/avatars/' + (avatarId || 'luffy') + '.jpg';
}

async function createChildProfile() {
  const nameEl = document.getElementById('cs-input-name');
  const name = nameEl?.value?.trim();
  if (!name || name.length < 2) {
    nameEl?.classList.add('shake');
    setTimeout(() => nameEl?.classList.remove('shake'), 500);
    return;
  }

  const btn = document.querySelector('.cs-btn-create');
  btn.textContent = '⏳ Création...';
  btn.disabled = true;

  // Récupérer l'avatar du picker si disponible
  var pickEl = document.getElementById('cs-avatar-pick');
  if (pickEl && typeof AvatarPicker !== 'undefined') {
    var pickedAv = AvatarPicker.getSelected(pickEl);
    if (pickedAv) _selectedAvatar = pickedAv.id;
  }
  const result = await dbCreateChild(name, _selectedAvatar);

  if (result.ok) {
    await selectChild(result.child.id, result.child);
  } else {
    btn.textContent = '🏴‍☠️ CRÉER CE PIRATE !';
    btn.disabled = false;
    showToast('❌ ' + (result.error || 'Erreur lors de la création'));
  }
}