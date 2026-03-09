// ═══════════════════════════════════════════════════════════
// db.js — Académie Pirate
// Toutes les interactions Supabase (parent + enfants + progression)
// NE PAS MODIFIER supabase.js existant
// ═══════════════════════════════════════════════════════════

// ── Récupérer l'instance Supabase déjà initialisée dans supabase.js ──
// sb est défini globalement dans supabase.js
function getDb() {
  if (typeof sb === 'undefined') throw new Error('Supabase non initialisé');
  return sb;
}

// ═══════════════════════════════════════════════════════════
// GESTION DES PROFILS ENFANTS
// ═══════════════════════════════════════════════════════════

/**
 * Récupérer tous les profils enfants du parent connecté
 */
async function dbGetChildren() {
  try {
    const { data, error } = await getDb()
      .from('child_profiles')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('dbGetChildren:', e);
    return [];
  }
}

/**
 * Créer un profil enfant
 * @param {string} username - Pseudo de l'enfant
 * @param {string} avatarId - ID avatar (ex: 'luffy')
 * @param {string|null} pin  - PIN 4 chiffres optionnel
 */
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
    console.error('dbCreateChild:', e);
    return { ok: false, error: e.message };
  }
}

/**
 * Mettre à jour le profil enfant (avatar, pseudo)
 */
async function dbUpdateChild(childId, updates) {
  try {
    const { data, error } = await getDb()
      .from('child_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', childId)
      .select()
      .single();
    if (error) throw error;
    return { ok: true, child: data };
  } catch (e) {
    console.error('dbUpdateChild:', e);
    return { ok: false, error: e.message };
  }
}

/**
 * Supprimer un profil enfant
 */
async function dbDeleteChild(childId) {
  try {
    const { error } = await getDb()
      .from('child_profiles')
      .delete()
      .eq('id', childId);
    if (error) throw error;
    return { ok: true };
  } catch (e) {
    console.error('dbDeleteChild:', e);
    return { ok: false, error: e.message };
  }
}

// ═══════════════════════════════════════════════════════════
// PROGRESSION
// ═══════════════════════════════════════════════════════════

/**
 * Sauvegarder/mettre à jour la progression d'une île
 * @param {string} childId   - UUID enfant
 * @param {string} lessonId  - ex: 'french1'
 * @param {number} isleId    - ex: 1
 * @param {object} data      - { xp, score, completed, time_spent_sec }
 */
async function dbSaveProgression(childId, lessonId, isleId, data) {
  try {
    const payload = {
      child_id:       childId,
      lesson_id:      lessonId,
      isle_id:        isleId,
      xp:             data.xp || 0,
      score:          data.score || 0,
      completed:      data.completed || false,
      time_spent_sec: data.time_spent_sec || 0,
      attempts:       data.attempts || 1,
      updated_at:     new Date().toISOString(),
    };
    if (data.completed) payload.completed_at = new Date().toISOString();

    const { error } = await getDb()
      .from('progression')
      .upsert(payload, { onConflict: 'child_id,lesson_id,isle_id' });
    if (error) throw error;

    // Recalculer XP total via la fonction SQL
    await getDb().rpc('refresh_child_xp', { p_child_id: childId });

    // Enregistrer la session du jour
    await dbRecordSession(childId, data.xp || 0);

    return { ok: true };
  } catch (e) {
    console.error('dbSaveProgression:', e);
    return { ok: false, error: e.message };
  }
}

/**
 * Récupérer toute la progression d'un enfant
 */
async function dbGetProgression(childId) {
  try {
    const { data, error } = await getDb()
      .from('progression')
      .select('*')
      .eq('child_id', childId)
      .order('lesson_id')
      .order('isle_id');
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('dbGetProgression:', e);
    return [];
  }
}

/**
 * Récupérer la progression d'une leçon spécifique
 */
async function dbGetLessonProgression(childId, lessonId) {
  try {
    const { data, error } = await getDb()
      .from('progression')
      .select('*')
      .eq('child_id', childId)
      .eq('lesson_id', lessonId);
    if (error) throw error;
    // Convertir en objet { isle_id: {...} }
    const map = {};
    (data || []).forEach(row => { map[row.isle_id] = row; });
    return map;
  } catch (e) {
    console.error('dbGetLessonProgression:', e);
    return {};
  }
}

// ═══════════════════════════════════════════════════════════
// SESSIONS (streak)
// ═══════════════════════════════════════════════════════════

async function dbRecordSession(childId, xpGained = 0) {
  try {
    await getDb()
      .from('sessions')
      .upsert(
        { child_id: childId, played_at: new Date().toISOString().split('T')[0], xp_gained: xpGained },
        { onConflict: 'child_id,played_at', ignoreDuplicates: false }
      );
  } catch (e) {
    console.error('dbRecordSession:', e);
  }
}

/**
 * Calculer le streak actuel (jours consécutifs)
 */
async function dbGetStreak(childId) {
  try {
    const { data, error } = await getDb()
      .from('sessions')
      .select('played_at')
      .eq('child_id', childId)
      .order('played_at', { ascending: false })
      .limit(30);
    if (error || !data?.length) return 0;

    let streak = 0;
    let expected = new Date();
    expected.setHours(0,0,0,0);

    for (const row of data) {
      const d = new Date(row.played_at);
      d.setHours(0,0,0,0);
      const diff = Math.round((expected - d) / 86400000);
      if (diff === 0 || diff === 1) {
        streak++;
        expected = d;
        expected.setDate(expected.getDate() - 1);
      } else break;
    }
    return streak;
  } catch (e) {
    console.error('dbGetStreak:', e);
    return 0;
  }
}

// ═══════════════════════════════════════════════════════════
// PROFIL ACTIF (enfant sélectionné)
// Stocké en sessionStorage (pas localStorage) — perdu à fermeture
// ═══════════════════════════════════════════════════════════

function dbSetActiveChild(child) {
  sessionStorage.setItem('activeChild', JSON.stringify(child));
  window.dispatchEvent(new CustomEvent('activeChildChanged', { detail: child }));
}

function dbGetActiveChild() {
  try {
    const raw = sessionStorage.getItem('activeChild');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function dbClearActiveChild() {
  sessionStorage.removeItem('activeChild');
}

// ═══════════════════════════════════════════════════════════
// MIGRATION localStorage → Supabase
// Appelée une seule fois après création du profil enfant
// ═══════════════════════════════════════════════════════════

async function dbMigrateLocalStorage(childId) {
  try {
    // Chercher toutes les clés de progression locale
    const keys = Object.keys(localStorage).filter(k => k.startsWith('prog_'));
    if (!keys.length) return;

    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const prog = JSON.parse(raw);
        // Format: prog_french1 = { isle_1: { xp, completed }, isle_2: ... }
        const lessonId = key.replace('prog_', '');
        for (const [isleKey, isleData] of Object.entries(prog)) {
          const isleId = parseInt(isleKey.replace('isle_', ''));
          if (isNaN(isleId)) continue;
          await dbSaveProgression(childId, lessonId, isleId, {
            xp:        isleData.xp || 0,
            score:     isleData.score || 0,
            completed: isleData.completed || false,
          });
        }
        // Supprimer après migration
        localStorage.removeItem(key);
      } catch {}
    }
    console.log('✅ Migration localStorage → Supabase terminée');
  } catch (e) {
    console.error('dbMigrateLocalStorage:', e);
  }
}