// ═══════════════════════════════════════════════════════════════
// AUTH-FLOW.JS v2 — Académie Pirate
// ─ Point d'entrée : afInit() appelé par supabase-patch.js
// ─ Flux : Magic Link → _handleSignedIn →
//     Nouveau parent  → Onboarding (prénom/nom/tél) → Créer enfant + PIN → Dashboard
//     Parent existant → Dashboard parent
//     Sans profil     → afShowLogin()
// ─ Connexion enfant : PIN 6 chiffres
// ═══════════════════════════════════════════════════════════════

'use strict';

// ══════════════════════════════════════════
// ÉTAT AUTH GLOBAL
// ══════════════════════════════════════════
var _authUser      = null;  // Supabase user object
var _parentProfile = null;  // row de profiles_parents
var _activeChild   = null;  // row de child_profiles (enfant connecté)

// ══════════════════════════════════════════
// HELPERS SUPABASE
// ══════════════════════════════════════════

async function _getParentProfile(userId) {
  if (!userId) return null;
  try {
    var res = await sb.from('profiles_parents')
      .select('*').eq('id', userId).maybeSingle();
    return (res && res.data) ? res.data : null;
  } catch (e) { return null; }
}

async function _getChildren(parentId) {
  if (!parentId) return [];
  try {
    var res = await sb.from('child_profiles')
      .select('*').eq('parent_id', parentId)
      .order('created_at', { ascending: true });
    return (res && res.data) ? res.data : [];
  } catch (e) { return []; }
}

async function _createParentProfile(userId, email, prenom, nom, phone) {
  var res = await sb.from('profiles_parents').upsert({
    id:     userId,
    email:  email,
    prenom: prenom,
    nom:    nom,
    phone:  phone || null
  }, { onConflict: 'id' }).select().maybeSingle();
  return res.data || null;
}

async function _createChildProfile(parentId, username, avatarId, pin) {
  var pinHash = pin ? _hashPin(pin) : null;
  var res = await sb.from('child_profiles').insert({
    parent_id: parentId,
    username:  username,
    avatar_id: avatarId || 'luffy',
    pin:       pin,
    pin_hash:  pinHash,
    xp_total:  0,
    level:     1
  }).select().maybeSingle();
  return res.data || null;
}

function _hashPin(pin) {
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
  // Récupérer la session active en premier (cas magic link)
  var sessionRes = await sb.auth.getSession();
  var session    = sessionRes.data && sessionRes.data.session;

  if (session && session.user) {
    _authUser = session.user;

    // Écouter seulement SIGNED_OUT pour les prochains changements
    sb.auth.onAuthStateChange(function (event, sess) {
      if (event === 'SIGNED_OUT') {
        _authUser = null; _parentProfile = null; _activeChild = null;
        afShowLogin();
      }
    });

    await _handleSignedIn(session.user);
  } else {
    // Pas de session active → login + écouter le futur SIGNED_IN
    sb.auth.onAuthStateChange(async function (event, sess) {
      if (event === 'SIGNED_IN' && sess && sess.user) {
        _authUser = sess.user;
        await _handleSignedIn(sess.user);
      } else if (event === 'SIGNED_OUT') {
        _authUser = null; _parentProfile = null; _activeChild = null;
        afShowLogin();
      }
    });
    afShowLogin();
  }
}

async function _handleSignedIn(user) {
  if (!user || !user.id) { afShowLogin(); return; }

  // Masquer l'écran de chargement
  var loading = document.getElementById('loading');
  if (loading) loading.classList.add('gone');

  // Parent existant ?
  var profile = await _getParentProfile(user.id);
  if (profile) {
    _parentProfile = profile;
    // Naviguer vers le dashboard parent
    if (typeof navigateTo === 'function') navigateTo('parent');
    else await afShowParentDashboard();
    return;
  }

  // Nouveau parent → onboarding
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

  // GIF One Piece aléatoire
  var gif = document.getElementById('loginGif');
  if (gif) {
    var gifs = [
      'https://media.giphy.com/media/SJXzadwbexJEAZ9S1B/giphy.gif',
      'https://media.giphy.com/media/9VnXVHOIJgwnfNTK7Q/giphy.gif',
      'https://media.giphy.com/media/2i4xbkUhHrOuY/giphy.gif'
    ];
    gif.src = gifs[Math.floor(Math.random() * gifs.length)];
  }

  // Construire le fond héros (avatar strips) si manga-bg est vide
  _buildHeroBg();

  // Musique — activer et jouer une track aléatoire au premier clic
  _startLoginMusic();
}

