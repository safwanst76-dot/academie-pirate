// ════════════════════════════════════════════════════════════════════
// MIGRATION SCRIPT — Children legacy -> Pattern A (Supabase Auth)
// Date : 27 mai 2026
// Academie Pirate
// ════════════════════════════════════════════════════════════════════
// Usage :
//   SUPABASE_SERVICE_KEY=eyJ... node scripts/migrate-children-to-auth.js
//   SUPABASE_SERVICE_KEY=eyJ... node scripts/migrate-children-to-auth.js --dry-run
//   SUPABASE_SERVICE_KEY=eyJ... node scripts/migrate-children-to-auth.js --only=tito
//
// Modes :
//   --dry-run        : apercu seul, AUCUNE modif en DB
//   --only=USERNAME  : ne migre QUE cet enfant (test cible)
//   (rien)           : migre tous les enfants sans auth_user_id
//
// Idempotent : skip les enfants deja migres (auth_user_id != null)
// ════════════════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const DRY_RUN = process.argv.includes('--dry-run');
const ONLY_ARG = process.argv.find(a => a.startsWith('--only='));
const ONLY_USERNAME = ONLY_ARG ? ONLY_ARG.replace('--only=', '') : null;

if (!SERVICE_KEY) {
  console.error('SUPABASE_SERVICE_KEY manquant');
  console.error('   export SUPABASE_SERVICE_KEY="eyJ..."');
  process.exit(1);
}

if (SERVICE_KEY.length < 100) {
  console.error('SUPABASE_SERVICE_KEY semble trop courte (length=' + SERVICE_KEY.length + ')');
  console.error('   Verifier que c est bien la service_role key et pas l anon key');
  process.exit(1);
}

// Slugifier (meme algo que l edge function)
function slugifyUsername(username) {
  return username
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 30);
}

// Helpers REST API Supabase
async function sbFetch(path, options = {}) {
  const res = await fetch(SUPABASE_URL + path, {
    ...options,
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch (_) {}
  return { status: res.status, ok: res.ok, body: json !== null ? json : text };
}

async function listChildrenToMigrate() {
  let path = '/rest/v1/child_profiles?auth_user_id=is.null&select=id,username,pin,parent_id,created_at&order=created_at.asc';
  if (ONLY_USERNAME) {
    path += '&username=eq.' + encodeURIComponent(ONLY_USERNAME);
  }
  const r = await sbFetch(path);
  if (!r.ok) throw new Error('List failed (' + r.status + '): ' + JSON.stringify(r.body));
  return r.body;
}

async function emailExists(email) {
  const r = await sbFetch('/auth/v1/admin/users?email=' + encodeURIComponent(email));
  if (!r.ok) return false;
  const users = (r.body && r.body.users) || [];
  return users.length > 0;
}

async function createAuthUser(email, password, metadata) {
  const r = await sbFetch('/auth/v1/admin/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: metadata
    })
  });
  if (!r.ok) {
    throw new Error('createUser failed (' + r.status + '): ' + JSON.stringify(r.body));
  }
  return r.body;
}

async function updateChildProfile(childId, emailLogin, authUserId) {
  const r = await sbFetch('/rest/v1/child_profiles?id=eq.' + childId, {
    method: 'PATCH',
    headers: { 'Prefer': 'return=representation' },
    body: JSON.stringify({
      email_login: emailLogin,
      auth_user_id: authUserId
    })
  });
  if (!r.ok) {
    throw new Error('updateChild failed (' + r.status + '): ' + JSON.stringify(r.body));
  }
  return r.body;
}

async function deleteAuthUser(userId) {
  await sbFetch('/auth/v1/admin/users/' + userId, { method: 'DELETE' });
}

// Pipeline principal
async function migrate() {
  console.log('===========================================================');
  console.log('  MIGRATION CHILDREN -> SUPABASE AUTH');
  console.log('  Mode : ' + (DRY_RUN ? 'DRY-RUN' : 'REEL') + (ONLY_USERNAME ? ' / Filter: --only=' + ONLY_USERNAME : ''));
  console.log('===========================================================');
  console.log('');

  const children = await listChildrenToMigrate();
  console.log(children.length + ' enfant(s) a traiter');
  console.log('');

  if (children.length === 0) {
    console.log('Rien a faire - aucun enfant eligible');
    return;
  }

  let okCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const child of children) {
    const id = child.id;
    const username = child.username;
    const pin = child.pin;
    const parent_id = child.parent_id;

    if (!username || username.length < 2) {
      console.log('SKIP ' + id.slice(0, 8) + '... : username invalide (' + username + ')');
      skipCount++;
      continue;
    }
    if (!pin || pin.length < 4) {
      console.log('SKIP ' + id.slice(0, 8) + '... ' + username + ' : pin invalide (length=' + (pin ? pin.length : 0) + ')');
      skipCount++;
      continue;
    }

    const slug = slugifyUsername(username);
    if (slug.length < 2) {
      console.log('SKIP ' + id.slice(0, 8) + '... ' + username + ' : slug invalide apres normalisation');
      skipCount++;
      continue;
    }

    const emailLogin = slug + '@aca-pirate.ch';

    if (DRY_RUN) {
      console.log('  ' + username.padEnd(15) + ' -> ' + emailLogin.padEnd(35) + ' (pin: ' + pin.slice(0, 2) + '****)');
      okCount++;
      continue;
    }

    try {
      const exists = await emailExists(emailLogin);
      if (exists) {
        console.log('SKIP ' + username + ' : email ' + emailLogin + ' deja pris dans auth.users');
        errors.push({ id, username, error: 'Email deja pris (collision)' });
        errorCount++;
        continue;
      }

      const authUser = await createAuthUser(emailLogin, pin, {
        role: 'child',
        username,
        parent_id,
        created_via: 'migration-script-phase4',
        original_child_id: id
      });

      try {
        await updateChildProfile(id, emailLogin, authUser.id);
        console.log('OK   ' + username.padEnd(15) + ' -> ' + emailLogin.padEnd(35) + ' (auth_id: ' + authUser.id.slice(0, 8) + '...)');
        okCount++;
      } catch (updateErr) {
        console.error('FAIL ' + username + ' : UPDATE echec, rollback auth cree');
        await deleteAuthUser(authUser.id);
        errors.push({ id, username, error: updateErr.message });
        errorCount++;
      }
    } catch (e) {
      console.error('FAIL ' + username.padEnd(15) + ' : ' + e.message);
      errors.push({ id, username, error: e.message });
      errorCount++;
    }
  }

  console.log('');
  console.log('===========================================================');
  console.log('  RESULTAT FINAL ' + (DRY_RUN ? '(DRY-RUN - rien n a ete modifie)' : '(REEL)'));
  console.log('===========================================================');
  console.log('  Succes : ' + okCount);
  console.log('  Skip   : ' + skipCount);
  console.log('  Erreurs: ' + errorCount);
  if (errors.length > 0) {
    console.log('');
    console.log('  Details erreurs :');
    errors.forEach(e => console.log('    - ' + e.username + ' (' + e.id.slice(0, 8) + '...) : ' + e.error));
  }
  console.log('===========================================================');

  if (DRY_RUN) {
    console.log('');
    console.log('Si la liste te convient, relance SANS --dry-run pour migrer pour de vrai.');
  }
}

migrate().catch(e => {
  console.error('CRASH non gere : ' + e.message);
  console.error(e.stack);
  process.exit(1);
});
