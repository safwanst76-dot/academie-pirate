#!/usr/bin/env node
/**
 * ACADÉMIE PIRATE — Asset Audit & Repair
 * scripts/audit.js
 * Règle ASSET-01 : vérification + réparation automatique
 *
 * PRIORITÉ DES SOURCES (ordre décroissant) :
 *   1. scripts/sources/{world}/{fichier}  ← images téléchargées manuellement (MEILLEURE QUALITÉ)
 *   2. assets/images/{dossier}/{fichier}  ← images locales déjà dans le repo
 *   3. Jikan API (MyAnimeList)            ← fallback automatique si rien de local
 *
 * Pour utiliser tes propres images :
 *   mkdir -p scripts/sources/aot
 *   cp ~/ma-belle-image.jpg scripts/sources/aot/levi.jpg
 *   → Le script la détecte et l'uploade en priorité
 *
 * USAGE :
 *   node scripts/audit.js                        ← audit lecture seule
 *   node scripts/audit.js --world=aot            ← seulement AOT
 *   SUPABASE_SERVICE_KEY=xxx node scripts/audit.js --fix               ← réparer cassées
 *   SUPABASE_SERVICE_KEY=xxx node scripts/audit.js --fix --sources-only ← uploader TOUTES les images manuelles
 *   SUPABASE_SERVICE_KEY=xxx node scripts/audit.js --fix --force-all    ← tout réuploader (Jikan si pas de source)
 *   SUPABASE_SERVICE_KEY=xxx node scripts/audit.js --fix --world=ds     ← seulement DS
 *   node scripts/audit.js --min-size=10          ← seuil 10 KB
 */

'use strict';

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const os    = require('os');

// ─── CONFIG ────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY || '';
const REPO_ROOT    = path.resolve(__dirname, '..');
const ASSETS_DIR   = path.join(__dirname, 'assets');
const SOURCES_DIR  = path.join(__dirname, 'sources');   // images manuelles prioritaires
const JIKAN_BASE   = 'https://api.jikan.moe/v4';
const TMP_DIR      = path.join(os.tmpdir(), 'ap-audit');
const REPORT_PATH  = path.join(REPO_ROOT, 'audit-report.html');

// ─── ARGS ──────────────────────────────────────────────────────────
const argv     = process.argv.slice(2);
const arg      = k => (argv.find(a => a.startsWith(`--${k}=`)) || '').split('=').slice(1).join('=');
const flag     = k => argv.includes(`--${k}`);
const WORLD        = arg('world') || 'all';
const FIX          = flag('fix');
const SOURCES_ONLY = flag('sources-only'); // uploader UNIQUEMENT depuis scripts/sources/
const FORCE_ALL    = flag('force-all');    // uploader TOUT, même les images OK
const MIN_SIZE     = parseInt(arg('min-size') || '5', 10) * 1024;

