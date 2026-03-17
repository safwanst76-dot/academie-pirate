// ═══════════════════════════════════════════════════════════════
// AUTH-FLOW.JS — Académie Pirate
// Remplace la logique auth éparpillée dans supabase.js + parent.js
// 
// FLUX COMPLET :
// Magic Link → handleSignedIn → 
//   Nouveau parent  → Onboarding (prénom/nom) → Créer enfant + PIN → Dashboard
//   Parent existant → Dashboard parent
//   Enfant          → Sélection profil OU connexion PIN directe
//
// CONNEXION ENFANT : PIN 6 chiffres
// RECONNEXION PARENT : magic link (email déjà utilisé = lien de connexion)
// ═══════════════════════════════════════════════════════════════

'use strict';

// ══════════════════════════════════════════
// ÉTAT AUTH GLOBAL
// ══════════════════════════════════════════
var _authUser         = null;   // Supabase user object
var _parentProfile    = null;   // profiles_parents row
var _activeChild      = null;   // child_profiles row (enfant connecté)

// ══════════════════════════════════════════
// HELPERS SUPABASE
// ══════════════════════════════════════════

async function _getParentProfile(userId) {
  try {
    var res = await sb.from('profiles_parents')
      .select('*').eq('id', userId).maybeSingle();
    return res.data || null;
  } catch(e) { return null; }
}

async function _getChildren(parentId) {
  try {
    var res = await sb.from('child_profiles')
      .select('*').eq('parent_id', parentId).order('created_at', {ascending: true});
    return res.data || [];
  } catch(e) { return []; }
}

async function _createParentProfile(userId, email, prenom, nom, phone) {
  var res = await sb.from('profiles_parents').upsert({
    id: userId, email, prenom, nom,
    phone: phone || null,
    created_at: new Date().toISOString()
  }, { onConflict: 'id' }).select().maybeSingle();
  return res.data;
}

async function _createChildProfile(parentId, username, avatarId, pin) {
  // Hasher le PIN côté client (simple hash, pas de bcrypt car pas Node)
  var pinHash = pin ? _hashPin(pin) : null;
  var res = await sb.from('child_profiles').insert({
    parent_id: parentId,
    username: username,
    avatar_id: avatarId || 'luffy',
    pin_hash: pinHash,
    pin: pin,       // colonne plain pour compatibilité ancien code
    xp_total: 0,
    level: 1,
    created_at: new Date().toISOString()
  }).select().maybeSingle();
  return res.data;
}

function _hashPin(pin) {
  // Simple hash déterministe (pas de sel, suffisant pour PIN enfant)
  var h = 0;
  for (var i = 0; i < pin.length; i++) {
    h = ((h << 5) - h) + pin.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36) + pin.length;
}

// ══════════════════════════════════════════
// POINT D'ENTRÉE AUTH
// ══════════════════════════════════════════

async function afInit() {
  // Écouter les changements de session Supabase
  sb.auth.onAuthStateChange(async function(event, session) {
    if (event === 'SIGNED_IN' && session) {
      _authUser = session.user;
      await _handleSignedIn(session.user);
    } else if (event === 'SIGNED_OUT') {
      _authUser = null;
      _parentProfile = null;
      _activeChild = null;
      afShowLogin();
    }
  });

  // Vérifier session existante
  var sessionRes = await sb.auth.getSession();
  var session = sessionRes.data && sessionRes.data.session;

  if (session && session.user) {
    _authUser = session.user;
    await _handleSignedIn(session.user);
  } else {
    afShowLogin();
  }
}

async function _handleSignedIn(user) {
  // 1. Est-ce un parent existant ?
  var profile = await _getParentProfile(user.id);

  if (profile) {
    // Parent connu → dashboard
    _parentProfile = profile;
    await afShowParentDashboard();
    return;
  }

  // 2. Nouvel utilisateur → onboarding parent
  await afShowParentOnboarding(user);
}

// ══════════════════════════════════════════
// ÉCRAN LOGIN
// ══════════════════════════════════════════

function afShowLogin() {
  _hideAllScreens();
  document.body.classList.add('login-active');

  var loginScreen = document.getElementById('login-screen');
  if (loginScreen) loginScreen.classList.remove('gone');

  // Random GIF One Piece
  var gif = document.getElementById('loginGif');
  if (gif) {
    var gifs = [
      "https://media.giphy.com/media/SJXzadwbexJEAZ9S1B/giphy.gif",
      "https://media.giphy.com/media/9VnXVHOIJgwnfNTK7Q/giphy.gif",
      "https://media.giphy.com/media/2i4xbkUhHrOuY/giphy.gif",
    ];
    gif.src = gifs[Math.floor(Math.random() * gifs.length)];
  }
}

