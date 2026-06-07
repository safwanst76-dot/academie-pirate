// ════════════════════════════════════════════════════════════════════
// EDGE FUNCTION : delete-account
// ════════════════════════════════════════════════════════════════════
// Académie Pirate — Phase 8 (suppression — RGPD « droit à l'oubli »)
// Date : 07 juin 2026
//
// Supprime le compte PARENT authentifié ET, automatiquement, TOUS ses
// enfants rattachés. Racine de suppression = auth.users (le FK CASCADE
// nettoie ensuite child_profiles / parents et toutes les tables filles).
//
// Ordre IMPÉRATIF (sinon état incohérent) :
//   1) lire les auth_user_id de TOUS les enfants AVANT toute suppression
//   2) supprimer chaque auth.users enfant  → CASCADE child_profiles + données
//   3) supprimer l'auth.users parent EN DERNIER → CASCADE parents
// Si une suppression enfant échoue → on N'EFFACE PAS le parent
// (idempotent : on peut relancer sans rien casser).
//
// Endpoint : POST /functions/v1/delete-account
// Headers  : Authorization: Bearer <parent_JWT>
// Body     : { confirm: true }   // garde-fou anti-clic accidentel
// Réponse  : { ok: true, children_deleted: number } ou { ok: false, error }
//
// Sécurité :
//   - verify_jwt = true (config.toml) → exige une session parent
//   - Ne supprime QUE les enfants dont parent_id == parent du JWT
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

    // ─── 4. Garde-fou : confirmation explicite obligatoire ─────────
    let body: { confirm?: boolean };
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    if (body.confirm !== true) {
      return jsonResponse({ ok: false, error: "Confirmation requise" }, 400);
    }

    // ─── 5. Lire TOUS les enfants AVANT toute suppression ──────────
    //     (une fois la cascade lancée, on perdrait les auth_user_id)
    const { data: children, error: listErr } = await sbAdmin
      .from("child_profiles")
      .select("id, auth_user_id")
      .eq("parent_id", parentId);

    if (listErr) {
      console.error("[delete-account] Erreur liste enfants :", listErr.message);
      return jsonResponse({ ok: false, error: "Erreur serveur, réessaie" }, 500);
    }

    const kids = children || [];
    console.info(`[delete-account] Parent ${parentId.slice(0, 8)}... → ${kids.length} enfant(s) à supprimer`);

    // ─── 6. Supprimer chaque enfant (racine = auth.users) ──────────
    let deleted = 0;
    for (const kid of kids) {
      if (kid.auth_user_id) {
        const { error: delErr } = await sbAdmin.auth.admin.deleteUser(kid.auth_user_id);
        if (delErr && !isNotFound(delErr.message)) {
          console.error(`[delete-account] Échec deleteUser enfant ${kid.id.slice(0, 8)}... :`, delErr.message);
          return jsonResponse(
            { ok: false, error: "Suppression d'un compte enfant impossible — compte parent conservé, réessaie" },
            500
          );
        }
      } else {
        // Cas legacy sans compte Auth : suppression directe du profil
        const { error: delRowErr } = await sbAdmin
          .from("child_profiles")
          .delete()
          .eq("id", kid.id);
        if (delRowErr) {
          console.error(`[delete-account] Échec delete profil enfant ${kid.id.slice(0, 8)}... :`, delRowErr.message);
          return jsonResponse(
            { ok: false, error: "Suppression d'un profil enfant impossible — compte parent conservé, réessaie" },
            500
          );
        }
      }
      deleted++;
    }

    // ─── 7. Supprimer le parent EN DERNIER (CASCADE → parents) ─────
    const { error: delParentErr } = await sbAdmin.auth.admin.deleteUser(parentId);
    if (delParentErr && !isNotFound(delParentErr.message)) {
      console.error("[delete-account] Échec deleteUser parent :", delParentErr.message);
      return jsonResponse(
        { ok: false, error: "Enfants supprimés mais suppression du compte parent impossible — réessaie" },
        500
      );
    }

    console.info(`[delete-account] ✅ Parent ${parentId.slice(0, 8)}... + ${deleted} enfant(s) supprimés`);

    // ─── 8. Réponse succès ─────────────────────────────────────────
    return jsonResponse({ ok: true, children_deleted: deleted });
  } catch (e: any) {
    console.error("[delete-account] Exception non gérée :", e?.message || e);
    return jsonResponse(
      { ok: false, error: "Erreur serveur : " + (e?.message || "inconnu") },
      500
    );
  }
});
