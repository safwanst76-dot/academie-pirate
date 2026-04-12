#!/usr/bin/env node
/**
 * ACADÉMIE PIRATE — Asset Upload CLI
 * scripts/upload.js
 * Règle ASSET-01 : point d'entrée unique pour tous les uploads
 * Règle ARCHI-01 : modulaire, données séparées du moteur
 * Règle ASSET-02 : --sources-only pour forcer les images locales
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
 *   --sources-only                (utiliser UNIQUEMENT scripts/sources/, pas Jikan)
 *   --rate-limit=700              (ms entre requêtes Jikan, défaut: 700)
 *
 * EXEMPLES :
 *   node scripts/upload.js --dry-run
 *   SUPABASE_SERVICE_KEY=xxx node scripts/upload.js --world=one-piece --sources-only
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
const arg  = function(k) { return (argv.find(function(a) { return a.startsWith('--' + k + '='); }) || '').split('=').slice(1).join('='); };
const flag = function(k) { return argv.includes('--' + k); };

const WORLD_ARG     = arg('world')      || 'all';
const TYPE_ARG      = arg('type')       || 'all';
const ID_ARG        = arg('id')         ? arg('id').split(',') : [];
const DRY_RUN       = flag('dry-run');
const FORCE         = flag('force');
const SOURCES_ONLY  = flag('sources-only');
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
    .filter(function(f) { return f.endsWith('.json'); })
    .map(function(f) {
      return {
        worldId: path.basename(f, '.json'),
        data:    JSON.parse(fs.readFileSync(path.join(ASSETS_DIR, f), 'utf8'))
      };
    });

  const filtered = worldFiles.filter(function(w) { return WORLD_ARG === 'all' || w.worldId === WORLD_ARG; });

  if (filtered.length === 0) {
    console.error('❌ Monde inconnu : "' + WORLD_ARG + '"');
    console.error('   Mondes disponibles : ' + worldFiles.map(function(w) { return w.worldId; }).join(', '));
    process.exit(1);
  }

  return filtered;
}

// ─── NORMALISER UN PERSONNAGE ────────────────────────────────────────
function normalizeCharacter(char, world) {
  return {
    id:        char.id,
    name:      char.name,
    type:      char.type || 'neutral',
    jikanId:   char.jikanId,
    storage:   world.storage,
    bucket:    world.bucket,
    path:      char.path || null,
    localPath: char.localFile ? path.join(world.localDir || '', char.localFile) : null,
  };
}

// ─── FILTRER LES CIBLES ────────────────────────────────────────────
function filterTargets(worlds) {
  const targets = [];

  worlds.forEach(function(w) {
    var worldId = w.worldId;
    var data    = w.data;
    data.characters.forEach(function(char) {
      const norm = normalizeCharacter(char, data);

      if (TYPE_ARG !== 'all' && norm.type !== TYPE_ARG) return;
      if (ID_ARG.length > 0 && !ID_ARG.includes(norm.id)) return;

      targets.push(Object.assign({}, norm, {
        worldId:    worldId,
        worldName:  data.name,
        worldEmoji: data.emoji
      }));
    });
  });

  return targets;
}

// ─── AFFICHER LE PLAN ───────────────────────────────────────────────
function displayPlan(targets) {
  const byWorld = {};
  targets.forEach(function(t) {
    if (!byWorld[t.worldId]) byWorld[t.worldId] = { hero:0, villain:0, boss:0, neutral:0 };
    byWorld[t.worldId][t.type] = (byWorld[t.worldId][t.type] || 0) + 1;
  });

  console.log('\n🏴‍☠️  ACADÉMIE PIRATE — Asset Upload');
  console.log('   Mode     : ' + (DRY_RUN ? 'DRY-RUN (aucun fichier modifié)' : 'UPLOAD'));
  console.log('   Mode src : ' + (SOURCES_ONLY ? 'SOURCES LOCALES UNIQUEMENT' : 'sources locales + Jikan fallback'));
  console.log('   Monde    : ' + WORLD_ARG + '  |  Type : ' + TYPE_ARG + '  |  Rate : ' + RATE_LIMIT_MS + 'ms');
  console.log('   Total    : ' + targets.length + ' personnages\n');

  Object.entries(byWorld).forEach(function(entry) {
    var w = entry[0]; var c = entry[1];
    console.log('   [' + w.padEnd(10) + '] ' + (c.hero||0) + ' héros · ' + (c.villain||0) + ' méchants · ' + (c.boss||0) + ' boss');
  });
  console.log('');

  if (DRY_RUN) {
    console.log('── PLAN DÉTAILLÉ ─────────────────────────────────\n');
    targets.forEach(function(t) {
      const dest = t.storage === 'supabase' ? (t.bucket + '/' + t.path) : t.localPath;
      const icon = t.type === 'boss' ? '⚔️ ' : t.type === 'villain' ? '😈' : '🦸';
      console.log('  ' + icon + ' [' + t.worldId + '] ' + t.name.padEnd(22) + ' → ' + dest);
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

  const baseConfig = {
    supabaseUrl:  SUPABASE_URL,
    serviceKey:   SERVICE_KEY,
    repoRoot:     REPO_ROOT,
    rateLimitMs:  RATE_LIMIT_MS,
    skipExisting: !FORCE,
    sourcesOnly:  SOURCES_ONLY,
  };

  let lastWorld = null;

  for (const target of targets) {
    if (target.worldId !== lastWorld) {
      const worldData = worlds.find(function(w) { return w.worldId === target.worldId; });
      if (worldData && worldData.data) {
        const counts = targets
          .filter(function(t) { return t.worldId === target.worldId; })
          .reduce(function(a, t) { a[t.type] = (a[t.type]||0)+1; return a; }, {});
        reporter.worldHeader(worldData.data.name, worldData.data.emoji, {
          heroes:   counts.hero || 0,
          villains: counts.villain || 0,
          bosses:   counts.boss || 0
        });
      }
      lastWorld = target.worldId;
    }

    // ── ASSET-02 : worldId passé à chaque appel ──
    const config = Object.assign({}, baseConfig, { worldId: target.worldId });
    await processCharacter(target, config, reporter);
  }

  reporter.summary();
}

main().catch(function(e) {
  console.error('\n❌ Erreur fatale :', e.message);
  console.error(e.stack);
  process.exit(1);
});