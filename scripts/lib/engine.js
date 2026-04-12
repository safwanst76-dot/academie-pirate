/**
 * ACADÉMIE PIRATE — Upload Engine
 * scripts/lib/engine.js
 * Règle ARCHI-01 : module pur, sans dépendances externes
 * Règle ASSET-01 : source de vérité pour tous les uploads
 * Règle ASSET-02 : PRIORITÉ sources locales (scripts/sources/) avant Jikan
 *
 * Responsabilités :
 *  1. Chercher d'abord dans scripts/sources/{worldId}/ (images manuelles)
 *  2. Fallback Jikan API si aucune source locale trouvée ET --sources-only absent
 *  - Uploader vers Supabase Storage (bucket configuré)
 */

'use strict';

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const os    = require('os');

const JIKAN_BASE = 'https://api.jikan.moe/v4';
const TMP_DIR    = path.join(os.tmpdir(), 'ap-assets');

// ─── HTTP helpers ──────────────────────────────────────────────────

function _get(url, opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {};
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'AcademiePirate-AssetEngine/3.0', ...(opts.headers || {}) },
      timeout: opts.timeout || 12000,
    }, res => {
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location && (opts.redirects || 0) < 3) {
        return _get(res.headers.location, { ...opts, redirects: (opts.redirects || 0) + 1 })
          .then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end',  () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
  });
}

function _download(url, destPath, opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {};
    const mod  = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    const req = mod.get(url, {
      headers: { 'User-Agent': 'AcademiePirate-AssetEngine/3.0' },
      timeout: opts.timeout || 20000,
    }, res => {
      if ([301,302,303].includes(res.statusCode) && res.headers.location && (opts.redirects || 0) < 3) {
        file.close(); fs.unlinkSync(destPath);
        return _download(res.headers.location, destPath, { ...opts, redirects: (opts.redirects || 0) + 1 })
          .then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close(); try { fs.unlinkSync(destPath); } catch(_) {}
        return reject(new Error('HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error',  e  => { try { fs.unlinkSync(destPath); } catch(_) {} reject(e); });
    });
    req.on('error', e => { try { fs.unlinkSync(destPath); } catch(_) {} reject(e); });
    req.on('timeout', () => { req.destroy(); reject(new Error('Download timeout')); });
  });
}

// ─── Sources locales (ASSET-02 — priorité absolue) ────────────────

/**
 * Cherche l'image d'un personnage dans scripts/sources/{worldId}/
 * Extensions testées dans l'ordre de priorité : jpg, jpeg, png, gif, webp
 * @returns {string|null} chemin absolu vers le fichier trouvé, ou null
 */
function _findLocalSource(repoRoot, worldId, charId) {
  const sourcesDir = path.join(repoRoot, 'scripts', 'sources', worldId);
  if (!fs.existsSync(sourcesDir)) return null;

  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  for (const ext of extensions) {
    const candidate = path.join(sourcesDir, charId + '.' + ext);
    if (fs.existsSync(candidate)) {
      const stat = fs.statSync(candidate);
      if (stat.size > 1024) return candidate; // > 1KB = fichier valide
    }
  }
  return null;
}

// ─── Jikan API ─────────────────────────────────────────────────────

var MIN_VALID_SIZE = 5 * 1024; // 5 KB

async function _fetchAndValidateUrl(url) {
  try {
    const r = await _get(url + '?t=' + Date.now());
    if (r.status !== 200) return null;
    const ct = r.headers && r.headers['content-type'] || '';
    if (!ct.startsWith('image/')) return null;
    const cl = parseInt((r.headers && r.headers['content-length']) || '0', 10);
    if (cl > 0 && cl < MIN_VALID_SIZE) return null;
    return url;
  } catch(_) { return null; }
}

async function _getJikanImage(jikanId, rateLimitMs, charName) {
  const delay = rateLimitMs || 800;

  // Stratégie 1 : recherche par nom
  if (charName) {
    await _sleep(delay);
    try {
      const query = encodeURIComponent(charName);
      const r = await _get(`${JIKAN_BASE}/characters?q=${query}&limit=8`);
      if (r.status === 200) {
        const d = JSON.parse(r.body);
        if (d.data && d.data.length > 0) {
          const nameLow = charName.toLowerCase();
          const match = d.data.find(c => c.name.toLowerCase() === nameLow)
                     || d.data.find(c => c.name.toLowerCase().includes(nameLow.split(' ')[0]))
                     || d.data.find(c => nameLow.includes(c.name.toLowerCase().split(' ')[0]))
                     || d.data[0];
          const img = match.images?.jpg?.large_image_url || match.images?.jpg?.image_url;
          if (img) {
            const valid = await _fetchAndValidateUrl(img);
            if (valid) return valid;
          }
        }
      }
    } catch (_) {}
  }

  // Stratégie 2 : galerie pictures par ID
  await _sleep(delay);
  try {
    const r = await _get(`${JIKAN_BASE}/characters/${jikanId}/pictures`);
    if (r.status === 200) {
      const d = JSON.parse(r.body);
      if (d.data && d.data.length > 0) {
        for (const pic of d.data) {
          const url = pic.jpg.large_image_url || pic.jpg.image_url;
          if (url) {
            const valid = await _fetchAndValidateUrl(url);
            if (valid) return valid;
          }
        }
      }
    }
    if (r.status === 429) return null;
  } catch (_) {}

  // Stratégie 3 : profil par ID
  await _sleep(delay);
  try {
    const r = await _get(`${JIKAN_BASE}/characters/${jikanId}`);
    if (r.status === 200) {
      const d = JSON.parse(r.body);
      const img = d.data?.images?.jpg?.large_image_url
                || d.data?.images?.jpg?.image_url;
      if (img) {
        const valid = await _fetchAndValidateUrl(img);
        if (valid) return valid;
      }
    }
  } catch (_) {}

  return null;
}

