// ═══════════════════════════════════════
// SUPABASE — Académie Pirate
// ═══════════════════════════════════════

const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHpycXN2Y2NxbXp2b25zc3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzQyMTgsImV4cCI6MjA4ODU1MDIxOH0.mHXhN4MjZeDz_WWXxCMUInATpTEUiHxvrvEunoSpYFU';

// Chargement du SDK Supabase (à ajouter dans index.html avant ce script)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ═══════════════════════════════════════
// AUTH — Inscription / Connexion
// ═══════════════════════════════════════

async function sbSignUp(email, password, username, avatarId) {
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) { showToast('❌ ' + error.message); return null; }

  // Créer le profil
  await sb.from('profiles').insert({
    id: data.user.id,
    username: username,
    avatar_id: avatarId || 'luffy'
  });

  showToast('✅ Compte créé ! Bienvenue ' + username + ' !');
  return data.user;
}

async function sbSignIn(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) { showToast('❌ Email ou mot de passe incorrect'); return null; }
  showToast('✅ Connecté ! Bon voyage ' + (data.user.email) + ' !');
  return data.user;
}

async function sbSignOut() {
  await sb.auth.signOut();
  showToast('👋 À bientôt !');
  location.reload();
}

async function sbGetUser() {
  const { data } = await sb.auth.getUser();
  return data.user || null;
}

async function sbGetProfile(userId) {
  const { data } = await sb.from('profiles').select('*').eq('id', userId).single();
  return data;
}

// ═══════════════════════════════════════
// PROGRESSION — Sauvegarde / Chargement
// ═══════════════════════════════════════

async function sbSaveProgression(isleId, xp, completed) {
  const user = await sbGetUser();
  if (!user) return; // pas connecté → on ignore

  const { data: existing } = await sb
    .from('progression')
    .select('id')
    .eq('user_id', user.id)
    .eq('isle_id', isleId)
    .single();

  if (existing) {
    // Mise à jour
    await sb.from('progression').update({
      xp: xp,
      completed: completed,
      updated_at: new Date().toISOString()
    }).eq('id', existing.id);
  } else {
    // Création
    await sb.from('progression').insert({
      user_id: user.id,
      isle_id: isleId,
      xp: xp,
      completed: completed
    });
  }
}

async function sbLoadProgression() {
  const user = await sbGetUser();
  if (!user) return null;

  const { data } = await sb
    .from('progression')
    .select('*')
    .eq('user_id', user.id);

  return data; // tableau de toutes les îles
}

// ═══════════════════════════════════════
// INIT — Au chargement de la page
// ═══════════════════════════════════════

async function sbInit() {
  const user = await sbGetUser();
  if (!user) return;

  const profile = await sbGetProfile(user.id);
  if (!profile) return;

  // Restaurer le joueur depuis Supabase
  playerData = {
    name: profile.username || 'Pirate',
    avatarId: profile.avatar_id || 'luffy',
    avatarImg: 'assets/images/avatars/' + (profile.avatar_id || 'luffy') + '.png',
    avatarColor: '#e63946',
    avatarQuote: '',
    charName: profile.avatar_id || 'Luffy'
  };
  playerName = playerData.name;

  // Charger la progression depuis Supabase
  const prog = await sbLoadProgression();
  if (prog && prog.length > 0) {
    // Fusionner avec localStorage existant
    prog.forEach(p => {
      try {
        const key = progressKey();
        let local = JSON.parse(localStorage.getItem(key) || '{}');
        local['isle_' + p.isle_id] = { xp: p.xp, completed: p.completed };
        localStorage.setItem(key, JSON.stringify(local));
      } catch(e) {}
    });
  }

  updateHeaderAvatar();
  showToast('🏴‍☠️ Bon retour ' + playerData.name + ' !');
}

// Lancer au démarrage
document.addEventListener('DOMContentLoaded', sbInit);const LOGIN_GIFS = [
  "https://media.giphy.com/media/SJXzadwbexJEAZ9S1B/giphy.gif",
  "https://media.giphy.com/media/9VnXVHOIJgwnfNTK7Q/giphy.gif",
  "https://media.giphy.com/media/2i4xbkUhHrOuY/giphy.gif",
  "https://media.giphy.com/media/IjqnkYbnr6aHe/giphy.gif",
];
document.addEventListener("DOMContentLoaded", function() {
  var gifEl = document.getElementById("loginGif");
  if (gifEl) gifEl.src = LOGIN_GIFS[Math.floor(Math.random() * LOGIN_GIFS.length)];
});


