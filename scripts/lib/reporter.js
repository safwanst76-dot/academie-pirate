/**
 * ACADÉMIE PIRATE — Reporter
 * scripts/lib/reporter.js
 * Affichage progressif et rapport final
 */

'use strict';

const STATUS_ICON = { ok:'✅', skipped:'⏭ ', failed:'❌', fetching:'⏳' };
const TYPE_ICON   = { hero:'🦸', villain:'😈', boss:'⚔️ ', neutral:'👤' };

function createReporter(total) {
  let current = 0;
  const results = { ok: [], skipped: [], failed: [] };
  const startTime = Date.now();

  function progress(name, status, detail) {
    current++;
    const num  = `[${String(current).padStart(3)}/${total}]`;
    const icon = STATUS_ICON[status] || '·';
    const line = detail ? `${name} — ${detail}` : name;
    console.log(`${num} ${icon} ${line}`);
    if (status === 'ok')      results.ok.push(name);
    if (status === 'skipped') results.skipped.push(name);
    if (status === 'failed')  results.failed.push({ name, detail });
  }

  function worldHeader(worldName, emoji, counts) {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`${emoji}  ${worldName.toUpperCase()}`);
    console.log(`   ${counts.heroes} héros · ${counts.villains} méchants · ${counts.bosses} boss`);
    console.log('═'.repeat(50));
  }

  function summary() {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    console.log('\n' + '═'.repeat(50));
    console.log('📊 RAPPORT FINAL');
    console.log('═'.repeat(50));
    console.log(`✅ Succès   : ${results.ok.length}`);
    console.log(`⏭  Ignorés  : ${results.skipped.length} (déjà présents)`);
    console.log(`❌ Échecs   : ${results.failed.length}`);
    console.log(`⏱  Durée    : ${elapsed}s`);

    if (results.failed.length > 0) {
      console.log('\n❌ Personnages manquants — à uploader manuellement :');
      results.failed.forEach(f => console.log(`   - ${f.name} (${f.detail || '?'})`));
      console.log('\n💡 Ces images ne sont pas disponibles via Jikan.');
      console.log('   → Cherche-les sur Google Images et uploade via Supabase Storage UI.');
    }

    const localAdded = results.ok.filter(n => !n.startsWith('⬆')).length;
    if (results.ok.length > 0) {
      console.log(`\n📝 ${results.ok.length} images ajoutées.`);
      console.log('   git add assets/images/ && git commit -m "feat: assets personnages" && git push');
    }

    console.log('\n✅ Terminé.\n');
    return results;
  }

  return { progress, worldHeader, summary };
}

module.exports = { createReporter, TYPE_ICON };
