// ═══════════════════════════════════════════════════════════════
// EDGE FUNCTION : send-push — Académie Pirate
// Envoie des Web Push notifications à tous les abonnés
// ═══════════════════════════════════════════════════════════════

/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const VAPID_PUBLIC_KEY  = Deno.env.get('VAPID_PUBLIC_KEY')  ?? '';
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY') ?? '';
const VAPID_EMAIL       = Deno.env.get('VAPID_EMAIL')       ?? '';
const SUPABASE_URL      = Deno.env.get('SUPABASE_URL')      ?? '';
const SUPABASE_SERVICE  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ── Convertir base64url → ArrayBuffer ──
function base64UrlToBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  const binary = atob(base64 + padding);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
  return buffer.buffer;
}

// ── Générer le JWT VAPID ──
async function generateVapidJWT(audience: string): Promise<string> {
  const header  = { alg: 'ES256', typ: 'JWT' };
  const payload = {
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 43200, // 12h
    sub: VAPID_EMAIL,
  };

  const encode = (obj: object) =>
    btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  // Importer la clé privée VAPID
  const keyData = base64UrlToBuffer(VAPID_PRIVATE_KEY);
  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData,
    { name: 'ECDH', namedCurve: 'P-256' },
    false, []
  ).catch(async () => {
    // Fallback : importer comme clé ECDSA
    return await crypto.subtle.importKey(
      'pkcs8',
      keyData,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['sign']
    );
  });

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${unsignedToken}.${sigBase64}`;
}

// ── Envoyer une notification push ──
async function sendPushNotification(
  subscription: { endpoint: string; p256dh: string; auth: string },
  payload: object
): Promise<{ ok: boolean; error?: string }> {
  try {
    const url      = new URL(subscription.endpoint);
    const audience = `${url.protocol}//${url.host}`;
    const jwt      = await generateVapidJWT(audience);

    const response = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `vapid t=${jwt},k=${VAPID_PUBLIC_KEY}`,
        'Content-Type':  'application/json',
        'TTL':           '86400',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 201) return { ok: true };
    return { ok: false, error: `HTTP ${response.status}` };
  } catch(e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const body = await req.json();
    const {
      title       = '🏴‍☠️ Académie Pirate',
      message     = 'Nouvelle mise à jour disponible !',
      url         = 'https://safwanst76-dot.github.io/academie-pirate/',
      icon        = 'https://safwanst76-dot.github.io/academie-pirate/assets/images/ui/icon-192.png',
      test_only   = false,
    } = body;

    // ── Récupérer toutes les subscriptions ──
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE);
    const { data: subs, error } = await sb
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth');

    if (error) throw new Error('Erreur Supabase : ' + error.message);
    if (!subs || subs.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0, total: 0, message: 'Aucun abonné' }), {
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });
    }

    const payload = { title, body: message, url, icon, tag: 'academie-pirate' };
    const targets = test_only ? subs.slice(0, 1) : subs;

    let sent = 0, failed = 0;
    const errors: string[] = [];

    for (const sub of targets) {
      const result = await sendPushNotification(sub, payload);
      if (result.ok) {
        sent++;
      } else {
        failed++;
        errors.push(`${sub.endpoint.substring(0, 50)}… : ${result.error}`);
        // Supprimer les subscriptions expirées (410 Gone)
        if (result.error?.includes('410')) {
          await sb.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
      }
    }

    return new Response(JSON.stringify({
      ok: true, sent, failed, total: targets.length, errors: errors.slice(0, 5)
    }), { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });

  } catch(e: unknown) {
    return new Response(JSON.stringify({
      ok: false, error: e instanceof Error ? e.message : 'Erreur inconnue'
    }), { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });
  }
});
