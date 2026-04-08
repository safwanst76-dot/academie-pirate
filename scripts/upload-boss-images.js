#!/usr/bin/env node
/**
 * ACADÉMIE PIRATE — Script d'upload des images boss
 * scripts/upload-boss-images.js
 *
 * USAGE :
 *   1. cd ~/academie-pirate/academie-pirate
 *   2. npm install @supabase/supabase-js node-fetch@2
 *   3. SUPABASE_SERVICE_KEY=xxx node scripts/upload-boss-images.js
 *
 * Ce script :
 *   - Télécharge les images boss via Jikan API (MyAnimeList)
 *   - Les uploade dans les buckets Supabase correspondants
 *   - Affiche un rapport complet avec ✅ / ❌
 */

const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const os     = require('os');

// ─── CONFIG ────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY || '';
const JIKAN_BASE   = 'https://api.jikan.moe/v4';
const TMP_DIR      = path.join(os.tmpdir(), 'academie-pirate-boss');

if (!SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY manquant.');
  console.error('   Relance avec : SUPABASE_SERVICE_KEY=xxx node scripts/upload-boss-images.js');
  process.exit(1);
}

// ─── IMAGES À TÉLÉCHARGER ──────────────────────────────────────────
const BOSS_IMAGES = [

  // ══ ENGLISH (AOT) — Vraies formes titanesques ══
  // bucket: island-aot / dossier: bosses/
  {
    bucket:   'island-aot',
    path:     'bosses/titan-colossal.jpg',
    jikanId:  40881,   // Bertholdt Hoover
    name:     'Titan Colossal',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Colossal_titan.png/220px-Colossal_titan.png',
  },
  {
    bucket:   'island-aot',
    path:     'bosses/titan-cuirasse.jpg',
    jikanId:  36830,   // Reiner Braun
    name:     'Titan Cuirassé',
    fallback: null,
  },
  {
    bucket:   'island-aot',
    path:     'bosses/titan-feminin.jpg',
    jikanId:  40882,   // Annie Leonhart
    name:     'Titan Féminin',
    fallback: null,
  },
  {
    bucket:   'island-aot',
    path:     'bosses/titan-bestial.jpg',
    jikanId:  40884,   // Zeke Yeager
    name:     'Titan Bestial',
    fallback: null,
  },

  // ══ NAMEK (JJK) — Boss ══
  // bucket: island-namek / dossier: characters/
  {
    bucket:  'island-namek',
    path:    'characters/mahito.jpg',
    jikanId: 195656,
    name:    'Mahito',
  },
  {
    bucket:  'island-namek',
    path:    'characters/jogo.png',
    jikanId: 195657,
    name:    'Jogo',
  },
  {
    bucket:  'island-namek',
    path:    'characters/hanami.png',
    jikanId: 195658,
    name:    'Hanami',
  },
  {
    bucket:  'island-namek',
    path:    'characters/sukuna.jpg',
    jikanId: 195659,
    name:    'Ryomen Sukuna',
  },
  {
    bucket:  'island-namek',
    path:    'characters/dagon.png',
    jikanId: 195660,
    name:    'Dagon',
  },
  {
    bucket:  'island-namek',
    path:    'characters/choso.png',
    jikanId: 195661,
    name:    'Choso',
  },
  {
    bucket:  'island-namek',
    path:    'characters/geto.png',
    jikanId: 152591,
    name:    'Geto Suguru',
  },
  {
    bucket:  'island-namek',
    path:    'characters/kenjaku.png',
    jikanId: 195662,
    name:    'Kenjaku',
  },

  // ══ KANTO (DS) — Boss supplémentaires ══
  {
    bucket:  'island-demon-slayer',
    path:    'characters/nakime.jpeg',
    jikanId: 172991,
    name:    'Nakime',
  },
  {
    bucket:  'island-demon-slayer',
    path:    'characters/gyutaro.jpg',
    jikanId: 172992,
    name:    'Gyutaro',
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'AcademiePirate/1.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('JSON parse failed: ' + data.slice(0, 100))); }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    const req = mod.get(url, { headers: { 'User-Agent': 'AcademiePirate/1.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error('HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', e => { fs.unlink(dest, () => {}); reject(e); });
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Download timeout')); });
  });
}

async function getJikanImage(characterId) {
  try {
    // Attendre 600ms pour respecter le rate limit Jikan (2 req/sec)
    await sleep(600);
    const data = await fetchJson(`${JIKAN_BASE}/characters/${characterId}/pictures`);
    if (data.data && data.data.length > 0) {
      return data.data[0].jpg.large_image_url || data.data[0].jpg.image_url;
    }
    // Fallback sur le profil du personnage
    await sleep(600);
    const profile = await fetchJson(`${JIKAN_BASE}/characters/${characterId}`);
    return profile.data?.images?.jpg?.large_image_url
        || profile.data?.images?.jpg?.image_url
        || null;
  } catch(e) {
    return null;
  }
}

