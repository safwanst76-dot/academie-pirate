// ═══════════════════════════════════════════════════════════════
// SUPABASE.JS — Académie Pirate
// ─ Initialisation client Supabase + helpers bas niveau
// ─ L'auth flow est entièrement géré par auth.js (afInit)
// ─ Les fonctions sbInit / handleSignedIn / handleParent ci-dessous
//   sont des stubs vides — elles sont remplacées par supabase-patch.js
//   qui les redirige vers afInit() de auth.js.
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL      = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHpycXN2Y2NxbXp2b25zc3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzQyMTgsImV4cCI6MjA4ODU1MDIxOH0.mHXhN4MjZeDz_WWXxCMUInATpTEUiHxvrvEunoSpYFU';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.sb                = sb;
window.SUPABASE_URL      = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

// ═══════════════════════════════════════
// HELPERS AUTH
// ═══════════════════════════════════════

async function sbGetUser() {
  try {
    const { data } = await sb.auth.getUser();
    return data.user || null;
  } catch (e) { return null; }
}

async function sbGetProfile(userId) {
  try {
    const { data } = await sb.from('profiles').select('*').eq('id', userId).single();
    return data || null;
  } catch (e) { return null; }
}

async function sbGetParentProfile(userId) {
  try {
    const { data } = await sb.from('profiles_parents').select('*').eq('id', userId).maybeSingle();
    return data || null;
  } catch (e) { return null; }
}

async function sbSignOut() {
  try { await sb.auth.signOut(); } catch (_) {}
  if (typeof showToast === 'function') showToast('👋 À bientôt !');
  setTimeout(() => location.reload(), 400);
}

// ═══════════════════════════════════════
// STUBS LEGACY — remplacés par supabase-patch.js
// NE PAS SUPPRIMER : d'autres scripts peuvent les appeler.
// supabase-patch.js les remplace par les versions correctes
// qui délèguent à afInit() de auth.js.
// ═══════════════════════════════════════

// sbInit est appelé par DOMContentLoaded ci-dessous.
// supabase-patch.js le remplace pour appeler afInit().
async function sbInit() {
  // Stub — sera remplacé par supabase-patch.js
  // Si ce stub est exécuté (cas exceptionnel), déléguer à afInit.
  if (typeof afInit === 'function') {
    await afInit();
  } else {
    console.warn('[supabase.js] sbInit stub — afInit non disponible');
  }
}

// Ces fonctions sont neutralisées par supabase-patch.js.
// On les définit ici comme stubs silencieux pour éviter les
// "not defined" errors si elles sont appelées avant le patch.
async function handleSignedIn(user) {
  // Stub — neutralisé par supabase-patch.js → afInit gère
}

async function handleParent(user, parentProfile) {
  // Stub — neutralisé par supabase-patch.js → auth.js gère
}

async function handleEnfant(user, profile) {
  // Stub — neutralisé par supabase-patch.js → auth.js gère
}

// sbSendMagicLink est remplacé par supabase-patch.js.
// Stub minimal ici pour éviter les erreurs si patch non chargé.
async function sbSendMagicLink() {
  console.warn('[supabase.js] sbSendMagicLink stub — supabase-patch.js non chargé ?');
}

// showParentDashboard est remplacé par supabase-patch.js → afShowParentDashboard.
function showParentDashboard() {
  if (typeof afShowParentDashboard === 'function') afShowParentDashboard();
}

// ═══════════════════════════════════════
// BADGE AVATAR LOGIN (haut gauche)
// ═══════════════════════════════════════

function updateLoginAvatarBadge() {
  let badge = document.getElementById('login-avatar-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'login-avatar-badge';
    badge.innerHTML = `
      <img src="assets/images/avatars/luffy.png" alt="avatar" id="labImg"
           onerror="this.src='assets/images/avatars/luffy.png'">
      <div class="lab-info">
        <div class="lab-name" id="labName">Pirate</div>
        <div class="lab-sub">Moussaillon</div>
      </div>`;
    document.body.appendChild(badge);
  }

  let player = null;
  try { player = JSON.parse(localStorage.getItem('ap_player')); } catch (_) {}

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
// POSITION LOGIN SCREEN
// ═══════════════════════════════════════

function positionLoginScreen() {
  const login = document.getElementById('login-screen');
  if (!login) return;
  login.style.top    = '0';
  login.style.height = '100vh';
}

window.addEventListener('load',   positionLoginScreen);
window.addEventListener('resize', positionLoginScreen);

// ── DOMContentLoaded : appeler sbInit (qui sera patché par supabase-patch.js) ──
document.addEventListener('DOMContentLoaded', sbInit);

console.info('🏴‍☠️ supabase.js chargé — client Supabase initialisé');