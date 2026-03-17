// ═══════════════════════════════════════════════════════════════
// SUPABASE-PATCH.JS v3 — Académie Pirate
// ─ Doit être chargé EN DERNIER dans index.html (fin de <body>)
// ─ Court-circuite l'ancien flux auth de supabase.js
// ─ Branche router.js et parent.js sur auth.js (afInit)
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── 1. Remplacer sbInit ──
  // supabase.js appelle sbInit() au DOMContentLoaded.
  // On le redirige vers afInit() qui est le vrai point d'entrée (auth.js).
  window.sbInit = async function () {
    // Attendre que Supabase traite le magic link avant d'init l'auth
    if (window.location.hash.includes('access_token')) {
      console.log('🔑 [patch] Magic link détecté — attente Supabase…');
      await new Promise(function (resolve) {
        var checks = 0;
        var iv = setInterval(function () {
          checks++;
          if (!window.location.hash.includes('access_token') || checks > 80) {
            clearInterval(iv);
            resolve();
          }
        }, 100);
      });
    }
    if (typeof afInit === 'function') {
      await afInit();
    } else {
      console.error('[patch] afInit introuvable — vérifier l\'ordre de chargement de auth.js');
    }
  };

  // ── 2. Neutraliser les anciennes fonctions auth de supabase.js ──
  // Ces fonctions sont remplacées par le flux de auth.js.
  // On les rend inoffensives pour éviter les doubles exécutions.
  window.handleSignedIn = function (user) {
    // Géré par afInit() / onAuthStateChange dans auth.js
    console.log('[patch] handleSignedIn neutralisé — afInit gère');
  };

  window.handleParent = function (user, profile) {
    // Géré par _handleSignedIn dans auth.js
    console.log('[patch] handleParent neutralisé — auth.js gère');
  };

  window.handleEnfant = function (user, profile) {
    console.log('[patch] handleEnfant neutralisé — auth.js gère');
  };

  // ── 3. Remplacer sbSendMagicLink ──
  // Ajoute la distinction nouveau/existant et des messages adaptés.
  window.sbSendMagicLink = async function () {
    var emailEl = document.getElementById('loginEmail');
    var email   = emailEl ? emailEl.value.trim() : '';

    if (!email || !email.includes('@')) {
      if (typeof showToast === 'function') showToast('⚠️ Entre un email valide !');
      return;
    }

    var btn = document.querySelector('.login-btn');
    if (btn) { btn.textContent = '⏳ Envoi en cours…'; btn.disabled = true; }

    try {
      // Vérifier si le parent existe déjà
      var existRes = await sb.from('profiles_parents')
        .select('id').eq('email', email).maybeSingle();
      var isExisting = !!(existRes && existRes.data);

      var result = await sb.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: 'https://safwanst76-dot.github.io/academie-pirate',
          shouldCreateUser: true
        }
      });

      if (result.error) {
        if (typeof showToast === 'function') showToast('❌ ' + result.error.message);
        return;
      }

      // Basculer vers l'étape 2
      var step1 = document.getElementById('loginStep1');
      var step2 = document.getElementById('loginStep2');
      if (step1) step1.style.display = 'none';
      if (step2) {
        step2.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;';
        var titleEl = step2.querySelector('.login-step2-title');
        var textEl  = step2.querySelector('.login-step2-text');
        if (titleEl) titleEl.textContent = isExisting ? '🔗 Lien de connexion envoyé !' : '🏴‍☠️ Lien de création envoyé !';
        if (textEl)  textEl.textContent  = isExisting
          ? 'Capitaine, vérifie ta boîte mail pour te reconnecter !'
          : 'Un lien magique t\'attend dans ta boîte mail. Clique dessus pour créer ton compte !';
      }
    } catch (e) {
      if (typeof showToast === 'function') showToast('❌ ' + e.message);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '🚀 ENVOYER LE LIEN MAGIQUE !'; }
    }
  };

  // ── 4. Neutraliser skipLogin (géré par supabase-patch via router) ──
  window.skipLogin = function () {
    document.body.classList.remove('login-active');
    var loginScreen = document.getElementById('login-screen');
    if (loginScreen) loginScreen.classList.add('gone');
    var avatarScreen = document.getElementById('avatar-screen');
    if (avatarScreen) { avatarScreen.classList.remove('gone'); avatarScreen.style.display = ''; }
  };

  // ── 5. handleLogout → afSignOut ──
  window.handleLogout = function () {
    if (typeof afSignOut === 'function') afSignOut();
  };

  // ── 6. Alias showParentDashboard → afShowParentDashboard ──
  // NOTE : utilise typeof pour éviter ReferenceError si auth.js
  //        n'est pas encore chargé (ne devrait pas arriver si ordre correct).
  window.showParentDashboard = function () {
    if (typeof afShowParentDashboard === 'function') {
      return afShowParentDashboard();
    }
    console.error('[patch] afShowParentDashboard non disponible — vérifier auth.js');
  };

  // ── 7. Patcher ROUTES.parent une fois le DOM prêt ──
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof ROUTES !== 'undefined') {
      ROUTES['parent'] = function () {
        if (typeof afShowParentDashboard === 'function') {
          afShowParentDashboard();
        }
      };
      console.log('[patch] ROUTES.parent → afShowParentDashboard');
    }
  });

  // ── 8. switchLoginTab — gère 3 onglets : new | return | child ──
  window.switchLoginTab = function (tab) {
    var tabNew    = document.getElementById('tabNew');
    var tabReturn = document.getElementById('tabReturn');
    var tabChild  = document.getElementById('tabChild');
    var step1     = document.getElementById('loginStep1');
    var step2     = document.getElementById('loginStep2');
    var childForm = document.getElementById('loginChildForm');
    var label     = document.getElementById('loginFormLabel');
    var hint      = document.getElementById('loginFormHint');

    [tabNew, tabReturn, tabChild].forEach(function(t){ if(t) t.classList.remove('active'); });
    if (step1)     step1.style.display     = 'none';
    if (step2)     step2.style.display     = 'none';
    if (childForm) childForm.style.display = 'none';

    if (tab === 'child') {
      if (tabChild)  tabChild.classList.add('active');
      if (childForm) { childForm.style.display = 'flex'; childForm.style.flexDirection = 'column'; childForm.style.gap = '14px'; }
      if (typeof afLoginChildByPin === 'function') afLoginChildByPin();
    } else {
      if (tab === 'new') {
        if (tabNew) tabNew.classList.add('active');
        if (label)  label.textContent = '⚓ Ton email de pirate';
        if (hint)   hint.textContent  = 'Tu recevras un lien par email — pas de mot de passe !';
      } else {
        if (tabReturn) tabReturn.classList.add('active');
        if (label)     label.textContent = '⚓ Ton email capitaine';
        if (hint)      hint.textContent  = 'On t\'envoie un lien de connexion instantané !';
      }
      if (step1) { step1.style.display = 'flex'; step1.style.flexDirection = 'column'; step1.style.gap = '12px'; }
      var emailInp = document.getElementById('loginEmail');
      if (emailInp) setTimeout(function(){ emailInp.focus(); }, 80);
    }
  };

  // ── 9. loginPinInput / loginPinKey — navigation cases PIN ──
  window.loginPinInput = function (e, idx) {
    var val = e.target.value.replace(/\D/g, '');
    e.target.value = val.slice(-1);
    if (val && idx < 5) {
      var next = document.getElementById('login-child-pin-' + (idx + 1));
      if (next) next.focus();
    }
    var pin = '';
    for (var i = 0; i < 6; i++) { var ip = document.getElementById('login-child-pin-' + i); pin += ip ? (ip.value||'') : ''; }
    if (pin.length === 6) setTimeout(function(){ if (typeof afSubmitChildPinLogin === 'function') afSubmitChildPinLogin(); }, 120);
  };

  window.loginPinKey = function (e, idx) {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      var prev = document.getElementById('login-child-pin-' + (idx - 1));
      if (prev) { prev.value = ''; prev.focus(); }
    }
    if (e.key === 'Enter') { if (typeof afSubmitChildPinLogin === 'function') afSubmitChildPinLogin(); }
  };

  // ── 10. Patch audio Grand Bleu → Supabase Storage ──
  // Bucket : grand-bleu (public)
  // URL base : https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/grand-bleu/
  //
  // Fichiers à uploader dans le bucket (depuis assets/audio/bgm/) :
  //   map-theme.mp3   → renommer en  map.mp3
  //   battle-theme.mp3→ renommer en  battle.mp3
  //   victory-theme.mp3→ renommer en victory.mp3
  //   defeat-theme.mp3 → renommer en defeat.mp3
  //   isle-1.mp3 … isle-8.mp3 (noms déjà bons)
  //
  var _GB = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/grand-bleu/';
  var _GRAND_BLEU_BGM = {
    // Îles (déclenchées par quiz.js → playBGM('isle-N'))
    'isle-1': _GB + 'isle-1.mp3',
    'isle-2': _GB + 'isle-2.mp3',
    'isle-3': _GB + 'isle-3.mp3',
    'isle-4': _GB + 'isle-4.mp3',
    'isle-5': _GB + 'isle-5.mp3',
    'isle-6': _GB + 'isle-6.mp3',
    'isle-7': _GB + 'isle-7.mp3',
    'isle-8': _GB + 'isle-8.mp3',
    // Navigation (déclenchées par router.js + quiz.js)
    'map':     _GB + 'map.mp3',
    'battle':  _GB + 'battle.mp3',
    'victory': _GB + 'victory.mp3',
    'defeat':  _GB + 'defeat.mp3',
  };

  // Exécution immédiate : supabase-patch.js est chargé en fin de <body>
  // → DOMContentLoaded est déjà passé, addEventListener ne déclencherait jamais.
  (function () {
    var _origPlayBGM = window.playBGM;
    var _origStopBGM = window.stopBGM;
    var _origSetVol  = window.setVolume;
    window._isleAudio = null;

    window.playBGM = function (track, loop) {
      var url = _GRAND_BLEU_BGM[track];

      // Pas une île Grand Bleu → laisser les patches Kanto/DBZ gérer normalement
      if (!url) {
        if (typeof _origPlayBGM === 'function') _origPlayBGM(track, loop);
        return;
      }

      // Déjà en cours → ne rien refaire
      if (window._isleAudio && window._isleAudio.src === url && !window._isleAudio.paused) return;

      // Stopper l'audio île précédent
      if (window._isleAudio) {
        try { window._isleAudio.pause(); window._isleAudio.currentTime = 0; } catch(e) {}
        window._isleAudio = null;
      }

      var audio = new Audio(url);
      audio.loop   = (loop !== false);
      audio.volume = (typeof masterVol !== 'undefined' ? masterVol : 0.5) * 0.35;
      window._isleAudio = audio;
      audio.play().catch(function (e) {
        console.warn('[Grand Bleu BGM] autoplay bloqué, attente clic :', e.message);
        // Réessayer au premier clic
        document.addEventListener('click', function _retry() {
          audio.play().catch(function(){});
          document.removeEventListener('click', _retry);
        }, { once: true });
      });
    };

    // Patcher stopBGM pour inclure l'audio des îles Grand Bleu
    window.stopBGM = function () {
      if (window._isleAudio) {
        try { window._isleAudio.pause(); window._isleAudio.currentTime = 0; } catch(e) {}
        window._isleAudio = null;
      }
      if (typeof _origStopBGM === 'function') _origStopBGM();
    };

    // Patcher setVolume pour les îles Grand Bleu
    window.setVolume = function (v) {
      if (window._isleAudio) window._isleAudio.volume = parseFloat(v) * 0.35;
      if (typeof _origSetVol === 'function') _origSetVol(v);
    };

    console.info('🏴‍☠️ [Grand Bleu BGM] isle-1..8 → Supabase Storage');
  })();

  console.info('🏴‍☠️ supabase-patch.js v3 chargé — auth.js branché');
})();