// ── Afficher/cacher les étapes du login ──
function showLoginStep1() {
  document.getElementById('loginStep1').style.display = 'flex';
  document.getElementById('loginStep1').style.flexDirection = 'column';
  document.getElementById('loginStep1').style.gap = '14px';
  document.getElementById('loginStep2').style.display = 'none';
}

// ── Envoyer le magic link ──
async function sbSendMagicLink() {
  const email = document.getElementById('loginEmail').value.trim();
  if (!email || !email.includes('@')) {
    showToast('⚠️ Entre un email valide !'); return;
  }
  const btn = document.querySelector('.login-btn');
  btn.textContent = '⏳ Envoi en cours…'; btn.disabled = true;

  const { error } = await sb.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "https://safwanst76-dot.github.io/academie-pirate"
    }
  });

  btn.disabled = false; btn.textContent = '🚀 ENVOYER LE LIEN MAGIQUE !';

  if (error) { showToast('❌ ' + error.message); return; }

  // Afficher confirmation
  document.getElementById('loginStep1').style.display = 'none';
  document.getElementById('loginStep2').style.display = 'flex';
  document.getElementById('loginStep2').style.flexDirection = 'column';
  document.getElementById('loginStep2').style.gap = '14px';
  document.getElementById('loginStep2').style.alignItems = 'center';
}

// ── Jouer sans compte (mode invité) ──
function skipLogin() {
  document.getElementById('login-screen').classList.add('gone');
  document.getElementById('pirate-nav')?.classList.add('visible');;
  // Afficher l'écran avatar comme avant
  var avatarScreen = document.getElementById('avatar-screen');
  if (avatarScreen) avatarScreen.classList.remove('gone'); navigateTo('carte');;
}

// ── Init Supabase au chargement ──
async function sbInit() {
  // Écouter les changements de session (retour depuis magic link)
  sb.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      await handleSignedIn(session.user);
    }
  });

  // Vérifier si déjà connecté
  const user = await sbGetUser();
  if (user) {
    await handleSignedIn(user);
    return;
  }

  // Sinon afficher le login
  document.getElementById('login-screen').classList.remove('gone');
}

// ── Gérer l'utilisateur connecté ──
async function handleSignedIn(user) {
  // Masquer login
  document.getElementById('login-screen').classList.add('gone');
  document.getElementById('pirate-nav')?.classList.add('visible');;

  // Récupérer ou créer le profil
  let profile = await sbGetProfile(user.id);
  if (!profile) {
    // Nouvel utilisateur → créer profil
    await sb.from('profiles').insert({
      id: user.id,
      username: user.email.split('@')[0],
      avatar_id: 'luffy'
    });
    profile = { username: user.email.split('@')[0], avatar_id: 'luffy' };
    // Afficher l'écran avatar pour choisir son perso
    var avatarScreen = document.getElementById('avatar-screen');
    if (avatarScreen) avatarScreen.classList.remove('gone'); navigateTo('carte');;
  } else {
    // Utilisateur connu → charger ses données
    playerData = {
      name: profile.username || 'Pirate',
      avatarId: profile.avatar_id || 'luffy',
      avatarImg: 'assets/images/avatars/' + (profile.avatar_id || 'luffy') + '.png',
      avatarColor: '#e63946', avatarQuote: '', charName: profile.avatar_id || 'Luffy'
    };
    playerName = playerData.name;
    updateHeaderAvatar();
    showToast('🏴‍☠️ Bon retour ' + playerData.name + ' !');

    // Charger progression depuis Supabase
    const prog = await sbLoadProgression();
    if (prog && prog.length > 0) {
      prog.forEach(p => {
        try {
          let local = JSON.parse(localStorage.getItem(progressKey()) || '{}');
          local['isle_' + p.isle_id] = { xp: p.xp, completed: p.completed };
          localStorage.setItem(progressKey(), JSON.stringify(local));
        } catch(e) {}
      });
    }
  }
}

// Lancer au démarrage
document.addEventListener('DOMContentLoaded', sbInit);

