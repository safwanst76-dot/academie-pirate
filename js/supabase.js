// ═══════════════════════════════════════
// SUPABASE — Académie Pirate
// ═══════════════════════════════════════

const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHpycXN2Y2NxbXp2b25zc3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzQyMTgsImV4cCI6MjA4ODU1MDIxOH0.mHXhN4MjZeDz_WWXxCMUInATpTEUiHxvrvEunoSpYFU';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.sb                = sb;
window.SUPABASE_URL      = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

// ═══════════════════════════════════════
// AUTH HELPERS
// ═══════════════════════════════════════

async function sbGetUser() {
  const { data } = await sb.auth.getUser();
  return data.user || null;
}

async function sbGetProfile(userId) {
  const { data } = await sb.from('profiles').select('*').eq('id', userId).single();
  return data;
}

async function sbGetParentProfile(userId) {
  const { data } = await sb
    .from('profiles_parents')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  return data;
}

async function sbSignOut() {
  await sb.auth.signOut();
  showToast('👋 À bientôt !');
  location.reload();
}

// ═══════════════════════════════════════
// BADGE AVATAR LOGIN — haut gauche
// ═══════════════════════════════════════

function updateLoginAvatarBadge() {
  let badge = document.getElementById('login-avatar-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'login-avatar-badge';
    badge.innerHTML = `
      <img src="" alt="avatar" id="labImg"
           onerror="this.src='assets/images/avatars/luffy.png'">
      <div class="lab-info">
        <div class="lab-name" id="labName">Pirate</div>
        <div class="lab-sub">Moussaillon</div>
      </div>`;
    document.body.appendChild(badge);
  }

  let player = null;
  try { player = JSON.parse(localStorage.getItem('ap_player')); } catch(e) {}

  const img    = document.getElementById('labImg');
  const nameEl = document.getElementById('labName');

  if (player && player.name && player.name !== 'Pirate') {
    if (img)    img.src = player.avatarImg || 'assets/images/avatars/luffy.png';
    if (nameEl) nameEl.textContent = player.name;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// ═══════════════════════════════════════
// SHOW / HIDE LOGIN PAGE
// ═══════════════════════════════════════

function showLoginPage() {
  // Masquer le header et la sound-bar
  document.body.classList.add('login-active');
  updateLoginAvatarBadge();
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) loginScreen.classList.remove('gone');
  positionLoginScreen();
}

function hideLoginPage() {
  document.body.classList.remove('login-active');
  const badge = document.getElementById('login-avatar-badge');
  if (badge) badge.classList.add('hidden');
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) loginScreen.classList.add('gone');
}

// ═══════════════════════════════════════
// LOGIN GIF
// ═══════════════════════════════════════

const LOGIN_GIFS = [
  "https://media.giphy.com/media/SJXzadwbexJEAZ9S1B/giphy.gif",
  "https://media.giphy.com/media/9VnXVHOIJgwnfNTK7Q/giphy.gif",
  "https://media.giphy.com/media/2i4xbkUhHrOuY/giphy.gif",
  "https://media.giphy.com/media/IjqnkYbnr6aHe/giphy.gif",
];

document.addEventListener("DOMContentLoaded", function() {
  var gifEl = document.getElementById("loginGif");
  if (gifEl) gifEl.src = LOGIN_GIFS[Math.floor(Math.random() * LOGIN_GIFS.length)];
});

// ═══════════════════════════════════════
// MAGIC LINK
// ═══════════════════════════════════════

function showLoginStep1() {
  const s1 = document.getElementById('loginStep1');
  const s2 = document.getElementById('loginStep2');
  if (s1) { s1.style.display = 'flex'; s1.style.flexDirection = 'column'; s1.style.gap = '12px'; }
  if (s2) s2.style.display = 'none';
}