// ─── HELPERS ───────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function headRequest(url) {
  return new Promise(resolve => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, {
      method: 'HEAD', timeout: 8000,
      headers: { 'User-Agent': 'AcademiePirate-Audit/2.0' }
    }, res => {
      const size = parseInt(res.headers['content-length'] || '0', 10);
      const type = res.headers['content-type'] || '';
      resolve({
        status: res.statusCode,
        size,
        ok: res.statusCode === 200 && size > 0,
        isImage: type.startsWith('image/')
      });
    });
    req.on('error', () => resolve({ status: 0, size: 0, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, size: 0, ok: false }); });
    req.end();
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'AcademiePirate-Audit/2.0' }, timeout: 10000
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const mod  = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    const req  = mod.get(url, {
      headers: { 'User-Agent': 'AcademiePirate-Audit/2.0' }, timeout: 20000
    }, res => {
      if ([301,302,303].includes(res.statusCode) && res.headers.location) {
        file.close(); fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close(); try { fs.unlinkSync(dest); } catch(_){}
        return reject(new Error('HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', e => { try { fs.unlinkSync(dest); } catch(_){} reject(e); });
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function uploadSupabase(localPath, bucket, remotePath) {
  const data = fs.readFileSync(localPath);
  const ext  = path.extname(localPath).replace('.', '').toLowerCase();
  const mime = { png:'image/png', gif:'image/gif', webp:'image/webp', jpeg:'image/jpeg', jpg:'image/jpeg' }[ext] || 'image/jpeg';
  const url  = new URL(`${SUPABASE_URL}/storage/v1/object/${bucket}/${remotePath}`);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: url.hostname, path: url.pathname, method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`, 'apikey': SERVICE_KEY,
        'Content-Type': mime, 'Content-Length': data.length, 'x-upsert': 'true'
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () =>
        [200,201].includes(res.statusCode) ? resolve() : reject(new Error(`${res.statusCode}: ${body.slice(0,120)}`))
      );
    });
    req.on('error', reject);
    req.write(data); req.end();
  });
}

// ─── PRIORITÉ SOURCE : local → repo → Jikan ────────────────────────
/**
 * Trouver la meilleure source pour une image
 * Retourne { type: 'sources'|'repo'|'jikan'|null, path?: string, url?: string }
 */
async function findBestSource(asset, delay) {
  const charId = asset.id;
  const worldId = asset.worldId;

  // ── PRIORITÉ 1 : scripts/sources/{world}/{id}.* ──────────────────
  // Image déposée manuellement par l'utilisateur = MEILLEURE QUALITÉ
  if (fs.existsSync(SOURCES_DIR)) {
    const worldSrcDir = path.join(SOURCES_DIR, worldId);
    if (fs.existsSync(worldSrcDir)) {
      const exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      for (const ext of exts) {
        const candidate = path.join(worldSrcDir, charId + ext);
        if (fs.existsSync(candidate)) {
          const size = fs.statSync(candidate).size;
          if (size >= MIN_SIZE) {
            return { type: 'sources', path: candidate, size };
          }
        }
      }
    }
  }

  // ── PRIORITÉ 2 : assets/images/{localDir}/{localFile} ────────────
  // Images déjà dans le repo (téléchargées manuellement avant)
  if (asset.localPath) {
    const repoPath = path.join(REPO_ROOT, asset.localPath);
    if (fs.existsSync(repoPath)) {
      const size = fs.statSync(repoPath).size;
      if (size >= MIN_SIZE) {
        return { type: 'repo', path: repoPath, size };
      }
    }
  }

  // ── PRIORITÉ 3 : Jikan API ───────────────────────────────────────
  await sleep(delay || 700);
  try {
    // Essai 1 : pictures
    const r1 = await fetchJson(`${JIKAN_BASE}/characters/${asset.jikanId}/pictures`);
    if (r1.status === 200 && r1.data.data?.length > 0) {
      return { type: 'jikan', url: r1.data.data[0].jpg.large_image_url || r1.data.data[0].jpg.image_url };
    }
  } catch(_) {}

  await sleep(delay || 700);
  try {
    // Essai 2 : profil
    const r2 = await fetchJson(`${JIKAN_BASE}/characters/${asset.jikanId}`);
    if (r2.status === 200) {
      const img = r2.data.data?.images?.jpg?.large_image_url || r2.data.data?.images?.jpg?.image_url;
      if (img) return { type: 'jikan', url: img };
    }
  } catch(_) {}

  await sleep(delay || 700);
  try {
    // Essai 3 : search par nom
    const q  = encodeURIComponent(asset.name.split(' ')[0]);
    const r3 = await fetchJson(`${JIKAN_BASE}/characters?q=${q}&limit=5`);
    if (r3.status === 200 && r3.data.data?.length > 0) {
      const match = r3.data.data.find(c =>
        c.name.toLowerCase().includes(asset.name.toLowerCase().split(' ')[0])
      ) || r3.data.data[0];
      const img = match.images?.jpg?.large_image_url || match.images?.jpg?.image_url;
      if (img) return { type: 'jikan', url: img };
    }
  } catch(_) {}

  return { type: null };
}

// ─── CHARGER LES ASSETS ────────────────────────────────────────────
function loadAllAssets() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('❌ Dossier scripts/assets/ introuvable');
    process.exit(1);
  }
  return fs.readdirSync(ASSETS_DIR)
    .filter(f => f.endsWith('.json'))
    .filter(f => WORLD === 'all' || path.basename(f, '.json') === WORLD)
    .flatMap(f => {
      const worldId = path.basename(f, '.json');
      const world   = JSON.parse(fs.readFileSync(path.join(ASSETS_DIR, f), 'utf8'));
      return world.characters.map(c => ({
        worldId, worldName: world.name, worldEmoji: world.emoji || '📦',
        storage:    world.storage,
        bucket:     world.bucket || null,
        localDir:   world.localDir || null,
        id:         c.id,
        name:       c.name,
        type:       c.type || 'neutral',
        jikanId:    c.jikanId,
        remotePath: c.path || null,
        localPath:  c.localFile && world.localDir ? path.join(world.localDir, c.localFile) : null,
        supabaseUrl: c.path
          ? `${SUPABASE_URL}/storage/v1/object/public/${world.bucket}/${c.path}`
          : null,
      }));
    });
}

// ─── VÉRIFIER UN ASSET ────────────────────────────────────────────
async function checkAsset(asset) {
  // Local
  if (asset.storage === 'local' && asset.localPath) {
    const full = path.join(REPO_ROOT, asset.localPath);
    if (!fs.existsSync(full)) return { ...asset, status: 'missing', size: 0 };
    const size = fs.statSync(full).size;
    return { ...asset, status: size < MIN_SIZE ? 'broken' : 'ok', size };
  }
  // Supabase
  if (!asset.supabaseUrl) return { ...asset, status: 'no-url', size: 0 };
  const r = await headRequest(asset.supabaseUrl);
  if (!r.ok) return { ...asset, status: 'missing', size: 0 };
  if (r.size > 0 && r.size < MIN_SIZE) return { ...asset, status: 'broken', size: r.size };
  return { ...asset, status: 'ok', size: r.size };
}

// ─── RÉPARER UN ASSET ─────────────────────────────────────────────
async function repairAsset(asset) {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  // Trouver la meilleure source
  const source = await findBestSource(asset, 700);

  if (!source.type) {
    return { ...asset, repaired: false, reason: 'Aucune source disponible' };
  }

  const sourceLabel = { sources: '🥇 Manuel', repo: '📁 Repo', jikan: '🌐 Jikan' }[source.type];

  // Si source locale (sources/ ou repo) → utiliser directement
  let localFile = source.path || null;
  let tmpCreated = false;

  if (!localFile && source.url) {
    // Télécharger depuis Jikan
    const ext     = (source.url.split('?')[0].split('.').pop() || 'jpg').slice(0,4);
    localFile     = path.join(TMP_DIR, `repair_${Date.now()}.${ext}`);
    tmpCreated    = true;
    try {
      await downloadFile(source.url, localFile);
      const size = fs.statSync(localFile).size;
      if (size < MIN_SIZE) {
        fs.unlinkSync(localFile);
        return { ...asset, repaired: false, reason: `Image trop petite depuis Jikan (${size}B)` };
      }
    } catch(e) {
      return { ...asset, repaired: false, reason: 'Téléchargement: ' + e.message };
    }
  }

  // Uploader / copier
  try {
    const kb = Math.round(fs.statSync(localFile).size / 1024);

    if (asset.storage === 'supabase') {
      if (!SERVICE_KEY) {
        if (tmpCreated) fs.unlinkSync(localFile);
        return { ...asset, repaired: false, reason: 'SUPABASE_SERVICE_KEY manquant' };
      }
      await uploadSupabase(localFile, asset.bucket, asset.remotePath);
    } else {
      const dest = path.join(REPO_ROOT, asset.localPath);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      // Ne copier que si la source est différente du dest
      if (localFile !== dest) fs.copyFileSync(localFile, dest);
    }

    if (tmpCreated) try { fs.unlinkSync(localFile); } catch(_){}
    return { ...asset, repaired: true, sourceType: source.type, sourceLabel, newSize: kb };
  } catch(e) {
    if (tmpCreated) try { fs.unlinkSync(localFile); } catch(_){}
    return { ...asset, repaired: false, reason: e.message };
  }
}

// ─── RAPPORT HTML ─────────────────────────────────────────────────
function generateReport(results, fixResults) {
  const ok      = results.filter(r => r.status === 'ok');
  const broken  = results.filter(r => r.status === 'broken');
  const missing = results.filter(r => ['missing','no-url'].includes(r.status));
  const repaired = (fixResults||[]).filter(r => r.repaired);
  const failed   = (fixResults||[]).filter(r => !r.repaired);

  const SC = { ok:'#06d6a0', broken:'#ef4444', missing:'#f97316', 'no-url':'#ffd700' };
  const TI = { hero:'🦸', villain:'😈', boss:'⚔️', neutral:'👤' };
  const sourceBadge = { sources:'🥇', repo:'📁', jikan:'🌐' };

  const rows = results.map(r => {
    const fix = (fixResults||[]).find(f => f.id === r.id && f.worldId === r.worldId);
    const kb  = r.size > 0 ? `${Math.round(r.size/1024)} KB` : '—';
    let fixCell = '';
    if (fix) {
      fixCell = fix.repaired
        ? `${sourceBadge[fix.sourceType]||''} Réparé ${fix.newSize}KB`
        : `❌ ${fix.reason||'?'}`;
    }
    return `<tr class="row-${r.status}">
      <td>${TI[r.type]||'👤'} <strong>${r.worldId}</strong></td>
      <td>${r.name}</td>
      <td style="color:${SC[r.status]||'#fff'}">${r.status.toUpperCase()}</td>
      <td>${kb}</td>
      <td class="path">${r.remotePath||r.localPath||'—'}</td>
      <td>${fixCell}</td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="fr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>🏴‍☠️ Audit Assets — Académie Pirate</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0d0d1a;color:#e8eaf6;font-family:'Segoe UI',sans-serif;padding:24px;font-size:14px}
h1{font-size:1.6rem;margin-bottom:6px}
.sub{color:#7986cb;font-size:.8rem;margin-bottom:20px}
.stats{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px}
.stat{background:rgba(255,255,255,.06);border-radius:10px;padding:14px 20px;text-align:center;min-width:100px}
.stat-n{font-size:1.8rem;font-weight:900}
.stat-l{font-size:.68rem;opacity:.6;text-transform:uppercase;letter-spacing:1px;margin-top:2px}
.c-ok{color:#06d6a0}.c-br{color:#ef4444}.c-ms{color:#f97316}.c-rp{color:#ffd700}
.legend{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 18px;margin-bottom:20px;font-size:.78rem;line-height:1.8}
.legend strong{color:#a5b4fc}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.filter-btn{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;
  padding:4px 13px;cursor:pointer;font-size:.75rem;color:#e8eaf6;transition:all .15s}
.filter-btn:hover,.filter-btn.active{background:rgba(99,102,241,.35);border-color:#6366f1}
table{width:100%;border-collapse:collapse;font-size:.8rem}
th{text-align:left;padding:9px 10px;background:rgba(255,255,255,.04);
  color:rgba(255,255,255,.45);font-size:.68rem;letter-spacing:1px;text-transform:uppercase}
td{padding:8px 10px;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:middle}
tr:hover td{background:rgba(255,255,255,.025)}
.path{font-size:.68rem;opacity:.5;word-break:break-all;max-width:200px}
.row-ok{display:none}.row-ok.show{display:table-row}
.row-broken,.row-missing,.row-no-url{display:table-row}
</style></head><body>
<h1>🏴‍☠️ Académie Pirate — Audit Assets</h1>
<div class="sub">
  ${new Date().toLocaleString('fr-FR')} · ${results.length} images · seuil ${Math.round(MIN_SIZE/1024)} KB
  ${FIX ? '· Mode RÉPARATION' : '· Mode AUDIT seul'}
</div>

<div class="stats">
  <div class="stat"><div class="stat-n c-ok">${ok.length}</div><div class="stat-l">✅ Valides</div></div>
  <div class="stat"><div class="stat-n c-br">${broken.length}</div><div class="stat-l">⚠️ Cassées</div></div>
  <div class="stat"><div class="stat-n c-ms">${missing.length}</div><div class="stat-l">❌ Manquantes</div></div>
  <div class="stat"><div class="stat-n c-rp">${repaired.length}</div><div class="stat-l">🔧 Réparées</div></div>
  <div class="stat"><div class="stat-n c-br">${failed.length}</div><div class="stat-l">💀 Échecs</div></div>
</div>

<div class="legend">
  <strong>Priorité des sources lors de la réparation :</strong><br>
  🥇 Manuel (<code>scripts/sources/{monde}/{id}.jpg</code>) — tes images = meilleure qualité<br>
  📁 Repo (<code>assets/images/</code>) — images déjà dans le dépôt Git<br>
  🌐 Jikan (MyAnimeList API) — fallback automatique si aucune source locale<br><br>
  <strong>Pour utiliser tes propres images :</strong>
  <code>mkdir -p scripts/sources/aot && cp ton-image.jpg scripts/sources/aot/levi.jpg</code>
</div>

<div class="filters">
  <span style="font-size:.75rem;opacity:.5;margin-right:4px">Filtrer :</span>
  <button class="filter-btn active" onclick="showFilter('all',this)">Tout (${results.length})</button>
  <button class="filter-btn" onclick="showFilter('broken',this)">⚠️ Cassées (${broken.length})</button>
  <button class="filter-btn" onclick="showFilter('missing',this)">❌ Manquantes (${missing.length})</button>
  <button class="filter-btn" onclick="showFilter('ok',this)">✅ Valides (${ok.length})</button>
</div>

<table>
<thead><tr><th>Monde</th><th>Personnage</th><th>Statut</th><th>Taille</th><th>Chemin</th><th>Réparation</th></tr></thead>
<tbody>${rows}</tbody>
</table>

<script>
function showFilter(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const okRows = document.querySelectorAll('.row-ok');
  if (type === 'all') { okRows.forEach(r => r.classList.add('show')); }
  else if (type === 'ok') { okRows.forEach(r => r.classList.add('show')); }
  else { okRows.forEach(r => r.classList.remove('show')); }
}
</script>
</body></html>`;

  fs.writeFileSync(REPORT_PATH, html, 'utf8');
}

// ─── MAIN ─────────────────────────────────────────────────────────
async function main() {
  const assets = loadAllAssets();

  console.log('\n🏴‍☠️  ACADÉMIE PIRATE — Audit Assets v2');
  console.log(`   Monde   : ${WORLD}  |  Seuil : ${Math.round(MIN_SIZE/1024)} KB  |  Mode : ${FIX ? 'AUDIT + FIX' : 'AUDIT SEUL'}`);
  console.log(`   Assets  : ${assets.length} à vérifier`);

  // Vérifier si sources/ existe
  if (fs.existsSync(SOURCES_DIR)) {
    const srcWorlds = fs.readdirSync(SOURCES_DIR).filter(f =>
      fs.statSync(path.join(SOURCES_DIR,f)).isDirectory()
    );
    if (srcWorlds.length > 0) {
      console.log(`   Sources : scripts/sources/${srcWorlds.join(', ')} (images prioritaires détectées)`);
    }
  } else {
    console.log(`   Sources : scripts/sources/ absent (créer pour images prioritaires)`);
  }
  console.log('');

  // ── Phase 1 : Audit ──────────────────────────────────────────────
  const results = [];
  for (let i = 0; i < assets.length; i++) {
    const a   = assets[i];
    const num = `[${String(i+1).padStart(3)}/${assets.length}]`;
    process.stdout.write(`${num} ${a.name.padEnd(24)} `);
    let r;

    if (SOURCES_ONLY || FORCE_ALL) {
      // Vérifier si une source manuelle existe pour cet asset
      const worldSrcDir = path.join(SOURCES_DIR, a.worldId);
      const exts = ['.jpg','.jpeg','.png','.webp','.gif'];
      const hasManualSrc = fs.existsSync(worldSrcDir) && exts.some(ext =>
        fs.existsSync(path.join(worldSrcDir, a.id + ext))
      );
      if (hasManualSrc) {
        // Forcer le statut "broken" pour déclencher la réparation
        r = { ...a, status: 'broken', size: 0 };
        console.log(`🥇 source manuelle détectée → à uploader`);
      } else if (FORCE_ALL) {
        r = { ...a, status: 'broken', size: 0 };
        console.log(`🔄 forcer réparation`);
      } else {
        // Pas de source manuelle → skip
        r = { ...a, status: 'ok', size: 0 };
        process.stdout.write('⏭  pas de source locale\n');
      }
    } else {
      r = await checkAsset(a);
      if (r.status === 'ok')
        console.log(`✅ ${Math.round(r.size/1024)||'?'} KB`);
      else if (r.status === 'broken')
        console.log(`⚠️  ${Math.round(r.size/1024)} KB — TROP PETITE`);
      else
        console.log(`❌ ${r.status.toUpperCase()}`);
    }
    results.push(r);
    if ((i+1) % 15 === 0) await sleep(150);
  }

  // ── Résumé ───────────────────────────────────────────────────────
  const broken = results.filter(r => r.status !== 'ok');
  console.log(`\n${'═'.repeat(52)}`);
  console.log(`📊 AUDIT`);
  console.log(`   ✅ OK        : ${results.filter(r=>r.status==='ok').length}`);
  console.log(`   ⚠️  Cassées   : ${results.filter(r=>r.status==='broken').length}`);
  console.log(`   ❌ Manquantes : ${results.filter(r=>r.status==='missing').length}`);
  console.log(`   Total        : ${broken.length} à corriger`);

  // ── Phase 2 : Fix ────────────────────────────────────────────────
  let fixResults = null;
  if (FIX && broken.length > 0) {
    if (!SERVICE_KEY) {
      console.log(`\n⚠️  SUPABASE_SERVICE_KEY manquant — uploads Supabase impossibles`);
      console.log(`   Les assets locaux (One Piece, DBZ) peuvent quand même être réparés`);
    }
    console.log(`\n🔧 RÉPARATION — ${broken.length} images\n`);
    console.log(`   Priorité : 🥇 scripts/sources/ → 📁 assets/images/ → 🌐 Jikan\n`);
    fixResults = [];

    for (let i = 0; i < broken.length; i++) {
      const a   = broken[i];
      const num = `[${i+1}/${broken.length}]`;
      process.stdout.write(`${num} 🔧 ${a.name.padEnd(24)} `);
      const r = await repairAsset(a);
      fixResults.push(r);
      if (r.repaired)
        console.log(`${r.sourceLabel} → ✅ ${r.newSize} KB`);
      else
        console.log(`❌ ${r.reason}`);
    }

    const repaired = fixResults.filter(r => r.repaired);
    const failed   = fixResults.filter(r => !r.repaired);
    const bySource = { sources:0, repo:0, jikan:0 };
    repaired.forEach(r => { bySource[r.sourceType] = (bySource[r.sourceType]||0)+1; });

    console.log(`\n${'═'.repeat(52)}`);
    console.log(`🔧 RÉPARATION`);
    console.log(`   ✅ Réparées : ${repaired.length}/${broken.length}`);
    if (bySource.sources) console.log(`      🥇 Depuis scripts/sources/ : ${bySource.sources}`);
    if (bySource.repo)    console.log(`      📁 Depuis assets/images/   : ${bySource.repo}`);
    if (bySource.jikan)   console.log(`      🌐 Depuis Jikan API         : ${bySource.jikan}`);
    if (failed.length > 0) {
      console.log(`\n   ❌ Échecs (à traiter manuellement) :`);
      failed.forEach(f => console.log(`      - ${f.name} : ${f.reason}`));
    }
    if (repaired.filter(r=>r.storage==='local').length > 0) {
      console.log(`\n📝 Assets locaux modifiés — commiter :`);
      console.log(`   git add assets/ && git commit -m "fix: assets réparés" && git push`);
    }
  } else if (!FIX && broken.length > 0) {
    console.log(`\n🔧 Pour réparer automatiquement :`);
    console.log(`   SUPABASE_SERVICE_KEY=xxx node scripts/audit.js --fix`);
  }

  // ── Rapport HTML ─────────────────────────────────────────────────
  generateReport(results, fixResults);
  console.log(`\n📄 Rapport : open audit-report.html`);
  console.log('\n✅ Terminé.\n');
}

main().catch(e => { console.error('\n❌', e.message); process.exit(1); });
