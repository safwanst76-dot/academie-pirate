// ═══════════════════════════════════════════════════════════
// db.js — Académie Pirate
// Toutes les interactions Supabase (parent + enfants + progression)
// CORRECTIF : headers Accept ajoutés pour éviter l'erreur 406
// ═══════════════════════════════════════════════════════════

function getDb() {
  if (typeof sb === 'undefined') throw new Error('Supabase non initialisé');
  return sb;
}

// ═══════════════════════════════════════════════════════════
// PROFILS ENFANTS
// ═══════════════════════════════════════════════════════════

async function dbGetChildren() {
  try {
    const { data, error } = await getDb()
      .from('child_profiles')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('dbGetChildren:', e.message);
    return [];
  }
}

async function dbCreateChild(username, avatarId = 'luffy', pin = null) {
  try {
    const { data: { user } } = await getDb().auth.getUser();
    if (!user) throw new Error('Non connecté');
    const { data, error } = await getDb()
      .from('child_profiles')
      .insert({ parent_id: user.id, username, avatar_id: avatarId, pin })
      .select()
      .single();
    if (error) throw error;
    return { ok: true, child: data };
  } catch (e) {
    console.error('dbCreateChild:', e.message);
    return { ok: false, error: e.message };
  }
}

async function dbUpdateChild(childId, updates) {
  try {
    const { data, error } = await getDb()
      .from('child_profiles')
      .update(updates)
      .eq('id', childId)
      .select()
      .single();
    if (error) throw error;
    return { ok: true, child: data };
  } catch (e) {
    console.error('dbUpdateChild:', e.message);
    return { ok: false, error: e.message };
  }
}

async function dbDeleteChild(childId) {
  try {
    const { error } = await getDb()
      .from('child_profiles')
      .delete()
      .eq('id', childId);
    if (error) throw error;
    return { ok: true };
  } catch (e) {
    console.error('dbDeleteChild:', e.message);
    return { ok: false, error: e.message };
  }
}

// ═══════════════════════════════════════════════════════════
// PROFILS PARENTS — CORRECTIF 406
// Le header Accept: application/json est requis par Supabase
// pour retourner du JSON au lieu du format par défaut.
// On utilise fetch() directement avec les bons headers.
// ═══════════════════════════════════════════════════════════

async function dbGetParentProfile() {
  try {
    // Récupérer l'utilisateur courant
    const { data: { user }, error: userErr } = await getDb().auth.getUser();
    if (userErr || !user) throw new Error('Non connecté');

    // Essai 1 : via le client Supabase standard (profiles_parents)
    const { data, error } = await getDb()
      .from('profiles_parents')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();  // maybeSingle() ne lance pas d'erreur si 0 résultats

    if (error) {
      // Erreur 406 = la table existe mais Accept header manquant
      // ou la table s'appelle autrement — on tente un fetch direct
      console.warn('dbGetParentProfile via client:', error.message);
      return await dbGetParentProfileDirect(user);
    }

    return { ok: true, profile: data };
  } catch (e) {
    console.error('dbGetParentProfile:', e.message);
    return { ok: false, error: e.message, profile: null };
  }
}

// Fallback : fetch direct avec headers explicites
async function dbGetParentProfileDirect(user) {
  try {
    const session = await getDb().auth.getSession();
    const token = session?.data?.session?.access_token;
    if (!token) throw new Error('Pas de session active');

    // Récupère l'URL et la clé depuis supabase.js
    const url  = window.SUPABASE_URL  || '';
    const akey = window.SUPABASE_ANON_KEY || '';
    if (!url) throw new Error('SUPABASE_URL non défini');

    const res = await fetch(`${url}/rest/v1/profiles_parents?id=eq.${user.id}&select=*`, {
      method: 'GET',
      headers: {
        'Accept':        'application/json',
        'Content-Type':  'application/json',
        'apikey':         akey,
        'Authorization': `Bearer ${token}`,
        'Prefer':        'return=representation'
      }
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`HTTP ${res.status}: ${txt}`);
    }

    const rows = await res.json();
    return { ok: true, profile: rows[0] || null };
  } catch (e) {
    console.error('dbGetParentProfileDirect:', e.message);
    return { ok: false, error: e.message, profile: null };
  }
}

