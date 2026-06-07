// ════════════════════════════════════════════════════════════════════
// EDGE FUNCTION : delete-child
// ════════════════════════════════════════════════════════════════════
// Académie Pirate — Phase 8 (suppression)
// Date : 07 juin 2026
//
// Supprime UN enfant, à la demande de son parent authentifié.
// Racine de suppression = auth.users (le FK CASCADE nettoie child_profiles
// et toutes les tables filles). On ne fait JAMAIS de DELETE direct sur
// child_profiles (sauf cas legacy sans compte Auth).
//
// Endpoint : POST /functions/v1/delete-child
// Headers  : Authorization: Bearer <parent_JWT>
// Body     : { child_id: string }   // id du child_profiles à supprimer
// Réponse  : { ok: true } ou { ok: false, error: string }
//
// Sécurité :
//   - verify_jwt = true (config.toml) → exige une session parent
//   - Vérifie que child.parent_id == parent du JWT (ownership)
//   - SUPABASE_SERVICE_ROLE_KEY utilisée côté serveur uniquement
//   - Logs sans donnée sensible (RGPD)
// ════════════════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Configuration CORS ────────────────────────────────────────────
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Helper : réponse JSON formatée ────────────────────────────────
function jsonResponse(body: object, status: number = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

// ─── Helper : un compte déjà supprimé ne doit pas faire échouer ────
function isNotFound(msg: string | undefined): boolean {
  return !!msg && /not.*found/i.test(msg);
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
    // ─── 1. Récupérer le JWT du parent ─────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return jsonResponse({ ok: false, error: "Authorization manquante" }, 401);
    }
    const parentJWT = authHeader.replace("Bearer ", "");

    // ─── 2. Créer 2 clients Supabase ───────────────────────────────
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Client #1 : avec le JWT parent (pour vérifier l'identité)
    const sbParent = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${parentJWT}` } },
    });

    // Client #2 : service_role (opérations admin)
    const sbAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // ─── 3. Vérifier l'identité du parent ──────────────────────────
    const { data: parentData, error: parentErr } = await sbParent.auth.getUser();
    if (parentErr || !parentData?.user) {
      return jsonResponse({ ok: false, error: "Session parent invalide" }, 401);
    }
    const parentId = parentData.user.id;

    // ─── 4. Parser le body ─────────────────────────────────────────
    let body: { child_id?: string };
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ ok: false, error: "JSON invalide" }, 400);
    }
    const childId = (body.child_id || "").trim();
    if (!childId) {
      return jsonResponse({ ok: false, error: "child_id obligatoire" }, 400);
    }

    // ─── 5. Charger l'enfant + vérifier l'ownership ────────────────
    const { data: child, error: fetchErr } = await sbAdmin
      .from("child_profiles")
      .select("id, username, parent_id, auth_user_id")
      .eq("id", childId)
      .maybeSingle();

    if (fetchErr) {
      console.error("[delete-child] Erreur lecture profil :", fetchErr.message);
      return jsonResponse({ ok: false, error: "Erreur serveur, réessaie" }, 500);
    }
    if (!child) {
      // Déjà supprimé → idempotent
      return jsonResponse({ ok: true, already_deleted: true });
    }
    if (child.parent_id !== parentId) {
      // Le parent ne possède pas cet enfant
      return jsonResponse({ ok: false, error: "Action non autorisée" }, 403);
    }

    console.info(`[delete-child] Parent ${parentId.slice(0, 8)}... supprime enfant ${child.id.slice(0, 8)}...`);

    // ─── 6. Suppression : racine = auth.users (CASCADE → child_profiles)
    if (child.auth_user_id) {
      const { error: delErr } = await sbAdmin.auth.admin.deleteUser(child.auth_user_id);
      if (delErr && !isNotFound(delErr.message)) {
        console.error("[delete-child] Erreur deleteUser :", delErr.message);
        return jsonResponse({ ok: false, error: "Suppression du compte enfant impossible" }, 500);
      }
    } else {
      // Cas legacy sans compte Auth : suppression directe du profil
      const { error: delRowErr } = await sbAdmin
        .from("child_profiles")
        .delete()
        .eq("id", child.id);
      if (delRowErr) {
        console.error("[delete-child] Erreur delete profil legacy :", delRowErr.message);
        return jsonResponse({ ok: false, error: "Suppression du profil impossible" }, 500);
      }
    }

    console.info(`[delete-child] ✅ Enfant ${child.id.slice(0, 8)}... supprimé`);

    // ─── 7. Réponse succès ─────────────────────────────────────────
    return jsonResponse({ ok: true });
  } catch (e: any) {
    console.error("[delete-child] Exception non gérée :", e?.message || e);
    return jsonResponse(
      { ok: false, error: "Erreur serveur : " + (e?.message || "inconnu") },
      500
    );
  }
});
