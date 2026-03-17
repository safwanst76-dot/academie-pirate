// ═══════════════════════════════════════════════════════════════
// SUPABASE-PATCH.JS — Académie Pirate
// Remplace sbInit() et les fonctions auth de supabase.js
// Brancher auth-flow.js au lieu de l'ancien code.
//
// INSTRUCTIONS :
// 1. Dans index.html, AVANT </body>, ajouter :
//    <script src="js/auth-flow.js"></script>
//    <script src="js/supabase-patch.js"></script>
// 2. Ajouter à index.html la colonne pin_hash dans la table child_profiles Supabase :
//    ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS pin_hash TEXT;
//    (ou laisser la colonne 'pin' existante — auth-flow.js utilise les deux)
// ═══════════════════════════════════════════════════════════════

// ── Patcher le Magic Link handler dans router.js ──
// router.js intercepte #access_token et navigue vers 'parent'
// On garde ce comportement MAIS on laisse afInit() gérer la suite

// ── Patcher sbInit pour utiliser auth-flow.js ──
window.sbInit = async function() {
  // Laisser Supabase traiter le magic link (access_token dans l'URL)
  if (window.location.hash.includes('access_token')) {
    console.log('🔑 Magic link — attente Supabase…');
    // attendre que Supabase nettoie le hash
    await new Promise(function(resolve) {
      var checks = 0;
      var interval = setInterval(function() {
        checks++;
        if (!window.location.hash.includes('access_token') || checks > 50) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }
  // Lancer auth-flow
  await afInit();
};

// ── Patcher sbSendMagicLink pour détecter email déjà existant ──
window.sbSendMagicLink = async function() {
  var emailEl = document.getElementById('loginEmail');
  var email = emailEl ? emailEl.value.trim() : '';

  if (!email || !email.includes('@')) {
    if (typeof showToast === 'function') showToast('⚠️ Entre un email valide !');
    return;
  }

  var btn = document.querySelector('.login-btn');
  if (btn) { btn.textContent = '⏳ Envoi en cours…'; btn.disabled = true; }

  // Vérifier si le parent existe déjà (pour le message d'accueil)
  var existingRes = await sb.from('profiles_parents')
    .select('id, prenom').eq('email', email).maybeSingle();
  var isExisting = !!(existingRes.data);

  var { error } = await sb.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: 'https://safwanst76-dot.github.io/academie-pirate',
      shouldCreateUser: true
    }
  });

  if (btn) { btn.disabled = false; btn.textContent = '🚀 ENVOYER LE LIEN MAGIQUE !'; }

  if (error) {
    if (typeof showToast === 'function') showToast('❌ ' + error.message);
    return;
  }

  // Afficher le step 2 avec message adapté
  var step1 = document.getElementById('loginStep1');
  var step2 = document.getElementById('loginStep2');
  if (step1) step1.style.display = 'none';
  if (step2) {
    step2.style.display = 'flex';
    step2.style.flexDirection = 'column';
    step2.style.gap = '14px';
    step2.style.alignItems = 'center';

    var titleEl = step2.querySelector('.login-step2-title');
    var textEl  = step2.querySelector('.login-step2-text');
    if (titleEl) titleEl.textContent = isExisting ? '🔗 Lien de connexion envoyé !' : '🏴‍☠️ Lien de création envoyé !';
    if (textEl)  textEl.textContent  = isExisting
      ? 'Capitaine, vérifie ta boîte mail pour te reconnecter !'
      : 'Un lien magique t\'attend dans ta boîte mail. Clique dessus pour créer ton compte !';
  }
};

// ── Patcher skipLogin ──
window.skipLogin = function() {
  document.body.classList.remove('login-active');
  var loginScreen = document.getElementById('login-screen');
  if (loginScreen) loginScreen.classList.add('gone');
  var avatarScreen = document.getElementById('avatar-screen');
  if (avatarScreen) { avatarScreen.classList.remove('gone'); avatarScreen.style.display = ''; }
};

// ── Patcher handleLogout ──
window.handleLogout = function() { afSignOut(); };

// ── Exposer les anciennes fonctions pour compatibilité ──
window.showParentDashboard = afShowParentDashboard;

console.info('🏴‍☠️ supabase-patch.js chargé — auth-flow.js branché');