async function dbUpsertParentProfile(profileData) {
  try {
    const { data: { user } } = await getDb().auth.getUser();
    if (!user) throw new Error('Non connecté');

    const { data, error } = await getDb()
      .from('profiles_parents')
      .upsert({ id: user.id, ...profileData }, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { ok: true, profile: data };
  } catch (e) {
    console.error('dbUpsertParentProfile:', e.message);
    return { ok: false, error: e.message };
  }
}

// ═══════════════════════════════════════════════════════════
// PROGRESSION ENFANT
// ═══════════════════════════════════════════════════════════

async function dbSaveProgression(childId, islandId, score, xpGained) {
  if (!childId || !islandId) {
    console.warn('[db] dbSaveProgression ignoré — ids manquants', { childId: childId, islandId: islandId });
    return;
  }
try {
    const { data, error } = await getDb()
      .from('progressions')
      .upsert(
        { child_id: childId, island_id: islandId, score, xp: xpGained, updated_at: new Date().toISOString() },
        { onConflict: 'child_id,island_id' }
      )
      .select()
      .single();
    if (error) throw error;
    return { ok: true, data };
  } catch (e) {
    console.error('dbSaveProgression:', e.message);
    return { ok: false, error: e.message };
  }
}

async function dbGetProgression(childId) {
  try {
    const { data, error } = await getDb()
      .from('progressions')
      .select('*')
      .eq('child_id', childId);
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('dbGetProgression:', e.message);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════
// ENFANT ACTIF (session courante)
// ═══════════════════════════════════════════════════════════
var _activeChild = null;

function dbSetActiveChild(child) {
  _activeChild = child;
}

function dbGetActiveChild() {
  return _activeChild;
}

// ═══════════════════════════════════════════════════════════
// PROGRESSION PAR LEÇON (wrapper pour save.js)
// Retourne un objet { isleId: { score, xp, completed }, ... }
// ═══════════════════════════════════════════════════════════
async function dbGetLessonProgression(childId, lessonId) {
  try {
    var rows = await dbGetProgression(childId);
    var result = {};
    rows.forEach(function(row) {
      result[row.island_id] = {
        score: row.score || 0,
        xp: row.xp || 0,
        completed: (row.score || 0) > 0
      };
    });
    return result;
  } catch (e) {
    console.warn('dbGetLessonProgression:', e.message);
    return {};
  }
}

// ═══════════════════════════════════════════════════════════
// MIGRATION LOCALSTORAGE → DB (première connexion)
// ═══════════════════════════════════════════════════════════
async function dbMigrateLocalStorage(childId) {
  try {
    var s = localStorage.getItem('academie_pirate_v3');
    if (!s) return;
    var d = JSON.parse(s);
    if (!d.completedIslands) return;
    var entries = Object.entries(d.completedIslands);
    for (var i = 0; i < entries.length; i++) {
      var isleId = parseInt(entries[i][0]);
      var score = entries[i][1];
      await dbSaveProgression(childId, isleId, score, score * 2);
    }
    console.info('Migration localStorage → DB terminée pour', childId);
  } catch (e) {
    console.warn('dbMigrateLocalStorage:', e.message);
  }
}

// ═══════════════════════════════════════════════════════════
// EXPOSE GLOBAL
// ═══════════════════════════════════════════════════════════
window.dbGetChildren           = dbGetChildren;
window.dbCreateChild           = dbCreateChild;
window.dbUpdateChild           = dbUpdateChild;
window.dbDeleteChild           = dbDeleteChild;
window.dbGetParentProfile      = dbGetParentProfile;
window.dbUpsertParentProfile   = dbUpsertParentProfile;
window.dbSaveProgression       = dbSaveProgression;
window.dbGetProgression        = dbGetProgression;
window.dbSetActiveChild        = dbSetActiveChild;
window.dbGetActiveChild        = dbGetActiveChild;
window.dbGetLessonProgression  = dbGetLessonProgression;
window.dbMigrateLocalStorage   = dbMigrateLocalStorage;

console.info('🏴‍☠️ db.js chargé');