function switchLoginTab(tab) {
  const tabNew    = document.getElementById('tabNew');
  const tabReturn = document.getElementById('tabReturn');
  const label     = document.getElementById('loginFormLabel');
  const hint      = document.getElementById('loginFormHint');
  if (tab === 'new') {
    if (tabNew)    tabNew.classList.add('active');
    if (tabReturn) tabReturn.classList.remove('active');
    if (label) label.textContent = '⚓ Ton email de pirate';
    if (hint)  hint.textContent  = 'Tu recevras un lien par email — pas de mot de passe !';
  } else {
    if (tabNew)    tabNew.classList.remove('active');
    if (tabReturn) tabReturn.classList.add('active');
    if (label) label.textContent = '⚓ Ton email de connexion';
    if (hint)  hint.textContent  = 'Tu as déjà un compte ? Entre ton email et reçois un lien de connexion instantané !';
  }
  showLoginStep1();
  const inp = document.getElementById('loginEmail');
  if (inp) inp.focus();
}

async function sbSendMagicLink() {
  const email = document.getElementById('loginEmail').value.trim();
  if (!email || !email.includes('@')) {
    showToast('⚠️ Entre un email valide !'); return;
  }
  const btn = document.querySelector('.login-btn');
  btn.textContent = '⏳ Envoi en cours…'; btn.disabled = true;

  const { error } = await sb.auth.signInWithOtp({
    email: email,
    options: { emailRedirectTo: "https://safwanst76-dot.github.io/academie-pirate" }
  });

  btn.disabled = false; btn.textContent = '🚀 ENVOYER LE LIEN MAGIQUE !';
  if (error) { showToast('❌ ' + error.message); return; }

  document.getElementById('loginStep1').style.display = 'none';
  document.getElementById('loginStep2').style.display = 'flex';
  document.getElementById('loginStep2').style.flexDirection = 'column';
  document.getElementById('loginStep2').style.gap = '14px';
  document.getElementById('loginStep2').style.alignItems = 'center';
}

// ─── Jouer sans compte ───
function skipLogin() {
  hideLoginPage();
  document.getElementById('pirate-nav')?.classList.add('visible');
  const avatarScreen = document.getElementById('avatar-screen');
  if (avatarScreen) avatarScreen.classList.remove('gone');
  navigateTo('carte');
}

// ═══════════════════════════════════════
// INIT PRINCIPAL
// ═══════════════════════════════════════

async function sbInit() {
  if (window.location.hash.includes("access_token")) {
    await new Promise(r => setTimeout(r, 800));
  }

  sb.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      await handleSignedIn(session.user);
    }
  });

  const user = await sbGetUser();
  if (user) {
    await handleSignedIn(user);
    return;
  }

  showLoginPage();
}

async function handleSignedIn(user) {
  hideLoginPage();
  document.getElementById('pirate-nav')?.classList.add('visible');

  const parentProfile = await sbGetParentProfile(user.id);
  if (parentProfile) {
    await handleParent(user, parentProfile);
    return;
  }

  const childProfile = await sbGetProfile(user.id);
  if (childProfile) {
    await handleEnfant(user, childProfile);
    return;
  }

  showRoleChoice(user);
}

// ═══════════════════════════════════════
// CHOIX DU RÔLE
// ═══════════════════════════════════════