function _buildHeroBg() {
  var bg = document.getElementById('manga-bg');
  if (!bg || bg.children.length > 0) return; // déjà rempli par Jikan ou précédemment

  var avatars = [
    'luffy','zoro','nami','usopp','sanji','chopper','robin','brook',
    'ace','shanks','law','hancock'
  ];
  // Créer 5 strips d'avatars animés comme manga-bg
  for (var s = 0; s < 5; s++) {
    var strip = document.createElement('div');
    strip.className = 'bg-strip';
    // Chaque strip contient une sélection aléatoire d'avatars, dupliquée pour scroll infini
    var imgs = [];
    for (var k = 0; k < 6; k++) {
      imgs.push(avatars[(s * 3 + k) % avatars.length]);
    }
    var all = imgs.concat(imgs); // doubler pour le scroll
    all.forEach(function(id) {
      var img = document.createElement('img');
      img.src = 'assets/images/avatars/' + id + '.png';
      img.alt = id;
      img.loading = 'lazy';
      strip.appendChild(img);
    });
    bg.appendChild(strip);
  }
}

function _startLoginMusic() {
  // Essayer de jouer de la musique — uniquement si l'audio engine est prêt
  try {
    if (typeof musicPlaying !== 'undefined') {
      musicPlaying = true;
    }
    var tracks = ['map', 'battle', 'victory'];
    var track  = tracks[Math.floor(Math.random() * tracks.length)];
    if (typeof playBGM === 'function') playBGM(track);
  } catch (e) {
    // autoplay bloqué — tenter au premier clic
    var _loginClick = function() {
      try {
        if (typeof musicPlaying !== 'undefined') musicPlaying = true;
        var tracks = ['map', 'battle', 'victory'];
        if (typeof playBGM === 'function') playBGM(tracks[Math.floor(Math.random() * tracks.length)]);
      } catch (_) {}
      document.removeEventListener('click', _loginClick);
    };
    document.addEventListener('click', _loginClick, { once: true });
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

  var form = screen.querySelector('#af-onboard-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      afSubmitParentOnboard(user);
    });
  }
}

function _tplParentOnboard(email) {
  return `
  <div style="
    max-width:480px;width:100%;
    background:rgba(5,8,16,.92);
    border:2px solid rgba(255,215,0,.25);
    border-radius:24px;
    padding:clamp(20px,5vw,32px) clamp(16px,4vw,28px);
    display:flex;flex-direction:column;gap:18px;
    box-shadow:0 20px 60px rgba(0,0,0,.7);
    backdrop-filter:blur(12px);
  ">
    <div style="text-align:center">
      <div style="font-size:2.8rem;margin-bottom:6px">⚓</div>
      <div style="font-family:'Bangers',cursive;font-size:clamp(1.6rem,6vw,2.2rem);
           color:#ffd700;letter-spacing:4px">
        BIENVENUE, CAPITAINE !
      </div>
      <div style="font-family:'Nunito',sans-serif;font-size:.82rem;
           color:rgba(255,255,255,.45);margin-top:4px;line-height:1.5">
        Créez votre compte parent pour suivre la progression de votre enfant
      </div>
    </div>

    <form id="af-onboard-form" style="display:flex;flex-direction:column;gap:14px">

      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <div style="flex:1;min-width:130px;display:flex;flex-direction:column;gap:6px">
          <label style="${AF_LABEL_STYLE}">👤 Prénom *</label>
          <input id="af-onboard-prenom" type="text" placeholder="ex: Marie"
            autocomplete="given-name" required
            style="${AF_INPUT_STYLE}">
        </div>
        <div style="flex:1;min-width:130px;display:flex;flex-direction:column;gap:6px">
          <label style="${AF_LABEL_STYLE}">👤 Nom *</label>
          <input id="af-onboard-nom" type="text" placeholder="ex: Dupont"
            autocomplete="family-name" required
            style="${AF_INPUT_STYLE}">
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:6px">
        <label style="${AF_LABEL_STYLE}">📱 Téléphone
          <span style="color:rgba(255,255,255,.3);font-weight:400">(optionnel)</span>
        </label>
        <input id="af-onboard-phone" type="tel" placeholder="+33 6 12 34 56 78"
          autocomplete="tel"
          style="${AF_INPUT_STYLE}">
      </div>

      <div style="display:flex;flex-direction:column;gap:6px">
        <label style="${AF_LABEL_STYLE}">📧 Email</label>
        <input type="email" value="${email}" readonly
          style="${AF_INPUT_STYLE}opacity:.5;cursor:not-allowed;">
      </div>

      <div id="af-onboard-error" style="
        display:none;background:rgba(230,57,70,.12);
        border:1px solid rgba(230,57,70,.4);border-radius:10px;
        padding:10px 14px;font-family:'Nunito',sans-serif;
        font-size:.82rem;font-weight:700;color:#fca5a5;
      "></div>

      <button type="submit" style="${AF_BTN_GOLD_STYLE}margin-top:4px">
        ⚓ CRÉER MON COMPTE CAPITAINE →
      </button>
    </form>
  </div>`;
}

