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
document.addEventListener('DOMContentLoaded', sbInit);