function showRoleChoice(user) {
  document.querySelectorAll('#avatar-screen, #globe-sec, #map-sec, #quiz-sec').forEach(el => {
    if (el) { el.style.display = 'none'; el.classList?.add('gone'); }
  });

  let roleScreen = document.getElementById('role-choice-screen');
  if (!roleScreen) {
    roleScreen = document.createElement('div');
    roleScreen.id = 'role-choice-screen';
    document.body.appendChild(roleScreen);
  }

  roleScreen.style.cssText = `
    position:fixed;inset:0;z-index:50;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    background:rgba(0,0,0,0.88);gap:24px;padding:24px;
  `;

  roleScreen.innerHTML = `
    <div style="font-family:'Bangers',cursive;font-size:2.2rem;color:#ffd700;letter-spacing:3px;text-align:center;">
      🏴‍☠️ QUI ES-TU ?
    </div>
    <div style="font-family:'Nunito',sans-serif;color:rgba(255,255,255,.55);font-size:.9rem;text-align:center;max-width:320px;">
      Choisis ton rôle pour rejoindre l'équipage de l'Académie Pirate !
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;">
      <button onclick="startChildOnboarding('${user.id}','${user.email}')" style="
        font-family:'Bangers',cursive;font-size:1.4rem;letter-spacing:2px;
        padding:24px 32px;border-radius:20px;border:3px solid #e63946;
        background:rgba(230,57,70,0.15);color:#fff;cursor:pointer;
        display:flex;flex-direction:column;align-items:center;gap:8px;
        min-width:160px;transition:all .2s;
      " onmouseover="this.style.background='rgba(230,57,70,0.35)'"
         onmouseout="this.style.background='rgba(230,57,70,0.15)'">
        <span style="font-size:3rem">🧒</span>
        JE SUIS UN ENFANT
        <span style="font-family:'Nunito',sans-serif;font-size:.7rem;color:rgba(255,255,255,.45);font-weight:700;letter-spacing:1px;">AVENTURIER</span>
      </button>
      <button onclick="startParentOnboarding('${user.id}','${user.email}')" style="
        font-family:'Bangers',cursive;font-size:1.4rem;letter-spacing:2px;
        padding:24px 32px;border-radius:20px;border:3px solid #3b82f6;
        background:rgba(59,130,246,0.15);color:#fff;cursor:pointer;
        display:flex;flex-direction:column;align-items:center;gap:8px;
        min-width:160px;transition:all .2s;
      " onmouseover="this.style.background='rgba(59,130,246,0.35)'"
         onmouseout="this.style.background='rgba(59,130,246,0.15)'">
        <span style="font-size:3rem">👨‍👩‍👧</span>
        JE SUIS UN PARENT
        <span style="font-family:'Nunito',sans-serif;font-size:.7rem;color:rgba(255,255,255,.45);font-weight:700;letter-spacing:1px;">CAPITAINE</span>
      </button>
    </div>
  `;
}

// ═══════════════════════════════════════
// ONBOARDING ENFANT
// ═══════════════════════════════════════

function startChildOnboarding(userId, email) {
  const roleScreen = document.getElementById('role-choice-screen');
  if (roleScreen) roleScreen.remove();

  const avatarScreen = document.getElementById('avatar-screen');
  if (avatarScreen) {
    avatarScreen.classList.remove('gone');
    avatarScreen.style.display = '';

    const _orig = window.saveAvatar;
    window.saveAvatar = async function(avatarId, name) {
      await sb.from('profiles').upsert({
        id: userId,
        username: name || email.split('@')[0],
        avatar_id: avatarId || 'luffy',
        role: 'enfant'
      });
      if (typeof _orig === 'function') _orig(avatarId, name);
      showToast('🏴‍☠️ Bienvenue ' + (name || 'Pirate') + ' !');
      navigateTo('carte');
    };
  } else {
    sb.from('profiles').upsert({
      id: userId,
      username: email.split('@')[0],
      avatar_id: 'luffy',
      role: 'enfant'
    }).then(() => navigateTo('carte'));
  }
}

// ═══════════════════════════════════════
// ONBOARDING PARENT
// ═══════════════════════════════════════

