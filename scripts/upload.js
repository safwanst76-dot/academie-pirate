#!/usr/bin/env node
/**
 * ACADÉMIE PIRATE — Asset Upload CLI
 * scripts/upload.js
 * Règle ASSET-01 : point d'entrée unique pour tous les uploads
 * Règle ARCHI-01 : modulaire, données séparées du moteur
 *
 * USAGE :
 *   SUPABASE_SERVICE_KEY=xxx node scripts/upload.js [options]
 *
 * OPTIONS :
 *   --world=aot|ds|naruto|jjk|one-piece|dbz|all
 *   --type=hero|villain|boss|all
 *   --id=eren,levi,mikasa         (IDs spécifiques)
 *   --skip-existing               (ignorer si déjà présent, défaut: true)
 *   --force                       (re-uploader même si présent)
 *   --dry-run                     (afficher le plan sans télécharger)
 *   --rate-limit=700              (ms entre requêtes Jikan, défaut: 700)
 *
 * EXEMPLES :
 *   node scripts/upload.js --dry-run
 *   SUPABASE_SERVICE_KEY=xxx node scripts/upload.js --world=aot
 *   SUPABASE_SERVICE_KEY=xxx node scripts/upload.js --world=all --type=boss
 *   SUPABASE_SERVICE_KEY=xxx node scripts/upload.js --world=jjk --id=mahito,hanami
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── CONFIG ────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY || '';
const REPO_ROOT    = path.resolve(__dirname, '..');
const ASSETS_DIR   = path.join(__dirname, 'assets');

// ─── ARGS ──────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg  = k => (argv.find(a => a.startsWith(`--${k}=`)) || '').split('=').slice(1).join('=');
const flag = k => argv.includes(`--${k}`);

const WORLD_ARG     = arg('world')      || 'all';
const TYPE_ARG      = arg('type')       || 'all';
const ID_ARG        = arg('id')         ? arg('id').split(',') : [];
const DRY_RUN       = flag('dry-run');
const FORCE         = flag('force');
const RATE_LIMIT_MS = parseInt(arg('rate-limit') || '700', 10);

// ─── CHARGER LES MODULES ───────────────────────────────────────────
const { processCharacter } = require('./lib/engine');
const { createReporter }   = require('./lib/reporter');

// ─── VALIDATION ────────────────────────────────────────────────────
if (!SERVICE_KEY && !DRY_RUN) {
  console.error('\n❌ SUPABASE_SERVICE_KEY manquant.\n');
  console.error('   Usage : SUPABASE_SERVICE_KEY=votre_clé node scripts/upload.js');
  console.error('   Dry run (test sans upload) : node scripts/upload.js --dry-run\n');
  process.exit(1);
}

// ─── CHARGER LES ASSETS JSON ────────────────────────────────────────
function loadAssets() {
  const worldFiles = fs.readdirSync(ASSETS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      worldId: path.basename(f, '.json'),
      data:    JSON.parse(fs.readFileSync(path.join(ASSETS_DIR, f), 'utf8'))
    }));

  // Filtrer par monde
  const filtered = worldFiles.filter(w => WORLD_ARG === 'all' || w.worldId === WORLD_ARG);

  if (filtered.length === 0) {
    console.error(`❌ Monde inconnu : "${WORLD_ARG}"`);
    console.error(`   Mondes disponibles : ${worldFiles.map(w => w.worldId).join(', ')}`);
    process.exit(1);
  }

  return filtered;
}

// ─── NORMALISER UN PERSONNAGE ────────────────────────────────────────
// Uniformise le format selon que le storage est supabase ou local
function normalizeCharacter(char, world) {
  const base = {
    id:        char.id,
    name:      char.name,
    type:      char.type || 'neutral',
    jikanId:   char.jikanId,
    storage:   world.storage,
    bucket:    world.bucket,
    path:      char.path || null,
    localPath: char.localFile ? path.join(world.localDir, char.localFile) : null,
  };
  return base;
}

// ─── FILTRER LES CIBLES ────────────────────────────────────────────
function filterTargets(worlds) {
  const targets = [];

  worlds.forEach(({ worldId, data }) => {
    data.characters.forEach(char => {
      const norm = normalizeCharacter(char, data);

      // Filtre type
      if (TYPE_ARG !== 'all' && norm.type !== TYPE_ARG) return;

      // Filtre ID
      if (ID_ARG.length > 0 && !ID_ARG.includes(norm.id)) return;

      targets.push({ ...norm, worldId, worldName: data.name, worldEmoji: data.emoji });
    });
  });

  return targets;
}

// ─── AFFICHER LE PLAN ───────────────────────────────────────────────
function displayPlan(targets) {
  const byWorld = {};
  targets.forEach(t => {
    if (!byWorld[t.worldId]) byWorld[t.worldId] = { hero:0, villain:0, boss:0, neutral:0 };
    byWorld[t.worldId][t.type] = (byWorld[t.worldId][t.type] || 0) + 1;
  });

  console.log(`\n🏴‍☠️  ACADÉMIE PIRATE — Asset Upload`);
  console.log(`   Mode     : ${DRY_RUN ? 'DRY-RUN (aucun fichier modifié)' : 'UPLOAD'}`);
  console.log(`   Monde    : ${WORLD_ARG}  |  Type : ${TYPE_ARG}  |  Rate : ${RATE_LIMIT_MS}ms`);
  console.log(`   Total    : ${targets.length} personnages\n`);

  Object.entries(byWorld).forEach(([w, c]) => {
    console.log(`   [${w.padEnd(10)}] ${c.hero||0} héros · ${c.villain||0} méchants · ${c.boss||0} boss`);
  });
  console.log('');

  if (DRY_RUN) {
    console.log('── PLAN DÉTAILLÉ ─────────────────────────────────\n');
    targets.forEach(t => {
      const dest = t.storage === 'supabase'
        ? `${t.bucket}/${t.path}`
        : t.localPath;
      const icon = t.type === 'boss' ? '⚔️ ' : t.type === 'villain' ? '😈' : '🦸';
      console.log(`  ${icon} [${t.worldId}] ${t.name.padEnd(22)} → ${dest}`);
    });
  }
}

// ─── MAIN ──────────────────────────────────────────────────────────
async function main() {
  const worlds  = loadAssets();
  const targets = filterTargets(worlds);

  displayPlan(targets);
  if (DRY_RUN || targets.length === 0) return;

  const reporter = createReporter(targets.length);
  const config   = {
    supabaseUrl:   SUPABASE_URL,
    serviceKey:    SERVICE_KEY,
    repoRoot:      REPO_ROOT,
    rateLimitMs:   RATE_LIMIT_MS,
    skipExisting:  !FORCE,
  };

  // Grouper par monde pour les headers
  let lastWorld = null;

  for (const target of targets) {
    if (target.worldId !== lastWorld) {
      const worldData = worlds.find(w => w.worldId === target.worldId)?.data;
      if (worldData) {
        const counts = targets
          .filter(t => t.worldId === target.worldId)
          .reduce((a, t) => { a[t.type] = (a[t.type]||0)+1; return a; }, {});
        reporter.worldHeader(worldData.name, worldData.emoji, {
          heroes:   counts.hero || 0,
          villains: counts.villain || 0,
          bosses:   counts.boss || 0
        });
      }
      lastWorld = target.worldId;
    }

    await processCharacter(target, config, reporter);
  }

  reporter.summary();
}

main().catch(e => {
  console.error('\n❌ Erreur fatale :', e.message);
  process.exit(1);
});
