// ===================================================================
// EDGE FUNCTION : send-content-email
// Envoie des emails aux parents via l'API Resend (domaine aca-pirate.ch)
// ===================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const RESEND_API_KEY  = Deno.env.get('RESEND_API_KEY')  ?? '';
const RESEND_FROM     = Deno.env.get('RESEND_FROM')     ?? 'Académie Pirate <info@aca-pirate.ch>';
const RESEND_REPLY_TO = Deno.env.get('RESEND_REPLY_TO') ?? 'info@aca-pirate.ch';

const EMAILS_ENABLED = (Deno.env.get('EMAILS_ENABLED') ?? 'true') === 'true';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey, x-client-info, x-supabase-api-version',
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// -- Envoi via API Resend (retry leger sur 429) ------------------
async function sendViaResend(msg: { to: string; subject: string; html: string; text: string }): Promise<void> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:     RESEND_FROM,
        to:       msg.to,
        reply_to: RESEND_REPLY_TO,
        subject:  msg.subject,
        html:     msg.html,
        text:     msg.text,
        headers:  { 'List-Unsubscribe': '<mailto:info@aca-pirate.ch?subject=desabonnement>, <https://aca-pirate.ch/#/preferences-email>' },
      }),
    });

    if (res.status === 429 && attempt === 0) { await sleep(1500); continue; }
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
    }
    return;
  }
}

// -- Template HTML manga-themed ----------------------------------
function renderEmail(p: {
  firstName: string;
  title:     string;
  description:string;
  ctaText:   string;
  ctaUrl:    string;
  unsubUrl:  string;
}): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title}</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#e8eaf6">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0f172a">
<tr><td align="center" style="padding:40px 20px">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.5)">
<tr><td style="padding:32px 24px;text-align:center;background:linear-gradient(135deg,#f59e0b,#ef4444);border-bottom:3px solid rgba(255,255,255,.1)">
<div style="font-family:Bangers,cursive;font-size:32px;color:#fff;letter-spacing:3px;text-shadow:2px 2px 0 rgba(0,0,0,.3)">🏴‍☠️ ACADÉMIE PIRATE</div>
</td></tr>
<tr><td style="padding:32px 32px 16px">
<div style="font-size:14px;color:#94a3b8;margin-bottom:8px">Bonjour ${p.firstName} 👋</div>
<h1 style="font-family:Bangers,Arial,sans-serif;font-size:28px;color:#fbbf24;margin:0 0 16px;letter-spacing:1px;line-height:1.2">${p.title}</h1>
<p style="font-size:16px;line-height:1.6;color:#cbd5e1;margin:0 0 24px">${p.description}</p>
<div style="text-align:center;margin:32px 0">
<a href="${p.ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;text-decoration:none;padding:16px 40px;border-radius:999px;font-weight:900;font-size:16px;letter-spacing:1px;text-transform:uppercase;box-shadow:0 4px 16px rgba(239,68,68,.4)">${p.ctaText} &rarr;</a>
</div>
</td></tr>
<tr><td style="padding:24px 32px;background:rgba(0,0,0,.3);border-top:1px solid rgba(255,255,255,.05);text-align:center">
<div style="font-size:12px;color:#64748b;line-height:1.6">
Acad&eacute;mie Pirate &mdash; l'apprentissage ludique pour enfants 8-13 ans<br>
<a href="https://aca-pirate.ch" style="color:#fbbf24;text-decoration:none">aca-pirate.ch</a>
<br><br>
<a href="${p.unsubUrl}" style="color:#64748b;text-decoration:underline;font-size:11px">G&eacute;rer mes pr&eacute;f&eacute;rences email</a>
</div>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY manquant (secret Supabase)');
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE);

    let body: { release_id?: string; dry_run?: boolean; test_email_only?: string; audience?: string } = {};
    try { body = await req.json(); } catch { /* body vide OK */ }

    let q = supabase.from('content_releases').select('*').eq('status', 'ready');
    if (body.release_id) q = q.eq('id', body.release_id);
    const { data: releases, error: errR } = await q;
    if (errR) throw errR;

    if (!releases || releases.length === 0) {
      return new Response(JSON.stringify({ ok: true, message: 'No ready releases', summary: null }),
        { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    let parents: any[] | null = null;
    let errP: any = null;

    if (body.test_email_only) {
      // Mode apercu : envoi UNIQUEMENT a cette adresse, quelle que soit l'audience
      parents = [{ id: null, email: body.test_email_only, prenom: 'cher parent' }];
    } else if (body.audience === 'consenting' || body.audience === 'non_consenting') {
      // Audience elargie via RPC SECURITY DEFINER (source: parents + auth.users)
      const r = await supabase.rpc('get_broadcast_parents', { p_audience: body.audience });
      parents = r.data;
      errP = r.error;
    } else {
      // Comportement par defaut : parents consentants dans profiles_parents
      let parentsQuery = supabase
        .from('profiles_parents')
        .select('id, email, prenom')
        .eq('email_new_features', true)
        .not('email', 'is', null)
        .not('consent_date', 'is', null);
      const r = await parentsQuery;
      parents = r.data;
      errP = r.error;
    }
    if (errP) throw errP;

    const summary = { releases: 0, parents: parents?.length ?? 0, sent: 0, failed: 0, skipped: 0 };

    if (!EMAILS_ENABLED) {
      return new Response(JSON.stringify({ ok: true, message: 'EMAILS_ENABLED=false', summary }),
        { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    for (const release of releases) {
      summary.releases++;
      let failedThisRelease = 0;

      for (const parent of parents ?? []) {
        // Idempotence : si deja envoye (reel) pour ce release, on saute
        if (!body.test_email_only) {
          const { data: already } = await supabase
            .from('email_log')
            .select('id')
            .eq('release_id', release.id)
            .eq('email', parent.email)
            .eq('status', 'sent')
            .not('parent_id', 'is', null)
            .limit(1);
          if (already && already.length > 0) { summary.skipped++; continue; }
        }

        const html = renderEmail({
          firstName:   parent.prenom || 'cher parent',
          title:       release.title,
          description: release.description,
          ctaText:     release.cta_text || 'Découvrir',
          ctaUrl:      release.cta_url  || 'https://aca-pirate.ch',
          unsubUrl:    'https://aca-pirate.ch/#/preferences-email',
        });

        if (body.dry_run) { summary.skipped++; continue; }

        try {
          await sendViaResend({
            to:      parent.email,
            subject: release.title,
            text:    `${release.title}\n\n${release.description}\n\n${release.cta_url || ''}`,
            html,
          });
          await supabase.from('email_log').insert({
            release_id: release.id, parent_id: parent.id,
            email: parent.email, status: 'sent',
          });
          summary.sent++;
        } catch (e) {
          await supabase.from('email_log').insert({
            release_id: release.id, parent_id: parent.id,
            email: parent.email, status: 'failed',
            error_message: String(e).slice(0, 500),
          });
          summary.failed++;
          failedThisRelease++;
        }

        await sleep(600); // ~<2 req/s : respect du rate limit Resend
      }

      // On ne clot le release que si TOUT est parti (sinon il reste 'ready' pour relance)
      if (!body.dry_run && !body.test_email_only && failedThisRelease === 0) {
        await supabase.from('content_releases')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', release.id);
      }
    }

    return new Response(JSON.stringify({ ok: true, summary }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } });

  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
});