function startParentOnboarding(userId, email) {
  const roleScreen = document.getElementById('role-choice-screen');
  if (roleScreen) roleScreen.remove();

  let screen = document.getElementById('parent-onboard-screen');
  if (!screen) {
    screen = document.createElement('div');
    screen.id = 'parent-onboard-screen';
    document.body.appendChild(screen);
  }

  screen.style.cssText = `
    position:fixed;inset:0;z-index:50;overflow-y:auto;
    display:flex;flex-direction:column;align-items:center;
    background:rgba(0,0,0,0.9);padding:40px 20px;gap:20px;
  `;

  const fieldStyle = `background:rgba(255,255,255,.07);border:2px solid rgba(59,130,246,.3);border-radius:12px;padding:12px 16px;color:#fff;font-family:'Nunito',sans-serif;font-size:1rem;font-weight:700;outline:none;width:100%;box-sizing:border-box;`;
  const labelStyle = `font-family:'Nunito',sans-serif;font-size:.75rem;font-weight:800;color:#3b82f6;letter-spacing:2px;text-transform:uppercase;`;

  screen.innerHTML = `
    <div style="font-family:'Bangers',cursive;font-size:2rem;color:#3b82f6;letter-spacing:3px;text-align:center;margin-top:20px;">⚓ PROFIL CAPITAINE</div>
    <div style="font-family:'Nunito',sans-serif;color:rgba(255,255,255,.45);font-size:.85rem;text-align:center;max-width:340px;">Ces informations nous permettent de personnaliser l'expérience et de gérer l'abonnement</div>
    <div style="background:rgba(0,0,0,0.5);border:2px solid rgba(59,130,246,.25);border-radius:20px;padding:28px;width:min(420px,92vw);display:flex;flex-direction:column;gap:16px;box-sizing:border-box;">
      <div style="display:flex;flex-direction:column;gap:6px;"><label style="${labelStyle}">👤 Prénom</label><input id="parentPrenom" type="text" placeholder="Ton prénom" style="${fieldStyle}"></div>
      <div style="display:flex;flex-direction:column;gap:6px;"><label style="${labelStyle}">👤 Nom</label><input id="parentNom" type="text" placeholder="Ton nom de famille" style="${fieldStyle}"></div>
      <div style="display:flex;flex-direction:column;gap:6px;"><label style="${labelStyle}">📱 Téléphone <span style="color:rgba(255,255,255,.3)">(optionnel)</span></label><input id="parentPhone" type="tel" placeholder="+33 6 XX XX XX XX" style="${fieldStyle}"></div>
      <div style="display:flex;flex-direction:column;gap:6px;"><label style="${labelStyle}">📧 Email</label><input type="email" value="${email}" readonly style="${fieldStyle}opacity:.5;cursor:not-allowed;"></div>
      <button id="parentSaveBtn" onclick="saveParentProfile('${userId}','${email}')" style="font-family:'Bangers',cursive;font-size:1.3rem;letter-spacing:2px;padding:14px 24px;border-radius:14px;border:none;cursor:pointer;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-shadow:2px 2px 0 rgba(0,0,0,.4);box-shadow:0 4px 20px rgba(59,130,246,.4);transition:all .2s;width:100%;margin-top:8px;">⚓ CRÉER MON PROFIL CAPITAINE</button>
    </div>
  `;
}

async function saveParentProfile(userId, email) {
  const prenom = document.getElementById('parentPrenom')?.value.trim();
  const nom    = document.getElementById('parentNom')?.value.trim();
  const phone  = document.getElementById('parentPhone')?.value.trim();
  if (!prenom || !nom) { showToast('⚠️ Prénom et nom obligatoires !'); return; }
  const btn = document.getElementById('parentSaveBtn');
  if (btn) { btn.textContent = '⏳ Enregistrement…'; btn.disabled = true; }
  const { error } = await sb.from('profiles_parents').upsert({ id: userId, email, prenom, nom, phone: phone || null });
  if (error) {
    showToast('❌ ' + error.message);
    if (btn) { btn.textContent = '⚓ CRÉER MON PROFIL CAPITAINE'; btn.disabled = false; }
    return;
  }
  document.getElementById('parent-onboard-screen')?.remove();
  showToast('⚓ Bienvenue Capitaine ' + prenom + ' !');
  showParentDashboard(userId, { prenom, nom, email, phone });
}

// ═══════════════════════════════════════
// DASHBOARD PARENT
// ═══════════════════════════════════════

async function handleParent(user, parentProfile) {
  showParentDashboard(user.id, parentProfile);
}