async function afSubmitParentOnboard(user) {
  if (!user || !user.id) return;

  var prenom = (document.getElementById('af-onboard-prenom') || {}).value || '';
  var nom    = (document.getElementById('af-onboard-nom')    || {}).value || '';
  var phone  = (document.getElementById('af-onboard-phone')  || {}).value || '';
  var errEl  = document.getElementById('af-onboard-error');
  var btn    = document.querySelector('#af-onboard-form button[type="submit"]');

  prenom = prenom.trim(); nom = nom.trim(); phone = phone.trim();

  if (!prenom || !nom) {
    if (errEl) { errEl.textContent = '⚠️ Prénom et nom obligatoires.'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';
  if (btn) { btn.textContent = '⏳ Enregistrement…'; btn.disabled = true; }

  try {
    var profile = await _createParentProfile(user.id, user.email, prenom, nom, phone);
    if (!profile) throw new Error('Impossible de créer le profil. Réessayez.');
    _parentProfile = profile;
    if (typeof showToast === 'function') showToast('⚓ Bienvenue Capitaine ' + prenom + ' !');
    // Première connexion → créer le profil enfant
    await afShowCreateChild(true);
  } catch (e) {
    if (errEl) { errEl.textContent = '❌ ' + e.message; errEl.style.display = 'block'; }
    if (btn)   { btn.textContent = '⚓ CRÉER MON COMPTE CAPITAINE →'; btn.disabled = false; }
  }
}

// ══════════════════════════════════════════
// DASHBOARD PARENT
// ══════════════════════════════════════════

async function afShowParentDashboard() {
  // ── Guard 1 : récupérer l'user si absent ──
  if (!_authUser) {
    try {
      var sessionRes = await sb.auth.getSession();
      var session    = sessionRes.data && sessionRes.data.session;
      if (session && session.user) {
        _authUser = session.user;
      }
    } catch (_) { /* ignore */ }
  }

  // ── Guard 2 : si toujours pas d'user → login ──
  if (!_authUser || !_authUser.id) {
    afShowLogin();
    return;
  }

  // ── Guard 3 : charger le profil parent ──
  if (!_parentProfile) {
    try {
      _parentProfile = await _getParentProfile(_authUser.id);
    } catch (_) { _parentProfile = null; }
  }

  // ── Guard 4 : si pas de profil → onboarding ──
  if (!_parentProfile) {
    await afShowParentOnboarding(_authUser);
    return;
  }

  // ── Affichage ──
  _hideAllScreens();
  document.body.classList.remove('login-active');

  var sec = document.getElementById('parent-sec');
  if (sec) sec.style.display = 'block';

  var container = document.getElementById('parent-content');
  if (!container) return;

  container.innerHTML = '<div class="pd-loading">⏳ Chargement…</div>';

  _updateParentHeader();

  // ── Guard 5 : vérifier que _authUser est toujours valide après l'await ──
  if (!_authUser || !_authUser.id) { afShowLogin(); return; }

  var children = await _getChildren(_authUser.id);

  container.innerHTML = _tplParentDashboard(children);
  _bindDashboardEvents(children);
}

function _updateParentHeader() {
  if (!_parentProfile) return;
  var parentBtn  = document.getElementById('headerParentBtn');
  var parentName = document.getElementById('headerParentName');
  if (parentBtn)  parentBtn.style.display = 'flex';
  if (parentName) parentName.textContent = '👤 ' + (_parentProfile.prenom || _parentProfile.email.split('@')[0]);
}

function _tplParentDashboard(children) {
  var prenom = _parentProfile ? _parentProfile.prenom : '';
  var nom    = _parentProfile ? _parentProfile.nom    : '';
  var email  = _parentProfile ? _parentProfile.email  : (_authUser ? _authUser.email : '');

  var childrenHtml = '';
  if (!children.length) {
    childrenHtml = `
      <div class="pd-empty">
        Aucun aventurier encore créé.
        <span>Cliquez sur le bouton ci-dessous pour ajouter votre enfant.</span>
      </div>`;
  } else {
    childrenHtml = children.map(function (child) {
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
          <div class="pd-child-stats">⭐ ${child.xp_total || 0} XP · Niv. ${child.level || 1}</div>
        </div>
        <div class="pd-child-arrow">→ Résultats</div>
      </div>`;
    }).join('');
  }

  return `
  <div class="pd-section">
    <div class="pd-section-title">⚓ PROFIL CAPITAINE</div>
    <div class="pd-profile-email">
      ${prenom ? `<strong>${prenom} ${nom}</strong><br>` : ''}
      ✉️ ${email}
    </div>
  </div>

  <div class="pd-section">
    <div class="pd-section-title">👦 MES AVENTURIERS</div>
    ${childrenHtml}
    <button class="pd-btn-add" id="af-add-child-btn">＋ Ajouter un aventurier</button>
  </div>

  <div class="pd-section">
    <button class="pd-btn-play" id="af-play-btn">🎮 JOUER MAINTENANT</button>
    <button class="pd-btn-logout" onclick="afSignOut()">← Se déconnecter</button>
  </div>`;
}

function _bindDashboardEvents(children) {
  // Cartes enfants → résultats
  document.querySelectorAll('.pd-child-card[data-child-id]').forEach(function (card) {
    card.addEventListener('click', function () {
      var id    = card.getAttribute('data-child-id');
      var child = children.find(function (c) { return c.id === id; });
      if (child && typeof showChildResults === 'function') showChildResults(id, child);
    });
  });

  // Ajouter un aventurier
  var addBtn = document.getElementById('af-add-child-btn');
  if (addBtn) addBtn.addEventListener('click', function () { afShowCreateChild(false); });

  // Jouer
  var playBtn = document.getElementById('af-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      if (!children.length) {
        afShowCreateChild(true);
      } else if (children.length === 1) {
        afShowPinEntry(children[0], function () { afLaunchChild(children[0]); });
      } else {
        afShowChildPicker(children);
      }
    });
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

  _bindPinInputs('af-pin');

  var form = screen.querySelector('#af-child-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      afSubmitCreateChild(isFirstChild);
    });
  }
}

function _tplCreateChild(isFirstChild) {
  var avatarOpts = [
    { id: 'luffy',   emoji: '🍖', name: 'Luffy'   },
    { id: 'nami',    emoji: '🗺️', name: 'Nami'    },
    { id: 'zoro',    emoji: '⚔️', name: 'Zoro'    },
    { id: 'robin',   emoji: '📚', name: 'Robin'   },
    { id: 'usopp',   emoji: '🎯', name: 'Usopp'   },
    { id: 'sanji',   emoji: '🍳', name: 'Sanji'   },
    { id: 'chopper', emoji: '🦌', name: 'Chopper' },
    { id: 'brook',   emoji: '💀', name: 'Brook'   }
  ];

  var avHtml = avatarOpts.map(function (av, i) {
    var selected = i === 0;
    return `<div class="af-av-opt${selected ? ' selected' : ''}" data-id="${av.id}"
      onclick="afSelectChildAvatar(this)">
      <img src="assets/images/avatars/${av.id}.png"
        onerror="this.style.opacity='.3'"
        alt="${av.name}"
        style="width:44px;height:44px;border-radius:50%;object-fit:cover;
               border:2px solid ${selected ? '#ffd700' : 'rgba(255,255,255,.2)'};
               transition:border-color .2s;">
      <span>${av.name}</span>
    </div>`;
  }).join('');

  var pinInputs = [0, 1, 2, 3, 4, 5].map(function (i) {
    return `<input type="tel" maxlength="1" inputmode="numeric" pattern="[0-9]"
      id="af-pin-${i}" data-index="${i}" autocomplete="off"
      style="
        width:clamp(38px,10vw,50px);height:clamp(48px,12vw,60px);
        text-align:center;font-family:'Bangers',cursive;
        font-size:1.6rem;background:rgba(255,255,255,.07);
        border:2px solid rgba(255,255,255,.15);border-radius:10px;
        color:#fff;outline:none;caret-color:#ffd700;
        transition:border-color .2s;
      ">`;
  }).join('');

  var pinDots = [0, 1, 2, 3, 4, 5].map(function (i) {
    return `<div id="af-pindot-${i}" style="
      width:clamp(34px,9vw,44px);height:5px;border-radius:3px;
      background:rgba(255,255,255,.1);transition:background .15s;
    "></div>`;
  }).join('');

  return `
  <div style="
    max-width:460px;width:100%;
    background:rgba(5,8,16,.92);
    border:2px solid rgba(255,215,0,.25);
    border-radius:24px;
    padding:clamp(20px,5vw,28px) clamp(16px,4vw,24px);
    display:flex;flex-direction:column;gap:16px;
    box-shadow:0 20px 60px rgba(0,0,0,.7);
    backdrop-filter:blur(12px);
    overflow-y:auto;max-height:90vh;
  ">
    <div style="text-align:center">
      <div style="font-size:2.4rem">🏴‍☠️</div>
      <div style="font-family:'Bangers',cursive;font-size:clamp(1.5rem,5vw,2rem);
           color:#ffd700;letter-spacing:3px">
        ${isFirstChild ? 'VOTRE PREMIER AVENTURIER !' : 'NOUVEL AVENTURIER !'}
      </div>
    </div>

    <form id="af-child-form" style="display:flex;flex-direction:column;gap:14px">
      <input type="hidden" id="af-child-avatar" value="luffy">

      <div style="display:flex;flex-direction:column;gap:6px">
        <label style="${AF_LABEL_STYLE}">🏴‍☠️ Nom de l'aventurier *</label>
        <input id="af-child-username" type="text" placeholder="ex: TomPirate123"
          maxlength="20" required autocomplete="off"
          style="${AF_INPUT_STYLE}">
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        <label style="${AF_LABEL_STYLE}">🎭 Choisir un avatar</label>
        <div style="
          display:grid;grid-template-columns:repeat(4,1fr);gap:8px;
        " id="af-avatar-grid">
          ${avHtml}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        <label style="${AF_LABEL_STYLE}">🔐 Code PIN enfant (6 chiffres) *</label>
        <div style="font-family:'Nunito',sans-serif;font-size:.72rem;
             color:rgba(255,255,255,.35);line-height:1.5">
          Notez-le ! Votre enfant en aura besoin pour se connecter.
        </div>
        <div style="display:flex;gap:6px;justify-content:center">${pinInputs}</div>
        <div style="display:flex;gap:6px;justify-content:center">${pinDots}</div>
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
  document.querySelectorAll('.af-av-opt').forEach(function (opt) {
    opt.classList.remove('selected');
  });
  el.classList.add('selected');
  var inp = document.getElementById('af-child-avatar');
  if (inp) inp.value = el.dataset.id;
}

function _bindPinInputs(prefix) {
  for (var i = 0; i < 6; i++) {
    (function (idx) {
      var inp = document.getElementById(prefix + '-' + idx);
      if (!inp) return;
      inp.addEventListener('input', function (e) {
        var val = e.target.value.replace(/\D/g, '');
        e.target.value = val.slice(-1);
        var dot = document.getElementById(prefix + 'dot-' + idx);
        if (dot) dot.style.background = val ? '#ffd700' : 'rgba(255,255,255,.1)';
        if (val && idx < 5) {
          var next = document.getElementById(prefix + '-' + (idx + 1));
          if (next) next.focus();
        }
      });
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !inp.value && idx > 0) {
          var prev = document.getElementById(prefix + '-' + (idx - 1));
          if (prev) { prev.value = ''; prev.focus(); }
          var dot = document.getElementById(prefix + 'dot-' + (idx - 1));
          if (dot) dot.style.background = 'rgba(255,255,255,.1)';
        }
      });
    })(i);
  }
}

function _getPin(prefix) {
  return [0, 1, 2, 3, 4, 5].map(function (i) {
    var el = document.getElementById(prefix + '-' + i);
    return el ? el.value : '';
  }).join('');
}

async function afSubmitCreateChild(isFirstChild) {
  if (!_authUser || !_authUser.id) { afShowLogin(); return; }

  var username  = ((document.getElementById('af-child-username') || {}).value || '').trim();
  var avatarId  = ((document.getElementById('af-child-avatar')   || {}).value || '').trim();
  var pin       = _getPin('af-pin');
  var errEl     = document.getElementById('af-child-error');
  var btn       = document.querySelector('#af-child-form button[type="submit"]');

  if (!username) {
    if (errEl) { errEl.textContent = '⚠️ Donne un nom à ton aventurier !'; errEl.style.display = 'block'; }
    return;
  }
  if (pin.length !== 6) {
    if (errEl) { errEl.textContent = '⚠️ Le code PIN doit contenir 6 chiffres.'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';
  if (btn)   { btn.textContent = '⏳ Création…'; btn.disabled = true; }

  try {
    var child = await _createChildProfile(_authUser.id, username, avatarId, pin);
    if (!child) throw new Error('Impossible de créer le profil aventurier.');
    if (typeof showToast === 'function') showToast('🏴‍☠️ Aventurier ' + username + ' créé !');
    await afShowParentDashboard();
  } catch (e) {
    if (errEl) { errEl.textContent = '❌ ' + e.message; errEl.style.display = 'block'; }
    if (btn)   { btn.textContent = '🏴‍☠️ CRÉER CET AVENTURIER !'; btn.disabled = false; }
  }
}

// ══════════════════════════════════════════
// SÉLECTION / CONNEXION ENFANT
// ══════════════════════════════════════════

async function afShowChildLogin() {
  if (!_authUser || !_authUser.id) { afShowLogin(); return; }
  var children = await _getChildren(_authUser.id);

  if (!children.length) { afShowLogin(); return; }
  if (children.length === 1) {
    afShowPinEntry(children[0], function () { afLaunchChild(children[0]); });
    return;
  }
  afShowChildPicker(children);
}

function afShowChildPicker(children) {
  _hideAllScreens();
  var screen = _getOrCreate('af-child-picker');
  screen.style.cssText = AF_FULLSCREEN_STYLE;
  screen.style.display = 'flex';

  var cards = children.map(function (child) {
    return `<div class="cs-profile" data-child-id="${child.id}">
      <div class="cs-avatar">
        <img src="assets/images/avatars/${child.avatar_id || 'luffy'}.png"
          onerror="this.src='assets/images/avatars/luffy.png'" alt="${child.username}">
      </div>
      <div style="font-family:'Bangers',cursive;font-size:1rem;letter-spacing:2px;
           color:#ffd700;text-align:center">${child.username}</div>
      <div style="font-family:'Nunito',sans-serif;font-size:.68rem;font-weight:700;
           color:rgba(255,255,255,.4)">⭐ ${child.xp_total || 0} XP</div>
    </div>`;
  }).join('');

  screen.innerHTML = `
    <div class="cs-screen">
      <div class="cs-title">QUI ES-TU ?</div>
      <div class="cs-subtitle">Choisis ton profil de pirate</div>
      <div class="cs-profiles">${cards}</div>
    </div>`;

  screen.querySelectorAll('.cs-profile[data-child-id]').forEach(function (card) {
    card.addEventListener('click', function () {
      var id    = card.getAttribute('data-child-id');
      var child = children.find(function (c) { return c.id === id; });
      if (child) afShowPinEntry(child, function () { afLaunchChild(child); });
    });
  });
}

// ── Saisie PIN enfant ──
function afShowPinEntry(child, onSuccess) {
  _hideAllScreens();
  var screen = _getOrCreate('af-pin-entry');
  screen.style.cssText = AF_FULLSCREEN_STYLE;
  screen.style.display = 'flex';

  var pinInputs = [0, 1, 2, 3, 4, 5].map(function (i) {
    return `<input type="tel" maxlength="1" inputmode="numeric" pattern="[0-9]"
      id="af-entry-pin-${i}" data-index="${i}" autocomplete="off"
      style="
        width:clamp(38px,10vw,50px);height:clamp(48px,12vw,60px);
        text-align:center;font-family:'Bangers',cursive;font-size:1.6rem;
        background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.15);
        border-radius:10px;color:#fff;outline:none;caret-color:#ffd700;
        transition:border-color .2s;
      ">`;
  }).join('');

  screen.innerHTML = `
    <div style="
      max-width:360px;width:100%;text-align:center;
      background:rgba(5,8,16,.92);border:2px solid rgba(255,215,0,.2);
      border-radius:24px;padding:28px 20px;
      display:flex;flex-direction:column;gap:16px;
      box-shadow:0 20px 60px rgba(0,0,0,.7);
    ">
      <div style="font-size:2rem">🔐</div>
      <div style="font-family:'Bangers',cursive;font-size:1.6rem;color:#ffd700;
           letter-spacing:3px">CODE SECRET</div>
      <div style="font-family:'Nunito',sans-serif;font-size:.82rem;
           color:rgba(255,255,255,.5)">
        Entre ton code à 6 chiffres, <strong style="color:#ffd700">${child.username}</strong>
      </div>

      <div style="display:flex;gap:6px;justify-content:center">${pinInputs}</div>

      <div id="af-pin-error" style="
        display:none;height:20px;font-family:'Nunito',sans-serif;
        font-size:.8rem;font-weight:800;color:#f87171;
      ">❌ Code incorrect</div>

      <button onclick="afCheckPin('${child.id}')"
        style="${AF_BTN_GOLD_STYLE}">
        ✅ VALIDER
      </button>
      <button onclick="afHidePinEntry()" style="${AF_BTN_OUTLINE_STYLE}">
        ← Retour
      </button>
    </div>`;

  _bindPinInputs('af-entry-pin');

  // Stocker le callback
  window._afPinSuccess = onSuccess;
  window._afPinChild   = child;

  // Focus auto
  setTimeout(function () {
    var first = document.getElementById('af-entry-pin-0');
    if (first) first.focus();
  }, 100);
}

