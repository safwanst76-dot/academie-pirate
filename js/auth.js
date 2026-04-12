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

async function _createParentProfile(userId, email, prenom, nom, phone, emailProgress, emailFeatures) {
  // emailProgress/emailFeatures = préférences RGPD opt-in
  var optProgress = typeof emailProgress !== 'undefined' ? emailProgress : true;
  var optFeatures = typeof emailFeatures !== 'undefined' ? emailFeatures : true;
  var res = await sb.from('profiles_parents').upsert({
    id:                   userId,
    email:                email,
    prenom:               prenom,
    nom:                  nom,
    phone:                phone || null,
    email_notifications:  true,
    email_child_progress: optProgress,
    email_new_features:   optFeatures,
    consent_date:         new Date().toISOString(),
    consent_version:      '1.0'
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
  var existing = document.getElementById('login-hero-bg');
  if (existing) { existing.style.display = 'flex'; return; }

  var bg = document.createElement('div');
  bg.id = 'login-hero-bg';
  bg.style.cssText = 'position:fixed;inset:0;z-index:0;display:flex;overflow:hidden;pointer-events:none;';
  document.body.appendChild(bg);

  // Mélange de tous les univers — 5 colonnes (règle AV-01)
  var SUPABASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public';
  var AOT   = SUPABASE + '/island-aot/characters/';
  var DS    = SUPABASE + '/island-demon-slayer/characters/';
  var PDF   = SUPABASE + '/island-pays-du-feu/characters/';
  var LOCAL = 'assets/images/avatars/';
  var DBZ   = 'assets/images/dbz/';

  // 5 colonnes thématiques
  var columns = [
    // Col 1 — One Piece
    [
      { src: LOCAL + 'luffy.jpg' },
      { src: LOCAL + 'zoro.jpg' },
      { src: LOCAL + 'nami.jpg' },
      { src: LOCAL + 'sanji.jpg' },
      { src: LOCAL + 'robin.jpg' },
      { src: LOCAL + 'ace.jpg' },
      { src: LOCAL + 'shanks.jpg' },
      { src: LOCAL + 'law.jpg' },
    ],
    // Col 2 — Attack on Titan
    [
      { src: AOT + 'eren.jpeg' },
      { src: AOT + 'mikasa.gif' },
      { src: AOT + 'levi.jpg' },
      { src: AOT + 'armin.jpg' },
      { src: AOT + 'hange.jpeg' },
      { src: AOT + 'erwin.jpg' },
      { src: AOT + 'historia.png' },
      { src: AOT + 'annie.jpeg' },
    ],
    // Col 3 — Naruto + Demon Slayer
    [
      { src: PDF + 'sasuke.png' },
      { src: DS  + 'tanjiro.jpg' },
      { src: PDF + 'sakura.jpg' },
      { src: DS  + 'rengoku.jpg' },
      { src: PDF + 'hatake%20kakashi.jpeg' },
      { src: DS  + 'zenitsu.jpg' },
      { src: PDF + 'gaara%20.jpg' },
      { src: DS  + 'inosuke.jpg' },
    ],
    // Col 4 — Dragon Ball Z
    [
      { src: DBZ + '1.png' },
      { src: DBZ + '2.png' },
      { src: DBZ + '3.png' },
      { src: DBZ + '4.png' },
      { src: DBZ + '5.png' },
      { src: DBZ + '6.png' },
      { src: DBZ + '7.png' },
      { src: DBZ + '8.png' },
    ],
    // Col 5 — Mix tous univers
    [
      { src: LOCAL + 'chopper.jpg' },
      { src: AOT   + 'jean.jpg' },
      { src: LOCAL + 'hancock.jpg' },
      { src: DS    + 'shinobu.png' },
      { src: LOCAL + 'franky.jpg' },
      { src: AOT   + 'reiner.jpg' },
      { src: LOCAL + 'brook.jpg' },
      { src: DS    + 'tengen.jpg' },
    ],
  ];

  var durations = ['28s', '36s', '24s', '40s', '32s'];

  columns.forEach(function(imgs, colIdx) {
    var strip = document.createElement('div');
    strip.className = 'bg-strip login-bg-strip';
    strip.style.animationDuration = durations[colIdx];
    if (colIdx % 2 === 1) strip.style.animationDirection = 'reverse';

    // Doubler pour le scroll infini
    var allImgs = imgs.concat(imgs);
    allImgs.forEach(function(item) {
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = '';
      img.loading = 'lazy';
      img.onerror = function() { this.style.display = 'none'; };
      strip.appendChild(img);
    });
    bg.appendChild(strip);
  });
}

function _hideHeroBg() {
  var bg = document.getElementById('login-hero-bg');
  if (bg) bg.style.display = 'none';
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

      <div style="display:flex;flex-direction:column;gap:10px;padding:14px;background:rgba(255,215,0,.06);border:1px solid rgba(255,215,0,.2);border-radius:12px;">
        <div style="font-family:'Nunito',sans-serif;font-size:.82rem;font-weight:900;color:#ffd700;letter-spacing:1px;text-transform:uppercase;">
          📬 Préférences de communication
        </div>
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">
          <input type="checkbox" id="af-opt-progress" checked
            style="margin-top:3px;width:16px;height:16px;accent-color:#ffd700;cursor:pointer;">
          <span style="font-family:'Nunito',sans-serif;font-size:.8rem;font-weight:700;color:rgba(255,255,255,.85);line-height:1.4;">
            M'envoyer un résumé hebdomadaire de la progression de mon enfant
          </span>
        </label>
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">
          <input type="checkbox" id="af-opt-features" checked
            style="margin-top:3px;width:16px;height:16px;accent-color:#ffd700;cursor:pointer;">
          <span style="font-family:'Nunito',sans-serif;font-size:.8rem;font-weight:700;color:rgba(255,255,255,.85);line-height:1.4;">
            Me notifier des nouveaux cours et fonctionnalités
          </span>
        </label>
        <div style="font-family:'Nunito',sans-serif;font-size:.72rem;font-weight:600;color:rgba(255,255,255,.35);margin-top:2px;">
          Vous pouvez modifier ces préférences à tout moment dans votre profil. Aucun spam, promis ⚓
        </div>
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
  var emailProgress = document.getElementById('af-opt-progress') ? document.getElementById('af-opt-progress').checked : true;
  var emailFeatures = document.getElementById('af-opt-features') ? document.getElementById('af-opt-features').checked : true;
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
    var profile = await _createParentProfile(user.id, user.email, prenom, nom, phone, emailProgress, emailFeatures);
    if (!profile) throw new Error('Impossible de créer le profil. Réessayez.');
    _parentProfile = profile;
    if (typeof showToast === 'function') showToast('⚓ Bienvenue Capitaine ' + prenom + ' !');
    if (window.AP && typeof window.AP.trackSignup === 'function') window.AP.trackSignup('complete');
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
          <img src="assets/images/avatars/${child.avatar_id || 'luffy'}.jpg"
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
  setTimeout(_initAvatarPickerInForm, 50);

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
  ];
  // Avatar picker géré par AvatarPicker component (Phase 3a — ARCHI-01)
  var avHtml = '<div id="af-avatar-picker-wrap" style="width:100%"></div>';

  var pinInputs = ''; // non utilisé — on passe à un champ unique
  var pinDots   = ''; // non utilisé

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
        <div id="af-avatar-grid">
          ${avHtml}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        <label style="${AF_LABEL_STYLE}">🔐 Code secret enfant (4 à 8 caractères) *</label>
        <div style="font-family:'Nunito',sans-serif;font-size:.72rem;
             color:rgba(255,255,255,.45);line-height:1.6;padding:8px 10px;
             background:rgba(255,215,0,.05);border-radius:8px;
             border-left:3px solid rgba(255,215,0,.3)">
          Lettres et chiffres autorisés (ex: <strong style="color:#ffd700">Luffy7</strong>, <strong style="color:#ffd700">Zoro42</strong>).
          Notez-le bien — votre enfant en aura besoin pour se connecter !
        </div>
        <input type="text" id="af-pin-field"
          minlength="4" maxlength="8"
          autocomplete="new-password"
          autocorrect="off" autocapitalize="characters" spellcheck="false"
          placeholder="ex: Luffy7"
          style="
            padding:14px 16px;text-align:center;
            font-family:'Bangers',cursive;font-size:1.8rem;
            letter-spacing:4px;text-transform:uppercase;
            background:rgba(255,255,255,.07);
            border:2px solid rgba(255,255,255,.15);
            border-radius:12px;color:#ffd700;outline:none;
            caret-color:#ffd700;width:100%;
            transition:border-color .2s;
          "
          oninput="afPinStrength(this)">
        <div id="af-pin-strength" style="display:flex;gap:4px;height:4px">
          <div id="af-ps-1" style="flex:1;border-radius:2px;background:rgba(255,255,255,.1);transition:background .2s"></div>
          <div id="af-ps-2" style="flex:1;border-radius:2px;background:rgba(255,255,255,.1);transition:background .2s"></div>
          <div id="af-ps-3" style="flex:1;border-radius:2px;background:rgba(255,255,255,.1);transition:background .2s"></div>
        </div>
        <div id="af-pin-hint" style="font-family:'Nunito',sans-serif;font-size:.7rem;
             color:rgba(255,255,255,.35);text-align:center;min-height:16px"></div>
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

// ── Initialiser le AvatarPicker dans le formulaire enfant (ARCHI-01) ──
function _initAvatarPickerInForm() {
  var wrap = document.getElementById('af-avatar-picker-wrap');
  if (!wrap) return;
  if (typeof AvatarPicker !== 'undefined') {
    AvatarPicker.render(wrap, {
      selected: 'luffy',
      onSelect: function (avatar) {
        var inp = document.getElementById('af-child-avatar');
        if (inp) inp.value = avatar.id;
      }
    });
  } else {
    // Fallback : mini-grid One Piece si le composant n'est pas chargé
    var fallbacks = ['luffy','nami','zoro','robin','usopp','sanji','chopper','brook'];
    wrap.innerHTML = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">' +
      fallbacks.map(function(id, i) {
        return '<div class="af-av-opt' + (i===0?' selected':'') + '" data-id="' + id + '" onclick="afSelectChildAvatar(this)" style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px;border-radius:10px;border:2px solid ' + (i===0?'#ffd700':'rgba(255,255,255,.2)') + ';cursor:pointer;background:rgba(255,255,255,.04)">' +
          '<img src="assets/images/avatars/' + id + '.jpg" style="width:44px;height:44px;border-radius:50%;object-fit:cover" onerror="this.style.opacity=0.3">' +
          '<span style="font-family:Nunito,sans-serif;font-size:.6rem;font-weight:800;color:rgba(255,255,255,.6);text-transform:uppercase">' + id + '</span>' +
        '</div>';
      }).join('') + '</div>';
  }
}

function _bindPinInputs(prefix) {
  // Avec le nouveau champ unique, on focus juste le champ
  var field = document.getElementById(prefix + '-field') ||
              document.getElementById(prefix.replace(/-$/, '') + '-field');
  if (field) {
    setTimeout(function() { field.focus(); }, 120);
  }
}

// Indicateur de force du code secret
function afPinStrength(inp) {
  var val = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  inp.value = val; // forcer alphanumérique majuscule

  var len = val.length;
  var hasLetter = /[A-Z]/.test(val);
  var hasDigit  = /[0-9]/.test(val);

  var strength = 0;
  if (len >= 4) strength = 1;
  if (len >= 5 && (hasLetter || hasDigit)) strength = 2;
  if (len >= 6 && hasLetter && hasDigit) strength = 3;

  var colors  = ['#ef4444', '#f97316', '#22c55e'];
  var hints   = [
    '⚠️ Trop court — 4 caractères minimum',
    '👍 Bien ! Ajoute encore un chiffre ou une lettre',
    '✅ Code secret solide !'
  ];

  [1, 2, 3].forEach(function(n) {
    var bar = document.getElementById('af-ps-' + n);
    if (bar) bar.style.background = n <= strength ? colors[strength - 1] : 'rgba(255,255,255,.1)';
  });

  var hint = document.getElementById('af-pin-hint');
  if (hint) hint.textContent = len > 0 ? (hints[strength - 1] || hints[0]) : '';
}

function _getPin(prefix) {
  // Nouveau : champ unique alphanumérique
  var field = document.getElementById(prefix + '-field') ||
              document.getElementById(prefix.replace(/-$/, '') + '-field');
  if (field) return field.value.toUpperCase().trim();
  // Fallback legacy (6 cases séparées)
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
  if (pin.length < 4) {
    if (errEl) { errEl.textContent = '⚠️ Le code secret doit contenir au moins 4 caractères (lettres et/ou chiffres).'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';
  if (btn)   { btn.textContent = '⏳ Création…'; btn.disabled = true; }

  try {
    var child = await _createChildProfile(_authUser.id, username, avatarId, pin);
    if (!child) throw new Error('Impossible de créer le profil aventurier.');

    // ── Sauvegarder les tokens du parent liés à cet enfant ──
    // Quand l'enfant se connectera par PIN, on restaurera cette session
    // pour que auth.uid() = parent_id → RLS OK → progression visible par le parent
    try {
      var _sr = await sb.auth.getSession();
      var _ss = _sr.data && _sr.data.session;
      if (_ss) {
        localStorage.setItem('ap_child_tokens_' + child.id, JSON.stringify({
          access_token:  _ss.access_token,
          refresh_token: _ss.refresh_token,
          parent_id:     _authUser.id
        }));
        console.info('[auth] tokens parent sauvés pour enfant:', child.username);
      }
    } catch (_e) { console.warn('[auth] save tokens:', _e); }

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
        <img src="assets/images/avatars/${child.avatar_id || 'luffy'}.jpg"
          onerror="this.src='assets/images/avatars/luffy.jpg'" alt="${child.username}">
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

  var pinInputs = '<input type="text" id="af-entry-pin-field" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" placeholder="••••••" style="padding:14px 16px;text-align:center;font-family:Bangers,cursive;font-size:2rem;letter-spacing:6px;text-transform:uppercase;background:rgba(255,255,255,.07);border:2px solid rgba(255,215,0,.3);border-radius:12px;color:#ffd700;outline:none;width:100%;caret-color:#ffd700;transition:border-color .2s" oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,\'\');">';

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
        Entre ton code secret, <strong style="color:#ffd700">${child.username}</strong>
      </div>

      <div style="width:100%">${pinInputs}</div>

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
  var entered = (_getPin('af-entry-pin') || '').toUpperCase().trim();
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
async function afLaunchChild(child) {
  _activeChild = child;
  if (typeof dbSetActiveChild === 'function') dbSetActiveChild(child);

  // ── Restaurer la session parent liée à cet enfant ──
  // Priorité 1 : tokens stockés dans localStorage (connexion PIN depuis page login)
  // Priorité 2 : session déjà active (connexion depuis le dashboard parent)
  var sessionRestored = false;
  try {
    var stored = localStorage.getItem('ap_child_tokens_' + child.id);
    if (stored) {
      var tokens = JSON.parse(stored);
      // Restaurer la session avec le refresh_token (auto-renouvellement si access_token expiré)
      var { data, error } = await sb.auth.setSession({
        access_token:  tokens.access_token,
        refresh_token: tokens.refresh_token
      });
      if (!error && data && data.session) {
        _authUser = data.session.user;
        sessionRestored = true;
        console.info('[auth] session parent restaurée pour enfant:', child.username);
        // Mettre à jour les tokens stockés (ils peuvent avoir été rafraîchis)
        localStorage.setItem('ap_child_tokens_' + child.id, JSON.stringify({
          access_token:  data.session.access_token,
          refresh_token: data.session.refresh_token,
          parent_id:     tokens.parent_id
        }));
      } else if (error) {
        console.warn('[auth] setSession échoué:', error.message, '— jeu continue sans session');
      }
    }
  } catch (e) {
    console.warn('[auth] restauration session:', e.message);
  }

  if (!sessionRestored && !_authUser) {
    console.warn('[auth] pas de session active — progression en localStorage uniquement');
  }

  _hideAllScreens();

  // Mettre à jour le header avec l'avatar de l'enfant
  var img  = document.getElementById('headerAvatarImg');
  var name = document.getElementById('headerAvatarName');
  if (img) {
    img.src = 'assets/images/avatars/' + (child.avatar_id || 'luffy') + '.jpg';
    img.style.display = 'block';
  }
  if (name) name.textContent = child.username;

  // Afficher le bouton déconnexion enfant
  var logoutBtn = document.getElementById('childLogoutBtn');
  if (logoutBtn) logoutBtn.style.display = 'block';

  // Charger la progression DB de l'enfant
  if (typeof loadProgress === 'function') {
    try { await loadProgress(); } catch (_) {}
  }

  // Naviguer vers la carte du monde
  if (typeof navigateTo === 'function') navigateTo('carte');
  else {
    var globeSec = document.getElementById('globe-sec');
    if (globeSec) globeSec.style.display = 'flex';
  }
// Web Push — demander permission après connexion enfant
  setTimeout(function() {
    if (window.AP_Push && typeof window.AP_Push.init === 'function') {
      window.AP_Push.init();
    }
  }, 2000);
  
  // Daily reward — 1.5s pour laisser la carte se charger
  setTimeout(function() {
    if (window.AP && window.AP.daily && typeof window.AP.daily.check === 'function') {
      window.AP.daily.check(child);
    }
  }, 1500);
  // Badges — 2s pour laisser la progression se charger
  setTimeout(function() {
    if (window.AP && window.AP.badges && typeof window.AP.badges.init === 'function') {
      window.AP.badges.init();
    }
  }, 2000);
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
  // Masquer le fond héros login — ne doit PAS persister sur les autres pages
  _hideHeroBg();
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

// ── Déconnexion enfant ──
window.childLogout = function () {
  // Masquer le bouton déconnexion
  var logoutBtn = document.getElementById('childLogoutBtn');
  if (logoutBtn) logoutBtn.style.display = 'none';

  // Réinitialiser l'avatar header
  var img  = document.getElementById('headerAvatarImg');
  var name = document.getElementById('headerAvatarName');
  if (img)  { img.src = ''; img.style.display = 'none'; }
  if (name) name.textContent = 'Pirate';

  // Arrêter la musique
  if (typeof stopBGM === 'function') stopBGM();

  // Réinitialiser l'enfant actif
  _activeChild = null;
  if (typeof dbSetActiveChild === 'function') dbSetActiveChild(null);

  // Retourner à la page login
  _hideAllScreens();
  afShowLogin();
  if (typeof showToast === 'function') showToast('👋 À bientôt !');
};

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
  var field = document.getElementById('login-child-pin-field');
  var pin   = field ? field.value.toUpperCase().trim() : '';
  var errEl = document.getElementById('login-child-pin-error');
  var btn   = document.getElementById('login-child-pin-btn');

  if (pin.length < 4) {
    if (errEl) { errEl.textContent = '⚠️ Entre ton code secret (4 à 8 caractères) !'; errEl.style.display = 'block'; }
    return;
  }
  if (btn) { btn.textContent = '⏳ Vérification…'; btn.disabled = true; }
  if (errEl) errEl.style.display = 'none';

  try {
    // Méthode 1 : client Supabase standard (fonctionne si RLS anon autorisé)
    var childData = null;
    var res = await sb.from('child_profiles').select('*').eq('pin', pin).maybeSingle();

    if (res.data) {
      childData = res.data;
    } else if (res.error) {
      // Méthode 2 : fetch direct avec clé anon — contourne RLS si politique non configurée
      // (nécessaire quand l'enfant n'est pas authentifié)
      childData = await _fetchChildByPinDirect(pin);
    }

    if (!childData) {
      if (errEl) { errEl.textContent = '❌ Code incorrect. Demande le bon PIN à ton parent !'; errEl.style.display = 'block'; }
      _shakeLoginPinInputs();
      return;
    }
    if (typeof showToast === 'function') showToast('🏴‍☠️ Bienvenue ' + childData.username + ' !');
    afLaunchChild(childData);

  } catch (e) {
    console.error('[PIN login]', e);
    if (errEl) { errEl.textContent = '❌ Erreur de connexion. Réessaie.'; errEl.style.display = 'block'; }
  } finally {
    if (btn) { btn.textContent = '🏴‍☠️ ENTRER !'; btn.disabled = false; }
  }
}

// Fetch direct avec clé anon — contourne RLS pour la vérification PIN anonyme
async function _fetchChildByPinDirect(pin) {
  try {
    var url  = window.SUPABASE_URL || '';
    var akey = window.SUPABASE_ANON_KEY || '';
    if (!url || !akey) return null;

    var r = await fetch(
      url + '/rest/v1/child_profiles?pin=eq.' + encodeURIComponent(pin) + '&select=*&limit=1',
      {
        method: 'GET',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'apikey':        akey,
          'Authorization': 'Bearer ' + akey   // clé anon publique
        }
      }
    );
    if (!r.ok) return null;
    var rows = await r.json();
    return (rows && rows.length > 0) ? rows[0] : null;
  } catch (e) {
    console.error('[_fetchChildByPinDirect]', e);
    return null;
  }
}

function _shakeLoginPinInputs() {
  var wrap = document.getElementById('login-child-pin-wrap');
  if (wrap) { wrap.style.animation = 'none'; void wrap.offsetWidth; wrap.style.animation = 'pinShake .4s ease'; }
  var field = document.getElementById('login-child-pin-field');
  if (field) { field.value = ''; field.focus(); }
}