async function showParentDashboard(userId, parentProfile) {
  document.querySelectorAll('#globe-sec, #map-sec, #quiz-sec, .world-divider').forEach(el => {
    if (el) el.style.display = 'none';
  });
  document.getElementById('pirate-nav')?.classList.add('visible');

  const { data: enfants } = await sb.from('profiles').select('*, progression(*)').eq('parent_id', userId);

  let dash = document.getElementById('parent-dashboard');
  if (!dash) {
    dash = document.createElement('div');
    dash.id = 'parent-dashboard';
    const header = document.querySelector('header');
    if (header) header.insertAdjacentElement('afterend', dash);
    else document.body.appendChild(dash);
  }
  dash.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:24px;padding:30px 20px;min-height:80vh;`;

  const cardsHTML = enfants && enfants.length
    ? enfants.map(e => {
        const xpTotal   = e.progression?.reduce((s,p) => s+(p.xp||0), 0) ?? 0;
        const completed = e.progression?.filter(p=>p.completed).length ?? 0;
        return `<div style="background:rgba(0,0,0,0.45);border:2px solid rgba(255,215,0,.2);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:12px;min-width:220px;max-width:300px;flex:1;">
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="assets/images/avatars/${e.avatar_id||'luffy'}.png" style="width:52px;height:52px;border-radius:50%;border:2px solid #ffd700;object-fit:cover;" onerror="this.style.display='none'">
            <div>
              <div style="font-family:'Bangers',cursive;font-size:1.2rem;color:#ffd700;">${e.username||'Pirate'}</div>
              <div style="font-family:'Nunito',sans-serif;font-size:.75rem;color:rgba(255,255,255,.4);">${e.date_naissance ? new Date(e.date_naissance).toLocaleDateString('fr-FR') : 'Âge non renseigné'}</div>
            </div>
          </div>
          <div style="font-family:'Nunito',sans-serif;font-size:.82rem;color:rgba(255,255,255,.6);">📚 Îles complétées : <strong style="color:#ffd700">${completed} / 8</strong></div>
          <div style="font-family:'Nunito',sans-serif;font-size:.82rem;color:rgba(255,255,255,.6);">⭐ XP total : <strong style="color:#ffd700">${xpTotal}</strong></div>
        </div>`;
      }).join('')
    : `<div style="font-family:'Nunito',sans-serif;color:rgba(255,255,255,.35);font-size:.9rem;text-align:center;padding:20px;">Aucun enfant lié pour l'instant.<br><span style="font-size:.8rem;">Ton enfant doit renseigner ton email lors de son inscription.</span></div>`;

  dash.innerHTML = `
    <div style="font-family:'Bangers',cursive;font-size:2.2rem;color:#3b82f6;letter-spacing:3px;text-align:center;">👨‍👩‍👧 TABLEAU DE BORD CAPITAINE</div>
    <div style="background:rgba(0,0,0,0.4);border:2px solid rgba(59,130,246,.25);border-radius:16px;padding:20px 24px;width:min(480px,90vw);box-sizing:border-box;">
      <div style="font-family:'Bangers',cursive;font-size:1rem;color:rgba(255,255,255,.5);letter-spacing:2px;margin-bottom:10px;">⚓ PROFIL CAPITAINE</div>
      <div style="font-family:'Nunito',sans-serif;color:#fff;font-size:1rem;font-weight:800;">${parentProfile.prenom} ${parentProfile.nom}</div>
      <div style="font-family:'Nunito',sans-serif;color:rgba(255,255,255,.45);font-size:.85rem;margin-top:4px;">📧 ${parentProfile.email}${parentProfile.phone ? `<br>📱 ${parentProfile.phone}` : ''}</div>
    </div>
    <div style="font-family:'Bangers',cursive;font-size:1.4rem;color:#ffd700;letter-spacing:2px;">🧒 MES AVENTURIERS</div>
    <div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;width:100%;max-width:700px;">${cardsHTML}</div>
    <button onclick="sbSignOut()" style="font-family:'Bangers',cursive;font-size:1rem;letter-spacing:2px;padding:10px 24px;border-radius:12px;border:2px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.35);cursor:pointer;margin-top:8px;">👋 SE DÉCONNECTER</button>
  `;
}

// ═══════════════════════════════════════
// ENFANT CONNU → JEU DIRECT
// ═══════════════════════════════════════

async function handleEnfant(user, profile) {
  playerData = {
    name: profile.username || 'Pirate',
    avatarId: profile.avatar_id || 'luffy',
    avatarImg: 'assets/images/avatars/' + (profile.avatar_id || 'luffy') + '.png',
    avatarColor: '#e63946',
    avatarQuote: '',
    charName: profile.avatar_id || 'Luffy'
  };
  playerName = playerData.name;
  updateHeaderAvatar();
  showToast('🏴‍☠️ Bon retour ' + playerData.name + ' !');
  navigateTo('carte');
}

// ═══════════════════════════════════════
// POSITION LOGIN
// ═══════════════════════════════════════

function positionLoginScreen() {
  // Avec body.login-active, le header est masqué donc login = inset:0
  const login = document.getElementById('login-screen');
  if (!login) return;
  login.style.top    = '0';
  login.style.height = '100vh';
}

window.addEventListener('load',   positionLoginScreen);
window.addEventListener('resize', positionLoginScreen);

document.addEventListener('DOMContentLoaded', sbInit);