async function afCheckPin(childId) {
  var entered = _getPin('af-entry-pin');
  var child   = window._afPinChild;

  if (!child) return;

  var pinEntry = document.getElementById('af-pin-entry');
  var errEl    = document.getElementById('af-pin-error');

  // Vérifier contre le PIN stocké
  var enteredHash = _hashPin(entered);
  var ok = (entered === child.pin) || (enteredHash === child.pin_hash);

  if (!ok) {
    if (errEl) errEl.style.display = 'block';
    // Shake animation
    var wrap = pinEntry ? pinEntry.querySelector('div') : null;
    if (wrap) {
      wrap.style.animation = 'pinShake .4s ease';
      setTimeout(function () { wrap.style.animation = ''; }, 400);
    }
    // Reset inputs
    [0, 1, 2, 3, 4, 5].forEach(function (i) {
      var el = document.getElementById('af-entry-pin-' + i);
      if (el) el.value = '';
      var dot = document.getElementById('af-entry-pindot-' + i);
      if (dot) dot.style.background = 'rgba(255,255,255,.1)';
    });
    var first = document.getElementById('af-entry-pin-0');
    if (first) first.focus();
    return;
  }

  if (errEl) errEl.style.display = 'none';
  if (window._afPinSuccess) window._afPinSuccess();
}