// ─── Upload Supabase ───────────────────────────────────────────────

function _uploadSupabase(localPath, supabaseUrl, serviceKey, bucket, remotePath) {
  const data = fs.readFileSync(localPath);
  const ext  = path.extname(localPath).replace('.', '').toLowerCase();
  const mime = { png:'image/png', gif:'image/gif', webp:'image/webp', jpeg:'image/jpeg', jpg:'image/jpeg' }[ext] || 'image/jpeg';
  const url  = new URL(`${supabaseUrl}/storage/v1/object/${bucket}/${remotePath}`);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: url.hostname,
      path:     url.pathname,
      method:   'POST',
      headers:  {
        'Authorization':  `Bearer ${serviceKey}`,
        'apikey':          serviceKey,
        'Content-Type':    mime,
        'Content-Length':  data.length,
        'x-upsert':        'true',
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end',  () => {
        if ([200, 201].includes(res.statusCode)) resolve({ ok: true });
        else reject(new Error(`Supabase ${res.statusCode}: ${body.slice(0, 200)}`));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ─── Helpers ───────────────────────────────────────────────────────

function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function _ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

// ─── Point d'entrée public ─────────────────────────────────────────

/**
 * Traiter un personnage
 * @param {object} character  - { id, name, jikanId, storage, bucket, path, localPath, worldId }
 * @param {object} config     - { supabaseUrl, serviceKey, repoRoot, rateLimitMs, skipExisting, sourcesOnly }
 * @param {object} reporter   - { progress(char, status, msg) }
 * @returns {string}          - 'ok' | 'skipped' | 'failed'
 */
async function processCharacter(character, config, reporter) {
  const { id, name, jikanId, storage, bucket, localPath } = character;
  const remotePath = character.path;
  const { supabaseUrl, serviceKey, repoRoot, rateLimitMs, skipExisting, sourcesOnly, worldId } = config;

  // ── PRIORITÉ 1 : Source locale scripts/sources/{worldId}/ (ASSET-02) ──
  const localSource = _findLocalSource(repoRoot, worldId, id);

  if (localSource) {
    reporter.progress(name, 'fetching', 'source locale → ' + path.basename(localSource));
    try {
      const kb = Math.round(fs.statSync(localSource).size / 1024);
      if (storage === 'supabase') {
        if (!serviceKey) throw new Error('SUPABASE_SERVICE_KEY manquant');
        await _uploadSupabase(localSource, supabaseUrl, serviceKey, bucket, remotePath);
        reporter.progress(name, 'ok', `Supabase ${kb}KB (source locale)`);
      } else {
        const dest = path.join(repoRoot, localPath);
        _ensureDir(path.dirname(dest));
        fs.copyFileSync(localSource, dest);
        reporter.progress(name, 'ok', `local ${kb}KB (source locale)`);
      }
      return 'ok';
    } catch(e) {
      reporter.progress(name, 'failed', 'upload source locale: ' + e.message);
      return 'failed';
    }
  }

  // ── PRIORITÉ 2 : Vérifier si déjà présent en local ──
  if (storage === 'local' && localPath && skipExisting !== false) {
    const fullLocal = path.join(repoRoot, localPath);
    if (fs.existsSync(fullLocal)) {
      reporter.progress(name, 'skipped', 'déjà présent');
      return 'skipped';
    }
  }

  // ── PRIORITÉ 3 : Jikan API (bloqué si --sources-only) ──
  if (sourcesOnly) {
    reporter.progress(name, 'failed', 'aucune source locale — Jikan désactivé (--sources-only)');
    return 'failed';
  }

  reporter.progress(name, 'fetching', 'Jikan API...');
  const imgUrl = await _getJikanImage(jikanId, rateLimitMs, name);
  if (!imgUrl) {
    reporter.progress(name, 'failed', 'image introuvable sur Jikan');
    return 'failed';
  }

  // ── Télécharger depuis Jikan ──
  _ensureDir(TMP_DIR);
  const ext     = (imgUrl.split('?')[0].split('.').pop() || 'jpg').slice(0, 4);
  const tmpFile = path.join(TMP_DIR, `char_${Date.now()}.${ext}`);

  try {
    await _download(imgUrl, tmpFile);
  } catch(e) {
    reporter.progress(name, 'failed', 'téléchargement: ' + e.message);
    return 'failed';
  }

  try {
    const kb = Math.round(fs.statSync(tmpFile).size / 1024);
    if (storage === 'supabase') {
      if (!serviceKey) throw new Error('SUPABASE_SERVICE_KEY manquant');
      await _uploadSupabase(tmpFile, supabaseUrl, serviceKey, bucket, remotePath);
      reporter.progress(name, 'ok', `Supabase ${kb}KB (Jikan)`);
    } else {
      const dest = path.join(repoRoot, localPath);
      _ensureDir(path.dirname(dest));
      fs.copyFileSync(tmpFile, dest);
      reporter.progress(name, 'ok', `local ${kb}KB (Jikan)`);
    }
    return 'ok';
  } catch(e) {
    reporter.progress(name, 'failed', 'upload: ' + e.message);
    return 'failed';
  } finally {
    try { fs.unlinkSync(tmpFile); } catch(_) {}
  }
}

module.exports = { processCharacter };
