// ════════════════════════════════════════════════════════════════════
// EDGE FUNCTION : child-signup
// ════════════════════════════════════════════════════════════════════
// Académie Pirate — Pattern A Phase 2
// Date : 26 mai 2026
//
// Crée un compte Supabase Auth pour un enfant, à la demande de son parent
// déjà authentifié.
//
// Endpoint : POST /functions/v1/child-signup
// Headers  : Authorization: Bearer <parent_JWT>
// Body     : { username: string, pin: string, avatar_id?: string }
// Réponse  : { ok: true, child: {...} } ou { ok: false, error: string }
//
// Sécurité :
//   - verify_jwt = true (config.toml) → exige session parent
//   - Utilise SUPABASE_SERVICE_ROLE_KEY côté serveur uniquement
//   - Validation stricte des inputs
//   - Logs sans PIN (RGPD)
// ════════════════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Configuration CORS ────────────────────────────────────────────
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Helper : slugifier un username pour générer email_login ───────
function slugifyUsername(username: string): string {
  return username
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // retire les accents (é→e, à→a, ç→c)
    .replace(/[^a-z0-9_-]/g, "")       // retire tout sauf [a-z0-9_-]
    .slice(0, 30);                     // max 30 chars
}

// ─── Helper : réponse JSON formatée ────────────────────────────────
function jsonResponse(body: object, status: number = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

// ════════════════════════════════════════════════════════════════════
// HANDLER PRINCIPAL
// ════════════════════════════════════════════════════════════════════
Deno.serve(async (req: Request) => {
  // ─── CORS preflight ──────────────────────────────────────────────
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    // ─── 1. Récupérer le JWT du parent depuis l'en-tête ────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return jsonResponse({ ok: false, error: "Authorization manquante" }, 401);
    }
    const parentJWT = authHeader.replace("Bearer ", "");

    // ─── 2. Créer 2 clients Supabase ───────────────────────────────
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Client #1 : avec le JWT parent (pour vérifier l'identité du parent)
    const sbParent = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${parentJWT}` } },
    });

    // Client #2 : service_role (pour les opérations admin)
    const sbAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // ─── 3. Vérifier l'identité du parent ──────────────────────────
    const { data: parentData, error: parentErr } = await sbParent.auth.getUser();
    if (parentErr || !parentData?.user) {
      return jsonResponse({ ok: false, error: "Session parent invalide" }, 401);
    }
    const parentId = parentData.user.id;

    // ─── 4. Parser le body ─────────────────────────────────────────
    let body: { username?: string; pin?: string; avatar_id?: string };
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ ok: false, error: "JSON invalide" }, 400);
    }

    const { username, pin, avatar_id } = body;

    // ─── 5. Validation stricte des inputs ──────────────────────────
    if (!username || typeof username !== "string") {
      return jsonResponse({ ok: false, error: "Username obligatoire" }, 400);
    }
    if (!pin || typeof pin !== "string") {
      return jsonResponse({ ok: false, error: "PIN obligatoire" }, 400);
    }
    if (username.trim().length < 2 || username.trim().length > 30) {
      return jsonResponse(
        { ok: false, error: "Username doit faire 2 à 30 caractères" },
        400
      );
    }
    if (pin.length < 4 || pin.length > 20) {
      return jsonResponse(
        { ok: false, error: "PIN doit faire 4 à 20 caractères" },
        400
      );
    }

    // ─── 6. Slugifier et générer l'email_login ────────────────────
    const usernameTrimmed = username.trim();
    const slug = slugifyUsername(usernameTrimmed);
    if (slug.length < 2) {
      return jsonResponse(
        { ok: false, error: "Username invalide après normalisation" },
        400
      );
    }
    const emailLogin = `${slug}@aca-pirate.ch`;

    console.info(`[child-signup] Parent ${parentId.slice(0, 8)}... crée enfant "${usernameTrimmed}" → ${emailLogin}`);

    // ─── 7. Vérifier que ni username ni email_login ne sont pris ──
    const { data: existing, error: checkErr } = await sbAdmin
      .from("child_profiles")
      .select("id, username, email_login")
      .or(`username.eq.${usernameTrimmed},email_login.eq.${emailLogin}`)
      .limit(1);

    if (checkErr) {
      console.error("[child-signup] Erreur check unicité :", checkErr.message);
      return jsonResponse(
        { ok: false, error: "Erreur de vérification, réessaie" },
        500
      );
    }
    if (existing && existing.length > 0) {
      return jsonResponse(
        {
          ok: false,
          error: "Ce nom d'aventurier est déjà pris, choisis-en un autre",
          code: "USERNAME_TAKEN",
        },
        409
      );
    }

    // ─── 8. Créer le compte Supabase Auth ─────────────────────────
    const { data: authData, error: authErr } = await sbAdmin.auth.admin.createUser({
      email: emailLogin,
      password: pin,
      email_confirm: true, // pas de double opt-in pour les comptes enfants
      user_metadata: {
        role: "child",
        username: usernameTrimmed,
        parent_id: parentId,
        created_via: "child-signup-edge",
      },
    });

    if (authErr || !authData?.user) {
      console.error("[child-signup] Erreur createUser :", authErr?.message);
      return jsonResponse(
        {
          ok: false,
          error: "Impossible de créer le compte enfant : " + (authErr?.message || "inconnu"),
        },
        500
      );
    }

    const authUserId = authData.user.id;

    // ─── 9. INSERT child_profiles ──────────────────────────────────
    const { data: childProfile, error: insertErr } = await sbAdmin
      .from("child_profiles")
      .insert({
        parent_id: parentId,
        username: usernameTrimmed,
        email_login: emailLogin,
        auth_user_id: authUserId,
        avatar_id: avatar_id || "luffy",
        pin: pin,        // gardé pour rétro-compat brève (sera retiré Phase 7)
        xp_total: 0,
        level: 1,
      })
      .select("id, username, email_login, avatar_id, xp_total, level")
      .single();

    if (insertErr) {
      // Rollback : si l'INSERT échoue, supprimer le compte Auth créé
      console.error("[child-signup] INSERT échec, rollback auth :", insertErr.message);
      await sbAdmin.auth.admin.deleteUser(authUserId);
      return jsonResponse(
        { ok: false, error: "Erreur création profil : " + insertErr.message },
        500
      );
    }

    console.info(`[child-signup] ✅ Succès : ${childProfile.id} (${emailLogin})`);

    // ─── 10. Réponse succès ───────────────────────────────────────
    return jsonResponse({
      ok: true,
      child: {
        id: childProfile.id,
        username: childProfile.username,
        email_login: childProfile.email_login,
        avatar_id: childProfile.avatar_id,
        xp_total: childProfile.xp_total,
        level: childProfile.level,
      },
    });
  } catch (e: any) {
    console.error("[child-signup] Exception non gérée :", e?.message || e);
    return jsonResponse(
      { ok: false, error: "Erreur serveur : " + (e?.message || "inconnu") },
      500
    );
  }
});
