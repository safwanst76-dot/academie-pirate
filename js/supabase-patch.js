// ═══════════════════════════════════════════════════════════════
// SUPABASE-PATCH.JS v2 — Académie Pirate
// ─ Corrige le conflit d'ordre de chargement
// ─ Court-circuite handleSignedIn / handleParent de supabase.js
// ─ Doit être chargé EN DERNIER dans index.html
// ═══════════════════════════════════════════════════════════════

// ── 1. Attendre que le DOM soit prêt puis patcher ──
(function() {

  // Patch sbInit : remplace la version de supabase.js
  window.sbInit = async function() {
    // Gérer le magic link (access_token dans le hash)
    if (window.location.hash.includes('access_token')) {
      console.log('🔑 [patch] Magic link détecté — attente Supabase…');
      await new Promise(function(resolve) {
        var checks = 0;
        var iv = setInterval(function() {
          checks++;
          if (!window.location.hash.includes('access_token') || checks > 80) {
            clearInterval(iv);
            resolve();
          }
        }, 100);
      });
    }
    // Lancer le nouveau flux auth
    if (typeof afInit === 'function') {
      await afInit();
    } else {
      console.error('[patch] afInit introuvable — vérifier auth.js');
    }
  };

  // ── 2. Court-circuiter handleSignedIn et handleParent de supabase.js ──
  // Ces fonctions sont appelées par l'ancien sbInit — on les neutralise
  window.handleSignedIn = async function(user) {
    console.log('[patch] handleSignedIn intercepté → afInit gère');
    // Ne rien faire ici, afInit s'en occupe via onAuthStateChange
  };

  window.handleParent = async function(user, profile) {
    console.log('[patch] handleParent intercepté → afInit gère');
  };

  window.handleEnfant = async function(user, profile) {
    console.log('[patch] handleEnfant intercepté → afInit gère');
  };

  // ── 3. Patcher sbSendMagicLink ──
  window.sbSendMagicLink = async function() {
    var emailEl = document.getElementById('loginEmail');
    var email   = emailEl ? emailEl.value.trim() : '';

    if (!email || !email.includes('@')) {
      if (typeof showToast === 'function') showToast('⚠️ Entre un email valide !');
      return;
    }

    var btn = document.querySelector('.login-btn');
    if (btn) { btn.textContent = '⏳ Envoi en cours…'; btn.disabled = true; }

    // Vérifier si le parent existe déjà
    var existRes = await sb.from('profiles_parents')
      .select('id, prenom').eq('email', email).maybeSingle();
    var isExisting = !!(existRes.data);

    var result = await sb.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'https://safwanst76-dot.github.io/academie-pirate',
        shouldCreateUser: true
      }
    });

    if (btn) { btn.disabled = false; btn.textContent = '🚀 ENVOYER LE LIEN MAGIQUE !'; }

    if (result.error) {
      if (typeof showToast === 'function') showToast('❌ ' + result.error.message);
      return;
    }

    // Afficher step 2 avec message adapté
    var step1 = document.getElementById('loginStep1');
    var step2 = document.getElementById('loginStep2');
    if (step1) step1.style.display = 'none';
    if (step2) {
      step2.style.display        = 'flex';
      step2.style.flexDirection  = 'column';
      step2.style.gap            = '14px';
      step2.style.alignItems     = 'center';
      var titleEl = step2.querySelector('.login-step2-title');
      var textEl  = step2.querySelector('.login-step2-text');
      if (titleEl) titleEl.textContent = isExisting
        ? '🔗 Lien de connexion envoyé !'
        : '🏴‍☠️ Lien de création envoyé !';
      if (textEl) textEl.textContent = isExisting
        ? 'Capitaine, vérifie ta boîte mail pour te reconnecter !'
        : 'Un lien magique t\'attend dans ta boîte mail. Clique dessus pour créer ton compte !';
    }
  };

  // ── 4. Patcher skipLogin ──
  window.skipLogin = function() {
    document.body.classList.remove('login-active');
    var loginScreen = document.getElementById('login-screen');
    if (loginScreen) loginScreen.classList.add('gone');
    var avatarScreen = document.getElementById('avatar-screen');
    if (avatarScreen) { avatarScreen.classList.remove('gone'); avatarScreen.style.display = ''; }
  };

  // ── 5. Patcher handleLogout ──
  window.handleLogout = function() {
    if (typeof afSignOut === 'function') afSignOut();
  };

  // ── 6. Alias showParentDashboard → afShowParentDashboard ──
  // Attendre que afShowParentDashboard soit défini (auth.js chargé avant)
  window.showParentDashboard = function() {
    if (typeof afShowParentDashboard === 'function') {
      return afShowParentDashboard();
    }
  };

  // ── 7. Patcher router.js : son navigateTo('parent') doit appeler afShowParentDashboard ──
  // router.js définit ROUTES['parent'] = showParentDashboard
  // On repatche après le chargement complet
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof ROUTES !== 'undefined') {
      ROUTES['parent'] = function() {
        if (typeof afShowParentDashboard === 'function') {
          afShowParentDashboard();
        }
      };
      console.log('[patch] ROUTES.parent repatché');
    }

    // Lancer sbInit (remplace le DOMContentLoaded de supabase.js)
    // supabase.js appelle sbInit dans son propre DOMContentLoaded
    // On n'a pas besoin de le rappeler ici — la version patchée sera appelée
  });

  console.info('🏴‍☠️ supabase-patch.js v2 chargé');

})();


// ════════════════════════════════════════════════════════════
// CORRECTION auth.js (auth-flow.js) :
// _authUser était null car afInit() était appelé AVANT que
// Supabase ait restauré la session depuis le magic link.
// On corrige _handleSignedIn pour toujours récupérer l'user
// depuis la session active si _authUser est null.
// ════════════════════════════════════════════════════════════