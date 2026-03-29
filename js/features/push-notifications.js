// ═══════════════════════════════════════════════════════════════
// PUSH-NOTIFICATIONS.JS — Académie Pirate
// Demande la permission push + sauvegarde la subscription Supabase
// Chargé APRÈS auth.js dans index.html
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ── Clé publique VAPID ──
  var VAPID_PUBLIC_KEY = 'BC8OP1snKNOGp3PPfOQla6-0_ZUvy0yM5biayJHDP1ExLJOogXpfZgcZnETfLHzSQG191aqmY013Klv5LUSBsII';

  // ── Convertir la clé VAPID base64 → Uint8Array ──
  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    var raw     = window.atob(base64);
    var output  = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) { output[i] = raw.charCodeAt(i); }
    return output;
  }

  // ── Vérifier support navigateur ──
  function isPushSupported() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }

  // ── Enregistrer le Service Worker ──
  async function registerSW() {
    try {
      var reg = await navigator.serviceWorker.register('/academie-pirate/sw.js', { scope: '/academie-pirate/' });
      return reg;
    } catch(e) {
      console.warn('[Push] SW registration failed:', e.message);
      return null;
    }
  }

  // ── Sauvegarder la subscription dans Supabase ──
  async function saveSubscription(subscription, childId) {
    try {
      var db = typeof sb !== 'undefined' ? sb : null;
      if (!db) return;

      var subJson = subscription.toJSON();

      await db.from('push_subscriptions').upsert({
        child_id:  childId || null,
        endpoint:  subJson.endpoint,
        p256dh:    subJson.keys ? subJson.keys.p256dh   : null,
        auth:      subJson.keys ? subJson.keys.auth      : null,
        user_agent: navigator.userAgent.substring(0, 200),
        created_at: new Date().toISOString(),
      }, { onConflict: 'endpoint' });

      console.info('[Push] ✅ Subscription sauvegardée');
    } catch(e) {
      console.warn('[Push] Erreur sauvegarde:', e.message);
    }
  }

  // ── Demander la permission et s'abonner ──
  async function subscribePush() {
    if (!isPushSupported()) {
      console.info('[Push] Non supporté sur ce navigateur');
      return;
    }

    // Ne pas demander si déjà refusé
    if (Notification.permission === 'denied') return;

    // Attendre que le SW soit prêt
    var reg = await registerSW();
    if (!reg) return;

    try {
      // Vérifier si déjà abonné
      var existing = await reg.pushManager.getSubscription();
      if (existing) {
        console.info('[Push] Déjà abonné');
        // Resauvegarder au cas où la DB a été réinitialisée
        var childId = _getActiveChildId();
        await saveSubscription(existing, childId);
        return;
      }

      // Demander la permission
      var permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.info('[Push] Permission refusée');
        return;
      }

      // S'abonner
      var subscription = await reg.pushManager.subscribe({
        userVisibleOnly:      true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      console.info('[Push] ✅ Abonné aux notifications');

      // Sauvegarder dans Supabase
      var childId = _getActiveChildId();
      await saveSubscription(subscription, childId);

      // Afficher un toast de confirmation
      if (typeof showToast === 'function') {
        showToast('🔔 Notifications activées !');
      }

    } catch(e) {
      console.warn('[Push] Erreur subscription:', e.message);
    }
  }

  // ── Récupérer l'ID de l'enfant actif ──
  function _getActiveChildId() {
    try {
      if (typeof dbGetActiveChild === 'function') {
        var child = dbGetActiveChild();
        return child ? child.id : null;
      }
    } catch(e) {}
    return null;
  }

  // ── Point d'entrée — appelé après que l'enfant se connecte ──
  window.AP_Push = {
    init: subscribePush,
    isSupported: isPushSupported,
  };

  // Auto-init : déclencher 3 secondes après le chargement de la page
  // (laisser le temps à l'auth de se terminer)
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Ne demander qu'aux enfants connectés (pas sur l'écran login)
      if (document.body.classList.contains('login-active')) return;
      subscribePush();
    }, 3000);
  });

  console.info('🔔 push-notifications.js chargé');

})();