// ══════════════════════════════════════════
// ONBOARDING PARENT (1ère connexion)
// ══════════════════════════════════════════

async function afShowParentOnboarding(user) {
  _hideAllScreens();

  var screen = _getOrCreate('af-parent-onboard');
  screen.innerHTML = _tplParentOnboard(user.email);
  screen.style.cssText = AF_FULLSCREEN_STYLE;
  screen.style.display = 'flex';

  // Attacher handlers
  var form = screen.querySelector('#af-onboard-form');
  if (form) form.addEventListener('submit', function(e) {
    e.preventDefault();
    afSubmitParentOnboard(user);
  });
}

function _tplParentOnboard(email) {
  return `
  <div style="
    max-width:480px;width:100%;
    background:rgba(5,8,16,.85);
    border:2px solid rgba(255,215,0,.2);
    border-radius:24px;padding:32px 28px;
    display:flex;flex-direction:column;gap:20px;
    box-shadow:0 20px 60px rgba(0,0,0,.7);
    backdrop-filter:blur(12px);
  ">
    <div style="text-align:center">
      <div style="font-size:3rem;margin-bottom:8px">⚓</div>
      <div style="font-family:'Bangers',cursive;font-size:2rem;color:#ffd700;letter-spacing:4px">
        BIENVENUE, CAPITAINE !
      </div>
      <div style="font-family:'Nunito',sans-serif;font-size:.85rem;color:rgba(255,255,255,.45);
           letter-spacing:2px;text-transform:uppercase;margin-top:4px">
        Créez votre profil parent
      </div>
    </div>

    <form id="af-onboard-form" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="display:flex;flex-direction:column;gap:5px">
          <label style="${AF_LABEL_STYLE}">👤 Prénom *</label>
          <input id="af-prenom" type="text" placeholder="Prénom" required
            style="${AF_INPUT_STYLE}" autocomplete="given-name">
        </div>
        <div style="display:flex;flex-direction:column;gap:5px">
          <label style="${AF_LABEL_STYLE}">👤 Nom *</label>
          <input id="af-nom" type="text" placeholder="Nom" required
            style="${AF_INPUT_STYLE}" autocomplete="family-name">
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:5px">
        <label style="${AF_LABEL_STYLE}">📧 Email</label>
        <input type="email" value="${email}" readonly
          style="${AF_INPUT_STYLE}opacity:.5;cursor:not-allowed">
      </div>

      <div style="display:flex;flex-direction:column;gap:5px">
        <label style="${AF_LABEL_STYLE}">📱 Téléphone <span style="color:rgba(255,255,255,.3)">(optionnel)</span></label>
        <input id="af-phone" type="tel" placeholder="+33 6 00 00 00 00"
          style="${AF_INPUT_STYLE}" autocomplete="tel">
      </div>

      <div id="af-onboard-error" style="
        display:none;background:rgba(230,57,70,.12);
        border:1px solid rgba(230,57,70,.4);border-radius:10px;
        padding:10px 14px;font-family:'Nunito',sans-serif;
        font-size:.82rem;font-weight:700;color:#fca5a5;
      "></div>

      <button type="submit" style="${AF_BTN_GOLD_STYLE}margin-top:6px">
        ⚓ CRÉER MON COMPTE CAPITAINE →
      </button>
    </form>
  </div>`;
}

