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
              <img src="assets/images/avatars/${child.avatar_id}.png"
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

  // Remplir les avatars disponibles
  const pickEl = overlay.querySelector('#cs-avatar-pick');
  if (pickEl && typeof AVATARS !== 'undefined') {
    let selectedAvatarId = AVATARS[0].id;
    pickEl.innerHTML = AVATARS.map(av => `
      <div class="cs-av-opt ${av.id === selectedAvatarId ? 'selected' : ''}"
           data-id="${av.id}"
           onclick="selectAvatarOpt('${av.id}')">
        <img src="${av.img}" onerror="this.style.display='none'" alt="${av.name}">
        <span>${av.name}</span>
      </div>
    `).join('');
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

let _selectedAvatar = 'luffy';
function selectAvatarOpt(id) {
  _selectedAvatar = id;
  document.querySelectorAll('.cs-av-opt').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === id);
  });
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

  const result = await dbCreateChild(name, _selectedAvatar);

  if (result.ok) {
    await selectChild(result.child.id, result.child);
  } else {
    btn.textContent = '🏴‍☠️ CRÉER CE PIRATE !';
    btn.disabled = false;
    showToast('❌ ' + (result.error || 'Erreur lors de la création'));
  }
}