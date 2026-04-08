/**
 * ACADÉMIE PIRATE — Upload Engine
 * scripts/lib/engine.js
 * Règle ARCHI-01 : module pur, sans dépendances externes
 * Règle ASSET-01 : source de vérité pour tous les uploads
 *
 * Responsabilités :
 *  - Récupérer les images via Jikan API (MyAnimeList)
 *  - Télécharger les images
 *  - Uploader vers Supabase Storage (bucket configuré)
 *  - Copier en local (assets/images/) pour OP et DBZ
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
      // Suivre les redirections (max 3)
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

// ─── Jikan API ─────────────────────────────────────────────────────

async function _getJikanImage(jikanId, rateLimitMs, charName) {
  const delay = rateLimitMs || 700;
  await _sleep(delay);

  // Essai 1 : galerie pictures
  try {
    const r = await _get(`${JIKAN_BASE}/characters/${jikanId}/pictures`);
    if (r.status === 200) {
      const d = JSON.parse(r.body);
      if (d.data && d.data.length > 0) {
        return d.data[0].jpg.large_image_url || d.data[0].jpg.image_url;
      }
    }
    if (r.status === 429) return null; // rate-limited
  } catch (_) {}

  // Essai 2 : profil du personnage
  await _sleep(delay);
  try {
    const r = await _get(`${JIKAN_BASE}/characters/${jikanId}`);
    if (r.status === 200) {
      const d = JSON.parse(r.body);
      const img = d.data?.images?.jpg?.large_image_url
                || d.data?.images?.jpg?.image_url;
      if (img) return img;
    }
  } catch (_) {}

  // Essai 3 : recherche par nom (fallback si ID faux)
  if (charName) {
    await _sleep(delay);
    try {
      const query = encodeURIComponent(charName.split(' ')[0]); // prénom seulement
      const r = await _get(`${JIKAN_BASE}/characters?q=${query}&limit=5`);
      if (r.status === 200) {
        const d = JSON.parse(r.body);
        if (d.data && d.data.length > 0) {
          // Trouver le meilleur match par nom
          const match = d.data.find(c =>
            c.name.toLowerCase().includes(charName.toLowerCase().split(' ')[0]) ||
            charName.toLowerCase().includes(c.name.toLowerCase().split(' ')[0])
          ) || d.data[0];
          return match.images?.jpg?.large_image_url
              || match.images?.jpg?.image_url
              || null;
        }
      }
    } catch (_) {}
  }

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
 * @param {object} character - { name, jikanId, storage, bucket, path, localPath }
 * @param {object} config    - { supabaseUrl, serviceKey, repoRoot, rateLimitMs, skipExisting }
 * @param {object} reporter  - { progress(char, status, msg), log(msg) }
 * @returns {string}         - 'ok' | 'skipped' | 'failed'
 */
async function processCharacter(character, config, reporter) {
  const { name, jikanId, storage, bucket, path: remotePath, localPath } = character;
  const { supabaseUrl, serviceKey, repoRoot, rateLimitMs, skipExisting } = config;

  // ── Vérifier si déjà présent (mode local) ──
  if (storage === 'local' && localPath && skipExisting !== false) {
    const fullLocal = path.join(repoRoot, localPath);
    if (fs.existsSync(fullLocal)) {
      reporter.progress(name, 'skipped', 'déjà présent');
      return 'skipped';
    }
  }

  // ── Récupérer URL image via Jikan ──
  reporter.progress(name, 'fetching', '');
  const imgUrl = await _getJikanImage(jikanId, config.rateLimitMs, name);
  if (!imgUrl) {
    reporter.progress(name, 'failed', 'image introuvable sur Jikan');
    return 'failed';
  }

  // ── Télécharger ──
  _ensureDir(TMP_DIR);
  const ext     = (imgUrl.split('?')[0].split('.').pop() || 'jpg').slice(0, 4);
  const tmpFile = path.join(TMP_DIR, `char_${Date.now()}.${ext}`);

  try {
    await _download(imgUrl, tmpFile);
  } catch(e) {
    reporter.progress(name, 'failed', 'téléchargement: ' + e.message);
    return 'failed';
  }

  // ── Upload / Copie ──
  try {
    const kb = Math.round(fs.statSync(tmpFile).size / 1024);

    if (storage === 'supabase') {
      if (!serviceKey) throw new Error('SUPABASE_SERVICE_KEY manquant');
      await _uploadSupabase(tmpFile, supabaseUrl, serviceKey, bucket, remotePath);
      reporter.progress(name, 'ok', `Supabase ${kb}KB`);
    } else {
      const dest = path.join(repoRoot, localPath);
      _ensureDir(path.dirname(dest));
      fs.copyFileSync(tmpFile, dest);
      reporter.progress(name, 'ok', `local ${kb}KB`);
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