async function afSubmitParentOnboard(user) {
  var prenom = (document.getElementById('af-prenom') || {}).value.trim();
  var nom    = (document.getElementById('af-nom')    || {}).value.trim();
  var phone  = (document.getElementById('af-phone')  || {}).value.trim();
  var errEl  = document.getElementById('af-onboard-error');

  if (!prenom || !nom) {
    if (errEl) { errEl.textContent = '⚠️ Prénom et nom obligatoires !'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';

  var btn = document.querySelector('#af-parent-onboard button[type="submit"]');
  if (btn) { btn.textContent = '⏳ Enregistrement…'; btn.disabled = true; }

  try {
    var profile = await _createParentProfile(user.id, user.email, prenom, nom, phone);
    if (!profile) throw new Error('Erreur création profil');
    _parentProfile = profile;
    // Enchaîner vers création premier enfant
    await afShowCreateChild(true);
  } catch(e) {
    if (errEl) { errEl.textContent = '❌ ' + e.message; errEl.style.display = 'block'; }
    if (btn) { btn.textContent = '⚓ CRÉER MON COMPTE CAPITAINE →'; btn.disabled = false; }
  }
}

// ══════════════════════════════════════════
// CRÉATION ENFANT + PIN
// ══════════════════════════════════════════

async function afShowCreateChild(isFirstChild) {
  _hideAllScreens();

  var screen = _getOrCreate('af-create-child');
  screen.innerHTML = _tplCreateChild(isFirstChild);
  screen.style.cssText = AF_FULLSCREEN_STYLE;
  screen.style.display = 'flex';

  // PIN preview
  _bindPinInputs('af-pin');

  var form = screen.querySelector('#af-child-form');
  if (form) form.addEventListener('submit', function(e) {
    e.preventDefault();
    afSubmitCreateChild(isFirstChild);
  });
}

function _tplCreateChild(isFirstChild) {
  // Avatar options
  var avatarOpts = [
    {id:'luffy',  emoji:'🍖', name:'Luffy'},
    {id:'nami',   emoji:'🗺️', name:'Nami'},
    {id:'zoro',   emoji:'⚔️', name:'Zoro'},
    {id:'robin',  emoji:'📚', name:'Robin'},
    {id:'usopp',  emoji:'🎯', name:'Usopp'},
    {id:'sanji',  emoji:'🍳', name:'Sanji'},
    {id:'chopper',emoji:'🦌', name:'Chopper'},
    {id:'brook',  emoji:'💀', name:'Brook'},
  ];

  var avHtml = avatarOpts.map(function(av, i) {
    return `<div class="af-av-opt ${i===0?'selected':''}" data-id="${av.id}"
      onclick="afSelectChildAvatar(this)"
      style="
        display:flex;flex-direction:column;align-items:center;gap:4px;
        padding:8px 6px;border-radius:12px;cursor:pointer;
        border:2px solid ${i===0?'#ffd700':'rgba(255,255,255,.1)'};
        background:${i===0?'rgba(255,215,0,.1)':'rgba(255,255,255,.04)'};
        transition:all .2s;min-width:56px;
      ">
      <span style="font-size:1.6rem">${av.emoji}</span>
      <span style="font-family:'Bangers',cursive;font-size:.65rem;letter-spacing:1px;
           color:${i===0?'#ffd700':'rgba(255,255,255,.5)'}">${av.name}</span>
    </div>`;
  }).join('');

  return `
  <div style="
    max-width:480px;width:100%;max-height:90vh;overflow-y:auto;
    background:rgba(5,8,16,.9);
    border:2px solid rgba(255,215,0,.2);
    border-radius:24px;padding:28px 24px;
    display:flex;flex-direction:column;gap:18px;
    box-shadow:0 20px 60px rgba(0,0,0,.7);
    scrollbar-width:none;
  ">
    <div style="text-align:center">
      <div style="font-size:2.5rem;margin-bottom:6px">🏴‍☠️</div>
      <div style="font-family:'Bangers',cursive;font-size:1.8rem;color:#e63946;letter-spacing:3px">
        ${isFirstChild ? 'PREMIER AVENTURIER !' : 'NOUVEL AVENTURIER !'}
      </div>
      <div style="font-family:'Nunito',sans-serif;font-size:.8rem;color:rgba(255,255,255,.4);margin-top:4px">
        Créez le profil de votre enfant et son code PIN secret
      </div>
    </div>

    <form id="af-child-form" style="display:flex;flex-direction:column;gap:14px">

      <div style="display:flex;flex-direction:column;gap:5px">
        <label style="${AF_LABEL_STYLE}">🧒 Prénom de l'enfant *</label>
        <input id="af-child-name" type="text" placeholder="Ex: Lucas, Emma…"
          required style="${AF_INPUT_STYLE}font-size:1.1rem;font-family:'Bangers',cursive;letter-spacing:2px"
          autocomplete="off" maxlength="20">
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        <label style="${AF_LABEL_STYLE}">🎭 Personnage préféré</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${avHtml}</div>
        <input type="hidden" id="af-child-avatar" value="luffy">
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        <label style="${AF_LABEL_STYLE}">🔐 Code PIN secret (6 chiffres) *</label>
        <div style="font-family:'Nunito',sans-serif;font-size:.75rem;color:rgba(255,255,255,.35);line-height:1.5">
          Ce code permet à votre enfant de se connecter directement, sans email.
          Notez-le et partagez-le seulement avec votre enfant !
        </div>
        <div id="af-pin" style="display:flex;gap:8px;justify-content:center">
          ${[0,1,2,3,4,5].map(function(i) {
            return `<input type="tel" maxlength="1" inputmode="numeric" pattern="[0-9]"
              id="af-pin-${i}" data-index="${i}"
              style="
                width:44px;height:56px;text-align:center;
                font-family:'Bangers',cursive;font-size:1.6rem;
                background:rgba(255,255,255,.07);
                border:2px solid rgba(255,255,255,.15);
                border-radius:10px;color:#fff;
                outline:none;caret-color:#ffd700;
              ">`;
          }).join('')}
        </div>
        <div style="display:flex;gap:8px;justify-content:center">
          ${[0,1,2,3,4,5].map(function(i) {
            return `<div style="width:44px;height:6px;border-radius:3px;
              background:rgba(255,255,255,.1)" id="af-pindot-${i}"></div>`;
          }).join('')}
        </div>
      </div>

      <div id="af-child-error" style="
        display:none;background:rgba(230,57,70,.12);
        border:1px solid rgba(230,57,70,.4);border-radius:10px;
        padding:10px 14px;font-family:'Nunito',sans-serif;
        font-size:.82rem;font-weight:700;color:#fca5a5;
      "></div>

      <button type="submit" style="${AF_BTN_RED_STYLE}">
        🏴‍☠️ CRÉER CET AVENTURIER !
      </button>

      ${!isFirstChild ? `
      <button type="button" onclick="afShowParentDashboard()"
        style="${AF_BTN_OUTLINE_STYLE}">
        ← Annuler
      </button>` : ''}
    </form>
  </div>`;
}

function afSelectChildAvatar(el) {
  document.querySelectorAll('.af-av-opt').forEach(function(opt) {
    opt.style.borderColor = 'rgba(255,255,255,.1)';
    opt.style.background  = 'rgba(255,255,255,.04)';
    opt.querySelector('span:last-child').style.color = 'rgba(255,255,255,.5)';
  });
  el.style.borderColor = '#ffd700';
  el.style.background  = 'rgba(255,215,0,.1)';
  el.querySelector('span:last-child').style.color = '#ffd700';
  var inp = document.getElementById('af-child-avatar');
  if (inp) inp.value = el.dataset.id;
}

function _bindPinInputs(containerId) {
  for (var i = 0; i < 6; i++) {
    (function(idx) {
      var inp = document.getElementById('af-pin-' + idx);
      if (!inp) return;
      inp.addEventListener('input', function(e) {
        var val = e.target.value.replace(/\D/g,'');
        e.target.value = val.slice(-1);
        // Update dot
        var dot = document.getElementById('af-pindot-' + idx);
        if (dot) dot.style.background = val ? '#ffd700' : 'rgba(255,255,255,.1)';
        // Move focus
        if (val && idx < 5) {
          var next = document.getElementById('af-pin-' + (idx+1));
          if (next) next.focus();
        }
      });
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) {
          var prev = document.getElementById('af-pin-' + (idx-1));
          if (prev) { prev.value = ''; prev.focus(); }
        }
      });
    })(i);
  }
}

function _getPinValue() {
  var pin = '';
  for (var i = 0; i < 6; i++) {
    var inp = document.getElementById('af-pin-' + i);
    pin += inp ? (inp.value || '') : '';
  }
  return pin;
}

async function afSubmitCreateChild(isFirstChild) {
  var name   = (document.getElementById('af-child-name')   || {}).value.trim();
  var avatar = (document.getElementById('af-child-avatar') || {}).value || 'luffy';
  var pin    = _getPinValue();
  var errEl  = document.getElementById('af-child-error');

  if (!name) {
    if (errEl) { errEl.textContent = '⚠️ Entre le prénom de l\'enfant !'; errEl.style.display = 'block'; }
    return;
  }
  if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    if (errEl) { errEl.textContent = '⚠️ Le code PIN doit contenir exactement 6 chiffres !'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';

  var btn = document.querySelector('#af-child-form button[type="submit"]');
  if (btn) { btn.textContent = '⏳ Création…'; btn.disabled = true; }

  try {
    var parentId = _authUser.id;
    var child = await _createChildProfile(parentId, name, avatar, pin);
    if (!child) throw new Error('Erreur création profil enfant');

    if (typeof showToast === 'function') showToast('🏴‍☠️ ' + name + ' est prêt(e) à jouer !');
    await afShowParentDashboard();
  } catch(e) {
    if (errEl) { errEl.textContent = '❌ ' + e.message; errEl.style.display = 'block'; }
    if (btn) { btn.textContent = '🏴‍☠️ CRÉER CET AVENTURIER !'; btn.disabled = false; }
  }
}

// ══════════════════════════════════════════
// DASHBOARD PARENT
// ══════════════════════════════════════════

async function afShowParentDashboard() {
  _hideAllScreens();
  document.body.classList.remove('login-active');

  // Afficher la section parent du HTML existant
  var sec = document.getElementById('parent-sec');
  if (sec) sec.style.display = 'block';

  var container = document.getElementById('parent-content');
  if (!container) return;

  container.innerHTML = '<div style="text-align:center;padding:40px;font-family:Nunito,sans-serif;color:rgba(255,255,255,.4)">⏳ Chargement…</div>';

  // Mettre à jour le header
  _updateParentHeader();

  // Charger les enfants
  var children = await _getChildren(_authUser.id);

  // Rendre le dashboard
  container.innerHTML = _tplParentDashboard(children);

  // Attacher listeners (pas d'onclick inline avec données)
  _bindDashboardEvents(children);
}

function _updateParentHeader() {
  if (!_parentProfile) return;
  var parentBtn  = document.getElementById('headerParentBtn');
  var parentName = document.getElementById('headerParentName');
  if (parentBtn) parentBtn.style.display = 'flex';
  if (parentName) parentName.textContent = '👤 ' + (_parentProfile.prenom || _parentProfile.email.split('@')[0]);
}

function _tplParentDashboard(children) {
  var prenom = _parentProfile ? _parentProfile.prenom : '';
  var email  = _parentProfile ? _parentProfile.email  : (_authUser ? _authUser.email : '');

  var childrenHtml = '';
  if (!children.length) {
    childrenHtml = `
      <div class="pd-empty">
        Aucun aventurier encore créé.
        <span>Cliquez ci-dessous pour créer le profil de votre enfant.</span>
      </div>`;
  } else {
    childrenHtml = children.map(function(child) {
      return `
      <div class="pd-child-card" data-child-id="${child.id}">
        <div class="pd-child-avatar">
          <img src="assets/images/avatars/${child.avatar_id || 'luffy'}.png"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
            alt="${child.username}">
          <div class="pd-child-avatar-fallback">🏴‍☠️</div>
        </div>
        <div class="pd-child-info">
          <div class="pd-child-name">${child.username}</div>
          <div class="pd-child-stats">⭐ ${child.xp_total||0} XP · Niveau ${child.level||1}</div>
        </div>
        <div class="pd-child-arrow">→ Voir résultats</div>
      </div>`;
    }).join('');
  }

  return `
  <div class="pd-section">
    <div class="pd-section-title">⚓ PROFIL CAPITAINE</div>
    <div style="font-family:'Nunito',sans-serif;font-size:.9rem;font-weight:700;color:rgba(255,255,255,.75)">
      ${prenom ? `👤 ${prenom}` : ''} &nbsp; ✉️ ${email}
    </div>
  </div>

  <div class="pd-section">
    <div class="pd-section-title">👦 MES AVENTURIERS</div>
    ${childrenHtml}
    <button class="pd-btn-add" onclick="afShowCreateChild(false)">
      ＋ Ajouter un aventurier
    </button>
  </div>

  <div class="pd-section">
    <button class="pd-btn-play" id="af-play-btn">
      🎮 JOUER MAINTENANT
    </button>
    <button class="pd-btn-logout" onclick="afSignOut()">
      ← Se déconnecter
    </button>
  </div>`;
}

function _bindDashboardEvents(children) {
  // Cartes enfants → résultats
  document.querySelectorAll('.pd-child-card[data-child-id]').forEach(function(card) {
    card.addEventListener('click', function() {
      var id = card.getAttribute('data-child-id');
      var child = children.find(function(c) { return c.id === id; });
      if (child && typeof showChildResults === 'function') showChildResults(id, child);
    });
  });

  // Bouton jouer
  var playBtn = document.getElementById('af-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', function() {
      if (!children.length) {
        afShowCreateChild(true);
      } else if (children.length === 1) {
        afLaunchChild(children[0]);
      } else {
        afShowChildPicker(children);
      }
    });
  }
}

// ══════════════════════════════════════════
// SÉLECTEUR D'ENFANT (quand plusieurs enfants)
// ══════════════════════════════════════════

function afShowChildPicker(children) {
  _hideAllScreens();

  var screen = _getOrCreate('af-child-picker');
  var cards = children.map(function(child) {
    return `
    <div class="cs-profile" data-child-id="${child.id}"
      style="cursor:pointer">
      <div class="cs-avatar">
        <img src="assets/images/avatars/${child.avatar_id||'luffy'}.png"
          onerror="this.style.display='none'" alt="${child.username}">
      </div>
      <div class="cs-name">${child.username}</div>
      <div class="cs-xp">⭐ ${child.xp_total||0} XP</div>
    </div>`;
  }).join('');

  screen.innerHTML = `
  <div class="cs-screen">
    <div class="cs-title">🏴‍☠️ QUI JOUE ?</div>
    <div class="cs-subtitle">Sélectionne ton profil</div>
    <div class="cs-profiles">${cards}</div>
    <button class="cs-logout" onclick="afShowParentDashboard()">← Retour</button>
  </div>`;

  // Positionner comme overlay
  screen.style.cssText = `
    position:fixed;left:0;right:0;bottom:0;top:0;z-index:50;
    background:rgba(0,0,0,.85);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;
    padding:24px;overflow-y:auto;
  `;

  // Bind clicks
  screen.querySelectorAll('[data-child-id]').forEach(function(card) {
    card.addEventListener('click', function() {
      var id = card.getAttribute('data-child-id');
      var child = children.find(function(c) { return c.id === id; });
      if (child) {
        // Pour l'écran de sélection, on demande le PIN
        afShowPinEntry(child, function() {
          screen.style.display = 'none';
          afLaunchChild(child);
        });
      }
    });
  });
}

// ══════════════════════════════════════════
// SAISIE PIN ENFANT
// ══════════════════════════════════════════

function afShowPinEntry(child, onSuccess) {
  var screen = _getOrCreate('af-pin-entry');
  screen.innerHTML = `
  <div style="
    max-width:380px;width:100%;
    background:rgba(5,8,16,.92);
    border:2px solid rgba(230,57,70,.3);
    border-radius:24px;padding:32px 24px;
    display:flex;flex-direction:column;gap:20px;align-items:center;
    box-shadow:0 20px 60px rgba(0,0,0,.7);
  ">
    <img src="assets/images/avatars/${child.avatar_id||'luffy'}.png"
      style="width:80px;height:80px;border-radius:50%;border:3px solid #e63946;object-fit:cover"
      onerror="this.style.display='none'">
    <div style="font-family:'Bangers',cursive;font-size:1.8rem;color:#ffd700;letter-spacing:3px;text-align:center">
      BONJOUR ${child.username.toUpperCase()} !
    </div>
    <div style="font-family:'Nunito',sans-serif;font-size:.85rem;color:rgba(255,255,255,.45);text-align:center">
      Entre ton code PIN secret à 6 chiffres
    </div>
    <div id="af-pin-entry-inputs" style="display:flex;gap:8px">
      ${[0,1,2,3,4,5].map(function(i) {
        return `<input type="tel" maxlength="1" inputmode="numeric" pattern="[0-9]"
          id="af-entry-pin-${i}" data-index="${i}"
          style="
            width:44px;height:56px;text-align:center;
            font-family:'Bangers',cursive;font-size:2rem;
            background:rgba(255,255,255,.07);
            border:2px solid rgba(255,255,255,.15);
            border-radius:10px;color:#fff;outline:none;
          ">`;
      }).join('')}
    </div>
    <div id="af-pin-entry-error" style="
      display:none;font-family:'Nunito',sans-serif;font-size:.8rem;
      font-weight:800;color:#e63946;text-align:center;
    "></div>
    <div style="display:flex;gap:10px;width:100%">
      <button onclick="afHidePinEntry()" style="
        flex:1;font-family:'Bangers',cursive;font-size:1rem;letter-spacing:2px;
        padding:12px;border-radius:12px;border:2px solid rgba(255,255,255,.15);
        background:transparent;color:rgba(255,255,255,.4);cursor:pointer;
      ">← Retour</button>
      <button onclick="afCheckPin('${child.id}', '${_hashPin(child.pin || '000000')}')"
        style="${AF_BTN_RED_STYLE}flex:1;padding:12px">
        ✓ ENTRER
      </button>
    </div>
  </div>`;

  screen.style.cssText = `
    position:fixed;inset:0;z-index:200;
    background:rgba(0,0,0,.9);
    display:flex;align-items:center;justify-content:center;
    padding:20px;
  `;
  screen._onSuccess = onSuccess;
  screen._child = child;

  // Bind PIN inputs
  for (var i = 0; i < 6; i++) {
    (function(idx) {
      var inp = document.getElementById('af-entry-pin-' + idx);
      if (!inp) return;
      inp.addEventListener('input', function(e) {
        var val = e.target.value.replace(/\D/g,'');
        e.target.value = val.slice(-1);
        if (val && idx < 5) {
          var next = document.getElementById('af-entry-pin-' + (idx+1));
          if (next) next.focus();
        }
        // Auto-validate when all 6 filled
        var full = '';
        for (var j=0;j<6;j++) {
          var pinInp = document.getElementById('af-entry-pin-'+j);
          full += pinInp ? (pinInp.value||'') : '';
        }
        if (full.length === 6) setTimeout(function() {
          afCheckPin(child.id, child.pin);
        }, 100);
      });
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) {
          var prev = document.getElementById('af-entry-pin-' + (idx-1));
          if (prev) { prev.value = ''; prev.focus(); }
        }
      });
    })(i);
  }
  // Focus premier champ
  var first = document.getElementById('af-entry-pin-0');
  if (first) setTimeout(function() { first.focus(); }, 100);
}

async function afCheckPin(childId, expectedPin) {
  var entered = '';
  for (var i = 0; i < 6; i++) {
    var inp = document.getElementById('af-entry-pin-' + i);
    entered += inp ? (inp.value||'') : '';
  }
  if (entered.length !== 6) return;

  var errEl = document.getElementById('af-pin-entry-error');

  // Vérifier le PIN
  var res = await sb.from('child_profiles').select('id,pin,username')
    .eq('id', childId).maybeSingle();
  var childData = res.data;

  if (!childData || childData.pin !== entered) {
    if (errEl) {
      errEl.textContent = '❌ Code PIN incorrect. Réessaie !';
      errEl.style.display = 'block';
      // Shake les inputs
      var wrap = document.getElementById('af-pin-entry-inputs');
      if (wrap) {
        wrap.style.animation = 'none';
        void wrap.offsetWidth;
        wrap.style.animation = 'pinShake .4s ease';
      }
      // Reset
      for (var i = 0; i < 6; i++) {
        var inp = document.getElementById('af-entry-pin-' + i);
        if (inp) inp.value = '';
      }
      var first = document.getElementById('af-entry-pin-0');
      if (first) first.focus();
    }
    return;
  }

  // PIN correct → charger l'enfant
  afHidePinEntry();
  var screen = document.getElementById('af-pin-entry');
  if (screen && screen._onSuccess) screen._onSuccess();
}

function afHidePinEntry() {
  var screen = document.getElementById('af-pin-entry');
  if (screen) screen.style.display = 'none';
}

// ══════════════════════════════════════════
// LANCEMENT JEU ENFANT
// ══════════════════════════════════════════

function afLaunchChild(child) {
  _activeChild = child;
  if (typeof dbSetActiveChild === 'function') dbSetActiveChild(child);

  // Mettre à jour l'avatar du header
  if (typeof playerData !== 'undefined') {
    playerData = {
      name: child.username || 'Pirate',
      avatarId: child.avatar_id || 'luffy',
      avatarImg: 'assets/images/avatars/' + (child.avatar_id||'luffy') + '.png',
      avatarColor: '#e63946', avatarQuote: '', charName: child.avatar_id || 'Luffy'
    };
  }
  if (typeof playerName !== 'undefined') playerName = child.username;
  if (typeof updateHeaderAvatar === 'function') updateHeaderAvatar();
  if (typeof loadProgress === 'function') loadProgress();

  if (typeof navigateTo === 'function') navigateTo('carte');
}

// ══════════════════════════════════════════
// CONNEXION ENFANT PAR PIN (écran standalone)
// Pour les enfants qui accèdent à l'URL directement
// ══════════════════════════════════════════

async function afShowChildLogin() {
  _hideAllScreens();
  document.body.classList.add('login-active');

  // Charger tous les enfants liés à ce parent (si parent connecté)
  var children = _authUser ? await _getChildren(_authUser.id) : [];

  if (!children.length) {
    afShowLogin();
    return;
  }

  if (children.length === 1) {
    afShowPinEntry(children[0], function() { afLaunchChild(children[0]); });
    return;
  }

  afShowChildPicker(children);
}

// ══════════════════════════════════════════
// DÉCONNEXION
// ══════════════════════════════════════════

async function afSignOut() {
  await sb.auth.signOut();
  _authUser = null;
  _parentProfile = null;
  _activeChild = null;
  if (typeof showToast === 'function') showToast('👋 À bientôt !');
  location.reload();
}

// ══════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════

function _hideAllScreens() {
  // Appeler hideAll du router si disponible
  if (typeof hideAll === 'function') hideAll();
  // Cacher les screens auth-flow
  ['af-parent-onboard','af-create-child','af-child-picker','af-pin-entry']
    .forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  document.body.classList.remove('login-active');
}

function _getOrCreate(id) {
  var el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}

// Styles réutilisables
var AF_FULLSCREEN_STYLE = 'position:fixed;inset:0;z-index:3000;background:rgba(5,8,16,.95);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;overflow-y:auto;';
var AF_LABEL_STYLE = 'font-family:\'Nunito\',sans-serif;font-size:.72rem;font-weight:900;color:#ffd700;letter-spacing:2px;text-transform:uppercase;';
var AF_INPUT_STYLE = 'background:rgba(255,255,255,.07);border:2px solid rgba(255,215,0,.2);border-radius:12px;padding:13px 16px;color:#fff;font-family:\'Nunito\',sans-serif;font-size:.95rem;font-weight:700;outline:none;width:100%;box-sizing:border-box;transition:border-color .2s;';
var AF_BTN_GOLD_STYLE = 'font-family:\'Bangers\',cursive;font-size:1.2rem;letter-spacing:3px;padding:14px 24px;border-radius:14px;border:none;cursor:pointer;background:linear-gradient(135deg,#e63946,#f97316);color:#fff;text-shadow:2px 2px 0 rgba(0,0,0,.4);box-shadow:0 4px 20px rgba(230,57,70,.4);transition:all .2s;width:100%;';
var AF_BTN_RED_STYLE = 'font-family:\'Bangers\',cursive;font-size:1.15rem;letter-spacing:2px;padding:13px 24px;border-radius:12px;border:none;cursor:pointer;background:linear-gradient(135deg,#e63946,#dc2626);color:#fff;box-shadow:0 4px 16px rgba(230,57,70,.4);transition:all .2s;width:100%;';
var AF_BTN_OUTLINE_STYLE = 'font-family:\'Bangers\',cursive;font-size:1rem;letter-spacing:2px;padding:11px 20px;border-radius:12px;border:2px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.5);cursor:pointer;transition:all .2s;width:100%;';

// CSS animation PIN shake
(function() {
  var style = document.createElement('style');
  style.textContent = `
    @keyframes pinShake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-8px)}
      40%{transform:translateX(8px)}
      60%{transform:translateX(-5px)}
      80%{transform:translateX(5px)}
    }
    #af-entry-pin-0:focus, #af-entry-pin-1:focus, #af-entry-pin-2:focus,
    #af-entry-pin-3:focus, #af-entry-pin-4:focus, #af-entry-pin-5:focus {
      border-color: #ffd700 !important;
      box-shadow: 0 0 0 3px rgba(255,215,0,.15);
    }
    #af-pin-0:focus, #af-pin-1:focus, #af-pin-2:focus,
    #af-pin-3:focus, #af-pin-4:focus, #af-pin-5:focus {
      border-color: #ffd700 !important;
    }
  `;
  document.head.appendChild(style);
})();

// Exposer globalement
window.afInit              = afInit;
window.afShowLogin         = afShowLogin;
window.afShowParentDashboard = afShowParentDashboard;
window.afShowCreateChild   = afShowCreateChild;
window.afShowChildLogin    = afShowChildLogin;
window.afSelectChildAvatar = afSelectChildAvatar;
window.afSubmitParentOnboard = afSubmitParentOnboard;
window.afSubmitCreateChild = afSubmitCreateChild;
window.afCheckPin          = afCheckPin;
window.afHidePinEntry      = afHidePinEntry;
window.afSignOut           = afSignOut;

console.info('🏴‍☠️ auth-flow.js chargé — Parent onboarding + PIN enfant');