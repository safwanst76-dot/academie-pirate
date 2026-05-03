#!/usr/bin/env node
/**
 * Upload des 7 Titans manquants (boss images 3ème English/Paradis)
 * Source : scripts/sources/aot/
 * Destination : island-aot/bosses/ (Supabase Storage)
 *
 * USAGE : SUPABASE_SERVICE_KEY=xxx node scripts/upload-aot-titans.js
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY || '';
const SOURCES_DIR  = path.join(__dirname, 'sources', 'aot');

if (!SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY manquant');
  console.error('   Usage : SUPABASE_SERVICE_KEY=xxx node scripts/upload-aot-titans.js');
  process.exit(1);
}

// Mapping : nom fichier source → nom fichier destination Storage
const TITANS = [
  { src: 'Blindé.jpg',  dst: 'titan-blinde.jpg',   label: 'Titan Blindé (Reiner)' },
  { src: 'Machoire.jpg', dst: 'titan-machoire.jpg', label: 'Titan Mâchoire (Porco)' },
  { src: 'chariot.jpg',  dst: 'titan-chariot.jpg',  label: 'Titan Chariot (Pieck)' },
  { src: 'geant.jpg',    dst: 'titan-geant.jpg',    label: 'Titan Géant' },
  { src: 'dansant.jpg',  dst: 'titan-dansant.jpg',  label: 'Titan Dansant (Ymir)' },
  { src: 'bete.jpg',     dst: 'titan-bete.jpg',     label: 'Titan Bête (Zeke)' },
  { src: 'originel.jpg', dst: 'titan-originel.jpg', label: 'Titan Originel (Eren)' }
];

async function uploadFile(srcPath, dstPath) {
  const buf = fs.readFileSync(srcPath);
  const url = `${SUPABASE_URL}/storage/v1/object/island-aot/${dstPath}`;
  const ext = path.extname(srcPath).toLowerCase();
  const ct  = ext === '.png' ? 'image/png' : ext === '.gif' ? 'image/gif' : 'image/jpeg';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': ct,
      'x-upsert': 'true'  // overwrite si existant
    },
    body: buf
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status} : ${txt}`);
  }
  return res.json();
}

(async () => {
  console.log('🏛️  Upload des Titans AOT vers island-aot/bosses/\n');

  let success = 0;
  let errors  = 0;

  for (const t of TITANS) {
    const srcPath = path.join(SOURCES_DIR, t.src);
    const dstPath = `bosses/${t.dst}`;

    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Source manquante : ${srcPath}`);
      errors++;
      continue;
    }

    const sizeKB = (fs.statSync(srcPath).size / 1024).toFixed(1);
    process.stdout.write(`📤 ${t.label.padEnd(35)} (${sizeKB} KB) → ${dstPath} ... `);

    try {
      await uploadFile(srcPath, dstPath);
      console.log('✅');
      success++;
    } catch (e) {
      console.log(`❌\n   ${e.message}`);
      errors++;
    }
  }

  console.log(`\n📊 Résultat : ${success} succès, ${errors} erreurs`);
  process.exit(errors > 0 ? 1 : 0);
})();
