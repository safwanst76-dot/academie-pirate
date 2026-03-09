// ═══════════════════════════════════════
// SUPABASE — Académie Pirate
// ═══════════════════════════════════════

const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHpycXN2Y2NxbXp2b25zc3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzQyMTgsImV4cCI6MjA4ODU1MDIxOH0.mHXhN4MjZeDz_WWXxCMUInATpTEUiHxvrvEunoSpYFU';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ═══════════════════════════════════════
// AUTH
// ═══════════════════════════════════════

async function sbGetUser() {
  const { data } = await sb.auth.getUser();
  return data.user || null;
}

async function sbGetProfile(userId) {
  const { data } = await sb.from('profiles').select('*').eq('id', userId).single();
  return data;
}

async function sbSignOut() {
  await sb.auth.signOut();
  showToast('👋 À bientôt !');
  location.reload();
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
  document.getElementById('loginStep1').style.display = 'flex';
  document.getElementById('loginStep1').style.flexDirection = 'column';
  document.getElementById('loginStep1').style.gap = '14px';
  document.getElementById('loginStep2').style.display = 'none';
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

// ─── Jouer sans compte (mode invité) ───
function skipLogin() {
  document.getElementById('login-screen').classList.add('gone');
  document.getElementById('pirate-nav')?.classList.add('visible');
  var avatarScreen = document.getElementById('avatar-screen');
  if (avatarScreen) avatarScreen.classList.remove('gone');
  navigateTo('carte');
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════

async function sbInit() {
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

  document.getElementById('login-screen').classList.remove('gone');
}

async function handleSignedIn(user) {
  document.getElementById('login-screen').classList.add('gone');
  document.getElementById('pirate-nav')?.classList.add('visible');

  let profile = await sbGetProfile(user.id);

  if (!profile) {
    // Nouvel utilisateur → créer profil + afficher écran avatar
    await sb.from('profiles').insert({
      id: user.id,
      username: user.email.split('@')[0],
      avatar_id: 'luffy'
    });
    var avatarScreen = document.getElementById('avatar-screen');
    if (avatarScreen) avatarScreen.classList.remove('gone');
  } else {
    // Utilisateur connu → restaurer données + sélection enfant
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
    showChildSelect();
  }
}

document.addEventListener('DOMContentLoaded', sbInit);

// ═══════════════════════════════════════
// POSITION LOGIN SOUS LE HEADER
// ═══════════════════════════════════════

function positionLoginScreen() {
  const header = document.querySelector('header');
  const login = document.getElementById('login-screen');
  if (!header || !login) return;
  const h = header.getBoundingClientRect().bottom;
  login.style.top = (h + 20) + 'px';
  login.style.height = `calc(100vh - ${h + 20}px)`;
}

window.addEventListener('load', positionLoginScreen);
window.addEventListener('resize', positionLoginScreen);