function afHidePinEntry() {
  var screen = document.getElementById('af-pin-entry');
  if (screen) screen.style.display = 'none';

  // Revenir au sélecteur d'enfant si plusieurs enfants
  if (window._afPinChild && _authUser && _authUser.id) {
    _getChildren(_authUser.id).then(function (children) {
      if (children.length > 1) afShowChildPicker(children);
      else afShowLogin();
    });
  } else {
    afShowLogin();
  }
}

// ── Lancer la session enfant ──
function afLaunchChild(child) {
  _activeChild = child;
  _hideAllScreens();

  // Mettre à jour le header avec l'avatar de l'enfant
  var img  = document.getElementById('headerAvatarImg');
  var name = document.getElementById('headerAvatarName');
  if (img)  img.src  = 'assets/images/avatars/' + (child.avatar_id || 'luffy') + '.png';
  if (name) name.textContent = child.username;

  // Naviguer vers les îles
  if (typeof navigateTo === 'function') navigateTo('iles');
  else {
    var mapSec = document.getElementById('map-sec');
    if (mapSec) mapSec.style.display = 'block';
  }
}

// ══════════════════════════════════════════
// DÉCONNEXION
// ══════════════════════════════════════════

async function afSignOut() {
  try { await sb.auth.signOut(); } catch (_) {}
  _authUser = null; _parentProfile = null; _activeChild = null;
  if (typeof showToast === 'function') showToast('👋 À bientôt, Capitaine !');
  setTimeout(function () { location.reload(); }, 600);
}

