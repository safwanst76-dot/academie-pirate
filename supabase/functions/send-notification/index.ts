// ═══════════════════════════════════════════════════════════════
// EDGE FUNCTION : send-notification
// Envoie un email de notification à tous les parents inscrits
// via Resend API
// ═══════════════════════════════════════════════════════════════

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY   = Deno.env.get('RESEND_API_KEY') ?? '';
const SUPABASE_URL     = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const FROM_EMAIL       = 'Académie Pirate <noreply@academie-pirate.fr>';

// Types de notifications
const NOTIF_TEMPLATES: Record<string, { emoji: string; subject: string }> = {
  'nouveau_monde':  { emoji: '🌍', subject: 'Nouveau monde disponible sur Académie Pirate !' },
  'nouvelle_ile':   { emoji: '🏝️', subject: 'Nouvelle île débloquée sur Académie Pirate !' },
  'nouveau_cours':  { emoji: '📚', subject: 'Nouveau cours disponible sur Académie Pirate !' },
  'mise_a_jour':    { emoji: '🚀', subject: 'Mise à jour Académie Pirate — Nouveautés !' },
  'custom':         { emoji: '📣', subject: 'Message de l\'équipe Académie Pirate' },
};

Deno.serve(async (req) => {

  // CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }

  try {
    // ── 1. Parser le body ──
    const body = await req.json();
    const {
      type        = 'mise_a_jour',   // type de notif
      title       = '',              // titre ex: "Nouveau monde : Namek"
      description = '',              // description du contenu
      details     = [],              // liste de détails ["8 nouvelles îles", "..."]
      test_email  = null,            // si renseigné : envoie uniquement à cet email (test)
    } = body;

    const template = NOTIF_TEMPLATES[type] || NOTIF_TEMPLATES['mise_a_jour'];

    // ── 2. Récupérer tous les parents ──
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE);
    const { data: parents, error } = await sb
      .from('profiles_parents')
      .select('email, prenom, nom')
      .not('email', 'is', null);

    if (error) throw new Error('Erreur Supabase : ' + error.message);
    if (!parents || parents.length === 0) throw new Error('Aucun parent trouvé');

    // Mode test : envoyer seulement à test_email
    const recipients = test_email
      ? [{ email: test_email, prenom: 'Admin', nom: '' }]
      : parents;

    // ── 3. Construire le HTML de l'email ──
    const buildEmail = (prenom: string) => {
      const detailsHtml = details.length > 0
        ? `<ul style="margin:12px 0;padding-left:20px;color:#e2e8f0">
            ${details.map((d: string) => `<li style="margin-bottom:6px">${d}</li>`).join('')}
           </ul>`
        : '';

      return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#070a14;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:20px">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f1629,#16213e);border-radius:16px 16px 0 0;padding:28px 24px;text-align:center;border-bottom:3px solid #ffd700">
      <div style="font-size:2.5rem;margin-bottom:8px">${template.emoji}</div>
      <div style="font-family:Georgia,serif;font-size:1.6rem;font-weight:900;color:#ffd700;letter-spacing:2px;text-shadow:2px 2px 0 #000">
        🏴‍☠️ ACADÉMIE PIRATE
      </div>
      <div style="font-size:.78rem;color:rgba(255,255,255,.4);letter-spacing:3px;text-transform:uppercase;margin-top:4px">
        Plateforme d'apprentissage manga
      </div>
    </div>

    <!-- Body -->
    <div style="background:#0f1629;padding:28px 24px;border-radius:0 0 16px 16px;border:1px solid rgba(255,215,0,.15);border-top:0">

      <p style="color:rgba(255,255,255,.85);font-size:.95rem;line-height:1.6;margin-bottom:16px">
        Bonjour <strong style="color:#ffd700">${prenom}</strong>,
      </p>

      <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.6;margin-bottom:20px">
        Une nouveauté vient d'être déployée sur <strong style="color:#ffd700">Académie Pirate</strong> pour faire progresser votre enfant !
      </p>

      <!-- Titre notif -->
      <div style="background:linear-gradient(135deg,rgba(255,215,0,.1),rgba(124,58,237,.1));border:1px solid rgba(255,215,0,.3);border-radius:12px;padding:18px 20px;margin-bottom:20px">
        <div style="font-size:1.3rem;font-weight:900;color:#ffd700;margin-bottom:8px">
          ${template.emoji} ${title}
        </div>
        <div style="color:rgba(255,255,255,.8);font-size:.88rem;line-height:1.6">
          ${description}
        </div>
        ${detailsHtml}
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:24px 0">
        <a href="https://safwanst76-dot.github.io/academie-pirate/"
           style="display:inline-block;background:linear-gradient(135deg,#ffd700,#f97316);color:#000;font-weight:900;font-size:1rem;padding:14px 32px;border-radius:12px;text-decoration:none;letter-spacing:1px">
          ⚔️ ACCÉDER À L'ACADÉMIE
        </a>
      </div>

      <hr style="border:0;border-top:1px solid rgba(255,255,255,.08);margin:20px 0">

      <p style="color:rgba(255,255,255,.35);font-size:.75rem;text-align:center;line-height:1.5">
        Vous recevez cet email car votre enfant est inscrit sur Académie Pirate.<br>
        Pour vous désinscrire, répondez "STOP" à cet email.
      </p>
    </div>
  </div>
</body>
</html>`;
    };

    // ── 4. Envoyer les emails via Resend ──
    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const parent of recipients) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            from:    FROM_EMAIL,
            to:      [parent.email],
            subject: template.subject,
            html:    buildEmail(parent.prenom || 'Capitaine'),
          }),
        });

        if (res.ok) {
          sent++;
        } else {
          const err = await res.json();
          failed++;
          errors.push(`${parent.email}: ${err.message || res.status}`);
        }

        // Rate limit : 2 emails/seconde max Resend gratuit
        await new Promise(r => setTimeout(r, 500));

      } catch (e: unknown) {
        failed++;
        errors.push(`${parent.email}: ${e instanceof Error ? e.message : 'erreur inconnue'}`);
      }
    }

    return new Response(JSON.stringify({
      ok:      true,
      sent:    sent,
      failed:  failed,
      total:   recipients.length,
      errors:  errors.slice(0, 5),
      mode:    test_email ? 'test' : 'broadcast',
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (e: unknown) {
    return new Response(JSON.stringify({
      ok:    false,
      error: e instanceof Error ? e.message : 'Erreur inconnue',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
});
