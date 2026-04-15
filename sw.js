// ═══════════════════════════════════════════════════════════════
// SW.JS — Service Worker Académie Pirate
// Gère les Web Push notifications
// ⚠️ Doit être à la RACINE du projet (pas dans /js/)
// ═══════════════════════════════════════════════════════════════

var APP_NAME = '🏴‍☠️ Académie Pirate';

// ── Réception d'une notification push ──
self.addEventListener('push', function(event) {
  if (!event.data) return;

  var data = {};
  try { data = event.data.json(); } catch(e) { data = { title: APP_NAME, body: event.data.text() }; }

  var title   = data.title   || APP_NAME;
  var options = {
    body:    data.body    || 'Nouvelle mise à jour disponible !',
    icon:    data.icon    || '/academie-pirate/assets/images/ui/icon-192.png',
    badge:   data.badge   || '/academie-pirate/assets/images/ui/icon-72.png',
    image:   data.image   || null,
    data:    { url: data.url || 'https://aca-pirate.ch/' },
    actions: [
      { action: 'open',    title: '⚔️ Jouer maintenant' },
      { action: 'dismiss', title: '✕ Plus tard'         }
    ],
    vibrate:   [200, 100, 200],
    requireInteraction: false,
    tag:      data.tag || 'academie-pirate',
    renotify: true,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ── Clic sur la notification ──
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'dismiss') return;

  var url = (event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : 'https://aca-pirate.ch/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      // Si l'app est déjà ouverte → focus
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.includes('academie-pirate') && 'focus' in list[i]) {
          return list[i].focus();
        }
      }
      // Sinon ouvrir un nouvel onglet
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── Install / Activate ──
self.addEventListener('install',  function() { self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(clients.claim()); });

console.log('[SW] Service Worker Académie Pirate chargé');