async function uploadToSupabase(localPath, bucket, remotePath) {
  const fileData = fs.readFileSync(localPath);
  const ext      = path.extname(localPath).slice(1).toLowerCase();
  const mime     = ext === 'png' ? 'image/png'
                 : ext === 'gif' ? 'image/gif'
                 : ext === 'webp' ? 'image/webp'
                 : 'image/jpeg';

  return new Promise((resolve, reject) => {
    const url      = `${SUPABASE_URL}/storage/v1/object/${bucket}/${remotePath}`;
    const headers  = {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'apikey':        SERVICE_KEY,
      'Content-Type':  mime,
      'x-upsert':      'true',   // écraser si existe
    };

    const options = {
      method:  'POST',
      headers: { ...headers, 'Content-Length': fileData.length },
    };

    const urlObj = new URL(url);
    options.hostname = urlObj.hostname;
    options.path     = urlObj.pathname + urlObj.search;
    options.port     = 443;

    const req = https.request(options, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ ok: true });
        } else {
          reject(new Error(`Upload ${res.statusCode}: ${body.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

// ─── MAIN ──────────────────────────────────────────────────────────

async function main() {
  console.log('\n🏴‍☠️ ACADÉMIE PIRATE — Upload des images boss\n');
  console.log(`📦 ${BOSS_IMAGES.length} images à traiter\n`);

  // Créer le dossier temp
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  const results = { ok: [], skipped: [], failed: [] };

  for (let i = 0; i < BOSS_IMAGES.length; i++) {
    const img = BOSS_IMAGES[i];
    const num = `[${i+1}/${BOSS_IMAGES.length}]`;

    console.log(`${num} ${img.name} → ${img.bucket}/${img.path}`);

    // 1. Récupérer l'URL depuis Jikan
    process.stdout.write('     Jikan API... ');
    let imageUrl = await getJikanImage(img.jikanId);

    if (!imageUrl && img.fallback) {
      imageUrl = img.fallback;
      console.log('fallback URL');
    } else if (!imageUrl) {
      console.log('❌ Aucune image trouvée');
      results.failed.push(img.name);
      continue;
    } else {
      console.log('✅ ' + imageUrl.split('/').pop());
    }

    // 2. Télécharger l'image
    const ext      = path.extname(img.path) || '.jpg';
    const tmpFile  = path.join(TMP_DIR, `boss_${i}${ext}`);

    process.stdout.write('     Téléchargement... ');
    try {
      await downloadFile(imageUrl, tmpFile);
      const size = Math.round(fs.statSync(tmpFile).size / 1024);
      console.log(`✅ ${size} KB`);
    } catch(e) {
      console.log('❌ ' + e.message);
      results.failed.push(img.name);
      continue;
    }

    // 3. Upload vers Supabase
    process.stdout.write('     Upload Supabase... ');
    try {
      await uploadToSupabase(tmpFile, img.bucket, img.path);
      console.log('✅ Uploadé !');
      results.ok.push(img.name);

      // URL publique
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${img.bucket}/${img.path}`;
      console.log(`     🔗 ${publicUrl}\n`);
    } catch(e) {
      console.log('❌ ' + e.message);
      results.failed.push(img.name);
    }

    // Nettoyage temp
    try { fs.unlinkSync(tmpFile); } catch(e) {}
  }

  // ─── RAPPORT FINAL ──────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════');
  console.log('📊 RAPPORT FINAL');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Succès  : ${results.ok.length}/${BOSS_IMAGES.length}`);
  console.log(`❌ Échecs  : ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ Images manquantes — à uploader manuellement :');
    results.failed.forEach(n => console.log(`   - ${n}`));
  }

  // ─── MISE À JOUR boss-battle.js ─────────────────────────────────
  console.log('\n📝 Chemins à utiliser dans boss-battle.js :');
  const BASE = `${SUPABASE_URL}/storage/v1/object/public`;
  console.log(`  'Titan Colossal': '${BASE}/island-aot/bosses/titan-colossal.jpg'`);
  console.log(`  'Titan Cuirassé': '${BASE}/island-aot/bosses/titan-cuirasse.jpg'`);
  console.log(`  'Titan Féminin':  '${BASE}/island-aot/bosses/titan-feminin.jpg'`);
  console.log(`  'Titan Bestial':  '${BASE}/island-aot/bosses/titan-bestial.jpg'`);

  console.log('\n✅ Script terminé.\n');
}

main().catch(e => {
  console.error('❌ Erreur fatale:', e.message);
  process.exit(1);
});