// ══════════════════════════════════════════
// UTILITAIRES
// ══════════════════════════════════════════

function _hideAllScreens() {
  if (typeof hideAll === 'function') hideAll();
  ['af-parent-onboard', 'af-create-child', 'af-child-picker', 'af-pin-entry'].forEach(function (id) {
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

// ── Styles constants ──
var AF_FULLSCREEN_STYLE = [
  'position:fixed;inset:0;z-index:3000;',
  'background:rgba(5,8,16,.96);backdrop-filter:blur(10px);',
  'display:flex;align-items:center;justify-content:center;',
  'padding:16px;overflow-y:auto;'
].join('');

var AF_LABEL_STYLE = [
  "font-family:'Nunito',sans-serif;font-size:.72rem;font-weight:900;",
  'color:#ffd700;letter-spacing:2px;text-transform:uppercase;'
].join('');

var AF_INPUT_STYLE = [
  'background:rgba(255,255,255,.07);border:2px solid rgba(255,215,0,.2);',
  'border-radius:12px;padding:13px 16px;color:#fff;',
  "font-family:'Nunito',sans-serif;font-size:.95rem;font-weight:700;",
  'outline:none;width:100%;box-sizing:border-box;transition:border-color .2s;'
].join('');

var AF_BTN_GOLD_STYLE = [
  "font-family:'Bangers',cursive;font-size:1.2rem;letter-spacing:3px;",
  'padding:14px 24px;border-radius:14px;border:none;cursor:pointer;',
  'background:linear-gradient(135deg,#e63946,#f97316);color:#fff;',
  "text-shadow:2px 2px 0 rgba(0,0,0,.4);",
  'box-shadow:0 4px 20px rgba(230,57,70,.4);transition:all .2s;width:100%;',
  '-webkit-tap-highlight-color:transparent;'
].join('');

var AF_BTN_RED_STYLE = [
  "font-family:'Bangers',cursive;font-size:1.15rem;letter-spacing:2px;",
  'padding:13px 24px;border-radius:12px;border:none;cursor:pointer;',
  'background:linear-gradient(135deg,#e63946,#dc2626);color:#fff;',
  'box-shadow:0 4px 16px rgba(230,57,70,.4);transition:all .2s;width:100%;',
  '-webkit-tap-highlight-color:transparent;'
].join('');

var AF_BTN_OUTLINE_STYLE = [
  "font-family:'Bangers',cursive;font-size:1rem;letter-spacing:2px;",
  'padding:11px 20px;border-radius:12px;',
  'border:2px solid rgba(255,255,255,.15);background:transparent;',
  'color:rgba(255,255,255,.5);cursor:pointer;transition:all .2s;width:100%;',
  '-webkit-tap-highlight-color:transparent;'
].join('');

// ── CSS animations PIN ──
(function () {
  var style = document.createElement('style');
  style.textContent = `
    @keyframes pinShake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-8px)}
      40%{transform:translateX(8px)}
      60%{transform:translateX(-5px)}
      80%{transform:translateX(5px)}
    }
    .af-av-opt {
      display:flex;flex-direction:column;align-items:center;gap:4px;
      padding:8px 4px;border-radius:12px;cursor:pointer;
      border:2px solid rgba(255,255,255,.1);
      background:rgba(255,255,255,.04);transition:all .2s;
      min-width:0;
      -webkit-tap-highlight-color:transparent;
    }
    .af-av-opt span:first-child { font-size:1.5rem; }
    .af-av-opt span:last-child {
      font-family:'Bangers',cursive;font-size:.6rem;
      letter-spacing:1px;color:rgba(255,255,255,.5);
    }
    .af-av-opt:hover, .af-av-opt:active {
      border-color:rgba(255,215,0,.5);
      background:rgba(255,215,0,.08);
    }
    .af-av-opt.selected {
      border-color:#ffd700;background:rgba(255,215,0,.12);
    }
    .af-av-opt.selected span:last-child { color:#ffd700; }
    [id^="af-pin-"]:focus, [id^="af-entry-pin-"]:focus {
      border-color:#ffd700 !important;
      box-shadow:0 0 0 3px rgba(255,215,0,.15);
    }
  `;
  document.head.appendChild(style);
})();

// ── Exposer globalement ──
window.afInit                = afInit;
window.afShowLogin           = afShowLogin;
window.afShowParentDashboard = afShowParentDashboard;
window.afShowCreateChild     = afShowCreateChild;
window.afShowChildLogin      = afShowChildLogin;
window.afSelectChildAvatar   = afSelectChildAvatar;
window.afSubmitParentOnboard = afSubmitParentOnboard;
window.afSubmitCreateChild   = afSubmitCreateChild;
window.afCheckPin            = afCheckPin;
window.afHidePinEntry        = afHidePinEntry;
window.afSignOut             = afSignOut;

console.info('🏴‍☠️ auth-flow.js v2 chargé — Parent onboarding + PIN enfant');

// ══════════════════════════════════════════
// LOGIN ENFANT PAR PIN — onglet "Enfant" de la page login
// ══════════════════════════════════════════

window.afLoginChildByPin     = afLoginChildByPin;
window.afSubmitChildPinLogin = afSubmitChildPinLogin;

function afLoginChildByPin() {
  for (var i = 0; i < 6; i++) {
    var inp = document.getElementById('login-child-pin-' + i);
    if (inp) inp.value = '';
  }
  var errEl = document.getElementById('login-child-pin-error');
  if (errEl) errEl.style.display = 'none';
  setTimeout(function () {
    var first = document.getElementById('login-child-pin-0');
    if (first) first.focus();
  }, 80);
}

async function afSubmitChildPinLogin() {
  var pin = '';
  for (var i = 0; i < 6; i++) {
    var inp = document.getElementById('login-child-pin-' + i);
    pin += inp ? (inp.value || '') : '';
  }
  var errEl = document.getElementById('login-child-pin-error');
  var btn   = document.getElementById('login-child-pin-btn');

  if (pin.length !== 6) {
    if (errEl) { errEl.textContent = '⚠️ Entre les 6 chiffres de ton code !'; errEl.style.display = 'block'; }
    return;
  }
  if (btn) { btn.textContent = '⏳ Vérification…'; btn.disabled = true; }
  if (errEl) errEl.style.display = 'none';

  try {
    var res = await sb.from('child_profiles').select('*').eq('pin', pin).maybeSingle();
    if (!res.data) {
      if (errEl) { errEl.textContent = '❌ Code incorrect. Demande le bon PIN à ton parent !'; errEl.style.display = 'block'; }
      var wrap = document.getElementById('login-child-pin-wrap');
      if (wrap) { wrap.style.animation = 'none'; void wrap.offsetWidth; wrap.style.animation = 'pinShake .4s ease'; }
      for (var j = 0; j < 6; j++) { var ip = document.getElementById('login-child-pin-' + j); if (ip) ip.value = ''; }
      var first = document.getElementById('login-child-pin-0');
      if (first) first.focus();
      return;
    }
    if (typeof showToast === 'function') showToast('🏴‍☠️ Bienvenue ' + res.data.username + ' !');
    afLaunchChild(res.data);
  } catch (e) {
    if (errEl) { errEl.textContent = '❌ Erreur : ' + e.message; errEl.style.display = 'block'; }
  } finally {
    if (btn) { btn.textContent = '🏴‍☠️ ENTRER !'; btn.disabled = false; }
  }
}